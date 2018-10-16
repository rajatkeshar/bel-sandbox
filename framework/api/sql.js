"use strict";

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function Sql(e, r) {
    library = r, e(null, self = this)
}
var _keys = require("babel-runtime/core-js/object/keys"),
    _keys2 = _interopRequireDefault(_keys),
    _getIterator2 = require("babel-runtime/core-js/get-iterator"),
    _getIterator3 = _interopRequireDefault(_getIterator2),
    util = require("util"),
    private_ = {},
    self = null,
    library = null,
    modules = null;
private_.row2object = function(e) {
    for (var r = {}, t = this.length, a = 0; a < t; a++) r[this[a]] = e[this[a]];
    return r
}, private_.row2parsed = function(e) {
    var r = [],
        t = !0,
        a = !1,
        l = void 0;
    try {
        for (var n, o = (0, _getIterator3.default)((0, _keys2.default)(e)); !(t = (n = o.next()).done); t = !0) {
            var s = n.value;
            r.push(e[s])
        }
    } catch (e) {
        a = !0, l = e
    } finally {
        try {
            !t && o.return && o.return()
        } finally {
            if (a) throw l
        }
    }
    for (var i = {}, u = null, p = this.f, f = this.p, c = p.length, d = 0; d < c; d++) u = r[d], f[d] === Buffer ? i[p[d]] = f[d](u, "hex") : f[d] === Array ? i[p[d]] = r ? u.split(",") : [] : u && (i[p[d]] = f[d](u));
    return i
}, private_.parseFields = function(e) {
    for (var r, t = (0, _keys2.default)(e), a = [], l = t.length, n = 0; n < l; n++) r = e[t[n]], a[n] = r === Boolean ? Boolean : r === Date ? Date : r || String;
    return {
        f: t,
        p: a
    }
}, Sql.prototype.select = function(e, r, t) {
    "function" == typeof r && (t = r, r = null);
    var a = {
        call: "sql#select",
        args: e
    };
    library.sandbox.sendMessage(a, function(e, a) {
        r && !e && (a = util.isArray(r) ? a.map(private_.row2object, r) : a.map(private_.row2parsed, private_.parseFields(r))), t(e, a)
    })
}, Sql.prototype.insert = function(e, r) {
    var t = {
        call: "sql#insert",
        args: e
    };
    library.sandbox.sendMessage(t, r)
}, Sql.prototype.batch = function(e, r) {
    var t = {
        call: "sql#batch",
        args: e
    };
    library.sandbox.sendMessage(t, r)
}, Sql.prototype.update = function(e, r) {
    var t = {
        call: "sql#update",
        args: e
    };
    library.sandbox.sendMessage(t, r)
}, Sql.prototype.remove = function(e, r) {
    console.log("calling sql remove function");
    var t = {
        call: "sql#remove",
        args: e
    };
    library.sandbox.sendMessage(t, r)
}, Sql.prototype.onBind = function(e) {
    modules = e
}, module.exports = Sql;