'use strict';

var Curry = require("melange/lib/js/curry.js");
var Stdlib = require("melange/lib/js/stdlib.js");
var Caml_array = require("melange/lib/js/caml_array.js");
var CamlinternalLazy = require("melange/lib/js/camlinternalLazy.js");

function a4(prim) {
  return [
          "File \"test_primitive.ml\", line 30, characters 9-19",
          prim
        ];
}

function a5(prim) {
  return [
          31,
          prim
        ];
}

function a6(prim) {
  return [
          [
            "test_primitive.ml",
            32,
            9,
            19
          ],
          prim
        ];
}

var test_float = 3;

var test_abs = Math.abs(3.0);

var v = [
  1.0,
  2.0
];

var xxx = "a";

var a = /* 'a' */97;

function u(b) {
  if (b) {
    Stdlib.print_int(1);
    return 32;
  } else {
    return 7;
  }
}

function f2(h, b, param) {
  return Curry._1(h, b ? 32 : 7);
}

Caml_array.set(v, 1, 3.0);

var unboxed_x = {
  u: 0,
  v: 0
};

function gg(x) {
  x.u = 0;
}

function f(x) {
  return x.length;
}

var is_lazy_force = CamlinternalLazy.force;

function fib(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  var fib1 = fib(n - 1 | 0);
  var fib2 = fib(n - 2 | 0);
  return (fib1 + fib2 | 0) + 3 | 0;
}

var a0 = "File \"test_primitive.ml\", line 26, characters 9-16";

var a1 = "Test_primitive";

var a2 = 28;

var a3 = "Test_primitive";

var xx = [
  0,
  0
];

exports.a0 = a0;
exports.a1 = a1;
exports.a2 = a2;
exports.a3 = a3;
exports.a4 = a4;
exports.a5 = a5;
exports.a6 = a6;
exports.test_float = test_float;
exports.test_abs = test_abs;
exports.v = v;
exports.xxx = xxx;
exports.a = a;
exports.u = u;
exports.f2 = f2;
exports.xx = xx;
exports.unboxed_x = unboxed_x;
exports.gg = gg;
exports.f = f;
exports.is_lazy_force = is_lazy_force;
exports.fib = fib;
/* test_abs Not a pure module */
