(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{118:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return m});var n=a(13),c=a(14),i=a(16),r=a(15),s=a(17),l=a(0),o=a.n(l),d=a(41),u=a(40),h=a.n(u),m=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(i.a)(this,Object(r.a)(t).call(this,e))).state={head:"",description:""},a}return Object(s.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;h.a.get("https://server.dotaznik.hardart.cz/homepage").then(function(t){console.log(t),e.setState({head:t.data[0].head,description:t.data[0].description})})}},{key:"render",value:function(){return o.a.createElement(d.a,{id:"homepage"},o.a.createElement("article",{className:"uk-article"},o.a.createElement("div",{className:"uk-container"},o.a.createElement("div",{className:"uk-child-width-1-1 uk-grid","uk-grid":""},o.a.createElement("div",{className:"uk-text-left"},o.a.createElement("h1",{className:"uk-article-title"},this.state.head),o.a.createElement("p",null,this.state.description))))))}}]),t}(l.Component)}}]);
//# sourceMappingURL=homepage.b400355d.chunk.js.map