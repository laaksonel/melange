'use strict';

var Caml = require("melange/lib/js/caml.js");
var List = require("melange/lib/js/list.js");
var $$Array = require("melange/lib/js/array.js");
var Stdlib = require("melange/lib/js/stdlib.js");
var $$String = require("melange/lib/js/string.js");
var Set_gen = require("./set_gen.js");

function split(x, tree) {
  if (!tree) {
    return [
            /* Empty */0,
            false,
            /* Empty */0
          ];
  }
  var r = tree._2;
  var v = tree._1;
  var l = tree._0;
  var c = Caml.caml_string_compare(x, v);
  if (c === 0) {
    return [
            l,
            true,
            r
          ];
  }
  if (c < 0) {
    var match = split(x, l);
    return [
            match[0],
            match[1],
            Set_gen.internal_join(match[2], v, r)
          ];
  }
  var match$1 = split(x, r);
  return [
          Set_gen.internal_join(l, v, match$1[0]),
          match$1[1],
          match$1[2]
        ];
}

function add(x, tree) {
  if (!tree) {
    return /* Node */{
            _0: /* Empty */0,
            _1: x,
            _2: /* Empty */0,
            _3: 1
          };
  }
  var r = tree._2;
  var v = tree._1;
  var l = tree._0;
  var c = Caml.caml_string_compare(x, v);
  if (c === 0) {
    return tree;
  } else if (c < 0) {
    return Set_gen.internal_bal(add(x, l), v, r);
  } else {
    return Set_gen.internal_bal(l, v, add(x, r));
  }
}

function union(s1, s2) {
  if (!s1) {
    return s2;
  }
  if (!s2) {
    return s1;
  }
  var h2 = s2._3;
  var v2 = s2._1;
  var h1 = s1._3;
  var v1 = s1._1;
  if (h1 >= h2) {
    if (h2 === 1) {
      return add(v2, s1);
    }
    var match = split(v1, s2);
    return Set_gen.internal_join(union(s1._0, match[0]), v1, union(s1._2, match[2]));
  }
  if (h1 === 1) {
    return add(v1, s2);
  }
  var match$1 = split(v2, s1);
  return Set_gen.internal_join(union(match$1[0], s2._0), v2, union(match$1[2], s2._2));
}

function inter(s1, s2) {
  if (!s1) {
    return /* Empty */0;
  }
  if (!s2) {
    return /* Empty */0;
  }
  var r1 = s1._2;
  var v1 = s1._1;
  var l1 = s1._0;
  var match = split(v1, s2);
  var l2 = match[0];
  if (match[1]) {
    return Set_gen.internal_join(inter(l1, l2), v1, inter(r1, match[2]));
  } else {
    return Set_gen.internal_concat(inter(l1, l2), inter(r1, match[2]));
  }
}

function diff(s1, s2) {
  if (!s1) {
    return /* Empty */0;
  }
  if (!s2) {
    return s1;
  }
  var r1 = s1._2;
  var v1 = s1._1;
  var l1 = s1._0;
  var match = split(v1, s2);
  var l2 = match[0];
  if (match[1]) {
    return Set_gen.internal_concat(diff(l1, l2), diff(r1, match[2]));
  } else {
    return Set_gen.internal_join(diff(l1, l2), v1, diff(r1, match[2]));
  }
}

function mem(x, _tree) {
  while(true) {
    var tree = _tree;
    if (!tree) {
      return false;
    }
    var c = Caml.caml_string_compare(x, tree._1);
    if (c === 0) {
      return true;
    }
    _tree = c < 0 ? tree._0 : tree._2;
    continue ;
  };
}

function remove(x, tree) {
  if (!tree) {
    return /* Empty */0;
  }
  var r = tree._2;
  var v = tree._1;
  var l = tree._0;
  var c = Caml.caml_string_compare(x, v);
  if (c === 0) {
    return Set_gen.internal_merge(l, r);
  } else if (c < 0) {
    return Set_gen.internal_bal(remove(x, l), v, r);
  } else {
    return Set_gen.internal_bal(l, v, remove(x, r));
  }
}

function compare(s1, s2) {
  return Set_gen.compare($$String.compare, s1, s2);
}

function equal(s1, s2) {
  return Set_gen.compare($$String.compare, s1, s2) === 0;
}

function subset(_s1, _s2) {
  while(true) {
    var s2 = _s2;
    var s1 = _s1;
    if (!s1) {
      return true;
    }
    if (!s2) {
      return false;
    }
    var r2 = s2._2;
    var l2 = s2._0;
    var r1 = s1._2;
    var v1 = s1._1;
    var l1 = s1._0;
    var c = Caml.caml_string_compare(v1, s2._1);
    if (c === 0) {
      if (!subset(l1, l2)) {
        return false;
      }
      _s2 = r2;
      _s1 = r1;
      continue ;
    }
    if (c < 0) {
      if (!subset(/* Node */{
              _0: l1,
              _1: v1,
              _2: /* Empty */0,
              _3: 0
            }, l2)) {
        return false;
      }
      _s1 = r1;
      continue ;
    }
    if (!subset(/* Node */{
            _0: /* Empty */0,
            _1: v1,
            _2: r1,
            _3: 0
          }, r2)) {
      return false;
    }
    _s1 = l1;
    continue ;
  };
}

function find(x, _tree) {
  while(true) {
    var tree = _tree;
    if (tree) {
      var v = tree._1;
      var c = Caml.caml_string_compare(x, v);
      if (c === 0) {
        return v;
      }
      _tree = c < 0 ? tree._0 : tree._2;
      continue ;
    }
    throw {
          RE_EXN_ID: Stdlib.Not_found,
          Error: new Error()
        };
  };
}

function of_list(l) {
  if (!l) {
    return /* Empty */0;
  }
  var match = l.tl;
  var x0 = l.hd;
  if (!match) {
    return Set_gen.singleton(x0);
  }
  var match$1 = match.tl;
  var x1 = match.hd;
  if (!match$1) {
    return add(x1, Set_gen.singleton(x0));
  }
  var match$2 = match$1.tl;
  var x2 = match$1.hd;
  if (!match$2) {
    return add(x2, add(x1, Set_gen.singleton(x0)));
  }
  var match$3 = match$2.tl;
  var x3 = match$2.hd;
  if (match$3) {
    if (match$3.tl) {
      return Set_gen.of_sorted_list(List.sort_uniq($$String.compare, l));
    } else {
      return add(match$3.hd, add(x3, add(x2, add(x1, Set_gen.singleton(x0)))));
    }
  } else {
    return add(x3, add(x2, add(x1, Set_gen.singleton(x0))));
  }
}

function of_array(l) {
  return $$Array.fold_left((function (acc, x) {
                return add(x, acc);
              }), /* Empty */0, l);
}

function invariant(t) {
  Set_gen.check(t);
  return Set_gen.is_ordered($$String.compare, t);
}

var compare_elt = $$String.compare;

var empty = /* Empty */0;

var is_empty = Set_gen.is_empty;

var iter = Set_gen.iter;

var fold = Set_gen.fold;

var for_all = Set_gen.for_all;

var exists = Set_gen.exists;

var singleton = Set_gen.singleton;

var cardinal = Set_gen.cardinal;

var elements = Set_gen.elements;

var min_elt = Set_gen.min_elt;

var max_elt = Set_gen.max_elt;

var choose = Set_gen.choose;

var partition = Set_gen.partition;

var filter = Set_gen.filter;

var of_sorted_list = Set_gen.of_sorted_list;

var of_sorted_array = Set_gen.of_sorted_array;

exports.compare_elt = compare_elt;
exports.empty = empty;
exports.is_empty = is_empty;
exports.iter = iter;
exports.fold = fold;
exports.for_all = for_all;
exports.exists = exists;
exports.singleton = singleton;
exports.cardinal = cardinal;
exports.elements = elements;
exports.min_elt = min_elt;
exports.max_elt = max_elt;
exports.choose = choose;
exports.partition = partition;
exports.filter = filter;
exports.of_sorted_list = of_sorted_list;
exports.of_sorted_array = of_sorted_array;
exports.split = split;
exports.add = add;
exports.union = union;
exports.inter = inter;
exports.diff = diff;
exports.mem = mem;
exports.remove = remove;
exports.compare = compare;
exports.equal = equal;
exports.subset = subset;
exports.find = find;
exports.of_list = of_list;
exports.of_array = of_array;
exports.invariant = invariant;
/* No side effect */
