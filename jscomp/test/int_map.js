'use strict';

var Seq = require("melange/lib/js/seq.js");
var Caml = require("melange/lib/js/caml.js");
var Curry = require("melange/lib/js/curry.js");
var Stdlib = require("melange/lib/js/stdlib.js");
var Caml_option = require("melange/lib/js/caml_option.js");

var compare = Caml.caml_int_compare;

var funarg = {
  compare: compare
};

function height(param) {
  if (param) {
    return param.h;
  } else {
    return 0;
  }
}

function create(l, x, d, r) {
  var hl = height(l);
  var hr = height(r);
  return /* Node */{
          l: l,
          v: x,
          d: d,
          r: r,
          h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function singleton(x, d) {
  return /* Node */{
          l: /* Empty */0,
          v: x,
          d: d,
          r: /* Empty */0,
          h: 1
        };
}

function bal(l, x, d, r) {
  var hl = l ? l.h : 0;
  var hr = r ? r.h : 0;
  if (hl > (hr + 2 | 0)) {
    if (l) {
      var lr = l.r;
      var ld = l.d;
      var lv = l.v;
      var ll = l.l;
      if (height(ll) >= height(lr)) {
        return create(ll, lv, ld, create(lr, x, d, r));
      }
      if (lr) {
        return create(create(ll, lv, ld, lr.l), lr.v, lr.d, create(lr.r, x, d, r));
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  if (hr <= (hl + 2 | 0)) {
    return /* Node */{
            l: l,
            v: x,
            d: d,
            r: r,
            h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (r) {
    var rr = r.r;
    var rd = r.d;
    var rv = r.v;
    var rl = r.l;
    if (height(rr) >= height(rl)) {
      return create(create(l, x, d, rl), rv, rd, rr);
    }
    if (rl) {
      return create(create(l, x, d, rl.l), rl.v, rl.d, create(rl.r, rv, rd, rr));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Map.bal",
        Error: new Error()
      };
}

function is_empty(param) {
  if (param) {
    return false;
  } else {
    return true;
  }
}

function add(x, data, m) {
  if (!m) {
    return /* Node */{
            l: /* Empty */0,
            v: x,
            d: data,
            r: /* Empty */0,
            h: 1
          };
  }
  var r = m.r;
  var d = m.d;
  var v = m.v;
  var l = m.l;
  var c = Curry._2(funarg.compare, x, v);
  if (c === 0) {
    if (d === data) {
      return m;
    } else {
      return /* Node */{
              l: l,
              v: x,
              d: data,
              r: r,
              h: m.h
            };
    }
  }
  if (c < 0) {
    var ll = add(x, data, l);
    if (l === ll) {
      return m;
    } else {
      return bal(ll, v, d, r);
    }
  }
  var rr = add(x, data, r);
  if (r === rr) {
    return m;
  } else {
    return bal(l, v, d, rr);
  }
}

function find(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var c = Curry._2(funarg.compare, x, param.v);
      if (c === 0) {
        return param.d;
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
        var _d0 = param.d;
        var _param$1 = param.l;
        while(true) {
          var param$1 = _param$1;
          var d0 = _d0;
          var v0 = _v0;
          if (!param$1) {
            return [
                    v0,
                    d0
                  ];
          }
          var v$1 = param$1.v;
          if (Curry._1(f, v$1)) {
            _param$1 = param$1.l;
            _d0 = param$1.d;
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
      var _d0 = param.d;
      var _param$1 = param.l;
      while(true) {
        var param$1 = _param$1;
        var d0 = _d0;
        var v0 = _v0;
        if (!param$1) {
          return [
                  v0,
                  d0
                ];
        }
        var v$1 = param$1.v;
        if (Curry._1(f, v$1)) {
          _param$1 = param$1.l;
          _d0 = param$1.d;
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
        var _d0 = param.d;
        var _param$1 = param.r;
        while(true) {
          var param$1 = _param$1;
          var d0 = _d0;
          var v0 = _v0;
          if (!param$1) {
            return [
                    v0,
                    d0
                  ];
          }
          var v$1 = param$1.v;
          if (Curry._1(f, v$1)) {
            _param$1 = param$1.r;
            _d0 = param$1.d;
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
      var _d0 = param.d;
      var _param$1 = param.r;
      while(true) {
        var param$1 = _param$1;
        var d0 = _d0;
        var v0 = _v0;
        if (!param$1) {
          return [
                  v0,
                  d0
                ];
        }
        var v$1 = param$1.v;
        if (Curry._1(f, v$1)) {
          _param$1 = param$1.r;
          _d0 = param$1.d;
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
    var c = Curry._2(funarg.compare, x, param.v);
    if (c === 0) {
      return Caml_option.some(param.d);
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

function mem(x, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return false;
    }
    var c = Curry._2(funarg.compare, x, param.v);
    if (c === 0) {
      return true;
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

function min_binding(_param) {
  while(true) {
    var param = _param;
    if (param) {
      var l = param.l;
      if (!l) {
        return [
                param.v,
                param.d
              ];
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

function min_binding_opt(_param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var l = param.l;
    if (!l) {
      return [
              param.v,
              param.d
            ];
    }
    _param = l;
    continue ;
  };
}

function max_binding(_param) {
  while(true) {
    var param = _param;
    if (param) {
      if (!param.r) {
        return [
                param.v,
                param.d
              ];
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

function max_binding_opt(_param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    if (!param.r) {
      return [
              param.v,
              param.d
            ];
    }
    _param = param.r;
    continue ;
  };
}

function remove_min_binding(param) {
  if (param) {
    var l = param.l;
    if (l) {
      return bal(remove_min_binding(l), param.v, param.d, param.r);
    } else {
      return param.r;
    }
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Map.remove_min_elt",
        Error: new Error()
      };
}

function merge(t1, t2) {
  if (!t1) {
    return t2;
  }
  if (!t2) {
    return t1;
  }
  var match = min_binding(t2);
  return bal(t1, match[0], match[1], remove_min_binding(t2));
}

function remove(x, m) {
  if (!m) {
    return /* Empty */0;
  }
  var r = m.r;
  var d = m.d;
  var v = m.v;
  var l = m.l;
  var c = Curry._2(funarg.compare, x, v);
  if (c === 0) {
    return merge(l, r);
  }
  if (c < 0) {
    var ll = remove(x, l);
    if (l === ll) {
      return m;
    } else {
      return bal(ll, v, d, r);
    }
  }
  var rr = remove(x, r);
  if (r === rr) {
    return m;
  } else {
    return bal(l, v, d, rr);
  }
}

function update(x, f, m) {
  if (m) {
    var r = m.r;
    var d = m.d;
    var v = m.v;
    var l = m.l;
    var c = Curry._2(funarg.compare, x, v);
    if (c === 0) {
      var data = Curry._1(f, Caml_option.some(d));
      if (data === undefined) {
        return merge(l, r);
      }
      var data$1 = Caml_option.valFromOption(data);
      if (d === data$1) {
        return m;
      } else {
        return /* Node */{
                l: l,
                v: x,
                d: data$1,
                r: r,
                h: m.h
              };
      }
    }
    if (c < 0) {
      var ll = update(x, f, l);
      if (l === ll) {
        return m;
      } else {
        return bal(ll, v, d, r);
      }
    }
    var rr = update(x, f, r);
    if (r === rr) {
      return m;
    } else {
      return bal(l, v, d, rr);
    }
  }
  var data$2 = Curry._1(f, undefined);
  if (data$2 !== undefined) {
    return /* Node */{
            l: /* Empty */0,
            v: x,
            d: Caml_option.valFromOption(data$2),
            r: /* Empty */0,
            h: 1
          };
  } else {
    return /* Empty */0;
  }
}

function iter(f, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    iter(f, param.l);
    Curry._2(f, param.v, param.d);
    _param = param.r;
    continue ;
  };
}

function map(f, param) {
  if (!param) {
    return /* Empty */0;
  }
  var l$p = map(f, param.l);
  var d$p = Curry._1(f, param.d);
  var r$p = map(f, param.r);
  return /* Node */{
          l: l$p,
          v: param.v,
          d: d$p,
          r: r$p,
          h: param.h
        };
}

function mapi(f, param) {
  if (!param) {
    return /* Empty */0;
  }
  var v = param.v;
  var l$p = mapi(f, param.l);
  var d$p = Curry._2(f, v, param.d);
  var r$p = mapi(f, param.r);
  return /* Node */{
          l: l$p,
          v: v,
          d: d$p,
          r: r$p,
          h: param.h
        };
}

function fold(f, _m, _accu) {
  while(true) {
    var accu = _accu;
    var m = _m;
    if (!m) {
      return accu;
    }
    _accu = Curry._3(f, m.v, m.d, fold(f, m.l, accu));
    _m = m.r;
    continue ;
  };
}

function for_all(p, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return true;
    }
    if (!Curry._2(p, param.v, param.d)) {
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
    if (Curry._2(p, param.v, param.d)) {
      return true;
    }
    if (exists(p, param.l)) {
      return true;
    }
    _param = param.r;
    continue ;
  };
}

function add_min_binding(k, x, param) {
  if (param) {
    return bal(add_min_binding(k, x, param.l), param.v, param.d, param.r);
  } else {
    return singleton(k, x);
  }
}

function add_max_binding(k, x, param) {
  if (param) {
    return bal(param.l, param.v, param.d, add_max_binding(k, x, param.r));
  } else {
    return singleton(k, x);
  }
}

function join(l, v, d, r) {
  if (!l) {
    return add_min_binding(v, d, r);
  }
  if (!r) {
    return add_max_binding(v, d, l);
  }
  var rh = r.h;
  var lh = l.h;
  if (lh > (rh + 2 | 0)) {
    return bal(l.l, l.v, l.d, join(l.r, v, d, r));
  } else if (rh > (lh + 2 | 0)) {
    return bal(join(l, v, d, r.l), r.v, r.d, r.r);
  } else {
    return create(l, v, d, r);
  }
}

function concat(t1, t2) {
  if (!t1) {
    return t2;
  }
  if (!t2) {
    return t1;
  }
  var match = min_binding(t2);
  return join(t1, match[0], match[1], remove_min_binding(t2));
}

function concat_or_join(t1, v, d, t2) {
  if (d !== undefined) {
    return join(t1, v, Caml_option.valFromOption(d), t2);
  } else {
    return concat(t1, t2);
  }
}

function split(x, param) {
  if (!param) {
    return [
            /* Empty */0,
            undefined,
            /* Empty */0
          ];
  }
  var r = param.r;
  var d = param.d;
  var v = param.v;
  var l = param.l;
  var c = Curry._2(funarg.compare, x, v);
  if (c === 0) {
    return [
            l,
            Caml_option.some(d),
            r
          ];
  }
  if (c < 0) {
    var match = split(x, l);
    return [
            match[0],
            match[1],
            join(match[2], v, d, r)
          ];
  }
  var match$1 = split(x, r);
  return [
          join(l, v, d, match$1[0]),
          match$1[1],
          match$1[2]
        ];
}

function merge$1(f, s1, s2) {
  if (s1) {
    var v1 = s1.v;
    if (s1.h >= height(s2)) {
      var match = split(v1, s2);
      return concat_or_join(merge$1(f, s1.l, match[0]), v1, Curry._3(f, v1, Caml_option.some(s1.d), match[1]), merge$1(f, s1.r, match[2]));
    }
    
  } else if (!s2) {
    return /* Empty */0;
  }
  if (s2) {
    var v2 = s2.v;
    var match$1 = split(v2, s1);
    return concat_or_join(merge$1(f, match$1[0], s2.l), v2, Curry._3(f, v2, match$1[1], Caml_option.some(s2.d)), merge$1(f, match$1[2], s2.r));
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "map.ml",
          400,
          10
        ],
        Error: new Error()
      };
}

function union(f, s1, s2) {
  if (!s1) {
    return s2;
  }
  if (!s2) {
    return s1;
  }
  var d2 = s2.d;
  var v2 = s2.v;
  var d1 = s1.d;
  var v1 = s1.v;
  if (s1.h >= s2.h) {
    var match = split(v1, s2);
    var d2$1 = match[1];
    var l = union(f, s1.l, match[0]);
    var r = union(f, s1.r, match[2]);
    if (d2$1 !== undefined) {
      return concat_or_join(l, v1, Curry._3(f, v1, d1, Caml_option.valFromOption(d2$1)), r);
    } else {
      return join(l, v1, d1, r);
    }
  }
  var match$1 = split(v2, s1);
  var d1$1 = match$1[1];
  var l$1 = union(f, match$1[0], s2.l);
  var r$1 = union(f, match$1[2], s2.r);
  if (d1$1 !== undefined) {
    return concat_or_join(l$1, v2, Curry._3(f, v2, Caml_option.valFromOption(d1$1), d2), r$1);
  } else {
    return join(l$1, v2, d2, r$1);
  }
}

function filter(p, m) {
  if (!m) {
    return /* Empty */0;
  }
  var r = m.r;
  var d = m.d;
  var v = m.v;
  var l = m.l;
  var l$p = filter(p, l);
  var pvd = Curry._2(p, v, d);
  var r$p = filter(p, r);
  if (pvd) {
    if (l === l$p && r === r$p) {
      return m;
    } else {
      return join(l$p, v, d, r$p);
    }
  } else {
    return concat(l$p, r$p);
  }
}

function filter_map(f, param) {
  if (!param) {
    return /* Empty */0;
  }
  var v = param.v;
  var l$p = filter_map(f, param.l);
  var fvd = Curry._2(f, v, param.d);
  var r$p = filter_map(f, param.r);
  if (fvd !== undefined) {
    return join(l$p, v, Caml_option.valFromOption(fvd), r$p);
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
  var d = param.d;
  var v = param.v;
  var match = partition(p, param.l);
  var lf = match[1];
  var lt = match[0];
  var pvd = Curry._2(p, v, d);
  var match$1 = partition(p, param.r);
  var rf = match$1[1];
  var rt = match$1[0];
  if (pvd) {
    return [
            join(lt, v, d, rt),
            concat(lf, rf)
          ];
  } else {
    return [
            concat(lt, rt),
            join(lf, v, d, rf)
          ];
  }
}

function cons_enum(_m, _e) {
  while(true) {
    var e = _e;
    var m = _m;
    if (!m) {
      return e;
    }
    _e = /* More */{
      _0: m.v,
      _1: m.d,
      _2: m.r,
      _3: e
    };
    _m = m.l;
    continue ;
  };
}

function compare$1(cmp, m1, m2) {
  var _e1 = cons_enum(m1, /* End */0);
  var _e2 = cons_enum(m2, /* End */0);
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
    var c = Curry._2(funarg.compare, e1._0, e2._0);
    if (c !== 0) {
      return c;
    }
    var c$1 = Curry._2(cmp, e1._1, e2._1);
    if (c$1 !== 0) {
      return c$1;
    }
    _e2 = cons_enum(e2._2, e2._3);
    _e1 = cons_enum(e1._2, e1._3);
    continue ;
  };
}

function equal(cmp, m1, m2) {
  var _e1 = cons_enum(m1, /* End */0);
  var _e2 = cons_enum(m2, /* End */0);
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (!e1) {
      if (e2) {
        return false;
      } else {
        return true;
      }
    }
    if (!e2) {
      return false;
    }
    if (Curry._2(funarg.compare, e1._0, e2._0) !== 0) {
      return false;
    }
    if (!Curry._2(cmp, e1._1, e2._1)) {
      return false;
    }
    _e2 = cons_enum(e2._2, e2._3);
    _e1 = cons_enum(e1._2, e1._3);
    continue ;
  };
}

function cardinal(param) {
  if (param) {
    return (cardinal(param.l) + 1 | 0) + cardinal(param.r) | 0;
  } else {
    return 0;
  }
}

function bindings_aux(_accu, _param) {
  while(true) {
    var param = _param;
    var accu = _accu;
    if (!param) {
      return accu;
    }
    _param = param.l;
    _accu = {
      hd: [
        param.v,
        param.d
      ],
      tl: bindings_aux(accu, param.r)
    };
    continue ;
  };
}

function bindings(s) {
  return bindings_aux(/* [] */0, s);
}

function add_seq(i, m) {
  return Seq.fold_left((function (m, param) {
                return add(param[0], param[1], m);
              }), m, i);
}

function of_seq(i) {
  return add_seq(i, /* Empty */0);
}

function seq_of_enum_(c, param) {
  if (!c) {
    return /* Nil */0;
  }
  var partial_arg = cons_enum(c._2, c._3);
  return /* Cons */{
          _0: [
            c._0,
            c._1
          ],
          _1: (function (param) {
              return seq_of_enum_(partial_arg, param);
            })
        };
}

function to_seq(m) {
  var partial_arg = cons_enum(m, /* End */0);
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
      _1: s.d,
      _2: s.l,
      _3: e
    };
    _s = s.r;
    continue ;
  };
}

function rev_seq_of_enum_(c, param) {
  if (!c) {
    return /* Nil */0;
  }
  var partial_arg = snoc_enum(c._2, c._3);
  return /* Cons */{
          _0: [
            c._0,
            c._1
          ],
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

function to_seq_from(low, m) {
  var aux = function (low, _m, _c) {
    while(true) {
      var c = _c;
      var m = _m;
      if (!m) {
        return c;
      }
      var r = m.r;
      var d = m.d;
      var v = m.v;
      var n = Curry._2(funarg.compare, v, low);
      if (n === 0) {
        return /* More */{
                _0: v,
                _1: d,
                _2: r,
                _3: c
              };
      }
      if (n < 0) {
        _m = r;
        continue ;
      }
      _c = /* More */{
        _0: v,
        _1: d,
        _2: r,
        _3: c
      };
      _m = m.l;
      continue ;
    };
  };
  var partial_arg = aux(low, m, /* End */0);
  return function (param) {
    return seq_of_enum_(partial_arg, param);
  };
}

var empty = /* Empty */0;

var is_empty$1 = is_empty;

var mem$1 = mem;

var add$1 = add;

var update$1 = update;

var singleton$1 = singleton;

var remove$1 = remove;

var merge$2 = merge$1;

var union$1 = union;

var compare$2 = compare$1;

var equal$1 = equal;

var iter$1 = iter;

var fold$1 = fold;

var for_all$1 = for_all;

var exists$1 = exists;

var filter$1 = filter;

var filter_map$1 = filter_map;

var partition$1 = partition;

var cardinal$1 = cardinal;

var bindings$1 = bindings;

var min_binding$1 = min_binding;

var min_binding_opt$1 = min_binding_opt;

var max_binding$1 = max_binding;

var max_binding_opt$1 = max_binding_opt;

var choose = min_binding;

var choose_opt = min_binding_opt;

var split$1 = split;

var find$1 = find;

var find_opt$1 = find_opt;

var find_first$1 = find_first;

var find_first_opt$1 = find_first_opt;

var find_last$1 = find_last;

var find_last_opt$1 = find_last_opt;

var map$1 = map;

var mapi$1 = mapi;

var to_seq$1 = to_seq;

var to_rev_seq$1 = to_rev_seq;

var to_seq_from$1 = to_seq_from;

var add_seq$1 = add_seq;

var of_seq$1 = of_seq;

exports.empty = empty;
exports.is_empty = is_empty$1;
exports.mem = mem$1;
exports.add = add$1;
exports.update = update$1;
exports.singleton = singleton$1;
exports.remove = remove$1;
exports.merge = merge$2;
exports.union = union$1;
exports.compare = compare$2;
exports.equal = equal$1;
exports.iter = iter$1;
exports.fold = fold$1;
exports.for_all = for_all$1;
exports.exists = exists$1;
exports.filter = filter$1;
exports.filter_map = filter_map$1;
exports.partition = partition$1;
exports.cardinal = cardinal$1;
exports.bindings = bindings$1;
exports.min_binding = min_binding$1;
exports.min_binding_opt = min_binding_opt$1;
exports.max_binding = max_binding$1;
exports.max_binding_opt = max_binding_opt$1;
exports.choose = choose;
exports.choose_opt = choose_opt;
exports.split = split$1;
exports.find = find$1;
exports.find_opt = find_opt$1;
exports.find_first = find_first$1;
exports.find_first_opt = find_first_opt$1;
exports.find_last = find_last$1;
exports.find_last_opt = find_last_opt$1;
exports.map = map$1;
exports.mapi = mapi$1;
exports.to_seq = to_seq$1;
exports.to_rev_seq = to_rev_seq$1;
exports.to_seq_from = to_seq_from$1;
exports.add_seq = add_seq$1;
exports.of_seq = of_seq$1;
/* include Not a pure module */
