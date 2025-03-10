'use strict';

var List = require("melange/lib/js/list.js");
var $$Array = require("melange/lib/js/array.js");
var Curry = require("melange/lib/js/curry.js");
var Caml_array = require("melange/lib/js/caml_array.js");
var Caml_option = require("melange/lib/js/caml_option.js");

function reverse_range(a, i, len) {
  if (len === 0) {
    return ;
  }
  for(var k = 0 ,k_finish = (len - 1 | 0) / 2 | 0; k <= k_finish; ++k){
    var t = a[i + k | 0];
    a[i + k | 0] = a[((i + len | 0) - 1 | 0) - k | 0];
    a[((i + len | 0) - 1 | 0) - k | 0] = t;
  }
}

function reverse_in_place(a) {
  reverse_range(a, 0, a.length);
}

function reverse(a) {
  var b_len = a.length;
  if (b_len === 0) {
    return [];
  }
  var b = $$Array.copy(a);
  for(var i = 0; i < b_len; ++i){
    b[i] = a[(b_len - 1 | 0) - i | 0];
  }
  return b;
}

function reverse_of_list(l) {
  if (!l) {
    return [];
  }
  var len = List.length(l);
  var a = Caml_array.make(len, l.hd);
  var _i = 0;
  var _param = l.tl;
  while(true) {
    var param = _param;
    var i = _i;
    if (!param) {
      return a;
    }
    a[(len - i | 0) - 2 | 0] = param.hd;
    _param = param.tl;
    _i = i + 1 | 0;
    continue ;
  };
}

function filter(f, a) {
  var arr_len = a.length;
  var _acc = /* [] */0;
  var _i = 0;
  while(true) {
    var i = _i;
    var acc = _acc;
    if (i === arr_len) {
      return reverse_of_list(acc);
    }
    var v = a[i];
    if (Curry._1(f, v)) {
      _i = i + 1 | 0;
      _acc = {
        hd: v,
        tl: acc
      };
      continue ;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function filter_map(f, a) {
  var arr_len = a.length;
  var _acc = /* [] */0;
  var _i = 0;
  while(true) {
    var i = _i;
    var acc = _acc;
    if (i === arr_len) {
      return reverse_of_list(acc);
    }
    var v = a[i];
    var v$1 = Curry._1(f, v);
    if (v$1 !== undefined) {
      _i = i + 1 | 0;
      _acc = {
        hd: Caml_option.valFromOption(v$1),
        tl: acc
      };
      continue ;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function range(from, to_) {
  if (from > to_) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Ext_array_test.range",
          Error: new Error()
        };
  }
  return $$Array.init((to_ - from | 0) + 1 | 0, (function (i) {
                return i + from | 0;
              }));
}

function map2i(f, a, b) {
  var len = a.length;
  if (len !== b.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Ext_array_test.map2i",
          Error: new Error()
        };
  }
  return $$Array.mapi((function (i, a) {
                return Curry._3(f, i, a, b[i]);
              }), a);
}

function tolist_aux(a, f, _i, _res) {
  while(true) {
    var res = _res;
    var i = _i;
    if (i < 0) {
      return res;
    }
    var v = a[i];
    var v$1 = Curry._1(f, v);
    _res = v$1 !== undefined ? ({
          hd: Caml_option.valFromOption(v$1),
          tl: res
        }) : res;
    _i = i - 1 | 0;
    continue ;
  };
}

function to_list_map(f, a) {
  return tolist_aux(a, f, a.length - 1 | 0, /* [] */0);
}

function to_list_map_acc(f, a, acc) {
  return tolist_aux(a, f, a.length - 1 | 0, acc);
}

function of_list_map(f, a) {
  if (!a) {
    return [];
  }
  var tl = a.tl;
  var hd = Curry._1(f, a.hd);
  var len = List.length(tl) + 1 | 0;
  var arr = Caml_array.make(len, hd);
  var _i = 1;
  var _param = tl;
  while(true) {
    var param = _param;
    var i = _i;
    if (!param) {
      return arr;
    }
    arr[i] = Curry._1(f, param.hd);
    _param = param.tl;
    _i = i + 1 | 0;
    continue ;
  };
}

function rfind_with_index(arr, cmp, v) {
  var len = arr.length;
  var _i = len - 1 | 0;
  while(true) {
    var i = _i;
    if (i < 0) {
      return i;
    }
    if (Curry._2(cmp, arr[i], v)) {
      return i;
    }
    _i = i - 1 | 0;
    continue ;
  };
}

function rfind_and_split(arr, cmp, v) {
  var i = rfind_with_index(arr, cmp, v);
  if (i < 0) {
    return "No_split";
  } else {
    return {
            NAME: "Split",
            VAL: [
              $$Array.sub(arr, 0, i),
              $$Array.sub(arr, i + 1 | 0, (arr.length - i | 0) - 1 | 0)
            ]
          };
  }
}

function find_with_index(arr, cmp, v) {
  var len = arr.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i >= len) {
      return -1;
    }
    if (Curry._2(cmp, arr[i], v)) {
      return i;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function find_and_split(arr, cmp, v) {
  var i = find_with_index(arr, cmp, v);
  if (i < 0) {
    return "No_split";
  } else {
    return {
            NAME: "Split",
            VAL: [
              $$Array.sub(arr, 0, i),
              $$Array.sub(arr, i + 1 | 0, (arr.length - i | 0) - 1 | 0)
            ]
          };
  }
}

function exists(p, a) {
  var n = a.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i === n) {
      return false;
    }
    if (Curry._1(p, a[i])) {
      return true;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function is_empty(arr) {
  return arr.length === 0;
}

function unsafe_loop(_index, len, p, xs, ys) {
  while(true) {
    var index = _index;
    if (index >= len) {
      return true;
    }
    if (!Curry._2(p, xs[index], ys[index])) {
      return false;
    }
    _index = index + 1 | 0;
    continue ;
  };
}

function for_all2_no_exn(p, xs, ys) {
  var len_xs = xs.length;
  var len_ys = ys.length;
  if (len_xs === len_ys) {
    return unsafe_loop(0, len_xs, p, xs, ys);
  } else {
    return false;
  }
}

exports.reverse_range = reverse_range;
exports.reverse_in_place = reverse_in_place;
exports.reverse = reverse;
exports.reverse_of_list = reverse_of_list;
exports.filter = filter;
exports.filter_map = filter_map;
exports.range = range;
exports.map2i = map2i;
exports.tolist_aux = tolist_aux;
exports.to_list_map = to_list_map;
exports.to_list_map_acc = to_list_map_acc;
exports.of_list_map = of_list_map;
exports.rfind_with_index = rfind_with_index;
exports.rfind_and_split = rfind_and_split;
exports.find_with_index = find_with_index;
exports.find_and_split = find_and_split;
exports.exists = exists;
exports.is_empty = is_empty;
exports.unsafe_loop = unsafe_loop;
exports.for_all2_no_exn = for_all2_no_exn;
/* No side effect */
