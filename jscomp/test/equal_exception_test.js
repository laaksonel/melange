'use strict';

var Mt = require("./mt.js");
var Bytes = require("melange/lib/js/bytes.js");
var Stdlib = require("melange/lib/js/stdlib.js");
var Caml_obj = require("melange/lib/js/caml_obj.js");
var Caml_bytes = require("melange/lib/js/caml_bytes.js");
var Caml_exceptions = require("melange/lib/js/caml_exceptions.js");
var Caml_js_exceptions = require("melange/lib/js/caml_js_exceptions.js");

var v = "gso";

function is_equal(param) {
  if (Caml_bytes.get(Bytes.make(3, /* 'a' */97), 0) !== /* 'a' */97) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "equal_exception_test.ml",
            9,
            4
          ],
          Error: new Error()
        };
  }
  if (Bytes.make(3, /* 'a' */97)[0] !== /* 'a' */97) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "equal_exception_test.ml",
            10,
            4
          ],
          Error: new Error()
        };
  }
  var u = Bytes.make(3, /* 'a' */97);
  u[0] = /* 'b' */98;
  if (u[0] !== /* 'b' */98) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "equal_exception_test.ml",
            13,
            4
          ],
          Error: new Error()
        };
  }
  
}

function is_exception(param) {
  try {
    throw {
          RE_EXN_ID: Stdlib.Not_found,
          Error: new Error()
        };
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Stdlib.Not_found) {
      return ;
    }
    throw exn;
  }
}

function is_normal_exception(_x) {
  var A = /* @__PURE__ */Caml_exceptions.create("A");
  var v = {
    RE_EXN_ID: A,
    _1: 3
  };
  try {
    throw v;
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === A) {
      if (exn._1 === 3) {
        return ;
      }
      throw exn;
    }
    throw exn;
  }
}

function is_arbitrary_exception(param) {
  var A = /* @__PURE__ */Caml_exceptions.create("A");
  try {
    throw {
          RE_EXN_ID: A,
          Error: new Error()
        };
  }
  catch (exn){
    return ;
  }
}

var suites_0 = [
  "is_equal",
  is_equal
];

var suites_1 = {
  hd: [
    "is_exception",
    is_exception
  ],
  tl: {
    hd: [
      "is_normal_exception",
      is_normal_exception
    ],
    tl: {
      hd: [
        "is_arbitrary_exception",
        is_arbitrary_exception
      ],
      tl: /* [] */0
    }
  }
};

var suites = {
  hd: suites_0,
  tl: suites_1
};

var e = {
  RE_EXN_ID: Stdlib.Not_found
};

function eq(param) {
  return param.RE_EXN_ID === Stdlib.Not_found;
}

var Not_found = /* @__PURE__ */Caml_exceptions.create("Equal_exception_test.Not_found");

if (Caml_obj.caml_equal(e, {
        RE_EXN_ID: Not_found
      }) !== false) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "equal_exception_test.ml",
          50,
          3
        ],
        Error: new Error()
      };
}

if (Not_found === Stdlib.Not_found !== false) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "equal_exception_test.ml",
          51,
          3
        ],
        Error: new Error()
      };
}

Mt.from_suites("exception", suites);

exports.v = v;
exports.is_equal = is_equal;
exports.is_exception = is_exception;
exports.is_normal_exception = is_normal_exception;
exports.is_arbitrary_exception = is_arbitrary_exception;
exports.suites = suites;
exports.e = e;
exports.eq = eq;
exports.Not_found = Not_found;
/*  Not a pure module */
