'use strict';

var Caml_oo_curry = require("melange/lib/js/caml_oo_curry.js");

function f(x) {
  x.height = 3;
}

function h(x) {
  return Caml_oo_curry.js1(38537191, 1, x);
}

exports.f = f;
exports.h = h;
/* No side effect */
