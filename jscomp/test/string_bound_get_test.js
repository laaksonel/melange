'use strict';

var Caml_bytes = require("melange/lib/js/caml_bytes.js");
var Caml_string = require("melange/lib/js/caml_string.js");

var v = "ghos";

var u_a = /* 'g' */103;

function u_b(param) {
  return Caml_string.get(v, -1);
}

function u_d(param) {
  return Caml_string.get("ghos", -1);
}

var u_e = Caml_bytes.caml_create_bytes(32);

var u_f = Caml_bytes.get(u_e, 0);

function u_g(param) {
  return Caml_bytes.get(u_e, -1);
}

var u_c = /* 'g' */103;

exports.v = v;
exports.u_a = u_a;
exports.u_b = u_b;
exports.u_c = u_c;
exports.u_d = u_d;
exports.u_e = u_e;
exports.u_f = u_f;
exports.u_g = u_g;
/* No side effect */
