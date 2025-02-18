(lang dune 3.5)

(using directory-targets 0.1)

(executables_implicit_empty_intf true)

(cram enable)

(formatting
 (enabled_for ocaml))

(generate_opam_files true)

(name melange)

(source
 (github melange-re/melange))

(authors "Antonio Nuno Monteiro <anmonteiro@gmail.com>")

(maintainers "Antonio Nuno Monteiro <anmonteiro@gmail.com>")

(homepage "https://github.com/melange-re/melange")

(bug_reports "https://github.com/melange-re/melange/issues")

(license "LGPL-2.1-or-later")

(package
 (name melange)
 (synopsis "Toolchain to produce JS from Reason/OCaml")
 (depends
  (ocaml
   (and
    (>= "5.0")
    (< "5.1")))
  (melange-compiler-libs
   (>= "0.0.1-414"))
  (cmdliner
   (>= "1.1.0"))
  (meldep
   (= :version))
  (cppo :build)
  (ounit :with-test)))

(package
 (name meldep)
 (synopsis
  "Melange counterpart to `ocamldep` that understands Melange-specific constructs")
 (depends
  (ocaml
   (and
    (>= "5.0")
    (< "5.1")))
  (cppo :build)
  (base64
   (>= "3.1.0"))
  (cmdliner
   (>= "1.1.0"))
  (melange-compiler-libs
   (>= "0.0.1-414"))))

(package
 (name mel)
 (synopsis
  "Build system for Melange that defers to Dune for build orchestration")
 (depends
  (ocaml
   (and
    (>= "5.0")
    (< "5.1")))
  (melange
   (= :version))
  (cmdliner
   (>= "1.1.0"))
  (luv
   (>= "0.5.11"))
  (ocaml-migrate-parsetree
   (>= "2.4.0"))
  (ounit :with-test)))
