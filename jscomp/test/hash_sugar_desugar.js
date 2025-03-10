'use strict';

var Curry = require("melange/lib/js/curry.js");
var Caml_oo_curry = require("melange/lib/js/caml_oo_curry.js");

function h1(u) {
  return u.p;
}

function h2(u) {
  return u.m(1, 2);
}

function h3(u) {
  var f = u.hi;
  return Curry._2(f, 1, 2);
}

function h4(u) {
  return u.hi(1, 2);
}

function h5(u) {
  u.hi = 3;
}

function h6(u) {
  return Caml_oo_curry.js1(112, 1, u);
}

function h7(u) {
  return Caml_oo_curry.js1(109, 2, u)(1, 2);
}

function h8(u) {
  var f = Caml_oo_curry.js1(23297, 3, u);
  return Curry._2(f, 1, 2);
}

function chain_g(h) {
  var tmp = Caml_oo_curry.js1(120, 4, h);
  var tmp$1 = Caml_oo_curry.js1(121, 5, tmp);
  return Caml_oo_curry.js1(122, 6, tmp$1);
}

exports.h1 = h1;
exports.h2 = h2;
exports.h3 = h3;
exports.h4 = h4;
exports.h5 = h5;
exports.h6 = h6;
exports.h7 = h7;
exports.h8 = h8;
exports.chain_g = chain_g;
/* No side effect */
