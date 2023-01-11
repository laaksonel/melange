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
                rev = "ebf453b90b3edc8aca5999c33d71f330b2f0bf37";
                sha256 = "sha256-IGFVZOyV4E9Q0dOQC3RWeAg/TUkMjRO6pVcGj0ftu3M=";
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
