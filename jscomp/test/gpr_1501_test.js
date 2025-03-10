'use strict';

var Mt = require("./mt.js");
var Stdlib = require("melange/lib/js/stdlib.js");
var Printexc = require("melange/lib/js/printexc.js");
var Caml_exceptions = require("melange/lib/js/caml_exceptions.js");

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

var A = /* @__PURE__ */Caml_exceptions.create("Gpr_1501_test.A");

var B = /* @__PURE__ */Caml_exceptions.create("Gpr_1501_test.B");

eq("File \"gpr_1501_test.ml\", line 15, characters 7-14", "Not_found", Printexc.to_string({
          RE_EXN_ID: Stdlib.Not_found
        }));

eq("File \"gpr_1501_test.ml\", line 16, characters 7-14", /Gpr_1501_test.A\/[0-9]+/.test(Printexc.to_string({
              RE_EXN_ID: A
            })), true);

eq("File \"gpr_1501_test.ml\", line 19, characters 7-14", /Gpr_1501_test.B\/[0-9]+\(1\)/.test(Printexc.to_string({
              RE_EXN_ID: B,
              _1: 1
            })), true);

Mt.from_pair_suites("Gpr_1501_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.A = A;
exports.B = B;
/*  Not a pure module */
