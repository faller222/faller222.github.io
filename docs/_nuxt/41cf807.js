(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{177:function(e,t,n){var content=n(261);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(65).default)("14ae4020",content,!0,{sourceMap:!1})},178:function(e,t,n){var content=n(263);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(65).default)("4c545fe6",content,!0,{sourceMap:!1})},179:function(e,t,n){var content=n(267);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(65).default)("52f3eadd",content,!0,{sourceMap:!1})},196:function(e,t,n){e.exports=n.p+"img/german_faller_banner_cover.a88bb9a.svg"},197:function(e,t,n){"use strict";n.r(t);var o={name:"Menu",data:function(){return{scroll:0,menuExpanded:!1}},computed:{faded:function(){return this.scroll>70}},beforeMount:function(){window.addEventListener("scroll",this.handleScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll:function(){this.scroll=window.scrollY},handler:function(e){this.menuExpanded&&this.menu()},menu:function(){var pattern;pattern=50,window.navigator.vibrate&&window.navigator.vibrate(pattern),this.menuExpanded=!this.menuExpanded,document.body.style.overflowY=this.menuExpanded?"hidden":""}}},r=(n(266),n(25)),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("nav",{class:{"fade-in":!e.faded,responsive:e.menuExpanded}},[o("div",{staticClass:"menu"},[e.menuExpanded?o("h1",{staticClass:"logo"},[e._v("GERMÁN FALLER")]):e._e(),e._v(" "),o("a",{staticClass:"icon",attrs:{href:"javascript:void(0);"},on:{click:e.menu}},[e.menuExpanded?o("img",{attrs:{alt:"german_faller_menu_close_icon",src:n(264)}}):o("img",{attrs:{alt:"german_faller_menu_icon",src:n(265)}})]),e._v(" "),o("nuxt-link",{class:{active:"#home"===e.$route.hash},attrs:{to:{path:"/",hash:"#home"}},nativeOn:{click:function(t){return e.handler.apply(null,arguments)}}},[e._v("Home")]),e._v(" "),o("nuxt-link",{class:{active:"#about"===e.$route.hash},attrs:{to:{path:"/",hash:"#about"}},nativeOn:{click:function(t){return e.handler.apply(null,arguments)}}},[e._v("About me")]),e._v(" "),o("nuxt-link",{class:{active:"#skills"===e.$route.hash},attrs:{to:{path:"/",hash:"#skills"}},nativeOn:{click:function(t){return e.handler.apply(null,arguments)}}},[e._v("Skills")]),e._v(" "),o("nuxt-link",{class:{active:"#experience"===e.$route.hash},attrs:{to:{path:"/",hash:"#experience"}},nativeOn:{click:function(t){return e.handler.apply(null,arguments)}}},[e._v("Experience")]),e._v(" "),o("nuxt-link",{class:{active:"#contact"===e.$route.hash},attrs:{to:{path:"/",hash:"#contact"}},nativeOn:{click:function(t){return e.handler.apply(null,arguments)}}},[e._v("Contact me")])],1)])}),[],!1,null,"cdae7c60",null);t.default=component.exports},198:function(e,t,n){"use strict";n.r(t);var o={name:"Brand",data:function(){return{scroll:0}},computed:{faded:function(){return this.scroll>70}},beforeMount:function(){window.addEventListener("scroll",this.handleScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll:function(){this.scroll=window.scrollY}}},r=(n(262),n(25)),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",{class:{"fade-out":e.faded}},[n("h1",[e._v("GERMÁN FALLER")])])}),[],!1,null,"2d9f31f4",null);t.default=component.exports},199:function(e,t,n){n(200),e.exports=n(201)},260:function(e,t,n){"use strict";n(177)},261:function(e,t,n){var o=n(64)(!1);o.push([e.i,".error{display:flex;justify-content:center;height:100vh;align-items:center}.error h1{position:relative}.error #background_1{position:absolute;top:0;height:100%;width:100%;-o-object-fit:cover;object-fit:cover}",""]),e.exports=o},262:function(e,t,n){"use strict";n(178)},263:function(e,t,n){var o=n(64)(!1);o.push([e.i,"header[data-v-2d9f31f4]{background-color:#002c23;padding:1rem}header h1[data-v-2d9f31f4]{margin-left:1rem}@media (min-width:768px){header[data-v-2d9f31f4]{background-color:transparent;padding-top:3rem;min-height:6rem}header h1[data-v-2d9f31f4]{text-align:center;line-height:3rem;margin-left:0}header.fade-out[data-v-2d9f31f4]{top:-6rem}}@media print{header h1[data-v-2d9f31f4]{display:none!important}}",""]),e.exports=o},264:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGxpbmUgeDE9IjEiIHkxPSIxIiB4Mj0iMTkiIHkyPSIxOSIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8bGluZSB4Mj0iMSIgeTE9IjEiIHgxPSIxOSIgeTI9IjE5IiBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo="},265:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGxpbmUgeDE9IjEiIHkxPSIxIiB4Mj0iMTkiIHkyPSIxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8bGluZSB4MT0iMSIgeTE9IjciIHgyPSIxOSIgeTI9IjciIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxsaW5lIHgxPSIxIiB5MT0iMTMiIHgyPSIxOSIgeTI9IjEzIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8bGluZSB4MT0iMSIgeTE9IjE5IiB4Mj0iMTkiIHkyPSIxOSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg=="},266:function(e,t,n){"use strict";n(179)},267:function(e,t,n){var o=n(64)(!1);o.push([e.i,"nav a[data-v-cdae7c60]{display:none}nav .logo[data-v-cdae7c60]{margin-top:1rem;margin-bottom:4rem}nav .icon[data-v-cdae7c60]{display:inline-block;position:fixed;right:2rem;top:2rem}nav .icon img[data-v-cdae7c60]{width:2rem}nav .menu[data-v-cdae7c60]{max-width:1200px;margin-right:auto;margin-left:auto;padding:0 2rem;position:absolute;width:100%}@media print{nav[data-v-cdae7c60]{display:none}}@media screen and (max-width:767px){.responsive[data-v-cdae7c60]{background-color:rgba(0,44,35,.95);height:100vh}.responsive a[data-v-cdae7c60]:not(.icon){display:block;margin-bottom:2rem;margin-left:2rem;font-size:3rem}}@media screen and (min-width:768px){nav[data-v-cdae7c60]{background-color:rgba(0,44,35,.50196)}nav a[data-v-cdae7c60]{display:inline-block}nav .icon[data-v-cdae7c60],nav .logo[data-v-cdae7c60]{display:none}nav.fade-in[data-v-cdae7c60]{top:6rem}nav .menu[data-v-cdae7c60]{padding:1rem 2rem;position:relative;display:flex;justify-content:space-around}}",""]),e.exports=o},270:function(e,t,n){var content=n(271);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(65).default)("a07579c2",content,!0,{sourceMap:!1})},271:function(e,t,n){var o=n(64)(!1);o.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap);"]),o.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,100;1,300;1,400;1,500;1,700;1,900&display=swap);"]),o.push([e.i,"/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}[hidden],template{display:none}body,html{font-size:10px}@media (min-width:320px){body,html{font-size:12px}}@media (min-width:480px){body,html{font-size:14px}}@media (min-width:768px){body,html{font-size:16px}}@media (min-width:1024px){body,html{font-size:18px}}@media (min-width:1200px){body,html{font-size:20px}}*{font-family:Roboto,sans-serif;box-sizing:border-box;scrollbar-width:thin;scrollbar-color:#00ffce #002c23}::-moz-selection{background-color:#00ffce;color:#002c23}::selection{background-color:#00ffce;color:#002c23}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-thumb{background:#00ffce}::-webkit-scrollbar-thumb:hover{background:#c4c4c4}::-webkit-scrollbar-track{box-shadow:inset 0 0 1px #c4c4c4}body,html{height:100%;background-color:#002c23;color:#fff;margin:0}h1,h2,h3,h4,h5,h6{margin:0 0 1rem;font-weight:700}h1{font-size:2.5rem}h2{font-size:1.7rem}h3{font-size:1.3rem}img{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}.container{max-width:1440px;margin-left:auto;margin-right:auto}header,nav{position:fixed;top:0;right:0;left:0;z-index:1030;transition:all .6s ease}nav a{text-decoration:none;font-size:1.2rem;font-weight:700}nav a,nav a:visited{color:#fff}nav a.active,nav a:hover{color:#00ffce}a{text-decoration:none}a,a:visited{color:#002c23}a.active,a:hover{color:#00ffce}section{position:relative;min-height:95vh;padding:4rem 0;overflow:hidden}@media print{section{page-break-before:always;display:block}}input,textarea{outline:none;border-radius:0}input:invalid,textarea:invalid{box-shadow:none}input:focus,textarea:focus{border:1px solid}",""]),e.exports=o},40:function(e,t,n){"use strict";var o={layout:"empty",props:{error:{type:Object,default:null}}},r=(n(260),n(25)),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"error"},[o("Brand"),e._v(" "),o("Navigation"),e._v(" "),o("img",{attrs:{id:"background_1",alt:"background_1",src:n(196)}}),e._v(" "),o("h1",[e._v("Page not found")])],1)}),[],!1,null,null,null);t.a=component.exports;installComponents(component,{Brand:n(198).default,Navigation:n(197).default})}},[[199,9,1,10]]]);