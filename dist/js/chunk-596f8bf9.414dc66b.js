(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-596f8bf9"],{"5bce":function(e,t,r){"use strict";r("800a")},"7f94":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"Mybody"}},[e._m(0),r("vue-perfect-scrollbar",{ref:"pfScroll",style:{height:e.bodyHeight+"px",zIndex:8},attrs:{id:"_scroll",isBodyScroll:!0}},[r("transition",{attrs:{name:"el-fade-in-linear"}},[r("router-view")],1)],1)],1)},n=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"header"}},[r("div",{staticClass:"headCenter"})])}],i={name:"app",data(){return{bodyHeight:document.body.clientHeight-60,scrollTop:0,navlist:[{name:"首页",path:"detail",redirect:"组件详情"},{name:"图片",path:"picture",redirect:"图片"}]}},computed:{whiteStyle(){let e,t=this.$route.path;return this.navlist.forEach((r,a)=>{t.indexOf(r.path)>-1&&(e=`left:${100*a}px`)}),e}},mounted(){},methods:{navRouteTo(e){""!==e&&this.$router.push({name:e})}}},o=i,s=(r("5bce"),r("2877")),c=Object(s["a"])(o,a,n,!1,null,"3a794b3e",null);t["default"]=c.exports},"800a":function(e,t,r){}}]);
//# sourceMappingURL=chunk-596f8bf9.414dc66b.js.map