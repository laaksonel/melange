{
  description = "Melange Nix Flake";

  inputs = {
    nix-filter.url = "github:numtide/nix-filter";
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:anmonteiro/nix-overlays";
    nixpkgs.inputs.flake-utils.follows = "flake-utils";
    # melange-compiler-libs.url = "github:melange-re/melange-compiler-libs";
    # melange-compiler-libs.inputs.nixpkgs.follows = "nixpkgs";
    # melange-compiler-libs.inputs.flake-utils.follows = "flake-utils";
    melange-compiler-libs.url = "git+ssh://git@github.com/laaksonel/melange-compiler-5.git";

    dream2nix.url = "github:nix-community/dream2nix";
    dream2nix.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = { self, nixpkgs, flake-utils, dream2nix, nix-filter, melange-compiler-libs }@inputs:
    {
      overlays.default = import ./nix/overlay.nix {
        nix-filter = nix-filter.lib;
        inherit melange-compiler-libs;
      };
    } // (flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages."${system}".appendOverlays [
          (self: super: {
            ocamlPackages = super.ocaml-ng.ocamlPackages_5_0.overrideScope' (oself: osuper:
              {
                dune_3 = osuper.dune_3.overrideAttrs (_: {
                  src = builtins.fetchurl {
                    url = https://github.com/ocaml/dune/archive/405c0bc3.tar.gz;
                    sha256 = "1camppviqyykw5m319jm8afq7f02smmp0a5hk4c1yhiw9caq7c4l";
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
          inputs.melange-compiler-libs.overlays.default
        ];
      in

      rec {
        packages = pkgs.callPackage ./nix { nix-filter = nix-filter.lib; doCheck = false; } // {
          default = packages.melange;
        };

        devShells = {
          default = pkgs.callPackage ./nix/shell.nix {
            dream2nix = dream2nix.lib2;
            inherit packages;
          };
          release = pkgs.callPackage ./nix/shell.nix {
            dream2nix = dream2nix.lib2;
            release-mode = true;
            inherit packages;
          };
        };
      }));
}
