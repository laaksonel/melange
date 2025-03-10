'use strict';

var Curry = require("melange/lib/js/curry.js");
var Stdlib = require("melange/lib/js/stdlib.js");
var Caml_obj = require("melange/lib/js/caml_obj.js");
var Caml_exceptions = require("melange/lib/js/caml_exceptions.js");
var Caml_js_exceptions = require("melange/lib/js/caml_js_exceptions.js");

var Bad = /* @__PURE__ */Caml_exceptions.create("Test_seq.Bad");

var Help = /* @__PURE__ */Caml_exceptions.create("Test_seq.Help");

var Stop = /* @__PURE__ */Caml_exceptions.create("Test_seq.Stop");

function assoc3(x, _l) {
  while(true) {
    var l = _l;
    if (l) {
      var match = l.hd;
      if (Caml_obj.caml_equal(match[0], x)) {
        return match[1];
      }
      _l = l.tl;
      continue ;
    }
    throw {
          RE_EXN_ID: Stdlib.Not_found,
          Error: new Error()
        };
  };
}

function help_action(param) {
  throw {
        RE_EXN_ID: Stop,
        _1: {
          TAG: /* Unknown */0,
          _0: "-help"
        },
        Error: new Error()
      };
}

function v(speclist) {
  assoc3("-help", speclist);
  return /* [] */0;
}

function f(g, speclist) {
  return Curry._1(g, assoc3("-help", speclist));
}

function add_help(speclist) {
  var add1;
  try {
    assoc3("-help", speclist);
    add1 = /* [] */0;
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Stdlib.Not_found) {
      add1 = {
        hd: [
          "-help",
          {
            TAG: /* Unit */0,
            _0: help_action
          },
          " Display this list of options"
        ],
        tl: /* [] */0
      };
    } else {
      throw exn;
    }
  }
  var add2;
  try {
    assoc3("--help", speclist);
    add2 = /* [] */0;
  }
  catch (raw_exn$1){
    var exn$1 = Caml_js_exceptions.internalToOCamlException(raw_exn$1);
    if (exn$1.RE_EXN_ID === Stdlib.Not_found) {
      add2 = {
        hd: [
          "--help",
          {
            TAG: /* Unit */0,
            _0: help_action
          },
          " Display this list of options"
        ],
        tl: /* [] */0
      };
    } else {
      throw exn$1;
    }
  }
  return Stdlib.$at(speclist, Stdlib.$at(add1, add2));
}

exports.Bad = Bad;
exports.Help = Help;
exports.Stop = Stop;
exports.assoc3 = assoc3;
exports.help_action = help_action;
exports.v = v;
exports.f = f;
exports.add_help = add_help;
/* No side effect */
