'use strict';

var Mt = require("./mt.js");
var Seq = require("melange/lib/js/seq.js");
var Caml = require("melange/lib/js/caml.js");
var List = require("melange/lib/js/list.js");
var Curry = require("melange/lib/js/curry.js");
var Stdlib = require("melange/lib/js/stdlib.js");
var Caml_obj = require("melange/lib/js/caml_obj.js");
var Caml_option = require("melange/lib/js/caml_option.js");

function even(n) {
  if (n === 0) {
    return true;
  } else if (n === 1) {
    return false;
  } else {
    return Curry._1(B.odd, n - 1 | 0);
  }
}

var A = {
  even: even
};

function odd(n) {
  if (n === 1) {
    return true;
  } else if (n === 0) {
    return false;
  } else {
    return Curry._1(A.even, n - 1 | 0);
  }
}

var B = {
  odd: odd
};

function even$1(n) {
  if (n === 0) {
    return true;
  } else if (n === 1) {
    return false;
  } else {
    return Curry._1(BB.odd, n - 1 | 0);
  }
}

function x(param) {
  return Curry._1(BB.y, undefined) + 3 | 0;
}

var AA = {
  even: even$1,
  x: x
};

function odd$1(n) {
  if (n === 1) {
    return true;
  } else if (n === 0) {
    return false;
  } else {
    return Curry._1(even$1, n - 1 | 0);
  }
}

function y(param) {
  return 32;
}

var BB = {
  odd: odd$1,
  y: y
};

var Even = {};

var Odd = {};

function compare(t1, t2) {
  if (t1.TAG === /* Leaf */0) {
    if (t2.TAG === /* Leaf */0) {
      return Caml.caml_string_compare(t1._0, t2._0);
    } else {
      return 1;
    }
  } else if (t2.TAG === /* Leaf */0) {
    return -1;
  } else {
    return Curry._2(ASet.compare, t1._0, t2._0);
  }
}

var AAA = {
  compare: compare
};

function height(param) {
  if (param) {
    return param.h;
  } else {
    return 0;
  }
}

function create(l, v, r) {
  var hl = l ? l.h : 0;
  var hr = r ? r.h : 0;
  return /* Node */{
          l: l,
          v: v,
          r: r,
          h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function bal(l, v, r) {
  var hl = l ? l.h : 0;
  var hr = r ? r.h : 0;
  if (hl > (hr + 2 | 0)) {
    if (l) {
      var lr = l.r;
      var lv = l.v;
      var ll = l.l;
      if (height(ll) >= height(lr)) {
        return create(ll, lv, create(lr, v, r));
      }
      if (lr) {
        return create(create(ll, lv, lr.l), lr.v, create(lr.r, v, r));
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Set.bal",
            Error: new Error()
          };
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Set.bal",
          Error: new Error()
        };
  }
  if (hr <= (hl + 2 | 0)) {
    return /* Node */{
            l: l,
            v: v,
            r: r,
            h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (r) {
    var rr = r.r;
    var rv = r.v;
    var rl = r.l;
    if (height(rr) >= height(rl)) {
      return create(create(l, v, rl), rv, rr);
    }
    if (rl) {
      return create(create(l, v, rl.l), rl.v, create(rl.r, rv, rr));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Set.bal",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Set.bal",
        Error: new Error()
      };
}

function add(x, t) {
  if (!t) {
    return /* Node */{
            l: /* Empty */0,
            v: x,
            r: /* Empty */0,
            h: 1
          };
  }
  var r = t.r;
  var v = t.v;
  var l = t.l;
  var c = Curry._2(AAA.compare, x, v);
  if (c === 0) {
    return t;
  }
  if (c < 0) {
    var ll = add(x, l);
    if (l === ll) {
      return t;
    } else {
      return bal(ll, v, r);
    }
  }
  var rr = add(x, r);
  if (r === rr) {
    return t;
  } else {
    return bal(l, v, rr);
  }
}

function singleton(x) {
  return /* Node */{
          l: /* Empty */0,
          v: x,
          r: /* Empty */0,
          h: 1
        };
}

function add_min_element(x, param) {
  if (param) {
    return bal(add_min_element(x, param.l), param.v, param.r);
  } else {
    return singleton(x);
  }
}

function add_max_element(x, param) {
  if (param) {
    return bal(param.l, param.v, add_max_element(x, param.r));
  } else {
    return singleton(x);
  }
}

function join(l, v, r) {
  if (!l) {
    return add_min_element(v, r);
  }
  if (!r) {
    return add_max_element(v, l);
  }
  var rh = r.h;
  var lh = l.h;
  if (lh > (rh + 2 | 0)) {
    return bal(l.l, l.v, join(l.r, v, r));
  } else if (rh > (lh + 2 | 0)) {
    return bal(join(l, v, r.l), r.v, r.r);
  } else {
    return create(l, v, r);
  }
}

function min_elt(_param) {
  while(true) {
    var param = _param;
    if (param) {
      var l = param.l;
      if (!l) {
        return param.v;
      }
      _param = l;
      continue ;
    }
    throw {
          RE_EXN_ID: Stdlib.Not_found,
          Error: new Error()
        };
  };
}

function min_elt_opt(_param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var l = param.l;
    if (!l) {
      return Caml_option.some(param.v);
    }
    _param = l;
    continue ;
  };
}

function max_elt(_param) {
  while(true) {
    var param = _param;
    if (param) {
      if (!param.r) {
        return param.v;
      }
      _param = param.r;
      continue ;
    }
    throw {
          RE_EXN_ID: Stdlib.Not_found,
          Error: new Error()
        };
  };
}

function max_elt_opt(_param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    if (!param.r) {
      return Caml_option.some(param.v);
    }
    _param = param.r;
    continue ;
  };
}

function remove_min_elt(param) {
  if (param) {
    var l = param.l;
    if (l) {
      return bal(remove_min_elt(l), param.v, param.r);
    } else {
      return param.r;
    }
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Set.remove_min_elt",
        Error: new Error()
      };
}

function concat(t1, t2) {
  if (t1) {
    if (t2) {
      return join(t1, min_elt(t2), remove_min_elt(t2));
    } else {
      return t1;
    }
  } else {
    return t2;
  }
}

function split(x, param) {
  if (!param) {
    return [
            /* Empty */0,
            false,
            /* Empty */0
          ];
  }
  var r = param.r;
  var v = param.v;
  var l = param.l;
  var c = Curry._2(AAA.compare, x, v);
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
            join(match[2], v, r)
          ];
  }
  var match$1 = split(x, r);
  return [
          join(l, v, match$1[0]),
          match$1[1],
          match$1[2]
        ];
}

function is_empty(param) {
  if (param) {
    return false;
  } else {
    return true;
  }
}

function mem(x, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return false;
    }
    var c = Curry._2(AAA.compare, x, param.v);
    if (c === 0) {
      return true;
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

function remove(x, t) {
  if (!t) {
    return /* Empty */0;
  }
  var r = t.r;
  var v = t.v;
  var l = t.l;
  var c = Curry._2(AAA.compare, x, v);
  if (c === 0) {
    if (l) {
      if (r) {
        return bal(l, min_elt(r), remove_min_elt(r));
      } else {
        return l;
      }
    } else {
      return r;
    }
  }
  if (c < 0) {
    var ll = remove(x, l);
    if (l === ll) {
      return t;
    } else {
      return bal(ll, v, r);
    }
  }
  var rr = remove(x, r);
  if (r === rr) {
    return t;
  } else {
    return bal(l, v, rr);
  }
}

function union(s1, s2) {
  if (!s1) {
    return s2;
  }
  if (!s2) {
    return s1;
  }
  var h2 = s2.h;
  var v2 = s2.v;
  var h1 = s1.h;
  var v1 = s1.v;
  if (h1 >= h2) {
    if (h2 === 1) {
      return add(v2, s1);
    }
    var match = split(v1, s2);
    return join(union(s1.l, match[0]), v1, union(s1.r, match[2]));
  }
  if (h1 === 1) {
    return add(v1, s2);
  }
  var match$1 = split(v2, s1);
  return join(union(match$1[0], s2.l), v2, union(match$1[2], s2.r));
}

function inter(s1, s2) {
  if (!s1) {
    return /* Empty */0;
  }
  if (!s2) {
    return /* Empty */0;
  }
  var r1 = s1.r;
  var v1 = s1.v;
  var l1 = s1.l;
  var match = split(v1, s2);
  var l2 = match[0];
  if (match[1]) {
    return join(inter(l1, l2), v1, inter(r1, match[2]));
  } else {
    return concat(inter(l1, l2), inter(r1, match[2]));
  }
}

function split_bis(x, param) {
  if (!param) {
    return /* NotFound */{
            _0: /* Empty */0,
            _1: (function (param) {
                return /* Empty */0;
              })
          };
  }
  var r = param.r;
  var v = param.v;
  var l = param.l;
  var c = Curry._2(AAA.compare, x, v);
  if (c === 0) {
    return /* Found */0;
  }
  if (c < 0) {
    var match = split_bis(x, l);
    if (!match) {
      return /* Found */0;
    }
    var rl = match._1;
    return /* NotFound */{
            _0: match._0,
            _1: (function (param) {
                return join(Curry._1(rl, undefined), v, r);
              })
          };
  }
  var match$1 = split_bis(x, r);
  if (match$1) {
    return /* NotFound */{
            _0: join(l, v, match$1._0),
            _1: match$1._1
          };
  } else {
    return /* Found */0;
  }
}

function disjoint(_s1, _s2) {
  while(true) {
    var s2 = _s2;
    var s1 = _s1;
    if (!s1) {
      return true;
    }
    if (!s2) {
      return true;
    }
    if (s1 === s2) {
      return false;
    }
    var match = split_bis(s1.v, s2);
    if (!match) {
      return false;
    }
    if (!disjoint(s1.l, match._0)) {
      return false;
    }
    _s2 = Curry._1(match._1, undefined);
    _s1 = s1.r;
    continue ;
  };
}

function diff(s1, s2) {
  if (!s1) {
    return /* Empty */0;
  }
  if (!s2) {
    return s1;
  }
  var r1 = s1.r;
  var v1 = s1.v;
  var l1 = s1.l;
  var match = split(v1, s2);
  var l2 = match[0];
  if (match[1]) {
    return concat(diff(l1, l2), diff(r1, match[2]));
  } else {
    return join(diff(l1, l2), v1, diff(r1, match[2]));
  }
}

function cons_enum(_s, _e) {
  while(true) {
    var e = _e;
    var s = _s;
    if (!s) {
      return e;
    }
    _e = /* More */{
      _0: s.v,
      _1: s.r,
      _2: e
    };
    _s = s.l;
    continue ;
  };
}

function compare$1(s1, s2) {
  var _e1 = cons_enum(s1, /* End */0);
  var _e2 = cons_enum(s2, /* End */0);
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (!e1) {
      if (e2) {
        return -1;
      } else {
        return 0;
      }
    }
    if (!e2) {
      return 1;
    }
    var c = Curry._2(AAA.compare, e1._0, e2._0);
    if (c !== 0) {
      return c;
    }
    _e2 = cons_enum(e2._1, e2._2);
    _e1 = cons_enum(e1._1, e1._2);
    continue ;
  };
}

function equal(s1, s2) {
  return compare$1(s1, s2) === 0;
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
    var r2 = s2.r;
    var l2 = s2.l;
    var r1 = s1.r;
    var v1 = s1.v;
    var l1 = s1.l;
    var c = Curry._2(AAA.compare, v1, s2.v);
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
              l: l1,
              v: v1,
              r: /* Empty */0,
              h: 0
            }, l2)) {
        return false;
      }
      _s1 = r1;
      continue ;
    }
    if (!subset(/* Node */{
            l: /* Empty */0,
            v: v1,
            r: r1,
            h: 0
          }, r2)) {
      return false;
    }
    _s1 = l1;
    continue ;
  };
}

function iter(f, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    iter(f, param.l);
    Curry._1(f, param.v);
    _param = param.r;
    continue ;
  };
}

function fold(f, _s, _accu) {
  while(true) {
    var accu = _accu;
    var s = _s;
    if (!s) {
      return accu;
    }
    _accu = Curry._2(f, s.v, fold(f, s.l, accu));
    _s = s.r;
    continue ;
  };
}

function for_all(p, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return true;
    }
    if (!Curry._1(p, param.v)) {
      return false;
    }
    if (!for_all(p, param.l)) {
      return false;
    }
    _param = param.r;
    continue ;
  };
}

function exists(p, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return false;
    }
    if (Curry._1(p, param.v)) {
      return true;
    }
    if (exists(p, param.l)) {
      return true;
    }
    _param = param.r;
    continue ;
  };
}

function filter(p, t) {
  if (!t) {
    return /* Empty */0;
  }
  var r = t.r;
  var v = t.v;
  var l = t.l;
  var l$p = filter(p, l);
  var pv = Curry._1(p, v);
  var r$p = filter(p, r);
  if (pv) {
    if (l === l$p && r === r$p) {
      return t;
    } else {
      return join(l$p, v, r$p);
    }
  } else {
    return concat(l$p, r$p);
  }
}

function partition(p, param) {
  if (!param) {
    return [
            /* Empty */0,
            /* Empty */0
          ];
  }
  var v = param.v;
  var match = partition(p, param.l);
  var lf = match[1];
  var lt = match[0];
  var pv = Curry._1(p, v);
  var match$1 = partition(p, param.r);
  var rf = match$1[1];
  var rt = match$1[0];
  if (pv) {
    return [
            join(lt, v, rt),
            concat(lf, rf)
          ];
  } else {
    return [
            concat(lt, rt),
            join(lf, v, rf)
          ];
  }
}

function cardinal(param) {
  if (param) {
    return (cardinal(param.l) + 1 | 0) + cardinal(param.r) | 0;
  } else {
    return 0;
  }
}

function elements_aux(_accu, _param) {
  while(true) {
    var param = _param;
    var accu = _accu;
    if (!param) {
      return accu;
    }
    _param = param.l;
    _accu = {
      hd: param.v,
      tl: elements_aux(accu, param.r)
    };
    continue ;
  };
}

function elements(s) {
  return elements_aux(/* [] */0, s);
}

function find(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var v = param.v;
      var c = Curry._2(AAA.compare, x, v);
      if (c === 0) {
        return v;
      }
      _param = c < 0 ? param.l : param.r;
      continue ;
    }
    throw {
          RE_EXN_ID: Stdlib.Not_found,
          Error: new Error()
        };
  };
}

function find_first(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var v = param.v;
      if (Curry._1(f, v)) {
        var _v0 = v;
        var _param$1 = param.l;
        while(true) {
          var param$1 = _param$1;
          var v0 = _v0;
          if (!param$1) {
            return v0;
          }
          var v$1 = param$1.v;
          if (Curry._1(f, v$1)) {
            _param$1 = param$1.l;
            _v0 = v$1;
            continue ;
          }
          _param$1 = param$1.r;
          continue ;
        };
      }
      _param = param.r;
      continue ;
    }
    throw {
          RE_EXN_ID: Stdlib.Not_found,
          Error: new Error()
        };
  };
}

function find_first_opt(f, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var v = param.v;
    if (Curry._1(f, v)) {
      var _v0 = v;
      var _param$1 = param.l;
      while(true) {
        var param$1 = _param$1;
        var v0 = _v0;
        if (!param$1) {
          return Caml_option.some(v0);
        }
        var v$1 = param$1.v;
        if (Curry._1(f, v$1)) {
          _param$1 = param$1.l;
          _v0 = v$1;
          continue ;
        }
        _param$1 = param$1.r;
        continue ;
      };
    }
    _param = param.r;
    continue ;
  };
}

function find_last(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var v = param.v;
      if (Curry._1(f, v)) {
        var _v0 = v;
        var _param$1 = param.r;
        while(true) {
          var param$1 = _param$1;
          var v0 = _v0;
          if (!param$1) {
            return v0;
          }
          var v$1 = param$1.v;
          if (Curry._1(f, v$1)) {
            _param$1 = param$1.r;
            _v0 = v$1;
            continue ;
          }
          _param$1 = param$1.l;
          continue ;
        };
      }
      _param = param.l;
      continue ;
    }
    throw {
          RE_EXN_ID: Stdlib.Not_found,
          Error: new Error()
        };
  };
}

function find_last_opt(f, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var v = param.v;
    if (Curry._1(f, v)) {
      var _v0 = v;
      var _param$1 = param.r;
      while(true) {
        var param$1 = _param$1;
        var v0 = _v0;
        if (!param$1) {
          return Caml_option.some(v0);
        }
        var v$1 = param$1.v;
        if (Curry._1(f, v$1)) {
          _param$1 = param$1.r;
          _v0 = v$1;
          continue ;
        }
        _param$1 = param$1.l;
        continue ;
      };
    }
    _param = param.l;
    continue ;
  };
}

function find_opt(x, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var v = param.v;
    var c = Curry._2(AAA.compare, x, v);
    if (c === 0) {
      return Caml_option.some(v);
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

function try_join(l, v, r) {
  if ((Caml_obj.caml_equal(l, /* Empty */0) || Curry._2(AAA.compare, max_elt(l), v) < 0) && (Caml_obj.caml_equal(r, /* Empty */0) || Curry._2(AAA.compare, v, min_elt(r)) < 0)) {
    return join(l, v, r);
  } else {
    return union(l, add(v, r));
  }
}

function map(f, t) {
  if (!t) {
    return /* Empty */0;
  }
  var r = t.r;
  var v = t.v;
  var l = t.l;
  var l$p = map(f, l);
  var v$p = Curry._1(f, v);
  var r$p = map(f, r);
  if (l === l$p && v === v$p && r === r$p) {
    return t;
  } else {
    return try_join(l$p, v$p, r$p);
  }
}

function filter_map(f, t) {
  if (!t) {
    return /* Empty */0;
  }
  var r = t.r;
  var v = t.v;
  var l = t.l;
  var l$p = filter_map(f, l);
  var v$p = Curry._1(f, v);
  var r$p = filter_map(f, r);
  if (v$p === undefined) {
    if (l$p) {
      if (r$p) {
        return try_join(l$p, min_elt(r$p), remove_min_elt(r$p));
      } else {
        return l$p;
      }
    } else {
      return r$p;
    }
  }
  var v$p$1 = Caml_option.valFromOption(v$p);
  if (l === l$p && v === v$p$1 && r === r$p) {
    return t;
  } else {
    return try_join(l$p, v$p$1, r$p);
  }
}

function of_list(l) {
  if (!l) {
    return /* Empty */0;
  }
  var match = l.tl;
  var x0 = l.hd;
  if (!match) {
    return singleton(x0);
  }
  var match$1 = match.tl;
  var x1 = match.hd;
  if (!match$1) {
    return add(x1, singleton(x0));
  }
  var match$2 = match$1.tl;
  var x2 = match$1.hd;
  if (!match$2) {
    return add(x2, add(x1, singleton(x0)));
  }
  var match$3 = match$2.tl;
  var x3 = match$2.hd;
  if (match$3) {
    if (match$3.tl) {
      var l$1 = List.sort_uniq(AAA.compare, l);
      var sub = function (n, l) {
        switch (n) {
          case 0 :
              return [
                      /* Empty */0,
                      l
                    ];
          case 1 :
              if (l) {
                return [
                        /* Node */{
                          l: /* Empty */0,
                          v: l.hd,
                          r: /* Empty */0,
                          h: 1
                        },
                        l.tl
                      ];
              }
              break;
          case 2 :
              if (l) {
                var match = l.tl;
                if (match) {
                  return [
                          /* Node */{
                            l: /* Node */{
                              l: /* Empty */0,
                              v: l.hd,
                              r: /* Empty */0,
                              h: 1
                            },
                            v: match.hd,
                            r: /* Empty */0,
                            h: 2
                          },
                          match.tl
                        ];
                }
                
              }
              break;
          case 3 :
              if (l) {
                var match$1 = l.tl;
                if (match$1) {
                  var match$2 = match$1.tl;
                  if (match$2) {
                    return [
                            /* Node */{
                              l: /* Node */{
                                l: /* Empty */0,
                                v: l.hd,
                                r: /* Empty */0,
                                h: 1
                              },
                              v: match$1.hd,
                              r: /* Node */{
                                l: /* Empty */0,
                                v: match$2.hd,
                                r: /* Empty */0,
                                h: 1
                              },
                              h: 2
                            },
                            match$2.tl
                          ];
                  }
                  
                }
                
              }
              break;
          default:
            
        }
        var nl = n / 2 | 0;
        var match$3 = sub(nl, l);
        var l$1 = match$3[1];
        if (l$1) {
          var match$4 = sub((n - nl | 0) - 1 | 0, l$1.tl);
          return [
                  create(match$3[0], l$1.hd, match$4[0]),
                  match$4[1]
                ];
        }
        throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "set.ml",
                570,
                18
              ],
              Error: new Error()
            };
      };
      return sub(List.length(l$1), l$1)[0];
    } else {
      return add(match$3.hd, add(x3, add(x2, add(x1, singleton(x0)))));
    }
  } else {
    return add(x3, add(x2, add(x1, singleton(x0))));
  }
}

function add_seq(i, m) {
  return Seq.fold_left((function (s, x) {
                return add(x, s);
              }), m, i);
}

function of_seq(i) {
  return add_seq(i, /* Empty */0);
}

function seq_of_enum_(c, param) {
  if (!c) {
    return /* Nil */0;
  }
  var partial_arg = cons_enum(c._1, c._2);
  return /* Cons */{
          _0: c._0,
          _1: (function (param) {
              return seq_of_enum_(partial_arg, param);
            })
        };
}

function to_seq(c) {
  var partial_arg = cons_enum(c, /* End */0);
  return function (param) {
    return seq_of_enum_(partial_arg, param);
  };
}

function snoc_enum(_s, _e) {
  while(true) {
    var e = _e;
    var s = _s;
    if (!s) {
      return e;
    }
    _e = /* More */{
      _0: s.v,
      _1: s.l,
      _2: e
    };
    _s = s.r;
    continue ;
  };
}

function rev_seq_of_enum_(c, param) {
  if (!c) {
    return /* Nil */0;
  }
  var partial_arg = snoc_enum(c._1, c._2);
  return /* Cons */{
          _0: c._0,
          _1: (function (param) {
              return rev_seq_of_enum_(partial_arg, param);
            })
        };
}

function to_rev_seq(c) {
  var partial_arg = snoc_enum(c, /* End */0);
  return function (param) {
    return rev_seq_of_enum_(partial_arg, param);
  };
}

function to_seq_from(low, s) {
  var aux = function (low, _s, _c) {
    while(true) {
      var c = _c;
      var s = _s;
      if (!s) {
        return c;
      }
      var r = s.r;
      var v = s.v;
      var n = Curry._2(AAA.compare, v, low);
      if (n === 0) {
        return /* More */{
                _0: v,
                _1: r,
                _2: c
              };
      }
      if (n < 0) {
        _s = r;
        continue ;
      }
      _c = /* More */{
        _0: v,
        _1: r,
        _2: c
      };
      _s = s.l;
      continue ;
    };
  };
  var partial_arg = aux(low, s, /* End */0);
  return function (param) {
    return seq_of_enum_(partial_arg, param);
  };
}

var ASet = {
  empty: /* Empty */0,
  is_empty: is_empty,
  mem: mem,
  add: add,
  singleton: singleton,
  remove: remove,
  union: union,
  inter: inter,
  disjoint: disjoint,
  diff: diff,
  compare: compare$1,
  equal: equal,
  subset: subset,
  iter: iter,
  map: map,
  fold: fold,
  for_all: for_all,
  exists: exists,
  filter: filter,
  filter_map: filter_map,
  partition: partition,
  cardinal: cardinal,
  elements: elements,
  min_elt: min_elt,
  min_elt_opt: min_elt_opt,
  max_elt: max_elt,
  max_elt_opt: max_elt_opt,
  choose: min_elt,
  choose_opt: min_elt_opt,
  split: split,
  find: find,
  find_opt: find_opt,
  find_first: find_first,
  find_first_opt: find_first_opt,
  find_last: find_last,
  find_last_opt: find_last_opt,
  of_list: of_list,
  to_seq_from: to_seq_from,
  to_seq: to_seq,
  to_rev_seq: to_rev_seq,
  add_seq: add_seq,
  of_seq: of_seq
};

var suites_0 = [
  "test1",
  (function (param) {
      return {
              TAG: /* Eq */0,
              _0: [
                true,
                true,
                false,
                false
              ],
              _1: [
                Curry._1(A.even, 2),
                Curry._1(even$1, 4),
                Curry._1(B.odd, 2),
                Curry._1(odd$1, 4)
              ]
            };
    })
];

var suites_1 = {
  hd: [
    "test2",
    (function (param) {
        return {
                TAG: /* Eq */0,
                _0: Curry._1(y, undefined),
                _1: 32
              };
      })
  ],
  tl: {
    hd: [
      "test3",
      (function (param) {
          return {
                  TAG: /* Eq */0,
                  _0: Curry._1(x, undefined),
                  _1: 35
                };
        })
    ],
    tl: {
      hd: [
        "test4",
        (function (param) {
            return {
                    TAG: /* Eq */0,
                    _0: true,
                    _1: Curry._1(A.even, 2)
                  };
          })
      ],
      tl: {
        hd: [
          "test4",
          (function (param) {
              return {
                      TAG: /* Eq */0,
                      _0: true,
                      _1: Curry._1(even$1, 4)
                    };
            })
        ],
        tl: {
          hd: [
            "test5",
            (function (param) {
                return {
                        TAG: /* Eq */0,
                        _0: false,
                        _1: Curry._1(B.odd, 2)
                      };
              })
          ],
          tl: {
            hd: [
              "test6",
              (function (param) {
                  return {
                          TAG: /* Eq */0,
                          _0: 2,
                          _1: Curry._1(cardinal, Curry._1(of_list, {
                                    hd: {
                                      TAG: /* Leaf */0,
                                      _0: "a"
                                    },
                                    tl: {
                                      hd: {
                                        TAG: /* Leaf */0,
                                        _0: "b"
                                      },
                                      tl: {
                                        hd: {
                                          TAG: /* Leaf */0,
                                          _0: "a"
                                        },
                                        tl: /* [] */0
                                      }
                                    }
                                  }))
                        };
                })
            ],
            tl: /* [] */0
          }
        }
      }
    }
  }
};

var suites = {
  hd: suites_0,
  tl: suites_1
};

Mt.from_pair_suites("Rec_module_test", suites);

exports.A = A;
exports.B = B;
exports.AA = AA;
exports.BB = BB;
exports.Even = Even;
exports.Odd = Odd;
exports.AAA = AAA;
exports.ASet = ASet;
exports.suites = suites;
/* ASet Not a pure module */
