'use strict';

var Mt = require("./mt.js");
var Curry = require("melange/lib/js/curry.js");
var Caml_obj = require("melange/lib/js/caml_obj.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eqs(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

function eq(param, param$1) {
  var x = param.contents;
  var y = param$1.contents;
  return x === y;
}

function eq2(x, param) {
  var y = param.contents;
  return Caml_obj.caml_equal(x.contents, y);
}

eqs("File \"mutable_uncurry_test.ml\", line 15, characters 7-14", false, eq({
          contents: 1
        }, {
          contents: 2
        }));

eqs("File \"mutable_uncurry_test.ml\", line 16, characters 7-14", true, eq({
          contents: 2
        }, {
          contents: 2
        }));

var u = {
  hi: (function (param, param$1) {
      var x = param.contents;
      var y = param$1.contents;
      return x === y;
    })
};

var h = u.hi({
      contents: 1
    }, {
      contents: 2
    });

eqs("File \"mutable_uncurry_test.ml\", line 26, characters 7-14", h, false);

function ut3(param, param$1, param$2) {
  var x0 = param.contents;
  var x1 = param$1.contents;
  var x2 = param$2.contents;
  return [
          x0,
          x1,
          x2
        ];
}

function t3(param) {
  var x0 = param.contents;
  return function (param) {
    var x1 = param.contents;
    return function (param) {
      var x2 = param.contents;
      return [
              x0,
              x1,
              x2
            ];
    };
  };
}

function ut4(param, param$1, param$2, param$3) {
  var x0 = param.contents;
  var x1 = param$1.contents;
  return Curry._2((function (param) {
                var x2 = param.contents;
                return function (param) {
                  var x3 = param.contents;
                  return [
                          x0,
                          x1,
                          x2,
                          x3
                        ];
                };
              }), param$2, param$3);
}

function t4(param) {
  var x0 = param.contents;
  return function (param) {
    var x1 = param.contents;
    return function (param) {
      var x2 = param.contents;
      return function (param) {
        var x3 = param.contents;
        return [
                x0,
                x1,
                x2,
                x3
              ];
      };
    };
  };
}

function ut5(param, param$1, param$2, param$3, param$4) {
  var x0 = param.contents;
  var x1 = param$1.contents;
  return Curry._3((function (param) {
                var x2 = param.contents;
                return function (param) {
                  var x3 = param.contents;
                  return function (param) {
                    var x4 = param.contents;
                    return [
                            x0,
                            x1,
                            x2,
                            x3,
                            x4
                          ];
                  };
                };
              }), param$2, param$3, param$4);
}

function t5(param) {
  var x0 = param.contents;
  return function (param) {
    var x1 = param.contents;
    return function (param) {
      var x2 = param.contents;
      return function (param) {
        var x3 = param.contents;
        return function (param) {
          var x4 = param.contents;
          return [
                  x0,
                  x1,
                  x2,
                  x3,
                  x4
                ];
        };
      };
    };
  };
}

function nested0(param, param$1, param$2) {
  var x0 = param.contents;
  var x1 = param$1.contents;
  var x2 = param$2.contents;
  var a = (x0 + x1 | 0) + x2 | 0;
  return function (param) {
    var x0 = param.contents;
    return function (param) {
      var x1 = param.contents;
      return function (param) {
        var x2 = param.contents;
        return ((a + x0 | 0) + x1 | 0) + x2 | 0;
      };
    };
  };
}

function nested1(param) {
  var x0 = param.contents;
  return function (param) {
    var x1 = param.contents;
    return function (param) {
      var x2 = param.contents;
      var a = (x0 + x1 | 0) + x2 | 0;
      return function (param, param$1, param$2) {
        var x0 = param.contents;
        var x1 = param$1.contents;
        var x2 = param$2.contents;
        return ((a + x0 | 0) + x1 | 0) + x2 | 0;
      };
    };
  };
}

eqs("File \"mutable_uncurry_test.ml\", line 56, characters 9-16", ut3({
          contents: 1
        }, {
          contents: 2
        }, {
          contents: 3
        }), [
      1,
      2,
      3
    ]);

eqs("File \"mutable_uncurry_test.ml\", line 57, characters 7-14", Curry._1(t3({
                contents: 1
              })({
              contents: 2
            }), {
          contents: 3
        }), [
      1,
      2,
      3
    ]);

eqs("File \"mutable_uncurry_test.ml\", line 59, characters 7-14", ut5({
          contents: 1
        }, {
          contents: 2
        }, {
          contents: 3
        }, {
          contents: 1
        }, {
          contents: 1
        }), [
      1,
      2,
      3,
      1,
      1
    ]);

Mt.from_pair_suites("mutable_uncurry_test.ml", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eqs = eqs;
exports.eq = eq;
exports.eq2 = eq2;
exports.u = u;
exports.h = h;
exports.ut3 = ut3;
exports.t3 = t3;
exports.ut4 = ut4;
exports.t4 = t4;
exports.ut5 = ut5;
exports.t5 = t5;
exports.nested0 = nested0;
exports.nested1 = nested1;
/*  Not a pure module */
