'use strict';

var Mt = require("./mt.js");
var Int64 = require("melange/lib/js/int64.js");
var Caml_format = require("melange/lib/js/caml_format.js");

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

function id(x) {
  return Caml_format.caml_int64_of_string(Caml_format.caml_int64_format("%d", x));
}

var i = [
  2074848171,
  2880154539
];

var s = Caml_format.caml_int64_format("%d", i);

var i$p = Caml_format.caml_int64_of_string(s);

eq("File \"gpr_1503_test.ml\", line 18, characters 5-12", i, i$p);

eq("File \"gpr_1503_test.ml\", line 21, characters 7-14", Int64.max_int, Caml_format.caml_int64_of_string(Caml_format.caml_int64_format("%d", Int64.max_int)));

eq("File \"gpr_1503_test.ml\", line 22, characters 7-14", Int64.min_int, Caml_format.caml_int64_of_string(Caml_format.caml_int64_format("%d", Int64.min_int)));

Mt.from_pair_suites("Gpr_1503_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.id = id;
/* s Not a pure module */
