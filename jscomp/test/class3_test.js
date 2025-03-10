'use strict';

var Mt = require("./mt.js");
var List = require("melange/lib/js/list.js");
var Curry = require("melange/lib/js/curry.js");
var Stdlib = require("melange/lib/js/stdlib.js");
var Caml_array = require("melange/lib/js/caml_array.js");
var Caml_oo_curry = require("melange/lib/js/caml_oo_curry.js");
var CamlinternalOO = require("melange/lib/js/camlinternalOO.js");

var shared = [
  "move",
  "get_x"
];

var shared$1 = [
  "register",
  "n",
  "len"
];

var shared$2 = ["move"];

var shared$3 = [
  "move",
  "get_x",
  "get_offset"
];

var shared$4 = [
  "move",
  "get_offset"
];

var shared$5 = [
  "move",
  "get_offset",
  "get_x"
];

var shared$6 = [
  "bump",
  "move",
  "get_x"
];

var shared$7 = [
  "bump",
  "get_x",
  "move"
];

var shared$8 = ["x"];

var shared$9 = [
  "print",
  "move",
  "get_x"
];

var shared$10 = [
  "move",
  "print",
  "get_x"
];

var shared$11 = [
  "move",
  "get_x",
  "bump"
];

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(loc, x, y) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + String(test_id.contents)),
      (function (param) {
          return {
                  TAG: /* Eq */0,
                  _0: x,
                  _1: y
                };
        })
    ],
    tl: suites.contents
  };
}

function point_init($$class) {
  var x_init = CamlinternalOO.new_variable($$class, "");
  var ids = CamlinternalOO.new_methods_variables($$class, shared, shared$8);
  var move = ids[0];
  var get_x = ids[1];
  var x = ids[2];
  CamlinternalOO.set_methods($$class, [
        get_x,
        (function (self$1) {
            return self$1[x];
          }),
        move,
        (function (self$1, d) {
            self$1[x] = self$1[x] + d | 0;
          })
      ]);
  return function (env, self, x_init$1) {
    var self$1 = CamlinternalOO.create_object_opt(self, $$class);
    self$1[x_init] = x_init$1;
    self$1[x] = x_init$1;
    return self$1;
  };
}

var point = CamlinternalOO.make_class(shared, point_init);

var p = Curry._2(point[0], undefined, 7);

eq("File \"class3_test.ml\", line 17, characters 12-19", Caml_oo_curry.js1(291546447, 1, p), 7);

function adjusted_point_init($$class) {
  var x_init = CamlinternalOO.new_variable($$class, "");
  var origin = CamlinternalOO.new_variable($$class, "");
  var ids = CamlinternalOO.new_methods_variables($$class, shared$3, shared$8);
  var move = ids[0];
  var get_x = ids[1];
  var get_offset = ids[2];
  var x = ids[3];
  CamlinternalOO.set_methods($$class, [
        get_x,
        (function (self$2) {
            return self$2[x];
          }),
        get_offset,
        (function (self$2) {
            return self$2[x] - self$2[origin] | 0;
          }),
        move,
        (function (self$2, d) {
            self$2[x] = self$2[x] + d | 0;
          })
      ]);
  return function (env, self, x_init$1) {
    var origin$1 = Math.imul(x_init$1 / 10 | 0, 10);
    var self$1 = CamlinternalOO.create_object_opt(self, $$class);
    self$1[origin] = origin$1;
    self$1[x_init] = x_init$1;
    self$1[x] = origin$1;
    return self$1;
  };
}

var adjusted_point = CamlinternalOO.make_class(shared$5, adjusted_point_init);

var tmp = Curry._2(adjusted_point[0], undefined, 31);

eq("File \"class3_test.ml\", line 28, characters 13-20", Caml_oo_curry.js1(291546447, 2, tmp), 30);

function new_init(obj_init, self, x_init) {
  return Curry._2(obj_init, self, Math.imul(x_init / 10 | 0, 10));
}

var partial_arg = point[0];

function adjusted_point2_0(param, param$1) {
  return new_init(partial_arg, param, param$1);
}

function adjusted_point2_1(table) {
  var env_init = Curry._1(point[1], table);
  return function (envs) {
    var partial_arg = Curry._1(env_init, envs);
    return function (param, param$1) {
      return new_init(partial_arg, param, param$1);
    };
  };
}

var adjusted_point2_2 = point[2];

var adjusted_point2_3 = point[3];

var adjusted_point2 = [
  adjusted_point2_0,
  adjusted_point2_1,
  adjusted_point2_2,
  adjusted_point2_3
];

var tmp$1 = Curry._2(adjusted_point2_0, undefined, 31);

eq("File \"class3_test.ml\", line 33, characters 12-19", Caml_oo_curry.js1(291546447, 3, tmp$1), 30);

function printable_point_init($$class) {
  var x_init = CamlinternalOO.new_variable($$class, "");
  var ids = CamlinternalOO.new_methods_variables($$class, shared$9, shared$8);
  var print = ids[0];
  var move = ids[1];
  var get_x = ids[2];
  var x = ids[3];
  CamlinternalOO.set_methods($$class, [
        get_x,
        (function (self$4) {
            return self$4[x];
          }),
        move,
        (function (self$4, d) {
            self$4[x] = self$4[x] + d | 0;
          }),
        print,
        (function (self$4) {
            return Curry._1(self$4[0][get_x], self$4);
          })
      ]);
  return function (env, self, x_init$1) {
    var self$1 = CamlinternalOO.create_object_opt(self, $$class);
    self$1[x_init] = x_init$1;
    self$1[x] = x_init$1;
    return self$1;
  };
}

var printable_point = CamlinternalOO.make_class(shared$10, printable_point_init);

var p$1 = Curry._2(printable_point[0], undefined, 7);

eq("File \"class3_test.ml\", line 49, characters 11-18", Caml_oo_curry.js1(-930392019, 4, p$1), 7);

var ints = {
  contents: /* [] */0
};

var $$class = CamlinternalOO.create_table(shared$1);

var ids = CamlinternalOO.get_method_labels($$class, shared$1);

var register = ids[0];

var n = ids[1];

var len = ids[2];

CamlinternalOO.set_methods($$class, [
      n,
      (function (self$5) {
          return 1;
        }),
      register,
      (function (self$5) {
          ints.contents = {
            hd: self$5,
            tl: ints.contents
          };
        }),
      len,
      (function (self$5) {
          return List.length(ints.contents);
        })
    ]);

CamlinternalOO.init_class($$class);

var my_int = CamlinternalOO.create_object_opt(undefined, $$class);

Caml_oo_curry.js1(-794843549, 5, my_int);

Caml_oo_curry.js1(-794843549, 6, my_int);

console.log(Caml_oo_curry.js1(5393365, 7, my_int));

var v = [
  0,
  3
];

function printable_point2_init($$class) {
  var x_init = CamlinternalOO.new_variable($$class, "");
  var origin = CamlinternalOO.new_variable($$class, "");
  var ids = CamlinternalOO.new_methods_variables($$class, shared$9, shared$8);
  var print = ids[0];
  var move = ids[1];
  var get_x = ids[2];
  var x = ids[3];
  CamlinternalOO.set_methods($$class, [
        get_x,
        (function (self$6) {
            return self$6[x];
          }),
        move,
        (function (self$6, d) {
            self$6[x] = self$6[x] + d | 0;
          }),
        print,
        (function (self$6) {
            return Stdlib.print_int(Curry._1(self$6[0][get_x], self$6));
          })
      ]);
  CamlinternalOO.add_initializer($$class, (function (self$6) {
          console.log("initializingFile \"class3_test.ml\", line 76, characters 50-57");
          return Caml_array.set(v, 0, self$6[x]);
        }));
  return function (env, self, x_init$1) {
    var origin$1 = Math.imul(x_init$1 / 10 | 0, 10);
    var self$1 = CamlinternalOO.create_object_opt(self, $$class);
    self$1[origin] = origin$1;
    self$1[x_init] = x_init$1;
    self$1[x] = origin$1;
    return CamlinternalOO.run_initializers_opt(self, self$1, $$class);
  };
}

var printable_point2 = CamlinternalOO.make_class(shared$10, printable_point2_init);

Curry._2(printable_point2[0], undefined, 31);

eq("File \"class3_test.ml\", line 81, characters 12-19", v, [
      30,
      3
    ]);

function abstract_point_1($$class) {
  var x_init = CamlinternalOO.new_variable($$class, "");
  var ids = CamlinternalOO.get_method_labels($$class, shared$3);
  var get_x = ids[1];
  var get_offset = ids[2];
  CamlinternalOO.set_method($$class, get_offset, (function (self$7) {
          return Curry._1(self$7[0][get_x], self$7) - self$7[x_init] | 0;
        }));
  return function (env, self, x_init$1) {
    var self$1 = CamlinternalOO.create_object_opt(self, $$class);
    self$1[x_init] = x_init$1;
    return self$1;
  };
}

var abstract_point = [
  undefined,
  abstract_point_1,
  undefined,
  undefined
];

function vpoint_init($$class) {
  var x_init = CamlinternalOO.new_variable($$class, "");
  var ids = CamlinternalOO.new_methods_variables($$class, shared$3, shared$8);
  var move = ids[0];
  var get_x = ids[1];
  var x = ids[3];
  var inh = CamlinternalOO.inherits($$class, 0, shared, ["get_offset"], abstract_point, true);
  var obj_init = inh[0];
  CamlinternalOO.set_methods($$class, [
        get_x,
        (function (self$8) {
            return self$8[x];
          }),
        move,
        (function (self$8, d) {
            self$8[x] = self$8[x] + d | 0;
          })
      ]);
  return function (env, self, x_init$1) {
    var self$1 = CamlinternalOO.create_object_opt(self, $$class);
    self$1[x_init] = x_init$1;
    Curry._2(obj_init, self$1, x_init$1);
    self$1[x] = x_init$1;
    return CamlinternalOO.run_initializers_opt(self, self$1, $$class);
  };
}

var vpoint = CamlinternalOO.make_class(shared$5, vpoint_init);

var h = Curry._2(vpoint[0], undefined, 3);

Caml_oo_curry.js2(-933174511, 8, h, 32);

var v$1 = Caml_oo_curry.js1(-792262820, 9, h);

eq("File \"class3_test.ml\", line 107, characters 12-19", v$1, 32);

function abstract_point2_1($$class) {
  var ids = CamlinternalOO.new_methods_variables($$class, shared$2, shared$8);
  var move = ids[0];
  var x = ids[1];
  CamlinternalOO.set_method($$class, move, (function (self$9, d) {
          self$9[x] = self$9[x] + d | 0;
        }));
  return function (env, self) {
    return CamlinternalOO.create_object_opt(self, $$class);
  };
}

var abstract_point2 = [
  undefined,
  abstract_point2_1,
  undefined,
  undefined
];

function point2_init($$class) {
  var x_init = CamlinternalOO.new_variable($$class, "");
  var ids = CamlinternalOO.get_method_labels($$class, shared$4);
  var get_offset = ids[1];
  var inh = CamlinternalOO.inherits($$class, shared$8, 0, shared$2, abstract_point2, true);
  var obj_init = inh[0];
  var x = inh[1];
  CamlinternalOO.set_method($$class, get_offset, (function (self$10) {
          return self$10[x] - self$10[x_init] | 0;
        }));
  return function (env, self, x_init$1) {
    var self$1 = CamlinternalOO.create_object_opt(self, $$class);
    self$1[x_init] = x_init$1;
    Curry._1(obj_init, self$1);
    self$1[x] = x_init$1;
    return CamlinternalOO.run_initializers_opt(self, self$1, $$class);
  };
}

var point2 = CamlinternalOO.make_class(shared$4, point2_init);

var h$1 = Curry._2(point2[0], undefined, 3);

Caml_oo_curry.js2(-933174511, 10, h$1, 32);

var vv = Caml_oo_curry.js1(-792262820, 11, h$1);

eq("File \"class3_test.ml\", line 128, characters 12-19", vv, 32);

function restricted_point_init($$class) {
  var x_init = CamlinternalOO.new_variable($$class, "");
  var ids = CamlinternalOO.new_methods_variables($$class, shared$11, shared$8);
  var move = ids[0];
  var get_x = ids[1];
  var bump = ids[2];
  var x = ids[3];
  CamlinternalOO.set_methods($$class, [
        get_x,
        (function (self$11) {
            return self$11[x];
          }),
        move,
        (function (self$11, d) {
            self$11[x] = self$11[x] + d | 0;
          }),
        bump,
        (function (self$11) {
            return Curry._2(self$11[0][move], self$11, 1);
          })
      ]);
  return function (env, self, x_init$1) {
    var self$1 = CamlinternalOO.create_object_opt(self, $$class);
    self$1[x_init] = x_init$1;
    self$1[x] = x_init$1;
    return self$1;
  };
}

var restricted_point = CamlinternalOO.make_class([
      "bump",
      "get_x"
    ], restricted_point_init);

var p$2 = Curry._2(restricted_point[0], undefined, 0);

Caml_oo_curry.js1(-1054863370, 12, p$2);

var h$2 = Caml_oo_curry.js1(291546447, 13, p$2);

eq("File \"class3_test.ml\", line 144, characters 12-19", h$2, 1);

function point_again_init($$class) {
  var x = CamlinternalOO.new_variable($$class, "");
  CamlinternalOO.get_method_labels($$class, shared$11);
  var inh = CamlinternalOO.inherits($$class, shared$8, 0, shared$7, restricted_point, true);
  var obj_init = inh[0];
  return function (env, self, x$1) {
    var self$1 = CamlinternalOO.create_object_opt(self, $$class);
    self$1[x] = x$1;
    Curry._2(obj_init, self$1, x$1);
    return CamlinternalOO.run_initializers_opt(self, self$1, $$class);
  };
}

var point_again = CamlinternalOO.make_class(shared$6, point_again_init);

var p$3 = Curry._2(point_again[0], undefined, 3);

Caml_oo_curry.js2(-933174511, 14, p$3, 3);

Caml_oo_curry.js1(-1054863370, 15, p$3);

Caml_oo_curry.js1(-1054863370, 16, p$3);

var hh = Caml_oo_curry.js1(291546447, 17, p$3);

eq("File \"class3_test.ml\", line 161, characters 12-19", hh, 8);

function point_again2_init($$class) {
  var x = CamlinternalOO.new_variable($$class, "");
  CamlinternalOO.get_method_labels($$class, shared$11);
  var inh = CamlinternalOO.inherits($$class, shared$8, 0, shared$7, restricted_point, true);
  var obj_init = inh[0];
  return function (env, self, x$1) {
    var self$1 = CamlinternalOO.create_object_opt(self, $$class);
    self$1[x] = x$1;
    Curry._2(obj_init, self$1, x$1);
    return CamlinternalOO.run_initializers_opt(self, self$1, $$class);
  };
}

var point_again2 = CamlinternalOO.make_class(shared$6, point_again2_init);

var p$4 = Curry._2(point_again2[0], undefined, 3);

Caml_oo_curry.js2(-933174511, 18, p$4, 30);

Caml_oo_curry.js1(-1054863370, 19, p$4);

Caml_oo_curry.js1(-1054863370, 20, p$4);

var hhh = Caml_oo_curry.js1(291546447, 21, p$4);

eq("File \"class3_test.ml\", line 177, characters 12-19", hhh, 35);

function point_again3_init($$class) {
  var x = CamlinternalOO.new_variable($$class, "");
  var ids = CamlinternalOO.get_method_labels($$class, shared$11);
  var move = ids[0];
  var inh = CamlinternalOO.inherits($$class, shared$8, 0, shared$7, restricted_point, true);
  var obj_init = inh[0];
  var move$1 = inh[4];
  CamlinternalOO.set_method($$class, move, Curry.__1(move$1));
  return function (env, self, x$1) {
    var self$1 = CamlinternalOO.create_object_opt(self, $$class);
    self$1[x] = x$1;
    Curry._2(obj_init, self$1, x$1);
    return CamlinternalOO.run_initializers_opt(self, self$1, $$class);
  };
}

var point_again3 = CamlinternalOO.make_class(shared$6, point_again3_init);

var p$5 = Curry._2(point_again3[0], undefined, 3);

Caml_oo_curry.js2(-933174511, 22, p$5, 300);

Caml_oo_curry.js1(-1054863370, 23, p$5);

Caml_oo_curry.js1(-1054863370, 24, p$5);

var hhhh = Caml_oo_curry.js1(291546447, 25, p$5);

eq("File \"class3_test.ml\", line 195, characters 12-19", hhhh, 305);

Mt.from_pair_suites("Class3_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.point = point;
exports.adjusted_point = adjusted_point;
exports.adjusted_point2 = adjusted_point2;
exports.printable_point = printable_point;
exports.my_int = my_int;
exports.printable_point2 = printable_point2;
exports.abstract_point = abstract_point;
exports.vpoint = vpoint;
exports.v = v$1;
exports.abstract_point2 = abstract_point2;
exports.point2 = point2;
exports.vv = vv;
exports.restricted_point = restricted_point;
exports.p = p$2;
exports.h = h$2;
exports.point_again = point_again;
exports.hh = hh;
exports.point_again2 = point_again2;
exports.hhh = hhh;
exports.point_again3 = point_again3;
exports.hhhh = hhhh;
/* point Not a pure module */
