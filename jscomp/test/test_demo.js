'use strict';

var List = require("melange/lib/js/list.js");
var Curry = require("melange/lib/js/curry.js");

function fib(n) {
  if (n === 2 || n === 1) {
    return 1;
  } else {
    return fib(n - 1 | 0) + fib(n - 2 | 0) | 0;
  }
}

function cons(x, y) {
  return /* Cons */{
          _0: x,
          _1: y
        };
}

function map(f, param) {
  if (param) {
    return /* Cons */{
            _0: Curry._1(f, param._0),
            _1: map(f, param._1)
          };
  } else {
    return /* Nil */0;
  }
}

function sum(n) {
  var v = 0;
  for(var i = 0; i <= n; ++i){
    v = v + i | 0;
  }
  return v;
}

function f(x, y, z) {
  return (x + y | 0) + z | 0;
}

function g(x, y) {
  var u = x + y | 0;
  return function (z) {
    return u + z | 0;
  };
}

function g1(x, y) {
  var u = x + y | 0;
  return function (xx, yy) {
    return (xx + yy | 0) + u | 0;
  };
}

var u = 8;

var x = u + 6 | 0;

var u$1 = 7;

function v(param) {
  return (6 + param | 0) + u$1 | 0;
}

var nil = /* Nil */0;

var len = List.length;

exports.fib = fib;
exports.nil = nil;
exports.cons = cons;
exports.map = map;
exports.sum = sum;
exports.len = len;
exports.f = f;
exports.g = g;
exports.g1 = g1;
exports.x = x;
exports.v = v;
/* No side effect */
