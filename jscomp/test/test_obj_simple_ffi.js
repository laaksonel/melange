'use strict';

var Caml_option = require("melange/lib/js/caml_option.js");

function v(displayName, param) {
  var tmp = {
    test: 3,
    config: 3,
    hi: "ghos"
  };
  if (displayName !== undefined) {
    tmp.displayName = Caml_option.valFromOption(displayName);
  }
  return tmp;
}

var v2 = {
  test: 3,
  config: 3,
  hi: "ghos"
};

var v3 = {
  displayName: "display",
  test: 3,
  config: 3,
  hi: "ghos"
};

function u(x) {
  return x;
}

function ff(x) {
  return x;
}

function fff(x) {
  return x;
}

function f(x) {
  return x;
}

exports.v = v;
exports.v2 = v2;
exports.v3 = v3;
exports.u = u;
exports.ff = ff;
exports.fff = fff;
exports.f = f;
/* No side effect */
