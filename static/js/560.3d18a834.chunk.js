"use strict";(self.webpackChunk_kne_components_remote_loader=self.webpackChunk_kne_components_remote_loader||[]).push([[560],{53560:(e,t,r)=>{r.r(t),r.d(t,{createWithRemoteLoader:()=>P,default:()=>V,getOrLoadRemote:()=>w,getPublicPath:()=>A,loadComponent:()=>N,loadModule:()=>M,parseToken:()=>h,preset:()=>g,useLoader:()=>y,withRemoteLoader:()=>O});var o=r(45040),n=r.n(o),l=r(64016),u=r.n(l),a=r(6940),s=r.n(a),m=r(90756),d=r(49256),i=r.n(d),c=r(72048),f=r.n(c),p=r(52928),v=r.n(p);const b={remotes:{},remoteEntryFileName:"remoteEntry.js",error:null,fallback:null},g=e=>Object.assign(b,e),h=e=>{const{url:t,remote:r,version:o}=(e=>{const t=(e=>{const t=e.match(/^(.*):.+/);return t&&t[1]?n()(t[1]):null})(e);if(!t)return{url:null,remote:null,version:null};const{addressList:r,origin:o}=(()=>{if(/^https?:\/\//.test(t)){const e=window.document.createElement("a");return e.href=t,{addressList:e.pathname.split("/").filter((e=>!!e)),origin:e.origin}}return{addressList:t.split("/").filter((e=>!!e)),origin:null}})();return 1===r.length?{url:/^https?:\/\//.test(t)?o:null,remote:r[0],version:null}:2===r.length&&/^https?:\/\//.test(t)?{url:o,remote:r[0],version:r[1]}:{url:/^https?:\/\//.test(t)?o:null,remote:r[r.length-2],version:r[r.length-1]}})(e),l=(e=>{const t=e.replace(/^.*:/,""),[r,o]=t.split("@").map((e=>{const[t,r]=e.split(".");return{name:t,propName:r}})),n={moduleName:r.name,modulePropName:r.propName};return o&&Object.assign(n,{subModuleName:o.name,subModulePropName:o.propName}),n})(e);return{url:t,remote:r,version:o,module:l}},w=function(e,t){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return new Promise(((n,l)=>{if(window[e])n();else{const s=document.querySelector('[data-webpack="'.concat(e,'"]')),m=async o=>{o.setAttribute("data-status","success"),window[e].__initialized||(t&&r.S[t]&&await window[e].init(r.S[t]),window[e].__initialized=!0),n()},d=(e,t)=>{t.parentNode.removeChild(t),l(e.message)};if(s){if("success"===s.getAttribute("data-status"))return void m(s);s.addEventListener("load",(()=>{m(s)})),s.addEventListener("error",(e=>{d(e,s)}))}else if(o){var u=document,a=u.createElement("script");a.type="text/javascript",a.setAttribute("data-webpack","".concat(e)),a.async=!0,a.addEventListener("error",(e=>{d(e,a)})),a.addEventListener("load",(()=>{m(a)})),a.src=o,u.getElementsByTagName("head")[0].appendChild(a)}else l("Cannot Find Remote ".concat(e," to inject"))}}))},N=(e,t,r,o)=>async()=>{await w(e,t,o);const n=window[e];return(await n.get(r))()},E=e=>{let{url:t,remote:r,version:o,tpl:l}=e;const a=u()(l||"{{url}}/{{remote}}/{{version}}",{interpolate:/{{([\s\S]+?)}}/g});return n()(a({url:n()(t||""),remote:r||"",version:o||""}))},M=e=>{const t=b.remotes,r=b.remoteEntryFileName,o=h(e),{url:l,remote:u}=((e,t)=>{const r=e=>E(Object.assign({},e,{tpl:s()(t,"[".concat(e.remote||"default","].tpl"))}));return e.url&&e.remote&&e.version?{url:r({url:e.url,remote:e.remote,version:e.version}),remote:e.remote+"_"+e.version}:e.url&&e.remote?{url:r({url:e.url,remote:e.remote}),remote:e.remote}:e.remote&&t[e.remote]&&e.version?{url:r({url:t[e.remote].url,remote:t[e.remote].remote,version:e.version}),remote:t[e.remote].remote+"_"+e.version}:e.remote&&t[e.remote]&&t[e.remote].defaultVersion?{url:r({url:t[e.remote].url,remote:t[e.remote].remote,version:t[e.remote].defaultVersion}),remote:t[e.remote].remote+"_"+t[e.remote].defaultVersion}:e.remote&&t[e.remote]?{url:r({url:t[e.remote].url,remote:t[e.remote].remote}),remote:t[e.remote].remote}:t.default.defaultVersion?{url:r({url:t.default.url,remote:t.default.remote,version:t.default.defaultVersion}),remote:t.default.remote+"_"+t.default.defaultVersion}:{url:r({url:t.default.url,remote:t.default.remote}),remote:t.default.remote}})(o,t);return N((e=>e.replace(/[-/.@]/g,"_"))(u),"default","./"+o.module.moduleName,n()(l)+"/"+r)().then((e=>{const t=((e,t)=>e.subModuleName&&e.subModulePropName?t[e.subModuleName][e.subModulePropName]:e.subModuleName?t[e.subModuleName]:!e.subModuleName&&e.modulePropName?t.default[e.modulePropName]:t.default)(o.module,e);return{default:t}}))},_=new Map,y=e=>{let{modules:t,onLoadComplete:r}=e;const[o,n]=(0,d.useState)(!t.every((e=>_.has(e)))),[l,u]=(0,d.useState)(!1),a=(0,m.c)(r),[s,i]=(0,d.useState)((()=>o?[]:t.map((e=>_.get(e))))),c=(0,d.useRef)(s);return c.current=s,(0,d.useEffect)((()=>{Promise.all(t.map((async e=>{if(_.has(e))return _.get(e);const{default:t}=await M(e);return _.set(e,t),t}))).then((e=>(a&&a(e),f()(c.current,e)||i(e),n(!1),e)),(e=>{console.error(e),u(!0)}))}),[t]),{loading:o,error:l,remoteModules:s}};function L(){return L=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},L.apply(this,arguments)}function k(e,t){if(null==e)return{};var r,o,n={},l=Object.keys(e);for(o=0;o<l.length;o++)r=l[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}const j=["modules","remoteError","onLoadComplete","fallback"],O=e=>(0,d.forwardRef)(((t,r)=>{let{modules:o,remoteError:n,onLoadComplete:l,fallback:u}=t,a=k(t,j);const{loading:s,error:m,remoteModules:d}=y({modules:o,onLoadComplete:l});return s?u||b.fallback:m?n||b.error:i().createElement(e,L({},a,{ref:r,remoteModules:d}))})),P=e=>t=>{const r=O(t);return(0,d.forwardRef)(((t,o)=>i().createElement(r,L({},v()({},e,t),{ref:o}))))},C=["remoteModules"],R=["module"],S=O((0,d.forwardRef)(((e,t)=>{let{remoteModules:r}=e,o=k(e,C);const[n]=r;return i().createElement(n,L({},o,{ref:t}))}))),V=(0,d.forwardRef)(((e,t)=>{let{module:r}=e,o=k(e,R);const n=(0,d.useMemo)((()=>[r]),[r]);return i().createElement(S,L({},o,{modules:n,ref:t}))})),A=(e,t)=>{const{remotes:r,version:o}=Object.assign({},{remotes:b.remotes},t),n=e&&r[e]||r.default,l=o||n.defaultVersion;return E({url:n.url,remote:n.remote,version:l,tpl:n.tpl})}}}]);
//# sourceMappingURL=560.3d18a834.chunk.js.map