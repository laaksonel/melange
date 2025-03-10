'use strict';

var Curry = require("melange/lib/js/curry.js");

function peek_queue(param) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "format_regression.ml",
          10,
          19
        ],
        Error: new Error()
      };
}

function int_of_size(param) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "format_regression.ml",
          11,
          20
        ],
        Error: new Error()
      };
}

function take_queue(param) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "format_regression.ml",
          12,
          19
        ],
        Error: new Error()
      };
}

function format_pp_token(param, param$1) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "format_regression.ml",
          13,
          26
        ],
        Error: new Error()
      };
}

function advance_loop(state) {
  while(true) {
    var match = peek_queue(state.pp_queue);
    var size = match.elem_size;
    var size$1 = int_of_size(size);
    if (size$1 < 0 && (state.pp_right_total - state.pp_left_total | 0) < state.pp_space_left) {
      return ;
    }
    take_queue(state.pp_queue);
    Curry._1(format_pp_token(state, size$1 < 0 ? 1000000010 : size$1), match.token);
    state.pp_left_total = match.length + state.pp_left_total | 0;
    continue ;
  };
}

var pp_infinity = 1000000010;

exports.peek_queue = peek_queue;
exports.int_of_size = int_of_size;
exports.take_queue = take_queue;
exports.format_pp_token = format_pp_token;
exports.pp_infinity = pp_infinity;
exports.advance_loop = advance_loop;
/* No side effect */
