'use strict';

var Js_exn = require("melange/lib/js/js_exn.js");
var Belt_MapInt = require("melange/lib/js/belt_MapInt.js");

function should(b) {
  if (!b) {
    return Js_exn.raiseError("IMPOSSIBLE");
  }
  
}

function test(param) {
  var m;
  for(var i = 0; i <= 999999; ++i){
    m = Belt_MapInt.set(m, i, i);
  }
  for(var i$1 = 0; i$1 <= 999999; ++i$1){
    should(Belt_MapInt.get(m, i$1) !== undefined);
  }
  for(var i$2 = 0; i$2 <= 999999; ++i$2){
    m = Belt_MapInt.remove(m, i$2);
  }
  should(Belt_MapInt.isEmpty(m));
}

test(undefined);

exports.should = should;
exports.test = test;
/*  Not a pure module */
