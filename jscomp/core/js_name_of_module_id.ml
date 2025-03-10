(* Copyright (C) 2017 Hongbo Zhang, Authors of ReScript
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * In addition to the permissions granted to you by the LGPL, you may combine
 * or link a "work that uses the Library" with a publicly distributed version
 * of this file to produce a combined library or application, then distribute
 * that combined work under the terms of your choosing, with no requirement
 * to comply with the obligations normally placed on you by section 4 of the
 * LGPL version 3 (or the corresponding section of a later version of the LGPL
 * should you choose to use a later version).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA. *)
(*
let (=)  (x : int) (y:float) = assert false
*)

let ( // ) = Filename.concat

let fix_path_for_windows : string -> string =
  if Ext_sys.is_windows_or_cygwin then Ext_string.replace_backward_slash
  else fun s -> s

let js_file_name ~(pkg_info : Js_packages_info.package_found_info) ~case ~suffix
    (dep_module_id : Lam_module_ident.t) =
  let module_name =
    match pkg_info with
    | Separate path_info | Batch { path_info } -> (
        match path_info.module_name with
        | Some module_name -> module_name
        | None -> Ident.name dep_module_id.id)
  in
  Ext_namespace.js_name_of_modulename module_name case suffix

(* dependency is runtime module *)
let get_runtime_module_path ~package_info (dep_module_id : Lam_module_ident.t)
    (module_system : Ext_module_system.t) =
  let suffix =
    match module_system with
    | NodeJS -> Ext_js_suffix.Js
    | Es6 | Es6_global -> Mjs
  in
  let js_file =
    Ext_namespace.js_name_of_modulename
      (Ident.name dep_module_id.id)
      Lowercase suffix
  in
  match Js_packages_info.query_package_infos package_info module_system with
  | Package_not_found -> assert false
  | Package_script ->
      Ext_module_system.runtime_package_path module_system js_file
  | Package_found (Separate path_info | Batch { path_info; _ }) -> (
      match Js_packages_info.is_runtime_package package_info with
      | true ->
          (* Runtime files end up in the same directory, `lib/js` or `lib/es6` *)
          Ext_path.node_rebase_file ~from:path_info.rel_path
            ~to_:path_info.rel_path js_file
      | false -> (
          match module_system with
          | NodeJS | Es6 ->
              Ext_module_system.runtime_package_path module_system js_file
          (* Note we did a post-processing when working on Windows *)
          | Es6_global ->
              (* lib/ocaml/xx.cmj --
                  HACKING: FIXME
                  maybe we can caching relative package path calculation or employ package map *)
              let dep_path =
                Literals.lib // Ext_module_system.runtime_dir module_system
              in
              Ext_path.rel_normalized_absolute_path
                ~from:
                  (Js_packages_info.get_output_dir package_info
                     ~package_dir:(Lazy.force Ext_path.package_dir)
                     module_system)
                (*Invariant: the package path to bs-platform, it is used to
                  calculate relative js path
                *)
                (match !Js_config.customize_runtime with
                | None ->
                    Filename.dirname (Filename.dirname Sys.executable_name)
                    // dep_path // js_file
                | Some path -> path // dep_path // js_file)))

(* [output_dir] is decided by the command line argument *)
let string_of_module_id ~package_info ~output_info
    (dep_module_id : Lam_module_ident.t) ~(output_dir : string) : string =
  let { Js_packages_info.module_system; suffix } = output_info in
  fix_path_for_windows
    (match dep_module_id.kind with
    | External { name } -> name (* the literal string for external package *)
    (* This may not be enough,
        1. For cross packages, we may need settle
        down a single js package
        2. We may need es6 path for dead code elimination
         But frankly, very few JS packages have no dependency,
         so having plugin may sound not that bad
    *)
    | Runtime ->
        get_runtime_module_path ~package_info dep_module_id module_system
    | Ml -> (
        let package_path, dep_package_info, case =
          Lam_compile_env.get_package_path_from_cmj dep_module_id
        in
        match
          ( Js_packages_info.query_package_infos dep_package_info module_system,
            Js_packages_info.query_package_infos package_info module_system )
        with
        | _, Package_not_found ->
            (* Impossible to not find the current package. *)
            assert false
        | Package_not_found, _ ->
            Bs_exception.error
              (Missing_ml_dependency (Ident.name dep_module_id.id))
        | Package_script, Package_found _ ->
            Bs_exception.error
              (Dependency_script_module_dependent_not
                 (Ident.name dep_module_id.id))
        | Package_found pkg, Package_script ->
            let path_info = Js_packages_info.path_info pkg in
            let js_file =
              js_file_name ~case ~suffix ~pkg_info:pkg dep_module_id
            in
            path_info.pkg_rel_path // js_file
        | Package_found dep_pkg, Package_found cur_pkg -> (
            let ({ suffix; module_system } : Js_packages_info.output_info) =
              match dep_pkg with
              | Batch { suffix; _ } -> { module_system; suffix }
              | Separate _ -> { suffix; module_system }
            in
            let js_file =
              js_file_name ~case ~suffix ~pkg_info:dep_pkg dep_module_id
            in
            match Js_packages_info.is_runtime_package package_info with
            | true ->
                (* If we're compiling the melange runtime, get a runtime module
                   path. *)
                get_runtime_module_path ~package_info dep_module_id
                  module_system
            | false -> (
                let dep = Js_packages_info.path_info dep_pkg in
                match
                  Js_packages_info.same_package_by_name package_info
                    dep_package_info
                with
                | true ->
                    (* If this is the same package, we know all imports are
                       relative. *)
                    let cur = Js_packages_info.path_info cur_pkg in
                    Ext_path.node_rebase_file ~from:cur.rel_path
                      ~to_:dep.rel_path js_file
                | false -> (
                    if
                      (* Importing a dependency:
                       *   - are we importing the melange runtime / stdlib? *)
                      Js_packages_info.is_runtime_package dep_package_info
                    then
                      get_runtime_module_path ~package_info dep_module_id
                        module_system
                    else
                      (* - Are we importing another package? *)
                      match module_system with
                      | NodeJS | Es6 -> dep.pkg_rel_path // js_file
                      (* Note we did a post-processing when working on Windows *)
                      | Es6_global ->
                          Ext_path.rel_normalized_absolute_path
                            ~from:
                              (Js_packages_info.get_output_dir package_info
                                 ~package_dir:(Lazy.force Ext_path.package_dir)
                                 module_system)
                            (package_path // dep.rel_path // js_file))))
        | Package_script, Package_script -> (
            let js_file =
              Ext_namespace.js_name_of_modulename
                (Ident.name dep_module_id.id)
                case Js
            in
            match Config_util.find_opt js_file with
            | Some file ->
                let basename = Filename.basename file in
                let dirname = Filename.dirname file in
                Ext_path.node_rebase_file
                  ~from:(Ext_path.absolute_cwd_path output_dir)
                  ~to_:(Ext_path.absolute_cwd_path dirname)
                  basename
            | None -> Bs_exception.error (Js_not_found js_file))))
;;

(* Override it in browser *)
#ifdef BS_BROWSER

let string_of_module_id_in_browser (x : Lam_module_ident.t) =
  match x.kind with
  | External { name } -> name
  | Runtime | Ml ->
      "./stdlib/" ^ Ext_string.uncapitalize_ascii x.id.name ^ ".js"

let string_of_module_id ~package_info:_ ~output_info:_ (id : Lam_module_ident.t)
    ~output_dir:(_ : string) : string =
  string_of_module_id_in_browser id
;;

#endif
