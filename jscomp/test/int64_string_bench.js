'use strict';

var Int64 = require("melange/lib/js/int64.js");
var Caml_int64 = require("melange/lib/js/caml_int64.js");
var Caml_format = require("melange/lib/js/caml_format.js");

console.time("Int64.to_string");

var u = Caml_int64.sub(Int64.max_int, [
      0,
      200000
    ]);

for(var i = 0; i <= 100000; ++i){
  Caml_format.caml_int64_format("%d", u);
}

console.timeEnd("Int64.to_string");

console.log(Caml_format.caml_int64_format("%d", u));

console.time("Int64.to_string");

var u$1 = [
  0,
  30000000
];

for(var i$1 = 0; i$1 <= 100000; ++i$1){
  Caml_format.caml_int64_format("%d", u$1);
}

console.timeEnd("Int64.to_string");

console.log(Caml_format.caml_int64_format("%d", u$1));

console.time("Int64.to_string");

var u$2 = Caml_int64.add(Int64.min_int, [
      0,
      100
    ]);

for(var i$2 = 0; i$2 <= 100000; ++i$2){
  Caml_format.caml_int64_format("%d", u$2);
}

console.timeEnd("Int64.to_string");

console.log(Caml_format.caml_int64_format("%d", u$2));

/*  Not a pure module */
