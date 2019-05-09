(window.webpackJsonp = window.webpackJsonp || []).push([
  [2],
  {
    111: function(e, t, n) {},
    112: function(e, t, n) {},
    113: function(e, t, n) {
      "use strict";
      n.r(t);
      var r = n(0),
        a = n.n(r),
        c = n(38),
        o = n(5),
        i = n(10),
        u = n.n(i),
        s = n(21),
        l = n(27),
        p = n(6),
        m = n(52),
        d = n(4),
        h = n(20),
        f = n(22),
        b = n(11),
        E = n.n(b),
        g = { currentProfile: {} },
        O = function(e) {
          return function(e) {
            return new Promise(function(t) {
              var n,
                r = E.a.getJSON("user");
              (n = Object(f.a)({}, r)),
                e({ type: "auth/SET_CURRENT_PROFILE", profile: n }),
                t(n);
            });
          };
        },
        y = Object(p.c)({
          auth: h.a,
          profile: function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : g,
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case "auth/SET_CURRENT_PROFILE":
                return Object(f.a)({}, e, { currentProfile: t.profile });
              default:
                return e;
            }
          }
        }),
        j = !(
          "undefined" !== typeof window &&
          window.document &&
          window.document.createElement
        ),
        v = n(13),
        w = n(14),
        k = n(16),
        A = n(15),
        U = n(17),
        x = n(23),
        T = n.n(x),
        C = n(31),
        _ = n(37),
        N = n(33),
        P = n(115),
        R = [
          { to: "/tests/admin", text: "All tests", type: "admin" },
          { to: "/add/doctor", text: "Vytvorit doctora", type: "admin" },
          { to: "/create", text: "Create test", type: "admin" },
          { to: "/list/all/doctor", text: "Lists doctors", type: "admin" }
        ],
        S = [
          { to: "/list/all/pacient", text: "Lists pacient", type: "doctor" },
          { to: "/add/pacient", text: "Vytvorit pacienta", type: "doctor" }
        ],
        D = [
          { to: "/tests/pacient", text: "Tests", type: "pacient" },
          { to: "/results/pacient", text: "Results", type: "pacient" }
        ],
        L = function(e) {
          var t = e.to,
            n = e.text;
          return a.a.createElement(
            "li",
            null,
            a.a.createElement(P.a, { to: t }, n)
          );
        },
        X = (function(e) {
          function t(e) {
            var n;
            return (
              Object(v.a)(this, t),
              ((n = Object(k.a)(
                this,
                Object(A.a)(t).call(this, e)
              )).onLogout = function() {
                n.props.logoutUser();
              }),
              (n.state = {
                menu: [{ to: "/", text: "Homepage", type: "all" }],
                user: {}
              }),
              n
            );
          }
          return (
            Object(U.a)(t, e),
            Object(w.a)(t, [
              {
                key: "shouldComponentUpdate",
                value: function(e) {
                  return (
                    "admin" === e.user.typeUser && 1 === this.state.menu.length
                      ? this.setState({
                          menu: [].concat(Object(N.a)(this.state.menu), R)
                        })
                      : "doctor" === e.user.typeUser &&
                        1 === this.state.menu.length
                        ? this.setState({
                            menu: [].concat(Object(N.a)(this.state.menu), S)
                          })
                        : "pacient" === e.user.typeUser &&
                          1 === this.state.menu.length &&
                          this.setState({
                            menu: [].concat(Object(N.a)(this.state.menu), D)
                          }),
                    !0
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state.menu;
                  return a.a.createElement(
                    "header",
                    {
                      className:
                        "uk-section-primary uk-preserve-color uk-margin-bottom"
                    },
                    a.a.createElement(
                      "div",
                      {
                        className: "uk-navbar-container uk-container",
                        "uk-navbar": ""
                      },
                      a.a.createElement(
                        "div",
                        { className: "uk-navbar-left " },
                        a.a.createElement(
                          "a",
                          {
                            className:
                              "uk-navbar-item uk-logo uk-preserve-color",
                            href: "/"
                          },
                          "Dotaznik"
                        ),
                        a.a.createElement(
                          "ul",
                          { className: "uk-navbar-nav" },
                          t.map(function(t, n) {
                            var r = a.a.createElement(
                              L,
                              Object.assign({ key: n }, t)
                            );
                            return t.hasOwnProperty("auth")
                              ? t.auth &&
                                "admin" === t.type &&
                                e.props.isAuthenticated &&
                                "admin" === e.props.user.typeUser
                                ? r
                                : t.auth &&
                                  e.props.isAuthenticated &&
                                  "admin" !== t.type
                                  ? r
                                  : t.auth || e.props.isAuthenticated
                                    ? null
                                    : r
                              : r;
                          })
                        )
                      ),
                      a.a.createElement(
                        "div",
                        { className: "uk-navbar-right" },
                        a.a.createElement(
                          "ul",
                          { className: "uk-navbar-nav" },
                          a.a.createElement(
                            "li",
                            null,
                            a.a.createElement(
                              "a",
                              { href: "/" },
                              a.a.createElement("span", {
                                className: "uk-icon uk-margin-small-right",
                                "uk-icon": "icon: user"
                              }),
                              this.props.user.name +
                                " " +
                                this.props.user.surname
                            )
                          ),
                          a.a.createElement(
                            "li",
                            null,
                            this.props.isAuthenticated
                              ? a.a.createElement(
                                  "a",
                                  { nohref: "", onClick: this.onLogout },
                                  "Log out"
                                )
                              : a.a.createElement("a", { href: "/" }, "Sing In")
                          )
                        )
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(r.Component),
        z = Object(o.connect)(null, function(e) {
          return Object(p.b)({ logoutUser: h.d }, e);
        })(X),
        I = n(118),
        J = n(116),
        M = n(12),
        F = n(117),
        H = Object(o.connect)(function(e) {
          return { isAuthenticated: e.auth.isAuthenticated };
        }, null)(function(e) {
          var t = e.component,
            n = Object(M.a)(e, ["component"]);
          return a.a.createElement(
            J.a,
            Object.assign({}, n, {
              render: function(e) {
                return n.isAuthenticated
                  ? a.a.createElement(t, e)
                  : a.a.createElement(F.a, { to: "/login" });
              }
            })
          );
        }),
        V = (function() {
          var e = Object(C.a)(
            T.a.mark(function e(t) {
              return T.a.wrap(function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.next = 2), t.getCurrentProfile();
                    case 2:
                      return e.abrupt("return", e.sent);
                    case 3:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function(t) {
            return e.apply(this, arguments);
          };
        })(),
        W = Object(_.a)(
          Object(o.connect)(
            function(e) {
              return {
                isAuthenticated: e.auth.isAuthenticated,
                currentProfile: e.profile.currentProfile
              };
            },
            function(e) {
              return Object(p.b)({ getCurrentProfile: O }, e);
            }
          )(
            Object(s.frontloadConnect)(V, { onMount: !0, onUpdate: !1 })(
              function(e) {
                var t = e.component,
                  n = Object(M.a)(e, ["component"]),
                  r = E.a.getJSON("user");
                return a.a.createElement(
                  J.a,
                  Object.assign({}, n, {
                    render: function(e) {
                      return "admin" === r.typeUser
                        ? a.a.createElement(t, e)
                        : a.a.createElement(F.a, { to: "/" });
                    }
                  })
                );
              }
            )
          )
        ),
        q = Object(o.connect)(function(e) {
          return { isAuthenticated: e.auth.isAuthenticated };
        }, null)(function(e) {
          var t = e.component,
            n = Object(M.a)(e, ["component"]),
            r = E.a.getJSON("user");
          return a.a.createElement(
            J.a,
            Object.assign({}, n, {
              render: function(e) {
                return !r || ("admin" !== r.typeUser && "doctor" !== r.typeUser)
                  ? a.a.createElement(F.a, { to: "/" })
                  : a.a.createElement(t, e);
              }
            })
          );
        }),
        B = n(53),
        G = n.n(B),
        K = Object(o.connect)(function(e) {
          return { isAuthenticated: e.auth.isAuthenticated };
        }, null)(function(e) {
          var t = e.component,
            n = Object(M.a)(e, ["component"]),
            r = G.a.parse(n.location.search);
          return a.a.createElement(
            J.a,
            Object.assign({}, n, {
              render: function(e) {
                return n.isAuthenticated
                  ? a.a.createElement(F.a, { to: r.redirect || "/" })
                  : a.a.createElement(t, e);
              }
            })
          );
        }),
        Q = n(41),
        Y = function() {
          return a.a.createElement(
            Q.a,
            {
              id: "not-found",
              title: "Not Found",
              description: "This is embarrassing.",
              noCrawl: !0
            },
            a.a.createElement("p", null, "Super embarrassing.")
          );
        },
        Z = u()({
          loader: function() {
            return n.e(0).then(n.bind(null, 119));
          },
          loading: function() {
            return null;
          },
          modules: ["homepage"]
        }),
        $ = u()({
          loader: function() {
            return n.e(1).then(n.bind(null, 120));
          },
          loading: function() {
            return null;
          },
          modules: ["login"]
        }),
        ee = u()({
          loader: function() {
            return n.e(3).then(n.bind(null, 121));
          },
          loading: function() {
            return null;
          },
          modules: ["tests"]
        }),
        te = u()({
          loader: function() {
            return n.e(3).then(n.bind(null, 122));
          },
          loading: function() {
            return null;
          },
          modules: ["results"]
        }),
        ne = u()({
          loader: function() {
            return n.e(3).then(n.bind(null, 123));
          },
          loading: function() {
            return null;
          },
          modules: ["results-view"]
        }),
        re = u()({
          loader: function() {
            return n.e(3).then(n.bind(null, 124));
          },
          loading: function() {
            return null;
          },
          modules: ["list"]
        }),
        ae = u()({
          loader: function() {
            return n.e(3).then(n.bind(null, 127));
          },
          loading: function() {
            return null;
          },
          modules: ["add-user"]
        }),
        ce = u()({
          loader: function() {
            return n.e(3).then(n.bind(null, 125));
          },
          loading: function() {
            return null;
          },
          modules: ["test-full"]
        }),
        oe = u()({
          loader: function() {
            return n.e(3).then(n.bind(null, 126));
          },
          loading: function() {
            return null;
          },
          modules: ["create"]
        }),
        ie = (function(e) {
          function t() {
            return (
              Object(v.a)(this, t),
              Object(k.a)(this, Object(A.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(U.a)(t, e),
            Object(w.a)(t, [
              {
                key: "render",
                value: function() {
                  return a.a.createElement(
                    I.a,
                    null,
                    a.a.createElement(H, {
                      exact: !0,
                      path: "/",
                      component: Z
                    }),
                    a.a.createElement(H, {
                      exact: !0,
                      path: "/tests/:user",
                      component: ee
                    }),
                    a.a.createElement(H, {
                      exact: !0,
                      path: "/tests/pacient/:id",
                      component: ce
                    }),
                    a.a.createElement(H, {
                      exact: !0,
                      path: "/results/pacient",
                      component: te
                    }),
                    a.a.createElement(H, {
                      exact: !0,
                      path: "/view/results/:id",
                      component: ne
                    }),
                    a.a.createElement(q, {
                      exact: !0,
                      path: "/list/all/:user",
                      component: re
                    }),
                    a.a.createElement(q, {
                      exact: !0,
                      path: "/add/:typeUser",
                      component: ae
                    }),
                    a.a.createElement(q, {
                      exact: !0,
                      path: "/user/edit/:id",
                      component: ae
                    }),
                    a.a.createElement(W, {
                      exact: !0,
                      path: "/create/:id",
                      component: oe
                    }),
                    a.a.createElement(W, {
                      exact: !0,
                      path: "/create",
                      component: oe
                    }),
                    a.a.createElement(K, {
                      exact: !0,
                      path: "/login",
                      component: $
                    }),
                    a.a.createElement(J.a, { component: Y })
                  );
                }
              }
            ]),
            t
          );
        })(r.Component),
        ue = (n(111),
        (function() {
          var e = Object(C.a)(
            T.a.mark(function e(t) {
              return T.a.wrap(function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.next = 2), t.getCurrentProfile();
                    case 2:
                      return e.abrupt("return", e.sent);
                    case 3:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function(t) {
            return e.apply(this, arguments);
          };
        })()),
        se = (function(e) {
          function t() {
            return (
              Object(v.a)(this, t),
              Object(k.a)(this, Object(A.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(U.a)(t, e),
            Object(w.a)(t, [
              {
                key: "componentWillMount",
                value: function() {
                  j || this.props.establishCurrentUser();
                }
              },
              {
                key: "render",
                value: function() {
                  return a.a.createElement(
                    "div",
                    { id: "app" },
                    a.a.createElement(z, {
                      isAuthenticated: this.props.isAuthenticated,
                      user: this.props.currentProfile
                    }),
                    a.a.createElement(ie, {
                      typeUser: this.props.currentProfile.typeUser
                    })
                  );
                }
              }
            ]),
            t
          );
        })(r.Component),
        le = Object(_.a)(
          Object(o.connect)(
            function(e) {
              return {
                isAuthenticated: e.auth.isAuthenticated,
                currentProfile: e.profile.currentProfile
              };
            },
            function(e) {
              return Object(p.b)(
                { establishCurrentUser: h.b, getCurrentProfile: O },
                e
              );
            }
          )(Object(s.frontloadConnect)(ue, { onMount: !0, onUpdate: !1 })(se))
        ),
        pe = (n(112),
        (function() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "/",
            t = j ? Object(d.c)({ initialEntries: [e] }) : Object(d.a)(),
            n = [m.a, Object(l.routerMiddleware)(t)],
            r = p.d.apply(void 0, [p.a.apply(void 0, n)].concat([])),
            a = j ? {} : window.__PRELOADED_STATE__;
          return (
            j || delete window.__PRELOADED_STATE__,
            {
              store: Object(p.e)(Object(l.connectRouter)(t)(y), a, r),
              history: t
            }
          );
        })()),
        me = pe.store,
        de = pe.history,
        he = a.a.createElement(
          o.Provider,
          { store: me },
          a.a.createElement(
            l.ConnectedRouter,
            { history: de },
            a.a.createElement(
              s.Frontload,
              { noServerRender: !0 },
              a.a.createElement(le, null)
            )
          )
        ),
        fe = document.querySelector("#root");
      !0 === fe.hasChildNodes()
        ? u.a.preloadReady().then(function() {
            Object(c.hydrate)(he, fe);
          })
        : Object(c.render)(he, fe);
    },
    20: function(e, t, n) {
      "use strict";
      n.d(t, "b", function() {
        return l;
      }),
        n.d(t, "c", function() {
          return p;
        }),
        n.d(t, "d", function() {
          return m;
        });
      var r = n(22),
        a = n(11),
        c = n.n(a),
        o = n(40),
        i = n.n(o),
        u = { isAuthenticated: !1, currentUser: {} };
      t.a = function() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case "auth/AUTHENTICATE":
            return Object(r.a)({}, e, { isAuthenticated: t.authenticated });
          case "auth/SET_CURRENT_USER":
            return Object(r.a)({}, e, { currentUser: t.user });
          default:
            return e;
        }
      };
      var s = function(e) {
          return function(t) {
            return new Promise(function(n) {
              t({ type: "auth/SET_CURRENT_USER", user: e }),
                c.a.set("user", e),
                t({ type: "auth/AUTHENTICATE", authenticated: !0 }),
                n(e);
            });
          };
        },
        l = function() {
          return function(e) {
            return new Promise(function(t) {
              var n = c.a.getJSON("user");
              n ? (e(s(n)), t(n)) : t({});
            });
          };
        },
        p = function(e, t) {
          return function(n) {
            return i.a
              .get("http://localhost:4000/admin/user/login/" + e + "/" + t)
              .then(function(e) {
                n(s(e.data));
              });
          };
        },
        m = function() {
          return function(e) {
            return new Promise(function(t) {
              e({ type: "auth/AUTHENTICATE", authenticated: !1 }),
                e({ type: "auth/SET_CURRENT_USER", user: {} }),
                c.a.remove("user"),
                t({});
            });
          };
        };
    },
    41: function(e, t, n) {
      "use strict";
      var r = n(12),
        a = n(13),
        c = n(14),
        o = n(16),
        i = n(15),
        u = n(17),
        s = n(0),
        l = n.n(s),
        p = n(37),
        m = n(54),
        d = n.n(m),
        h = n(55),
        f = n.n(h),
        b = "https://cra-ssr.herokuapp.com",
        E = "".concat(b).concat(f.a),
        g = (function(e) {
          function t() {
            return (
              Object(a.a)(this, t),
              Object(o.a)(this, Object(i.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(u.a)(t, e),
            Object(c.a)(t, [
              {
                key: "getMetaTags",
                value: function(e, t) {
                  var n = e.title,
                    r = e.description,
                    a = e.image,
                    c = e.contentType,
                    o = e.twitter,
                    i = e.noCrawl,
                    u = e.published,
                    s = e.updated,
                    l = e.category,
                    p = e.tags,
                    m = n ? (n + " | Dotaznik").substring(0, 60) : "Dotaznik",
                    d = r
                      ? r.substring(0, 155)
                      : "D\xedm\u016fv dot\xe1zn\xedk",
                    h = a ? "".concat(b).concat(a) : E,
                    f = [
                      { itemprop: "name", content: m },
                      { itemprop: "description", content: d },
                      { itemprop: "image", content: h },
                      { name: "description", content: d },
                      { name: "twitter:card", content: "summary_large_image" },
                      { name: "twitter:site", content: "@cereallarceny" },
                      { name: "twitter:title", content: m },
                      { name: "twitter:description", content: d },
                      {
                        name: "twitter:creator",
                        content: o || "@cereallarceny"
                      },
                      { name: "twitter:image:src", content: h },
                      { property: "og:title", content: m },
                      { property: "og:type", content: c || "website" },
                      { property: "og:url", content: b + t },
                      { property: "og:image", content: h },
                      { property: "og:description", content: d },
                      { property: "og:site_name", content: "Dotaznik" },
                      { property: "fb:app_id", content: "XXXXXXXXX" }
                    ];
                  return (
                    i &&
                      f.push({ name: "robots", content: "noindex, nofollow" }),
                    u && f.push({ name: "article:published_time", content: u }),
                    s && f.push({ name: "article:modified_time", content: s }),
                    l && f.push({ name: "article:section", content: l }),
                    p && f.push({ name: "article:tag", content: p }),
                    f
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.props,
                    t = e.children,
                    n = e.id,
                    a = e.className,
                    c = Object(r.a)(e, ["children", "id", "className"]);
                  return l.a.createElement(
                    "main",
                    { id: n, className: a },
                    l.a.createElement(d.a, {
                      htmlAttributes: {
                        lang: "en",
                        itemscope: void 0,
                        itemtype: "http://schema.org/".concat(
                          c.schema || "WebPage"
                        )
                      },
                      title: c.title ? c.title + " | Dotaznik" : "Dotaznik",
                      link: [
                        {
                          rel: "canonical",
                          href: b + this.props.location.pathname
                        }
                      ],
                      meta: this.getMetaTags(c, this.props.location.pathname)
                    }),
                    t
                  );
                }
              }
            ]),
            t
          );
        })(s.Component);
      t.a = Object(p.a)(g);
    },
    55: function(e, t, n) {
      e.exports = n.p + "static/media/logo.8caa15b8.jpg";
    },
    56: function(e, t, n) {
      e.exports = n(113);
    }
  },
  [[56, 4, 5]]
]);
//# sourceMappingURL=main.69895ad1.chunk.js.map
