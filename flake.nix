{
  description = "Melange Nix Flake";

  inputs = {
    nix-filter.url = "github:numtide/nix-filter";
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:anmonteiro/nix-overlays";
    nixpkgs.inputs.flake-utils.follows = "flake-utils";
    melange-compiler-libs.url = "github:laaksonel/melange-compiler-libs";

    dream2nix.url = "github:nix-community/dream2nix";
    dream2nix.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = { self, nixpkgs, flake-utils, dream2nix, nix-filter, melange-compiler-libs }@inputs:
    {
      fromPkgs =
        pkgs: pkgs.callPackage ./nix { nix-filter = nix-filter.lib; doCheck = false; };
    } // (flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = (nixpkgs.legacyPackages."${system}".extend (self: super: {
          ocamlPackages = super.ocaml-ng.ocamlPackages_5_0.overrideScope' (oself: osuper: {
            ocaml-migrate-parsetree-2 = osuper.ocaml-migrate-parsetree-2.overrideAttrs (old: {
              src = super.fetchFromGitHub {
                owner = "laaksonel";
                repo = "ocaml-migrate-parsetree";
                rev = "8f0a340f4876788ee41a9342de4feff523d39412";
                sha256 = "sha256-Td8kSQIzNLrd0eLCmPnI6Qy4fApkWpXKRvahXUSYnko=";
              };
            });
          });
        })).extend melange-compiler-libs.overlays.default;
      in

      rec {
        packages = self.fromPkgs pkgs // {
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
