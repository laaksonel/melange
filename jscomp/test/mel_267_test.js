'use strict';

var Curry = require("melange/lib/js/curry.js");

function i(obj, s) {
  return Curry._1(obj.prop, s);
}

function f(obj, s) {
  var p = obj.prop;
  return Curry._1(p, s);
}

exports.i = i;
exports.f = f;
/* No side effect */
