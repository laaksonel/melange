'use strict';

var Curry = require("melange/lib/js/curry.js");

function test(g) {
  g.xx(22, 3, "xxx", 1, 2, 3);
}

function test_hi(x) {
  var y = x.hi(1, 2, 3);
  if (y !== null) {
    console.log(y);
    return 2;
  } else {
    return 1;
  }
}

function test_hi__2(x) {
  var match = x.hi__2();
  if (match == null) {
    return 1;
  } else {
    return 2;
  }
}

function test_cb(x) {
  Curry._1(x.cb("hI", 1, 2, 3), 3);
  Curry._1(x.cb("hI", 1, 2, 3), 3);
  return x.cb2("hI", 1, 2, 3)(3);
}

function f(x) {
  v(x);
}

function testUndefined(param) {
  return say(1, 2, [undefined,undefined]);
}

exports.test = test;
exports.test_hi = test_hi;
exports.test_hi__2 = test_hi__2;
exports.test_cb = test_cb;
exports.f = f;
exports.testUndefined = testUndefined;
/* No side effect */
