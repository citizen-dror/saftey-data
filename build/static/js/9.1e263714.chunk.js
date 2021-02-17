(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[9],{414:function(e,t,a){"use strict";var r=a(50),c=a(0),i=a(133),n=a(11),l=a(10),o=a(12),s=a(1),j=Object(n.a)((function(e){var t=e.id,a=e.labelText,n=void 0===a?"GroupBy":a,j=Object(i.a)().t,d=Object(o.a)().filterStore,b=d.groupByDict,h=d.groupBy,u=d.updateGroupby,O=""!==n?Object(s.jsxs)(l.a.Label,{className:"filterLable",children:[" ",j(n),":"]}):null,p=Object(c.useCallback)((function(e){u(e.target.value)}),[u]);return Object(s.jsx)(l.a,{className:"form-inline",children:Object(s.jsx)(l.a.Group,{controlId:"GrupForm.".concat(t,".SelectGroupBy"),children:Object(s.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[O,Object(s.jsx)(l.a.Control,{as:"select",value:h.text,onChange:p,className:"form-select form-select-sm",children:Object.entries(b).map((function(e){var t=Object(r.a)(e,2),a=t[0],c=t[1];return Object(s.jsx)("option",{value:c.text,children:j(c.text)},a)}))})]})})})}));t.a=j},415:function(e,t,a){"use strict";var r=a(50),c=a(0),i=a(133),n=a(11),l=a(10),o=a(12),s=a(1),j=Object(n.a)((function(e){var t=e.id,a=Object(i.a)().t,n=Object(o.a)().filterStore,j=n.group2Dict,d=n.groupBy2,b=n.updateGroupBy2,h=Object(c.useCallback)((function(e){b(e.target.value)}),[b]);return Object(s.jsx)(l.a,{className:"form-inline",children:Object(s.jsx)(l.a.Group,{controlId:"GrupForm.".concat(t,".SelectGroupBy2"),children:Object(s.jsx)(l.a.Control,{as:"select",value:d.text,onChange:h,className:"form-select form-select-sm",children:Object.entries(j).map((function(e){var t=Object(r.a)(e,2),c=t[0],i=t[1];return Object(s.jsx)("option",{value:i.text,children:a(i.text)},c)}))})})})}));t.a=j},548:function(e,t,a){"use strict";a.r(t),a.d(t,"GroupByGraphsPanel",(function(){return S}));var r=a(50),c=a(0),i=a.n(c),n=a(133),l=a(11),o=a(2),s=a(104),j=a(12),d=a(414),b=a(415),h=a(459),u=(a(465),a(1)),O=function(e){var t,a=e.data,r=e.metaData,c=e.chartType,i=void 0===c?"BarChart":c,l=(e.height,e.dir),o=e.fill,s=void 0===o?"#8884d8":o,j=Object(n.a)().t;if(void 0==r){var d=a.map((function(e){return e._id})),b=a.map((function(e){return e.count}));t={labels:d,datasets:[{label:j("casualties"),backgroundColor:function(e,t,a){return"PieChart"===e?t<3?["#031E47","#6791B2"]:t<6?["#031E47","#24446B","#466B8F","#6791B2","#88B7D6"]:["#031E47","#19385F","#2F5177","#466B8F","#5C84A6","#729EBE","#88B7D6","#07681F","#2D7B2C","#538E39","#7AA146","#A0B352","#C6C65F","#ECD96C","#540455","#671E6A","#7A377F","#8D5194","#A06BA9","#B384BE","#C69ED3"]:a}(i,a.length,s),borderColor:"rgba(255,255,255,0.7)",borderWidth:1,hoverBorderColor:"rgba(255,99,132,1)",data:b}]}}else{t={labels:a.map((function(e){return e._id})),datasets:r.map((function(e){return{label:j(e.key),backgroundColor:e.color,hoverBackgroundColor:"rgba(255,99,132,0.4)",hoverBorderColor:"rgba(255,99,132,1)",data:a.map((function(t){return t[e.key]}))}}))}}var O="rtl"===l?"right":"center",p={responsive:!0,maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0,min:0}}]},plugins:{datalabels:{display:!0,color:"white",align:O}}};return"BarChart"===i?Object(u.jsx)(h.Bar,{data:t,options:p}):"HorizontalBar"===i?Object(u.jsx)(h.HorizontalBar,{data:t,options:{responsive:!0,maintainAspectRatio:!1,plugins:{datalabels:{display:!0,color:"white",align:O}}}}):Object(u.jsx)(h.Pie,{data:t,options:{responsive:!0,plugins:{datalabels:{display:!0,color:"white",align:O}}}})},p=a(193),x=a(10),f=a(189),v=Object(l.a)((function(){var e=Object(n.a)().t,t=Object(j.a)().uiStore,a=t.chartType,i=t.chartTypeList,l=t.updateChartType,o=t.showPercentageChart,s=t.updateShowPercentageChart,d=Object(c.useCallback)((function(e){l(e.target.value)}),[l]);return Object(u.jsxs)("div",{children:[Object(u.jsxs)(x.a.Group,{controlId:"ConfigFile.SelectChartType",children:[e("ChartType"),Object(u.jsx)(x.a.Control,{as:"select",value:a,onChange:d,children:Object.entries(i).map((function(t){var a=Object(r.a)(t,2),c=a[0],i=a[1];return Object(u.jsx)("option",{value:i,children:e(i)},c)}))})]}),Object(u.jsx)(x.a.Group,{controlId:"ConfigFile.ControlShowPercentageChart",children:Object(u.jsx)(f.a,{label:"PercentageChart",group:"ChartConfig",id:2,checked:o,onChange:function(e){s(e.target.checked)}},2)})]})})),g=a(45),y=a(128);function C(e){var t=e.color?e.color:"blue",a=e.height?e.height:24,r=e.width?e.width:24;return Object(u.jsxs)("svg",Object(y.a)(Object(y.a)({xmlns:"http://www.w3.org/2000/svg",height:a,viewBox:"0 0 24 24",width:r},e),{},{children:[Object(u.jsx)("path",{d:"M0 0h24v24H0V0z",fill:"none"}),Object(u.jsx)("path",{d:"M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",fill:t})]}))}var m=i.a.memo(C),B=a(136),w=a(403),G=a(52),S=Object(l.a)((function(){var e=Object(j.a)().filterStore.dataByYears;return Object(o.r)(e).length>0?Object(u.jsxs)(i.a.Fragment,{children:[Object(u.jsxs)(w.a,{children:[Object(u.jsx)(G.a,{md:4,children:Object(u.jsx)(F,{})}),Object(u.jsx)(G.a,{md:8,children:Object(u.jsx)(k,{})})]}),Object(u.jsx)(w.a,{children:Object(u.jsx)(G.a,{md:12,children:Object(u.jsx)(T,{})})})]}):null})),F=Object(l.a)((function(){var e=Object(n.a)().t,t=Object(j.a)(),a=t.filterStore,r=t.uiStore,c=a.dataFilterdByYears,i=a.casualtiesNames,l=r.direction,s=Object(o.r)(c);return Object(u.jsx)(B.a,{styleType:2,header:"".concat(e(i)," ").concat(e("by-years")),children:Object(u.jsx)("div",{style:{width:"100%",height:"60vh"},children:Object(u.jsx)(O,{data:s,fill:"#FE9772",dir:l})})})})),k=Object(l.a)((function(){var e={divConfig:{display:"flex",justifyContent:"space-between"},divChart:{width:"100%",height:"60vh"}},t=Object(c.useState)(!1),a=Object(r.a)(t,2),i=a[0],n=a[1],l=Object(j.a)(),b=l.filterStore,h=l.uiStore,x=b.dataFilterd,f=Object(o.r)(x),y=h.chartType,C=h.direction,w=Object(u.jsx)(O,{data:f,fill:"#8884d8",chartType:y,height:150,dir:C}),G=Object(g.a)([],Object(u.jsx)(m,{color:"var(--onprimary-color)"}));return Object(u.jsxs)(B.a,{children:[Object(u.jsxs)("div",{style:e.divConfig,children:[Object(u.jsx)(d.a,{id:"Graphs.Main"}),Object(u.jsx)(s.a,{onClick:function(){n(!i)},children:G})]}),Object(u.jsx)(p.a,{title:"Chart Options",showModal:i,setShow:n,children:Object(u.jsx)(v,{})}),Object(u.jsxs)("div",{children:[Object(u.jsx)("hr",{}),Object(u.jsx)("div",{style:e.divChart,children:w})]})]})})),T=Object(l.a)((function(){var e={styleLable:{fontWeight:700,marginTop:"5px",marginLeft:"20px",marginRight:"20px"},divChart:{width:"100%",height:"60vh"}},t=Object(n.a)().t,a=Object(j.a)(),r=a.filterStore,c=a.uiStore,i=r.groupBy2,l=c.chartType,s=c.direction,h=i.getBars(),p=Object(o.r)(r.dataGroupby2);return Object(u.jsx)("div",{children:Object(u.jsxs)(B.a,{children:[Object(u.jsxs)("div",{style:{display:"flex",flexWrap:"wrap"},children:[Object(u.jsxs)("span",{style:e.styleLable,children:[" ",t("GroupBy")," ",":"]}),Object(u.jsx)(d.a,{id:"Graphs.Grp2",labelText:""})," ","\xa0",Object(u.jsx)(b.a,{id:"Graphs"})]}),Object(u.jsx)("hr",{}),Object(u.jsx)("div",{style:e.divChart,children:Object(u.jsx)(O,{data:p,metaData:h,chartType:l,dir:s})})]})})}));t.default=S}}]);
//# sourceMappingURL=9.1e263714.chunk.js.map