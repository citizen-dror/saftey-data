(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[9],{421:function(e,t,a){"use strict";var r=a(70),c=(a(0),a(144)),s=a(116),i=a(1);t.a=function(e){var t=e.condtion,a=e.textTrue,n=e.textFalse,l=e.disabled,o=void 0!==l&&l,d=e.onClick,j=e.style,b=Object(c.a)().t;return Object(i.jsx)(s.a,{className:"btn-sm",variant:"primary",disabled:o,onClick:function(){d()},style:Object(r.a)({},j),children:b(t?a:n)})}},422:function(e,t,a){"use strict";a(0);var r=a(144),c=a(16),s=a(145),i=a(1),n={width:"150px"};t.a=function(e){var t=e.label,a=e.id,l=e.data,o=e.value,d=e.onChange,j=Object(r.a)().t,b=l.map((function(e,t){return Object(i.jsx)("option",{value:e.val,children:j(e.text)},t)}));return Object(i.jsx)("div",{children:Object(i.jsxs)(c.a.Group,{as:s.a,controlId:a,children:[t&&Object(i.jsxs)(c.a.Label,{className:"selectLabel",children:[j(t),":"]}),Object(i.jsx)(c.a.Control,{as:"select",className:"form-select form-select-sm",style:n,value:o,onChange:function(e){d(e.target.value)},children:b})]})})}},538:function(e,t,a){"use strict";a.r(t);var r=a(0),c=a(144),s=a(10),i=a(2),n=a(438),l=a(440),o=a(27),d=a.n(o),j=a(436),b=a(499),h=function(e){var t="";switch(e){case"":case"\u05d4\u05d5\u05dc\u05da \u05e8\u05d2\u05dc":t="#4cc9f0";break;case"\u05e8\u05db\u05d1 \u05e0\u05d5\u05e1\u05e2\u05d9\u05dd \u05e4\u05e8\u05d8\u05d9":case"\u05de\u05db\u05d5\u05e0\u05d9\u05ea":t="#f72585";break;case'\u05d0\u05d5\u05e4\u05e0\u05d5\u05e2 \u05e2\u05d3 50 \u05e1\u05de"\u05e7':case'\u05d0\u05d5\u05e4\u05e0\u05d5\u05e2 51 \u05e2\u05d3 125 \u05e1\u05de"\u05e7':case'\u05d0\u05d5\u05e4\u05e0\u05d5\u05e2 126 \u05e2\u05d3 400 \u05e1\u05de"\u05e7':case'\u05d0\u05d5\u05e4\u05e0\u05d5\u05e2 401+ \u05e1\u05de"\u05e7':case"\u05d0\u05d5\u05e4\u05e0\u05d5\u05e2":t="#b5179e";break;case"\u05d0\u05d5\u05e4\u05e0\u05d9\u05d9\u05dd":t="#4895ef";break;case"\u05d0\u05d5\u05e4\u05e0\u05d9\u05d9\u05dd \u05d7\u05e9\u05de\u05dc\u05d9\u05d9\u05dd":case"\u05d7\u05e9\u05de\u05dc\u05d9 \u05d3\u05d5 \u05d2\u05dc\u05d2\u05dc\u05d9":case"\u05e7\u05d5\u05e8\u05e7\u05d9\u05e0\u05d8 \u05d7\u05e9\u05de\u05dc\u05d9":t="#3f37c9";break;default:t="#FE4E00"}return t},f=function(e){var t="";switch(e){case"\u05e4\u05d2\u05d9\u05e2\u05d4 \u05d1\u05d4\u05d5\u05dc\u05da \u05e8\u05d2\u05dc":t="#f94144";break;case"\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05d0\u05d7\u05d5\u05e8 \u05d0\u05dc \u05e6\u05d3":t="#277da1";break;case"\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05d0\u05d7\u05d5\u05e8 \u05d1\u05d7\u05d6\u05d9\u05ea":case"\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05d7\u05d6\u05d9\u05ea \u05d1\u05d0\u05d7\u05d5\u05e8":t="#577590";break;case"\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05d7\u05d6\u05d9\u05ea \u05d1\u05d7\u05d6\u05d9\u05ea":t="#43aa8b";break;case"\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05d7\u05d6\u05d9\u05ea \u05d1\u05e6\u05d3":t="#90be6d";break;case"\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05e6\u05d3 \u05d1\u05e6\u05d3":t="#f9c74f";break;case"\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05e2\u05dd \u05d1\u05e2\u05dc \u05d7\u05d9\u05d9\u05dd":case"\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05e2\u05dd \u05e2\u05e6\u05dd \u05d3\u05d5\u05de\u05dd":case"\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05e2\u05dd \u05e8\u05db\u05d1 \u05d7\u05d5\u05e0\u05d4":case"\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05e2\u05dd \u05e8\u05db\u05d1 \u05e9\u05e0\u05e2\u05e6\u05e8 \u05dc\u05dc\u05d0 \u05d7\u05e0\u05d9\u05d4":t="#f9844a";break;case"\u05d4\u05d7\u05dc\u05e7\u05d4":t="#f8961e";break;case"\u05d4\u05ea\u05d4\u05e4\u05db\u05d5\u05ea":t="#f3722c";break;default:t="#333333"}return t},C=function(e){var t="";switch(e){case"\u05e2\u05e6\u05de\u05d9\u05ea":case"\u05d4\u05d7\u05dc\u05e7\u05d4":case"\u05d4\u05ea\u05d4\u05e4\u05db\u05d5\u05ea":case"\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05e2\u05dd \u05e2\u05e6\u05dd \u05d3\u05d5\u05de\u05dd":case"\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05e2\u05dd \u05e8\u05db\u05d1 \u05d7\u05d5\u05e0\u05d4":case"\u05d9\u05e8\u05d9\u05d3\u05d4 \u05de\u05d4\u05db\u05d1\u05d9\u05e9 \u05d0\u05d5 \u05e2\u05dc\u05d9\u05d9\u05d4 \u05dc\u05de\u05d3\u05e8\u05db\u05d4":case"\u05e4\u05d2\u05d9\u05e2\u05d4 \u05d1\u05e0\u05d5\u05e1\u05e2 \u05d1\u05ea\u05d5\u05da \u05db\u05dc\u05d9 \u05d4\u05e8\u05db\u05d1":case"\u05e0\u05e4\u05d9\u05dc\u05d4 \u05de\u05e8\u05db\u05d1 \u05e0\u05e2":t="#138D75";break;default:t="#f94144"}return t},u=function(e){var t="";switch(e){case"\u05d4\u05e8\u05d5\u05d2":t="#CA273B";break;default:t="#F8A141"}return t},x=function(e){var t="";switch(e){case"\u05d9\u05d5\u05dd":t="#ffcc00";break;default:t="#333333"}return t},p=function(e){var t="";switch(e){case"\u05e0\u05e7\u05d1\u05d4":t="#4895ef";break;case"\u05d6\u05db\u05e8":t="#1E6091";break;default:t="#FDE2E4"}return t},v=function(e){var t="";switch(e){case"\u05dc\u05d0-\u05e2\u05d9\u05e8\u05d5\u05e0\u05d9\u05ea \u05dc\u05d0 \u05d1\u05e6\u05d5\u05de\u05ea":case"\u05e2\u05d9\u05e8\u05d5\u05e0\u05d9\u05ea \u05dc\u05d0 \u05d1\u05e6\u05d5\u05de\u05ea":case"\u05dc\u05d0 \u05d1\u05e6\u05d5\u05de\u05ea":t="#4895ef";break;case"\u05dc\u05d0-\u05e2\u05d9\u05e8\u05d5\u05e0\u05d9\u05ea \u05d1\u05e6\u05d5\u05de\u05ea":case"\u05e2\u05d9\u05e8\u05d5\u05e0\u05d9\u05ea \u05d1\u05e6\u05d5\u05de\u05ea":case"\u05d1\u05e6\u05d5\u05de\u05ea":t="#CD6155";break;default:t="#FDE2E4"}return t},O=function(e,t){var a=[];return e.forEach((function(e){a.push('<div><i style="background:'.concat(t(e),'"></i> ').concat(e,"</div>"))})),a},L=a(1),w=function(e){var t=e.fill,a=void 0===t?"red":t,r=e.width,c=void 0===r?24.6:r,s=e.height,i=void 0===s?30:s;return Object(L.jsxs)("svg",{width:c,height:i,viewBox:"0 0 26 34",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(L.jsx)("path",{d:"M13 0C6.0974 0 0.481453 5.83195 0.481453 13C0.481453 15.1519 0.999529 17.2855 1.98441 19.1779L12.3154 33.5811C12.4529 33.8397 12.715 34 13 34C13.285 34 13.547 33.8397 13.6846 33.5811L24.0194 19.1715C25.0005 17.2855 25.5185 15.1518 25.5185 12.9999C25.5185 5.83195 19.9026 0 13 0Z",fill:a}),Object(L.jsx)("circle",{stroke:"#FFF",cx:"5.116",cy:"17.427",r:"3",id:"svg_2",transform:"matrix(0.681942, 0, 0, 0.723209, 3.744888, 3.238379)"}),Object(L.jsx)("circle",{stroke:"#FFF",cx:"21.116",cy:"17.427",r:"3",id:"svg_3",transform:"matrix(0.681942, 0, 0, 0.723209, 3.744888, 3.238379)"}),Object(L.jsx)("line",{stroke:"#FFF",x1:"21.554",x2:"22.918",y1:"12.948",y2:"12.948",id:"svg_4"}),Object(L.jsx)("line",{stroke:"#FFF",x1:"5.188",x2:"18.827",y1:"10.78",y2:"10.78",id:"svg_5"}),Object(L.jsx)("line",{stroke:"#FFF",x1:"11.326",x2:"9.279",y1:"6.44",y2:"10.78",id:"svg_6"}),Object(L.jsx)("path",{stroke:"#FFF",d:"M 20.191 15.842 L 22.918 15.842 C 23.327 15.842 23.6 15.552 23.6 15.118 L 23.6 13.672 C 23.6 12.082 22.373 10.78 20.872 10.78 L 18.827 10.78 L 16.235 7.453 C 15.69 6.802 14.94 6.44 14.122 6.44 L 8.938 6.44 C 7.915 6.44 6.961 7.091 6.483 8.031 L 5.188 10.78 L 4.506 10.78 C 3.756 10.78 3.142 11.431 3.142 12.226 L 3.142 15.118 C 3.142 15.552 3.415 15.842 3.824 15.842 L 5.188 15.842",id:"svg_7"}),Object(L.jsx)("line",{stroke:"#FFF",x1:"9.279",x2:"16.099",y1:"15.842",y2:"15.842",id:"svg_8"})]})},m=function(e){var t=e.fill,a=void 0===t?"red":t,r=e.width,c=void 0===r?24.6:r,s=e.height,i=void 0===s?30:s;return Object(L.jsxs)("svg",{width:c,height:i,viewBox:"0 0 26 34",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(L.jsx)("path",{d:"M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z",fill:a}),Object(L.jsx)("path",{fill:"#FFF",d:"M 18.606 19.589 C 16.021 19.589 14.406 17.045 15.698 15.007 C 16.991 12.972 20.224 12.972 21.517 15.007 C 21.811 15.472 21.966 16 21.966 16.534 C 21.966 18.222 20.462 19.589 18.606 19.589 Z M 18.606 15.007 C 17.314 15.007 16.507 16.28 17.153 17.297 C 17.799 18.316 19.415 18.316 20.061 17.297 C 20.209 17.065 20.288 16.804 20.288 16.534 C 20.288 15.692 19.537 15.007 18.606 15.007 Z"}),Object(L.jsx)("path",{fill:"#FFF",d:"M 6.85 19.589 C 4.267 19.589 2.647 17.045 3.942 15.007 C 5.233 12.972 8.467 12.972 9.758 15.007 C 10.054 15.472 10.209 16 10.209 16.534 C 10.209 18.222 8.705 19.589 6.85 19.589 Z M 6.85 15.007 C 5.556 15.007 4.751 16.28 5.396 17.297 C 6.043 18.316 7.659 18.316 8.305 17.297 C 8.451 17.065 8.531 16.804 8.531 16.534 C 8.531 15.692 7.779 15.007 6.85 15.007 Z"}),Object(L.jsx)("path",{fill:"#FFF",stroke:"none",d:"M 12.728 17.297 L 7.691 17.297 C 7.043 17.297 6.638 16.662 6.965 16.152 C 7.113 15.916 7.392 15.772 7.691 15.772 L 12.728 15.772 C 13.375 15.772 13.778 16.408 13.456 16.916 C 13.304 17.154 13.028 17.297 12.728 17.297 Z"}),Object(L.jsx)("path",{fill:"#FFF",stroke:"none",d:"M 13.567 15.007 L 11.889 15.007 C 11.664 15.008 11.451 14.928 11.292 14.787 L 8.185 11.954 L 6.011 11.954 C 5.786 11.955 5.574 11.875 5.416 11.733 L 4.575 10.969 C 4.115 10.551 4.326 9.839 4.953 9.687 C 5.244 9.617 5.554 9.694 5.768 9.885 L 6.357 10.428 L 8.531 10.428 C 8.754 10.428 8.967 10.506 9.127 10.649 L 12.233 13.482 L 13.258 13.482 L 15.963 11.375 C 16.114 11.256 16.307 11.19 16.508 11.19 L 19.101 11.19 C 19.29 11.186 19.444 11.05 19.447 10.879 C 19.449 10.795 19.412 10.709 19.345 10.649 L 15.492 7.153 C 15.032 6.734 15.243 6.022 15.869 5.871 C 16.162 5.799 16.471 5.875 16.684 6.068 L 20.529 9.573 C 20.915 9.915 21.13 10.388 21.125 10.879 C 21.125 11.895 20.221 12.718 19.101 12.718 L 16.818 12.718 L 14.114 14.826 C 13.96 14.943 13.769 15.007 13.567 15.007 Z"}),Object(L.jsx)("path",{fill:"#FFF",stroke:"none",d:"M 11.889 11.954 L 6.011 11.954 C 5.364 11.954 4.961 11.317 5.283 10.809 C 5.434 10.573 5.71 10.428 6.011 10.428 L 11.545 10.428 L 12.973 9.122 C 13.132 8.98 13.344 8.9 13.567 8.902 L 15.249 8.902 C 15.894 8.902 16.299 9.537 15.976 10.046 C 15.824 10.282 15.547 10.428 15.249 10.428 L 13.912 10.428 L 12.485 11.733 C 12.326 11.875 12.112 11.955 11.889 11.954 Z"}),Object(L.jsx)("path",{fill:"#FFF",stroke:"none",d:"M 17.768 8.137 L 17.768 11.954 L 19.101 11.954 C 20.013 11.957 20.588 11.063 20.136 10.342 C 20.082 10.258 20.017 10.183 19.942 10.114 Z"})]})},g=function(e){var t=e.fill,a=void 0===t?"red":t,r=e.width,c=void 0===r?24.6:r,s=e.height,i=void 0===s?30:s;return Object(L.jsxs)("svg",{width:c,height:i,viewBox:"0 0 26 34",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(L.jsx)("path",{d:"M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z",fill:a}),Object(L.jsx)("path",{fill:"#FFF",d:"M 8.758 11.611 L 11.571 9.763 C 11.887 9.554 12.27 9.446 12.661 9.459 C 13.64 9.48 14.495 10.06 14.793 10.902 C 14.955 11.366 15.104 11.678 15.239 11.841 C 16.067 12.839 17.368 13.427 18.749 13.426 L 18.749 15.014 C 16.913 15.016 15.173 14.274 14.008 12.993 L 13.396 16.132 L 15.204 17.504 L 17.155 22.352 L 15.506 22.895 L 13.715 18.448 L 10.74 16.189 C 10.242 15.826 10.002 15.248 10.113 14.678 L 10.56 12.388 L 9.966 12.779 L 8.099 15.102 L 6.679 14.169 L 8.743 11.601 L 8.758 11.611 Z M 11.312 19.522 L 8.492 22.562 L 7.147 21.543 L 9.759 18.729 L 10.414 16.998 L 11.986 18.189 L 11.312 19.522 Z"}),Object(L.jsx)("circle",{fill:"#FFF",cx:"24.241",cy:"8.905",r:"3.8",transform:"matrix(0.508679, 0, 0, 0.466243, 1.41729, 3.309399)"})]})},k=function(e){var t=e.fill,a=void 0===t?"red":t,r=e.width,c=void 0===r?24.6:r,s=e.height,i=void 0===s?30:s;return Object(L.jsxs)("svg",{width:c,height:i,viewBox:"0 0 26 34",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(L.jsx)("path",{d:"M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z",fill:a}),Object(L.jsx)("path",{className:"bike1",d:"M 7.871 20.859 C 5.374 20.859 3.812 17.908 5.061 15.547 C 6.311 13.186 9.432 13.186 10.681 15.547 C 10.967 16.085 11.117 16.694 11.117 17.319 C 11.113 19.273 9.662 20.856 7.871 20.859 Z M 7.871 15.35 C 6.483 15.35 5.617 16.989 6.311 18.302 C 7.005 19.614 8.739 19.614 9.432 18.302 C 9.589 18.004 9.674 17.668 9.674 17.325 C 9.679 16.235 8.871 15.35 7.871 15.35 Z"}),Object(L.jsx)("path",{className:"bike1",d:"M 17.248 20.859 C 14.749 20.859 13.187 17.908 14.437 15.547 C 15.686 13.186 18.808 13.186 20.058 15.547 C 20.342 16.085 20.493 16.694 20.493 17.319 C 20.488 19.273 19.037 20.856 17.248 20.859 Z M 17.248 15.35 C 15.859 15.35 14.991 16.989 15.686 18.302 C 16.379 19.614 18.114 19.614 18.808 18.302 C 18.966 18.003 19.05 17.663 19.05 17.319 C 19.05 16.231 18.242 15.35 17.248 15.35 Z"}),Object(L.jsx)("path",{className:"bike1",d:"M 12.56 18.498 C 12.16 18.498 11.838 18.146 11.838 17.711 L 11.838 14.894 L 9.531 12.383 C 9.247 12.075 9.247 11.573 9.531 11.265 L 11.564 9.093 C 11.918 8.625 12.602 8.751 12.797 9.319 C 12.907 9.643 12.811 10.007 12.56 10.218 L 11.053 11.792 L 13.058 13.972 C 13.205 14.126 13.285 14.341 13.281 14.564 L 13.281 17.711 C 13.281 18.146 12.957 18.498 12.56 18.498 Z"}),Object(L.jsx)("path",{className:"bike1",d:"M 16.395 12.745 L 14.233 12.745 C 14.044 12.744 13.862 12.662 13.727 12.517 L 11.564 10.218 C 11.124 9.848 11.214 9.098 11.728 8.867 C 12.02 8.735 12.357 8.827 12.56 9.093 L 14.514 11.17 L 16.383 11.17 C 16.937 11.17 17.284 11.826 17.006 12.351 C 16.878 12.594 16.639 12.745 16.383 12.745 Z"}),Object(L.jsx)("circle",{className:"bike1",cx:"14.32",cy:"4",r:"2",transform:"matrix(0.721159, 0, 0, 0.787069, 3.905845, 4.331152)"})]})},y=function(e){var t=e.fill,a=void 0===t?"red":t,r=e.width,c=void 0===r?24.6:r,s=e.height,i=void 0===s?30:s;return Object(L.jsxs)("svg",{width:c,height:i,viewBox:"0 0 26 34",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(L.jsx)("path",{d:"M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z",fill:a}),Object(L.jsx)("polyline",{stroke:"#FFF",strokeWidth:"1",strokeLinecap:"round",points:"15.363 6.284 16.84 6.284 18.811 18.838"}),Object(L.jsx)("circle",{stroke:"#FFF",strokeWidth:"2",cx:"28",cy:"25",r:"3",transform:"matrix(0.492416, 0, 0, 0.62765, 5.022794, 3.145868)"}),Object(L.jsx)("circle",{stroke:"#FFF",strokeWidth:"2",cx:"4",cy:"25",r:"3",transform:"matrix(0.492416, 0, 0, 0.62765, 5.022794, 3.145868)"}),Object(L.jsx)("path",{stroke:"#FFF",strokeWidth:"1",strokeLinecap:"round",d:"M 6.993 15.07 C 8.618 15.07 9.947 16.766 9.947 18.838"}),Object(L.jsx)("polyline",{stroke:"#FFF",strokeWidth:"1",strokeLinecap:"round",points:"17.825 13.815 15.363 18.838 6.993 18.838"})]})},_=function(e){var t=e.fill,a=void 0===t?"red":t,r=e.width,c=void 0===r?24.6:r,s=e.height,i=void 0===s?30:s;return Object(L.jsxs)("svg",{width:c,height:i,viewBox:"0 0 26 34",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(L.jsx)("path",{d:"M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z",fill:a}),Object(L.jsx)("path",{fill:"#FFF",d:"M 7.415 9.199 C 7.709 8.437 8.075 7.814 8.589 7.329 C 9.102 6.845 9.763 6.43 10.495 6.153 C 11.228 5.876 12.11 5.737 13.062 5.737 C 13.796 5.737 14.53 5.876 15.191 6.083 C 15.85 6.292 16.437 6.638 16.95 6.984 C 17.465 7.329 17.83 7.884 18.124 8.437 C 18.418 8.99 18.564 9.684 18.564 10.444 C 18.564 11.414 18.343 12.176 17.903 12.869 C 17.465 13.562 16.877 14.183 16.216 14.806 C 15.63 15.361 15.191 15.775 14.898 16.052 C 14.53 16.329 14.31 16.675 14.163 16.952 C 14.017 17.229 13.87 17.575 13.87 17.991 C 13.796 18.406 13.796 18.684 13.796 19.444 L 12.11 19.444 C 12.11 18.684 12.11 18.338 12.256 17.854 C 12.329 17.299 12.549 16.883 12.771 16.398 C 12.991 15.982 13.356 15.568 13.724 15.152 C 14.163 14.737 14.603 14.322 15.191 13.838 C 15.704 13.422 16.144 12.938 16.437 12.384 C 16.804 11.829 16.95 11.207 16.95 10.584 C 16.95 10.099 16.877 9.615 16.657 9.199 C 16.437 8.784 16.144 8.437 15.85 8.091 C 15.556 7.745 15.117 7.538 14.603 7.4 C 14.163 7.26 13.649 7.123 13.137 7.123 C 12.403 7.123 11.743 7.26 11.228 7.466 C 10.644 7.676 10.202 8.022 9.835 8.437 C 9.47 8.853 9.176 9.337 9.029 9.891 C 8.882 10.444 8.736 10.93 8.811 11.553 L 7.122 11.553 C 7.05 10.584 7.122 9.96 7.415 9.199 L 7.415 9.199 Z M 11.816 21.314 L 13.87 21.314 L 13.87 23.253 L 11.816 23.253 L 11.816 21.314 Z",id:"Fill-48"})]})},F=function(e){var t=e.fill,a=void 0===t?"red":t,r=e.width,c=void 0===r?24.6:r,s=e.height,i=void 0===s?30:s;return Object(L.jsxs)("svg",{width:c,height:i,viewBox:"0 0 26 34",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(L.jsx)("path",{d:"M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z",fill:a}),Object(L.jsx)("path",{id:"svg_2",d:"M 8 19.5 C 5.8 19.5 4.4 17.3 5.5 15.6 C 6.6 13.9 9.4 13.9 10.5 15.6 C 10.8 16 10.9 16.4 10.9 16.9 C 10.9 18.3 9.6 19.5 8 19.5 Z M 8 16 C 7.3 16 6.8 16.8 7.2 17.3 C 7.5 17.9 8.5 17.9 8.8 17.3 C 8.9 17.2 9 17 9 16.9 C 9 16.4 8.5 16 8 16 Z",stroke:"none",fill:"#ffffff"}),Object(L.jsx)("path",{id:"svg_3",d:"M 18.2 19.6 C 16 19.6 14.6 17.4 15.7 15.7 C 16.8 14 19.6 14 20.7 15.7 C 20.9 16.1 21.1 16.5 21.1 17 C 21.1 18.4 19.8 19.6 18.2 19.6 Z M 18.2 16.1 C 17.4 16.1 17 16.9 17.4 17.4 C 17.7 18 18.7 18 19 17.4 C 19.1 17.3 19.2 17.1 19.2 17 C 19.2 16.5 18.7 16.1 18.2 16.1 Z",fill:"#ffffff"}),Object(L.jsx)("path",{id:"svg_4",d:"M 15.8 17.8 L 9.9 17.8 C 9.3 17.8 8.9 17 9.2 16.5 C 9.3 16.2 9.6 16 9.9 16 L 15.8 16 C 16.5 16 16.9 16.8 16.6 17.3 C 16.4 17.6 16.1 17.8 15.8 17.8 Z",fill:"#ffffff"}),Object(L.jsx)("path",{id:"svg_5",d:"M 5.9 17.6 L 4.9 17.6 C 3.9 17.6 3 16.9 3 16 L 3 8.7 C 3 7.3 4.3 6.2 5.9 6.2 L 17.5 6.2 C 20.1 6.2 22.3 8.1 22.3 10.3 L 22.3 13.6 C 22.3 14.2 21.5 14.6 20.8 14.3 C 20.5 14.1 20.3 13.9 20.3 13.6 L 20.3 10.3 C 20.3 9 19.1 7.9 17.5 7.9 L 5.9 7.9 C 5.4 7.9 4.9 8.2 4.9 8.7 L 4.9 16 L 5.9 16 C 6.6 16 7.1 16.7 6.7 17.2 C 6.5 17.5 6.2 17.6 5.9 17.6 Z",fill:"#ffffff"}),Object(L.jsx)("path",{id:"svg_6",stroke:"#ffffff",d:"M 20.5 11.8 L 8.9 11.8 C 8.2 11.8 7.7 11.5 8.1 11.2 C 8.2 11 8.6 10.9 8.9 10.9 L 20.5 10.9 C 21.2 10.9 21.7 11.3 21.3 11.6 C 21.1 11.8 20.8 11.8 20.5 11.8 Z",fill:"#ffffff"}),Object(L.jsx)("path",{id:"svg_7",d:"M 21.3 11.7 L 21.3 10.8 C 21.3 8.9 19.7 7.4 17.8 7.4 L 17.8 11.7 L 21.3 11.7 Z",fill:"#ffffff"})]})},M=function(e){var t=e.fill,a=void 0===t?"red":t,r=e.width,c=void 0===r?24.6:r,s=e.height,i=void 0===s?30:s;return Object(L.jsxs)("svg",{width:c,height:i,viewBox:"0 0 26 34",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(L.jsx)("path",{d:"M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z",fill:a}),Object(L.jsx)("path",{fill:"#FFF",d:"m6.66667,22a3,3 0 1 1 3,-3a3,3 0 0 1 -3,3zm0,-4a1,1 0 1 0 1,1a1,1 0 0 0 -1,-1z",id:"svg_2"}),Object(L.jsx)("path",{fill:"#FFF",d:"m18.66667,22a3,3 0 1 1 3,-3a3,3 0 0 1 -3,3zm0,-4a1,1 0 1 0 1,1a1,1 0 0 0 -1,-1z",id:"svg_3"}),Object(L.jsx)("path",{fill:"#FFF",d:"m13.66667,20l-5,0a1,1 0 0 1 0,-2l4,0l0,-10l-8,0l0,8a1,1 0 0 1 -2,0l0,-9a1,1 0 0 1 1,-1l10,0a1,1 0 0 1 1,1l0,12a1,1 0 0 1 -1,1z",id:"svg_4"}),Object(L.jsx)("path",{fill:"#FFF",d:"m21.66667,16a1,1 0 0 1 -1,-1l0,-0.67l-2.2,-2.93a1,1 0 0 0 -0.8,-0.4l-4,0a1,1 0 0 1 0,-2l4,0a3,3 0 0 1 2.4,1.2l2.4,3.2a1,1 0 0 1 0.2,0.6l0,1a1,1 0 0 1 -1,1z",id:"svg_5"}),Object(L.jsx)("path",{fill:"#FFF",d:"m20.66667,14l-2,0a2,2 0 0 1 -2,-2l0,-2l2,0l2,4z",id:"svg_6"}),Object(L.jsx)("path",{fill:"#FFF",d:"m19.66667,14l-3,0a1,1 0 0 1 0,-2l3,0a1,1 0 0 1 0,2z",id:"svg_7"})]})},Z=function(e){var t=e.fill,a=void 0===t?"red":t,r=e.width,c=void 0===r?24.6:r,s=e.height,i=void 0===s?30:s;return Object(L.jsxs)("svg",{width:c,height:i,viewBox:"0 0 26 34",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(L.jsx)("path",{d:"M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z",fill:a}),Object(L.jsx)("circle",{fill:"#fff",cx:"12.764",cy:"12.26",r:"5.228"})]})},T=a(435),S=function(e){var t=e.data,a=e.language,r={color:"#004ba0"},s=Object(c.a)().t;return void 0!==t.injured_type_hebrew?Object(L.jsx)(T.a,{children:Object(L.jsxs)("div",{className:"text".concat(a),children:[Object(L.jsxs)("div",{children:[Object(L.jsxs)("span",{style:r,children:[s("When"),":"]})," ",t.accident_timestamp,", ",t.day_in_week_hebrew,", ",t.day_night_hebrew]}),Object(L.jsxs)("div",{children:[Object(L.jsxs)("span",{style:r,children:[s("Who"),":"]})," ",t.injured_type_hebrew,", ",t.injury_severity_hebrew,", ",t.vehicle_vehicle_type_hebrew?"".concat(t.vehicle_vehicle_type_hebrew,", "):""," ",t.sex_hebrew,", ",t.age_group_hebrew,", ",t.population_type_hebrew]}),Object(L.jsxs)("div",{children:[Object(L.jsxs)("span",{style:r,children:[s("Where"),":"]}),t.accident_yishuv_name?"".concat(t.accident_yishuv_name,", "):"",t.street1_hebrew?"".concat(t.street1_hebrew,", "):"",t.street2_hebrew?"".concat(t.street2_hebrew,", "):"",t.road1?"".concat(s("Road")," ").concat(t.road1,", "):"",t.road2?"".concat(t.road2,", "):"",t.road_segment_name?"".concat(t.road_segment_name,", "):"",t.road_type_hebrew,t.location_accuracy_hebrew?" (".concat(t.location_accuracy_hebrew,")"):""]}),Object(L.jsxs)("div",{children:[Object(L.jsxs)("span",{style:r,children:[s("What"),":"]})," ",t.accident_type_hebrew," (",t.vehicles,")"]}),Object(L.jsxs)("div",{children:[Object(L.jsxs)("span",{style:r,children:[s("WhatRoad"),":"]})," ",t.speed_limit_hebrew?"".concat(t.speed_limit_hebrew,", "):"",t.multi_lane_hebrew?"".concat(t.multi_lane_hebrew,", "):"",t.one_lane_hebrew?"".concat(t.one_lane_hebrew,", "):"",t.road_width_hebrew?"".concat(t.road_width_hebrew,", "):""]})]})}):null},B=function(e){return Object(o.divIcon)({html:e,className:"ship-div-icon",iconAnchor:[0,30],popupAnchor:[1,-32]})},E=function(e){var t=e.data,a=e.language,r=e.colorBy,c=e.markerIconsType,s=new d.a.LatLng(t.latitude,t.longitude),i=function(e,t){var a="";switch(e){case"Severity":a=u(t.injury_severity_hebrew);break;case"Vehicle":a=h(t.vehicle_vehicle_type_hebrew);break;case"DayNight":a=x(t.day_night_hebrew);break;case"Gender":a=p(t.sex_hebrew);break;case"RoadType":a=v(t.road_type_hebrew);break;case"AccidentType":a=f(t.accident_type_hebrew);break;case"SelfOrNotAcc":a=C(t.accident_type_hebrew);break;default:a=u(t.injury_severity_hebrew)}return a}(r,t),n="general"===c?function(e){var t=Object(L.jsx)(Z,{fill:e}),a=Object(b.renderToStaticMarkup)(t);return B(a)}(i):function(e,t){var a;switch(e){case"":a=Object(L.jsx)(g,{fill:t});break;case"\u05e8\u05db\u05d1 \u05e0\u05d5\u05e1\u05e2\u05d9\u05dd \u05e4\u05e8\u05d8\u05d9":a=Object(L.jsx)(w,{fill:t});break;case'\u05d0\u05d5\u05e4\u05e0\u05d5\u05e2 \u05e2\u05d3 50 \u05e1\u05de"\u05e7':case'\u05d0\u05d5\u05e4\u05e0\u05d5\u05e2 51 \u05e2\u05d3 125 \u05e1\u05de"\u05e7':case'\u05d0\u05d5\u05e4\u05e0\u05d5\u05e2 126 \u05e2\u05d3 400 \u05e1\u05de"\u05e7':case'\u05d0\u05d5\u05e4\u05e0\u05d5\u05e2 401+ \u05e1\u05de"\u05e7':a=Object(L.jsx)(m,{fill:t});break;case"\u05d0\u05d5\u05e4\u05e0\u05d9\u05d9\u05dd":case"\u05d0\u05d5\u05e4\u05e0\u05d9\u05d9\u05dd \u05d7\u05e9\u05de\u05dc\u05d9\u05d9\u05dd":a=Object(L.jsx)(k,{fill:t});break;case"\u05e7\u05d5\u05e8\u05e7\u05d9\u05e0\u05d8 \u05d7\u05e9\u05de\u05dc\u05d9":a=Object(L.jsx)(y,{fill:t});break;case"\u05d0\u05d5\u05d8\u05d5\u05d1\u05d5\u05e1":case"\u05d0\u05d5\u05d8\u05d5\u05d1\u05d5\u05e1 \u05d6\u05e2\u05d9\u05e8":a=Object(L.jsx)(F,{fill:t});break;case"\u05de\u05e9\u05d0 3.6 \u05e2\u05d3 9.9 \u05d8\u05d5\u05df":case"\u05de\u05e9\u05d0 10.0 \u05e2\u05d3 12.0 \u05d8\u05d5\u05df":case"\u05de\u05e9\u05d0 12.1 \u05e2\u05d3 15.9 \u05d8\u05d5\u05df":case"\u05de\u05e9\u05d0 16.0 \u05e2\u05d3 33.9 \u05d8\u05d5\u05df":case"\u05de\u05e9\u05d0 34.0+ \u05d8\u05d5\u05df":a=Object(L.jsx)(M,{fill:t});break;default:a=Object(L.jsx)(_,{fill:t})}var r=Object(b.renderToStaticMarkup)(a);return B(r)}(t.vehicle_vehicle_type_hebrew,i);return Object(L.jsx)(j.a,{position:s,icon:n,children:Object(L.jsx)(S,{data:t,language:a})})},N=a(11),I=a(74),A=a(36),R=Object(s.a)((function(){var e=Object(N.a)(),t=e.filterStore,a=e.mapStore,r=e.uiStore,c=t.isUse2StepsMarkers,s=t.markersLoadStep,n=t.dataMarkersLean,l=t.dataAllInjuries,o=a.bboxType,d=a.dataMarkersInBounds,j=(a.useSmallMarkers,a.markerIconsType),b=a.markerColorType,h=(o!==I.a.NO_BBOX?Object(i.r)(d):c&&1===s?Object(i.r)(n):Object(i.r)(l)).map((function(e){try{return null!==e.latitude&&null!==e.longitude?Object(L.jsx)(E,{data:e,language:r.language,colorBy:b,markerIconsType:j},"marker-".concat(e._id)):null}catch(t){return A.a.error(t),null}}));return Object(L.jsx)("div",{children:h})})),W=a(501),z=a.n(W),D=Object(s.a)((function(e){var t=e.fitBoundsOnUpdate,a=void 0!==t&&t,r=Object(N.a)(),c=r.mapStore,s=r.filterStore,n=c.bboxType,l=c.dataMarkersInBounds,o=s.dataMarkersLean,d=s.dataAllInjuries,j=s.isUse2StepsMarkers,b=(n!==I.a.NO_BBOX?Object(i.r)(l):j?Object(i.r)(o):Object(i.r)(d)).map((function(e){return[e.latitude,e.longitude,e._id]}));return Object(L.jsx)(z.a,{fitBoundsOnLoad:a,fitBoundsOnUpdate:a,points:b,longitudeExtractor:function(e){return e[1]},latitudeExtractor:function(e){return e[0]},intensityExtractor:function(e){return parseFloat(e[2])}})})),U=a(396),H=a(142),G=function(e){var t="<h5>".concat(H.a.t(e),"</h5>"),a=function(e){var t=[];switch(e){case"Severity":t=O(["\u05d4\u05e8\u05d5\u05d2","\u05e4\u05e6\u05d5\u05e2 \u05e7\u05e9\u05d4"],u);break;case"Vehicle":t=O(["\u05d7\u05e9\u05de\u05dc\u05d9 \u05d3\u05d5 \u05d2\u05dc\u05d2\u05dc\u05d9","\u05de\u05db\u05d5\u05e0\u05d9\u05ea","\u05d0\u05d5\u05e4\u05e0\u05d5\u05e2","\u05dc\u05d0 \u05d9\u05d3\u05d5\u05e2","\u05d4\u05d5\u05dc\u05da \u05e8\u05d2\u05dc","\u05d0\u05d5\u05e4\u05e0\u05d9\u05d9\u05dd"],h);break;case"DayNight":t=O(["\u05dc\u05d9\u05dc\u05d4","\u05d9\u05d5\u05dd"],x);break;case"Gender":t=O(["\u05e0\u05e7\u05d1\u05d4","\u05d6\u05db\u05e8","\u05dc\u05d0 \u05d9\u05d3\u05d5\u05e2"],p);break;case"RoadType":t=O(["\u05dc\u05d0 \u05d1\u05e6\u05d5\u05de\u05ea","\u05d1\u05e6\u05d5\u05de\u05ea"],v);break;case"AccidentType":t=O(["\u05d4\u05ea\u05d4\u05e4\u05db\u05d5\u05ea","\u05d4\u05d7\u05dc\u05e7\u05d4","\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05d0\u05d7\u05d5\u05e8 \u05d0\u05dc \u05e6\u05d3","\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05d0\u05d7\u05d5\u05e8 \u05d1\u05d7\u05d6\u05d9\u05ea","\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05d7\u05d6\u05d9\u05ea \u05d1\u05e6\u05d3","\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05e6\u05d3 \u05d1\u05e6\u05d3","\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05d7\u05d6\u05d9\u05ea \u05d1\u05d7\u05d6\u05d9\u05ea","\u05d4\u05ea\u05e0\u05d2\u05e9\u05d5\u05ea \u05e2\u05dd \u05e2\u05e6\u05dd \u05d3\u05d5\u05de\u05dd","\u05e4\u05d2\u05d9\u05e2\u05d4 \u05d1\u05d4\u05d5\u05dc\u05da \u05e8\u05d2\u05dc","\u05d0\u05d7\u05e8"],f);break;case"SelfOrNotAcc":t=O(["\u05dc\u05d0 \u05e2\u05e6\u05de\u05d9\u05ea","\u05e2\u05e6\u05de\u05d9\u05ea"],C);break;default:t=O(["\u05e0\u05e7\u05d1\u05d4","\u05d6\u05db\u05e8","\u05dc\u05d0 \u05d9\u05d3\u05d5\u05e2"],p)}return t}(e);return a.unshift(t),a.join("")},J=function(e){var t=e.title,a=Object(U.c)().map;return Object(r.useEffect)((function(){var e=d.a.control({position:"bottomleft"});return e.onAdd=function(){var e=d.a.DomUtil.create("div","info legend");return e.innerHTML=G(t),e},e.addTo(a),function(){return e.remove()}}),[a,t]),null},P=Object(s.a)((function(){var e=Object(N.a)().mapStore.markerColorType;return Object(L.jsx)(J,{title:e})})),V=a(421),X=a(422),q=(a(509),{buttonsPanel:{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",paddingTop:"0.2rem",margin:"5px"}}),K=Object(s.a)((function(){Object(c.a)().t;var e=Object(r.useRef)(null),t=Object(N.a)().mapStore,a=t.heatLayerHidden,s=t.mapCenter,o=t.mapZoom,d=t.updateMapBounds,j=(t.onMapLoad,Object(i.r)(s)),b=a&&Object(L.jsx)(R,{}),h=!a&&Object(L.jsx)(D,{});return Object(r.useEffect)((function(){(t.setMapRef(e),d(),null!==e.current)&&(0===e.current.leafletElement.getZoom()&&e.current.leafletElement.setZoom(13))}),[]),Object(L.jsxs)("div",{children:[Object(L.jsxs)(n.a,{ref:e,center:j,zoom:o,style:{height:"74vh",maxWidth:"100%"},onmoveend:d,children:[h,Object(L.jsx)(l.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),b,Object(L.jsx)(P,{})]}),Object(L.jsxs)("div",{style:q.buttonsPanel,children:[Object(L.jsx)(ee,{}),Object(L.jsx)($,{}),Object(L.jsx)(Q,{})]}),Object(L.jsx)(te,{mapRef:e})]})})),Q=Object(s.a)((function(){var e=Object(N.a)(),t=e.mapStore,a=e.filterStore;return Object(L.jsx)(V.a,{condtion:t.heatLayerHidden,textTrue:"HeatMap",textFalse:"Markers",disabled:a.isLoading,onClick:t.toggleHeatLayer,style:{width:"150px",height:"35px"}})})),Y=(Object(s.a)((function(){var e=Object(N.a)().mapStore,t=e.useSmallMarkers,a=e.toggleUseSmallMarkers;return Object(L.jsx)(V.a,{condtion:t,textTrue:"big-markers",textFalse:"small-markers",onClick:a})})),{divStyle:{display:"flex"},labelspan:{marginTop:"7px",fontWeight:700}}),$=Object(s.a)((function(){var e=Object(c.a)().t,t=Object(N.a)().mapStore,a=t.markerIconsType,r=t.setMarkerIconsType,s=t.markerIconTypesArr;return Object(L.jsxs)("div",{style:Y.divStyle,id:"map.iconType",children:[Object(L.jsxs)("span",{style:Y.labelspan,children:[e("MarkersIconType"),":"]}),Object(L.jsx)("span",{children:Object(L.jsx)(X.a,{id:"map.SelectMarkersIConType",value:a,data:s,onChange:function(e){return r(e)}})})]})})),ee=Object(s.a)((function(){var e=Object(c.a)().t,t=Object(N.a)().mapStore,a=t.markerColorType,r=t.setMarkerColorType,s=t.markerColorTypesArr;return Object(L.jsxs)("div",{style:Y.divStyle,id:"map.iconColor",children:[Object(L.jsxs)("span",{style:Y.labelspan,children:[e("MarkersColorType"),":"]}),Object(L.jsx)("span",{children:Object(L.jsx)(X.a,{id:"map.SelectMarkersColorType",value:a,data:s,onChange:function(e){return r(e)}})})]})})),te=Object(s.a)((function(e){var t=e.mapRef,a=Object(r.useRef)(!1),c=Object(N.a)().mapStore;return Object(r.useEffect)((function(){a.current?t.current&&c.isReadyToRenderMap&&setTimeout((function(){null!==t.current&&t.current.leafletElement.invalidateSize(!1)}),300):a.current=!0})),Object(L.jsx)("span",{children:c.isReadyToRenderMap?" ":""})}));t.default=K}}]);
//# sourceMappingURL=9.72672093.chunk.js.map