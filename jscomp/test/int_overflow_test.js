'use strict';

var Mt = require("./mt.js");
var Int32 = require("melange/lib/js/int32.js");
var Caml_string = require("melange/lib/js/caml_string.js");

function hash_variant(s) {
  var accu = 0;
  for(var i = 0 ,i_finish = s.length; i < i_finish; ++i){
    accu = Math.imul(223, accu) + Caml_string.get(s, i) & 2147483647;
  }
  if (accu > 1073741823) {
    return accu - -2147483648 | 0;
  } else {
    return accu;
  }
}

function hash_variant2(s) {
  var accu = 0;
  for(var i = 0 ,i_finish = s.length; i < i_finish; ++i){
    accu = Math.imul(223, accu) + Caml_string.get(s, i) | 0;
  }
  accu = accu & 2147483647;
  if (accu > 1073741823) {
    return accu - -2147483648 | 0;
  } else {
    return accu;
  }
}

function fib(n) {
  if (n !== 0 && n !== 1) {
    return fib(n - 1 | 0) + fib(n - 2 | 0) | 0;
  } else {
    return 1;
  }
}

Mt.from_pair_suites("Int_overflow_test", {
      hd: [
        "plus_overflow",
        (function (param) {
            return {
                    TAG: /* Eq */0,
                    _0: true,
                    _1: (Int32.max_int + 1 | 0) === Int32.min_int
                  };
          })
      ],
      tl: {
        hd: [
          "minus_overflow",
          (function (param) {
              return {
                      TAG: /* Eq */0,
                      _0: true,
                      _1: (Int32.min_int - Int32.one | 0) === Int32.max_int
                    };
            })
        ],
        tl: {
          hd: [
            "flow_again",
            (function (param) {
                return {
                        TAG: /* Eq */0,
                        _0: 2147483646,
                        _1: (Int32.max_int + Int32.max_int | 0) + Int32.min_int | 0
                      };
              })
          ],
          tl: {
            hd: [
              "flow_again",
              (function (param) {
                  return {
                          TAG: /* Eq */0,
                          _0: -2,
                          _1: Int32.max_int + Int32.max_int | 0
                        };
                })
            ],
            tl: {
              hd: [
                "hash_test",
                (function (param) {
                    return {
                            TAG: /* Eq */0,
                            _0: hash_variant("xxyyzzuuxxzzyy00112233"),
                            _1: 544087776
                          };
                  })
              ],
              tl: {
                hd: [
                  "hash_test2",
                  (function (param) {
                      return {
                              TAG: /* Eq */0,
                              _0: hash_variant("xxyyzxzzyy"),
                              _1: -449896130
                            };
                    })
                ],
                tl: {
                  hd: [
                    "File \"int_overflow_test.ml\", line 37, characters 2-9",
                    (function (param) {
                        return {
                                TAG: /* Eq */0,
                                _0: hash_variant2("xxyyzzuuxxzzyy00112233"),
                                _1: 544087776
                              };
                      })
                  ],
                  tl: {
                    hd: [
                      "File \"int_overflow_test.ml\", line 38, characters 2-9",
                      (function (param) {
                          return {
                                  TAG: /* Eq */0,
                                  _0: hash_variant2("xxyyzxzzyy"),
                                  _1: -449896130
                                };
                        })
                    ],
                    tl: {
                      hd: [
                        "int_literal_flow",
                        (function (param) {
                            return {
                                    TAG: /* Eq */0,
                                    _0: -1,
                                    _1: -1
                                  };
                          })
                      ],
                      tl: {
                        hd: [
                          "int_literal_flow2",
                          (function (param) {
                              return {
                                      TAG: /* Eq */0,
                                      _0: -1,
                                      _1: -1
                                    };
                            })
                        ],
                        tl: {
                          hd: [
                            "int_literal_flow3",
                            (function (param) {
                                return {
                                        TAG: /* Eq */0,
                                        _0: -1,
                                        _1: -1
                                      };
                              })
                          ],
                          tl: {
                            hd: [
                              "int32_mul",
                              (function (param) {
                                  return {
                                          TAG: /* Eq */0,
                                          _0: -33554431,
                                          _1: -33554431
                                        };
                                })
                            ],
                            tl: {
                              hd: [
                                "File \"int_overflow_test.ml\", line 44, characters 3-10",
                                (function (param) {
                                    return {
                                            TAG: /* Eq */0,
                                            _0: Number("3") | 0,
                                            _1: 3
                                          };
                                  })
                              ],
                              tl: {
                                hd: [
                                  "File \"int_overflow_test.ml\", line 46, characters 3-10",
                                  (function (param) {
                                      return {
                                              TAG: /* Eq */0,
                                              _0: Number("3.2") | 0,
                                              _1: 3
                                            };
                                    })
                                ],
                                tl: /* [] */0
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

exports.hash_variant = hash_variant;
exports.hash_variant2 = hash_variant2;
exports.fib = fib;
/*  Not a pure module */
