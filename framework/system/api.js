"use strict";
var _getIterator2 = require("babel-runtime/core-js/get-iterator"),
    _getIterator3 = _interopRequireDefault(_getIterator2),
    _regenerator = require("babel-runtime/regenerator"),
    _regenerator2 = _interopRequireDefault(_regenerator),
    _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator"),
    _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
var private_ = {},
    self = null,
    library = null,
    modules = null;

function Api(e, r) {
    library = r, e(null, self = this)
}
private_.apies = {}, private_.appApiHandlers = {}, private_.loaded = !1, private_.ns = function(e, r) {
    var t, a;
    t = e[(a = r.split("."))[0]];
    for (var n = 0; n < a.length && (t = t[(a = a.slice(1))[0]]); n++);
    return t
}, private_.applyApiHandler = function(e, r, t) {
    var a = this;
    (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function n() {
        var o;
        return _regenerator2.default.wrap(function(a) {
            for (;;) switch (a.prev = a.next) {
                case 0:
                    return a.prev = 0, a.next = 3, e(r);
                case 3:
                    o = a.sent, t(null, {
                        response: o
                    }), a.next = 10;
                    break;
                case 7:
                    a.prev = 7, a.t0 = a.catch(0), t(a.t0.toString());
                case 10:
                case "end":
                    return a.stop()
            }
        }, n, a, [
            [0, 7]
        ])
    }))()
}, Api.prototype.onBind = function(e) {
    modules = e
}, Api.prototype.onBlockchainLoaded = function() {
    private_.loaded = !0;
    try {
        var e = require("../routes.json")
    } catch (e) {
        app.logger.error("Failed to load routes.json"), process.exit(4)
    }
    e.forEach(function(e) {
        private_.apies[e.method + " " + e.path] = private_.ns(modules, e.handler)
    });
    var r = app.route.getRoutes(),
        t = !0,
        a = !1,
        n = void 0;
    try {
        for (var o, i = (0, _getIterator3.default)(r); !(t = (o = i.next()).done); t = !0) {
            var p = o.value;
            private_.appApiHandlers[p.method + " " + p.path] = p.handler
        }
    } catch (e) {
        a = !0, n = e
    } finally {
        try {
            !t && i.return && i.return()
        } finally {
            if (a) throw n
        }
    }(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function e() {
        var t, a, n, o, i, p;
        return _regenerator2.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
                case 0:
                    e.prev = 0, t = !0, a = !1, n = void 0, e.prev = 4, o = (0, _getIterator3.default)(r);
                case 6:
                    if (t = (i = o.next()).done) {
                        e.next = 14;
                        break
                    }
                    return p = i.value, app.logger.info("register app interface", p.method, p.path), e.next = 11, PIFY(modules.api.dapps.registerInterface)(p);
                case 11:
                    t = !0, e.next = 6;
                    break;
                case 14:
                    e.next = 20;
                    break;
                case 16:
                    e.prev = 16, e.t0 = e.catch(4), a = !0, n = e.t0;
                case 20:
                    e.prev = 20, e.prev = 21, !t && o.return && o.return();
                case 23:
                    if (e.prev = 23, !a) {
                        e.next = 26;
                        break
                    }
                    throw n;
                case 26:
                    return e.finish(23);
                case 27:
                    return e.finish(20);
                case 28:
                    e.next = 35;
                    break;
                case 30:
                    return e.prev = 30, e.t1 = e.catch(0), app.logger.error("Failed to register dapp interface", e.t1), process.exit(5), e.abrupt("return");
                case 35:
                case "end":
                    return e.stop()
            }
        }, e, this, [
            [0, 30],
            [4, 16, 20, 28],
            [21, , 23, 27]
        ])
    }))(), library.sandbox.onMessage(function(e, r, t) {
        var a = private_.apies[e.method + " " + e.path];
        if (a) a(e.query, function(e, r) {
            e && (e = e.toString()), t(e, {
                response: r
            })
        });
        else {
            if (!(a = private_.appApiHandlers[e.method + " " + e.path])) return t("API call not found");
            private_.applyApiHandler(a, e.query, t)
        }
    }), modules.api.dapps.setReady(function(e) {
        e ? app.logger.error("app set ready failed: " + e) : app.logger.info("app set ready success")
    })
}, Api.prototype.message = function(e, r) {
    library.bus.message("message", e.query), r(null, {})
}, module.exports = Api;