(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{260:function(n,e,t){var content=t(269);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[n.i,content,""]]),content.locals&&(n.exports=content.locals);(0,t(103).default)("61abc5ac",content,!0,{sourceMap:!1})},268:function(n,e,t){"use strict";t(260)},269:function(n,e,t){var o=t(102)(!1);o.push([n.i,"nav a[data-v-e26d1574]{display:none}nav .icon[data-v-e26d1574]{display:inline-block;float:right;padding:.5rem;background-color:#a3a3a3;border-radius:5px}nav .icon .icon-bar[data-v-e26d1574]{background-color:#fff;display:block;width:1.5rem;height:.2rem;border-radius:5px}nav .icon .icon-bar+.icon-bar[data-v-e26d1574]{margin-top:.2rem}nav .icon[data-v-e26d1574]:hover{background-color:rgba(0,44,35,.5)}nav .icon:hover .icon-bar[data-v-e26d1574]{background-color:#00ffce}nav .menu[data-v-e26d1574]{max-width:1200px;margin-right:auto;margin-left:auto;padding:1rem}@media screen and (max-width:767px){.responsive[data-v-e26d1574]{background-color:rgba(0,44,35,.95);height:100vh}.responsive a[data-v-e26d1574]{display:block;margin-bottom:1rem}}@media screen and (min-width:768px){nav[data-v-e26d1574]{background-color:rgba(0,44,35,.50196)}nav a[data-v-e26d1574]{display:inline-block}nav .icon[data-v-e26d1574]{display:none}nav.fade-in[data-v-e26d1574]{top:6rem}nav .menu[data-v-e26d1574]{display:flex;justify-content:space-around}}",""]),n.exports=o},293:function(n,e,t){"use strict";t.r(e);var o={name:"Menu",data:function(){return{scroll:0,menuExpanded:!1}},computed:{faded:function(){return this.scroll>70}},beforeMount:function(){window.addEventListener("scroll",this.handleScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll:function(){this.scroll=window.scrollY},handler:function(n){this.menuExpanded&&this.menu()},menu:function(){this.menuExpanded=!this.menuExpanded,document.body.style.overflowY=this.menuExpanded?"hidden":""}}},r=(t(268),t(50)),component=Object(r.a)(o,(function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("nav",{class:{"fade-in":!n.faded,responsive:n.menuExpanded}},[t("div",{staticClass:"menu"},[t("a",{staticClass:"icon",attrs:{href:"javascript:void(0);"},on:{click:n.menu}},[t("span",{staticClass:"icon-bar"}),n._v(" "),t("span",{staticClass:"icon-bar"}),n._v(" "),t("span",{staticClass:"icon-bar"}),n._v(" "),t("span",{staticClass:"icon-bar"})]),n._v(" "),t("nuxt-link",{class:{active:"#home"===n.$route.hash},attrs:{to:{path:"/",hash:"#home"}},nativeOn:{click:function(e){return n.handler.apply(null,arguments)}}},[n._v("Home")]),n._v(" "),t("nuxt-link",{class:{active:"#about"===n.$route.hash},attrs:{to:{path:"/",hash:"#about"}},nativeOn:{click:function(e){return n.handler.apply(null,arguments)}}},[n._v("About me")]),n._v(" "),t("nuxt-link",{class:{active:"#skills"===n.$route.hash},attrs:{to:{path:"/",hash:"#skills"}},nativeOn:{click:function(e){return n.handler.apply(null,arguments)}}},[n._v("Skills")]),n._v(" "),t("nuxt-link",{class:{active:"#experience"===n.$route.hash},attrs:{to:{path:"/",hash:"#experience"}},nativeOn:{click:function(e){return n.handler.apply(null,arguments)}}},[n._v("Experience")]),n._v(" "),t("nuxt-link",{class:{active:"#contact"===n.$route.hash},attrs:{to:{path:"/",hash:"#contact"}},nativeOn:{click:function(e){return n.handler.apply(null,arguments)}}},[n._v("Contact me")])],1)])}),[],!1,null,"e26d1574",null);e.default=component.exports}}]);