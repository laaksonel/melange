'use strict';

var Mt = require("./mt.js");
var Caml = require("melange/lib/js/caml.js");
var Curry = require("melange/lib/js/curry.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(loc, x, y) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + String(test_id.contents)),
      (function (param) {
          return {
                  TAG: /* Eq */0,
                  _0: x,
                  _1: y
                };
        })
    ],
    tl: suites.contents
  };
}

var expected_0 = true === false;

var expected_1 = false === true;

var expected_2 = false === false;

var expected_3 = true === true;

var expected_4 = Caml.caml_int_compare(false, true);

var expected_5 = Caml.caml_int_compare(true, false);

var expected_6 = Caml.caml_int_compare(false, false);

var expected_7 = Caml.caml_int_compare(true, true);

var expected = [
  expected_0,
  expected_1,
  expected_2,
  expected_3,
  expected_4,
  expected_5,
  expected_6,
  expected_7
];

var expected2 = [
  false,
  false,
  true,
  true,
  -1,
  1,
  0,
  0
];

var u_0 = true === false;

var u_1 = false === true;

var u_2 = false === false;

var u_3 = true === true;

var u_4 = Caml.caml_int_compare(false, true);

var u_5 = Caml.caml_int_compare(true, false);

var u_6 = Caml.caml_int_compare(false, false);

var u_7 = Caml.caml_int_compare(true, true);

var u = [
  u_0,
  u_1,
  u_2,
  u_3,
  u_4,
  u_5,
  u_6,
  u_7
];

eq("File \"gpr496_test.ml\", line 42, characters 12-19", expected, u);

eq("File \"gpr496_test.ml\", line 44, characters 12-19", expected, expected2);

function ff(x, y) {
  return Caml.caml_int_min(x, Curry._1(y, undefined));
}

eq("File \"gpr496_test.ml\", line 48, characters 5-12", true < false ? true : false, false);

Mt.from_pair_suites("Gpr496_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.expected = expected;
exports.expected2 = expected2;
exports.u = u;
exports.ff = ff;
/* expected Not a pure module */
