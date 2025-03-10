'use strict';

var List = require("melange/lib/js/list.js");
var Stdlib = require("melange/lib/js/stdlib.js");
var Caml_exceptions = require("melange/lib/js/caml_exceptions.js");
var Caml_js_exceptions = require("melange/lib/js/caml_js_exceptions.js");

var Foo = /* @__PURE__ */Caml_exceptions.create("Gpr_1701_test.Foo");

function test(n) {
  if (n === 0) {
    throw {
          RE_EXN_ID: Foo,
          Error: new Error()
        };
  }
  try {
    return test(n - 1 | 0);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Foo) {
      return ;
    }
    throw exn;
  }
}

test(100);

function read_lines(inc) {
  var _acc = /* [] */0;
  while(true) {
    var acc = _acc;
    var l;
    try {
      l = Stdlib.input_line(inc);
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === Stdlib.End_of_file) {
        l = undefined;
      } else {
        throw exn;
      }
    }
    if (l === undefined) {
      return List.rev(acc);
    }
    _acc = {
      hd: l,
      tl: acc
    };
    continue ;
  };
}

function read_lines2(inc) {
  var _acc = /* [] */0;
  while(true) {
    var acc = _acc;
    var l;
    try {
      l = Stdlib.input_line(inc);
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === Stdlib.End_of_file) {
        return List.rev(acc);
      }
      throw exn;
    }
    _acc = {
      hd: l,
      tl: acc
    };
    continue ;
  };
}

function read_lines3(inc) {
  var loop = function (acc) {
    try {
      var l = Stdlib.input_line(inc);
      return loop({
                  hd: l,
                  tl: acc
                });
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === Stdlib.End_of_file) {
        return List.rev(acc);
      }
      throw exn;
    }
  };
  return loop(/* [] */0);
}

function fff(f, x) {
  try {
    return fff(f, x);
  }
  catch (exn){
    return x + 1 | 0;
  }
}

exports.Foo = Foo;
exports.test = test;
exports.read_lines = read_lines;
exports.read_lines2 = read_lines2;
exports.read_lines3 = read_lines3;
exports.fff = fff;
/*  Not a pure module */
