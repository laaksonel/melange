'use strict';

var Mt = require("./mt.js");
var Lazy = require("melange/lib/js/lazy.js");
var Curry = require("melange/lib/js/curry.js");
var Stdlib = require("melange/lib/js/stdlib.js");
var Caml_module = require("melange/lib/js/caml_module.js");
var CamlinternalLazy = require("melange/lib/js/camlinternalLazy.js");
var Caml_js_exceptions = require("melange/lib/js/caml_js_exceptions.js");
var Caml_external_polyfill = require("melange/lib/js/caml_external_polyfill.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

var Xx = {
  f: (function (prim0, prim1) {
      return Caml_external_polyfill.resolve("caml_hfiehi")(prim0, prim1);
    })
};

var Int3 = Caml_module.init_mod([
      "recursive_module.ml",
      27,
      6
    ], {
      TAG: /* Module */0,
      _0: [[
          /* Function */0,
          "u"
        ]]
    });

Caml_module.update_mod({
      TAG: /* Module */0,
      _0: [[
          /* Function */0,
          "u"
        ]]
    }, Int3, Int3);

var Inta = Caml_module.init_mod([
      "recursive_module.ml",
      31,
      6
    ], {
      TAG: /* Module */0,
      _0: [[
          /* Lazy */1,
          "a"
        ]]
    });

var Intb = Caml_module.init_mod([
      "recursive_module.ml",
      36,
      6
    ], {
      TAG: /* Module */0,
      _0: [[
          /* Lazy */1,
          "a"
        ]]
    });

var a = {
  LAZY_DONE: false,
  VAL: (function () {
      return CamlinternalLazy.force(Intb.a);
    })
};

Caml_module.update_mod({
      TAG: /* Module */0,
      _0: [[
          /* Lazy */1,
          "a"
        ]]
    }, Inta, {
      a: a
    });

var a$1 = {
  LAZY_DONE: false,
  VAL: (function () {
      return CamlinternalLazy.force(Inta.a) + 1 | 0;
    })
};

Caml_module.update_mod({
      TAG: /* Module */0,
      _0: [[
          /* Lazy */1,
          "a"
        ]]
    }, Intb, {
      a: a$1
    });

var tmp;

try {
  tmp = CamlinternalLazy.force(Intb.a);
}
catch (raw_exn){
  var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
  if (exn.RE_EXN_ID === Lazy.Undefined) {
    tmp = -1;
  } else {
    throw exn;
  }
}

eq("File \"recursive_module.ml\", line 41, characters 3-10", -1, tmp);

var Inta$1 = Caml_module.init_mod([
      "recursive_module.ml",
      48,
      8
    ], {
      TAG: /* Module */0,
      _0: [[
          /* Lazy */1,
          "a"
        ]]
    });

var Intb$1 = Caml_module.init_mod([
      "recursive_module.ml",
      53,
      8
    ], {
      TAG: /* Module */0,
      _0: [[
          /* Lazy */1,
          "a"
        ]]
    });

var a$2 = {
  LAZY_DONE: false,
  VAL: (function () {
      return CamlinternalLazy.force(Intb$1.a) + 1 | 0;
    })
};

Caml_module.update_mod({
      TAG: /* Module */0,
      _0: [[
          /* Lazy */1,
          "a"
        ]]
    }, Inta$1, {
      a: a$2
    });

var a$3 = {
  LAZY_DONE: true,
  VAL: 2
};

Caml_module.update_mod({
      TAG: /* Module */0,
      _0: [[
          /* Lazy */1,
          "a"
        ]]
    }, Intb$1, {
      a: a$3
    });

var A = {
  Inta: Inta$1,
  Intb: Intb$1
};

eq("File \"recursive_module.ml\", line 58, characters 6-13", CamlinternalLazy.force(Inta$1.a), 3);

var tmp$1;

try {
  Curry._1(Int3.u, 3);
  tmp$1 = 3;
}
catch (raw_exn$1){
  var exn$1 = Caml_js_exceptions.internalToOCamlException(raw_exn$1);
  if (exn$1.RE_EXN_ID === Stdlib.Undefined_recursive_module) {
    tmp$1 = 4;
  } else {
    throw exn$1;
  }
}

eq("File \"recursive_module.ml\", line 60, characters 6-13", 4, tmp$1);

Mt.from_pair_suites("Recursive_module", suites.contents);

var Int32;

var uuu = Xx.f;

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.Int32 = Int32;
exports.Xx = Xx;
exports.uuu = uuu;
exports.Int3 = Int3;
exports.Inta = Inta;
exports.Intb = Intb;
exports.A = A;
/* Int3 Not a pure module */
