'use strict';

var Mt = require("./mt.js");
var Curry = require("melange/lib/js/curry.js");

var v = {
  syntax: undefined,
  imports: 0,
  file_options: 0,
  package: 0,
  messages: 0,
  enums: 0,
  extends: 0
};

var u_v = {
  syntax: undefined,
  imports: 0,
  file_options: 0,
  package: 0,
  messages: 0,
  enums: 0,
  extends: 0
};

function f(g, h) {
  var init = Curry._1(g, h);
  return {
          syntax: init.syntax,
          imports: 0,
          file_options: init.file_options,
          package: init.package,
          messages: init.messages,
          enums: init.enums,
          extends: init.extends
        };
}

var suites_0 = [
  "eq_with",
  (function (param) {
      return {
              TAG: /* Eq */0,
              _0: v,
              _1: u_v
            };
    })
];

var suites = {
  hd: suites_0,
  tl: /* [] */0
};

Mt.from_pair_suites("Record_with_test", suites);

var uv = {
  syntax: undefined,
  imports: 1,
  file_options: 0,
  package: 0,
  messages: 0,
  enums: 0,
  extends: 0
};

exports.v = v;
exports.uv = uv;
exports.u_v = u_v;
exports.f = f;
exports.suites = suites;
/*  Not a pure module */
