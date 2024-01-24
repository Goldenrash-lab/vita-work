"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [196],
  {
    3148: function (t, e, i) {
      i.d(e, {
        De: function () {
          return ev;
        },
        Dx: function () {
          return eM;
        },
        Gu: function () {
          return ef;
        },
        ST: function () {
          return L;
        },
        f$: function () {
          return eH;
        },
        jn: function () {
          return t4;
        },
        kL: function () {
          return tX;
        },
        od: function () {
          return t8;
        },
        u: function () {
          return eF;
        },
        uw: function () {
          return eV;
        },
      });
      var s = i(9676),
        a = new /*!
         * Chart.js v4.3.0
         * https://www.chartjs.org
         * (c) 2023 Chart.js Contributors
         * Released under the MIT License
         */ (class {
          constructor() {
            (this._request = null),
              (this._charts = new Map()),
              (this._running = !1),
              (this._lastDate = void 0);
          }
          _notify(t, e, i, s) {
            let a = e.listeners[s],
              n = e.duration;
            a.forEach((s) =>
              s({
                chart: t,
                initial: e.initial,
                numSteps: n,
                currentStep: Math.min(i - e.start, n),
              })
            );
          }
          _refresh() {
            this._request ||
              ((this._running = !0),
              (this._request = s.r.call(window, () => {
                this._update(),
                  (this._request = null),
                  this._running && this._refresh();
              })));
          }
          _update(t = Date.now()) {
            let e = 0;
            this._charts.forEach((i, s) => {
              let a;
              if (!i.running || !i.items.length) return;
              let n = i.items,
                r = n.length - 1,
                o = !1;
              for (; r >= 0; --r)
                (a = n[r])._active
                  ? (a._total > i.duration && (i.duration = a._total),
                    a.tick(t),
                    (o = !0))
                  : ((n[r] = n[n.length - 1]), n.pop());
              o && (s.draw(), this._notify(s, i, t, "progress")),
                n.length ||
                  ((i.running = !1),
                  this._notify(s, i, t, "complete"),
                  (i.initial = !1)),
                (e += n.length);
            }),
              (this._lastDate = t),
              0 === e && (this._running = !1);
          }
          _getAnims(t) {
            let e = this._charts,
              i = e.get(t);
            return (
              i ||
                ((i = {
                  running: !1,
                  initial: !0,
                  items: [],
                  listeners: { complete: [], progress: [] },
                }),
                e.set(t, i)),
              i
            );
          }
          listen(t, e, i) {
            this._getAnims(t).listeners[e].push(i);
          }
          add(t, e) {
            e && e.length && this._getAnims(t).items.push(...e);
          }
          has(t) {
            return this._getAnims(t).items.length > 0;
          }
          start(t) {
            let e = this._charts.get(t);
            e &&
              ((e.running = !0),
              (e.start = Date.now()),
              (e.duration = e.items.reduce(
                (t, e) => Math.max(t, e._duration),
                0
              )),
              this._refresh());
          }
          running(t) {
            if (!this._running) return !1;
            let e = this._charts.get(t);
            return !!e && !!e.running && !!e.items.length;
          }
          stop(t) {
            let e = this._charts.get(t);
            if (!e || !e.items.length) return;
            let i = e.items,
              s = i.length - 1;
            for (; s >= 0; --s) i[s].cancel();
            (e.items = []), this._notify(t, e, Date.now(), "complete");
          }
          remove(t) {
            return this._charts.delete(t);
          }
        })();
      let n = "transparent",
        r = {
          boolean: (t, e, i) => (i > 0.5 ? e : t),
          color(t, e, i) {
            let a = (0, s.c)(t || n),
              r = a.valid && (0, s.c)(e || n);
            return r && r.valid ? r.mix(a, i).hexString() : e;
          },
          number: (t, e, i) => t + (e - t) * i,
        };
      class o {
        constructor(t, e, i, a) {
          let n = e[i];
          a = (0, s.a)([t.to, a, n, t.from]);
          let o = (0, s.a)([t.from, n, a]);
          (this._active = !0),
            (this._fn = t.fn || r[t.type || typeof o]),
            (this._easing = s.e[t.easing] || s.e.linear),
            (this._start = Math.floor(Date.now() + (t.delay || 0))),
            (this._duration = this._total = Math.floor(t.duration)),
            (this._loop = !!t.loop),
            (this._target = e),
            (this._prop = i),
            (this._from = o),
            (this._to = a),
            (this._promises = void 0);
        }
        active() {
          return this._active;
        }
        update(t, e, i) {
          if (this._active) {
            this._notify(!1);
            let a = this._target[this._prop],
              n = i - this._start,
              r = this._duration - n;
            (this._start = i),
              (this._duration = Math.floor(Math.max(r, t.duration))),
              (this._total += n),
              (this._loop = !!t.loop),
              (this._to = (0, s.a)([t.to, e, a, t.from])),
              (this._from = (0, s.a)([t.from, a, e]));
          }
        }
        cancel() {
          this._active &&
            (this.tick(Date.now()), (this._active = !1), this._notify(!1));
        }
        tick(t) {
          let e;
          let i = t - this._start,
            s = this._duration,
            a = this._prop,
            n = this._from,
            r = this._loop,
            o = this._to;
          if (((this._active = n !== o && (r || i < s)), !this._active)) {
            (this._target[a] = o), this._notify(!0);
            return;
          }
          if (i < 0) {
            this._target[a] = n;
            return;
          }
          (e = (i / s) % 2),
            (e = r && e > 1 ? 2 - e : e),
            (e = this._easing(Math.min(1, Math.max(0, e)))),
            (this._target[a] = this._fn(n, o, e));
        }
        wait() {
          let t = this._promises || (this._promises = []);
          return new Promise((e, i) => {
            t.push({ res: e, rej: i });
          });
        }
        _notify(t) {
          let e = t ? "res" : "rej",
            i = this._promises || [];
          for (let t = 0; t < i.length; t++) i[t][e]();
        }
      }
      class l {
        constructor(t, e) {
          (this._chart = t), (this._properties = new Map()), this.configure(e);
        }
        configure(t) {
          if (!(0, s.i)(t)) return;
          let e = Object.keys(s.d.animation),
            i = this._properties;
          Object.getOwnPropertyNames(t).forEach((a) => {
            let n = t[a];
            if (!(0, s.i)(n)) return;
            let r = {};
            for (let t of e) r[t] = n[t];
            (((0, s.b)(n.properties) && n.properties) || [a]).forEach((t) => {
              (t !== a && i.has(t)) || i.set(t, r);
            });
          });
        }
        _animateOptions(t, e) {
          let i = e.options,
            s = (function (t, e) {
              if (!e) return;
              let i = t.options;
              if (!i) {
                t.options = e;
                return;
              }
              return (
                i.$shared &&
                  (t.options = i =
                    Object.assign({}, i, { $shared: !1, $animations: {} })),
                i
              );
            })(t, i);
          if (!s) return [];
          let a = this._createAnimations(s, i);
          return (
            i.$shared &&
              (function (t, e) {
                let i = [],
                  s = Object.keys(e);
                for (let e = 0; e < s.length; e++) {
                  let a = t[s[e]];
                  a && a.active() && i.push(a.wait());
                }
                return Promise.all(i);
              })(t.options.$animations, i).then(
                () => {
                  t.options = i;
                },
                () => {}
              ),
            a
          );
        }
        _createAnimations(t, e) {
          let i;
          let s = this._properties,
            a = [],
            n = t.$animations || (t.$animations = {}),
            r = Object.keys(e),
            l = Date.now();
          for (i = r.length - 1; i >= 0; --i) {
            let h = r[i];
            if ("$" === h.charAt(0)) continue;
            if ("options" === h) {
              a.push(...this._animateOptions(t, e));
              continue;
            }
            let d = e[h],
              c = n[h],
              u = s.get(h);
            if (c) {
              if (u && c.active()) {
                c.update(u, d, l);
                continue;
              }
              c.cancel();
            }
            if (!u || !u.duration) {
              t[h] = d;
              continue;
            }
            (n[h] = c = new o(u, t, h, d)), a.push(c);
          }
          return a;
        }
        update(t, e) {
          if (0 === this._properties.size) {
            Object.assign(t, e);
            return;
          }
          let i = this._createAnimations(t, e);
          if (i.length) return a.add(this._chart, i), !0;
        }
      }
      function h(t, e) {
        let i = (t && t.options) || {},
          s = i.reverse,
          a = void 0 === i.min ? e : 0,
          n = void 0 === i.max ? e : 0;
        return { start: s ? n : a, end: s ? a : n };
      }
      function d(t, e) {
        let i, s;
        let a = [],
          n = t._getSortedDatasetMetas(e);
        for (i = 0, s = n.length; i < s; ++i) a.push(n[i].index);
        return a;
      }
      function c(t, e, i, a = {}) {
        let n, r, o, l;
        let h = t.keys,
          d = "single" === a.mode;
        if (null !== e) {
          for (n = 0, r = h.length; n < r; ++n) {
            if ((o = +h[n]) === i) {
              if (a.all) continue;
              break;
            }
            (l = t.values[o]),
              (0, s.g)(l) &&
                (d || 0 === e || (0, s.s)(e) === (0, s.s)(l)) &&
                (e += l);
          }
          return e;
        }
      }
      function u(t, e) {
        let i = t && t.options.stacked;
        return i || (void 0 === i && void 0 !== e.stack);
      }
      function g(t, e, i, s) {
        for (let a of e.getMatchingVisibleMetas(s).reverse()) {
          let e = t[a.index];
          if ((i && e > 0) || (!i && e < 0)) return a.index;
        }
        return null;
      }
      function p(t, e) {
        let i;
        let { chart: s, _cachedMeta: a } = t,
          n = s._stacks || (s._stacks = {}),
          { iScale: r, vScale: o, index: l } = a,
          h = r.axis,
          d = o.axis,
          c = `${r.id}.${o.id}.${a.stack || a.type}`,
          u = e.length;
        for (let t = 0; t < u; ++t) {
          let s = e[t],
            { [h]: r, [d]: u } = s,
            p = s._stacks || (s._stacks = {});
          ((i = p[d] =
            (function (t, e, i) {
              let s = t[e] || (t[e] = {});
              return s[i] || (s[i] = {});
            })(n, c, r))[l] = u),
            (i._top = g(i, o, !0, a.type)),
            (i._bottom = g(i, o, !1, a.type));
          let f = i._visualValues || (i._visualValues = {});
          f[l] = u;
        }
      }
      function f(t, e) {
        let i = t.scales;
        return Object.keys(i)
          .filter((t) => i[t].axis === e)
          .shift();
      }
      function m(t, e) {
        let i = t.controller.index,
          s = t.vScale && t.vScale.axis;
        if (s)
          for (let a of (e = e || t._parsed)) {
            let t = a._stacks;
            if (!t || void 0 === t[s] || void 0 === t[s][i]) return;
            delete t[s][i],
              void 0 !== t[s]._visualValues &&
                void 0 !== t[s]._visualValues[i] &&
                delete t[s]._visualValues[i];
          }
      }
      let x = (t) => "reset" === t || "none" === t,
        b = (t, e) => (e ? t : Object.assign({}, t)),
        _ = (t, e, i) =>
          t && !e.hidden && e._stacked && { keys: d(i, !0), values: null };
      class v {
        static defaults = {};
        static datasetElementType = null;
        static dataElementType = null;
        constructor(t, e) {
          (this.chart = t),
            (this._ctx = t.ctx),
            (this.index = e),
            (this._cachedDataOpts = {}),
            (this._cachedMeta = this.getMeta()),
            (this._type = this._cachedMeta.type),
            (this.options = void 0),
            (this._parsing = !1),
            (this._data = void 0),
            (this._objectData = void 0),
            (this._sharedOptions = void 0),
            (this._drawStart = void 0),
            (this._drawCount = void 0),
            (this.enableOptionSharing = !1),
            (this.supportsDecimation = !1),
            (this.$context = void 0),
            (this._syncList = []),
            (this.datasetElementType = new.target.datasetElementType),
            (this.dataElementType = new.target.dataElementType),
            this.initialize();
        }
        initialize() {
          let t = this._cachedMeta;
          this.configure(),
            this.linkScales(),
            (t._stacked = u(t.vScale, t)),
            this.addElements(),
            this.options.fill &&
              !this.chart.isPluginEnabled("filler") &&
              console.warn(
                "Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options"
              );
        }
        updateIndex(t) {
          this.index !== t && m(this._cachedMeta), (this.index = t);
        }
        linkScales() {
          let t = this.chart,
            e = this._cachedMeta,
            i = this.getDataset(),
            a = (t, e, i, s) => ("x" === t ? e : "r" === t ? s : i),
            n = (e.xAxisID = (0, s.v)(i.xAxisID, f(t, "x"))),
            r = (e.yAxisID = (0, s.v)(i.yAxisID, f(t, "y"))),
            o = (e.rAxisID = (0, s.v)(i.rAxisID, f(t, "r"))),
            l = e.indexAxis,
            h = (e.iAxisID = a(l, n, r, o)),
            d = (e.vAxisID = a(l, r, n, o));
          (e.xScale = this.getScaleForId(n)),
            (e.yScale = this.getScaleForId(r)),
            (e.rScale = this.getScaleForId(o)),
            (e.iScale = this.getScaleForId(h)),
            (e.vScale = this.getScaleForId(d));
        }
        getDataset() {
          return this.chart.data.datasets[this.index];
        }
        getMeta() {
          return this.chart.getDatasetMeta(this.index);
        }
        getScaleForId(t) {
          return this.chart.scales[t];
        }
        _getOtherScale(t) {
          let e = this._cachedMeta;
          return t === e.iScale ? e.vScale : e.iScale;
        }
        reset() {
          this._update("reset");
        }
        _destroy() {
          let t = this._cachedMeta;
          this._data && (0, s.u)(this._data, this), t._stacked && m(t);
        }
        _dataCheck() {
          let t = this.getDataset(),
            e = t.data || (t.data = []),
            i = this._data;
          if ((0, s.i)(e))
            this._data = (function (t) {
              let e, i, s;
              let a = Object.keys(t),
                n = Array(a.length);
              for (e = 0, i = a.length; e < i; ++e)
                (s = a[e]), (n[e] = { x: s, y: t[s] });
              return n;
            })(e);
          else if (i !== e) {
            if (i) {
              (0, s.u)(i, this);
              let t = this._cachedMeta;
              m(t), (t._parsed = []);
            }
            e && Object.isExtensible(e) && (0, s.l)(e, this),
              (this._syncList = []),
              (this._data = e);
          }
        }
        addElements() {
          let t = this._cachedMeta;
          this._dataCheck(),
            this.datasetElementType &&
              (t.dataset = new this.datasetElementType());
        }
        buildOrUpdateElements(t) {
          let e = this._cachedMeta,
            i = this.getDataset(),
            s = !1;
          this._dataCheck();
          let a = e._stacked;
          (e._stacked = u(e.vScale, e)),
            e.stack !== i.stack && ((s = !0), m(e), (e.stack = i.stack)),
            this._resyncElements(t),
            (s || a !== e._stacked) && p(this, e._parsed);
        }
        configure() {
          let t = this.chart.config,
            e = t.datasetScopeKeys(this._type),
            i = t.getOptionScopes(this.getDataset(), e, !0);
          (this.options = t.createResolver(i, this.getContext())),
            (this._parsing = this.options.parsing),
            (this._cachedDataOpts = {});
        }
        parse(t, e) {
          let i, a, n;
          let { _cachedMeta: r, _data: o } = this,
            { iScale: l, _stacked: h } = r,
            d = l.axis,
            c = (0 === t && e === o.length) || r._sorted,
            u = t > 0 && r._parsed[t - 1];
          if (!1 === this._parsing) (r._parsed = o), (r._sorted = !0), (n = o);
          else {
            n = (0, s.b)(o[t])
              ? this.parseArrayData(r, o, t, e)
              : (0, s.i)(o[t])
              ? this.parseObjectData(r, o, t, e)
              : this.parsePrimitiveData(r, o, t, e);
            let l = () => null === a[d] || (u && a[d] < u[d]);
            for (i = 0; i < e; ++i)
              (r._parsed[i + t] = a = n[i]), c && (l() && (c = !1), (u = a));
            r._sorted = c;
          }
          h && p(this, n);
        }
        parsePrimitiveData(t, e, i, s) {
          let a, n;
          let { iScale: r, vScale: o } = t,
            l = r.axis,
            h = o.axis,
            d = r.getLabels(),
            c = r === o,
            u = Array(s);
          for (a = 0; a < s; ++a)
            (n = a + i),
              (u[a] = { [l]: c || r.parse(d[n], n), [h]: o.parse(e[n], n) });
          return u;
        }
        parseArrayData(t, e, i, s) {
          let a, n, r;
          let { xScale: o, yScale: l } = t,
            h = Array(s);
          for (a = 0; a < s; ++a)
            (r = e[(n = a + i)]),
              (h[a] = { x: o.parse(r[0], n), y: l.parse(r[1], n) });
          return h;
        }
        parseObjectData(t, e, i, a) {
          let n, r, o;
          let { xScale: l, yScale: h } = t,
            { xAxisKey: d = "x", yAxisKey: c = "y" } = this._parsing,
            u = Array(a);
          for (n = 0; n < a; ++n)
            (o = e[(r = n + i)]),
              (u[n] = {
                x: l.parse((0, s.f)(o, d), r),
                y: h.parse((0, s.f)(o, c), r),
              });
          return u;
        }
        getParsed(t) {
          return this._cachedMeta._parsed[t];
        }
        getDataElement(t) {
          return this._cachedMeta.data[t];
        }
        applyStack(t, e, i) {
          let s = this.chart,
            a = this._cachedMeta,
            n = e[t.axis],
            r = { keys: d(s, !0), values: e._stacks[t.axis]._visualValues };
          return c(r, n, a.index, { mode: i });
        }
        updateRangeFromParsed(t, e, i, s) {
          let a = i[e.axis],
            n = null === a ? NaN : a,
            r = s && i._stacks[e.axis];
          s && r && ((s.values = r), (n = c(s, a, this._cachedMeta.index))),
            (t.min = Math.min(t.min, n)),
            (t.max = Math.max(t.max, n));
        }
        getMinMax(t, e) {
          let i, a;
          let n = this._cachedMeta,
            r = n._parsed,
            o = n._sorted && t === n.iScale,
            l = r.length,
            h = this._getOtherScale(t),
            d = _(e, n, this.chart),
            c = {
              min: Number.POSITIVE_INFINITY,
              max: Number.NEGATIVE_INFINITY,
            },
            { min: u, max: g } = (function (t) {
              let {
                min: e,
                max: i,
                minDefined: s,
                maxDefined: a,
              } = t.getUserBounds();
              return {
                min: s ? e : Number.NEGATIVE_INFINITY,
                max: a ? i : Number.POSITIVE_INFINITY,
              };
            })(h);
          function p() {
            a = r[i];
            let e = a[h.axis];
            return !(0, s.g)(a[t.axis]) || u > e || g < e;
          }
          for (
            i = 0;
            i < l && (p() || (this.updateRangeFromParsed(c, t, a, d), !o));
            ++i
          );
          if (o) {
            for (i = l - 1; i >= 0; --i)
              if (!p()) {
                this.updateRangeFromParsed(c, t, a, d);
                break;
              }
          }
          return c;
        }
        getAllParsedValues(t) {
          let e, i, a;
          let n = this._cachedMeta._parsed,
            r = [];
          for (e = 0, i = n.length; e < i; ++e)
            (a = n[e][t.axis]), (0, s.g)(a) && r.push(a);
          return r;
        }
        getMaxOverflow() {
          return !1;
        }
        getLabelAndValue(t) {
          let e = this._cachedMeta,
            i = e.iScale,
            s = e.vScale,
            a = this.getParsed(t);
          return {
            label: i ? "" + i.getLabelForValue(a[i.axis]) : "",
            value: s ? "" + s.getLabelForValue(a[s.axis]) : "",
          };
        }
        _update(t) {
          var e;
          let i, a, n, r;
          let o = this._cachedMeta;
          this.update(t || "default"),
            (o._clip =
              ((e = (0, s.v)(
                this.options.clip,
                (function (t, e, i) {
                  if (!1 === i) return !1;
                  let s = h(t, i),
                    a = h(e, i);
                  return {
                    top: a.end,
                    right: s.end,
                    bottom: a.start,
                    left: s.start,
                  };
                })(o.xScale, o.yScale, this.getMaxOverflow())
              )),
              (0, s.i)(e)
                ? ((i = e.top), (a = e.right), (n = e.bottom), (r = e.left))
                : (i = a = n = r = e),
              { top: i, right: a, bottom: n, left: r, disabled: !1 === e }));
        }
        update(t) {}
        draw() {
          let t;
          let e = this._ctx,
            i = this.chart,
            s = this._cachedMeta,
            a = s.data || [],
            n = i.chartArea,
            r = [],
            o = this._drawStart || 0,
            l = this._drawCount || a.length - o,
            h = this.options.drawActiveElementsOnTop;
          for (s.dataset && s.dataset.draw(e, n, o, l), t = o; t < o + l; ++t) {
            let i = a[t];
            i.hidden || (i.active && h ? r.push(i) : i.draw(e, n));
          }
          for (t = 0; t < r.length; ++t) r[t].draw(e, n);
        }
        getStyle(t, e) {
          let i = e ? "active" : "default";
          return void 0 === t && this._cachedMeta.dataset
            ? this.resolveDatasetElementOptions(i)
            : this.resolveDataElementOptions(t || 0, i);
        }
        getContext(t, e, i) {
          var a, n, r;
          let o;
          let l = this.getDataset();
          if (t >= 0 && t < this._cachedMeta.data.length) {
            let e = this._cachedMeta.data[t];
            ((o =
              e.$context ||
              (e.$context =
                ((a = this.getContext()),
                (0, s.j)(a, {
                  active: !1,
                  dataIndex: t,
                  parsed: void 0,
                  raw: void 0,
                  element: e,
                  index: t,
                  mode: "default",
                  type: "data",
                })))).parsed = this.getParsed(t)),
              (o.raw = l.data[t]),
              (o.index = o.dataIndex = t);
          } else
            ((o =
              this.$context ||
              (this.$context =
                ((n = this.chart.getContext()),
                (r = this.index),
                (0, s.j)(n, {
                  active: !1,
                  dataset: void 0,
                  datasetIndex: r,
                  index: r,
                  mode: "default",
                  type: "dataset",
                })))).dataset = l),
              (o.index = o.datasetIndex = this.index);
          return (o.active = !!e), (o.mode = i), o;
        }
        resolveDatasetElementOptions(t) {
          return this._resolveElementOptions(this.datasetElementType.id, t);
        }
        resolveDataElementOptions(t, e) {
          return this._resolveElementOptions(this.dataElementType.id, e, t);
        }
        _resolveElementOptions(t, e = "default", i) {
          let a = "active" === e,
            n = this._cachedDataOpts,
            r = t + "-" + e,
            o = n[r],
            l = this.enableOptionSharing && (0, s.h)(i);
          if (o) return b(o, l);
          let h = this.chart.config,
            d = h.datasetElementScopeKeys(this._type, t),
            c = a ? [`${t}Hover`, "hover", t, ""] : [t, ""],
            u = h.getOptionScopes(this.getDataset(), d),
            g = Object.keys(s.d.elements[t]),
            p = () => this.getContext(i, a, e),
            f = h.resolveNamedOptions(u, g, p, c);
          return (
            f.$shared && ((f.$shared = l), (n[r] = Object.freeze(b(f, l)))), f
          );
        }
        _resolveAnimations(t, e, i) {
          let s;
          let a = this.chart,
            n = this._cachedDataOpts,
            r = `animation-${e}`,
            o = n[r];
          if (o) return o;
          if (!1 !== a.options.animation) {
            let a = this.chart.config,
              n = a.datasetAnimationScopeKeys(this._type, e),
              r = a.getOptionScopes(this.getDataset(), n);
            s = a.createResolver(r, this.getContext(t, i, e));
          }
          let h = new l(a, s && s.animations);
          return s && s._cacheable && (n[r] = Object.freeze(h)), h;
        }
        getSharedOptions(t) {
          if (t.$shared)
            return (
              this._sharedOptions ||
              (this._sharedOptions = Object.assign({}, t))
            );
        }
        includeOptions(t, e) {
          return !e || x(t) || this.chart._animationsDisabled;
        }
        _getSharedOptions(t, e) {
          let i = this.resolveDataElementOptions(t, e),
            s = this._sharedOptions,
            a = this.getSharedOptions(i),
            n = this.includeOptions(e, a) || a !== s;
          return (
            this.updateSharedOptions(a, e, i),
            { sharedOptions: a, includeOptions: n }
          );
        }
        updateElement(t, e, i, s) {
          x(s)
            ? Object.assign(t, i)
            : this._resolveAnimations(e, s).update(t, i);
        }
        updateSharedOptions(t, e, i) {
          t && !x(e) && this._resolveAnimations(void 0, e).update(t, i);
        }
        _setStyle(t, e, i, s) {
          t.active = s;
          let a = this.getStyle(e, s);
          this._resolveAnimations(e, i, s).update(t, {
            options: (!s && this.getSharedOptions(a)) || a,
          });
        }
        removeHoverStyle(t, e, i) {
          this._setStyle(t, i, "active", !1);
        }
        setHoverStyle(t, e, i) {
          this._setStyle(t, i, "active", !0);
        }
        _removeDatasetHoverStyle() {
          let t = this._cachedMeta.dataset;
          t && this._setStyle(t, void 0, "active", !1);
        }
        _setDatasetHoverStyle() {
          let t = this._cachedMeta.dataset;
          t && this._setStyle(t, void 0, "active", !0);
        }
        _resyncElements(t) {
          let e = this._data,
            i = this._cachedMeta.data;
          for (let [t, e, i] of this._syncList) this[t](e, i);
          this._syncList = [];
          let s = i.length,
            a = e.length,
            n = Math.min(a, s);
          n && this.parse(0, n),
            a > s
              ? this._insertElements(s, a - s, t)
              : a < s && this._removeElements(a, s - a);
        }
        _insertElements(t, e, i = !0) {
          let s;
          let a = this._cachedMeta,
            n = a.data,
            r = t + e,
            o = (t) => {
              for (t.length += e, s = t.length - 1; s >= r; s--)
                t[s] = t[s - e];
            };
          for (o(n), s = t; s < r; ++s) n[s] = new this.dataElementType();
          this._parsing && o(a._parsed),
            this.parse(t, e),
            i && this.updateElements(n, t, e, "reset");
        }
        updateElements(t, e, i, s) {}
        _removeElements(t, e) {
          let i = this._cachedMeta;
          if (this._parsing) {
            let s = i._parsed.splice(t, e);
            i._stacked && m(i, s);
          }
          i.data.splice(t, e);
        }
        _sync(t) {
          if (this._parsing) this._syncList.push(t);
          else {
            let [e, i, s] = t;
            this[e](i, s);
          }
          this.chart._dataChanges.push([this.index, ...t]);
        }
        _onDataPush() {
          let t = arguments.length;
          this._sync(["_insertElements", this.getDataset().data.length - t, t]);
        }
        _onDataPop() {
          this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1]);
        }
        _onDataShift() {
          this._sync(["_removeElements", 0, 1]);
        }
        _onDataSplice(t, e) {
          e && this._sync(["_removeElements", t, e]);
          let i = arguments.length - 2;
          i && this._sync(["_insertElements", t, i]);
        }
        _onDataUnshift() {
          this._sync(["_insertElements", 0, arguments.length]);
        }
      }
      function y(t, e, i, a) {
        return (
          (0, s.b)(t)
            ? (function (t, e, i, s) {
                let a = i.parse(t[0], s),
                  n = i.parse(t[1], s),
                  r = Math.min(a, n),
                  o = Math.max(a, n),
                  l = r,
                  h = o;
                Math.abs(r) > Math.abs(o) && ((l = o), (h = r)),
                  (e[i.axis] = h),
                  (e._custom = {
                    barStart: l,
                    barEnd: h,
                    start: a,
                    end: n,
                    min: r,
                    max: o,
                  });
              })(t, e, i, a)
            : (e[i.axis] = i.parse(t, a)),
          e
        );
      }
      function M(t, e, i, s) {
        let a, n, r, o;
        let l = t.iScale,
          h = t.vScale,
          d = l.getLabels(),
          c = l === h,
          u = [];
        for (a = i, n = i + s; a < n; ++a)
          (o = e[a]),
            ((r = {})[l.axis] = c || l.parse(d[a], a)),
            u.push(y(o, r, h, a));
        return u;
      }
      function w(t) {
        return t && void 0 !== t.barStart && void 0 !== t.barEnd;
      }
      function k(t, e, i, s) {
        var a;
        return (t = s
          ? D((t = (a = t) === e ? i : a === i ? e : a), i, e)
          : D(t, e, i));
      }
      function D(t, e, i) {
        return "start" === t ? e : "end" === t ? i : t;
      }
      class P extends v {
        static id = "bar";
        static defaults = {
          datasetElementType: !1,
          dataElementType: "bar",
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          grouped: !0,
          animations: {
            numbers: {
              type: "number",
              properties: ["x", "y", "base", "width", "height"],
            },
          },
        };
        static overrides = {
          scales: {
            _index_: { type: "category", offset: !0, grid: { offset: !0 } },
            _value_: { type: "linear", beginAtZero: !0 },
          },
        };
        parsePrimitiveData(t, e, i, s) {
          return M(t, e, i, s);
        }
        parseArrayData(t, e, i, s) {
          return M(t, e, i, s);
        }
        parseObjectData(t, e, i, a) {
          let n, r, o, l;
          let { iScale: h, vScale: d } = t,
            { xAxisKey: c = "x", yAxisKey: u = "y" } = this._parsing,
            g = "x" === h.axis ? c : u,
            p = "x" === d.axis ? c : u,
            f = [];
          for (n = i, r = i + a; n < r; ++n)
            (l = e[n]),
              ((o = {})[h.axis] = h.parse((0, s.f)(l, g), n)),
              f.push(y((0, s.f)(l, p), o, d, n));
          return f;
        }
        updateRangeFromParsed(t, e, i, s) {
          super.updateRangeFromParsed(t, e, i, s);
          let a = i._custom;
          a &&
            e === this._cachedMeta.vScale &&
            ((t.min = Math.min(t.min, a.min)),
            (t.max = Math.max(t.max, a.max)));
        }
        getMaxOverflow() {
          return 0;
        }
        getLabelAndValue(t) {
          let e = this._cachedMeta,
            { iScale: i, vScale: s } = e,
            a = this.getParsed(t),
            n = a._custom,
            r = w(n)
              ? "[" + n.start + ", " + n.end + "]"
              : "" + s.getLabelForValue(a[s.axis]);
          return { label: "" + i.getLabelForValue(a[i.axis]), value: r };
        }
        initialize() {
          (this.enableOptionSharing = !0), super.initialize();
          let t = this._cachedMeta;
          t.stack = this.getDataset().stack;
        }
        update(t) {
          let e = this._cachedMeta;
          this.updateElements(e.data, 0, e.data.length, t);
        }
        updateElements(t, e, i, a) {
          let n = "reset" === a,
            {
              index: r,
              _cachedMeta: { vScale: o },
            } = this,
            l = o.getBasePixel(),
            h = o.isHorizontal(),
            d = this._getRuler(),
            { sharedOptions: c, includeOptions: u } = this._getSharedOptions(
              e,
              a
            );
          for (let g = e; g < e + i; g++) {
            let e = this.getParsed(g),
              i =
                n || (0, s.k)(e[o.axis])
                  ? { base: l, head: l }
                  : this._calculateBarValuePixels(g),
              p = this._calculateBarIndexPixels(g, d),
              f = (e._stacks || {})[o.axis],
              m = {
                horizontal: h,
                base: i.base,
                enableBorderRadius:
                  !f || w(e._custom) || r === f._top || r === f._bottom,
                x: h ? i.head : p.center,
                y: h ? p.center : i.head,
                height: h ? p.size : Math.abs(i.size),
                width: h ? Math.abs(i.size) : p.size,
              };
            u &&
              (m.options =
                c ||
                this.resolveDataElementOptions(g, t[g].active ? "active" : a));
            let x = m.options || t[g].options;
            !(function (t, e, i, s) {
              let a,
                n,
                r,
                o,
                l,
                h = e.borderSkipped,
                d = {};
              if (!h) {
                t.borderSkipped = d;
                return;
              }
              if (!0 === h) {
                t.borderSkipped = { top: !0, right: !0, bottom: !0, left: !0 };
                return;
              }
              let {
                start: c,
                end: u,
                reverse: g,
                top: p,
                bottom: f,
              } = (t.horizontal
                ? ((a = t.base > t.x), (n = "left"), (r = "right"))
                : ((a = t.base < t.y), (n = "bottom"), (r = "top")),
              a ? ((o = "end"), (l = "start")) : ((o = "start"), (l = "end")),
              { start: n, end: r, reverse: a, top: o, bottom: l });
              "middle" === h &&
                i &&
                ((t.enableBorderRadius = !0),
                (i._top || 0) === s
                  ? (h = p)
                  : (i._bottom || 0) === s
                  ? (h = f)
                  : ((d[k(f, c, u, g)] = !0), (h = p))),
                (d[k(h, c, u, g)] = !0),
                (t.borderSkipped = d);
            })(m, x, f, r),
              (function (t, { inflateAmount: e }, i) {
                t.inflateAmount = "auto" === e ? (1 === i ? 0.33 : 0) : e;
              })(m, x, d.ratio),
              this.updateElement(t[g], g, m, a);
          }
        }
        _getStacks(t, e) {
          let { iScale: i } = this._cachedMeta,
            a = i
              .getMatchingVisibleMetas(this._type)
              .filter((t) => t.controller.options.grouped),
            n = i.options.stacked,
            r = [],
            o = (t) => {
              let i = t.controller.getParsed(e),
                a = i && i[t.vScale.axis];
              if ((0, s.k)(a) || isNaN(a)) return !0;
            };
          for (let i of a)
            if (
              !(void 0 !== e && o(i)) &&
              ((!1 === n ||
                -1 === r.indexOf(i.stack) ||
                (void 0 === n && void 0 === i.stack)) &&
                r.push(i.stack),
              i.index === t)
            )
              break;
          return r.length || r.push(void 0), r;
        }
        _getStackCount(t) {
          return this._getStacks(void 0, t).length;
        }
        _getStackIndex(t, e, i) {
          let s = this._getStacks(t, i),
            a = void 0 !== e ? s.indexOf(e) : -1;
          return -1 === a ? s.length - 1 : a;
        }
        _getRuler() {
          let t, e;
          let i = this.options,
            a = this._cachedMeta,
            n = a.iScale,
            r = [];
          for (t = 0, e = a.data.length; t < e; ++t)
            r.push(n.getPixelForValue(this.getParsed(t)[n.axis], t));
          let o = i.barThickness,
            l =
              o ||
              (function (t) {
                let e, i, a, n;
                let r = t.iScale,
                  o = (function (t, e) {
                    if (!t._cache.$bar) {
                      let i = t.getMatchingVisibleMetas(e),
                        a = [];
                      for (let e = 0, s = i.length; e < s; e++)
                        a = a.concat(i[e].controller.getAllParsedValues(t));
                      t._cache.$bar = (0, s._)(a.sort((t, e) => t - e));
                    }
                    return t._cache.$bar;
                  })(r, t.type),
                  l = r._length,
                  h = () => {
                    32767 !== a &&
                      -32768 !== a &&
                      ((0, s.h)(n) && (l = Math.min(l, Math.abs(a - n) || l)),
                      (n = a));
                  };
                for (e = 0, i = o.length; e < i; ++e)
                  (a = r.getPixelForValue(o[e])), h();
                for (e = 0, n = void 0, i = r.ticks.length; e < i; ++e)
                  (a = r.getPixelForTick(e)), h();
                return l;
              })(a);
          return {
            min: l,
            pixels: r,
            start: n._startPixel,
            end: n._endPixel,
            stackCount: this._getStackCount(),
            scale: n,
            grouped: i.grouped,
            ratio: o ? 1 : i.categoryPercentage * i.barPercentage,
          };
        }
        _calculateBarValuePixels(t) {
          let e, i;
          let {
              _cachedMeta: { vScale: a, _stacked: n, index: r },
              options: { base: o, minBarLength: l },
            } = this,
            h = o || 0,
            d = this.getParsed(t),
            c = d._custom,
            u = w(c),
            g = d[a.axis],
            p = 0,
            f = n ? this.applyStack(a, d, n) : g;
          f !== g && ((p = f - g), (f = g)),
            u &&
              ((g = c.barStart),
              (f = c.barEnd - c.barStart),
              0 !== g && (0, s.s)(g) !== (0, s.s)(c.barEnd) && (p = 0),
              (p += g));
          let m = (0, s.k)(o) || u ? p : o,
            x = a.getPixelForValue(m);
          if (
            Math.abs(
              (i =
                (e = this.chart.getDataVisibility(t)
                  ? a.getPixelForValue(p + f)
                  : x) - x)
            ) < l
          ) {
            var b;
            (i =
              (0 !== (b = i)
                ? (0, s.s)(b)
                : (a.isHorizontal() ? 1 : -1) * (a.min >= h ? 1 : -1)) * l),
              g === h && (x -= i / 2);
            let t = a.getPixelForDecimal(0),
              o = a.getPixelForDecimal(1);
            (e =
              (x = Math.max(Math.min(x, Math.max(t, o)), Math.min(t, o))) + i),
              n &&
                !u &&
                (d._stacks[a.axis]._visualValues[r] =
                  a.getValueForPixel(e) - a.getValueForPixel(x));
          }
          if (x === a.getPixelForValue(h)) {
            let t = ((0, s.s)(i) * a.getLineWidthForValue(h)) / 2;
            (x += t), (i -= t);
          }
          return { size: i, base: x, head: e, center: e + i / 2 };
        }
        _calculateBarIndexPixels(t, e) {
          let i, a;
          let n = e.scale,
            r = this.options,
            o = r.skipNull,
            l = (0, s.v)(r.maxBarThickness, 1 / 0);
          if (e.grouped) {
            let n = o ? this._getStackCount(t) : e.stackCount,
              h =
                "flex" === r.barThickness
                  ? (function (t, e, i, s) {
                      let a = e.pixels,
                        n = a[t],
                        r = t > 0 ? a[t - 1] : null,
                        o = t < a.length - 1 ? a[t + 1] : null,
                        l = i.categoryPercentage;
                      null === r &&
                        (r = n - (null === o ? e.end - e.start : o - n)),
                        null === o && (o = n + n - r);
                      let h = n - ((n - Math.min(r, o)) / 2) * l,
                        d = (Math.abs(o - r) / 2) * l;
                      return { chunk: d / s, ratio: i.barPercentage, start: h };
                    })(t, e, r, n)
                  : (function (t, e, i, a) {
                      let n, r;
                      let o = i.barThickness;
                      return (
                        (0, s.k)(o)
                          ? ((n = e.min * i.categoryPercentage),
                            (r = i.barPercentage))
                          : ((n = o * a), (r = 1)),
                        { chunk: n / a, ratio: r, start: e.pixels[t] - n / 2 }
                      );
                    })(t, e, r, n),
              d = this._getStackIndex(
                this.index,
                this._cachedMeta.stack,
                o ? t : void 0
              );
            (i = h.start + h.chunk * d + h.chunk / 2),
              (a = Math.min(l, h.chunk * h.ratio));
          } else
            (i = n.getPixelForValue(this.getParsed(t)[n.axis], t)),
              (a = Math.min(l, e.min * e.ratio));
          return { base: i - a / 2, head: i + a / 2, center: i, size: a };
        }
        draw() {
          let t = this._cachedMeta,
            e = t.vScale,
            i = t.data,
            s = i.length,
            a = 0;
          for (; a < s; ++a)
            null !== this.getParsed(a)[e.axis] && i[a].draw(this._ctx);
        }
      }
      class S extends v {
        static id = "bubble";
        static defaults = {
          datasetElementType: !1,
          dataElementType: "point",
          animations: {
            numbers: {
              type: "number",
              properties: ["x", "y", "borderWidth", "radius"],
            },
          },
        };
        static overrides = {
          scales: { x: { type: "linear" }, y: { type: "linear" } },
        };
        initialize() {
          (this.enableOptionSharing = !0), super.initialize();
        }
        parsePrimitiveData(t, e, i, s) {
          let a = super.parsePrimitiveData(t, e, i, s);
          for (let t = 0; t < a.length; t++)
            a[t]._custom = this.resolveDataElementOptions(t + i).radius;
          return a;
        }
        parseArrayData(t, e, i, a) {
          let n = super.parseArrayData(t, e, i, a);
          for (let t = 0; t < n.length; t++) {
            let a = e[i + t];
            n[t]._custom = (0, s.v)(
              a[2],
              this.resolveDataElementOptions(t + i).radius
            );
          }
          return n;
        }
        parseObjectData(t, e, i, a) {
          let n = super.parseObjectData(t, e, i, a);
          for (let t = 0; t < n.length; t++) {
            let a = e[i + t];
            n[t]._custom = (0, s.v)(
              a && a.r && +a.r,
              this.resolveDataElementOptions(t + i).radius
            );
          }
          return n;
        }
        getMaxOverflow() {
          let t = this._cachedMeta.data,
            e = 0;
          for (let i = t.length - 1; i >= 0; --i)
            e = Math.max(e, t[i].size(this.resolveDataElementOptions(i)) / 2);
          return e > 0 && e;
        }
        getLabelAndValue(t) {
          let e = this._cachedMeta,
            i = this.chart.data.labels || [],
            { xScale: s, yScale: a } = e,
            n = this.getParsed(t),
            r = s.getLabelForValue(n.x),
            o = a.getLabelForValue(n.y),
            l = n._custom;
          return {
            label: i[t] || "",
            value: "(" + r + ", " + o + (l ? ", " + l : "") + ")",
          };
        }
        update(t) {
          let e = this._cachedMeta.data;
          this.updateElements(e, 0, e.length, t);
        }
        updateElements(t, e, i, s) {
          let a = "reset" === s,
            { iScale: n, vScale: r } = this._cachedMeta,
            { sharedOptions: o, includeOptions: l } = this._getSharedOptions(
              e,
              s
            ),
            h = n.axis,
            d = r.axis;
          for (let c = e; c < e + i; c++) {
            let e = t[c],
              i = !a && this.getParsed(c),
              u = {},
              g = (u[h] = a
                ? n.getPixelForDecimal(0.5)
                : n.getPixelForValue(i[h])),
              p = (u[d] = a ? r.getBasePixel() : r.getPixelForValue(i[d]));
            (u.skip = isNaN(g) || isNaN(p)),
              l &&
                ((u.options =
                  o ||
                  this.resolveDataElementOptions(c, e.active ? "active" : s)),
                a && (u.options.radius = 0)),
              this.updateElement(e, c, u, s);
          }
        }
        resolveDataElementOptions(t, e) {
          let i = this.getParsed(t),
            a = super.resolveDataElementOptions(t, e);
          a.$shared && (a = Object.assign({}, a, { $shared: !1 }));
          let n = a.radius;
          return (
            "active" !== e && (a.radius = 0),
            (a.radius += (0, s.v)(i && i._custom, n)),
            a
          );
        }
      }
      class C extends v {
        static id = "doughnut";
        static defaults = {
          datasetElementType: !1,
          dataElementType: "arc",
          animation: { animateRotate: !0, animateScale: !1 },
          animations: {
            numbers: {
              type: "number",
              properties: [
                "circumference",
                "endAngle",
                "innerRadius",
                "outerRadius",
                "startAngle",
                "x",
                "y",
                "offset",
                "borderWidth",
                "spacing",
              ],
            },
          },
          cutout: "50%",
          rotation: 0,
          circumference: 360,
          radius: "100%",
          spacing: 0,
          indexAxis: "r",
        };
        static descriptors = {
          _scriptable: (t) => "spacing" !== t,
          _indexable: (t) =>
            "spacing" !== t &&
            !t.startsWith("borderDash") &&
            !t.startsWith("hoverBorderDash"),
        };
        static overrides = {
          aspectRatio: 1,
          plugins: {
            legend: {
              labels: {
                generateLabels(t) {
                  let e = t.data;
                  if (e.labels.length && e.datasets.length) {
                    let {
                      labels: { pointStyle: i, color: s },
                    } = t.legend.options;
                    return e.labels.map((e, a) => {
                      let n = t.getDatasetMeta(0),
                        r = n.controller.getStyle(a);
                      return {
                        text: e,
                        fillStyle: r.backgroundColor,
                        strokeStyle: r.borderColor,
                        fontColor: s,
                        lineWidth: r.borderWidth,
                        pointStyle: i,
                        hidden: !t.getDataVisibility(a),
                        index: a,
                      };
                    });
                  }
                  return [];
                },
              },
              onClick(t, e, i) {
                i.chart.toggleDataVisibility(e.index), i.chart.update();
              },
            },
          },
        };
        constructor(t, e) {
          super(t, e),
            (this.enableOptionSharing = !0),
            (this.innerRadius = void 0),
            (this.outerRadius = void 0),
            (this.offsetX = void 0),
            (this.offsetY = void 0);
        }
        linkScales() {}
        parse(t, e) {
          let i = this.getDataset().data,
            a = this._cachedMeta;
          if (!1 === this._parsing) a._parsed = i;
          else {
            let n,
              r,
              o = (t) => +i[t];
            if ((0, s.i)(i[t])) {
              let { key: t = "value" } = this._parsing;
              o = (e) => +(0, s.f)(i[e], t);
            }
            for (n = t, r = t + e; n < r; ++n) a._parsed[n] = o(n);
          }
        }
        _getRotation() {
          return (0, s.t)(this.options.rotation - 90);
        }
        _getCircumference() {
          return (0, s.t)(this.options.circumference);
        }
        _getRotationExtents() {
          let t = s.T,
            e = -s.T;
          for (let i = 0; i < this.chart.data.datasets.length; ++i)
            if (
              this.chart.isDatasetVisible(i) &&
              this.chart.getDatasetMeta(i).type === this._type
            ) {
              let s = this.chart.getDatasetMeta(i).controller,
                a = s._getRotation(),
                n = s._getCircumference();
              (t = Math.min(t, a)), (e = Math.max(e, a + n));
            }
          return { rotation: t, circumference: e - t };
        }
        update(t) {
          let e = this.chart,
            { chartArea: i } = e,
            a = this._cachedMeta,
            n = a.data,
            r =
              this.getMaxBorderWidth() +
              this.getMaxOffset(n) +
              this.options.spacing,
            o = Math.max((Math.min(i.width, i.height) - r) / 2, 0),
            l = Math.min((0, s.m)(this.options.cutout, o), 1),
            h = this._getRingWeight(this.index),
            { circumference: d, rotation: c } = this._getRotationExtents(),
            {
              ratioX: u,
              ratioY: g,
              offsetX: p,
              offsetY: f,
            } = (function (t, e, i) {
              let a = 1,
                n = 1,
                r = 0,
                o = 0;
              if (e < s.T) {
                let l = t + e,
                  h = Math.cos(t),
                  d = Math.sin(t),
                  c = Math.cos(l),
                  u = Math.sin(l),
                  g = (e, a, n) =>
                    (0, s.p)(e, t, l, !0) ? 1 : Math.max(a, a * i, n, n * i),
                  p = (e, a, n) =>
                    (0, s.p)(e, t, l, !0) ? -1 : Math.min(a, a * i, n, n * i),
                  f = g(0, h, c),
                  m = g(s.H, d, u),
                  x = p(s.P, h, c),
                  b = p(s.P + s.H, d, u);
                (a = (f - x) / 2),
                  (n = (m - b) / 2),
                  (r = -(f + x) / 2),
                  (o = -(m + b) / 2);
              }
              return { ratioX: a, ratioY: n, offsetX: r, offsetY: o };
            })(c, d, l),
            m = (i.width - r) / u,
            x = (i.height - r) / g,
            b = (0, s.n)(this.options.radius, Math.max(Math.min(m, x) / 2, 0)),
            _ = (b - Math.max(b * l, 0)) / this._getVisibleDatasetWeightTotal();
          (this.offsetX = p * b),
            (this.offsetY = f * b),
            (a.total = this.calculateTotal()),
            (this.outerRadius = b - _ * this._getRingWeightOffset(this.index)),
            (this.innerRadius = Math.max(this.outerRadius - _ * h, 0)),
            this.updateElements(n, 0, n.length, t);
        }
        _circumference(t, e) {
          let i = this.options,
            a = this._cachedMeta,
            n = this._getCircumference();
          return (e && i.animation.animateRotate) ||
            !this.chart.getDataVisibility(t) ||
            null === a._parsed[t] ||
            a.data[t].hidden
            ? 0
            : this.calculateCircumference((a._parsed[t] * n) / s.T);
        }
        updateElements(t, e, i, s) {
          let a;
          let n = "reset" === s,
            r = this.chart,
            o = r.chartArea,
            l = r.options,
            h = l.animation,
            d = (o.left + o.right) / 2,
            c = (o.top + o.bottom) / 2,
            u = n && h.animateScale,
            g = u ? 0 : this.innerRadius,
            p = u ? 0 : this.outerRadius,
            { sharedOptions: f, includeOptions: m } = this._getSharedOptions(
              e,
              s
            ),
            x = this._getRotation();
          for (a = 0; a < e; ++a) x += this._circumference(a, n);
          for (a = e; a < e + i; ++a) {
            let e = this._circumference(a, n),
              i = t[a],
              r = {
                x: d + this.offsetX,
                y: c + this.offsetY,
                startAngle: x,
                endAngle: x + e,
                circumference: e,
                outerRadius: p,
                innerRadius: g,
              };
            m &&
              (r.options =
                f ||
                this.resolveDataElementOptions(a, i.active ? "active" : s)),
              (x += e),
              this.updateElement(i, a, r, s);
          }
        }
        calculateTotal() {
          let t;
          let e = this._cachedMeta,
            i = e.data,
            s = 0;
          for (t = 0; t < i.length; t++) {
            let a = e._parsed[t];
            null !== a &&
              !isNaN(a) &&
              this.chart.getDataVisibility(t) &&
              !i[t].hidden &&
              (s += Math.abs(a));
          }
          return s;
        }
        calculateCircumference(t) {
          let e = this._cachedMeta.total;
          return e > 0 && !isNaN(t) ? s.T * (Math.abs(t) / e) : 0;
        }
        getLabelAndValue(t) {
          let e = this._cachedMeta,
            i = this.chart,
            a = i.data.labels || [],
            n = (0, s.o)(e._parsed[t], i.options.locale);
          return { label: a[t] || "", value: n };
        }
        getMaxBorderWidth(t) {
          let e,
            i,
            s,
            a,
            n,
            r = 0,
            o = this.chart;
          if (!t) {
            for (e = 0, i = o.data.datasets.length; e < i; ++e)
              if (o.isDatasetVisible(e)) {
                (t = (s = o.getDatasetMeta(e)).data), (a = s.controller);
                break;
              }
          }
          if (!t) return 0;
          for (e = 0, i = t.length; e < i; ++e)
            "inner" !== (n = a.resolveDataElementOptions(e)).borderAlign &&
              (r = Math.max(r, n.borderWidth || 0, n.hoverBorderWidth || 0));
          return r;
        }
        getMaxOffset(t) {
          let e = 0;
          for (let i = 0, s = t.length; i < s; ++i) {
            let t = this.resolveDataElementOptions(i);
            e = Math.max(e, t.offset || 0, t.hoverOffset || 0);
          }
          return e;
        }
        _getRingWeightOffset(t) {
          let e = 0;
          for (let i = 0; i < t; ++i)
            this.chart.isDatasetVisible(i) && (e += this._getRingWeight(i));
          return e;
        }
        _getRingWeight(t) {
          return Math.max((0, s.v)(this.chart.data.datasets[t].weight, 1), 0);
        }
        _getVisibleDatasetWeightTotal() {
          return (
            this._getRingWeightOffset(this.chart.data.datasets.length) || 1
          );
        }
      }
      class L extends v {
        static id = "line";
        static defaults = {
          datasetElementType: "line",
          dataElementType: "point",
          showLine: !0,
          spanGaps: !1,
        };
        static overrides = {
          scales: {
            _index_: { type: "category" },
            _value_: { type: "linear" },
          },
        };
        initialize() {
          (this.enableOptionSharing = !0),
            (this.supportsDecimation = !0),
            super.initialize();
        }
        update(t) {
          let e = this._cachedMeta,
            { dataset: i, data: a = [], _dataset: n } = e,
            r = this.chart._animationsDisabled,
            { start: o, count: l } = (0, s.q)(e, a, r);
          (this._drawStart = o),
            (this._drawCount = l),
            (0, s.w)(e) && ((o = 0), (l = a.length)),
            (i._chart = this.chart),
            (i._datasetIndex = this.index),
            (i._decimated = !!n._decimated),
            (i.points = a);
          let h = this.resolveDatasetElementOptions(t);
          this.options.showLine || (h.borderWidth = 0),
            (h.segment = this.options.segment),
            this.updateElement(i, void 0, { animated: !r, options: h }, t),
            this.updateElements(a, o, l, t);
        }
        updateElements(t, e, i, a) {
          let n = "reset" === a,
            {
              iScale: r,
              vScale: o,
              _stacked: l,
              _dataset: h,
            } = this._cachedMeta,
            { sharedOptions: d, includeOptions: c } = this._getSharedOptions(
              e,
              a
            ),
            u = r.axis,
            g = o.axis,
            { spanGaps: p, segment: f } = this.options,
            m = (0, s.x)(p) ? p : Number.POSITIVE_INFINITY,
            x = this.chart._animationsDisabled || n || "none" === a,
            b = e + i,
            _ = t.length,
            v = e > 0 && this.getParsed(e - 1);
          for (let i = 0; i < _; ++i) {
            let p = t[i],
              _ = x ? p : {};
            if (i < e || i >= b) {
              _.skip = !0;
              continue;
            }
            let y = this.getParsed(i),
              M = (0, s.k)(y[g]),
              w = (_[u] = r.getPixelForValue(y[u], i)),
              k = (_[g] =
                n || M
                  ? o.getBasePixel()
                  : o.getPixelForValue(l ? this.applyStack(o, y, l) : y[g], i));
            (_.skip = isNaN(w) || isNaN(k) || M),
              (_.stop = i > 0 && Math.abs(y[u] - v[u]) > m),
              f && ((_.parsed = y), (_.raw = h.data[i])),
              c &&
                (_.options =
                  d ||
                  this.resolveDataElementOptions(i, p.active ? "active" : a)),
              x || this.updateElement(p, i, _, a),
              (v = y);
          }
        }
        getMaxOverflow() {
          let t = this._cachedMeta,
            e = t.dataset,
            i = (e.options && e.options.borderWidth) || 0,
            s = t.data || [];
          if (!s.length) return i;
          let a = s[0].size(this.resolveDataElementOptions(0)),
            n = s[s.length - 1].size(
              this.resolveDataElementOptions(s.length - 1)
            );
          return Math.max(i, a, n) / 2;
        }
        draw() {
          let t = this._cachedMeta;
          t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis),
            super.draw();
        }
      }
      class O extends v {
        static id = "polarArea";
        static defaults = {
          dataElementType: "arc",
          animation: { animateRotate: !0, animateScale: !0 },
          animations: {
            numbers: {
              type: "number",
              properties: [
                "x",
                "y",
                "startAngle",
                "endAngle",
                "innerRadius",
                "outerRadius",
              ],
            },
          },
          indexAxis: "r",
          startAngle: 0,
        };
        static overrides = {
          aspectRatio: 1,
          plugins: {
            legend: {
              labels: {
                generateLabels(t) {
                  let e = t.data;
                  if (e.labels.length && e.datasets.length) {
                    let {
                      labels: { pointStyle: i, color: s },
                    } = t.legend.options;
                    return e.labels.map((e, a) => {
                      let n = t.getDatasetMeta(0),
                        r = n.controller.getStyle(a);
                      return {
                        text: e,
                        fillStyle: r.backgroundColor,
                        strokeStyle: r.borderColor,
                        fontColor: s,
                        lineWidth: r.borderWidth,
                        pointStyle: i,
                        hidden: !t.getDataVisibility(a),
                        index: a,
                      };
                    });
                  }
                  return [];
                },
              },
              onClick(t, e, i) {
                i.chart.toggleDataVisibility(e.index), i.chart.update();
              },
            },
          },
          scales: {
            r: {
              type: "radialLinear",
              angleLines: { display: !1 },
              beginAtZero: !0,
              grid: { circular: !0 },
              pointLabels: { display: !1 },
              startAngle: 0,
            },
          },
        };
        constructor(t, e) {
          super(t, e), (this.innerRadius = void 0), (this.outerRadius = void 0);
        }
        getLabelAndValue(t) {
          let e = this._cachedMeta,
            i = this.chart,
            a = i.data.labels || [],
            n = (0, s.o)(e._parsed[t].r, i.options.locale);
          return { label: a[t] || "", value: n };
        }
        parseObjectData(t, e, i, a) {
          return s.y.bind(this)(t, e, i, a);
        }
        update(t) {
          let e = this._cachedMeta.data;
          this._updateRadius(), this.updateElements(e, 0, e.length, t);
        }
        getMinMax() {
          let t = this._cachedMeta,
            e = {
              min: Number.POSITIVE_INFINITY,
              max: Number.NEGATIVE_INFINITY,
            };
          return (
            t.data.forEach((t, i) => {
              let s = this.getParsed(i).r;
              !isNaN(s) &&
                this.chart.getDataVisibility(i) &&
                (s < e.min && (e.min = s), s > e.max && (e.max = s));
            }),
            e
          );
        }
        _updateRadius() {
          let t = this.chart,
            e = t.chartArea,
            i = t.options,
            s = Math.min(e.right - e.left, e.bottom - e.top),
            a = Math.max(s / 2, 0),
            n = Math.max(
              i.cutoutPercentage ? (a / 100) * i.cutoutPercentage : 1,
              0
            ),
            r = (a - n) / t.getVisibleDatasetCount();
          (this.outerRadius = a - r * this.index),
            (this.innerRadius = this.outerRadius - r);
        }
        updateElements(t, e, i, a) {
          let n;
          let r = "reset" === a,
            o = this.chart,
            l = o.options,
            h = l.animation,
            d = this._cachedMeta.rScale,
            c = d.xCenter,
            u = d.yCenter,
            g = d.getIndexAngle(0) - 0.5 * s.P,
            p = g,
            f = 360 / this.countVisibleElements();
          for (n = 0; n < e; ++n) p += this._computeAngle(n, a, f);
          for (n = e; n < e + i; n++) {
            let e = t[n],
              i = p,
              s = p + this._computeAngle(n, a, f),
              l = o.getDataVisibility(n)
                ? d.getDistanceFromCenterForValue(this.getParsed(n).r)
                : 0;
            (p = s),
              r && (h.animateScale && (l = 0), h.animateRotate && (i = s = g));
            let m = {
              x: c,
              y: u,
              innerRadius: 0,
              outerRadius: l,
              startAngle: i,
              endAngle: s,
              options: this.resolveDataElementOptions(
                n,
                e.active ? "active" : a
              ),
            };
            this.updateElement(e, n, m, a);
          }
        }
        countVisibleElements() {
          let t = this._cachedMeta,
            e = 0;
          return (
            t.data.forEach((t, i) => {
              !isNaN(this.getParsed(i).r) &&
                this.chart.getDataVisibility(i) &&
                e++;
            }),
            e
          );
        }
        _computeAngle(t, e, i) {
          return this.chart.getDataVisibility(t)
            ? (0, s.t)(this.resolveDataElementOptions(t, e).angle || i)
            : 0;
        }
      }
      class E extends C {
        static id = "pie";
        static defaults = {
          cutout: 0,
          rotation: 0,
          circumference: 360,
          radius: "100%",
        };
      }
      class A extends v {
        static id = "radar";
        static defaults = {
          datasetElementType: "line",
          dataElementType: "point",
          indexAxis: "r",
          showLine: !0,
          elements: { line: { fill: "start" } },
        };
        static overrides = {
          aspectRatio: 1,
          scales: { r: { type: "radialLinear" } },
        };
        getLabelAndValue(t) {
          let e = this._cachedMeta.vScale,
            i = this.getParsed(t);
          return {
            label: e.getLabels()[t],
            value: "" + e.getLabelForValue(i[e.axis]),
          };
        }
        parseObjectData(t, e, i, a) {
          return s.y.bind(this)(t, e, i, a);
        }
        update(t) {
          let e = this._cachedMeta,
            i = e.dataset,
            s = e.data || [],
            a = e.iScale.getLabels();
          if (((i.points = s), "resize" !== t)) {
            let e = this.resolveDatasetElementOptions(t);
            this.options.showLine || (e.borderWidth = 0);
            let n = { _loop: !0, _fullLoop: a.length === s.length, options: e };
            this.updateElement(i, void 0, n, t);
          }
          this.updateElements(s, 0, s.length, t);
        }
        updateElements(t, e, i, s) {
          let a = this._cachedMeta.rScale,
            n = "reset" === s;
          for (let r = e; r < e + i; r++) {
            let e = t[r],
              i = this.resolveDataElementOptions(r, e.active ? "active" : s),
              o = a.getPointPositionForValue(r, this.getParsed(r).r),
              l = n ? a.xCenter : o.x,
              h = n ? a.yCenter : o.y,
              d = {
                x: l,
                y: h,
                angle: o.angle,
                skip: isNaN(l) || isNaN(h),
                options: i,
              };
            this.updateElement(e, r, d, s);
          }
        }
      }
      class T extends v {
        static id = "scatter";
        static defaults = {
          datasetElementType: !1,
          dataElementType: "point",
          showLine: !1,
          fill: !1,
        };
        static overrides = {
          interaction: { mode: "point" },
          scales: { x: { type: "linear" }, y: { type: "linear" } },
        };
        getLabelAndValue(t) {
          let e = this._cachedMeta,
            i = this.chart.data.labels || [],
            { xScale: s, yScale: a } = e,
            n = this.getParsed(t),
            r = s.getLabelForValue(n.x),
            o = a.getLabelForValue(n.y);
          return { label: i[t] || "", value: "(" + r + ", " + o + ")" };
        }
        update(t) {
          let e = this._cachedMeta,
            { data: i = [] } = e,
            a = this.chart._animationsDisabled,
            { start: n, count: r } = (0, s.q)(e, i, a);
          if (
            ((this._drawStart = n),
            (this._drawCount = r),
            (0, s.w)(e) && ((n = 0), (r = i.length)),
            this.options.showLine)
          ) {
            let { dataset: s, _dataset: n } = e;
            (s._chart = this.chart),
              (s._datasetIndex = this.index),
              (s._decimated = !!n._decimated),
              (s.points = i);
            let r = this.resolveDatasetElementOptions(t);
            (r.segment = this.options.segment),
              this.updateElement(s, void 0, { animated: !a, options: r }, t);
          }
          this.updateElements(i, n, r, t);
        }
        addElements() {
          let { showLine: t } = this.options;
          !this.datasetElementType &&
            t &&
            (this.datasetElementType = this.chart.registry.getElement("line")),
            super.addElements();
        }
        updateElements(t, e, i, a) {
          let n = "reset" === a,
            {
              iScale: r,
              vScale: o,
              _stacked: l,
              _dataset: h,
            } = this._cachedMeta,
            d = this.resolveDataElementOptions(e, a),
            c = this.getSharedOptions(d),
            u = this.includeOptions(a, c),
            g = r.axis,
            p = o.axis,
            { spanGaps: f, segment: m } = this.options,
            x = (0, s.x)(f) ? f : Number.POSITIVE_INFINITY,
            b = this.chart._animationsDisabled || n || "none" === a,
            _ = e > 0 && this.getParsed(e - 1);
          for (let d = e; d < e + i; ++d) {
            let e = t[d],
              i = this.getParsed(d),
              f = b ? e : {},
              v = (0, s.k)(i[p]),
              y = (f[g] = r.getPixelForValue(i[g], d)),
              M = (f[p] =
                n || v
                  ? o.getBasePixel()
                  : o.getPixelForValue(l ? this.applyStack(o, i, l) : i[p], d));
            (f.skip = isNaN(y) || isNaN(M) || v),
              (f.stop = d > 0 && Math.abs(i[g] - _[g]) > x),
              m && ((f.parsed = i), (f.raw = h.data[d])),
              u &&
                (f.options =
                  c ||
                  this.resolveDataElementOptions(d, e.active ? "active" : a)),
              b || this.updateElement(e, d, f, a),
              (_ = i);
          }
          this.updateSharedOptions(c, a, d);
        }
        getMaxOverflow() {
          let t = this._cachedMeta,
            e = t.data || [];
          if (!this.options.showLine) {
            let t = 0;
            for (let i = e.length - 1; i >= 0; --i)
              t = Math.max(t, e[i].size(this.resolveDataElementOptions(i)) / 2);
            return t > 0 && t;
          }
          let i = t.dataset,
            s = (i.options && i.options.borderWidth) || 0;
          if (!e.length) return s;
          let a = e[0].size(this.resolveDataElementOptions(0)),
            n = e[e.length - 1].size(
              this.resolveDataElementOptions(e.length - 1)
            );
          return Math.max(s, a, n) / 2;
        }
      }
      function F() {
        throw Error(
          "This method is not implemented: Check that a complete date adapter is provided."
        );
      }
      class z {
        static override(t) {
          Object.assign(z.prototype, t);
        }
        options;
        constructor(t) {
          this.options = t || {};
        }
        init() {}
        formats() {
          return F();
        }
        parse() {
          return F();
        }
        format() {
          return F();
        }
        add() {
          return F();
        }
        diff() {
          return F();
        }
        startOf() {
          return F();
        }
        endOf() {
          return F();
        }
      }
      var R = { _date: z };
      function I(t, e, i, a, n) {
        let r = t.getSortedVisibleDatasetMetas(),
          o = i[e];
        for (let t = 0, i = r.length; t < i; ++t) {
          let { index: i, data: l } = r[t],
            { lo: h, hi: d } = (function (t, e, i, a) {
              let { controller: n, data: r, _sorted: o } = t,
                l = n._cachedMeta.iScale;
              if (l && e === l.axis && "r" !== e && o && r.length) {
                let t = l._reversePixels ? s.A : s.B;
                if (!a) return t(r, e, i);
                if (n._sharedOptions) {
                  let s = r[0],
                    a = "function" == typeof s.getRange && s.getRange(e);
                  if (a) {
                    let s = t(r, e, i - a),
                      n = t(r, e, i + a);
                    return { lo: s.lo, hi: n.hi };
                  }
                }
              }
              return { lo: 0, hi: r.length - 1 };
            })(r[t], e, o, n);
          for (let t = h; t <= d; ++t) {
            let e = l[t];
            e.skip || a(e, i, t);
          }
        }
      }
      function V(t, e, i, a, n) {
        let r = [];
        return (
          (n || t.isPointInArea(e)) &&
            I(
              t,
              i,
              e,
              function (i, o, l) {
                (n || (0, s.C)(i, t.chartArea, 0)) &&
                  i.inRange(e.x, e.y, a) &&
                  r.push({ element: i, datasetIndex: o, index: l });
              },
              !0
            ),
          r
        );
      }
      function B(t, e, i, a, n, r) {
        let o;
        return r || t.isPointInArea(e)
          ? "r" !== i || a
            ? (function (t, e, i, s, a, n) {
                let r = [],
                  o = (function (t) {
                    let e = -1 !== t.indexOf("x"),
                      i = -1 !== t.indexOf("y");
                    return function (t, s) {
                      let a = e ? Math.abs(t.x - s.x) : 0,
                        n = i ? Math.abs(t.y - s.y) : 0;
                      return Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2));
                    };
                  })(i),
                  l = Number.POSITIVE_INFINITY;
                return (
                  I(t, i, e, function (i, h, d) {
                    let c = i.inRange(e.x, e.y, a);
                    if (s && !c) return;
                    let u = i.getCenterPoint(a),
                      g = !!n || t.isPointInArea(u);
                    if (!g && !c) return;
                    let p = o(e, u);
                    p < l
                      ? ((r = [{ element: i, datasetIndex: h, index: d }]),
                        (l = p))
                      : p === l &&
                        r.push({ element: i, datasetIndex: h, index: d });
                  }),
                  r
                );
              })(t, e, i, a, n, r)
            : ((o = []),
              I(t, i, e, function (t, i, a) {
                let { startAngle: r, endAngle: l } = t.getProps(
                    ["startAngle", "endAngle"],
                    n
                  ),
                  { angle: h } = (0, s.D)(t, { x: e.x, y: e.y });
                (0, s.p)(h, r, l) &&
                  o.push({ element: t, datasetIndex: i, index: a });
              }),
              o)
          : [];
      }
      function N(t, e, i, s, a) {
        let n = [],
          r = "x" === i ? "inXRange" : "inYRange",
          o = !1;
        return (I(t, i, e, (t, s, l) => {
          t[r](e[i], a) &&
            (n.push({ element: t, datasetIndex: s, index: l }),
            (o = o || t.inRange(e.x, e.y, a)));
        }),
        s && !o)
          ? []
          : n;
      }
      var H = {
        evaluateInteractionItems: I,
        modes: {
          index(t, e, i, a) {
            let n = (0, s.z)(e, t),
              r = i.axis || "x",
              o = i.includeInvisible || !1,
              l = i.intersect ? V(t, n, r, a, o) : B(t, n, r, !1, a, o),
              h = [];
            return l.length
              ? (t.getSortedVisibleDatasetMetas().forEach((t) => {
                  let e = l[0].index,
                    i = t.data[e];
                  i &&
                    !i.skip &&
                    h.push({ element: i, datasetIndex: t.index, index: e });
                }),
                h)
              : [];
          },
          dataset(t, e, i, a) {
            let n = (0, s.z)(e, t),
              r = i.axis || "xy",
              o = i.includeInvisible || !1,
              l = i.intersect ? V(t, n, r, a, o) : B(t, n, r, !1, a, o);
            if (l.length > 0) {
              let e = l[0].datasetIndex,
                i = t.getDatasetMeta(e).data;
              l = [];
              for (let t = 0; t < i.length; ++t)
                l.push({ element: i[t], datasetIndex: e, index: t });
            }
            return l;
          },
          point(t, e, i, a) {
            let n = (0, s.z)(e, t),
              r = i.axis || "xy",
              o = i.includeInvisible || !1;
            return V(t, n, r, a, o);
          },
          nearest(t, e, i, a) {
            let n = (0, s.z)(e, t),
              r = i.axis || "xy",
              o = i.includeInvisible || !1;
            return B(t, n, r, i.intersect, a, o);
          },
          x(t, e, i, a) {
            let n = (0, s.z)(e, t);
            return N(t, n, "x", i.intersect, a);
          },
          y(t, e, i, a) {
            let n = (0, s.z)(e, t);
            return N(t, n, "y", i.intersect, a);
          },
        },
      };
      let W = ["left", "top", "right", "bottom"];
      function j(t, e) {
        return t.filter((t) => t.pos === e);
      }
      function $(t, e) {
        return t.filter((t) => -1 === W.indexOf(t.pos) && t.box.axis === e);
      }
      function U(t, e) {
        return t.sort((t, i) => {
          let s = e ? i : t,
            a = e ? t : i;
          return s.weight === a.weight
            ? s.index - a.index
            : s.weight - a.weight;
        });
      }
      function Y(t, e, i, s) {
        return Math.max(t[i], e[i]) + Math.max(t[s], e[s]);
      }
      function Q(t, e) {
        (t.top = Math.max(t.top, e.top)),
          (t.left = Math.max(t.left, e.left)),
          (t.bottom = Math.max(t.bottom, e.bottom)),
          (t.right = Math.max(t.right, e.right));
      }
      function X(t, e, i, a) {
        let n, r, o, l, h, d;
        let c = [];
        for (n = 0, r = t.length, h = 0; n < r; ++n) {
          (l = (o = t[n]).box).update(
            o.width || e.w,
            o.height || e.h,
            (function (t, e) {
              let i = e.maxPadding;
              return (function (t) {
                let s = { left: 0, top: 0, right: 0, bottom: 0 };
                return (
                  t.forEach((t) => {
                    s[t] = Math.max(e[t], i[t]);
                  }),
                  s
                );
              })(t ? ["left", "right"] : ["top", "bottom"]);
            })(o.horizontal, e)
          );
          let { same: r, other: u } = (function (t, e, i, a) {
            let { pos: n, box: r } = i,
              o = t.maxPadding;
            if (!(0, s.i)(n)) {
              i.size && (t[n] -= i.size);
              let e = a[i.stack] || { size: 0, count: 1 };
              (e.size = Math.max(e.size, i.horizontal ? r.height : r.width)),
                (i.size = e.size / e.count),
                (t[n] += i.size);
            }
            r.getPadding && Q(o, r.getPadding());
            let l = Math.max(0, e.outerWidth - Y(o, t, "left", "right")),
              h = Math.max(0, e.outerHeight - Y(o, t, "top", "bottom")),
              d = l !== t.w,
              c = h !== t.h;
            return (
              (t.w = l),
              (t.h = h),
              i.horizontal ? { same: d, other: c } : { same: c, other: d }
            );
          })(e, i, o, a);
          (h |= r && c.length), (d = d || u), l.fullSize || c.push(o);
        }
        return (h && X(c, e, i, a)) || d;
      }
      function G(t, e, i, s, a) {
        (t.top = i),
          (t.left = e),
          (t.right = e + s),
          (t.bottom = i + a),
          (t.width = s),
          (t.height = a);
      }
      function q(t, e, i, a) {
        let n = i.padding,
          { x: r, y: o } = e;
        for (let l of t) {
          let t = l.box,
            h = a[l.stack] || { count: 1, placed: 0, weight: 1 },
            d = l.stackWeight / h.weight || 1;
          if (l.horizontal) {
            let a = e.w * d,
              r = h.size || t.height;
            (0, s.h)(h.start) && (o = h.start),
              t.fullSize
                ? G(t, n.left, o, i.outerWidth - n.right - n.left, r)
                : G(t, e.left + h.placed, o, a, r),
              (h.start = o),
              (h.placed += a),
              (o = t.bottom);
          } else {
            let a = e.h * d,
              o = h.size || t.width;
            (0, s.h)(h.start) && (r = h.start),
              t.fullSize
                ? G(t, r, n.top, o, i.outerHeight - n.bottom - n.top)
                : G(t, r, e.top + h.placed, o, a),
              (h.start = r),
              (h.placed += a),
              (r = t.right);
          }
        }
        (e.x = r), (e.y = o);
      }
      var K = {
        addBox(t, e) {
          t.boxes || (t.boxes = []),
            (e.fullSize = e.fullSize || !1),
            (e.position = e.position || "top"),
            (e.weight = e.weight || 0),
            (e._layers =
              e._layers ||
              function () {
                return [
                  {
                    z: 0,
                    draw(t) {
                      e.draw(t);
                    },
                  },
                ];
              }),
            t.boxes.push(e);
        },
        removeBox(t, e) {
          let i = t.boxes ? t.boxes.indexOf(e) : -1;
          -1 !== i && t.boxes.splice(i, 1);
        },
        configure(t, e, i) {
          (e.fullSize = i.fullSize),
            (e.position = i.position),
            (e.weight = i.weight);
        },
        update(t, e, i, a) {
          if (!t) return;
          let n = (0, s.E)(t.options.layout.padding),
            r = Math.max(e - n.width, 0),
            o = Math.max(i - n.height, 0),
            l = (function (t) {
              let e = (function (t) {
                  let e, i, s, a, n, r;
                  let o = [];
                  for (e = 0, i = (t || []).length; e < i; ++e)
                    (s = t[e]),
                      ({
                        position: a,
                        options: { stack: n, stackWeight: r = 1 },
                      } = s),
                      o.push({
                        index: e,
                        box: s,
                        pos: a,
                        horizontal: s.isHorizontal(),
                        weight: s.weight,
                        stack: n && a + n,
                        stackWeight: r,
                      });
                  return o;
                })(t),
                i = U(
                  e.filter((t) => t.box.fullSize),
                  !0
                ),
                s = U(j(e, "left"), !0),
                a = U(j(e, "right")),
                n = U(j(e, "top"), !0),
                r = U(j(e, "bottom")),
                o = $(e, "x"),
                l = $(e, "y");
              return {
                fullSize: i,
                leftAndTop: s.concat(n),
                rightAndBottom: a.concat(l).concat(r).concat(o),
                chartArea: j(e, "chartArea"),
                vertical: s.concat(a).concat(l),
                horizontal: n.concat(r).concat(o),
              };
            })(t.boxes),
            h = l.vertical,
            d = l.horizontal;
          (0, s.F)(t.boxes, (t) => {
            "function" == typeof t.beforeLayout && t.beforeLayout();
          });
          let c =
              h.reduce(
                (t, e) =>
                  e.box.options && !1 === e.box.options.display ? t : t + 1,
                0
              ) || 1,
            u = Object.freeze({
              outerWidth: e,
              outerHeight: i,
              padding: n,
              availableWidth: r,
              availableHeight: o,
              vBoxMaxWidth: r / 2 / c,
              hBoxMaxHeight: o / 2,
            }),
            g = Object.assign({}, n);
          Q(g, (0, s.E)(a));
          let p = Object.assign(
              { maxPadding: g, w: r, h: o, x: n.left, y: n.top },
              n
            ),
            f = (function (t, e) {
              let i, s, a;
              let n = (function (t) {
                  let e = {};
                  for (let i of t) {
                    let { stack: t, pos: s, stackWeight: a } = i;
                    if (!t || !W.includes(s)) continue;
                    let n =
                      e[t] ||
                      (e[t] = { count: 0, placed: 0, weight: 0, size: 0 });
                    n.count++, (n.weight += a);
                  }
                  return e;
                })(t),
                { vBoxMaxWidth: r, hBoxMaxHeight: o } = e;
              for (i = 0, s = t.length; i < s; ++i) {
                a = t[i];
                let { fullSize: s } = a.box,
                  l = n[a.stack],
                  h = l && a.stackWeight / l.weight;
                a.horizontal
                  ? ((a.width = h ? h * r : s && e.availableWidth),
                    (a.height = o))
                  : ((a.width = r),
                    (a.height = h ? h * o : s && e.availableHeight));
              }
              return n;
            })(h.concat(d), u);
          X(l.fullSize, p, u, f),
            X(h, p, u, f),
            X(d, p, u, f) && X(h, p, u, f),
            (function (t) {
              let e = t.maxPadding;
              function i(i) {
                let s = Math.max(e[i] - t[i], 0);
                return (t[i] += s), s;
              }
              (t.y += i("top")), (t.x += i("left")), i("right"), i("bottom");
            })(p),
            q(l.leftAndTop, p, u, f),
            (p.x += p.w),
            (p.y += p.h),
            q(l.rightAndBottom, p, u, f),
            (t.chartArea = {
              left: p.left,
              top: p.top,
              right: p.left + p.w,
              bottom: p.top + p.h,
              height: p.h,
              width: p.w,
            }),
            (0, s.F)(l.chartArea, (e) => {
              let i = e.box;
              Object.assign(i, t.chartArea),
                i.update(p.w, p.h, { left: 0, top: 0, right: 0, bottom: 0 });
            });
        },
      };
      class J {
        acquireContext(t, e) {}
        releaseContext(t) {
          return !1;
        }
        addEventListener(t, e, i) {}
        removeEventListener(t, e, i) {}
        getDevicePixelRatio() {
          return 1;
        }
        getMaximumSize(t, e, i, s) {
          return (
            (e = Math.max(0, e || t.width)),
            (i = i || t.height),
            { width: e, height: Math.max(0, s ? Math.floor(e / s) : i) }
          );
        }
        isAttached(t) {
          return !0;
        }
        updateConfig(t) {}
      }
      class Z extends J {
        acquireContext(t) {
          return (t && t.getContext && t.getContext("2d")) || null;
        }
        updateConfig(t) {
          t.options.animation = !1;
        }
      }
      let tt = "$chartjs",
        te = {
          touchstart: "mousedown",
          touchmove: "mousemove",
          touchend: "mouseup",
          pointerenter: "mouseenter",
          pointerdown: "mousedown",
          pointermove: "mousemove",
          pointerup: "mouseup",
          pointerleave: "mouseout",
          pointerout: "mouseout",
        },
        ti = (t) => null === t || "" === t,
        ts = !!s.K && { passive: !0 };
      function ta(t, e, i) {
        t.canvas.removeEventListener(e, i, ts);
      }
      function tn(t, e) {
        for (let i of t) if (i === e || i.contains(e)) return !0;
      }
      function tr(t, e, i) {
        let s = t.canvas,
          a = new MutationObserver((t) => {
            let e = !1;
            for (let i of t)
              e = (e = e || tn(i.addedNodes, s)) && !tn(i.removedNodes, s);
            e && i();
          });
        return a.observe(document, { childList: !0, subtree: !0 }), a;
      }
      function to(t, e, i) {
        let s = t.canvas,
          a = new MutationObserver((t) => {
            let e = !1;
            for (let i of t)
              e = (e = e || tn(i.removedNodes, s)) && !tn(i.addedNodes, s);
            e && i();
          });
        return a.observe(document, { childList: !0, subtree: !0 }), a;
      }
      let tl = new Map(),
        th = 0;
      function td() {
        let t = window.devicePixelRatio;
        t !== th &&
          ((th = t),
          tl.forEach((e, i) => {
            i.currentDevicePixelRatio !== t && e();
          }));
      }
      function tc(t, e, i) {
        let a = t.canvas,
          n = a && (0, s.I)(a);
        if (!n) return;
        let r = (0, s.L)((t, e) => {
            let s = n.clientWidth;
            i(t, e), s < n.clientWidth && i();
          }, window),
          o = new ResizeObserver((t) => {
            let e = t[0],
              i = e.contentRect.width,
              s = e.contentRect.height;
            (0 !== i || 0 !== s) && r(i, s);
          });
        return (
          o.observe(n),
          tl.size || window.addEventListener("resize", td),
          tl.set(t, r),
          o
        );
      }
      function tu(t, e, i) {
        i && i.disconnect(),
          "resize" === e &&
            (tl.delete(t), tl.size || window.removeEventListener("resize", td));
      }
      function tg(t, e, i) {
        let a = t.canvas,
          n = (0, s.L)((e) => {
            null !== t.ctx &&
              i(
                (function (t, e) {
                  let i = te[t.type] || t.type,
                    { x: a, y: n } = (0, s.z)(t, e);
                  return {
                    type: i,
                    chart: e,
                    native: t,
                    x: void 0 !== a ? a : null,
                    y: void 0 !== n ? n : null,
                  };
                })(e, t)
              );
          }, t);
        return (
          !(function (t, e, i) {
            t.addEventListener(e, i, ts);
          })(a, e, n),
          n
        );
      }
      class tp extends J {
        acquireContext(t, e) {
          let i = t && t.getContext && t.getContext("2d");
          return i && i.canvas === t
            ? (!(function (t, e) {
                let i = t.style,
                  a = t.getAttribute("height"),
                  n = t.getAttribute("width");
                if (
                  ((t[tt] = {
                    initial: {
                      height: a,
                      width: n,
                      style: {
                        display: i.display,
                        height: i.height,
                        width: i.width,
                      },
                    },
                  }),
                  (i.display = i.display || "block"),
                  (i.boxSizing = i.boxSizing || "border-box"),
                  ti(n))
                ) {
                  let e = (0, s.J)(t, "width");
                  void 0 !== e && (t.width = e);
                }
                if (ti(a)) {
                  if ("" === t.style.height) t.height = t.width / (e || 2);
                  else {
                    let e = (0, s.J)(t, "height");
                    void 0 !== e && (t.height = e);
                  }
                }
              })(t, e),
              i)
            : null;
        }
        releaseContext(t) {
          let e = t.canvas;
          if (!e[tt]) return !1;
          let i = e[tt].initial;
          ["height", "width"].forEach((t) => {
            let a = i[t];
            (0, s.k)(a) ? e.removeAttribute(t) : e.setAttribute(t, a);
          });
          let a = i.style || {};
          return (
            Object.keys(a).forEach((t) => {
              e.style[t] = a[t];
            }),
            (e.width = e.width),
            delete e[tt],
            !0
          );
        }
        addEventListener(t, e, i) {
          this.removeEventListener(t, e);
          let s = t.$proxies || (t.$proxies = {});
          s[e] = ({ attach: tr, detach: to, resize: tc }[e] || tg)(t, e, i);
        }
        removeEventListener(t, e) {
          let i = t.$proxies || (t.$proxies = {}),
            s = i[e];
          s &&
            (({ attach: tu, detach: tu, resize: tu }[e] || ta)(t, e, s),
            (i[e] = void 0));
        }
        getDevicePixelRatio() {
          return window.devicePixelRatio;
        }
        getMaximumSize(t, e, i, a) {
          return (0, s.G)(t, e, i, a);
        }
        isAttached(t) {
          let e = (0, s.I)(t);
          return !!(e && e.isConnected);
        }
      }
      class tf {
        static defaults = {};
        static defaultRoutes = void 0;
        x;
        y;
        active = !1;
        options;
        $animations;
        tooltipPosition(t) {
          let { x: e, y: i } = this.getProps(["x", "y"], t);
          return { x: e, y: i };
        }
        hasValue() {
          return (0, s.x)(this.x) && (0, s.x)(this.y);
        }
        getProps(t, e) {
          let i = this.$animations;
          if (!e || !i) return this;
          let s = {};
          return (
            t.forEach((t) => {
              s[t] = i[t] && i[t].active() ? i[t]._to : this[t];
            }),
            s
          );
        }
      }
      function tm(t, e, i, a, n) {
        let r, o, l;
        let h = (0, s.v)(a, 0),
          d = Math.min((0, s.v)(n, t.length), t.length),
          c = 0;
        for (
          i = Math.ceil(i), n && (i = (r = n - a) / Math.floor(r / i)), l = h;
          l < 0;

        )
          l = Math.round(h + ++c * i);
        for (o = Math.max(h, 0); o < d; o++)
          o === l && (e.push(t[o]), (l = Math.round(h + ++c * i)));
      }
      let tx = (t) => ("left" === t ? "right" : "right" === t ? "left" : t),
        tb = (t, e, i) => ("top" === e || "left" === e ? t[e] + i : t[e] - i),
        t_ = (t, e) => Math.min(e || t, t);
      function tv(t, e) {
        let i = [],
          s = t.length / e,
          a = t.length,
          n = 0;
        for (; n < a; n += s) i.push(t[Math.floor(n)]);
        return i;
      }
      function ty(t) {
        return t.drawTicks ? t.tickLength : 0;
      }
      function tM(t, e) {
        if (!t.display) return 0;
        let i = (0, s.a0)(t.font, e),
          a = (0, s.E)(t.padding),
          n = (0, s.b)(t.text) ? t.text.length : 1;
        return n * i.lineHeight + a.height;
      }
      class tw extends tf {
        constructor(t) {
          super(),
            (this.id = t.id),
            (this.type = t.type),
            (this.options = void 0),
            (this.ctx = t.ctx),
            (this.chart = t.chart),
            (this.top = void 0),
            (this.bottom = void 0),
            (this.left = void 0),
            (this.right = void 0),
            (this.width = void 0),
            (this.height = void 0),
            (this._margins = { left: 0, right: 0, top: 0, bottom: 0 }),
            (this.maxWidth = void 0),
            (this.maxHeight = void 0),
            (this.paddingTop = void 0),
            (this.paddingBottom = void 0),
            (this.paddingLeft = void 0),
            (this.paddingRight = void 0),
            (this.axis = void 0),
            (this.labelRotation = void 0),
            (this.min = void 0),
            (this.max = void 0),
            (this._range = void 0),
            (this.ticks = []),
            (this._gridLineItems = null),
            (this._labelItems = null),
            (this._labelSizes = null),
            (this._length = 0),
            (this._maxLength = 0),
            (this._longestTextCache = {}),
            (this._startPixel = void 0),
            (this._endPixel = void 0),
            (this._reversePixels = !1),
            (this._userMax = void 0),
            (this._userMin = void 0),
            (this._suggestedMax = void 0),
            (this._suggestedMin = void 0),
            (this._ticksLength = 0),
            (this._borderValue = 0),
            (this._cache = {}),
            (this._dataLimitsCached = !1),
            (this.$context = void 0);
        }
        init(t) {
          (this.options = t.setContext(this.getContext())),
            (this.axis = t.axis),
            (this._userMin = this.parse(t.min)),
            (this._userMax = this.parse(t.max)),
            (this._suggestedMin = this.parse(t.suggestedMin)),
            (this._suggestedMax = this.parse(t.suggestedMax));
        }
        parse(t, e) {
          return t;
        }
        getUserBounds() {
          let {
            _userMin: t,
            _userMax: e,
            _suggestedMin: i,
            _suggestedMax: a,
          } = this;
          return (
            (t = (0, s.O)(t, Number.POSITIVE_INFINITY)),
            (e = (0, s.O)(e, Number.NEGATIVE_INFINITY)),
            (i = (0, s.O)(i, Number.POSITIVE_INFINITY)),
            (a = (0, s.O)(a, Number.NEGATIVE_INFINITY)),
            {
              min: (0, s.O)(t, i),
              max: (0, s.O)(e, a),
              minDefined: (0, s.g)(t),
              maxDefined: (0, s.g)(e),
            }
          );
        }
        getMinMax(t) {
          let e,
            {
              min: i,
              max: a,
              minDefined: n,
              maxDefined: r,
            } = this.getUserBounds();
          if (n && r) return { min: i, max: a };
          let o = this.getMatchingVisibleMetas();
          for (let s = 0, l = o.length; s < l; ++s)
            (e = o[s].controller.getMinMax(this, t)),
              n || (i = Math.min(i, e.min)),
              r || (a = Math.max(a, e.max));
          return (
            (i = r && i > a ? a : i),
            (a = n && i > a ? i : a),
            {
              min: (0, s.O)(i, (0, s.O)(a, i)),
              max: (0, s.O)(a, (0, s.O)(i, a)),
            }
          );
        }
        getPadding() {
          return {
            left: this.paddingLeft || 0,
            top: this.paddingTop || 0,
            right: this.paddingRight || 0,
            bottom: this.paddingBottom || 0,
          };
        }
        getTicks() {
          return this.ticks;
        }
        getLabels() {
          let t = this.chart.data;
          return (
            this.options.labels ||
            (this.isHorizontal() ? t.xLabels : t.yLabels) ||
            t.labels ||
            []
          );
        }
        getLabelItems(t = this.chart.chartArea) {
          let e =
            this._labelItems || (this._labelItems = this._computeLabelItems(t));
          return e;
        }
        beforeLayout() {
          (this._cache = {}), (this._dataLimitsCached = !1);
        }
        beforeUpdate() {
          (0, s.Q)(this.options.beforeUpdate, [this]);
        }
        update(t, e, i) {
          let { beginAtZero: a, grace: n, ticks: r } = this.options,
            o = r.sampleSize;
          this.beforeUpdate(),
            (this.maxWidth = t),
            (this.maxHeight = e),
            (this._margins = i =
              Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, i)),
            (this.ticks = null),
            (this._labelSizes = null),
            (this._gridLineItems = null),
            (this._labelItems = null),
            this.beforeSetDimensions(),
            this.setDimensions(),
            this.afterSetDimensions(),
            (this._maxLength = this.isHorizontal()
              ? this.width + i.left + i.right
              : this.height + i.top + i.bottom),
            this._dataLimitsCached ||
              (this.beforeDataLimits(),
              this.determineDataLimits(),
              this.afterDataLimits(),
              (this._range = (0, s.R)(this, n, a)),
              (this._dataLimitsCached = !0)),
            this.beforeBuildTicks(),
            (this.ticks = this.buildTicks() || []),
            this.afterBuildTicks();
          let l = o < this.ticks.length;
          this._convertTicksToLabels(l ? tv(this.ticks, o) : this.ticks),
            this.configure(),
            this.beforeCalculateLabelRotation(),
            this.calculateLabelRotation(),
            this.afterCalculateLabelRotation(),
            r.display &&
              (r.autoSkip || "auto" === r.source) &&
              ((this.ticks = (function (t, e) {
                let i = t.options.ticks,
                  a = (function (t) {
                    let e = t.options.offset,
                      i = t._tickSize(),
                      s = t._length / i + (e ? 0 : 1),
                      a = t._maxLength / i;
                    return Math.floor(Math.min(s, a));
                  })(t),
                  n = Math.min(i.maxTicksLimit || a, a),
                  r = i.major.enabled
                    ? (function (t) {
                        let e, i;
                        let s = [];
                        for (e = 0, i = t.length; e < i; e++)
                          t[e].major && s.push(e);
                        return s;
                      })(e)
                    : [],
                  o = r.length,
                  l = r[0],
                  h = r[o - 1],
                  d = [];
                if (o > n)
                  return (
                    (function (t, e, i, s) {
                      let a,
                        n = 0,
                        r = i[0];
                      for (a = 0, s = Math.ceil(s); a < t.length; a++)
                        a === r && (e.push(t[a]), (r = i[++n * s]));
                    })(e, d, r, o / n),
                    d
                  );
                let c = (function (t, e, i) {
                  let a = (function (t) {
                      let e, i;
                      let s = t.length;
                      if (s < 2) return !1;
                      for (i = t[0], e = 1; e < s; ++e)
                        if (t[e] - t[e - 1] !== i) return !1;
                      return i;
                    })(t),
                    n = e.length / i;
                  if (!a) return Math.max(n, 1);
                  let r = (0, s.N)(a);
                  for (let t = 0, e = r.length - 1; t < e; t++) {
                    let e = r[t];
                    if (e > n) return e;
                  }
                  return Math.max(n, 1);
                })(r, e, n);
                if (o > 0) {
                  let t, i;
                  let a = o > 1 ? Math.round((h - l) / (o - 1)) : null;
                  for (
                    tm(e, d, c, (0, s.k)(a) ? 0 : l - a, l), t = 0, i = o - 1;
                    t < i;
                    t++
                  )
                    tm(e, d, c, r[t], r[t + 1]);
                  return tm(e, d, c, h, (0, s.k)(a) ? e.length : h + a), d;
                }
                return tm(e, d, c), d;
              })(this, this.ticks)),
              (this._labelSizes = null),
              this.afterAutoSkip()),
            l && this._convertTicksToLabels(this.ticks),
            this.beforeFit(),
            this.fit(),
            this.afterFit(),
            this.afterUpdate();
        }
        configure() {
          let t,
            e,
            i = this.options.reverse;
          this.isHorizontal()
            ? ((t = this.left), (e = this.right))
            : ((t = this.top), (e = this.bottom), (i = !i)),
            (this._startPixel = t),
            (this._endPixel = e),
            (this._reversePixels = i),
            (this._length = e - t),
            (this._alignToPixels = this.options.alignToPixels);
        }
        afterUpdate() {
          (0, s.Q)(this.options.afterUpdate, [this]);
        }
        beforeSetDimensions() {
          (0, s.Q)(this.options.beforeSetDimensions, [this]);
        }
        setDimensions() {
          this.isHorizontal()
            ? ((this.width = this.maxWidth),
              (this.left = 0),
              (this.right = this.width))
            : ((this.height = this.maxHeight),
              (this.top = 0),
              (this.bottom = this.height)),
            (this.paddingLeft = 0),
            (this.paddingTop = 0),
            (this.paddingRight = 0),
            (this.paddingBottom = 0);
        }
        afterSetDimensions() {
          (0, s.Q)(this.options.afterSetDimensions, [this]);
        }
        _callHooks(t) {
          this.chart.notifyPlugins(t, this.getContext()),
            (0, s.Q)(this.options[t], [this]);
        }
        beforeDataLimits() {
          this._callHooks("beforeDataLimits");
        }
        determineDataLimits() {}
        afterDataLimits() {
          this._callHooks("afterDataLimits");
        }
        beforeBuildTicks() {
          this._callHooks("beforeBuildTicks");
        }
        buildTicks() {
          return [];
        }
        afterBuildTicks() {
          this._callHooks("afterBuildTicks");
        }
        beforeTickToLabelConversion() {
          (0, s.Q)(this.options.beforeTickToLabelConversion, [this]);
        }
        generateTickLabels(t) {
          let e, i, a;
          let n = this.options.ticks;
          for (e = 0, i = t.length; e < i; e++)
            (a = t[e]).label = (0, s.Q)(n.callback, [a.value, e, t], this);
        }
        afterTickToLabelConversion() {
          (0, s.Q)(this.options.afterTickToLabelConversion, [this]);
        }
        beforeCalculateLabelRotation() {
          (0, s.Q)(this.options.beforeCalculateLabelRotation, [this]);
        }
        calculateLabelRotation() {
          let t, e, i;
          let a = this.options,
            n = a.ticks,
            r = t_(this.ticks.length, a.ticks.maxTicksLimit),
            o = n.minRotation || 0,
            l = n.maxRotation,
            h = o;
          if (
            !this._isVisible() ||
            !n.display ||
            o >= l ||
            r <= 1 ||
            !this.isHorizontal()
          ) {
            this.labelRotation = o;
            return;
          }
          let d = this._getLabelSizes(),
            c = d.widest.width,
            u = d.highest.height,
            g = (0, s.S)(this.chart.width - c, 0, this.maxWidth);
          c + 6 > (t = a.offset ? this.maxWidth / r : g / (r - 1)) &&
            ((t = g / (r - (a.offset ? 0.5 : 1))),
            (e =
              this.maxHeight -
              ty(a.grid) -
              n.padding -
              tM(a.title, this.chart.options.font)),
            (i = Math.sqrt(c * c + u * u)),
            (h = Math.max(
              o,
              Math.min(
                l,
                (h = (0, s.U)(
                  Math.min(
                    Math.asin((0, s.S)((d.highest.height + 6) / t, -1, 1)),
                    Math.asin((0, s.S)(e / i, -1, 1)) -
                      Math.asin((0, s.S)(u / i, -1, 1))
                  )
                ))
              )
            ))),
            (this.labelRotation = h);
        }
        afterCalculateLabelRotation() {
          (0, s.Q)(this.options.afterCalculateLabelRotation, [this]);
        }
        afterAutoSkip() {}
        beforeFit() {
          (0, s.Q)(this.options.beforeFit, [this]);
        }
        fit() {
          let t = { width: 0, height: 0 },
            {
              chart: e,
              options: { ticks: i, title: a, grid: n },
            } = this,
            r = this._isVisible(),
            o = this.isHorizontal();
          if (r) {
            let r = tM(a, e.options.font);
            if (
              (o
                ? ((t.width = this.maxWidth), (t.height = ty(n) + r))
                : ((t.height = this.maxHeight), (t.width = ty(n) + r)),
              i.display && this.ticks.length)
            ) {
              let {
                  first: e,
                  last: a,
                  widest: n,
                  highest: r,
                } = this._getLabelSizes(),
                l = 2 * i.padding,
                h = (0, s.t)(this.labelRotation),
                d = Math.cos(h),
                c = Math.sin(h);
              if (o) {
                let e = i.mirror ? 0 : c * n.width + d * r.height;
                t.height = Math.min(this.maxHeight, t.height + e + l);
              } else {
                let e = i.mirror ? 0 : d * n.width + c * r.height;
                t.width = Math.min(this.maxWidth, t.width + e + l);
              }
              this._calculatePadding(e, a, c, d);
            }
          }
          this._handleMargins(),
            o
              ? ((this.width = this._length =
                  e.width - this._margins.left - this._margins.right),
                (this.height = t.height))
              : ((this.width = t.width),
                (this.height = this._length =
                  e.height - this._margins.top - this._margins.bottom));
        }
        _calculatePadding(t, e, i, s) {
          let {
              ticks: { align: a, padding: n },
              position: r,
            } = this.options,
            o = 0 !== this.labelRotation,
            l = "top" !== r && "x" === this.axis;
          if (this.isHorizontal()) {
            let r = this.getPixelForTick(0) - this.left,
              h = this.right - this.getPixelForTick(this.ticks.length - 1),
              d = 0,
              c = 0;
            o
              ? l
                ? ((d = s * t.width), (c = i * e.height))
                : ((d = i * t.height), (c = s * e.width))
              : "start" === a
              ? (c = e.width)
              : "end" === a
              ? (d = t.width)
              : "inner" !== a && ((d = t.width / 2), (c = e.width / 2)),
              (this.paddingLeft = Math.max(
                ((d - r + n) * this.width) / (this.width - r),
                0
              )),
              (this.paddingRight = Math.max(
                ((c - h + n) * this.width) / (this.width - h),
                0
              ));
          } else {
            let i = e.height / 2,
              s = t.height / 2;
            "start" === a
              ? ((i = 0), (s = t.height))
              : "end" === a && ((i = e.height), (s = 0)),
              (this.paddingTop = i + n),
              (this.paddingBottom = s + n);
          }
        }
        _handleMargins() {
          this._margins &&
            ((this._margins.left = Math.max(
              this.paddingLeft,
              this._margins.left
            )),
            (this._margins.top = Math.max(this.paddingTop, this._margins.top)),
            (this._margins.right = Math.max(
              this.paddingRight,
              this._margins.right
            )),
            (this._margins.bottom = Math.max(
              this.paddingBottom,
              this._margins.bottom
            )));
        }
        afterFit() {
          (0, s.Q)(this.options.afterFit, [this]);
        }
        isHorizontal() {
          let { axis: t, position: e } = this.options;
          return "top" === e || "bottom" === e || "x" === t;
        }
        isFullSize() {
          return this.options.fullSize;
        }
        _convertTicksToLabels(t) {
          let e, i;
          for (
            this.beforeTickToLabelConversion(),
              this.generateTickLabels(t),
              e = 0,
              i = t.length;
            e < i;
            e++
          )
            (0, s.k)(t[e].label) && (t.splice(e, 1), i--, e--);
          this.afterTickToLabelConversion();
        }
        _getLabelSizes() {
          let t = this._labelSizes;
          if (!t) {
            let e = this.options.ticks.sampleSize,
              i = this.ticks;
            e < i.length && (i = tv(i, e)),
              (this._labelSizes = t =
                this._computeLabelSizes(
                  i,
                  i.length,
                  this.options.ticks.maxTicksLimit
                ));
          }
          return t;
        }
        _computeLabelSizes(t, e, i) {
          let a, n, r, o, l, h, d, c, u, g, p;
          let { ctx: f, _longestTextCache: m } = this,
            x = [],
            b = [],
            _ = Math.floor(e / t_(e, i)),
            v = 0,
            y = 0;
          for (a = 0; a < e; a += _) {
            if (
              ((o = t[a].label),
              (l = this._resolveTickFontOptions(a)),
              (f.font = h = l.string),
              (d = m[h] = m[h] || { data: {}, gc: [] }),
              (c = l.lineHeight),
              (u = g = 0),
              (0, s.k)(o) || (0, s.b)(o))
            ) {
              if ((0, s.b)(o))
                for (n = 0, r = o.length; n < r; ++n)
                  (p = o[n]),
                    (0, s.k)(p) ||
                      (0, s.b)(p) ||
                      ((u = (0, s.V)(f, d.data, d.gc, u, p)), (g += c));
            } else (u = (0, s.V)(f, d.data, d.gc, u, o)), (g = c);
            x.push(u), b.push(g), (v = Math.max(u, v)), (y = Math.max(g, y));
          }
          (0, s.F)(m, (t) => {
            let i;
            let s = t.gc,
              a = s.length / 2;
            if (a > e) {
              for (i = 0; i < a; ++i) delete t.data[s[i]];
              s.splice(0, a);
            }
          });
          let M = x.indexOf(v),
            w = b.indexOf(y),
            k = (t) => ({ width: x[t] || 0, height: b[t] || 0 });
          return {
            first: k(0),
            last: k(e - 1),
            widest: k(M),
            highest: k(w),
            widths: x,
            heights: b,
          };
        }
        getLabelForValue(t) {
          return t;
        }
        getPixelForValue(t, e) {
          return NaN;
        }
        getValueForPixel(t) {}
        getPixelForTick(t) {
          let e = this.ticks;
          return t < 0 || t > e.length - 1
            ? null
            : this.getPixelForValue(e[t].value);
        }
        getPixelForDecimal(t) {
          this._reversePixels && (t = 1 - t);
          let e = this._startPixel + t * this._length;
          return (0, s.W)(this._alignToPixels ? (0, s.X)(this.chart, e, 0) : e);
        }
        getDecimalForPixel(t) {
          let e = (t - this._startPixel) / this._length;
          return this._reversePixels ? 1 - e : e;
        }
        getBasePixel() {
          return this.getPixelForValue(this.getBaseValue());
        }
        getBaseValue() {
          let { min: t, max: e } = this;
          return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
        }
        getContext(t) {
          var e, i;
          let a = this.ticks || [];
          if (t >= 0 && t < a.length) {
            let i = a[t];
            return (
              i.$context ||
              (i.$context =
                ((e = this.getContext()),
                (0, s.j)(e, { tick: i, index: t, type: "tick" })))
            );
          }
          return (
            this.$context ||
            (this.$context =
              ((i = this.chart.getContext()),
              (0, s.j)(i, { scale: this, type: "scale" })))
          );
        }
        _tickSize() {
          let t = this.options.ticks,
            e = (0, s.t)(this.labelRotation),
            i = Math.abs(Math.cos(e)),
            a = Math.abs(Math.sin(e)),
            n = this._getLabelSizes(),
            r = t.autoSkipPadding || 0,
            o = n ? n.widest.width + r : 0,
            l = n ? n.highest.height + r : 0;
          return this.isHorizontal()
            ? l * i > o * a
              ? o / i
              : l / a
            : l * a < o * i
            ? l / i
            : o / a;
        }
        _isVisible() {
          let t = this.options.display;
          return "auto" !== t ? !!t : this.getMatchingVisibleMetas().length > 0;
        }
        _computeGridLineItems(t) {
          let e, i, a, n, r, o, l, h, d, c, u, g;
          let p = this.axis,
            f = this.chart,
            m = this.options,
            { grid: x, position: b, border: _ } = m,
            v = x.offset,
            y = this.isHorizontal(),
            M = this.ticks,
            w = M.length + (v ? 1 : 0),
            k = ty(x),
            D = [],
            P = _.setContext(this.getContext()),
            S = P.display ? P.width : 0,
            C = S / 2,
            L = function (t) {
              return (0, s.X)(f, t, S);
            };
          if ("top" === b)
            (e = L(this.bottom)),
              (o = this.bottom - k),
              (h = e - C),
              (c = L(t.top) + C),
              (g = t.bottom);
          else if ("bottom" === b)
            (e = L(this.top)),
              (c = t.top),
              (g = L(t.bottom) - C),
              (o = e + C),
              (h = this.top + k);
          else if ("left" === b)
            (e = L(this.right)),
              (r = this.right - k),
              (l = e - C),
              (d = L(t.left) + C),
              (u = t.right);
          else if ("right" === b)
            (e = L(this.left)),
              (d = t.left),
              (u = L(t.right) - C),
              (r = e + C),
              (l = this.left + k);
          else if ("x" === p) {
            if ("center" === b) e = L((t.top + t.bottom) / 2 + 0.5);
            else if ((0, s.i)(b)) {
              let t = Object.keys(b)[0],
                i = b[t];
              e = L(this.chart.scales[t].getPixelForValue(i));
            }
            (c = t.top), (g = t.bottom), (h = (o = e + C) + k);
          } else if ("y" === p) {
            if ("center" === b) e = L((t.left + t.right) / 2);
            else if ((0, s.i)(b)) {
              let t = Object.keys(b)[0],
                i = b[t];
              e = L(this.chart.scales[t].getPixelForValue(i));
            }
            (l = (r = e - C) - k), (d = t.left), (u = t.right);
          }
          let O = (0, s.v)(m.ticks.maxTicksLimit, w),
            E = Math.max(1, Math.ceil(w / O));
          for (i = 0; i < w; i += E) {
            let t = this.getContext(i),
              e = x.setContext(t),
              p = _.setContext(t),
              m = e.lineWidth,
              b = e.color,
              M = p.dash || [],
              w = p.dashOffset,
              k = e.tickWidth,
              P = e.tickColor,
              S = e.tickBorderDash || [],
              C = e.tickBorderDashOffset;
            void 0 !==
              (a = (function (t, e, i) {
                let s;
                let a = t.ticks.length,
                  n = Math.min(e, a - 1),
                  r = t._startPixel,
                  o = t._endPixel,
                  l = t.getPixelForTick(n);
                if (
                  !i ||
                  ((s =
                    1 === a
                      ? Math.max(l - r, o - l)
                      : 0 === e
                      ? (t.getPixelForTick(1) - l) / 2
                      : (l - t.getPixelForTick(n - 1)) / 2),
                  !((l += n < e ? s : -s) < r - 1e-6) && !(l > o + 1e-6))
                )
                  return l;
              })(this, i, v)) &&
              ((n = (0, s.X)(f, a, m)),
              y ? (r = l = d = u = n) : (o = h = c = g = n),
              D.push({
                tx1: r,
                ty1: o,
                tx2: l,
                ty2: h,
                x1: d,
                y1: c,
                x2: u,
                y2: g,
                width: m,
                color: b,
                borderDash: M,
                borderDashOffset: w,
                tickWidth: k,
                tickColor: P,
                tickBorderDash: S,
                tickBorderDashOffset: C,
              }));
          }
          return (this._ticksLength = w), (this._borderValue = e), D;
        }
        _computeLabelItems(t) {
          let e, i, a, n, r, o, l, h, d, c, u;
          let g = this.axis,
            p = this.options,
            { position: f, ticks: m } = p,
            x = this.isHorizontal(),
            b = this.ticks,
            { align: _, crossAlign: v, padding: y, mirror: M } = m,
            w = ty(p.grid),
            k = w + y,
            D = M ? -y : k,
            P = -(0, s.t)(this.labelRotation),
            S = [],
            C = "middle";
          if ("top" === f)
            (r = this.bottom - D), (o = this._getXAxisLabelAlignment());
          else if ("bottom" === f)
            (r = this.top + D), (o = this._getXAxisLabelAlignment());
          else if ("left" === f) {
            let t = this._getYAxisLabelAlignment(w);
            (o = t.textAlign), (n = t.x);
          } else if ("right" === f) {
            let t = this._getYAxisLabelAlignment(w);
            (o = t.textAlign), (n = t.x);
          } else if ("x" === g) {
            if ("center" === f) r = (t.top + t.bottom) / 2 + k;
            else if ((0, s.i)(f)) {
              let t = Object.keys(f)[0],
                e = f[t];
              r = this.chart.scales[t].getPixelForValue(e) + k;
            }
            o = this._getXAxisLabelAlignment();
          } else if ("y" === g) {
            if ("center" === f) n = (t.left + t.right) / 2 - k;
            else if ((0, s.i)(f)) {
              let t = Object.keys(f)[0],
                e = f[t];
              n = this.chart.scales[t].getPixelForValue(e);
            }
            o = this._getYAxisLabelAlignment(w).textAlign;
          }
          "y" === g &&
            ("start" === _ ? (C = "top") : "end" === _ && (C = "bottom"));
          let L = this._getLabelSizes();
          for (e = 0, i = b.length; e < i; ++e) {
            let t;
            a = b[e].label;
            let g = m.setContext(this.getContext(e));
            (l = this.getPixelForTick(e) + m.labelOffset),
              (d = (h = this._resolveTickFontOptions(e)).lineHeight),
              (c = (0, s.b)(a) ? a.length : 1);
            let p = c / 2,
              _ = g.color,
              y = g.textStrokeColor,
              w = g.textStrokeWidth,
              k = o;
            if (
              (x
                ? ((n = l),
                  "inner" === o &&
                    (k =
                      e === i - 1
                        ? this.options.reverse
                          ? "left"
                          : "right"
                        : 0 === e
                        ? this.options.reverse
                          ? "right"
                          : "left"
                        : "center"),
                  (u =
                    "top" === f
                      ? "near" === v || 0 !== P
                        ? -c * d + d / 2
                        : "center" === v
                        ? -L.highest.height / 2 - p * d + d
                        : -L.highest.height + d / 2
                      : "near" === v || 0 !== P
                      ? d / 2
                      : "center" === v
                      ? L.highest.height / 2 - p * d
                      : L.highest.height - c * d),
                  M && (u *= -1),
                  0 === P ||
                    g.showLabelBackdrop ||
                    (n += (d / 2) * Math.sin(P)))
                : ((r = l), (u = ((1 - c) * d) / 2)),
              g.showLabelBackdrop)
            ) {
              let i = (0, s.E)(g.backdropPadding),
                a = L.heights[e],
                n = L.widths[e],
                r = u - i.top,
                l = 0 - i.left;
              switch (C) {
                case "middle":
                  r -= a / 2;
                  break;
                case "bottom":
                  r -= a;
              }
              switch (o) {
                case "center":
                  l -= n / 2;
                  break;
                case "right":
                  l -= n;
              }
              t = {
                left: l,
                top: r,
                width: n + i.width,
                height: a + i.height,
                color: g.backdropColor,
              };
            }
            S.push({
              label: a,
              font: h,
              textOffset: u,
              options: {
                rotation: P,
                color: _,
                strokeColor: y,
                strokeWidth: w,
                textAlign: k,
                textBaseline: C,
                translation: [n, r],
                backdrop: t,
              },
            });
          }
          return S;
        }
        _getXAxisLabelAlignment() {
          let { position: t, ticks: e } = this.options,
            i = -(0, s.t)(this.labelRotation);
          if (i) return "top" === t ? "left" : "right";
          let a = "center";
          return (
            "start" === e.align
              ? (a = "left")
              : "end" === e.align
              ? (a = "right")
              : "inner" === e.align && (a = "inner"),
            a
          );
        }
        _getYAxisLabelAlignment(t) {
          let e, i;
          let {
              position: s,
              ticks: { crossAlign: a, mirror: n, padding: r },
            } = this.options,
            o = this._getLabelSizes(),
            l = t + r,
            h = o.widest.width;
          return (
            "left" === s
              ? n
                ? ((i = this.right + r),
                  "near" === a
                    ? (e = "left")
                    : "center" === a
                    ? ((e = "center"), (i += h / 2))
                    : ((e = "right"), (i += h)))
                : ((i = this.right - l),
                  "near" === a
                    ? (e = "right")
                    : "center" === a
                    ? ((e = "center"), (i -= h / 2))
                    : ((e = "left"), (i = this.left)))
              : "right" === s
              ? n
                ? ((i = this.left + r),
                  "near" === a
                    ? (e = "right")
                    : "center" === a
                    ? ((e = "center"), (i -= h / 2))
                    : ((e = "left"), (i -= h)))
                : ((i = this.left + l),
                  "near" === a
                    ? (e = "left")
                    : "center" === a
                    ? ((e = "center"), (i += h / 2))
                    : ((e = "right"), (i = this.right)))
              : (e = "right"),
            { textAlign: e, x: i }
          );
        }
        _computeLabelArea() {
          if (this.options.ticks.mirror) return;
          let t = this.chart,
            e = this.options.position;
          return "left" === e || "right" === e
            ? { top: 0, left: this.left, bottom: t.height, right: this.right }
            : "top" === e || "bottom" === e
            ? { top: this.top, left: 0, bottom: this.bottom, right: t.width }
            : void 0;
        }
        drawBackground() {
          let {
            ctx: t,
            options: { backgroundColor: e },
            left: i,
            top: s,
            width: a,
            height: n,
          } = this;
          e &&
            (t.save(), (t.fillStyle = e), t.fillRect(i, s, a, n), t.restore());
        }
        getLineWidthForValue(t) {
          let e = this.options.grid;
          if (!this._isVisible() || !e.display) return 0;
          let i = this.ticks,
            s = i.findIndex((e) => e.value === t);
          if (s >= 0) {
            let t = e.setContext(this.getContext(s));
            return t.lineWidth;
          }
          return 0;
        }
        drawGrid(t) {
          let e, i;
          let s = this.options.grid,
            a = this.ctx,
            n =
              this._gridLineItems ||
              (this._gridLineItems = this._computeGridLineItems(t)),
            r = (t, e, i) => {
              i.width &&
                i.color &&
                (a.save(),
                (a.lineWidth = i.width),
                (a.strokeStyle = i.color),
                a.setLineDash(i.borderDash || []),
                (a.lineDashOffset = i.borderDashOffset),
                a.beginPath(),
                a.moveTo(t.x, t.y),
                a.lineTo(e.x, e.y),
                a.stroke(),
                a.restore());
            };
          if (s.display)
            for (e = 0, i = n.length; e < i; ++e) {
              let t = n[e];
              s.drawOnChartArea &&
                r({ x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 }, t),
                s.drawTicks &&
                  r(
                    { x: t.tx1, y: t.ty1 },
                    { x: t.tx2, y: t.ty2 },
                    {
                      color: t.tickColor,
                      width: t.tickWidth,
                      borderDash: t.tickBorderDash,
                      borderDashOffset: t.tickBorderDashOffset,
                    }
                  );
            }
        }
        drawBorder() {
          let t, e, i, a;
          let {
              chart: n,
              ctx: r,
              options: { border: o, grid: l },
            } = this,
            h = o.setContext(this.getContext()),
            d = o.display ? h.width : 0;
          if (!d) return;
          let c = l.setContext(this.getContext(0)).lineWidth,
            u = this._borderValue;
          this.isHorizontal()
            ? ((t = (0, s.X)(n, this.left, d) - d / 2),
              (e = (0, s.X)(n, this.right, c) + c / 2),
              (i = a = u))
            : ((i = (0, s.X)(n, this.top, d) - d / 2),
              (a = (0, s.X)(n, this.bottom, c) + c / 2),
              (t = e = u)),
            r.save(),
            (r.lineWidth = h.width),
            (r.strokeStyle = h.color),
            r.beginPath(),
            r.moveTo(t, i),
            r.lineTo(e, a),
            r.stroke(),
            r.restore();
        }
        drawLabels(t) {
          let e = this.options.ticks;
          if (!e.display) return;
          let i = this.ctx,
            a = this._computeLabelArea();
          a && (0, s.Y)(i, a);
          let n = this.getLabelItems(t);
          for (let t of n) {
            let e = t.options,
              a = t.font,
              n = t.label,
              r = t.textOffset;
            (0, s.Z)(i, n, 0, r, a, e);
          }
          a && (0, s.$)(i);
        }
        drawTitle() {
          let t;
          let {
            ctx: e,
            options: { position: i, title: a, reverse: n },
          } = this;
          if (!a.display) return;
          let r = (0, s.a0)(a.font),
            o = (0, s.E)(a.padding),
            l = a.align,
            h = r.lineHeight / 2;
          "bottom" === i || "center" === i || (0, s.i)(i)
            ? ((h += o.bottom),
              (0, s.b)(a.text) && (h += r.lineHeight * (a.text.length - 1)))
            : (h += o.top);
          let {
            titleX: d,
            titleY: c,
            maxWidth: u,
            rotation: g,
          } = (function (t, e, i, a) {
            let n, r, o;
            let { top: l, left: h, bottom: d, right: c, chart: u } = t,
              { chartArea: g, scales: p } = u,
              f = 0,
              m = d - l,
              x = c - h;
            if (t.isHorizontal()) {
              if (((r = (0, s.a2)(a, h, c)), (0, s.i)(i))) {
                let t = Object.keys(i)[0],
                  s = i[t];
                o = p[t].getPixelForValue(s) + m - e;
              } else
                o =
                  "center" === i ? (g.bottom + g.top) / 2 + m - e : tb(t, i, e);
              n = c - h;
            } else {
              if ((0, s.i)(i)) {
                let t = Object.keys(i)[0],
                  s = i[t];
                r = p[t].getPixelForValue(s) - x + e;
              } else
                r =
                  "center" === i ? (g.left + g.right) / 2 - x + e : tb(t, i, e);
              (o = (0, s.a2)(a, d, l)), (f = "left" === i ? -s.H : s.H);
            }
            return { titleX: r, titleY: o, maxWidth: n, rotation: f };
          })(this, h, i, l);
          (0, s.Z)(e, a.text, 0, 0, r, {
            color: a.color,
            maxWidth: u,
            rotation: g,
            textAlign:
              ((t = (0, s.a1)(l)),
              ((n && "right" !== i) || (!n && "right" === i)) && (t = tx(t)),
              t),
            textBaseline: "middle",
            translation: [d, c],
          });
        }
        draw(t) {
          this._isVisible() &&
            (this.drawBackground(),
            this.drawGrid(t),
            this.drawBorder(),
            this.drawTitle(),
            this.drawLabels(t));
        }
        _layers() {
          let t = this.options,
            e = (t.ticks && t.ticks.z) || 0,
            i = (0, s.v)(t.grid && t.grid.z, -1),
            a = (0, s.v)(t.border && t.border.z, 0);
          return this._isVisible() && this.draw === tw.prototype.draw
            ? [
                {
                  z: i,
                  draw: (t) => {
                    this.drawBackground(), this.drawGrid(t), this.drawTitle();
                  },
                },
                {
                  z: a,
                  draw: () => {
                    this.drawBorder();
                  },
                },
                {
                  z: e,
                  draw: (t) => {
                    this.drawLabels(t);
                  },
                },
              ]
            : [
                {
                  z: e,
                  draw: (t) => {
                    this.draw(t);
                  },
                },
              ];
        }
        getMatchingVisibleMetas(t) {
          let e, i;
          let s = this.chart.getSortedVisibleDatasetMetas(),
            a = this.axis + "AxisID",
            n = [];
          for (e = 0, i = s.length; e < i; ++e) {
            let i = s[e];
            i[a] !== this.id || (t && i.type !== t) || n.push(i);
          }
          return n;
        }
        _resolveTickFontOptions(t) {
          let e = this.options.ticks.setContext(this.getContext(t));
          return (0, s.a0)(e.font);
        }
        _maxDigits() {
          let t = this._resolveTickFontOptions(0).lineHeight;
          return (this.isHorizontal() ? this.width : this.height) / t;
        }
      }
      class tk {
        constructor(t, e, i) {
          (this.type = t),
            (this.scope = e),
            (this.override = i),
            (this.items = Object.create(null));
        }
        isForType(t) {
          return Object.prototype.isPrototypeOf.call(
            this.type.prototype,
            t.prototype
          );
        }
        register(t) {
          let e;
          let i = Object.getPrototypeOf(t);
          "id" in i && "defaults" in i && (e = this.register(i));
          let a = this.items,
            n = t.id,
            r = this.scope + "." + n;
          if (!n) throw Error("class does not have id: " + t);
          return (
            n in a ||
              ((a[n] = t),
              (function (t, e, i) {
                let a = (0, s.a4)(Object.create(null), [
                  i ? s.d.get(i) : {},
                  s.d.get(e),
                  t.defaults,
                ]);
                s.d.set(e, a),
                  t.defaultRoutes &&
                    (function (t, e) {
                      Object.keys(e).forEach((i) => {
                        let a = i.split("."),
                          n = a.pop(),
                          r = [t].concat(a).join("."),
                          o = e[i].split("."),
                          l = o.pop(),
                          h = o.join(".");
                        s.d.route(r, n, h, l);
                      });
                    })(e, t.defaultRoutes),
                  t.descriptors && s.d.describe(e, t.descriptors);
              })(t, r, e),
              this.override && s.d.override(t.id, t.overrides)),
            r
          );
        }
        get(t) {
          return this.items[t];
        }
        unregister(t) {
          let e = this.items,
            i = t.id,
            a = this.scope;
          i in e && delete e[i],
            a &&
              i in s.d[a] &&
              (delete s.d[a][i], this.override && delete s.a3[i]);
        }
      }
      var tD = new (class {
        constructor() {
          (this.controllers = new tk(v, "datasets", !0)),
            (this.elements = new tk(tf, "elements")),
            (this.plugins = new tk(Object, "plugins")),
            (this.scales = new tk(tw, "scales")),
            (this._typedRegistries = [
              this.controllers,
              this.scales,
              this.elements,
            ]);
        }
        add(...t) {
          this._each("register", t);
        }
        remove(...t) {
          this._each("unregister", t);
        }
        addControllers(...t) {
          this._each("register", t, this.controllers);
        }
        addElements(...t) {
          this._each("register", t, this.elements);
        }
        addPlugins(...t) {
          this._each("register", t, this.plugins);
        }
        addScales(...t) {
          this._each("register", t, this.scales);
        }
        getController(t) {
          return this._get(t, this.controllers, "controller");
        }
        getElement(t) {
          return this._get(t, this.elements, "element");
        }
        getPlugin(t) {
          return this._get(t, this.plugins, "plugin");
        }
        getScale(t) {
          return this._get(t, this.scales, "scale");
        }
        removeControllers(...t) {
          this._each("unregister", t, this.controllers);
        }
        removeElements(...t) {
          this._each("unregister", t, this.elements);
        }
        removePlugins(...t) {
          this._each("unregister", t, this.plugins);
        }
        removeScales(...t) {
          this._each("unregister", t, this.scales);
        }
        _each(t, e, i) {
          [...e].forEach((e) => {
            let a = i || this._getRegistryForType(e);
            i || a.isForType(e) || (a === this.plugins && e.id)
              ? this._exec(t, a, e)
              : (0, s.F)(e, (e) => {
                  let s = i || this._getRegistryForType(e);
                  this._exec(t, s, e);
                });
          });
        }
        _exec(t, e, i) {
          let a = (0, s.a5)(t);
          (0, s.Q)(i["before" + a], [], i),
            e[t](i),
            (0, s.Q)(i["after" + a], [], i);
        }
        _getRegistryForType(t) {
          for (let e = 0; e < this._typedRegistries.length; e++) {
            let i = this._typedRegistries[e];
            if (i.isForType(t)) return i;
          }
          return this.plugins;
        }
        _get(t, e, i) {
          let s = e.get(t);
          if (void 0 === s)
            throw Error('"' + t + '" is not a registered ' + i + ".");
          return s;
        }
      })();
      class tP {
        constructor() {
          this._init = [];
        }
        notify(t, e, i, s) {
          "beforeInit" === e &&
            ((this._init = this._createDescriptors(t, !0)),
            this._notify(this._init, t, "install"));
          let a = s ? this._descriptors(t).filter(s) : this._descriptors(t),
            n = this._notify(a, t, e, i);
          return (
            "afterDestroy" === e &&
              (this._notify(a, t, "stop"),
              this._notify(this._init, t, "uninstall")),
            n
          );
        }
        _notify(t, e, i, a) {
          for (let n of ((a = a || {}), t)) {
            let t = n.plugin,
              r = t[i],
              o = [e, a, n.options];
            if (!1 === (0, s.Q)(r, o, t) && a.cancelable) return !1;
          }
          return !0;
        }
        invalidate() {
          (0, s.k)(this._cache) ||
            ((this._oldCache = this._cache), (this._cache = void 0));
        }
        _descriptors(t) {
          if (this._cache) return this._cache;
          let e = (this._cache = this._createDescriptors(t));
          return this._notifyStateChanges(t), e;
        }
        _createDescriptors(t, e) {
          let i = t && t.config,
            a = (0, s.v)(i.options && i.options.plugins, {}),
            n = (function (t) {
              let e = {},
                i = [],
                s = Object.keys(tD.plugins.items);
              for (let t = 0; t < s.length; t++) i.push(tD.getPlugin(s[t]));
              let a = t.plugins || [];
              for (let t = 0; t < a.length; t++) {
                let s = a[t];
                -1 === i.indexOf(s) && (i.push(s), (e[s.id] = !0));
              }
              return { plugins: i, localIds: e };
            })(i);
          return !1 !== a || e
            ? (function (t, { plugins: e, localIds: i }, s, a) {
                let n = [],
                  r = t.getContext();
                for (let l of e) {
                  var o;
                  let e = l.id,
                    h =
                      ((o = s[e]), a || !1 !== o ? (!0 === o ? {} : o) : null);
                  null !== h &&
                    n.push({
                      plugin: l,
                      options: (function (t, { plugin: e, local: i }, s, a) {
                        let n = t.pluginScopeKeys(e),
                          r = t.getOptionScopes(s, n);
                        return (
                          i && e.defaults && r.push(e.defaults),
                          t.createResolver(r, a, [""], {
                            scriptable: !1,
                            indexable: !1,
                            allKeys: !0,
                          })
                        );
                      })(t.config, { plugin: l, local: i[e] }, h, r),
                    });
                }
                return n;
              })(t, n, a, e)
            : [];
        }
        _notifyStateChanges(t) {
          let e = this._oldCache || [],
            i = this._cache,
            s = (t, e) =>
              t.filter((t) => !e.some((e) => t.plugin.id === e.plugin.id));
          this._notify(s(e, i), t, "stop"), this._notify(s(i, e), t, "start");
        }
      }
      function tS(t, e) {
        let i = s.d.datasets[t] || {},
          a = (e.datasets || {})[t] || {};
        return a.indexAxis || e.indexAxis || i.indexAxis || "x";
      }
      function tC(t) {
        if ("x" === t || "y" === t || "r" === t) return t;
      }
      function tL(t, ...e) {
        if (tC(t)) return t;
        for (let s of e) {
          var i;
          let e =
            s.axis ||
            ("top" === (i = s.position) || "bottom" === i
              ? "x"
              : "left" === i || "right" === i
              ? "y"
              : void 0) ||
            (t.length > 1 && tC(t[0].toLowerCase()));
          if (e) return e;
        }
        throw Error(
          `Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`
        );
      }
      function tO(t, e, i) {
        if (i[e + "AxisID"] === t) return { axis: e };
      }
      function tE(t) {
        let e = t.options || (t.options = {});
        (e.plugins = (0, s.v)(e.plugins, {})),
          (e.scales = (function (t, e) {
            let i = s.a3[t.type] || { scales: {} },
              a = e.scales || {},
              n = tS(t.type, e),
              r = Object.create(null);
            return (
              Object.keys(a).forEach((e) => {
                let o = a[e];
                if (!(0, s.i)(o))
                  return console.error(
                    `Invalid scale configuration for scale: ${e}`
                  );
                if (o._proxy)
                  return console.warn(
                    `Ignoring resolver passed as options for scale: ${e}`
                  );
                let l = tL(
                    e,
                    o,
                    (function (t, e) {
                      if (e.data && e.data.datasets) {
                        let i = e.data.datasets.filter(
                          (e) => e.xAxisID === t || e.yAxisID === t
                        );
                        if (i.length)
                          return tO(t, "x", i[0]) || tO(t, "y", i[0]);
                      }
                      return {};
                    })(e, t),
                    s.d.scales[o.type]
                  ),
                  h = i.scales || {};
                r[e] = (0, s.ab)(Object.create(null), [
                  { axis: l },
                  o,
                  h[l],
                  h[l === n ? "_index_" : "_value_"],
                ]);
              }),
              t.data.datasets.forEach((i) => {
                let n = i.type || t.type,
                  o = i.indexAxis || tS(n, e),
                  l = s.a3[n] || {},
                  h = l.scales || {};
                Object.keys(h).forEach((t) => {
                  let e;
                  let n =
                      ((e = t),
                      "_index_" === t
                        ? (e = o)
                        : "_value_" === t && (e = "x" === o ? "y" : "x"),
                      e),
                    l = i[n + "AxisID"] || n;
                  (r[l] = r[l] || Object.create(null)),
                    (0, s.ab)(r[l], [{ axis: n }, a[l], h[t]]);
                });
              }),
              Object.keys(r).forEach((t) => {
                let e = r[t];
                (0, s.ab)(e, [s.d.scales[e.type], s.d.scale]);
              }),
              r
            );
          })(t, e));
      }
      function tA(t) {
        return (
          ((t = t || {}).datasets = t.datasets || []),
          (t.labels = t.labels || []),
          t
        );
      }
      let tT = new Map(),
        tF = new Set();
      function tz(t, e) {
        let i = tT.get(t);
        return i || ((i = e()), tT.set(t, i), tF.add(i)), i;
      }
      let tR = (t, e, i) => {
        let a = (0, s.f)(e, i);
        void 0 !== a && t.add(a);
      };
      class tI {
        constructor(t) {
          var e;
          (this._config = (((e = (e = t) || {}).data = tA(e.data)), tE(e), e)),
            (this._scopeCache = new Map()),
            (this._resolverCache = new Map());
        }
        get platform() {
          return this._config.platform;
        }
        get type() {
          return this._config.type;
        }
        set type(t) {
          this._config.type = t;
        }
        get data() {
          return this._config.data;
        }
        set data(t) {
          this._config.data = tA(t);
        }
        get options() {
          return this._config.options;
        }
        set options(t) {
          this._config.options = t;
        }
        get plugins() {
          return this._config.plugins;
        }
        update() {
          let t = this._config;
          this.clearCache(), tE(t);
        }
        clearCache() {
          this._scopeCache.clear(), this._resolverCache.clear();
        }
        datasetScopeKeys(t) {
          return tz(t, () => [[`datasets.${t}`, ""]]);
        }
        datasetAnimationScopeKeys(t, e) {
          return tz(`${t}.transition.${e}`, () => [
            [`datasets.${t}.transitions.${e}`, `transitions.${e}`],
            [`datasets.${t}`, ""],
          ]);
        }
        datasetElementScopeKeys(t, e) {
          return tz(`${t}-${e}`, () => [
            [
              `datasets.${t}.elements.${e}`,
              `datasets.${t}`,
              `elements.${e}`,
              "",
            ],
          ]);
        }
        pluginScopeKeys(t) {
          let e = t.id,
            i = this.type;
          return tz(`${i}-plugin-${e}`, () => [
            [`plugins.${e}`, ...(t.additionalOptionScopes || [])],
          ]);
        }
        _cachedScopes(t, e) {
          let i = this._scopeCache,
            s = i.get(t);
          return (!s || e) && ((s = new Map()), i.set(t, s)), s;
        }
        getOptionScopes(t, e, i) {
          let { options: a, type: n } = this,
            r = this._cachedScopes(t, i),
            o = r.get(e);
          if (o) return o;
          let l = new Set();
          e.forEach((e) => {
            t && (l.add(t), e.forEach((e) => tR(l, t, e))),
              e.forEach((t) => tR(l, a, t)),
              e.forEach((t) => tR(l, s.a3[n] || {}, t)),
              e.forEach((t) => tR(l, s.d, t)),
              e.forEach((t) => tR(l, s.a6, t));
          });
          let h = Array.from(l);
          return (
            0 === h.length && h.push(Object.create(null)),
            tF.has(e) && r.set(e, h),
            h
          );
        }
        chartOptionScopes() {
          let { options: t, type: e } = this;
          return [
            t,
            s.a3[e] || {},
            s.d.datasets[e] || {},
            { type: e },
            s.d,
            s.a6,
          ];
        }
        resolveNamedOptions(t, e, i, a = [""]) {
          let n = { $shared: !0 },
            { resolver: r, subPrefixes: o } = tV(this._resolverCache, t, a),
            l = r;
          if (
            (function (t, e) {
              let { isScriptable: i, isIndexable: a } = (0, s.aa)(t);
              for (let n of e) {
                let e = i(n),
                  r = a(n),
                  o = (r || e) && t[n];
                if ((e && ((0, s.a7)(o) || tB(o))) || (r && (0, s.b)(o)))
                  return !0;
              }
              return !1;
            })(r, e)
          ) {
            (n.$shared = !1), (i = (0, s.a7)(i) ? i() : i);
            let e = this.createResolver(t, i, o);
            l = (0, s.a8)(r, i, e);
          }
          for (let t of e) n[t] = l[t];
          return n;
        }
        createResolver(t, e, i = [""], a) {
          let { resolver: n } = tV(this._resolverCache, t, i);
          return (0, s.i)(e) ? (0, s.a8)(n, e, void 0, a) : n;
        }
      }
      function tV(t, e, i) {
        let a = t.get(e);
        a || ((a = new Map()), t.set(e, a));
        let n = i.join(),
          r = a.get(n);
        if (!r) {
          let t = (0, s.a9)(e, i);
          (r = {
            resolver: t,
            subPrefixes: i.filter((t) => !t.toLowerCase().includes("hover")),
          }),
            a.set(n, r);
        }
        return r;
      }
      let tB = (t) =>
          (0, s.i)(t) &&
          Object.getOwnPropertyNames(t).reduce(
            (e, i) => e || (0, s.a7)(t[i]),
            !1
          ),
        tN = ["top", "bottom", "left", "right", "chartArea"];
      function tH(t, e) {
        return (
          "top" === t || "bottom" === t || (-1 === tN.indexOf(t) && "x" === e)
        );
      }
      function tW(t, e) {
        return function (i, s) {
          return i[t] === s[t] ? i[e] - s[e] : i[t] - s[t];
        };
      }
      function tj(t) {
        let e = t.chart,
          i = e.options.animation;
        e.notifyPlugins("afterRender"), (0, s.Q)(i && i.onComplete, [t], e);
      }
      function t$(t) {
        let e = t.chart,
          i = e.options.animation;
        (0, s.Q)(i && i.onProgress, [t], e);
      }
      function tU(t) {
        return (
          (0, s.M)() && "string" == typeof t
            ? (t = document.getElementById(t))
            : t && t.length && (t = t[0]),
          t && t.canvas && (t = t.canvas),
          t
        );
      }
      let tY = {},
        tQ = (t) => {
          let e = tU(t);
          return Object.values(tY)
            .filter((t) => t.canvas === e)
            .pop();
        };
      class tX {
        static defaults = s.d;
        static instances = tY;
        static overrides = s.a3;
        static registry = tD;
        static version = "4.3.0";
        static getChart = tQ;
        static register(...t) {
          tD.add(...t), tG();
        }
        static unregister(...t) {
          tD.remove(...t), tG();
        }
        constructor(t, e) {
          let i = (this.config = new tI(e)),
            n = tU(t),
            r = tQ(n);
          if (r)
            throw Error(
              "Canvas is already in use. Chart with ID '" +
                r.id +
                "' must be destroyed before the canvas with ID '" +
                r.canvas.id +
                "' can be reused."
            );
          let o = i.createResolver(i.chartOptionScopes(), this.getContext());
          (this.platform = new (i.platform ||
            (!(0, s.M)() ||
            ("undefined" != typeof OffscreenCanvas &&
              n instanceof OffscreenCanvas)
              ? Z
              : tp))()),
            this.platform.updateConfig(i);
          let l = this.platform.acquireContext(n, o.aspectRatio),
            h = l && l.canvas,
            d = h && h.height,
            c = h && h.width;
          if (
            ((this.id = (0, s.ac)()),
            (this.ctx = l),
            (this.canvas = h),
            (this.width = c),
            (this.height = d),
            (this._options = o),
            (this._aspectRatio = this.aspectRatio),
            (this._layers = []),
            (this._metasets = []),
            (this._stacks = void 0),
            (this.boxes = []),
            (this.currentDevicePixelRatio = void 0),
            (this.chartArea = void 0),
            (this._active = []),
            (this._lastEvent = void 0),
            (this._listeners = {}),
            (this._responsiveListeners = void 0),
            (this._sortedMetasets = []),
            (this.scales = {}),
            (this._plugins = new tP()),
            (this.$proxies = {}),
            (this._hiddenIndices = {}),
            (this.attached = !1),
            (this._animationsDisabled = void 0),
            (this.$context = void 0),
            (this._doResize = (0, s.ad)(
              (t) => this.update(t),
              o.resizeDelay || 0
            )),
            (this._dataChanges = []),
            (tY[this.id] = this),
            !l || !h)
          ) {
            console.error(
              "Failed to create chart: can't acquire context from the given item"
            );
            return;
          }
          a.listen(this, "complete", tj),
            a.listen(this, "progress", t$),
            this._initialize(),
            this.attached && this.update();
        }
        get aspectRatio() {
          let {
            options: { aspectRatio: t, maintainAspectRatio: e },
            width: i,
            height: a,
            _aspectRatio: n,
          } = this;
          return (0, s.k)(t) ? (e && n ? n : a ? i / a : null) : t;
        }
        get data() {
          return this.config.data;
        }
        set data(t) {
          this.config.data = t;
        }
        get options() {
          return this._options;
        }
        set options(t) {
          this.config.options = t;
        }
        get registry() {
          return tD;
        }
        _initialize() {
          return (
            this.notifyPlugins("beforeInit"),
            this.options.responsive
              ? this.resize()
              : (0, s.ae)(this, this.options.devicePixelRatio),
            this.bindEvents(),
            this.notifyPlugins("afterInit"),
            this
          );
        }
        clear() {
          return (0, s.af)(this.canvas, this.ctx), this;
        }
        stop() {
          return a.stop(this), this;
        }
        resize(t, e) {
          a.running(this)
            ? (this._resizeBeforeDraw = { width: t, height: e })
            : this._resize(t, e);
        }
        _resize(t, e) {
          let i = this.options,
            a = this.canvas,
            n = i.maintainAspectRatio && this.aspectRatio,
            r = this.platform.getMaximumSize(a, t, e, n),
            o = i.devicePixelRatio || this.platform.getDevicePixelRatio(),
            l = this.width ? "resize" : "attach";
          (this.width = r.width),
            (this.height = r.height),
            (this._aspectRatio = this.aspectRatio),
            (0, s.ae)(this, o, !0) &&
              (this.notifyPlugins("resize", { size: r }),
              (0, s.Q)(i.onResize, [this, r], this),
              this.attached && this._doResize(l) && this.render());
        }
        ensureScalesHaveIDs() {
          let t = this.options,
            e = t.scales || {};
          (0, s.F)(e, (t, e) => {
            t.id = e;
          });
        }
        buildOrUpdateScales() {
          let t = this.options,
            e = t.scales,
            i = this.scales,
            a = Object.keys(i).reduce((t, e) => ((t[e] = !1), t), {}),
            n = [];
          e &&
            (n = n.concat(
              Object.keys(e).map((t) => {
                let i = e[t],
                  s = tL(t, i),
                  a = "r" === s,
                  n = "x" === s;
                return {
                  options: i,
                  dposition: a ? "chartArea" : n ? "bottom" : "left",
                  dtype: a ? "radialLinear" : n ? "category" : "linear",
                };
              })
            )),
            (0, s.F)(n, (e) => {
              let n = e.options,
                r = n.id,
                o = tL(r, n),
                l = (0, s.v)(n.type, e.dtype);
              (void 0 === n.position ||
                tH(n.position, o) !== tH(e.dposition)) &&
                (n.position = e.dposition),
                (a[r] = !0);
              let h = null;
              if (r in i && i[r].type === l) h = i[r];
              else {
                let t = tD.getScale(l);
                i[
                  (h = new t({ id: r, type: l, ctx: this.ctx, chart: this })).id
                ] = h;
              }
              h.init(n, t);
            }),
            (0, s.F)(a, (t, e) => {
              t || delete i[e];
            }),
            (0, s.F)(i, (t) => {
              K.configure(this, t, t.options), K.addBox(this, t);
            });
        }
        _updateMetasets() {
          let t = this._metasets,
            e = this.data.datasets.length,
            i = t.length;
          if ((t.sort((t, e) => t.index - e.index), i > e)) {
            for (let t = e; t < i; ++t) this._destroyDatasetMeta(t);
            t.splice(e, i - e);
          }
          this._sortedMetasets = t.slice(0).sort(tW("order", "index"));
        }
        _removeUnreferencedMetasets() {
          let {
            _metasets: t,
            data: { datasets: e },
          } = this;
          t.length > e.length && delete this._stacks,
            t.forEach((t, i) => {
              0 === e.filter((e) => e === t._dataset).length &&
                this._destroyDatasetMeta(i);
            });
        }
        buildOrUpdateControllers() {
          let t, e;
          let i = [],
            a = this.data.datasets;
          for (
            this._removeUnreferencedMetasets(), t = 0, e = a.length;
            t < e;
            t++
          ) {
            let e = a[t],
              n = this.getDatasetMeta(t),
              r = e.type || this.config.type;
            if (
              (n.type &&
                n.type !== r &&
                (this._destroyDatasetMeta(t), (n = this.getDatasetMeta(t))),
              (n.type = r),
              (n.indexAxis = e.indexAxis || tS(r, this.options)),
              (n.order = e.order || 0),
              (n.index = t),
              (n.label = "" + e.label),
              (n.visible = this.isDatasetVisible(t)),
              n.controller)
            )
              n.controller.updateIndex(t), n.controller.linkScales();
            else {
              let e = tD.getController(r),
                { datasetElementType: a, dataElementType: o } = s.d.datasets[r];
              Object.assign(e, {
                dataElementType: tD.getElement(o),
                datasetElementType: a && tD.getElement(a),
              }),
                (n.controller = new e(this, t)),
                i.push(n.controller);
            }
          }
          return this._updateMetasets(), i;
        }
        _resetElements() {
          (0, s.F)(
            this.data.datasets,
            (t, e) => {
              this.getDatasetMeta(e).controller.reset();
            },
            this
          );
        }
        reset() {
          this._resetElements(), this.notifyPlugins("reset");
        }
        update(t) {
          let e = this.config;
          e.update();
          let i = (this._options = e.createResolver(
              e.chartOptionScopes(),
              this.getContext()
            )),
            a = (this._animationsDisabled = !i.animation);
          if (
            (this._updateScales(),
            this._checkEventBindings(),
            this._updateHiddenIndices(),
            this._plugins.invalidate(),
            !1 ===
              this.notifyPlugins("beforeUpdate", { mode: t, cancelable: !0 }))
          )
            return;
          let n = this.buildOrUpdateControllers();
          this.notifyPlugins("beforeElementsUpdate");
          let r = 0;
          for (let t = 0, e = this.data.datasets.length; t < e; t++) {
            let { controller: e } = this.getDatasetMeta(t),
              i = !a && -1 === n.indexOf(e);
            e.buildOrUpdateElements(i), (r = Math.max(+e.getMaxOverflow(), r));
          }
          (r = this._minPadding = i.layout.autoPadding ? r : 0),
            this._updateLayout(r),
            a ||
              (0, s.F)(n, (t) => {
                t.reset();
              }),
            this._updateDatasets(t),
            this.notifyPlugins("afterUpdate", { mode: t }),
            this._layers.sort(tW("z", "_idx"));
          let { _active: o, _lastEvent: l } = this;
          l
            ? this._eventHandler(l, !0)
            : o.length && this._updateHoverStyles(o, o, !0),
            this.render();
        }
        _updateScales() {
          (0, s.F)(this.scales, (t) => {
            K.removeBox(this, t);
          }),
            this.ensureScalesHaveIDs(),
            this.buildOrUpdateScales();
        }
        _checkEventBindings() {
          let t = this.options,
            e = new Set(Object.keys(this._listeners)),
            i = new Set(t.events);
          ((0, s.ag)(e, i) && !!this._responsiveListeners === t.responsive) ||
            (this.unbindEvents(), this.bindEvents());
        }
        _updateHiddenIndices() {
          let { _hiddenIndices: t } = this,
            e = this._getUniformDataChanges() || [];
          for (let { method: i, start: s, count: a } of e) {
            let e = "_removeElements" === i ? -a : a;
            !(function (t, e, i) {
              let s = Object.keys(t);
              for (let a of s) {
                let s = +a;
                if (s >= e) {
                  let n = t[a];
                  delete t[a], (i > 0 || s > e) && (t[s + i] = n);
                }
              }
            })(t, s, e);
          }
        }
        _getUniformDataChanges() {
          let t = this._dataChanges;
          if (!t || !t.length) return;
          this._dataChanges = [];
          let e = this.data.datasets.length,
            i = (e) =>
              new Set(
                t
                  .filter((t) => t[0] === e)
                  .map((t, e) => e + "," + t.splice(1).join(","))
              ),
            a = i(0);
          for (let t = 1; t < e; t++) if (!(0, s.ag)(a, i(t))) return;
          return Array.from(a)
            .map((t) => t.split(","))
            .map((t) => ({ method: t[1], start: +t[2], count: +t[3] }));
        }
        _updateLayout(t) {
          if (!1 === this.notifyPlugins("beforeLayout", { cancelable: !0 }))
            return;
          K.update(this, this.width, this.height, t);
          let e = this.chartArea,
            i = e.width <= 0 || e.height <= 0;
          (this._layers = []),
            (0, s.F)(
              this.boxes,
              (t) => {
                (i && "chartArea" === t.position) ||
                  (t.configure && t.configure(),
                  this._layers.push(...t._layers()));
              },
              this
            ),
            this._layers.forEach((t, e) => {
              t._idx = e;
            }),
            this.notifyPlugins("afterLayout");
        }
        _updateDatasets(t) {
          if (
            !1 !==
            this.notifyPlugins("beforeDatasetsUpdate", {
              mode: t,
              cancelable: !0,
            })
          ) {
            for (let t = 0, e = this.data.datasets.length; t < e; ++t)
              this.getDatasetMeta(t).controller.configure();
            for (let e = 0, i = this.data.datasets.length; e < i; ++e)
              this._updateDataset(e, (0, s.a7)(t) ? t({ datasetIndex: e }) : t);
            this.notifyPlugins("afterDatasetsUpdate", { mode: t });
          }
        }
        _updateDataset(t, e) {
          let i = this.getDatasetMeta(t),
            s = { meta: i, index: t, mode: e, cancelable: !0 };
          !1 !== this.notifyPlugins("beforeDatasetUpdate", s) &&
            (i.controller._update(e),
            (s.cancelable = !1),
            this.notifyPlugins("afterDatasetUpdate", s));
        }
        render() {
          !1 !== this.notifyPlugins("beforeRender", { cancelable: !0 }) &&
            (a.has(this)
              ? this.attached && !a.running(this) && a.start(this)
              : (this.draw(), tj({ chart: this })));
        }
        draw() {
          let t;
          if (this._resizeBeforeDraw) {
            let { width: t, height: e } = this._resizeBeforeDraw;
            this._resize(t, e), (this._resizeBeforeDraw = null);
          }
          if (
            (this.clear(),
            this.width <= 0 ||
              this.height <= 0 ||
              !1 === this.notifyPlugins("beforeDraw", { cancelable: !0 }))
          )
            return;
          let e = this._layers;
          for (t = 0; t < e.length && e[t].z <= 0; ++t)
            e[t].draw(this.chartArea);
          for (this._drawDatasets(); t < e.length; ++t)
            e[t].draw(this.chartArea);
          this.notifyPlugins("afterDraw");
        }
        _getSortedDatasetMetas(t) {
          let e, i;
          let s = this._sortedMetasets,
            a = [];
          for (e = 0, i = s.length; e < i; ++e) {
            let i = s[e];
            (!t || i.visible) && a.push(i);
          }
          return a;
        }
        getSortedVisibleDatasetMetas() {
          return this._getSortedDatasetMetas(!0);
        }
        _drawDatasets() {
          if (
            !1 === this.notifyPlugins("beforeDatasetsDraw", { cancelable: !0 })
          )
            return;
          let t = this.getSortedVisibleDatasetMetas();
          for (let e = t.length - 1; e >= 0; --e) this._drawDataset(t[e]);
          this.notifyPlugins("afterDatasetsDraw");
        }
        _drawDataset(t) {
          let e = this.ctx,
            i = t._clip,
            a = !i.disabled,
            n =
              (function (t) {
                let { xScale: e, yScale: i } = t;
                if (e && i)
                  return {
                    left: e.left,
                    right: e.right,
                    top: i.top,
                    bottom: i.bottom,
                  };
              })(t) || this.chartArea,
            r = { meta: t, index: t.index, cancelable: !0 };
          !1 !== this.notifyPlugins("beforeDatasetDraw", r) &&
            (a &&
              (0, s.Y)(e, {
                left: !1 === i.left ? 0 : n.left - i.left,
                right: !1 === i.right ? this.width : n.right + i.right,
                top: !1 === i.top ? 0 : n.top - i.top,
                bottom: !1 === i.bottom ? this.height : n.bottom + i.bottom,
              }),
            t.controller.draw(),
            a && (0, s.$)(e),
            (r.cancelable = !1),
            this.notifyPlugins("afterDatasetDraw", r));
        }
        isPointInArea(t) {
          return (0, s.C)(t, this.chartArea, this._minPadding);
        }
        getElementsAtEventForMode(t, e, i, s) {
          let a = H.modes[e];
          return "function" == typeof a ? a(this, t, i, s) : [];
        }
        getDatasetMeta(t) {
          let e = this.data.datasets[t],
            i = this._metasets,
            s = i.filter((t) => t && t._dataset === e).pop();
          return (
            s ||
              ((s = {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                xAxisID: null,
                yAxisID: null,
                order: (e && e.order) || 0,
                index: t,
                _dataset: e,
                _parsed: [],
                _sorted: !1,
              }),
              i.push(s)),
            s
          );
        }
        getContext() {
          return (
            this.$context ||
            (this.$context = (0, s.j)(null, { chart: this, type: "chart" }))
          );
        }
        getVisibleDatasetCount() {
          return this.getSortedVisibleDatasetMetas().length;
        }
        isDatasetVisible(t) {
          let e = this.data.datasets[t];
          if (!e) return !1;
          let i = this.getDatasetMeta(t);
          return "boolean" == typeof i.hidden ? !i.hidden : !e.hidden;
        }
        setDatasetVisibility(t, e) {
          let i = this.getDatasetMeta(t);
          i.hidden = !e;
        }
        toggleDataVisibility(t) {
          this._hiddenIndices[t] = !this._hiddenIndices[t];
        }
        getDataVisibility(t) {
          return !this._hiddenIndices[t];
        }
        _updateVisibility(t, e, i) {
          let a = i ? "show" : "hide",
            n = this.getDatasetMeta(t),
            r = n.controller._resolveAnimations(void 0, a);
          (0, s.h)(e)
            ? ((n.data[e].hidden = !i), this.update())
            : (this.setDatasetVisibility(t, i),
              r.update(n, { visible: i }),
              this.update((e) => (e.datasetIndex === t ? a : void 0)));
        }
        hide(t, e) {
          this._updateVisibility(t, e, !1);
        }
        show(t, e) {
          this._updateVisibility(t, e, !0);
        }
        _destroyDatasetMeta(t) {
          let e = this._metasets[t];
          e && e.controller && e.controller._destroy(),
            delete this._metasets[t];
        }
        _stop() {
          let t, e;
          for (
            this.stop(), a.remove(this), t = 0, e = this.data.datasets.length;
            t < e;
            ++t
          )
            this._destroyDatasetMeta(t);
        }
        destroy() {
          this.notifyPlugins("beforeDestroy");
          let { canvas: t, ctx: e } = this;
          this._stop(),
            this.config.clearCache(),
            t &&
              (this.unbindEvents(),
              (0, s.af)(t, e),
              this.platform.releaseContext(e),
              (this.canvas = null),
              (this.ctx = null)),
            delete tY[this.id],
            this.notifyPlugins("afterDestroy");
        }
        toBase64Image(...t) {
          return this.canvas.toDataURL(...t);
        }
        bindEvents() {
          this.bindUserEvents(),
            this.options.responsive
              ? this.bindResponsiveEvents()
              : (this.attached = !0);
        }
        bindUserEvents() {
          let t = this._listeners,
            e = this.platform,
            i = (i, s) => {
              e.addEventListener(this, i, s), (t[i] = s);
            },
            a = (t, e, i) => {
              (t.offsetX = e), (t.offsetY = i), this._eventHandler(t);
            };
          (0, s.F)(this.options.events, (t) => i(t, a));
        }
        bindResponsiveEvents() {
          let t;
          this._responsiveListeners || (this._responsiveListeners = {});
          let e = this._responsiveListeners,
            i = this.platform,
            s = (t, s) => {
              i.addEventListener(this, t, s), (e[t] = s);
            },
            a = (t, s) => {
              e[t] && (i.removeEventListener(this, t, s), delete e[t]);
            },
            n = (t, e) => {
              this.canvas && this.resize(t, e);
            },
            r = () => {
              a("attach", r),
                (this.attached = !0),
                this.resize(),
                s("resize", n),
                s("detach", t);
            };
          (t = () => {
            (this.attached = !1),
              a("resize", n),
              this._stop(),
              this._resize(0, 0),
              s("attach", r);
          }),
            i.isAttached(this.canvas) ? r() : t();
        }
        unbindEvents() {
          (0, s.F)(this._listeners, (t, e) => {
            this.platform.removeEventListener(this, e, t);
          }),
            (this._listeners = {}),
            (0, s.F)(this._responsiveListeners, (t, e) => {
              this.platform.removeEventListener(this, e, t);
            }),
            (this._responsiveListeners = void 0);
        }
        updateHoverStyle(t, e, i) {
          let s, a, n;
          let r = i ? "set" : "remove";
          for (
            "dataset" === e &&
              this.getDatasetMeta(t[0].datasetIndex).controller[
                "_" + r + "DatasetHoverStyle"
              ](),
              a = 0,
              n = t.length;
            a < n;
            ++a
          ) {
            s = t[a];
            let e = s && this.getDatasetMeta(s.datasetIndex).controller;
            e && e[r + "HoverStyle"](s.element, s.datasetIndex, s.index);
          }
        }
        getActiveElements() {
          return this._active || [];
        }
        setActiveElements(t) {
          let e = this._active || [],
            i = t.map(({ datasetIndex: t, index: e }) => {
              let i = this.getDatasetMeta(t);
              if (!i) throw Error("No dataset found at index " + t);
              return { datasetIndex: t, element: i.data[e], index: e };
            }),
            a = !(0, s.ah)(i, e);
          a &&
            ((this._active = i),
            (this._lastEvent = null),
            this._updateHoverStyles(i, e));
        }
        notifyPlugins(t, e, i) {
          return this._plugins.notify(this, t, e, i);
        }
        isPluginEnabled(t) {
          return (
            1 === this._plugins._cache.filter((e) => e.plugin.id === t).length
          );
        }
        _updateHoverStyles(t, e, i) {
          let s = this.options.hover,
            a = (t, e) =>
              t.filter(
                (t) =>
                  !e.some(
                    (e) =>
                      t.datasetIndex === e.datasetIndex && t.index === e.index
                  )
              ),
            n = a(e, t),
            r = i ? t : a(t, e);
          n.length && this.updateHoverStyle(n, s.mode, !1),
            r.length && s.mode && this.updateHoverStyle(r, s.mode, !0);
        }
        _eventHandler(t, e) {
          let i = {
              event: t,
              replay: e,
              cancelable: !0,
              inChartArea: this.isPointInArea(t),
            },
            s = (e) =>
              (e.options.events || this.options.events).includes(t.native.type);
          if (!1 === this.notifyPlugins("beforeEvent", i, s)) return;
          let a = this._handleEvent(t, e, i.inChartArea);
          return (
            (i.cancelable = !1),
            this.notifyPlugins("afterEvent", i, s),
            (a || i.changed) && this.render(),
            this
          );
        }
        _handleEvent(t, e, i) {
          var a;
          let { _active: n = [], options: r } = this,
            o = this._getActiveElements(t, n, i, e),
            l = (0, s.ai)(t),
            h =
              ((a = this._lastEvent),
              i && "mouseout" !== t.type ? (l ? a : t) : null);
          i &&
            ((this._lastEvent = null),
            (0, s.Q)(r.onHover, [t, o, this], this),
            l && (0, s.Q)(r.onClick, [t, o, this], this));
          let d = !(0, s.ah)(o, n);
          return (
            (d || e) && ((this._active = o), this._updateHoverStyles(o, n, e)),
            (this._lastEvent = h),
            d
          );
        }
        _getActiveElements(t, e, i, s) {
          if ("mouseout" === t.type) return [];
          if (!i) return e;
          let a = this.options.hover;
          return this.getElementsAtEventForMode(t, a.mode, a, s);
        }
      }
      function tG() {
        return (0, s.F)(tX.instances, (t) => t._plugins.invalidate());
      }
      function tq(t, e, i, s) {
        return { x: i + t * Math.cos(e), y: s + t * Math.sin(e) };
      }
      function tK(t, e, i, a, n, r) {
        let { x: o, y: l, startAngle: h, pixelMargin: d, innerRadius: c } = e,
          u = Math.max(e.outerRadius + a + i - d, 0),
          g = c > 0 ? c + a + i + d : 0,
          p = 0,
          f = n - h;
        if (a) {
          let t = ((c > 0 ? c - a : 0) + (u > 0 ? u - a : 0)) / 2;
          p = (f - (0 !== t ? (f * t) / (t + a) : f)) / 2;
        }
        let m = Math.max(0.001, f * u - i / s.P) / u,
          x = (f - m) / 2,
          b = h + x + p,
          _ = n - x - p,
          {
            outerStart: v,
            outerEnd: y,
            innerStart: M,
            innerEnd: w,
          } = (function (t, e, i, a) {
            var n;
            let r =
                ((n = t.options.borderRadius),
                (0, s.ak)(n, [
                  "outerStart",
                  "outerEnd",
                  "innerStart",
                  "innerEnd",
                ])),
              o = (i - e) / 2,
              l = Math.min(o, (a * e) / 2),
              h = (t) =>
                (0, s.S)(t, 0, Math.min(o, ((i - Math.min(o, t)) * a) / 2));
            return {
              outerStart: h(r.outerStart),
              outerEnd: h(r.outerEnd),
              innerStart: (0, s.S)(r.innerStart, 0, l),
              innerEnd: (0, s.S)(r.innerEnd, 0, l),
            };
          })(e, g, u, _ - b),
          k = u - v,
          D = u - y,
          P = b + v / k,
          S = _ - y / D,
          C = g + M,
          L = g + w,
          O = b + M / C,
          E = _ - w / L;
        if ((t.beginPath(), r)) {
          let e = (P + S) / 2;
          if ((t.arc(o, l, u, P, e), t.arc(o, l, u, e, S), y > 0)) {
            let e = tq(D, S, o, l);
            t.arc(e.x, e.y, y, S, _ + s.H);
          }
          let i = tq(L, _, o, l);
          if ((t.lineTo(i.x, i.y), w > 0)) {
            let e = tq(L, E, o, l);
            t.arc(e.x, e.y, w, _ + s.H, E + Math.PI);
          }
          let a = (_ - w / g + (b + M / g)) / 2;
          if (
            (t.arc(o, l, g, _ - w / g, a, !0),
            t.arc(o, l, g, a, b + M / g, !0),
            M > 0)
          ) {
            let e = tq(C, O, o, l);
            t.arc(e.x, e.y, M, O + Math.PI, b - s.H);
          }
          let n = tq(k, b, o, l);
          if ((t.lineTo(n.x, n.y), v > 0)) {
            let e = tq(k, P, o, l);
            t.arc(e.x, e.y, v, b - s.H, P);
          }
        } else
          t.moveTo(o, l),
            t.lineTo(Math.cos(P) * u + o, Math.sin(P) * u + l),
            t.lineTo(Math.cos(S) * u + o, Math.sin(S) * u + l);
        t.closePath();
      }
      class tJ extends tf {
        static id = "arc";
        static defaults = {
          borderAlign: "center",
          borderColor: "#fff",
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: void 0,
          borderRadius: 0,
          borderWidth: 2,
          offset: 0,
          spacing: 0,
          angle: void 0,
          circular: !0,
        };
        static defaultRoutes = { backgroundColor: "backgroundColor" };
        static descriptors = {
          _scriptable: !0,
          _indexable: (t) => "borderDash" !== t,
        };
        circumference;
        endAngle;
        fullCircles;
        innerRadius;
        outerRadius;
        pixelMargin;
        startAngle;
        constructor(t) {
          super(),
            (this.options = void 0),
            (this.circumference = void 0),
            (this.startAngle = void 0),
            (this.endAngle = void 0),
            (this.innerRadius = void 0),
            (this.outerRadius = void 0),
            (this.pixelMargin = 0),
            (this.fullCircles = 0),
            t && Object.assign(this, t);
        }
        inRange(t, e, i) {
          let a = this.getProps(["x", "y"], i),
            { angle: n, distance: r } = (0, s.D)(a, { x: t, y: e }),
            {
              startAngle: o,
              endAngle: l,
              innerRadius: h,
              outerRadius: d,
              circumference: c,
            } = this.getProps(
              [
                "startAngle",
                "endAngle",
                "innerRadius",
                "outerRadius",
                "circumference",
              ],
              i
            ),
            u = (this.options.spacing + this.options.borderWidth) / 2,
            g = (0, s.v)(c, l - o),
            p = g >= s.T || (0, s.p)(n, o, l),
            f = (0, s.aj)(r, h + u, d + u);
          return p && f;
        }
        getCenterPoint(t) {
          let {
              x: e,
              y: i,
              startAngle: s,
              endAngle: a,
              innerRadius: n,
              outerRadius: r,
            } = this.getProps(
              [
                "x",
                "y",
                "startAngle",
                "endAngle",
                "innerRadius",
                "outerRadius",
              ],
              t
            ),
            { offset: o, spacing: l } = this.options,
            h = (s + a) / 2,
            d = (n + r + l + o) / 2;
          return { x: e + Math.cos(h) * d, y: i + Math.sin(h) * d };
        }
        tooltipPosition(t) {
          return this.getCenterPoint(t);
        }
        draw(t) {
          let { options: e, circumference: i } = this,
            a = (e.offset || 0) / 4,
            n = (e.spacing || 0) / 2,
            r = e.circular;
          if (
            ((this.pixelMargin = "inner" === e.borderAlign ? 0.33 : 0),
            (this.fullCircles = i > s.T ? Math.floor(i / s.T) : 0),
            0 === i || this.innerRadius < 0 || this.outerRadius < 0)
          )
            return;
          t.save();
          let o = (this.startAngle + this.endAngle) / 2;
          t.translate(Math.cos(o) * a, Math.sin(o) * a);
          let l = 1 - Math.sin(Math.min(s.P, i || 0)),
            h = a * l;
          (t.fillStyle = e.backgroundColor),
            (t.strokeStyle = e.borderColor),
            (function (t, e, i, a, n) {
              let { fullCircles: r, startAngle: o, circumference: l } = e,
                h = e.endAngle;
              if (r) {
                tK(t, e, i, a, h, n);
                for (let e = 0; e < r; ++e) t.fill();
                isNaN(l) || (h = o + (l % s.T || s.T));
              }
              tK(t, e, i, a, h, n), t.fill();
            })(t, this, h, n, r),
            (function (t, e, i, a, n) {
              let {
                  fullCircles: r,
                  startAngle: o,
                  circumference: l,
                  options: h,
                } = e,
                {
                  borderWidth: d,
                  borderJoinStyle: c,
                  borderDash: u,
                  borderDashOffset: g,
                } = h,
                p = "inner" === h.borderAlign;
              if (!d) return;
              t.setLineDash(u || []),
                (t.lineDashOffset = g),
                p
                  ? ((t.lineWidth = 2 * d), (t.lineJoin = c || "round"))
                  : ((t.lineWidth = d), (t.lineJoin = c || "bevel"));
              let f = e.endAngle;
              if (r) {
                tK(t, e, i, a, f, n);
                for (let e = 0; e < r; ++e) t.stroke();
                isNaN(l) || (f = o + (l % s.T || s.T));
              }
              p &&
                (function (t, e, i) {
                  let {
                      startAngle: a,
                      pixelMargin: n,
                      x: r,
                      y: o,
                      outerRadius: l,
                      innerRadius: h,
                    } = e,
                    d = n / l;
                  t.beginPath(),
                    t.arc(r, o, l, a - d, i + d),
                    h > n
                      ? ((d = n / h), t.arc(r, o, h, i + d, a - d, !0))
                      : t.arc(r, o, n, i + s.H, a - s.H),
                    t.closePath(),
                    t.clip();
                })(t, e, f),
                r || (tK(t, e, i, a, f, n), t.stroke());
            })(t, this, h, n, r),
            t.restore();
        }
      }
      function tZ(t, e, i = e) {
        (t.lineCap = (0, s.v)(i.borderCapStyle, e.borderCapStyle)),
          t.setLineDash((0, s.v)(i.borderDash, e.borderDash)),
          (t.lineDashOffset = (0, s.v)(i.borderDashOffset, e.borderDashOffset)),
          (t.lineJoin = (0, s.v)(i.borderJoinStyle, e.borderJoinStyle)),
          (t.lineWidth = (0, s.v)(i.borderWidth, e.borderWidth)),
          (t.strokeStyle = (0, s.v)(i.borderColor, e.borderColor));
      }
      function t0(t, e, i) {
        t.lineTo(i.x, i.y);
      }
      function t1(t, e, i = {}) {
        let s = t.length,
          { start: a = 0, end: n = s - 1 } = i,
          { start: r, end: o } = e,
          l = Math.max(a, r),
          h = Math.min(n, o);
        return {
          count: s,
          start: l,
          loop: e.loop,
          ilen:
            h < l && !((a < r && n < r) || (a > o && n > o))
              ? s + h - l
              : h - l,
        };
      }
      function t2(t, e, i, a) {
        let n, r, o;
        let { points: l, options: h } = e,
          { count: d, start: c, loop: u, ilen: g } = t1(l, i, a),
          p = h.stepped
            ? s.ar
            : h.tension || "monotone" === h.cubicInterpolationMode
            ? s.as
            : t0,
          { move: f = !0, reverse: m } = a || {};
        for (n = 0; n <= g; ++n)
          (r = l[(c + (m ? g - n : n)) % d]).skip ||
            (f ? (t.moveTo(r.x, r.y), (f = !1)) : p(t, o, r, m, h.stepped),
            (o = r));
        return u && p(t, o, (r = l[(c + (m ? g : 0)) % d]), m, h.stepped), !!u;
      }
      function t5(t, e, i, s) {
        let a, n, r, o, l, h;
        let d = e.points,
          { count: c, start: u, ilen: g } = t1(d, i, s),
          { move: p = !0, reverse: f } = s || {},
          m = 0,
          x = 0,
          b = (t) => (u + (f ? g - t : t)) % c,
          _ = () => {
            o !== l && (t.lineTo(m, l), t.lineTo(m, o), t.lineTo(m, h));
          };
        for (p && ((n = d[b(0)]), t.moveTo(n.x, n.y)), a = 0; a <= g; ++a) {
          if ((n = d[b(a)]).skip) continue;
          let e = n.x,
            i = n.y,
            s = 0 | e;
          s === r
            ? (i < o ? (o = i) : i > l && (l = i), (m = (x * m + e) / ++x))
            : (_(), t.lineTo(e, i), (r = s), (x = 0), (o = l = i)),
            (h = i);
        }
        _();
      }
      function t3(t) {
        let e = t.options,
          i = e.borderDash && e.borderDash.length,
          s =
            !t._decimated &&
            !t._loop &&
            !e.tension &&
            "monotone" !== e.cubicInterpolationMode &&
            !e.stepped &&
            !i;
        return s ? t5 : t2;
      }
      let t6 = "function" == typeof Path2D;
      class t4 extends tf {
        static id = "line";
        static defaults = {
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: "miter",
          borderWidth: 3,
          capBezierPoints: !0,
          cubicInterpolationMode: "default",
          fill: !1,
          spanGaps: !1,
          stepped: !1,
          tension: 0,
        };
        static defaultRoutes = {
          backgroundColor: "backgroundColor",
          borderColor: "borderColor",
        };
        static descriptors = {
          _scriptable: !0,
          _indexable: (t) => "borderDash" !== t && "fill" !== t,
        };
        constructor(t) {
          super(),
            (this.animated = !0),
            (this.options = void 0),
            (this._chart = void 0),
            (this._loop = void 0),
            (this._fullLoop = void 0),
            (this._path = void 0),
            (this._points = void 0),
            (this._segments = void 0),
            (this._decimated = !1),
            (this._pointsUpdated = !1),
            (this._datasetIndex = void 0),
            t && Object.assign(this, t);
        }
        updateControlPoints(t, e) {
          let i = this.options;
          if (
            (i.tension || "monotone" === i.cubicInterpolationMode) &&
            !i.stepped &&
            !this._pointsUpdated
          ) {
            let a = i.spanGaps ? this._loop : this._fullLoop;
            (0, s.al)(this._points, i, t, a, e), (this._pointsUpdated = !0);
          }
        }
        set points(t) {
          (this._points = t),
            delete this._segments,
            delete this._path,
            (this._pointsUpdated = !1);
        }
        get points() {
          return this._points;
        }
        get segments() {
          return (
            this._segments ||
            (this._segments = (0, s.am)(this, this.options.segment))
          );
        }
        first() {
          let t = this.segments,
            e = this.points;
          return t.length && e[t[0].start];
        }
        last() {
          let t = this.segments,
            e = this.points,
            i = t.length;
          return i && e[t[i - 1].end];
        }
        interpolate(t, e) {
          let i, a;
          let n = this.options,
            r = t[e],
            o = this.points,
            l = (0, s.an)(this, { property: e, start: r, end: r });
          if (!l.length) return;
          let h = [],
            d = n.stepped
              ? s.ao
              : n.tension || "monotone" === n.cubicInterpolationMode
              ? s.ap
              : s.aq;
          for (i = 0, a = l.length; i < a; ++i) {
            let { start: s, end: a } = l[i],
              c = o[s],
              u = o[a];
            if (c === u) {
              h.push(c);
              continue;
            }
            let g = Math.abs((r - c[e]) / (u[e] - c[e])),
              p = d(c, u, g, n.stepped);
            (p[e] = t[e]), h.push(p);
          }
          return 1 === h.length ? h[0] : h;
        }
        pathSegment(t, e, i) {
          let s = t3(this);
          return s(t, this, e, i);
        }
        path(t, e, i) {
          let s = this.segments,
            a = t3(this),
            n = this._loop;
          for (let r of ((e = e || 0), (i = i || this.points.length - e), s))
            n &= a(t, this, r, { start: e, end: e + i - 1 });
          return !!n;
        }
        draw(t, e, i, s) {
          let a = this.options || {},
            n = this.points || [];
          n.length &&
            a.borderWidth &&
            (t.save(),
            (function (t, e, i, s) {
              if (t6 && !e.options.segment) {
                var a;
                let n;
                (n = (a = e)._path) ||
                  ((n = a._path = new Path2D()),
                  a.path(n, i, s) && n.closePath()),
                  tZ(t, a.options),
                  t.stroke(n);
              } else
                !(function (t, e, i, s) {
                  let { segments: a, options: n } = e,
                    r = t3(e);
                  for (let o of a)
                    tZ(t, n, o.style),
                      t.beginPath(),
                      r(t, e, o, { start: i, end: i + s - 1 }) && t.closePath(),
                      t.stroke();
                })(t, e, i, s);
            })(t, this, i, s),
            t.restore()),
            this.animated &&
              ((this._pointsUpdated = !1), (this._path = void 0));
        }
      }
      function t7(t, e, i, s) {
        let a = t.options,
          { [i]: n } = t.getProps([i], s);
        return Math.abs(e - n) < a.radius + a.hitRadius;
      }
      class t8 extends tf {
        static id = "point";
        parsed;
        skip;
        stop;
        static defaults = {
          borderWidth: 1,
          hitRadius: 1,
          hoverBorderWidth: 1,
          hoverRadius: 4,
          pointStyle: "circle",
          radius: 3,
          rotation: 0,
        };
        static defaultRoutes = {
          backgroundColor: "backgroundColor",
          borderColor: "borderColor",
        };
        constructor(t) {
          super(),
            (this.options = void 0),
            (this.parsed = void 0),
            (this.skip = void 0),
            (this.stop = void 0),
            t && Object.assign(this, t);
        }
        inRange(t, e, i) {
          let s = this.options,
            { x: a, y: n } = this.getProps(["x", "y"], i);
          return (
            Math.pow(t - a, 2) + Math.pow(e - n, 2) <
            Math.pow(s.hitRadius + s.radius, 2)
          );
        }
        inXRange(t, e) {
          return t7(this, t, "x", e);
        }
        inYRange(t, e) {
          return t7(this, t, "y", e);
        }
        getCenterPoint(t) {
          let { x: e, y: i } = this.getProps(["x", "y"], t);
          return { x: e, y: i };
        }
        size(t) {
          let e = (t = t || this.options || {}).radius || 0;
          e = Math.max(e, (e && t.hoverRadius) || 0);
          let i = (e && t.borderWidth) || 0;
          return (e + i) * 2;
        }
        draw(t, e) {
          let i = this.options;
          !this.skip &&
            !(i.radius < 0.1) &&
            (0, s.C)(this, e, this.size(i) / 2) &&
            ((t.strokeStyle = i.borderColor),
            (t.lineWidth = i.borderWidth),
            (t.fillStyle = i.backgroundColor),
            (0, s.at)(t, i, this.x, this.y));
        }
        getRange() {
          let t = this.options || {};
          return t.radius + t.hitRadius;
        }
      }
      function t9(t, e) {
        let i, s, a, n, r;
        let {
          x: o,
          y: l,
          base: h,
          width: d,
          height: c,
        } = t.getProps(["x", "y", "base", "width", "height"], e);
        return (
          t.horizontal
            ? ((r = c / 2),
              (i = Math.min(o, h)),
              (s = Math.max(o, h)),
              (a = l - r),
              (n = l + r))
            : ((i = o - (r = d / 2)),
              (s = o + r),
              (a = Math.min(l, h)),
              (n = Math.max(l, h))),
          { left: i, top: a, right: s, bottom: n }
        );
      }
      function et(t, e, i, a) {
        return t ? 0 : (0, s.S)(e, i, a);
      }
      function ee(t, e, i, a) {
        let n = null === e,
          r = null === i,
          o = t && !(n && r) && t9(t, a);
        return (
          o &&
          (n || (0, s.aj)(e, o.left, o.right)) &&
          (r || (0, s.aj)(i, o.top, o.bottom))
        );
      }
      function ei(t, e) {
        t.rect(e.x, e.y, e.w, e.h);
      }
      function es(t, e, i = {}) {
        let s = t.x !== i.x ? -e : 0,
          a = t.y !== i.y ? -e : 0,
          n = (t.x + t.w !== i.x + i.w ? e : 0) - s,
          r = (t.y + t.h !== i.y + i.h ? e : 0) - a;
        return {
          x: t.x + s,
          y: t.y + a,
          w: t.w + n,
          h: t.h + r,
          radius: t.radius,
        };
      }
      class ea extends tf {
        static id = "bar";
        static defaults = {
          borderSkipped: "start",
          borderWidth: 0,
          borderRadius: 0,
          inflateAmount: "auto",
          pointStyle: void 0,
        };
        static defaultRoutes = {
          backgroundColor: "backgroundColor",
          borderColor: "borderColor",
        };
        constructor(t) {
          super(),
            (this.options = void 0),
            (this.horizontal = void 0),
            (this.base = void 0),
            (this.width = void 0),
            (this.height = void 0),
            (this.inflateAmount = void 0),
            t && Object.assign(this, t);
        }
        draw(t) {
          var e;
          let {
              inflateAmount: i,
              options: { borderColor: a, backgroundColor: n },
            } = this,
            { inner: r, outer: o } = (function (t) {
              let e = t9(t),
                i = e.right - e.left,
                a = e.bottom - e.top,
                n = (function (t, e, i) {
                  let a = t.options.borderWidth,
                    n = t.borderSkipped,
                    r = (0, s.av)(a);
                  return {
                    t: et(n.top, r.top, 0, i),
                    r: et(n.right, r.right, 0, e),
                    b: et(n.bottom, r.bottom, 0, i),
                    l: et(n.left, r.left, 0, e),
                  };
                })(t, i / 2, a / 2),
                r = (function (t, e, i) {
                  let { enableBorderRadius: a } = t.getProps([
                      "enableBorderRadius",
                    ]),
                    n = t.options.borderRadius,
                    r = (0, s.aw)(n),
                    o = Math.min(e, i),
                    l = t.borderSkipped,
                    h = a || (0, s.i)(n);
                  return {
                    topLeft: et(!h || l.top || l.left, r.topLeft, 0, o),
                    topRight: et(!h || l.top || l.right, r.topRight, 0, o),
                    bottomLeft: et(
                      !h || l.bottom || l.left,
                      r.bottomLeft,
                      0,
                      o
                    ),
                    bottomRight: et(
                      !h || l.bottom || l.right,
                      r.bottomRight,
                      0,
                      o
                    ),
                  };
                })(t, i / 2, a / 2);
              return {
                outer: { x: e.left, y: e.top, w: i, h: a, radius: r },
                inner: {
                  x: e.left + n.l,
                  y: e.top + n.t,
                  w: i - n.l - n.r,
                  h: a - n.t - n.b,
                  radius: {
                    topLeft: Math.max(0, r.topLeft - Math.max(n.t, n.l)),
                    topRight: Math.max(0, r.topRight - Math.max(n.t, n.r)),
                    bottomLeft: Math.max(0, r.bottomLeft - Math.max(n.b, n.l)),
                    bottomRight: Math.max(
                      0,
                      r.bottomRight - Math.max(n.b, n.r)
                    ),
                  },
                },
              };
            })(this),
            l =
              (e = o.radius).topLeft ||
              e.topRight ||
              e.bottomLeft ||
              e.bottomRight
                ? s.au
                : ei;
          t.save(),
            (o.w !== r.w || o.h !== r.h) &&
              (t.beginPath(),
              l(t, es(o, i, r)),
              t.clip(),
              l(t, es(r, -i, o)),
              (t.fillStyle = a),
              t.fill("evenodd")),
            t.beginPath(),
            l(t, es(r, i)),
            (t.fillStyle = n),
            t.fill(),
            t.restore();
        }
        inRange(t, e, i) {
          return ee(this, t, e, i);
        }
        inXRange(t, e) {
          return ee(this, t, null, e);
        }
        inYRange(t, e) {
          return ee(this, null, t, e);
        }
        getCenterPoint(t) {
          let {
            x: e,
            y: i,
            base: s,
            horizontal: a,
          } = this.getProps(["x", "y", "base", "horizontal"], t);
          return { x: a ? (e + s) / 2 : e, y: a ? i : (i + s) / 2 };
        }
        getRange(t) {
          return "x" === t ? this.width / 2 : this.height / 2;
        }
      }
      function en(t, e, i, a) {
        if (a) return;
        let n = e[t],
          r = i[t];
        return (
          "angle" === t && ((n = (0, s.ay)(n)), (r = (0, s.ay)(r))),
          { property: t, start: n, end: r }
        );
      }
      function er(t, e, i) {
        for (; e > t; e--) {
          let t = i[e];
          if (!isNaN(t.x) && !isNaN(t.y)) break;
        }
        return e;
      }
      function eo(t, e, i, s) {
        return t && e ? s(t[i], e[i]) : t ? t[i] : e ? e[i] : 0;
      }
      function el(t, e) {
        let i = [],
          a = !1;
        return (
          (0, s.b)(t)
            ? ((a = !0), (i = t))
            : (i = (function (t, e) {
                let { x: i = null, y: s = null } = t || {},
                  a = e.points,
                  n = [];
                return (
                  e.segments.forEach(({ start: t, end: e }) => {
                    e = er(t, e, a);
                    let r = a[t],
                      o = a[e];
                    null !== s
                      ? (n.push({ x: r.x, y: s }), n.push({ x: o.x, y: s }))
                      : null !== i &&
                        (n.push({ x: i, y: r.y }), n.push({ x: i, y: o.y }));
                  }),
                  n
                );
              })(t, e)),
          i.length
            ? new t4({
                points: i,
                options: { tension: 0 },
                _loop: a,
                _fullLoop: a,
              })
            : null
        );
      }
      function eh(t) {
        return t && !1 !== t.fill;
      }
      [
        "rgb(54, 162, 235)",
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ].map((t) => t.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
      class ed {
        constructor(t) {
          (this.x = t.x), (this.y = t.y), (this.radius = t.radius);
        }
        pathSegment(t, e, i) {
          let { x: a, y: n, radius: r } = this;
          return (
            (e = e || { start: 0, end: s.T }),
            t.arc(a, n, r, e.end, e.start, !0),
            !i.bounds
          );
        }
        interpolate(t) {
          let { x: e, y: i, radius: s } = this,
            a = t.angle;
          return { x: e + Math.cos(a) * s, y: i + Math.sin(a) * s, angle: a };
        }
      }
      function ec(t, e, i) {
        let a = (function (t) {
            let { chart: e, fill: i, line: a } = t;
            if ((0, s.g)(i))
              return (function (t, e) {
                let i = t.getDatasetMeta(e),
                  s = i && t.isDatasetVisible(e);
                return s ? i.dataset : null;
              })(e, i);
            if ("stack" === i)
              return (function (t) {
                let { scale: e, index: i, line: a } = t,
                  n = [],
                  r = a.segments,
                  o = a.points,
                  l = (function (t, e) {
                    let i = [],
                      s = t.getMatchingVisibleMetas("line");
                    for (let t = 0; t < s.length; t++) {
                      let a = s[t];
                      if (a.index === e) break;
                      a.hidden || i.unshift(a.dataset);
                    }
                    return i;
                  })(e, i);
                l.push(el({ x: null, y: e.bottom }, a));
                for (let t = 0; t < r.length; t++) {
                  let e = r[t];
                  for (let t = e.start; t <= e.end; t++)
                    !(function (t, e, i) {
                      let a = [];
                      for (let n = 0; n < i.length; n++) {
                        let r = i[n],
                          {
                            first: o,
                            last: l,
                            point: h,
                          } = (function (t, e, i) {
                            let a = t.interpolate(e, i);
                            if (!a) return {};
                            let n = a[i],
                              r = t.segments,
                              o = t.points,
                              l = !1,
                              h = !1;
                            for (let t = 0; t < r.length; t++) {
                              let e = r[t],
                                a = o[e.start][i],
                                d = o[e.end][i];
                              if ((0, s.aj)(n, a, d)) {
                                (l = n === a), (h = n === d);
                                break;
                              }
                            }
                            return { first: l, last: h, point: a };
                          })(r, e, "x");
                        if (h && (!o || !l)) {
                          if (o) a.unshift(h);
                          else if ((t.push(h), !l)) break;
                        }
                      }
                      t.push(...a);
                    })(n, o[t], l);
                }
                return new t4({ points: n, options: {} });
              })(t);
            if ("shape" === i) return !0;
            let n = (function (t) {
              let e = t.scale || {};
              return e.getPointPositionForValue
                ? (function (t) {
                    let { scale: e, fill: i } = t,
                      a = e.options,
                      n = e.getLabels().length,
                      r = a.reverse ? e.max : e.min,
                      o =
                        "start" === i
                          ? r
                          : "end" === i
                          ? e.options.reverse
                            ? e.min
                            : e.max
                          : (0, s.i)(i)
                          ? i.value
                          : e.getBaseValue(),
                      l = [];
                    if (a.grid.circular) {
                      let t = e.getPointPositionForValue(0, r);
                      return new ed({
                        x: t.x,
                        y: t.y,
                        radius: e.getDistanceFromCenterForValue(o),
                      });
                    }
                    for (let t = 0; t < n; ++t)
                      l.push(e.getPointPositionForValue(t, o));
                    return l;
                  })(t)
                : (function (t) {
                    let e;
                    let { scale: i = {}, fill: a } = t,
                      n =
                        ((e = null),
                        "start" === a
                          ? (e = i.bottom)
                          : "end" === a
                          ? (e = i.top)
                          : (0, s.i)(a)
                          ? (e = i.getPixelForValue(a.value))
                          : i.getBasePixel && (e = i.getBasePixel()),
                        e);
                    if ((0, s.g)(n)) {
                      let t = i.isHorizontal();
                      return { x: t ? n : null, y: t ? null : n };
                    }
                    return null;
                  })(t);
            })(t);
            return n instanceof ed ? n : el(n, a);
          })(e),
          { line: n, scale: r, axis: o } = e,
          l = n.options,
          h = l.fill,
          d = l.backgroundColor,
          { above: c = d, below: u = d } = h || {};
        a &&
          n.points.length &&
          ((0, s.Y)(t, i),
          (function (t, e) {
            let {
                line: i,
                target: s,
                above: a,
                below: n,
                area: r,
                scale: o,
              } = e,
              l = i._loop ? "angle" : e.axis;
            t.save(),
              "x" === l &&
                n !== a &&
                (eu(t, s, r.top),
                eg(t, { line: i, target: s, color: a, scale: o, property: l }),
                t.restore(),
                t.save(),
                eu(t, s, r.bottom)),
              eg(t, { line: i, target: s, color: n, scale: o, property: l }),
              t.restore();
          })(t, {
            line: n,
            target: a,
            above: c,
            below: u,
            area: i,
            scale: r,
            axis: o,
          }),
          (0, s.$)(t));
      }
      function eu(t, e, i) {
        let { segments: s, points: a } = e,
          n = !0,
          r = !1;
        for (let o of (t.beginPath(), s)) {
          let { start: s, end: l } = o,
            h = a[s],
            d = a[er(s, l, a)];
          n
            ? (t.moveTo(h.x, h.y), (n = !1))
            : (t.lineTo(h.x, i), t.lineTo(h.x, h.y)),
            (r = !!e.pathSegment(t, o, { move: r }))
              ? t.closePath()
              : t.lineTo(d.x, i);
        }
        t.lineTo(e.first().x, i), t.closePath(), t.clip();
      }
      function eg(t, e) {
        let { line: i, target: a, property: n, color: r, scale: o } = e,
          l = (function (t, e, i) {
            let a = t.segments,
              n = t.points,
              r = e.points,
              o = [];
            for (let t of a) {
              let { start: a, end: l } = t;
              l = er(a, l, n);
              let h = en(i, n[a], n[l], t.loop);
              if (!e.segments) {
                o.push({ source: t, target: h, start: n[a], end: n[l] });
                continue;
              }
              let d = (0, s.an)(e, h);
              for (let e of d) {
                let a = en(i, r[e.start], r[e.end], e.loop),
                  l = (0, s.ax)(t, n, a);
                for (let t of l)
                  o.push({
                    source: t,
                    target: e,
                    start: { [i]: eo(h, a, "start", Math.max) },
                    end: { [i]: eo(h, a, "end", Math.min) },
                  });
              }
            }
            return o;
          })(i, a, n);
        for (let { source: e, target: s, start: h, end: d } of l) {
          let l;
          let { style: { backgroundColor: c = r } = {} } = e,
            u = !0 !== a;
          t.save(),
            (t.fillStyle = c),
            (function (t, e, i) {
              let { top: s, bottom: a } = e.chart.chartArea,
                { property: n, start: r, end: o } = i || {};
              "x" === n &&
                (t.beginPath(), t.rect(r, s, o - r, a - s), t.clip());
            })(t, o, u && en(n, h, d)),
            t.beginPath();
          let g = !!i.pathSegment(t, e);
          if (u) {
            g ? t.closePath() : ep(t, a, d, n);
            let e = !!a.pathSegment(t, s, { move: g, reverse: !0 });
            (l = g && e) || ep(t, a, h, n);
          }
          t.closePath(), t.fill(l ? "evenodd" : "nonzero"), t.restore();
        }
      }
      function ep(t, e, i, s) {
        let a = e.interpolate(i, s);
        a && t.lineTo(a.x, a.y);
      }
      var ef = {
        id: "filler",
        afterDatasetsUpdate(t, e, i) {
          let a, n, r, o;
          let l = (t.data.datasets || []).length,
            h = [];
          for (n = 0; n < l; ++n)
            (r = (a = t.getDatasetMeta(n)).dataset),
              (o = null),
              r &&
                r.options &&
                r instanceof t4 &&
                (o = {
                  visible: t.isDatasetVisible(n),
                  index: n,
                  fill: (function (t, e, i) {
                    var a, n;
                    let r = (function (t) {
                      let e = t.options,
                        i = e.fill,
                        a = (0, s.v)(i && i.target, i);
                      return (
                        void 0 === a && (a = !!e.backgroundColor),
                        !1 !== a && null !== a && (!0 === a ? "origin" : a)
                      );
                    })(t);
                    if ((0, s.i)(r)) return !isNaN(r.value) && r;
                    let o = parseFloat(r);
                    return (0, s.g)(o) && Math.floor(o) === o
                      ? ((a = r[0]),
                        (n = o),
                        ("-" === a || "+" === a) && (n = e + n),
                        n !== e && !(n < 0) && !(n >= i) && n)
                      : ["origin", "start", "end", "stack", "shape"].indexOf(
                          r
                        ) >= 0 && r;
                  })(r, n, l),
                  chart: t,
                  axis: a.controller.options.indexAxis,
                  scale: a.vScale,
                  line: r,
                }),
              (a.$filler = o),
              h.push(o);
          for (n = 0; n < l; ++n)
            (o = h[n]) &&
              !1 !== o.fill &&
              (o.fill = (function (t, e, i) {
                let a;
                let n = t[e],
                  r = n.fill,
                  o = [e];
                if (!i) return r;
                for (; !1 !== r && -1 === o.indexOf(r); ) {
                  if (!(0, s.g)(r)) return r;
                  if (!(a = t[r])) break;
                  if (a.visible) return r;
                  o.push(r), (r = a.fill);
                }
                return !1;
              })(h, n, i.propagate));
        },
        beforeDraw(t, e, i) {
          let s = "beforeDraw" === i.drawTime,
            a = t.getSortedVisibleDatasetMetas(),
            n = t.chartArea;
          for (let e = a.length - 1; e >= 0; --e) {
            let i = a[e].$filler;
            i &&
              (i.line.updateControlPoints(n, i.axis),
              s && i.fill && ec(t.ctx, i, n));
          }
        },
        beforeDatasetsDraw(t, e, i) {
          if ("beforeDatasetsDraw" !== i.drawTime) return;
          let s = t.getSortedVisibleDatasetMetas();
          for (let e = s.length - 1; e >= 0; --e) {
            let i = s[e].$filler;
            eh(i) && ec(t.ctx, i, t.chartArea);
          }
        },
        beforeDatasetDraw(t, e, i) {
          let s = e.meta.$filler;
          eh(s) &&
            "beforeDatasetDraw" === i.drawTime &&
            ec(t.ctx, s, t.chartArea);
        },
        defaults: { propagate: !0, drawTime: "beforeDatasetDraw" },
      };
      let em = (t, e) => {
          let { boxHeight: i = e, boxWidth: s = e } = t;
          return (
            t.usePointStyle &&
              ((i = Math.min(i, e)), (s = t.pointStyleWidth || Math.min(s, e))),
            { boxWidth: s, boxHeight: i, itemHeight: Math.max(e, i) }
          );
        },
        ex = (t, e) =>
          null !== t &&
          null !== e &&
          t.datasetIndex === e.datasetIndex &&
          t.index === e.index;
      class eb extends tf {
        constructor(t) {
          super(),
            (this._added = !1),
            (this.legendHitBoxes = []),
            (this._hoveredItem = null),
            (this.doughnutMode = !1),
            (this.chart = t.chart),
            (this.options = t.options),
            (this.ctx = t.ctx),
            (this.legendItems = void 0),
            (this.columnSizes = void 0),
            (this.lineWidths = void 0),
            (this.maxHeight = void 0),
            (this.maxWidth = void 0),
            (this.top = void 0),
            (this.bottom = void 0),
            (this.left = void 0),
            (this.right = void 0),
            (this.height = void 0),
            (this.width = void 0),
            (this._margins = void 0),
            (this.position = void 0),
            (this.weight = void 0),
            (this.fullSize = void 0);
        }
        update(t, e, i) {
          (this.maxWidth = t),
            (this.maxHeight = e),
            (this._margins = i),
            this.setDimensions(),
            this.buildLabels(),
            this.fit();
        }
        setDimensions() {
          this.isHorizontal()
            ? ((this.width = this.maxWidth),
              (this.left = this._margins.left),
              (this.right = this.width))
            : ((this.height = this.maxHeight),
              (this.top = this._margins.top),
              (this.bottom = this.height));
        }
        buildLabels() {
          let t = this.options.labels || {},
            e = (0, s.Q)(t.generateLabels, [this.chart], this) || [];
          t.filter && (e = e.filter((e) => t.filter(e, this.chart.data))),
            t.sort && (e = e.sort((e, i) => t.sort(e, i, this.chart.data))),
            this.options.reverse && e.reverse(),
            (this.legendItems = e);
        }
        fit() {
          let t, e;
          let { options: i, ctx: a } = this;
          if (!i.display) {
            this.width = this.height = 0;
            return;
          }
          let n = i.labels,
            r = (0, s.a0)(n.font),
            o = r.size,
            l = this._computeTitleHeight(),
            { boxWidth: h, itemHeight: d } = em(n, o);
          (a.font = r.string),
            this.isHorizontal()
              ? ((t = this.maxWidth), (e = this._fitRows(l, o, h, d) + 10))
              : ((e = this.maxHeight), (t = this._fitCols(l, r, h, d) + 10)),
            (this.width = Math.min(t, i.maxWidth || this.maxWidth)),
            (this.height = Math.min(e, i.maxHeight || this.maxHeight));
        }
        _fitRows(t, e, i, s) {
          let {
              ctx: a,
              maxWidth: n,
              options: {
                labels: { padding: r },
              },
            } = this,
            o = (this.legendHitBoxes = []),
            l = (this.lineWidths = [0]),
            h = s + r,
            d = t;
          (a.textAlign = "left"), (a.textBaseline = "middle");
          let c = -1,
            u = -h;
          return (
            this.legendItems.forEach((t, g) => {
              let p = i + e / 2 + a.measureText(t.text).width;
              (0 === g || l[l.length - 1] + p + 2 * r > n) &&
                ((d += h), (l[l.length - (g > 0 ? 0 : 1)] = 0), (u += h), c++),
                (o[g] = { left: 0, top: u, row: c, width: p, height: s }),
                (l[l.length - 1] += p + r);
            }),
            d
          );
        }
        _fitCols(t, e, i, s) {
          let {
              ctx: a,
              maxHeight: n,
              options: {
                labels: { padding: r },
              },
            } = this,
            o = (this.legendHitBoxes = []),
            l = (this.columnSizes = []),
            h = n - t,
            d = r,
            c = 0,
            u = 0,
            g = 0,
            p = 0;
          return (
            this.legendItems.forEach((t, n) => {
              let { itemWidth: f, itemHeight: m } = (function (t, e, i, s, a) {
                var n;
                let r, o;
                let l =
                    ((r = s.text) &&
                      "string" != typeof r &&
                      (r = r.reduce((t, e) => (t.length > e.length ? t : e))),
                    t + e.size / 2 + i.measureText(r).width),
                  h =
                    ((n = e.lineHeight),
                    (o = a),
                    "string" != typeof s.text && (o = e_(s, n)),
                    o);
                return { itemWidth: l, itemHeight: h };
              })(i, e, a, t, s);
              n > 0 &&
                u + m + 2 * r > h &&
                ((d += c + r),
                l.push({ width: c, height: u }),
                (g += c + r),
                p++,
                (c = u = 0)),
                (o[n] = { left: g, top: u, col: p, width: f, height: m }),
                (c = Math.max(c, f)),
                (u += m + r);
            }),
            (d += c),
            l.push({ width: c, height: u }),
            d
          );
        }
        adjustHitBoxes() {
          if (!this.options.display) return;
          let t = this._computeTitleHeight(),
            {
              legendHitBoxes: e,
              options: {
                align: i,
                labels: { padding: a },
                rtl: n,
              },
            } = this,
            r = (0, s.az)(n, this.left, this.width);
          if (this.isHorizontal()) {
            let n = 0,
              o = (0, s.a2)(i, this.left + a, this.right - this.lineWidths[n]);
            for (let l of e)
              n !== l.row &&
                ((n = l.row),
                (o = (0, s.a2)(
                  i,
                  this.left + a,
                  this.right - this.lineWidths[n]
                ))),
                (l.top += this.top + t + a),
                (l.left = r.leftForLtr(r.x(o), l.width)),
                (o += l.width + a);
          } else {
            let n = 0,
              o = (0, s.a2)(
                i,
                this.top + t + a,
                this.bottom - this.columnSizes[n].height
              );
            for (let l of e)
              l.col !== n &&
                ((n = l.col),
                (o = (0, s.a2)(
                  i,
                  this.top + t + a,
                  this.bottom - this.columnSizes[n].height
                ))),
                (l.top = o),
                (l.left += this.left + a),
                (l.left = r.leftForLtr(r.x(l.left), l.width)),
                (o += l.height + a);
          }
        }
        isHorizontal() {
          return (
            "top" === this.options.position ||
            "bottom" === this.options.position
          );
        }
        draw() {
          if (this.options.display) {
            let t = this.ctx;
            (0, s.Y)(t, this), this._draw(), (0, s.$)(t);
          }
        }
        _draw() {
          let t;
          let { options: e, columnSizes: i, lineWidths: a, ctx: n } = this,
            { align: r, labels: o } = e,
            l = s.d.color,
            h = (0, s.az)(e.rtl, this.left, this.width),
            d = (0, s.a0)(o.font),
            { padding: c } = o,
            u = d.size,
            g = u / 2;
          this.drawTitle(),
            (n.textAlign = h.textAlign("left")),
            (n.textBaseline = "middle"),
            (n.lineWidth = 0.5),
            (n.font = d.string);
          let { boxWidth: p, boxHeight: f, itemHeight: m } = em(o, u),
            x = function (t, e, i) {
              if (isNaN(p) || p <= 0 || isNaN(f) || f < 0) return;
              n.save();
              let a = (0, s.v)(i.lineWidth, 1);
              if (
                ((n.fillStyle = (0, s.v)(i.fillStyle, l)),
                (n.lineCap = (0, s.v)(i.lineCap, "butt")),
                (n.lineDashOffset = (0, s.v)(i.lineDashOffset, 0)),
                (n.lineJoin = (0, s.v)(i.lineJoin, "miter")),
                (n.lineWidth = a),
                (n.strokeStyle = (0, s.v)(i.strokeStyle, l)),
                n.setLineDash((0, s.v)(i.lineDash, [])),
                o.usePointStyle)
              ) {
                let r = {
                    radius: (f * Math.SQRT2) / 2,
                    pointStyle: i.pointStyle,
                    rotation: i.rotation,
                    borderWidth: a,
                  },
                  l = h.xPlus(t, p / 2);
                (0, s.aD)(n, r, l, e + g, o.pointStyleWidth && p);
              } else {
                let r = e + Math.max((u - f) / 2, 0),
                  o = h.leftForLtr(t, p),
                  l = (0, s.aw)(i.borderRadius);
                n.beginPath(),
                  Object.values(l).some((t) => 0 !== t)
                    ? (0, s.au)(n, { x: o, y: r, w: p, h: f, radius: l })
                    : n.rect(o, r, p, f),
                  n.fill(),
                  0 !== a && n.stroke();
              }
              n.restore();
            },
            b = function (t, e, i) {
              (0, s.Z)(n, i.text, t, e + m / 2, d, {
                strikethrough: i.hidden,
                textAlign: h.textAlign(i.textAlign),
              });
            },
            _ = this.isHorizontal(),
            v = this._computeTitleHeight();
          (t = _
            ? {
                x: (0, s.a2)(r, this.left + c, this.right - a[0]),
                y: this.top + c + v,
                line: 0,
              }
            : {
                x: this.left + c,
                y: (0, s.a2)(r, this.top + v + c, this.bottom - i[0].height),
                line: 0,
              }),
            (0, s.aA)(this.ctx, e.textDirection);
          let y = m + c;
          this.legendItems.forEach((l, u) => {
            (n.strokeStyle = l.fontColor), (n.fillStyle = l.fontColor);
            let f = n.measureText(l.text).width,
              m = h.textAlign(l.textAlign || (l.textAlign = o.textAlign)),
              M = p + g + f,
              w = t.x,
              k = t.y;
            h.setWidth(this.width),
              _
                ? u > 0 &&
                  w + M + c > this.right &&
                  ((k = t.y += y),
                  t.line++,
                  (w = t.x =
                    (0, s.a2)(r, this.left + c, this.right - a[t.line])))
                : u > 0 &&
                  k + y > this.bottom &&
                  ((w = t.x = w + i[t.line].width + c),
                  t.line++,
                  (k = t.y =
                    (0, s.a2)(
                      r,
                      this.top + v + c,
                      this.bottom - i[t.line].height
                    )));
            let D = h.x(w);
            if (
              (x(D, k, l),
              (w = (0, s.aB)(m, w + p + g, _ ? w + M : this.right, e.rtl)),
              b(h.x(w), k, l),
              _)
            )
              t.x += M + c;
            else if ("string" != typeof l.text) {
              let e = d.lineHeight;
              t.y += e_(l, e);
            } else t.y += y;
          }),
            (0, s.aC)(this.ctx, e.textDirection);
        }
        drawTitle() {
          let t;
          let e = this.options,
            i = e.title,
            a = (0, s.a0)(i.font),
            n = (0, s.E)(i.padding);
          if (!i.display) return;
          let r = (0, s.az)(e.rtl, this.left, this.width),
            o = this.ctx,
            l = i.position,
            h = a.size / 2,
            d = n.top + h,
            c = this.left,
            u = this.width;
          if (this.isHorizontal())
            (u = Math.max(...this.lineWidths)),
              (t = this.top + d),
              (c = (0, s.a2)(e.align, c, this.right - u));
          else {
            let i = this.columnSizes.reduce((t, e) => Math.max(t, e.height), 0);
            t =
              d +
              (0, s.a2)(
                e.align,
                this.top,
                this.bottom - i - e.labels.padding - this._computeTitleHeight()
              );
          }
          let g = (0, s.a2)(l, c, c + u);
          (o.textAlign = r.textAlign((0, s.a1)(l))),
            (o.textBaseline = "middle"),
            (o.strokeStyle = i.color),
            (o.fillStyle = i.color),
            (o.font = a.string),
            (0, s.Z)(o, i.text, g, t, a);
        }
        _computeTitleHeight() {
          let t = this.options.title,
            e = (0, s.a0)(t.font),
            i = (0, s.E)(t.padding);
          return t.display ? e.lineHeight + i.height : 0;
        }
        _getLegendItemAt(t, e) {
          let i, a, n;
          if (
            (0, s.aj)(t, this.left, this.right) &&
            (0, s.aj)(e, this.top, this.bottom)
          ) {
            for (i = 0, n = this.legendHitBoxes; i < n.length; ++i)
              if (
                ((a = n[i]),
                (0, s.aj)(t, a.left, a.left + a.width) &&
                  (0, s.aj)(e, a.top, a.top + a.height))
              )
                return this.legendItems[i];
          }
          return null;
        }
        handleEvent(t) {
          var e;
          let i = this.options;
          if (
            (("mousemove" !== (e = t.type) && "mouseout" !== e) ||
              (!i.onHover && !i.onLeave)) &&
            (!i.onClick || ("click" !== e && "mouseup" !== e))
          )
            return;
          let a = this._getLegendItemAt(t.x, t.y);
          if ("mousemove" === t.type || "mouseout" === t.type) {
            let e = this._hoveredItem,
              n = ex(e, a);
            e && !n && (0, s.Q)(i.onLeave, [t, e, this], this),
              (this._hoveredItem = a),
              a && !n && (0, s.Q)(i.onHover, [t, a, this], this);
          } else a && (0, s.Q)(i.onClick, [t, a, this], this);
        }
      }
      function e_(t, e) {
        let i = t.text ? t.text.length + 0.5 : 0;
        return e * i;
      }
      var ev = {
        id: "legend",
        _element: eb,
        start(t, e, i) {
          let s = (t.legend = new eb({ ctx: t.ctx, options: i, chart: t }));
          K.configure(t, s, i), K.addBox(t, s);
        },
        stop(t) {
          K.removeBox(t, t.legend), delete t.legend;
        },
        beforeUpdate(t, e, i) {
          let s = t.legend;
          K.configure(t, s, i), (s.options = i);
        },
        afterUpdate(t) {
          let e = t.legend;
          e.buildLabels(), e.adjustHitBoxes();
        },
        afterEvent(t, e) {
          e.replay || t.legend.handleEvent(e.event);
        },
        defaults: {
          display: !0,
          position: "top",
          align: "center",
          fullSize: !0,
          reverse: !1,
          weight: 1e3,
          onClick(t, e, i) {
            let s = e.datasetIndex,
              a = i.chart;
            a.isDatasetVisible(s)
              ? (a.hide(s), (e.hidden = !0))
              : (a.show(s), (e.hidden = !1));
          },
          onHover: null,
          onLeave: null,
          labels: {
            color: (t) => t.chart.options.color,
            boxWidth: 40,
            padding: 10,
            generateLabels(t) {
              let e = t.data.datasets,
                {
                  labels: {
                    usePointStyle: i,
                    pointStyle: a,
                    textAlign: n,
                    color: r,
                    useBorderRadius: o,
                    borderRadius: l,
                  },
                } = t.legend.options;
              return t._getSortedDatasetMetas().map((t) => {
                let h = t.controller.getStyle(i ? 0 : void 0),
                  d = (0, s.E)(h.borderWidth);
                return {
                  text: e[t.index].label,
                  fillStyle: h.backgroundColor,
                  fontColor: r,
                  hidden: !t.visible,
                  lineCap: h.borderCapStyle,
                  lineDash: h.borderDash,
                  lineDashOffset: h.borderDashOffset,
                  lineJoin: h.borderJoinStyle,
                  lineWidth: (d.width + d.height) / 4,
                  strokeStyle: h.borderColor,
                  pointStyle: a || h.pointStyle,
                  rotation: h.rotation,
                  textAlign: n || h.textAlign,
                  borderRadius: o && (l || h.borderRadius),
                  datasetIndex: t.index,
                };
              }, this);
            },
          },
          title: {
            color: (t) => t.chart.options.color,
            display: !1,
            position: "center",
            text: "",
          },
        },
        descriptors: {
          _scriptable: (t) => !t.startsWith("on"),
          labels: {
            _scriptable: (t) =>
              !["generateLabels", "filter", "sort"].includes(t),
          },
        },
      };
      class ey extends tf {
        constructor(t) {
          super(),
            (this.chart = t.chart),
            (this.options = t.options),
            (this.ctx = t.ctx),
            (this._padding = void 0),
            (this.top = void 0),
            (this.bottom = void 0),
            (this.left = void 0),
            (this.right = void 0),
            (this.width = void 0),
            (this.height = void 0),
            (this.position = void 0),
            (this.weight = void 0),
            (this.fullSize = void 0);
        }
        update(t, e) {
          let i = this.options;
          if (((this.left = 0), (this.top = 0), !i.display)) {
            this.width = this.height = this.right = this.bottom = 0;
            return;
          }
          (this.width = this.right = t), (this.height = this.bottom = e);
          let a = (0, s.b)(i.text) ? i.text.length : 1;
          this._padding = (0, s.E)(i.padding);
          let n = a * (0, s.a0)(i.font).lineHeight + this._padding.height;
          this.isHorizontal() ? (this.height = n) : (this.width = n);
        }
        isHorizontal() {
          let t = this.options.position;
          return "top" === t || "bottom" === t;
        }
        _drawArgs(t) {
          let e, i, a;
          let { top: n, left: r, bottom: o, right: l, options: h } = this,
            d = h.align,
            c = 0;
          return (
            this.isHorizontal()
              ? ((i = (0, s.a2)(d, r, l)), (a = n + t), (e = l - r))
              : ("left" === h.position
                  ? ((i = r + t), (a = (0, s.a2)(d, o, n)), (c = -0.5 * s.P))
                  : ((i = l - t), (a = (0, s.a2)(d, n, o)), (c = 0.5 * s.P)),
                (e = o - n)),
            { titleX: i, titleY: a, maxWidth: e, rotation: c }
          );
        }
        draw() {
          let t = this.ctx,
            e = this.options;
          if (!e.display) return;
          let i = (0, s.a0)(e.font),
            a = i.lineHeight,
            n = a / 2 + this._padding.top,
            {
              titleX: r,
              titleY: o,
              maxWidth: l,
              rotation: h,
            } = this._drawArgs(n);
          (0, s.Z)(t, e.text, 0, 0, i, {
            color: e.color,
            maxWidth: l,
            rotation: h,
            textAlign: (0, s.a1)(e.align),
            textBaseline: "middle",
            translation: [r, o],
          });
        }
      }
      var eM = {
        id: "title",
        _element: ey,
        start(t, e, i) {
          !(function (t, e) {
            let i = new ey({ ctx: t.ctx, options: e, chart: t });
            K.configure(t, i, e), K.addBox(t, i), (t.titleBlock = i);
          })(t, i);
        },
        stop(t) {
          let e = t.titleBlock;
          K.removeBox(t, e), delete t.titleBlock;
        },
        beforeUpdate(t, e, i) {
          let s = t.titleBlock;
          K.configure(t, s, i), (s.options = i);
        },
        defaults: {
          align: "center",
          display: !1,
          font: { weight: "bold" },
          fullSize: !0,
          padding: 10,
          position: "top",
          text: "",
          weight: 2e3,
        },
        defaultRoutes: { color: "color" },
        descriptors: { _scriptable: !0, _indexable: !1 },
      };
      new WeakMap();
      let ew = {
        average(t) {
          let e, i;
          if (!t.length) return !1;
          let s = 0,
            a = 0,
            n = 0;
          for (e = 0, i = t.length; e < i; ++e) {
            let i = t[e].element;
            if (i && i.hasValue()) {
              let t = i.tooltipPosition();
              (s += t.x), (a += t.y), ++n;
            }
          }
          return { x: s / n, y: a / n };
        },
        nearest(t, e) {
          let i, a, n;
          if (!t.length) return !1;
          let r = e.x,
            o = e.y,
            l = Number.POSITIVE_INFINITY;
          for (i = 0, a = t.length; i < a; ++i) {
            let a = t[i].element;
            if (a && a.hasValue()) {
              let t = a.getCenterPoint(),
                i = (0, s.aE)(e, t);
              i < l && ((l = i), (n = a));
            }
          }
          if (n) {
            let t = n.tooltipPosition();
            (r = t.x), (o = t.y);
          }
          return { x: r, y: o };
        },
      };
      function ek(t, e) {
        return (
          e && ((0, s.b)(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
        );
      }
      function eD(t) {
        return ("string" == typeof t || t instanceof String) &&
          t.indexOf("\n") > -1
          ? t.split("\n")
          : t;
      }
      function eP(t, e) {
        let i = t.chart.ctx,
          { body: a, footer: n, title: r } = t,
          { boxWidth: o, boxHeight: l } = e,
          h = (0, s.a0)(e.bodyFont),
          d = (0, s.a0)(e.titleFont),
          c = (0, s.a0)(e.footerFont),
          u = r.length,
          g = n.length,
          p = a.length,
          f = (0, s.E)(e.padding),
          m = f.height,
          x = 0,
          b = a.reduce(
            (t, e) => t + e.before.length + e.lines.length + e.after.length,
            0
          );
        if (
          ((b += t.beforeBody.length + t.afterBody.length),
          u &&
            (m +=
              u * d.lineHeight +
              (u - 1) * e.titleSpacing +
              e.titleMarginBottom),
          b)
        ) {
          let t = e.displayColors ? Math.max(l, h.lineHeight) : h.lineHeight;
          m += p * t + (b - p) * h.lineHeight + (b - 1) * e.bodySpacing;
        }
        g &&
          (m +=
            e.footerMarginTop + g * c.lineHeight + (g - 1) * e.footerSpacing);
        let _ = 0,
          v = function (t) {
            x = Math.max(x, i.measureText(t).width + _);
          };
        return (
          i.save(),
          (i.font = d.string),
          (0, s.F)(t.title, v),
          (i.font = h.string),
          (0, s.F)(t.beforeBody.concat(t.afterBody), v),
          (_ = e.displayColors ? o + 2 + e.boxPadding : 0),
          (0, s.F)(a, (t) => {
            (0, s.F)(t.before, v), (0, s.F)(t.lines, v), (0, s.F)(t.after, v);
          }),
          (_ = 0),
          (i.font = c.string),
          (0, s.F)(t.footer, v),
          i.restore(),
          { width: (x += f.width), height: m }
        );
      }
      function eS(t, e, i) {
        let s =
          i.yAlign ||
          e.yAlign ||
          (function (t, e) {
            let { y: i, height: s } = e;
            return i < s / 2
              ? "top"
              : i > t.height - s / 2
              ? "bottom"
              : "center";
          })(t, i);
        return {
          xAlign:
            i.xAlign ||
            e.xAlign ||
            (function (t, e, i, s) {
              let { x: a, width: n } = i,
                {
                  width: r,
                  chartArea: { left: o, right: l },
                } = t,
                h = "center";
              return (
                "center" === s
                  ? (h = a <= (o + l) / 2 ? "left" : "right")
                  : a <= n / 2
                  ? (h = "left")
                  : a >= r - n / 2 && (h = "right"),
                (function (t, e, i, s) {
                  let { x: a, width: n } = s,
                    r = i.caretSize + i.caretPadding;
                  if (
                    ("left" === t && a + n + r > e.width) ||
                    ("right" === t && a - n - r < 0)
                  )
                    return !0;
                })(h, t, e, i) && (h = "center"),
                h
              );
            })(t, e, i, s),
          yAlign: s,
        };
      }
      function eC(t, e, i, a) {
        let { caretSize: n, caretPadding: r, cornerRadius: o } = t,
          { xAlign: l, yAlign: h } = i,
          d = n + r,
          {
            topLeft: c,
            topRight: u,
            bottomLeft: g,
            bottomRight: p,
          } = (0, s.aw)(o),
          f = (function (t, e) {
            let { x: i, width: s } = t;
            return "right" === e ? (i -= s) : "center" === e && (i -= s / 2), i;
          })(e, l),
          m = (function (t, e, i) {
            let { y: s, height: a } = t;
            return (
              "top" === e
                ? (s += i)
                : "bottom" === e
                ? (s -= a + i)
                : (s -= a / 2),
              s
            );
          })(e, h, d);
        return (
          "center" === h
            ? "left" === l
              ? (f += d)
              : "right" === l && (f -= d)
            : "left" === l
            ? (f -= Math.max(c, g) + n)
            : "right" === l && (f += Math.max(u, p) + n),
          {
            x: (0, s.S)(f, 0, a.width - e.width),
            y: (0, s.S)(m, 0, a.height - e.height),
          }
        );
      }
      function eL(t, e, i) {
        let a = (0, s.E)(i.padding);
        return "center" === e
          ? t.x + t.width / 2
          : "right" === e
          ? t.x + t.width - a.right
          : t.x + a.left;
      }
      function eO(t, e) {
        let i =
          e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
        return i ? t.override(i) : t;
      }
      let eE = {
        beforeTitle: s.aF,
        title(t) {
          if (t.length > 0) {
            let e = t[0],
              i = e.chart.data.labels,
              s = i ? i.length : 0;
            if (this && this.options && "dataset" === this.options.mode)
              return e.dataset.label || "";
            if (e.label) return e.label;
            if (s > 0 && e.dataIndex < s) return i[e.dataIndex];
          }
          return "";
        },
        afterTitle: s.aF,
        beforeBody: s.aF,
        beforeLabel: s.aF,
        label(t) {
          if (this && this.options && "dataset" === this.options.mode)
            return t.label + ": " + t.formattedValue || t.formattedValue;
          let e = t.dataset.label || "";
          e && (e += ": ");
          let i = t.formattedValue;
          return (0, s.k)(i) || (e += i), e;
        },
        labelColor(t) {
          let e = t.chart.getDatasetMeta(t.datasetIndex),
            i = e.controller.getStyle(t.dataIndex);
          return {
            borderColor: i.borderColor,
            backgroundColor: i.backgroundColor,
            borderWidth: i.borderWidth,
            borderDash: i.borderDash,
            borderDashOffset: i.borderDashOffset,
            borderRadius: 0,
          };
        },
        labelTextColor() {
          return this.options.bodyColor;
        },
        labelPointStyle(t) {
          let e = t.chart.getDatasetMeta(t.datasetIndex),
            i = e.controller.getStyle(t.dataIndex);
          return { pointStyle: i.pointStyle, rotation: i.rotation };
        },
        afterLabel: s.aF,
        afterBody: s.aF,
        beforeFooter: s.aF,
        footer: s.aF,
        afterFooter: s.aF,
      };
      function eA(t, e, i, s) {
        let a = t[e].call(i, s);
        return void 0 === a ? eE[e].call(i, s) : a;
      }
      class eT extends tf {
        static positioners = ew;
        constructor(t) {
          super(),
            (this.opacity = 0),
            (this._active = []),
            (this._eventPosition = void 0),
            (this._size = void 0),
            (this._cachedAnimations = void 0),
            (this._tooltipItems = []),
            (this.$animations = void 0),
            (this.$context = void 0),
            (this.chart = t.chart),
            (this.options = t.options),
            (this.dataPoints = void 0),
            (this.title = void 0),
            (this.beforeBody = void 0),
            (this.body = void 0),
            (this.afterBody = void 0),
            (this.footer = void 0),
            (this.xAlign = void 0),
            (this.yAlign = void 0),
            (this.x = void 0),
            (this.y = void 0),
            (this.height = void 0),
            (this.width = void 0),
            (this.caretX = void 0),
            (this.caretY = void 0),
            (this.labelColors = void 0),
            (this.labelPointStyles = void 0),
            (this.labelTextColors = void 0);
        }
        initialize(t) {
          (this.options = t),
            (this._cachedAnimations = void 0),
            (this.$context = void 0);
        }
        _resolveAnimations() {
          let t = this._cachedAnimations;
          if (t) return t;
          let e = this.chart,
            i = this.options.setContext(this.getContext()),
            s = i.enabled && e.options.animation && i.animations,
            a = new l(this.chart, s);
          return s._cacheable && (this._cachedAnimations = Object.freeze(a)), a;
        }
        getContext() {
          var t, e;
          return (
            this.$context ||
            (this.$context =
              ((t = this.chart.getContext()),
              (e = this._tooltipItems),
              (0, s.j)(t, { tooltip: this, tooltipItems: e, type: "tooltip" })))
          );
        }
        getTitle(t, e) {
          let { callbacks: i } = e,
            s = eA(i, "beforeTitle", this, t),
            a = eA(i, "title", this, t),
            n = eA(i, "afterTitle", this, t),
            r = [];
          return (r = ek(r, eD(s))), (r = ek(r, eD(a))), (r = ek(r, eD(n)));
        }
        getBeforeBody(t, e) {
          return ek([], eD(eA(e.callbacks, "beforeBody", this, t)));
        }
        getBody(t, e) {
          let { callbacks: i } = e,
            a = [];
          return (
            (0, s.F)(t, (t) => {
              let e = { before: [], lines: [], after: [] },
                s = eO(i, t);
              ek(e.before, eD(eA(s, "beforeLabel", this, t))),
                ek(e.lines, eA(s, "label", this, t)),
                ek(e.after, eD(eA(s, "afterLabel", this, t))),
                a.push(e);
            }),
            a
          );
        }
        getAfterBody(t, e) {
          return ek([], eD(eA(e.callbacks, "afterBody", this, t)));
        }
        getFooter(t, e) {
          let { callbacks: i } = e,
            s = eA(i, "beforeFooter", this, t),
            a = eA(i, "footer", this, t),
            n = eA(i, "afterFooter", this, t),
            r = [];
          return (r = ek(r, eD(s))), (r = ek(r, eD(a))), (r = ek(r, eD(n)));
        }
        _createItems(t) {
          let e, i;
          let a = this._active,
            n = this.chart.data,
            r = [],
            o = [],
            l = [],
            h = [];
          for (e = 0, i = a.length; e < i; ++e)
            h.push(
              (function (t, e) {
                let { element: i, datasetIndex: s, index: a } = e,
                  n = t.getDatasetMeta(s).controller,
                  { label: r, value: o } = n.getLabelAndValue(a);
                return {
                  chart: t,
                  label: r,
                  parsed: n.getParsed(a),
                  raw: t.data.datasets[s].data[a],
                  formattedValue: o,
                  dataset: n.getDataset(),
                  dataIndex: a,
                  datasetIndex: s,
                  element: i,
                };
              })(this.chart, a[e])
            );
          return (
            t.filter && (h = h.filter((e, i, s) => t.filter(e, i, s, n))),
            t.itemSort && (h = h.sort((e, i) => t.itemSort(e, i, n))),
            (0, s.F)(h, (e) => {
              let i = eO(t.callbacks, e);
              r.push(eA(i, "labelColor", this, e)),
                o.push(eA(i, "labelPointStyle", this, e)),
                l.push(eA(i, "labelTextColor", this, e));
            }),
            (this.labelColors = r),
            (this.labelPointStyles = o),
            (this.labelTextColors = l),
            (this.dataPoints = h),
            h
          );
        }
        update(t, e) {
          let i;
          let s = this.options.setContext(this.getContext()),
            a = this._active,
            n = [];
          if (a.length) {
            let t = ew[s.position].call(this, a, this._eventPosition);
            (n = this._createItems(s)),
              (this.title = this.getTitle(n, s)),
              (this.beforeBody = this.getBeforeBody(n, s)),
              (this.body = this.getBody(n, s)),
              (this.afterBody = this.getAfterBody(n, s)),
              (this.footer = this.getFooter(n, s));
            let e = (this._size = eP(this, s)),
              r = Object.assign({}, t, e),
              o = eS(this.chart, s, r),
              l = eC(s, r, o, this.chart);
            (this.xAlign = o.xAlign),
              (this.yAlign = o.yAlign),
              (i = {
                opacity: 1,
                x: l.x,
                y: l.y,
                width: e.width,
                height: e.height,
                caretX: t.x,
                caretY: t.y,
              });
          } else 0 !== this.opacity && (i = { opacity: 0 });
          (this._tooltipItems = n),
            (this.$context = void 0),
            i && this._resolveAnimations().update(this, i),
            t &&
              s.external &&
              s.external.call(this, {
                chart: this.chart,
                tooltip: this,
                replay: e,
              });
        }
        drawCaret(t, e, i, s) {
          let a = this.getCaretPosition(t, i, s);
          e.lineTo(a.x1, a.y1), e.lineTo(a.x2, a.y2), e.lineTo(a.x3, a.y3);
        }
        getCaretPosition(t, e, i) {
          let a, n, r, o, l, h;
          let { xAlign: d, yAlign: c } = this,
            { caretSize: u, cornerRadius: g } = i,
            {
              topLeft: p,
              topRight: f,
              bottomLeft: m,
              bottomRight: x,
            } = (0, s.aw)(g),
            { x: b, y: _ } = t,
            { width: v, height: y } = e;
          return (
            "center" === c
              ? ((l = _ + y / 2),
                "left" === d
                  ? ((n = (a = b) - u), (o = l + u), (h = l - u))
                  : ((n = (a = b + v) + u), (o = l - u), (h = l + u)),
                (r = a))
              : ((n =
                  "left" === d
                    ? b + Math.max(p, m) + u
                    : "right" === d
                    ? b + v - Math.max(f, x) - u
                    : this.caretX),
                "top" === c
                  ? ((l = (o = _) - u), (a = n - u), (r = n + u))
                  : ((l = (o = _ + y) + u), (a = n + u), (r = n - u)),
                (h = o)),
            { x1: a, x2: n, x3: r, y1: o, y2: l, y3: h }
          );
        }
        drawTitle(t, e, i) {
          let a, n, r;
          let o = this.title,
            l = o.length;
          if (l) {
            let h = (0, s.az)(i.rtl, this.x, this.width);
            for (
              r = 0,
                t.x = eL(this, i.titleAlign, i),
                e.textAlign = h.textAlign(i.titleAlign),
                e.textBaseline = "middle",
                a = (0, s.a0)(i.titleFont),
                n = i.titleSpacing,
                e.fillStyle = i.titleColor,
                e.font = a.string;
              r < l;
              ++r
            )
              e.fillText(o[r], h.x(t.x), t.y + a.lineHeight / 2),
                (t.y += a.lineHeight + n),
                r + 1 === l && (t.y += i.titleMarginBottom - n);
          }
        }
        _drawColorBox(t, e, i, a, n) {
          let r = this.labelColors[i],
            o = this.labelPointStyles[i],
            { boxHeight: l, boxWidth: h } = n,
            d = (0, s.a0)(n.bodyFont),
            c = eL(this, "left", n),
            u = a.x(c),
            g = l < d.lineHeight ? (d.lineHeight - l) / 2 : 0,
            p = e.y + g;
          if (n.usePointStyle) {
            let e = {
                radius: Math.min(h, l) / 2,
                pointStyle: o.pointStyle,
                rotation: o.rotation,
                borderWidth: 1,
              },
              i = a.leftForLtr(u, h) + h / 2,
              d = p + l / 2;
            (t.strokeStyle = n.multiKeyBackground),
              (t.fillStyle = n.multiKeyBackground),
              (0, s.at)(t, e, i, d),
              (t.strokeStyle = r.borderColor),
              (t.fillStyle = r.backgroundColor),
              (0, s.at)(t, e, i, d);
          } else {
            (t.lineWidth = (0, s.i)(r.borderWidth)
              ? Math.max(...Object.values(r.borderWidth))
              : r.borderWidth || 1),
              (t.strokeStyle = r.borderColor),
              t.setLineDash(r.borderDash || []),
              (t.lineDashOffset = r.borderDashOffset || 0);
            let e = a.leftForLtr(u, h),
              i = a.leftForLtr(a.xPlus(u, 1), h - 2),
              o = (0, s.aw)(r.borderRadius);
            Object.values(o).some((t) => 0 !== t)
              ? (t.beginPath(),
                (t.fillStyle = n.multiKeyBackground),
                (0, s.au)(t, { x: e, y: p, w: h, h: l, radius: o }),
                t.fill(),
                t.stroke(),
                (t.fillStyle = r.backgroundColor),
                t.beginPath(),
                (0, s.au)(t, { x: i, y: p + 1, w: h - 2, h: l - 2, radius: o }),
                t.fill())
              : ((t.fillStyle = n.multiKeyBackground),
                t.fillRect(e, p, h, l),
                t.strokeRect(e, p, h, l),
                (t.fillStyle = r.backgroundColor),
                t.fillRect(i, p + 1, h - 2, l - 2));
          }
          t.fillStyle = this.labelTextColors[i];
        }
        drawBody(t, e, i) {
          let a, n, r, o, l, h, d;
          let { body: c } = this,
            {
              bodySpacing: u,
              bodyAlign: g,
              displayColors: p,
              boxHeight: f,
              boxWidth: m,
              boxPadding: x,
            } = i,
            b = (0, s.a0)(i.bodyFont),
            _ = b.lineHeight,
            v = 0,
            y = (0, s.az)(i.rtl, this.x, this.width),
            M = function (i) {
              e.fillText(i, y.x(t.x + v), t.y + _ / 2), (t.y += _ + u);
            },
            w = y.textAlign(g);
          for (
            e.textAlign = g,
              e.textBaseline = "middle",
              e.font = b.string,
              t.x = eL(this, w, i),
              e.fillStyle = i.bodyColor,
              (0, s.F)(this.beforeBody, M),
              v =
                p && "right" !== w
                  ? "center" === g
                    ? m / 2 + x
                    : m + 2 + x
                  : 0,
              o = 0,
              h = c.length;
            o < h;
            ++o
          ) {
            for (
              a = c[o],
                n = this.labelTextColors[o],
                e.fillStyle = n,
                (0, s.F)(a.before, M),
                r = a.lines,
                p &&
                  r.length &&
                  (this._drawColorBox(e, t, o, y, i),
                  (_ = Math.max(b.lineHeight, f))),
                l = 0,
                d = r.length;
              l < d;
              ++l
            )
              M(r[l]), (_ = b.lineHeight);
            (0, s.F)(a.after, M);
          }
          (v = 0), (_ = b.lineHeight), (0, s.F)(this.afterBody, M), (t.y -= u);
        }
        drawFooter(t, e, i) {
          let a, n;
          let r = this.footer,
            o = r.length;
          if (o) {
            let l = (0, s.az)(i.rtl, this.x, this.width);
            for (
              t.x = eL(this, i.footerAlign, i),
                t.y += i.footerMarginTop,
                e.textAlign = l.textAlign(i.footerAlign),
                e.textBaseline = "middle",
                a = (0, s.a0)(i.footerFont),
                e.fillStyle = i.footerColor,
                e.font = a.string,
                n = 0;
              n < o;
              ++n
            )
              e.fillText(r[n], l.x(t.x), t.y + a.lineHeight / 2),
                (t.y += a.lineHeight + i.footerSpacing);
          }
        }
        drawBackground(t, e, i, a) {
          let { xAlign: n, yAlign: r } = this,
            { x: o, y: l } = t,
            { width: h, height: d } = i,
            {
              topLeft: c,
              topRight: u,
              bottomLeft: g,
              bottomRight: p,
            } = (0, s.aw)(a.cornerRadius);
          (e.fillStyle = a.backgroundColor),
            (e.strokeStyle = a.borderColor),
            (e.lineWidth = a.borderWidth),
            e.beginPath(),
            e.moveTo(o + c, l),
            "top" === r && this.drawCaret(t, e, i, a),
            e.lineTo(o + h - u, l),
            e.quadraticCurveTo(o + h, l, o + h, l + u),
            "center" === r && "right" === n && this.drawCaret(t, e, i, a),
            e.lineTo(o + h, l + d - p),
            e.quadraticCurveTo(o + h, l + d, o + h - p, l + d),
            "bottom" === r && this.drawCaret(t, e, i, a),
            e.lineTo(o + g, l + d),
            e.quadraticCurveTo(o, l + d, o, l + d - g),
            "center" === r && "left" === n && this.drawCaret(t, e, i, a),
            e.lineTo(o, l + c),
            e.quadraticCurveTo(o, l, o + c, l),
            e.closePath(),
            e.fill(),
            a.borderWidth > 0 && e.stroke();
        }
        _updateAnimationTarget(t) {
          let e = this.chart,
            i = this.$animations,
            s = i && i.x,
            a = i && i.y;
          if (s || a) {
            let i = ew[t.position].call(
              this,
              this._active,
              this._eventPosition
            );
            if (!i) return;
            let n = (this._size = eP(this, t)),
              r = Object.assign({}, i, this._size),
              o = eS(e, t, r),
              l = eC(t, r, o, e);
            (s._to !== l.x || a._to !== l.y) &&
              ((this.xAlign = o.xAlign),
              (this.yAlign = o.yAlign),
              (this.width = n.width),
              (this.height = n.height),
              (this.caretX = i.x),
              (this.caretY = i.y),
              this._resolveAnimations().update(this, l));
          }
        }
        _willRender() {
          return !!this.opacity;
        }
        draw(t) {
          let e = this.options.setContext(this.getContext()),
            i = this.opacity;
          if (!i) return;
          this._updateAnimationTarget(e);
          let a = { width: this.width, height: this.height },
            n = { x: this.x, y: this.y };
          i = 0.001 > Math.abs(i) ? 0 : i;
          let r = (0, s.E)(e.padding),
            o =
              this.title.length ||
              this.beforeBody.length ||
              this.body.length ||
              this.afterBody.length ||
              this.footer.length;
          e.enabled &&
            o &&
            (t.save(),
            (t.globalAlpha = i),
            this.drawBackground(n, t, a, e),
            (0, s.aA)(t, e.textDirection),
            (n.y += r.top),
            this.drawTitle(n, t, e),
            this.drawBody(n, t, e),
            this.drawFooter(n, t, e),
            (0, s.aC)(t, e.textDirection),
            t.restore());
        }
        getActiveElements() {
          return this._active || [];
        }
        setActiveElements(t, e) {
          let i = this._active,
            a = t.map(({ datasetIndex: t, index: e }) => {
              let i = this.chart.getDatasetMeta(t);
              if (!i) throw Error("Cannot find a dataset at index " + t);
              return { datasetIndex: t, element: i.data[e], index: e };
            }),
            n = !(0, s.ah)(i, a),
            r = this._positionChanged(a, e);
          (n || r) &&
            ((this._active = a),
            (this._eventPosition = e),
            (this._ignoreReplayEvents = !0),
            this.update(!0));
        }
        handleEvent(t, e, i = !0) {
          if (e && this._ignoreReplayEvents) return !1;
          this._ignoreReplayEvents = !1;
          let a = this.options,
            n = this._active || [],
            r = this._getActiveElements(t, n, e, i),
            o = this._positionChanged(r, t),
            l = e || !(0, s.ah)(r, n) || o;
          return (
            l &&
              ((this._active = r),
              (a.enabled || a.external) &&
                ((this._eventPosition = { x: t.x, y: t.y }),
                this.update(!0, e))),
            l
          );
        }
        _getActiveElements(t, e, i, s) {
          let a = this.options;
          if ("mouseout" === t.type) return [];
          if (!s) return e;
          let n = this.chart.getElementsAtEventForMode(t, a.mode, a, i);
          return a.reverse && n.reverse(), n;
        }
        _positionChanged(t, e) {
          let { caretX: i, caretY: s, options: a } = this,
            n = ew[a.position].call(this, t, e);
          return !1 !== n && (i !== n.x || s !== n.y);
        }
      }
      var eF = {
        id: "tooltip",
        _element: eT,
        positioners: ew,
        afterInit(t, e, i) {
          i && (t.tooltip = new eT({ chart: t, options: i }));
        },
        beforeUpdate(t, e, i) {
          t.tooltip && t.tooltip.initialize(i);
        },
        reset(t, e, i) {
          t.tooltip && t.tooltip.initialize(i);
        },
        afterDraw(t) {
          let e = t.tooltip;
          if (e && e._willRender()) {
            let i = { tooltip: e };
            if (
              !1 ===
              t.notifyPlugins("beforeTooltipDraw", { ...i, cancelable: !0 })
            )
              return;
            e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", i);
          }
        },
        afterEvent(t, e) {
          if (t.tooltip) {
            let i = e.replay;
            t.tooltip.handleEvent(e.event, i, e.inChartArea) &&
              (e.changed = !0);
          }
        },
        defaults: {
          enabled: !0,
          external: null,
          position: "average",
          backgroundColor: "rgba(0,0,0,0.8)",
          titleColor: "#fff",
          titleFont: { weight: "bold" },
          titleSpacing: 2,
          titleMarginBottom: 6,
          titleAlign: "left",
          bodyColor: "#fff",
          bodySpacing: 2,
          bodyFont: {},
          bodyAlign: "left",
          footerColor: "#fff",
          footerSpacing: 2,
          footerMarginTop: 6,
          footerFont: { weight: "bold" },
          footerAlign: "left",
          padding: 6,
          caretPadding: 2,
          caretSize: 5,
          cornerRadius: 6,
          boxHeight: (t, e) => e.bodyFont.size,
          boxWidth: (t, e) => e.bodyFont.size,
          multiKeyBackground: "#fff",
          displayColors: !0,
          boxPadding: 0,
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 0,
          animation: { duration: 400, easing: "easeOutQuart" },
          animations: {
            numbers: {
              type: "number",
              properties: ["x", "y", "width", "height", "caretX", "caretY"],
            },
            opacity: { easing: "linear", duration: 200 },
          },
          callbacks: eE,
        },
        defaultRoutes: {
          bodyFont: "font",
          footerFont: "font",
          titleFont: "font",
        },
        descriptors: {
          _scriptable: (t) =>
            "filter" !== t && "itemSort" !== t && "external" !== t,
          _indexable: !1,
          callbacks: { _scriptable: !1, _indexable: !1 },
          animation: { _fallback: !1 },
          animations: { _fallback: "animation" },
        },
        additionalOptionScopes: ["interaction"],
      };
      let ez = (t, e, i, s) => (
          "string" == typeof e
            ? ((i = t.push(e) - 1), s.unshift({ index: i, label: e }))
            : isNaN(e) && (i = null),
          i
        ),
        eR = (t, e) => (null === t ? null : (0, s.S)(Math.round(t), 0, e));
      function eI(t) {
        let e = this.getLabels();
        return t >= 0 && t < e.length ? e[t] : t;
      }
      class eV extends tw {
        static id = "category";
        static defaults = { ticks: { callback: eI } };
        constructor(t) {
          super(t),
            (this._startValue = void 0),
            (this._valueRange = 0),
            (this._addedLabels = []);
        }
        init(t) {
          let e = this._addedLabels;
          if (e.length) {
            let t = this.getLabels();
            for (let { index: i, label: s } of e) t[i] === s && t.splice(i, 1);
            this._addedLabels = [];
          }
          super.init(t);
        }
        parse(t, e) {
          if ((0, s.k)(t)) return null;
          let i = this.getLabels();
          return eR(
            (e =
              isFinite(e) && i[e] === t
                ? e
                : (function (t, e, i, s) {
                    let a = t.indexOf(e);
                    if (-1 === a) return ez(t, e, i, s);
                    let n = t.lastIndexOf(e);
                    return a !== n ? i : a;
                  })(i, t, (0, s.v)(e, t), this._addedLabels)),
            i.length - 1
          );
        }
        determineDataLimits() {
          let { minDefined: t, maxDefined: e } = this.getUserBounds(),
            { min: i, max: s } = this.getMinMax(!0);
          "ticks" !== this.options.bounds ||
            (t || (i = 0), e || (s = this.getLabels().length - 1)),
            (this.min = i),
            (this.max = s);
        }
        buildTicks() {
          let t = this.min,
            e = this.max,
            i = this.options.offset,
            s = [],
            a = this.getLabels();
          (a = 0 === t && e === a.length - 1 ? a : a.slice(t, e + 1)),
            (this._valueRange = Math.max(a.length - (i ? 0 : 1), 1)),
            (this._startValue = this.min - (i ? 0.5 : 0));
          for (let i = t; i <= e; i++) s.push({ value: i });
          return s;
        }
        getLabelForValue(t) {
          return eI.call(this, t);
        }
        configure() {
          super.configure(),
            this.isHorizontal() || (this._reversePixels = !this._reversePixels);
        }
        getPixelForValue(t) {
          return (
            "number" != typeof t && (t = this.parse(t)),
            null === t
              ? NaN
              : this.getPixelForDecimal(
                  (t - this._startValue) / this._valueRange
                )
          );
        }
        getPixelForTick(t) {
          let e = this.ticks;
          return t < 0 || t > e.length - 1
            ? null
            : this.getPixelForValue(e[t].value);
        }
        getValueForPixel(t) {
          return Math.round(
            this._startValue + this.getDecimalForPixel(t) * this._valueRange
          );
        }
        getBasePixel() {
          return this.bottom;
        }
      }
      function eB(t, e, { horizontal: i, minRotation: a }) {
        let n = (0, s.t)(a),
          r = 0.75 * e * ("" + t).length;
        return Math.min(e / ((i ? Math.sin(n) : Math.cos(n)) || 0.001), r);
      }
      class eN extends tw {
        constructor(t) {
          super(t),
            (this.start = void 0),
            (this.end = void 0),
            (this._startValue = void 0),
            (this._endValue = void 0),
            (this._valueRange = 0);
        }
        parse(t, e) {
          return (0, s.k)(t) ||
            (("number" == typeof t || t instanceof Number) && !isFinite(+t))
            ? null
            : +t;
        }
        handleTickRangeOptions() {
          let { beginAtZero: t } = this.options,
            { minDefined: e, maxDefined: i } = this.getUserBounds(),
            { min: a, max: n } = this,
            r = (t) => (a = e ? a : t),
            o = (t) => (n = i ? n : t);
          if (t) {
            let t = (0, s.s)(a),
              e = (0, s.s)(n);
            t < 0 && e < 0 ? o(0) : t > 0 && e > 0 && r(0);
          }
          if (a === n) {
            let e = 0 === n ? 1 : Math.abs(0.05 * n);
            o(n + e), t || r(a - e);
          }
          (this.min = a), (this.max = n);
        }
        getTickLimit() {
          let t;
          let e = this.options.ticks,
            { maxTicksLimit: i, stepSize: s } = e;
          return (
            s
              ? (t = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1) >
                  1e3 &&
                (console.warn(
                  `scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${t} ticks. Limiting to 1000.`
                ),
                (t = 1e3))
              : ((t = this.computeTickLimit()), (i = i || 11)),
            i && (t = Math.min(i, t)),
            t
          );
        }
        computeTickLimit() {
          return Number.POSITIVE_INFINITY;
        }
        buildTicks() {
          let t = this.options,
            e = t.ticks,
            i = this.getTickLimit();
          i = Math.max(2, i);
          let a = {
              maxTicks: i,
              bounds: t.bounds,
              min: t.min,
              max: t.max,
              precision: e.precision,
              step: e.stepSize,
              count: e.count,
              maxDigits: this._maxDigits(),
              horizontal: this.isHorizontal(),
              minRotation: e.minRotation || 0,
              includeBounds: !1 !== e.includeBounds,
            },
            n = this._range || this,
            r = (function (t, e) {
              let i, a, n, r;
              let o = [],
                {
                  bounds: l,
                  step: h,
                  min: d,
                  max: c,
                  precision: u,
                  count: g,
                  maxTicks: p,
                  maxDigits: f,
                  includeBounds: m,
                } = t,
                x = h || 1,
                b = p - 1,
                { min: _, max: v } = e,
                y = !(0, s.k)(d),
                M = !(0, s.k)(c),
                w = !(0, s.k)(g),
                k = (v - _) / (f + 1),
                D = (0, s.aH)((v - _) / b / x) * x;
              if (D < 1e-14 && !y && !M) return [{ value: _ }, { value: v }];
              (r = Math.ceil(v / D) - Math.floor(_ / D)) > b &&
                (D = (0, s.aH)((r * D) / b / x) * x),
                (0, s.k)(u) || (D = Math.ceil(D * (i = Math.pow(10, u))) / i),
                "ticks" === l
                  ? ((a = Math.floor(_ / D) * D), (n = Math.ceil(v / D) * D))
                  : ((a = _), (n = v)),
                y && M && h && (0, s.aI)((c - d) / h, D / 1e3)
                  ? ((r = Math.round(Math.min((c - d) / D, p))),
                    (D = (c - d) / r),
                    (a = d),
                    (n = c))
                  : w
                  ? ((a = y ? d : a), (D = ((n = M ? c : n) - a) / (r = g - 1)))
                  : ((r = (n - a) / D),
                    (r = (0, s.aJ)(r, Math.round(r), D / 1e3)
                      ? Math.round(r)
                      : Math.ceil(r)));
              let P = Math.max((0, s.aK)(D), (0, s.aK)(a));
              (i = Math.pow(10, (0, s.k)(u) ? P : u)),
                (a = Math.round(a * i) / i),
                (n = Math.round(n * i) / i);
              let S = 0;
              for (
                y &&
                (m && a !== d
                  ? (o.push({ value: d }),
                    a < d && S++,
                    (0, s.aJ)(
                      Math.round((a + S * D) * i) / i,
                      d,
                      eB(d, k, t)
                    ) && S++)
                  : a < d && S++);
                S < r;
                ++S
              ) {
                let t = Math.round((a + S * D) * i) / i;
                if (M && t > c) break;
                o.push({ value: t });
              }
              return (
                M && m && n !== c
                  ? o.length && (0, s.aJ)(o[o.length - 1].value, c, eB(c, k, t))
                    ? (o[o.length - 1].value = c)
                    : o.push({ value: c })
                  : (M && n !== c) || o.push({ value: n }),
                o
              );
            })(a, n);
          return (
            "ticks" === t.bounds && (0, s.aG)(r, this, "value"),
            t.reverse
              ? (r.reverse(), (this.start = this.max), (this.end = this.min))
              : ((this.start = this.min), (this.end = this.max)),
            r
          );
        }
        configure() {
          let t = this.ticks,
            e = this.min,
            i = this.max;
          if ((super.configure(), this.options.offset && t.length)) {
            let s = (i - e) / Math.max(t.length - 1, 1) / 2;
            (e -= s), (i += s);
          }
          (this._startValue = e),
            (this._endValue = i),
            (this._valueRange = i - e);
        }
        getLabelForValue(t) {
          return (0, s.o)(
            t,
            this.chart.options.locale,
            this.options.ticks.format
          );
        }
      }
      class eH extends eN {
        static id = "linear";
        static defaults = { ticks: { callback: s.aL.formatters.numeric } };
        determineDataLimits() {
          let { min: t, max: e } = this.getMinMax(!0);
          (this.min = (0, s.g)(t) ? t : 0),
            (this.max = (0, s.g)(e) ? e : 1),
            this.handleTickRangeOptions();
        }
        computeTickLimit() {
          let t = this.isHorizontal(),
            e = t ? this.width : this.height,
            i = (0, s.t)(this.options.ticks.minRotation),
            a = this._resolveTickFontOptions(0);
          return Math.ceil(
            e /
              Math.min(
                40,
                a.lineHeight / ((t ? Math.sin(i) : Math.cos(i)) || 0.001)
              )
          );
        }
        getPixelForValue(t) {
          return null === t
            ? NaN
            : this.getPixelForDecimal(
                (t - this._startValue) / this._valueRange
              );
        }
        getValueForPixel(t) {
          return (
            this._startValue + this.getDecimalForPixel(t) * this._valueRange
          );
        }
      }
      let eW = (t) => Math.floor((0, s.aM)(t)),
        ej = (t, e) => Math.pow(10, eW(t) + e);
      function e$(t) {
        let e = t / Math.pow(10, eW(t));
        return 1 === e;
      }
      function eU(t, e, i) {
        let s = Math.pow(10, i);
        return Math.ceil(e / s) - Math.floor(t / s);
      }
      class eY extends tw {
        static id = "logarithmic";
        static defaults = {
          ticks: {
            callback: s.aL.formatters.logarithmic,
            major: { enabled: !0 },
          },
        };
        constructor(t) {
          super(t),
            (this.start = void 0),
            (this.end = void 0),
            (this._startValue = void 0),
            (this._valueRange = 0);
        }
        parse(t, e) {
          let i = eN.prototype.parse.apply(this, [t, e]);
          if (0 === i) {
            this._zero = !0;
            return;
          }
          return (0, s.g)(i) && i > 0 ? i : null;
        }
        determineDataLimits() {
          let { min: t, max: e } = this.getMinMax(!0);
          (this.min = (0, s.g)(t) ? Math.max(0, t) : null),
            (this.max = (0, s.g)(e) ? Math.max(0, e) : null),
            this.options.beginAtZero && (this._zero = !0),
            this._zero &&
              this.min !== this._suggestedMin &&
              !(0, s.g)(this._userMin) &&
              (this.min =
                t === ej(this.min, 0) ? ej(this.min, -1) : ej(this.min, 0)),
            this.handleTickRangeOptions();
        }
        handleTickRangeOptions() {
          let { minDefined: t, maxDefined: e } = this.getUserBounds(),
            i = this.min,
            s = this.max,
            a = (e) => (i = t ? i : e),
            n = (t) => (s = e ? s : t);
          i === s && (i <= 0 ? (a(1), n(10)) : (a(ej(i, -1)), n(ej(s, 1)))),
            i <= 0 && a(ej(s, -1)),
            s <= 0 && n(ej(i, 1)),
            (this.min = i),
            (this.max = s);
        }
        buildTicks() {
          let t = this.options,
            e = { min: this._userMin, max: this._userMax },
            i = (function (t, { min: e, max: i }) {
              e = (0, s.O)(t.min, e);
              let a = [],
                n = eW(e),
                r = (function (t, e) {
                  let i = eW(e - t);
                  for (; eU(t, e, i) > 10; ) i++;
                  for (; 10 > eU(t, e, i); ) i--;
                  return Math.min(i, eW(t));
                })(e, i),
                o = r < 0 ? Math.pow(10, Math.abs(r)) : 1,
                l = Math.pow(10, r),
                h = n > r ? Math.pow(10, n) : 0,
                d = Math.round((e - h) * o) / o,
                c = Math.floor((e - h) / l / 10) * l * 10,
                u = Math.floor((d - c) / Math.pow(10, r)),
                g = (0, s.O)(
                  t.min,
                  Math.round((h + c + u * Math.pow(10, r)) * o) / o
                );
              for (; g < i; )
                a.push({ value: g, major: e$(g), significand: u }),
                  u >= 10 ? (u = u < 15 ? 15 : 20) : u++,
                  u >= 20 && ((u = 2), (o = ++r >= 0 ? 1 : o)),
                  (g = Math.round((h + c + u * Math.pow(10, r)) * o) / o);
              let p = (0, s.O)(t.max, g);
              return a.push({ value: p, major: e$(p), significand: u }), a;
            })(e, this);
          return (
            "ticks" === t.bounds && (0, s.aG)(i, this, "value"),
            t.reverse
              ? (i.reverse(), (this.start = this.max), (this.end = this.min))
              : ((this.start = this.min), (this.end = this.max)),
            i
          );
        }
        getLabelForValue(t) {
          return void 0 === t
            ? "0"
            : (0, s.o)(t, this.chart.options.locale, this.options.ticks.format);
        }
        configure() {
          let t = this.min;
          super.configure(),
            (this._startValue = (0, s.aM)(t)),
            (this._valueRange = (0, s.aM)(this.max) - (0, s.aM)(t));
        }
        getPixelForValue(t) {
          return ((void 0 === t || 0 === t) && (t = this.min),
          null === t || isNaN(t))
            ? NaN
            : this.getPixelForDecimal(
                t === this.min
                  ? 0
                  : ((0, s.aM)(t) - this._startValue) / this._valueRange
              );
        }
        getValueForPixel(t) {
          let e = this.getDecimalForPixel(t);
          return Math.pow(10, this._startValue + e * this._valueRange);
        }
      }
      function eQ(t) {
        let e = t.ticks;
        if (e.display && t.display) {
          let t = (0, s.E)(e.backdropPadding);
          return (0, s.v)(e.font && e.font.size, s.d.font.size) + t.height;
        }
        return 0;
      }
      function eX(t, e, i, s, a) {
        return t === s || t === a
          ? { start: e - i / 2, end: e + i / 2 }
          : t < s || t > a
          ? { start: e - i, end: e }
          : { start: e, end: e + i };
      }
      function eG(t, e, i, a) {
        let { ctx: n } = t;
        if (i) n.arc(t.xCenter, t.yCenter, e, 0, s.T);
        else {
          let i = t.getPointPosition(0, e);
          n.moveTo(i.x, i.y);
          for (let s = 1; s < a; s++)
            (i = t.getPointPosition(s, e)), n.lineTo(i.x, i.y);
        }
      }
      class eq extends eN {
        static id = "radialLinear";
        static defaults = {
          display: !0,
          animate: !0,
          position: "chartArea",
          angleLines: {
            display: !0,
            lineWidth: 1,
            borderDash: [],
            borderDashOffset: 0,
          },
          grid: { circular: !1 },
          startAngle: 0,
          ticks: { showLabelBackdrop: !0, callback: s.aL.formatters.numeric },
          pointLabels: {
            backdropColor: void 0,
            backdropPadding: 2,
            display: !0,
            font: { size: 10 },
            callback: (t) => t,
            padding: 5,
            centerPointLabels: !1,
          },
        };
        static defaultRoutes = {
          "angleLines.color": "borderColor",
          "pointLabels.color": "color",
          "ticks.color": "color",
        };
        static descriptors = { angleLines: { _fallback: "grid" } };
        constructor(t) {
          super(t),
            (this.xCenter = void 0),
            (this.yCenter = void 0),
            (this.drawingArea = void 0),
            (this._pointLabels = []),
            (this._pointLabelItems = []);
        }
        setDimensions() {
          let t = (this._padding = (0, s.E)(eQ(this.options) / 2)),
            e = (this.width = this.maxWidth - t.width),
            i = (this.height = this.maxHeight - t.height);
          (this.xCenter = Math.floor(this.left + e / 2 + t.left)),
            (this.yCenter = Math.floor(this.top + i / 2 + t.top)),
            (this.drawingArea = Math.floor(Math.min(e, i) / 2));
        }
        determineDataLimits() {
          let { min: t, max: e } = this.getMinMax(!1);
          (this.min = (0, s.g)(t) && !isNaN(t) ? t : 0),
            (this.max = (0, s.g)(e) && !isNaN(e) ? e : 0),
            this.handleTickRangeOptions();
        }
        computeTickLimit() {
          return Math.ceil(this.drawingArea / eQ(this.options));
        }
        generateTickLabels(t) {
          eN.prototype.generateTickLabels.call(this, t),
            (this._pointLabels = this.getLabels()
              .map((t, e) => {
                let i = (0, s.Q)(
                  this.options.pointLabels.callback,
                  [t, e],
                  this
                );
                return i || 0 === i ? i : "";
              })
              .filter((t, e) => this.chart.getDataVisibility(e)));
        }
        fit() {
          let t = this.options;
          t.display && t.pointLabels.display
            ? (function (t) {
                let e = {
                    l: t.left + t._padding.left,
                    r: t.right - t._padding.right,
                    t: t.top + t._padding.top,
                    b: t.bottom - t._padding.bottom,
                  },
                  i = Object.assign({}, e),
                  a = [],
                  n = [],
                  r = t._pointLabels.length,
                  o = t.options.pointLabels,
                  l = o.centerPointLabels ? s.P / r : 0;
                for (let c = 0; c < r; c++) {
                  var h, d;
                  let r = o.setContext(t.getPointLabelContext(c));
                  n[c] = r.padding;
                  let u = t.getPointPosition(c, t.drawingArea + n[c], l),
                    g = (0, s.a0)(r.font),
                    p =
                      ((h = t.ctx),
                      (d = t._pointLabels[c]),
                      (d = (0, s.b)(d) ? d : [d]),
                      {
                        w: (0, s.aN)(h, g.string, d),
                        h: d.length * g.lineHeight,
                      });
                  a[c] = p;
                  let f = (0, s.ay)(t.getIndexAngle(c) + l),
                    m = Math.round((0, s.U)(f)),
                    x = eX(m, u.x, p.w, 0, 180),
                    b = eX(m, u.y, p.h, 90, 270);
                  !(function (t, e, i, s, a) {
                    let n = Math.abs(Math.sin(i)),
                      r = Math.abs(Math.cos(i)),
                      o = 0,
                      l = 0;
                    s.start < e.l
                      ? ((o = (e.l - s.start) / n),
                        (t.l = Math.min(t.l, e.l - o)))
                      : s.end > e.r &&
                        ((o = (s.end - e.r) / n),
                        (t.r = Math.max(t.r, e.r + o))),
                      a.start < e.t
                        ? ((l = (e.t - a.start) / r),
                          (t.t = Math.min(t.t, e.t - l)))
                        : a.end > e.b &&
                          ((l = (a.end - e.b) / r),
                          (t.b = Math.max(t.b, e.b + l)));
                  })(i, e, f, x, b);
                }
                t.setCenterPoint(e.l - i.l, i.r - e.r, e.t - i.t, i.b - e.b),
                  (t._pointLabelItems = (function (t, e, i) {
                    let a;
                    let n = [],
                      r = t._pointLabels.length,
                      o = t.options,
                      { centerPointLabels: l, display: h } = o.pointLabels,
                      d = {
                        extra: eQ(o) / 2,
                        additionalAngle: l ? s.P / r : 0,
                      };
                    for (let o = 0; o < r; o++) {
                      (d.padding = i[o]), (d.size = e[o]);
                      let r = (function (t, e, i) {
                        var a, n, r, o;
                        let l = t.drawingArea,
                          {
                            extra: h,
                            additionalAngle: d,
                            padding: c,
                            size: u,
                          } = i,
                          g = t.getPointPosition(e, l + h + c, d),
                          p = Math.round((0, s.U)((0, s.ay)(g.angle + s.H))),
                          f =
                            ((a = g.y),
                            (n = u.h),
                            90 === p || 270 === p
                              ? (a -= n / 2)
                              : (p > 270 || p < 90) && (a -= n),
                            a),
                          m =
                            0 === p || 180 === p
                              ? "center"
                              : p < 180
                              ? "left"
                              : "right",
                          x =
                            ((r = g.x),
                            (o = u.w),
                            "right" === m
                              ? (r -= o)
                              : "center" === m && (r -= o / 2),
                            r);
                        return {
                          visible: !0,
                          x: g.x,
                          y: f,
                          textAlign: m,
                          left: x,
                          top: f,
                          right: x + u.w,
                          bottom: f + u.h,
                        };
                      })(t, o, d);
                      n.push(r),
                        "auto" === h &&
                          ((r.visible = (function (t, e) {
                            if (!e) return !0;
                            let { left: i, top: a, right: n, bottom: r } = t,
                              o =
                                (0, s.C)({ x: i, y: a }, e) ||
                                (0, s.C)({ x: i, y: r }, e) ||
                                (0, s.C)({ x: n, y: a }, e) ||
                                (0, s.C)({ x: n, y: r }, e);
                            return !o;
                          })(r, a)),
                          r.visible && (a = r));
                    }
                    return n;
                  })(t, a, n));
              })(this)
            : this.setCenterPoint(0, 0, 0, 0);
        }
        setCenterPoint(t, e, i, s) {
          (this.xCenter += Math.floor((t - e) / 2)),
            (this.yCenter += Math.floor((i - s) / 2)),
            (this.drawingArea -= Math.min(
              this.drawingArea / 2,
              Math.max(t, e, i, s)
            ));
        }
        getIndexAngle(t) {
          let e = s.T / (this._pointLabels.length || 1),
            i = this.options.startAngle || 0;
          return (0, s.ay)(t * e + (0, s.t)(i));
        }
        getDistanceFromCenterForValue(t) {
          if ((0, s.k)(t)) return NaN;
          let e = this.drawingArea / (this.max - this.min);
          return this.options.reverse ? (this.max - t) * e : (t - this.min) * e;
        }
        getValueForDistanceFromCenter(t) {
          if ((0, s.k)(t)) return NaN;
          let e = t / (this.drawingArea / (this.max - this.min));
          return this.options.reverse ? this.max - e : this.min + e;
        }
        getPointLabelContext(t) {
          let e = this._pointLabels || [];
          if (t >= 0 && t < e.length) {
            var i;
            let a = e[t];
            return (
              (i = this.getContext()),
              (0, s.j)(i, { label: a, index: t, type: "pointLabel" })
            );
          }
        }
        getPointPosition(t, e, i = 0) {
          let a = this.getIndexAngle(t) - s.H + i;
          return {
            x: Math.cos(a) * e + this.xCenter,
            y: Math.sin(a) * e + this.yCenter,
            angle: a,
          };
        }
        getPointPositionForValue(t, e) {
          return this.getPointPosition(
            t,
            this.getDistanceFromCenterForValue(e)
          );
        }
        getBasePosition(t) {
          return this.getPointPositionForValue(t || 0, this.getBaseValue());
        }
        getPointLabelPosition(t) {
          let {
            left: e,
            top: i,
            right: s,
            bottom: a,
          } = this._pointLabelItems[t];
          return { left: e, top: i, right: s, bottom: a };
        }
        drawBackground() {
          let {
            backgroundColor: t,
            grid: { circular: e },
          } = this.options;
          if (t) {
            let i = this.ctx;
            i.save(),
              i.beginPath(),
              eG(
                this,
                this.getDistanceFromCenterForValue(this._endValue),
                e,
                this._pointLabels.length
              ),
              i.closePath(),
              (i.fillStyle = t),
              i.fill(),
              i.restore();
          }
        }
        drawGrid() {
          let t, e, i;
          let a = this.ctx,
            n = this.options,
            { angleLines: r, grid: o, border: l } = n,
            h = this._pointLabels.length;
          if (
            (n.pointLabels.display &&
              (function (t, e) {
                let {
                  ctx: i,
                  options: { pointLabels: a },
                } = t;
                for (let n = e - 1; n >= 0; n--) {
                  let e = t._pointLabelItems[n];
                  if (!e.visible) continue;
                  let r = a.setContext(t.getPointLabelContext(n));
                  !(function (t, e, i) {
                    let { left: a, top: n, right: r, bottom: o } = i,
                      { backdropColor: l } = e;
                    if (!(0, s.k)(l)) {
                      let i = (0, s.aw)(e.borderRadius),
                        h = (0, s.E)(e.backdropPadding);
                      t.fillStyle = l;
                      let d = a - h.left,
                        c = n - h.top,
                        u = r - a + h.width,
                        g = o - n + h.height;
                      Object.values(i).some((t) => 0 !== t)
                        ? (t.beginPath(),
                          (0, s.au)(t, { x: d, y: c, w: u, h: g, radius: i }),
                          t.fill())
                        : t.fillRect(d, c, u, g);
                    }
                  })(i, r, e);
                  let o = (0, s.a0)(r.font),
                    { x: l, y: h, textAlign: d } = e;
                  (0, s.Z)(i, t._pointLabels[n], l, h + o.lineHeight / 2, o, {
                    color: r.color,
                    textAlign: d,
                    textBaseline: "middle",
                  });
                }
              })(this, h),
            o.display &&
              this.ticks.forEach((t, i) => {
                if (0 !== i) {
                  e = this.getDistanceFromCenterForValue(t.value);
                  let s = this.getContext(i),
                    a = o.setContext(s),
                    n = l.setContext(s);
                  !(function (t, e, i, s, a) {
                    let n = t.ctx,
                      r = e.circular,
                      { color: o, lineWidth: l } = e;
                    (r || s) &&
                      o &&
                      l &&
                      !(i < 0) &&
                      (n.save(),
                      (n.strokeStyle = o),
                      (n.lineWidth = l),
                      n.setLineDash(a.dash),
                      (n.lineDashOffset = a.dashOffset),
                      n.beginPath(),
                      eG(t, i, r, s),
                      n.closePath(),
                      n.stroke(),
                      n.restore());
                  })(this, a, e, h, n);
                }
              }),
            r.display)
          ) {
            for (a.save(), t = h - 1; t >= 0; t--) {
              let s = r.setContext(this.getPointLabelContext(t)),
                { color: o, lineWidth: l } = s;
              l &&
                o &&
                ((a.lineWidth = l),
                (a.strokeStyle = o),
                a.setLineDash(s.borderDash),
                (a.lineDashOffset = s.borderDashOffset),
                (e = this.getDistanceFromCenterForValue(
                  n.ticks.reverse ? this.min : this.max
                )),
                (i = this.getPointPosition(t, e)),
                a.beginPath(),
                a.moveTo(this.xCenter, this.yCenter),
                a.lineTo(i.x, i.y),
                a.stroke());
            }
            a.restore();
          }
        }
        drawBorder() {}
        drawLabels() {
          let t, e;
          let i = this.ctx,
            a = this.options,
            n = a.ticks;
          if (!n.display) return;
          let r = this.getIndexAngle(0);
          i.save(),
            i.translate(this.xCenter, this.yCenter),
            i.rotate(r),
            (i.textAlign = "center"),
            (i.textBaseline = "middle"),
            this.ticks.forEach((r, o) => {
              if (0 === o && !a.reverse) return;
              let l = n.setContext(this.getContext(o)),
                h = (0, s.a0)(l.font);
              if (
                ((t = this.getDistanceFromCenterForValue(this.ticks[o].value)),
                l.showLabelBackdrop)
              ) {
                (i.font = h.string),
                  (e = i.measureText(r.label).width),
                  (i.fillStyle = l.backdropColor);
                let a = (0, s.E)(l.backdropPadding);
                i.fillRect(
                  -e / 2 - a.left,
                  -t - h.size / 2 - a.top,
                  e + a.width,
                  h.size + a.height
                );
              }
              (0, s.Z)(i, r.label, 0, -t, h, { color: l.color });
            }),
            i.restore();
        }
        drawTitle() {}
      }
      let eK = {
          millisecond: { common: !0, size: 1, steps: 1e3 },
          second: { common: !0, size: 1e3, steps: 60 },
          minute: { common: !0, size: 6e4, steps: 60 },
          hour: { common: !0, size: 36e5, steps: 24 },
          day: { common: !0, size: 864e5, steps: 30 },
          week: { common: !1, size: 6048e5, steps: 4 },
          month: { common: !0, size: 2628e6, steps: 12 },
          quarter: { common: !1, size: 7884e6, steps: 4 },
          year: { common: !0, size: 3154e7 },
        },
        eJ = Object.keys(eK);
      function eZ(t, e) {
        return t - e;
      }
      function e0(t, e) {
        if ((0, s.k)(e)) return null;
        let i = t._adapter,
          { parser: a, round: n, isoWeekday: r } = t._parseOpts,
          o = e;
        return ("function" == typeof a && (o = a(o)),
        (0, s.g)(o) || (o = "string" == typeof a ? i.parse(o, a) : i.parse(o)),
        null === o)
          ? null
          : (n &&
              (o =
                "week" === n && ((0, s.x)(r) || !0 === r)
                  ? i.startOf(o, "isoWeek", r)
                  : i.startOf(o, n)),
            +o);
      }
      function e1(t, e, i, s) {
        let a = eJ.length;
        for (let n = eJ.indexOf(t); n < a - 1; ++n) {
          let t = eK[eJ[n]],
            a = t.steps ? t.steps : Number.MAX_SAFE_INTEGER;
          if (t.common && Math.ceil((i - e) / (a * t.size)) <= s) return eJ[n];
        }
        return eJ[a - 1];
      }
      function e2(t, e, i) {
        if (i) {
          if (i.length) {
            let { lo: a, hi: n } = (0, s.aP)(i, e),
              r = i[a] >= e ? i[a] : i[n];
            t[r] = !0;
          }
        } else t[e] = !0;
      }
      function e5(t, e, i) {
        let s, a;
        let n = [],
          r = {},
          o = e.length;
        for (s = 0; s < o; ++s)
          (r[(a = e[s])] = s), n.push({ value: a, major: !1 });
        return 0 !== o && i
          ? (function (t, e, i, s) {
              let a, n;
              let r = t._adapter,
                o = +r.startOf(e[0].value, s),
                l = e[e.length - 1].value;
              for (a = o; a <= l; a = +r.add(a, 1, s))
                (n = i[a]) >= 0 && (e[n].major = !0);
              return e;
            })(t, n, r, i)
          : n;
      }
      class e3 extends tw {
        static id = "time";
        static defaults = {
          bounds: "data",
          adapters: {},
          time: {
            parser: !1,
            unit: !1,
            round: !1,
            isoWeekday: !1,
            minUnit: "millisecond",
            displayFormats: {},
          },
          ticks: { source: "auto", callback: !1, major: { enabled: !1 } },
        };
        constructor(t) {
          super(t),
            (this._cache = { data: [], labels: [], all: [] }),
            (this._unit = "day"),
            (this._majorUnit = void 0),
            (this._offsets = {}),
            (this._normalized = !1),
            (this._parseOpts = void 0);
        }
        init(t, e = {}) {
          let i = t.time || (t.time = {}),
            a = (this._adapter = new R._date(t.adapters.date));
          a.init(e),
            (0, s.ab)(i.displayFormats, a.formats()),
            (this._parseOpts = {
              parser: i.parser,
              round: i.round,
              isoWeekday: i.isoWeekday,
            }),
            super.init(t),
            (this._normalized = e.normalized);
        }
        parse(t, e) {
          return void 0 === t ? null : e0(this, t);
        }
        beforeLayout() {
          super.beforeLayout(),
            (this._cache = { data: [], labels: [], all: [] });
        }
        determineDataLimits() {
          let t = this.options,
            e = this._adapter,
            i = t.time.unit || "day",
            {
              min: a,
              max: n,
              minDefined: r,
              maxDefined: o,
            } = this.getUserBounds();
          function l(t) {
            r || isNaN(t.min) || (a = Math.min(a, t.min)),
              o || isNaN(t.max) || (n = Math.max(n, t.max));
          }
          (r && o) ||
            (l(this._getLabelBounds()),
            ("ticks" !== t.bounds || "labels" !== t.ticks.source) &&
              l(this.getMinMax(!1))),
            (a = (0, s.g)(a) && !isNaN(a) ? a : +e.startOf(Date.now(), i)),
            (n = (0, s.g)(n) && !isNaN(n) ? n : +e.endOf(Date.now(), i) + 1),
            (this.min = Math.min(a, n - 1)),
            (this.max = Math.max(a + 1, n));
        }
        _getLabelBounds() {
          let t = this.getLabelTimestamps(),
            e = Number.POSITIVE_INFINITY,
            i = Number.NEGATIVE_INFINITY;
          return (
            t.length && ((e = t[0]), (i = t[t.length - 1])), { min: e, max: i }
          );
        }
        buildTicks() {
          let t = this.options,
            e = t.time,
            i = t.ticks,
            a =
              "labels" === i.source
                ? this.getLabelTimestamps()
                : this._generate();
          "ticks" === t.bounds &&
            a.length &&
            ((this.min = this._userMin || a[0]),
            (this.max = this._userMax || a[a.length - 1]));
          let n = this.min,
            r = this.max,
            o = (0, s.aO)(a, n, r);
          return (
            (this._unit =
              e.unit ||
              (i.autoSkip
                ? e1(e.minUnit, this.min, this.max, this._getLabelCapacity(n))
                : (function (t, e, i, s, a) {
                    for (let n = eJ.length - 1; n >= eJ.indexOf(i); n--) {
                      let i = eJ[n];
                      if (eK[i].common && t._adapter.diff(a, s, i) >= e - 1)
                        return i;
                    }
                    return eJ[i ? eJ.indexOf(i) : 0];
                  })(this, o.length, e.minUnit, this.min, this.max))),
            (this._majorUnit =
              i.major.enabled && "year" !== this._unit
                ? (function (t) {
                    for (let e = eJ.indexOf(t) + 1, i = eJ.length; e < i; ++e)
                      if (eK[eJ[e]].common) return eJ[e];
                  })(this._unit)
                : void 0),
            this.initOffsets(a),
            t.reverse && o.reverse(),
            e5(this, o, this._majorUnit)
          );
        }
        afterAutoSkip() {
          this.options.offsetAfterAutoskip &&
            this.initOffsets(this.ticks.map((t) => +t.value));
        }
        initOffsets(t = []) {
          let e,
            i,
            a = 0,
            n = 0;
          this.options.offset &&
            t.length &&
            ((e = this.getDecimalForValue(t[0])),
            (a =
              1 === t.length ? 1 - e : (this.getDecimalForValue(t[1]) - e) / 2),
            (i = this.getDecimalForValue(t[t.length - 1])),
            (n =
              1 === t.length
                ? i
                : (i - this.getDecimalForValue(t[t.length - 2])) / 2));
          let r = t.length < 3 ? 0.5 : 0.25;
          (a = (0, s.S)(a, 0, r)),
            (n = (0, s.S)(n, 0, r)),
            (this._offsets = { start: a, end: n, factor: 1 / (a + 1 + n) });
        }
        _generate() {
          let t, e;
          let i = this._adapter,
            a = this.min,
            n = this.max,
            r = this.options,
            o = r.time,
            l = o.unit || e1(o.minUnit, a, n, this._getLabelCapacity(a)),
            h = (0, s.v)(r.ticks.stepSize, 1),
            d = "week" === l && o.isoWeekday,
            c = (0, s.x)(d) || !0 === d,
            u = {},
            g = a;
          if (
            (c && (g = +i.startOf(g, "isoWeek", d)),
            (g = +i.startOf(g, c ? "day" : l)),
            i.diff(n, a, l) > 1e5 * h)
          )
            throw Error(
              a +
                " and " +
                n +
                " are too far apart with stepSize of " +
                h +
                " " +
                l
            );
          let p = "data" === r.ticks.source && this.getDataTimestamps();
          for (t = g, e = 0; t < n; t = +i.add(t, h, l), e++) e2(u, t, p);
          return (
            (t === n || "ticks" === r.bounds || 1 === e) && e2(u, t, p),
            Object.keys(u)
              .sort((t, e) => t - e)
              .map((t) => +t)
          );
        }
        getLabelForValue(t) {
          let e = this._adapter,
            i = this.options.time;
          return i.tooltipFormat
            ? e.format(t, i.tooltipFormat)
            : e.format(t, i.displayFormats.datetime);
        }
        format(t, e) {
          let i = this.options,
            s = i.time.displayFormats,
            a = this._unit,
            n = e || s[a];
          return this._adapter.format(t, n);
        }
        _tickFormatFunction(t, e, i, a) {
          let n = this.options,
            r = n.ticks.callback;
          if (r) return (0, s.Q)(r, [t, e, i], this);
          let o = n.time.displayFormats,
            l = this._unit,
            h = this._majorUnit,
            d = l && o[l],
            c = h && o[h],
            u = i[e],
            g = h && c && u && u.major;
          return this._adapter.format(t, a || (g ? c : d));
        }
        generateTickLabels(t) {
          let e, i, s;
          for (e = 0, i = t.length; e < i; ++e)
            (s = t[e]).label = this._tickFormatFunction(s.value, e, t);
        }
        getDecimalForValue(t) {
          return null === t ? NaN : (t - this.min) / (this.max - this.min);
        }
        getPixelForValue(t) {
          let e = this._offsets,
            i = this.getDecimalForValue(t);
          return this.getPixelForDecimal((e.start + i) * e.factor);
        }
        getValueForPixel(t) {
          let e = this._offsets,
            i = this.getDecimalForPixel(t) / e.factor - e.end;
          return this.min + i * (this.max - this.min);
        }
        _getLabelSize(t) {
          let e = this.options.ticks,
            i = this.ctx.measureText(t).width,
            a = (0, s.t)(this.isHorizontal() ? e.maxRotation : e.minRotation),
            n = Math.cos(a),
            r = Math.sin(a),
            o = this._resolveTickFontOptions(0).size;
          return { w: i * n + o * r, h: i * r + o * n };
        }
        _getLabelCapacity(t) {
          let e = this.options.time,
            i = e.displayFormats,
            s = i[e.unit] || i.millisecond,
            a = this._tickFormatFunction(
              t,
              0,
              e5(this, [t], this._majorUnit),
              s
            ),
            n = this._getLabelSize(a),
            r =
              Math.floor(
                this.isHorizontal() ? this.width / n.w : this.height / n.h
              ) - 1;
          return r > 0 ? r : 1;
        }
        getDataTimestamps() {
          let t,
            e,
            i = this._cache.data || [];
          if (i.length) return i;
          let s = this.getMatchingVisibleMetas();
          if (this._normalized && s.length)
            return (this._cache.data =
              s[0].controller.getAllParsedValues(this));
          for (t = 0, e = s.length; t < e; ++t)
            i = i.concat(s[t].controller.getAllParsedValues(this));
          return (this._cache.data = this.normalize(i));
        }
        getLabelTimestamps() {
          let t, e;
          let i = this._cache.labels || [];
          if (i.length) return i;
          let s = this.getLabels();
          for (t = 0, e = s.length; t < e; ++t) i.push(e0(this, s[t]));
          return (this._cache.labels = this._normalized
            ? i
            : this.normalize(i));
        }
        normalize(t) {
          return (0, s._)(t.sort(eZ));
        }
      }
      function e6(t, e, i) {
        let a,
          n,
          r,
          o,
          l = 0,
          h = t.length - 1;
        i
          ? (e >= t[l].pos &&
              e <= t[h].pos &&
              ({ lo: l, hi: h } = (0, s.B)(t, "pos", e)),
            ({ pos: a, time: r } = t[l]),
            ({ pos: n, time: o } = t[h]))
          : (e >= t[l].time &&
              e <= t[h].time &&
              ({ lo: l, hi: h } = (0, s.B)(t, "time", e)),
            ({ time: a, pos: r } = t[l]),
            ({ time: n, pos: o } = t[h]));
        let d = n - a;
        return d ? r + ((o - r) * (e - a)) / d : r;
      }
      class e4 extends e3 {
        static id = "timeseries";
        static defaults = e3.defaults;
        constructor(t) {
          super(t),
            (this._table = []),
            (this._minPos = void 0),
            (this._tableRange = void 0);
        }
        initOffsets() {
          let t = this._getTimestampsForTable(),
            e = (this._table = this.buildLookupTable(t));
          (this._minPos = e6(e, this.min)),
            (this._tableRange = e6(e, this.max) - this._minPos),
            super.initOffsets(t);
        }
        buildLookupTable(t) {
          let e, i, s;
          let { min: a, max: n } = this,
            r = [],
            o = [];
          for (e = 0, i = t.length; e < i; ++e)
            (s = t[e]) >= a && s <= n && r.push(s);
          if (r.length < 2)
            return [
              { time: a, pos: 0 },
              { time: n, pos: 1 },
            ];
          for (e = 0, i = r.length; e < i; ++e)
            Math.round((r[e + 1] + r[e - 1]) / 2) !== (s = r[e]) &&
              o.push({ time: s, pos: e / (i - 1) });
          return o;
        }
        _getTimestampsForTable() {
          let t = this._cache.all || [];
          if (t.length) return t;
          let e = this.getDataTimestamps(),
            i = this.getLabelTimestamps();
          return (
            (t =
              e.length && i.length
                ? this.normalize(e.concat(i))
                : e.length
                ? e
                : i),
            (t = this._cache.all = t)
          );
        }
        getDecimalForValue(t) {
          return (e6(this._table, t) - this._minPos) / this._tableRange;
        }
        getValueForPixel(t) {
          let e = this._offsets,
            i = this.getDecimalForPixel(t) / e.factor - e.end;
          return e6(this._table, i * this._tableRange + this._minPos, !0);
        }
      }
    },
  },
]);
