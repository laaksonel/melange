'use strict';

var Curry = require("melange/lib/js/curry.js");

function is_empty(param) {
  if (param) {
    return false;
  } else {
    return true;
  }
}

var v = Curry._1(is_empty, /* Empty */0);

exports.v = v;
/* M Not a pure module */
