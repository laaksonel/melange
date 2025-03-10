'use strict';

var Mt = require("./mt.js");
var Curry = require("melange/lib/js/curry.js");
var Caml_obj = require("melange/lib/js/caml_obj.js");
var Belt_Array = require("melange/lib/js/belt_Array.js");
var Belt_MutableQueue = require("melange/lib/js/belt_MutableQueue.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

function b(loc, x) {
  Mt.bool_suites(test_id, suites, loc, x);
}

function does_raise(f, q) {
  try {
    Curry._1(f, q);
    return false;
  }
  catch (exn){
    return true;
  }
}

function $plus$plus(q, x) {
  Belt_MutableQueue.add(q, x);
  return q;
}

var q = {
  length: 0,
  first: undefined,
  last: undefined
};

if (!(Caml_obj.caml_equal(Belt_MutableQueue.toArray(q), []) && q.length === 0)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          21,
          2
        ],
        Error: new Error()
      };
}

if (!(Caml_obj.caml_equal(Belt_MutableQueue.toArray((Belt_MutableQueue.add(q, 1), q)), [1]) && q.length === 1)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          22,
          2
        ],
        Error: new Error()
      };
}

if (!(Caml_obj.caml_equal(Belt_MutableQueue.toArray((Belt_MutableQueue.add(q, 2), q)), [
          1,
          2
        ]) && q.length === 2)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          23,
          2
        ],
        Error: new Error()
      };
}

if (!(Caml_obj.caml_equal(Belt_MutableQueue.toArray((Belt_MutableQueue.add(q, 3), q)), [
          1,
          2,
          3
        ]) && q.length === 3)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          24,
          2
        ],
        Error: new Error()
      };
}

if (!(Caml_obj.caml_equal(Belt_MutableQueue.toArray((Belt_MutableQueue.add(q, 4), q)), [
          1,
          2,
          3,
          4
        ]) && q.length === 4)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          25,
          2
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.popExn(q) !== 1) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          26,
          2
        ],
        Error: new Error()
      };
}

if (!(Caml_obj.caml_equal(Belt_MutableQueue.toArray(q), [
          2,
          3,
          4
        ]) && q.length === 3)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          26,
          27
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.popExn(q) !== 2) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          27,
          2
        ],
        Error: new Error()
      };
}

if (!(Caml_obj.caml_equal(Belt_MutableQueue.toArray(q), [
          3,
          4
        ]) && q.length === 2)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          27,
          27
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.popExn(q) !== 3) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          28,
          2
        ],
        Error: new Error()
      };
}

if (!(Caml_obj.caml_equal(Belt_MutableQueue.toArray(q), [4]) && q.length === 1)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          28,
          27
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.popExn(q) !== 4) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          29,
          2
        ],
        Error: new Error()
      };
}

if (!(Caml_obj.caml_equal(Belt_MutableQueue.toArray(q), []) && q.length === 0)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          29,
          27
        ],
        Error: new Error()
      };
}

if (!does_raise(Belt_MutableQueue.popExn, q)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          30,
          2
        ],
        Error: new Error()
      };
}

var q$1 = {
  length: 0,
  first: undefined,
  last: undefined
};

if (Belt_MutableQueue.popExn((Belt_MutableQueue.add(q$1, 1), q$1)) !== 1) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          35,
          2
        ],
        Error: new Error()
      };
}

if (!does_raise(Belt_MutableQueue.popExn, q$1)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          35,
          34
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.popExn((Belt_MutableQueue.add(q$1, 2), q$1)) !== 2) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          36,
          2
        ],
        Error: new Error()
      };
}

if (!does_raise(Belt_MutableQueue.popExn, q$1)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          36,
          34
        ],
        Error: new Error()
      };
}

if (q$1.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          37,
          2
        ],
        Error: new Error()
      };
}

var q$2 = {
  length: 0,
  first: undefined,
  last: undefined
};

if (Belt_MutableQueue.peekExn((Belt_MutableQueue.add(q$2, 1), q$2)) !== 1) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          42,
          2
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.peekExn((Belt_MutableQueue.add(q$2, 2), q$2)) !== 1) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          43,
          2
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.peekExn((Belt_MutableQueue.add(q$2, 3), q$2)) !== 1) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          44,
          2
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.peekExn(q$2) !== 1) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          45,
          2
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.popExn(q$2) !== 1) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          45,
          28
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.peekExn(q$2) !== 2) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          46,
          2
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.popExn(q$2) !== 2) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          46,
          28
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.peekExn(q$2) !== 3) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          47,
          2
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.popExn(q$2) !== 3) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          47,
          28
        ],
        Error: new Error()
      };
}

if (!does_raise(Belt_MutableQueue.peekExn, q$2)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          48,
          2
        ],
        Error: new Error()
      };
}

if (!does_raise(Belt_MutableQueue.peekExn, q$2)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          49,
          2
        ],
        Error: new Error()
      };
}

var q$3 = {
  length: 0,
  first: undefined,
  last: undefined
};

for(var i = 1; i <= 10; ++i){
  Belt_MutableQueue.add(q$3, i);
}

Belt_MutableQueue.clear(q$3);

if (q$3.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          56,
          2
        ],
        Error: new Error()
      };
}

if (!does_raise(Belt_MutableQueue.popExn, q$3)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          57,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(q$3, {
        length: 0,
        first: undefined,
        last: undefined
      })) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          58,
          2
        ],
        Error: new Error()
      };
}

Belt_MutableQueue.add(q$3, 42);

if (Belt_MutableQueue.popExn(q$3) !== 42) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          60,
          2
        ],
        Error: new Error()
      };
}

var q1 = {
  length: 0,
  first: undefined,
  last: undefined
};

for(var i$1 = 1; i$1 <= 10; ++i$1){
  Belt_MutableQueue.add(q1, i$1);
}

var q2 = Belt_MutableQueue.copy(q1);

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q1), [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          67,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q2), [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          68,
          2
        ],
        Error: new Error()
      };
}

if (q1.length !== 10) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          69,
          2
        ],
        Error: new Error()
      };
}

if (q2.length !== 10) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          70,
          2
        ],
        Error: new Error()
      };
}

for(var i$2 = 1; i$2 <= 10; ++i$2){
  if (Belt_MutableQueue.popExn(q1) !== i$2) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "bs_queue_test.ml",
            72,
            4
          ],
          Error: new Error()
        };
  }
  
}

for(var i$3 = 1; i$3 <= 10; ++i$3){
  if (Belt_MutableQueue.popExn(q2) !== i$3) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "bs_queue_test.ml",
            75,
            4
          ],
          Error: new Error()
        };
  }
  
}

var q$4 = {
  length: 0,
  first: undefined,
  last: undefined
};

if (q$4.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          81,
          2
        ],
        Error: new Error()
      };
}

for(var i$4 = 1; i$4 <= 10; ++i$4){
  Belt_MutableQueue.add(q$4, i$4);
  if (q$4.length !== i$4) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "bs_queue_test.ml",
            84,
            4
          ],
          Error: new Error()
        };
  }
  if (q$4.length === 0) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "bs_queue_test.ml",
            85,
            4
          ],
          Error: new Error()
        };
  }
  
}

for(var i$5 = 10; i$5 >= 1; --i$5){
  if (q$4.length !== i$5) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "bs_queue_test.ml",
            88,
            4
          ],
          Error: new Error()
        };
  }
  if (q$4.length === 0) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "bs_queue_test.ml",
            89,
            4
          ],
          Error: new Error()
        };
  }
  Belt_MutableQueue.popExn(q$4);
}

if (q$4.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          92,
          2
        ],
        Error: new Error()
      };
}

if (q$4.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          93,
          2
        ],
        Error: new Error()
      };
}

var q$5 = {
  length: 0,
  first: undefined,
  last: undefined
};

for(var i$6 = 1; i$6 <= 10; ++i$6){
  Belt_MutableQueue.add(q$5, i$6);
}

var i$7 = {
  contents: 1
};

Belt_MutableQueue.forEach(q$5, (function (j) {
        if (i$7.contents !== j) {
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "bs_queue_test.ml",
                  100,
                  24
                ],
                Error: new Error()
              };
        }
        i$7.contents = i$7.contents + 1 | 0;
      }));

var q1$1 = {
  length: 0,
  first: undefined,
  last: undefined
};

var q2$1 = {
  length: 0,
  first: undefined,
  last: undefined
};

if (q1$1.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          105,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q1$1), [])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          105,
          26
        ],
        Error: new Error()
      };
}

if (q2$1.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          106,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q2$1), [])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          106,
          26
        ],
        Error: new Error()
      };
}

Belt_MutableQueue.transfer(q1$1, q2$1);

if (q1$1.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          108,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q1$1), [])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          108,
          26
        ],
        Error: new Error()
      };
}

if (q2$1.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          109,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q2$1), [])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          109,
          26
        ],
        Error: new Error()
      };
}

var q1$2 = {
  length: 0,
  first: undefined,
  last: undefined
};

var q2$2 = {
  length: 0,
  first: undefined,
  last: undefined
};

for(var i$8 = 1; i$8 <= 4; ++i$8){
  Belt_MutableQueue.add(q1$2, i$8);
}

if (q1$2.length !== 4) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          115,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q1$2), [
        1,
        2,
        3,
        4
      ])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          115,
          26
        ],
        Error: new Error()
      };
}

if (q2$2.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          116,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q2$2), [])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          116,
          26
        ],
        Error: new Error()
      };
}

Belt_MutableQueue.transfer(q1$2, q2$2);

if (q1$2.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          118,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q1$2), [])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          118,
          26
        ],
        Error: new Error()
      };
}

if (q2$2.length !== 4) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          119,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q2$2), [
        1,
        2,
        3,
        4
      ])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          119,
          26
        ],
        Error: new Error()
      };
}

var q1$3 = {
  length: 0,
  first: undefined,
  last: undefined
};

var q2$3 = {
  length: 0,
  first: undefined,
  last: undefined
};

for(var i$9 = 5; i$9 <= 8; ++i$9){
  Belt_MutableQueue.add(q2$3, i$9);
}

if (q1$3.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          125,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q1$3), [])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          125,
          26
        ],
        Error: new Error()
      };
}

if (q2$3.length !== 4) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          126,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q2$3), [
        5,
        6,
        7,
        8
      ])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          126,
          26
        ],
        Error: new Error()
      };
}

Belt_MutableQueue.transfer(q1$3, q2$3);

if (q1$3.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          128,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q1$3), [])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          128,
          26
        ],
        Error: new Error()
      };
}

if (q2$3.length !== 4) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          129,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q2$3), [
        5,
        6,
        7,
        8
      ])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          129,
          26
        ],
        Error: new Error()
      };
}

var q1$4 = {
  length: 0,
  first: undefined,
  last: undefined
};

var q2$4 = {
  length: 0,
  first: undefined,
  last: undefined
};

for(var i$10 = 1; i$10 <= 4; ++i$10){
  Belt_MutableQueue.add(q1$4, i$10);
}

for(var i$11 = 5; i$11 <= 8; ++i$11){
  Belt_MutableQueue.add(q2$4, i$11);
}

if (q1$4.length !== 4) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          136,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q1$4), [
        1,
        2,
        3,
        4
      ])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          136,
          26
        ],
        Error: new Error()
      };
}

if (q2$4.length !== 4) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          137,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q2$4), [
        5,
        6,
        7,
        8
      ])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          137,
          26
        ],
        Error: new Error()
      };
}

Belt_MutableQueue.transfer(q1$4, q2$4);

if (q1$4.length !== 0) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          139,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q1$4), [])) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          139,
          26
        ],
        Error: new Error()
      };
}

var v = [
  5,
  6,
  7,
  8,
  1,
  2,
  3,
  4
];

if (q2$4.length !== 8) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          141,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.caml_equal(Belt_MutableQueue.toArray(q2$4), v)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          141,
          26
        ],
        Error: new Error()
      };
}

if (Belt_MutableQueue.reduce(q2$4, 0, (function (x, y) {
          return x - y | 0;
        })) !== Belt_Array.reduce(v, 0, (function (x, y) {
          return x - y | 0;
        }))) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_queue_test.ml",
          143,
          2
        ],
        Error: new Error()
      };
}

console.log("OK");

var q$6 = Belt_MutableQueue.fromArray([
      1,
      2,
      3,
      4
    ]);

var q1$5 = Belt_MutableQueue.map(q$6, (function (x) {
        return x - 1 | 0;
      }));

eq("File \"bs_queue_test.ml\", line 154, characters 5-12", Belt_MutableQueue.toArray(q1$5), [
      0,
      1,
      2,
      3
    ]);

var q$7 = Belt_MutableQueue.fromArray([]);

b("File \"bs_queue_test.ml\", line 155, characters 4-11", q$7.length === 0);

var q$8 = Belt_MutableQueue.map(Belt_MutableQueue.fromArray([]), (function (x) {
        return x + 1 | 0;
      }));

b("File \"bs_queue_test.ml\", line 156, characters 4-11", q$8.length === 0);

Mt.from_pair_suites("Bs_queue_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.b = b;
exports.does_raise = does_raise;
exports.$plus$plus = $plus$plus;
/*  Not a pure module */
