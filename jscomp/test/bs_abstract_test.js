'use strict';

var Curry = require("melange/lib/js/curry.js");

var v = {
  hd: 3,
  tl: null
};

v.tl = v;

var f = {
  k: (function (x, y) {
      return x === y;
    }),
  y: "x"
};

function uf(u) {
  return Curry._1(u.y0, 1);
}

function uf1(u) {
  return Curry._1(u.y1, 1);
}

function uf2(u) {
  return Curry._2(u.y1, 1, 2);
}

function uff(f) {
  return f.yyyy(1);
}

function uff2(f) {
  return f.yyyy1(1, 2);
}

function uff3(f) {
  var x = f.yyyy2;
  if (x !== undefined) {
    return Curry._1(x, 0);
  } else {
    return 0;
  }
}

function fx(v) {
  return v.x;
}

exports.f = f;
exports.uf = uf;
exports.uf1 = uf1;
exports.uf2 = uf2;
exports.uff = uff;
exports.uff2 = uff2;
exports.uff3 = uff3;
exports.fx = fx;
/*  Not a pure module */
