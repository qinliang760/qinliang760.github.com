if (function(a, b) {
		"object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
			if (!a.document) throw new Error("jQuery requires a window with a document");
			return b(a)
		} : b(a)
	}("undefined" != typeof window ? window : this, function(a, b) {
		function c(a) {
			var b = a.length,
				c = _.type(a);
			return "function" === c || _.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
		}

		function d(a, b, c) {
			if (_.isFunction(b)) return _.grep(a, function(a, d) {
				return !!b.call(a, d, a) !== c
			});
			if (b.nodeType) return _.grep(a, function(a) {
				return a === b !== c
			});
			if ("string" == typeof b) {
				if (ha.test(b)) return _.filter(b, a, c);
				b = _.filter(b, a)
			}
			return _.grep(a, function(a) {
				return U.call(b, a) >= 0 !== c
			})
		}

		function e(a, b) {
			for (;
				(a = a[b]) && 1 !== a.nodeType;);
			return a
		}

		function f(a) {
			var b = oa[a] = {};
			return _.each(a.match(na) || [], function(a, c) {
				b[c] = !0
			}), b
		}

		function g() {
			Z.removeEventListener("DOMContentLoaded", g, !1), a.removeEventListener("load", g, !1), _.ready()
		}

		function h() {
			Object.defineProperty(this.cache = {}, 0, {
				get: function() {
					return {}
				}
			}), this.expando = _.expando + h.uid++
		}

		function i(a, b, c) {
			var d;
			if (void 0 === c && 1 === a.nodeType)
				if (d = "data-" + b.replace(ua, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
					try {
						c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : ta.test(c) ? _.parseJSON(c) : c
					} catch (e) {}
					sa.set(a, b, c)
				} else c = void 0;
			return c
		}

		function j() {
			return !0
		}

		function k() {
			return !1
		}

		function l() {
			try {
				return Z.activeElement
			} catch (a) {}
		}

		function m(a, b) {
			return _.nodeName(a, "table") && _.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
		}

		function n(a) {
			return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
		}

		function o(a) {
			var b = Ka.exec(a.type);
			return b ? a.type = b[1] : a.removeAttribute("type"), a
		}

		function p(a, b) {
			for (var c = 0, d = a.length; d > c; c++) ra.set(a[c], "globalEval", !b || ra.get(b[c], "globalEval"))
		}

		function q(a, b) {
			var c, d, e, f, g, h, i, j;
			if (1 === b.nodeType) {
				if (ra.hasData(a) && (f = ra.access(a), g = ra.set(b, f), j = f.events)) {
					delete g.handle, g.events = {};
					for (e in j)
						for (c = 0, d = j[e].length; d > c; c++) _.event.add(b, e, j[e][c])
				}
				sa.hasData(a) && (h = sa.access(a), i = _.extend({}, h), sa.set(b, i))
			}
		}

		function r(a, b) {
			var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
			return void 0 === b || b && _.nodeName(a, b) ? _.merge([a], c) : c
		}

		function s(a, b) {
			var c = b.nodeName.toLowerCase();
			"input" === c && ya.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
		}

		function t(b, c) {
			var d, e = _(c.createElement(b)).appendTo(c.body),
				f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : _.css(e[0], "display");
			return e.detach(), f
		}

		function u(a) {
			var b = Z,
				c = Oa[a];
			return c || (c = t(a, b), "none" !== c && c || (Na = (Na || _("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = Na[0].contentDocument, b.write(), b.close(), c = t(a, b), Na.detach()), Oa[a] = c), c
		}

		function v(a, b, c) {
			var d, e, f, g, h = a.style;
			return c = c || Ra(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || _.contains(a.ownerDocument, a) || (g = _.style(a, b)), Qa.test(g) && Pa.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
		}

		function w(a, b) {
			return {
				get: function() {
					return a() ? void delete this.get : (this.get = b).apply(this, arguments)
				}
			}
		}

		function x(a, b) {
			if (b in a) return b;
			for (var c = b[0].toUpperCase() + b.slice(1), d = b, e = Xa.length; e--;)
				if (b = Xa[e] + c, b in a) return b;
			return d
		}

		function y(a, b, c) {
			var d = Ta.exec(b);
			return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
		}

		function z(a, b, c, d, e) {
			for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += _.css(a, c + wa[f], !0, e)), d ? ("content" === c && (g -= _.css(a, "padding" + wa[f], !0, e)), "margin" !== c && (g -= _.css(a, "border" + wa[f] + "Width", !0, e))) : (g += _.css(a, "padding" + wa[f], !0, e), "padding" !== c && (g += _.css(a, "border" + wa[f] + "Width", !0, e)));
			return g
		}

		function A(a, b, c) {
			var d = !0,
				e = "width" === b ? a.offsetWidth : a.offsetHeight,
				f = Ra(a),
				g = "border-box" === _.css(a, "boxSizing", !1, f);
			if (0 >= e || null == e) {
				if (e = v(a, b, f), (0 > e || null == e) && (e = a.style[b]), Qa.test(e)) return e;
				d = g && (Y.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
			}
			return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px"
		}

		function B(a, b) {
			for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = ra.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && xa(d) && (f[g] = ra.access(d, "olddisplay", u(d.nodeName)))) : (e = xa(d), "none" === c && e || ra.set(d, "olddisplay", e ? c : _.css(d, "display"))));
			for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
			return a
		}

		function C(a, b, c, d, e) {
			return new C.prototype.init(a, b, c, d, e)
		}

		function D() {
			return setTimeout(function() {
				Ya = void 0
			}), Ya = _.now()
		}

		function E(a, b) {
			var c, d = 0,
				e = {
					height: a
				};
			for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = wa[d], e["margin" + c] = e["padding" + c] = a;
			return b && (e.opacity = e.width = a), e
		}

		function F(a, b, c) {
			for (var d, e = (cb[b] || []).concat(cb["*"]), f = 0, g = e.length; g > f; f++)
				if (d = e[f].call(c, b, a)) return d
		}

		function G(a, b, c) {
			var d, e, f, g, h, i, j, k, l = this,
				m = {},
				n = a.style,
				o = a.nodeType && xa(a),
				p = ra.get(a, "fxshow");
			c.queue || (h = _._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
				h.unqueued || i()
			}), h.unqueued++, l.always(function() {
				l.always(function() {
					h.unqueued--, _.queue(a, "fx").length || h.empty.fire()
				})
			})), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = _.css(a, "display"), k = "none" === j ? ra.get(a, "olddisplay") || u(a.nodeName) : j, "inline" === k && "none" === _.css(a, "float") && (n.display = "inline-block")), c.overflow && (n.overflow = "hidden", l.always(function() {
				n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
			}));
			for (d in b)
				if (e = b[d], $a.exec(e)) {
					if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
						if ("show" !== e || !p || void 0 === p[d]) continue;
						o = !0
					}
					m[d] = p && p[d] || _.style(a, d)
				} else j = void 0;
			if (_.isEmptyObject(m)) "inline" === ("none" === j ? u(a.nodeName) : j) && (n.display = j);
			else {
				p ? "hidden" in p && (o = p.hidden) : p = ra.access(a, "fxshow", {}), f && (p.hidden = !o), o ? _(a).show() : l.done(function() {
					_(a).hide()
				}), l.done(function() {
					var b;
					ra.remove(a, "fxshow");
					for (b in m) _.style(a, b, m[b])
				});
				for (d in m) g = F(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
			}
		}

		function H(a, b) {
			var c, d, e, f, g;
			for (c in a)
				if (d = _.camelCase(c), e = b[d], f = a[c], _.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = _.cssHooks[d], g && "expand" in g) {
					f = g.expand(f), delete a[d];
					for (c in f) c in a || (a[c] = f[c], b[c] = e)
				} else b[d] = e
		}

		function I(a, b, c) {
			var d, e, f = 0,
				g = bb.length,
				h = _.Deferred().always(function() {
					delete i.elem
				}),
				i = function() {
					if (e) return !1;
					for (var b = Ya || D(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
					return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
				},
				j = h.promise({
					elem: a,
					props: _.extend({}, b),
					opts: _.extend(!0, {
						specialEasing: {}
					}, c),
					originalProperties: b,
					originalOptions: c,
					startTime: Ya || D(),
					duration: c.duration,
					tweens: [],
					createTween: function(b, c) {
						var d = _.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
						return j.tweens.push(d), d
					},
					stop: function(b) {
						var c = 0,
							d = b ? j.tweens.length : 0;
						if (e) return this;
						for (e = !0; d > c; c++) j.tweens[c].run(1);
						return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
					}
				}),
				k = j.props;
			for (H(k, j.opts.specialEasing); g > f; f++)
				if (d = bb[f].call(j, a, k, j.opts)) return d;
			return _.map(k, F, j), _.isFunction(j.opts.start) && j.opts.start.call(a, j), _.fx.timer(_.extend(i, {
				elem: a,
				anim: j,
				queue: j.opts.queue
			})), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
		}

		function J(a) {
			return function(b, c) {
				"string" != typeof b && (c = b, b = "*");
				var d, e = 0,
					f = b.toLowerCase().match(na) || [];
				if (_.isFunction(c))
					for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
			}
		}

		function K(a, b, c, d) {
			function e(h) {
				var i;
				return f[h] = !0, _.each(a[h] || [], function(a, h) {
					var j = h(b, c, d);
					return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
				}), i
			}
			var f = {},
				g = a === tb;
			return e(b.dataTypes[0]) || !f["*"] && e("*")
		}

		function L(a, b) {
			var c, d, e = _.ajaxSettings.flatOptions || {};
			for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
			return d && _.extend(!0, a, d), a
		}

		function M(a, b, c) {
			for (var d, e, f, g, h = a.contents, i = a.dataTypes;
				"*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
			if (d)
				for (e in h)
					if (h[e] && h[e].test(d)) {
						i.unshift(e);
						break
					}
			if (i[0] in c) f = i[0];
			else {
				for (e in c) {
					if (!i[0] || a.converters[e + " " + i[0]]) {
						f = e;
						break
					}
					g || (g = e)
				}
				f = f || g
			}
			return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
		}

		function N(a, b, c, d) {
			var e, f, g, h, i, j = {},
				k = a.dataTypes.slice();
			if (k[1])
				for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
			for (f = k.shift(); f;)
				if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
					if ("*" === f) f = i;
					else if ("*" !== i && i !== f) {
				if (g = j[i + " " + f] || j["* " + f], !g)
					for (e in j)
						if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
							g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
							break
						}
				if (g !== !0)
					if (g && a["throws"]) b = g(b);
					else try {
						b = g(b)
					} catch (l) {
						return {
							state: "parsererror",
							error: g ? l : "No conversion from " + i + " to " + f
						}
					}
			}
			return {
				state: "success",
				data: b
			}
		}

		function O(a, b, c, d) {
			var e;
			if (_.isArray(b)) _.each(b, function(b, e) {
				c || yb.test(a) ? d(a, e) : O(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
			});
			else if (c || "object" !== _.type(b)) d(a, b);
			else
				for (e in b) O(a + "[" + e + "]", b[e], c, d)
		}

		function P(a) {
			return _.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
		}
		var Q = [],
			R = Q.slice,
			S = Q.concat,
			T = Q.push,
			U = Q.indexOf,
			V = {},
			W = V.toString,
			X = V.hasOwnProperty,
			Y = {},
			Z = a.document,
			$ = "2.1.3",
			_ = function(a, b) {
				return new _.fn.init(a, b)
			},
			aa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			ba = /^-ms-/,
			ca = /-([\da-z])/gi,
			da = function(a, b) {
				return b.toUpperCase()
			};
		_.fn = _.prototype = {
			jquery: $,
			constructor: _,
			selector: "",
			length: 0,
			toArray: function() {
				return R.call(this)
			},
			get: function(a) {
				return null != a ? 0 > a ? this[a + this.length] : this[a] : R.call(this)
			},
			pushStack: function(a) {
				var b = _.merge(this.constructor(), a);
				return b.prevObject = this, b.context = this.context, b
			},
			each: function(a, b) {
				return _.each(this, a, b)
			},
			map: function(a) {
				return this.pushStack(_.map(this, function(b, c) {
					return a.call(b, c, b)
				}))
			},
			slice: function() {
				return this.pushStack(R.apply(this, arguments))
			},
			first: function() {
				return this.eq(0)
			},
			last: function() {
				return this.eq(-1)
			},
			eq: function(a) {
				var b = this.length,
					c = +a + (0 > a ? b : 0);
				return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
			},
			end: function() {
				return this.prevObject || this.constructor(null)
			},
			push: T,
			sort: Q.sort,
			splice: Q.splice
		}, _.extend = _.fn.extend = function() {
			var a, b, c, d, e, f, g = arguments[0] || {},
				h = 1,
				i = arguments.length,
				j = !1;
			for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || _.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
				if (null != (a = arguments[h]))
					for (b in a) c = g[b], d = a[b], g !== d && (j && d && (_.isPlainObject(d) || (e = _.isArray(d))) ? (e ? (e = !1, f = c && _.isArray(c) ? c : []) : f = c && _.isPlainObject(c) ? c : {}, g[b] = _.extend(j, f, d)) : void 0 !== d && (g[b] = d));
			return g
		}, _.extend({
			expando: "jQuery" + ($ + Math.random()).replace(/\D/g, ""),
			isReady: !0,
			error: function(a) {
				throw new Error(a)
			},
			noop: function() {},
			isFunction: function(a) {
				return "function" === _.type(a)
			},
			isArray: Array.isArray,
			isWindow: function(a) {
				return null != a && a === a.window
			},
			isNumeric: function(a) {
				return !_.isArray(a) && a - parseFloat(a) + 1 >= 0
			},
			isPlainObject: function(a) {
				return "object" !== _.type(a) || a.nodeType || _.isWindow(a) ? !1 : a.constructor && !X.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0
			},
			isEmptyObject: function(a) {
				var b;
				for (b in a) return !1;
				return !0
			},
			type: function(a) {
				return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? V[W.call(a)] || "object" : typeof a
			},
			globalEval: function(a) {
				var b, c = eval;
				a = _.trim(a), a && (1 === a.indexOf("use strict") ? (b = Z.createElement("script"), b.text = a, Z.head.appendChild(b).parentNode.removeChild(b)) : c(a))
			},
			camelCase: function(a) {
				return a.replace(ba, "ms-").replace(ca, da)
			},
			nodeName: function(a, b) {
				return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
			},
			each: function(a, b, d) {
				var e, f = 0,
					g = a.length,
					h = c(a);
				if (d) {
					if (h)
						for (; g > f && (e = b.apply(a[f], d), e !== !1); f++);
					else
						for (f in a)
							if (e = b.apply(a[f], d), e === !1) break
				} else if (h)
					for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++);
				else
					for (f in a)
						if (e = b.call(a[f], f, a[f]), e === !1) break;
				return a
			},
			trim: function(a) {
				return null == a ? "" : (a + "").replace(aa, "")
			},
			makeArray: function(a, b) {
				var d = b || [];
				return null != a && (c(Object(a)) ? _.merge(d, "string" == typeof a ? [a] : a) : T.call(d, a)), d
			},
			inArray: function(a, b, c) {
				return null == b ? -1 : U.call(b, a, c)
			},
			merge: function(a, b) {
				for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
				return a.length = e, a
			},
			grep: function(a, b, c) {
				for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
				return e
			},
			map: function(a, b, d) {
				var e, f = 0,
					g = a.length,
					h = c(a),
					i = [];
				if (h)
					for (; g > f; f++) e = b(a[f], f, d), null != e && i.push(e);
				else
					for (f in a) e = b(a[f], f, d), null != e && i.push(e);
				return S.apply([], i)
			},
			guid: 1,
			proxy: function(a, b) {
				var c, d, e;
				return "string" == typeof b && (c = a[b], b = a, a = c), _.isFunction(a) ? (d = R.call(arguments, 2), e = function() {
					return a.apply(b || this, d.concat(R.call(arguments)))
				}, e.guid = a.guid = a.guid || _.guid++, e) : void 0
			},
			now: Date.now,
			support: Y
		}), _.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
			V["[object " + b + "]"] = b.toLowerCase()
		});
		var ea = function(a) {
			function b(a, b, c, d) {
				var e, f, g, h, i, j, l, n, o, p;
				if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], h = b.nodeType, "string" != typeof a || !a || 1 !== h && 9 !== h && 11 !== h) return c;
				if (!d && I) {
					if (11 !== h && (e = sa.exec(a)))
						if (g = e[1]) {
							if (9 === h) {
								if (f = b.getElementById(g), !f || !f.parentNode) return c;
								if (f.id === g) return c.push(f), c
							} else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
						} else {
							if (e[2]) return $.apply(c, b.getElementsByTagName(a)), c;
							if ((g = e[3]) && v.getElementsByClassName) return $.apply(c, b.getElementsByClassName(g)), c
						}
					if (v.qsa && (!J || !J.test(a))) {
						if (n = l = N, o = b, p = 1 !== h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
							for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ua, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;) j[i] = n + m(j[i]);
							o = ta.test(a) && k(b.parentNode) || b, p = j.join(",")
						}
						if (p) try {
							return $.apply(c, o.querySelectorAll(p)), c
						} catch (q) {} finally {
							l || b.removeAttribute("id")
						}
					}
				}
				return B(a.replace(ia, "$1"), b, c, d)
			}

			function c() {
				function a(c, d) {
					return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d
				}
				var b = [];
				return a
			}

			function d(a) {
				return a[N] = !0, a
			}

			function e(a) {
				var b = G.createElement("div");
				try {
					return !!a(b)
				} catch (c) {
					return !1
				} finally {
					b.parentNode && b.parentNode.removeChild(b), b = null
				}
			}

			function f(a, b) {
				for (var c = a.split("|"), d = a.length; d--;) w.attrHandle[c[d]] = b
			}

			function g(a, b) {
				var c = b && a,
					d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
				if (d) return d;
				if (c)
					for (; c = c.nextSibling;)
						if (c === b) return -1;
				return a ? 1 : -1
			}

			function h(a) {
				return function(b) {
					var c = b.nodeName.toLowerCase();
					return "input" === c && b.type === a
				}
			}

			function i(a) {
				return function(b) {
					var c = b.nodeName.toLowerCase();
					return ("input" === c || "button" === c) && b.type === a
				}
			}

			function j(a) {
				return d(function(b) {
					return b = +b, d(function(c, d) {
						for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
					})
				})
			}

			function k(a) {
				return a && "undefined" != typeof a.getElementsByTagName && a
			}

			function l() {}

			function m(a) {
				for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
				return d
			}

			function n(a, b, c) {
				var d = b.dir,
					e = c && "parentNode" === d,
					f = Q++;
				return b.first ? function(b, c, f) {
					for (; b = b[d];)
						if (1 === b.nodeType || e) return a(b, c, f)
				} : function(b, c, g) {
					var h, i, j = [P, f];
					if (g) {
						for (; b = b[d];)
							if ((1 === b.nodeType || e) && a(b, c, g)) return !0
					} else
						for (; b = b[d];)
							if (1 === b.nodeType || e) {
								if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
								if (i[d] = j, j[2] = a(b, c, g)) return !0
							}
				}
			}

			function o(a) {
				return a.length > 1 ? function(b, c, d) {
					for (var e = a.length; e--;)
						if (!a[e](b, c, d)) return !1;
					return !0
				} : a[0]
			}

			function p(a, c, d) {
				for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
				return d
			}

			function q(a, b, c, d, e) {
				for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
				return g
			}

			function r(a, b, c, e, f, g) {
				return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) {
					var j, k, l, m = [],
						n = [],
						o = g.length,
						r = d || p(b || "*", h.nodeType ? [h] : h, []),
						s = !a || !d && b ? r : q(r, m, a, h, i),
						t = c ? f || (d ? a : o || e) ? [] : g : s;
					if (c && c(s, t, h, i), e)
						for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
					if (d) {
						if (f || a) {
							if (f) {
								for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
								f(null, t = [], j, i)
							}
							for (k = t.length; k--;)(l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
						}
					} else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t)
				})
			}

			function s(a) {
				for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) {
						return a === b
					}, g, !0), j = n(function(a) {
						return aa(b, a) > -1
					}, g, !0), k = [function(a, c, d) {
						var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
						return b = null, e
					}]; e > h; h++)
					if (c = w.relative[a[h].type]) k = [n(o(k), c)];
					else {
						if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
							for (d = ++h; e > d && !w.relative[a[d].type]; d++);
							return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
								value: " " === a[h - 2].type ? "*" : ""
							})).replace(ia, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a))
						}
						k.push(c)
					}
				return o(k)
			}

			function t(a, c) {
				var e = c.length > 0,
					f = a.length > 0,
					g = function(d, g, h, i, j) {
						var k, l, m, n = 0,
							o = "0",
							p = d && [],
							r = [],
							s = C,
							t = d || f && w.find.TAG("*", j),
							u = P += null == s ? 1 : Math.random() || .1,
							v = t.length;
						for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
							if (f && k) {
								for (l = 0; m = a[l++];)
									if (m(k, g, h)) {
										i.push(k);
										break
									}
								j && (P = u)
							}
							e && ((k = !m && k) && n--, d && p.push(k))
						}
						if (n += o, e && o !== n) {
							for (l = 0; m = c[l++];) m(p, r, g, h);
							if (d) {
								if (n > 0)
									for (; o--;) p[o] || r[o] || (r[o] = Y.call(i));
								r = q(r)
							}
							$.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
						}
						return j && (P = u, C = s), p
					};
				return e ? d(g) : g
			}
			var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date,
				O = a.document,
				P = 0,
				Q = 0,
				R = c(),
				S = c(),
				T = c(),
				U = function(a, b) {
					return a === b && (E = !0), 0
				},
				V = 1 << 31,
				W = {}.hasOwnProperty,
				X = [],
				Y = X.pop,
				Z = X.push,
				$ = X.push,
				_ = X.slice,
				aa = function(a, b) {
					for (var c = 0, d = a.length; d > c; c++)
						if (a[c] === b) return c;
					return -1
				},
				ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
				ca = "[\\x20\\t\\r\\n\\f]",
				da = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
				ea = da.replace("w", "w#"),
				fa = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ea + "))|)" + ca + "*\\]",
				ga = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fa + ")*)|.*)\\)|)",
				ha = new RegExp(ca + "+", "g"),
				ia = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
				ja = new RegExp("^" + ca + "*," + ca + "*"),
				ka = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
				la = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"),
				ma = new RegExp(ga),
				na = new RegExp("^" + ea + "$"),
				oa = {
					ID: new RegExp("^#(" + da + ")"),
					CLASS: new RegExp("^\\.(" + da + ")"),
					TAG: new RegExp("^(" + da.replace("w", "w*") + ")"),
					ATTR: new RegExp("^" + fa),
					PSEUDO: new RegExp("^" + ga),
					CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
					bool: new RegExp("^(?:" + ba + ")$", "i"),
					needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
				},
				pa = /^(?:input|select|textarea|button)$/i,
				qa = /^h\d$/i,
				ra = /^[^{]+\{\s*\[native \w/,
				sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
				ta = /[+~]/,
				ua = /'|\\/g,
				va = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"),
				wa = function(a, b, c) {
					var d = "0x" + b - 65536;
					return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
				},
				xa = function() {
					F()
				};
			try {
				$.apply(X = _.call(O.childNodes), O.childNodes), X[O.childNodes.length].nodeType
			} catch (ya) {
				$ = {
					apply: X.length ? function(a, b) {
						Z.apply(a, _.call(b))
					} : function(a, b) {
						for (var c = a.length, d = 0; a[c++] = b[d++];);
						a.length = c - 1
					}
				}
			}
			v = b.support = {}, y = b.isXML = function(a) {
				var b = a && (a.ownerDocument || a).documentElement;
				return b ? "HTML" !== b.nodeName : !1
			}, F = b.setDocument = function(a) {
				var b, c, d = a ? a.ownerDocument || a : O;
				return d !== G && 9 === d.nodeType && d.documentElement ? (G = d, H = d.documentElement, c = d.defaultView, c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)), I = !y(d), v.attributes = e(function(a) {
					return a.className = "i", !a.getAttribute("className")
				}), v.getElementsByTagName = e(function(a) {
					return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length
				}), v.getElementsByClassName = ra.test(d.getElementsByClassName), v.getById = e(function(a) {
					return H.appendChild(a).id = N, !d.getElementsByName || !d.getElementsByName(N).length
				}), v.getById ? (w.find.ID = function(a, b) {
					if ("undefined" != typeof b.getElementById && I) {
						var c = b.getElementById(a);
						return c && c.parentNode ? [c] : []
					}
				}, w.filter.ID = function(a) {
					var b = a.replace(va, wa);
					return function(a) {
						return a.getAttribute("id") === b
					}
				}) : (delete w.find.ID, w.filter.ID = function(a) {
					var b = a.replace(va, wa);
					return function(a) {
						var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
						return c && c.value === b
					}
				}), w.find.TAG = v.getElementsByTagName ? function(a, b) {
					return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0
				} : function(a, b) {
					var c, d = [],
						e = 0,
						f = b.getElementsByTagName(a);
					if ("*" === a) {
						for (; c = f[e++];) 1 === c.nodeType && d.push(c);
						return d
					}
					return f
				}, w.find.CLASS = v.getElementsByClassName && function(a, b) {
					return I ? b.getElementsByClassName(a) : void 0
				}, K = [], J = [], (v.qsa = ra.test(d.querySelectorAll)) && (e(function(a) {
					H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + ca + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + ca + "*(?:value|" + ba + ")"), a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="), a.querySelectorAll(":checked").length || J.push(":checked"), a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]")
				}), e(function(a) {
					var b = d.createElement("input");
					b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + ca + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
				})), (v.matchesSelector = ra.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
					v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", ga)
				}), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = ra.test(H.compareDocumentPosition), M = b || ra.test(H.contains) ? function(a, b) {
					var c = 9 === a.nodeType ? a.documentElement : a,
						d = b && b.parentNode;
					return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
				} : function(a, b) {
					if (b)
						for (; b = b.parentNode;)
							if (b === a) return !0;
					return !1
				}, U = b ? function(a, b) {
					if (a === b) return E = !0, 0;
					var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
					return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === d || a.ownerDocument === O && M(O, a) ? -1 : b === d || b.ownerDocument === O && M(O, b) ? 1 : D ? aa(D, a) - aa(D, b) : 0 : 4 & c ? -1 : 1)
				} : function(a, b) {
					if (a === b) return E = !0, 0;
					var c, e = 0,
						f = a.parentNode,
						h = b.parentNode,
						i = [a],
						j = [b];
					if (!f || !h) return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? aa(D, a) - aa(D, b) : 0;
					if (f === h) return g(a, b);
					for (c = a; c = c.parentNode;) i.unshift(c);
					for (c = b; c = c.parentNode;) j.unshift(c);
					for (; i[e] === j[e];) e++;
					return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
				}, d) : G
			}, b.matches = function(a, c) {
				return b(a, null, null, c)
			}, b.matchesSelector = function(a, c) {
				if ((a.ownerDocument || a) !== G && F(a), c = c.replace(la, "='$1']"), !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
					var d = L.call(a, c);
					if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
				} catch (e) {}
				return b(c, G, null, [a]).length > 0
			}, b.contains = function(a, b) {
				return (a.ownerDocument || a) !== G && F(a), M(a, b)
			}, b.attr = function(a, b) {
				(a.ownerDocument || a) !== G && F(a);
				var c = w.attrHandle[b.toLowerCase()],
					d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
				return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
			}, b.error = function(a) {
				throw new Error("Syntax error, unrecognized expression: " + a)
			}, b.uniqueSort = function(a) {
				var b, c = [],
					d = 0,
					e = 0;
				if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
					for (; b = a[e++];) b === a[e] && (d = c.push(e));
					for (; d--;) a.splice(c[d], 1)
				}
				return D = null, a
			}, x = b.getText = function(a) {
				var b, c = "",
					d = 0,
					e = a.nodeType;
				if (e) {
					if (1 === e || 9 === e || 11 === e) {
						if ("string" == typeof a.textContent) return a.textContent;
						for (a = a.firstChild; a; a = a.nextSibling) c += x(a)
					} else if (3 === e || 4 === e) return a.nodeValue
				} else
					for (; b = a[d++];) c += x(b);
				return c
			}, w = b.selectors = {
				cacheLength: 50,
				createPseudo: d,
				match: oa,
				attrHandle: {},
				find: {},
				relative: {
					">": {
						dir: "parentNode",
						first: !0
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: !0
					},
					"~": {
						dir: "previousSibling"
					}
				},
				preFilter: {
					ATTR: function(a) {
						return a[1] = a[1].replace(va, wa), a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
					},
					CHILD: function(a) {
						return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
					},
					PSEUDO: function(a) {
						var b, c = !a[6] && a[2];
						return oa.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
					}
				},
				filter: {
					TAG: function(a) {
						var b = a.replace(va, wa).toLowerCase();
						return "*" === a ? function() {
							return !0
						} : function(a) {
							return a.nodeName && a.nodeName.toLowerCase() === b
						}
					},
					CLASS: function(a) {
						var b = R[a + " "];
						return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && R(a, function(a) {
							return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
						})
					},
					ATTR: function(a, c, d) {
						return function(e) {
							var f = b.attr(e, a);
							return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ha, " ") + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
						}
					},
					CHILD: function(a, b, c, d, e) {
						var f = "nth" !== a.slice(0, 3),
							g = "last" !== a.slice(-4),
							h = "of-type" === b;
						return 1 === d && 0 === e ? function(a) {
							return !!a.parentNode
						} : function(b, c, i) {
							var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
								q = b.parentNode,
								r = h && b.nodeName.toLowerCase(),
								s = !i && !h;
							if (q) {
								if (f) {
									for (; p;) {
										for (l = b; l = l[p];)
											if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
										o = p = "only" === a && !o && "nextSibling"
									}
									return !0
								}
								if (o = [g ? q.firstChild : q.lastChild], g && s) {
									for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
										if (1 === l.nodeType && ++m && l === b) {
											k[a] = [P, n, m];
											break
										}
								} else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
								else
									for (;
										(l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
								return m -= e, m === d || m % d === 0 && m / d >= 0
							}
						}
					},
					PSEUDO: function(a, c) {
						var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
						return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
							for (var d, e = f(a, c), g = e.length; g--;) d = aa(a, e[g]), a[d] = !(b[d] = e[g])
						}) : function(a) {
							return f(a, 0, e)
						}) : f
					}
				},
				pseudos: {
					not: d(function(a) {
						var b = [],
							c = [],
							e = A(a.replace(ia, "$1"));
						return e[N] ? d(function(a, b, c, d) {
							for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
						}) : function(a, d, f) {
							return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop()
						}
					}),
					has: d(function(a) {
						return function(c) {
							return b(a, c).length > 0
						}
					}),
					contains: d(function(a) {
						return a = a.replace(va, wa),
							function(b) {
								return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
							}
					}),
					lang: d(function(a) {
						return na.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(va, wa).toLowerCase(),
							function(b) {
								var c;
								do
									if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
								while ((b = b.parentNode) && 1 === b.nodeType);
								return !1
							}
					}),
					target: function(b) {
						var c = a.location && a.location.hash;
						return c && c.slice(1) === b.id
					},
					root: function(a) {
						return a === H
					},
					focus: function(a) {
						return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
					},
					enabled: function(a) {
						return a.disabled === !1
					},
					disabled: function(a) {
						return a.disabled === !0
					},
					checked: function(a) {
						var b = a.nodeName.toLowerCase();
						return "input" === b && !!a.checked || "option" === b && !!a.selected
					},
					selected: function(a) {
						return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
					},
					empty: function(a) {
						for (a = a.firstChild; a; a = a.nextSibling)
							if (a.nodeType < 6) return !1;
						return !0
					},
					parent: function(a) {
						return !w.pseudos.empty(a)
					},
					header: function(a) {
						return qa.test(a.nodeName)
					},
					input: function(a) {
						return pa.test(a.nodeName)
					},
					button: function(a) {
						var b = a.nodeName.toLowerCase();
						return "input" === b && "button" === a.type || "button" === b
					},
					text: function(a) {
						var b;
						return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
					},
					first: j(function() {
						return [0]
					}),
					last: j(function(a, b) {
						return [b - 1]
					}),
					eq: j(function(a, b, c) {
						return [0 > c ? c + b : c]
					}),
					even: j(function(a, b) {
						for (var c = 0; b > c; c += 2) a.push(c);
						return a
					}),
					odd: j(function(a, b) {
						for (var c = 1; b > c; c += 2) a.push(c);
						return a
					}),
					lt: j(function(a, b, c) {
						for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
						return a
					}),
					gt: j(function(a, b, c) {
						for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
						return a
					})
				}
			}, w.pseudos.nth = w.pseudos.eq;
			for (u in {
					radio: !0,
					checkbox: !0,
					file: !0,
					password: !0,
					image: !0
				}) w.pseudos[u] = h(u);
			for (u in {
					submit: !0,
					reset: !0
				}) w.pseudos[u] = i(u);
			return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function(a, c) {
				var d, e, f, g, h, i, j, k = S[a + " "];
				if (k) return c ? 0 : k.slice(0);
				for (h = a, i = [], j = w.preFilter; h;) {
					(!d || (e = ja.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ka.exec(h)) && (d = e.shift(), f.push({
						value: d,
						type: e[0].replace(ia, " ")
					}), h = h.slice(d.length));
					for (g in w.filter) !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
						value: d,
						type: g,
						matches: e
					}), h = h.slice(d.length));
					if (!d) break
				}
				return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
			}, A = b.compile = function(a, b) {
				var c, d = [],
					e = [],
					f = T[a + " "];
				if (!f) {
					for (b || (b = z(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
					f = T(a, t(e, d)), f.selector = a
				}
				return f
			}, B = b.select = function(a, b, c, d) {
				var e, f, g, h, i, j = "function" == typeof a && a,
					l = !d && z(a = j.selector || a);
				if (c = c || [], 1 === l.length) {
					if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
						if (b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0], !b) return c;
						j && (b = b.parentNode), a = a.slice(f.shift().value.length)
					}
					for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);)
						if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
							if (f.splice(e, 1), a = d.length && m(f), !a) return $.apply(c, d), c;
							break
						}
				}
				return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b), c
			}, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, F(), v.sortDetached = e(function(a) {
				return 1 & a.compareDocumentPosition(G.createElement("div"))
			}), e(function(a) {
				return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
			}) || f("type|href|height|width", function(a, b, c) {
				return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
			}), v.attributes && e(function(a) {
				return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
			}) || f("value", function(a, b, c) {
				return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
			}), e(function(a) {
				return null == a.getAttribute("disabled")
			}) || f(ba, function(a, b, c) {
				var d;
				return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
			}), b
		}(a);
		_.find = ea, _.expr = ea.selectors, _.expr[":"] = _.expr.pseudos, _.unique = ea.uniqueSort, _.text = ea.getText, _.isXMLDoc = ea.isXML, _.contains = ea.contains;
		var fa = _.expr.match.needsContext,
			ga = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
			ha = /^.[^:#\[\.,]*$/;
		_.filter = function(a, b, c) {
			var d = b[0];
			return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? _.find.matchesSelector(d, a) ? [d] : [] : _.find.matches(a, _.grep(b, function(a) {
				return 1 === a.nodeType
			}))
		}, _.fn.extend({
			find: function(a) {
				var b, c = this.length,
					d = [],
					e = this;
				if ("string" != typeof a) return this.pushStack(_(a).filter(function() {
					for (b = 0; c > b; b++)
						if (_.contains(e[b], this)) return !0
				}));
				for (b = 0; c > b; b++) _.find(a, e[b], d);
				return d = this.pushStack(c > 1 ? _.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
			},
			filter: function(a) {
				return this.pushStack(d(this, a || [], !1))
			},
			not: function(a) {
				return this.pushStack(d(this, a || [], !0))
			},
			is: function(a) {
				return !!d(this, "string" == typeof a && fa.test(a) ? _(a) : a || [], !1).length
			}
		});
		var ia, ja = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
			ka = _.fn.init = function(a, b) {
				var c, d;
				if (!a) return this;
				if ("string" == typeof a) {
					if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : ja.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || ia).find(a) : this.constructor(b).find(a);
					if (c[1]) {
						if (b = b instanceof _ ? b[0] : b, _.merge(this, _.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : Z, !0)), ga.test(c[1]) && _.isPlainObject(b))
							for (c in b) _.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
						return this
					}
					return d = Z.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = Z, this.selector = a, this
				}
				return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : _.isFunction(a) ? "undefined" != typeof ia.ready ? ia.ready(a) : a(_) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), _.makeArray(a, this))
			};
		ka.prototype = _.fn, ia = _(Z);
		var la = /^(?:parents|prev(?:Until|All))/,
			ma = {
				children: !0,
				contents: !0,
				next: !0,
				prev: !0
			};
		_.extend({
			dir: function(a, b, c) {
				for (var d = [], e = void 0 !== c;
					(a = a[b]) && 9 !== a.nodeType;)
					if (1 === a.nodeType) {
						if (e && _(a).is(c)) break;
						d.push(a)
					}
				return d
			},
			sibling: function(a, b) {
				for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
				return c
			}
		}), _.fn.extend({
			has: function(a) {
				var b = _(a, this),
					c = b.length;
				return this.filter(function() {
					for (var a = 0; c > a; a++)
						if (_.contains(this, b[a])) return !0
				})
			},
			closest: function(a, b) {
				for (var c, d = 0, e = this.length, f = [], g = fa.test(a) || "string" != typeof a ? _(a, b || this.context) : 0; e > d; d++)
					for (c = this[d]; c && c !== b; c = c.parentNode)
						if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && _.find.matchesSelector(c, a))) {
							f.push(c);
							break
						}
				return this.pushStack(f.length > 1 ? _.unique(f) : f)
			},
			index: function(a) {
				return a ? "string" == typeof a ? U.call(_(a), this[0]) : U.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
			},
			add: function(a, b) {
				return this.pushStack(_.unique(_.merge(this.get(), _(a, b))))
			},
			addBack: function(a) {
				return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
			}
		}), _.each({
			parent: function(a) {
				var b = a.parentNode;
				return b && 11 !== b.nodeType ? b : null
			},
			parents: function(a) {
				return _.dir(a, "parentNode")
			},
			parentsUntil: function(a, b, c) {
				return _.dir(a, "parentNode", c)
			},
			next: function(a) {
				return e(a, "nextSibling")
			},
			prev: function(a) {
				return e(a, "previousSibling")
			},
			nextAll: function(a) {
				return _.dir(a, "nextSibling")
			},
			prevAll: function(a) {
				return _.dir(a, "previousSibling")
			},
			nextUntil: function(a, b, c) {
				return _.dir(a, "nextSibling", c)
			},
			prevUntil: function(a, b, c) {
				return _.dir(a, "previousSibling", c)
			},
			siblings: function(a) {
				return _.sibling((a.parentNode || {}).firstChild, a)
			},
			children: function(a) {
				return _.sibling(a.firstChild)
			},
			contents: function(a) {
				return a.contentDocument || _.merge([], a.childNodes)
			}
		}, function(a, b) {
			_.fn[a] = function(c, d) {
				var e = _.map(this, b, c);
				return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = _.filter(d, e)), this.length > 1 && (ma[a] || _.unique(e), la.test(a) && e.reverse()), this.pushStack(e)
			}
		});
		var na = /\S+/g,
			oa = {};
		_.Callbacks = function(a) {
			a = "string" == typeof a ? oa[a] || f(a) : _.extend({}, a);
			var b, c, d, e, g, h, i = [],
				j = !a.once && [],
				k = function(f) {
					for (b = a.memory && f, c = !0, h = e || 0, e = 0, g = i.length, d = !0; i && g > h; h++)
						if (i[h].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
							b = !1;
							break
						}
					d = !1, i && (j ? j.length && k(j.shift()) : b ? i = [] : l.disable())
				},
				l = {
					add: function() {
						if (i) {
							var c = i.length;
							! function f(b) {
								_.each(b, function(b, c) {
									var d = _.type(c);
									"function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
								})
							}(arguments), d ? g = i.length : b && (e = c, k(b))
						}
						return this
					},
					remove: function() {
						return i && _.each(arguments, function(a, b) {
							for (var c;
								(c = _.inArray(b, i, c)) > -1;) i.splice(c, 1), d && (g >= c && g--, h >= c && h--)
						}), this
					},
					has: function(a) {
						return a ? _.inArray(a, i) > -1 : !(!i || !i.length)
					},
					empty: function() {
						return i = [], g = 0, this
					},
					disable: function() {
						return i = j = b = void 0, this
					},
					disabled: function() {
						return !i
					},
					lock: function() {
						return j = void 0, b || l.disable(), this
					},
					locked: function() {
						return !j
					},
					fireWith: function(a, b) {
						return !i || c && !j || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? j.push(b) : k(b)), this
					},
					fire: function() {
						return l.fireWith(this, arguments), this
					},
					fired: function() {
						return !!c
					}
				};
			return l
		}, _.extend({
			Deferred: function(a) {
				var b = [
						["resolve", "done", _.Callbacks("once memory"), "resolved"],
						["reject", "fail", _.Callbacks("once memory"), "rejected"],
						["notify", "progress", _.Callbacks("memory")]
					],
					c = "pending",
					d = {
						state: function() {
							return c
						},
						always: function() {
							return e.done(arguments).fail(arguments), this
						},
						then: function() {
							var a = arguments;
							return _.Deferred(function(c) {
								_.each(b, function(b, f) {
									var g = _.isFunction(a[b]) && a[b];
									e[f[1]](function() {
										var a = g && g.apply(this, arguments);
										a && _.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
									})
								}), a = null
							}).promise()
						},
						promise: function(a) {
							return null != a ? _.extend(a, d) : d
						}
					},
					e = {};
				return d.pipe = d.then, _.each(b, function(a, f) {
					var g = f[2],
						h = f[3];
					d[f[1]] = g.add, h && g.add(function() {
						c = h
					}, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
						return e[f[0] + "With"](this === e ? d : this, arguments), this
					}, e[f[0] + "With"] = g.fireWith
				}), d.promise(e), a && a.call(e, e), e
			},
			when: function(a) {
				var b, c, d, e = 0,
					f = R.call(arguments),
					g = f.length,
					h = 1 !== g || a && _.isFunction(a.promise) ? g : 0,
					i = 1 === h ? a : _.Deferred(),
					j = function(a, c, d) {
						return function(e) {
							c[a] = this, d[a] = arguments.length > 1 ? R.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
						}
					};
				if (g > 1)
					for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && _.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
				return h || i.resolveWith(d, f), i.promise()
			}
		});
		var pa;
		_.fn.ready = function(a) {
			return _.ready.promise().done(a), this
		}, _.extend({
			isReady: !1,
			readyWait: 1,
			holdReady: function(a) {
				a ? _.readyWait++ : _.ready(!0)
			},
			ready: function(a) {
				(a === !0 ? --_.readyWait : _.isReady) || (_.isReady = !0, a !== !0 && --_.readyWait > 0 || (pa.resolveWith(Z, [_]), _.fn.triggerHandler && (_(Z).triggerHandler("ready"), _(Z).off("ready"))))
			}
		}), _.ready.promise = function(b) {
			return pa || (pa = _.Deferred(), "complete" === Z.readyState ? setTimeout(_.ready) : (Z.addEventListener("DOMContentLoaded", g, !1), a.addEventListener("load", g, !1))), pa.promise(b)
		}, _.ready.promise();
		var qa = _.access = function(a, b, c, d, e, f, g) {
			var h = 0,
				i = a.length,
				j = null == c;
			if ("object" === _.type(c)) {
				e = !0;
				for (h in c) _.access(a, b, h, c[h], !0, f, g)
			} else if (void 0 !== d && (e = !0, _.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
					return j.call(_(a), c)
				})), b))
				for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
			return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
		};
		_.acceptData = function(a) {
			return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
		}, h.uid = 1, h.accepts = _.acceptData, h.prototype = {
			key: function(a) {
				if (!h.accepts(a)) return 0;
				var b = {},
					c = a[this.expando];
				if (!c) {
					c = h.uid++;
					try {
						b[this.expando] = {
							value: c
						}, Object.defineProperties(a, b)
					} catch (d) {
						b[this.expando] = c, _.extend(a, b)
					}
				}
				return this.cache[c] || (this.cache[c] = {}), c
			},
			set: function(a, b, c) {
				var d, e = this.key(a),
					f = this.cache[e];
				if ("string" == typeof b) f[b] = c;
				else if (_.isEmptyObject(f)) _.extend(this.cache[e], b);
				else
					for (d in b) f[d] = b[d];
				return f
			},
			get: function(a, b) {
				var c = this.cache[this.key(a)];
				return void 0 === b ? c : c[b]
			},
			access: function(a, b, c) {
				var d;
				return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, _.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
			},
			remove: function(a, b) {
				var c, d, e, f = this.key(a),
					g = this.cache[f];
				if (void 0 === b) this.cache[f] = {};
				else {
					_.isArray(b) ? d = b.concat(b.map(_.camelCase)) : (e = _.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(na) || [])), c = d.length;
					for (; c--;) delete g[d[c]]
				}
			},
			hasData: function(a) {
				return !_.isEmptyObject(this.cache[a[this.expando]] || {})
			},
			discard: function(a) {
				a[this.expando] && delete this.cache[a[this.expando]]
			}
		};
		var ra = new h,
			sa = new h,
			ta = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
			ua = /([A-Z])/g;
		_.extend({
			hasData: function(a) {
				return sa.hasData(a) || ra.hasData(a)
			},
			data: function(a, b, c) {
				return sa.access(a, b, c)
			},
			removeData: function(a, b) {
				sa.remove(a, b)
			},
			_data: function(a, b, c) {
				return ra.access(a, b, c)
			},
			_removeData: function(a, b) {
				ra.remove(a, b)
			}
		}), _.fn.extend({
			data: function(a, b) {
				var c, d, e, f = this[0],
					g = f && f.attributes;
				if (void 0 === a) {
					if (this.length && (e = sa.get(f), 1 === f.nodeType && !ra.get(f, "hasDataAttrs"))) {
						for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = _.camelCase(d.slice(5)), i(f, d, e[d])));
						ra.set(f, "hasDataAttrs", !0)
					}
					return e
				}
				return "object" == typeof a ? this.each(function() {
					sa.set(this, a)
				}) : qa(this, function(b) {
					var c, d = _.camelCase(a);
					if (f && void 0 === b) {
						if (c = sa.get(f, a), void 0 !== c) return c;
						if (c = sa.get(f, d), void 0 !== c) return c;
						if (c = i(f, d, void 0), void 0 !== c) return c
					} else this.each(function() {
						var c = sa.get(this, d);
						sa.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && sa.set(this, a, b)
					})
				}, null, b, arguments.length > 1, null, !0)
			},
			removeData: function(a) {
				return this.each(function() {
					sa.remove(this, a)
				})
			}
		}), _.extend({
			queue: function(a, b, c) {
				var d;
				return a ? (b = (b || "fx") + "queue", d = ra.get(a, b), c && (!d || _.isArray(c) ? d = ra.access(a, b, _.makeArray(c)) : d.push(c)), d || []) : void 0
			},
			dequeue: function(a, b) {
				b = b || "fx";
				var c = _.queue(a, b),
					d = c.length,
					e = c.shift(),
					f = _._queueHooks(a, b),
					g = function() {
						_.dequeue(a, b)
					};
				"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
			},
			_queueHooks: function(a, b) {
				var c = b + "queueHooks";
				return ra.get(a, c) || ra.access(a, c, {
					empty: _.Callbacks("once memory").add(function() {
						ra.remove(a, [b + "queue", c])
					})
				})
			}
		}), _.fn.extend({
			queue: function(a, b) {
				var c = 2;
				return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? _.queue(this[0], a) : void 0 === b ? this : this.each(function() {
					var c = _.queue(this, a, b);
					_._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && _.dequeue(this, a)
				})
			},
			dequeue: function(a) {
				return this.each(function() {
					_.dequeue(this, a)
				})
			},
			clearQueue: function(a) {
				return this.queue(a || "fx", [])
			},
			promise: function(a, b) {
				var c, d = 1,
					e = _.Deferred(),
					f = this,
					g = this.length,
					h = function() {
						--d || e.resolveWith(f, [f])
					};
				for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = ra.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
				return h(), e.promise(b)
			}
		});
		var va = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
			wa = ["Top", "Right", "Bottom", "Left"],
			xa = function(a, b) {
				return a = b || a, "none" === _.css(a, "display") || !_.contains(a.ownerDocument, a)
			},
			ya = /^(?:checkbox|radio)$/i;
		! function() {
			var a = Z.createDocumentFragment(),
				b = a.appendChild(Z.createElement("div")),
				c = Z.createElement("input");
			c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), Y.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", Y.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
		}();
		var za = "undefined";
		Y.focusinBubbles = "onfocusin" in a;
		var Aa = /^key/,
			Ba = /^(?:mouse|pointer|contextmenu)|click/,
			Ca = /^(?:focusinfocus|focusoutblur)$/,
			Da = /^([^.]*)(?:\.(.+)|)$/;
		_.event = {
			global: {},
			add: function(a, b, c, d, e) {
				var f, g, h, i, j, k, l, m, n, o, p, q = ra.get(a);
				if (q)
					for (c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = _.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
							return typeof _ !== za && _.event.triggered !== b.type ? _.event.dispatch.apply(a, arguments) : void 0
						}), b = (b || "").match(na) || [""], j = b.length; j--;) h = Da.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = _.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = _.event.special[n] || {}, k = _.extend({
						type: n,
						origType: p,
						data: d,
						handler: c,
						guid: c.guid,
						selector: e,
						needsContext: e && _.expr.match.needsContext.test(e),
						namespace: o.join(".")
					}, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), _.event.global[n] = !0)
			},
			remove: function(a, b, c, d, e) {
				var f, g, h, i, j, k, l, m, n, o, p, q = ra.hasData(a) && ra.get(a);
				if (q && (i = q.events)) {
					for (b = (b || "").match(na) || [""], j = b.length; j--;)
						if (h = Da.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
							for (l = _.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
							g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || _.removeEvent(a, n, q.handle), delete i[n])
						} else
							for (n in i) _.event.remove(a, n + b[j], c, d, !0);
					_.isEmptyObject(i) && (delete q.handle, ra.remove(a, "events"))
				}
			},
			trigger: function(b, c, d, e) {
				var f, g, h, i, j, k, l, m = [d || Z],
					n = X.call(b, "type") ? b.type : b,
					o = X.call(b, "namespace") ? b.namespace.split(".") : [];
				if (g = h = d = d || Z, 3 !== d.nodeType && 8 !== d.nodeType && !Ca.test(n + _.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[_.expando] ? b : new _.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : _.makeArray(c, [b]), l = _.event.special[n] || {}, e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
					if (!e && !l.noBubble && !_.isWindow(d)) {
						for (i = l.delegateType || n, Ca.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), h = g;
						h === (d.ownerDocument || Z) && m.push(h.defaultView || h.parentWindow || a)
					}
					for (f = 0;
						(g = m[f++]) && !b.isPropagationStopped();) b.type = f > 1 ? i : l.bindType || n, k = (ra.get(g, "events") || {})[b.type] && ra.get(g, "handle"), k && k.apply(g, c), k = j && g[j], k && k.apply && _.acceptData(g) && (b.result = k.apply(g, c), b.result === !1 && b.preventDefault());
					return b.type = n, e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !_.acceptData(d) || j && _.isFunction(d[n]) && !_.isWindow(d) && (h = d[j], h && (d[j] = null), _.event.triggered = n, d[n](), _.event.triggered = void 0, h && (d[j] = h)), b.result
				}
			},
			dispatch: function(a) {
				a = _.event.fix(a);
				var b, c, d, e, f, g = [],
					h = R.call(arguments),
					i = (ra.get(this, "events") || {})[a.type] || [],
					j = _.event.special[a.type] || {};
				if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
					for (g = _.event.handlers.call(this, a, i), b = 0;
						(e = g[b++]) && !a.isPropagationStopped();)
						for (a.currentTarget = e.elem, c = 0;
							(f = e.handlers[c++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(f.namespace)) && (a.handleObj = f, a.data = f.data, d = ((_.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
					return j.postDispatch && j.postDispatch.call(this, a), a.result
				}
			},
			handlers: function(a, b) {
				var c, d, e, f, g = [],
					h = b.delegateCount,
					i = a.target;
				if (h && i.nodeType && (!a.button || "click" !== a.type))
					for (; i !== this; i = i.parentNode || this)
						if (i.disabled !== !0 || "click" !== a.type) {
							for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? _(e, this).index(i) >= 0 : _.find(e, this, null, [i]).length), d[e] && d.push(f);
							d.length && g.push({
								elem: i,
								handlers: d
							})
						}
				return h < b.length && g.push({
					elem: this,
					handlers: b.slice(h)
				}), g
			},
			props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
			fixHooks: {},
			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function(a, b) {
					return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
				}
			},
			mouseHooks: {
				props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
				filter: function(a, b) {
					var c, d, e, f = b.button;
					return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || Z, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
				}
			},
			fix: function(a) {
				if (a[_.expando]) return a;
				var b, c, d, e = a.type,
					f = a,
					g = this.fixHooks[e];
				for (g || (this.fixHooks[e] = g = Ba.test(e) ? this.mouseHooks : Aa.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new _.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
				return a.target || (a.target = Z), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
			},
			special: {
				load: {
					noBubble: !0
				},
				focus: {
					trigger: function() {
						return this !== l() && this.focus ? (this.focus(), !1) : void 0
					},
					delegateType: "focusin"
				},
				blur: {
					trigger: function() {
						return this === l() && this.blur ? (this.blur(), !1) : void 0
					},
					delegateType: "focusout"
				},
				click: {
					trigger: function() {
						return "checkbox" === this.type && this.click && _.nodeName(this, "input") ? (this.click(), !1) : void 0
					},
					_default: function(a) {
						return _.nodeName(a.target, "a")
					}
				},
				beforeunload: {
					postDispatch: function(a) {
						void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
					}
				}
			},
			simulate: function(a, b, c, d) {
				var e = _.extend(new _.Event, c, {
					type: a,
					isSimulated: !0,
					originalEvent: {}
				});
				d ? _.event.trigger(e, null, b) : _.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
			}
		}, _.removeEvent = function(a, b, c) {
			a.removeEventListener && a.removeEventListener(b, c, !1)
		}, _.Event = function(a, b) {
			return this instanceof _.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? j : k) : this.type = a, b && _.extend(this, b), this.timeStamp = a && a.timeStamp || _.now(), void(this[_.expando] = !0)) : new _.Event(a, b)
		}, _.Event.prototype = {
			isDefaultPrevented: k,
			isPropagationStopped: k,
			isImmediatePropagationStopped: k,
			preventDefault: function() {
				var a = this.originalEvent;
				this.isDefaultPrevented = j, a && a.preventDefault && a.preventDefault()
			},
			stopPropagation: function() {
				var a = this.originalEvent;
				this.isPropagationStopped = j, a && a.stopPropagation && a.stopPropagation()
			},
			stopImmediatePropagation: function() {
				var a = this.originalEvent;
				this.isImmediatePropagationStopped = j, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
			}
		}, _.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			pointerenter: "pointerover",
			pointerleave: "pointerout"
		}, function(a, b) {
			_.event.special[a] = {
				delegateType: b,
				bindType: b,
				handle: function(a) {
					var c, d = this,
						e = a.relatedTarget,
						f = a.handleObj;
					return (!e || e !== d && !_.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
				}
			}
		}), Y.focusinBubbles || _.each({
			focus: "focusin",
			blur: "focusout"
		}, function(a, b) {
			var c = function(a) {
				_.event.simulate(b, a.target, _.event.fix(a), !0)
			};
			_.event.special[b] = {
				setup: function() {
					var d = this.ownerDocument || this,
						e = ra.access(d, b);
					e || d.addEventListener(a, c, !0), ra.access(d, b, (e || 0) + 1)
				},
				teardown: function() {
					var d = this.ownerDocument || this,
						e = ra.access(d, b) - 1;
					e ? ra.access(d, b, e) : (d.removeEventListener(a, c, !0), ra.remove(d, b))
				}
			}
		}), _.fn.extend({
			on: function(a, b, c, d, e) {
				var f, g;
				if ("object" == typeof a) {
					"string" != typeof b && (c = c || b, b = void 0);
					for (g in a) this.on(g, b, c, a[g], e);
					return this
				}
				if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = k;
				else if (!d) return this;
				return 1 === e && (f = d, d = function(a) {
					return _().off(a), f.apply(this, arguments)
				}, d.guid = f.guid || (f.guid = _.guid++)), this.each(function() {
					_.event.add(this, a, d, c, b)
				})
			},
			one: function(a, b, c, d) {
				return this.on(a, b, c, d, 1)
			},
			off: function(a, b, c) {
				var d, e;
				if (a && a.preventDefault && a.handleObj) return d = a.handleObj, _(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
				if ("object" == typeof a) {
					for (e in a) this.off(e, b, a[e]);
					return this
				}
				return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = k), this.each(function() {
					_.event.remove(this, a, c, b)
				})
			},
			trigger: function(a, b) {
				return this.each(function() {
					_.event.trigger(a, b, this)
				})
			},
			triggerHandler: function(a, b) {
				var c = this[0];
				return c ? _.event.trigger(a, b, c, !0) : void 0
			}
		});
		var Ea = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
			Fa = /<([\w:]+)/,
			Ga = /<|&#?\w+;/,
			Ha = /<(?:script|style|link)/i,
			Ia = /checked\s*(?:[^=]|=\s*.checked.)/i,
			Ja = /^$|\/(?:java|ecma)script/i,
			Ka = /^true\/(.*)/,
			La = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
			Ma = {
				option: [1, "<select multiple='multiple'>", "</select>"],
				thead: [1, "<table>", "</table>"],
				col: [2, "<table><colgroup>", "</colgroup></table>"],
				tr: [2, "<table><tbody>", "</tbody></table>"],
				td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
				_default: [0, "", ""]
			};
		Ma.optgroup = Ma.option, Ma.tbody = Ma.tfoot = Ma.colgroup = Ma.caption = Ma.thead, Ma.th = Ma.td, _.extend({
			clone: function(a, b, c) {
				var d, e, f, g, h = a.cloneNode(!0),
					i = _.contains(a.ownerDocument, a);
				if (!(Y.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || _.isXMLDoc(a)))
					for (g = r(h), f = r(a), d = 0, e = f.length; e > d; d++) s(f[d], g[d]);
				if (b)
					if (c)
						for (f = f || r(a), g = g || r(h), d = 0, e = f.length; e > d; d++) q(f[d], g[d]);
					else q(a, h);
				return g = r(h, "script"), g.length > 0 && p(g, !i && r(a, "script")), h
			},
			buildFragment: function(a, b, c, d) {
				for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, n = a.length; n > m; m++)
					if (e = a[m], e || 0 === e)
						if ("object" === _.type(e)) _.merge(l, e.nodeType ? [e] : e);
						else if (Ga.test(e)) {
					for (f = f || k.appendChild(b.createElement("div")), g = (Fa.exec(e) || ["", ""])[1].toLowerCase(), h = Ma[g] || Ma._default, f.innerHTML = h[1] + e.replace(Ea, "<$1></$2>") + h[2], j = h[0]; j--;) f = f.lastChild;
					_.merge(l, f.childNodes), f = k.firstChild, f.textContent = ""
				} else l.push(b.createTextNode(e));
				for (k.textContent = "", m = 0; e = l[m++];)
					if ((!d || -1 === _.inArray(e, d)) && (i = _.contains(e.ownerDocument, e), f = r(k.appendChild(e), "script"), i && p(f), c))
						for (j = 0; e = f[j++];) Ja.test(e.type || "") && c.push(e);
				return k
			},
			cleanData: function(a) {
				for (var b, c, d, e, f = _.event.special, g = 0; void 0 !== (c = a[g]); g++) {
					if (_.acceptData(c) && (e = c[ra.expando], e && (b = ra.cache[e]))) {
						if (b.events)
							for (d in b.events) f[d] ? _.event.remove(c, d) : _.removeEvent(c, d, b.handle);
						ra.cache[e] && delete ra.cache[e]
					}
					delete sa.cache[c[sa.expando]]
				}
			}
		}), _.fn.extend({
			text: function(a) {
				return qa(this, function(a) {
					return void 0 === a ? _.text(this) : this.empty().each(function() {
						(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a)
					})
				}, null, a, arguments.length)
			},
			append: function() {
				return this.domManip(arguments, function(a) {
					if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
						var b = m(this, a);
						b.appendChild(a)
					}
				})
			},
			prepend: function() {
				return this.domManip(arguments, function(a) {
					if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
						var b = m(this, a);
						b.insertBefore(a, b.firstChild)
					}
				})
			},
			before: function() {
				return this.domManip(arguments, function(a) {
					this.parentNode && this.parentNode.insertBefore(a, this)
				})
			},
			after: function() {
				return this.domManip(arguments, function(a) {
					this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
				})
			},
			remove: function(a, b) {
				for (var c, d = a ? _.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || _.cleanData(r(c)), c.parentNode && (b && _.contains(c.ownerDocument, c) && p(r(c, "script")), c.parentNode.removeChild(c));
				return this
			},
			empty: function() {
				for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (_.cleanData(r(a, !1)), a.textContent = "");
				return this
			},
			clone: function(a, b) {
				return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
					return _.clone(this, a, b)
				})
			},
			html: function(a) {
				return qa(this, function(a) {
					var b = this[0] || {},
						c = 0,
						d = this.length;
					if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
					if ("string" == typeof a && !Ha.test(a) && !Ma[(Fa.exec(a) || ["", ""])[1].toLowerCase()]) {
						a = a.replace(Ea, "<$1></$2>");
						try {
							for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (_.cleanData(r(b, !1)), b.innerHTML = a);
							b = 0
						} catch (e) {}
					}
					b && this.empty().append(a)
				}, null, a, arguments.length)
			},
			replaceWith: function() {
				var a = arguments[0];
				return this.domManip(arguments, function(b) {
					a = this.parentNode, _.cleanData(r(this)), a && a.replaceChild(b, this)
				}), a && (a.length || a.nodeType) ? this : this.remove()
			},
			detach: function(a) {
				return this.remove(a, !0)
			},
			domManip: function(a, b) {
				a = S.apply([], a);
				var c, d, e, f, g, h, i = 0,
					j = this.length,
					k = this,
					l = j - 1,
					m = a[0],
					p = _.isFunction(m);
				if (p || j > 1 && "string" == typeof m && !Y.checkClone && Ia.test(m)) return this.each(function(c) {
					var d = k.eq(c);
					p && (a[0] = m.call(this, c, d.html())), d.domManip(a, b)
				});
				if (j && (c = _.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
					for (e = _.map(r(c, "script"), n), f = e.length; j > i; i++) g = c, i !== l && (g = _.clone(g, !0, !0), f && _.merge(e, r(g, "script"))), b.call(this[i], g, i);
					if (f)
						for (h = e[e.length - 1].ownerDocument, _.map(e, o), i = 0; f > i; i++) g = e[i], Ja.test(g.type || "") && !ra.access(g, "globalEval") && _.contains(h, g) && (g.src ? _._evalUrl && _._evalUrl(g.src) : _.globalEval(g.textContent.replace(La, "")))
				}
				return this
			}
		}), _.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function(a, b) {
			_.fn[a] = function(a) {
				for (var c, d = [], e = _(a), f = e.length - 1, g = 0; f >= g; g++) c = g === f ? this : this.clone(!0), _(e[g])[b](c), T.apply(d, c.get());
				return this.pushStack(d)
			}
		});
		var Na, Oa = {},
			Pa = /^margin/,
			Qa = new RegExp("^(" + va + ")(?!px)[a-z%]+$", "i"),
			Ra = function(b) {
				return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
			};
		! function() {
			function b() {
				g.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", g.innerHTML = "", e.appendChild(f);
				var b = a.getComputedStyle(g, null);
				c = "1%" !== b.top, d = "4px" === b.width, e.removeChild(f)
			}
			var c, d, e = Z.documentElement,
				f = Z.createElement("div"),
				g = Z.createElement("div");
			g.style && (g.style.backgroundClip = "content-box", g.cloneNode(!0).style.backgroundClip = "", Y.clearCloneStyle = "content-box" === g.style.backgroundClip, f.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", f.appendChild(g), a.getComputedStyle && _.extend(Y, {
				pixelPosition: function() {
					return b(), c
				},
				boxSizingReliable: function() {
					return null == d && b(), d
				},
				reliableMarginRight: function() {
					var b, c = g.appendChild(Z.createElement("div"));
					return c.style.cssText = g.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", g.style.width = "1px", e.appendChild(f), b = !parseFloat(a.getComputedStyle(c, null).marginRight), e.removeChild(f), g.removeChild(c), b
				}
			}))
		}(), _.swap = function(a, b, c, d) {
			var e, f, g = {};
			for (f in b) g[f] = a.style[f], a.style[f] = b[f];
			e = c.apply(a, d || []);
			for (f in b) a.style[f] = g[f];
			return e
		};
		var Sa = /^(none|table(?!-c[ea]).+)/,
			Ta = new RegExp("^(" + va + ")(.*)$", "i"),
			Ua = new RegExp("^([+-])=(" + va + ")", "i"),
			Va = {
				position: "absolute",
				visibility: "hidden",
				display: "block"
			},
			Wa = {
				letterSpacing: "0",
				fontWeight: "400"
			},
			Xa = ["Webkit", "O", "Moz", "ms"];
		_.extend({
			cssHooks: {
				opacity: {
					get: function(a, b) {
						if (b) {
							var c = v(a, "opacity");
							return "" === c ? "1" : c
						}
					}
				}
			},
			cssNumber: {
				columnCount: !0,
				fillOpacity: !0,
				flexGrow: !0,
				flexShrink: !0,
				fontWeight: !0,
				lineHeight: !0,
				opacity: !0,
				order: !0,
				orphans: !0,
				widows: !0,
				zIndex: !0,
				zoom: !0
			},
			cssProps: {
				"float": "cssFloat"
			},
			style: function(a, b, c, d) {
				if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
					var e, f, g, h = _.camelCase(b),
						i = a.style;
					return b = _.cssProps[h] || (_.cssProps[h] = x(i, h)), g = _.cssHooks[b] || _.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Ua.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(_.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || _.cssNumber[h] || (c += "px"), Y.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0)
				}
			},
			css: function(a, b, c, d) {
				var e, f, g, h = _.camelCase(b);
				return b = _.cssProps[h] || (_.cssProps[h] = x(a.style, h)), g = _.cssHooks[b] || _.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = v(a, b, d)), "normal" === e && b in Wa && (e = Wa[b]), "" === c || c ? (f = parseFloat(e), c === !0 || _.isNumeric(f) ? f || 0 : e) : e
			}
		}), _.each(["height", "width"], function(a, b) {
			_.cssHooks[b] = {
				get: function(a, c, d) {
					return c ? Sa.test(_.css(a, "display")) && 0 === a.offsetWidth ? _.swap(a, Va, function() {
						return A(a, b, d)
					}) : A(a, b, d) : void 0
				},
				set: function(a, c, d) {
					var e = d && Ra(a);
					return y(a, c, d ? z(a, b, d, "border-box" === _.css(a, "boxSizing", !1, e), e) : 0)
				}
			}
		}), _.cssHooks.marginRight = w(Y.reliableMarginRight, function(a, b) {
			return b ? _.swap(a, {
				display: "inline-block"
			}, v, [a, "marginRight"]) : void 0
		}), _.each({
			margin: "",
			padding: "",
			border: "Width"
		}, function(a, b) {
			_.cssHooks[a + b] = {
				expand: function(c) {
					for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + wa[d] + b] = f[d] || f[d - 2] || f[0];
					return e
				}
			}, Pa.test(a) || (_.cssHooks[a + b].set = y)
		}), _.fn.extend({
			css: function(a, b) {
				return qa(this, function(a, b, c) {
					var d, e, f = {},
						g = 0;
					if (_.isArray(b)) {
						for (d = Ra(a), e = b.length; e > g; g++) f[b[g]] = _.css(a, b[g], !1, d);
						return f
					}
					return void 0 !== c ? _.style(a, b, c) : _.css(a, b)
				}, a, b, arguments.length > 1)
			},
			show: function() {
				return B(this, !0)
			},
			hide: function() {
				return B(this)
			},
			toggle: function(a) {
				return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
					xa(this) ? _(this).show() : _(this).hide()
				})
			}
		}), _.Tween = C, C.prototype = {
			constructor: C,
			init: function(a, b, c, d, e, f) {
				this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (_.cssNumber[c] ? "" : "px")
			},
			cur: function() {
				var a = C.propHooks[this.prop];
				return a && a.get ? a.get(this) : C.propHooks._default.get(this)
			},
			run: function(a) {
				var b, c = C.propHooks[this.prop];
				return this.options.duration ? this.pos = b = _.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : C.propHooks._default.set(this), this
			}
		}, C.prototype.init.prototype = C.prototype, C.propHooks = {
			_default: {
				get: function(a) {
					var b;
					return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = _.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
				},
				set: function(a) {
					_.fx.step[a.prop] ? _.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[_.cssProps[a.prop]] || _.cssHooks[a.prop]) ? _.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
				}
			}
		}, C.propHooks.scrollTop = C.propHooks.scrollLeft = {
			set: function(a) {
				a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
			}
		}, _.easing = {
			linear: function(a) {
				return a
			},
			swing: function(a) {
				return .5 - Math.cos(a * Math.PI) / 2
			}
		}, _.fx = C.prototype.init, _.fx.step = {};
		var Ya, Za, $a = /^(?:toggle|show|hide)$/,
			_a = new RegExp("^(?:([+-])=|)(" + va + ")([a-z%]*)$", "i"),
			ab = /queueHooks$/,
			bb = [G],
			cb = {
				"*": [function(a, b) {
					var c = this.createTween(a, b),
						d = c.cur(),
						e = _a.exec(b),
						f = e && e[3] || (_.cssNumber[a] ? "" : "px"),
						g = (_.cssNumber[a] || "px" !== f && +d) && _a.exec(_.css(c.elem, a)),
						h = 1,
						i = 20;
					if (g && g[3] !== f) {
						f = f || g[3], e = e || [], g = +d || 1;
						do h = h || ".5", g /= h, _.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
					}
					return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
				}]
			};
		_.Animation = _.extend(I, {
				tweener: function(a, b) {
					_.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
					for (var c, d = 0, e = a.length; e > d; d++) c = a[d], cb[c] = cb[c] || [], cb[c].unshift(b)
				},
				prefilter: function(a, b) {
					b ? bb.unshift(a) : bb.push(a)
				}
			}), _.speed = function(a, b, c) {
				var d = a && "object" == typeof a ? _.extend({}, a) : {
					complete: c || !c && b || _.isFunction(a) && a,
					duration: a,
					easing: c && b || b && !_.isFunction(b) && b
				};
				return d.duration = _.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in _.fx.speeds ? _.fx.speeds[d.duration] : _.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
					_.isFunction(d.old) && d.old.call(this), d.queue && _.dequeue(this, d.queue)
				}, d
			}, _.fn.extend({
				fadeTo: function(a, b, c, d) {
					return this.filter(xa).css("opacity", 0).show().end().animate({
						opacity: b
					}, a, c, d)
				},
				animate: function(a, b, c, d) {
					var e = _.isEmptyObject(a),
						f = _.speed(b, c, d),
						g = function() {
							var b = I(this, _.extend({}, a), f);
							(e || ra.get(this, "finish")) && b.stop(!0)
						};
					return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
				},
				stop: function(a, b, c) {
					var d = function(a) {
						var b = a.stop;
						delete a.stop, b(c)
					};
					return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
						var b = !0,
							e = null != a && a + "queueHooks",
							f = _.timers,
							g = ra.get(this);
						if (e) g[e] && g[e].stop && d(g[e]);
						else
							for (e in g) g[e] && g[e].stop && ab.test(e) && d(g[e]);
						for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
						(b || !c) && _.dequeue(this, a)
					})
				},
				finish: function(a) {
					return a !== !1 && (a = a || "fx"), this.each(function() {
						var b, c = ra.get(this),
							d = c[a + "queue"],
							e = c[a + "queueHooks"],
							f = _.timers,
							g = d ? d.length : 0;
						for (c.finish = !0, _.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0),
							f.splice(b, 1));
						for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
						delete c.finish
					})
				}
			}), _.each(["toggle", "show", "hide"], function(a, b) {
				var c = _.fn[b];
				_.fn[b] = function(a, d, e) {
					return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(E(b, !0), a, d, e)
				}
			}), _.each({
				slideDown: E("show"),
				slideUp: E("hide"),
				slideToggle: E("toggle"),
				fadeIn: {
					opacity: "show"
				},
				fadeOut: {
					opacity: "hide"
				},
				fadeToggle: {
					opacity: "toggle"
				}
			}, function(a, b) {
				_.fn[a] = function(a, c, d) {
					return this.animate(b, a, c, d)
				}
			}), _.timers = [], _.fx.tick = function() {
				var a, b = 0,
					c = _.timers;
				for (Ya = _.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
				c.length || _.fx.stop(), Ya = void 0
			}, _.fx.timer = function(a) {
				_.timers.push(a), a() ? _.fx.start() : _.timers.pop()
			}, _.fx.interval = 13, _.fx.start = function() {
				Za || (Za = setInterval(_.fx.tick, _.fx.interval))
			}, _.fx.stop = function() {
				clearInterval(Za), Za = null
			}, _.fx.speeds = {
				slow: 600,
				fast: 200,
				_default: 400
			}, _.fn.delay = function(a, b) {
				return a = _.fx ? _.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
					var d = setTimeout(b, a);
					c.stop = function() {
						clearTimeout(d)
					}
				})
			},
			function() {
				var a = Z.createElement("input"),
					b = Z.createElement("select"),
					c = b.appendChild(Z.createElement("option"));
				a.type = "checkbox", Y.checkOn = "" !== a.value, Y.optSelected = c.selected, b.disabled = !0, Y.optDisabled = !c.disabled, a = Z.createElement("input"), a.value = "t", a.type = "radio", Y.radioValue = "t" === a.value
			}();
		var db, eb, fb = _.expr.attrHandle;
		_.fn.extend({
			attr: function(a, b) {
				return qa(this, _.attr, a, b, arguments.length > 1)
			},
			removeAttr: function(a) {
				return this.each(function() {
					_.removeAttr(this, a)
				})
			}
		}), _.extend({
			attr: function(a, b, c) {
				var d, e, f = a.nodeType;
				if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === za ? _.prop(a, b, c) : (1 === f && _.isXMLDoc(a) || (b = b.toLowerCase(), d = _.attrHooks[b] || (_.expr.match.bool.test(b) ? eb : db)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = _.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void _.removeAttr(a, b))
			},
			removeAttr: function(a, b) {
				var c, d, e = 0,
					f = b && b.match(na);
				if (f && 1 === a.nodeType)
					for (; c = f[e++];) d = _.propFix[c] || c, _.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
			},
			attrHooks: {
				type: {
					set: function(a, b) {
						if (!Y.radioValue && "radio" === b && _.nodeName(a, "input")) {
							var c = a.value;
							return a.setAttribute("type", b), c && (a.value = c), b
						}
					}
				}
			}
		}), eb = {
			set: function(a, b, c) {
				return b === !1 ? _.removeAttr(a, c) : a.setAttribute(c, c), c
			}
		}, _.each(_.expr.match.bool.source.match(/\w+/g), function(a, b) {
			var c = fb[b] || _.find.attr;
			fb[b] = function(a, b, d) {
				var e, f;
				return d || (f = fb[b], fb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, fb[b] = f), e
			}
		});
		var gb = /^(?:input|select|textarea|button)$/i;
		_.fn.extend({
			prop: function(a, b) {
				return qa(this, _.prop, a, b, arguments.length > 1)
			},
			removeProp: function(a) {
				return this.each(function() {
					delete this[_.propFix[a] || a]
				})
			}
		}), _.extend({
			propFix: {
				"for": "htmlFor",
				"class": "className"
			},
			prop: function(a, b, c) {
				var d, e, f, g = a.nodeType;
				if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !_.isXMLDoc(a), f && (b = _.propFix[b] || b, e = _.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
			},
			propHooks: {
				tabIndex: {
					get: function(a) {
						return a.hasAttribute("tabindex") || gb.test(a.nodeName) || a.href ? a.tabIndex : -1
					}
				}
			}
		}), Y.optSelected || (_.propHooks.selected = {
			get: function(a) {
				var b = a.parentNode;
				return b && b.parentNode && b.parentNode.selectedIndex, null
			}
		}), _.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
			_.propFix[this.toLowerCase()] = this
		});
		var hb = /[\t\r\n\f]/g;
		_.fn.extend({
			addClass: function(a) {
				var b, c, d, e, f, g, h = "string" == typeof a && a,
					i = 0,
					j = this.length;
				if (_.isFunction(a)) return this.each(function(b) {
					_(this).addClass(a.call(this, b, this.className))
				});
				if (h)
					for (b = (a || "").match(na) || []; j > i; i++)
						if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : " ")) {
							for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
							g = _.trim(d), c.className !== g && (c.className = g)
						}
				return this
			},
			removeClass: function(a) {
				var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a,
					i = 0,
					j = this.length;
				if (_.isFunction(a)) return this.each(function(b) {
					_(this).removeClass(a.call(this, b, this.className))
				});
				if (h)
					for (b = (a || "").match(na) || []; j > i; i++)
						if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : "")) {
							for (f = 0; e = b[f++];)
								for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
							g = a ? _.trim(d) : "", c.className !== g && (c.className = g)
						}
				return this
			},
			toggleClass: function(a, b) {
				var c = typeof a;
				return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : _.isFunction(a) ? this.each(function(c) {
					_(this).toggleClass(a.call(this, c, this.className, b), b)
				}) : this.each(function() {
					if ("string" === c)
						for (var b, d = 0, e = _(this), f = a.match(na) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
					else(c === za || "boolean" === c) && (this.className && ra.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : ra.get(this, "__className__") || "")
				})
			},
			hasClass: function(a) {
				for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
					if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(hb, " ").indexOf(b) >= 0) return !0;
				return !1
			}
		});
		var ib = /\r/g;
		_.fn.extend({
			val: function(a) {
				var b, c, d, e = this[0]; {
					if (arguments.length) return d = _.isFunction(a), this.each(function(c) {
						var e;
						1 === this.nodeType && (e = d ? a.call(this, c, _(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : _.isArray(e) && (e = _.map(e, function(a) {
							return null == a ? "" : a + ""
						})), b = _.valHooks[this.type] || _.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
					});
					if (e) return b = _.valHooks[e.type] || _.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ib, "") : null == c ? "" : c)
				}
			}
		}), _.extend({
			valHooks: {
				option: {
					get: function(a) {
						var b = _.find.attr(a, "value");
						return null != b ? b : _.trim(_.text(a))
					}
				},
				select: {
					get: function(a) {
						for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
							if (c = d[i], !(!c.selected && i !== e || (Y.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && _.nodeName(c.parentNode, "optgroup"))) {
								if (b = _(c).val(), f) return b;
								g.push(b)
							}
						return g
					},
					set: function(a, b) {
						for (var c, d, e = a.options, f = _.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = _.inArray(d.value, f) >= 0) && (c = !0);
						return c || (a.selectedIndex = -1), f
					}
				}
			}
		}), _.each(["radio", "checkbox"], function() {
			_.valHooks[this] = {
				set: function(a, b) {
					return _.isArray(b) ? a.checked = _.inArray(_(a).val(), b) >= 0 : void 0
				}
			}, Y.checkOn || (_.valHooks[this].get = function(a) {
				return null === a.getAttribute("value") ? "on" : a.value
			})
		}), _.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
			_.fn[b] = function(a, c) {
				return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
			}
		}), _.fn.extend({
			hover: function(a, b) {
				return this.mouseenter(a).mouseleave(b || a)
			},
			bind: function(a, b, c) {
				return this.on(a, null, b, c)
			},
			unbind: function(a, b) {
				return this.off(a, null, b)
			},
			delegate: function(a, b, c, d) {
				return this.on(b, a, c, d)
			},
			undelegate: function(a, b, c) {
				return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
			}
		});
		var jb = _.now(),
			kb = /\?/;
		_.parseJSON = function(a) {
			return JSON.parse(a + "")
		}, _.parseXML = function(a) {
			var b, c;
			if (!a || "string" != typeof a) return null;
			try {
				c = new DOMParser, b = c.parseFromString(a, "text/xml")
			} catch (d) {
				b = void 0
			}
			return (!b || b.getElementsByTagName("parsererror").length) && _.error("Invalid XML: " + a), b
		};
		var lb = /#.*$/,
			mb = /([?&])_=[^&]*/,
			nb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
			ob = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
			pb = /^(?:GET|HEAD)$/,
			qb = /^\/\//,
			rb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
			sb = {},
			tb = {},
			ub = "*/".concat("*"),
			vb = a.location.href,
			wb = rb.exec(vb.toLowerCase()) || [];
		_.extend({
			active: 0,
			lastModified: {},
			etag: {},
			ajaxSettings: {
				url: vb,
				type: "GET",
				isLocal: ob.test(wb[1]),
				global: !0,
				processData: !0,
				async: !0,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				accepts: {
					"*": ub,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},
				contents: {
					xml: /xml/,
					html: /html/,
					json: /json/
				},
				responseFields: {
					xml: "responseXML",
					text: "responseText",
					json: "responseJSON"
				},
				converters: {
					"* text": String,
					"text html": !0,
					"text json": _.parseJSON,
					"text xml": _.parseXML
				},
				flatOptions: {
					url: !0,
					context: !0
				}
			},
			ajaxSetup: function(a, b) {
				return b ? L(L(a, _.ajaxSettings), b) : L(_.ajaxSettings, a)
			},
			ajaxPrefilter: J(sb),
			ajaxTransport: J(tb),
			ajax: function(a, b) {
				function c(a, b, c, g) {
					var i, k, r, s, u, w = b;
					2 !== t && (t = 2, h && clearTimeout(h), d = void 0, f = g || "", v.readyState = a > 0 ? 4 : 0, i = a >= 200 && 300 > a || 304 === a, c && (s = M(l, v, c)), s = N(l, s, v, i), i ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (_.lastModified[e] = u), u = v.getResponseHeader("etag"), u && (_.etag[e] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, i = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || w) + "", i ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, j && n.trigger(i ? "ajaxSuccess" : "ajaxError", [v, l, i ? k : r]), p.fireWith(m, [v, w]), j && (n.trigger("ajaxComplete", [v, l]), --_.active || _.event.trigger("ajaxStop")))
				}
				"object" == typeof a && (b = a, a = void 0), b = b || {};
				var d, e, f, g, h, i, j, k, l = _.ajaxSetup({}, b),
					m = l.context || l,
					n = l.context && (m.nodeType || m.jquery) ? _(m) : _.event,
					o = _.Deferred(),
					p = _.Callbacks("once memory"),
					q = l.statusCode || {},
					r = {},
					s = {},
					t = 0,
					u = "canceled",
					v = {
						readyState: 0,
						getResponseHeader: function(a) {
							var b;
							if (2 === t) {
								if (!g)
									for (g = {}; b = nb.exec(f);) g[b[1].toLowerCase()] = b[2];
								b = g[a.toLowerCase()]
							}
							return null == b ? null : b
						},
						getAllResponseHeaders: function() {
							return 2 === t ? f : null
						},
						setRequestHeader: function(a, b) {
							var c = a.toLowerCase();
							return t || (a = s[c] = s[c] || a, r[a] = b), this
						},
						overrideMimeType: function(a) {
							return t || (l.mimeType = a), this
						},
						statusCode: function(a) {
							var b;
							if (a)
								if (2 > t)
									for (b in a) q[b] = [q[b], a[b]];
								else v.always(a[v.status]);
							return this
						},
						abort: function(a) {
							var b = a || u;
							return d && d.abort(b), c(0, b), this
						}
					};
				if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || vb) + "").replace(lb, "").replace(qb, wb[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = _.trim(l.dataType || "*").toLowerCase().match(na) || [""], null == l.crossDomain && (i = rb.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] === wb[1] && i[2] === wb[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (wb[3] || ("http:" === wb[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = _.param(l.data, l.traditional)), K(sb, l, b, v), 2 === t) return v;
				j = _.event && l.global, j && 0 === _.active++ && _.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !pb.test(l.type), e = l.url, l.hasContent || (l.data && (e = l.url += (kb.test(e) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = mb.test(e) ? e.replace(mb, "$1_=" + jb++) : e + (kb.test(e) ? "&" : "?") + "_=" + jb++)), l.ifModified && (_.lastModified[e] && v.setRequestHeader("If-Modified-Since", _.lastModified[e]), _.etag[e] && v.setRequestHeader("If-None-Match", _.etag[e])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + ub + "; q=0.01" : "") : l.accepts["*"]);
				for (k in l.headers) v.setRequestHeader(k, l.headers[k]);
				if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
				u = "abort";
				for (k in {
						success: 1,
						error: 1,
						complete: 1
					}) v[k](l[k]);
				if (d = K(tb, l, b, v)) {
					v.readyState = 1, j && n.trigger("ajaxSend", [v, l]), l.async && l.timeout > 0 && (h = setTimeout(function() {
						v.abort("timeout")
					}, l.timeout));
					try {
						t = 1, d.send(r, c)
					} catch (w) {
						if (!(2 > t)) throw w;
						c(-1, w)
					}
				} else c(-1, "No Transport");
				return v
			},
			getJSON: function(a, b, c) {
				return _.get(a, b, c, "json")
			},
			getScript: function(a, b) {
				return _.get(a, void 0, b, "script")
			}
		}), _.each(["get", "post"], function(a, b) {
			_[b] = function(a, c, d, e) {
				return _.isFunction(c) && (e = e || d, d = c, c = void 0), _.ajax({
					url: a,
					type: b,
					dataType: e,
					data: c,
					success: d
				})
			}
		}), _._evalUrl = function(a) {
			return _.ajax({
				url: a,
				type: "GET",
				dataType: "script",
				async: !1,
				global: !1,
				"throws": !0
			})
		}, _.fn.extend({
			wrapAll: function(a) {
				var b;
				return _.isFunction(a) ? this.each(function(b) {
					_(this).wrapAll(a.call(this, b))
				}) : (this[0] && (b = _(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
					for (var a = this; a.firstElementChild;) a = a.firstElementChild;
					return a
				}).append(this)), this)
			},
			wrapInner: function(a) {
				return _.isFunction(a) ? this.each(function(b) {
					_(this).wrapInner(a.call(this, b))
				}) : this.each(function() {
					var b = _(this),
						c = b.contents();
					c.length ? c.wrapAll(a) : b.append(a)
				})
			},
			wrap: function(a) {
				var b = _.isFunction(a);
				return this.each(function(c) {
					_(this).wrapAll(b ? a.call(this, c) : a)
				})
			},
			unwrap: function() {
				return this.parent().each(function() {
					_.nodeName(this, "body") || _(this).replaceWith(this.childNodes)
				}).end()
			}
		}), _.expr.filters.hidden = function(a) {
			return a.offsetWidth <= 0 && a.offsetHeight <= 0
		}, _.expr.filters.visible = function(a) {
			return !_.expr.filters.hidden(a)
		};
		var xb = /%20/g,
			yb = /\[\]$/,
			zb = /\r?\n/g,
			Ab = /^(?:submit|button|image|reset|file)$/i,
			Bb = /^(?:input|select|textarea|keygen)/i;
		_.param = function(a, b) {
			var c, d = [],
				e = function(a, b) {
					b = _.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
				};
			if (void 0 === b && (b = _.ajaxSettings && _.ajaxSettings.traditional), _.isArray(a) || a.jquery && !_.isPlainObject(a)) _.each(a, function() {
				e(this.name, this.value)
			});
			else
				for (c in a) O(c, a[c], b, e);
			return d.join("&").replace(xb, "+")
		}, _.fn.extend({
			serialize: function() {
				return _.param(this.serializeArray())
			},
			serializeArray: function() {
				return this.map(function() {
					var a = _.prop(this, "elements");
					return a ? _.makeArray(a) : this
				}).filter(function() {
					var a = this.type;
					return this.name && !_(this).is(":disabled") && Bb.test(this.nodeName) && !Ab.test(a) && (this.checked || !ya.test(a))
				}).map(function(a, b) {
					var c = _(this).val();
					return null == c ? null : _.isArray(c) ? _.map(c, function(a) {
						return {
							name: b.name,
							value: a.replace(zb, "\r\n")
						}
					}) : {
						name: b.name,
						value: c.replace(zb, "\r\n")
					}
				}).get()
			}
		}), _.ajaxSettings.xhr = function() {
			try {
				return new XMLHttpRequest
			} catch (a) {}
		};
		var Cb = 0,
			Db = {},
			Eb = {
				0: 200,
				1223: 204
			},
			Fb = _.ajaxSettings.xhr();
		a.attachEvent && a.attachEvent("onunload", function() {
			for (var a in Db) Db[a]()
		}), Y.cors = !!Fb && "withCredentials" in Fb, Y.ajax = Fb = !!Fb, _.ajaxTransport(function(a) {
			var b;
			return Y.cors || Fb && !a.crossDomain ? {
				send: function(c, d) {
					var e, f = a.xhr(),
						g = ++Cb;
					if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
						for (e in a.xhrFields) f[e] = a.xhrFields[e];
					a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
					for (e in c) f.setRequestHeader(e, c[e]);
					b = function(a) {
						return function() {
							b && (delete Db[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Eb[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
								text: f.responseText
							} : void 0, f.getAllResponseHeaders()))
						}
					}, f.onload = b(), f.onerror = b("error"), b = Db[g] = b("abort");
					try {
						f.send(a.hasContent && a.data || null)
					} catch (h) {
						if (b) throw h
					}
				},
				abort: function() {
					b && b()
				}
			} : void 0
		}), _.ajaxSetup({
			accepts: {
				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /(?:java|ecma)script/
			},
			converters: {
				"text script": function(a) {
					return _.globalEval(a), a
				}
			}
		}), _.ajaxPrefilter("script", function(a) {
			void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
		}), _.ajaxTransport("script", function(a) {
			if (a.crossDomain) {
				var b, c;
				return {
					send: function(d, e) {
						b = _("<script>").prop({
							async: !0,
							charset: a.scriptCharset,
							src: a.url
						}).on("load error", c = function(a) {
							b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
						}), Z.head.appendChild(b[0])
					},
					abort: function() {
						c && c()
					}
				}
			}
		});
		var Gb = [],
			Hb = /(=)\?(?=&|$)|\?\?/;
		_.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function() {
				var a = Gb.pop() || _.expando + "_" + jb++;
				return this[a] = !0, a
			}
		}), _.ajaxPrefilter("json jsonp", function(b, c, d) {
			var e, f, g, h = b.jsonp !== !1 && (Hb.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Hb.test(b.data) && "data");
			return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = _.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Hb, "$1" + e) : b.jsonp !== !1 && (b.url += (kb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
				return g || _.error(e + " was not called"), g[0]
			}, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
				g = arguments
			}, d.always(function() {
				a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Gb.push(e)), g && _.isFunction(f) && f(g[0]), g = f = void 0
			}), "script") : void 0
		}), _.parseHTML = function(a, b, c) {
			if (!a || "string" != typeof a) return null;
			"boolean" == typeof b && (c = b, b = !1), b = b || Z;
			var d = ga.exec(a),
				e = !c && [];
			return d ? [b.createElement(d[1])] : (d = _.buildFragment([a], b, e), e && e.length && _(e).remove(), _.merge([], d.childNodes))
		};
		var Ib = _.fn.load;
		_.fn.load = function(a, b, c) {
			if ("string" != typeof a && Ib) return Ib.apply(this, arguments);
			var d, e, f, g = this,
				h = a.indexOf(" ");
			return h >= 0 && (d = _.trim(a.slice(h)), a = a.slice(0, h)), _.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && _.ajax({
				url: a,
				type: e,
				dataType: "html",
				data: b
			}).done(function(a) {
				f = arguments, g.html(d ? _("<div>").append(_.parseHTML(a)).find(d) : a)
			}).complete(c && function(a, b) {
				g.each(c, f || [a.responseText, b, a])
			}), this
		}, _.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
			_.fn[b] = function(a) {
				return this.on(b, a)
			}
		}), _.expr.filters.animated = function(a) {
			return _.grep(_.timers, function(b) {
				return a === b.elem
			}).length
		};
		var Jb = a.document.documentElement;
		_.offset = {
			setOffset: function(a, b, c) {
				var d, e, f, g, h, i, j, k = _.css(a, "position"),
					l = _(a),
					m = {};
				"static" === k && (a.style.position = "relative"), h = l.offset(), f = _.css(a, "top"), i = _.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), _.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
			}
		}, _.fn.extend({
			offset: function(a) {
				if (arguments.length) return void 0 === a ? this : this.each(function(b) {
					_.offset.setOffset(this, a, b)
				});
				var b, c, d = this[0],
					e = {
						top: 0,
						left: 0
					},
					f = d && d.ownerDocument;
				if (f) return b = f.documentElement, _.contains(b, d) ? (typeof d.getBoundingClientRect !== za && (e = d.getBoundingClientRect()), c = P(f), {
					top: e.top + c.pageYOffset - b.clientTop,
					left: e.left + c.pageXOffset - b.clientLeft
				}) : e
			},
			position: function() {
				if (this[0]) {
					var a, b, c = this[0],
						d = {
							top: 0,
							left: 0
						};
					return "fixed" === _.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), _.nodeName(a[0], "html") || (d = a.offset()), d.top += _.css(a[0], "borderTopWidth", !0), d.left += _.css(a[0], "borderLeftWidth", !0)), {
						top: b.top - d.top - _.css(c, "marginTop", !0),
						left: b.left - d.left - _.css(c, "marginLeft", !0)
					}
				}
			},
			offsetParent: function() {
				return this.map(function() {
					for (var a = this.offsetParent || Jb; a && !_.nodeName(a, "html") && "static" === _.css(a, "position");) a = a.offsetParent;
					return a || Jb
				})
			}
		}), _.each({
			scrollLeft: "pageXOffset",
			scrollTop: "pageYOffset"
		}, function(b, c) {
			var d = "pageYOffset" === c;
			_.fn[b] = function(e) {
				return qa(this, function(b, e, f) {
					var g = P(b);
					return void 0 === f ? g ? g[c] : b[e] : void(g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f)
				}, b, e, arguments.length, null)
			}
		}), _.each(["top", "left"], function(a, b) {
			_.cssHooks[b] = w(Y.pixelPosition, function(a, c) {
				return c ? (c = v(a, b), Qa.test(c) ? _(a).position()[b] + "px" : c) : void 0
			})
		}), _.each({
			Height: "height",
			Width: "width"
		}, function(a, b) {
			_.each({
				padding: "inner" + a,
				content: b,
				"": "outer" + a
			}, function(c, d) {
				_.fn[d] = function(d, e) {
					var f = arguments.length && (c || "boolean" != typeof d),
						g = c || (d === !0 || e === !0 ? "margin" : "border");
					return qa(this, function(b, c, d) {
						var e;
						return _.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? _.css(b, c, g) : _.style(b, c, d, g)
					}, b, f ? d : void 0, f, null)
				}
			})
		}), _.fn.size = function() {
			return this.length
		}, _.fn.andSelf = _.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
			return _
		});
		var Kb = a.jQuery,
			Lb = a.$;
		return _.noConflict = function(b) {
			return a.$ === _ && (a.$ = Lb), b && a.jQuery === _ && (a.jQuery = Kb), _
		}, typeof b === za && (a.jQuery = a.$ = _), _
	}), function(a) {
		"function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
	}(function(a) {
		function b(b, d) {
			var e, f, g, h = b.nodeName.toLowerCase();
			return "area" === h ? (e = b.parentNode, f = e.name, b.href && f && "map" === e.nodeName.toLowerCase() ? (g = a("img[usemap='#" + f + "']")[0], !!g && c(g)) : !1) : (/^(input|select|textarea|button|object)$/.test(h) ? !b.disabled : "a" === h ? b.href || d : d) && c(b)
		}

		function c(b) {
			return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function() {
				return "hidden" === a.css(this, "visibility")
			}).length
		}
		a.ui = a.ui || {}, a.extend(a.ui, {
			version: "1.11.4",
			keyCode: {
				BACKSPACE: 8,
				COMMA: 188,
				DELETE: 46,
				DOWN: 40,
				END: 35,
				ENTER: 13,
				ESCAPE: 27,
				HOME: 36,
				LEFT: 37,
				PAGE_DOWN: 34,
				PAGE_UP: 33,
				PERIOD: 190,
				RIGHT: 39,
				SPACE: 32,
				TAB: 9,
				UP: 38
			}
		}), a.fn.extend({
			scrollParent: function(b) {
				var c = this.css("position"),
					d = "absolute" === c,
					e = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
					f = this.parents().filter(function() {
						var b = a(this);
						return d && "static" === b.css("position") ? !1 : e.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"))
					}).eq(0);
				return "fixed" !== c && f.length ? f : a(this[0].ownerDocument || document)
			},
			uniqueId: function() {
				var a = 0;
				return function() {
					return this.each(function() {
						this.id || (this.id = "ui-id-" + ++a)
					})
				}
			}(),
			removeUniqueId: function() {
				return this.each(function() {
					/^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id")
				})
			}
		}), a.extend(a.expr[":"], {
			data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
				return function(c) {
					return !!a.data(c, b)
				}
			}) : function(b, c, d) {
				return !!a.data(b, d[3])
			},
			focusable: function(c) {
				return b(c, !isNaN(a.attr(c, "tabindex")))
			},
			tabbable: function(c) {
				var d = a.attr(c, "tabindex"),
					e = isNaN(d);
				return (e || d >= 0) && b(c, !e)
			}
		}), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(b, c) {
			function d(b, c, d, f) {
				return a.each(e, function() {
					c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
				}), c
			}
			var e = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"],
				f = c.toLowerCase(),
				g = {
					innerWidth: a.fn.innerWidth,
					innerHeight: a.fn.innerHeight,
					outerWidth: a.fn.outerWidth,
					outerHeight: a.fn.outerHeight
				};
			a.fn["inner" + c] = function(b) {
				return void 0 === b ? g["inner" + c].call(this) : this.each(function() {
					a(this).css(f, d(this, b) + "px")
				})
			}, a.fn["outer" + c] = function(b, e) {
				return "number" != typeof b ? g["outer" + c].call(this, b) : this.each(function() {
					a(this).css(f, d(this, b, !0, e) + "px")
				})
			}
		}), a.fn.addBack || (a.fn.addBack = function(a) {
			return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
		}), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(b) {
			return function(c) {
				return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
			}
		}(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.fn.extend({
			focus: function(b) {
				return function(c, d) {
					return "number" == typeof c ? this.each(function() {
						var b = this;
						setTimeout(function() {
							a(b).focus(), d && d.call(b)
						}, c)
					}) : b.apply(this, arguments)
				}
			}(a.fn.focus),
			disableSelection: function() {
				var a = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
				return function() {
					return this.bind(a + ".ui-disableSelection", function(a) {
						a.preventDefault()
					})
				}
			}(),
			enableSelection: function() {
				return this.unbind(".ui-disableSelection")
			},
			zIndex: function(b) {
				if (void 0 !== b) return this.css("zIndex", b);
				if (this.length)
					for (var c, d, e = a(this[0]); e.length && e[0] !== document;) {
						if (c = e.css("position"), ("absolute" === c || "relative" === c || "fixed" === c) && (d = parseInt(e.css("zIndex"), 10), !isNaN(d) && 0 !== d)) return d;
						e = e.parent()
					}
				return 0
			}
		}), a.ui.plugin = {
			add: function(b, c, d) {
				var e, f = a.ui[b].prototype;
				for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
			},
			call: function(a, b, c, d) {
				var e, f = a.plugins[b];
				if (f && (d || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType))
					for (e = 0; e < f.length; e++) a.options[f[e][0]] && f[e][1].apply(a.element, c)
			}
		};
		var d = 0,
			e = Array.prototype.slice;
		a.cleanData = function(b) {
			return function(c) {
				var d, e, f;
				for (f = 0; null != (e = c[f]); f++) try {
					d = a._data(e, "events"), d && d.remove && a(e).triggerHandler("remove")
				} catch (g) {}
				b(c)
			}
		}(a.cleanData), a.widget = function(b, c, d) {
			var e, f, g, h, i = {},
				j = b.split(".")[0];
			return b = b.split(".")[1], e = j + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function(b) {
				return !!a.data(b, e)
			}, a[j] = a[j] || {}, f = a[j][b], g = a[j][b] = function(a, b) {
				return this._createWidget ? void(arguments.length && this._createWidget(a, b)) : new g(a, b)
			}, a.extend(g, f, {
				version: d.version,
				_proto: a.extend({}, d),
				_childConstructors: []
			}), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function(b, d) {
				return a.isFunction(d) ? void(i[b] = function() {
					var a = function() {
							return c.prototype[b].apply(this, arguments)
						},
						e = function(a) {
							return c.prototype[b].apply(this, a)
						};
					return function() {
						var b, c = this._super,
							f = this._superApply;
						return this._super = a, this._superApply = e, b = d.apply(this, arguments), this._super = c, this._superApply = f, b
					}
				}()) : void(i[b] = d)
			}), g.prototype = a.widget.extend(h, {
				widgetEventPrefix: f ? h.widgetEventPrefix || b : b
			}, i, {
				constructor: g,
				namespace: j,
				widgetName: b,
				widgetFullName: e
			}), f ? (a.each(f._childConstructors, function(b, c) {
				var d = c.prototype;
				a.widget(d.namespace + "." + d.widgetName, g, c._proto)
			}), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g), g
		}, a.widget.extend = function(b) {
			for (var c, d, f = e.call(arguments, 1), g = 0, h = f.length; h > g; g++)
				for (c in f[g]) d = f[g][c], f[g].hasOwnProperty(c) && void 0 !== d && (a.isPlainObject(d) ? b[c] = a.isPlainObject(b[c]) ? a.widget.extend({}, b[c], d) : a.widget.extend({}, d) : b[c] = d);
			return b
		}, a.widget.bridge = function(b, c) {
			var d = c.prototype.widgetFullName || b;
			a.fn[b] = function(f) {
				var g = "string" == typeof f,
					h = e.call(arguments, 1),
					i = this;
				return g ? this.each(function() {
					var c, e = a.data(this, d);
					return "instance" === f ? (i = e, !1) : e ? a.isFunction(e[f]) && "_" !== f.charAt(0) ? (c = e[f].apply(e, h), c !== e && void 0 !== c ? (i = c && c.jquery ? i.pushStack(c.get()) : c, !1) : void 0) : a.error("no such method '" + f + "' for " + b + " widget instance") : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + f + "'")
				}) : (h.length && (f = a.widget.extend.apply(null, [f].concat(h))), this.each(function() {
					var b = a.data(this, d);
					b ? (b.option(f || {}), b._init && b._init()) : a.data(this, d, new c(f, this))
				})), i
			}
		}, a.Widget = function() {}, a.Widget._childConstructors = [], a.Widget.prototype = {
			widgetName: "widget",
			widgetEventPrefix: "",
			defaultElement: "<div>",
			options: {
				disabled: !1,
				create: null
			},
			_createWidget: function(b, c) {
				c = a(c || this.defaultElement || this)[0], this.element = a(c), this.uuid = d++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = a(), this.hoverable = a(), this.focusable = a(), c !== this && (a.data(c, this.widgetFullName, this), this._on(!0, this.element, {
					remove: function(a) {
						a.target === c && this.destroy()
					}
				}), this.document = a(c.style ? c.ownerDocument : c.document || c), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
			},
			_getCreateOptions: a.noop,
			_getCreateEventData: a.noop,
			_create: a.noop,
			_init: a.noop,
			destroy: function() {
				this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
			},
			_destroy: a.noop,
			widget: function() {
				return this.element
			},
			option: function(b, c) {
				var d, e, f, g = b;
				if (0 === arguments.length) return a.widget.extend({}, this.options);
				if ("string" == typeof b)
					if (g = {}, d = b.split("."), b = d.shift(), d.length) {
						for (e = g[b] = a.widget.extend({}, this.options[b]), f = 0; f < d.length - 1; f++) e[d[f]] = e[d[f]] || {}, e = e[d[f]];
						if (b = d.pop(), 1 === arguments.length) return void 0 === e[b] ? null : e[b];
						e[b] = c
					} else {
						if (1 === arguments.length) return void 0 === this.options[b] ? null : this.options[b];
						g[b] = c
					}
				return this._setOptions(g), this
			},
			_setOptions: function(a) {
				var b;
				for (b in a) this._setOption(b, a[b]);
				return this
			},
			_setOption: function(a, b) {
				return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!b), b && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
			},
			enable: function() {
				return this._setOptions({
					disabled: !1
				})
			},
			disable: function() {
				return this._setOptions({
					disabled: !0
				})
			},
			_on: function(b, c, d) {
				var e, f = this;
				"boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function(d, g) {
					function h() {
						return b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof g ? f[g] : g).apply(f, arguments) : void 0
					}
					"string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
					var i = d.match(/^([\w:-]*)\s*(.*)$/),
						j = i[1] + f.eventNamespace,
						k = i[2];
					k ? e.delegate(k, j, h) : c.bind(j, h)
				})
			},
			_off: function(b, c) {
				c = (c || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, b.unbind(c).undelegate(c), this.bindings = a(this.bindings.not(b).get()), this.focusable = a(this.focusable.not(b).get()), this.hoverable = a(this.hoverable.not(b).get())
			},
			_delay: function(a, b) {
				function c() {
					return ("string" == typeof a ? d[a] : a).apply(d, arguments)
				}
				var d = this;
				return setTimeout(c, b || 0)
			},
			_hoverable: function(b) {
				this.hoverable = this.hoverable.add(b), this._on(b, {
					mouseenter: function(b) {
						a(b.currentTarget).addClass("ui-state-hover")
					},
					mouseleave: function(b) {
						a(b.currentTarget).removeClass("ui-state-hover")
					}
				})
			},
			_focusable: function(b) {
				this.focusable = this.focusable.add(b), this._on(b, {
					focusin: function(b) {
						a(b.currentTarget).addClass("ui-state-focus")
					},
					focusout: function(b) {
						a(b.currentTarget).removeClass("ui-state-focus")
					}
				})
			},
			_trigger: function(b, c, d) {
				var e, f, g = this.options[b];
				if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)
					for (e in f) e in c || (c[e] = f[e]);
				return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
			}
		}, a.each({
			show: "fadeIn",
			hide: "fadeOut"
		}, function(b, c) {
			a.Widget.prototype["_" + b] = function(d, e, f) {
				"string" == typeof e && (e = {
					effect: e
				});
				var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
				e = e || {}, "number" == typeof e && (e = {
					duration: e
				}), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) {
					a(this)[b](), f && f.call(d[0]), c()
				})
			}
		});
		var f = (a.widget, !1);
		a(document).mouseup(function() {
			f = !1
		});
		a.widget("ui.mouse", {
			version: "1.11.4",
			options: {
				cancel: "input,textarea,button,select,option",
				distance: 1,
				delay: 0
			},
			_mouseInit: function() {
				var b = this;
				this.element.bind("mousedown." + this.widgetName, function(a) {
					return b._mouseDown(a)
				}).bind("click." + this.widgetName, function(c) {
					return !0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1) : void 0
				}), this.started = !1
			},
			_mouseDestroy: function() {
				this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
			},
			_mouseDown: function(b) {
				if (!f) {
					this._mouseMoved = !1, this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
					var c = this,
						d = 1 === b.which,
						e = "string" == typeof this.options.cancel && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
					return d && !e && this._mouseCapture(b) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
						c.mouseDelayMet = !0
					}, this.options.delay)), this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(b) !== !1, !this._mouseStarted) ? (b.preventDefault(), !0) : (!0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
						return c._mouseMove(a)
					}, this._mouseUpDelegate = function(a) {
						return c._mouseUp(a);
					}, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), f = !0, !0)) : !0
				}
			},
			_mouseMove: function(b) {
				if (this._mouseMoved) {
					if (a.ui.ie && (!document.documentMode || document.documentMode < 9) && !b.button) return this._mouseUp(b);
					if (!b.which) return this._mouseUp(b)
				}
				return (b.which || b.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted)
			},
			_mouseUp: function(b) {
				return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), f = !1, !1
			},
			_mouseDistanceMet: function(a) {
				return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
			},
			_mouseDelayMet: function() {
				return this.mouseDelayMet
			},
			_mouseStart: function() {},
			_mouseDrag: function() {},
			_mouseStop: function() {},
			_mouseCapture: function() {
				return !0
			}
		});
		! function() {
			function b(a, b, c) {
				return [parseFloat(a[0]) * (n.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (n.test(a[1]) ? c / 100 : 1)]
			}

			function c(b, c) {
				return parseInt(a.css(b, c), 10) || 0
			}

			function d(b) {
				var c = b[0];
				return 9 === c.nodeType ? {
					width: b.width(),
					height: b.height(),
					offset: {
						top: 0,
						left: 0
					}
				} : a.isWindow(c) ? {
					width: b.width(),
					height: b.height(),
					offset: {
						top: b.scrollTop(),
						left: b.scrollLeft()
					}
				} : c.preventDefault ? {
					width: 0,
					height: 0,
					offset: {
						top: c.pageY,
						left: c.pageX
					}
				} : {
					width: b.outerWidth(),
					height: b.outerHeight(),
					offset: b.offset()
				}
			}
			a.ui = a.ui || {};
			var e, f, g = Math.max,
				h = Math.abs,
				i = Math.round,
				j = /left|center|right/,
				k = /top|center|bottom/,
				l = /[\+\-]\d+(\.[\d]+)?%?/,
				m = /^\w+/,
				n = /%$/,
				o = a.fn.position;
			a.position = {
					scrollbarWidth: function() {
						if (void 0 !== e) return e;
						var b, c, d = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
							f = d.children()[0];
						return a("body").append(d), b = f.offsetWidth, d.css("overflow", "scroll"), c = f.offsetWidth, b === c && (c = d[0].clientWidth), d.remove(), e = b - c
					},
					getScrollInfo: function(b) {
						var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"),
							d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"),
							e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth,
							f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
						return {
							width: f ? a.position.scrollbarWidth() : 0,
							height: e ? a.position.scrollbarWidth() : 0
						}
					},
					getWithinInfo: function(b) {
						var c = a(b || window),
							d = a.isWindow(c[0]),
							e = !!c[0] && 9 === c[0].nodeType;
						return {
							element: c,
							isWindow: d,
							isDocument: e,
							offset: c.offset() || {
								left: 0,
								top: 0
							},
							scrollLeft: c.scrollLeft(),
							scrollTop: c.scrollTop(),
							width: d || e ? c.width() : c.outerWidth(),
							height: d || e ? c.height() : c.outerHeight()
						}
					}
				}, a.fn.position = function(e) {
					if (!e || !e.of) return o.apply(this, arguments);
					e = a.extend({}, e);
					var n, p, q, r, s, t, u = a(e.of),
						v = a.position.getWithinInfo(e.within),
						w = a.position.getScrollInfo(v),
						x = (e.collision || "flip").split(" "),
						y = {};
					return t = d(u), u[0].preventDefault && (e.at = "left top"), p = t.width, q = t.height, r = t.offset, s = a.extend({}, r), a.each(["my", "at"], function() {
						var a, b, c = (e[this] || "").split(" ");
						1 === c.length && (c = j.test(c[0]) ? c.concat(["center"]) : k.test(c[0]) ? ["center"].concat(c) : ["center", "center"]), c[0] = j.test(c[0]) ? c[0] : "center", c[1] = k.test(c[1]) ? c[1] : "center", a = l.exec(c[0]), b = l.exec(c[1]), y[this] = [a ? a[0] : 0, b ? b[0] : 0], e[this] = [m.exec(c[0])[0], m.exec(c[1])[0]]
					}), 1 === x.length && (x[1] = x[0]), "right" === e.at[0] ? s.left += p : "center" === e.at[0] && (s.left += p / 2), "bottom" === e.at[1] ? s.top += q : "center" === e.at[1] && (s.top += q / 2), n = b(y.at, p, q), s.left += n[0], s.top += n[1], this.each(function() {
						var d, j, k = a(this),
							l = k.outerWidth(),
							m = k.outerHeight(),
							o = c(this, "marginLeft"),
							t = c(this, "marginTop"),
							z = l + o + c(this, "marginRight") + w.width,
							A = m + t + c(this, "marginBottom") + w.height,
							B = a.extend({}, s),
							C = b(y.my, k.outerWidth(), k.outerHeight());
						"right" === e.my[0] ? B.left -= l : "center" === e.my[0] && (B.left -= l / 2), "bottom" === e.my[1] ? B.top -= m : "center" === e.my[1] && (B.top -= m / 2), B.left += C[0], B.top += C[1], f || (B.left = i(B.left), B.top = i(B.top)), d = {
							marginLeft: o,
							marginTop: t
						}, a.each(["left", "top"], function(b, c) {
							a.ui.position[x[b]] && a.ui.position[x[b]][c](B, {
								targetWidth: p,
								targetHeight: q,
								elemWidth: l,
								elemHeight: m,
								collisionPosition: d,
								collisionWidth: z,
								collisionHeight: A,
								offset: [n[0] + C[0], n[1] + C[1]],
								my: e.my,
								at: e.at,
								within: v,
								elem: k
							})
						}), e.using && (j = function(a) {
							var b = r.left - B.left,
								c = b + p - l,
								d = r.top - B.top,
								f = d + q - m,
								i = {
									target: {
										element: u,
										left: r.left,
										top: r.top,
										width: p,
										height: q
									},
									element: {
										element: k,
										left: B.left,
										top: B.top,
										width: l,
										height: m
									},
									horizontal: 0 > c ? "left" : b > 0 ? "right" : "center",
									vertical: 0 > f ? "top" : d > 0 ? "bottom" : "middle"
								};
							l > p && h(b + c) < p && (i.horizontal = "center"), m > q && h(d + f) < q && (i.vertical = "middle"), g(h(b), h(c)) > g(h(d), h(f)) ? i.important = "horizontal" : i.important = "vertical", e.using.call(this, a, i)
						}), k.offset(a.extend(B, {
							using: j
						}))
					})
				}, a.ui.position = {
					fit: {
						left: function(a, b) {
							var c, d = b.within,
								e = d.isWindow ? d.scrollLeft : d.offset.left,
								f = d.width,
								h = a.left - b.collisionPosition.marginLeft,
								i = e - h,
								j = h + b.collisionWidth - f - e;
							b.collisionWidth > f ? i > 0 && 0 >= j ? (c = a.left + i + b.collisionWidth - f - e, a.left += i - c) : j > 0 && 0 >= i ? a.left = e : i > j ? a.left = e + f - b.collisionWidth : a.left = e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = g(a.left - h, a.left)
						},
						top: function(a, b) {
							var c, d = b.within,
								e = d.isWindow ? d.scrollTop : d.offset.top,
								f = b.within.height,
								h = a.top - b.collisionPosition.marginTop,
								i = e - h,
								j = h + b.collisionHeight - f - e;
							b.collisionHeight > f ? i > 0 && 0 >= j ? (c = a.top + i + b.collisionHeight - f - e, a.top += i - c) : j > 0 && 0 >= i ? a.top = e : i > j ? a.top = e + f - b.collisionHeight : a.top = e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = g(a.top - h, a.top)
						}
					},
					flip: {
						left: function(a, b) {
							var c, d, e = b.within,
								f = e.offset.left + e.scrollLeft,
								g = e.width,
								i = e.isWindow ? e.scrollLeft : e.offset.left,
								j = a.left - b.collisionPosition.marginLeft,
								k = j - i,
								l = j + b.collisionWidth - g - i,
								m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
								n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
								o = -2 * b.offset[0];
							0 > k ? (c = a.left + m + n + o + b.collisionWidth - g - f, (0 > c || c < h(k)) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, (d > 0 || h(d) < l) && (a.left += m + n + o))
						},
						top: function(a, b) {
							var c, d, e = b.within,
								f = e.offset.top + e.scrollTop,
								g = e.height,
								i = e.isWindow ? e.scrollTop : e.offset.top,
								j = a.top - b.collisionPosition.marginTop,
								k = j - i,
								l = j + b.collisionHeight - g - i,
								m = "top" === b.my[1],
								n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
								o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
								p = -2 * b.offset[1];
							0 > k ? (d = a.top + n + o + p + b.collisionHeight - g - f, (0 > d || d < h(k)) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, (c > 0 || h(c) < l) && (a.top += n + o + p))
						}
					},
					flipfit: {
						left: function() {
							a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments)
						},
						top: function() {
							a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments)
						}
					}
				},
				function() {
					var b, c, d, e, g, h = document.getElementsByTagName("body")[0],
						i = document.createElement("div");
					b = document.createElement(h ? "div" : "body"), d = {
						visibility: "hidden",
						width: 0,
						height: 0,
						border: 0,
						margin: 0,
						background: "none"
					}, h && a.extend(d, {
						position: "absolute",
						left: "-1000px",
						top: "-1000px"
					});
					for (g in d) b.style[g] = d[g];
					b.appendChild(i), c = h || document.documentElement, c.insertBefore(b, c.firstChild), i.style.cssText = "position: absolute; left: 10.7432222px;", e = a(i).offset().left, f = e > 10 && 11 > e, b.innerHTML = "", c.removeChild(b)
				}()
		}();
		a.ui.position;
		a.widget("ui.draggable", a.ui.mouse, {
			version: "1.11.4",
			widgetEventPrefix: "drag",
			options: {
				addClasses: !0,
				appendTo: "parent",
				axis: !1,
				connectToSortable: !1,
				containment: !1,
				cursor: "auto",
				cursorAt: !1,
				grid: !1,
				handle: !1,
				helper: "original",
				iframeFix: !1,
				opacity: !1,
				refreshPositions: !1,
				revert: !1,
				revertDuration: 500,
				scope: "default",
				scroll: !0,
				scrollSensitivity: 20,
				scrollSpeed: 20,
				snap: !1,
				snapMode: "both",
				snapTolerance: 20,
				stack: !1,
				zIndex: !1,
				drag: null,
				start: null,
				stop: null
			},
			_create: function() {
				"original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
			},
			_setOption: function(a, b) {
				this._super(a, b), "handle" === a && (this._removeHandleClassName(), this._setHandleClassName())
			},
			_destroy: function() {
				return (this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), void this._mouseDestroy())
			},
			_mouseCapture: function(b) {
				var c = this.options;
				return this._blurActiveElement(b), this.helper || c.disabled || a(b.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(b), this.handle ? (this._blockFrames(c.iframeFix === !0 ? "iframe" : c.iframeFix), !0) : !1)
			},
			_blockFrames: function(b) {
				this.iframeBlocks = this.document.find(b).map(function() {
					var b = a(this);
					return a("<div>").css("position", "absolute").appendTo(b.parent()).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()).offset(b.offset())[0]
				})
			},
			_unblockFrames: function() {
				this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
			},
			_blurActiveElement: function(b) {
				var c = this.document[0];
				if (this.handleElement.is(b.target)) try {
					c.activeElement && "body" !== c.activeElement.nodeName.toLowerCase() && a(c.activeElement).blur()
				} catch (d) {}
			},
			_mouseStart: function(b) {
				var c = this.options;
				return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
					return "fixed" === a(this).css("position")
				}).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(b), this.originalPosition = this.position = this._generatePosition(b, !1), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._normalizeRightBottom(), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
			},
			_refreshOffsets: function(a) {
				this.offset = {
					top: this.positionAbs.top - this.margins.top,
					left: this.positionAbs.left - this.margins.left,
					scroll: !1,
					parent: this._getParentOffset(),
					relative: this._getRelativeOffset()
				}, this.offset.click = {
					left: a.pageX - this.offset.left,
					top: a.pageY - this.offset.top
				}
			},
			_mouseDrag: function(b, c) {
				if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(b, !0), this.positionAbs = this._convertPositionTo("absolute"), !c) {
					var d = this._uiHash();
					if (this._trigger("drag", b, d) === !1) return this._mouseUp({}), !1;
					this.position = d.position
				}
				return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
			},
			_mouseStop: function(b) {
				var c = this,
					d = !1;
				return a.ui.ddmanager && !this.options.dropBehaviour && (d = a.ui.ddmanager.drop(this, b)), this.dropped && (d = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !d || "valid" === this.options.revert && d || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
					c._trigger("stop", b) !== !1 && c._clear()
				}) : this._trigger("stop", b) !== !1 && this._clear(), !1
			},
			_mouseUp: function(b) {
				return this._unblockFrames(), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), this.handleElement.is(b.target) && this.element.focus(), a.ui.mouse.prototype._mouseUp.call(this, b)
			},
			cancel: function() {
				return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
			},
			_getHandle: function(b) {
				return this.options.handle ? !!a(b.target).closest(this.element.find(this.options.handle)).length : !0
			},
			_setHandleClassName: function() {
				this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
			},
			_removeHandleClassName: function() {
				this.handleElement.removeClass("ui-draggable-handle")
			},
			_createHelper: function(b) {
				var c = this.options,
					d = a.isFunction(c.helper),
					e = d ? a(c.helper.apply(this.element[0], [b])) : "clone" === c.helper ? this.element.clone().removeAttr("id") : this.element;
				return e.parents("body").length || e.appendTo("parent" === c.appendTo ? this.element[0].parentNode : c.appendTo), d && e[0] === this.element[0] && this._setPositionRelative(), e[0] === this.element[0] || /(fixed|absolute)/.test(e.css("position")) || e.css("position", "absolute"), e
			},
			_setPositionRelative: function() {
				/^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
			},
			_adjustOffsetFromHelper: function(b) {
				"string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
					left: +b[0],
					top: +b[1] || 0
				}), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
			},
			_isRootNode: function(a) {
				return /(html|body)/i.test(a.tagName) || a === this.document[0]
			},
			_getParentOffset: function() {
				var b = this.offsetParent.offset(),
					c = this.document[0];
				return "absolute" === this.cssPosition && this.scrollParent[0] !== c && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (b = {
					top: 0,
					left: 0
				}), {
					top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
					left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
				}
			},
			_getRelativeOffset: function() {
				if ("relative" !== this.cssPosition) return {
					top: 0,
					left: 0
				};
				var a = this.element.position(),
					b = this._isRootNode(this.scrollParent[0]);
				return {
					top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + (b ? 0 : this.scrollParent.scrollTop()),
					left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + (b ? 0 : this.scrollParent.scrollLeft())
				}
			},
			_cacheMargins: function() {
				this.margins = {
					left: parseInt(this.element.css("marginLeft"), 10) || 0,
					top: parseInt(this.element.css("marginTop"), 10) || 0,
					right: parseInt(this.element.css("marginRight"), 10) || 0,
					bottom: parseInt(this.element.css("marginBottom"), 10) || 0
				}
			},
			_cacheHelperProportions: function() {
				this.helperProportions = {
					width: this.helper.outerWidth(),
					height: this.helper.outerHeight()
				}
			},
			_setContainment: function() {
				var b, c, d, e = this.options,
					f = this.document[0];
				return this.relativeContainer = null, e.containment ? "window" === e.containment ? void(this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === e.containment ? void(this.containment = [0, 0, a(f).width() - this.helperProportions.width - this.margins.left, (a(f).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : e.containment.constructor === Array ? void(this.containment = e.containment) : ("parent" === e.containment && (e.containment = this.helper[0].parentNode), c = a(e.containment), d = c[0], void(d && (b = /(scroll|auto)/.test(c.css("overflow")), this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (b ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = c))) : void(this.containment = null)
			},
			_convertPositionTo: function(a, b) {
				b || (b = this.position);
				var c = "absolute" === a ? 1 : -1,
					d = this._isRootNode(this.scrollParent[0]);
				return {
					top: b.top + this.offset.relative.top * c + this.offset.parent.top * c - ("fixed" === this.cssPosition ? -this.offset.scroll.top : d ? 0 : this.offset.scroll.top) * c,
					left: b.left + this.offset.relative.left * c + this.offset.parent.left * c - ("fixed" === this.cssPosition ? -this.offset.scroll.left : d ? 0 : this.offset.scroll.left) * c
				}
			},
			_generatePosition: function(a, b) {
				var c, d, e, f, g = this.options,
					h = this._isRootNode(this.scrollParent[0]),
					i = a.pageX,
					j = a.pageY;
				return h && this.offset.scroll || (this.offset.scroll = {
					top: this.scrollParent.scrollTop(),
					left: this.scrollParent.scrollLeft()
				}), b && (this.containment && (this.relativeContainer ? (d = this.relativeContainer.offset(), c = [this.containment[0] + d.left, this.containment[1] + d.top, this.containment[2] + d.left, this.containment[3] + d.top]) : c = this.containment, a.pageX - this.offset.click.left < c[0] && (i = c[0] + this.offset.click.left), a.pageY - this.offset.click.top < c[1] && (j = c[1] + this.offset.click.top), a.pageX - this.offset.click.left > c[2] && (i = c[2] + this.offset.click.left), a.pageY - this.offset.click.top > c[3] && (j = c[3] + this.offset.click.top)), g.grid && (e = g.grid[1] ? this.originalPageY + Math.round((j - this.originalPageY) / g.grid[1]) * g.grid[1] : this.originalPageY, j = c ? e - this.offset.click.top >= c[1] || e - this.offset.click.top > c[3] ? e : e - this.offset.click.top >= c[1] ? e - g.grid[1] : e + g.grid[1] : e, f = g.grid[0] ? this.originalPageX + Math.round((i - this.originalPageX) / g.grid[0]) * g.grid[0] : this.originalPageX, i = c ? f - this.offset.click.left >= c[0] || f - this.offset.click.left > c[2] ? f : f - this.offset.click.left >= c[0] ? f - g.grid[0] : f + g.grid[0] : f), "y" === g.axis && (i = this.originalPageX), "x" === g.axis && (j = this.originalPageY)), {
					top: j - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : h ? 0 : this.offset.scroll.top),
					left: i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : h ? 0 : this.offset.scroll.left)
				}
			},
			_clear: function() {
				this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
			},
			_normalizeRightBottom: function() {
				"y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"))
			},
			_trigger: function(b, c, d) {
				return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d, this], !0), /^(drag|start|stop)/.test(b) && (this.positionAbs = this._convertPositionTo("absolute"), d.offset = this.positionAbs), a.Widget.prototype._trigger.call(this, b, c, d)
			},
			plugins: {},
			_uiHash: function() {
				return {
					helper: this.helper,
					position: this.position,
					originalPosition: this.originalPosition,
					offset: this.positionAbs
				}
			}
		}), a.ui.plugin.add("draggable", "connectToSortable", {
			start: function(b, c, d) {
				var e = a.extend({}, c, {
					item: d.element
				});
				d.sortables = [], a(d.options.connectToSortable).each(function() {
					var c = a(this).sortable("instance");
					c && !c.options.disabled && (d.sortables.push(c), c.refreshPositions(), c._trigger("activate", b, e))
				})
			},
			stop: function(b, c, d) {
				var e = a.extend({}, c, {
					item: d.element
				});
				d.cancelHelperRemoval = !1, a.each(d.sortables, function() {
					var a = this;
					a.isOver ? (a.isOver = 0, d.cancelHelperRemoval = !0, a.cancelHelperRemoval = !1, a._storedCSS = {
						position: a.placeholder.css("position"),
						top: a.placeholder.css("top"),
						left: a.placeholder.css("left")
					}, a._mouseStop(b), a.options.helper = a.options._helper) : (a.cancelHelperRemoval = !0, a._trigger("deactivate", b, e))
				})
			},
			drag: function(b, c, d) {
				a.each(d.sortables, function() {
					var e = !1,
						f = this;
					f.positionAbs = d.positionAbs, f.helperProportions = d.helperProportions, f.offset.click = d.offset.click, f._intersectsWith(f.containerCache) && (e = !0, a.each(d.sortables, function() {
						return this.positionAbs = d.positionAbs, this.helperProportions = d.helperProportions, this.offset.click = d.offset.click, this !== f && this._intersectsWith(this.containerCache) && a.contains(f.element[0], this.element[0]) && (e = !1), e
					})), e ? (f.isOver || (f.isOver = 1, d._parent = c.helper.parent(), f.currentItem = c.helper.appendTo(f.element).data("ui-sortable-item", !0), f.options._helper = f.options.helper, f.options.helper = function() {
						return c.helper[0]
					}, b.target = f.currentItem[0], f._mouseCapture(b, !0), f._mouseStart(b, !0, !0), f.offset.click.top = d.offset.click.top, f.offset.click.left = d.offset.click.left, f.offset.parent.left -= d.offset.parent.left - f.offset.parent.left, f.offset.parent.top -= d.offset.parent.top - f.offset.parent.top, d._trigger("toSortable", b), d.dropped = f.element, a.each(d.sortables, function() {
						this.refreshPositions()
					}), d.currentItem = d.element, f.fromOutside = d), f.currentItem && (f._mouseDrag(b), c.position = f.position)) : f.isOver && (f.isOver = 0, f.cancelHelperRemoval = !0, f.options._revert = f.options.revert, f.options.revert = !1, f._trigger("out", b, f._uiHash(f)), f._mouseStop(b, !0), f.options.revert = f.options._revert, f.options.helper = f.options._helper, f.placeholder && f.placeholder.remove(), c.helper.appendTo(d._parent), d._refreshOffsets(b), c.position = d._generatePosition(b, !0), d._trigger("fromSortable", b), d.dropped = !1, a.each(d.sortables, function() {
						this.refreshPositions()
					}))
				})
			}
		}), a.ui.plugin.add("draggable", "cursor", {
			start: function(b, c, d) {
				var e = a("body"),
					f = d.options;
				e.css("cursor") && (f._cursor = e.css("cursor")), e.css("cursor", f.cursor)
			},
			stop: function(b, c, d) {
				var e = d.options;
				e._cursor && a("body").css("cursor", e._cursor)
			}
		}), a.ui.plugin.add("draggable", "opacity", {
			start: function(b, c, d) {
				var e = a(c.helper),
					f = d.options;
				e.css("opacity") && (f._opacity = e.css("opacity")), e.css("opacity", f.opacity)
			},
			stop: function(b, c, d) {
				var e = d.options;
				e._opacity && a(c.helper).css("opacity", e._opacity)
			}
		}), a.ui.plugin.add("draggable", "scroll", {
			start: function(a, b, c) {
				c.scrollParentNotHidden || (c.scrollParentNotHidden = c.helper.scrollParent(!1)), c.scrollParentNotHidden[0] !== c.document[0] && "HTML" !== c.scrollParentNotHidden[0].tagName && (c.overflowOffset = c.scrollParentNotHidden.offset())
			},
			drag: function(b, c, d) {
				var e = d.options,
					f = !1,
					g = d.scrollParentNotHidden[0],
					h = d.document[0];
				g !== h && "HTML" !== g.tagName ? (e.axis && "x" === e.axis || (d.overflowOffset.top + g.offsetHeight - b.pageY < e.scrollSensitivity ? g.scrollTop = f = g.scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (g.scrollTop = f = g.scrollTop - e.scrollSpeed)), e.axis && "y" === e.axis || (d.overflowOffset.left + g.offsetWidth - b.pageX < e.scrollSensitivity ? g.scrollLeft = f = g.scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (g.scrollLeft = f = g.scrollLeft - e.scrollSpeed))) : (e.axis && "x" === e.axis || (b.pageY - a(h).scrollTop() < e.scrollSensitivity ? f = a(h).scrollTop(a(h).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(h).scrollTop()) < e.scrollSensitivity && (f = a(h).scrollTop(a(h).scrollTop() + e.scrollSpeed))), e.axis && "y" === e.axis || (b.pageX - a(h).scrollLeft() < e.scrollSensitivity ? f = a(h).scrollLeft(a(h).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(h).scrollLeft()) < e.scrollSensitivity && (f = a(h).scrollLeft(a(h).scrollLeft() + e.scrollSpeed)))), f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
			}
		}), a.ui.plugin.add("draggable", "snap", {
			start: function(b, c, d) {
				var e = d.options;
				d.snapElements = [], a(e.snap.constructor !== String ? e.snap.items || ":data(ui-draggable)" : e.snap).each(function() {
					var b = a(this),
						c = b.offset();
					this !== d.element[0] && d.snapElements.push({
						item: this,
						width: b.outerWidth(),
						height: b.outerHeight(),
						top: c.top,
						left: c.left
					})
				})
			},
			drag: function(b, c, d) {
				var e, f, g, h, i, j, k, l, m, n, o = d.options,
					p = o.snapTolerance,
					q = c.offset.left,
					r = q + d.helperProportions.width,
					s = c.offset.top,
					t = s + d.helperProportions.height;
				for (m = d.snapElements.length - 1; m >= 0; m--) i = d.snapElements[m].left - d.margins.left, j = i + d.snapElements[m].width, k = d.snapElements[m].top - d.margins.top, l = k + d.snapElements[m].height, i - p > r || q > j + p || k - p > t || s > l + p || !a.contains(d.snapElements[m].item.ownerDocument, d.snapElements[m].item) ? (d.snapElements[m].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
					snapItem: d.snapElements[m].item
				})), d.snapElements[m].snapping = !1) : ("inner" !== o.snapMode && (e = Math.abs(k - t) <= p, f = Math.abs(l - s) <= p, g = Math.abs(i - r) <= p, h = Math.abs(j - q) <= p, e && (c.position.top = d._convertPositionTo("relative", {
					top: k - d.helperProportions.height,
					left: 0
				}).top), f && (c.position.top = d._convertPositionTo("relative", {
					top: l,
					left: 0
				}).top), g && (c.position.left = d._convertPositionTo("relative", {
					top: 0,
					left: i - d.helperProportions.width
				}).left), h && (c.position.left = d._convertPositionTo("relative", {
					top: 0,
					left: j
				}).left)), n = e || f || g || h, "outer" !== o.snapMode && (e = Math.abs(k - s) <= p, f = Math.abs(l - t) <= p, g = Math.abs(i - q) <= p, h = Math.abs(j - r) <= p, e && (c.position.top = d._convertPositionTo("relative", {
					top: k,
					left: 0
				}).top), f && (c.position.top = d._convertPositionTo("relative", {
					top: l - d.helperProportions.height,
					left: 0
				}).top), g && (c.position.left = d._convertPositionTo("relative", {
					top: 0,
					left: i
				}).left), h && (c.position.left = d._convertPositionTo("relative", {
					top: 0,
					left: j - d.helperProportions.width
				}).left)), !d.snapElements[m].snapping && (e || f || g || h || n) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
					snapItem: d.snapElements[m].item
				})), d.snapElements[m].snapping = e || f || g || h || n)
			}
		}), a.ui.plugin.add("draggable", "stack", {
			start: function(b, c, d) {
				var e, f = d.options,
					g = a.makeArray(a(f.stack)).sort(function(b, c) {
						return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
					});
				g.length && (e = parseInt(a(g[0]).css("zIndex"), 10) || 0, a(g).each(function(b) {
					a(this).css("zIndex", e + b)
				}), this.css("zIndex", e + g.length))
			}
		}), a.ui.plugin.add("draggable", "zIndex", {
			start: function(b, c, d) {
				var e = a(c.helper),
					f = d.options;
				e.css("zIndex") && (f._zIndex = e.css("zIndex")), e.css("zIndex", f.zIndex)
			},
			stop: function(b, c, d) {
				var e = d.options;
				e._zIndex && a(c.helper).css("zIndex", e._zIndex)
			}
		});
		a.ui.draggable;
		a.widget("ui.droppable", {
			version: "1.11.4",
			widgetEventPrefix: "drop",
			options: {
				accept: "*",
				activeClass: !1,
				addClasses: !0,
				greedy: !1,
				hoverClass: !1,
				scope: "default",
				tolerance: "intersect",
				activate: null,
				deactivate: null,
				drop: null,
				out: null,
				over: null
			},
			_create: function() {
				var b, c = this.options,
					d = c.accept;
				this.isover = !1, this.isout = !0, this.accept = a.isFunction(d) ? d : function(a) {
					return a.is(d)
				}, this.proportions = function() {
					return arguments.length ? void(b = arguments[0]) : b ? b : b = {
						width: this.element[0].offsetWidth,
						height: this.element[0].offsetHeight
					}
				}, this._addToManager(c.scope), c.addClasses && this.element.addClass("ui-droppable")
			},
			_addToManager: function(b) {
				a.ui.ddmanager.droppables[b] = a.ui.ddmanager.droppables[b] || [], a.ui.ddmanager.droppables[b].push(this)
			},
			_splice: function(a) {
				for (var b = 0; b < a.length; b++) a[b] === this && a.splice(b, 1)
			},
			_destroy: function() {
				var b = a.ui.ddmanager.droppables[this.options.scope];
				this._splice(b), this.element.removeClass("ui-droppable ui-droppable-disabled")
			},
			_setOption: function(b, c) {
				if ("accept" === b) this.accept = a.isFunction(c) ? c : function(a) {
					return a.is(c)
				};
				else if ("scope" === b) {
					var d = a.ui.ddmanager.droppables[this.options.scope];
					this._splice(d), this._addToManager(c)
				}
				this._super(b, c)
			},
			_activate: function(b) {
				var c = a.ui.ddmanager.current;
				this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
			},
			_deactivate: function(b) {
				var c = a.ui.ddmanager.current;
				this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
			},
			_over: function(b) {
				var c = a.ui.ddmanager.current;
				c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
			},
			_out: function(b) {
				var c = a.ui.ddmanager.current;
				c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
			},
			_drop: function(b, c) {
				var d = c || a.ui.ddmanager.current,
					e = !1;
				return d && (d.currentItem || d.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
					var c = a(this).droppable("instance");
					return c.options.greedy && !c.options.disabled && c.options.scope === d.options.scope && c.accept.call(c.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(c, {
						offset: c.element.offset()
					}), c.options.tolerance, b) ? (e = !0, !1) : void 0
				}), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1) : !1
			},
			ui: function(a) {
				return {
					draggable: a.currentItem || a.element,
					helper: a.helper,
					position: a.position,
					offset: a.positionAbs
				}
			}
		}), a.ui.intersect = function() {
			function a(a, b, c) {
				return a >= b && b + c > a
			}
			return function(b, c, d, e) {
				if (!c.offset) return !1;
				var f = (b.positionAbs || b.position.absolute).left + b.margins.left,
					g = (b.positionAbs || b.position.absolute).top + b.margins.top,
					h = f + b.helperProportions.width,
					i = g + b.helperProportions.height,
					j = c.offset.left,
					k = c.offset.top,
					l = j + c.proportions().width,
					m = k + c.proportions().height;
				switch (d) {
					case "fit":
						return f >= j && l >= h && g >= k && m >= i;
					case "intersect":
						return j < f + b.helperProportions.width / 2 && h - b.helperProportions.width / 2 < l && k < g + b.helperProportions.height / 2 && i - b.helperProportions.height / 2 < m;
					case "pointer":
						return a(e.pageY, k, c.proportions().height) && a(e.pageX, j, c.proportions().width);
					case "touch":
						return (g >= k && m >= g || i >= k && m >= i || k > g && i > m) && (f >= j && l >= f || h >= j && l >= h || j > f && h > l);
					default:
						return !1
				}
			}
		}(), a.ui.ddmanager = {
			current: null,
			droppables: {
				"default": []
			},
			prepareOffsets: function(b, c) {
				var d, e, f = a.ui.ddmanager.droppables[b.options.scope] || [],
					g = c ? c.type : null,
					h = (b.currentItem || b.element).find(":data(ui-droppable)").addBack();
				a: for (d = 0; d < f.length; d++)
					if (!(f[d].options.disabled || b && !f[d].accept.call(f[d].element[0], b.currentItem || b.element))) {
						for (e = 0; e < h.length; e++)
							if (h[e] === f[d].element[0]) {
								f[d].proportions().height = 0;
								continue a
							}
						f[d].visible = "none" !== f[d].element.css("display"), f[d].visible && ("mousedown" === g && f[d]._activate.call(f[d], c), f[d].offset = f[d].element.offset(), f[d].proportions({
							width: f[d].element[0].offsetWidth,
							height: f[d].element[0].offsetHeight
						}))
					}
			},
			drop: function(b, c) {
				var d = !1;
				return a.each((a.ui.ddmanager.droppables[b.options.scope] || []).slice(), function() {
					this.options && (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance, c) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, c)))
				}), d
			},
			dragStart: function(b, c) {
				b.element.parentsUntil("body").bind("scroll.droppable", function() {
					b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
				})
			},
			drag: function(b, c) {
				b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
					if (!this.options.disabled && !this.greedyChild && this.visible) {
						var d, e, f, g = a.ui.intersect(b, this, this.options.tolerance, c),
							h = !g && this.isover ? "isout" : g && !this.isover ? "isover" : null;
						h && (this.options.greedy && (e = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function() {
							return a(this).droppable("instance").options.scope === e
						}), f.length && (d = a(f[0]).droppable("instance"), d.greedyChild = "isover" === h)), d && "isover" === h && (d.isover = !1, d.isout = !0, d._out.call(d, c)), this[h] = !0, this["isout" === h ? "isover" : "isout"] = !1, this["isover" === h ? "_over" : "_out"].call(this, c), d && "isout" === h && (d.isout = !1, d.isover = !0, d._over.call(d, c)))
					}
				})
			},
			dragStop: function(b, c) {
				b.element.parentsUntil("body").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
			}
		};
		a.ui.droppable;
		a.widget("ui.resizable", a.ui.mouse, {
			version: "1.11.4",
			widgetEventPrefix: "resize",
			options: {
				alsoResize: !1,
				animate: !1,
				animateDuration: "slow",
				animateEasing: "swing",
				aspectRatio: !1,
				autoHide: !1,
				containment: !1,
				ghost: !1,
				grid: !1,
				handles: "e,s,se",
				helper: !1,
				maxHeight: null,
				maxWidth: null,
				minHeight: 10,
				minWidth: 10,
				zIndex: 90,
				resize: null,
				start: null,
				stop: null
			},
			_num: function(a) {
				return parseInt(a, 10) || 0
			},
			_isNumber: function(a) {
				return !isNaN(parseInt(a, 10))
			},
			_hasScroll: function(b, c) {
				if ("hidden" === a(b).css("overflow")) return !1;
				var d = c && "left" === c ? "scrollLeft" : "scrollTop",
					e = !1;
				return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
			},
			_create: function() {
				var b, c, d, e, f, g = this,
					h = this.options;
				if (this.element.addClass("ui-resizable"), a.extend(this, {
						_aspectRatio: !!h.aspectRatio,
						aspectRatio: h.aspectRatio,
						originalElement: this.element,
						_proportionallyResizeElements: [],
						_helper: h.helper || h.ghost || h.animate ? h.helper || "ui-resizable-helper" : null
					}), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
						position: this.element.css("position"),
						width: this.element.outerWidth(),
						height: this.element.outerHeight(),
						top: this.element.css("top"),
						left: this.element.css("left")
					})), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
						marginLeft: this.originalElement.css("marginLeft"),
						marginTop: this.originalElement.css("marginTop"),
						marginRight: this.originalElement.css("marginRight"),
						marginBottom: this.originalElement.css("marginBottom")
					}), this.originalElement.css({
						marginLeft: 0,
						marginTop: 0,
						marginRight: 0,
						marginBottom: 0
					}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
						position: "static",
						zoom: 1,
						display: "block"
					})), this.originalElement.css({
						margin: this.originalElement.css("margin")
					}), this._proportionallyResize()), this.handles = h.handles || (a(".ui-resizable-handle", this.element).length ? {
						n: ".ui-resizable-n",
						e: ".ui-resizable-e",
						s: ".ui-resizable-s",
						w: ".ui-resizable-w",
						se: ".ui-resizable-se",
						sw: ".ui-resizable-sw",
						ne: ".ui-resizable-ne",
						nw: ".ui-resizable-nw"
					} : "e,s,se"), this._handles = a(), this.handles.constructor === String)
					for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), b = this.handles.split(","), this.handles = {}, c = 0; c < b.length; c++) d = a.trim(b[c]), f = "ui-resizable-" + d, e = a("<div class='ui-resizable-handle " + f + "'></div>"), e.css({
						zIndex: h.zIndex
					}), "se" === d && e.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[d] = ".ui-resizable-" + d, this.element.append(e);
				this._renderAxis = function(b) {
					var c, d, e, f;
					b = b || this.element;
					for (c in this.handles) this.handles[c].constructor === String ? this.handles[c] = this.element.children(this.handles[c]).first().show() : (this.handles[c].jquery || this.handles[c].nodeType) && (this.handles[c] = a(this.handles[c]), this._on(this.handles[c], {
						mousedown: g._mouseDown
					})), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (d = a(this.handles[c], this.element), f = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth(), e = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join(""), b.css(e, f), this._proportionallyResize()), this._handles = this._handles.add(this.handles[c])
				}, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.mouseover(function() {
					g.resizing || (this.className && (e = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), g.axis = e && e[1] ? e[1] : "se")
				}), h.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
					h.disabled || (a(this).removeClass("ui-resizable-autohide"), g._handles.show())
				}).mouseleave(function() {
					h.disabled || g.resizing || (a(this).addClass("ui-resizable-autohide"), g._handles.hide())
				})), this._mouseInit()
			},
			_destroy: function() {
				this._mouseDestroy();
				var b, c = function(b) {
					a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
				};
				return this.elementIsWrapper && (c(this.element), b = this.element, this.originalElement.css({
					position: b.css("position"),
					width: b.outerWidth(),
					height: b.outerHeight(),
					top: b.css("top"),
					left: b.css("left")
				}).insertAfter(b), b.remove()), this.originalElement.css("resize", this.originalResizeStyle), c(this.originalElement), this
			},
			_mouseCapture: function(b) {
				var c, d, e = !1;
				for (c in this.handles) d = a(this.handles[c])[0], (d === b.target || a.contains(d, b.target)) && (e = !0);
				return !this.options.disabled && e
			},
			_mouseStart: function(b) {
				var c, d, e, f = this.options,
					g = this.element;
				return this.resizing = !0, this._renderProxy(), c = this._num(this.helper.css("left")), d = this._num(this.helper.css("top")), f.containment && (c += a(f.containment).scrollLeft() || 0, d += a(f.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
					left: c,
					top: d
				}, this.size = this._helper ? {
					width: this.helper.width(),
					height: this.helper.height()
				} : {
					width: g.width(),
					height: g.height()
				}, this.originalSize = this._helper ? {
					width: g.outerWidth(),
					height: g.outerHeight()
				} : {
					width: g.width(),
					height: g.height()
				}, this.sizeDiff = {
					width: g.outerWidth() - g.width(),
					height: g.outerHeight() - g.height()
				}, this.originalPosition = {
					left: c,
					top: d
				}, this.originalMousePosition = {
					left: b.pageX,
					top: b.pageY
				}, this.aspectRatio = "number" == typeof f.aspectRatio ? f.aspectRatio : this.originalSize.width / this.originalSize.height || 1, e = a(".ui-resizable-" + this.axis).css("cursor"), a("body").css("cursor", "auto" === e ? this.axis + "-resize" : e), g.addClass("ui-resizable-resizing"), this._propagate("start", b), !0
			},
			_mouseDrag: function(b) {
				var c, d, e = this.originalMousePosition,
					f = this.axis,
					g = b.pageX - e.left || 0,
					h = b.pageY - e.top || 0,
					i = this._change[f];
				return this._updatePrevProperties(), i ? (c = i.apply(this, [b, g, h]), this._updateVirtualBoundaries(b.shiftKey), (this._aspectRatio || b.shiftKey) && (c = this._updateRatio(c, b)), c = this._respectSize(c, b), this._updateCache(c), this._propagate("resize", b), d = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), a.isEmptyObject(d) || (this._updatePrevProperties(), this._trigger("resize", b, this.ui()), this._applyChanges()), !1) : !1
			},
			_mouseStop: function(b) {
				this.resizing = !1;
				var c, d, e, f, g, h, i, j = this.options,
					k = this;
				return this._helper && (c = this._proportionallyResizeElements, d = c.length && /textarea/i.test(c[0].nodeName), e = d && this._hasScroll(c[0], "left") ? 0 : k.sizeDiff.height, f = d ? 0 : k.sizeDiff.width, g = {
					width: k.helper.width() - f,
					height: k.helper.height() - e
				}, h = parseInt(k.element.css("left"), 10) + (k.position.left - k.originalPosition.left) || null, i = parseInt(k.element.css("top"), 10) + (k.position.top - k.originalPosition.top) || null, j.animate || this.element.css(a.extend(g, {
					top: i,
					left: h
				})), k.helper.height(k.size.height), k.helper.width(k.size.width), this._helper && !j.animate && this._proportionallyResize()), a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1
			},
			_updatePrevProperties: function() {
				this.prevPosition = {
					top: this.position.top,
					left: this.position.left
				}, this.prevSize = {
					width: this.size.width,
					height: this.size.height
				}
			},
			_applyChanges: function() {
				var a = {};
				return this.position.top !== this.prevPosition.top && (a.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (a.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (a.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (a.height = this.size.height + "px"), this.helper.css(a), a
			},
			_updateVirtualBoundaries: function(a) {
				var b, c, d, e, f, g = this.options;
				f = {
					minWidth: this._isNumber(g.minWidth) ? g.minWidth : 0,
					maxWidth: this._isNumber(g.maxWidth) ? g.maxWidth : 1 / 0,
					minHeight: this._isNumber(g.minHeight) ? g.minHeight : 0,
					maxHeight: this._isNumber(g.maxHeight) ? g.maxHeight : 1 / 0
				}, (this._aspectRatio || a) && (b = f.minHeight * this.aspectRatio, d = f.minWidth / this.aspectRatio, c = f.maxHeight * this.aspectRatio, e = f.maxWidth / this.aspectRatio, b > f.minWidth && (f.minWidth = b), d > f.minHeight && (f.minHeight = d), c < f.maxWidth && (f.maxWidth = c), e < f.maxHeight && (f.maxHeight = e)), this._vBoundaries = f
			},
			_updateCache: function(a) {
				this.offset = this.helper.offset(), this._isNumber(a.left) && (this.position.left = a.left), this._isNumber(a.top) && (this.position.top = a.top), this._isNumber(a.height) && (this.size.height = a.height), this._isNumber(a.width) && (this.size.width = a.width)
			},
			_updateRatio: function(a) {
				var b = this.position,
					c = this.size,
					d = this.axis;
				return this._isNumber(a.height) ? a.width = a.height * this.aspectRatio : this._isNumber(a.width) && (a.height = a.width / this.aspectRatio), "sw" === d && (a.left = b.left + (c.width - a.width), a.top = null), "nw" === d && (a.top = b.top + (c.height - a.height), a.left = b.left + (c.width - a.width)), a
			},
			_respectSize: function(a) {
				var b = this._vBoundaries,
					c = this.axis,
					d = this._isNumber(a.width) && b.maxWidth && b.maxWidth < a.width,
					e = this._isNumber(a.height) && b.maxHeight && b.maxHeight < a.height,
					f = this._isNumber(a.width) && b.minWidth && b.minWidth > a.width,
					g = this._isNumber(a.height) && b.minHeight && b.minHeight > a.height,
					h = this.originalPosition.left + this.originalSize.width,
					i = this.position.top + this.size.height,
					j = /sw|nw|w/.test(c),
					k = /nw|ne|n/.test(c);
				return f && (a.width = b.minWidth), g && (a.height = b.minHeight), d && (a.width = b.maxWidth), e && (a.height = b.maxHeight), f && j && (a.left = h - b.minWidth), d && j && (a.left = h - b.maxWidth), g && k && (a.top = i - b.minHeight), e && k && (a.top = i - b.maxHeight), a.width || a.height || a.left || !a.top ? a.width || a.height || a.top || !a.left || (a.left = null) : a.top = null, a
			},
			_getPaddingPlusBorderDimensions: function(a) {
				for (var b = 0, c = [], d = [a.css("borderTopWidth"), a.css("borderRightWidth"), a.css("borderBottomWidth"), a.css("borderLeftWidth")], e = [a.css("paddingTop"), a.css("paddingRight"), a.css("paddingBottom"), a.css("paddingLeft")]; 4 > b; b++) c[b] = parseInt(d[b], 10) || 0, c[b] += parseInt(e[b], 10) || 0;
				return {
					height: c[0] + c[2],
					width: c[1] + c[3]
				}
			},
			_proportionallyResize: function() {
				if (this._proportionallyResizeElements.length)
					for (var a, b = 0, c = this.helper || this.element; b < this._proportionallyResizeElements.length; b++) a = this._proportionallyResizeElements[b], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(a)), a.css({
						height: c.height() - this.outerDimensions.height || 0,
						width: c.width() - this.outerDimensions.width || 0
					})
			},
			_renderProxy: function() {
				var b = this.element,
					c = this.options;
				this.elementOffset = b.offset(), this._helper ? (this.helper = this.helper || a("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
					width: this.element.outerWidth() - 1,
					height: this.element.outerHeight() - 1,
					position: "absolute",
					left: this.elementOffset.left + "px",
					top: this.elementOffset.top + "px",
					zIndex: ++c.zIndex
				}), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
			},
			_change: {
				e: function(a, b) {
					return {
						width: this.originalSize.width + b
					}
				},
				w: function(a, b) {
					var c = this.originalSize,
						d = this.originalPosition;
					return {
						left: d.left + b,
						width: c.width - b
					}
				},
				n: function(a, b, c) {
					var d = this.originalSize,
						e = this.originalPosition;
					return {
						top: e.top + c,
						height: d.height - c
					}
				},
				s: function(a, b, c) {
					return {
						height: this.originalSize.height + c
					}
				},
				se: function(b, c, d) {
					return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
				},
				sw: function(b, c, d) {
					return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
				},
				ne: function(b, c, d) {
					return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
				},
				nw: function(b, c, d) {
					return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
				}
			},
			_propagate: function(b, c) {
				a.ui.plugin.call(this, b, [c, this.ui()]), "resize" !== b && this._trigger(b, c, this.ui())
			},
			plugins: {},
			ui: function() {
				return {
					originalElement: this.originalElement,
					element: this.element,
					helper: this.helper,
					position: this.position,
					size: this.size,
					originalSize: this.originalSize,
					originalPosition: this.originalPosition
				}
			}
		}), a.ui.plugin.add("resizable", "animate", {
			stop: function(b) {
				var c = a(this).resizable("instance"),
					d = c.options,
					e = c._proportionallyResizeElements,
					f = e.length && /textarea/i.test(e[0].nodeName),
					g = f && c._hasScroll(e[0], "left") ? 0 : c.sizeDiff.height,
					h = f ? 0 : c.sizeDiff.width,
					i = {
						width: c.size.width - h,
						height: c.size.height - g
					},
					j = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null,
					k = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null;
				c.element.animate(a.extend(i, k && j ? {
					top: k,
					left: j
				} : {}), {
					duration: d.animateDuration,
					easing: d.animateEasing,
					step: function() {
						var d = {
							width: parseInt(c.element.css("width"), 10),
							height: parseInt(c.element.css("height"), 10),
							top: parseInt(c.element.css("top"), 10),
							left: parseInt(c.element.css("left"), 10)
						};
						e && e.length && a(e[0]).css({
							width: d.width,
							height: d.height
						}), c._updateCache(d), c._propagate("resize", b)
					}
				})
			}
		}), a.ui.plugin.add("resizable", "containment", {
			start: function() {
				var b, c, d, e, f, g, h, i = a(this).resizable("instance"),
					j = i.options,
					k = i.element,
					l = j.containment,
					m = l instanceof a ? l.get(0) : /parent/.test(l) ? k.parent().get(0) : l;
				m && (i.containerElement = a(m), /document/.test(l) || l === document ? (i.containerOffset = {
					left: 0,
					top: 0
				}, i.containerPosition = {
					left: 0,
					top: 0
				}, i.parentData = {
					element: a(document),
					left: 0,
					top: 0,
					width: a(document).width(),
					height: a(document).height() || document.body.parentNode.scrollHeight
				}) : (b = a(m), c = [], a(["Top", "Right", "Left", "Bottom"]).each(function(a, d) {
					c[a] = i._num(b.css("padding" + d))
				}), i.containerOffset = b.offset(), i.containerPosition = b.position(), i.containerSize = {
					height: b.innerHeight() - c[3],
					width: b.innerWidth() - c[1]
				}, d = i.containerOffset, e = i.containerSize.height, f = i.containerSize.width, g = i._hasScroll(m, "left") ? m.scrollWidth : f, h = i._hasScroll(m) ? m.scrollHeight : e, i.parentData = {
					element: m,
					left: d.left,
					top: d.top,
					width: g,
					height: h
				}))
			},
			resize: function(b) {
				var c, d, e, f, g = a(this).resizable("instance"),
					h = g.options,
					i = g.containerOffset,
					j = g.position,
					k = g._aspectRatio || b.shiftKey,
					l = {
						top: 0,
						left: 0
					},
					m = g.containerElement,
					n = !0;
				m[0] !== document && /static/.test(m.css("position")) && (l = i), j.left < (g._helper ? i.left : 0) && (g.size.width = g.size.width + (g._helper ? g.position.left - i.left : g.position.left - l.left), k && (g.size.height = g.size.width / g.aspectRatio, n = !1), g.position.left = h.helper ? i.left : 0), j.top < (g._helper ? i.top : 0) && (g.size.height = g.size.height + (g._helper ? g.position.top - i.top : g.position.top), k && (g.size.width = g.size.height * g.aspectRatio, n = !1), g.position.top = g._helper ? i.top : 0), e = g.containerElement.get(0) === g.element.parent().get(0), f = /relative|absolute/.test(g.containerElement.css("position")), e && f ? (g.offset.left = g.parentData.left + g.position.left, g.offset.top = g.parentData.top + g.position.top) : (g.offset.left = g.element.offset().left, g.offset.top = g.element.offset().top), c = Math.abs(g.sizeDiff.width + (g._helper ? g.offset.left - l.left : g.offset.left - i.left)), d = Math.abs(g.sizeDiff.height + (g._helper ? g.offset.top - l.top : g.offset.top - i.top)), c + g.size.width >= g.parentData.width && (g.size.width = g.parentData.width - c, k && (g.size.height = g.size.width / g.aspectRatio, n = !1)), d + g.size.height >= g.parentData.height && (g.size.height = g.parentData.height - d, k && (g.size.width = g.size.height * g.aspectRatio, n = !1)), n || (g.position.left = g.prevPosition.left, g.position.top = g.prevPosition.top, g.size.width = g.prevSize.width, g.size.height = g.prevSize.height)
			},
			stop: function() {
				var b = a(this).resizable("instance"),
					c = b.options,
					d = b.containerOffset,
					e = b.containerPosition,
					f = b.containerElement,
					g = a(b.helper),
					h = g.offset(),
					i = g.outerWidth() - b.sizeDiff.width,
					j = g.outerHeight() - b.sizeDiff.height;
				b._helper && !c.animate && /relative/.test(f.css("position")) && a(this).css({
					left: h.left - e.left - d.left,
					width: i,
					height: j
				}), b._helper && !c.animate && /static/.test(f.css("position")) && a(this).css({
					left: h.left - e.left - d.left,
					width: i,
					height: j
				})
			}
		}), a.ui.plugin.add("resizable", "alsoResize", {
			start: function() {
				var b = a(this).resizable("instance"),
					c = b.options;
				a(c.alsoResize).each(function() {
					var b = a(this);
					b.data("ui-resizable-alsoresize", {
						width: parseInt(b.width(), 10),
						height: parseInt(b.height(), 10),
						left: parseInt(b.css("left"), 10),
						top: parseInt(b.css("top"), 10)
					})
				})
			},
			resize: function(b, c) {
				var d = a(this).resizable("instance"),
					e = d.options,
					f = d.originalSize,
					g = d.originalPosition,
					h = {
						height: d.size.height - f.height || 0,
						width: d.size.width - f.width || 0,
						top: d.position.top - g.top || 0,
						left: d.position.left - g.left || 0
					};
				a(e.alsoResize).each(function() {
					var b = a(this),
						d = a(this).data("ui-resizable-alsoresize"),
						e = {},
						f = b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
					a.each(f, function(a, b) {
						var c = (d[b] || 0) + (h[b] || 0);
						c && c >= 0 && (e[b] = c || null)
					}), b.css(e)
				})
			},
			stop: function() {
				a(this).removeData("resizable-alsoresize")
			}
		}), a.ui.plugin.add("resizable", "ghost", {
			start: function() {
				var b = a(this).resizable("instance"),
					c = b.options,
					d = b.size;
				b.ghost = b.originalElement.clone(), b.ghost.css({
					opacity: .25,
					display: "block",
					position: "relative",
					height: d.height,
					width: d.width,
					margin: 0,
					left: 0,
					top: 0
				}).addClass("ui-resizable-ghost").addClass("string" == typeof c.ghost ? c.ghost : ""), b.ghost.appendTo(b.helper)
			},
			resize: function() {
				var b = a(this).resizable("instance");
				b.ghost && b.ghost.css({
					position: "relative",
					height: b.size.height,
					width: b.size.width
				})
			},
			stop: function() {
				var b = a(this).resizable("instance");
				b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0))
			}
		}), a.ui.plugin.add("resizable", "grid", {
			resize: function() {
				var b, c = a(this).resizable("instance"),
					d = c.options,
					e = c.size,
					f = c.originalSize,
					g = c.originalPosition,
					h = c.axis,
					i = "number" == typeof d.grid ? [d.grid, d.grid] : d.grid,
					j = i[0] || 1,
					k = i[1] || 1,
					l = Math.round((e.width - f.width) / j) * j,
					m = Math.round((e.height - f.height) / k) * k,
					n = f.width + l,
					o = f.height + m,
					p = d.maxWidth && d.maxWidth < n,
					q = d.maxHeight && d.maxHeight < o,
					r = d.minWidth && d.minWidth > n,
					s = d.minHeight && d.minHeight > o;
				d.grid = i, r && (n += j), s && (o += k), p && (n -= j), q && (o -= k), /^(se|s|e)$/.test(h) ? (c.size.width = n, c.size.height = o) : /^(ne)$/.test(h) ? (c.size.width = n, c.size.height = o, c.position.top = g.top - m) : /^(sw)$/.test(h) ? (c.size.width = n, c.size.height = o, c.position.left = g.left - l) : ((0 >= o - k || 0 >= n - j) && (b = c._getPaddingPlusBorderDimensions(this)), o - k > 0 ? (c.size.height = o, c.position.top = g.top - m) : (o = k - b.height, c.size.height = o, c.position.top = g.top + f.height - o), n - j > 0 ? (c.size.width = n, c.position.left = g.left - l) : (n = j - b.width, c.size.width = n, c.position.left = g.left + f.width - n))
			}
		});
		a.ui.resizable, a.widget("ui.accordion", {
			version: "1.11.4",
			options: {
				active: 0,
				animate: {},
				collapsible: !1,
				event: "click",
				header: "> li > :first-child,> :not(li):even",
				heightStyle: "auto",
				icons: {
					activeHeader: "ui-icon-triangle-1-s",
					header: "ui-icon-triangle-1-e"
				},
				activate: null,
				beforeActivate: null
			},
			hideProps: {
				borderTopWidth: "hide",
				borderBottomWidth: "hide",
				paddingTop: "hide",
				paddingBottom: "hide",
				height: "hide"
			},
			showProps: {
				borderTopWidth: "show",
				borderBottomWidth: "show",
				paddingTop: "show",
				paddingBottom: "show",
				height: "show"
			},
			_create: function() {
				var b = this.options;
				this.prevShow = this.prevHide = a(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), b.collapsible || b.active !== !1 && null != b.active || (b.active = 0), this._processPanels(), b.active < 0 && (b.active += this.headers.length), this._refresh()
			},
			_getCreateEventData: function() {
				return {
					header: this.active,
					panel: this.active.length ? this.active.next() : a()
				}
			},
			_createIcons: function() {
				var b = this.options.icons;
				b && (a("<span>").addClass("ui-accordion-header-icon ui-icon " + b.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(b.header).addClass(b.activeHeader), this.headers.addClass("ui-accordion-icons"))
			},
			_destroyIcons: function() {
				this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
			},
			_destroy: function() {
				var a;
				this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(), this._destroyIcons(), a = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && a.css("height", "")
			},
			_setOption: function(a, b) {
				return "active" === a ? void this._activate(b) : ("event" === a && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(b)), this._super(a, b), "collapsible" !== a || b || this.options.active !== !1 || this._activate(0), "icons" === a && (this._destroyIcons(), b && this._createIcons()), void("disabled" === a && (this.element.toggleClass("ui-state-disabled", !!b).attr("aria-disabled", b), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!b))))
			},
			_keydown: function(b) {
				if (!b.altKey && !b.ctrlKey) {
					var c = a.ui.keyCode,
						d = this.headers.length,
						e = this.headers.index(b.target),
						f = !1;
					switch (b.keyCode) {
						case c.RIGHT:
						case c.DOWN:
							f = this.headers[(e + 1) % d];
							break;
						case c.LEFT:
						case c.UP:
							f = this.headers[(e - 1 + d) % d];
							break;
						case c.SPACE:
						case c.ENTER:
							this._eventHandler(b);
							break;
						case c.HOME:
							f = this.headers[0];
							break;
						case c.END:
							f = this.headers[d - 1]
					}
					f && (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), f.focus(), b.preventDefault())
				}
			},
			_panelKeyDown: function(b) {
				b.keyCode === a.ui.keyCode.UP && b.ctrlKey && a(b.currentTarget).prev().focus()
			},
			refresh: function() {
				var b = this.options;
				this._processPanels(), b.active === !1 && b.collapsible === !0 || !this.headers.length ? (b.active = !1, this.active = a()) : b.active === !1 ? this._activate(0) : this.active.length && !a.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (b.active = !1, this.active = a()) : this._activate(Math.max(0, b.active - 1)) : b.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
			},
			_processPanels: function() {
				var a = this.headers,
					b = this.panels;
				this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"), this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(), b && (this._off(a.not(this.headers)), this._off(b.not(this.panels)))
			},
			_refresh: function() {
				var b, c = this.options,
					d = c.heightStyle,
					e = this.element.parent();
				this.active = this._findActive(c.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function() {
					var b = a(this),
						c = b.uniqueId().attr("id"),
						d = b.next(),
						e = d.uniqueId().attr("id");
					b.attr("aria-controls", e), d.attr("aria-labelledby", c)
				}).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
					"aria-selected": "false",
					"aria-expanded": "false",
					tabIndex: -1
				}).next().attr({
					"aria-hidden": "true"
				}).hide(), this.active.length ? this.active.attr({
					"aria-selected": "true",
					"aria-expanded": "true",
					tabIndex: 0
				}).next().attr({
					"aria-hidden": "false"
				}) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(c.event), "fill" === d ? (b = e.height(), this.element.siblings(":visible").each(function() {
					var c = a(this),
						d = c.css("position");
					"absolute" !== d && "fixed" !== d && (b -= c.outerHeight(!0))
				}), this.headers.each(function() {
					b -= a(this).outerHeight(!0)
				}), this.headers.next().each(function() {
					a(this).height(Math.max(0, b - a(this).innerHeight() + a(this).height()))
				}).css("overflow", "auto")) : "auto" === d && (b = 0, this.headers.next().each(function() {
					b = Math.max(b, a(this).css("height", "").height())
				}).height(b))
			},
			_activate: function(b) {
				var c = this._findActive(b)[0];
				c !== this.active[0] && (c = c || this.active[0], this._eventHandler({
					target: c,
					currentTarget: c,
					preventDefault: a.noop
				}))
			},
			_findActive: function(b) {
				return "number" == typeof b ? this.headers.eq(b) : a()
			},
			_setupEvents: function(b) {
				var c = {
					keydown: "_keydown"
				};
				b && a.each(b.split(" "), function(a, b) {
					c[b] = "_eventHandler"
				}), this._off(this.headers.add(this.headers.next())), this._on(this.headers, c), this._on(this.headers.next(), {
					keydown: "_panelKeyDown"
				}), this._hoverable(this.headers), this._focusable(this.headers)
			},
			_eventHandler: function(b) {
				var c = this.options,
					d = this.active,
					e = a(b.currentTarget),
					f = e[0] === d[0],
					g = f && c.collapsible,
					h = g ? a() : e.next(),
					i = d.next(),
					j = {
						oldHeader: d,
						oldPanel: i,
						newHeader: g ? a() : e,
						newPanel: h
					};
				b.preventDefault(), f && !c.collapsible || this._trigger("beforeActivate", b, j) === !1 || (c.active = g ? !1 : this.headers.index(e), this.active = f ? a() : e, this._toggle(j), d.removeClass("ui-accordion-header-active ui-state-active"), c.icons && d.children(".ui-accordion-header-icon").removeClass(c.icons.activeHeader).addClass(c.icons.header), f || (e.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), c.icons && e.children(".ui-accordion-header-icon").removeClass(c.icons.header).addClass(c.icons.activeHeader), e.next().addClass("ui-accordion-content-active")))
			},
			_toggle: function(b) {
				var c = b.newPanel,
					d = this.prevShow.length ? this.prevShow : b.oldPanel;
				this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = c, this.prevHide = d, this.options.animate ? this._animate(c, d, b) : (d.hide(), c.show(), this._toggleComplete(b)), d.attr({
					"aria-hidden": "true"
				}), d.prev().attr({
					"aria-selected": "false",
					"aria-expanded": "false"
				}), c.length && d.length ? d.prev().attr({
					tabIndex: -1,
					"aria-expanded": "false"
				}) : c.length && this.headers.filter(function() {
					return 0 === parseInt(a(this).attr("tabIndex"), 10)
				}).attr("tabIndex", -1), c.attr("aria-hidden", "false").prev().attr({
					"aria-selected": "true",
					"aria-expanded": "true",
					tabIndex: 0
				})
			},
			_animate: function(a, b, c) {
				var d, e, f, g = this,
					h = 0,
					i = a.css("box-sizing"),
					j = a.length && (!b.length || a.index() < b.index()),
					k = this.options.animate || {},
					l = j && k.down || k,
					m = function() {
						g._toggleComplete(c)
					};
				return "number" == typeof l && (f = l), "string" == typeof l && (e = l), e = e || l.easing || k.easing, f = f || l.duration || k.duration, b.length ? a.length ? (d = a.show().outerHeight(), b.animate(this.hideProps, {
					duration: f,
					easing: e,
					step: function(a, b) {
						b.now = Math.round(a)
					}
				}), void a.hide().animate(this.showProps, {
					duration: f,
					easing: e,
					complete: m,
					step: function(a, c) {
						c.now = Math.round(a), "height" !== c.prop ? "content-box" === i && (h += c.now) : "content" !== g.options.heightStyle && (c.now = Math.round(d - b.outerHeight() - h), h = 0)
					}
				})) : b.animate(this.hideProps, f, e, m) : a.animate(this.showProps, f, e, m)
			},
			_toggleComplete: function(a) {
				var b = a.oldPanel;
				b.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), b.length && (b.parent()[0].className = b.parent()[0].className), this._trigger("activate", null, a)
			}
		})
	}), function(a, b) {
		a.widget("ui.rotatable", a.ui.mouse, {
			options: {
				handle: !1,
				angle: !1,
				start: null,
				rotate: null,
				stop: null
			},
			handle: function(a) {
				return a === b ? this.options.handle : void(this.options.handle = a)
			},
			angle: function(a) {
				return a === b ? this.options.angle : (this.options.angle = a, void this.performRotation(this.options.angle))
			},
			_create: function() {
				var b;
				this.options.handle ? b = this.options.handle : (b = a(document.createElement("div")), b.addClass("ui-rotatable-handle")), this.listeners = {
					rotateElement: a.proxy(this.rotateElement, this),
					startRotate: a.proxy(this.startRotate, this),
					stopRotate: a.proxy(this.stopRotate, this)
				}, b.draggable({
					helper: "clone",
					start: this.dragStart,
					handle: b
				}), b.bind("mousedown", this.listeners.startRotate), b.appendTo(this.element), 0 != this.options.angle ? (this.elementCurrentAngle = this.options.angle, this.performRotation(this.elementCurrentAngle)) : this.elementCurrentAngle = 0
			},
			_destroy: function() {
				this.element.removeClass("ui-rotatable"), this.element.find(".ui-rotatable-handle").remove()
			},
			performRotation: function(a) {
				var b = this.element[0].style["-webkit-transform"];
				a = 180 * a / Math.PI, b.indexOf("rotate") > -1 ? (b = b.replace(/rotateZ\(.+?deg\)/g, "rotateZ(" + a + "deg)"), this.element.css("-webkit-transform", b)) : this.element.css("-webkit-transform", "rotate(" + a + "deg)")
			},
			getElementOffset: function() {
				this.performRotation(0);
				var a = this.element.offset();
				return this.performRotation(this.elementCurrentAngle), a
			},
			getElementCenter: function() {
				var a = this.getElementOffset(),
					b = a.left + this.element.width() / 2,
					c = a.top + this.element.height() / 2;
				return Array(b, c)
			},
			dragStart: function(a) {
				return this.element ? !1 : void 0
			},
			startRotate: function(b) {
				this.elementCurrentAngle = this.element.data("elementCurrentAngle");
				var c = this.getElementCenter(),
					d = b.pageX - c[0],
					e = b.pageY - c[1];
				return this.mouseStartAngle = Math.atan2(e, d), this.elementStartAngle = this.elementCurrentAngle, this.hasRotated = !1, this._propagate("start", b), a(document).bind("mousemove", this.listeners.rotateElement), a(document).bind("mouseup", this.listeners.stopRotate), !1
			},
			rotateElement: function(a) {
				if (!this.element || this.element.disabled) return !1;
				var b = this.getElementCenter(),
					c = a.pageX - b[0],
					d = a.pageY - b[1],
					e = Math.atan2(d, c),
					f = e - this.mouseStartAngle + this.elementStartAngle;
				if (a.shiftKey) {
					var g = 15 / 180 * Math.PI;
					0 > f && (g *= -1), f -= (f + g / 2) % g - g / 2
				}
				this.performRotation(f);
				var h = this.elementCurrentAngle;
				return this.elementCurrentAngle = f, this.element.data("elementCurrentAngle", this.elementCurrentAngle), this._propagate("rotate", a), h != f && (this._trigger("rotate", a, this.ui()), this.hasRotated = !0), !1
			},
			stopRotate: function(b) {
				return this.element && !this.element.disabled ? (a(document).unbind("mousemove", this.listeners.rotateElement), a(document).unbind("mouseup", this.listeners.stopRotate), this.elementStopAngle = this.elementCurrentAngle, this.hasRotated && this._propagate("stop", b), setTimeout(function() {
					this.element = !1
				}, 10), !1) : void 0
			},
			_propagate: function(b, c) {
				a.ui.plugin.call(this, b, [c, this.ui()]), "rotate" !== b && this._trigger(b, c, this.ui())
			},
			plugins: {},
			ui: function() {
				return {
					element: this.element,
					angle: {
						start: this.elementStartAngle,
						current: this.elementCurrentAngle,
						stop: this.elementStopAngle
					}
				}
			}
		})
	}(jQuery), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
	"use strict";
	var b = a.fn.jquery.split(" ")[0].split(".");
	if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function(a) {
	"use strict";

	function b() {
		var a = document.createElement("bootstrap"),
			b = {
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "oTransitionEnd otransitionend",
				transition: "transitionend"
			};
		for (var c in b)
			if (void 0 !== a.style[c]) return {
				end: b[c]
			};
		return !1
	}
	a.fn.emulateTransitionEnd = function(b) {
		var c = !1,
			d = this;
		a(this).one("bsTransitionEnd", function() {
			c = !0
		});
		var e = function() {
			c || a(d).trigger(a.support.transition.end)
		};
		return setTimeout(e, b), this
	}, a(function() {
		a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
			bindType: a.support.transition.end,
			delegateType: a.support.transition.end,
			handle: function(b) {
				return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
			}
		})
	})
}(jQuery), + function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var c = a(this),
				e = c.data("bs.alert");
			e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
		})
	}
	var c = '[data-dismiss="alert"]',
		d = function(b) {
			a(b).on("click", c, this.close)
		};
	d.VERSION = "3.3.4", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
		function c() {
			g.detach().trigger("closed.bs.alert").remove()
		}
		var e = a(this),
			f = e.attr("data-target");
		f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
		var g = a(f);
		b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
	};
	var e = a.fn.alert;
	a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
		return a.fn.alert = e, this
	}, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.button"),
				f = "object" == typeof b && b;
			e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
		})
	}
	var c = function(b, d) {
		this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
	};
	c.VERSION = "3.3.4", c.DEFAULTS = {
		loadingText: "loading..."
	}, c.prototype.setState = function(b) {
		var c = "disabled",
			d = this.$element,
			e = d.is("input") ? "val" : "html",
			f = d.data();
		b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
			d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1,
				d.removeClass(c).removeAttr(c))
		}, this), 0)
	}, c.prototype.toggle = function() {
		var a = !0,
			b = this.$element.closest('[data-toggle="buttons"]');
		if (b.length) {
			var c = this.$element.find("input");
			"radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
		} else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
		a && this.$element.toggleClass("active")
	};
	var d = a.fn.button;
	a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
		return a.fn.button = d, this
	}, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
		var d = a(c.target);
		d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
	}).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
		a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
	})
}(jQuery), + function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.carousel"),
				f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
				g = "string" == typeof b ? b : f.slide;
			e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
		})
	}
	var c = function(b, c) {
		this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
	};
	c.VERSION = "3.3.4", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
		interval: 5e3,
		pause: "hover",
		wrap: !0,
		keyboard: !0
	}, c.prototype.keydown = function(a) {
		if (!/input|textarea/i.test(a.target.tagName)) {
			switch (a.which) {
				case 37:
					this.prev();
					break;
				case 39:
					this.next();
					break;
				default:
					return
			}
			a.preventDefault()
		}
	}, c.prototype.cycle = function(b) {
		return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
	}, c.prototype.getItemIndex = function(a) {
		return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
	}, c.prototype.getItemForDirection = function(a, b) {
		var c = this.getItemIndex(b),
			d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
		if (d && !this.options.wrap) return b;
		var e = "prev" == a ? -1 : 1,
			f = (c + e) % this.$items.length;
		return this.$items.eq(f)
	}, c.prototype.to = function(a) {
		var b = this,
			c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
		return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
			b.to(a)
		}) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
	}, c.prototype.pause = function(b) {
		return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
	}, c.prototype.next = function() {
		return this.sliding ? void 0 : this.slide("next")
	}, c.prototype.prev = function() {
		return this.sliding ? void 0 : this.slide("prev")
	}, c.prototype.slide = function(b, d) {
		var e = this.$element.find(".item.active"),
			f = d || this.getItemForDirection(b, e),
			g = this.interval,
			h = "next" == b ? "left" : "right",
			i = this;
		if (f.hasClass("active")) return this.sliding = !1;
		var j = f[0],
			k = a.Event("slide.bs.carousel", {
				relatedTarget: j,
				direction: h
			});
		if (this.$element.trigger(k), !k.isDefaultPrevented()) {
			if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
				this.$indicators.find(".active").removeClass("active");
				var l = a(this.$indicators.children()[this.getItemIndex(f)]);
				l && l.addClass("active")
			}
			var m = a.Event("slid.bs.carousel", {
				relatedTarget: j,
				direction: h
			});
			return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
				f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
					i.$element.trigger(m)
				}, 0)
			}).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
		}
	};
	var d = a.fn.carousel;
	a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
		return a.fn.carousel = d, this
	};
	var e = function(c) {
		var d, e = a(this),
			f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
		if (f.hasClass("carousel")) {
			var g = a.extend({}, f.data(), e.data()),
				h = e.attr("data-slide-to");
			h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
		}
	};
	a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
		a('[data-ride="carousel"]').each(function() {
			var c = a(this);
			b.call(c, c.data())
		})
	})
}(jQuery), + function(a) {
	"use strict";

	function b(b) {
		var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
		return a(d)
	}

	function c(b) {
		return this.each(function() {
			var c = a(this),
				e = c.data("bs.collapse"),
				f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
			!e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
		})
	}
	var d = function(b, c) {
		this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
	};
	d.VERSION = "3.3.4", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
		toggle: !0
	}, d.prototype.dimension = function() {
		var a = this.$element.hasClass("width");
		return a ? "width" : "height"
	}, d.prototype.show = function() {
		if (!this.transitioning && !this.$element.hasClass("in")) {
			var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
			if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
				var f = a.Event("show.bs.collapse");
				if (this.$element.trigger(f), !f.isDefaultPrevented()) {
					e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
					var g = this.dimension();
					this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
					var h = function() {
						this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
					};
					if (!a.support.transition) return h.call(this);
					var i = a.camelCase(["scroll", g].join("-"));
					this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
				}
			}
		}
	}, d.prototype.hide = function() {
		if (!this.transitioning && this.$element.hasClass("in")) {
			var b = a.Event("hide.bs.collapse");
			if (this.$element.trigger(b), !b.isDefaultPrevented()) {
				var c = this.dimension();
				this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
				var e = function() {
					this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
				};
				return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
			}
		}
	}, d.prototype.toggle = function() {
		this[this.$element.hasClass("in") ? "hide" : "show"]()
	}, d.prototype.getParent = function() {
		return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
			var e = a(d);
			this.addAriaAndCollapsedClass(b(e), e)
		}, this)).end()
	}, d.prototype.addAriaAndCollapsedClass = function(a, b) {
		var c = a.hasClass("in");
		a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
	};
	var e = a.fn.collapse;
	a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
		return a.fn.collapse = e, this
	}, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
		var e = a(this);
		e.attr("data-target") || d.preventDefault();
		var f = b(e),
			g = f.data("bs.collapse"),
			h = g ? "toggle" : e.data();
		c.call(f, h)
	})
}(jQuery), + function(a) {
	"use strict";

	function b(b) {
		b && 3 === b.which || (a(e).remove(), a(f).each(function() {
			var d = a(this),
				e = c(d),
				f = {
					relatedTarget: this
				};
			e.hasClass("open") && (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f)))
		}))
	}

	function c(b) {
		var c = b.attr("data-target");
		c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
		var d = c && a(c);
		return d && d.length ? d : b.parent()
	}

	function d(b) {
		return this.each(function() {
			var c = a(this),
				d = c.data("bs.dropdown");
			d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
		})
	}
	var e = ".dropdown-backdrop",
		f = '[data-toggle="dropdown"]',
		g = function(b) {
			a(b).on("click.bs.dropdown", this.toggle)
		};
	g.VERSION = "3.3.4", g.prototype.toggle = function(d) {
		var e = a(this);
		if (!e.is(".disabled, :disabled")) {
			var f = c(e),
				g = f.hasClass("open");
			if (b(), !g) {
				"ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
				var h = {
					relatedTarget: this
				};
				if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
				e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
			}
			return !1
		}
	}, g.prototype.keydown = function(b) {
		if (/(38|40|27|32)/.test(b.which) && !/input|textarea/i.test(b.target.tagName)) {
			var d = a(this);
			if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
				var e = c(d),
					g = e.hasClass("open");
				if (!g && 27 != b.which || g && 27 == b.which) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
				var h = " li:not(.disabled):visible a",
					i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
				if (i.length) {
					var j = i.index(b.target);
					38 == b.which && j > 0 && j--, 40 == b.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
				}
			}
		}
	};
	var h = a.fn.dropdown;
	a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
		return a.fn.dropdown = h, this
	}, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
		a.stopPropagation()
	}).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', g.prototype.keydown)
}(jQuery), + function(a) {
	"use strict";

	function b(b, d) {
		return this.each(function() {
			var e = a(this),
				f = e.data("bs.modal"),
				g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
			f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
		})
	}
	var c = function(b, c) {
		this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
			this.$element.trigger("loaded.bs.modal")
		}, this))
	};
	c.VERSION = "3.3.4", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
		backdrop: !0,
		keyboard: !0,
		show: !0
	}, c.prototype.toggle = function(a) {
		return this.isShown ? this.hide() : this.show(a)
	}, c.prototype.show = function(b) {
		var d = this,
			e = a.Event("show.bs.modal", {
				relatedTarget: b
			});
		this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
			d.$element.one("mouseup.dismiss.bs.modal", function(b) {
				a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
			})
		}), this.backdrop(function() {
			var e = a.support.transition && d.$element.hasClass("fade");
			d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in").attr("aria-hidden", !1), d.enforceFocus();
			var f = a.Event("shown.bs.modal", {
				relatedTarget: b
			});
			e ? d.$dialog.one("bsTransitionEnd", function() {
				d.$element.trigger("focus").trigger(f)
			}).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
		}))
	}, c.prototype.hide = function(b) {
		b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
	}, c.prototype.enforceFocus = function() {
		a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
			this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
		}, this))
	}, c.prototype.escape = function() {
		this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
			27 == a.which && this.hide()
		}, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
	}, c.prototype.resize = function() {
		this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
	}, c.prototype.hideModal = function() {
		var a = this;
		this.$element.hide(), this.backdrop(function() {
			a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
		})
	}, c.prototype.removeBackdrop = function() {
		this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
	}, c.prototype.backdrop = function(b) {
		var d = this,
			e = this.$element.hasClass("fade") ? "fade" : "";
		if (this.isShown && this.options.backdrop) {
			var f = a.support.transition && e;
			if (this.$backdrop = a('<div class="modal-backdrop ' + e + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
					return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
				}, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
			f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
		} else if (!this.isShown && this.$backdrop) {
			this.$backdrop.removeClass("in");
			var g = function() {
				d.removeBackdrop(), b && b()
			};
			a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
		} else b && b()
	}, c.prototype.handleUpdate = function() {
		this.adjustDialog()
	}, c.prototype.adjustDialog = function() {
		var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
		this.$element.css({
			paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
			paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
		})
	}, c.prototype.resetAdjustments = function() {
		this.$element.css({
			paddingLeft: "",
			paddingRight: ""
		})
	}, c.prototype.checkScrollbar = function() {
		var a = window.innerWidth;
		if (!a) {
			var b = document.documentElement.getBoundingClientRect();
			a = b.right - Math.abs(b.left)
		}
		this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
	}, c.prototype.setScrollbar = function() {
		var a = parseInt(this.$body.css("padding-right") || 0, 10);
		this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
	}, c.prototype.resetScrollbar = function() {
		this.$body.css("padding-right", this.originalBodyPad)
	}, c.prototype.measureScrollbar = function() {
		var a = document.createElement("div");
		a.className = "modal-scrollbar-measure", this.$body.append(a);
		var b = a.offsetWidth - a.clientWidth;
		return this.$body[0].removeChild(a), b
	};
	var d = a.fn.modal;
	a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
		return a.fn.modal = d, this
	}, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
		var d = a(this),
			e = d.attr("href"),
			f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
			g = f.data("bs.modal") ? "toggle" : a.extend({
				remote: !/#/.test(e) && e
			}, f.data(), d.data());
		d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
			a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
				d.is(":visible") && d.trigger("focus")
			})
		}), b.call(f, g, this)
	})
}(jQuery), + function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.tooltip"),
				f = "object" == typeof b && b;
			(e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
		})
	}
	var c = function(a, b) {
		this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", a, b)
	};
	c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
		animation: !0,
		placement: "top",
		selector: !1,
		template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger: "hover focus",
		title: "",
		delay: 0,
		html: !1,
		container: !1,
		viewport: {
			selector: "body",
			padding: 0
		}
	}, c.prototype.init = function(b, c, d) {
		if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
		for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
			var g = e[f];
			if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
			else if ("manual" != g) {
				var h = "hover" == g ? "mouseenter" : "focusin",
					i = "hover" == g ? "mouseleave" : "focusout";
				this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
			}
		}
		this.options.selector ? this._options = a.extend({}, this.options, {
			trigger: "manual",
			selector: ""
		}) : this.fixTitle()
	}, c.prototype.getDefaults = function() {
		return c.DEFAULTS
	}, c.prototype.getOptions = function(b) {
		return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
			show: b.delay,
			hide: b.delay
		}), b
	}, c.prototype.getDelegateOptions = function() {
		var b = {},
			c = this.getDefaults();
		return this._options && a.each(this._options, function(a, d) {
			c[a] != d && (b[a] = d)
		}), b
	}, c.prototype.enter = function(b) {
		var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
		return c && c.$tip && c.$tip.is(":visible") ? void(c.hoverState = "in") : (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
			"in" == c.hoverState && c.show()
		}, c.options.delay.show)) : c.show())
	}, c.prototype.leave = function(b) {
		var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
		return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
			"out" == c.hoverState && c.hide()
		}, c.options.delay.hide)) : c.hide()
	}, c.prototype.show = function() {
		var b = a.Event("show.bs." + this.type);
		if (this.hasContent() && this.enabled) {
			this.$element.trigger(b);
			var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
			if (b.isDefaultPrevented() || !d) return;
			var e = this,
				f = this.tip(),
				g = this.getUID(this.type);
			this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
			var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
				i = /\s?auto?\s?/i,
				j = i.test(h);
			j && (h = h.replace(i, "") || "top"), f.detach().css({
				top: 0,
				left: 0,
				display: "block"
			}).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element);
			var k = this.getPosition(),
				l = f[0].offsetWidth,
				m = f[0].offsetHeight;
			if (j) {
				var n = h,
					o = this.options.container ? a(this.options.container) : this.$element.parent(),
					p = this.getPosition(o);
				h = "bottom" == h && k.bottom + m > p.bottom ? "top" : "top" == h && k.top - m < p.top ? "bottom" : "right" == h && k.right + l > p.width ? "left" : "left" == h && k.left - l < p.left ? "right" : h, f.removeClass(n).addClass(h)
			}
			var q = this.getCalculatedOffset(h, k, l, m);
			this.applyPlacement(q, h);
			var r = function() {
				var a = e.hoverState;
				e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
			};
			a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", r).emulateTransitionEnd(c.TRANSITION_DURATION) : r()
		}
	}, c.prototype.applyPlacement = function(b, c) {
		var d = this.tip(),
			e = d[0].offsetWidth,
			f = d[0].offsetHeight,
			g = parseInt(d.css("margin-top"), 10),
			h = parseInt(d.css("margin-left"), 10);
		isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
			using: function(a) {
				d.css({
					top: Math.round(a.top),
					left: Math.round(a.left)
				})
			}
		}, b), 0), d.addClass("in");
		var i = d[0].offsetWidth,
			j = d[0].offsetHeight;
		"top" == c && j != f && (b.top = b.top + f - j);
		var k = this.getViewportAdjustedDelta(c, b, i, j);
		k.left ? b.left += k.left : b.top += k.top;
		var l = /top|bottom/.test(c),
			m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
			n = l ? "offsetWidth" : "offsetHeight";
		d.offset(b), this.replaceArrow(m, d[0][n], l)
	}, c.prototype.replaceArrow = function(a, b, c) {
		this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
	}, c.prototype.setContent = function() {
		var a = this.tip(),
			b = this.getTitle();
		a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
	}, c.prototype.hide = function(b) {
		function d() {
			"in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
		}
		var e = this,
			f = a(this.$tip),
			g = a.Event("hide.bs." + this.type);
		return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
	}, c.prototype.fixTitle = function() {
		var a = this.$element;
		(a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
	}, c.prototype.hasContent = function() {
		return this.getTitle()
	}, c.prototype.getPosition = function(b) {
		b = b || this.$element;
		var c = b[0],
			d = "BODY" == c.tagName,
			e = c.getBoundingClientRect();
		null == e.width && (e = a.extend({}, e, {
			width: e.right - e.left,
			height: e.bottom - e.top
		}));
		var f = d ? {
				top: 0,
				left: 0
			} : b.offset(),
			g = {
				scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
			},
			h = d ? {
				width: a(window).width(),
				height: a(window).height()
			} : null;
		return a.extend({}, e, g, h, f)
	}, c.prototype.getCalculatedOffset = function(a, b, c, d) {
		return "bottom" == a ? {
			top: b.top + b.height,
			left: b.left + b.width / 2 - c / 2
		} : "top" == a ? {
			top: b.top - d,
			left: b.left + b.width / 2 - c / 2
		} : "left" == a ? {
			top: b.top + b.height / 2 - d / 2,
			left: b.left - c
		} : {
			top: b.top + b.height / 2 - d / 2,
			left: b.left + b.width
		}
	}, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
		var e = {
			top: 0,
			left: 0
		};
		if (!this.$viewport) return e;
		var f = this.options.viewport && this.options.viewport.padding || 0,
			g = this.getPosition(this.$viewport);
		if (/right|left/.test(a)) {
			var h = b.top - f - g.scroll,
				i = b.top + f - g.scroll + d;
			h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
		} else {
			var j = b.left - f,
				k = b.left + f + c;
			j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
		}
		return e
	}, c.prototype.getTitle = function() {
		var a, b = this.$element,
			c = this.options;
		return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
	}, c.prototype.getUID = function(a) {
		do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
		return a
	}, c.prototype.tip = function() {
		return this.$tip = this.$tip || a(this.options.template)
	}, c.prototype.arrow = function() {
		return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
	}, c.prototype.enable = function() {
		this.enabled = !0
	}, c.prototype.disable = function() {
		this.enabled = !1
	}, c.prototype.toggleEnabled = function() {
		this.enabled = !this.enabled
	}, c.prototype.toggle = function(b) {
		var c = this;
		b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
	}, c.prototype.destroy = function() {
		var a = this;
		clearTimeout(this.timeout), this.hide(function() {
			a.$element.off("." + a.type).removeData("bs." + a.type)
		})
	};
	var d = a.fn.tooltip;
	a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
		return a.fn.tooltip = d, this
	}
}(jQuery), + function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.popover"),
				f = "object" == typeof b && b;
			(e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
		})
	}
	var c = function(a, b) {
		this.init("popover", a, b)
	};
	if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
	c.VERSION = "3.3.4", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
		placement: "right",
		trigger: "click",
		content: "",
		template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	}), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
		return c.DEFAULTS
	}, c.prototype.setContent = function() {
		var a = this.tip(),
			b = this.getTitle(),
			c = this.getContent();
		a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
	}, c.prototype.hasContent = function() {
		return this.getTitle() || this.getContent()
	}, c.prototype.getContent = function() {
		var a = this.$element,
			b = this.options;
		return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
	}, c.prototype.arrow = function() {
		return this.$arrow = this.$arrow || this.tip().find(".arrow")
	};
	var d = a.fn.popover;
	a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
		return a.fn.popover = d, this
	}
}(jQuery), + function(a) {
	"use strict";

	function b(c, d) {
		this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
	}

	function c(c) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.scrollspy"),
				f = "object" == typeof c && c;
			e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
		})
	}
	b.VERSION = "3.3.4", b.DEFAULTS = {
		offset: 10
	}, b.prototype.getScrollHeight = function() {
		return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	}, b.prototype.refresh = function() {
		var b = this,
			c = "offset",
			d = 0;
		this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
			var b = a(this),
				e = b.data("target") || b.attr("href"),
				f = /^#./.test(e) && a(e);
			return f && f.length && f.is(":visible") && [
				[f[c]().top + d, e]
			] || null
		}).sort(function(a, b) {
			return a[0] - b[0]
		}).each(function() {
			b.offsets.push(this[0]), b.targets.push(this[1])
		})
	}, b.prototype.process = function() {
		var a, b = this.$scrollElement.scrollTop() + this.options.offset,
			c = this.getScrollHeight(),
			d = this.options.offset + c - this.$scrollElement.height(),
			e = this.offsets,
			f = this.targets,
			g = this.activeTarget;
		if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
		if (g && b < e[0]) return this.activeTarget = null, this.clear();
		for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
	}, b.prototype.activate = function(b) {
		this.activeTarget = b, this.clear();
		var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
			d = a(c).parents("li").addClass("active");
		d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
	}, b.prototype.clear = function() {
		a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
	};
	var d = a.fn.scrollspy;
	a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
		return a.fn.scrollspy = d, this
	}, a(window).on("load.bs.scrollspy.data-api", function() {
		a('[data-spy="scroll"]').each(function() {
			var b = a(this);
			c.call(b, b.data())
		})
	})
}(jQuery), + function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.tab");
			e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
		})
	}
	var c = function(b) {
		this.element = a(b)
	};
	c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
		var b = this.element,
			c = b.closest("ul:not(.dropdown-menu)"),
			d = b.data("target");
		if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
			var e = c.find(".active:last a"),
				f = a.Event("hide.bs.tab", {
					relatedTarget: b[0]
				}),
				g = a.Event("show.bs.tab", {
					relatedTarget: e[0]
				});
			if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
				var h = a(d);
				this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
					e.trigger({
						type: "hidden.bs.tab",
						relatedTarget: b[0]
					}), b.trigger({
						type: "shown.bs.tab",
						relatedTarget: e[0]
					})
				})
			}
		}
	}, c.prototype.activate = function(b, d, e) {
		function f() {
			g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
		}
		var g = d.find("> .active"),
			h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
		g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
	};
	var d = a.fn.tab;
	a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
		return a.fn.tab = d, this
	};
	var e = function(c) {
		c.preventDefault(), b.call(a(this), "show")
	};
	a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function(a) {
	"use strict";

	function b(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.affix"),
				f = "object" == typeof b && b;
			e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
		})
	}
	var c = function(b, d) {
		this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
	};
	c.VERSION = "3.3.4", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
		offset: 0,
		target: window
	}, c.prototype.getState = function(a, b, c, d) {
		var e = this.$target.scrollTop(),
			f = this.$element.offset(),
			g = this.$target.height();
		if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
		if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
		var h = null == this.affixed,
			i = h ? e : f.top,
			j = h ? g : b;
		return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
	}, c.prototype.getPinnedOffset = function() {
		if (this.pinnedOffset) return this.pinnedOffset;
		this.$element.removeClass(c.RESET).addClass("affix");
		var a = this.$target.scrollTop(),
			b = this.$element.offset();
		return this.pinnedOffset = b.top - a
	}, c.prototype.checkPositionWithEventLoop = function() {
		setTimeout(a.proxy(this.checkPosition, this), 1);
	}, c.prototype.checkPosition = function() {
		if (this.$element.is(":visible")) {
			var b = this.$element.height(),
				d = this.options.offset,
				e = d.top,
				f = d.bottom,
				g = a(document.body).height();
			"object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
			var h = this.getState(g, b, e, f);
			if (this.affixed != h) {
				null != this.unpin && this.$element.css("top", "");
				var i = "affix" + (h ? "-" + h : ""),
					j = a.Event(i + ".bs.affix");
				if (this.$element.trigger(j), j.isDefaultPrevented()) return;
				this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
			}
			"bottom" == h && this.$element.offset({
				top: g - b - f
			})
		}
	};
	var d = a.fn.affix;
	a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
		return a.fn.affix = d, this
	}, a(window).on("load", function() {
		a('[data-spy="affix"]').each(function() {
			var c = a(this),
				d = c.data();
			d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
		})
	})
}(jQuery),
function() {
	function a(a) {
		var b = a.split(/\n/);
		b.shift(), b.splice(-1, 1);
		var c = b[0].length - b[0].trim().length,
			d = new RegExp(" {" + c + "}");
		return b = b.map(function(a) {
			return a.match(d) && (a = a.substring(c)), a
		}), b = b.join("\n")
	}
	$(window).scroll(function() {
		var a = $(document).scrollTop();
		$(".splash").css({
			"background-position": "0px -" + (a / 3).toFixed(2) + "px"
		}), a > 50 ? $("#home > .navbar").removeClass("navbar-transparent") : $("#home > .navbar").addClass("navbar-transparent")
	}), $("a[href='#']").click(function(a) {
		a.preventDefault()
	});
	var b = $("<div id='source-button' class='btn btn-primary btn-xs'>&lt; &gt;</div>").click(function() {
		var b = $(this).parent().html();
		b = a(b), $("#source-modal pre").text(b), $("#source-modal").modal()
	});
	$('.bs-component [data-toggle="popover"]').popover(), $('.bs-component [data-toggle="tooltip"]').tooltip(), $(".bs-component").hover(function() {
		$(this).append(b), b.show()
	}, function() {
		b.hide()
	})
}(),
function(a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a, b) {
	function c(a) {
		function b(a) {
			d ? (c(), M(b), e = !0, d = !1) : e = !1
		}
		var c = a,
			d = !1,
			e = !1;
		this.kick = function(a) {
			d = !0, e || b()
		}, this.end = function(a) {
			var b = c;
			a && (e ? (c = d ? function() {
				b(), a()
			} : a, d = !0) : a())
		}
	}

	function d() {
		return !0
	}

	function e() {
		return !1
	}

	function f(a) {
		a.preventDefault()
	}

	function g(a) {
		N[a.target.tagName.toLowerCase()] || a.preventDefault()
	}

	function h(a) {
		return 1 === a.which && !a.ctrlKey && !a.altKey
	}

	function i(a, b) {
		var c, d;
		if (a.identifiedTouch) return a.identifiedTouch(b);
		for (c = -1, d = a.length; ++c < d;)
			if (a[c].identifier === b) return a[c]
	}

	function j(a, b) {
		var c = i(a.changedTouches, b.identifier);
		if (c && (c.pageX !== b.pageX || c.pageY !== b.pageY)) return c
	}

	function k(a) {
		var b;
		h(a) && (b = {
			target: a.target,
			startX: a.pageX,
			startY: a.pageY,
			timeStamp: a.timeStamp
		}, J(document, O.move, l, b), J(document, O.cancel, m, b))
	}

	function l(a) {
		var b = a.data;
		s(a, b, a, n)
	}

	function m(a) {
		n()
	}

	function n() {
		K(document, O.move, l), K(document, O.cancel, m)
	}

	function o(a) {
		var b, c;
		N[a.target.tagName.toLowerCase()] || (b = a.changedTouches[0], c = {
			target: b.target,
			startX: b.pageX,
			startY: b.pageY,
			timeStamp: a.timeStamp,
			identifier: b.identifier
		}, J(document, P.move + "." + b.identifier, p, c), J(document, P.cancel + "." + b.identifier, q, c))
	}

	function p(a) {
		var b = a.data,
			c = j(a, b);
		c && s(a, b, c, r)
	}

	function q(a) {
		var b = a.data,
			c = i(a.changedTouches, b.identifier);
		c && r(b.identifier)
	}

	function r(a) {
		K(document, "." + a, p), K(document, "." + a, q)
	}

	function s(a, b, c, d) {
		var e = c.pageX - b.startX,
			f = c.pageY - b.startY;
		I * I > e * e + f * f || v(a, b, c, e, f, d)
	}

	function t() {
		return this._handled = d, !1
	}

	function u(a) {
		a._handled()
	}

	function v(a, b, c, d, e, f) {
		var g, h;
		b.target;
		g = a.targetTouches, h = a.timeStamp - b.timeStamp, b.type = "movestart", b.distX = d, b.distY = e, b.deltaX = d, b.deltaY = e, b.pageX = c.pageX, b.pageY = c.pageY, b.velocityX = d / h, b.velocityY = e / h, b.targetTouches = g, b.finger = g ? g.length : 1, b._handled = t, b._preventTouchmoveDefault = function() {
			a.preventDefault()
		}, L(b.target, b), f(b.identifier)
	}

	function w(a) {
		var b = a.data.timer;
		a.data.touch = a, a.data.timeStamp = a.timeStamp, b.kick()
	}

	function x(a) {
		var b = a.data.event,
			c = a.data.timer;
		y(), D(b, c, function() {
			setTimeout(function() {
				K(b.target, "click", e)
			}, 0)
		})
	}

	function y(a) {
		K(document, O.move, w), K(document, O.end, x)
	}

	function z(a) {
		var b = a.data.event,
			c = a.data.timer,
			d = j(a, b);
		d && (a.preventDefault(), b.targetTouches = a.targetTouches, a.data.touch = d, a.data.timeStamp = a.timeStamp, c.kick())
	}

	function A(a) {
		var b = a.data.event,
			c = a.data.timer,
			d = i(a.changedTouches, b.identifier);
		d && (B(b), D(b, c))
	}

	function B(a) {
		K(document, "." + a.identifier, z), K(document, "." + a.identifier, A)
	}

	function C(a, b, c, d) {
		var e = c - a.timeStamp;
		a.type = "move", a.distX = b.pageX - a.startX, a.distY = b.pageY - a.startY, a.deltaX = b.pageX - a.pageX, a.deltaY = b.pageY - a.pageY, a.velocityX = .3 * a.velocityX + .7 * a.deltaX / e, a.velocityY = .3 * a.velocityY + .7 * a.deltaY / e, a.pageX = b.pageX, a.pageY = b.pageY
	}

	function D(a, b, c) {
		b.end(function() {
			return a.type = "moveend", L(a.target, a), c && c()
		})
	}

	function E(a, b, c) {
		return J(this, "movestart.move", u), !0
	}

	function F(a) {
		return K(this, "dragstart drag", f), K(this, "mousedown touchstart", g), K(this, "movestart", u), !0
	}

	function G(a) {
		"move" !== a.namespace && "moveend" !== a.namespace && (J(this, "dragstart." + a.guid + " drag." + a.guid, f, b, a.selector), J(this, "mousedown." + a.guid, g, b, a.selector))
	}

	function H(a) {
		"move" !== a.namespace && "moveend" !== a.namespace && (K(this, "dragstart." + a.guid + " drag." + a.guid), K(this, "mousedown." + a.guid))
	}
	var I = 6,
		J = a.event.add,
		K = a.event.remove,
		L = function(b, c, d) {
			a.event.trigger(c, d, b)
		},
		M = function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a, b) {
				return window.setTimeout(function() {
					a()
				}, 25)
			}
		}(),
		N = {
			textarea: !0,
			input: !0,
			select: !0,
			button: !0
		},
		O = {
			move: "mousemove",
			cancel: "mouseup dragstart",
			end: "mouseup"
		},
		P = {
			move: "touchmove",
			cancel: "touchend",
			end: "touchend"
		};
	a.event.special.movestart = {
		setup: E,
		teardown: F,
		add: G,
		remove: H,
		_default: function(a) {
			function d(b) {
				C(f, g.touch, g.timeStamp), L(a.target, f)
			}
			var f, g;
			a._handled() && (f = {
				target: a.target,
				startX: a.startX,
				startY: a.startY,
				pageX: a.pageX,
				pageY: a.pageY,
				distX: a.distX,
				distY: a.distY,
				deltaX: a.deltaX,
				deltaY: a.deltaY,
				velocityX: a.velocityX,
				velocityY: a.velocityY,
				timeStamp: a.timeStamp,
				identifier: a.identifier,
				targetTouches: a.targetTouches,
				finger: a.finger
			}, g = {
				event: f,
				timer: new c(d),
				touch: b,
				timeStamp: b
			}, a.identifier === b ? (J(a.target, "click", e), J(document, O.move, w, g), J(document, O.end, x, g)) : (a._preventTouchmoveDefault(), J(document, P.move + "." + a.identifier, z, g), J(document, P.end + "." + a.identifier, A, g)))
		}
	}, a.event.special.move = {
		setup: function() {
			J(this, "movestart.move", a.noop)
		},
		teardown: function() {
			K(this, "movestart.move", a.noop)
		}
	}, a.event.special.moveend = {
		setup: function() {
			J(this, "movestart.moveend", a.noop)
		},
		teardown: function() {
			K(this, "movestart.moveend", a.noop)
		}
	}, J(document, "mousedown.move", k), J(document, "touchstart.move", o), "function" == typeof Array.prototype.indexOf && ! function(a, b) {
		for (var c = ["changedTouches", "targetTouches"], d = c.length; d--;) - 1 === a.event.props.indexOf(c[d]) && a.event.props.push(c[d])
	}(a)
}),
function(a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a, b) {
	function c(a) {
		var b, c, d;
		b = a.target.offsetWidth, c = a.target.offsetHeight, d = {
			distX: a.distX,
			distY: a.distY,
			velocityX: a.velocityX,
			velocityY: a.velocityY,
			finger: a.finger
		}, a.distX > a.distY ? a.distX > -a.distY ? (a.distX / b > h.threshold || a.velocityX * a.distX / b * h.sensitivity > 1) && (d.type = "swipeRight", g(a.currentTarget, d)) : (-a.distY / c > h.threshold || a.velocityY * a.distY / b * h.sensitivity > 1) && (d.type = "swipeUp", g(a.currentTarget, d)) : a.distX > -a.distY ? (a.distY / c > h.threshold || a.velocityY * a.distY / b * h.sensitivity > 1) && (d.type = "swipeDown", g(a.currentTarget, d)) : (-a.distX / b > h.threshold || a.velocityX * a.distX / b * h.sensitivity > 1) && (d.type = "swipeLeft", g(a.currentTarget, d))
	}

	function d(b) {
		var c = a.data(b, "event_swipe");
		return c || (c = {
			count: 0
		}, a.data(b, "event_swipe", c)), c
	}
	var e = a.event.add,
		f = a.event.remove,
		g = function(b, c, d) {
			a.event.trigger(c, d, b)
		},
		h = {
			threshold: .4,
			sensitivity: 6
		};
	a.event.special.swipe = a.event.special.swipeLeft = a.event.special.swipeRight = a.event.special.swipeUp = a.event.special.swipeDown = {
		setup: function(a, b, f) {
			var a = d(this);
			if (!(a.count++ > 0)) return e(this, "moveend", c), !0
		},
		teardown: function() {
			var a = d(this);
			if (!(--a.count > 0)) return f(this, "moveend", c), !0
		},
		settings: h
	}
});