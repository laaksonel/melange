'use strict';

var Mt = require("./mt.js");
var Int32 = require("melange/lib/js/int32.js");
var Stdlib = require("melange/lib/js/stdlib.js");

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

eq("File \"limits_test.ml\", line 10, characters 5-12", Stdlib.max_int, 2147483647);

eq("File \"limits_test.ml\", line 11, characters 5-12", Stdlib.min_int, -2147483648);

eq("File \"limits_test.ml\", line 12, characters 5-12", Int32.max_int, 2147483647);

eq("File \"limits_test.ml\", line 13, characters 5-12", Int32.min_int, -2147483648);

Mt.from_pair_suites("Limits_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
/*  Not a pure module */
