'use strict';

var Caml_option = require("melange/lib/js/caml_option.js");

function Make(S) {
  var opt_get = function (f, i) {
    return Caml_option.undefined_to_opt(f[i]);
  };
  return {
          opt_get: opt_get
        };
}

function opt_get(f, i) {
  return Caml_option.undefined_to_opt(f[i]);
}

var Int_arr = {
  opt_get: opt_get
};

function f(v) {
  return [
          v[0],
          Caml_option.undefined_to_opt(v[1])
        ];
}

exports.Make = Make;
exports.Int_arr = Int_arr;
exports.f = f;
/* No side effect */
