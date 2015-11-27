var requirejs, require, define;
(function(e) {
	function h(e, t) {
		return f.call(e, t)
	}

	function p(e, t) {
		var n, r, i, s, o, a, f, l, h, p, d, v = t && t.split("/"),
			m = u.map,
			g = m && m["*"] || {};
		if (e && e.charAt(0) === ".")
			if (t) {
				v = v.slice(0, v.length - 1), e = e.split("/"), o = e.length - 1, u.nodeIdCompat && c.test(e[o]) && (e[o] = e[o].replace(c, "")), e = v.concat(e);
				for (h = 0; h < e.length; h += 1) {
					d = e[h];
					if (d === ".") e.splice(h, 1), h -= 1;
					else if (d === "..") {
						if (h === 1 && (e[2] === ".." || e[0] === "..")) break;
						h > 0 && (e.splice(h - 1, 2), h -= 2)
					}
				}
				e = e.join("/")
			} else e.indexOf("./") === 0 && (e = e.substring(2));
		if ((v || g) && m) {
			n = e.split("/");
			for (h = n.length; h > 0; h -= 1) {
				r = n.slice(0, h).join("/");
				if (v)
					for (p = v.length; p > 0; p -= 1) {
						i = m[v.slice(0, p).join("/")];
						if (i) {
							i = i[r];
							if (i) {
								s = i, a = h;
								break
							}
						}
					}
				if (s) break;
				!f && g && g[r] && (f = g[r], l = h)
			}!s && f && (s = f, a = l), s && (n.splice(0, a, s), e = n.join("/"))
		}
		return e
	}

	function d(t, r) {
		return function() {
			return n.apply(e, l.call(arguments, 0).concat([t, r]))
		}
	}

	function v(e) {
		return function(t) {
			return p(t, e)
		}
	}

	function m(e) {
		return function(t) {
			s[e] = t
		}
	}

	function g(n) {
		if (h(o, n)) {
			var r = o[n];
			delete o[n], a[n] = !0, t.apply(e, r)
		}
		if (!h(s, n) && !h(a, n)) throw new Error("No " + n);
		return s[n]
	}

	function y(e) {
		var t, n = e ? e.indexOf("!") : -1;
		return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
	}

	function b(e) {
		return function() {
			return u && u.config && u.config[e] || {}
		}
	}
	var t, n, r, i, s = {},
		o = {},
		u = {},
		a = {},
		f = Object.prototype.hasOwnProperty,
		l = [].slice,
		c = /\.js$/;
	r = function(e, t) {
		var n, r = y(e),
			i = r[0];
		return e = r[1], i && (i = p(i, t), n = g(i)), i ? n && n.normalize ? e = n.normalize(e, v(t)) : e = p(e, t) : (e = p(e, t), r = y(e), i = r[0], e = r[1], i && (n = g(i))), {
			f: i ? i + "!" + e : e,
			n: e,
			pr: i,
			p: n
		}
	}, i = {
		require: function(e) {
			return d(e)
		},
		exports: function(e) {
			var t = s[e];
			return typeof t != "undefined" ? t : s[e] = {}
		},
		module: function(e) {
			return {
				id: e,
				uri: "",
				exports: s[e],
				config: b(e)
			}
		}
	}, t = function(t, n, u, f) {
		var l, c, p, v, y, b = [],
			w = typeof u,
			E;
		f = f || t;
		if (w === "undefined" || w === "function") {
			n = !n.length && u.length ? ["require", "exports", "module"] : n;
			for (y = 0; y < n.length; y += 1) {
				v = r(n[y], f), c = v.f;
				if (c === "require") b[y] = i.require(t);
				else if (c === "exports") b[y] = i.exports(t), E = !0;
				else if (c === "module") l = b[y] = i.module(t);
				else if (h(s, c) || h(o, c) || h(a, c)) b[y] = g(c);
				else {
					if (!v.p) throw new Error(t + " missing " + c);
					v.p.load(v.n, d(f, !0), m(c), {}), b[y] = s[c]
				}
			}
			p = u ? u.apply(s[t], b) : undefined;
			if (t)
				if (l && l.exports !== e && l.exports !== s[t]) s[t] = l.exports;
				else if (p !== e || !E) s[t] = p
		} else t && (s[t] = u)
	}, requirejs = require = n = function(s, o, a, f, l) {
		if (typeof s == "string") return i[s] ? i[s](o) : g(r(s, o).f);
		if (!s.splice) {
			u = s, u.deps && n(u.deps, u.callback);
			if (!o) return;
			o.splice ? (s = o, o = a, a = null) : s = e
		}
		return o = o || function() {}, typeof a == "function" && (a = f, f = l), f ? t(e, s, o, a) : setTimeout(function() {
			t(e, s, o, a)
		}, 4), n
	}, n.config = function(e) {
		return n(e)
	}, requirejs._defined = s, define = function(e, t, n) {
		t.splice || (n = t, t = []), !h(s, e) && !h(o, e) && (o[e] = [e, t, n])
	}, define.amd = {
		jQuery: !0
	}
})(), define("almond", function() {}),
	function(e, t) {
		typeof define == "function" && define.amd ? define("handlebars", [], t) : typeof exports == "object" ? module.exports = t() : e.Handlebars = e.Handlebars || t()
	}(this, function() {
		var e = function() {
				"use strict";

				function t(e) {
					this.string = e
				}
				var e;
				return t.prototype.toString = function() {
					return "" + this.string
				}, e = t, e
			}(),
			t = function(e) {
				"use strict";

				function o(e) {
					return r[e]
				}

				function u(e) {
					for (var t = 1; t < arguments.length; t++)
						for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
					return e
				}

				function c(e) {
					return e instanceof n ? e.toString() : e == null ? "" : e ? (e = "" + e, s.test(e) ? e.replace(i, o) : e) : e + ""
				}

				function h(e) {
					return !e && e !== 0 ? !0 : l(e) && e.length === 0 ? !0 : !1
				}

				function p(e, t) {
					return (e ? e + "." : "") + t
				}
				var t = {},
					n = e,
					r = {
						"&": "&amp;",
						"<": "&lt;",
						">": "&gt;",
						'"': "&quot;",
						"'": "&#x27;",
						"`": "&#x60;"
					},
					i = /[&<>"'`]/g,
					s = /[&<>"'`]/;
				t.extend = u;
				var a = Object.prototype.toString;
				t.toString = a;
				var f = function(e) {
					return typeof e == "function"
				};
				f(/x/) && (f = function(e) {
					return typeof e == "function" && a.call(e) === "[object Function]"
				});
				var f;
				t.isFunction = f;
				var l = Array.isArray || function(e) {
					return e && typeof e == "object" ? a.call(e) === "[object Array]" : !1
				};
				return t.isArray = l, t.escapeExpression = c, t.isEmpty = h, t.appendContextPath = p, t
			}(e),
			n = function() {
				"use strict";

				function n(e, n) {
					var r;
					n && n.firstLine && (r = n.firstLine, e += " - " + r + ":" + n.firstColumn);
					var i = Error.prototype.constructor.call(this, e);
					for (var s = 0; s < t.length; s++) this[t[s]] = i[t[s]];
					r && (this.lineNumber = r, this.column = n.firstColumn)
				}
				var e, t = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
				return n.prototype = new Error, e = n, e
			}(),
			r = function(e, t) {
				"use strict";

				function h(e, t) {
					this.helpers = e || {}, this.partials = t || {}, p(this)
				}

				function p(e) {
					e.registerHelper("helperMissing", function() {
						if (arguments.length === 1) return undefined;
						throw new i("Missing helper: '" + arguments[arguments.length - 1].name + "'")
					}), e.registerHelper("blockHelperMissing", function(t, n) {
						var i = n.inverse,
							s = n.fn;
						if (t === !0) return s(this);
						if (t === !1 || t == null) return i(this);
						if (a(t)) return t.length > 0 ? (n.ids && (n.ids = [n.name]), e.helpers.each(t, n)) : i(this);
						if (n.data && n.ids) {
							var o = m(n.data);
							o.contextPath = r.appendContextPath(n.data.contextPath, n.name), n = {
								data: o
							}
						}
						return s(t, n)
					}), e.registerHelper("each", function(e, t) {
						if (!t) throw new i("Must pass iterator to #each");
						var n = t.fn,
							s = t.inverse,
							o = 0,
							u = "",
							l, c;
						t.data && t.ids && (c = r.appendContextPath(t.data.contextPath, t.ids[0]) + "."), f(e) && (e = e.call(this)), t.data && (l = m(t.data));
						if (e && typeof e == "object")
							if (a(e))
								for (var h = e.length; o < h; o++) l && (l.index = o, l.first = o === 0, l.last = o === e.length - 1, c && (l.contextPath = c + o)), u += n(e[o], {
									data: l
								});
							else
								for (var p in e) e.hasOwnProperty(p) && (l && (l.key = p, l.index = o, l.first = o === 0, c && (l.contextPath = c + p)), u += n(e[p], {
									data: l
								}), o++);
						return o === 0 && (u = s(this)), u
					}), e.registerHelper("if", function(e, t) {
						return f(e) && (e = e.call(this)), !t.hash.includeZero && !e || r.isEmpty(e) ? t.inverse(this) : t.fn(this)
					}), e.registerHelper("unless", function(t, n) {
						return e.helpers["if"].call(this, t, {
							fn: n.inverse,
							inverse: n.fn,
							hash: n.hash
						})
					}), e.registerHelper("with", function(e, t) {
						f(e) && (e = e.call(this));
						var n = t.fn;
						if (!r.isEmpty(e)) {
							if (t.data && t.ids) {
								var i = m(t.data);
								i.contextPath = r.appendContextPath(t.data.contextPath, t.ids[0]), t = {
									data: i
								}
							}
							return n(e, t)
						}
						return t.inverse(this)
					}), e.registerHelper("log", function(t, n) {
						var r = n.data && n.data.level != null ? parseInt(n.data.level, 10) : 1;
						e.log(r, t)
					}), e.registerHelper("lookup", function(e, t) {
						return e && e[t]
					})
				}
				var n = {},
					r = e,
					i = t,
					s = "2.0.0";
				n.VERSION = s;
				var o = 6;
				n.COMPILER_REVISION = o;
				var u = {
					1: "<= 1.0.rc.2",
					2: "== 1.0.0-rc.3",
					3: "== 1.0.0-rc.4",
					4: "== 1.x.x",
					5: "== 2.0.0-alpha.x",
					6: ">= 2.0.0-beta.1"
				};
				n.REVISION_CHANGES = u;
				var a = r.isArray,
					f = r.isFunction,
					l = r.toString,
					c = "[object Object]";
				n.HandlebarsEnvironment = h, h.prototype = {
					constructor: h,
					logger: d,
					log: v,
					registerHelper: function(e, t) {
						if (l.call(e) === c) {
							if (t) throw new i("Arg not supported with multiple helpers");
							r.extend(this.helpers, e)
						} else this.helpers[e] = t
					},
					unregisterHelper: function(e) {
						delete this.helpers[e]
					},
					registerPartial: function(e, t) {
						l.call(e) === c ? r.extend(this.partials, e) : this.partials[e] = t
					},
					unregisterPartial: function(e) {
						delete this.partials[e]
					}
				};
				var d = {
					methodMap: {
						0: "debug",
						1: "info",
						2: "warn",
						3: "error"
					},
					DEBUG: 0,
					INFO: 1,
					WARN: 2,
					ERROR: 3,
					level: 3,
					log: function(e, t) {
						if (d.level <= e) {
							var n = d.methodMap[e];
							typeof console != "undefined" && console[n] && console[n].call(console, t)
						}
					}
				};
				n.logger = d;
				var v = d.log;
				n.log = v;
				var m = function(e) {
					var t = r.extend({}, e);
					return t._parent = e, t
				};
				return n.createFrame = m, n
			}(t, n),
			i = function(e, t, n) {
				"use strict";

				function f(e) {
					var t = e && e[0] || 1,
						n = o;
					if (t !== n) {
						if (t < n) {
							var r = u[n],
								i = u[t];
							throw new s("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + r + ") or downgrade your runtime to an older version (" + i + ").")
						}
						throw new s("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
					}
				}

				function l(e, t) {
					if (!t) throw new s("No environment passed to template");
					if (!e || !e.main) throw new s("Unknown template object: " + typeof e);
					t.VM.checkRevision(e.compiler);
					var n = function(n, r, o, u, a, f, l, c, h) {
							a && (u = i.extend({}, u, a));
							var p = t.VM.invokePartial.call(this, n, o, u, f, l, c, h);
							if (p == null && t.compile) {
								var d = {
									helpers: f,
									partials: l,
									data: c,
									depths: h
								};
								l[o] = t.compile(n, {
									data: c !== undefined,
									compat: e.compat
								}, t), p = l[o](u, d)
							}
							if (p != null) {
								if (r) {
									var v = p.split("\n");
									for (var m = 0, g = v.length; m < g; m++) {
										if (!v[m] && m + 1 === g) break;
										v[m] = r + v[m]
									}
									p = v.join("\n")
								}
								return p
							}
							throw new s("The partial " + o + " could not be compiled when running in runtime-only mode")
						},
						r = {
							lookup: function(e, t) {
								var n = e.length;
								for (var r = 0; r < n; r++)
									if (e[r] && e[r][t] != null) return e[r][t]
							},
							lambda: function(e, t) {
								return typeof e == "function" ? e.call(t) : e
							},
							escapeExpression: i.escapeExpression,
							invokePartial: n,
							fn: function(t) {
								return e[t]
							},
							programs: [],
							program: function(e, t, n) {
								var r = this.programs[e],
									i = this.fn(e);
								return t || n ? r = c(this, e, i, t, n) : r || (r = this.programs[e] = c(this, e, i)), r
							},
							data: function(e, t) {
								while (e && t--) e = e._parent;
								return e
							},
							merge: function(e, t) {
								var n = e || t;
								return e && t && e !== t && (n = i.extend({}, t, e)), n
							},
							noop: t.VM.noop,
							compilerInfo: e.compiler
						},
						o = function(t, n) {
							n = n || {};
							var i = n.data;
							o._setup(n), !n.partial && e.useData && (i = d(t, i));
							var s;
							return e.useDepths && (s = n.depths ? [t].concat(n.depths) : [t]), e.main.call(r, t, r.helpers, r.partials, i, s)
						};
					return o.isTop = !0, o._setup = function(n) {
						n.partial ? (r.helpers = n.helpers, r.partials = n.partials) : (r.helpers = r.merge(n.helpers, t.helpers), e.usePartial && (r.partials = r.merge(n.partials, t.partials)))
					}, o._child = function(t, n, i) {
						if (e.useDepths && !i) throw new s("must pass parent depths");
						return c(r, t, e[t], n, i)
					}, o
				}

				function c(e, t, n, r, i) {
					var s = function(t, s) {
						return s = s || {}, n.call(e, t, e.helpers, e.partials, s.data || r, i && [t].concat(i))
					};
					return s.program = t, s.depth = i ? i.length : 0, s
				}

				function h(e, t, n, r, i, o, u) {
					var a = {
						partial: !0,
						helpers: r,
						partials: i,
						data: o,
						depths: u
					};
					if (e === undefined) throw new s("The partial " + t + " could not be found");
					if (e instanceof Function) return e(n, a)
				}

				function p() {
					return ""
				}

				function d(e, t) {
					if (!t || !("root" in t)) t = t ? a(t) : {}, t.root = e;
					return t
				}
				var r = {},
					i = e,
					s = t,
					o = n.COMPILER_REVISION,
					u = n.REVISION_CHANGES,
					a = n.createFrame;
				return r.checkRevision = f, r.template = l, r.program = c, r.invokePartial = h, r.noop = p, r
			}(t, n, r),
			s = function(e, t, n, r, i) {
				"use strict";
				var s, o = e,
					u = t,
					a = n,
					f = r,
					l = i,
					c = function() {
						var e = new o.HandlebarsEnvironment;
						return f.extend(e, o), e.SafeString = u, e.Exception = a, e.Utils = f, e.escapeExpression = f.escapeExpression, e.VM = l, e.template = function(t) {
							return l.template(t, e)
						}, e
					},
					h = c();
				return h.create = c, h["default"] = h, s = h, s
			}(r, e, n, t, i),
			o = function(e) {
				"use strict";

				function r(e) {
					e = e || {}, this.firstLine = e.first_line, this.firstColumn = e.first_column, this.lastColumn = e.last_column, this.lastLine = e.last_line
				}
				var t, n = e,
					i = {
						ProgramNode: function(e, t, n) {
							r.call(this, n), this.type = "program", this.statements = e, this.strip = t
						},
						MustacheNode: function(e, t, n, s, o) {
							r.call(this, o), this.type = "mustache", this.strip = s;
							if (n != null && n.charAt) {
								var u = n.charAt(3) || n.charAt(2);
								this.escaped = u !== "{" && u !== "&"
							} else this.escaped = !!n;
							e instanceof i.SexprNode ? this.sexpr = e : this.sexpr = new i.SexprNode(e, t), this.id = this.sexpr.id, this.params = this.sexpr.params, this.hash = this.sexpr.hash, this.eligibleHelper = this.sexpr.eligibleHelper, this.isHelper = this.sexpr.isHelper
						},
						SexprNode: function(e, t, n) {
							r.call(this, n), this.type = "sexpr", this.hash = t;
							var i = this.id = e[0],
								s = this.params = e.slice(1);
							this.isHelper = !!s.length || !!t, this.eligibleHelper = this.isHelper || i.isSimple
						},
						PartialNode: function(e, t, n, i, s) {
							r.call(this, s), this.type = "partial", this.partialName = e, this.context = t, this.hash = n, this.strip = i, this.strip.inlineStandalone = !0
						},
						BlockNode: function(e, t, n, i, s) {
							r.call(this, s), this.type = "block", this.mustache = e, this.program = t, this.inverse = n, this.strip = i, n && !t && (this.isInverse = !0)
						},
						RawBlockNode: function(e, t, s, o) {
							r.call(this, o);
							if (e.sexpr.id.original !== s) throw new n(e.sexpr.id.original + " doesn't match " + s, this);
							t = new i.ContentNode(t, o), this.type = "block", this.mustache = e, this.program = new i.ProgramNode([t], {}, o)
						},
						ContentNode: function(e, t) {
							r.call(this, t), this.type = "content", this.original = this.string = e
						},
						HashNode: function(e, t) {
							r.call(this, t), this.type = "hash", this.pairs = e
						},
						IdNode: function(e, t) {
							r.call(this, t), this.type = "ID";
							var i = "",
								s = [],
								o = 0,
								u = "";
							for (var a = 0, f = e.length; a < f; a++) {
								var l = e[a].part;
								i += (e[a].separator || "") + l;
								if (l === ".." || l === "." || l === "this") {
									if (s.length > 0) throw new n("Invalid path: " + i, this);
									l === ".." ? (o++, u += "../") : this.isScoped = !0
								} else s.push(l)
							}
							this.original = i, this.parts = s, this.string = s.join("."), this.depth = o, this.idName = u + this.string, this.isSimple = e.length === 1 && !this.isScoped && o === 0, this.stringModeValue = this.string
						},
						PartialNameNode: function(e, t) {
							r.call(this, t), this.type = "PARTIAL_NAME", this.name = e.original
						},
						DataNode: function(e, t) {
							r.call(this, t), this.type = "DATA", this.id = e, this.stringModeValue = e.stringModeValue, this.idName = "@" + e.stringModeValue
						},
						StringNode: function(e, t) {
							r.call(this, t), this.type = "STRING", this.original = this.string = this.stringModeValue = e
						},
						NumberNode: function(e, t) {
							r.call(this, t), this.type = "NUMBER", this.original = this.number = e, this.stringModeValue = Number(e)
						},
						BooleanNode: function(e, t) {
							r.call(this, t), this.type = "BOOLEAN", this.bool = e, this.stringModeValue = e === "true"
						},
						CommentNode: function(e, t) {
							r.call(this, t), this.type = "comment", this.comment = e, this.strip = {
								inlineStandalone: !0
							}
						}
					};
				return t = i, t
			}(n),
			u = function() {
				"use strict";
				var e, t = function() {
					function n() {
						this.yy = {}
					}
					var e = {
							trace: function() {},
							yy: {},
							symbols_: {
								error: 2,
								root: 3,
								program: 4,
								EOF: 5,
								program_repetition0: 6,
								statement: 7,
								mustache: 8,
								block: 9,
								rawBlock: 10,
								partial: 11,
								CONTENT: 12,
								COMMENT: 13,
								openRawBlock: 14,
								END_RAW_BLOCK: 15,
								OPEN_RAW_BLOCK: 16,
								sexpr: 17,
								CLOSE_RAW_BLOCK: 18,
								openBlock: 19,
								block_option0: 20,
								closeBlock: 21,
								openInverse: 22,
								block_option1: 23,
								OPEN_BLOCK: 24,
								CLOSE: 25,
								OPEN_INVERSE: 26,
								inverseAndProgram: 27,
								INVERSE: 28,
								OPEN_ENDBLOCK: 29,
								path: 30,
								OPEN: 31,
								OPEN_UNESCAPED: 32,
								CLOSE_UNESCAPED: 33,
								OPEN_PARTIAL: 34,
								partialName: 35,
								param: 36,
								partial_option0: 37,
								partial_option1: 38,
								sexpr_repetition0: 39,
								sexpr_option0: 40,
								dataName: 41,
								STRING: 42,
								NUMBER: 43,
								BOOLEAN: 44,
								OPEN_SEXPR: 45,
								CLOSE_SEXPR: 46,
								hash: 47,
								hash_repetition_plus0: 48,
								hashSegment: 49,
								ID: 50,
								EQUALS: 51,
								DATA: 52,
								pathSegments: 53,
								SEP: 54,
								$accept: 0,
								$end: 1
							},
							terminals_: {
								2: "error",
								5: "EOF",
								12: "CONTENT",
								13: "COMMENT",
								15: "END_RAW_BLOCK",
								16: "OPEN_RAW_BLOCK",
								18: "CLOSE_RAW_BLOCK",
								24: "OPEN_BLOCK",
								25: "CLOSE",
								26: "OPEN_INVERSE",
								28: "INVERSE",
								29: "OPEN_ENDBLOCK",
								31: "OPEN",
								32: "OPEN_UNESCAPED",
								33: "CLOSE_UNESCAPED",
								34: "OPEN_PARTIAL",
								42: "STRING",
								43: "NUMBER",
								44: "BOOLEAN",
								45: "OPEN_SEXPR",
								46: "CLOSE_SEXPR",
								50: "ID",
								51: "EQUALS",
								52: "DATA",
								54: "SEP"
							},
							productions_: [0, [3, 2],
								[4, 1],
								[7, 1],
								[7, 1],
								[7, 1],
								[7, 1],
								[7, 1],
								[7, 1],
								[10, 3],
								[14, 3],
								[9, 4],
								[9, 4],
								[19, 3],
								[22, 3],
								[27, 2],
								[21, 3],
								[8, 3],
								[8, 3],
								[11, 5],
								[11, 4],
								[17, 3],
								[17, 1],
								[36, 1],
								[36, 1],
								[36, 1],
								[36, 1],
								[36, 1],
								[36, 3],
								[47, 1],
								[49, 3],
								[35, 1],
								[35, 1],
								[35, 1],
								[41, 2],
								[30, 1],
								[53, 3],
								[53, 1],
								[6, 0],
								[6, 2],
								[20, 0],
								[20, 1],
								[23, 0],
								[23, 1],
								[37, 0],
								[37, 1],
								[38, 0],
								[38, 1],
								[39, 0],
								[39, 2],
								[40, 0],
								[40, 1],
								[48, 1],
								[48, 2]
							],
							performAction: function(t, n, r, i, s, o, u) {
								var a = o.length - 1;
								switch (s) {
									case 1:
										return i.prepareProgram(o[a - 1].statements, !0), o[a - 1];
									case 2:
										this.$ = new i.ProgramNode(i.prepareProgram(o[a]), {}, this._$);
										break;
									case 3:
										this.$ = o[a];
										break;
									case 4:
										this.$ = o[a];
										break;
									case 5:
										this.$ = o[a];
										break;
									case 6:
										this.$ = o[a];
										break;
									case 7:
										this.$ = new i.ContentNode(o[a], this._$);
										break;
									case 8:
										this.$ = new i.CommentNode(o[a], this._$);
										break;
									case 9:
										this.$ = new i.RawBlockNode(o[a - 2], o[a - 1], o[a], this._$);
										break;
									case 10:
										this.$ = new i.MustacheNode(o[a - 1], null, "", "", this._$);
										break;
									case 11:
										this.$ = i.prepareBlock(o[a - 3], o[a - 2], o[a - 1], o[a], !1, this._$);
										break;
									case 12:
										this.$ = i.prepareBlock(o[a - 3], o[a - 2], o[a - 1], o[a], !0, this._$);
										break;
									case 13:
										this.$ = new i.MustacheNode(o[a - 1], null, o[a - 2], i.stripFlags(o[a - 2], o[a]), this._$);
										break;
									case 14:
										this.$ = new i.MustacheNode(o[a - 1], null, o[a - 2], i.stripFlags(o[a - 2], o[a]), this._$);
										break;
									case 15:
										this.$ = {
											strip: i.stripFlags(o[a - 1], o[a - 1]),
											program: o[a]
										};
										break;
									case 16:
										this.$ = {
											path: o[a - 1],
											strip: i.stripFlags(o[a - 2], o[a])
										};
										break;
									case 17:
										this.$ = new i.MustacheNode(o[a - 1], null, o[a - 2], i.stripFlags(o[a - 2], o[a]), this._$);
										break;
									case 18:
										this.$ = new i.MustacheNode(o[a - 1], null, o[a - 2], i.stripFlags(o[a - 2], o[a]), this._$);
										break;
									case 19:
										this.$ = new i.PartialNode(o[a - 3], o[a - 2], o[a - 1], i.stripFlags(o[a - 4], o[a]), this._$);
										break;
									case 20:
										this.$ = new i.PartialNode(o[a - 2], undefined, o[a - 1], i.stripFlags(o[a - 3], o[a]), this._$);
										break;
									case 21:
										this.$ = new i.SexprNode([o[a - 2]].concat(o[a - 1]), o[a], this._$);
										break;
									case 22:
										this.$ = new i.SexprNode([o[a]], null, this._$);
										break;
									case 23:
										this.$ = o[a];
										break;
									case 24:
										this.$ = new i.StringNode(o[a], this._$);
										break;
									case 25:
										this.$ = new i.NumberNode(o[a], this._$);
										break;
									case 26:
										this.$ = new i.BooleanNode(o[a], this._$);
										break;
									case 27:
										this.$ = o[a];
										break;
									case 28:
										o[a - 1].isHelper = !0, this.$ = o[a - 1];
										break;
									case 29:
										this.$ = new i.HashNode(o[a], this._$);
										break;
									case 30:
										this.$ = [o[a - 2], o[a]];
										break;
									case 31:
										this.$ = new i.PartialNameNode(o[a], this._$);
										break;
									case 32:
										this.$ = new i.PartialNameNode(new i.StringNode(o[a], this._$), this._$);
										break;
									case 33:
										this.$ = new i.PartialNameNode(new i.NumberNode(o[a], this._$));
										break;
									case 34:
										this.$ = new i.DataNode(o[a], this._$);
										break;
									case 35:
										this.$ = new i.IdNode(o[a], this._$);
										break;
									case 36:
										o[a - 2].push({
											part: o[a],
											separator: o[a - 1]
										}), this.$ = o[a - 2];
										break;
									case 37:
										this.$ = [{
											part: o[a]
										}];
										break;
									case 38:
										this.$ = [];
										break;
									case 39:
										o[a - 1].push(o[a]);
										break;
									case 48:
										this.$ = [];
										break;
									case 49:
										o[a - 1].push(o[a]);
										break;
									case 52:
										this.$ = [o[a]];
										break;
									case 53:
										o[a - 1].push(o[a])
								}
							},
							table: [{
								3: 1,
								4: 2,
								5: [2, 38],
								6: 3,
								12: [2, 38],
								13: [2, 38],
								16: [2, 38],
								24: [2, 38],
								26: [2, 38],
								31: [2, 38],
								32: [2, 38],
								34: [2, 38]
							}, {
								1: [3]
							}, {
								5: [1, 4]
							}, {
								5: [2, 2],
								7: 5,
								8: 6,
								9: 7,
								10: 8,
								11: 9,
								12: [1, 10],
								13: [1, 11],
								14: 16,
								16: [1, 20],
								19: 14,
								22: 15,
								24: [1, 18],
								26: [1, 19],
								28: [2, 2],
								29: [2, 2],
								31: [1, 12],
								32: [1, 13],
								34: [1, 17]
							}, {
								1: [2, 1]
							}, {
								5: [2, 39],
								12: [2, 39],
								13: [2, 39],
								16: [2, 39],
								24: [2, 39],
								26: [2, 39],
								28: [2, 39],
								29: [2, 39],
								31: [2, 39],
								32: [2, 39],
								34: [2, 39]
							}, {
								5: [2, 3],
								12: [2, 3],
								13: [2, 3],
								16: [2, 3],
								24: [2, 3],
								26: [2, 3],
								28: [2, 3],
								29: [2, 3],
								31: [2, 3],
								32: [2, 3],
								34: [2, 3]
							}, {
								5: [2, 4],
								12: [2, 4],
								13: [2, 4],
								16: [2, 4],
								24: [2, 4],
								26: [2, 4],
								28: [2, 4],
								29: [2, 4],
								31: [2, 4],
								32: [2, 4],
								34: [2, 4]
							}, {
								5: [2, 5],
								12: [2, 5],
								13: [2, 5],
								16: [2, 5],
								24: [2, 5],
								26: [2, 5],
								28: [2, 5],
								29: [2, 5],
								31: [2, 5],
								32: [2, 5],
								34: [2, 5]
							}, {
								5: [2, 6],
								12: [2, 6],
								13: [2, 6],
								16: [2, 6],
								24: [2, 6],
								26: [2, 6],
								28: [2, 6],
								29: [2, 6],
								31: [2, 6],
								32: [2, 6],
								34: [2, 6]
							}, {
								5: [2, 7],
								12: [2, 7],
								13: [2, 7],
								16: [2, 7],
								24: [2, 7],
								26: [2, 7],
								28: [2, 7],
								29: [2, 7],
								31: [2, 7],
								32: [2, 7],
								34: [2, 7]
							}, {
								5: [2, 8],
								12: [2, 8],
								13: [2, 8],
								16: [2, 8],
								24: [2, 8],
								26: [2, 8],
								28: [2, 8],
								29: [2, 8],
								31: [2, 8],
								32: [2, 8],
								34: [2, 8]
							}, {
								17: 21,
								30: 22,
								41: 23,
								50: [1, 26],
								52: [1, 25],
								53: 24
							}, {
								17: 27,
								30: 22,
								41: 23,
								50: [1, 26],
								52: [1, 25],
								53: 24
							}, {
								4: 28,
								6: 3,
								12: [2, 38],
								13: [2, 38],
								16: [2, 38],
								24: [2, 38],
								26: [2, 38],
								28: [2, 38],
								29: [2, 38],
								31: [2, 38],
								32: [2, 38],
								34: [2, 38]
							}, {
								4: 29,
								6: 3,
								12: [2, 38],
								13: [2, 38],
								16: [2, 38],
								24: [2, 38],
								26: [2, 38],
								28: [2, 38],
								29: [2, 38],
								31: [2, 38],
								32: [2, 38],
								34: [2, 38]
							}, {
								12: [1, 30]
							}, {
								30: 32,
								35: 31,
								42: [1, 33],
								43: [1, 34],
								50: [1, 26],
								53: 24
							}, {
								17: 35,
								30: 22,
								41: 23,
								50: [1, 26],
								52: [1, 25],
								53: 24
							}, {
								17: 36,
								30: 22,
								41: 23,
								50: [1, 26],
								52: [1, 25],
								53: 24
							}, {
								17: 37,
								30: 22,
								41: 23,
								50: [1, 26],
								52: [1, 25],
								53: 24
							}, {
								25: [1, 38]
							}, {
								18: [2, 48],
								25: [2, 48],
								33: [2, 48],
								39: 39,
								42: [2, 48],
								43: [2, 48],
								44: [2, 48],
								45: [2, 48],
								46: [2, 48],
								50: [2, 48],
								52: [2, 48]
							}, {
								18: [2, 22],
								25: [2, 22],
								33: [2, 22],
								46: [2, 22]
							}, {
								18: [2, 35],
								25: [2, 35],
								33: [2, 35],
								42: [2, 35],
								43: [2, 35],
								44: [2, 35],
								45: [2, 35],
								46: [2, 35],
								50: [2, 35],
								52: [2, 35],
								54: [1, 40]
							}, {
								30: 41,
								50: [1, 26],
								53: 24
							}, {
								18: [2, 37],
								25: [2, 37],
								33: [2, 37],
								42: [2, 37],
								43: [2, 37],
								44: [2, 37],
								45: [2, 37],
								46: [2, 37],
								50: [2, 37],
								52: [2, 37],
								54: [2, 37]
							}, {
								33: [1, 42]
							}, {
								20: 43,
								27: 44,
								28: [1, 45],
								29: [2, 40]
							}, {
								23: 46,
								27: 47,
								28: [1, 45],
								29: [2, 42]
							}, {
								15: [1, 48]
							}, {
								25: [2, 46],
								30: 51,
								36: 49,
								38: 50,
								41: 55,
								42: [1, 52],
								43: [1, 53],
								44: [1, 54],
								45: [1, 56],
								47: 57,
								48: 58,
								49: 60,
								50: [1, 59],
								52: [1, 25],
								53: 24
							}, {
								25: [2, 31],
								42: [2, 31],
								43: [2, 31],
								44: [2, 31],
								45: [2, 31],
								50: [2, 31],
								52: [2, 31]
							}, {
								25: [2, 32],
								42: [2, 32],
								43: [2, 32],
								44: [2, 32],
								45: [2, 32],
								50: [2, 32],
								52: [2, 32]
							}, {
								25: [2, 33],
								42: [2, 33],
								43: [2, 33],
								44: [2, 33],
								45: [2, 33],
								50: [2, 33],
								52: [2, 33]
							}, {
								25: [1, 61]
							}, {
								25: [1, 62]
							}, {
								18: [1, 63]
							}, {
								5: [2, 17],
								12: [2, 17],
								13: [2, 17],
								16: [2, 17],
								24: [2, 17],
								26: [2, 17],
								28: [2, 17],
								29: [2, 17],
								31: [2, 17],
								32: [2, 17],
								34: [2, 17]
							}, {
								18: [2, 50],
								25: [2, 50],
								30: 51,
								33: [2, 50],
								36: 65,
								40: 64,
								41: 55,
								42: [1, 52],
								43: [1, 53],
								44: [1, 54],
								45: [1, 56],
								46: [2, 50],
								47: 66,
								48: 58,
								49: 60,
								50: [1, 59],
								52: [1, 25],
								53: 24
							}, {
								50: [1, 67]
							}, {
								18: [2, 34],
								25: [2, 34],
								33: [2, 34],
								42: [2, 34],
								43: [2, 34],
								44: [2, 34],
								45: [2, 34],
								46: [2, 34],
								50: [2, 34],
								52: [2, 34]
							}, {
								5: [2, 18],
								12: [2, 18],
								13: [2, 18],
								16: [2, 18],
								24: [2, 18],
								26: [2, 18],
								28: [2, 18],
								29: [2, 18],
								31: [2, 18],
								32: [2, 18],
								34: [2, 18]
							}, {
								21: 68,
								29: [1, 69]
							}, {
								29: [2, 41]
							}, {
								4: 70,
								6: 3,
								12: [2, 38],
								13: [2, 38],
								16: [2, 38],
								24: [2, 38],
								26: [2, 38],
								29: [2, 38],
								31: [2, 38],
								32: [2, 38],
								34: [2, 38]
							}, {
								21: 71,
								29: [1, 69]
							}, {
								29: [2, 43]
							}, {
								5: [2, 9],
								12: [2, 9],
								13: [2, 9],
								16: [2, 9],
								24: [2, 9],
								26: [2, 9],
								28: [2, 9],
								29: [2, 9],
								31: [2, 9],
								32: [2, 9],
								34: [2, 9]
							}, {
								25: [2, 44],
								37: 72,
								47: 73,
								48: 58,
								49: 60,
								50: [1, 74]
							}, {
								25: [1, 75]
							}, {
								18: [2, 23],
								25: [2, 23],
								33: [2, 23],
								42: [2, 23],
								43: [2, 23],
								44: [2, 23],
								45: [2, 23],
								46: [2, 23],
								50: [2, 23],
								52: [2, 23]
							}, {
								18: [2, 24],
								25: [2, 24],
								33: [2, 24],
								42: [2, 24],
								43: [2, 24],
								44: [2, 24],
								45: [2, 24],
								46: [2, 24],
								50: [2, 24],
								52: [2, 24]
							}, {
								18: [2, 25],
								25: [2, 25],
								33: [2, 25],
								42: [2, 25],
								43: [2, 25],
								44: [2, 25],
								45: [2, 25],
								46: [2, 25],
								50: [2, 25],
								52: [2, 25]
							}, {
								18: [2, 26],
								25: [2, 26],
								33: [2, 26],
								42: [2, 26],
								43: [2, 26],
								44: [2, 26],
								45: [2, 26],
								46: [2, 26],
								50: [2, 26],
								52: [2, 26]
							}, {
								18: [2, 27],
								25: [2, 27],
								33: [2, 27],
								42: [2, 27],
								43: [2, 27],
								44: [2, 27],
								45: [2, 27],
								46: [2, 27],
								50: [2, 27],
								52: [2, 27]
							}, {
								17: 76,
								30: 22,
								41: 23,
								50: [1, 26],
								52: [1, 25],
								53: 24
							}, {
								25: [2, 47]
							}, {
								18: [2, 29],
								25: [2, 29],
								33: [2, 29],
								46: [2, 29],
								49: 77,
								50: [1, 74]
							}, {
								18: [2, 37],
								25: [2, 37],
								33: [2, 37],
								42: [2, 37],
								43: [2, 37],
								44: [2, 37],
								45: [2, 37],
								46: [2, 37],
								50: [2, 37],
								51: [1, 78],
								52: [2, 37],
								54: [2, 37]
							}, {
								18: [2, 52],
								25: [2, 52],
								33: [2, 52],
								46: [2, 52],
								50: [2, 52]
							}, {
								12: [2, 13],
								13: [2, 13],
								16: [2, 13],
								24: [2, 13],
								26: [2, 13],
								28: [2, 13],
								29: [2, 13],
								31: [2, 13],
								32: [2, 13],
								34: [2, 13]
							}, {
								12: [2, 14],
								13: [2, 14],
								16: [2, 14],
								24: [2, 14],
								26: [2, 14],
								28: [2, 14],
								29: [2, 14],
								31: [2, 14],
								32: [2, 14],
								34: [2, 14]
							}, {
								12: [2, 10]
							}, {
								18: [2, 21],
								25: [2, 21],
								33: [2, 21],
								46: [2, 21]
							}, {
								18: [2, 49],
								25: [2, 49],
								33: [2, 49],
								42: [2, 49],
								43: [2, 49],
								44: [2, 49],
								45: [2, 49],
								46: [2, 49],
								50: [2, 49],
								52: [2, 49]
							}, {
								18: [2, 51],
								25: [2, 51],
								33: [2, 51],
								46: [2, 51]
							}, {
								18: [2, 36],
								25: [2, 36],
								33: [2, 36],
								42: [2, 36],
								43: [2, 36],
								44: [2, 36],
								45: [2, 36],
								46: [2, 36],
								50: [2, 36],
								52: [2, 36],
								54: [2, 36]
							}, {
								5: [2, 11],
								12: [2, 11],
								13: [2, 11],
								16: [2, 11],
								24: [2, 11],
								26: [2, 11],
								28: [2, 11],
								29: [2, 11],
								31: [2, 11],
								32: [2, 11],
								34: [2, 11]
							}, {
								30: 79,
								50: [1, 26],
								53: 24
							}, {
								29: [2, 15]
							}, {
								5: [2, 12],
								12: [2, 12],
								13: [2, 12],
								16: [2, 12],
								24: [2, 12],
								26: [2, 12],
								28: [2, 12],
								29: [2, 12],
								31: [2, 12],
								32: [2, 12],
								34: [2, 12]
							}, {
								25: [1, 80]
							}, {
								25: [2, 45]
							}, {
								51: [1, 78]
							}, {
								5: [2, 20],
								12: [2, 20],
								13: [2, 20],
								16: [2, 20],
								24: [2, 20],
								26: [2, 20],
								28: [2, 20],
								29: [2, 20],
								31: [2, 20],
								32: [2, 20],
								34: [2, 20]
							}, {
								46: [1, 81]
							}, {
								18: [2, 53],
								25: [2, 53],
								33: [2, 53],
								46: [2, 53],
								50: [2, 53]
							}, {
								30: 51,
								36: 82,
								41: 55,
								42: [1, 52],
								43: [1, 53],
								44: [1, 54],
								45: [1, 56],
								50: [1, 26],
								52: [1, 25],
								53: 24
							}, {
								25: [1, 83]
							}, {
								5: [2, 19],
								12: [2, 19],
								13: [2, 19],
								16: [2, 19],
								24: [2, 19],
								26: [2, 19],
								28: [2, 19],
								29: [2, 19],
								31: [2, 19],
								32: [2, 19],
								34: [2, 19]
							}, {
								18: [2, 28],
								25: [2, 28],
								33: [2, 28],
								42: [2, 28],
								43: [2, 28],
								44: [2, 28],
								45: [2, 28],
								46: [2, 28],
								50: [2, 28],
								52: [2, 28]
							}, {
								18: [2, 30],
								25: [2, 30],
								33: [2, 30],
								46: [2, 30],
								50: [2, 30]
							}, {
								5: [2, 16],
								12: [2, 16],
								13: [2, 16],
								16: [2, 16],
								24: [2, 16],
								26: [2, 16],
								28: [2, 16],
								29: [2, 16],
								31: [2, 16],
								32: [2, 16],
								34: [2, 16]
							}],
							defaultActions: {
								4: [2, 1],
								44: [2, 41],
								47: [2, 43],
								57: [2, 47],
								63: [2, 10],
								70: [2, 15],
								73: [2, 45]
							},
							parseError: function(t, n) {
								throw new Error(t)
							},
							parse: function(t) {
								function v(e) {
									r.length = r.length - 2 * e, i.length = i.length - e, s.length = s.length - e
								}

								function m() {
									var e;
									return e = n.lexer.lex() || 1, typeof e != "number" && (e = n.symbols_[e] || e), e
								}
								var n = this,
									r = [0],
									i = [null],
									s = [],
									o = this.table,
									u = "",
									a = 0,
									f = 0,
									l = 0,
									c = 2,
									h = 1;
								this.lexer.setInput(t), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, typeof this.lexer.yylloc == "undefined" && (this.lexer.yylloc = {});
								var p = this.lexer.yylloc;
								s.push(p);
								var d = this.lexer.options && this.lexer.options.ranges;
								typeof this.yy.parseError == "function" && (this.parseError = this.yy.parseError);
								var g, y, b, w, E, S, x = {},
									T, N, C, k;
								for (;;) {
									b = r[r.length - 1];
									if (this.defaultActions[b]) w = this.defaultActions[b];
									else {
										if (g === null || typeof g == "undefined") g = m();
										w = o[b] && o[b][g]
									}
									if (typeof w == "undefined" || !w.length || !w[0]) {
										var L = "";
										if (!l) {
											k = [];
											for (T in o[b]) this.terminals_[T] && T > 2 && k.push("'" + this.terminals_[T] + "'");
											this.lexer.showPosition ? L = "Parse error on line " + (a + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + k.join(", ") + ", got '" + (this.terminals_[g] || g) + "'" : L = "Parse error on line " + (a + 1) + ": Unexpected " + (g == 1 ? "end of input" : "'" + (this.terminals_[g] || g) + "'"), this.parseError(L, {
												text: this.lexer.match,
												token: this.terminals_[g] || g,
												line: this.lexer.yylineno,
												loc: p,
												expected: k
											})
										}
									}
									if (w[0] instanceof Array && w.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + b + ", token: " + g);
									switch (w[0]) {
										case 1:
											r.push(g), i.push(this.lexer.yytext), s.push(this.lexer.yylloc), r.push(w[1]), g = null, y ? (g = y, y = null) : (f = this.lexer.yyleng, u = this.lexer.yytext, a = this.lexer.yylineno, p = this.lexer.yylloc, l > 0 && l--);
											break;
										case 2:
											N = this.productions_[w[1]][1], x.$ = i[i.length - N], x._$ = {
												first_line: s[s.length - (N || 1)].first_line,
												last_line: s[s.length - 1].last_line,
												first_column: s[s.length - (N || 1)].first_column,
												last_column: s[s.length - 1].last_column
											}, d && (x._$.range = [s[s.length - (N || 1)].range[0], s[s.length - 1].range[1]]), S = this.performAction.call(x, u, f, a, this.yy, w[1], i, s);
											if (typeof S != "undefined") return S;
											N && (r = r.slice(0, -1 * N * 2), i = i.slice(0, -1 * N), s = s.slice(0, -1 * N)), r.push(this.productions_[w[1]][0]), i.push(x.$), s.push(x._$), C = o[r[r.length - 2]][r[r.length - 1]], r.push(C);
											break;
										case 3:
											return !0
									}
								}
								return !0
							}
						},
						t = function() {
							var e = {
								EOF: 1,
								parseError: function(t, n) {
									if (!this.yy.parser) throw new Error(t);
									this.yy.parser.parseError(t, n)
								},
								setInput: function(e) {
									return this._input = e, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
										first_line: 1,
										first_column: 0,
										last_line: 1,
										last_column: 0
									}, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
								},
								input: function() {
									var e = this._input[0];
									this.yytext += e, this.yyleng++, this.offset++, this.match += e, this.matched += e;
									var t = e.match(/(?:\r\n?|\n).*/g);
									return t ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), e
								},
								unput: function(e) {
									var t = e.length,
										n = e.split(/(?:\r\n?|\n)/g);
									this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - t - 1), this.offset -= t;
									var r = this.match.split(/(?:\r\n?|\n)/g);
									this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
									var i = this.yylloc.range;
									return this.yylloc = {
										first_line: this.yylloc.first_line,
										last_line: this.yylineno + 1,
										first_column: this.yylloc.first_column,
										last_column: n ? (n.length === r.length ? this.yylloc.first_column : 0) + r[r.length - n.length].length - n[0].length : this.yylloc.first_column - t
									}, this.options.ranges && (this.yylloc.range = [i[0], i[0] + this.yyleng - t]), this
								},
								more: function() {
									return this._more = !0, this
								},
								less: function(e) {
									this.unput(this.match.slice(e))
								},
								pastInput: function() {
									var e = this.matched.substr(0, this.matched.length - this.match.length);
									return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "")
								},
								upcomingInput: function() {
									var e = this.match;
									return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "")
								},
								showPosition: function() {
									var e = this.pastInput(),
										t = (new Array(e.length + 1)).join("-");
									return e + this.upcomingInput() + "\n" + t + "^"
								},
								next: function() {
									if (this.done) return this.EOF;
									this._input || (this.done = !0);
									var e, t, n, r, i, s;
									this._more || (this.yytext = "", this.match = "");
									var o = this._currentRules();
									for (var u = 0; u < o.length; u++) {
										n = this._input.match(this.rules[o[u]]);
										if (n && (!t || n[0].length > t[0].length)) {
											t = n, r = u;
											if (!this.options.flex) break
										}
									}
									if (t) {
										s = t[0].match(/(?:\r\n?|\n).*/g), s && (this.yylineno += s.length), this.yylloc = {
											first_line: this.yylloc.last_line,
											last_line: this.yylineno + 1,
											first_column: this.yylloc.last_column,
											last_column: s ? s[s.length - 1].length - s[s.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length
										}, this.yytext += t[0], this.match += t[0], this.matches = t, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(t[0].length), this.matched += t[0], e = this.performAction.call(this, this.yy, this, o[r], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1);
										if (e) return e;
										return
									}
									return this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
										text: "",
										token: null,
										line: this.yylineno
									})
								},
								lex: function() {
									var t = this.next();
									return typeof t != "undefined" ? t : this.lex()
								},
								begin: function(t) {
									this.conditionStack.push(t)
								},
								popState: function() {
									return this.conditionStack.pop()
								},
								_currentRules: function() {
									return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
								},
								topState: function() {
									return this.conditionStack[this.conditionStack.length - 2]
								},
								pushState: function(t) {
									this.begin(t)
								}
							};
							return e.options = {}, e.performAction = function(t, n, r, i) {
								function s(e, t) {
									return n.yytext = n.yytext.substr(e, n.yyleng - t)
								}
								var o = i;
								switch (r) {
									case 0:
										n.yytext.slice(-2) === "\\\\" ? (s(0, 1), this.begin("mu")) : n.yytext.slice(-1) === "\\" ? (s(0, 1), this.begin("emu")) : this.begin("mu");
										if (n.yytext) return 12;
										break;
									case 1:
										return 12;
									case 2:
										return this.popState(), 12;
									case 3:
										return n.yytext = n.yytext.substr(5, n.yyleng - 9), this.popState(), 15;
									case 4:
										return 12;
									case 5:
										return s(0, 4), this.popState(), 13;
									case 6:
										return 45;
									case 7:
										return 46;
									case 8:
										return 16;
									case 9:
										return this.popState(), this.begin("raw"), 18;
									case 10:
										return 34;
									case 11:
										return 24;
									case 12:
										return 29;
									case 13:
										return this.popState(), 28;
									case 14:
										return this.popState(), 28;
									case 15:
										return 26;
									case 16:
										return 26;
									case 17:
										return 32;
									case 18:
										return 31;
									case 19:
										this.popState(), this.begin("com");
										break;
									case 20:
										return s(3, 5), this.popState(), 13;
									case 21:
										return 31;
									case 22:
										return 51;
									case 23:
										return 50;
									case 24:
										return 50;
									case 25:
										return 54;
									case 26:
										break;
									case 27:
										return this.popState(), 33;
									case 28:
										return this.popState(), 25;
									case 29:
										return n.yytext = s(1, 2).replace(/\\"/g, '"'), 42;
									case 30:
										return n.yytext = s(1, 2).replace(/\\'/g, "'"), 42;
									case 31:
										return 52;
									case 32:
										return 44;
									case 33:
										return 44;
									case 34:
										return 43;
									case 35:
										return 50;
									case 36:
										return n.yytext = s(1, 2), 50;
									case 37:
										return "INVALID";
									case 38:
										return 5
								}
							}, e.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{\/)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/], e.conditions = {
								mu: {
									rules: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
									inclusive: !1
								},
								emu: {
									rules: [2],
									inclusive: !1
								},
								com: {
									rules: [5],
									inclusive: !1
								},
								raw: {
									rules: [3, 4],
									inclusive: !1
								},
								INITIAL: {
									rules: [0, 1, 38],
									inclusive: !0
								}
							}, e
						}();
					return e.lexer = t, n.prototype = e, e.Parser = n, new n
				}();
				return e = t, e
			}(),
			a = function(e) {
				"use strict";

				function r(e, t) {
					return {
						left: e.charAt(2) === "~",
						right: t.charAt(t.length - 3) === "~"
					}
				}

				function i(e, t, r, i, s, l) {
					if (e.sexpr.id.original !== i.path.original) throw new n(e.sexpr.id.original + " doesn't match " + i.path.original, e);
					var c = r && r.program,
						h = {
							left: e.strip.left,
							right: i.strip.right,
							openStandalone: u(t.statements),
							closeStandalone: o((c || t).statements)
						};
					e.strip.right && a(t.statements, null, !0);
					if (c) {
						var p = r.strip;
						p.left && f(t.statements, null, !0), p.right && a(c.statements, null, !0), i.strip.left && f(c.statements, null, !0), o(t.statements) && u(c.statements) && (f(t.statements), a(c.statements))
					} else i.strip.left && f(t.statements, null, !0);
					return s ? new this.BlockNode(e, c, t, h, l) : new this.BlockNode(e, t, c, h, l)
				}

				function s(e, t) {
					for (var n = 0, r = e.length; n < r; n++) {
						var i = e[n],
							s = i.strip;
						if (!s) continue;
						var l = o(e, n, t, i.type === "partial"),
							c = u(e, n, t),
							h = s.openStandalone && l,
							p = s.closeStandalone && c,
							d = s.inlineStandalone && l && c;
						s.right && a(e, n, !0), s.left && f(e, n, !0), d && (a(e, n), f(e, n) && i.type === "partial" && (i.indent = /([ \t]+$)/.exec(e[n - 1].original) ? RegExp.$1 : "")), h && (a((i.program || i.inverse).statements), f(e, n)), p && (a(e, n), f((i.inverse || i.program).statements))
					}
					return e
				}

				function o(e, t, n) {
					t === undefined && (t = e.length);
					var r = e[t - 1],
						i = e[t - 2];
					if (!r) return n;
					if (r.type === "content") return (i || !n ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(r.original)
				}

				function u(e, t, n) {
					t === undefined && (t = -1);
					var r = e[t + 1],
						i = e[t + 2];
					if (!r) return n;
					if (r.type === "content") return (i || !n ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(r.original)
				}

				function a(e, t, n) {
					var r = e[t == null ? 0 : t + 1];
					if (!r || r.type !== "content" || !n && r.rightStripped) return;
					var i = r.string;
					r.string = r.string.replace(n ? /^\s+/ : /^[ \t]*\r?\n?/, ""), r.rightStripped = r.string !== i
				}

				function f(e, t, n) {
					var r = e[t == null ? e.length - 1 : t - 1];
					if (!r || r.type !== "content" || !n && r.leftStripped) return;
					var i = r.string;
					return r.string = r.string.replace(n ? /\s+$/ : /[ \t]+$/, ""), r.leftStripped = r.string !== i, r.leftStripped
				}
				var t = {},
					n = e;
				return t.stripFlags = r, t.prepareBlock = i, t.prepareProgram = s, t
			}(n),
			f = function(e, t, n, r) {
				"use strict";

				function l(e) {
					return e.constructor === o.ProgramNode ? e : (s.yy = f, s.parse(e))
				}
				var i = {},
					s = e,
					o = t,
					u = n,
					a = r.extend;
				i.parser = s;
				var f = {};
				return a(f, u, o), i.parse = l, i
			}(u, o, a, t),
			l = function(e, t) {
				"use strict";

				function o() {}

				function u(e, t, n) {
					if (e == null || typeof e != "string" && e.constructor !== n.AST.ProgramNode) throw new r("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + e);
					t = t || {}, "data" in t || (t.data = !0), t.compat && (t.useDepths = !0);
					var i = n.parse(e),
						s = (new n.Compiler).compile(i, t);
					return (new n.JavaScriptCompiler).compile(s, t)
				}

				function a(e, t, n) {
					function s() {
						var r = n.parse(e),
							i = (new n.Compiler).compile(r, t),
							s = (new n.JavaScriptCompiler).compile(i, t, undefined, !0);
						return n.template(s)
					}
					if (e == null || typeof e != "string" && e.constructor !== n.AST.ProgramNode) throw new r("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + e);
					t = t || {}, "data" in t || (t.data = !0), t.compat && (t.useDepths = !0);
					var i, o = function(e, t) {
						return i || (i = s()), i.call(this, e, t)
					};
					return o._setup = function(e) {
						return i || (i = s()), i._setup(e)
					}, o._child = function(e, t, n) {
						return i || (i = s()), i._child(e, t, n)
					}, o
				}

				function f(e, t) {
					if (e === t) return !0;
					if (i(e) && i(t) && e.length === t.length) {
						for (var n = 0; n < e.length; n++)
							if (!f(e[n], t[n])) return !1;
						return !0
					}
				}
				var n = {},
					r = e,
					i = t.isArray,
					s = [].slice;
				return n.Compiler = o, o.prototype = {
					compiler: o,
					equals: function(e) {
						var t = this.opcodes.length;
						if (e.opcodes.length !== t) return !1;
						for (var n = 0; n < t; n++) {
							var r = this.opcodes[n],
								i = e.opcodes[n];
							if (r.opcode !== i.opcode || !f(r.args, i.args)) return !1
						}
						t = this.children.length;
						for (n = 0; n < t; n++)
							if (!this.children[n].equals(e.children[n])) return !1;
						return !0
					},
					guid: 0,
					compile: function(e, t) {
						this.opcodes = [], this.children = [], this.depths = {
							list: []
						}, this.options = t, this.stringParams = t.stringParams, this.trackIds = t.trackIds;
						var n = this.options.knownHelpers;
						this.options.knownHelpers = {
							helperMissing: !0,
							blockHelperMissing: !0,
							each: !0,
							"if": !0,
							unless: !0,
							"with": !0,
							log: !0,
							lookup: !0
						};
						if (n)
							for (var r in n) this.options.knownHelpers[r] = n[r];
						return this.accept(e)
					},
					accept: function(e) {
						return this[e.type](e)
					},
					program: function(e) {
						var t = e.statements;
						for (var n = 0, r = t.length; n < r; n++) this.accept(t[n]);
						return this.isSimple = r === 1, this.depths.list = this.depths.list.sort(function(e, t) {
							return e - t
						}), this
					},
					compileProgram: function(e) {
						var t = (new this.compiler).compile(e, this.options),
							n = this.guid++,
							r;
						this.usePartial = this.usePartial || t.usePartial, this.children[n] = t;
						for (var i = 0, s = t.depths.list.length; i < s; i++) {
							r = t.depths.list[i];
							if (r < 2) continue;
							this.addDepth(r - 1)
						}
						return n
					},
					block: function(e) {
						var t = e.mustache,
							n = e.program,
							r = e.inverse;
						n && (n = this.compileProgram(n)), r && (r = this.compileProgram(r));
						var i = t.sexpr,
							s = this.classifySexpr(i);
						s === "helper" ? this.helperSexpr(i, n, r) : s === "simple" ? (this.simpleSexpr(i), this.opcode("pushProgram", n), this.opcode("pushProgram", r), this.opcode("emptyHash"), this.opcode("blockValue", i.id.original)) : (this.ambiguousSexpr(i, n, r), this.opcode("pushProgram", n), this.opcode("pushProgram", r), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append")
					},
					hash: function(e) {
						var t = e.pairs,
							n, r;
						this.opcode("pushHash");
						for (n = 0, r = t.length; n < r; n++) this.pushParam(t[n][1]);
						while (n--) this.opcode("assignToHash", t[n][0]);
						this.opcode("popHash")
					},
					partial: function(e) {
						var t = e.partialName;
						this.usePartial = !0, e.hash ? this.accept(e.hash) : this.opcode("push", "undefined"), e.context ? this.accept(e.context) : (this.opcode("getContext", 0), this.opcode("pushContext")), this.opcode("invokePartial", t.name, e.indent || ""), this.opcode("append")
					},
					content: function(e) {
						e.string && this.opcode("appendContent", e.string)
					},
					mustache: function(e) {
						this.sexpr(e.sexpr), e.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
					},
					ambiguousSexpr: function(e, t, n) {
						var r = e.id,
							i = r.parts[0],
							s = t != null || n != null;
						this.opcode("getContext", r.depth), this.opcode("pushProgram", t), this.opcode("pushProgram", n), this.ID(r), this.opcode("invokeAmbiguous", i, s)
					},
					simpleSexpr: function(e) {
						var t = e.id;
						t.type === "DATA" ? this.DATA(t) : t.parts.length ? this.ID(t) : (this.addDepth(t.depth), this.opcode("getContext", t.depth), this.opcode("pushContext")), this.opcode("resolvePossibleLambda")
					},
					helperSexpr: function(e, t, n) {
						var i = this.setupFullMustacheParams(e, t, n),
							s = e.id,
							o = s.parts[0];
						if (this.options.knownHelpers[o]) this.opcode("invokeKnownHelper", i.length, o);
						else {
							if (this.options.knownHelpersOnly) throw new r("You specified knownHelpersOnly, but used the unknown helper " + o, e);
							s.falsy = !0, this.ID(s), this.opcode("invokeHelper", i.length, s.original, s.isSimple)
						}
					},
					sexpr: function(e) {
						var t = this.classifySexpr(e);
						t === "simple" ? this.simpleSexpr(e) : t === "helper" ? this.helperSexpr(e) : this.ambiguousSexpr(e)
					},
					ID: function(e) {
						this.addDepth(e.depth), this.opcode("getContext", e.depth);
						var t = e.parts[0];
						t ? this.opcode("lookupOnContext", e.parts, e.falsy, e.isScoped) : this.opcode("pushContext")
					},
					DATA: function(e) {
						this.options.data = !0, this.opcode("lookupData", e.id.depth, e.id.parts)
					},
					STRING: function(e) {
						this.opcode("pushString", e.string)
					},
					NUMBER: function(e) {
						this.opcode("pushLiteral", e.number)
					},
					BOOLEAN: function(e) {
						this.opcode("pushLiteral", e.bool)
					},
					comment: function() {},
					opcode: function(e) {
						this.opcodes.push({
							opcode: e,
							args: s.call(arguments, 1)
						})
					},
					addDepth: function(e) {
						if (e === 0) return;
						this.depths[e] || (this.depths[e] = !0, this.depths.list.push(e))
					},
					classifySexpr: function(e) {
						var t = e.isHelper,
							n = e.eligibleHelper,
							r = this.options;
						if (n && !t) {
							var i = e.id.parts[0];
							r.knownHelpers[i] ? t = !0 : r.knownHelpersOnly && (n = !1)
						}
						return t ? "helper" : n ? "ambiguous" : "simple"
					},
					pushParams: function(e) {
						for (var t = 0, n = e.length; t < n; t++) this.pushParam(e[t])
					},
					pushParam: function(e) {
						this.stringParams ? (e.depth && this.addDepth(e.depth), this.opcode("getContext", e.depth || 0), this.opcode("pushStringParam", e.stringModeValue, e.type), e.type === "sexpr" && this.sexpr(e)) : (this.trackIds && this.opcode("pushId", e.type, e.idName || e.stringModeValue), this.accept(e))
					},
					setupFullMustacheParams: function(e, t, n) {
						var r = e.params;
						return this.pushParams(r), this.opcode("pushProgram", t), this.opcode("pushProgram", n), e.hash ? this.hash(e.hash) : this.opcode("emptyHash"), r
					}
				}, n.precompile = u, n.compile = a, n
			}(n, t),
			c = function(e, t) {
				"use strict";

				function o(e) {
					this.value = e
				}

				function u() {}
				var n, r = e.COMPILER_REVISION,
					i = e.REVISION_CHANGES,
					s = t;
				u.prototype = {
					nameLookup: function(e, t) {
						return u.isValidJavaScriptVariableName(t) ? e + "." + t : e + "['" + t + "']"
					},
					depthedLookup: function(e) {
						return this.aliases.lookup = "this.lookup", 'lookup(depths, "' + e + '")'
					},
					compilerInfo: function() {
						var e = r,
							t = i[e];
						return [e, t]
					},
					appendToBuffer: function(e) {
						return this.environment.isSimple ? "return " + e + ";" : {
							appendToBuffer: !0,
							content: e,
							toString: function() {
								return "buffer += " + e + ";"
							}
						}
					},
					initializeBuffer: function() {
						return this.quotedString("")
					},
					namespace: "Handlebars",
					compile: function(e, t, n, r) {
						this.environment = e, this.options = t, this.stringParams = this.options.stringParams, this.trackIds = this.options.trackIds, this.precompile = !r, this.name = this.environment.name, this.isChild = !!n, this.context = n || {
							programs: [],
							environments: []
						}, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, this.registers = {
							list: []
						}, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.compileChildren(e, t), this.useDepths = this.useDepths || e.depths.list.length || this.options.compat;
						var i = e.opcodes,
							o, u, a;
						for (u = 0, a = i.length; u < a; u++) o = i[u], this[o.opcode].apply(this, o.args);
						this.pushSource("");
						if (this.stackSlot || this.inlineStack.length || this.compileStack.length) throw new s("Compile completed with content left on stack");
						var f = this.createFunctionContext(r);
						if (!this.isChild) {
							var l = {
									compiler: this.compilerInfo(),
									main: f
								},
								c = this.context.programs;
							for (u = 0, a = c.length; u < a; u++) c[u] && (l[u] = c[u]);
							return this.environment.usePartial && (l.usePartial = !0), this.options.data && (l.useData = !0), this.useDepths && (l.useDepths = !0), this.options.compat && (l.compat = !0), r || (l.compiler = JSON.stringify(l.compiler), l = this.objectLiteral(l)), l
						}
						return f
					},
					preamble: function() {
						this.lastContext = 0, this.source = []
					},
					createFunctionContext: function(e) {
						var t = "",
							n = this.stackVars.concat(this.registers.list);
						n.length > 0 && (t += ", " + n.join(", "));
						for (var r in this.aliases) this.aliases.hasOwnProperty(r) && (t += ", " + r + "=" + this.aliases[r]);
						var i = ["depth0", "helpers", "partials", "data"];
						this.useDepths && i.push("depths");
						var s = this.mergeSource(t);
						return e ? (i.push(s), Function.apply(this, i)) : "function(" + i.join(",") + ") {\n  " + s + "}"
					},
					mergeSource: function(e) {
						var t = "",
							n, r = !this.forceBuffer,
							i;
						for (var s = 0, o = this.source.length; s < o; s++) {
							var u = this.source[s];
							u.appendToBuffer ? n ? n = n + "\n    + " + u.content : n = u.content : (n && (t ? t += "buffer += " + n + ";\n  " : (i = !0, t = n + ";\n  "), n = undefined), t += u + "\n  ", this.environment.isSimple || (r = !1))
						}
						if (r) {
							if (n || !t) t += "return " + (n || '""') + ";\n"
						} else e += ", buffer = " + (i ? "" : this.initializeBuffer()), n ? t += "return buffer + " + n + ";\n" : t += "return buffer;\n";
						return e && (t = "var " + e.substring(2) + (i ? "" : ";\n  ") + t), t
					},
					blockValue: function(e) {
						this.aliases.blockHelperMissing = "helpers.blockHelperMissing";
						var t = [this.contextName(0)];
						this.setupParams(e, 0, t);
						var n = this.popStack();
						t.splice(1, 0, n), this.push("blockHelperMissing.call(" + t.join(", ") + ")")
					},
					ambiguousBlockValue: function() {
						this.aliases.blockHelperMissing = "helpers.blockHelperMissing";
						var e = [this.contextName(0)];
						this.setupParams("", 0, e, !0), this.flushInline();
						var t = this.topStack();
						e.splice(1, 0, t), this.pushSource("if (!" + this.lastHelper + ") { " + t + " = blockHelperMissing.call(" + e.join(", ") + "); }")
					},
					appendContent: function(e) {
						this.pendingContent && (e = this.pendingContent + e), this.pendingContent = e
					},
					append: function() {
						this.flushInline();
						var e = this.popStack();
						this.pushSource("if (" + e + " != null) { " + this.appendToBuffer(e) + " }"), this.environment.isSimple && this.pushSource("else { " + this.appendToBuffer("''") + " }")
					},
					appendEscaped: function() {
						this.aliases.escapeExpression = "this.escapeExpression", this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"))
					},
					getContext: function(e) {
						this.lastContext = e
					},
					pushContext: function() {
						this.pushStackLiteral(this.contextName(this.lastContext))
					},
					lookupOnContext: function(e, t, n) {
						var r = 0,
							i = e.length;
						!n && this.options.compat && !this.lastContext ? this.push(this.depthedLookup(e[r++])) : this.pushContext();
						for (; r < i; r++) this.replaceStack(function(n) {
							var i = this.nameLookup(n, e[r], "context");
							return t ? " && " + i : " != null ? " + i + " : " + n
						})
					},
					lookupData: function(e, t) {
						e ? this.pushStackLiteral("this.data(data, " + e + ")") : this.pushStackLiteral("data");
						var n = t.length;
						for (var r = 0; r < n; r++) this.replaceStack(function(e) {
							return " && " + this.nameLookup(e, t[r], "data")
						})
					},
					resolvePossibleLambda: function() {
						this.aliases.lambda = "this.lambda", this.push("lambda(" + this.popStack() + ", " + this.contextName(0) + ")")
					},
					pushStringParam: function(e, t) {
						this.pushContext(), this.pushString(t), t !== "sexpr" && (typeof e == "string" ? this.pushString(e) : this.pushStackLiteral(e))
					},
					emptyHash: function() {
						this.pushStackLiteral("{}"), this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}"))
					},
					pushHash: function() {
						this.hash && this.hashes.push(this.hash), this.hash = {
							values: [],
							types: [],
							contexts: [],
							ids: []
						}
					},
					popHash: function() {
						var e = this.hash;
						this.hash = this.hashes.pop(), this.trackIds && this.push("{" + e.ids.join(",") + "}"), this.stringParams && (this.push("{" + e.contexts.join(",") + "}"), this.push("{" + e.types.join(",") + "}")), this.push("{\n    " + e.values.join(",\n    ") + "\n  }")
					},
					pushString: function(e) {
						this.pushStackLiteral(this.quotedString(e))
					},
					push: function(e) {
						return this.inlineStack.push(e), e
					},
					pushLiteral: function(e) {
						this.pushStackLiteral(e)
					},
					pushProgram: function(e) {
						e != null ? this.pushStackLiteral(this.programExpression(e)) : this.pushStackLiteral(null)
					},
					invokeHelper: function(e, t, n) {
						this.aliases.helperMissing = "helpers.helperMissing";
						var r = this.popStack(),
							i = this.setupHelper(e, t),
							s = (n ? i.name + " || " : "") + r + " || helperMissing";
						this.push("((" + s + ").call(" + i.callParams + "))")
					},
					invokeKnownHelper: function(e, t) {
						var n = this.setupHelper(e, t);
						this.push(n.name + ".call(" + n.callParams + ")")
					},
					invokeAmbiguous: function(e, t) {
						this.aliases.functionType = '"function"', this.aliases.helperMissing = "helpers.helperMissing", this.useRegister("helper");
						var n = this.popStack();
						this.emptyHash();
						var r = this.setupHelper(0, e, t),
							i = this.lastHelper = this.nameLookup("helpers", e, "helper");
						this.push("((helper = (helper = " + i + " || " + n + ") != null ? helper : helperMissing" + (r.paramsInit ? "),(" + r.paramsInit : "") + ")," + "(typeof helper === functionType ? helper.call(" + r.callParams + ") : helper))")
					},
					invokePartial: function(e, t) {
						var n = [this.nameLookup("partials", e, "partial"), "'" + t + "'", "'" + e + "'", this.popStack(), this.popStack(), "helpers", "partials"];
						this.options.data ? n.push("data") : this.options.compat && n.push("undefined"), this.options.compat && n.push("depths"), this.push("this.invokePartial(" + n.join(", ") + ")")
					},
					assignToHash: function(e) {
						var t = this.popStack(),
							n, r, i;
						this.trackIds && (i = this.popStack()), this.stringParams && (r = this.popStack(), n = this.popStack());
						var s = this.hash;
						n && s.contexts.push("'" + e + "': " + n), r && s.types.push("'" + e + "': " + r), i && s.ids.push("'" + e + "': " + i), s.values.push("'" + e + "': (" + t + ")")
					},
					pushId: function(e, t) {
						e === "ID" || e === "DATA" ? this.pushString(t) : e === "sexpr" ? this.pushStackLiteral("true") : this.pushStackLiteral("null")
					},
					compiler: u,
					compileChildren: function(e, t) {
						var n = e.children,
							r, i;
						for (var s = 0, o = n.length; s < o; s++) {
							r = n[s], i = new this.compiler;
							var u = this.matchExistingProgram(r);
							u == null ? (this.context.programs.push(""), u = this.context.programs.length, r.index = u, r.name = "program" + u, this.context.programs[u] = i.compile(r, t, this.context, !this.precompile), this.context.environments[u] = r, this.useDepths = this.useDepths || i.useDepths) : (r.index = u, r.name = "program" + u)
						}
					},
					matchExistingProgram: function(e) {
						for (var t = 0, n = this.context.environments.length; t < n; t++) {
							var r = this.context.environments[t];
							if (r && r.equals(e)) return t
						}
					},
					programExpression: function(e) {
						var t = this.environment.children[e],
							n = t.depths.list,
							r = this.useDepths,
							i, s = [t.index, "data"];
						return r && s.push("depths"), "this.program(" + s.join(", ") + ")"
					},
					useRegister: function(e) {
						this.registers[e] || (this.registers[e] = !0, this.registers.list.push(e))
					},
					pushStackLiteral: function(e) {
						return this.push(new o(e))
					},
					pushSource: function(e) {
						this.pendingContent && (this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent))), this.pendingContent = undefined), e && this.source.push(e)
					},
					pushStack: function(e) {
						this.flushInline();
						var t = this.incrStack();
						return this.pushSource(t + " = " + e + ";"), this.compileStack.push(t), t
					},
					replaceStack: function(e) {
						var t = "",
							n = this.isInline(),
							r, i, u;
						if (!this.isInline()) throw new s("replaceStack on non-inline");
						var a = this.popStack(!0);
						if (a instanceof o) t = r = a.value, u = !0;
						else {
							i = !this.stackSlot;
							var f = i ? this.incrStack() : this.topStackName();
							t = "(" + this.push(f) + " = " + a + ")", r = this.topStack()
						}
						var l = e.call(this, r);
						u || this.popStack(), i && this.stackSlot--, this.push("(" + t + l + ")")
					},
					incrStack: function() {
						return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName()
					},
					topStackName: function() {
						return "stack" + this.stackSlot
					},
					flushInline: function() {
						var e = this.inlineStack;
						if (e.length) {
							this.inlineStack = [];
							for (var t = 0, n = e.length; t < n; t++) {
								var r = e[t];
								r instanceof o ? this.compileStack.push(r) : this.pushStack(r)
							}
						}
					},
					isInline: function() {
						return this.inlineStack.length
					},
					popStack: function(e) {
						var t = this.isInline(),
							n = (t ? this.inlineStack : this.compileStack).pop();
						if (!e && n instanceof o) return n.value;
						if (!t) {
							if (!this.stackSlot) throw new s("Invalid stack pop");
							this.stackSlot--
						}
						return n
					},
					topStack: function() {
						var e = this.isInline() ? this.inlineStack : this.compileStack,
							t = e[e.length - 1];
						return t instanceof o ? t.value : t
					},
					contextName: function(e) {
						return this.useDepths && e ? "depths[" + e + "]" : "depth" + e
					},
					quotedString: function(e) {
						return '"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
					},
					objectLiteral: function(e) {
						var t = [];
						for (var n in e) e.hasOwnProperty(n) && t.push(this.quotedString(n) + ":" + e[n]);
						return "{" + t.join(",") + "}"
					},
					setupHelper: function(e, t, n) {
						var r = [],
							i = this.setupParams(t, e, r, n),
							s = this.nameLookup("helpers", t, "helper");
						return {
							params: r,
							paramsInit: i,
							name: s,
							callParams: [this.contextName(0)].concat(r).join(", ")
						}
					},
					setupOptions: function(e, t, n) {
						var r = {},
							i = [],
							s = [],
							o = [],
							u, a, f;
						r.name = this.quotedString(e), r.hash = this.popStack(), this.trackIds && (r.hashIds = this.popStack()), this.stringParams && (r.hashTypes = this.popStack(), r.hashContexts = this.popStack()), a = this.popStack(), f = this.popStack();
						if (f || a) f || (f = "this.noop"), a || (a = "this.noop"), r.fn = f, r.inverse = a;
						var l = t;
						while (l--) u = this.popStack(), n[l] = u, this.trackIds && (o[l] = this.popStack()), this.stringParams && (s[l] = this.popStack(), i[l] = this.popStack());
						return this.trackIds && (r.ids = "[" + o.join(",") + "]"), this.stringParams && (r.types = "[" + s.join(",") + "]", r.contexts = "[" + i.join(",") + "]"), this.options.data && (r.data = "data"), r
					},
					setupParams: function(e, t, n, r) {
						var i = this.objectLiteral(this.setupOptions(e, t, n));
						return r ? (this.useRegister("options"), n.push("options"), "options=" + i) : (n.push(i), "")
					}
				};
				var a = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "),
					f = u.RESERVED_WORDS = {};
				for (var l = 0, c = a.length; l < c; l++) f[a[l]] = !0;
				return u.isValidJavaScriptVariableName = function(e) {
					return !u.RESERVED_WORDS[e] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(e)
				}, n = u, n
			}(r, n),
			h = function(e, t, n, r, i) {
				"use strict";
				var s, o = e,
					u = t,
					a = n.parser,
					f = n.parse,
					l = r.Compiler,
					c = r.compile,
					h = r.precompile,
					p = i,
					d = o.create,
					v = function() {
						var e = d();
						return e.compile = function(t, n) {
							return c(t, n, e)
						}, e.precompile = function(t, n) {
							return h(t, n, e)
						}, e.AST = u, e.Compiler = l, e.JavaScriptCompiler = p, e.Parser = a, e.parse = f, e
					};
				return o = v(), o.create = v, o["default"] = o, s = o, s
			}(s, o, f, l, c);
		return h
	}), define("tmpl", ["handlebars"], function(e) {
		return this.JST = this.JST || {}, this.JST.background_setting = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				return '\n<div class="background-setting form-inline">\n    <table>\n        <tr>\n            <td>\n                <label>背景色：</label>\n            </td>\n            <td>\n                <input class="background-color-setting-input form-control" value="rgb(255,255,255)">\n            </td>\n        </tr>\n        <tr>\n            <td>\n                <label>背景图片：</label>\n            </td>\n            <td>\n                <label class="background-image-setting-filename">暂无文件</label>\n                <button class="background-image-setting-file-btn btn btn-primary btn-xs">\n                    图片选择\n                    <input class="background-image-setting-file-input" type="file">\n                </button>\n            </td>\n        </tr>\n    </table>\n\n</div>\n\n'
			},
			useData: !0
		}), this.JST.dfeditor = e.template({
			1: function(e, t, n, r) {
				var i, s = this.lambda,
					o = this.escapeExpression,
					u = "function",
					a = t.helperMissing;
				return '			<option value="' + o(s(r && r.key, e)) + '">' + o((i = (i = t.name || (e != null ? e.name : e)) != null ? i : a, typeof i === u ? i.call(e, {
					name: "name",
					hash: {},
					data: r
				}) : i)) + "</option>\n"
			},
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s, o = "function",
					u = t.helperMissing,
					a = this.escapeExpression,
					f = '<div class="dfeditor-mask" id="' + a((s = (s = t.id || (e != null ? e.id : e)) != null ? s : u, typeof s === o ? s.call(e, {
						name: "id",
						hash: {},
						data: r
					}) : s)) + '">\n	<div class="dfeditor">\n		<select id="animation-list">\n';
				return i = t.each.call(e, e != null ? e.dfAnimation : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f + '		</select>\n		<button class="df-confirm">确认</buttpo>\n		<button class="df-cancel">取消</button>\n	</div>\n</div>'
			},
			useData: !0
		}), this.JST.dropmenu = e.template({
			1: function(e, t, n, r) {
				var i, s = this.lambda,
					o = this.escapeExpression,
					u = "function",
					a = t.helperMissing;
				return '	<a data-index="' + o(s(r && r.index, e)) + '" class="drop-menu-item list-group-item">\n		' + o((i = (i = t.text || (e != null ? e.text : e)) != null ? i : a, typeof i === u ? i.call(e, {
					name: "text",
					hash: {},
					data: r
				}) : i)) + "\n	</a>\n"
			},
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s, o = "function",
					u = t.helperMissing,
					a = this.escapeExpression,
					f = '<div class="drop-menu list-group" id="' + a((s = (s = t.id || (e != null ? e.id : e)) != null ? s : u, typeof s === o ? s.call(e, {
						name: "id",
						hash: {},
						data: r
					}) : s)) + '">\n';
				return i = t.each.call(e, e != null ? e.items : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f + "</div>\n"
			},
			useData: !0
		}), this.JST.controller_list = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '\n\n<div class="controller-list-container" id="' + u((i = (i = t.id || (e != null ? e.id : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "id",
					hash: {},
					data: r
				}) : i)) + '">\n	<div class="panel panel-default">\n		<h4 class="panel-heading">元件列表</h4>\n		<div class="panel-body">\n			<div class="controller-list-wrap list-group">\n                <div class="controller-list"></div>\n                <div class="controller-list-loading">加载中...</div>\n            </div>\n\n		</div>\n	</div>\n    <div class="controller-list-preview"></div>\n\n</div>\n\n'
			},
			useData: !0
		}), this.JST.controller_list_item = e.template({
			1: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '<a class="list-group-item" data-id="' + u((i = (i = t.id || (e != null ? e.id : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "id",
					hash: {},
					data: r
				}) : i)) + '" data-name="' + u((i = (i = t.name || (e != null ? e.name : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "name",
					hash: {},
					data: r
				}) : i)) + '">\n' + u((i = (i = t.name || (e != null ? e.name : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "name",
					hash: {},
					data: r
				}) : i)) + '\n<button class="controller-delete-btn">\n    <span class="glyphicon glyphicon-remove-sign"></span>\n</button>\n</a>\n'
			},
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i;
				return i = t.each.call(e, e != null ? e.controllerList : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null ? i : ""
			},
			useData: !0
		}), this.JST.controller_size_setting = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '<div class="controller-setting-container" id="' + u((i = (i = t.id || (e != null ? e.id : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "id",
					hash: {},
					data: r
				}) : i)) + '">\n	<div class="controller-setting form-inline">\n        <div>\n            <label class="controller-setting-label">名称：</label>\n            <input class="controller-setting-name-input form-control need-empty-validate" placeholder="元件名称">\n\n            <label class="controller-setting-label">宽：</label>\n            <input class="controller-setting-width-input form-control need-num-validate need-empty-validate" value="100" placeholder="元件宽度">\n            \n            <label class="controller-setting-label">高：</label>\n            <input class="controller-setting-height-input form-control need-num-validate need-empty-validate" value="120" placeholder="元件高度">\n        </div>\n	</div>\n</div>\n\n'
			},
			useData: !0
		}), this.JST.csseditor = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				return '<div class="keyframe-setting-container panel panel-primary">\n\n	<h4 class="panel-heading">关键帧属性</h4>\n	<div class="setting-wrap pannel-body">\n\n\n\n		<div class="accordin-container panel panel-default">\n			<h5 class="panel-heading main-heading">常规</h5>\n			<div class="pannel-body form-inline">\n\n				<table class="setting-list" cellspacing="1">\n					<tr>\n						<td>\n							<div class="panel panel-default">\n								<h6 class="panel-heading">显示/隐藏</h6>	\n								<div class="pannel-body">\n\n									<div class="dropdown show-select">\n										<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">\n											显示\n											<span class="caret"></span>\n										</button>\n\n										<ul class="dropdown-menu" role="menu">\n											<li role="presentation">\n												<a role="menuitem" tabindex="-1">显示</a>\n											</li>\n											<li role="presentation">\n												<a role="menuitem" tabindex="-1">隐藏</a>\n											</li>\n										</ul>\n\n									</div>\n								</div>\n							</div>\n						</td>\n				\n						<td>\n							<!--<div class="panel panel-default">\n								<h6 class="panel-heading">图片</h6>	\n								<div class="pannel-body">\n									<div class="img-select-container">\n										<label class="img-select-text">暂无图片</label>\n										<input class="img-select-text-input form-control" >\n										<button class="img-select-input-btn btn btn-primary btn-xs">\n											选择\n											<input class="img-select-input form-control" type="file" >\n										</button>\n									</div>\n								</div>\n							</div>-->\n						</td>\n					</tr>\n\n\n					<tr>\n						<td>\n							<div class="panel panel-default">\n								<h6 class="panel-heading">背景色</h6>\n								<div class="pannel-body">\n									<input class="background-image-input form-control" value="transparent" placeholder="背景色">\n								</div>\n							</div>\n						</td>\n						<td>\n							<div class="panel panel-default">\n								<h6 class="panel-heading">视距</h6>\n								<div class="pannel-body">\n									<input class="perspective-input form-control" data-input-name=\'perspective\' value=\'0\' placeholder="视距">\n								</div>\n							</div>\n						</td>\n					</tr>\n\n\n\n					<tr>\n						<td>\n							<div class="panel panel-default">\n								<h6 class="panel-heading">透明度</h6>\n								<div class="pannel-body">\n									<input class=\'opacity-input form-control\' value=\'1\' placeholder="透明度">\n								</div>\n							</div>\n						</td>\n\n						<td>\n							<div class="panel panel-default">\n								<h6 class="panel-heading">缓动</h5>\n								<div class="pannel-body">\n									<div class="dropdown ease-select">\n										<button class="btn btn-default dropdown-toggle" type="button" id="ease-select" data-toggle="dropdown" aria-expanded="true">\n										linear\n										<span class="caret"></span>\n										</button>\n\n										<ul class="dropdown-menu" role="menu">\n					\n											<li role="presentation">\n												<a role="menuitem" tabindex="-1">linear</a>\n											</li>\n\n											<li role="presentation">\n												<a role="menuitem" tabindex="-1">ease</a>\n											</li>\n											<li role="presentation">\n												<a role="menuitem" tabindex="-1">ease-in</a>\n											</li>\n\n											<li role="presentation">\n												<a role="menuitem" tabindex="-1">ease-out</a>\n											</li>\n											<li role="presentation">\n												<a role="menuitem" tabindex="-1">ease-in-out</a>\n											</li>\n											<li role="presentation">\n												<a role="menuitem" tabindex="-1">step-start</a>\n											</li>\n											<li role="presentation">\n												<a role="menuitem" tabindex="-1">step-end</a>\n											</li>\n										</ul>\n									</div>\n\n								</div>\n							</div>\n						</td>\n					</tr>\n				</table>\n			</div>\n		</div>\n	\n\n	\n		<div class="accordin-container panel panel-default">\n			<h5 class="panel-heading main-heading">尺寸</h5>\n			<div class="pannel-body">\n				<table class="setting-list">\n					<tr>\n						<td class="panel panel-default">\n							<h6 class="panel-heading">宽度</h6>\n							<div class="pannel-body">\n								<input class=\'position-width-input form-control\' value=\'0\' placeholder="宽度">\n							</div>\n						</td>\n						<td class="panel panel-default">\n							<h6 class="panel-heading">高度</h6>\n							<div class="pannel-body">\n								<input class=\'position-height-input form-control\' value=\'0\' placeholder="高度">\n							</div>\n						</td>	\n					</tr>\n				</table>\n			</div>\n		</div>\n\n\n\n		<div class="accordin-container panel panel-default">\n			<h5 class="panel-heading main-heading">位置</h5>\n			<div class="pannel-body">\n				<table class="setting-list">\n					<tr>\n						<td class="panel panel-default">\n							<h6 class="panel-heading">X</h6>\n							<div class="pannel-body">\n								<input class=\'position-x-input form-control\' value=\'0\' placeholder="X轴位置">\n							</div>\n						</td>\n						<td class="panel panel-default">\n							<h6 class="panel-heading">Y</h6>\n							<div lass="pannel-body">\n								<input class=\'position-y-input form-control\' value=\'0\' placeholder="Y轴位置">\n							</div>\n						</td>\n					</tr>\n				</table>\n			</div>\n		</div>\n\n\n\n		<div class="accordin-container panel panel-default">\n			<h5 class="panel-heading main-heading">旋转</h5>\n			<div class="pannel-body">\n				<table class="setting-list">\n					<tr>\n						<td class="panel panel-default">\n							<h6 class="panel-heading">rotateX:</h6>\n							<div class="pannel-body">\n								<input class=\'rotatex-input form-control\' value=\'0\' placeholder="X轴旋转">\n							</div>\n						</td>\n						<td class="panel panel-default">\n							<h6 class="panel-heading">rotateY:</h6>\n							<div class="pannel-body">\n								<input class=\'rotatey-input form-control\' value=\'0\' placeholder="Y轴旋转">\n							</div>\n						</td>\n					</tr>\n					<tr>\n						<td class="panel panel-default">\n							<h6 class="panel-heading">rotateZ:</h6>\n							<div class="pannel-body">\n								<input class=\'rotatez-input form-control\' value=\'0\' placeholder="Z轴旋转">\n							</div>\n						</td>\n						<td></td>\n					</tr>\n				</table>\n			</div>\n		</div>\n\n\n		<div class="accordin-container panel panel-default">\n			<h5 class="panel-heading main-heading">倾斜</h5>\n			<div class="pannel-body">\n				<table class="setting-list">\n					<tr>\n						<td class="panel panel-default">\n							<h6 class="panel-heading">skewX:</h6>\n							<div class="pannel-body">\n								<input class=\'skewx-input form-control\' value=\'0\' placeholder="X轴倾斜">\n							</div>\n						</td>\n						<td class="panel panel-default">\n							<h6 class="panel-heading">skewY:</h6>\n							<div class="pannel-body">\n								<input class=\'skewy-input form-control\' value=\'0\' placeholder="Y轴倾斜">\n							</div>\n						</td>\n					</tr>\n				</table>\n			</div>\n		</div>\n\n\n\n		<div class="panel panel-default">\n			<h5 class="custom-setting-heading panel-heading main-heading">\n				<button class="add-custom-setting btn btn-default btn-xs">\n					<span class="glyphicon glyphicon-plus"></span>\n				</button>\n				自定义css属性\n			</h5>\n			<div class="pannel-body">\n				<table class="custom-style-list"></table>\n			</div>\n		</div>\n\n	</div>\n</div>\n\n\n\n<div class="sprite-setting-container panel panel-primary">\n\n	<h4 class="panel-heading">元素属性</h4>\n\n	<div class="pannel-body form-inline">\n\n		<div class="setting-wrap">\n			<table class="setting-list">\n				<tr>\n				\n						<div class="panel panel-default">\n							<h6 class="panel-heading">图片</h6>	\n							<div class="pannel-body">\n								<div class="img-select-container">\n									<label class="img-select-text">暂无图片</label>\n									<input class="img-select-text-input form-control" >\n									<button class="img-select-input-btn btn btn-primary btn-xs">\n										选择\n										<input class="img-select-input form-control" type="file" >\n									</button>\n								</div>\n							</div>\n						</div>\n								\n\n				</tr>\n				<tr>\n					<td class="panel panel-default">\n						<h6 class="panel-heading">名称</h6>\n						<div class="pannel-body">\n							<input class="name-input form-control" placeholder="名称">\n						</div>\n					</td>\n					<td class="panel panel-default">\n						<h6 class="panel-heading">类名</h6>\n						<div class="pannel-body">\n							<input class="class-input form-control" placeholder="类名">\n						</div>\n					</td>	\n				</tr>\n\n				<tr>\n					<td class="panel panel-default">\n						<h6 class="panel-heading">模式</h6>\n						<div class="pannel-body">\n                            <div class="dropdown controller-mode-select">\n                                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">\n                                比例缩放\n                                <span class="caret"></span>\n                                </button>\n\n                                <ul class="dropdown-menu" role="menu">\n                                    <li role="presentation">\n                                        <a role="menuitem" tabindex="-1">比例缩放</a>\n                                    </li>\n                                    <li role="presentation">\n                                        <a role="menuitem" tabindex="-1">固定尺寸</a>\n                                    </li>\n                                </ul>\n                            </div>\n						</div>\n					</td>\n\n				</tr>\n\n			</table>\n		</div>\n	</div>\n	<div class="panel panel-default">\n		<h5 class="custom-setting-heading panel-heading main-heading">\n			<button class="add-sprite-custom-setting btn btn-default btn-xs">\n				<span class="glyphicon glyphicon-plus"></span>\n			</button>\n			自定义css属性\n		</h5>\n		<div class="pannel-body">\n			<table class="sprite-custom-style-list"></table>\n		</div>\n	</div>\n\n</div>\n\n\n\n\n\n'
			},
			useData: !0
		}), this.JST.fbf_animation_editor = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '<div class="fbf-animation-editor" id="' + u((i = (i = t.id || (e != null ? e.id : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "id",
					hash: {},
					data: r
				}) : i)) + '">\n    <!-- 图片选择和各种选项 -->\n    <div class="form-inline">\n        <table>\n\n            <tr>\n                <td>\n                    <label>名称：</label>\n                </td>\n                <td>\n                    <input class="fbf-name-input form-control need-empty-validate" placeholder="元件名称" >\n                </td>\n            </tr>\n            <tr>\n                <td>\n                    <label>图片选择：</label>\n                </td>\n                <td>\n                    <label class="fbf-img-class-name">暂无图片</label>\n                    <input class="fbf-img-input need-img-validate">\n                    <button class="btn btn-primary btn-xs fbf-img-select-btn">\n                        选择\n                        <input class="fbf-img-select" type="file">\n                    </button>\n                </td>\n            </tr>\n                \n            <tr>\n                <td>\n                    <label>帧数：</label>\n                </td>\n                <td>\n                    <input class="fbf-frame-count-input form-control need-num-validate need-empty-validate" placeholder="帧数">\n                </td>\n            </tr>\n\n            <tr>\n                <td>\n                    <label>方向：</label>\n                </td>\n                <td>\n\n                    <div class="dropdown fbf-frame-direction-selector">\n                        <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">\n                        从左到右\n                        <span class="caret"></span>\n                        </button>\n\n                        <ul class="dropdown-menu" role="menu">\n                            <li role="presentation">\n                                <a role="menuitem" tabindex="-1">从左到右</a>\n                            </li>\n                            <li role="presentation">\n                                <a role="menuitem" tabindex="-1">从上到下</a>\n                            </li>\n                        </ul>\n                    </div>\n\n                </td>\n            </tr>  \n            <tr>\n                <td>\n                    <label>每帧时间间隔：</label>\n                </td>\n                <td>\n                    <input class="fbf-frame-duration-input form-control need-num-validate need-empty-validate" placeholder="帧间时间间隔">\n                </td>\n            </tr>\n\n            <tr>\n                <td>\n                    <label>重复播放：</label>\n                </td>\n                <td>\n                    <input class="fbf-animation-repeat-setting" type="checkbox">\n                    <input class="fbf-animation-repeat-count form-control need-num-validate" placeholder="重复次数">\n                </td>\n            </tr>                        \n        </table>\n    </div>\n\n     <!-- 逐帧动画预览 -->\n    <div class="fbf-animation-preview">\n    </div>\n    <div>\n        \n</div>\n\n'
			},
			useData: !0
		}), this.JST.framesbar = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '<div id="' + u((i = (i = t.id || (e != null ? e.id : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "id",
					hash: {},
					data: r
				}) : i)) + '" data-emit-type="' + u((i = (i = t.emitType || (e != null ? e.emitType : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "emitType",
					hash: {},
					data: r
				}) : i)) + '" data-emit-event-name="' + u((i = (i = t.emitEventName || (e != null ? e.emitEventName : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "emitEventName",
					hash: {},
					data: r
				}) : i)) + '" class="frames-bar-single-wrap">\n\n	<div class="frames-bar-info">\n		<div class="frames-bar-name">' + u((i = (i = t.spriteName || (e != null ? e.spriteName : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "spriteName",
					hash: {},
					data: r
				}) : i)) + '</div>\n		<div class="frames-bar-setting-container">\n			<!--<input type="checkbox" class="lock-frames-bar-checkbox glyphicon glyphicon-lock">\n			<input type="checkbox" class="hide-frames-bar-checkbox glyphicon glyphicon-eye-open">-->\n			<button class="delete-frames-bar-button glyphicon glyphicon-remove-sign"></button> \n		</div>\n	</div>\n	<ol  class="frames-bar clearfix">\n	</ol>\n</div>\n\n'
			},
			useData: !0
		}), this.JST.img_path_setting = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '<div class="img-path-setting-mask" id="' + u((i = (i = t.id || (e != null ? e.id : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "id",
					hash: {},
					data: r
				}) : i)) + '">\n\n	<div class="img-path-setting">\n        <div>\n            <input class="img-path-setting-input"></input>\n        </div>\n\n	    <!-- 按钮区域 -->\n		<div class="img-path-btn-container">\n			<button class="confirm-img-path-btn">确定</button>\n			<button class="cancel-img-path-btn">取消</button>\n		</div>\n	</div>\n\n</div>'
			},
			useData: !0
		}), this.JST.index = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				return ""
			},
			useData: !0
		}), this.JST["layer-size-setting"] = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '\n<div class="layer-size-setting form-inline" id="' + u((i = (i = t.id || (e != null ? e.id : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "id",
					hash: {},
					data: r
				}) : i)) + '">\n    <table>\n        <tr>\n            <td>\n                <label>宽度：</label>\n            </td>\n            <td>\n                <input class="layer-size-width-input form-control need-num-validate need-empty-validate" value="100">\n            </td>\n        </tr>\n        <tr>\n            <td>\n                <label>高度：</label>\n            </td>\n            <td>\n                <input class="layer-size-height-input form-control need-num-validate need-empty-validate" value="100">\n            </td>\n        </tr>\n    </table>\n\n</div>\n\n'
			},
			useData: !0
		}), this.JST.pages = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '\n<li>\n	<div id="' + u((i = (i = t.id || (e != null ? e.id : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "id",
					hash: {},
					data: r
				}) : i)) + '" class="page" data-index="' + u((i = (i = t.index || (e != null ? e.index : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "index",
					hash: {},
					data: r
				}) : i)) + '">\n		<a class="page-del-btn close">x</a>\n	\n		<span class="page-index">\n			0\n		</span>\n		<div class="page-jump-btn-container">\n			<input class="prejump-checkbox glyphicon glyphicon-hand-up" type="checkbox">  \n			<input class="replay-checkbox glyphicon glyphicon-repeat" type="checkbox">\n			<input class="auto-jump-checkbox glyphicon glyphicon-circle-arrow-down" type="checkbox">\n\n		</div>\n	</div>\n</li>\n\n'
			},
			useData: !0
		}), this.JST.preset_animation_editor = e.template({
			1: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '                            <a class="list-group-item" data-name="' + u((i = (i = t.name || (e != null ? e.name : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "name",
					hash: {},
					data: r
				}) : i)) + '">' + u((i = (i = t.cname || (e != null ? e.cname : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "cname",
					hash: {},
					data: r
				}) : i)) + "</a>\n"
			},
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s, o = "function",
					u = t.helperMissing,
					a = this.escapeExpression,
					f = '\n<!-- 编辑区域-->\n<div class="dfeditor" id="' + a((s = (s = t.id || (e != null ? e.id : e)) != null ? s : u, typeof s === o ? s.call(e, {
						name: "id",
						hash: {},
						data: r
					}) : s)) + '">\n    <div class="preset-animation-list-container form-inline">\n        <div class="preset-animation-list">\n            <div class="panel panel-default">\n    \n                <div class="panel-body">\n\n                    <div class="preset-animation-ul-list list-group">\n                        <h3>常规效果</h3>\n';
				return i = t.each.call(e, e != null ? e.attentionSeekersListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "\n                        <h3>弹入效果</h3>\n", i = t.each.call(e, e != null ? e.bouncingEntrancesListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "\n\n                        <h3>弹出效果</h3>\n", i = t.each.call(e, e != null ? e.bouncingExitsListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "\n                        <h3>渐入效果</h3>\n", i = t.each.call(e, e != null ? e.fadingEntrancesListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "\n                        <h3>淡出效果</h3>\n", i = t.each.call(e, e != null ? e.fadingExitsListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "\n                        <h3>翻转效果</h3>\n", i = t.each.call(e, e != null ? e.flippersListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "\n\n                        <h3>飞速效果</h3>\n", i = t.each.call(e, e != null ? e.lightSpeedListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "\n\n                        <h3>旋转进入效果</h3>\n", i = t.each.call(e, e != null ? e.rotateEntrancesListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "\n\n                        <h3>旋转消失效果</h3>\n", i = t.each.call(e, e != null ? e.rotateExitsListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "\n                        <h3>滑动进入效果</h3>\n", i = t.each.call(e, e != null ? e.slideEntranceListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "\n                        <h3>滑动消失效果</h3>\n", i = t.each.call(e, e != null ? e.slideExitListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "\n\n\n                        <h3>放大进入效果</h3>\n", i = t.each.call(e, e != null ? e.zoomEntrancesListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "\n                        <h3>缩小消失效果</h3>\n", i = t.each.call(e, e != null ? e.zoomExitListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "\n                        <h3>特殊效果</h3>\n", i = t.each.call(e, e != null ? e.specialListConfig : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f + '\n                    </div>  \n                    \n\n                </div>\n            </div>\n        </div>\n\n        <div class="preset-animation-duration-container">\n            <label>时长(s)：</label>\n            <input class="preset-animation-duration form-control need-empty-validate need-num-validate" value="1">\n        </div>\n    </div>\n    \n    <div class="preset-animation-demo-container">\n        <div class="preset-sprite-demo"></div>\n    </div>\n</div>\n\n'
			},
			useData: !0
		}), this.JST["sprite-action-setting"] = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				return '\n<div class="sprite-action-setting">\n    <div class="form-inline">\n        <div>\n            <table>\n                <tr>\n                    <td>\n                        <label>触发自定义事件：</label>\n                    </td>\n                    <td>\n                        <input class="action-event-checkbox" type="checkbox">\n                  \n                        <input class="sprite-action-event-input form-control" placeholder="事件名">\n                    \n                    </td>\n                </tr>\n\n                <tr class="auto-jump-next-setting">\n                    <td>\n                        <label>跳到下一页：</label>\n                    </td>\n                    <td>\n                        <input class="action-jump-next-checkbox" type="checkbox">\n                    </td>\n                </tr>\n            </table>\n        </div>\n    </div>\n\n</div>\n\n'
			},
			useData: !0
		}), this.JST.sprite = e.template({
			1: function(e, t, n, r) {
				return '				<div class="controller-wrap">\n				</div>\n'
			},
			3: function(e, t, n, r) {
				return '				<div class="text-wrap">\n				</div>\n'
			},
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s, o = "function",
					u = t.helperMissing,
					a = this.escapeExpression,
					f = '<div class="sprite-draggable-wrapper">\n	<div class="sprite-resizable-wrapper">\n		<div id="' + a((s = (s = t.id || (e != null ? e.id : e)) != null ? s : u, typeof s === o ? s.call(e, {
						name: "id",
						hash: {},
						data: r
					}) : s)) + '"  class="sprite">\n			<div class="sprite-img" style="width:100%;height:100%;background-image:url(' + a((s = (s = t.imgUrl || (e != null ? e.imgUrl : e)) != null ? s : u, typeof s === o ? s.call(e, {
						name: "imgUrl",
						hash: {},
						data: r
					}) : s)) + ');">\n			</div>\n\n';
				return i = t["if"].call(e, e != null ? e.useController : e, {
					name: "if",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f += "	\n", i = t["if"].call(e, e != null ? e.isText : e, {
					name: "if",
					hash: {},
					fn: this.program(3, r),
					inverse: this.noop,
					data: r
				}), i != null && (f += i), f + '\n\n			<div class="sprite-class-name-tag"></div>\n		</div>\n	</div>\n</div>\n'
			},
			useData: !0
		}), this.JST.sprite_event_animation_setting = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '\n<div class="emit-type-setting" id="' + u((i = (i = t.id || (e != null ? e.id : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "id",
					hash: {},
					data: r
				}) : i)) + '">\n    <table>\n        <tr>\n            <td>\n        	   <label>事件名：</label>\n            </td>\n            <td>\n        	   <input class="emit-event-input form-control need-empty-validate" placeholder="动画事件名">\n            </td>\n        </tr>\n        <tr>\n            <td>\n                <label>只触发一次：</label>\n            </td>\n            <td>\n                <input class="sprite-action-once-input" type="checkbox">\n            </td>\n        </tr>\n    </table>\n</div>\n'
			},
			useData: !0
		}), this.JST.sprite_list_item = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '\n<a id="' + u((i = (i = t.id || (e != null ? e.id : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "id",
					hash: {},
					data: r
				}) : i)) + '" class="sprite_item list-group-item" data-stageid="' + u((i = (i = t.stageId || (e != null ? e.stageId : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "stageId",
					hash: {},
					data: r
				}) : i)) + '">\n    <span class="sprite-name">' + u((i = (i = t.name || (e != null ? e.name : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "name",
					hash: {},
					data: r
				}) : i)) + '</span>\n    <input type="checkbox" class="lock-frames-bar-checkbox glyphicon glyphicon-lock">\n    <input type="checkbox" class="hide-frames-bar-checkbox glyphicon glyphicon-eye-open">\n    <button class="sprite-list-delete-btn btn btn-sm">\n        <span class="glyphicon glyphicon-remove-sign"></span>\n    </button>\n</a>\n'
			},
			useData: !0
		}), this.JST.stages = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '\n\n<li class="stage" id="' + u((i = (i = t.id || (e != null ? e.id : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "id",
					hash: {},
					data: r
				}) : i)) + '" style="width:' + u((i = (i = t.width || (e != null ? e.width : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "width",
					hash: {},
					data: r
				}) : i)) + "px;height:" + u((i = (i = t.height || (e != null ? e.height : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "height",
					hash: {},
					data: r
				}) : i)) + "px;margin-left:" + u((i = (i = t.marginLeft || (e != null ? e.marginLeft : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "marginLeft",
					hash: {},
					data: r
				}) : i)) + "px;margin-top:" + u((i = (i = t.marginTop || (e != null ? e.marginTop : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "marginTop",
					hash: {},
					data: r
				}) : i)) + 'px;">\n\n</li>\n\n\n'
			},
			useData: !0
		}), this.JST.timeline = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '<div class="timeline" style="width:' + u((i = (i = t.width || (e != null ? e.width : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "width",
					hash: {},
					data: r
				}) : i)) + "px;left:" + u((i = (i = t.left || (e != null ? e.left : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "left",
					hash: {},
					data: r
				}) : i)) + 'px;">' + u((i = (i = t.duration || (e != null ? e.duration : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "duration",
					hash: {},
					data: r
				}) : i)) + "s</div>"
			},
			useData: !0
		}), this.JST.imgs_list = e.template({
			1: function(e, t, n, r) {
				var i = this.lambda,
					s = this.escapeExpression;
				return '    <div class="img-container">\n        <img class="img-item" src="' + s(i(e, e)) + '">\n        <button class="img-del-btn"></button>\n    </div>\n'
			},
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s = "";
				return i = t.each.call(e, e != null ? e.imgList : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null && (s += i), s + "\n"
			},
			useData: !0
		}), this.JST.user_images = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				return '\n<div class="user-images form-inline">\n\n    <div class="user-images-all-list  accordin-container pane panel-primary">\n        <div class="user-images-available-size">0MB</div>\n\n        <h4 class="panel-heading current-temp-heading">当前列表</h4>\n        <div class="user-images-work-temp-list pannel-body list-group" data-name="tempwork">\n        </div>\n        <div class="user-images-ctrl-temp-list pannel-body list-group" data-name="tempctrl">\n        </div>\n\n\n        <h4 class="panel-heading">作品列表</h4>\n        <div class="user-images-work-list pannel-body list-group" data-name="work">\n        </div>\n\n\n        <h4 class="panel-heading">元件列表</h4>\n        <div class="user-images-controller-list pannel-body list-group" data-name="ctrl">\n        </div>\n\n\n    </div>\n\n    <div class="user-images-content">\n        \n    </div>\n\n</div>\n\n'
			},
			useData: !0
		}), this.JST.user_images_item = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '<a class="user_images_item list-group-item" data-id="' + u((i = (i = t.id || (e != null ? e.id : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "id",
					hash: {},
					data: r
				}) : i)) + '">\n    ' + u((i = (i = t.name || (e != null ? e.name : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "name",
					hash: {},
					data: r
				}) : i)) + "\n</a>"
			},
			useData: !0
		}), this.JST.work_list = e.template({
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				return '\n\n<div class="work-list-container">\n    <button class="pre-work-list glyphicon glyphicon glyphicon-chevron-left disabled"></button>\n\n	<div class="work-list list-group">\n\n	</div>\n\n    <button class="next-work-list glyphicon glyphicon-chevron-right disabled"></button>\n\n\n</div>\n\n'
			},
			useData: !0
		}), this.JST.work_list_item = e.template({
			1: function(e, t, n, r) {
				var i, s = "function",
					o = t.helperMissing,
					u = this.escapeExpression;
				return '	<a class="list-group-item" id="' + u((i = (i = t.id || (e != null ? e.id : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "id",
					hash: {},
					data: r
				}) : i)) + '" data-name="' + u((i = (i = t.name || (e != null ? e.name : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "name",
					hash: {},
					data: r
				}) : i)) + '">\n		<button class="work-delete-btn glyphicon glyphicon-remove"></button>\n		<div class="list-work-name">' + u((i = (i = t.name || (e != null ? e.name : e)) != null ? i : o, typeof i === s ? i.call(e, {
					name: "name",
					hash: {},
					data: r
				}) : i)) + '</div>\n		<div class="glyphicon glyphicon-link"></div>\n	</a>\n'
			},
			compiler: [6, ">= 2.0.0-beta.1"],
			main: function(e, t, n, r) {
				var i;
				return i = t.each.call(e, e != null ? e.workList : e, {
					name: "each",
					hash: {},
					fn: this.program(1, r),
					inverse: this.noop,
					data: r
				}), i != null ? i : ""
			},
			useData: !0
		}), this.JST
	}), define("util", [], function() {
		var e = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,
			t = "http://aeditor.alloyteam.com",
			n = t + "/cgi",
			r = "ID_USER_0",
			i = {
				getRandomId: function() {
					return ~~(Math.random() * 1e8)
				},
				getOriginId: function(e) {
					var t = e.split("_");
					return t[t.length - 1]
				},
				colorHex: function(t) {
					var n = t;
					if (/^(rgba|RGBA)/.test(n)) {
						var r = this.colorValue2Obj(n);
						n = "rgb(" + r.red + "," + r.green + "," + r.blue + ")"
					}
					if (/^(rgb|RGB)/.test(n)) {
						var i = n.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","),
							s = "#";
						for (var o = 0; o < i.length; o++) {
							var u = Number(i[o]).toString(16);
							u.length == 1 && (u = "0" + u), u === "0" && (u += u), s += u
						}
						return s.length !== 7 && (s = n), s
					}
					if (!e.test(n)) return n;
					var a = n.replace(/#/, "").split("");
					if (a.length === 6) return n;
					if (a.length === 3) {
						var f = "#";
						for (var o = 0; o < a.length; o += 1) f += a[o] + a[o];
						return f
					}
				},
				colorRgb: function(t) {
					var n = t.toLowerCase();
					if (n && e.test(n)) {
						if (n.length === 4) {
							var r = "#";
							for (var i = 1; i < 4; i += 1) r += n.slice(i, i + 1).concat(n.slice(i, i + 1));
							n = r
						}
						var s = [];
						for (var i = 1; i < 7; i += 2) s.push(parseInt("0x" + n.slice(i, i + 2)));
						return "RGB(" + s.join(",") + ")"
					}
					return n
				},
				colorObj2Value: function(e) {
					return "rgba(" + e.red + "," + e.green + "," + e.blue + "," + e.alpha + ")"
				},
				colorValue2Obj: function(e) {
					var t = {
						red: null,
						green: null,
						blue: null,
						alpha: null
					};
					if (typeof e == "string")
						if (e == "transparent") t = {
							red: 0,
							green: 0,
							blue: 0,
							alpha: 0
						};
						else if (e.indexOf("#") === 0) e = e.substr(1), e.length == 3 ? t = {
						red: parseInt(e[0] + e[0], 16),
						green: parseInt(e[1] + e[1], 16),
						blue: parseInt(e[2] + e[2], 16),
						alpha: 1
					} : t = {
						red: parseInt(e.substr(0, 2), 16),
						green: parseInt(e.substr(2, 2), 16),
						blue: parseInt(e.substr(4, 2), 16),
						alpha: 1
					};
					else if (e.indexOf("rgb(") === 0) {
						var n = e.indexOf(",");
						t = {
							red: parseInt(e.substr(4, n)),
							green: parseInt(e.substr(n + 1, e.indexOf(",", n))),
							blue: parseInt(e.substr(e.indexOf(",", n + 1) + 1, e.indexOf(")"))),
							alpha: 1
						}
					} else if (e.indexOf("rgba(") === 0) {
						var n = e.indexOf(","),
							r = e.indexOf(",", n + 1);
						t = {
							red: parseInt(e.substr(5, n)),
							green: parseInt(e.substr(n + 1, r)),
							blue: parseInt(e.substr(e.indexOf(",", n + 1) + 1, e.indexOf(",", r))),
							alpha: parseFloat(e.substr(e.indexOf(",", r + 1) + 1, e.indexOf(")")))
						}
					} else {
						var i = {
							acqua: "#0ff",
							teal: "#008080",
							blue: "#00f",
							navy: "#000080",
							yellow: "#ff0",
							olive: "#808000",
							lime: "#0f0",
							green: "#008000",
							fuchsia: "#f0f",
							purple: "#800080",
							red: "#f00",
							maroon: "#800000",
							white: "#fff",
							gray: "#808080",
							silver: "#c0c0c0",
							black: "#000"
						};
						i[e] != undefined && (t = this.colorValue2Obj(i[e]))
					}
					return t
				},
				setDropDownListValue: function(e, t) {
					var n = $(e.find(".dropdown-toggle"));
					e.data("selectedValue", t), n.html(t + '<span class="caret"></span>')
				},
				convertKeyFrameSetting2CssProperties: function(e, t, n) {
					var r;
					e = e || {}, t ? (r = {}, $.each(t, function(t, n) {
						n != e[t] && (r[t] = e[t])
					})) : r = e;
					var i = {},
						s = {},
						o = "";
					typeof e.display != "undefined" && e.display == "none" && (i.isHide = !0), typeof e.backgroundColor != "undefined" && (i["background-color"] = e.backgroundColor), typeof e.opacity != "undefined" && (i.opacity = e.opacity), typeof e.perspective != "undefined" && (o += "perspective(" + e.perspective + ") ");
					var u, a, f, l;
					typeof e.width != "undefined" && (u = e.width), typeof e.height != "undefined" && (a = e.height);
					var c, h, p, d;
					return p = t && t.initialWidth || e.initialWidth || u || 0, d = t && t.initialHeight || e.initialHeight || a || 0, typeof e.x != "undefined" && (c = e.x), typeof e.y != "undefined" && (h = e.y), e.controllerMode || (c != null && (c += (e.width - p) / 2), h != null && (h += (e.height - d) / 2), u != null && (f = u / p), a != null && (l = a / d)), c && (o += "translateX(" + c + "px) "), h && (o += "translateY(" + h + "px) "), !t, o += "rotateX(" + e.rotateX + "deg) ", o += "rotateY(" + e.rotateY + "deg) ", o += "rotateZ(" + e.rotateZ + "deg) ", e.skewX && (o += "skewX(" + e.skewX + "deg) "), e.skewY && (o += "skewY(" + e.skewY + "deg) "), e.controllerMode ? (i.width = r.width, i.height = r.height) : (typeof f != "undefined" && f != 1 && (o += "scaleX(" + f + ") "), typeof l != "undefined" && l != 1 && (o += "scaleY(" + l + ") "), t || (i.width = p, i.height = d)), o && (i["-webkit-transform"] = o), i["-webkit-animation-timing-function"] = e.easing || t && t.easing, i["-webkit-animation-timing-function"] == "ease" && delete i["-webkit-animation-timing-function"], typeof e.customSetting != "undefined" && (i = $.extend(i, e.customSetting)), i
				},
				keyFrames2css: function(e, t, n) {
					var r = this,
						i = {},
						s, o, u;
					return t.length && ($(t).each(function(t, o) {
						var a = o.index / (e - 1) * 100 + "%";
						o.cssProperties = r.convertKeyFrameSetting2CssProperties(o.setting, u, n), o.index == 0 && (u = o.setting), i[a] = $.extend({}, o.cssProperties), o.cssProperties.isHide && (s && (s["-webkit-animation-timing-function"] = "step-end"), i[a]["-webkit-transform"] = "translateX(-9999px)", i[a]["-webkit-animation-timing-function"] = "step-end"), s = i[a]
					}), i["100%"] = t[t.length - 1].cssProperties), i
				},
				deleteWork: function(e, t, r) {
					$.ajax({
						type: "POST",
						url: n + "/delete",
						data: {
							work_id: e
						},
						success: function(e) {
							var n = e.retcode;
							if (n == 0) {
								var r = e.result;
								t && t(r)
							}
						}
					})
				},
				getWorks: function(e, t, i, s) {
					$.ajax({
						type: "GET",
						url: n + "/query",
						data: {
							t: Date.now(),
							user_id: r,
							page: e,
							size: t
						},
						success: function(e) {
							var t = e.retcode;
							if (t == 0) {
								var n = e.result;
								i && i(n)
							}
						}
					})
				},
				createWork: function(e, t, r) {
					$.ajax({
						type: "POST",
						url: n + "/upsert",
						data: {
							name: e.name,
							work_data: JSON.stringify(e)
						},
						success: function(e) {
							var n = e.retcode;
							if (n == 0) {
								var r = e.result;
								t && t(r)
							}
						}
					})
				},
				createController: function(e, t, r) {
					$.ajax({
						type: "POST",
						url: n + "/upsert",
						data: {
							type: 1,
							name: e.name,
							ctrl_data: JSON.stringify(e)
						},
						success: function(e) {
							var n = e.retcode;
							if (n == 0) {
								var r = e.result;
								t && t(r)
							}
						}
					})
				},
				getControllerList: function(e, t, i, s) {
					$.ajax({
						type: "GET",
						url: n + "/query",
						data: {
							t: Date.now(),
							type: 1,
							user_id: r,
							page: e,
							size: t
						},
						success: function(e) {
							var t = e.retcode;
							if (t == 0) {
								var n = e.result;
								i && i(n)
							}
						}
					})
				},
				deleteController: function(e, t, r) {
					$.ajax({
						type: "POST",
						url: n + "/delete",
						data: {
							type: 1,
							ctrl_id: e
						},
						success: function(e) {
							var n = e.retcode;
							if (n == 0) {
								var r = e.result;
								t && t(r)
							}
						}
					})
				},
				updateController: function(e, t, r) {
					$.ajax({
						type: "POST",
						url: n + "/upsert",
						data: {
							type: 1,
							ctrl_id: e.id,
							name: e.name,
							ctrl_data: JSON.stringify(e)
						},
						success: function(e) {
							var n = e.retcode;
							if (n == 0) {
								var r = e.result;
								t && t(r)
							}
						}
					})
				},
				updateWork: function(e, t, r) {
					$.ajax({
						type: "POST",
						url: n + "/upsert",
						data: {
							work_id: e.id,
							name: e.name,
							work_data: JSON.stringify(e)
						},
						success: function(e) {
							var n = e.retcode;
							if (n == 0) {
								var r = e.result;
								t && t(r)
							}
						}
					})
				},
				logout: function(e, t) {
					$.ajax({
						type: "GET",
						url: n + "/logout",
						data: {
							t: Date.now()
						},
						success: function(n) {
							var r = n.retcode;
							if (r == 0) {
								var i = n.result;
								e && e(i)
							} else t && t()
						}
					})
				},
				uploadImg: function(e, r, i, s, o, u) {
					s = s.split(".")[0];
					var a = {
						type: e,
						img: i,
						img_name: s
					};
					a[e == 1 ? "ctrl_id" : "work_id"] = r, $.ajax({
						type: "POST",
						url: n + "/upload",
						data: a,
						success: function(e) {
							var n = e.retcode;
							if (n == 0) {
								var r = e.result;
								if (r.url) var i = r.url.split("/"),
									s = i[i.length - 1];
								var a = t + "/" + r.url;
								o(a, s)
							} else n == 11 ? alert("图片存储空间不够用了，请在图片管理中删除一些图片吧") : alert("上传失败，请稍后重试"), u && u(e)
						},
						error: function() {
							alert("上传失败，请稍后重试"), u && u()
						}
					})
				},
				postJsCode: function(e, t) {
					$.ajax({
						type: "POST",
						url: n + "/jscode",
						data: {
							user_id: r,
							jscode: e
						},
						success: function(e) {
							var n = e.retcode;
							if (n == 0) {
								var r = e.result;
								t && t(r)
							}
						}
					})
				},
				getImgs: function(e) {
					$.ajax({
						type: "GET",
						url: n + "/getimgs",
						success: function(t) {
							var n = t.retcode;
							if (n == 0) {
								var r = t.result;
								e && e(r)
							}
						}
					})
				},
				downloadWork: function(e, t) {
					var r = $("<a></a>");
					r.prop("href", n + "/workdownload" + (e ? "?work_id=" + e : ""));
					var i = document.createEvent("HTMLEvents");
					i.initEvent("click", !1, !1), r[0].dispatchEvent(i)
				},
				delImg: function(e, t, r, i, s) {
					var o = {
						t: Date.now(),
						file_name: e,
						type: r
					};
					t && (o[r == 1 ? "ctrl_id" : "work_id"] = t), $.ajax({
						type: "POST",
						url: n + "/delimg",
						data: o,
						success: function(e) {
							var t = e.retcode;
							if (t == 0) {
								var n = e.result;
								i && i(n)
							} else alert("删除失败，请稍后重试"), s && s(e)
						},
						error: function() {
							s && s()
						}
					})
				},
				delTemp: function(e, t) {
					$.ajax({
						type: "GET",
						url: n + "/deltemp?" + "t=" + Date.now(),
						success: function(n) {
							var r = n.retcode;
							if (r == 0) {
								var i = n.result;
								e && e(i)
							} else t && t()
						}
					})
				},
				delControllerTemp: function(e, t) {
					$.ajax({
						type: "GET",
						url: n + "/delctrltemp?" + "t=" + Date.now(),
						success: function(n) {
							var r = n.retcode;
							if (r == 0) {
								var i = n.result;
								e && e(i)
							} else t && t()
						}
					})
				},
				imgFileValidate: function(e, t) {
					return /\.(jpg|png|gif|jpeg)$/i.test(e) ? t > 2097152 ? (alert("图片大小不能超过2M"), !1) : !0 : (alert("上传文件必须为图片"), !1)
				}
			};
		return i
	}), define("pages", ["tmpl", "util"], function(e, t) {
		function o(e) {
			this.init(e)
		}
		var n = "pages",
			r = [],
			i, s = 0;
		return o.prototype = {
			init: function(e) {
				e = e || {}, this.pagesList = $(".pages-list"), this.setData(e), this.render(), this.element = this.getPageElement(), this.pageIndexElement = $(".page-index", this.element), this.autoJumpCheckBox = $(".auto-jump-checkbox", this.element), this.preJumpCheckBox = $(".prejump-checkbox", this.element), this.replayCheckBox = $(".replay-checkbox", this.element), this.setIndex(this.index), this.setCheckBoxJumpType({
					autoJump: e.autoJump,
					preJump: e.preJump || !0,
					replay: e.replay
				}), this.bind()
			},
			getData: function() {
				var e = this.getCheckBoxJumpType();
				return {
					id: this.id,
					index: this.index,
					preJump: e.preJump,
					autoJump: e.autoJump,
					replay: e.replay
				}
			},
			setData: function(e) {
				this.id = e.id || t.getRandomId(), this.index = e.index || 0
			},
			bind: function() {
				var e = this,
					n = this.element,
					i = $(".page-del-btn", n);
				n.on("mouseover", function(t) {
					e.showDeleteBtn()
				}), n.on("mouseout", function(t) {
					e.hideDeleteBtn()
				}), i.on("mousedown", function(e) {
					e.stopPropagation()
				}), i.on("click", function(t) {
					t.stopPropagation(), window.confirm("是否删除该页面?") && o.deletePageById(e.id)
				}), this.element.draggable({
					axis: "y",
					start: function(e, t) {},
					stop: function(e, n) {
						var i = $(e.target),
							s = o.getPageById(t.getOriginId(i.attr("id"))),
							u = i.offset().top,
							a, f, l = u + i.height() / 2;
						for (var c = 0, h = r.length; c < h; c++) {
							var p = r[c].element,
								d = p.offset().top,
								v = p.height(),
								m = d + v / 2;
							if (r[c] != s && l < m) {
								f = p.parent(), a = c;
								break
							}
						}
						i.parent().insertBefore(f), f || o.pagesList.append(i.parent()), i.css({
							top: "auto"
						}), o._updatePageIndex(s), s.select()
					}
				})
			},
			setCheckBoxJumpType: function(e) {
				this.autoJumpCheckBox.get(0).checked = e.autoJump, this.preJumpCheckBox.get(0).checked = e.preJump, this.replayCheckBox.get(0).checked = e.replay
			},
			getCheckBoxJumpType: function() {
				return {
					autoJump: this.autoJumpCheckBox.get(0).checked,
					preJump: this.preJumpCheckBox.get(0).checked,
					replay: this.replayCheckBox.get(0).checked
				}
			},
			setIndex: function(e) {
				var t = this.getPageElement();
				t.attr("data-index", e), this.index = e, this.pageIndexElement.html("" + e)
			},
			showDeleteBtn: function() {
				var e = this.getPageElement();
				e.addClass("show-del-btn")
			},
			hideDeleteBtn: function() {
				var e = this.getPageElement();
				e.removeClass("show-del-btn")
			},
			getPageElement: function() {
				return $("#" + n + "_" + this.id)
			},
			render: function() {
				var t = e[n]({
					id: n + "_" + this.id,
					index: this.index
				});
				this.pagesList.append(t)
			},
			select: function() {
				var e = this.getPageElement();
				if (e.hasClass("selected")) return;
				console.log("Page select"), setTimeout(function() {
					e.addClass("selected")
				}, 0), $(window).trigger("pageSelect", {
					selectedPage: this
				}), console.log(this.index)
			},
			unSelect: function() {
				var e = this.getPageElement();
				e.removeClass("selected"), $(window).trigger("pageUnselect", {
					unSelectedPage: this
				})
			},
			remove: function() {
				var e = this.getPageElement();
				e.remove()
			}
		}, o.init = function(e) {
			e = e || {}, this.pagesAddBtn = $(".pages-add-button"), this.pagesList = $(".pages-list"), this.setData(e), this.bind()
		}, o.getData = function() {
			var e = [];
			return $(r).each(function(t, n) {
				var r = n.getData();
				e.push(r)
			}), {
				pagesDataArr: e
			}
		}, o.setData = function(e) {
			e = e || {}, r = [], i = null, this.clearDomList(), e.pagesDataArr && $(e.pagesDataArr).each(function(e, t) {
				var n = new o(t);
				r.push(n)
			})
		}, o.bind = function() {
			var e = this;
			this.pagesAddBtn.on("click", function() {
				e.add()
			}), this.pagesList.on("mousedown", ".page", function(t) {
				var n = $(this),
					r = n.attr("data-index");
				n.length && e.select(r)
			}), $(window).on("pageSelect", function() {
				var e = arguments[1],
					t = e.selectedPage;
				i && i != t && i.unSelect(), i = t
			})
		}, o.getCurrentPage = function() {
			return i
		}, o.getPageByIndex = function(e) {
			for (var t = 0, n = r.length; t < n; t++)
				if (r[t].index == e) return r[t]
		}, o.getPageById = function(e) {
			for (var t = 0, n = r.length; t < n; t++)
				if (r[t].id == e) return r[t]
		}, o.deletePageById = function(e) {
			var t;
			for (var n = 0; n < r.length; n++) r[n].setIndex(n), r[n].id == e && (e == i.id ? s == r.length - 1 && s-- : n > s || n < s && s--, r[n].remove(), r.splice(n, 1), n--);
			$(window).trigger("pageDelete", {
				pageId: e
			});
			var o = this.getPageByIndex(s);
			o && o.select()
		}, o._updatePageIndex = function(e) {
			var n = this,
				i = $(".page");
			$.each(i, function(e, n) {
				var r = o.getPageById(t.getOriginId(n.id));
				r.setIndex(e)
			}), r = r.sort(function(e, t) {
				return e.index > t.index
			}), $(window).trigger("pagesOrderChange", {
				pages: r,
				currentPageIndex: r.indexOf(e)
			})
		}, o.getPages = function() {
			return r
		}, o.clearDomList = function() {
			this.pagesList.html("")
		}, o.add = function() {
			var e = new o({
				index: r.length
			});
			r.push(e), $(window).trigger("pageAdd", {
				page: e
			}), e.select()
		}, o.select = function(e) {
			var t = this.getPageByIndex(e);
			t.select(), s = e
		}, o.next = function() {
			if (i.index + 1 >= r.length) return;
			o.select(i.index + 1)
		}, o.remove = function() {
			$.each(r, function(e, t) {
				t.remove()
			})
		}, o
	}),
	function(e, t) {
		typeof exports == "object" ? module.exports = t() : typeof define == "function" && define.amd ? define("transition", [], t) : e.Transition = t()
	}(this, function() {
		function o(e) {
			for (var t = 0, n = r.length; t < n; t++)
				if (r[t] == e) return !0
		}

		function u(e, t, n) {
			return e["-webkit-transition"] = "all " + t + "s " + n, e
		}

		function a(e, t, n, r) {
			return {
				"-webkit-animation-name": e,
				"-webkit-animation-duration": t * 1e3 + "ms",
				"-webkit-animation-fill-mode": "forwards",
				"-webkit-animation-iteration-count": n ? r ? r : "infinite" : "1"
			}
		}

		function f(e) {
			return e.replace(/translateZ\(.*?\)/g, "").replace(/rotateX\(.*?\)/g, "").replace(/rotateY\(.*?\)/g, "").replace(/rotateZ/g, "rotate").replace(/translateZ\(.*?\)/g, "").replace(/perspective\(.*?\)/g, "")
		}

		function l(e, t) {
			var n = {},
				r = [];
			for (var i in t) t.hasOwnProperty(i) && (i == "-webkit-transform" && s && (t[i] = f(t[i])), n[i] = t[i], o(i) && !isNaN(Number(n[i])) && (n[i] += "px"), r.push(i + ":" + n[i] + ";"));
			return e + "{" + r.join("") + "}"
		}

		function c(e, t) {
			var n = [];
			n.push("@-webkit-keyframes"), n.push(e), n.push("{");
			for (var r in t)
				if (t.hasOwnProperty(r)) {
					var i = l(r, t[r]);
					n.push(i)
				}
			n.push("}");
			var s = n.join(" "),
				o = $("<style></style>", {
					"class": "animation-style"
				});
			return o.html(s), o
		}

		function h(e) {
			this.init(e)
		}

		function p(e) {
			this.init(e)
		}
		var e = {
				duration: 2,
				type: "linear",
				nextDuration: 0,
				use3d: !0,
				defaultKeyAnimationName: "key-animation"
			},
			t = 0,
			n = [],
			r = ["width", "height"],
			i = $.os && ($.os.ios || $.os.android),
			s = $.os && $.os.android && Number($.os.version.split(".")[0]) < 4;
		return h.prototype = {
			init: function(e) {
				this.transitionObj = e, this.keyframesStyleList = []
			},
			pause: function() {
				var e = this.transitionObj.elem;
				e.css({
					"-webkit-animation-play-state": "paused"
				})
			},
			resume: function() {
				var e = this.transitionObj.elem;
				e.css({
					"-webkit-animation-play-state": "running"
				})
			},
			stop: function() {
				var e = this.transitionObj.elem;
				e.css({
					"-webkit-animation": "none"
				}), this.resetStyle(), this.resume()
			},
			play: function() {
				var n = this.transitionObj,
					r;
				n.elem && (r = $(n.elem)), r.addClass("t_sprite");
				var o = n.duration || e.duration,
					u = n.type || e.type,
					f = typeof n.use3d == "undefined" ? n.use3d = e.use3d : n.use3d;
				if (n.keyframes) {
					var l;
					(l = $(n.elem).data("keyAnimationId")) && $("#" + l).remove();
					var h = e.defaultKeyAnimationName + t,
						p = c(h, n.keyframes);
					p.attr("id", h), $(n.elem).data("keyAnimationId", h), this.keyframesStyleList.push(p), $("head").append(p);
					var d = a(h, n.duration, n.repeatMode, n.repeatTime);
					r.css(d), r.addClass("running-sprite"), r.attr("data-playing-framesbar-render-id", n.playingFramesBarRenderId), t++
				}
				$(n.elem).off("webkitAnimationEnd"), $(n.elem).on("webkitAnimationEnd", function(e) {
					var t;
					e.stopPropagation();
					var r = (e.originalEvent || e).animationName;
					n.keyframes && (t = n.keyframes["100%"]), n.callback && n.callback({
						animationName: r
					}), t && i && s && $(n.elem).css(t)
				}), $(n.elem).off("webkitAnimationIteration"), $(n.elem).on("webkitAnimationIteration", function(e) {
					e.stopPropagation(), n.interationCallback && n.interationCallback({
						animationName: e.originalEvent.animationName
					})
				})
			},
			resetStyle: function() {
				var e = this.keyframesStyleList;
				while (e.length) {
					var t = e.pop();
					$(t).remove()
				}
			}
		}, p.prototype = {
			init: function(e) {
				this.t_obj_arr = [], this.bind()
			},
			bind: function() {
				var e = this;
				$(window).on("singleLoopAnimationEnd", function() {
					var t = arguments[1],
						n = e.t_obj_arr,
						r = t.t_obj;
					n.length > 0 ? e.playNext(r.nextDuration) : (e.running = !1, r.onEnd && r.onEnd(), r.onEnd = null)
				})
			},
			playNext: function(t) {
				var n = this.t_obj_arr;
				if (n.length > 0) {
					var r = n.shift();
					setTimeout(function() {
						self.playListAnimation(r)
					}, (t || e.nextDuration) * 1e3)
				}
			},
			playListAnimation: function(e) {
				var t = this,
					n = e.transitionArr || [],
					r = n.length,
					i = 0;
				for (var s = 0; s < r; s++) {
					var o = n[s],
						u = p.playSingle(o);
					t.singleTransitionArr.push(u), $(o.elem).on("webkitAnimationEnd", function(t) {
						t.stopPropagation(), i++, i == r && (e.totalCallback && e.totalCallback(), $(window).trigger("singleLoopAnimationEnd", {
							t_obj: e
						}))
					})
				}
			},
			run: function() {
				var e = this,
					t = this.t_obj_arr;
				this.running = !0, this.singleTransitionArr = [], this.resetStyle();
				if (t.length > 0) {
					var n = t.shift();
					e.playListAnimation(n)
				} else this.running = !1, n.onEnd && n.onEnd(), n.onEnd = null;
				return this
			},
			resetStyle: function() {
				$.each(this.singleTransitionArr, function(e, t) {
					t.resetStyle()
				})
			},
			add: function(e) {
				return this.t_obj_arr.push(e), this
			},
			pause: function() {
				$.each(this.singleTransitionArr, function(e, t) {
					t.pause()
				})
			},
			resume: function() {
				$.each(this.singleTransitionArr, function(e, t) {
					t.resume()
				})
			},
			stop: function() {
				$.each(this.singleTransitionArr, function(e, t) {
					t.stop()
				}), this.resume(), this.t_obj_arr = []
			},
			getAnimationObjectArr: function() {
				return this.t_obj_arr
			},
			end: function(e) {
				return this.t_obj_arr[t_obj_arr.length - 1].onEnd = e, this
			},
			isRunning: function() {
				return this.running
			}
		}, p.playSingle = function(e) {
			var t = new h(e);
			return t.play(), t
		}, p.createKeyframesStyle = c, p.createAnimationStyleObj = a, p.filterAndroid23Transform = f, p
	}),
	function(e, t) {
		typeof exports == "object" ? module.exports = t() : typeof define == "function" && define.amd ? define("main_page", ["transition"], t) : e.MainPage = t(e.Transition)
	}(this, function(e) {
		function E(e, t) {
			var n = function() {
				var r = Date.now(),
					i;
				r - y > g ? (d++, y = r, i = ~~(d / t * 100), e && e(i)) : setTimeout(function() {
					n()
				}, g - (r - y))
			};
			return n
		}

		function S() {
			return ~~(Math.random() * 1e8)
		}

		function x() {
			var e = C.animationObjectsList[t];
			t < n.length - 1 && C.next()
		}

		function T() {
			var e = C.animationObjectsList[t];
			e.preJump && t > 0 && C.pre()
		}

		function N(t) {
			return w && (t = e.filterAndroid23Transform(t)), t
		}
		var t = 0,
			n, r = {},
			i = {},
			s, o = window.innerWidth,
			u = window.innerHeight,
			a = $.os && ($.os.ios || $.os.android),
			f = {},
			l, c, h, p, d = 0,
			v, m, g = a ? 1e3 : 0,
			y = 0,
			b = a ? "tap" : "click",
			w = $.os && $.os.android && Number($.os.version.split(".")[0]) < 4,
			C = {
				init: function(e) {
					e = e || {}, this.showArea = $(".main-show-area"), this.showClassName(e.showClassName), this.bind()
				},
				bind: function() {
					this.showArea.on("touchmove", function(e) {
						e.preventDefault()
					})
				},
				bindSwipeHandler: function() {
					c == "utd" ? (this.showArea.bind("swipeDown", T), this.showArea.bind("swipeUp", x)) : (this.showArea.bind("swipeRight", T), this.showArea.bind("swipeLeft", x))
				},
				__resetSpritesAnimationByStage: function(e) {
					var t = e.find(".ms-sprite");
					t.each(function(e, t) {
						var n = t.id,
							r = s[n];
						r && $(t).css(r)
					}), e.addClass("ms-no-animation")
				},
				_resumeSpritesAnimationByStage: function(e) {
					e.removeClass("ms-no-animation")
				},
				_bindStageAnimationEnd: function(e) {
					var n = this;
					e.on("webkitAnimationEnd", function() {
						var r = e.data("index");
						r == t ? ($(window).trigger("pageEnterFinish", {
							pageIndex: r,
							from: "main_show",
							isGlobalEvent: 1
						}), $(window).trigger("pageEnterFinish" + r, {
							isGlobalEvent: 1,
							from: "main_show"
						}), n.run()) : ($(window).trigger("pageLeaveFinish", {
							pageIndex: r,
							isGlobalEvent: 1
						}), $(window).trigger("pageLeaveFinish" + r, {
							isGlobalEvent: 1
						}))
					})
				},
				__bindClickAction: function(e, n) {
					var r = this,
						i;
					if (e.clickActionJumpNext || e.clickActionEventName) i = function() {
						var i = e.elem.closest(".ms-stage");
						e.clickActionEventName && $(window).trigger(e.clickActionEventName, {
							stageElementIndex: i.data("index"),
							from: n
						}), e.clickActionJumpNext && e.stageIndex == t && r.next()
					}, l || (l = {}), l[e.id] && e.elem.off(b, i), l[e.id] = i, e.elem.on(b, i)
				},
				addElements: function(e) {
					var r = this;
					$.each(e, function(e, i) {
						var s = r.addStage();
						e == 0 && s.addClass("pt-page-current"), n.push(s), s.data("index", e);
						var o = {
							"z-index": 100 - e,
							"background-image": i.backgroundImage ? "url(" + i.backgroundImage + ")" : "none",
							"background-color": i.backgroundColor ? i.backgroundColor : "#FFF"
						};
						i.isControllerPreview && $.extend(o, {
							width: i.width,
							height: i.height,
							left: "50%",
							top: "50%",
							"margin-left": -i.width / 2,
							"margin-top": -i.height / 2
						}), s.css(o), r._bindStageAnimationEnd(s), r.createSingle(i, s), i.totalCallback = function() {
							$(window).trigger("pageAnimationFinish", e), i.autoJump && t == e && r.next()
						}
					})
				},
				loadResource: function(e, t) {
					d = 0;
					var n = Object.keys(e).length;
					if (n == 0) {
						setTimeout(function() {
							t && t(100)
						}, g);
						return
					}
					$.each(e, function(e) {
						var r = new Image;
						r.onload = r.onerror = E(t, n), r.src = e
					})
				},
				setResourceLoadedCallback: function(e) {
					this.resourceLoadedCallback = e
				},
				create: function(e) {
					r = {}, i = {};
					if (!e) return;
					var s = this,
						o = e.imgUrlsMap;
					t = 0, n = [], animationObjectsList = $.extend(!0, [], e.list), this.animationObjectsList = animationObjectsList;
					if (!animationObjectsList.length) return;
					h = e.currentStageTransitionObj, c = e.currentStageTransitionDirection, this.bindSwipeHandler(), this.loadResource(o, function(e) {
						s.resourceLoadedCallback && s.resourceLoadedCallback(e), e == 100 && setTimeout(function() {
							s.addElements(animationObjectsList), $(window).trigger("allSpriteAdded"), s.run()
						}, g)
					})
				},
				showClassName: function(e) {
					p = e, e ? this.showArea.addClass("show-class-name") : this.showArea.removeClass("show-class-name")
				},
				createSingle: function(t, n, s) {
					var o = this,
						u = t.transitionArr;
					$.each(u, function(e, t) {
						var u = o.addNewElement(t, n, s);
						r[t.id] = t.elem = u, i[t.id] = t.controllerSingle, t.stageIndex = Number(n.data("index"));
						if (t.className && a) {
							u.addClass(t.className);
							var f = $("#t_content_" + t.className).html();
							f && u.html(f)
						}
						o.__bindEndAction(t, "main_show"), o.__bindClickAction(t, "main_show")
					});
					var l = t.eventTransitionArr;
					return $.each(l, function(t, n) {
						var s = n.emitEventName,
							u = $.extend(!0, {}, n.animationObj),
							a = r[u.id],
							l = i[u.id];
						u.elem = a;
						var c = function() {
							var t = arguments.callee.et,
								n = arguments[1] || {},
								r = t.elem.closest(".ms-stage");
							n && n.from == "main_show" && (t.isGlobal || n.stageElementIndex == r.data("index") || n.isGlobalEvent) && (o.__bindEndAction(t, "main_show"), e.playSingle(t), l && t.isControllerPlay && o.runSingle(l))
						};
						c.et = u;
						if (u.elem) {
							var h = u.elem.prop("id");
							f || (f = {}), f[h] || (f[h] = {}), f[h][s] = c, n.isListenOnce ? $(window).one(s, c) : $(window).on(s, c)
						}
					}), t
				},
				__bindEndAction: function(e, n) {
					var r = this;
					if (e.animationEndEventName || e.animationEndJumpNext) e.callback = function() {
						var i = $(e.elem).closest(".ms-stage");
						e.animationEndEventName && $(window).trigger(e.animationEndEventName, {
							from: n,
							stageElementIndex: i.data("index")
						}), e.animationEndJumpNext && t == e.stageIndex && r.next()
					}
				},
				jumpTo: function(e) {
					var r = e ? t + 1 : t - 1,
						i = n[t],
						s = n[r],
						o = this.animationObjectsList[r];
					if (!o) return;
					var u = this.animationObjectsList[t];
					u.actionEventName && $(window).trigger(u.actionEventName, {
						from: "main_show",
						stageElementIndex: t
					}), $(window).trigger("pageLeave", {
						pageIndex: t,
						isGlobalEvent: 1,
						from: "main_show"
					}), $(window).trigger("pageLeave" + t, {
						isGlobalEvent: 1,
						from: "main_show"
					}), $(window).trigger("pageEnter", {
						pageIndex: r,
						isGlobalEvent: 1,
						from: "main_show"
					}), $(window).trigger("pageEnter" + r, {
						isGlobalEvent: 1,
						from: "main_show"
					});
					if (typeof t != "undefined") {
						var a = h[t < r ? "down" : "up"],
							f = a.inClass,
							l = a.outClass;
						i[0].className = "ms-stage " + l, s[0].className = "ms-stage " + f + " pt-page-current"
					}
					o.played && o.replay && this.__resetSpritesAnimationByStage(s), t = r
				},
				pre: function() {
					this.jumpTo()
				},
				next: function() {
					this.jumpTo(!0)
				},
				runSingle: function(t) {
					return m = new e, m.add(t), m.run(), m
				},
				run: function() {
					var e = this,
						r = this.animationObjectsList[t];
					this._resumeSpritesAnimationByStage(n[t]), r && (!r.played || r.replay) && (this.runSingle(r), r.played = !0, $.each(r.transitionArr, function(t, n) {
						n.controllerSingle && n.isControllerPlay && e.runSingle(n.controllerSingle)
					}))
				},
				addNewElement: function(e, t, n) {
					var r = this,
						i, o, u = e.controllerRenderData,
						f = $(t.children()[0]);
					if (u) {
						o = $("<div></div>", {
							"class": "ms-controller-wrap"
						});
						var l = $("<div></div>", {
							"class": "ms-stage-container"
						});
						o.append(l), i = r.createSingle(u, o)
					}
					var c = (n ? "controller_sprite_" : "ms_") + S(),
						h = $("<div></div>", {
							id: c,
							"class": n ? "controller-sprite" : "ms-sprite " + e.className
						});
					e.textContent && h.html(e.textContent);
					if (p) {
						var d = $("<div></div>", {
							"class": "ms-sprite-class-name-tag"
						});
						d.text(e.name), h.append(d)
					}
					var m = {
						"z-index": e.zIndex
					};
					e.spriteCustomSetting && $.extend(m, e.spriteCustomSetting), e.imgUrl && (m["background-image"] = "url(" + e.imgUrl + ")");
					if (e.keyframes && !$.isEmptyObject(e.keyframes)) {
						var g = $.extend(m, e.keyframes["0%"]);
						delete g["-webkit-animation-timing-function"], a && !h.data("xConvert") && (g["-webkit-transform"] = N(g["-webkit-transform"]), h.data("xConvert", 1)), g.width = Number(g.width), g.height = Number(g.height), h.css(g), s || (s = {}), s[c] = g
					} else h.css($.extend(m, e.spriteCssProperties, {
						zIndex: e.zIndex
					}));
					return o && (o.appendTo(h), e.controllerSingle = i), e.isGlobal ? (v || (v = $("<div></div>", {
						"class": "ms-global-sprite-wrap"
					}), v.appendTo(this.showArea)), h.appendTo(v)) : h.appendTo(f), h
				},
				addStage: function() {
					var e = $("<div></div>", {
							"class": "ms-stage"
						}),
						t = $("<div></div", {
							"class": "ms-stage-container"
						});
					return e.append(t), e.appendTo(this.showArea), e
				},
				trigger: function(e, t) {
					$(window).trigger(e, t)
				},
				on: function(e, t) {
					$(window).on(e, t)
				},
				removeAllAnimationStyle: function() {
					$(".animation-style").remove()
				},
				clear: function() {
					this.showArea.html("")
				},
				remove: function() {
					v = null, this.showArea.html(""), m && m.stop(), this.clear(), this.removeAllAnimationStyle(), this.removeAllEventHandler()
				},
				removeAllEventHandler: function() {
					$.each(f, function(e, t) {
						$.each(t, function(e, t) {
							$(window).off(e, t)
						})
					}), f = {}, this.showArea.off("swipeDown", this.prePageHandler), this.showArea.off("swipeUp", this.nextPageHandler), this.showArea.off("swipeRight", this.prePageHandler), this.showArea.off("swipeLeft", this.nextPageHandler)
				}
			};
		return C
	}), define("controller", ["tmpl", "util", "main_page", "transition"], function(e, t, n, r) {
		function i(e) {
			this.init(e)
		}

		function o() {
			return ~~(Math.random() * 1e8)
		}
		var s;
		return i.prototype = {
			init: function(e) {
				var t = e.controllerRenderData;
				this.controllerRenderData = t, this.container = e.container, this.id = t.id, this.name = t.name, this.width = t.width, this.height = t.height, this.eventHandlerMap = {}, this.setMode(t.mode), this.render(), this.bind()
			},
			setMode: function(e) {
				this.mode = e || 0
			},
			render: function() {
				var e = $("<div></div>", {
					id: t.getRandomId(),
					"class": "controller"
				});
				e.css({
					width: this.width,
					height: this.height
				}), this.element = e, this.appendTo(this.container);
				var n = $.extend(!0, {}, this.controllerRenderData);
				this.animationObject = this.create(n, this.element, !0)
			},
			resize: function(e, t) {
				this.scaleX = e / this.width, this.scaleY = t / this.height, this.element.css({
					"-webkit-transform": "scaleX(" + this.scaleX + ") scaleY(" + this.scaleY + ")",
					"-webkit-transform-origin": "left top"
				})
			},
			isInEditStage: function() {
				return this.element.closest(".stage").length > 0
			},
			bind: function() {
				var e = this;
				this.element.parent().on("dblclick", function() {
					e.isInEditStage() && $(window).trigger("controllerEdit", {
						controller: e
					})
				})
			},
			setSpriteListElementStyle: function(e) {
				var t = $(".controller-sprite", this.element);
				typeof e == "object" ? $(t).each(function(t, n) {
					$(n).css(e)
				}) : typeof e == "function" && $(t).each(e)
			},
			addNewElement: function(e, t, n) {
				var r = this,
					i, s, u, a = (n ? "controller_sprite_" : "ms_") + o(),
					f = $("<div></div>", {
						id: a,
						"class": n ? "controller-sprite" : "ms-sprite"
					}),
					l = {
						"z-index": e.zIndex
					};
				return e.imgUrl && (l["background-image"] = "url(" + e.imgUrl + ")"), e.textContent && f.html(e.textContent), e.keyframes ? (u = $.extend(l, e.spriteCustomSetting, e.keyframes["0%"]), delete u["-webkit-animation-timing-function"]) : u = $.extend(l, e.spriteCustomSetting, e.spriteCssProperties), f.css(u), f.appendTo(t), e.firstCssProperty = u, f
			},
			create: function(e, t, i) {
				var s = {},
					o = this,
					u = e.transitionArr;
				$.each(u, function(e, r) {
					var u = o.addNewElement(r, t, i);
					s[r.id] = r.elem = u, n.__bindEndAction(r, "edit"), n.__bindClickAction(r, "edit")
				});
				var a = e.eventTransitionArr;
				return $.each(a, function(e, t) {
					var i = t.emitEventName,
						u = t.animationObj,
						a = s[u.id];
					u.elem = a;
					var f = function() {
						var e = arguments[1];
						e.from == "edit" && (n.__bindEndAction(u, "edit"), r.playSingle(u))
					};
					o.eventHandlerMap[u.id] || (o.eventHandlerMap[u.id] = {}), o.eventHandlerMap[u.id][i] && ($(window).off(i, o.eventHandlerMap[u.id][i]), o.eventHandlerMap[u.id][i] = null), o.eventHandlerMap[u.id][i] = f, t.isListenOnce ? $(window).one(i, f) : $(window).on(i, f)
				}), e
			},
			playAnimation: function() {
				var e = this.animationObject;
				this.T = new r, this.T.add(e), this.T.run()
			},
			pauseAnimation: function() {
				this.T && this.T.pause()
			},
			resumeAnimation: function() {
				this.T && this.T.resume()
			},
			stopAnimation: function() {
				$.each(this.animationObject.transitionArr, function(e, t) {
					var n = t.elem,
						r = t.firstCssProperty;
					n.css(r)
				}), this.T && this.T.stop()
			},
			appendTo: function(e) {
				$(e).append(this.element)
			},
			getControllerElement: function() {
				return this.element
			},
			removeAllEventHandler: function() {
				$.each(this.eventHandlerMap, function(e, t) {
					$.each(t, function(e, t) {
						$(window).off(e, t)
					})
				}), this.eventHandlerMap = {}
			},
			remove: function() {
				this.removeAllEventHandler(), this.stopAnimation(), this.element.remove()
			},
			getData: function() {
				return this.data
			}
		}, i
	}), define("sprite", ["tmpl", "util", "controller"], function(e, t, n) {
		function o(e) {
			this.init(e)
		}
		var r = "sprite",
			i = 0,
			s;
		return o.prototype = {
			init: function(e) {
				this.setData(e), this.render(), this.controllerRenderData && this.initController(this.controllerRenderData), this.bind(), this.initialSetting = this.getSetting(), this.setZIndex(this.zIndex);
				if (!this.imgUrl && !this.controller) {
					var t = this.getSpriteElement();
					t.addClass("empty-sprite-container")
				}
				this.bindClickAction({
					actionJumpNext: this.clickActionJumpNext,
					actionEventName: this.clickActionEventName
				});
				var t = this.getSpriteElement();
				this.nameTag = $(".sprite-class-name-tag", t), this.setNameTag(this.name)
			},
			setData: function(e) {
				this.id = e.id || t.getRandomId(), this.x = e.x || 0, this.y = e.y || 0, this.zIndex = e.zIndex, this.name = e.name || "s_" + i++, this.className = e.className || this.name, this.width = e.width, this.height = e.height, this.scale = e.scale || 1, this.rotateZ = e.rotateZ || 0, this.rotateX = e.rotateX || 0, this.rotateY = e.rotateY || 0, this.skewX = e.skewX || 0, this.skewY = e.skewY || 0, this.perspective = e.perspective || 0, e.opacity != null ? this.opacity = e.opacity : this.opacity = 1, this.display = e.display || "block", this.imgUrl = e.imgUrl, this.imgFileName = e.imgFileName, this.backgroundColor = e.backgroundColor, this.controllerRenderData = e.controllerRenderData, this.stage = e.stage, this.stagesList = e.stagesList || $(".stages-list"), this.actionEventName = null, this.zIndex = e.zIndex || 0, this.listenEventNameList = e.listenEventNameList || [], this.clickActionEventName = e.clickActionEventName, this.clickActionJumpNext = e.clickActionJumpNext, this.eventFramesBarsMap = {}, this.isGlobal = e.isGlobal, this.spriteCustomSetting = e.spriteCustomSetting, this.controllerMode = e.controllerMode || 0, this.isText = e.isText, this.textContent = e.textContent, this.isSingle = e.isSingle
			},
			getData: function() {
				var e = $.extend({}, this.getInitialSetting(), {
					id: this.id,
					listenEventNameList: Object.keys(this.listenEventHandlerMap || {}),
					isGlobal: this.isGlobal,
					isText: this.isText,
					textContent: this.textContent,
					isSingle: this.isSingle,
					zIndex: this.zIndex,
					clickActionEventName: this.clickActionEventName
				});
				return !this.getCommondFramesBar() && !this.hasEventFramesBar() && (e.spriteCssProperties = this.getCssProperties()), e
			},
			initController: function(e) {
				if (e) {
					var t = this.getControllerWrapElement();
					this.controller = new n({
						controllerRenderData: e,
						container: t,
						fromEdit: !0
					})
				}
			},
			addToGlobal: function(e) {
				globalSpriteWrap = this.stage.getGlobalSpriteWrap(), globalSpriteWrap.append(e)
			},
			addToStage: function(e) {
				var t = this.stage.getStageElement();
				t.append(e)
			},
			setGlobal: function(e) {
				var t = this.getSpriteElement(),
					n = t.parent().parent();
				this.isGlobal = e, e ? this.addToGlobal(n) : this.addToStage(n)
			},
			setNameTag: function(e) {
				this.nameTag.text(e)
			},
			setFramesBar: function(e) {
				e.emitType == "none" ? this.framesbar = e : this.eventFramesBarsMap[e.emitEventName] = e, e.isSingle = this.isSingle
			},
			setTextContent: function(e) {
				if (this.isSingle && this.controllerMode == 0) {
					var t, n, r, i, o, u, a;
					s || (s = $("<div></div>", {
						"class": "test-width-div"
					}), $("body").append(s)), s.html(e), t = s.width() + 2, n = s.height(), this.initialSetting && this.initialSetting.width != null ? (i = this.width / this.initialSetting.width, o = this.height / this.initialSetting.height) : (i = 1, o = 1, this.width = t, this.height = n), this.initialSetting && (this.initialSetting.width = t, this.initialSetting.height = n), r = this.getSpriteElement(), u = t * i, a = n * o, this.setStyle({
						width: u,
						height: a
					}), $(window).trigger("spriteSingleTextChange", {
						sprite: this,
						resetInitialSize: !0,
						currentScaleX: i,
						currentScaleY: o,
						currentWidth: u,
						currentHeight: a
					})
				}
				this.textContent = e, this.textWrapElement.html(e)
			},
			getCommondFramesBar: function() {
				return this.framesbar
			},
			hasEventFramesBar: function() {
				return !!this.eventFramesBarsMap && !!Object.keys(this.eventFramesBarsMap).length
			},
			getEventFramesBar: function(e) {
				if (e) return this.eventFramesBarsMap[e];
				var t = [];
				return $.each(this.eventFramesBarsMap, function(e, n) {
					t.push(n)
				}), t
			},
			bindAnimationCustomEvent: function(e, t) {
				this.listenEventHandlerMap || (this.listenEventHandlerMap = {});
				var n = this.getSpriteElement();
				$(window).on(e, t), this.listenEventHandlerMap[e] = t
			},
			playControllerAnimation: function() {
				this.controller && this.controller.playAnimation()
			},
			setPlayingFramesBarRenderId: function(e) {
				var t = this.getSpriteElement();
				t.attr("data-playing-framesbar-render-id", e)
			},
			getPlayingFramesBarRenderId: function() {
				var e = this.getSpriteElement();
				return e.attr("data-playing-framesbar-render-id")
			},
			removeAnimationCustomEvent: function(e) {
				var t = this;
				if (!this.listenEventHandlerMap) return;
				if (!e) {
					$.each(this.listenEventHandlerMap, function(e) {
						t.removeAnimationCustomEvent(e)
					});
					return
				}
				var n = this.listenEventHandlerMap[e];
				n && ($(window).off(e, n), delete this.listenEventHandlerMap[e], delete this.eventFramesBarsMap[e])
			},
			removeJumpNextFlag: function() {
				this.jumpNextFlag && this.jumpNextFlag.remove()
			},
			setJumpNextFlag: function() {
				var e = this.getSpriteElement();
				this.jumpNextFlag || (this.jumpNextFlag = $("<div></div>", {
					"class": "sprite-jump-next-flag glyphicon glyphicon-arrow-down"
				})), this.jumpNextFlag.appendTo(e)
			},
			setEventActionNameFlag: function(e) {
				var t = this.getSpriteElement();
				this.eventActionFlag || (this.eventActionFlag = $("<div></div>", {
					"class": "sprite-event-action-flag"
				})), this.eventActionFlag.appendTo(t), this.eventActionFlag.html("click:" + e)
			},
			removeEventActionNameFlag: function() {
				this.eventActionFlag && this.eventActionFlag.remove()
			},
			setClickActionFlag: function() {
				this.clickActionEventName ? this.setEventActionNameFlag(this.clickActionEventName) : this.removeEventActionNameFlag(), this.clickActionJumpNext ? this.setJumpNextFlag() : this.removeJumpNextFlag()
			},
			bindClickAction: function(e) {
				var t = this,
					n = this.getSpriteElement();
				this.clickActionJumpNext = e.actionJumpNext, this.clickActionEventName = e.actionEventName, n && this.setClickActionFlag()
			},
			bind: function() {
				var e = this,
					t = this.getSpriteElement(),
					n = t.parent(),
					r = n.parent();
				t.resizable({
					handles: "ne,nw,se,sw,e,n,s,w",
					stop: function(n, r) {
						var i = {
							x: r.position.left + e.x,
							y: r.position.top + e.y,
							width: r.size.width,
							height: r.size.height
						};
						t.css({
							left: 0,
							top: 0
						}), e.setStyle(i), $(window).trigger("spritePositionUpdate", {
							sprite: e
						})
					}
				}), r.draggable({
					start: function() {
						if (e.isLock || $("body").hasClass("playing_animation")) return !1
					},
					stop: function(t, n) {
						var i = {
							x: n.position.left + e.x,
							y: n.position.top + e.y
						};
						r.css({
							left: 0,
							top: 0
						}), e.setStyle(i), $(window).trigger("spritePositionUpdate", {
							sprite: e
						})
					}
				}), t.rotatable({
					start: function() {},
					stop: function(t, n) {
						var r = n.angle.current * 180 / Math.PI,
							i = {
								rotateZ: r
							};
						e.setStyle(i), $(window).trigger("spritePositionUpdate", {
							sprite: e
						})
					}
				}), this.isText && t.on("dblclick", function() {
					$(window).trigger("spriteTextEdit", {
						sprite: e
					})
				}), $(window).on("pageSelect", function() {
					var t = arguments[1],
						n = t.selectedPage.id;
					e.isGlobal && (n != e.stage.id ? e.lock() : e.unlock())
				}), $(window).on("playAnimation", function() {
					var t = arguments[1],
						n = t.framesBar.stageId;
					if (!e.getCommondFramesBar() && !e.hasEventFramesBar()) return;
					if (e.stage.id == n)
						if (t.framesBar.emitType == "none" && e.getCommondFramesBar() || t.framesBar.emitType == "eventEmit" && e.getEventFramesBar(t.framesBar.emitEventName)) {
							if (e.isText) {
								var r = e.getTextElement();
								r.attr("style", "")
							}
							if (e.controller) {
								var i = e.getControllerWrapElement();
								i.attr("style", "")
							}
						}
				})
			},
			hideImg: function() {
				var e = this.getSpriteElement();
				e.addClass("sprite-invisible")
			},
			showImg: function() {
				var e = this.getSpriteElement();
				e.removeClass("sprite-invisible")
			},
			lock: function() {
				var e = this.getSpriteElement();
				e.addClass("locked"), this.isLock = !0
			},
			unlock: function() {
				var e = this.getSpriteElement();
				e.removeClass("locked"), this.isLock = !1
			},
			getTextContent: function() {
				return this.textContent
			},
			getSpriteImgElement: function() {
				var e = this.getSpriteElement();
				return this.spriteImgElement || (this.spriteImgElement = $(".sprite-img", e)), this.spriteImgElement
			},
			getSpriteElement: function() {
				if (!this.element || !this.element.length) this.element = $("#" + r + "_" + this.id);
				return this.element
			},
			select: function() {
				var e = this.getSpriteElement();
				if (e.hasClass("selected")) return;
				e.addClass("selected"), console.log("Sprite selected"), $(window).trigger("spriteSelect", {
					selectedSprite: this
				}), $(window).trigger("afterSpriteSelect", {
					selectedSprite: this
				})
			},
			unSelect: function() {
				var e = this.getSpriteElement();
				if (!e.hasClass("selected")) return;
				e.removeClass("selected")
			},
			setZIndex: function(e) {
				var t = this.getSpriteElement();
				t.css({
					"z-index": e
				}), this.zIndex = e
			},
			getTextElement: function() {
				if (!this.textElement) {
					var e = this.getSpriteElement();
					this.textElement = $(".text-wrap", e)
				}
				return this.textElement
			},
			getControllerWrapElement: function() {
				if (!this.controllerWrapElement) {
					var e = this.getSpriteElement();
					this.controllerWrapElement = e.find(".controller-wrap")
				}
				return this.controllerWrapElement
			},
			setStyle: function(e) {
				e = $.extend(this, e);
				var t = this,
					n = this.getSpriteElement(),
					r = this.getSpriteImgElement(),
					i = this.getTextElement(),
					s = this.getControllerWrapElement();
				n.removeClass("running-sprite"), n.data("elementCurrentAngle", e.rotateZ * Math.PI / 180);
				var o = this.getCssProperties(),
					u = {
						opacity: o.opacity,
						"background-color": o["background-color"],
						"background-image": o["background-image"],
						"background-position": o["background-position"],
						"background-size": o["background-size"],
						"border-radius": o["border-radius"],
						border: o.border,
						"border-width": o["border-width"],
						"border-style": o["border-style"]
					};
				this.controllerMode == 0 && (this.getCommondFramesBar() || this.hasEventFramesBar()) && (u["-webkit-transform"] = "scale(" + this.width / this.initialSetting.width + "," + this.height / this.initialSetting.height + ")", u["-webkit-transform-origin"] = "left top", u.width = this.initialSetting.width, u.height = this.initialSetting.height), o.isHide ? o.display = "none" : o.display = "block", o["-webkit-animation-name"] = "none", o["-webkit-animation-timing-function"] = "linear", this.imgUrl && (r.attr("style", ""), r.css(u)), this.isText && (i.attr("style", ""), i.css(u)), this.controller && (s.attr("style", ""), s.css(u)), delete o.opacity, delete o["background-color"], delete o["background-image"], delete o["background-size"], delete o["background-position"], delete o["border-radius"], delete o["border-style"], delete o["border-width"], delete o.border, n[0] && (n[0].style.cssText = "", n.css(o), this.controller, this.isText, !this.getCommondFramesBar() && !this.hasEventFramesBar() && (this.initialSetting = this.getSetting()), console.log("Sprite set style"))
			},
			getInitialSetting: function() {
				return this.initialSetting
			},
			getAllFramesBars: function() {
				return this.framesbar ? [this.framesbar].concat(this.getEventFramesBar()) : this.getEventFramesBar()
			},
			getSetting: function() {
				var e = {
					display: this.display,
					imgUrl: this.imgUrl || "",
					imgFileName: this.imgFileName,
					name: this.name,
					className: this.className,
					width: this.width,
					height: this.height,
					x: this.x,
					y: this.y,
					zIndex: this.zIndex,
					backgroundColor: this.backgroundColor || "transparent",
					rotateZ: this.rotateZ,
					rotateX: this.rotateX,
					rotateY: this.rotateY,
					skewX: this.skewX,
					skewY: this.skewY,
					perspective: this.perspective,
					controllerRenderData: this.controllerRenderData,
					opacity: this.opacity,
					controllerMode: this.controllerMode,
					spriteCustomSetting: this.spriteCustomSetting,
					isText: this.isText,
					textContent: this.textContent,
					clickActionEventName: this.clickActionEventName,
					clickActionJumpNext: this.clickActionJumpNext,
					isSingle: this.isSingle,
					customSetting: this.customSetting,
					isGlobal: this.isGlobal,
					initialWidth: this.initialSetting && this.initialSetting.width,
					initialHeight: this.initialSetting && this.initialSetting.height
				};
				return e
			},
			convertSetting2CssProperties: function(e) {
				var t = {},
					n = {},
					r = "";
				return typeof e.display != "undefined" && e.display == "none" ? (t.isHide = !0, t) : (typeof e.imgUrl != "undefined" && (t["background-image"] = e.imgUrl ? "url(" + e.imgUrl + ")" : "none"), typeof e.backgroundColor != "undefined" && (t["background-color"] = e.backgroundColor), typeof e.opacity != "undefined" && (t.opacity = e.opacity), typeof e.zIndex != "undefined" && (t.zIndex = e.zIndex), typeof e.perspective != "undefined" && (r += "perspective(" + e.perspective + ") "), typeof e.x != "undefined" && (r += "translateX(" + e.x + "px) "), typeof e.y != "undefined" && (r += "translateY(" + e.y + "px) "), typeof e.rotateX != "undefined" && (r += "rotateX(" + e.rotateX + "deg) "), typeof e.rotateY != "undefined" && (r += "rotateY(" + e.rotateY + "deg) "), typeof e.rotateZ != "undefined" && (r += "rotateZ(" + e.rotateZ + "deg) "), typeof e.skewX != "undefined" && (r += "skewX(" + e.skewX + "deg) "), typeof e.skewY != "undefined" && (r += "skewY(" + e.skewY + "deg) "), r += "translateZ(0)", t["-webkit-transform"] = r, typeof e.easing != "undefined" && e.easing != "none" && (t["-webkit-animation-timing-function"] = e.easing), typeof e.width != "undefined" && (t.width = e.width), typeof e.height != "undefined" && (t.height = e.height), typeof e.customSetting != "undefined" && (t = $.extend(t, e.customSetting)), t)
			},
			getCssProperties: function() {
				var e = this.getSetting();
				if (this.spriteCustomSetting) var t = this.spriteCustomSetting;
				return $.extend({}, t, this.convertSetting2CssProperties(e))
			},
			getInitialCssProperties: function() {
				var e = this.getInitialSetting();
				if (this.spriteCustomSetting) var t = this.spriteCustomSetting;
				return $.extend({}, t, this.convertSetting2CssProperties(e))
			},
			render: function() {
				var t = {
					id: r + "_" + this.id
				};
				this.imgUrl ? t.imgUrl = this.imgUrl : this.controllerRenderData ? t.useController = !0 : this.isText && (t.isText = !0);
				var n = e[r](t);
				this.isGlobal ? this.addToGlobal(n) : this.addToStage(n);
				var i = this.getSpriteElement();
				this.textWrapElement = i.find(".text-wrap"), this.textContent && this.setTextContent(this.textContent)
			},
			getZIndex: function() {
				return this.zIndex
			},
			remove: function() {
				var e = this.getSpriteElement();
				e.remove(), this.element = null, this.removeAnimationCustomEvent(), this.controller && this.controller.remove(), $(window).trigger("spriteDelete", {
					sprite: this
				})
			}
		}, o
	}), define("dropmenu", ["tmpl", "util"], function(e, t) {
		function r(e) {
			this.init(e)
		}
		var n = "dropmenu";
		return r.prototype = {
			init: function(e) {
				e = e || {}, this.id = t.getRandomId(), this.items = e.items || [], this.container = e.container || $(document.body), this.callback = e.callback
			},
			bind: function() {
				var e = this;
				$(document.body).on("click", function() {
					e.element.hide()
				}), this.element.on("click", ".drop-menu-item", function() {
					var t = $(this),
						n = t.data("index");
					e.hide(), e.callback && e.callback(n, e.items[n])
				})
			},
			setItems: function(t) {
				this.element && this.element.remove();
				var r = n + "_" + this.id,
					i = e[n]({
						id: r,
						items: t
					});
				this.items = t, $("body").append(i), this.element = $("#" + r), this.bind()
			},
			show: function(e) {
				e = e || {}, e.items && this.setItems(e.items), this.element.css({
					left: e.left || 0,
					top: e.top + 20 || 0
				}), this.element.show()
			},
			hide: function() {
				this.element && this.element.hide()
			}
		}, r
	}), define("win_manager", ["tmpl", "util"], function(e, t) {
		function o(e) {
			return e.trim() === "" ? !1 : !0
		}

		function u(e) {
			return isNaN(Number(e)) ? !1 : !0
		}

		function a(e) {
			return o(e) ? /\.(jpeg|jpg|png|gif)$/i.test(e) ? !0 : !1 : !1
		}
		var n = {},
			r = {},
			i, s, f = {
				init: function(e) {
					e = e || {}, this.confirmBtn = $(".win-confirm-btn"), this.cancelBtn = $(".win-cancel-btn"), this.winHeader = $(".win-header"), this.winContainer = e.winContainer || $(".win-container"), this.winMask = e.winMask || $(".win-mask"), this.winBtnContainer = e.winBtnContainer || $(".win-btn-container"), this.winValidateWord = $(".win-validate-word")
				},
				centerWinContainer: function() {
					var e = this.winContainer.width(),
						t = this.winContainer.height();
					this.winContainer.css({
						"margin-left": e / -2,
						"margin-top": t / -2
					})
				},
				addBtns: function(e, t) {
					var n = this;
					r[e] = t, $.each(t, function(e, t) {
						t.insertBefore(n.confirmBtn)
					})
				},
				add: function(e, t) {
					var r = $("<div></div>", {
						"class": "win-content-single-wrap"
					});
					r.append(t), n[e] = r, r.insertAfter(this.winHeader)
				},
				validate: function(e, t, n) {
					var r = !0,
						s = this.winValidateWord,
						o = i.find("input." + n);
					return $.each(o, function(n, i) {
						i = $(i), t(i.val()) || (i.focus(), i.addClass("warning"), s.html(e), r = !1)
					}), r
				},
				emptyValidate: function() {
					return this.validate("输入值不能为空", o, "need-empty-validate")
				},
				numValidate: function() {
					return this.validate("输入值必须为数字", u, "need-num-validate")
				},
				imgValidate: function() {
					return this.validate("请选择一张图片", a, "need-img-validate")
				},
				inputValidate: function() {
					return this.resetValidateState(), this.emptyValidate() ? this.numValidate() ? this.imgValidate() ? !0 : !1 : !1 : !1
				},
				resetValidateState: function() {
					var e = i.find("input.warning");
					$.each(e, function(e, t) {
						t = $(t), t.removeClass("warning")
					}), this.winValidateWord.html("")
				},
				bind: function(e) {
					var t = this;
					this.onConfirm = function() {
						if (!t.inputValidate()) return;
						e.onConfirm && e.onConfirm(), t.hide()
					}, this.onCancel = function() {
						e.onCancel && e.onCancel(), t.hide()
					}, this.confirmBtn.on("click", this.onConfirm), this.cancelBtn.on("click", this.onCancel)
				},
				showBtns: function(e) {
					var t = r[e];
					$.each(t, function(e, t) {
						t.show()
					})
				},
				hideBtns: function(e) {
					var t = r[e];
					t && t.length && $.each(t, function(e, t) {
						t.hide()
					})
				},
				show: function(e) {
					s = e.name;
					var t = n[s];
					t && (i = t, i.show()), this.winHeader.html(e.headerName), this.bind(e), this.winMask.show(), this.centerWinContainer()
				},
				hide: function() {
					i && i.hide(), s && this.hideBtns(s), this.confirmBtn.off("click", this.onConfirm), this.cancelBtn.off("click", this.onCancel), this.winMask.hide(), this.resetValidateState()
				}
			};
		return f
	}), define("sprite-action-setting", ["tmpl", "util", "controller", "win_manager"], function(e, t, n, r) {
		var i = "sprite-action-setting",
			s, o = {
				init: function(e) {
					e = e || {}, this.name = "spriteActionSetting"
				},
				bind: function() {
					var e = this;
					this.actionEventCheckBox.on("change", function() {
						$(this).prop("checked") ? e.spriteActionEventInput.show() : (e.spriteActionEventInput.val(""), e.spriteActionEventInput.hide())
					})
				},
				render: function() {
					if (!this.element || !this.element.length) {
						var t = i + "_" + this.id,
							n = e[i]({
								id: t
							});
						r.add(this.name, n), this.element = $("#" + t), this.spriteActionEventInput = $(".sprite-action-event-input"), this.actionEventCheckBox = $(".action-event-checkbox"), this.actionJumpNextCheckBox = $(".action-jump-next-checkbox"), this.autoJumpNextSetting = $(".auto-jump-next-setting"), this.bind()
					}
				},
				setInitSetting: function(e) {
					this.actionEventCheckBox.prop("checked", e.actionEventName ? !0 : !1), e.actionEventName ? this.spriteActionEventInput.show() : this.spriteActionEventInput.hide(), this.spriteActionEventInput.val(e.actionEventName), this.actionJumpNextCheckBox.prop("checked", e.actionJumpNext ? !0 : !1)
				},
				show: function(e, t) {
					t = t || {}, this.headerName = e == "animationEnd" ? "动画结束行为设置" : e == "stageAction" ? "翻页行为设置" : "点击行为设置";
					var n = this;
					s = e, (!this.element || !this.element.length) && this.render(), e == "stageAction" ? this.autoJumpNextSetting.hide() : this.autoJumpNextSetting.show(), r.show({
						headerName: this.headerName,
						name: this.name,
						onConfirm: function() {
							var e, t = n.actionEventCheckBox.prop("checked");
							if (t) {
								e = n.spriteActionEventInput.val();
								if (!e) {
									alert("请输入事件名！");
									return
								}
							}
							$(window).trigger("confirmAction", {
								actionEmitType: s,
								actionEmitEvent: t,
								actionJumpNext: n.actionJumpNextCheckBox.prop("checked"),
								actionEventName: e
							})
						}
					}), this.setInitSetting(t)
				}
			};
		return o
	}), define("sprite_event_animation_setting", ["tmpl", "util", "win_manager"], function(e, t, n) {
		var r = "sprite_event_animation_setting",
			i = {
				init: function(e) {
					e = e || {}, this.name = "SpriteEventAnimationSetting", this.headerName = "添加事件动画"
				},
				render: function() {
					if (!this.element || !this.element.length) {
						this.container = $(document.body);
						var t = r + "_" + this.id,
							i = e[r]({
								id: t
							});
						n.add(this.name, i), this.element = $("#" + t), this.emitEventContainer = $(".emit-event-container"), this.emitEventInput = $(".emit-event-input"), this.eventListenOnceInput = $(".sprite-action-once-input")
					}
				},
				reset: function() {
					this.emitEventInput.val(""), this.eventListenOnceInput.prop("checked", !1)
				},
				show: function(e) {
					var t = this;
					(!this.element || !this.element.length) && this.render(e), n.show({
						name: this.name,
						headerName: this.headerName,
						onConfirm: function() {
							$(window).trigger("spriteAnimationEventListenChanged", {
								emitEventName: t.emitEventInput.val(),
								isListenOnce: t.eventListenOnceInput.prop("checked")
							}), t.reset()
						},
						onCancel: function() {
							t.reset()
						}
					})
				}
			};
		return i
	}),
	function(e) {
		var t = function() {
				var t = '<div class="colpick"><div class="colpick_color"><div class="colpick_color_overlay1"><div class="colpick_color_overlay2"><div class="colpick_selector_outer"><div class="colpick_selector_inner"></div></div></div></div></div><div class="colpick_hue"><div class="colpick_hue_arrs"><div class="colpick_hue_larr"></div><div class="colpick_hue_rarr"></div></div></div><div class="colpick_new_color"></div><div class="colpick_current_color"></div><div class="colpick_hex_field"><div class="colpick_field_letter">#</div><input type="text" maxlength="6" size="6" /></div><div class="colpick_rgb_r colpick_field"><div class="colpick_field_letter">R</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_g colpick_field"><div class="colpick_field_letter">G</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_h colpick_field"><div class="colpick_field_letter">H</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_s colpick_field"><div class="colpick_field_letter">S</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_submit"></div></div>',
					n = {
						showEvent: "click",
						onShow: function() {},
						onBeforeShow: function() {},
						onHide: function() {},
						onChange: function() {},
						onSubmit: function() {},
						colorScheme: "light",
						color: "3289c7",
						livePreview: !0,
						flat: !1,
						layout: "full",
						submit: 1,
						submitText: "OK",
						height: 156
					},
					o = function(t, n) {
						var r = s(t);
						e(n).data("colpick").fields.eq(1).val(r.r).end().eq(2).val(r.g).end().eq(3).val(r.b).end()
					},
					a = function(t, n) {
						e(n).data("colpick").fields.eq(4).val(Math.round(t.h)).end().eq(5).val(Math.round(t.s)).end().eq(6).val(Math.round(t.b)).end()
					},
					f = function(t, n) {
						e(n).data("colpick").fields.eq(0).val(u(t))
					},
					l = function(t, n) {
						e(n).data("colpick").selector.css("backgroundColor", "#" + u({
							h: t.h,
							s: 100,
							b: 100
						})), e(n).data("colpick").selectorIndic.css({
							left: parseInt(e(n).data("colpick").height * t.s / 100, 10),
							top: parseInt(e(n).data("colpick").height * (100 - t.b) / 100, 10)
						})
					},
					c = function(t, n) {
						e(n).data("colpick").hue.css("top", parseInt(e(n).data("colpick").height - e(n).data("colpick").height * t.h / 360, 10))
					},
					h = function(t, n) {
						e(n).data("colpick").currentColor.css("backgroundColor", "#" + u(t))
					},
					p = function(t, n) {
						e(n).data("colpick").newColor.css("backgroundColor", "#" + u(t))
					},
					d = function(t) {
						var n = e(this).parent().parent(),
							h;
						this.parentNode.className.indexOf("_hex") > 0 ? (n.data("colpick").color = h = r(_(this.value)), o(h, n.get(0)), a(h, n.get(0))) : this.parentNode.className.indexOf("_hsb") > 0 ? (n.data("colpick").color = h = O({
							h: parseInt(n.data("colpick").fields.eq(4).val(), 10),
							s: parseInt(n.data("colpick").fields.eq(5).val(), 10),
							b: parseInt(n.data("colpick").fields.eq(6).val(), 10)
						}), o(h, n.get(0)), f(h, n.get(0))) : (n.data("colpick").color = h = i(M({
							r: parseInt(n.data("colpick").fields.eq(1).val(), 10),
							g: parseInt(n.data("colpick").fields.eq(2).val(), 10),
							b: parseInt(n.data("colpick").fields.eq(3).val(), 10)
						})), f(h, n.get(0)), a(h, n.get(0))), l(h, n.get(0)), c(h, n.get(0)), p(h, n.get(0)), n.data("colpick").onChange.apply(n.parent(), [h, u(h), s(h), n.data("colpick").el, 0])
					},
					v = function(t) {
						e(this).parent().removeClass("colpick_focus")
					},
					m = function() {
						e(this).parent().parent().data("colpick").fields.parent().removeClass("colpick_focus"), e(this).parent().addClass("colpick_focus")
					},
					g = function(t) {
						t.preventDefault ? t.preventDefault() : t.returnValue = !1;
						var n = e(this).parent().find("input").focus(),
							r = {
								el: e(this).parent().addClass("colpick_slider"),
								max: this.parentNode.className.indexOf("_hsb_h") > 0 ? 360 : this.parentNode.className.indexOf("_hsb") > 0 ? 100 : 255,
								y: t.pageY,
								field: n,
								val: parseInt(n.val(), 10),
								preview: e(this).parent().parent().data("colpick").livePreview
							};
						e(document).mouseup(r, b), e(document).mousemove(r, y)
					},
					y = function(e) {
						return e.data.field.val(Math.max(0, Math.min(e.data.max, parseInt(e.data.val - e.pageY + e.data.y, 10)))), e.data.preview && d.apply(e.data.field.get(0), [!0]), !1
					},
					b = function(t) {
						return d.apply(t.data.field.get(0), [!0]), t.data.el.removeClass("colpick_slider").find("input").focus(), e(document).off("mouseup", b), e(document).off("mousemove", y), !1
					},
					w = function(t) {
						t.preventDefault ? t.preventDefault() : t.returnValue = !1;
						var n = {
							cal: e(this).parent(),
							y: e(this).offset().top
						};
						e(document).on("mouseup touchend", n, S), e(document).on("mousemove touchmove", n, E);
						var r = t.type == "touchstart" ? t.originalEvent.changedTouches[0].pageY : t.pageY;
						return d.apply(n.cal.data("colpick").fields.eq(4).val(parseInt(360 * (n.cal.data("colpick").height - (r - n.y)) / n.cal.data("colpick").height, 10)).get(0), [n.cal.data("colpick").livePreview]), !1
					},
					E = function(e) {
						var t = e.type == "touchmove" ? e.originalEvent.changedTouches[0].pageY : e.pageY;
						return d.apply(e.data.cal.data("colpick").fields.eq(4).val(parseInt(360 * (e.data.cal.data("colpick").height - Math.max(0, Math.min(e.data.cal.data("colpick").height, t - e.data.y))) / e.data.cal.data("colpick").height, 10)).get(0), [e.data.preview]), !1
					},
					S = function(t) {
						return o(t.data.cal.data("colpick").color, t.data.cal.get(0)), f(t.data.cal.data("colpick").color, t.data.cal.get(0)), e(document).off("mouseup touchend", S), e(document).off("mousemove touchmove", E), !1
					},
					x = function(t) {
						t.preventDefault ? t.preventDefault() : t.returnValue = !1;
						var n = {
							cal: e(this).parent(),
							pos: e(this).offset()
						};
						n.preview = n.cal.data("colpick").livePreview, e(document).on("mouseup touchend", n, N), e(document).on("mousemove touchmove", n, T);
						var r, i;
						return t.type == "touchstart" ? (pageX = t.originalEvent.changedTouches[0].pageX, i = t.originalEvent.changedTouches[0].pageY) : (pageX = t.pageX, i = t.pageY), d.apply(n.cal.data("colpick").fields.eq(6).val(parseInt(100 * (n.cal.data("colpick").height - (i - n.pos.top)) / n.cal.data("colpick").height, 10)).end().eq(5).val(parseInt(100 * (pageX - n.pos.left) / n.cal.data("colpick").height, 10)).get(0), [n.preview]), !1
					},
					T = function(e) {
						var t, n;
						return e.type == "touchmove" ? (pageX = e.originalEvent.changedTouches[0].pageX, n = e.originalEvent.changedTouches[0].pageY) : (pageX = e.pageX, n = e.pageY), d.apply(e.data.cal.data("colpick").fields.eq(6).val(parseInt(100 * (e.data.cal.data("colpick").height - Math.max(0, Math.min(e.data.cal.data("colpick").height, n - e.data.pos.top))) / e.data.cal.data("colpick").height, 10)).end().eq(5).val(parseInt(100 * Math.max(0, Math.min(e.data.cal.data("colpick").height, pageX - e.data.pos.left)) / e.data.cal.data("colpick").height, 10)).get(0), [e.data.preview]), !1
					},
					N = function(t) {
						return o(t.data.cal.data("colpick").color, t.data.cal.get(0)), f(t.data.cal.data("colpick").color, t.data.cal.get(0)), e(document).off("mouseup touchend", N), e(document).off("mousemove touchmove", T), !1
					},
					C = function(t) {
						var n = e(this).parent(),
							r = n.data("colpick").color;
						n.data("colpick").origColor = r, h(r, n.get(0)), n.data("colpick").onSubmit(r, u(r), s(r), n.data("colpick").el)
					},
					k = function(t) {
						t.stopPropagation();
						var n = e("#" + e(this).data("colpickId"));
						n.data("colpick").onBeforeShow.apply(this, [n.get(0)]);
						var r = e(this).offset(),
							i = r.top + this.offsetHeight,
							s = r.left,
							o = A(),
							u = n.width();
						s + u > o.l + o.w && (s -= u), n.css({
							left: s + "px",
							top: i + "px"
						}), n.data("colpick").onShow.apply(this, [n.get(0)]) != 0 && n.show(), e("html").mousedown({
							cal: n
						}, L), n.mousedown(function(e) {
							e.stopPropagation()
						})
					},
					L = function(t) {
						t.data.cal.data("colpick").onHide.apply(this, [t.data.cal.get(0)]) != 0 && t.data.cal.hide(), e("html").off("mousedown", L)
					},
					A = function() {
						var e = document.compatMode == "CSS1Compat";
						return {
							l: window.pageXOffset || (e ? document.documentElement.scrollLeft : document.body.scrollLeft),
							w: window.innerWidth || (e ? document.documentElement.clientWidth : document.body.clientWidth)
						}
					},
					O = function(e) {
						return {
							h: Math.min(360, Math.max(0, e.h)),
							s: Math.min(100, Math.max(0, e.s)),
							b: Math.min(100, Math.max(0, e.b))
						}
					},
					M = function(e) {
						return {
							r: Math.min(255, Math.max(0, e.r)),
							g: Math.min(255, Math.max(0, e.g)),
							b: Math.min(255, Math.max(0, e.b))
						}
					},
					_ = function(e) {
						var t = 6 - e.length;
						if (t > 0) {
							var n = [];
							for (var r = 0; r < t; r++) n.push("0");
							n.push(e), e = n.join("")
						}
						return e
					},
					D = function() {
						var t = e(this).parent(),
							n = t.data("colpick").origColor;
						t.data("colpick").color = n, o(n, t.get(0)), f(n, t.get(0)), a(n, t.get(0)), l(n, t.get(0)), c(n, t.get(0)), p(n, t.get(0))
					};
				return {
					init: function(s) {
						s = e.extend({}, n, s || {});
						if (typeof s.color == "string") s.color = r(s.color);
						else if (s.color.r != undefined && s.color.g != undefined && s.color.b != undefined) s.color = i(s.color);
						else {
							if (s.color.h == undefined || s.color.s == undefined || s.color.b == undefined) return this;
							s.color = O(s.color)
						}
						return this.each(function() {
							if (!e(this).data("colpickId")) {
								var n = e.extend({}, s);
								n.origColor = s.color;
								var r = "collorpicker_" + parseInt(Math.random() * 1e3);
								e(this).data("colpickId", r);
								var i = e(t).attr("id", r);
								i.addClass("colpick_" + n.layout + (n.submit ? "" : " colpick_" + n.layout + "_ns")), n.colorScheme != "light" && i.addClass("colpick_" + n.colorScheme), i.find("div.colpick_submit").html(n.submitText).click(C), n.fields = i.find("input").change(d).blur(v).focus(m), i.find("div.colpick_field_arrs").mousedown(g).end().find("div.colpick_current_color").click(D), n.selector = i.find("div.colpick_color").on("mousedown touchstart", x), n.selectorIndic = n.selector.find("div.colpick_selector_outer"), n.el = this, n.hue = i.find("div.colpick_hue_arrs"), huebar = n.hue.parent();
								var u = navigator.userAgent.toLowerCase(),
									y = navigator.appName === "Microsoft Internet Explorer",
									b = y ? parseFloat(u.match(/msie ([0-9]{1,}[\.0-9]{0,})/)[1]) : 0,
									E = y && b < 10,
									S = ["#ff0000", "#ff0080", "#ff00ff", "#8000ff", "#0000ff", "#0080ff", "#00ffff", "#00ff80", "#00ff00", "#80ff00", "#ffff00", "#ff8000", "#ff0000"];
								if (E) {
									var T, N;
									for (T = 0; T <= 11; T++) N = e("<div></div>").attr("style", "height:8.333333%; filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=" + S[T] + ", endColorstr=" + S[T + 1] + '); -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=' + S[T] + ", endColorstr=" + S[T + 1] + ')";'), huebar.append(N)
								} else stopList = S.join(","), huebar.attr("style", "background:-webkit-linear-gradient(top," + stopList + "); background: -o-linear-gradient(top," + stopList + "); background: -ms-linear-gradient(top," + stopList + "); background:-moz-linear-gradient(top," + stopList + "); -webkit-linear-gradient(top," + stopList + "); background:linear-gradient(to bottom," + stopList + "); ");
								i.find("div.colpick_hue").on("mousedown touchstart", w), n.newColor = i.find("div.colpick_new_color"), n.currentColor = i.find("div.colpick_current_color"), i.data("colpick", n), o(n.color, i.get(0)), a(n.color, i.get(0)), f(n.color, i.get(0)), c(n.color, i.get(0)), l(n.color, i.get(0)), h(n.color, i.get(0)), p(n.color, i.get(0)), n.flat ? (i.appendTo(this).show(), i.css({
									position: "relative",
									display: "block"
								})) : (i.appendTo(document.body), e(this).on(n.showEvent, k), i.css({
									position: "absolute"
								}))
							}
						})
					},
					showPicker: function() {
						return this.each(function() {
							e(this).data("colpickId") && k.apply(this)
						})
					},
					hidePicker: function() {
						return this.each(function() {
							e(this).data("colpickId") && e("#" + e(this).data("colpickId")).hide()
						})
					},
					setColor: function(t, n, d) {
						n = typeof n == "undefined" ? 1 : n;
						if (typeof t == "string") t = r(t);
						else if (t.r != undefined && t.g != undefined && t.b != undefined) t = i(t);
						else {
							if (t.h == undefined || t.s == undefined || t.b == undefined) return this;
							t = O(t)
						}
						return this.each(function() {
							if (e(this).data("colpickId")) {
								var r = e("#" + e(this).data("colpickId"));
								r.data("colpick").color = t, r.data("colpick").origColor = t, o(t, r.get(0)), a(t, r.get(0)), f(t, r.get(0)), c(t, r.get(0)), l(t, r.get(0)), p(t, r.get(0)), r.data("colpick").onChange.apply(r.parent(), [t, u(t), s(t), r.data("colpick").el, 1, d]), n && h(t, r.get(0))
							}
						})
					}
				}
			}(),
			n = function(e) {
				var e = parseInt(e.indexOf("#") > -1 ? e.substring(1) : e, 16);
				return {
					r: e >> 16,
					g: (e & 65280) >> 8,
					b: e & 255
				}
			},
			r = function(e) {
				return i(n(e))
			},
			i = function(e) {
				var t = {
						h: 0,
						s: 0,
						b: 0
					},
					n = Math.min(e.r, e.g, e.b),
					r = Math.max(e.r, e.g, e.b),
					i = r - n;
				return t.b = r, t.s = r != 0 ? 255 * i / r : 0, t.s != 0 ? e.r == r ? t.h = (e.g - e.b) / i : e.g == r ? t.h = 2 + (e.b - e.r) / i : t.h = 4 + (e.r - e.g) / i : t.h = -1, t.h *= 60, t.h < 0 && (t.h += 360), t.s *= 100 / 255, t.b *= 100 / 255, t
			},
			s = function(e) {
				var t = {},
					n = e.h,
					r = e.s * 255 / 100,
					i = e.b * 255 / 100;
				if (r == 0) t.r = t.g = t.b = i;
				else {
					var s = i,
						o = (255 - r) * i / 255,
						u = (s - o) * (n % 60) / 60;
					n == 360 && (n = 0), n < 60 ? (t.r = s, t.b = o, t.g = o + u) : n < 120 ? (t.g = s, t.b = o, t.r = s - u) : n < 180 ? (t.g = s, t.r = o, t.b = o + u) : n < 240 ? (t.b = s, t.r = o, t.g = s - u) : n < 300 ? (t.b = s, t.g = o, t.r = o + u) : n < 360 ? (t.r = s, t.g = o, t.b = s - u) : (t.r = 0, t.g = 0, t.b = 0)
				}
				return {
					r: Math.round(t.r),
					g: Math.round(t.g),
					b: Math.round(t.b)
				}
			},
			o = function(t) {
				var n = [t.r.toString(16), t.g.toString(16), t.b.toString(16)];
				return e.each(n, function(e, t) {
					t.length == 1 && (n[e] = "0" + t)
				}), n.join("")
			},
			u = function(e) {
				return o(s(e))
			};
		e.fn.extend({
			colpick: t.init,
			colpickHide: t.hidePicker,
			colpickShow: t.showPicker,
			colpickSetColor: t.setColor
		}), e.extend({
			colpick: {
				rgbToHex: o,
				rgbToHsb: i,
				hsbToHex: u,
				hsbToRgb: s,
				hexToHsb: r,
				hexToRgb: n
			}
		})
	}(jQuery), define("color_picker", function() {}), define("background_setting", ["tmpl", "util", "color_picker", "win_manager"], function(e, t, n, r) {
		var i = "background_setting",
			s, o, u, a = {
				init: function(e) {
					e = e || {}, this.name = "BackgroundSetting", this.headerName = "背景设置"
				},
				initColorPicker: function() {
					var e = this;
					this.backgroundColorSettingInput.colpick({
						layout: "hex",
						colorScheme: "dark",
						color: t.colorHex(e.backgroundColorSettingInput.val()),
						submit: 0,
						onChange: function(t) {
							var t = arguments[2],
								n = "rgba(" + t.r + "," + t.g + "," + t.b + ",1)";
							e.backgroundColorSettingInput.val(n)
						}
					})
				},
				setWorkId: function(e) {
					u = e
				},
				bind: function() {
					var e = this;
					this.backgroundImageSettingInput.on("change", function(n) {
						var r = new FileReader;
						s = n.target.files[0].name, e.fileNameLabel.html(s), r.addEventListener("load", function(n) {
							var r = n.target.result;
							t.uploadImg(0, u, r, s, function(t) {
								o = t, e.previewImage.css({
									"background-image": "url(" + t + ")"
								})
							})
						}, !1), r.readAsDataURL(this.files[0]), $(n.target).val("")
					})
				},
				render: function() {
					var t = i + "_" + this.id,
						n = e[i]({
							id: t
						});
					r.add(this.name, n), this.element = $("#" + t), this.backgroundColorSettingInput = $(".background-color-setting-input"), this.backgroundImageSettingInput = $(".background-image-setting-file-input"), this.backgroundImageSetting = $(".background-image-setting"), this.backgroundColorSetting = $(".background-color-setting"), this.previewImage = $(".preview-background-image"), this.confirmBtn = $(".confirm-background-setting-btn"), this.cancelBtn = $(".cancel-background-setting-btn"), this.fileNameLabel = $(".background-image-setting-filename"), this.bind()
				},
				setInitInput: function(e) {
					o = e.backgroundImage, this.backgroundColorSettingInput.val(e.backgroundColor || "rgb(255,255,255)"), this.fileNameLabel.html(e.imgFileName || "暂无文件")
				},
				show: function(e) {
					var t = this;
					(!this.element || !this.element.length) && this.render(), r.show({
						name: this.name,
						headerName: this.headerName,
						onConfirm: function() {
							var e = t.backgroundColorSettingInput.val();
							$(window).trigger("stageBackgroundChange", {
								color: e,
								image: o,
								imgFileName: s
							})
						}
					}), this.setInitInput(e), this.initColorPicker()
				}
			};
		return a
	}), define("stage_transition_config", [], function() {
		var e = {
			"移动": {
				utd: {
					down: {
						outClass: "pt-page-moveToTop",
						inClass: "pt-page-moveFromBottom"
					},
					up: {
						outClass: "pt-page-moveToBottom",
						inClass: "pt-page-moveFromTop"
					}
				},
				ltr: {
					down: {
						outClass: "pt-page-moveToLeft",
						inClass: "pt-page-moveFromRight"
					},
					up: {
						outClass: "pt-page-moveToRight",
						inClass: "pt-page-moveFromLeft"
					}
				}
			},
			"渐变移动": {
				utd: {
					down: {
						outClass: "pt-page-moveToTopFade",
						inClass: "pt-page-moveFromBottomFade"
					},
					up: {
						outClass: "pt-page-moveToBottomFade",
						inClass: "pt-page-moveFromTopFade"
					}
				},
				ltr: {
					down: {
						outClass: "pt-page-moveToLeftFade",
						inClass: "pt-page-moveFromRightFade"
					},
					up: {
						outClass: "pt-page-moveToRightFade",
						inClass: "pt-page-moveFromLeftFade"
					}
				}
			},
			"缩放": {
				utd: {
					down: {
						outClass: "pt-page-scaleDown",
						inClass: "pt-page-moveFromBottom pt-page-ontop"
					},
					up: {
						outClass: "pt-page-scaleDown",
						inClass: "pt-page-moveFromTop pt-page-ontop"
					}
				},
				ltr: {
					down: {
						outClass: "pt-page-scaleDown",
						inClass: "pt-page-moveFromRight pt-page-ontop"
					},
					up: {
						outClass: "pt-page-scaleDown",
						inClass: "pt-page-moveFromLeft pt-page-ontop"
					}
				}
			},
			"旋转": {
				utd: {
					down: {
						outClass: "pt-page-rotateRoomTopOut pt-page-ontop",
						inClass: "pt-page-rotateRoomTopIn"
					},
					up: {
						outClass: "pt-page-rotateRoomBottomOut pt-page-ontop",
						inClass: "pt-page-rotateRoomBottomIn"
					}
				},
				ltr: {
					down: {
						outClass: "pt-page-rotateRoomLeftOut pt-page-ontop",
						inClass: "pt-page-rotateRoomLeftIn"
					},
					up: {
						outClass: "pt-page-rotateRoomRightOut pt-page-ontop",
						inClass: "pt-page-rotateRoomRightIn"
					}
				}
			}
		};
		return e
	}), define("layer-size-setting", ["tmpl", "util", "win_manager"], function(e, t, n) {
		var r = "layer-size-setting",
			i, s = {
				init: function(e) {
					e = e || {}, this.name = "layerSizeSetting"
				},
				bind: function() {
					var e = this
				},
				render: function() {
					if (!this.element || !this.element.length) {
						var t = r + "_" + this.id,
							i = e[r]({
								id: t
							});
						n.add(this.name, i), this.element = $("#" + t), this.layerWidthInput = $(".layer-size-width-input"), this.layerHeightInput = $(".layer-size-height-input"), this.bind()
					}
				},
				setInitSetting: function(e) {
					this.layerWidthInput.val(100), this.layerHeightInput.val(100)
				},
				show: function(e, t) {
					t = t || {}, i = e, this.headerName = e == "layer" ? "图层尺寸设置" : "文本尺寸设置";
					var r = this;
					(!this.element || !this.element.length) && this.render(), n.show({
						headerName: this.headerName,
						name: this.name,
						onConfirm: function() {
							$(window).trigger("confirmNewLayerSize", {
								layerType: i,
								width: r.layerWidthInput.val(),
								height: r.layerHeightInput.val()
							})
						}
					}), this.setInitSetting(t)
				}
			};
		return s
	}), define("stages", ["tmpl", "sprite", "util", "dropmenu", "controller", "sprite-action-setting", "sprite_event_animation_setting", "background_setting", "stage_transition_config", "layer-size-setting"], function(e, t, n, r, i, s, o, u, a, f) {
		function C() {
			var e = arguments[1],
				t = e.frame || e.keyFrame.frame,
				n = t.index,
				r = t.framesbar,
				i = r.id,
				s = r.emitEventName,
				o = N.getCurrentStage(),
				u = o.getSpriteList();
			$(u).each(function(e, r) {
				if (r.id == i) w = t.getCalculatedSetting(), w && (r.setStyle(w), r.select());
				else {
					var o = s ? r.getEventFramesBar(s) : r.getCommondFramesBar();
					if (!o) {
						if (s) {
							var u = r.getCommondFramesBar();
							if (u) {
								var a = u.getKeyFrames()[0].getSetting();
								r.setStyle(a)
							}
						}
						return
					}
					var f = o.getFrameByIndex(n);
					f || (f = o.framesArr[o.framesArr.length - 1]);
					if (!f) return;
					frameSetting = f.getCalculatedSetting();
					if (!frameSetting) return;
					r.setStyle(frameSetting), o.moveFrameMarkByIndex(n)
				}
				r.controller && r.controller.stopAnimation()
			})
		}
		var l = "stages",
			c = [],
			h = 0,
			p, d, v, m, g, y, b, w, E, S, x, T, N = function(e) {
				this.init(e)
			};
		return N.prototype = {
			init: function(e) {
				var n = this;
				e = e || {}, this.container = e.container || $(".stages-list"), this.setData(e), this.render(), e.spriteListData && $.each(e.spriteListData, function(e, r) {
					r.stage = n;
					var i = new t(r);
					i.setStyle(i.getInitialSetting()), n.spriteList.push(i)
				}), this.setBackgroundColor(e.backgroundColor), this.setBackgroundImage(e.backgroundImage, e.imgFileName), this.bind()
			},
			bind: function() {
				var e = this
			},
			setData: function(e) {
				var t = this;
				this.name = e.name, this.id = e.id || n.getRandomId(), this.index = e.index || 0, this.width = e.width || 320, this.height = e.height || 480, this.mode = e.mode, this.isControllerStage = e.isControllerStage, this.spriteList = [], this.setLeaveAction(e.actionEventName)
			},
			setLeaveAction: function(e) {
				this.actionEventName = e
			},
			setWidth: function(e) {
				var t = this.getStageElement();
				this.width = e, t.css({
					width: e,
					marginLeft: -this.width / 2,
					marginTop: -this.height / 2
				})
			},
			setHeight: function(e) {
				var t = this.getStageElement();
				this.height = e, t.css({
					height: e,
					marginLeft: -this.width / 2,
					marginTop: -this.height / 2
				})
			},
			getGlobalSpriteWrap: function() {
				return T || (T = $('<div class="global-sprite-wrap"></div>'), N.stagesList.append(T)), T
			},
			removeSpriteById: function(e) {
				for (var t = 0; t < this.spriteList.length; t++) {
					var n = this.spriteList[t];
					n.id == e && (n.remove(), this.spriteList.splice(t, 1), t--)
				}
			},
			getData: function() {
				var e = {};
				return $(this.spriteList).each(function(t, n) {
					var r = n.getData();
					e[n.id] = r
				}), {
					name: this.name,
					id: this.id,
					index: this.index,
					width: this.width,
					height: this.height,
					mode: this.mode,
					isControllerStage: this.isControllerStage,
					backgroundImage: this.backgroundImage,
					imgFileName: this.imgFileName,
					backgroundColor: this.backgroundColor,
					spriteListData: e,
					actionEventName: this.actionEventName
				}
			},
			setBackgroundColor: function(e) {
				var t = this.getStageElement();
				t.css({
					"background-color": e
				}), this.backgroundColor = e
			},
			setBackgroundImage: function(e, t) {
				if (e && t) {
					var n = this.getStageElement();
					n.css({
						"background-image": "url(" + e + ")"
					}), this.backgroundImage = e, this.imgFileName = t
				}
			},
			select: function() {
				var e = this,
					t = this.getStageElement();
				if (t.hasClass("selected")) return;
				t.addClass("selected")
			},
			unSelect: function() {
				var e = this.getStageElement();
				e.removeClass("selected")
			},
			setZIndex: function(e) {
				var t = this.getStageElement();
				t.css({
					"z-index": e
				}), this.zIndex = e
			},
			getZIndex: function() {
				return this.zIndex
			},
			render: function() {
				var t = e[l]({
					id: l + "_" + this.id,
					index: this.index,
					width: this.width,
					height: this.height,
					marginLeft: -this.width / 2,
					marginTop: -this.height / 2
				});
				this.container.append(t);
				var n = this.getStageElement();
				this.isControllerStage && n.resizable({
					handles: "ne,nw,se,sw,e,n,s,w",
					stop: function(e, t) {
						var r = t.size.width,
							i = t.size.height,
							s = {
								width: r,
								height: i,
								marginLeft: -r / 2,
								marginTop: -i / 2,
								left: "50%",
								top: "50%"
							};
						n.css(s), $(window).trigger("controllerStageSizeChanged", {
							width: r,
							height: i
						})
					}
				})
			},
			getStageElement: function() {
				if (!this.element || !this.element.length) this.element = $("#" + l + "_" + this.id);
				return this.element
			},
			deleteSpriteById: function(e) {
				var t = this.spriteList;
				for (var n = 0; n < t.length; n++)
					if (t[n].id == e) {
						t[n].remove(), t.splice(n, 1), t[n - 1] && t[n - 1].select();
						return
					}
			},
			getSpriteList: function() {
				return this.spriteList
			},
			addSprite: function(e) {
				var n;
				return e.stage = this, e.stagesList = this.stagesList, n = new t(e), this.spriteList.push(n), $(window).trigger("spriteAdd", {
					sprite: n
				}), n.isText && !n.isSingle && (S = n), n.setStyle(n.getInitialSetting()), n
			},
			getSpriteById: function(e) {
				var t = this.spriteList,
					n;
				for (var r = 0, i = t.length; r < i; r++) {
					n = t[r];
					if (e == n.id) return n
				}
			},
			remove: function() {
				var e = this.getStageElement();
				e.remove(), $.each(this.spriteList, function(e, t) {
					t && t.remove()
				}), this.spriteList = []
			}
		}, N.init = function(e) {
			e = e || {}, this.stagesList = $(".stages-list"), this.spriteAddBtn = $(".sprite-add-button > input"), this.spriteLyerAddBtn = $(".sprite-layer-add-button"), this.spriteTextAddBtn = $(".sprite-text-add-button"), this.spriteSingleTextAddBtn = $(".sprite-single-text-add-button"), this.stageTransitionTypeSelect = $(".stage-transition-type-select"), this.stageTransitionUtdRadio = $(".stage-transition-utd"), this.stageTransitionLtrRadio = $(".stage-transition-ltr"), h = this.stagesList.height(), this.setData(e), this.bind(), o.init(), s.init(), u.init(), f.init(), E = UE.getEditor("globalEditor")
		}, N.setData = function(e) {
			e = e || {}, c = [], p = d = v = undefined, this.clearDomList(), e.stageDataArr && ($(e.stageDataArr).each(function(e, t) {
				var n = new N(t);
				c.push(n)
			}), d = N.getSpriteById(e.currentSpriteId)), e.currentStageTransitionType && n.setDropDownListValue(this.stageTransitionTypeSelect, e.currentStageTransitionType), e.currentStageTransitionDirection && (e.currentStageTransitionDirection == "utd" ? this.stageTransitionUtdRadio.prop("checked", !0) : this.stageTransitionLtrRadio.prop("checked", !0))
		}, N.clearDomList = function() {
			this.stagesList.html("")
		}, N.getData = function() {
			var e = [];
			return $(c).each(function(t, n) {
				var r = n.getData();
				e.push(r)
			}), {
				stageDataArr: e,
				currentStageIndex: p,
				currentSpriteId: d && d.id,
				currentStageTransitionType: this.getCurrentStageTransitionType(),
				currentStageTransitionDirection: this.getStageTransitionDirection()
			}
		}, N.getStages = function() {
			return c
		}, N.bind = function() {
			var e = this;
			$(window).on("pageSelect", function() {
				var t = arguments[1],
					n = t.selectedPage,
					r = e.getStageById(n.id);
				N.select(r.index)
			}), $(window).on("framesBarAdd", function() {
				var t = arguments[1],
					n = t.framesBar,
					r = e.getSpriteById(n.id);
				r.setFramesBar(n)
			}), $(window).on("stageBackgroundChange", function() {
				var t = arguments[1],
					n = e.getCurrentStage();
				t.color && n.setBackgroundColor(t.color), t.image && n.setBackgroundImage(t.image, t.imgFileName)
			}), $(window).on("spritePositionUpdate", function() {
				var e = arguments[1],
					t = e.sprite;
				!t.getCommondFramesBar() && !t.hasEventFramesBar() && t.select()
			}), $(window).on("confirmAction", function() {
				var t = arguments[1];
				if (t.actionEmitType == "click" && d) d.bindClickAction(t);
				else if (t.actionEmitType == "stageAction") {
					var n = e.getCurrentStage();
					n.setLeaveAction(t.actionEventName)
				}
			}), $(window).on("keyFrameSettingChanged", function() {
				if (d) {
					var e = arguments[1],
						t = e.keyFrameSetting;
					d.setStyle(t)
				}
			}), $(window).on("spriteSettingChanged", function() {
				if (d) {
					var e = arguments[1],
						t = e.spriteSetting,
						n = e.controllerMode;
					d.name = t.name, d.className = t.className, d.setNameTag(d.name), d.imgUrl = t.imgUrl, d.imgFileName = t.imgFileName, d.controllerMode = t.controllerMode, d.getCommondFramesBar() || d.hasEventFramesBar() ? w && (w.name = t.name, w.className = t.className, w.controllerMode = t.controllerMode) : w = null;
					var r = t.spriteCustomSetting;
					d.spriteCustomSetting = r, r && d.setStyle($.extend({
						imgUrl: d.imgUrl,
						imgFileName: d.imgFileName
					}, w));
					var i = d.getInitialSetting();
					i && $.extend(i, t)
				}
			}), $(window).on("pageAdd", function() {
				var e = arguments[1],
					t = e.page.id;
				N.add(t)
			}), $(window).on("pagesOrderChange", function() {
				var t = arguments[1],
					n = t.pages,
					r = t.currentPageIndex;
				p = r == null ? n.length - 1 : r, console.log("currentStageIndex:" + p), $.each(n, function(e, t) {
					var n = N.getStageById(t.id),
						r = t.index;
					n.index = r
				}), c = c.sort(function(e, t) {
					return e.index > t.index
				}), $.each(c, function(t, n) {
					var r = n.getStageElement();
					e.stagesList.append(r)
				})
			}), $(window).on("spriteTextEdit", function() {
				var t = arguments[1].sprite,
					n = t.stage,
					r = n.getStageElement(),
					i;
				if (t.isGlobal) {
					i = e.getCurrentStage();
					if (n != i) return
				}
				var s = $("#globalEditor");
				s.css({
					left: t.x + r.prop("offsetLeft"),
					top: t.y + r.prop("offsetTop"),
					width: t.width,
					height: t.height
				}), E.setContent(t.getTextContent() || ""), E.reset(), S = t, s.show()
			}), this.spriteSingleTextAddBtn.on("click", function() {
				var e = N.getCurrentStage();
				if (!e) return;
				var t = (e.width - 128) / 2,
					n = (e.height - 22) / 2,
					r = e.addSprite({
						x: t,
						y: n,
						isText: !0,
						textContent: "双击添加单行文本",
						isSingle: !0
					})
			}), this.stagesList.on("contextmenu", function(e) {
				e.preventDefault()
			}), this.stagesList.on("mousedown", function(t) {
				if (t.button == 2) {
					var r = $(t.target).closest(".sprite"),
						i = e.stagesList.offset();
					if (r.length > 0) {
						var s = N.getCurrentStage(),
							o = n.getOriginId(r.attr("id")),
							u = s.getSpriteById(o);
						if (u) {
							if (u.isLock) return;
							u.select()
						}
					}
					e.showDropMenu(t), m = t.pageX - i.left, g = t.pageY - i.top
				}
			}), $(window).on("confirmControllerSelect", function() {
				var e = arguments[1],
					t = e.controllerRenderData,
					n = N.getCurrentStage(),
					r = n.width / 2 - t.width / 2,
					i = n.height / 2 - t.height / 2,
					s = n.addSprite({
						x: r,
						y: i,
						width: t.width,
						height: t.height,
						controllerRenderData: t
					});
				s.controller && $(window).trigger("addToCommonFramesBar", {
					sprite: s
				})
			}), $(window).on("confirmNewLayerSize", function() {
				var e = arguments[1],
					t = e.width,
					n = e.height,
					r = N.getCurrentStage(),
					i = r.width / 2 - t / 2,
					s = r.height / 2 - n / 2;
				if (e.layerType == "layer") r.addSprite({
					x: i,
					y: s,
					isText: !0,
					width: t,
					height: n
				});
				else {
					var o = r.addSprite({
							x: i,
							y: s,
							width: t,
							height: n,
							isText: !0
						}),
						u = $("#globalEditor");
					E.setContent(""), E.reset(), u.css({
						left: o.x,
						top: o.y,
						width: o.width,
						height: o.height
					})
				}
			}), this.spriteTextAddBtn.on("click", function() {
				var t = e.getCurrentStage();
				if (!t) return;
				f.show("textLayer")
			}), this.spriteLyerAddBtn.on("click", function() {
				var t = e.getCurrentStage();
				if (!t) return;
				f.show("layer")
			}), this.spriteAddBtn.on("change", function(t) {
				var r = e.getCurrentStage();
				if (!r) return;
				var i = $(this).val(),
					s = this.files[0].name,
					o = this.files[0].size;
				if (!n.imgFileValidate(s, o)) return;
				var u, a = $("<img>"),
					f = new FileReader;
				f.addEventListener("load", function(e) {
					u = e.target.result;
					var t = window.currentMode == "scene" ? 0 : 1;
					n.uploadImg(t, x, u, s, function(e, t) {
						a.attr("src", e), a.on("load", function(n) {
							var r = N.getCurrentStage(),
								i = a.prop("naturalWidth") / 2,
								s = a.prop("naturalHeight") / 2,
								o = r.width / 2 - i / 2,
								u = r.height / 2 - s / 2,
								f = r.addSprite({
									x: o,
									y: u,
									width: i,
									height: s,
									imgUrl: e,
									imgFileName: t
								});
							$(window).trigger("spritePositionUpdate", {
								sprite: f,
								isLoad: !0
							})
						})
					})
				}, !1), f.readAsDataURL(this.files[0]), $(this).val("")
			}), this.stagesList.on("click", function(t) {
				var r = $(t.target),
					i = r.closest(".sprite");
				if (i.length) {
					var s = n.getOriginId(i.attr("id")),
						o = e.getCurrentStage(),
						u = o.getSpriteById(s);
					if (!u || u.isLock) return;
					u.select()
				}
			}), $(window).on("spriteItemClick", function() {
				var t = arguments[1],
					n = t.id,
					r = e.getSpriteById(n);
				r && r.select()
			}), $(window).on("playAnimation", function() {
				var t = arguments[1],
					n = t.framesBar.stageId,
					r = t.framesBar.isControllerPlay,
					i = e.getCurrentSprite();
				i && i.unSelect()
			}), $(window).on("stopAnimation", function() {
				var t = arguments[1],
					n = e.getSpriteList();
				$.each(n, function(e, n) {
					t.stageId == n.stage.id && (n.setPlayingFramesBarRenderId(""), n.controller && n.controller.stopAnimation())
				})
			}), $(window).on("pauseAnimation", function() {
				var t = arguments[1],
					n = e.getSpriteList();
				$.each(n, function(e, n) {
					t.stageId == n.stage.id && n.controller && n.controller.pauseAnimation()
				})
			}), $(window).on("resumeAnimation", function() {
				var t = arguments[1],
					n = e.getSpriteList();
				$.each(n, function(e, n) {
					t.stageId == n.stage.id && n.controller && n.controller.resumeAnimation()
				})
			}), $(window).on("animationInteration", function() {
				var t = arguments[1],
					n = t.framesBar,
					r = e.getSpriteList();
				$.each(r, function(e, t) {
					n.id == t.id && t.controller && t.playControllerAnimation()
				})
			}), $(window).on("lockStateChanged", function() {
				var t = arguments[1],
					n = t.lock,
					r = t.id,
					i = e.getSpriteById(r);
				n ? i.lock() : i.unlock()
			}), $(window).on("spriteItemDelete", function() {
				var t = arguments[1];
				if (window.confirm("是否删除该精灵？")) {
					var n = e.getCurrentStage();
					n.deleteSpriteById(t.id)
				}
			}), $(window).on("afterFrameSelect", C.bind(this)), $(window).on("afterKeyFrameSelect", C.bind(this)), $(window).on("hideStateChanged", function() {
				var t = arguments[1],
					n = t.isHide,
					r = t.id,
					i = e.getSpriteById(r);
				n ? i.hideImg() : i.showImg()
			}), $(window).on("spriteSelect", function() {
				var e = arguments[1],
					t = e.selectedSprite;
				d && d != t && d.unSelect(), d = t
			}), $(window).on("framesBarRemove", function() {
				var t = arguments[1],
					n = t.framesBar,
					r = e.getSpriteById(n.id);
				n.emitType == "none" ? r && (r.framesbar = null) : r && r.removeAnimationCustomEvent(n.emitEventName), !r.getCommondFramesBar() && !r.hasEventFramesBar() && (r.setStyle(r.getInitialSetting()), $(window).trigger("spriteBackToSingle", {
					sprite: r
				}))
			}), $(window).on("spriteZIndexUp", function() {
				var t = arguments[1],
					n = t.sprite;
				e.setSpriteZIndexUp(n)
			}), $(window).on("spriteZIndexDown", function() {
				var t = arguments[1],
					n = t.sprite;
				e.setSpriteZIndexDown(n)
			}), $(window).on("pageDelete", function() {
				var t = arguments[1];
				e.deleteStageById(t.pageId)
			})
		}, N.getGlobalSpriteList = function() {
			var e = this.getSpriteList(),
				t = [];
			return $.each(e, function(e, n) {
				n.isGlobal && t.push(n)
			}), t
		}, N.setSpriteZIndexDown = function(e) {
			var t, n;
			e.isGlobal ? (n = this.getGlobalSpriteList(), console.log("globalSpriteArr:" + n.length)) : (t = this.getCurrentStage(), n = t.getSpriteList());
			var r = 0,
				i = e.getZIndex();
			debugger;
			$(n).each(function(e, t) {
				var n = t.getZIndex();
				n < r && (r = n), n < i && t.setZIndex(n + 1)
			}), e.setZIndex(r - 1)
		}, N.getSpriteList = function() {
			var e = [];
			return $.each(c, function(t, n) {
				var r = n.getSpriteList();
				e.concat(r)
			}), e
		}, N.getCurrentEditSprite = function() {
			return S
		}, N.setCurrentEditSprite = function(e) {
			S = e
		}, N.setSpriteZIndexUp = function(e) {
			debugger;
			var t = this.getCurrentStage(),
				n = t.getSpriteList(),
				r = 0,
				i = e.getZIndex();
			$(n).each(function(e, t) {
				var n = t.getZIndex();
				n > r && (r = n), n > i && t.setZIndex(n - 1)
			}), e.setZIndex(r + 1)
		}, N.deleteStageById = function(e) {
			for (var t = 0; t < c.length; t++) c[t].index = t, c[t].id == e && (p == t ? p = null : t > p || t < p && p--, c[t].remove(), c.splice(t, 1), t--)
		}, N.getCurrentSprite = function() {
			return d
		}, N.getStageById = function(e) {
			var t;
			return $.each(c, function(n, r) {
				r.id == e && (t = r)
			}), t
		}, N.createDropMenu = function() {
			var e = this;
			return new r({
				container: $(".stages-list"),
				callback: function(t, n) {
					var r = n.value;
					if (r == "copySprite") v = d;
					else if (r == "upSprite") $(window).trigger("spriteZIndexUp", {
						sprite: d
					});
					else if (r == "bottomSprite") $(window).trigger("spriteZIndexDown", {
						sprite: d
					});
					else if (r == "deleteSprite") {
						if (window.confirm("是否删除该精灵？")) {
							var i = e.getCurrentStage();
							i.deleteSpriteById(d.id)
						}
					} else if (r == "setClickAction") s.show("click", {
						actionEventName: d.clickActionEventName,
						actionJumpNext: d.clickActionJumpNext
					});
					else if (r == "setEventAnimation") o.show();
					else if (r == "addToCommonFramesBar") $(window).trigger("addToCommonFramesBar", {
						sprite: d
					});
					else if (r == "setSpriteGlobal") d = N.getCurrentSprite(), d.setGlobal(!0);
					else if (r == "cancelSetSpriteGlobal") d = N.getCurrentSprite(), d.setGlobal(!1);
					else if (r == "pasteSprite") $(window).trigger("pasteSprite", {
						sprite: v
					});
					else if (r == "setStageBackground") {
						var i = e.getCurrentStage();
						u.show({
							backgroundColor: i.backgroundColor,
							backgroundImage: i.backgroundImage,
							imgFileName: i.imgFileName
						})
					} else if (r == "setStageAction") {
						var i = e.getCurrentStage();
						s.show("stageAction", {
							actionEventName: i.actionEventName
						})
					}
				}
			})
		}, N.getSpriteById = function(e) {
			for (var t = 0, n = c.length; t < n; t++) {
				var r = c[t],
					i = r.getSpriteById(e);
				if (i) return i
			}
		}, N.setWorkId = function(e) {
			x = e, u.setWorkId(e)
		}, N.getSpriteList = function() {
			var e = [];
			return $.each(c, function(t, n) {
				var r = n.getSpriteList();
				e = e.concat(r)
			}), e
		}, N.showDropMenu = function(e) {
			var t = [],
				r = $(e.target),
				i = r.closest(".sprite");
			this.dropMenu || (this.dropMenu = this.createDropMenu());
			if (i.length) {
				t.push({
					text: "复制",
					value: "copySprite"
				}), t.push({
					text: "置于最顶层",
					value: "upSprite"
				}), t.push({
					text: "置于最底层",
					value: "bottomSprite"
				}), t.push({
					text: "删除",
					value: "deleteSprite"
				}), t.push({
					text: "设置点击行为",
					value: "setClickAction"
				}), t.push({
					text: "添加事件动画",
					value: "setEventAnimation"
				});
				var s = N.getSpriteById(n.getOriginId(i.prop("id"))),
					o = s.getCommondFramesBar();
				o || t.push({
					text: "添加到时间轴",
					value: "addToCommonFramesBar"
				}), r.closest(".stage.ui-resizable").length || (r.closest(".global-sprite-wrap").length ? t.push({
					text: "取消全局精灵设置",
					value: "cancelSetSpriteGlobal"
				}) : t.push({
					text: "设置为全局精灵",
					value: "setSpriteGlobal"
				}))
			} else {
				var u = this.getCurrentStage();
				if (!u) return;
				v && t.push({
					text: "粘贴",
					value: "pasteSprite"
				}), t.push({
					text: "设置背景",
					value: "setStageBackground"
				}, {
					text: "设置翻页行为",
					value: "setStageAction"
				})
			}
			this.dropMenu.show({
				items: t,
				left: e.pageX,
				top: e.pageY
			})
		}, N.add = function(e, t, n, r, i) {
			var s = new N({
				name: r,
				id: e,
				index: c.length,
				width: t,
				height: n,
				isControllerStage: i
			});
			$(window).trigger("stageAdd", {
				newStage: s
			}), c.push(s), s.select()
		}, N.getCurrentStage = function() {
			return this.get(p || 0)
		}, N.get = function(e) {
			return c[e]
		}, N.getGlobalRichEditor = function() {
			return E
		}, N.getCurrentStageTransitionType = function() {
			return this.stageTransitionTypeSelect.data("selectedValue") || "移动"
		}, N.getCurrentStageTransitionObj = function() {
			return y = this.getCurrentStageTransitionType(), b = this.getStageTransitionDirection(), a[y][b]
		}, N.getStageTransitionDirection = function() {
			return this.stageTransitionUtdRadio.prop("checked") ? "utd" : "ltr"
		}, N.next = function() {
			p++, this.select(p)
		}, N.select = function(e) {
			var t, n, r, i;
			r = c[p], i = c[e], y = this.getCurrentStageTransitionType(), b = this.getStageTransitionDirection(), r && r.unSelect(), i && i.select(), p = e
		}, N.remove = function() {
			var e = this.getStages();
			$.each(e, function(e, t) {
				t.remove()
			}), currentStageId = null, T && (T.remove(), T = null)
		}, N
	}), define("frame_mark", ["tmpl", "util"], function(e, t, n) {
		function r(e) {
			this.init(e)
		}
		return r.prototype = {
			init: function(e) {
				this.setData(e), this.render(), this.bind(), this.stop(), this.updateStartPosition(), this.updateEndPosition(), this.updateLastDuration(), this.updateCurrentPosition(this.startPosition)
			},
			setData: function(e) {
				this.id = e.id, this.stageId = e.stageId, this.container = e.container, this.frameLength = e.frameLength + 1, this.frameDuration = e.frameDuration, this.totalFramesCount = e.totalFramesCount, this.isPaused = !1
			},
			getData: function() {},
			updateStartPosition: function() {
				this.startPosition = (this.frameLength - this.element.width()) / 2
			},
			getCurrentMarkElementPosition: function() {
				return this.element.offset().left - this.container.offset().left
			},
			getCurrentIndex: function() {
				var e = this.getCurrentMarkElementPosition();
				return Math.max(0, Math.floor(e / this.frameLength))
			},
			updateCurrentPosition: function(e) {
				this.currentPosition = e, this.element.css({
					"-webkit-transition": "none",
					"-webkit-transform": "translateX(" + this.currentPosition + "px) translateZ(0)"
				}), this.isPaused = !1
			},
			updateTotalDurationAndFramesCount: function(e, t) {
				this.frameTotalDuration = e, this.totalFramesCount = t, this.updateEndPosition()
			},
			updateCurrentPositionByFrameIndex: function(e) {
				e >= this.totalFramesCount && (e = this.totalFramesCount - 1);
				var t = e * this.frameLength,
					n = t + (this.frameLength - this.element.width()) / 2;
				this.updateCurrentPosition(n)
			},
			play: function() {
				var e = this;
				this.isPaused || this.stop(), this.updateLastDuration(), setTimeout(function() {
					e.element.css({
						"-webkit-transition": "all " + e.lastDuration + "s linear",
						"-webkit-transform": "translateX(" + e.endPosition + "px)"
					})
				}, 10), this.isPaused = !1
			},
			pause: function() {
				this.updateCurrentPosition(this.element.offset().left - this.container.offset().left), this.isPaused = !0
			},
			stop: function() {
				this.updateCurrentPosition(this.startPosition)
			},
			updateEndPosition: function() {
				this.endPosition = this.startPosition + this.frameLength * (this.totalFramesCount - 1)
			},
			updateLastDuration: function() {
				this.lastDuration = (this.endPosition - this.currentPosition) / this.frameLength * this.frameDuration
			},
			bind: function() {
				var e = this;
				this.element.on("webkitTransitionEnd", function() {
					e.element.css({
						"-webkit-transition": "none"
					})
				})
			},
			getFrameMarkElement: function() {
				return this.element
			},
			render: function() {
				this.element = $("<div></div>", {
					id: "frame_mark_" + t.getRandomId(),
					"class": "frames-process-mark"
				}), this.container.append(this.element)
			},
			remove: function() {
				var e = this.getFrameMarkElement();
				e.remove()
			}
		}, r
	}), define("preset_animation_config", [], function() {
		var e = {},
			t = e.bounce = {
				"70%": {
					customSetting: {
						"-webkit-animation-timing-function": "cubic-bezier(0.755, 0.050, 0.855, 0.060)"
					},
					y: -15
				},
				"90%": {
					y: -4
				}
			};
		t["40%"] = t["43%"] = {
			customSetting: {
				"-webkit-animation-timing-function": "cubic-bezier(0.755, 0.050, 0.855, 0.060)"
			},
			y: -30
		}, t["0%"] = t["20%"] = t["53%"] = t["80%"] = t["100%"] = {
			customSetting: {
				"-webkit-animation-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
			},
			y: 0
		}, e.swing = {
			"0%": {
				rotateZ: 0
			},
			"20%": {
				rotateZ: 15
			},
			"40%": {
				rotateZ: -10
			},
			"60%": {
				rotateZ: 5
			},
			"80%": {
				rotateZ: -5
			},
			"100%": {
				rotateZ: 0
			}
		};
		var n = e.flash = {};
		n["0%"] = n["50%"] = n["100%"] = {
			opacity: 1,
			easing: "ease"
		}, n["25%"] = n["75%"] = {
			opacity: 0,
			easing: "ease"
		}, e.pulse = {
			"0%": {
				scale: 1
			},
			"50%": {
				scale: 1.05
			},
			"100%": {
				scale: 1
			}
		}, e.rubberBand = {
			"0%": {
				scale: 1
			},
			"30%": {
				scaleX: 1.25,
				scaleY: .75
			},
			"40%": {
				scaleX: .75,
				scaleY: 1.25
			},
			"50%": {
				scaleX: 1.15,
				scaleY: .85
			},
			"65%": {
				scaleX: .95,
				scaleY: 1.05
			},
			"75%": {
				scaleX: 1.05,
				scaleY: .95
			},
			"100%": {
				scale: 1
			}
		};
		var r = e.shake = {
			"0%": {
				x: 0
			}
		};
		r["10%"] = r["30%"] = r["50%"] = r["70%"] = r["90%"] = {
			x: -10
		}, r["20%"] = r["40%"] = r["60%"] = r["80%"] = {
			x: 10
		}, r["100%"] = {
			x: 0
		};
		var i = e.tada = {
			"0%": {
				scale: 1
			}
		};
		i["10%"] = i["20%"] = {
			scaleX: .9,
			scaleY: .9,
			scaleZ: .9,
			rotateZ: -3
		}, i["30%"] = i["50%"] = i["70%"] = i["90%"] = {
			scaleX: 1.1,
			scaleY: 1.1,
			scaleZ: 1.1,
			rotateZ: 3
		}, i["40%"] = i["60%"] = i["80%"] = {
			scaleX: 1.1,
			scaleY: 1.1,
			scaleZ: 1.1,
			rotateZ: -3
		}, i["100%"] = {
			scaleX: 1,
			scaleY: 1,
			scaleZ: 1,
			rotateZ: 0
		}, e.wobble = {
			"15%": {
				x: -25,
				rotateZ: -5
			},
			"30%": {
				x: 20,
				rotateZ: 3
			},
			"45%": {
				x: -15,
				rotateZ: -3
			},
			"60%": {
				x: 10,
				rotateZ: 2
			},
			"75%": {
				x: -5,
				rotateZ: -1
			},
			"100%": {
				x: 0,
				rotateZ: 0
			}
		}, e.jello = {}, e.bounceIn = {
			"0%": {
				opacity: 0,
				scaleX: .3,
				scaleY: .3,
				scaleZ: .3,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"20%": {
				scaleX: 1.1,
				scaleY: 1.1,
				scaleZ: 1.1,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"40%": {
				scaleX: .9,
				scaleY: .9,
				scaleZ: .9,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"60%": {
				opacity: 1,
				scaleX: 1.03,
				scaleY: 1.03,
				scaleZ: 1.03,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"80%": {
				scaleX: .97,
				scaleY: .97,
				scaleZ: .97,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"100%": {
				scaleX: 1,
				scaleY: 1,
				scaleZ: 1
			}
		}, e.bounceInDown = {
			"0%": {
				opacity: 0,
				y: -3e3,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"60%": {
				opacity: 1,
				y: 25,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"75%": {
				y: -10,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"90%": {
				y: 5,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"100%": {
				y: 0
			}
		}, e.bounceInLeft = {
			"0%": {
				opacity: 0,
				x: -3e3,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"60%": {
				opacity: 1,
				x: 25,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"75%": {
				x: -10,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"90%": {
				x: 5,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"100%": {
				x: 0
			}
		}, e.bounceInRight = {
			"0%": {
				opacity: 0,
				x: 3e3,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"60%": {
				opacity: 1,
				x: -25,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"75%": {
				x: 10,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"90%": {
				x: -5,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"100%": {
				x: 0
			}
		}, e.bounceInUp = {
			"0%": {
				opacity: 0,
				y: 3e3,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"60%": {
				opacity: 1,
				y: -25,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"75%": {
				y: 10,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"90%": {
				y: -5,
				customSetting: {
					"-webkit-transition-timing-function": "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
				}
			},
			"100%": {
				y: 0
			}
		}, e.bounceOut = {
			"20%": {
				scaleX: .9,
				scaleY: .9,
				scaleZ: .9
			},
			"50%": {
				opacity: 1,
				scaleX: 1.1,
				scaleY: 1.1,
				scaleZ: 1.1
			},
			"55%": {
				scaleX: 1.1,
				scaleY: 1.1,
				scaleZ: 1.1
			},
			"100%": {
				opacity: 0,
				scaleX: .3,
				scaleY: .3,
				scaleZ: .3
			}
		}, e.bounceOutDown = {
			"20%": {
				y: 10
			},
			"40%": {
				opacity: 1,
				y: -20
			},
			"45%": {
				opacity: 1,
				y: -20
			},
			"100%": {
				opacity: 0,
				y: 2e3
			}
		}, e.bounceOutLeft = {
			"20%": {
				x: 20
			},
			"100%": {
				opacity: 0,
				x: -2e3
			}
		}, e.bounceOutRight = {
			"20%": {
				x: -20
			},
			"100%": {
				opacity: 0,
				x: 2e3
			}
		}, e.bounceOutUp = {
			"20%": {
				y: -10
			},
			"40%": {
				opacity: 1,
				y: 20
			},
			"45%": {
				y: 20
			},
			"100%": {
				opacity: 0,
				y: -2e3
			}
		}, e.fadeIn = {
			"0%": {
				opacity: 0
			},
			"100%": {
				opacity: 1
			}
		}, e.fadeInDown = {
			"0%": {
				opacity: 0,
				y: -100
			},
			"100%": {
				opacity: 1,
				y: 0
			}
		}, e.fadeInLeft = {
			"0%": {
				opacity: 0,
				x: -100
			},
			"100%": {
				opacity: 1,
				y: 0
			}
		}, e.fadeInRight = {
			"0%": {
				opacity: 0,
				x: 100
			},
			"100%": {
				opacity: 1
			}
		}, e.fadeInUp = {
			"0%": {
				opacity: 0,
				y: 100
			},
			"100%": {
				opacity: 1,
				y: 0
			}
		}, e.fadeOut = {
			"0%": {
				opacity: 1
			},
			"100%": {
				opacity: 0
			}
		}, e.fadeOutLeft = {
			"0%": {
				opacity: 1
			},
			"100%": {
				opacity: 0,
				x: -100
			}
		}, e.fadeOutRight = {
			"0%": {
				opacity: 1
			},
			"100%": {
				opacity: 0,
				x: 100
			}
		}, e.fadeOutUp = {
			"0%": {
				opacity: 1
			},
			"100%": {
				opacity: 0,
				y: -100
			}
		}, e.fadeOutDown = {
			"0%": {
				opacity: 1
			},
			"100%": {
				opacity: 0,
				y: 100
			}
		}, e.flip = {
			"0%": {
				rotateY: -360,
				perspective: 400,
				customSetting: {
					"-webkit-animation-timing-function": "ease-out"
				}
			},
			"40%": {
				z: 150,
				rotateY: -190,
				perspective: 400,
				customSetting: {
					"-webkit-animation-timing-function": "ease-out"
				}
			},
			"50%": {
				z: 150,
				rotateY: -170,
				perspective: 400,
				customSetting: {
					"-webkit-animation-timing-function": "ease-in"
				}
			},
			"80%": {
				scaleX: .95,
				scaleY: .95,
				scaleZ: .95,
				perspective: 400,
				customSetting: {
					"-webkit-animation-timing-function": "ease-in"
				}
			},
			"100%": {
				perspective: 400
			}
		}, e.flipInX = {
			"0%": {
				opacity: 0,
				perspective: 400,
				rotateX: 90,
				customSetting: {
					"-webkit-animation-timing-function": "ease-in"
				}
			},
			"40%": {
				perspective: 400,
				rotateX: -20,
				customSetting: {
					"-webkit-animation-timing-function": "ease-in"
				}
			},
			"60%": {
				opacity: 1,
				perspective: 400,
				rotateX: 10
			},
			"80%": {
				perspective: 400,
				rotateX: -5
			},
			"100%": {
				perspective: 400
			}
		}, e.flipInY = {
			"0%": {
				opacity: 0,
				perspective: 400,
				rotateY: 90
			},
			"40%": {
				perspective: 400,
				rotateY: -20
			},
			"60%": {
				opacity: 1,
				perspective: 400,
				rotateY: 10
			},
			"80%": {
				perspective: 400,
				rotateY: -5
			},
			"100%": {
				perspective: 400
			}
		}, e.lightSpeedIn = {
			"0%": {
				opacity: 0,
				x: 100,
				skewX: -30
			},
			"60%": {
				opacity: 1,
				skewX: 20
			},
			"80%": {
				skewX: -5
			},
			"100%": {
				opacity: 1
			}
		}, e.lightSpeedOut = {
			"0%": {
				opacity: 1
			},
			"100%": {
				x: 100,
				opacity: 0,
				skewX: 30
			}
		}, e.rotateIn = {
			"0%": {
				opacity: 0,
				rotateZ: 200
			},
			"100%": {
				opacity: 1,
				rotateZ: 0
			}
		}, e.rotateInDownLeft = {
			"0%": {
				rotateZ: -45,
				opacity: 0,
				customSetting: {
					"-webkit-transform-origin": "left bottom"
				}
			},
			"100%": {
				opacity: 1,
				customSetting: {
					"-webkit-transform-origin": "left bottom"
				}
			}
		}, e.rotateInDownRight = {
			"0%": {
				rotateZ: 45,
				opacity: 0,
				customSetting: {
					"-webkit-transform-origin": "right bottom"
				}
			},
			"100%": {
				opacity: 1,
				customSetting: {
					"-webkit-transform-origin": "right bottom"
				}
			}
		}, e.rotateInUpLeft = {
			"0%": {
				rotateZ: 45,
				opacity: 0,
				customSetting: {
					"-webkit-transform-origin": "left bottom"
				}
			},
			"100%": {
				opacity: 1,
				customSetting: {
					"-webkit-transform-origin": "left bottom"
				}
			}
		}, e.rotateInUpRight = {
			"0%": {
				rotateZ: -90,
				opacity: 0,
				customSetting: {
					"-webkit-transform-origin": "right bottom"
				}
			},
			"100%": {
				opacity: 1,
				customSetting: {
					"-webkit-transform-origin": "right bottom"
				}
			}
		}, e.rotateOut = {
			"0%": {
				opacity: 1
			},
			"100%": {
				opacity: 0,
				rotateZ: -200
			}
		}, e.rotateOutDownLeft = {
			"0%": {
				opacity: 1,
				customSetting: {
					"-webkit-transform-origin": "left bottom"
				}
			},
			"100%": {
				opacity: 0,
				rotateZ: 45,
				customSetting: {
					"-webkit-transform-origin": "left bottom"
				}
			}
		}, e.rotateOutDownRight = {
			"0%": {
				opacity: 1,
				customSetting: {
					"-webkit-transform-origin": "right bottom"
				}
			},
			"100%": {
				opacity: 0,
				rotateZ: -45,
				customSetting: {
					"-webkit-transform-origin": "right bottom"
				}
			}
		}, e.rotateOutUpLeft = {
			"0%": {
				opacity: 1,
				customSetting: {
					"-webkit-transform-origin": "left bottom"
				}
			},
			"100%": {
				opacity: 0,
				rotateZ: -45,
				customSetting: {
					"-webkit-transform-origin": "left bottom"
				}
			}
		}, e.rotateOutUpRight = {
			"0%": {
				opacity: 1,
				customSetting: {
					"-webkit-transform-origin": "right bottom"
				}
			},
			"100%": {
				opacity: 0,
				rotateZ: 90,
				customSetting: {
					"-webkit-transform-origin": "right bottom"
				}
			}
		};
		var s = e.hinge = {
			"0%": {
				opacity: 1,
				customSetting: {
					"-webkit-transform-origin": "top left",
					"-webkit-animation-timing-function": "ease-in-out"
				}
			},
			"100%": {
				y: 700,
				opacity: 0
			}
		};
		return s["20%"] = s["60%"] = {
			rotateZ: 80,
			customSetting: {
				"-webkit-transform-origin": "top left",
				"-webkit-animation-timing-function": "ease-in-out"
			}
		}, s["40%"] = s["80%"] = {
			rotateZ: 60,
			opacity: 1,
			customSetting: {
				"-webkit-transform-origin": "top left",
				"-webkit-animation-timing-function": "ease-in-out"
			}
		}, e.rollIn = {
			"0%": {
				opacity: 0,
				x: -100,
				rotateZ: -120
			},
			"100%": {
				opacity: 1
			}
		}, e.rollOut = {
			"0%": {
				opacity: 1
			},
			"100%": {
				opacity: 0,
				x: 100,
				rotateZ: 120
			}
		}, e.zoomIn = {
			"0%": {
				opacity: 0,
				scaleX: .3,
				scaleY: .3,
				scaleZ: .3
			},
			"50%": {
				opacity: 1
			}
		}, e.zoomInDown = {
			"0%": {
				opacity: 0,
				scaleX: .1,
				scaleY: .1,
				scaleZ: .1,
				y: -1e3,
				customSetting: {
					"-webkit-animation-timing-function": "cubic-bezier(0.550, 0.055, 0.675, 0.190)"
				}
			},
			"60%": {
				opacity: 1,
				scaleX: .475,
				scaleY: .475,
				scaleZ: .475,
				y: 60,
				customSetting: {
					"-webkit-animation-timing-function": "cubic-bezier(0.175, 0.885, 0.320, 1)"
				}
			},
			"100%": {
				opacity: 1,
				scaleX: 1,
				scaleY: 1,
				scaleZ: 1,
				y: 0
			}
		}, e.zoomInLeft = {
			"0%": {
				opacity: 0,
				scaleX: .1,
				scaleY: .1,
				scaleZ: .1,
				x: -1e3,
				customSetting: {
					"-webkit-animation-timing-function": "cubic-bezier(0.550, 0.055, 0.675, 0.190)"
				}
			},
			"60%": {
				opacity: 1,
				scaleX: .475,
				scaleY: .475,
				scaleZ: .475,
				x: 10,
				customSetting: {
					"-webkit-animation-timing-function": "cubic-bezier(0.175, 0.885, 0.320, 1)"
				}
			},
			"100%": {
				opacity: 1,
				scaleX: 1,
				scaleY: 1,
				scaleZ: 1,
				y: 0
			}
		}, e.zoomInRight = {
			"0%": {
				opacity: 0,
				scaleX: .1,
				scaleY: .1,
				scaleZ: .1,
				x: 1e3,
				customSetting: {
					"-webkit-animation-timing-function": "cubic-bezier(0.550, 0.055, 0.675, 0.190)"
				}
			},
			"60%": {
				opacity: 1,
				scaleX: .475,
				scaleY: .475,
				scaleZ: .475,
				x: 10,
				customSetting: {
					"-webkit-animation-timing-function": "cubic-bezier(0.175, 0.885, 0.320, 1)"
				}
			},
			"100%": {
				opacity: 1,
				scaleX: 1,
				scaleY: 1,
				scaleZ: 1,
				y: 0
			}
		}, e.zoomInUp = {
			"0%": {
				opacity: 0,
				scaleX: .1,
				scaleY: .1,
				scaleZ: .1,
				y: 1e3,
				customSetting: {
					"-webkit-animation-timing-function": "cubic-bezier(0.550, 0.055, 0.675, 0.190)"
				}
			},
			"60%": {
				opacity: 1,
				scaleX: .475,
				scaleY: .475,
				scaleZ: .475,
				y: -60,
				customSetting: {
					"-webkit-animation-timing-function": "cubic-bezier(0.175, 0.885, 0.320, 1)"
				}
			},
			"100%": {
				opacity: 1,
				scaleX: 1,
				scaleY: 1,
				scaleZ: 1,
				y: 0
			}
		}, e.zoomOut = {
			"0%": {
				opacity: 1
			},
			"50%": {
				opacity: 0,
				scaleX: .3,
				scaleY: .3,
				scaleZ: .3
			},
			"100%": {
				opacity: 0
			}
		}, e.zoomOutDown = {
			"40%": {
				opacity: 1,
				scaleX: .475,
				scaleY: .475,
				scaleZ: .475,
				y: -60,
				customSetting: {
					"-webkit-animation-timing-function": "cubic-bezier(0.550, 0.055, 0.675, 0.190)"
				}
			},
			"100%": {
				opacity: 0,
				y: 2e3,
				scaleX: .1,
				scaleY: .1,
				scaleZ: .1,
				customSetting: {
					"-webkit-transform-origin": "center bottom",
					"-webkit-animation-timing-function": "cubic-bezier(0.175, 0.885, 0.320, 1)"
				}
			}
		}, e.zoomOutLeft = {
			"40%": {
				opacity: 1,
				scaleX: .475,
				scaleY: .475,
				scaleZ: .475,
				x: 42
			},
			"100%": {
				opacity: 0,
				x: -2e3,
				scaleX: .1,
				scaleY: .1,
				scaleZ: .1,
				customSetting: {
					"-webkit-transform-origin": "left center"
				}
			}
		}, e.zoomOutRight = {
			"40%": {
				opacity: 1,
				scaleX: .475,
				scaleY: .475,
				scaleZ: .475,
				x: -42
			},
			"100%": {
				opacity: 0,
				x: 2e3,
				scaleX: .1,
				scaleY: .1,
				scaleZ: .1,
				customSetting: {
					"-webkit-transform-origin": "right center"
				}
			}
		}, e.zoomOutUp = {
			"40%": {
				opacity: 1,
				scaleX: .475,
				scaleY: .475,
				scaleZ: .475,
				y: 60,
				customSetting: {
					"-webkit-animation-timing-function": "cubic-bezier(0.550, 0.055, 0.675, 0.190)"
				}
			},
			"100%": {
				opacity: 0,
				y: -2e3,
				scaleX: .1,
				scaleY: .1,
				scaleZ: .1,
				customSetting: {
					"-webkit-transform-origin": "center bottom",
					"-webkit-animation-timing-function": "cubic-bezier(0.175, 0.885, 0.320, 1)"
				}
			}
		}, e.slideInLeft = {
			"0%": {
				y: -100
			},
			"100%": {
				y: 0
			}
		}, e.slideInLeft = {
			"0%": {
				x: -100
			},
			"100%": {
				x: 0
			}
		}, e.slideInRight = {
			"0%": {
				x: 100
			},
			"100%": {
				x: 0
			}
		}, e.slideInUp = {
			"0%": {
				y: 100
			},
			"100%": {
				y: 0
			}
		}, e.slideOutDown = {
			"0%": {
				y: 0
			},
			"100%": {
				y: 100
			}
		}, e.slideOutLeft = {
			"0%": {
				x: 0
			},
			"100%": {
				x: -100
			}
		}, e.slideOutRight = {
			"0%": {
				x: 0
			},
			"100%": {
				x: 100
			}
		}, e.slideOutUp = {
			"0%": {
				y: 0
			},
			"100%": {
				y: -100
			}
		}, e
	}), define("preset_animation_editor", ["tmpl", "util", "preset_animation_config", "win_manager"], function(e, t, n, r) {
		var i = "preset_animation_editor",
			s, o, u = [{
				name: "bounce",
				cname: "弹跳"
			}, {
				name: "swing",
				cname: "摇摆"
			}, {
				name: "flash",
				cname: "闪烁"
			}, {
				name: "pulse",
				cname: "脉动"
			}, {
				name: "rubberBand",
				cname: "橡皮筋"
			}, {
				name: "shake",
				cname: "颤抖"
			}, {
				name: "tada",
				cname: "摇摆弹出"
			}, {
				name: "wobble",
				cname: "晃动"
			}],
			a = [{
				name: "bounceIn",
				cname: "弹入"
			}, {
				name: "bounceInDown",
				cname: "从上弹入"
			}, {
				name: "bounceInLeft",
				cname: "从左弹入"
			}, {
				name: "bounceInRight",
				cname: "从右弹入"
			}, {
				name: "bounceInUp",
				cname: "从下弹入"
			}],
			f = [{
				name: "bounceOut",
				cname: "弹出"
			}, {
				name: "bounceOutLeft",
				cname: "从左弹出"
			}, {
				name: "bounceOutRight",
				cname: "从右弹出"
			}, {
				name: "bounceOutUp",
				cname: "从上弹出"
			}, {
				name: "bounceOutDown",
				cname: "从下弹出"
			}],
			l = [{
				name: "fadeIn",
				cname: "淡入"
			}, {
				name: "fadeInDown",
				cname: "从上淡入"
			}, {
				name: "fadeInLeft",
				cname: "从左淡入"
			}, {
				name: "fadeInUp",
				cname: "从下淡入"
			}, {
				name: "fadeInRight",
				cname: "从右淡入"
			}],
			c = [{
				name: "fadeOut",
				cname: "淡出"
			}, {
				name: "fadeOutLeft",
				cname: "向左淡出"
			}, {
				name: "fadeOutRight",
				cname: "向右淡出"
			}, {
				name: "fadeOutUp",
				cname: "向上淡出"
			}, {
				name: "fadeOutDown",
				cname: "向下淡出"
			}],
			h = [{
				name: "flip",
				cname: "翻转"
			}, {
				name: "flipInX",
				cname: "X轴翻转"
			}, {
				name: "flipInY",
				cname: "Y轴翻转"
			}],
			p = [{
				name: "lightSpeedIn",
				cname: "飞速进入"
			}, {
				name: "lightSpeedOut",
				cname: "飞速离开"
			}],
			d = [{
				name: "rotateIn",
				cname: "旋转进入"
			}, {
				name: "rotateInDownLeft",
				cname: "左下旋转进入"
			}, {
				name: "rotateInDownRight",
				cname: "右下旋转进入"
			}, {
				name: "rotateInUpLeft",
				cname: "右上旋转进入"
			}, {
				name: "rotateInUpRight",
				cname: "左上旋转进入"
			}],
			v = [{
				name: "rotateOut",
				cname: "旋转消失"
			}, {
				name: "rotateOutDownLeft",
				cname: "右下旋转消失"
			}, {
				name: "rotateOutDownRight",
				cname: "左下旋转消失"
			}, {
				name: "rotateOutUpLeft",
				cname: "左上旋转消失"
			}, {
				name: "rotateOutUpRight",
				cname: "右上旋转消失"
			}],
			m = [{
				name: "slideInDown",
				cname: "从上滑动进入"
			}, {
				name: "slideInLeft",
				cname: "从左滑动进入"
			}, {
				name: "slideInRight",
				cname: "从右滑动进入"
			}, {
				name: "slideInUp",
				cname: "从下滑动进入"
			}],
			g = [{
				name: "slideOutDown",
				cname: "向下滑动消失"
			}, {
				name: "slideOutLeft",
				cname: "向左滑动消失"
			}, {
				name: "slideOutRight",
				cname: "向右滑动消失"
			}, {
				name: "slideOutUp",
				cname: "向上滑动消失"
			}],
			y = [{
				name: "zoomIn",
				cname: "放大进入"
			}, {
				name: "zoomInDown",
				cname: "从上放大进入"
			}, {
				name: "zoomInLeft",
				cname: "从左放大进入"
			}, {
				name: "zoomInRight",
				cname: "从右放大进入"
			}, {
				name: "zoomInUp",
				cname: "从下放大进入"
			}],
			b = [{
				name: "zoomOut",
				cname: "缩小消失"
			}, {
				name: "zoomOutDown",
				cname: "向下缩小消失"
			}, {
				name: "zoomOutLeft",
				cname: "向左缩小消失"
			}, {
				name: "zoomOutRight",
				cname: "向右缩小消失"
			}, {
				name: "zoomOutUp",
				cname: "向上缩小消失"
			}],
			w = [{
				name: "hinge",
				cname: "转轴"
			}, {
				name: "rollIn",
				cname: "滚动进入"
			}, {
				name: "rollOut",
				cname: "滚动消失"
			}],
			E = {
				init: function(e) {
					e = e || {}, this.name = "PresetAnimationEditor", this.headerName = "插入预设动画"
				},
				bind: function() {
					var e = this;
					this.previewDemo.on("webkitAnimationEnd", function() {
						$(this).removeClass(s), $(this).removeClass("animated")
					}), this.presetAnimationList.on("click", function(t) {
						var n = $(t.target);
						e.select(n)
					})
				},
				select: function(e) {
					o && o.removeClass("active"), e.addClass("active"), o = e;
					var t = e.data("name"),
						n = this.previewDuration.val();
					this.setAnimation(t, n)
				},
				confirmAnimation: function() {
					$(window).trigger("animationConfirm", {
						duration: this.previewDuration.val(),
						animationName: s
					})
				},
				setAnimation: function(e, t) {
					s && $(this.previewDemo).removeClass(s), s = e, this.previewDemo.addClass(e), this.previewDemo.addClass("animated"), this.previewDemo.css({
						"-webkit-animation-duration": t + "s"
					})
				},
				render: function() {
					var t = i + "_" + this.id,
						n = e[i]({
							id: t,
							attentionSeekersListConfig: u,
							bouncingEntrancesListConfig: a,
							bouncingExitsListConfig: f,
							fadingEntrancesListConfig: l,
							fadingExitsListConfig: c,
							flippersListConfig: h,
							lightSpeedListConfig: p,
							rotateEntrancesListConfig: d,
							rotateExitsListConfig: v,
							slideEntranceListConfig: m,
							slideExitListConfig: g,
							zoomEntrancesListConfig: y,
							zoomExitListConfig: b,
							specialListConfig: w
						});
					r.add(this.name, n), this.previewDemo = $(".preset-sprite-demo"), this.presetAnimationList = $(".preset-animation-ul-list"), this.previewDuration = $(".preset-animation-duration"), this.confirmBtn = $(".confirm-preset-animation"), this.cancelBtn = $(".cancel-preset-animation"), this.bind()
				},
				show: function() {
					var e = this;
					(!this.element || !this.element.length) && this.render(), r.show({
						name: this.name,
						headerName: this.headerName,
						onConfirm: function() {
							e.confirmAnimation()
						}
					});
					var t = this.presetAnimationList.find(".list-group-item")[0];
					this.select($(t))
				}
			};
		return E
	}), define("keyframe", ["tmpl", "util"], function(e, t) {
		function r(e) {
			this.init(e)
		}
		var n = "keyframe";
		return r.prototype = {
			init: function(e) {
				e = e || {}, this.setData(e), this.element = $('<div class="keyframe" id="' + this.renderId + '"></div>'), this.render(), this.bind()
			},
			getData: function() {
				return {
					id: this.id,
					index: this.index,
					setting: this.setting
				}
			},
			setData: function(e) {
				this.id = e.id || t.getRandomId(), this.index = e.index || 0, this.frame = e.frame, this.renderId = n + "_" + this.id, this.setSetting($.extend({
					display: "block",
					x: 0,
					y: 0,
					backgroundColor: "transparent",
					rotate: 0,
					opacity: 1,
					easing: "linear"
				}, e.setting))
			},
			clone: function() {
				return newKeyFrame({
					setting: this.setting
				})
			},
			bind: function() {
				var e = this;
				if (this.index > 0) {
					var t = this.frame.framesbar,
						n = t.getFramesBarOlElement();
					this.element.draggable({
						axis: "x",
						stop: function(r, i) {
							var s = $(r.target),
								o = s.offset().left - n.offset().left,
								u = t.framesArr.length,
								a = Math.min(u - 1, Math.max(0, Math.round(o / (e.frame.frameLength + 1)))),
								f = t.addKeyFrame(a, e.setting);
							f.select(), t.deleteKeyFrameById(e.id)
						}
					})
				}
			},
			getKeyFrameElement: function() {
				return this.element
			},
			render: function() {
				var e = this.frame.getFrameElement();
				e.append(this.element)
			},
			select: function() {
				var e = this.getKeyFrameElement();
				if (e.hasClass("selected")) return;
				console.log("KeyFrame selected"), this.frame.framesbar && this.frame.framesbar.select(), e.addClass("selected"), $(window).trigger("keyFrameSelect", {
					keyFrame: this
				}), $(window).trigger("afterKeyFrameSelect", {
					keyFrame: this
				})
			},
			unSelect: function() {
				var e = this.getKeyFrameElement();
				e && (e.removeClass("selected"), $(window).trigger("keyFrameUnselect", {
					unSelectedKeyFrame: this
				}))
			},
			updateCssProperties: function(e) {
				this.setting.controllerMode = e;
				var n = t.convertKeyFrameSetting2CssProperties(this.setting);
				this.setCssProperties(n)
			},
			setSetting: function(e) {
				delete e.imgFileName, delete e.imgUrl, delete e.textContent, this.setting = $.extend(this.setting, e), this.index == 0 && (this.setting.initialWidth == null && (this.setting.initialWidth = this.setting.width), this.setting.initialHeight == null && (this.setting.initialHeight = this.setting.height));
				var n = t.convertKeyFrameSetting2CssProperties(this.setting);
				this.setCssProperties(n)
			},
			getSetting: function() {
				return this.setting
			},
			setCssProperties: function(e) {
				this.cssProperties = e
			},
			remove: function() {
				var e = this.getKeyFrameElement();
				e && e.remove(), this.element = null, this.frame.keyFrame = null, this.frame = this.id = this.setting = this.cssProperties = null
			}
		}, r
	}), define("tween", [], function() {
		var e = {
			linear: function(e, t, n, r) {
				return n * e / r + t
			},
			easein: function(e, t, n, r) {
				return n * (e /= r) * e + t
			},
			easeout: function(e, t, n, r) {
				return -n * (e /= r) * (e - 2) + t
			},
			easeinout: function(e, t, n, r) {
				return (e /= r / 2) < 1 ? n / 2 * e * e + t : -n / 2 * (--e * (e - 2) - 1) + t
			}
		};
		return e
	}), define("frame", ["tmpl", "util", "keyframe", "tween"], function(e, t, n, r) {
		function s(e) {
			this.init(e)
		}
		var i = "frame";
		return s.prototype = {
			init: function(e) {
				e = e || {}, this.setData(e), this.element = $("<div>", {
					id: this.renderId,
					"class": "frame"
				}), this.element.data("index", this.index), this.element.css({
					width: this.frameLength
				}), this.render()
			},
			getData: function() {
				return {
					id: this.id,
					index: this.index,
					frameLength: this.frameLength
				}
			},
			setData: function(e) {
				this.id = e.id || t.getRandomId(), this.index = e.index || 0, this.frameLength = e.frameLength || 12, this.renderId = i + "_" + this.id, this.keyFrame = e.keyFrame, this.framesbar = e.framesbar
			},
			getCalculatedSetting: function() {
				var e = this,
					t = this.framesbar,
					n = t.getKeyFrames(),
					r, i, s;
				if (this.keyFrame) return this.keyFrame.getSetting();
				var o = t.getLeftRightKeyFrame(e);
				i = o.l_kf, s = o.r_kf;
				if (!s) {
					if (!n.length) return;
					return n[n.length - 1].getSetting()
				}
				var u = i.getSetting(),
					a = s.getSetting(),
					f = {};
				easing = u.easing, easing = easing.split("-").join("");
				var l = (e.index - i.index) * t.frameDuration,
					c = (s.index - i.index) * t.frameDuration;
				return $.each(u, function(t) {
					t != "customSetting" && (f[t] = e.getCalculatedSettingValue(t, u, a, l, c, easing))
				}), f.customSetting = {}, u.customSetting && $.each(u.customSetting, function(t) {
					if (t == "imgFileName") debugger;
					f.customSetting[t] = e.getCalculatedSettingValue(t, u.customSetting, a.customSetting, l, c, easing)
				}), f
			},
			calculateEasingValue: function(e, t, n, i, s) {
				var o;
				e = Number(e), t = Number(t);
				if (e == t) return t;
				if (s == "stepstart") o = t;
				else if (s == "stepend") o = e;
				else {
					var u = e,
						a = t - u;
					r[s] ? o = r[s](n, u, a, i) : o = r.linear(n, u, a, i)
				}
				return o
			},
			calculateColorObj: function(e, t, n, r, i) {
				var s = this,
					o = {};
				return $.each(e, function(u) {
					var a = s.calculateEasingValue(e[u], t[u], n, r, i);
					o[u] = u == "alpha" ? a : Math.round(a)
				}), o
			},
			getCalculatedSettingValue: function(e, n, r, i, s, o) {
				var u;
				if (!r) return n[e];
				if (n[e] === "" || r[e] === "") u = "";
				else if (!isNaN(Number(n[e])) && !isNaN(Number(r[e]))) u = this.calculateEasingValue(n[e], r[e], i, s, o);
				else if (e == "backgroundColor" && n[e] && r[e]) {
					var a = t.colorValue2Obj(n[e]),
						f = t.colorValue2Obj(r[e]);
					a.alpha == 0 ? (a.red = f.red, a.green = f.green, a.blue = f.blue) : f.alpha == 0 && (f.red == a.red, f.green = a.green, f.blue = a.blue);
					var l = this.calculateColorObj(a, f, i, s, o),
						c = t.colorObj2Value(l);
					u = c
				} else o == "stepstart" ? u = r[e] : u = n[e];
				return u
			},
			render: function() {
				var e = this.framesbar.getFramesBarOlElement();
				e.append(this.element)
			},
			setKeyFrame: function(e) {
				this.keyFrame = e
			},
			getKeyFrame: function() {
				return this.keyFrame
			},
			getFrameElement: function() {
				return this.element
			},
			remove: function() {
				this.keyFrame && (this.keyFrame.remove(), this.keyFrame = null);
				var e = this.getFrameElement();
				e.remove(), this.element = null
			},
			select: function() {
				var e = this;
				if (this.element.hasClass("selected")) return;
				console.log("Frame selected"), this.element.addClass("selected"), this.framesbar && this.framesbar.select(), $(window).trigger("frameSelect", {
					frame: e
				}), $(window).trigger("afterFrameSelect", {
					frame: e
				})
			},
			unSelect: function() {
				this.element.removeClass("selected"), $(window).trigger("frameUnSelect", {
					frame: self
				})
			},
			remove: function() {
				var e = this.getFrameElement();
				e && e.remove(), this.element = null
			}
		}, s
	}), define("framesbar", ["tmpl", "util", "dropmenu", "frame_mark", "sprite-action-setting", "preset_animation_editor", "keyframe", "frame"], function(e, t, n, r, i, s, o, u) {
		function m() {
			var e = arguments[1],
				t, n, r = l || f,
				i = e.keyFrame || e.frame,
				s;
			r && r.id != i.id && (r.unSelect(), l ? l = null : f = null), e.keyFrame ? s = l = e.keyFrame : s = f = e.frame, n = s.index, t = s.framesbar || s.frame.framesbar, t.running = !1, t.moveFrameMarkByIndex(n)
		}

		function g(e) {
			this.init(e)
		}
		var a = "framesbar",
			f, l, c, h, p, d = {},
			v = {};
		return g.prototype = {
			init: function(e) {
				e = e || {};
				var t = this;
				this.setData(e), this.render(), this.bind(), this._initFrameArr(), e.keyFramesDataList && this._initKeyFrameArr(e.keyFramesDataList), this.frameMark = new r({
					id: this.id,
					stageId: this.stageId,
					container: this.getFramesBarOlElement(),
					frameLength: this.frameLength,
					frameDuration: this.frameDuration,
					totalFramesCount: this.totalFramesCount
				}), this.setAnimationEndAction({
					actionEventName: this.animationEndEventName,
					actionJumpNext: this.animationEndJumpNext
				})
			},
			reset: function() {
				this.frameMark.stop(), this.running = !1
			},
			getData: function() {
				var e = [];
				return $(this.keyFramesArr).each(function(t, n) {
					var r = n.getData();
					e.push(r)
				}), {
					id: this.id,
					spriteName: this.spriteName,
					spriteClassName: this.spriteClassName,
					spriteCustomSetting: this.spriteCustomSetting,
					spriteImgFileName: this.spriteImgFileName,
					spriteImgUrl: this.spriteImgUrl,
					stageId: this.stageId,
					isControllerPlay: this.isControllerPlay,
					frameDuration: this.frameDuration,
					frameTotalDuration: this.frameTotalDuration,
					totalFramesCount: this.totalFramesCount,
					frameLength: this.frameLength,
					keyFramesDataList: e,
					emitType: this.emitType,
					emitEventName: this.emitEventName,
					repeatMode: this.repeatMode,
					repeatTime: this.repeatTime,
					animationEndEventName: this.animationEndEventName,
					animationEndJumpNext: this.animationEndJumpNext,
					isListenOnce: this.isListenOnce,
					controllerMode: this.controllerMode
				}
			},
			setData: function(e) {
				var n = this;
				this.stageId = e.stageId, this.id = e.id || t.getRandomId(), this.frameTotalDuration = e.frameTotalDuration || 210, this.frameDuration = e.frameDuration || .1, this.totalFramesCount = this.frameTotalDuration / this.frameDuration, this.frameLength = e.frameLength || 12, this.spriteName = e.spriteName || "", this.spriteClassName = e.spriteClassName || "", this.spriteImgUrl = e.spriteImgUrl, this.spriteImgFileName = e.spriteImgFileName, this.spriteCustomSetting = e.spriteCustomSetting, this.framesArr = [], this.keyFramesArr = [], this.emitType = e.emitType || "none", this.emitEventName = e.emitEventName || "", this.repeatMode = e.repeatMode, this.repeatTime = e.repeatTime, this.isListenOnce = e.isListenOnce, this.animationEndEventName = e.animationEndEventName, this.animationEndJumpNext = e.animationEndJumpNext, this.isControllerPlay = typeof e.isControllerPlay == "undefined" ? !0 : e.isControllerPlay, this.controllerMode = e.controllerMode || 0
			},
			getSetting: function() {
				return {
					frameTotalDuration: this.frameTotalDuration,
					frameDuration: this.frameDuration,
					totalFramesCount: this.totalFramesCount,
					frameLength: this.frameLength,
					spriteName: this.spriteName,
					spriteClassName: this.spriteClassName,
					spriteImgUrl: this.spriteImgUrl,
					spriteImgFileName: this.spriteImgFileName,
					spriteCustomSetting: $.extend({}, this.spriteCustomSetting),
					emitType: this.emitType,
					emitEventName: this.emitEventName,
					repeatMode: this.repeatMode,
					repeatTime: this.repeatTime,
					isListenOnce: this.isListenOnce,
					animationEndEventName: this.animationEndEventName,
					animationEndJumpNext: this.animationEndJumpNext,
					isControllerPlay: this.isControllerPlay,
					controllerMode: this.controllerMode,
					stageId: this.stageId
				}
			},
			setControllerPlayMode: function(e) {
				this.isControllerPlay = e
			},
			moveFrameMarkByIndex: function(e) {
				this.frameMark.updateCurrentPositionByFrameIndex(e)
			},
			setSpriteName: function(e) {
				this.spriteName = e, this.spriteNameContainer.html(e)
			},
			setSpriteClassName: function(e) {
				this.spriteClassName = e
			},
			setSpriteControllerMode: function(e) {
				this.controllerMode = e, $.each(this.keyFramesArr, function(t, n) {
					n.updateCssProperties(e)
				})
			},
			setSpriteImg: function(e, t) {
				this.spriteImgFileName = e, this.spriteImgUrl = t
			},
			setSpriteCustomSetting: function(e) {
				this.spriteCustomSetting = e
			},
			setEndActionFlag: function() {
				this.animationEndEventName ? this.setEndEventFlag(this.animationEndEventName) : this.removeEndEventFlag(), this.animationEndJumpNext ? this.setEndJumpNextFlag() : this.removeEndJumpNextFlag()
			},
			setEndJumpNextFlag: function() {
				var e = this.getFramesBarOlElement();
				this.endJumpNextFlag || (this.endJumpNextFlag = $("<div></div>", {
					"class": "framesbar-end-jump-next-flag glyphicon glyphicon-arrow-down"
				})), this.endJumpNextFlag.appendTo(e)
			},
			removeEndJumpNextFlag: function() {
				this.endJumpNextFlag && (this.endJumpNextFlag.remove(), this.endJumpNextFlag = null)
			},
			setEndEventFlag: function(e) {
				debugger;
				var t = this.getFramesBarOlElement();
				this.endEventFlag || (this.endEventFlag = $("<div></div>", {
					"class": "framesbar-end-event-flag"
				})), this.endEventFlag.html("end:" + e), this.endEventFlag.appendTo(t)
			},
			removeEndEventFlag: function() {
				this.endEventFlag && (this.endEventFlag.remove(), this.endEventFlag = null)
			},
			setAnimationEndAction: function(e) {
				this.animationEndEventName = e.actionEventName, this.animationEndJumpNext = e.actionJumpNext, this.setEndActionFlag()
			},
			getAnimationEndJumpNext: function() {
				return this.animationEndJumpNext
			},
			getAnimationEndEventName: function() {
				return this.animationEndEventName
			},
			setRepeatMode: function(e) {
				this.repeatMode = e
			},
			getRepeatMode: function() {
				return this.repeatMode
			},
			setRepeatTime: function(e) {
				this.repeatTime = e
			},
			getRepeatTime: function(e) {
				return this.repeatTime
			},
			selectFirstKeyFrame: function() {
				return this.keyFramesArr[0]
			},
			setAnimationEmitType: function(e, t) {
				var n;
				this.emitType = e, this.emitEventName = t;
				var r = this.getFramesBarElement();
				e == "none" ? (n = g.getCommondFramesBarContainer(this.stageId), n.append(r)) : e == "eventEmit" && (n = g.getEventFramesBarContainer(t, this.stageId), n.append(r))
			},
			getLeftRightKeyFrame: function(e) {
				var t = this,
					n = t.getKeyFrames(),
					r, i;
				for (var s = 0, o = n.length; s < o; s++) {
					kf = n[s];
					if (kf.index < e.index) r = kf;
					else if (kf.index > e.index) {
						i = kf;
						break
					}
				}
				return r || (r = n[0]), {
					l_kf: r,
					r_kf: i
				}
			},
			getLastKeyFrame: function(e) {
				var t = this.getKeyFrames(),
					n;
				if (!e) return t[t.length - 1];
				for (var r = 0, i = t.length; r < i; r++) {
					if (!(t[r].index < e)) break;
					n = t[r]
				}
				return n
			},
			deleteKeyFrameById: function(e) {
				var t = this.keyFramesArr,
					n;
				for (var r = 0; r < t.length; r++) {
					n = t[r];
					if (n.id == e) {
						n.remove(), t.splice(r, 1);
						return
					}
				}
			},
			createFrame: function() {
				return new u({
					index: this.framesArr.length,
					framesbar: this,
					frameLength: this.frameLength
				})
			},
			getFrameByIndex: function(e) {
				return this.framesArr[e]
			},
			getFrameById: function(e) {
				var t = this.framesArr;
				for (var n = 0, r = t.length; n < r; n++)
					if (t[n].id == e) return t[n]
			},
			getKeyFrameById: function(e) {
				var t = this.keyFramesArr;
				for (var n = 0, r = t.length; n < r; n++)
					if (t[n].id == e) return t[n]
			},
			getKeyFrames: function() {
				return this.keyFramesArr = this.keyFramesArr.sort(function(e, t) {
					return e.index > t.index
				})
			},
			getFirstKeyFrame: function() {
				return this.keyFramesArr[0]
			},
			addKeyFrame: function(e, t) {
				t = {
					display: t.display,
					width: t.width,
					height: t.height,
					easing: t.easing,
					x: t.x,
					y: t.y,
					backgroundColor: t.backgroundColor || "transparent",
					rotateZ: t.rotateZ,
					rotateX: t.rotateX,
					rotateY: t.rotateY,
					skewX: t.skewX,
					skewY: t.skewY,
					perspective: t.perspective,
					opacity: t.opacity,
					customSetting: t.customSetting,
					controllerMode: t.controllerMode,
					initialWidth: t.initialWidth,
					initialHeight: t.initialHeight
				};
				var n = l ? l : f;
				if (n) var r = n.frame ? n.frame.framesbar : n.framesbar;
				var i, s;
				typeof e == "object" ? (i = e, s = i.frame) : (s = this.getFrameByIndex(e), s.keyFrame && this.removeKeyFrameByIndex(s.index), i = new o({
					index: e,
					frame: s,
					setting: t
				})), s.setKeyFrame(i), this.keyFramesArr.push(i);
				if (!i.setting) {
					var u = this.getLastKeyFrame(i.index);
					u && u.setting && i.setSetting(u.setting)
				}
				return $(window).trigger("addKeyFrame", {
					keyFrame: i
				}), i
			},
			select: function() {
				var e = this.getFramesBarElement();
				if (e.hasClass("selected")) return;
				console.log("Framsbar selected"), e.addClass("selected"), $(window).trigger("framesBarSelect", {
					selectedFramesBar: this
				}), $(window).trigger("afterFramesBarSelect", {
					selectedFramesBar: this
				})
			},
			unSelect: function() {
				var e = this.getFramesBarElement();
				if (!e.hasClass("selected")) return;
				e.removeClass("selected"), $(window).trigger("framesBarUnSelect", {
					unSelectedFramesBar: this
				})
			},
			getFramesBarElement: function() {
				var e = this.emitType == "eventEmit" ? a + "_event_" + this.emitEventName + "_" + this.id : a + "_" + this.id;
				if (!this.element || !this.element.length) this.element = $("#" + e);
				return this.element
			},
			addFrame: function() {
				this.framesArr.push(this.createFrame())
			},
			_initFrameArr: function() {
				var e = 0;
				while (e < this.totalFramesCount) this.addFrame(), e++
			},
			_initKeyFrameArr: function(e) {
				var t = this;
				$(e).each(function(e, n) {
					t.addKeyFrame(n.index, n.setting)
				})
			},
			bind: function() {
				var e = this;
				$(window).on("playAnimation", function() {
					e.lockCheckBox.prop("disabled", !0), e.hideCheckBox.prop("disabled", !0), e.deleteBtn.prop("disabled", !0)
				}), $(window).on("stopAnimation", function() {
					e.lockCheckBox.prop("disabled", !1), e.hideCheckBox.prop("disabled", !1), e.deleteBtn.prop("disabled", !1)
				})
			},
			setHideCheckBox: function(e) {
				this.hideCheckBox.prop("checked", e)
			},
			setLockCheckBox: function(e) {
				this.lockCheckBox.prop("checked", e)
			},
			updateTotalDuration: function(e) {
				var t = this.frameTotalDuration;
				this.frameTotalDuration = Number(Number(e).toFixed(1)), g.setFrameDurationInput(this.frameTotalDuration), this.totalFramesCount = Math.round(Number(this.frameTotalDuration) / this.frameDuration), this._updateVisibleLength(), this.frameMark.updateTotalDurationAndFramesCount(e, this.totalFramesCount);
				if (t > e) {
					var n = this.framesArr[this.framesArr.length - 1];
					n.keyFrame ? n.keyFrame.select() : n.select()
				}
			},
			_updateVisibleLength: function() {
				var e = this.framesArr,
					t = this.keyFramesArr,
					n = this.totalFramesCount,
					r = this.frameMark;
				if (n < e.length)
					for (var i = 0; i < e.length; i++) {
						var s = e[i];
						s.index + 1 > n && (s == f && (f = null), s.keyFrame && (l == s.keyFrame && (l = null), this.removeKeyFrameByIndex(s.index)), this.removeFrameByIndex(s.index), i--)
					} else if (n > e.length) {
						var o = n - e.length;
						for (var i = 0; i < o; i++) this.addFrame()
					}
				r.element.appendTo(r.container), this.totalFramesCount = n
			},
			getFramesBarOlElement: function() {
				var e = this.getFramesBarElement();
				return $(e.find(".frames-bar", e))
			},
			render: function() {
				var t = this.emitType == "eventEmit" ? a + "_event_" + this.emitEventName + "_" + this.id : a + "_" + this.id;
				this.renderId = t;
				var n = e[a]({
						id: t,
						spriteName: this.spriteName,
						emitType: this.emitType,
						emitEventName: this.emitEventName
					}),
					r;
				this.emitType == "eventEmit" ? r = g.getEventFramesBarContainer(this.emitEventName, this.stageId) : r = g.getCommondFramesBarContainer(this.stageId), r.append(n);
				var i = this.getFramesBarElement();
				this.deleteBtn = $(".delete-frames-bar-button"), this.lockCheckBox = $(".lock-frames-bar-checkbox", i), this.hideCheckBox = $(".hide-frames-bar-checkbox", i), this.spriteNameContainer = $(".frames-bar-name", i), console.log("Single FramesBar Render!")
			},
			show: function() {
				var e = this.getFramesBarElement();
				e.show()
			},
			hide: function() {
				var e = this.getFramesBarElement();
				e.hide()
			},
			removeFrameByIndex: function(e) {
				for (var t = 0; t < this.framesArr.length; t++)
					if (this.framesArr[t].index == e) {
						this.framesArr[t].remove(), this.framesArr.splice(t, 1);
						return
					}
			},
			removeKeyFrameByIndex: function(e) {
				for (var t = 0; t < this.keyFramesArr.length; t++)
					if (this.keyFramesArr[t].index == e) {
						this.keyFramesArr[t].remove(), this.keyFramesArr.splice(t, 1);
						return
					}
				var n = this.getFrameByIndex(e);
				n.keyFrame = null
			},
			remove: function() {
				var e = this.getFramesBarElement();
				e.remove(), $.each(this.framesArr, function(e, t) {
					t && t.remove()
				}), $.each(this.keyFramesArr, function(e, t) {
					t && t.remove()
				}), this.framesArr = [], this.keyFramesArr = [], $(window).trigger("framesBarRemove", {
					framesBar: this
				})
			}
		}, g.init = function(e) {
			e = e || {}, this.framesBarWraper = $(".frames-bar-wraper"), this.framesBarContainer = $(".frames-bar-container"), this.eventEmitFramsBarWrap = $(".event-emit-frames-bar-container"), this.framesToolBarContainer = $(".frames-tool-bar-container"), this.durationInput = $(".frames-bar-duration-input"), this.framesBarRepeatTimeInput = $(".framesbar-repeat-time"), this.framesBarRepeatModeInput = $(".framesbar-repeat-mode"), this.framesBarControllerPlayInput = $(".framesbar-controller-play"), this.framesBarWraperContainer = $(".frames-bar-wraper-container"), this.bind(), this.setData(e), i.init(), this.initFramesBarTimeMark()
		}, g.getData = function() {
			var e = [];
			return $(this.framesBarArr).each(function(t, n) {
				var r = n.getData();
				e.push(r)
			}), {
				frameDuration: this.frameDuration,
				frameTotalDuration: this.frameTotalDuration,
				totalFramesCount: this.totalFramesCount,
				frameLength: this.frameLength,
				framesBarDataArr: e,
				currentFrameId: f && f.id,
				currentKeyFrameId: l && l.id,
				currentFramesBarId: c && c.id,
				currentFramesBarEmitType: c && c.emitType,
				currentFramesBarEmitEventName: c && c.emitEventName
			}
		}, g.setData = function(e) {
			e = e || {};
			var t = e.framesBarDataArr,
				n = this;
			this.frameDuration = e.frameDuration || .1, this.frameTotalDuration = e.frameTotalDuration || 6, this.totalFramesCount = this.frameTotalDuration / this.frameDuration, this.frameLength = e.frameLength || 12, this.framesBarArr = [], h = null, this.clearDomList(), t && $(t).each(function(e, t) {
				var n = new g(t);
				g.add(n)
			}), e.currentFramesBarId && (c = this.getFramesBarById(e.currentFramesBarId, e.currentFramesBarEmitType, e.currentFramesBarEmitEventName))
		}, g.clearDomList = function() {
			var e = this.framesBarWraper.find(".frames-bar-single-wrap");
			$(e).remove()
		}, g.disableInput = function() {
			this.durationInput.prop("disabled", !0), this.framesBarControllerPlayInput.prop("disabled", !0), this.framesBarRepeatModeInput.prop("disabled", !0), this.framesBarRepeatTimeInput.prop("disabled", !0)
		}, g.enableInputs = function() {
			this.durationInput.prop("disabled", !1), this.framesBarControllerPlayInput.prop("disabled", !1), this.framesBarRepeatModeInput.prop("disabled", !1), this.framesBarRepeatTimeInput.prop("disabled", !1)
		}, g.bind = function() {
			var e = this;
			$(window).on("confirmAction", function() {
				var e = arguments[1];
				e.actionEmitType == "animationEnd" && c && c.setAnimationEndAction(e)
			}), $(window).on("framesBarSelect", function() {
				var t = arguments[1],
					n = t.selectedFramesBar,
					r = n.getRepeatMode(),
					i = e.getFramesBarsByStageId(n.stageId);
				$.each(i, function(t, r) {
					e.isSameFramesBar(r, n) || r.reset()
				}), c && !e.isSameFramesBar(n, c) && c.unSelect(), c = n, e.setFrameDurationInput(n.frameTotalDuration), e.setRepeatCheckBoxAndInput(r, n.repeatTime), e.setControllerPlayModeCheckBox(n.isControllerPlay)
			}), $(window).on("afterSpriteSelect", function() {
				var t = arguments[1],
					n = t.selectedSprite,
					r = n.getCommondFramesBar() || e.getFramesBarById(n.id, "none", ""),
					i, s = n.getPlayingFramesBarRenderId();
				s ? i = e.getFramesBarByRenderId(s) : c && c.emitEventName && (i = n.getEventFramesBar(c.emitEventName));
				if (!i)
					if (r) i = r;
					else {
						var o = e.getFramesBarById(n.id);
						if (!o.length) {
							c && (c.unSelect(), c = null), l && (l.unSelect(), l = null), f && (f.unSelect(), f = null);
							return
						}
						i = o[0]
					}
				e.movePositionTo(i);
				var u = i.frameMark,
					a = u.getCurrentIndex(),
					h = i.getFrameByIndex(a);
				h.keyFrame ? h.keyFrame.select() : h.select()
			}), $(window).on("stopAnimation", function() {
				var t = arguments[1],
					n = p || c;
				if (t.isReset && n) {
					var r = n.getKeyFrames()[0];
					r.select()
				}
				p = null, e.enableInputs()
			}), $(window).on("pauseAnimation", function() {
				var t = arguments[1],
					n = e.getFramesBars();
				$.each(n, function(e, n) {
					n.stageId == t.stageId && n.running && n.frameMark.pause()
				})
			}), $(window).on("resumeAnimation", function() {
				var t = arguments[1],
					n = e.getFramesBars();
				$.each(n, function(e, n) {
					n.stageId == t.stageId && n.frameMark.isPaused && n.frameMark.play()
				})
			}), $(window).on("pageSelect", function() {
				var t = arguments[1],
					n = t.selectedPage.id,
					r, i, s, o;
				e.updateFramesBarsVisibility(n);
				var u = g.getFramesBarsByStageId(n);
				if (u.length) {
					for (var a = 0; a < u.length; a++) {
						var f = u[a];
						if (f.emitType == "none") {
							var l = f.getKeyFrames();
							o = l[l.length - 1];
							if (!s || o.index > s.index) s = o
						}
					}
					s && s.select()
				}
			}), $(window).on("spriteDelete", function() {
				var t = arguments[1],
					n = t.sprite.id;
				e.removeFramesBarById(n), e.updateFramesBarsVisibility(t.sprite.stage.id)
			}), $(window).on("playAnimation", function() {
				var t = arguments[1];
				p || (p = c), c && (c.unSelect(), c = null), l && (l.unSelect(), c = null), f && (f.unSelect(), f = null);
				var n = t.framesBar,
					r = e.getFramesBars();
				$.each(r, function(t, r) {
					r.stageId == n.stageId && e.isSameTypeFramesBar(r, n) && (r.frameMark.stop(), r.frameMark.play(), r.running = !0)
				}), e.disableInput()
			}), $(window).on("animationInteration", function() {
				var e = arguments[1],
					t = e.framesBar;
				t.frameMark.stop(), t.frameMark.play()
			}), $(window).on("spriteSingleTextChange", function() {
				var t = arguments[1],
					n = t.sprite,
					r = t.resetInitialSize,
					i;
				debugger;
				if (r) {
					var s = e.getFramesBarById(n.id);
					$.each(s, function(e, t) {
						var r = t.getKeyFrames();
						$.each(r, function(e, t) {
							scaleX = n.initialSetting.width / t.setting.initialWidth, scaleY = n.initialSetting.height / t.setting.initialHeight, t.setSetting({
								width: t.setting.width * scaleX,
								height: t.setting.height * scaleY,
								initialWidth: n.initialSetting.width,
								initialHeight: n.initialSetting.height
							})
						})
					})
				}
			}), $(window).on("spritePositionUpdate", function() {
				var t = arguments[1],
					n = t.sprite,
					r = n.getSetting(),
					i = n.initialSetting.width,
					s = n.initialSetting.height;
				if (!c) {
					p = n.getCommondFramesBar();
					if (!p) {
						var o = e.getFramesBarById(n.id);
						if (!o || !o.length) return;
						p = o[0]
					}
					h = 0
				} else {
					var u = c.getFirstKeyFrame();
					if (!u) return;
					var a = u.getSetting();
					c.spriteImgFileName = r.imgFileName, c.spriteImgUrl = r.imgUrl, r.initialWidth == null && (r.initialWidth = a.initialWidth), r.initialHeight == null && (r.initialHeight = a.initialHeight);
					var h = l ? l.index : f.index,
						p;
					n.id == c.id ? p = c : c.emitEventName ? p = n.getEventFramesBar(c.emitEventName) : p = n.getCommondFramesBar();
					if (!p) return
				}
				frame = p.getFrameByIndex(h);
				if (!frame) return;
				frame.keyFrame ? (r.easing = frame.keyFrame.setting.easing, frame.keyFrame.setSetting(r)) : (r.easing = "linear", p.addKeyFrame(frame.index, r)), frame.keyFrame.select()
			}), $(window).on("keyFrameSettingChanged", function() {
				var e = arguments[1];
				if (!c) return;
				var t = c.getFirstKeyFrame(),
					n = t.getSetting();
				e.keyFrameSetting.controllerMode = c.controllerMode, e.keyFrameSetting.initialWidth == null && (e.keyFrameSetting.initialWidth = n.initialWidth), e.keyFrameSetting.initialHeight == null && (e.keyFrameSetting.initialHeight = n.initialHeight);
				if (l) l.setSetting(e.keyFrameSetting);
				else if (f) {
					var r = f.index,
						i = f.framesbar.addKeyFrame(r, e.keyFrameSetting);
					i.select()
				}
			}), $(window).on("spriteSettingChanged", function() {
				if (c) {
					var t = arguments[1],
						n = t.spriteSetting,
						r = c.id,
						i = e.getFramesBarById(r);
					$.each(i, function(e, t) {
						t.setSpriteName(n.name), t.setSpriteClassName(n.className), t.setSpriteControllerMode(n.controllerMode), t.setSpriteCustomSetting(n.spriteCustomSetting), t.setSpriteImg(n.imgFileName, n.imgUrl)
					})
				}
			}), $(window).on("keyFrameSelect", m), $(window).on("frameSelect", m), $(window).on("framesBarRemove", function() {
				var t = arguments[1],
					n = t.framesBar;
				e.updateFramesBarsVisibility(n.stageId), c == n && (c = null), f && f.framesbar == n ? f = null : l && l.frame && l.frame.framesbar == n && (l = null);
				var r = e.getFramesBarsByStageId(n.stageId),
					i = r[0];
				if (i) {
					var s = i.getFirstKeyFrame();
					s && s.select()
				}
			}), $(window).on("spriteDragStart", function() {
				var e = arguments[1],
					t = e.sprite,
					n;
				c.emitEventName && (n = t.getEventFramesBar(c.emitEventName)), n || (n = t.getCommondFramesBar());
				var r = f ? f.index : l.index,
					i = n.getFrameByIndex(r);
				i.select()
			}), $(window).on("framesBarAnimationEnd", function() {
				var e = arguments[1];
				e.framesBar && (e.framesBar.running = !1)
			}), $(this.framesBarWraper).on("click", ".delete-frames-bar-button", function(n) {
				if (!window.confirm("是否删除该时间轴？")) return;
				var r = $(n.target).closest(".frames-bar-single-wrap"),
					i = r.data("emit-type"),
					s = r.data("emit-event-name"),
					o = t.getOriginId(r.prop("id"));
				e.removeFramesBarById(o, i, s)
			}), this.framesBarRepeatTimeInput.on("change", function(e) {
				var t = $(e.target).val();
				c && c.setRepeatTime(t || "infinite")
			}), this.framesBarRepeatModeInput.on("change", function(t) {
				var n = e.framesBarRepeatTimeInput,
					r = $(t.target),
					i = r[0].checked,
					s = g.getCurrentFramesBar();
				if (!s) return;
				s.setRepeatMode(i), i ? n.show() : n.hide()
			}), this.framesBarControllerPlayInput.on("change", function(e) {
				var t = $(e.target),
					n = t[0].checked;
				c && c.setControllerPlayMode(n)
			}), this.durationInput.on("change", function() {
				if (!c) return;
				var t = Number(e.durationInput.val());
				if (isNaN(t) || t === 0 || t > 10) return;
				c.updateTotalDuration(t)
			}), $(document.body).on("click", ".frames-bar", function(n) {
				var r = $(n.target),
					i = r.closest(".frames-bar-single-wrap");
				if (i.length) {
					var s = t.getOriginId(i.attr("id")),
						o = i.data("emit-type"),
						u = i.data("emit-event-name"),
						a = e.getFramesBarById(s, o, u);
					if (r.hasClass("frame")) {
						var f = t.getOriginId(r.attr("id")),
							l = a.getFrameById(f);
						l.keyFrame ? r = $(r.children()[0]) : l.select()
					}
					if (r.hasClass("keyframe")) {
						var c = t.getOriginId(r.attr("id")),
							h = a.getKeyFrameById(c);
						h.select()
					}
				}
			}), this.framesBarWraper.on("mousedown", ".frames-bar", function(n) {
				if (n.button == 2) {
					var r = $(this).closest(".frames-bar-single-wrap"),
						i = t.getOriginId(r.attr("id")),
						s = r.data("emit-type"),
						o = r.data("emit-event-name"),
						u = g.getFramesBarById(i, s, o),
						a = $(n.target);
					if (a.hasClass("frame")) {
						var f = t.getOriginId(a.attr("id")),
							l = u.getFrameById(f);
						l.select(), e.showDropMenu(n)
					} else if (a.hasClass("keyframe")) {
						var c = t.getOriginId(a.attr("id")),
							h = u.getKeyFrameById(c);
						h.select(), e.showDropMenu(n)
					}
				}
			}), this.framesBarWraper.on("contextmenu", function(e) {
				e.preventDefault()
			})
		}, g.movePositionTo = function(e) {
			if (e.emitType != "none") return;
			var t = this.framesBarContainer,
				n = $(".common-stage-container");
			if (n.length) {
				var r = n.offset().top,
					i = e.getFramesBarElement(),
					s = i.offset().top;
				t.prop("scrollTop", s - r)
			}
		}, g.setRepeatCheckBoxAndInput = function(e, t) {
			var n = this.framesBarRepeatTimeInput;
			this.framesBarRepeatModeInput.prop("checked", e || !1), e ? (n.show(), n.val(t)) : (n.hide(), n.val(""))
		}, g.setControllerPlayModeCheckBox = function(e) {
			this.framesBarControllerPlayInput.prop("checked", e)
		}, g.getCurrentFramesBar = function() {
			return c
		}, g.deleteFramesBarByStageId = function(e) {
			var t = this.framesBarArr;
			for (var n = 0; n < t.length; n++) t[n].stageId == e && (t[n].remove(), t.splice(n, 1), n--)
		}, g.showFramesBarsByStageId = function(e) {
			var t = this.getFramesBarsByStageId(e);
			$.each(t, function(e, t) {
				t.show()
			});
			var n = t[0];
			n ? this.enableToolBar() : this.disableToolBar()
		}, g.enableToolBar = function() {
			this.framesToolBarContainer.find("input").prop("disabled", null)
		}, g.disableToolBar = function() {
			this.framesToolBarContainer.find("input").prop("disabled", 1)
		}, g.updateEventFramesBarContainer = function() {
			var e = $(".event-framesbar-container");
			e.each(function(e, t) {
				t = $(t);
				var n = $(t.find(".frames-bar")),
					r = !0;
				!n.length || n.each(function(e, t) {
					$(t).css("display") != "none" && (r = !1)
				}), r ? t.hide() : t.show()
			})
		}, g._updateVisbilityByStage = function(e, t) {
			$.each(e, function(e, n) {
				e == t ? n.container.show() : n.container.hide()
			})
		}, g.updateFramesBarsVisibility = function(e) {
			this._updateVisbilityByStage(v, e), this._updateVisbilityByStage(d, e)
		}, g.getFramesBarsByStageId = function(e) {
			var t = [];
			return $.each(this.framesBarArr, function(n, r) {
				r.stageId == e && t.push(r)
			}), t
		}, g.getFramesBarsByEmitEventName = function(e) {
			var t = [];
			return $.each(this.framesBarArr, function(n, r) {
				r.emitEventName == e && t.push(r)
			}), t
		}, g.getCommondFramesBarContainer = function(e) {
			var t = this.framesBarContainer;
			if (!v[e]) {
				var n = $("<div></div>", {
					"class": "common-stage-container"
				});
				n.data("stageId", e), t.append(n), v[e] = {
					container: n
				}
			}
			return v[e].container
		}, g.getEventFramesBarContainer = function(e, t) {
			var n = this.eventEmitFramsBarWrap;
			if (!d[t]) {
				var r = $("<div></div>", {
					"class": "event-stage-container"
				});
				r.data("stageId", t), n.append(r), d[t] = {
					container: r,
					framesBarsContainerMap: {}
				}
			}
			if (!d[t].framesBarsContainerMap[e]) {
				var i = d[t].container,
					s = $("<div></div>", {
						"class": "event-framesbar-container"
					}),
					o = $("<div></div>", {
						"class": "event-name-framesbar-tag"
					});
				o.text(e), s.append(o), s.data("event-name", e), i.append(s), d[t].framesBarsContainerMap[e] = s
			}
			return d[t].framesBarsContainerMap[e]
		}, g.showDropMenu = function(e) {
			var t = [];
			this.dropMenu || (this.dropMenu = this.createDropMenu()), (f || l) && h && h.frame && h.frame.framesbar.id == c.id && t.push({
				text: "粘贴",
				value: "pasteKeyFrame"
			}), l && (t.push({
				text: "复制",
				value: "copyKeyFrame"
			}), l.index > 0 && t.push({
				text: "删除关键帧",
				value: "deleteKeyFrame"
			}));
			if (l || f) t.push({
				text: "设置动画结束行为",
				value: "setAnimationEndAction"
			}), t.push({
				text: "插入预设动画",
				value: "addPresetAnimation"
			}), t.push({
				text: "删除时间轴",
				value: "deleteFramesBarEvent"
			});
			this.dropMenu.show({
				items: t,
				left: e.pageX,
				top: e.pageY
			})
		}, g.getFramesBarById = function(e, t, n) {
			var r = this.framesBarArr,
				i, s = [];
			for (var o = 0, u = r.length; o < u; o++) {
				i = r[o];
				if (!t) i.id == e && s.push(i);
				else if (i.id == e && i.emitType == t && i.emitEventName == n) return i
			}
			if (!t) return s
		}, g.removeFramesBarById = function(e, t, n) {
			var r = this.framesBarArr,
				i;
			for (var s = 0; s < r.length; s++) {
				i = r[s];
				if (i.id == e) {
					if (t && t != i.emitType || n && n != i.emitEventName) continue;
					r.splice(s, 1), i.remove(), s--;
					if (i.emitEventName) {
						var o = i.stageId,
							u = this.getEventFramesBarContainer(i.emitEventName, o);
						$(".frames-bar-single-wrap", u).length || (d[o].framesBarsContainerMap[i.emitEventName] = null, u.remove())
					}
				}
			}
		}, g.getCurrentFrame = function() {
			return l ? l.frame : f
		}, g.getFramesBars = function() {
			return this.framesBarArr
		}, g.getCommonFramesBars = function() {
			return this.framesBarArr.filter(function(e) {
				return e.emitType == "none"
			})
		}, g.getEventEmitFramesBars = function() {
			return this.framesBarArr.filter(function(e) {
				return e.emitType == "eventEmit"
			})
		}, g.add = function(e, t, n, r) {
			var i, s, o;
			return e instanceof g ? o = e : (i = e.id, s = e.stage.id, t = t || "none", o = new g({
				id: i,
				emitType: t,
				emitEventName: n,
				framesArr: this.framesArr,
				stageId: s,
				frameTotalDuration: this.frameTotalDuration,
				frameDuration: this.frameDuration,
				frameLength: this.frameLength,
				isListenOnce: r,
				spriteName: e.name,
				spriteClassName: e.className,
				spriteImgUrl: e.imgUrl,
				spriteImgFileName: e.imgFileName,
				spriteCustomSetting: e.spriteCustomSetting,
				controllerMode: e.controllerMode
			})), this.framesBarArr.push(o), this.updateFramesBarsVisibility(o.stageId), $(window).trigger("framesBarAdd", {
				framesBar: o
			}), o.emitType == "none" && this.framesBarContainer.prop("scrollTop", 1e4), o
		}, g.getFramesBarByRenderId = function(e) {
			var t;
			return $(this.framesBarArr).each(function(n, r) {
				r.renderId == e && (t = r)
			}), t
		}, g.isSameFramesBar = function(e, t) {
			return e.id == t.id && e.emitType == t.emitType && e.emitEventName == t.emitEventName
		}, g.isSameTypeFramesBar = function(e, t) {
			return e.emitType == t.emitType && e.emitEventName == t.emitEventName
		}, g.createDropMenu = function() {
			var e = this;
			return new n({
				container: $(".frames-bar-wraper"),
				callback: function(t, n) {
					var r = n.value;
					if (r == "copyKeyFrame") h = l;
					else if (r == "deleteKeyFrame") {
						if (l) {
							if (!window.confirm("是否删除该关键帧？")) return;
							c.deleteKeyFrameById(l.id);
							var o = c.getLastKeyFrame(l.index);
							o.select()
						}
					} else if (r == "pasteKeyFrame") {
						var u = f ? f : l.frame;
						debugger;
						var a = c.addKeyFrame(u.index, h.setting);
						a.select()
					} else if (r == "setAnimationEndAction") i.show("animationEnd", {
						actionEventName: c.animationEndEventName,
						actionJumpNext: c.animationEndJumpNext
					});
					else if (r == "addPresetAnimation") s.show();
					else if (r == "deleteFramesBarEvent") {
						if (!window.confirm("是否删除该时间轴？")) return;
						e.removeFramesBarById(c.id, c.emitType, c.emitEventName)
					}
				}
			})
		}, g.setFrameDurationInput = function(e) {
			this.durationInput.val(e)
		}, g.getFramesBars = function() {
			return this.framesBarArr
		}, g.initFramesBarTimeMark = function() {
			var e = $(".frames-bar-timeline");
			for (var t = 0; t < 21; t++) {
				var n = $("<li></li>").addClass("time-mark").html(t * 5);
				e.append(n), t == 0 ? n.css({
					left: -3
				}) : n.css({
					left: Math.floor((t * 5 - 1) * 13 + (12 - n.width() * .8) / 2)
				})
			}
			e.css({
				width: 1300
			})
		}, g.remove = function() {
			$.each(this.framesBarArr, function(e, t) {
				t && t.remove()
			}), this.framesBarArr = [], c = null, f = null, l = null
		}, g
	}), define("csseditor", ["tmpl", "util", "color_picker"], function(e, t, n) {
		var r = "csseditor",
			i, s, o, u = {
				init: function() {
					this.container = $(".css-editor"), this.render(), this.keyFrameSettingContainer = $(".keyframe-setting-container"), this.spriteSettingContainer = $(".sprite-setting-container"), this.show_select = $(".show-select"), this.input_img_text = $(".img-select-text-input"), this.input_img_label = $(".img-select-text"), this.input_img = $(".img-select-input"), this.input_width = $(".position-width-input"), this.input_height = $(".position-height-input"), this.input_x = $(".position-x-input"), this.input_y = $(".position-y-input"), this.input_background_color = $(".background-image-input"), this.select_background_color = $(".select-background-color-btn"), this.input_skewx = $(".skewx-input"), this.input_skewy = $(".skewy-input"), this.input_rotatez = $(".rotatez-input"), this.input_rotatex = $(".rotatex-input"), this.input_rotatey = $(".rotatey-input"), this.input_perspective = $(".perspective-input"), this.input_opacity = $(".opacity-input"), this.input_easing = $(".ease-select"), this.add_custom_setting = $(".add-custom-setting"), this.add_sprite_custom_setting = $(".add-sprite-custom-setting"), this.custom_style_list = $(".custom-style-list"), this.sprite_custom_style_list = $(".sprite-custom-style-list"), this.input_class = $(".class-input"), this.input_name = $(".name-input"), this.input_sprite_easing = $(".sprite-ease-select"), this.controllerModeSelect = $(".controller-mode-select"), this.controllerModeSelect.data("selectedValue", "比例缩放"), this.allInput = $("input", this.container), this.allSelect = $(".dropdown-toggle", this.container), this.initColorPicker(), this.bind(), this.reset()
				},
				setWorkId: function(e) {
					o = e
				},
				initColorPicker: function() {
					var e = this;
					this.input_background_color.colpick({
						layout: "hex",
						colorScheme: "dark",
						color: t.colorHex(e.input_background_color.val()),
						submit: 0,
						onChange: function(t) {
							var t = arguments[2],
								n = arguments[5],
								r = "rgba(" + t.r + "," + t.g + "," + t.b + ",1)";
							e.input_background_color.val(r);
							if (n) return;
							e.setKeyFrameSettingWithInputValue()
						}
					})
				},
				bind: function() {
					var e = this;
					this.custom_style_list.on("click", ".custom-style-delete-btn", function(t) {
						if (!window.confirm("是否删除该自定义样式？")) return;
						var n = $(this).closest("tr");
						n.remove(), e.setKeyFrameSettingWithInputValue()
					}), this.sprite_custom_style_list.on("click", ".custom-style-delete-btn", function(t) {
						if (!window.confirm("是否删除该自定义样式？")) return;
						var n = $(this).closest("tr");
						n.remove(), e.setSpriteSettingWithInputValue()
					}), this.add_custom_setting.on("click", function() {
						e.addCustomStyleItem()
					}), this.add_sprite_custom_setting.on("click", function() {
						e.addSpriteCustomStyleItem()
					}), this.input_sprite_easing.on("hide.bs.dropdown", function(t) {
						e.setSpriteSettingWithInputValue()
					}), this.input_easing.on("hide.bs.dropdown", function(t) {
						e.setKeyFrameSettingWithInputValue()
					}), this.show_select.on("hide.bs.dropdown", function(t) {
						e.setKeyFrameSettingWithInputValue()
					}), this.controllerModeSelect.on("hide.bs.dropdown", function(t) {
						e.setSpriteSettingWithInputValue()
					}), this.input_img.on("change", function(n) {
						var r = new FileReader;
						i = n.target.files[0].name, r.addEventListener("load", function(n) {
							var r = n.target.result,
								s = window.currentMode == "scene" ? 0 : 1;
							t.uploadImg(s, o, r, i, function(t) {
								e.input_img_text.val(t), e.input_img_label.text(i), e.setSpriteSettingWithInputValue()
							})
						}, !1), r.readAsDataURL(this.files[0]), $(n.target).val("")
					}), $(document).on("keydown", function(t) {
						var n = $(t.target),
							r = n.hasClass("opacity-input"),
							i = r ? .1 : 1,
							s, o = t.keyCode,
							u, a;
						if (o == 38 || o == 40) u = $(".input-focus"), u.length == 1 && (a = Number(u.val()), isNaN(a) || (o == 38 ? (s = a + i, r && (s = s.toFixed(1)), u.val(s)) : (s = a - i, r && (s = s.toFixed(1)), u.val(s)), e.setKeyFrameSettingWithInputValue()))
					}), this.container[0].addEventListener("focus", function(e) {
						$(e.target).addClass("input-focus")
					}, !0), this.container[0].addEventListener("blur", function(e) {
						$(e.target).removeClass("input-focus")
					}, !0), this.keyFrameSettingContainer[0].addEventListener("input", function(t) {
						if ($(t.target).attr("type") == "file") return;
						e.setKeyFrameSettingWithInputValue()
					}, !0), this.spriteSettingContainer[0].addEventListener("change", function(t) {
						if ($(t.target).attr("type") == "file") return;
						e.setSpriteSettingWithInputValue()
					}), $(window).on("spriteAdd", function() {
						var t = arguments[1],
							n = t.sprite.getSetting();
						e.setCurrentKeyFrameSetting(n), e.setSpriteSetting(n)
					}), $(window).on("spriteSelect", function() {
						var t = arguments[1],
							n = t.selectedSprite.getSetting();
						e.setCurrentKeyFrameSetting(n), e.setSpriteSetting(n);
						debugger;
						!t.selectedSprite.getCommondFramesBar() && !t.selectedSprite.hasEventFramesBar() ? e.hideControllerModeSelect() : e.showControllerModeSelect()
					}), $(window).on("spriteBackToSingle", function() {
						var t = arguments[1];
						e.hideControllerModeSelect()
					}), $(window).on("spriteSingleTextChange", function() {
						var t = arguments[1];
						e.input_width.val(t.currentWidth), e.input_height.val(t.currentHeight)
					}), $(window).on("framesBarSelect", function() {
						var t = arguments[1],
							n = t.selectedFramesBar;
						n.isSingle ? e.hideControllerModeSelect() : e.showControllerModeSelect();
						debugger;
						e.setSpriteSetting({
							name: n.spriteName,
							className: n.spriteClassName,
							controllerMode: n.controllerMode,
							spriteCustomSetting: n.spriteCustomSetting,
							imgFileName: n.spriteImgFileName,
							imgUrl: n.spriteImgUrl
						}), n.isLock ? e.disable() : (e.enable(), n.isSingle && e.disableControllerModeSelect()), s = n.isLock
					}), $(window).on("addKeyFrame", function() {
						var t = arguments[1],
							n = t.keyFrame;
						e.setCurrentKeyFrameSetting(n.setting)
					}), $(window).on("afterKeyFrameSelect", function() {
						var n = arguments[1],
							r = n.keyFrame;
						e.setCurrentKeyFrameSetting(r.setting), e.show();
						var i = e.input_background_color.val();
						i != "transparent" ? (e.input_background_color.colpickSetColor(t.colorHex(i), undefined, !0), e.input_background_color.val(i)) : e.input_background_color.val("transparent")
					}), $(window).on("afterFrameSelect", function() {
						var n = arguments[1],
							r = n.frame,
							i = r.getCalculatedSetting();
						if (!i) return;
						e.setCurrentKeyFrameSetting(i), r.framesbar.isLock ? e.disable() : e.enable(), s = r.framesbar.isLock, e.show();
						var o = e.input_background_color.val();
						o != "transparent" ? (e.input_background_color.colpickSetColor(t.colorHex(o), undefined, !0), e.input_background_color.val(o)) : e.input_background_color.val("transparent")
					}), $(window).on("spritePositionUpdate", function() {
						var t = arguments[1],
							n = t.sprite.getSetting();
						n.easing = e.currentKeyFrameSetting.easing, e.setCurrentKeyFrameSetting(n), e.setSpriteSetting(n)
					}), $(window).on("playAnimation", function() {
						e.disable()
					}), $(window).on("stopAnimation", function() {
						s || e.enable()
					}), $(window).on("lockStateChanged", function() {
						var t = arguments[1];
						s = t.lock;
						var n = t.isCurrentSprite;
						n && (s ? e.disable() : e.enable())
					})
				},
				hideControllerModeSelect: function() {
					this.controllerModeSelect.closest(".panel-default").hide()
				},
				showControllerModeSelect: function() {
					this.controllerModeSelect.closest(".panel-default").show()
				},
				disableControllerModeSelect: function() {
					this.controllerModeSelect.find("button").prop("disabled", !0)
				},
				enableControllerModeSelect: function() {},
				enable: function() {
					this.allInput.prop("disabled", !1), this.allSelect.prop("disabled", !1)
				},
				disable: function() {
					this.allInput.prop("disabled", !0), this.allSelect.prop("disabled", !0)
				},
				setKeyFrameSettingWithInputValue: function() {
					var e = this,
						t = e.input_width.val(),
						n = {
							display: e.show_select.data("selectedValue") == "隐藏" ? "none" : "block",
							backgroundColor: e.input_background_color.val(),
							width: Number(e.input_width.val()),
							height: Number(e.input_height.val()),
							x: Number(e.input_x.val()),
							y: Number(e.input_y.val()),
							perspective: Number(e.input_perspective.val()),
							rotateZ: Number(e.input_rotatez.val()),
							rotateX: Number(e.input_rotatex.val()),
							rotateY: Number(e.input_rotatey.val()),
							skewX: Number(e.input_skewx.val()),
							skewY: Number(e.input_skewy.val()),
							opacity: Number(e.input_opacity.val()),
							easing: e.input_easing.data("selectedValue") || "linear",
							customSetting: e.getCustomSetting()
						};
					$(window).trigger("keyFrameSettingChanged", {
						keyFrameSetting: n
					})
				},
				setSpriteSettingWithInputValue: function() {
					var e = this,
						t = {
							name: e.input_name.val(),
							className: e.input_class.val(),
							controllerMode: e.controllerModeSelect.data("selectedValue") == "比例缩放" ? 0 : 1,
							spriteCustomSetting: e.getCustomSetting(!0),
							imgFileName: i,
							imgUrl: e.input_img_text.val()
						};
					$(window).trigger("spriteSettingChanged", {
						spriteSetting: t
					})
				},
				createCustomStyleItem: function(e, t) {
					var n = '<tr><td>				<input class="custom-style-name-input form-control" placeholder="属性名" value="' + (typeof e != "undefined" ? e : "") + '">				</td>				<td>				<input class="custom-style-value-input form-control" placeholder="属性值" value="' + (typeof t != "undefined" ? t : "") + '">				</td>				<td>				<button class = "custom-style-delete-btn">					<span class="glyphicon glyphicon-remove-sign"></span>				</button>				</td>			</li>',
						r = $(n);
					return r
				},
				addCustomStyleItem: function(e, t) {
					var n = this.createCustomStyleItem(e, t);
					this.custom_style_list.append(n)
				},
				addSpriteCustomStyleItem: function(e, t) {
					var n = this.createCustomStyleItem(e, t);
					this.sprite_custom_style_list.append(n)
				},
				getCustomSetting: function(e) {
					var t;
					e ? t = this.getSpriteCustomStyleItemDomList() : t = this.getCustomStyleItemDomList();
					var n = {};
					return t.each(function(e, t) {
						var r = $($(t).find(".custom-style-name-input")).val(),
							i = $($(t).find(".custom-style-value-input")).val();
						n[r] = i
					}), n
				},
				getCustomStyleItemDomList: function() {
					return $(".custom-style-list tr")
				},
				getSpriteCustomStyleItemDomList: function() {
					return $(".sprite-custom-style-list tr")
				},
				render: function() {
					var t = e[r]();
					this.container.html(t), this.initAccordion()
				},
				initAccordion: function() {
					$(".accordin-container", this.container).accordion({
						animate: 100,
						collapsible: !0,
						heightStyle: "content"
					})
				},
				setSpriteSetting: function(e) {
					return typeof e.name != "undefined" && this.input_name.val(e.name), typeof e.className != "undefined" && this.input_class.val(e.className), typeof e.controllerMode != "undefined" && (this.controllerModeSelect.data("selectedValue") == "比例缩放" ? 0 : 1), typeof e.imgUrl != "undefined" ? this.input_img_text.val(e.imgUrl) : this.input_img_text.val(""), typeof e.imgFileName != "undefined" ? this.input_img_label.text(e.imgFileName) : this.input_img_label.text(""), this.spriteSetting = {
						name: e.name,
						className: e.className,
						controllerMode: e.controllerMode,
						customSetting: e.spriteCustomSetting,
						imgUrl: e.imgUrl,
						imgFileName: e.imgFileName
					}, this.updateCustomSettingInput(e.spriteCustomSetting, !0), this.spriteSetting
				},
				setCurrentKeyFrameSetting: function(e) {
					return typeof e.backgroundColor != "undefined" && this.input_background_color.val(e.backgroundColor), typeof e.display != "undefined" && t.setDropDownListValue(this.show_select, e.display == "none" ? "隐藏" : "显示"), typeof e.width != "undefined" && this.input_width.val(e.width), typeof e.height != "undefined" && this.input_height.val(e.height), typeof e.x != "undefined" && this.input_x.val(e.x), typeof e.y != "undefined" && this.input_y.val(e.y), typeof e.rotateZ != "undefined" && this.input_rotatez.val(e.rotateZ), typeof e.rotateX != "undefined" && this.input_rotatex.val(e.rotateX), typeof e.rotateY != "undefined" && this.input_rotatey.val(e.rotateY), typeof e.skewX != "undefined" && this.input_skewx.val(e.skewX), typeof e.skewY != "undefined" && this.input_skewy.val(e.skewY), typeof e.perspective != "undefined" && this.input_perspective.val(e.perspective), typeof e.opacity != "undefined" && this.input_opacity.val(e.opacity), typeof e.easing != "undefined" && t.setDropDownListValue(this.input_easing, e.easing), typeof e.controllerMode != "undefined" && t.setDropDownListValue(this.controllerModeSelect, e.controllerMode == 0 ? "比例缩放" : "固定尺寸"), this.updateCustomSettingInput(e.customSetting), this.currentKeyFrameSetting = e, this.currentKeyFrameSetting
				},
				updateCustomSettingInput: function(e, t) {
					var n = this;
					t ? this.sprite_custom_style_list.html("") : this.custom_style_list.html(""), e && $.each(e, function(e, r) {
						t ? n.addSpriteCustomStyleItem(e, r) : n.addCustomStyleItem(e, r)
					})
				},
				reset: function() {
					this.setCurrentKeyFrameSetting({
						display: "block",
						width: 0,
						height: 0,
						x: 0,
						y: 0,
						rotate: 0,
						opacity: 1,
						easing: "linear"
					}), this.setSpriteSetting({
						name: "",
						className: "",
						controllerMode: 0
					})
				},
				getCurrentKeyFrameSetting: function() {
					return this.currentKeyFrameSetting
				},
				getSpriteSetting: function() {
					return this.spriteSetting
				},
				show: function() {
					this.container.show()
				},
				hide: function() {
					this.container.hide()
				}
			};
		return u
	}), define("main_show", ["tmpl", "util", "main_page"], function(e, t, n) {
		var r = {
			init: function(e) {
				e = e || {}, this.showArea = $(".main-show-area"), this.container = e.container || $(".main-show-container"), this.closeBtn = e.closeBtn || $(".main-show-close-btn"), this.width = e.width || 320, this.height = e.height || 480, this.fixShowArea(), this.bind(), n.init()
			},
			bind: function() {
				var e = this;
				this.closeBtn.on("click", function() {
					e.hide()
				})
			},
			fixShowArea: function() {
				this.showArea.css({
					width: this.width,
					height: this.height,
					left: "50%",
					top: "50%",
					"margin-left": -this.width / 2,
					"margin-top": -this.height / 2
				})
			},
			show: function(e, t) {
				n.showClassName(t), n.create(e), this.container.show()
			},
			hide: function() {
				n.remove(), this.container.hide()
			}
		};
		return r
	}), define("controller_setting", ["tmpl", "util", "controller", "transition", "main_show", "win_manager"], function(e, t, n, r, i, s) {
		function d(e) {
			var n = e.localStagesData.stageDataArr[0],
				r = $.extend({}, n.spriteListData),
				i = e.localFramesBarsData.framesBarDataArr,
				s = {
					id: e.id,
					name: e.name,
					stageId: n.id,
					eventTransitionArr: [],
					transitionArr: [],
					width: n.width,
					height: n.height,
					mode: e.mode
				};
			return $.each(i, function(e, n) {
				var i = n.keyFramesDataList,
					o = r[n.id];
				o.markHasFramesBar = !0;
				var u = {
					id: o.id,
					className: o.className,
					textContent: o.textContent,
					imgUrl: o.imgUrl,
					zIndex: o.zIndex,
					imgFileName: o.imgFileName,
					duration: n.frameTotalDuration,
					stageId: n.stageId,
					clickActionJumpNext: o.clickActionJumpNext,
					clickActionEventName: o.clickActionEventName,
					keyframes: t.keyFrames2css(n.totalFramesCount, i),
					animationEndEventName: n.animationEndEventName,
					animationEndJumpNext: n.animationEndJumpNext,
					repeatMode: n.repeatMode,
					repeatTime: n.repeatTime,
					spriteCustomSetting: o.spriteCustomSetting
				};
				if (n.emitType == "none") s.transitionArr.push(u);
				else {
					var a = {
						emitEventName: n.emitEventName,
						isListenOnce: n.isListenOnce,
						animationObj: u
					};
					s.eventTransitionArr.push(a)
				}
			}), $.each(r, function(e, t) {
				t.markHasFramesBar || s.transitionArr.push({
					id: t.id,
					className: t.className,
					textContent: t.textContent,
					imgUrl: t.imgUrl,
					zIndex: t.zIndex,
					imgFileName: t.imgFileName,
					clickActionJumpNext: t.clickActionJumpNext,
					clickActionEventName: t.clickActionEventName,
					spriteCssProperties: t.spriteCssProperties
				})
			}), s
		}
		var o = "controller_size_setting",
			u = "controller_list",
			a = "controller_list_item",
			f = {},
			l, c, h, p = {},
			v = {
				init: function(e) {
					this.name = "BaseSetting", this.headerName = "新建元件", e = e || {}
				},
				bind: function() {},
				render: function() {
					if (!this.element || !this.element.length) {
						var t = o + "_" + this.id,
							n = e[o]({
								id: t
							});
						s.add(this.name, n), this.element = $("#" + t), this.widthInput = $(".controller-setting-width-input"), this.heightInput = $(".controller-setting-height-input"), this.nameInput = $(".controller-setting-name-input"), this.bind()
					}
				},
				reset: function() {
					this.widthInput.val("100"), this.heightInput.val("100"), this.nameInput.val("")
				},
				show: function() {
					var e = this;
					(!this.element || !this.element.length) && this.render(), s.show({
						headerName: this.headerName,
						name: this.name,
						onConfirm: function() {
							$(window).trigger("confirmControllerSetting", {
								width: e.widthInput.val(),
								height: e.heightInput.val(),
								name: e.nameInput.val()
							}), e.reset()
						},
						onCancel: function() {
							e.reset()
						}
					})
				}
			},
			m = {
				init: function(e) {
					e = e || {}, this.headerName = "插入元件", this.name = "ControllerList", this.allControllerData = [], this.PAGE_SIZE = 10, this.currentPageIndex = 0
				},
				save: function() {},
				centerControllerElement: function(e, t, n) {
					e.css({
						position: "absolute",
						left: "50%",
						top: "50%",
						"margin-left": -t / 2,
						"margin-top": -n / 2
					})
				},
				getListData: function(e, n, r) {
					if (this.isLoading) return;
					var i = this;
					this.isLoading = !0, i.loadingTips.text("加载中..."), i.loadingTips.show(), t.getControllerList(e, n, function(t) {
						var n = t.ctrls,
							s = [];
						i.isLoading = !1, t.total_page == t.cur_page ? (i.isEnd = !0, e == 0 && !n.length ? i.loadingTips.text("暂无元件数据") : i.loadingTips.text("")) : i.loadingTips.hide(), $.each(n, function(e, t) {
							t.ctrl_data || (t.ctrl_data = JSON.stringify(t));
							var n = JSON.parse(t.ctrl_data);
							n.id = t._id, s.push(n)
						}), i.allControllerData = i.allControllerData.concat(s), i.currentPageIndex = e, r && r(s)
					})
				},
				renderList: function(t, n) {
					var r = this;
					this.getListData(t, n, function(t) {
						var n = e[a]({
							controllerList: t
						});
						r.list.append(n)
					})
				},
				bind: function() {
					var e = this;
					$(".controller-list").on("click", function(t) {
						var r = $(t.target);
						h && h.removeClass("active"), r.addClass("active"), h = r, $(e.allControllerData).each(function(t, i) {
							if (i.id == r.data("id")) {
								var s = i;
								c && c.remove();
								var o = d(s),
									u = new n({
										controllerRenderData: o,
										container: e.preview
									}),
									a = u.element;
								e.centerControllerElement(a, u.width, u.height);
								var f = e.preview,
									l = f.width(),
									h = f.height(),
									p = u.width,
									v = u.height;
								if (l < p || h < v)
									if (p > v) {
										var m = l / p;
										a.css({
											"-webkit-transform": "scale(" + m + "," + m + ")"
										})
									} else if (h < v || h < v) {
									var g = h / v;
									a.css({
										"-webkit-transform": "scale(" + g + "," + g + ")"
									})
								}
								c && c.remove(), u.playAnimation(), c = u
							}
						})
					}), $(".controller-list").on("click", ".controller-delete-btn", function() {
						if (!window.confirm("是否删除该元件？")) return;
						var t = $(this).closest(".list-group-item"),
							n = t.data("id"),
							r = e.getControllerLocalData(n),
							i = $(".controller-list-wrap");
						e.deleteControllerById(r.id, function() {
							t.remove(), !e.isEnd && Number(i.prop("scrollHeight")) <= i.height() && e.loadNextPage(), alert("删除成功")
						})
					}), $(".controller-list-wrap").on("scroll", function() {
						if (e.isEnd) return;
						var t = $(this);
						t.scrollTop() + t.height() >= Number(t.prop("scrollHeight")) && e.loadNextPage()
					}), $(".controller-list").on("mouseover", ".list-group-item", function() {
						var t = $(this),
							n = $(t.find(".controller-delete-btn"));
						window.clearTimeout(e.deleteTimeID), e.deleteTimeID = window.setTimeout(function() {
							n.show()
						}, 1e3)
					}), $(".controller-list").on("mouseleave", ".list-group-item", function() {
						var t = $(this);
						window.clearTimeout(e.deleteTimeID);
						var n = $(t.find(".controller-delete-btn"));
						n.hide()
					})
				},
				loadNextPage: function() {
					this.renderList(this.currentPageIndex + 1, this.PAGE_SIZE)
				},
				deleteControllerById: function(e, n) {
					t.deleteController(e, function() {
						n && n()
					})
				},
				getControllerLocalData: function(e) {
					var t;
					return $.each(this.allControllerData, function(n, r) {
						if (r.id == e) return t = r, !1
					}), t
				},
				updateControllerLocalData: function(e) {
					for (var t = 0, n = this.allControllerData.length; t < n; t++) {
						var r = this.allControllerData[t];
						if (r.id == e.id) {
							this.allControllerData[t] = e;
							return
						}
					}
				},
				addControllerLocalData: function(e) {
					this.allControllerData.push(e)
				},
				render: function() {
					if (!this.element) {
						var t = u + "_" + this.id,
							n = e[u]({
								id: t
							});
						s.add(this.name, n), this.element = $("#" + t), this.list = $(".controller-list"), this.preview = $(".controller-list-preview"), this.loadingTips = $(".controller-list-loading"), this.bind()
					}
				},
				reset: function() {
					c && c.remove(), c = null, l = null, this.allControllerData = [], this.currentPageIndex = 0, this.isLoading = !1, this.isEnd = !1, h = null, $(".controller-list").html("")
				},
				show: function() {
					var e = this;
					this.reset(), this.element || this.render(), s.show({
						name: this.name,
						headerName: this.headerName,
						onConfirm: function() {
							$(window).trigger("confirmControllerSelect", {
								controllerRenderData: c.controllerRenderData
							})
						},
						onCancel: function() {}
					}), this.renderList(0, this.PAGE_SIZE)
				}
			};
		return f = {
			BaseSetting: v,
			List: m,
			convert2RenderData: d
		}, f
	}), define("fbf_animation_editor", ["tmpl", "util", "transition", "win_manager"], function(e, t, n, r) {
		var i = "fbf_animation_editor",
			s, o, u, a, f = {
				init: function(e) {
					e = e || {}, this.name = "FbfAnimationEditor", this.headerName = "新建逐帧动画元件"
				},
				bind: function() {
					var e = this;
					this.fbfImgSelect.on("change", function(n) {
						var r = new FileReader,
							i = this.files[0];
						o = i.name, e.fbfImgFileName.text(o), e.fbfImgInput.val(o), r.addEventListener("load", function(e) {
							var n = e.target.result;
							t.uploadImg(1, a, n, o, function(e) {
								s = e
							})
						}, !1), r.readAsDataURL(i), $(n.target).val("")
					}), this.previewBtn.on("click", function() {
						e.getPreviewAnimationObj(function(t) {
							var r = t.elem;
							e.fbfPreviewContainer.html(""), e.fbfPreviewContainer.append(r), u && u.stop(), u = n.playSingle(t)
						})
					}), this.fbfAnimationRepeatSetting.on("change", function() {
						var t = this.checked;
						t ? e.fbfAnimationRpeatCount.show() : e.fbfAnimationRpeatCount.hide()
					})
				},
				setWorkId: function(e) {
					a = e
				},
				getPreviewAnimationObj: function(e) {
					var t = this,
						n = Number(this.fbfFrameCountinput.val()),
						r = this.fbfFrameDirectionSelector.data("selectedValue") == "从上到下" ? "utd" : "ltr",
						i = Number(this.fbfFrameDurationInput.val()),
						o = this.fbfAnimationRepeatSetting.prop("checked"),
						u = t.fbfAnimationRpeatCount.val(),
						a = $("<img>");
					a.on("load", function() {
						var t = this.width / 2,
							a = this.height / 2,
							f, l, c = $('<div class="fbf-animation-demo"></div>');
						r == "ltr" ? (f = t / n, l = a) : (f = t, l = a / n), c.css({
							width: f,
							height: l,
							"margin-left": -f / 2,
							"margin-top": -l / 2
						});
						var h = {};
						for (var p = 0; p < n; p++) {
							var d = p * (100 / n) + "%";
							h[d] = {
								width: f,
								height: l,
								"background-position": r == "ltr" ? p * -f + "px 0" : "0 " + p * -l + "px",
								"background-image": "url(" + s + ")",
								"background-size": t + "px " + a + "px",
								"-webkit-animation-timing-function": "step-end"
							}, p == n - 1 && (h["100%"] = h[d])
						}
						var v = {
							elem: c,
							keyframes: h,
							duration: i * n,
							repeatMode: o,
							repeatTime: u
						};
						e && e(v)
					}), a.on("error", function() {
						e && e()
					}), a.prop("src", s)
				},
				render: function() {
					if (!this.element || !this.element.length) {
						var t = i + "_" + this.id,
							n = e[i]({
								id: t
							});
						r.add(this.name, n), this.element = $("#" + t), this.fbfNameInput = $(".fbf-name-input"), this.fbfImgSelect = $(".fbf-img-select"), this.fbfImgInput = $(".fbf-img-input"), this.fbfImgFileName = $(".fbf-img-class-name"), this.fbfFrameCountinput = $(".fbf-frame-count-input"), this.fbfFrameDirectionSelector = $(".fbf-frame-direction-selector"), this.fbfFrameDurationInput = $(".fbf-frame-duration-input"), this.fbfPreviewContainer = $(".fbf-animation-preview"), this.confirmSpriteActionBtn = $(".confirm-sprite-action-btn"), this.cancelSpriteActionBtn = $(".cancel-sprite-action-btn"), this.fbfAnimationRepeatSetting = $(".fbf-animation-repeat-setting"), this.fbfAnimationRpeatCount = $(".fbf-animation-repeat-count"), this.previewBtn = $('<button class="btn btn-info btn-sm">预览</button>').addClass("fbf-preview-animation-btn")
					}
				},
				reset: function() {
					this.fbfNameInput.val(""), this.fbfImgInput.val(""), this.fbfImgFileName.html(""), this.fbfFrameCountinput.val(""), this.fbfFrameDurationInput.val(""), this.fbfAnimationRepeatSetting.prop("checked", !1), this.fbfAnimationRpeatCount.val(""), this.fbfAnimationRpeatCount.hide()
				},
				show: function() {
					var e = this;
					if (!this.element || !this.element.length) this.render(), r.addBtns(this.name, [this.previewBtn]), this.bind();
					r.show({
						headerName: this.headerName,
						name: this.name,
						onConfirm: function() {
							var t = e.fbfNameInput.val();
							e.getPreviewAnimationObj(function(e) {
								$(window).trigger("fbfAnimationSelect", {
									name: t,
									animationObj: e,
									spriteOpt: {
										imgFileName: o,
										imgUrl: s,
										width: e.elem.width(),
										height: e.elem.height()
									}
								}), console.log(t)
							}), e.reset()
						},
						onCancel: function() {
							u && u.stop(), e.reset()
						}
					}), this.previewBtn.show()
				}
			};
		return f
	}), define("work_list", ["tmpl", "util", "win_manager"], function(e, t, n) {
		var r = "work_list",
			i = "work_list_item",
			s, o, u = {},
			a = 0,
			f = 8,
			l = [],
			c, h, p = {
				init: function(e) {
					e = e || {}, this.headerName = "打开作品", this.name = "WorkList"
				},
				save: function() {},
				getData: function(e, n, r) {
					var i = [],
						s = this;
					t.getWorks(e, n, function(e) {
						var t = e.works;
						c == null && (c = e.total_page, s.checkPageBtnVisibility()), $.each(t, function(e, t) {
							i.push({
								id: t._id,
								name: t.name,
								workData: JSON.parse(t.work_data)
							}), i[i.length - 1].workData.id = t._id
						}), l = l.concat(i), r && r(i, e.cur_page + 1 == e.total_page)
					})
				},
				renderPage: function(t, n, r) {
					if (r.length == 0 && t == 0) this.list.html('<div class="no-work-tips">暂无作品</div>');
					else {
						var s = e[i]({
							workList: r
						});
						this.list.html(s)
					}
				},
				getPageData: function(e, t) {
					var n = this;
					h = !0, this.getData(e, t, function(r, i) {
						h = !1, n.renderPage(e, t, r), u[e] = r
					})
				},
				bind: function() {
					var e = this;
					$(".work-list").on("click", function(e) {
						var t = $(e.target);
						t.hasClass(".list-group-item") || (t = t.closest(".list-group-item"));
						if (!t.length) return;
						s && s.removeClass("active"), t.addClass("active"), s = t, $(l).each(function(e, n) {
							n.id == t.prop("id") && (o = n.workData)
						})
					}), $(".work-list").on("click", ".work-delete-btn", function(t) {
						if (!window.confirm("是否删除该作品？")) return;
						var n = $(this).closest(".list-group-item"),
							r = n.prop("id"),
							i = n.parent();
						e.delete(r, function(t) {
							n.remove();
							var r = $(".list-group-item", i);
							c--, r.length || (e.nextBtn.hasClass("disabled") ? e.list.html('<div class="no-work-tips">暂无作品</div>') : (a--, e.next()))
						})
					}), $(".work-list").on("mouseover", ".list-group-item", function() {
						$(this).addClass("over")
					}), $(".work-list").on("mouseout", ".list-group-item", function() {
						$(this).removeClass("over")
					}), this.preBtn.on("click", function() {
						if ($(this).hasClass("disabled")) return;
						e.pre()
					}), this.nextBtn.on("click", function() {
						if ($(this).hasClass("disabled")) return;
						e.next()
					})
				},
				render: function() {
					if (!this.element || !this.element.length) {
						var t = r + "_" + this.id,
							i = e[r]({
								id: t
							});
						n.add(this.name, i), this.element = $("#" + t), this.list = $(".work-list"), this.preBtn = $(".pre-work-list"), this.nextBtn = $(".next-work-list"), this.bind()
					}
				},
				show: function() {
					var e = this;
					(!this.element || !this.element.length) && this.render(), n.show({
						name: this.name,
						headerName: this.headerName,
						onConfirm: function() {
							$(window).trigger("workSelect", {
								workData: o
							})
						},
						onCancel: function() {
							s = o = c = null, u = {}, a = 0, l = []
						}
					}), this.getPageData(a, f)
				},
				checkPageBtnVisibility: function() {
					c <= a + 1 ? this.nextBtn.addClass("disabled") : this.nextBtn.removeClass("disabled"), 0 >= a ? this.preBtn.addClass("disabled") : this.preBtn.removeClass("disabled")
				},
				next: function() {
					a++, this.checkPageBtnVisibility(), this.getPageData(a, f)
				},
				pre: function() {
					a--, this.checkPageBtnVisibility(), u[a] ? this.renderPage(a, f, u[a]) : this.getPageData(a, f)
				},
				create: function(e, n) {
					t.createWork(e, function(e) {
						n && n(e), alert("保存成功！")
					})
				},
				update: function(e, n) {
					t.updateWork(e, function(e) {
						n && n(e), alert("更新成功！")
					})
				},
				"delete": function(e, n) {
					t.deleteWork(e, function(e) {
						alert("删除成功！"), n && n(e)
					})
				}
			};
		return p
	}), define("sprite_list", ["tmpl", "util"], function(e, t, n) {
		var r = "sprite_list_item",
			i, s = {
				init: function(e) {
					e = e || {}, this.name = "spriteList", this.element = $(".sprite-select-container-wrap"), this.bind()
				},
				bind: function() {
					var e = this;
					$(window).on("spriteAdd", function() {
						var t = arguments[1],
							n = t.sprite,
							r = e.addSpriteItem(n);
						e.select(r)
					}), $(window).on("spriteSelect", function() {
						var t = arguments[1],
							n = t.selectedSprite.id,
							r = $("#sprite_item_" + n);
						e.select(r)
					}), $(window).on("spriteDelete", function() {
						var t = arguments[1],
							n = t.sprite.id;
						e.removeSpriteItem(n)
					}), $(window).on("pageSelect", function() {
						var t = arguments[1],
							n = t.selectedPage.id;
						e.checkSpriteListItemVisibility(n)
					}), $(window).on("spriteSettingChanged", function() {
						var e = arguments[1],
							t = e.spriteSetting;
						if (i) {
							var n = i.find(".sprite-name");
							n.text() !== t.name && n.text(t.name)
						}
					}), this.element.on("click", ".sprite_item", function(n) {
						var r = t.getOriginId($(this).prop("id"));
						e.select($(this)), $(window).trigger("spriteItemClick", {
							id: r
						})
					}), this.element.on("click", ".sprite-list-delete-btn", function(e) {
						var n = $(this).closest(".sprite_item"),
							r = t.getOriginId(n.prop("id"));
						$(window).trigger("spriteItemDelete", {
							id: r
						})
					}), this.element.on("change", ".glyphicon-lock", function(e) {
						var n = $(this).prop("checked"),
							r = $(this).closest(".sprite_item"),
							s = r.prop("id"),
							o = t.getOriginId(s);
						$(window).trigger("lockStateChanged", {
							lock: n,
							id: o,
							isCurrentSprite: s == i.prop("id")
						})
					}), this.element.on("change", ".glyphicon-eye-open", function(e) {
						var n = $(this).prop("checked"),
							r = $(this).closest(".sprite_item"),
							i = r.prop("id"),
							s = t.getOriginId(i);
						debugger;
						$(window).trigger("hideStateChanged", {
							isHide: n,
							id: s
						})
					}), this.element.on("click", ".glyphicon-lock", function(e) {
						e.stopPropagation()
					}), this.element.on("click", ".glyphicon-eye-open", function(e) {
						e.stopPropagation()
					})
				},
				checkSpriteListItemVisibility: function(e) {
					var t = $(".sprite_item", this.element);
					$(t).each(function(t, n) {
						n = $(n), n.data("stageid") != e ? n.hide() : n.show()
					})
				},
				select: function(e) {
					e = $(e);
					if (e.hasClass("active")) return;
					i && i.removeClass("active"), e.addClass("active"), i = e
				},
				removeSpriteItem: function(e) {
					$("#sprite_item_" + e).remove()
				},
				addSpriteItem: function(t) {
					var n = e[r]({
						id: "sprite_item_" + t.id,
						stageId: t.stage.id,
						name: t.name
					});
					this.element.append(n);
					var i = this.element.children();
					return i[i.length - 1]
				}
			};
		return s
	}), define("user_images", ["tmpl", "util", "win_manager"], function(e, t, n) {
		var r = "user_images",
			i = "user_images_item",
			s = "imgs_list",
			o, u = {
				init: function(e) {
					e = e || {}, this.name = "userImages", this.id = t.getRandomId(), this.headerName = "图片管理"
				},
				bind: function() {
					var e = this;
					this.userImageList[0].addEventListener("load", function(e) {
						var t = $(e.target),
							n = t.parent(),
							r = t.prop("naturalWidth"),
							i = t.prop("naturalHeight"),
							s, o, u, a;
						r > i ? (o = n.height(), s = o / i * r, u = (n.width() - s) / 2, a = 0) : (s = n.width(), o = s / r * i, a = (n.height() - o) / 2, u = 0), t.css({
							width: s,
							height: o,
							marginTop: a,
							marginLeft: u
						})
					}, !0), this.allUserImgesWorkList.on("click", function(t) {
						var n = $(t.target),
							r = n.closest(".list-group"),
							i = r.data("name");
						n.hasClass("user_images_item") && e.select(n, i)
					}), this.userImageList.on("click", ".img-del-btn", function(n) {
						if (!window.confirm("确认删除此图片？")) return;
						var r = $(n.target).closest(".img-container"),
							i = o.data("id"),
							s = $(r.find("img")).prop("src").split("/"),
							u = s[s.length - 1],
							a = o.closest(".list-group"),
							f = a.data("name"),
							l = f == "ctrl" ? 1 : 0;
						if (i == "tempwork" || i == "tempctrl") l = i == "tempctrl" ? 1 : 0, i = null;
						t.delImg(u, i, l, function(t) {
							e.userAvailableSize.text("剩余可用空间：" + t.available_folder_size + "MB"), r.remove(), e.getImgsInContainer().length || e.userImageList.html('<div class="user-no-img-tips">暂无图片</div>'), alert("删除成功")
						})
					})
				},
				getImgsInContainer: function() {
					return $(this.userImageList.find(".user_images_item"))
				},
				render: function() {
					var t = r + "_" + this.id,
						i = e[r]({
							id: t
						});
					n.add(this.name, i), this.element = $("#" + t), this.userImagesWorkList = $(".user-images-work-list"), this.userImageList = $(".user-images-content"), this.allUserImgesWorkList = $(".user-images-all-list"), this.userImageCtrlList = $(".user-images-controller-list"), this.userImagesWorkTempList = $(".user-images-work-temp-list"), this.userImagesCtrlTempList = $(".user-images-ctrl-temp-list"), this.currentTempHeading = $(".current-temp-heading"), this.userAvailableSize = $(".user-images-available-size"), this.bind()
				},
				renderData: function(t, n, r) {
					var s = "";
					this.localData = t, $.each(t[r], function(t, n) {
						s += e[i]({
							name: n.name,
							id: t
						})
					}), n.html(s)
				},
				select: function(t, n) {
					var r = t.data("id"),
						i = this.localData[n][r];
					o && o.removeClass("active"), o = t, t.addClass("active");
					if (!i) return;
					if (i.imgList.length) {
						var u = e[s]({
							imgList: i.imgList
						});
						this.userImageList.html(u)
					} else this.userImageList.html('<div class="user-no-img-tips">暂无图片</div>')
				},
				getItemByWorkId: function(e) {
					var t = $(this.userImagesWorkList.find(".user_images_item")),
						n;
					return t.each(function(t, r) {
						r = $(r);
						if (r.data("id") == e) return n = r, !1
					}), n
				},
				show: function(e, t, r) {
					var i = this;
					this.element || this.render(), this.renderData(e, this.userImagesWorkList, "work"), this.renderData(e, this.userImageCtrlList, "ctrl"), this.renderData(e, this.userImagesWorkTempList, "tempwork"), this.renderData(e, this.userImagesCtrlTempList, "tempctrl"), this.currentWorkId = r, this.userAvailableSize.text("剩余可用空间：" + t + "MB");
					if (r) {
						var s = this.getItemByWorkId(r);
						this.select(s, "work"), this.userImagesWorkTempList.hide(), this.userImagesCtrlTempList.hide(), this.currentTempHeading.hide()
					} else {
						var o = $(this.allUserImgesWorkList.find(".user_images_item")[0]);
						this.select(o, "tempwork"), this.userImagesWorkTempList.show(), this.userImagesCtrlTempList.show(), this.currentTempHeading.show()
					}
					n.show({
						name: this.name,
						headerName: this.headerName,
						onConfirm: function() {}
					})
				}
			};
		return u
	}), define("index", ["tmpl", "pages", "stages", "framesbar", "transition", "csseditor", "preset_animation_config", "preset_animation_editor", "main_show", "controller_setting", "fbf_animation_editor", "win_manager", "util", "work_list", "sprite_list", "user_images"], function(e, t, n, r, i, s, o, u, a, f, l, c, h, d, v, m) {
		function k(e, t) {
			e = $.extend(!0, {}, e);
			for (var n in t) {
				var r = null,
					i = null;
				if (n == "scale" || n == "scaleX" || n == "scaleY") {
					n == "scale" ? (r = t[n], i = t[n]) : n == "scaleX" ? r = t[n] : n == "scaleY" && (i = t[n]);
					var s = e.x,
						o = e.y,
						u = e.width,
						a = e.height;
					if (r != null) {
						var f = e.width = u * r;
						e.x = s - (f - u) / 2
					}
					if (i != null) {
						var l = e.height = a * i;
						e.y = o - (l - a) / 2
					}
				} else n == "opacity" ? e[n] = t[n] : n == "customSetting" ? (e[n] == null && (e[n] = {}), $.each(t[n], function(t, r) {
					e[n][t] = r
				})) : (typeof e[n] == "undefined" && (e[n] = n == "easing" ? "" : 0), e[n] = e[n] + t[n])
			}
			return e.perspective && (e.customSetting = e.customSetting || {}, e.rotateX ? e.customSetting["-webkit-transform-origin"] = e.x + e.width / 2 + "px center" : e.rotateY && (e.customSetting["-webkit-transform-origin"] = "center " + (e.y + e.height / 2) + "px")), e
		}

		function L(e, t, i) {
			var s = r.getFramesBarsByEmitEventName(t);
			$(s).each(function(t, r) {
				if (r.stageId == e) {
					var s = n.getSpriteById(r.id);
					i && i(s)
				}
			})
		}
		var g;
		window.currentMode = "scene";
		var y, b, w, E = [],
			S, x, T, N, C;
		window.loginCb = function(e) {
			A.setUid(e.uid)
		};
		var A = {
			init: function() {
				t.init(), n.init(), r.init(), s.init(), u.init(), f.BaseSetting.init(), f.List.init(), a.init(), l.init(), this.initAccordion(), c.init(), d.init(), v.init(), m.init(), this.outerContainer = $("#outter-container"), this.controllerWidthInput = $(".controller-width-input"), this.controllerHeightInput = $(".controller-height-input"), this.framesBarOutterElement = $(".frames-bar-outter-container"), this.controllerLeftContainer = $(".controller-container"), this.backSceneBtn = $(".back-scene"), this.controllerSettingContainer = $(".controller-size-container"), this.controllerCreateContainer = $(".controller-create-container"), this.sceneCreateContainer = $(".scene-create-container"), this.newBtn = $(".new-btn"), this.pagesContainer = $(".pages-container"), this.playBtn = $(".play-button"), this.playButtonIcon = $(this.playBtn.find(".glyphicon")), this.workTitleText = $(".work-title"), this.controllerNameText = $(".controller-name-input"), this.addFbfAnimationBtn = $(".add-fbf-animation"), this.newControllerBtn = $(".add-controller"), this.saveControllerBtn = $(".save-controller-btn"), this.addControllerBtn = $(".controller-add-button"), this.saveSceneBtn = $(".save-btn"), this.openWorkBtn = $(".load-btn"), this.playAllBtn = $(".play-all-btn"), this.addPresetAnimationBtn = $(".add-preset-animation"), this.stopBtn = $(".stop-button"), this.outputFileBtn = $(".output-file"), this.showClassNameCheckBox = $(".show-class-btn"), this.userNameText = $(".user-name-text"), this.loginWin = $(".login-win-mask"), this.loginBtn = $(".user-login-btn"), this.logoutBtn = $(".user-login-out-btn"), this.managerImgBtn = $(".img-manager-btn"), this.guideBtn = $(".guide-btn"), this.bind(), t.add(), this.deleteTemp()
			},
			getData: function() {
				var e = r.getData(),
					i = n.getData();
				if (window.currentMode == "scene") {
					var s = t.getData(),
						o = {
							id: S,
							name: this.workTitleText.val(),
							localPagesData: s,
							localStagesData: i,
							localFramesBarsData: e
						};
					return o
				}
				var u = {};
				return u.id = x || h.getRandomId(), u.name = this.controllerNameText.val(), u.localFramesBarsData = e, u.localStagesData = i, u
			},
			setWorkId: function(e) {
				y && (y.id = e), S = e, s.setWorkId(S), n.setWorkId(S), l.setWorkId(S)
			},
			setData: function(e) {
				var i = this;
				e = e || {};
				var s = e.localStagesData,
					o = e.localFramesBarsData,
					u = e.localPagesData;
				r.remove(), n.remove(), window.currentMode == "scene" ? (this.setWorkName(e.name), this.setWorkId(e.id)) : (this.setControllerName(e.name), x = e.id), n.setData(s), r.setData(o), t.setData(u);
				var a = n.getSpriteList();
				$.each(a, function(e, t) {
					v.addSpriteItem(t)
				});
				var f = n.getSpriteList();
				$(f).each(function(e, t) {
					$(t.listenEventNameList).each(function(e, n) {
						i.bindSpriteCustomEvent(t, n)
					})
				});
				if (u) {
					var l = t.getPages()[u.currentPageIndex || 0];
					l && l.select()
				}
				if (o) {
					var c, h, p = r.getFramesBarById(o.currentFramesBarId, o.currentFramesBarEmitType, o.currentFramesBarEmitEventName);
					p && p.length && (p.select(), c = p.getFrameById(o.currentFrameId), c ? c.select() : (h = p.getKeyFrameById(o.currentKeyFrameId), h && h.select()))
				}
				if (s) {
					var d = n.getSpriteById(s.currentSpriteId);
					d && d.select()
				}
			},
			showLogin: function() {
				this.userNameText.hide(), this.logoutBtn.hide(), this.loginBtn.show(), this.loginWin.show();
				var e = this.loginWin.find("iframe");
				e.attr("src", "http://account.alloyteam.com/page/ptlogin?redirect=http%3A%2F%2Faeditor.alloyteam.com%2Fcgi%2Flogin&close=1"), C = setInterval(function() {
					var e = localStorage.getItem("crossWindowSuccessUid");
					e && (clearInterval(C), window.loginCb({
						uid: e
					}), localStorage.removeItem("crossWindowSuccessUid"))
				}, 500)
			},
			hideLogin: function(e) {
				this.userNameText.text("欢迎你：" + e), this.userNameText.show(), this.logoutBtn.show(), this.loginBtn.hide(), this.loginWin.hide(), clearInterval(C)
			},
			deleteTemp: function() {
				var e = this;
				h.delTemp(function(t) {
					var n = t.json.user_id;
					n && e.hideLogin(n)
				}, function() {
					e.showLogin()
				})
			},
			setUid: function(e) {
				N = e, this.hideLogin(N), localStorage.setItem("username", N)
			},
			changeMode: function(e) {
				e == "scene" ? (this.sceneCreateContainer.show(), this.controllerCreateContainer.hide(), this.controllerSettingContainer.hide(), this.controllerNameText.hide(), this.workTitleText.show(), this.pagesContainer.show(), this.controllerLeftContainer.show(), this.outerContainer.addClass("scene"), this.outerContainer.removeClass("controller")) : (this.sceneCreateContainer.hide(), this.controllerCreateContainer.show(), this.controllerSettingContainer.show(), this.controllerNameText.show(), this.workTitleText.hide(), this.pagesContainer.hide(), this.controllerLeftContainer.hide(), this.outerContainer.addClass("controller"), this.outerContainer.removeClass("scene")), window.currentMode = e
			},
			initAccordion: function() {
				$(".accordin-container").accordion({
					header: "h4",
					animate: 100,
					collapsible: !0,
					heightStyle: "content"
				})
			},
			_updateControllerDataInScene: function(e, t) {
				var n = e.localStagesData;
				if (n) {
					var r = n.stageDataArr;
					r && $(r).each(function(e, n) {
						n.spriteListData && $.each(n.spriteListData, function(e, n) {
							n.controllerRenderData && n.controllerRenderData.id == t.id && (n.controllerRenderData = t)
						})
					})
				}
			},
			bindSpriteCustomEvent: function(e, t) {
				var n = this;
				e.bindAnimationCustomEvent(t, function() {
					var r = e.getEventFramesBar(t);
					if (!r) return;
					var s = arguments[1];
					if (s && s.from == "edit") {
						var o = n.getElementAnimationObject(e, "eventEmit", t),
							u = i.playSingle(o);
						E.push(u), $(window).trigger("playAnimation", {
							framesBar: r
						})
					}
				})
			},
			bind: function() {
				var e = this;
				$(document).on("click", ".dropdown-menu li a", function() {
					var e = $(this).text(),
						t = $(this).closest(".dropdown");
					h.setDropDownListValue(t, e)
				}), $(window).on("workSelect", function() {
					var t = arguments[1];
					y = t.workData;
					if (!y) return;
					b = y.name, e.setData(y)
				}), $(window).on("spriteAnimationEventListenChanged", function() {
					var t = arguments[1],
						i = "eventEmit",
						s = t.emitEventName,
						o = t.isListenOnce,
						u = n.getCurrentSprite();
					u.listenEventHandlerMap && u.listenEventHandlerMap[s] && (u.listenEventHandlerMap[s] = null, r.removeFramesBarById(u.id, i, s)), e.bindSpriteCustomEvent(u, s);
					var a = r.add(u, i, s, o),
						f, l = u.getCommondFramesBar();
					if (l) {
						var c = l.getKeyFrames()[0];
						f = a.addKeyFrame(0, c.getSetting())
					} else f = a.addKeyFrame(0, u.getSetting());
					f.select()
				}), $(window).on("pageDelete", function() {
					e.checkEditorVisibility()
				}), $(window).on("spriteAdd", function() {
					var t = arguments[1];
					t.sprite.select(), e.checkEditorVisibility()
				}), $(window).on("spriteDelete", function() {
					setTimeout(function() {
						e.checkEditorVisibility()
					}, 0)
				}), $(window).on("pageSelect", function() {
					var t = arguments[1],
						i = t.selectedPage.id,
						s = r.getFramesBars(),
						o;
					$.each(s, function(e) {
						e.stageId == i && (o = !0)
					});
					if (!o) {
						var u = n.getStageById(i),
							a = u.getSpriteList()[0];
						a && a.select()
					}
					setTimeout(function() {
						e.checkEditorVisibility()
					}, 0)
				}), $(window).on("addToCommonFramesBar", function() {
					var e = arguments[1],
						t = r.add(e.sprite),
						n = t.addKeyFrame(0, e.sprite.getSetting());
					n.select()
				}), $(window).on("afterFramesBarSelect", function() {
					g && e.stop()
				}), $(window).on("pasteSprite", function() {
					var t = arguments[1],
						i = t.sprite;
					if (i) {
						var s = n.getCurrentStage(),
							o = i.getSetting(),
							u = s.addSprite(o);
						u.stage = s, i.listenEventHandlerMap && $.each(i.listenEventHandlerMap, function(t) {
							e.bindSpriteCustomEvent(u, t)
						});
						var a, f = i.getAllFramesBars();
						$.each(f, function(e, t) {
							var n = t.getSetting();
							n.id = u.id, n.stageId = s.id;
							var i = new r(n);
							r.add(i);
							var o = t.getKeyFrames();
							$(o).each(function(e, t) {
								var t = i.addKeyFrame(t.index, t.setting);
								a || (a = t)
							})
						}), a && a.select()
					}
				}), $(window).on("controllerEdit", function() {
					y = e.getData(), e.changeMode("controller");
					var t = arguments[1],
						n = t.controller,
						r = f.List.getControllerLocalData(n.id);
					r && (e.setData(r), e.setStageControllerSizeInput(n.width, n.height))
				}), $(window).on("controllerStageSizeChanged", function() {
					var t = arguments[1],
						r = n.getCurrentStage();
					r.setWidth(t.width), r.setHeight(t.height), e.setStageControllerSizeInput(t.width, t.height)
				}), $(window).on("confirmControllerSetting", function() {
					var t = arguments[1];
					e.changeMode("controller"), e.setData({
						name: t.name
					}), e.setStageControllerSizeInput(t.width, t.height), n.add(null, t.width, t.height, t.name, !0), h.delControllerTemp()
				}), $(document).on("mousedown", function(e) {
					var t, r, i, s, o = $(e.target),
						u = n.getCurrentEditSprite();
					if (o.closest(".sprite-text-add-button").length || o.closest("#globalEditor").length || o.closest("#edui_fixedlayer").length || o.closest(".sprite-single-text-add-button").length) return;
					r = o.closest(".text-wrap"), r.length && (t = r.parent());
					var a = $("#globalEditor");
					if (u && a && a[0].style.display != "none") {
						a.hide();
						var f = n.getGlobalRichEditor(),
							l = f.getContent();
						u.setTextContent(l)
					}
				}), $(window).on("animationConfirm", function() {
					var e = arguments[1],
						t = e.duration,
						i = e.animationName,
						s = r.getCurrentFramesBar(),
						u = n.getCurrentSprite(),
						a = u.getSetting(),
						f = r.getCurrentFrame();
					if (f) {
						var l = f.index,
							c = l + t / s.frameDuration;
						c >= s.framesArr.length && s.updateTotalDuration((c + 1) * s.frameDuration);
						var h = o[i];
						for (var d in h) {
							p = Number(d.replace("%", "")) / 100;
							var v = Math.round(p * t / s.frameDuration),
								m = l + v;
							h[d].easing || (h[d].easing = "ease");
							var g = k(a, h[d]),
								y = s.addKeyFrame(m, g);
							y.select()
						}
					}
				}), $(window).on("fbfAnimationSelect", function() {
					var t = arguments[1],
						i = t.spriteOpt;
					y = e.getData(), e.changeMode("controller"), e.setData({
						name: t.name
					}), n.add(null, i.width, i.height, t.name);
					var s = t.animationObj,
						o = s.duration,
						u = n.getCurrentStage(),
						a = u.addSprite({
							imgUrl: i.imgUrl,
							width: i.width,
							height: i.height
						});
					$(window).trigger("addToCommonFramesBar", {
						sprite: a
					}), setTimeout(function() {
						var e = a.framesbar,
							n = t.animationObj.repeatMode,
							u = t.animationObj.repeatTime;
						e.setRepeatMode(n), e.setRepeatTime(u), e.updateTotalDuration(o), r.setFrameDurationInput(o), r.setRepeatCheckBoxAndInput(n, u), $.each(s.keyframes, function(t, n) {
							t = Number(t.replace("%", "")) / 100;
							var r = Math.round(t * o / e.frameDuration);
							t == 1 && (r -= 1);
							var s = e.addKeyFrame(r, {
								easing: n["-webkit-animation-timing-function"],
								width: i.width,
								height: i.height,
								imgUrl: i.imgUrl,
								customSetting: {
									"background-position": n["background-position"],
									"background-size": n["background-size"]
								}
							})
						});
						var f = e.getFirstKeyFrame();
						f.select()
					}, 0)
				}), this.showClassNameCheckBox.on("change", function(e) {
					T = $(e.target).prop("checked"), T ? $("body").addClass("show-class-name") : $("body").removeClass("show-class-name")
				}), this.loginBtn.on("click", function() {
					e.loginWin.show()
				}), this.managerImgBtn.on("click", function() {
					h.getImgs(function(e) {
						m.show(e.img_files, e.available_folder_size, S)
					})
				}), this.logoutBtn.on("click", function() {
					if (!window.confirm("确定要注销帐号吗？")) return;
					h.logout(function() {
						alert("注销成功"), e.showLogin()
					})
				}), this.guideBtn.on("click", function() {
					window.open("http://www.alloyteam.com/2015/06/h5-jiao-hu-ye-bian-ji-qi-aeditor-jie-shao/", !0)
				}), this.playBtn.on("click", function(t) {
					var i = $(t.target),
						s = n.getCurrentStage(),
						o = r.getCurrentFramesBar();
					!g || g == "end" ? (g == "end" && e.stop(!0), e.play()) : g == "playing" ? e.pause() : g == "pause" && e.resume()
				}), this.stopBtn.on("click", function() {
					e.stop(!0)
				}), this.newBtn.on("click", function() {
					e.setData(), e.setWorkId(null), t.add(), e.setWorkName("暂无标题"), h.delTemp()
				}), this.backSceneBtn.on("click", function() {
					e.changeMode("scene"), e.setData(y)
				}), this.addFbfAnimationBtn.on("click", function() {
					l.show()
				}), this.controllerWidthInput.on("change", function() {
					var e = n.getCurrentStage();
					e.setWidth($(this).val())
				}), this.controllerHeightInput.on("change", function() {
					var e = n.getCurrentStage();
					e.setHeight($(this).val())
				}), this.newControllerBtn.on("click", function() {
					y = e.getData(), b = y.name, f.BaseSetting.show()
				}), this.saveControllerBtn.on("click", function() {
					var t = e.getData(),
						n = f.List.getControllerLocalData(t.id);
					!n || n.name != t.name ? h.createController(t, function(e) {
						x = e.id = t.id, e.name = t.name, f.List.addControllerLocalData(e), alert("保存成功")
					}) : h.updateController(t, function(n) {
						alert("更新成功");
						var r = f.convert2RenderData(t);
						y && e._updateControllerDataInScene(y, r), f.List.updateControllerLocalData(t)
					})
				}), this.addControllerBtn.on("click", function() {
					var e = n.getCurrentStage();
					if (!e) return;
					f.List.show()
				}), this.saveSceneBtn.on("click", function() {
					var t, n = e.getData();
					n.id == null || b != e.workTitleText.val() ? d.create(n, function(t) {
						y = t, e.setWorkId(t.work_id), b = n.name
					}) : d.update(n, function(e) {
						y = e, y.id = e.work_id, b = n.name
					})
				}), this.openWorkBtn.on("click", function() {
					d.show()
				}), this.playAllBtn.on("click", function() {
					var t = e.getAllAnimationObjectList();
					e.removeAllAnimationStyle(), a.show(t, T)
				}), this.addPresetAnimationBtn.on("click", function() {
					if ($(this).hasClass("disable")) return;
					var e = r.getCurrentFrame();
					if (!e) {
						alert("请选择一个起始帧！");
						return
					}
					u.show()
				}), this.outputFileBtn.on("click", function() {
					var t = e.getAllAnimationObjectList(!0),
						n = JSON.stringify(t, null, 4);
					n = "MainPage.init();MainPage.create(" + n + ");", h.postJsCode(n, function() {
						h.downloadWork(S)
					})
				})
			},
			checkEditorVisibility: function() {
				var e = n.getCurrentStage(),
					t;
				e && (t = e.getSpriteList()), e && t && t.length ? ($(".right-bar").show(), $(".sprite-select-container").show(), this.framesBarOutterElement.addClass("has-sprite")) : ($(".right-bar").hide(), $(".sprite-select-container").hide(), this.framesBarOutterElement.removeClass("has-sprite"))
			},
			setControllerName: function(e) {
				this.controllerNameText.val(e || "暂无标题")
			},
			setWorkName: function(e) {
				this.workTitleText.val(e)
			},
			getAllAnimationObjectList: function(e) {
				var r = {},
					i = this,
					s = [],
					o = {},
					u;
				if (window.currentMode == "scene") {
					var a = t.getPages();
					if (!a.length) return;
					$.each(a, function(t, n) {
						u = i.getPageAnimationObject(n.id, !0, e), s.push(u), $.extend(o, u.spriteImgUrlsMap), u.backgroundImage && (o[u.backgroundImage] = 1)
					}), delete u.spriteImgUrlsMap;
					var f = n.getStageTransitionDirection(),
						l = n.getCurrentStageTransitionObj();
					r.currentStageTransitionObj = l, r.currentStageTransitionDirection = f
				} else {
					var c = n.getCurrentStage();
					if (!c) return;
					u = i.getPageAnimationObject(c.id, !0, e, !0), s.push(u)
				}
				return r.list = s, r.imgUrlsMap = o, r
			},
			removeAllAnimationStyle: function() {
				$(".animation-style").remove()
			},
			getElementAnimationObject: function(e, t, n, i, s) {
				var o = this,
					u = {},
					a = e.getSpriteElement(),
					f = arguments.length == 3 && typeof arguments[1] != "string" && typeof arguments[2] != "string",
					l = !e.getCommondFramesBar() && !e.hasEventFramesBar();
				u.spriteCustomSetting = e.spriteCustomSetting, u.isGlobal = e.isGlobal, u.stageId = e.stage.id, u.id = e.id, u.name = e.name, u.className = e.className, u.zIndex = e.zIndex, e.isText && (u.textContent = e.textContent), f && (i = arguments[1], s = arguments[2]);
				if (!i) u.elem = a, e.controller && (u.controller = e.controller);
				else {
					u.clickActionJumpNext = e.clickActionJumpNext, u.clickActionEventName = e.clickActionEventName;
					if (e.imgUrl) var c = e.imgUrl.split("/"),
						p = c[c.length - 1];
					s && p && p != "undefined" ? u.imgUrl = "./img/" + p : typeof e.imgUrl != "undefined" && (u.imgUrl = e.imgUrl), e.controller && (u.controllerRenderData = e.controller.controllerRenderData)
				}
				if (f) return l ? u.spriteCssProperties = $.extend({}, e.getCssProperties(), {
					zIndex: u.zIndex
				}) : u.spriteCssProperties = $.extend({}, e.getInitialCssProperties(), {
					zIndex: u.zIndex
				}), delete u.spriteCssProperties["background-image"], u;
				var d = r.getFramesBarById(e.id, t, n),
					v = d.getKeyFrames(),
					m = h.keyFrames2css(d.totalFramesCount, v, s);
				u.keyframes = m, u.repeatMode = d.getRepeatMode(), u.repeatTime = d.getRepeatTime(), u.duration = d.frameTotalDuration, u.isControllerPlay = d.isControllerPlay;
				var g = d.getAnimationEndJumpNext(),
					y = d.getAnimationEndEventName();
				return i ? (u.animationEndEventName = y, u.animationEndJumpNext = g) : (u.playingFramesBarRenderId = d.renderId, u.callback = function() {
					y && (console.log("trigger:" + y), $(window).trigger(y, {
						from: "edit",
						stageId: d.stageId
					})), $(window).trigger("framesBarAnimationEnd", {
						framesBar: d
					})
				}, u.interationCallback = function(e) {
					$(window).trigger("animationInteration", {
						animationName: e.animationName,
						framesBar: d
					})
				}), i || (u.elem.attr("style", ""), u.elem.css($.extend({
					"z-index": u.zIndex,
					"background-image": "url(" + e.imgUrl + ")"
				}, e.spriteCustomSetting, m["0%"]))), u
			},
			getTypeAnimationObject: function(e, t, r) {
				var i = n.getStageById(e),
					s = this,
					o = {};
				return o.transitionArr = [], L(e, r, function(e) {
					var n = s.getElementAnimationObject(e, t, r);
					o.transitionArr.push(n), e.controller && n.isControllerPlay && e.playControllerAnimation()
				}), o
			},
			setStageControllerSizeInput: function(e, t) {
				this.controllerWidthInput.val(e), this.controllerHeightInput.val(t)
			},
			getPageAnimationObject: function(e, i, s, o) {
				var u = n.getStageById(e),
					a = t.getPageById(e),
					f = this,
					l, c = {},
					h = {};
				h.transitionArr = [], h.eventTransitionArr = [], h.actionEventName = u.actionEventName, a && (l = a.getCheckBoxJumpType(), h.autoJump = l.autoJump, h.replay = l.replay, h.preJump = l.preJump), o && (h.isControllerPreview = o), h.width = u.width, h.height = u.height, h.backgroundImage = u.backgroundImage, h.backgroundImage && s && (h.backgroundImage = "./img/" + u.imgFileName), h.backgroundColor = u.backgroundColor;
				var p = u.getSpriteList();
				return $(p).each(function(e, t) {
					t.imgUrl && (s ? c["./img/" + t.imgFileName] = 1 : c[t.imgUrl] = 1);
					var n = r.getFramesBarById(t.id);
					if (n.length) {
						$(n).each(function(e, n) {
							var r = f.getElementAnimationObject(t, n.emitType, n.emitEventName, i, s);
							n.emitType == "none" ? h.transitionArr.push(r) : n.emitType == "eventEmit" && h.eventTransitionArr.push({
								emitEventName: n.emitEventName,
								isListenOnce: n.isListenOnce,
								animationObj: r
							})
						});
						if (!t.getCommondFramesBar()) {
							var o = f.getElementAnimationObject(t, i, s);
							h.transitionArr.push(o)
						}
					} else {
						var o = f.getElementAnimationObject(t, i, s);
						h.transitionArr.push(o)
					}
				}), h.spriteImgUrlsMap = c, h
			},
			play: function() {
				var e = this,
					t = r.getCurrentFramesBar();
				if (!t) {
					var s = r.getFramesBars();
					if (!s.length) return;
					t = s[0], t.select()
				}
				$("body").addClass("playing_animation"), t.reset();
				var o = n.getCurrentStage(),
					u = this.getTypeAnimationObject(o.id, t.emitType, t.emitEventName);
				u.totalCallback = function() {
					g = "end", e.setPlayIcon()
				}, g = "playing", this.setPauseIcon(), w = new i, w.add(u), w.run(), $(window).trigger("playAnimation", {
					framesBar: t
				}), this.addPresetAnimationBtn.addClass("disable")
			},
			pause: function() {
				var e = n.getCurrentStage();
				g = "pause", this.setPlayIcon(), w && w.pause(), $(window).trigger("pauseAnimation", {
					stageId: e.id
				})
			},
			resume: function() {
				var e = n.getCurrentStage();
				g = "playing", this.setPauseIcon(), w && w.resume(), $(window).trigger("resumeAnimation", {
					stageId: e.id
				})
			},
			stop: function(e) {
				var t = n.getCurrentStage();
				if (!t) return;
				console.log("Index stop animation"), $("body").removeClass("playing_animation"), g = null, w && w.stop(), E.length && ($.each(E, function(e, t) {
					t.stop()
				}), E = []), this.setPlayIcon(), $(window).trigger("stopAnimation", {
					stageId: t.id,
					isReset: e
				}), this.addPresetAnimationBtn.removeClass("disable")
			},
			setPlayIcon: function() {
				this.playButtonIcon[0].className = "glyphicon glyphicon-play"
			},
			setPauseIcon: function() {
				this.playButtonIcon[0].className = "glyphicon glyphicon-pause"
			},
			setStopIcon: function() {
				this.playButtonIcon[0].className = "glyphicon glyphicon-stop"
			}
		};
		return A
	}), require.config({
		paths: {
			jquery: "./base/jquery",
			"jquery-event-swipe": "./base/jquery-event-swipe",
			"jquery-ui": "./base/jquery-ui",
			color_picker: "./util/jq_color_picker",
			preset_animation_config: "./preset_animation/preset_animation_config",
			preset_animation_editor: "./preset_animation/preset_animation_editor",
			controller_setting: "./controller_setting/controller_setting",
			tween: "./util/tween",
			drag: "./util/drag",
			drag_live: "./util/drag_live",
			rotatable: "./util/rotatable",
			handlebars: "./base/handlebars",
			tmpl: "./templates/templates",
			index: "./index/index",
			pages: "./pages/pages",
			stages: "./stages/stages",
			framesbar: "./framesbar/framesbar",
			sprite: "./sprite/sprite",
			controller: "./controller/controller",
			util: "./util/util",
			timeline: "./timeline/timeline",
			transition: "./transition/transition",
			csseditor: "./csseditor/csseditor",
			main_show: "./main_show/main_show",
			user_images: "./user_images/user_images",
			dropmenu: "./components/dropmenu/dropmenu",
			sprite_event_animation_setting: "./sprite_event_animation_setting/sprite_event_animation_setting",
			"sprite-action-setting": "./sprite-action-setting/sprite-action-setting",
			frame_mark: "./frame_mark/frame_mark",
			fbf_animation_editor: "./fbf_animation_editor/fbf_animation_editor",
			img_path_setting: "./img_path_setting/img_path_setting",
			background_setting: "./background_setting/background_setting",
			win_manager: "./win_manager/win_manager",
			keyframe: "./keyframe/keyframe",
			frame: "./frame/frame",
			work_list: "./work_list/work_list",
			stage_transition_config: "./stages/stage_transition_config",
			main_page: "./main_page/main_page",
			"layer-size-setting": "./layer-size-setting/layer-size-setting",
			sprite_list: "./sprite_list/sprite_list"
		}
	}), require(["index"], function(e) {
		e.init()
	}), define("main", function() {});