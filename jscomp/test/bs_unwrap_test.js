'use strict';

var Curry = require("melange/lib/js/curry.js");
var Caml_option = require("melange/lib/js/caml_option.js");

console.log([
      "hello world",
      1
    ]);

console.log(1337);

console.log("hello world");

var arg_string = {
  NAME: "String",
  VAL: "hi runtime"
};

console.log(arg_string.VAL);

var arg_pair = {
  NAME: "Pair",
  VAL: [
    "hi",
    1
  ]
};

console.log(arg_pair.VAL);

console.log(undefined);

console.log(1, undefined);

console.log(2, "hi");

console.log(3, "hi");

console.log(4, undefined);

var some_arg = {
  NAME: "Bool",
  VAL: true
};

console.log(5, Caml_option.option_unwrap(some_arg));

console.log(6, undefined);

console.log(7, Caml_option.option_unwrap((console.log("trace"), undefined)));

function dyn_log3(prim0, prim1, prim2) {
  console.log(prim0.VAL, Caml_option.option_unwrap(prim1));
}

dyn_log3({
      NAME: "Int",
      VAL: 8
    }, {
      NAME: "Bool",
      VAL: true
    }, undefined);

console.log("foo");

console.log({
      foo: 1
    });

function dyn_log4(prim) {
  console.log(prim.VAL);
}

console.log({
      foo: 2
    });

function f(x) {
  console.log(x.VAL);
}

function ff0(x, p) {
  console.log(Caml_option.option_unwrap(x), p);
}

function ff1(x, p) {
  console.log(Caml_option.option_unwrap(Curry._1(x, undefined)), p);
}

function test00(param) {
  return {
          a: 1,
          b: 2,
          x: undefined
        };
}

var none_arg;

exports.arg_string = arg_string;
exports.arg_pair = arg_pair;
exports.some_arg = some_arg;
exports.none_arg = none_arg;
exports.dyn_log3 = dyn_log3;
exports.dyn_log4 = dyn_log4;
exports.f = f;
exports.ff0 = ff0;
exports.ff1 = ff1;
exports.test00 = test00;
/*  Not a pure module */
