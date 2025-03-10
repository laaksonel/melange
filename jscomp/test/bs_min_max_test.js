'use strict';

var Mt = require("./mt.js");
var Caml = require("melange/lib/js/caml.js");
var Caml_obj = require("melange/lib/js/caml_obj.js");
var Caml_int64 = require("melange/lib/js/caml_int64.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

function b(param, param$1) {
  return Mt.bool_suites(test_id, suites, param, param$1);
}

function f(x, y) {
  return Caml.caml_int_compare(x + y | 0, y + x | 0);
}

function f2(x, y) {
  return Caml.caml_int_compare(x + y | 0, y);
}

var f3 = Caml.caml_int_compare;

function f4(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

var f5_min = Caml_obj.caml_min;

var f5_max = Caml_obj.caml_max;

b("File \"bs_min_max_test.ml\", line 28, characters 4-11", Caml.i64_eq(Caml.i64_min(Caml_int64.zero, Caml_int64.one), Caml_int64.zero));

b("File \"bs_min_max_test.ml\", line 29, characters 4-11", Caml.i64_eq(Caml.i64_max([
              0,
              22
            ], Caml_int64.one), [
          0,
          22
        ]));

b("File \"bs_min_max_test.ml\", line 30, characters 4-11", Caml.i64_eq(Caml.i64_max([
              -1,
              4294967293
            ], [
              0,
              3
            ]), [
          0,
          3
        ]));

eq("File \"bs_min_max_test.ml\", line 31, characters 5-12", Caml_obj.caml_min(undefined, 3), undefined);

eq("File \"bs_min_max_test.ml\", line 32, characters 5-12", Caml_obj.caml_min(3, undefined), undefined);

eq("File \"bs_min_max_test.ml\", line 33, characters 5-12", Caml_obj.caml_max(3, undefined), 3);

eq("File \"bs_min_max_test.ml\", line 34, characters 5-12", Caml_obj.caml_max(undefined, 3), 3);

b("File \"bs_min_max_test.ml\", line 35, characters 4-11", Caml_obj.caml_greaterequal(5, undefined));

b("File \"bs_min_max_test.ml\", line 36, characters 4-11", Caml_obj.caml_lessequal(undefined, 5));

b("File \"bs_min_max_test.ml\", line 37, characters 4-11", undefined !== 5);

b("File \"bs_min_max_test.ml\", line 38, characters 4-11", undefined !== 5);

Mt.from_pair_suites("Bs_min_max_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.b = b;
exports.f = f;
exports.f2 = f2;
exports.f3 = f3;
exports.f4 = f4;
exports.f5_min = f5_min;
exports.f5_max = f5_max;
/*  Not a pure module */
