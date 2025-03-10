'use strict';

var Mt = require("./mt.js");
var Caml = require("melange/lib/js/caml.js");
var Belt_Id = require("melange/lib/js/belt_Id.js");
var Hashtbl = require("melange/lib/js/hashtbl.js");
var Belt_Array = require("melange/lib/js/belt_Array.js");
var Belt_HashMap = require("melange/lib/js/belt_HashMap.js");
var Belt_SortArray = require("melange/lib/js/belt_SortArray.js");
var Array_data_util = require("./array_data_util.js");
var Belt_internalBucketsType = require("melange/lib/js/belt_internalBucketsType.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eqx(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

function b(loc, x) {
  Mt.bool_suites(test_id, suites, loc, x);
}

function eq(x, y) {
  return x === y;
}

var hash = Hashtbl.hash;

var cmp = Caml.caml_int_compare;

var Y = Belt_Id.hashable(hash, eq);

var empty = Belt_internalBucketsType.make(Y.hash, Y.eq, 30);

function add(prim0, prim1) {
  return prim0 + prim1 | 0;
}

Belt_HashMap.mergeMany(empty, [
      [
        1,
        1
      ],
      [
        2,
        3
      ],
      [
        3,
        3
      ],
      [
        2,
        2
      ]
    ]);

eqx("File \"bs_hashmap_test.ml\", line 31, characters 6-13", Belt_HashMap.get(empty, 2), 2);

eqx("File \"bs_hashmap_test.ml\", line 32, characters 6-13", empty.size, 3);

var u = Belt_Array.concat(Array_data_util.randomRange(30, 100), Array_data_util.randomRange(40, 120));

var v = Belt_Array.zip(u, u);

var xx = Belt_HashMap.fromArray(v, Y);

eqx("File \"bs_hashmap_test.ml\", line 41, characters 6-13", xx.size, 91);

eqx("File \"bs_hashmap_test.ml\", line 42, characters 6-13", Belt_SortArray.stableSortBy(Belt_HashMap.keysToArray(xx), cmp), Array_data_util.range(30, 120));

var u$1 = Belt_Array.concat(Array_data_util.randomRange(0, 100000), Array_data_util.randomRange(0, 100));

var v$1 = Belt_internalBucketsType.make(Y.hash, Y.eq, 40);

Belt_HashMap.mergeMany(v$1, Belt_Array.zip(u$1, u$1));

eqx("File \"bs_hashmap_test.ml\", line 48, characters 6-13", v$1.size, 100001);

for(var i = 0; i <= 1000; ++i){
  Belt_HashMap.remove(v$1, i);
}

eqx("File \"bs_hashmap_test.ml\", line 52, characters 6-13", v$1.size, 99000);

for(var i$1 = 0; i$1 <= 2000; ++i$1){
  Belt_HashMap.remove(v$1, i$1);
}

eqx("File \"bs_hashmap_test.ml\", line 56, characters 6-13", v$1.size, 98000);

b("File \"bs_hashmap_test.ml\", line 57, characters 4-11", Belt_Array.every(Array_data_util.range(2001, 100000), (function (x) {
            return Belt_HashMap.has(v$1, x);
          })));

Mt.from_pair_suites("Bs_hashmap_test", suites.contents);

var $plus$plus = Belt_Array.concat;

exports.suites = suites;
exports.test_id = test_id;
exports.eqx = eqx;
exports.b = b;
exports.eq = eq;
exports.hash = hash;
exports.cmp = cmp;
exports.Y = Y;
exports.empty = empty;
exports.$plus$plus = $plus$plus;
exports.add = add;
/* Y Not a pure module */
