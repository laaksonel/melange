(* Copyright (C) 2015-2016 Bloomberg Finance L.P.
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

let js_type_number = "number"
let js_type_string = "string"
let js_type_object = "object"
let js_type_boolean = "boolean"
let js_undefined = "undefined"
let js_prop_length = "length"
let param = "param"
let partial_arg = "partial_arg"
let tmp = "tmp"
let create = "create" (* {!Caml_exceptions.create}*)
let imul = "imul" (* signed int32 mul *)
let setter_suffix = "#="
let setter_suffix_len = String.length setter_suffix
let unsafe_downgrade = "unsafe_downgrade"

(* nodejs *)
let node_modules = "node_modules"
let node_modules_length = String.length node_modules
let bsconfig_json = "bsconfig.json"
let dune = "dune"
let dune_mel = "dune.mel"
let dune_project = "dune-project"
let mel_dune_alias = "mel"
let package_name = "melange"

(* Prefix of all melange runtime packages *)
let mel_runtime_package_prefix = "@melange/runtime"

(* Name of the library file created for each external dependency. *)
let lib = "lib"
let suffix_cmj = ".cmj"
let suffix_cmi = ".cmi"
let suffix_mll = ".mll"
let suffix_ml = ".ml"
let suffix_mli = ".mli"
let suffix_re = ".re"
let suffix_rei = ".rei"
let suffix_res = ".res"
let suffix_resi = ".resi"
let suffix_mlmap = ".mlmap"
let suffix_cmt = ".cmt"
let suffix_cmti = ".cmti"
let suffix_ast = ".ast"
let suffix_iast = ".iast"
let suffix_d = ".d"
let suffix_pp = ".pp"
let suffix_js = ".js"
let suffix_bs_js = ".bs.js"
let suffix_mjs = ".mjs"
let suffix_cjs = ".cjs"
let suffix_gen_js = ".gen.js"
let suffix_gen_tsx = ".gen.tsx"
let suffix_impl = ".impl"
let suffix_intf = ".intf"
let commonjs = "commonjs"
let es6 = "es6"
let es6_global = "es6-global"

(** Used when produce node compatible paths *)
let node_sep = "/"

let node_parent = ".."
let node_current = "."
let gentype_import = "genType.import"
let bsbuild_cache = ".bsbuild"
let sourcedirs_meta = ".sourcedirs.json"
let melange_output_prefix = "melange"
let melange_eobjs_dir = ".melange.eobjs"

(* Note the build system should check the validity of filenames
   especially, they should not contain '-' *)
let ns_sep_char = '-'
let ns_sep = String.make 1 ns_sep_char
let exception_id = "RE_EXN_ID"
let polyvar_hash = "NAME"
let polyvar_value = "VAL"
let cons = "::"
let hd = "hd"
let tl = "tl"
let lazy_done = "LAZY_DONE"
let lazy_val = "VAL"
let pure = "@__PURE__"
