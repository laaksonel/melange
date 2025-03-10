'use strict';

var Caml_option = require("melange/lib/js/caml_option.js");

function treeHeight(n) {
  if (n !== undefined) {
    return Caml_option.valFromOption(n).height;
  } else {
    return 0;
  }
}

function copy(n) {
  if (n === undefined) {
    return n;
  }
  var match = Caml_option.valFromOption(n);
  var v = match.value;
  var h = match.height;
  var l = match.left;
  var r = match.right;
  return {
          value: v,
          height: h,
          left: copy(l),
          right: copy(r)
        };
}

exports.treeHeight = treeHeight;
exports.copy = copy;
/* No side effect */
