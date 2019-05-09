(window.webpackJsonp = window.webpackJsonp || []).push([
  [3],
  {
    121: function(e, t, a) {
      "use strict";
      a.r(t),
        a.d(t, "default", function() {
          return g;
        });
      var n = a(13),
        s = a(14),
        r = a(16),
        c = a(15),
        u = a(17),
        i = a(0),
        l = a.n(i),
        o = a(41),
        m = a(115),
        d = a(40),
        h = a.n(d),
        k = a(11),
        p = a.n(k),
        g = (function(e) {
          function t(e) {
            var a;
            return (
              Object(n.a)(this, t),
              ((a = Object(r.a)(
                this,
                Object(c.a)(t).call(this, e)
              )).onDelete = function(e) {
                e.preventDefault();
                for (var t = a.state.tests, n = 0; n < t.length; n++)
                  console.log(t[n]._id),
                    t[n]._id === e.currentTarget.name && t.splice(n, 1);
                a.setState({ tests: t }, function() {
                  return console.log(a.state);
                }),
                  h.a.delete(
                    "http://localhost:4000/admin/test/delete/" +
                      e.currentTarget.name
                  );
              }),
              (a.state = { tests: [] }),
              a
            );
          }
          return (
            Object(u.a)(t, e),
            Object(s.a)(t, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  if ("admin" === this.props.match.params.user)
                    h.a
                      .get("http://localhost:4000/admin/test")
                      .then(function(t) {
                        e.setState({ tests: t.data });
                      });
                  else if ("pacient" === this.props.match.params.user) {
                    var t = p.a.getJSON("user"),
                      a = [];
                    h.a
                      .get("http://localhost:4000/admin/test")
                      .then(function(n) {
                        t.selectTest.map(function(e) {
                          return n.data.map(function(t) {
                            return e === t._id && a.push(t);
                          });
                        }),
                          e.setState({ tests: a });
                      });
                  }
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state.tests,
                    a = this.props.match.params.user;
                  return l.a.createElement(
                    o.a,
                    { id: "homepage" },
                    l.a.createElement(
                      "div",
                      { className: "uk-container" },
                      l.a.createElement(
                        "div",
                        {
                          className:
                            "uk-grid uk-child-width-1-1 uk-child-width-1-3@s ",
                          "uk-grid": ""
                        },
                        !!t &&
                          t.map(function(t, n) {
                            return l.a.createElement(
                              "div",
                              { key: n, className: "uk-margin-bottom" },
                              l.a.createElement(
                                m.a,
                                {
                                  to: ""
                                    .concat(
                                      "pacient" === a ? "pacient/" : "/create/"
                                    )
                                    .concat(t._id),
                                  className:
                                    "uk-card uk-card-default uk-card-hover uk-card-body uk-display-block uk-link-reset"
                                },
                                l.a.createElement(
                                  "h3",
                                  {
                                    className:
                                      "uk-card-title uk-text-center uk-margin-remove-bottom"
                                  },
                                  t.nameTest
                                ),
                                "pacient" !== a &&
                                  l.a.createElement(
                                    "button",
                                    {
                                      onClick: e.onDelete,
                                      name: t._id,
                                      className:
                                        "uk-modal-close-default uk-button uk-button-text",
                                      type: "button"
                                    },
                                    l.a.createElement("span", {
                                      "uk-icon": "icon: trash"
                                    })
                                  )
                              )
                            );
                          })
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(i.Component);
    },
    122: function(e, t, a) {
      "use strict";
      a.r(t),
        a.d(t, "default", function() {
          return g;
        });
      var n = a(13),
        s = a(14),
        r = a(16),
        c = a(15),
        u = a(17),
        i = a(0),
        l = a.n(i),
        o = a(41),
        m = a(115),
        d = a(11),
        h = a.n(d),
        k = a(40),
        p = a.n(k),
        g = (function(e) {
          function t(e) {
            var a;
            return (
              Object(n.a)(this, t),
              ((a = Object(r.a)(
                this,
                Object(c.a)(t).call(this, e)
              )).onSum = function(e) {
                return e.reduce(function(e, t) {
                  return +e + +t.checkedBody;
                }, 0);
              }),
              (a.state = { tests: [] }),
              a
            );
          }
          return (
            Object(u.a)(t, e),
            Object(s.a)(t, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this,
                    t = h.a.getJSON("user");
                  p.a.get("http://localhost:4000/result/").then(function(a) {
                    e.setState({
                      tests: a.data.filter(function(e) {
                        return e.userId.includes(t._id);
                      })
                    });
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state.tests;
                  return l.a.createElement(
                    o.a,
                    { id: "homepage" },
                    l.a.createElement(
                      "article",
                      { className: "uk-article" },
                      l.a.createElement(
                        "div",
                        { className: "uk-container" },
                        l.a.createElement(
                          "div",
                          {
                            className:
                              "uk-grid uk-child-width-1-1 uk-child-width-1-3@s ",
                            "uk-grid": ""
                          },
                          !!t.length &&
                            t.map(function(t, a) {
                              return l.a.createElement(
                                "div",
                                { key: a, className: "uk-margin-small-bottom" },
                                l.a.createElement(
                                  m.a,
                                  {
                                    to: t.done
                                      ? "/view/results/".concat(t._id)
                                      : "/tests/pacient/".concat(t.idTest),
                                    className:
                                      "uk-card uk-card-default uk-card-hover uk-card-body uk-padding-small uk-display-block uk-link-reset"
                                  },
                                  l.a.createElement(
                                    "h3",
                                    { className: "uk-card-title" },
                                    t.nameTest
                                  ),
                                  l.a.createElement(
                                    "div",
                                    {
                                      className: "uk-child-width-1-2 uk-grid",
                                      "uk-grid": ""
                                    },
                                    l.a.createElement(
                                      "div",
                                      null,
                                      l.a.createElement(
                                        "p",
                                        {
                                          className:
                                            "uk-article-meta uk-text-left"
                                        },
                                        t.date
                                      )
                                    ),
                                    l.a.createElement(
                                      "div",
                                      { className: "uk-text-right" },
                                      t.done
                                        ? l.a.createElement(
                                            "p",
                                            { className: "uk-article-meta" },
                                            "Results:",
                                            " ",
                                            l.a.createElement(
                                              "span",
                                              { className: "uk-badge" },
                                              e.onSum(t.answers)
                                            )
                                          )
                                        : l.a.createElement(
                                            "div",
                                            { className: "uk-text-right" },
                                            l.a.createElement(
                                              "p",
                                              {
                                                className:
                                                  "uk-article-meta uk-text-warning uk-margin-remove-bottom"
                                              },
                                              "Pokracovat"
                                            )
                                          )
                                    )
                                  )
                                )
                              );
                            })
                        )
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(i.Component);
    },
    123: function(e, t, a) {
      "use strict";
      a.r(t),
        a.d(t, "default", function() {
          return h;
        });
      var n = a(13),
        s = a(14),
        r = a(16),
        c = a(15),
        u = a(17),
        i = a(0),
        l = a.n(i),
        o = a(41),
        m = a(40),
        d = a.n(m),
        h = (function(e) {
          function t(e) {
            var a;
            return (
              Object(n.a)(this, t),
              ((a = Object(r.a)(this, Object(c.a)(t).call(this, e))).state = {
                test: []
              }),
              a
            );
          }
          return (
            Object(u.a)(t, e),
            Object(s.a)(t, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  d.a
                    .get(
                      "http://localhost:4000/result/" +
                        this.props.match.params.id
                    )
                    .then(function(t) {
                      e.setState({ test: t.data });
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.test;
                  return l.a.createElement(
                    o.a,
                    { id: "homepage" },
                    l.a.createElement(
                      "div",
                      { className: "uk-container" },
                      l.a.createElement(
                        "div",
                        {
                          className: "uk-grid uk-child-width-1-1",
                          "uk-grid": ""
                        },
                        l.a.createElement(
                          "div",
                          null,
                          l.a.createElement(
                            "h1",
                            { className: "uk-heading-divider uk-text-center" },
                            e.nameTest
                          ),
                          !!e.answers &&
                            e.answers.map(function(e, t) {
                              return l.a.createElement(
                                "dl",
                                {
                                  key: t,
                                  className:
                                    "uk-description-list uk-description-list-divider"
                                },
                                l.a.createElement(
                                  "dt",
                                  null,
                                  l.a.createElement(
                                    "h3",
                                    { className: "uk-margin-remove-bottom" },
                                    e.nameAsk
                                  )
                                ),
                                l.a.createElement(
                                  "dd",
                                  { className: "uk-grid-small", "uk-grid": "" },
                                  l.a.createElement(
                                    "div",
                                    {
                                      className: "uk-width-expand",
                                      "uk-leader": "fill: ."
                                    },
                                    e.checkedValue
                                  ),
                                  l.a.createElement(
                                    "div",
                                    {
                                      className:
                                        "uk-text-primary uk-flex uk-flex-bottom"
                                    },
                                    l.a.createElement(
                                      "p",
                                      null,
                                      e.checkedBody,
                                      " bod\u016f"
                                    )
                                  )
                                )
                              );
                            }),
                          l.a.createElement("hr", null)
                        )
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(i.Component);
    },
    124: function(e, t, a) {
      "use strict";
      a.r(t),
        a.d(t, "default", function() {
          return f;
        });
      var n = a(42),
        s = a(13),
        r = a(14),
        c = a(16),
        u = a(15),
        i = a(17),
        l = a(0),
        o = a.n(l),
        m = a(41),
        d = a(115),
        h = a(40),
        k = a.n(h),
        p = a(11),
        g = a.n(p),
        f = (function(e) {
          function t(e) {
            var a;
            return (
              Object(s.a)(this, t),
              ((a = Object(c.a)(
                this,
                Object(u.a)(t).call(this, e)
              )).onDelete = function(e) {
                e.preventDefault();
                for (var t = a.state.users, n = 0; n < t.length; n++)
                  t[n]._id === e.target.name && t.splice(n, 1);
                a.setState({ users: t }),
                  k.a.delete(
                    "http://localhost:4000/admin/user/delete/" + e.target.name
                  );
              }),
              (a.handleChange = function(e) {
                a.setState(Object(n.a)({}, e.target.name, e.target.value));
              }),
              (a.state = { users: [], search: "" }),
              a
            );
          }
          return (
            Object(i.a)(t, e),
            Object(r.a)(t, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this,
                    t = g.a.getJSON("user");
                  k.a
                    .get(
                      "http://localhost:4000/admin/user/all/" +
                        this.props.match.params.user
                    )
                    .then(function(a) {
                      "pacient" === e.props.match.params.user
                        ? e.setState({
                            users: a.data.filter(function(e) {
                              return e.parrentDoctor === t._id;
                            })
                          })
                        : e.setState({ users: a.data });
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state.users,
                    a = this.state.search;
                  return (
                    t &&
                      a &&
                      (t = t.filter(function(e) {
                        return !!(
                          e.name.includes(a) ||
                          e.surname.includes(a) ||
                          e.rodneCislo.includes(a)
                        );
                      })),
                    o.a.createElement(
                      m.a,
                      { id: "homepage" },
                      o.a.createElement(
                        "div",
                        { className: "uk-container" },
                        o.a.createElement(
                          "div",
                          {
                            className:
                              "uk-grid uk-grid-small uk-margin-medium-bottom",
                            "uk-grid": "",
                            "uk-height-match": ".tm-equal-height"
                          },
                          o.a.createElement(
                            "div",
                            { className: "uk-width-4-5" },
                            o.a.createElement(
                              "div",
                              { className: "uk-margin" },
                              o.a.createElement(
                                "form",
                                {
                                  className:
                                    "uk-search uk-search-default uk-width-1-1"
                                },
                                o.a.createElement("span", {
                                  "uk-search-icon": ""
                                }),
                                o.a.createElement("input", {
                                  className: "uk-search-input",
                                  name: "search",
                                  value: this.state.search,
                                  type: "search",
                                  onChange: this.handleChange,
                                  placeholder: "Search..."
                                })
                              )
                            )
                          ),
                          o.a.createElement(
                            "div",
                            { className: "uk-width-1-5" },
                            o.a.createElement(
                              d.a,
                              {
                                className:
                                  "uk-button uk-button-primary uk-width-1-1 tm-equal-height",
                                to: "/add/".concat(this.props.match.params.user)
                              },
                              "Pridat ",
                              this.props.match.params.user,
                              "a"
                            )
                          )
                        )
                      ),
                      o.a.createElement(
                        "div",
                        { className: "uk-container" },
                        o.a.createElement(
                          "div",
                          {
                            className: "uk-grid uk-child-width-1-1",
                            "uk-grid": ""
                          },
                          o.a.createElement(
                            "div",
                            null,
                            o.a.createElement(
                              "table",
                              {
                                className:
                                  "uk-table uk-table-striped uk-table-hover uk-table-middle uk-margin-bottom"
                              },
                              o.a.createElement(
                                "thead",
                                null,
                                o.a.createElement(
                                  "tr",
                                  null,
                                  o.a.createElement("th", null, "Jmeno"),
                                  o.a.createElement("th", null, "Prijmeni"),
                                  o.a.createElement("th", null, "Rodne cislo"),
                                  o.a.createElement(
                                    "th",
                                    { className: "uk-text-right" },
                                    "Options"
                                  )
                                )
                              ),
                              o.a.createElement(
                                "tbody",
                                null,
                                t.length
                                  ? t.map(function(t, a) {
                                      return o.a.createElement(
                                        "tr",
                                        { key: a },
                                        o.a.createElement("td", null, t.name),
                                        o.a.createElement(
                                          "td",
                                          null,
                                          t.surname
                                        ),
                                        o.a.createElement(
                                          "td",
                                          null,
                                          t.rodneCislo
                                        ),
                                        o.a.createElement(
                                          "td",
                                          null,
                                          o.a.createElement(
                                            "ul",
                                            {
                                              className:
                                                "uk-iconnav uk-flex-right"
                                            },
                                            "pacient" ===
                                              e.props.match.params.user &&
                                              o.a.createElement(
                                                "li",
                                                null,
                                                o.a.createElement("button", {
                                                  name: t._id,
                                                  onClick: e.onDelete
                                                }),
                                                o.a.createElement("span", {
                                                  nohref: "true",
                                                  "uk-icon": "icon: info"
                                                })
                                              ),
                                            o.a.createElement(
                                              "li",
                                              null,
                                              o.a.createElement(
                                                d.a,
                                                {
                                                  to: "/user/edit/".concat(
                                                    t._id
                                                  )
                                                },
                                                o.a.createElement("span", {
                                                  "uk-icon": "icon: file-edit"
                                                })
                                              )
                                            ),
                                            o.a.createElement(
                                              "li",
                                              null,
                                              o.a.createElement("button", {
                                                name: t._id,
                                                onClick: e.onDelete
                                              }),
                                              o.a.createElement("span", {
                                                "uk-icon": "icon: trash"
                                              })
                                            )
                                          )
                                        )
                                      );
                                    })
                                  : o.a.createElement(
                                      "tr",
                                      null,
                                      o.a.createElement(
                                        "td",
                                        { colSpan: "4" },
                                        o.a.createElement(
                                          "h3",
                                          { className: "uk-text-center" },
                                          "Nic nenalezeno"
                                        )
                                      )
                                    )
                              )
                            )
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
        })(l.Component);
    },
    125: function(e, t, a) {
      "use strict";
      a.r(t),
        a.d(t, "default", function() {
          return v;
        });
      var n = a(23),
        s = a.n(n),
        r = a(31),
        c = a(13),
        u = a(14),
        i = a(16),
        l = a(15),
        o = a(17),
        m = a(0),
        d = a.n(m),
        h = a(41),
        k = a(40),
        p = a.n(k),
        g = a(11),
        f = a.n(g),
        v = (function(e) {
          function t(e) {
            var a;
            return (
              Object(c.a)(this, t),
              ((a = Object(i.a)(
                this,
                Object(l.a)(t).call(this, e)
              )).getResult = function(e, t) {
                e.map(function(e) {
                  return (
                    !e.done &&
                    e.userId === t._id &&
                    a.setState({
                      resultId: e._id,
                      currentAsk: e.currentAsk,
                      idTest: e.idTest,
                      answers: e.answers
                    })
                  );
                });
              }),
              (a.updateAnswers = function(e) {
                var t = a.onCheckedAnswers(
                    a.state.checkedName,
                    a.state.checkedBody
                  ),
                  n = new Date(),
                  s =
                    n.getDate() +
                    "." +
                    n.getMonth() +
                    "." +
                    n.getFullYear() +
                    " " +
                    n.getHours() +
                    ":" +
                    n.getMinutes();
                "next" === e
                  ? a.setState(
                      {
                        currentAsk: a.state.currentAsk + 1,
                        answers: t,
                        date: s
                      },
                      function() {
                        return console.log("next update state!");
                      }
                    )
                  : a.setState({ answers: t, date: s });
              }),
              (a.onPrev = function(e) {
                a.setState(
                  { currentAsk: a.state.currentAsk - 1, prev: !0 },
                  function() {
                    return console.log("prev curretn decrement");
                  }
                );
              }),
              (a.onNext = (function() {
                var e = Object(r.a)(
                  s.a.mark(function e(t) {
                    var n, r;
                    return s.a.wrap(function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              ((n = f.a.getJSON("user")),
                              a.state.prev || a.state.resultId)
                            ) {
                              e.next = 4;
                              break;
                            }
                            return (
                              (e.next = 4),
                              p.a
                                .get(
                                  "http://localhost:4000/result/all/" +
                                    a.props.match.params.id
                                )
                                .then(function(e) {
                                  return !!e.data && a.getResult(e.data, n);
                                })
                            );
                          case 4:
                            return (e.next = 6), a.updateAnswers("next");
                          case 6:
                            if (
                              ((r = a.sendObjectData(a.state, !1)),
                              1 !== a.state.currentAsk || a.state.resultId)
                            ) {
                              e.next = 10;
                              break;
                            }
                            return (
                              (e.next = 10),
                              p.a
                                .post("http://localhost:4000/result/create/", r)
                                .then(function(e) {
                                  return console.log("create data next!");
                                })
                            );
                          case 10:
                            if (!a.state.currentAsk || !a.state.resultId) {
                              e.next = 13;
                              break;
                            }
                            return (
                              (e.next = 13),
                              p.a
                                .get(
                                  "http://localhost:4000/result/" +
                                    a.state.resultId
                                )
                                .then(function(e) {
                                  var t = e.data[0];
                                  t &&
                                    !t.done &&
                                    a.setState({
                                      resultId: t._id,
                                      currentAsk: t.currentAsk,
                                      idTest: t.idTest,
                                      answers: t.answers
                                    });
                                })
                                .then(function() {
                                  p.a
                                    .post(
                                      "http://localhost:4000/result/update/" +
                                        a.state.resultId,
                                      r
                                    )
                                    .then(console.log("update next"));
                                })
                            );
                          case 13:
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
              (a.onFinish = Object(r.a)(
                s.a.mark(function e() {
                  var t;
                  return s.a.wrap(function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), a.updateAnswers("finish");
                        case 2:
                          return (
                            (t = a.sendObjectData(a.state, !0)),
                            (e.next = 5),
                            p.a
                              .get(
                                "http://localhost:4000/result/all/" +
                                  a.props.match.params.id
                              )
                              .then(function(e) {
                                return (
                                  !!e.data &&
                                  e.data.map(function(e) {
                                    return (
                                      !e.done &&
                                      t.userId === e.userId &&
                                      (a.setState({
                                        resultId: e._id,
                                        currentAsk: e.currentAsk,
                                        idTest: e.idTest,
                                        answers: e.answers
                                      }),
                                      p.a
                                        .post(
                                          "http://localhost:4000/result/update/" +
                                            e._id,
                                          t
                                        )
                                        .then(function() {
                                          return (window.location.href =
                                            "/results/pacient");
                                        }))
                                    );
                                  })
                                );
                              })
                          );
                        case 5:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )),
              (a.sendObjectData = function(e, t) {
                return {
                  idTest: e.test._id,
                  nameTest: e.test.nameTest,
                  currentAsk: e.currentAsk,
                  answers: e.answers,
                  date: e.date,
                  done: t,
                  userId: e.userId
                };
              }),
              (a.onHandleCheckbox = function(e) {
                var t = a.onCheckedAnswers(
                  e.target.value,
                  e.target.dataset.body
                );
                a.setState({
                  checkedName: e.target.value,
                  checkedBody: e.target.dataset.body,
                  answers: t
                });
              }),
              (a.onCheckedAnswers = function(e, t) {
                var n,
                  s = a.state.answers,
                  r = {
                    nameAsk:
                      a.state.test.questions[a.state.currentAsk].nameQuestion,
                    checkedValue: e,
                    checkedBody: t
                  };
                return (
                  s.find(function(e) {
                    return (
                      e.nameAsk ===
                      a.state.test.questions[a.state.currentAsk].nameQuestion
                    );
                  })
                    ? ((n = s.findIndex(function(e) {
                        return (
                          e.nameAsk ===
                          a.state.test.questions[a.state.currentAsk]
                            .nameQuestion
                        );
                      })),
                      (s[n] = r))
                    : s.push(r),
                  s
                );
              }),
              (a.state = {
                resultId: "",
                test: {},
                currentAsk: 0,
                answers: [],
                checkedName: "",
                checkedBody: "",
                date: "",
                done: !1,
                userId: "",
                prev: !1
              }),
              a
            );
          }
          return (
            Object(o.a)(t, e),
            Object(u.a)(t, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this,
                    t = f.a.getJSON("user");
                  p.a
                    .get(
                      "http://localhost:4000/admin/test/" +
                        this.props.match.params.id
                    )
                    .then(function(t) {
                      e.setState({ test: t.data });
                    }),
                    p.a
                      .get(
                        "http://localhost:4000/result/all/" +
                          this.props.match.params.id
                      )
                      .then(function(a) {
                        return (
                          !!a.data &&
                          (e.setState({
                            userId: t._id,
                            resultId: "",
                            currentAsk: 0,
                            answers: [],
                            checkedName: "",
                            checkedBody: "",
                            date: "",
                            done: !1
                          }),
                          e.getResult(a.data, t))
                        );
                      });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state.test,
                    a = this.state.currentAsk,
                    n = this.state.answers;
                  return d.a.createElement(
                    h.a,
                    { id: "homepage" },
                    d.a.createElement(
                      "div",
                      { className: "uk-container" },
                      d.a.createElement(
                        "div",
                        {
                          className: "uk-grid uk-child-width-1-1",
                          "uk-grid": ""
                        },
                        d.a.createElement(
                          "div",
                          null,
                          d.a.createElement(
                            "h1",
                            { className: "uk-heading-divider uk-text-center" },
                            t.nameTest
                          ),
                          d.a.createElement(
                            "h3",
                            { className: "uk-heading-divider" },
                            !!t.questions && t.questions[a].nameQuestion
                          ),
                          d.a.createElement(
                            "form",
                            null,
                            d.a.createElement(
                              "div",
                              {
                                className:
                                  "uk-margin uk-grid-small uk-child-width-1-1 uk-grid"
                              },
                              !!Object.entries(t).length &&
                                t.questions[a].asks.map(function(t, s) {
                                  return d.a.createElement(
                                    "label",
                                    { key: s },
                                    n.length >= 1 &&
                                    a < n.length &&
                                    n[a].checkedValue === t.nameAsk
                                      ? d.a.createElement("input", {
                                          className: "uk-radio",
                                          onClick: e.onHandleCheckbox,
                                          type: "radio",
                                          value: t.nameAsk,
                                          "data-body": t.valueAsk,
                                          name: "radio-".concat(a),
                                          checked: !0
                                        })
                                      : d.a.createElement("input", {
                                          className: "uk-radio",
                                          onClick: e.onHandleCheckbox,
                                          type: "radio",
                                          value: t.nameAsk,
                                          "data-body": t.valueAsk,
                                          name: "radio-".concat(a)
                                        }),
                                    t.nameAsk
                                  );
                                })
                            )
                          ),
                          d.a.createElement("progress", {
                            id: "js-progressbar",
                            className: "uk-progress",
                            value: this.state.currentAsk + 1,
                            max: t.questions ? t.questions.length : 0
                          }),
                          d.a.createElement("hr", null),
                          t.questions
                            ? a === t.questions.length - 1
                              ? d.a.createElement(
                                  "button",
                                  {
                                    className:
                                      "uk-button uk-button-primary uk-align-right",
                                    onClick: this.onFinish
                                  },
                                  "Finish"
                                )
                              : d.a.createElement(
                                  "button",
                                  {
                                    className:
                                      "uk-button uk-button-primary uk-align-right",
                                    onClick: this.onNext
                                  },
                                  "Next"
                                )
                            : "",
                          a >= 1 &&
                            d.a.createElement(
                              "button",
                              {
                                className:
                                  "uk-button uk-button-primary uk-align-right",
                                onClick: this.onPrev
                              },
                              "Prev"
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
        })(m.Component);
    },
    126: function(e, t, a) {
      "use strict";
      a.r(t),
        a.d(t, "default", function() {
          return g;
        });
      var n = a(22),
        s = a(33),
        r = a(42),
        c = a(13),
        u = a(14),
        i = a(16),
        l = a(15),
        o = a(17),
        m = a(0),
        d = a.n(m),
        h = a(41),
        k = a(40),
        p = a.n(k),
        g = (function(e) {
          function t(e) {
            var a;
            return (
              Object(c.a)(this, t),
              ((a = Object(i.a)(
                this,
                Object(l.a)(t).call(this, e)
              )).handleChange = function(e) {
                var t = a.state.questions;
                ["nameAsk", "valueAsk"].includes(e.target.name)
                  ? ((t[e.target.dataset.countparent].asks[
                      e.target.dataset.countitem
                    ][e.target.name] = e.target.value),
                    a.setState({ questions: t }))
                  : ["nameQuestion", "descriptionQuestion"].includes(
                      e.target.name
                    )
                    ? ((t[e.target.dataset.countquestion][e.target.name] =
                        e.target.value),
                      a.setState({ questions: t }))
                    : a.setState(
                        Object(r.a)({}, e.target.name, e.target.value)
                      );
              }),
              (a.toggleDescription = function(e) {
                e.preventDefault();
                var t = a.state.questions;
                (t[e.target.dataset.countquestions].descriptionShow = !t[
                  e.target.dataset.countquestions
                ].descriptionShow),
                  a.setState({ questions: t });
              }),
              (a.addQuestion = function(e) {
                e.preventDefault(),
                  a.state.currentQuestion + 1 < a.state.questions.length
                    ? a.setState({
                        currentQuestion: a.state.currentQuestion + 1
                      })
                    : a.setState(function(e) {
                        return {
                          questions: [].concat(Object(s.a)(e.questions), [
                            {
                              nameQuestion: "",
                              descriptionQuestion: "",
                              descriptionShow: !1,
                              countAsk: 1,
                              asks: [{ nameAsk: "", valueAsk: 0 }]
                            }
                          ]),
                          currentQuestion: e.currentQuestion + 1
                        };
                      });
              }),
              (a.prevQuestion = function(e) {
                e.preventDefault(),
                  a.setState({ currentQuestion: a.state.currentQuestion - 1 });
              }),
              (a.addAsk = function(e) {
                e.preventDefault();
                var t = a.state.questions;
                t[e.target.dataset.countparent].countAsk++,
                  t[e.target.dataset.countparent].asks.push({
                    nameAsk: "",
                    valueAsk: 0
                  }),
                  a.setState({ questions: t });
              }),
              (a.deleteAsk = function(e) {
                e.preventDefault();
                var t = a.state.questions;
                t[e.target.dataset.countparent].countAsk =
                  t[e.target.dataset.countparent].countAsk - 1;
                for (
                  var n = 0;
                  n < t[e.target.dataset.countparent].asks.length;
                  n++
                )
                  n === parseInt(e.target.dataset.index) &&
                    t[e.target.dataset.countparent].asks.splice(n, 1);
                a.setState({ questions: t });
              }),
              (a.submitForm = function(e) {
                e.preventDefault(),
                  a.props.match.params.id
                    ? p.a
                        .post(
                          "http://localhost:4000/admin/test/update/" +
                            a.props.match.params.id,
                          a.state
                        )
                        .then((window.location.href = "/tests/admin"))
                    : p.a
                        .post(
                          "http://localhost:4000/admin/test/create",
                          a.state
                        )
                        .then((window.location.href = "/tests/admin"));
              }),
              (a.state = {
                nameTest: "",
                currentQuestion: 0,
                questions: [
                  {
                    nameQuestion: "",
                    descriptionQuestion: "",
                    descriptionShow: !1,
                    countAsk: 1,
                    asks: [{ nameAsk: "", valueAsk: 0 }]
                  }
                ]
              }),
              a
            );
          }
          return (
            Object(o.a)(t, e),
            Object(u.a)(t, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  this.props.match.params.id &&
                    p.a
                      .get(
                        "http://localhost:4000/admin/test/" +
                          this.props.match.params.id
                      )
                      .then(function(t) {
                        e.setState(Object(n.a)({}, t.data)), console.log();
                      });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this;
                  return d.a.createElement(
                    h.a,
                    { id: "create" },
                    d.a.createElement(
                      "div",
                      { className: "uk-container" },
                      d.a.createElement(
                        "div",
                        {
                          className: "uk-grid uk-child-width-1-1",
                          "uk-grid": ""
                        },
                        d.a.createElement(
                          "div",
                          null,
                          d.a.createElement(
                            "form",
                            null,
                            d.a.createElement(
                              "fieldset",
                              { className: "uk-fieldset" },
                              d.a.createElement(
                                "legend",
                                { className: "uk-legend" },
                                "Nazev otaznika"
                              ),
                              d.a.createElement(
                                "div",
                                { className: "uk-margin" },
                                d.a.createElement("input", {
                                  className: "uk-input",
                                  onChange: this.handleChange,
                                  name: "nameTest",
                                  type: "text",
                                  placeholder: "Nazev",
                                  value: this.state.nameTest
                                })
                              ),
                              d.a.createElement("hr", null),
                              d.a.createElement(
                                "h3",
                                { className: "uk-legend" },
                                "Otazka ",
                                this.state.currentQuestion + 1
                              ),
                              d.a.createElement(
                                "div",
                                { className: "uk-margin" },
                                d.a.createElement("input", {
                                  className: "uk-input",
                                  type: "text",
                                  name: "nameQuestion",
                                  onChange: this.handleChange,
                                  "data-countquestion": this.state
                                    .currentQuestion,
                                  placeholder: "Otazka",
                                  value: this.state.questions[
                                    this.state.currentQuestion
                                  ].nameQuestion
                                })
                              ),
                              d.a.createElement(
                                "button",
                                {
                                  className: "uk-button uk-button-text",
                                  "data-countquestions": this.state
                                    .currentQuestion,
                                  onClick: this.toggleDescription
                                },
                                " ",
                                "+ Add description"
                              ),
                              this.state.questions[this.state.currentQuestion]
                                .descriptionShow
                                ? d.a.createElement(
                                    "div",
                                    { className: "uk-margin" },
                                    d.a.createElement("textarea", {
                                      className: "uk-textarea",
                                      rows: "5",
                                      id: "toggle-usage",
                                      "data-countquestion": this.state
                                        .currentQuestion,
                                      onChange: this.handleChange,
                                      name: "descriptionQuestion",
                                      placeholder: "Textarea",
                                      value: this.state.questions[
                                        this.state.currentQuestion
                                      ].descriptionQuestion
                                    })
                                  )
                                : "",
                              d.a.createElement("hr", null),
                              d.a.createElement(
                                "h3",
                                { className: "uk-legend" },
                                "Odpoved"
                              ),
                              this.state.questions[
                                this.state.currentQuestion
                              ].asks.map(function(t, a) {
                                return d.a.createElement(
                                  "div",
                                  {
                                    key: a,
                                    className: "uk-grid uk-grid-small",
                                    "uk-grid": ""
                                  },
                                  d.a.createElement(
                                    "div",
                                    { className: "uk-margin uk-width-4-5" },
                                    d.a.createElement("input", {
                                      className: "uk-input",
                                      type: "text",
                                      onChange: e.handleChange,
                                      name: "nameAsk",
                                      "data-countparent":
                                        e.state.currentQuestion,
                                      "data-countitem": a,
                                      placeholder: "Odpoved",
                                      value:
                                        e.state.questions[
                                          e.state.currentQuestion
                                        ].asks[a].nameAsk
                                    })
                                  ),
                                  d.a.createElement(
                                    "div",
                                    {
                                      className:
                                        "uk-width-1-5 uk-flex uk-flex-between"
                                    },
                                    d.a.createElement("input", {
                                      className: "uk-input",
                                      type: "text",
                                      onChange: e.handleChange,
                                      name: "valueAsk",
                                      "data-countparent":
                                        e.state.currentQuestion,
                                      "data-countitem": a,
                                      placeholder: "Body",
                                      value:
                                        e.state.questions[
                                          e.state.currentQuestion
                                        ].asks[a].valueAsk
                                    }),
                                    d.a.createElement(
                                      "span",
                                      {
                                        "data-countparent":
                                          e.state.currentQuestion,
                                        "data-index": a,
                                        onClick: e.deleteAsk
                                      },
                                      "minus"
                                    )
                                  )
                                );
                              }),
                              d.a.createElement(
                                "button",
                                {
                                  className: "uk-button uk-button-text",
                                  "data-countparent": this.state
                                    .currentQuestion,
                                  onClick: this.addAsk
                                },
                                " ",
                                "+ Add answer"
                              ),
                              d.a.createElement("hr", null),
                              d.a.createElement(
                                "button",
                                {
                                  className:
                                    "uk-button uk-button-primary uk-align-right",
                                  onClick: this.addQuestion
                                },
                                "Next question"
                              ),
                              this.state.currentQuestion
                                ? d.a.createElement(
                                    "button",
                                    {
                                      className:
                                        "uk-button uk-button-primary uk-align-right",
                                      onClick: this.prevQuestion
                                    },
                                    "Prev question"
                                  )
                                : "",
                              d.a.createElement(
                                "button",
                                {
                                  className: "uk-button uk-button-primary",
                                  onClick: this.submitForm
                                },
                                "Save"
                              )
                            )
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
        })(m.Component);
    },
    127: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(42),
        s = a(13),
        r = a(14),
        c = a(16),
        u = a(15),
        i = a(17),
        l = a(0),
        o = a.n(l),
        m = a(41),
        d = a(40),
        h = a.n(d),
        k = a(11),
        p = a.n(k),
        g = (function(e) {
          function t(e) {
            var a;
            return (
              Object(s.a)(this, t),
              ((a = Object(c.a)(this, Object(u.a)(t).call(this, e))).state = {
                tests: [],
                checked: []
              }),
              a
            );
          }
          return (
            Object(i.a)(t, e),
            Object(r.a)(t, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  h.a.get("http://localhost:4000/admin/test").then(function(t) {
                    var a = [];
                    t.data.map(function(e) {
                      return a.push({ name: e.nameTest, _id: e._id });
                    }),
                      e.setState({ tests: a });
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this;
                  return o.a.createElement(
                    "div",
                    {
                      className:
                        "uk-margin uk-grid-small uk-child-width-1-1 uk-grid"
                    },
                    this.state.tests.map(function(t, a) {
                      return o.a.createElement(
                        "label",
                        {
                          key: a,
                          className: "uk-margin-small-bottom uk-display-block"
                        },
                        -1 !== e.props.tests.indexOf(t._id)
                          ? o.a.createElement("input", {
                              className: "uk-checkbox",
                              type: "checkbox",
                              name: t._id,
                              onClick: e.props.changeCheckbox,
                              checked: "checked"
                            })
                          : o.a.createElement("input", {
                              className: "uk-checkbox",
                              type: "checkbox",
                              name: t._id,
                              onClick: e.props.changeCheckbox
                            }),
                        t.name
                      );
                    })
                  );
                }
              }
            ]),
            t
          );
        })(l.Component);
      a.d(t, "default", function() {
        return f;
      });
      var f = (function(e) {
        function t(e) {
          var a;
          return (
            Object(s.a)(this, t),
            ((a = Object(c.a)(
              this,
              Object(u.a)(t).call(this, e)
            )).loadData = function(e) {
              h.a
                .get("http://localhost:4000/admin/user/" + e)
                .then(function(e) {
                  return a.setState({
                    name: e.data.name,
                    surname: e.data.surname,
                    rodneCislo: e.data.rodneCislo,
                    password: e.data.password,
                    typeUser: e.data.typeUser,
                    selectTest: e.data.selectTest
                  });
                });
            }),
            (a.handleChange = function(e) {
              a.setState(Object(n.a)({}, e.target.name, e.target.value));
            }),
            (a.handleChangeArray = function(e) {
              var t = a.state.selectTest;
              -1 !== t.indexOf(e.target.name)
                ? t.splice(t.indexOf(e.target.name), 1)
                : t.push(e.target.name),
                a.setState({ selectTest: t });
            }),
            (a.onSubmit = function(e) {
              e.preventDefault(),
                a.props.match.params.id
                  ? h.a
                      .post(
                        "http://localhost:4000/admin/user/update/" +
                          a.props.match.params.id,
                        a.state
                      )
                      .then(function(e) {
                        window.location.href = "/list/all/" + a.state.typeUser;
                      })
                  : h.a
                      .post("http://localhost:4000/admin/user/create", a.state)
                      .then(function(e) {
                        window.location.href = "/list/all/" + a.state.typeUser;
                      });
            }),
            (a.state = {
              name: "",
              surname: "",
              rodneCislo: "",
              password: "",
              typeUser: "",
              parrentDoctor: "",
              selectTest: []
            }),
            a
          );
        }
        return (
          Object(i.a)(t, e),
          Object(r.a)(t, [
            {
              key: "componentDidMount",
              value: function() {
                var e = this;
                if (
                  (this.props.match.params.id
                    ? this.loadData(this.props.match.params.id)
                    : this.setState({
                        typeUser: this.props.match.params.typeUser
                      }),
                  "pacient" === this.props.match.params.typeUser)
                ) {
                  var t = p.a.getJSON("user");
                  this.setState({ parrentDoctor: t._id }, function() {
                    return console.log(e.state);
                  });
                }
              }
            },
            {
              key: "render",
              value: function() {
                return o.a.createElement(
                  m.a,
                  { id: "homepage" },
                  o.a.createElement(
                    "div",
                    { className: "uk-container uk-container-xsmall" },
                    o.a.createElement(
                      "div",
                      {
                        className: "uk-grid uk-child-width-1-1",
                        "uk-grid": ""
                      },
                      o.a.createElement(
                        "form",
                        { className: "uk-form-stacked" },
                        o.a.createElement(
                          "div",
                          { className: "uk-margin" },
                          o.a.createElement(
                            "label",
                            {
                              className: "uk-form-label",
                              htmlFor: "form-stacked-text"
                            },
                            "Jmeno"
                          ),
                          o.a.createElement(
                            "div",
                            { className: "uk-form-controls" },
                            o.a.createElement("input", {
                              className: "uk-input ",
                              value: this.state.name,
                              id: "form-stacked-text",
                              name: "name",
                              onChange: this.handleChange,
                              type: "text",
                              placeholder: "Jmeno"
                            })
                          )
                        ),
                        o.a.createElement(
                          "div",
                          { className: "uk-margin" },
                          o.a.createElement(
                            "label",
                            {
                              className: "uk-form-label",
                              htmlFor: "form-stacked-text"
                            },
                            "Prijmeni"
                          ),
                          o.a.createElement(
                            "div",
                            { className: "uk-form-controls" },
                            o.a.createElement("input", {
                              className: "uk-input ",
                              value: this.state.surname,
                              type: "text",
                              name: "surname",
                              onChange: this.handleChange,
                              placeholder: "Prijmeni"
                            })
                          )
                        ),
                        o.a.createElement(
                          "div",
                          { className: "uk-margin" },
                          o.a.createElement(
                            "label",
                            {
                              className: "uk-form-label",
                              htmlFor: "form-stacked-text"
                            },
                            "Rodne cislo"
                          ),
                          o.a.createElement(
                            "div",
                            { className: "uk-form-controls" },
                            o.a.createElement("input", {
                              className: "uk-input ",
                              value: this.state.rodneCislo,
                              type: "text",
                              name: "rodneCislo",
                              onChange: this.handleChange,
                              placeholder: "Rodne cislo"
                            })
                          )
                        ),
                        o.a.createElement(
                          "div",
                          { className: "uk-margin" },
                          o.a.createElement(
                            "label",
                            {
                              className: "uk-form-label",
                              htmlFor: "form-stacked-text"
                            },
                            "Heslo"
                          ),
                          o.a.createElement(
                            "div",
                            { className: "uk-form-controls" },
                            o.a.createElement("input", {
                              className: "uk-input ",
                              value: this.state.password,
                              type: "text",
                              name: "password",
                              onChange: this.handleChange,
                              placeholder: "Heslo"
                            })
                          )
                        ),
                        "pacient" === this.state.typeUser
                          ? o.a.createElement(g, {
                              tests: this.state.selectTest,
                              changeCheckbox: this.handleChangeArray
                            })
                          : "",
                        o.a.createElement(
                          "button",
                          {
                            className: "uk-button uk-button-primary",
                            onClick: this.onSubmit
                          },
                          "Ulozit"
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
      })(l.Component);
    }
  }
]);
//# sourceMappingURL=profile.f82399ac.chunk.js.map
