(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[11],{440:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(9),c=a(20);t.a=function(e){var t=e.condtion,a=e.textTrue,n=e.textFalse,l=e.width,o=void 0===l?70:l,u=e.onClick,m=Object(i.b)().t,s={width:"".concat(o,"px")};return r.a.createElement(c.a,{style:s,variant:"primary",onClick:function(){u()}},m(t?a:n))}},754:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),c=a(11),l=a(1),o=a(22),u=a(417),m=a(56),s=a(447),g=a.n(s),p=(a(416),a(440)),d=a(12),f={width:"150px"},E=Object(c.a)((function(e){var t=e.onChange,a=Object(i.b)().t;return r.a.createElement("div",null,r.a.createElement(d.a.Group,{as:m.a,controlId:"exampleForm.SelectTag"},r.a.createElement(d.a.Control,{as:"select",style:f,onChange:function(e){t(e.target.value)}},r.a.createElement("option",{value:"\u05db\u05dc\u05dc\u05d9"},a("general")),r.a.createElement("option",{value:"\u05d4\u05d5\u05dc\u05db\u05d9 \u05e8\u05d2\u05dc"},a("pedestrian")),r.a.createElement("option",{value:"\u05e8\u05d5\u05db\u05d1\u05d9 \u05d0\u05d5\u05e4\u05e0\u05d9\u05d9\u05dd"},a("cyclist")),r.a.createElement("option",{value:"\u05e8\u05d5\u05db\u05d1\u05d9 \u05d0\u05d5\u05e4\u05e0\u05d5\u05e2"},a("motorcycle")),r.a.createElement("option",{value:"\u05de\u05db\u05d5\u05e0\u05d9\u05d5\u05ea"},a("car")),r.a.createElement("option",{value:"\u05d0\u05d5\u05d8\u05d5\u05d1\u05d5\u05e1\u05d9\u05dd"},a("bus")),r.a.createElement("option",{value:"\u05d9\u05dc\u05d3\u05d9\u05dd"},a("kids")))))})),b=a(13),v={borderRadius:"5px",padding:"5px",margin:"7px",width:"80%"},x={display:"flex",justifyContent:"flex-end"},h=Object(c.a)((function(e){var t=e.type,a=Object(b.a)(),i=a.imageStore,c=a.uiStore,s=i.getImages,p=i.setCurrImage,d=i.imageList,f=i.setCurrTag,h=c.language,j="en"!==h;Object(n.useEffect)((function(){s(t)}),[s,t]);var y="title".concat(h),w="text".concat(h),k=Object(l.r)(d),T=k.map((function(e){return{original:e.filename,thumbnail:e.filename,originalTitle:e[y],description:e[w]}})),L=T.length>0;return r.a.createElement(o.a,{style:v},r.a.createElement(u.a,null,r.a.createElement(m.a,{md:2},r.a.createElement(E,{onChange:function(e){return f(e)}})),r.a.createElement(m.a,{xs:12,md:8},L&&r.a.createElement(C,null)),r.a.createElement(m.a,{md:2,style:x},L&&r.a.createElement(O,null))),L&&r.a.createElement(g.a,{items:T,isRTL:j,onSlide:function(e){return function(e){return k.length>0&&p(k[e]),!0}(e)}}),!L&&r.a.createElement(S,null))})),j={marginLeft:"3px",marginRight:"3px",marginBottom:"3px"},O=Object(c.a)((function(){var e=Object(b.a)().imageStore,t=e.hideDescription,a=e.toggleHideDescription;return r.a.createElement("div",{style:j},r.a.createElement(p.a,{condtion:t,textTrue:"show-description",textFalse:"hide-description",onClick:a}))})),y={textAlign:"center",fontWeight:700,fontSize:18,margin:"10px"},C=Object(c.a)((function(){var e=Object(b.a)(),t=e.imageStore,a=e.uiStore,n=t.currImage,i=a.language,c="title".concat(i),l=null!==n?n[c]:"";return r.a.createElement("div",{style:y},l)})),S=Object(c.a)((function(){var e=Object(i.b)().t,t=Object(b.a)().imageStore.isLoading;return r.a.createElement("span",null,"".concat(e(t?"Loading\u2026":"not-found-images")))}));t.default=h}}]);
//# sourceMappingURL=11.0607530b.chunk.js.map