'use strict';

var Curry = require("melange/lib/js/curry.js");
var Caml_array = require("melange/lib/js/caml_array.js");

function f(_n, _acc) {
  while(true) {
    var acc = _acc;
    var n = _n;
    if (n === 0) {
      return Curry._1(acc, undefined);
    }
    _acc = (function(n,acc){
    return function (param) {
      console.log(String(n));
      return Curry._1(acc, undefined);
    }
    }(n,acc));
    _n = n - 1 | 0;
    continue ;
  };
}

function test_closure(param) {
  var arr = Caml_array.make(6, (function (x) {
          return x;
        }));
  for(var i = 0; i <= 6; ++i){
    Caml_array.set(arr, i, (function(i){
        return function (param) {
          return i;
        }
        }(i)));
  }
  return arr;
}

f(10, (function (param) {
        
      }));

exports.f = f;
exports.test_closure = test_closure;
/*  Not a pure module */
