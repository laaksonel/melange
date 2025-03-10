(* Copyright (C) 2022- Authors of Melange
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

val cwd : string
val is_dep_inside_workspace : root_dir:string -> package_dir:string -> bool
val to_workspace_proj_dir : package_name:string -> string

val virtual_proj_dir :
  root_dir:string -> package_dir:string -> package_name:string -> string

val absolute_artifacts_dir :
  ?include_dune_build_dir:bool ->
  package_name:string ->
  root_dir:string ->
  string ->
  string

val rel_artifacts_dir :
  ?include_dune_build_dir:bool ->
  package_name:string ->
  root_dir:string ->
  proj_dir:string ->
  string ->
  string

val rel_root_artifacts_dir : root_dir:string -> string -> string
val dune_build_dir : string Lazy.t
val ppx_exe : string
