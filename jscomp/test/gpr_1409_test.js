'use strict';

var Mt = require("./mt.js");
var $$Array = require("melange/lib/js/array.js");
var Curry = require("melange/lib/js/curry.js");
var String_set = require("./string_set.js");
var Caml_option = require("melange/lib/js/caml_option.js");

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

var a = {};

var b = {
  foo: "42"
};

function map(f, x) {
  if (x !== undefined) {
    return Caml_option.some(Curry._1(f, Caml_option.valFromOption(x)));
  }
  
}

function make(foo) {
  var partial_arg = map((function (prim) {
          return String(prim);
        }), foo);
  return function (param) {
    var tmp = {};
    if (partial_arg !== undefined) {
      tmp.foo = Caml_option.valFromOption(partial_arg);
    }
    return tmp;
  };
}

var a_ = make(undefined)(undefined);

var b_ = make(42)(undefined);

eq("File \"gpr_1409_test.ml\", line 30, characters 6-13", b_.foo, "42");

console.log(Object.keys(a_));

console.log(a, b, a_, b_);

eq("File \"gpr_1409_test.ml\", line 36, characters 6-13", Object.keys(a_).length, 0);

var test2 = {
  hi: 2
};

function test3(_open, xx__hi) {
  var tmp = {
    hi: 2
  };
  if (_open !== undefined) {
    tmp.open = Caml_option.valFromOption(_open);
  }
  if (xx__hi !== undefined) {
    tmp.xx = Caml_option.valFromOption(xx__hi);
  }
  return tmp;
}

function test4(_open, xx__hi) {
  console.log("no inlin");
  var tmp = {
    open: _open,
    hi: 2
  };
  if (xx__hi !== undefined) {
    tmp.xx = Caml_option.valFromOption(xx__hi);
  }
  return tmp;
}

function test5(f, x) {
  console.log("no inline");
  var tmp = {
    hi: 2
  };
  var tmp$1 = Curry._1(f, x);
  if (tmp$1 !== undefined) {
    tmp.open = Caml_option.valFromOption(tmp$1);
  }
  var tmp$2 = Curry._1(f, x);
  if (tmp$2 !== undefined) {
    tmp.xx = Caml_option.valFromOption(tmp$2);
  }
  return tmp;
}

function test6(f, x) {
  console.log("no inline");
  var x$1 = {
    contents: 3
  };
  var tmp = {
    hi: 2
  };
  var tmp$1 = (x$1.contents = x$1.contents + 1 | 0, x$1.contents);
  if (tmp$1 !== undefined) {
    tmp.open = Caml_option.valFromOption(tmp$1);
  }
  var tmp$2 = f(x$1);
  if (tmp$2 !== undefined) {
    tmp.xx = Caml_option.valFromOption(tmp$2);
  }
  return tmp;
}

function keys(xs, ys) {
  return String_set.equal(String_set.of_list(xs), String_set.of_list($$Array.to_list(ys)));
}

eq("File \"gpr_1409_test.ml\", line 69, characters 6-13", keys({
          hd: "hi",
          tl: /* [] */0
        }, Object.keys(test3(undefined, undefined))), true);

eq("File \"gpr_1409_test.ml\", line 71, characters 6-13", keys({
          hd: "hi",
          tl: {
            hd: "open",
            tl: /* [] */0
          }
        }, Object.keys(test3(2, undefined))), true);

eq("File \"gpr_1409_test.ml\", line 73, characters 6-13", keys({
          hd: "hi",
          tl: {
            hd: "open",
            tl: {
              hd: "xx",
              tl: /* [] */0
            }
          }
        }, Object.keys(test3(2, 2))), true);

Mt.from_pair_suites("Gpr_1409_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.a = a;
exports.b = b;
exports.map = map;
exports.make = make;
exports.a_ = a_;
exports.b_ = b_;
exports.test2 = test2;
exports.test3 = test3;
exports.test4 = test4;
exports.test5 = test5;
exports.test6 = test6;
exports.keys = keys;
/* a_ Not a pure module */
