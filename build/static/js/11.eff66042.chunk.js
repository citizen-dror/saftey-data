(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[11],{426:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(10),c=a(21);t.a=function(e){var t=e.condtion,a=e.textTrue,n=e.textFalse,l=e.width,o=void 0===l?70:l,u=e.onClick,m=Object(i.b)().t,s={width:"".concat(o,"px")};return r.a.createElement(c.a,{style:s,variant:"primary",onClick:function(){u()}},m(t?a:n))}},711:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(10),c=a(11),l=a(1),o=a(19),u=a(13),m=a(405),s=a(66),g=a(432),p=a.n(g),d=(a(404),a(426)),f=a(12),E={borderRadius:"5px",padding:"5px",margin:"7px",width:"80%"},b={display:"flex",justifyContent:"flex-end"},v=Object(c.a)((function(e){var t=e.type,a=Object(f.a)(),i=a.imageStore,c=a.uiStore,u=i.getImages,g=i.setCurrImage,d=i.imageList,v=i.setCurrTag,x=c.language,j="en"!==x;Object(n.useEffect)((function(){u(t)}),[u,t]);var y="title".concat(x),w="text".concat(x),k=Object(l.r)(d),T=k.map((function(e){return{original:e.filename,thumbnail:e.filename,originalTitle:e[y],description:e[w]}})),L=T.length>0;return r.a.createElement(o.a,{style:E},r.a.createElement(m.a,null,r.a.createElement(s.a,{md:2},r.a.createElement(O,{onChange:function(e){return v(e)}})),r.a.createElement(s.a,{xs:12,md:8},L&&r.a.createElement(C,null)),r.a.createElement(s.a,{md:2,style:b},L&&r.a.createElement(h,null))),L&&r.a.createElement(p.a,{items:T,isRTL:j,onSlide:function(e){return function(e){return k.length>0&&g(k[e]),!0}(e)}}),!L&&r.a.createElement(S,null))})),x={marginLeft:"3px",marginRight:"3px",marginBottom:"3px"},h=Object(c.a)((function(){var e=Object(f.a)().imageStore,t=e.hideDescription,a=e.toggleHideDescription;return r.a.createElement("div",{style:x},r.a.createElement(d.a,{condtion:t,textTrue:"show-description",textFalse:"hide-description",onClick:a}))})),j={width:"150px"},O=Object(c.a)((function(e){var t=e.onChange,a=Object(i.b)().t;return r.a.createElement("div",null,r.a.createElement(u.a.Group,{as:s.a,controlId:"exampleForm.SelectTag"},r.a.createElement(u.a.Control,{as:"select",style:j,onChange:function(e){t(e.target.value)}},r.a.createElement("option",{value:"\u05db\u05dc\u05dc\u05d9"},a("general")),r.a.createElement("option",{value:"\u05d4\u05d5\u05dc\u05db\u05d9 \u05e8\u05d2\u05dc"},a("pedestrian")),r.a.createElement("option",{value:"\u05e8\u05d5\u05db\u05d1\u05d9 \u05d0\u05d5\u05e4\u05e0\u05d9\u05d9\u05dd"},a("cyclist")),r.a.createElement("option",{value:"\u05e8\u05d5\u05db\u05d1\u05d9 \u05d0\u05d5\u05e4\u05e0\u05d5\u05e2"},a("motorcycle")),r.a.createElement("option",{value:"\u05de\u05db\u05d5\u05e0\u05d9\u05d5\u05ea"},a("car")),r.a.createElement("option",{value:"\u05d0\u05d5\u05d8\u05d5\u05d1\u05d5\u05e1\u05d9\u05dd"},a("bus")),r.a.createElement("option",{value:"\u05d9\u05dc\u05d3\u05d9\u05dd"},a("kids")))))})),y={textAlign:"center",fontWeight:700,fontSize:18,margin:"10px"},C=Object(c.a)((function(){var e=Object(f.a)(),t=e.imageStore,a=e.uiStore,n=t.currImage,i=a.language,c="title".concat(i),l=null!==n?n[c]:"";return r.a.createElement("div",{style:y},l)})),S=Object(c.a)((function(){var e=Object(i.b)().t,t=Object(f.a)().imageStore.isLoading;return r.a.createElement("span",null,"".concat(e(t?"Loading\u2026":"not-found-images")))}));t.default=v}}]);
//# sourceMappingURL=11.eff66042.chunk.js.map