'use strict';

var Mt = require("./mt.js");
var Curry = require("melange/lib/js/curry.js");
var Scanf = require("melange/lib/js/scanf.js");
var Mt_global = require("./mt_global.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(f, param) {
  Mt_global.collect_eq(test_id, suites, f, param[0], param[1]);
}

eq("File \"scanf_test.ml\", line 6, characters 5-12", [
      Curry._1(Scanf.sscanf("32 31", /* Format */{
                _0: {
                  TAG: /* Int */4,
                  _0: /* Int_d */0,
                  _1: /* No_padding */0,
                  _2: /* No_precision */0,
                  _3: {
                    TAG: /* Char_literal */12,
                    _0: /* ' ' */32,
                    _1: {
                      TAG: /* Int */4,
                      _0: /* Int_d */0,
                      _1: /* No_padding */0,
                      _2: /* No_precision */0,
                      _3: /* End_of_format */0
                    }
                  }
                },
                _1: "%d %d"
              }), (function (x, y) {
              return x + y | 0;
            })),
      63
    ]);

eq("File \"scanf_test.ml\", line 7, characters 5-12", [
      Curry._1(Scanf.sscanf("12306459064359371967", /* Format */{
                _0: {
                  TAG: /* Int64 */7,
                  _0: /* Int_u */12,
                  _1: /* No_padding */0,
                  _2: /* No_precision */0,
                  _3: /* End_of_format */0
                },
                _1: "%Lu"
              }), (function (i) {
              return i;
            })),
      [
        -1429646511,
        235324607
      ]
    ]);

Mt.from_pair_suites("Scanf_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
/*  Not a pure module */
