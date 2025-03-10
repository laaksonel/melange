'use strict';

var Mt = require("./mt.js");
var $$Array = require("melange/lib/js/array.js");
var Curry = require("melange/lib/js/curry.js");
var Int32 = require("melange/lib/js/int32.js");
var Format = require("melange/lib/js/format.js");
var Stdlib = require("melange/lib/js/stdlib.js");
var Caml_float = require("melange/lib/js/caml_float.js");
var Ext_array_test = require("./ext_array_test.js");

function f(x) {
  return [
          x,
          (x >>> 1),
          (x >>> 2)
        ];
}

var shift_right_logical_tests_0 = $$Array.map((function (x) {
        return (-1 >>> x) | 0;
      }), Ext_array_test.range(0, 31));

var shift_right_logical_tests_1 = [
  -1,
  2147483647,
  1073741823,
  536870911,
  268435455,
  134217727,
  67108863,
  33554431,
  16777215,
  8388607,
  4194303,
  2097151,
  1048575,
  524287,
  262143,
  131071,
  65535,
  32767,
  16383,
  8191,
  4095,
  2047,
  1023,
  511,
  255,
  127,
  63,
  31,
  15,
  7,
  3,
  1
];

var shift_right_logical_tests = [
  shift_right_logical_tests_0,
  shift_right_logical_tests_1
];

var shift_right_tests_0 = $$Array.map((function (x) {
        return (Int32.min_int >> x);
      }), Ext_array_test.range(0, 31));

var shift_right_tests_1 = [
  -2147483648,
  -1073741824,
  -536870912,
  -268435456,
  -134217728,
  -67108864,
  -33554432,
  -16777216,
  -8388608,
  -4194304,
  -2097152,
  -1048576,
  -524288,
  -262144,
  -131072,
  -65536,
  -32768,
  -16384,
  -8192,
  -4096,
  -2048,
  -1024,
  -512,
  -256,
  -128,
  -64,
  -32,
  -16,
  -8,
  -4,
  -2,
  -1
];

var shift_right_tests = [
  shift_right_tests_0,
  shift_right_tests_1
];

var shift_left_tests_0 = $$Array.map((function (x) {
        return (1 << x);
      }), Ext_array_test.range(0, 31));

var shift_left_tests_1 = [
  1,
  2,
  4,
  8,
  16,
  32,
  64,
  128,
  256,
  512,
  1024,
  2048,
  4096,
  8192,
  16384,
  32768,
  65536,
  131072,
  262144,
  524288,
  1048576,
  2097152,
  4194304,
  8388608,
  16777216,
  33554432,
  67108864,
  134217728,
  268435456,
  536870912,
  1073741824,
  -2147483648
];

var shift_left_tests = [
  shift_left_tests_0,
  shift_left_tests_1
];

function $star$tilde(prim0, prim1) {
  return Math.imul(prim0, prim1);
}

var suites = {
  contents: Stdlib.$at({
        hd: [
          "File \"int32_test.ml\", line 31, characters 2-9",
          (function (param) {
              return {
                      TAG: /* Eq */0,
                      _0: 1,
                      _1: 1
                    };
            })
        ],
        tl: {
          hd: [
            "File \"int32_test.ml\", line 32, characters 2-9",
            (function (param) {
                return {
                        TAG: /* Eq */0,
                        _0: -2147483647,
                        _1: -2147483647
                      };
              })
          ],
          tl: /* [] */0
        }
      }, Stdlib.$at($$Array.to_list(Ext_array_test.map2i((function (i, a, b) {
                      return [
                              Curry._1(Format.asprintf(/* Format */{
                                        _0: {
                                          TAG: /* String_literal */11,
                                          _0: "shift_right_logical_cases ",
                                          _1: {
                                            TAG: /* Int */4,
                                            _0: /* Int_d */0,
                                            _1: /* No_padding */0,
                                            _2: /* No_precision */0,
                                            _3: /* End_of_format */0
                                          }
                                        },
                                        _1: "shift_right_logical_cases %d"
                                      }), i),
                              (function (param) {
                                  return {
                                          TAG: /* Eq */0,
                                          _0: a,
                                          _1: b
                                        };
                                })
                            ];
                    }), shift_right_logical_tests_0, shift_right_logical_tests_1)), Stdlib.$at($$Array.to_list(Ext_array_test.map2i((function (i, a, b) {
                          return [
                                  Curry._1(Format.asprintf(/* Format */{
                                            _0: {
                                              TAG: /* String_literal */11,
                                              _0: "shift_right_cases ",
                                              _1: {
                                                TAG: /* Int */4,
                                                _0: /* Int_d */0,
                                                _1: /* No_padding */0,
                                                _2: /* No_precision */0,
                                                _3: /* End_of_format */0
                                              }
                                            },
                                            _1: "shift_right_cases %d"
                                          }), i),
                                  (function (param) {
                                      return {
                                              TAG: /* Eq */0,
                                              _0: a,
                                              _1: b
                                            };
                                    })
                                ];
                        }), shift_right_tests_0, shift_right_tests_1)), $$Array.to_list(Ext_array_test.map2i((function (i, a, b) {
                          return [
                                  Curry._1(Format.asprintf(/* Format */{
                                            _0: {
                                              TAG: /* String_literal */11,
                                              _0: "shift_left_cases ",
                                              _1: {
                                                TAG: /* Int */4,
                                                _0: /* Int_d */0,
                                                _1: /* No_padding */0,
                                                _2: /* No_precision */0,
                                                _3: /* End_of_format */0
                                              }
                                            },
                                            _1: "shift_left_cases %d"
                                          }), i),
                                  (function (param) {
                                      return {
                                              TAG: /* Eq */0,
                                              _0: a,
                                              _1: b
                                            };
                                    })
                                ];
                        }), shift_left_tests_0, shift_left_tests_1)))))
};

var test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

eq("File \"int32_test.ml\", line 47, characters 5-12", Caml_float.caml_int32_bits_of_float(0.3), 1050253722);

eq("File \"int32_test.ml\", line 48, characters 5-12", Caml_float.caml_int32_float_of_bits(1050253722), 0.300000011920928955);

Mt.from_pair_suites("Int32_test", suites.contents);

var test_div = 30;

exports.f = f;
exports.shift_right_logical_tests = shift_right_logical_tests;
exports.shift_right_tests = shift_right_tests;
exports.shift_left_tests = shift_left_tests;
exports.test_div = test_div;
exports.$star$tilde = $star$tilde;
exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
/* shift_right_logical_tests Not a pure module */
