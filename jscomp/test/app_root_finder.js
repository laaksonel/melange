'use strict';

var Fs = require("fs");
var Path = require("path");
var Stdlib = require("melange/lib/js/stdlib.js");

var package_json = "package.json";

function find_package_json(_dir) {
  while(true) {
    var dir = _dir;
    if (Fs.existsSync(Path.join(dir, package_json))) {
      return dir;
    }
    var new_dir = Path.dirname(dir);
    if (new_dir === dir) {
      throw {
            RE_EXN_ID: Stdlib.Not_found,
            Error: new Error()
          };
    }
    _dir = new_dir;
    continue ;
  };
}

var x = typeof __dirname === "undefined" ? undefined : __dirname;

if (x !== undefined) {
  console.log(find_package_json(x));
}

exports.package_json = package_json;
exports.find_package_json = find_package_json;
/* x Not a pure module */
