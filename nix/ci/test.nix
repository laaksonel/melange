let
  lock = builtins.fromJSON (builtins.readFile ./../../flake.lock);
  src = fetchGit {
    url = with lock.nodes.nixpkgs.locked;"https://github.com/${owner}/${repo}";
    inherit (lock.nodes.nixpkgs.locked) rev;
    # inherit (lock.nodes.nixpkgs.original) ref;
  };
  nix-filter-src = fetchGit {
    url = with lock.nodes.nix-filter.locked; "https://github.com/${owner}/${repo}";
    inherit (lock.nodes.nix-filter.locked) rev;
    # inherit (lock.nodes.nixpkgs.original) ref;
    allRefs = true;
  };
  nix-filter = import "${nix-filter-src}";

  pkgs = import src {
    extraOverlays = [
      (self: super: {
        ocamlPackages = super.ocaml-ng.ocamlPackages_5_0.overrideScope' (oself: osuper: {
          dune_3 = osuper.dune_3.overrideAttrs (_: {
            src = builtins.fetchurl {
              url = https://github.com/ocaml/dune/archive/b8250aa70.tar.gz;
              sha256 = "0rk49ywbjjzrqk47z8sc36b68ig0vvbp1b8f2hr1bp769sj9s79n";
            };
          });
          ocaml-migrate-parsetree-2 = osuper.ocaml-migrate-parsetree-2.overrideAttrs (old: {
            src = super.fetchFromGitHub {
              owner = "laaksonel";
              repo = "ocaml-migrate-parsetree";
              rev = "8f0a340f4876788ee41a9342de4feff523d39412";
              sha256 = "sha256-Td8kSQIzNLrd0eLCmPnI6Qy4fApkWpXKRvahXUSYnko=";
            };
          });
        });
      })
    ];
  };
  inherit (pkgs) stdenv nodejs yarn git lib ocamlPackages;
  packages = pkgs.callPackage ./.. { inherit nix-filter; };
  inputString =
    builtins.substring
      11 32
      (builtins.unsafeDiscardStringContext packages.melange.outPath);
in

stdenv.mkDerivation {
  name = "melange-tests-${inputString}";

  src = ../../jscomp/test;

  # https://blog.eigenvalue.net/nix-rerunning-fixed-output-derivations/
  # the dream of running fixed-output-derivations is dead -- somehow after
  # Nix 2.4 it results in `error: unexpected end-of-file`.
  # Example: https://github.com/melange-re/melange/runs/4132970590

  outputHashMode = "flat";
  outputHashAlgo = "sha256";
  outputHash = builtins.hashString "sha256" "melange";
  installPhase = ''
    echo -n melange > $out
  '';

  phases = [ "unpackPhase" "checkPhase" "installPhase" ];

  doCheck = true;

  nativeBuildInputs = with ocamlPackages; [ ocaml findlib dune ];
  buildInputs = [ yarn nodejs packages.melange packages.mel ocamlPackages.reason ];

  checkPhase = ''
    # https://github.com/yarnpkg/yarn/issues/2629#issuecomment-685088015
    yarn install --frozen-lockfile --check-files --cache-folder .ycache && rm -rf .ycache
    ln -sfn ${packages.melange}/lib/melange/runtime node_modules/melange
    mel build -- --display=short

    node ./node_modules/.bin/mocha "./*_test.js"
  '';
}
