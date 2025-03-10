'use strict';

var Belt_SetInt = require("melange/lib/js/belt_SetInt.js");

function bench(param) {
  var data;
  console.time("bs_set_bench.ml 7");
  for(var i = 0; i <= 1000000; ++i){
    data = Belt_SetInt.add(data, i);
  }
  console.timeEnd("bs_set_bench.ml 7");
  console.time("bs_set_bench.ml 11");
  for(var i$1 = 0; i$1 <= 1000000; ++i$1){
    if (!Belt_SetInt.has(data, i$1)) {
      throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "bs_set_bench.ml",
              12,
              4
            ],
            Error: new Error()
          };
    }
    
  }
  console.timeEnd("bs_set_bench.ml 11");
  console.time("bs_set_bench.ml 14");
  for(var i$2 = 0; i$2 <= 1000000; ++i$2){
    data = Belt_SetInt.remove(data, i$2);
  }
  console.timeEnd("bs_set_bench.ml 14");
  if (Belt_SetInt.size(data) === 0) {
    return ;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "bs_set_bench.ml",
          17,
          2
        ],
        Error: new Error()
      };
}

console.time("bs_set_bench.ml 21");

bench(undefined);

console.timeEnd("bs_set_bench.ml 21");

var count = 1000000;

exports.count = count;
exports.bench = bench;
/*  Not a pure module */
