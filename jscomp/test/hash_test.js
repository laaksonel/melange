'use strict';

var Mt = require("./mt.js");
var Char = require("melange/lib/js/char.js");
var $$Array = require("melange/lib/js/array.js");
var Bytes = require("melange/lib/js/bytes.js");
var Hashtbl = require("melange/lib/js/hashtbl.js");
var Mt_global = require("./mt_global.js");
var Caml_bytes = require("melange/lib/js/caml_bytes.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(f) {
  return function (param, param$1) {
    return Mt_global.collect_eq(test_id, suites, f, param, param$1);
  };
}

var test_strings = $$Array.init(32, (function (i) {
        var c = Char.chr(i);
        return Caml_bytes.bytes_to_string(Bytes.make(i, c));
      }));

var test_strings_hash_results = [
  0,
  904391063,
  889600889,
  929588010,
  596566298,
  365199070,
  448044845,
  311625091,
  681445541,
  634941451,
  82108334,
  17482990,
  491949228,
  696194769,
  711728152,
  594966620,
  820561748,
  958901713,
  102794744,
  378848504,
  349314368,
  114167579,
  71240932,
  110067399,
  280623927,
  323523937,
  310683234,
  178511779,
  585018975,
  544388424,
  1043872806,
  831138595
];

function normalize(x) {
  return x & 1073741823;
}

function caml_hash(x) {
  return Hashtbl.hash(x) & 1073741823;
}

Mt_global.collect_eq(test_id, suites, "File \"hash_test.ml\", line 18, characters 5-12", $$Array.map(caml_hash, test_strings), test_strings_hash_results);

Mt_global.collect_eq(test_id, suites, "File \"hash_test.ml\", line 24, characters 5-12", Hashtbl.hash(0) & 1073741823, 129913994);

Mt_global.collect_eq(test_id, suites, "File \"hash_test.ml\", line 27, characters 5-12", Hashtbl.hash("x") & 1073741823, 780510073);

Mt_global.collect_eq(test_id, suites, "File \"hash_test.ml\", line 30, characters 5-12", Hashtbl.hash("xy") & 1073741823, 194127723);

Mt.from_pair_suites("Hash_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.test_strings = test_strings;
exports.test_strings_hash_results = test_strings_hash_results;
exports.normalize = normalize;
exports.caml_hash = caml_hash;
/* test_strings Not a pure module */
