'use strict';

var Mt = require("./mt.js");
var List = require("melange/lib/js/list.js");
var Curry = require("melange/lib/js/curry.js");
var Scanf = require("melange/lib/js/scanf.js");
var Format = require("melange/lib/js/format.js");
var Printf = require("melange/lib/js/printf.js");
var Stdlib = require("melange/lib/js/stdlib.js");
var Caml_format = require("melange/lib/js/caml_format.js");
var CamlinternalFormatBasics = require("melange/lib/js/camlinternalFormatBasics.js");

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

function eq3(loc, a, b, c) {
  eq(loc, a, b);
  eq(loc, b, c);
  eq(loc, a, c);
}

function $caret$caret(param, param$1) {
  return /* Format */{
          _0: CamlinternalFormatBasics.concat_fmt(param._0, param$1._0),
          _1: param._1 + ("%," + param$1._1)
        };
}

function u(param) {
  return $caret$caret(/* Format */{
              _0: {
                TAG: /* String_literal */11,
                _0: "xx ",
                _1: {
                  TAG: /* String */2,
                  _0: /* No_padding */0,
                  _1: /* End_of_format */0
                }
              },
              _1: "xx %s"
            }, /* Format */{
              _0: {
                TAG: /* String_literal */11,
                _0: "yy",
                _1: /* End_of_format */0
              },
              _1: "yy"
            });
}

var M = {};

eq("File \"format_test.ml\", line 31, characters 5-12", Curry._1(Format.asprintf(u(undefined)), "x"), "xx xyy");

eq("File \"format_test.ml\", line 32, characters 5-12", Curry._1(Format.asprintf(/* Format */{
              _0: {
                TAG: /* Int32 */5,
                _0: /* Int_d */0,
                _1: /* No_padding */0,
                _2: /* No_precision */0,
                _3: /* End_of_format */0
              },
              _1: "%ld"
            }), -2147483648), "-2147483648");

eq("File \"format_test.ml\", line 33, characters 5-12", Curry._1(Format.asprintf(/* Format */{
              _0: {
                TAG: /* Int */4,
                _0: /* Int_d */0,
                _1: /* No_padding */0,
                _2: /* No_precision */0,
                _3: /* End_of_format */0
              },
              _1: "%d"
            }), -2147483648), "-2147483648");

eq("File \"format_test.ml\", line 38, characters 5-12", 7.875, 7.875);

eq("File \"format_test.ml\", line 41, characters 5-12", -7.875, -7.875);

eq3("File \"format_test.ml\", line 45, characters 6-13", Infinity, Number.POSITIVE_INFINITY, Stdlib.infinity);

eq3("File \"format_test.ml\", line 46, characters 6-13", -Infinity, Number.NEGATIVE_INFINITY, Stdlib.neg_infinity);

eq3("File \"format_test.ml\", line 47, characters 6-13", Stdlib.max_float, 1.79769313486231571e+308, Number.MAX_VALUE);

eq("File \"format_test.ml\", line 48, characters 5-12", Stdlib.classify_float(Infinity), /* FP_infinite */3);

eq("File \"format_test.ml\", line 49, characters 5-12", Stdlib.classify_float(Infinity), /* FP_infinite */3);

eq("File \"format_test.ml\", line 52, characters 5-12", Stdlib.min_float, 2.22507385850720138e-308);

eq("File \"format_test.ml\", line 53, characters 5-12", Stdlib.epsilon_float, 2.22044604925031308e-16);

eq("File \"format_test.ml\", line 54, characters 5-12", 4.94065645841e-324, 5e-324);

eq("File \"format_test.ml\", line 55, characters 5-12", 1.00000000000000022 - 1, Stdlib.epsilon_float);

eq("File \"format_test.ml\", line 57, characters 5-12", 1.11253692925360069e-308 / 2.22507385850720138e-308, 0.5);

eq("File \"format_test.ml\", line 59, characters 5-12", Stdlib.classify_float(1.11253692925360069e-308), /* FP_subnormal */1);

eq("File \"format_test.ml\", line 60, characters 5-12", 1.11253692925360069e-308, 1.11253692925360069e-308);

eq("File \"format_test.ml\", line 62, characters 5-12", 2.22507385850720138e-308, 2.22507385850720138e-308);

eq("File \"format_test.ml\", line 66, characters 5-12", (1 + 255 / 256) * 8, 15.96875);

eq("File \"format_test.ml\", line 69, characters 5-12", (1 + 4095 / 4096) * 8, 15.998046875);

eq("File \"format_test.ml\", line 72, characters 5-12", (1 + 65535 / 65536) * 8, 15.9998779296875);

function f(loc, ls) {
  List.iter((function (param) {
          eq(loc, Caml_format.caml_float_of_string(param[0]), param[1]);
        }), ls);
}

f("File \"format_test.ml\", line 85, characters 6-13", {
      hd: [
        "0x3.fp+1",
        7.875
      ],
      tl: {
        hd: [
          " 0x3.fp2",
          15.75
        ],
        tl: {
          hd: [
            " 0x4.fp2",
            19.75
          ],
          tl: /* [] */0
        }
      }
    });

function sl(f) {
  return Curry._1(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* Float */8,
                    _0: [
                      /* Float_flag_ */0,
                      /* Float_h */6
                    ],
                    _1: /* No_padding */0,
                    _2: /* No_precision */0,
                    _3: /* End_of_format */0
                  },
                  _1: "%h"
                }), f);
}

function aux_list(loc, ls) {
  List.iter((function (param) {
          eq(loc, sl(param[0]), param[1]);
        }), ls);
}

var literals_0 = [
  7.875,
  "0x1.f8p+2"
];

var literals_1 = {
  hd: [
    0.3,
    "0x1.3333333333333p-2"
  ],
  tl: {
    hd: [
      Stdlib.infinity,
      "infinity"
    ],
    tl: {
      hd: [
        0.4,
        "0x1.999999999999ap-2"
      ],
      tl: {
        hd: [
          0.5,
          "0x1p-1"
        ],
        tl: {
          hd: [
            0.6,
            "0x1.3333333333333p-1"
          ],
          tl: {
            hd: [
              0.7,
              "0x1.6666666666666p-1"
            ],
            tl: {
              hd: [
                0.8,
                "0x1.999999999999ap-1"
              ],
              tl: {
                hd: [
                  0.9,
                  "0x1.ccccccccccccdp-1"
                ],
                tl: /* [] */0
              }
            }
          }
        }
      }
    }
  }
};

var literals = {
  hd: literals_0,
  tl: literals_1
};

aux_list("File \"format_test.ml\", line 117, characters 11-18", literals);

eq("File \"format_test.ml\", line 120, characters 5-12", Curry._1(Printf.sprintf(/* Format */{
              _0: {
                TAG: /* Float */8,
                _0: [
                  /* Float_flag_ */0,
                  /* Float_H */7
                ],
                _1: /* No_padding */0,
                _2: /* No_precision */0,
                _3: /* End_of_format */0
              },
              _1: "%H"
            }), 7.875), "0X1.F8P+2");

function scan_float(loc, s, expect) {
  Curry._1(Scanf.sscanf(s, /* Format */{
            _0: {
              TAG: /* Float */8,
              _0: [
                /* Float_flag_ */0,
                /* Float_h */6
              ],
              _1: /* No_padding */0,
              _2: /* No_precision */0,
              _3: /* End_of_format */0
            },
            _1: "%h"
          }), (function (result) {
          eq(loc, result, expect);
        }));
}

scan_float("File \"format_test.ml\", line 125, characters 13-20", "0x3f.p1", 126);

scan_float("File \"format_test.ml\", line 126, characters 13-20", "0x1.3333333333333p-2", 0.3);

List.iter((function (param) {
        scan_float("File \"format_test.ml\", line 128, characters 13-20", param[1], param[0]);
      }), literals);

Mt.from_pair_suites("Format_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.eq3 = eq3;
exports.$caret$caret = $caret$caret;
exports.u = u;
exports.M = M;
exports.f = f;
exports.sl = sl;
exports.aux_list = aux_list;
exports.literals = literals;
exports.scan_float = scan_float;
/*  Not a pure module */
