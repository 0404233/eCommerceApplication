var Dt=Object.defineProperty;var Lt=(t,e,n)=>e in t?Dt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var _=(t,e,n)=>Lt(t,typeof e!="symbol"?e+"":e,n);import{r as u,a0 as jt,$ as X,a1 as kt,i as x,j as N,b as ft,h as dt,c as tt,a2 as et,g as Nt,e as $t}from"./index-g2i-m_ev.js";const vt=typeof window<"u"?u.useLayoutEffect:u.useEffect;let it=0;function Ot(t){const[e,n]=u.useState(t),r=t||e;return u.useEffect(()=>{e==null&&(it+=1,n(`mui-${it}`))},[e]),r}const Ut={...jt},ut=Ut.useId;function de(t){if(ut!==void 0){const e=ut();return t??e}return Ot(t)}function G(t){const e=u.useRef(t);return vt(()=>{e.current=t}),u.useRef((...n)=>(0,e.current)(...n)).current}function at(...t){const e=u.useRef(void 0),n=u.useCallback(r=>{const s=t.map(o=>{if(o==null)return null;if(typeof o=="function"){const i=o,c=i(r);return typeof c=="function"?c:()=>{i(null)}}return o.current=r,()=>{o.current=null}});return()=>{s.forEach(o=>o==null?void 0:o())}},t);return u.useMemo(()=>t.every(r=>r==null)?null:r=>{e.current&&(e.current(),e.current=void 0),r!=null&&(e.current=n(r))},t)}function lt(t){try{return t.matches(":focus-visible")}catch{}return!1}const ct={};function ht(t,e){const n=u.useRef(ct);return n.current===ct&&(n.current=t(e)),n}class q{constructor(){_(this,"mountEffect",()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())});this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}static create(){return new q}static use(){const e=ht(q.create).current,[n,r]=u.useState(!1);return e.shouldMount=n,e.setShouldMount=r,u.useEffect(e.mountEffect,[n]),e}mount(){return this.mounted||(this.mounted=zt(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}start(...e){this.mount().then(()=>{var n;return(n=this.ref.current)==null?void 0:n.start(...e)})}stop(...e){this.mount().then(()=>{var n;return(n=this.ref.current)==null?void 0:n.stop(...e)})}pulsate(...e){this.mount().then(()=>{var n;return(n=this.ref.current)==null?void 0:n.pulsate(...e)})}}function Ft(){return q.use()}function zt(){let t,e;const n=new Promise((r,s)=>{t=r,e=s});return n.resolve=t,n.reject=e,n}function At(t,e){if(t==null)return{};var n={};for(var r in t)if({}.hasOwnProperty.call(t,r)){if(e.indexOf(r)!==-1)continue;n[r]=t[r]}return n}function J(t,e){return J=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,r){return n.__proto__=r,n},J(t,e)}function Yt(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,J(t,e)}const pt=X.createContext(null);function _t(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function nt(t,e){var n=function(o){return e&&u.isValidElement(o)?e(o):o},r=Object.create(null);return t&&u.Children.map(t,function(s){return s}).forEach(function(s){r[s.key]=n(s)}),r}function Xt(t,e){t=t||{},e=e||{};function n(d){return d in e?e[d]:t[d]}var r=Object.create(null),s=[];for(var o in t)o in e?s.length&&(r[o]=s,s=[]):s.push(o);var i,c={};for(var l in e){if(r[l])for(i=0;i<r[l].length;i++){var f=r[l][i];c[r[l][i]]=n(f)}c[l]=n(l)}for(i=0;i<s.length;i++)c[s[i]]=n(s[i]);return c}function k(t,e,n){return n[e]!=null?n[e]:t.props[e]}function Kt(t,e){return nt(t.children,function(n){return u.cloneElement(n,{onExited:e.bind(null,n),in:!0,appear:k(n,"appear",t),enter:k(n,"enter",t),exit:k(n,"exit",t)})})}function Wt(t,e,n){var r=nt(t.children),s=Xt(e,r);return Object.keys(s).forEach(function(o){var i=s[o];if(u.isValidElement(i)){var c=o in e,l=o in r,f=e[o],d=u.isValidElement(f)&&!f.props.in;l&&(!c||d)?s[o]=u.cloneElement(i,{onExited:n.bind(null,i),in:!0,exit:k(i,"exit",t),enter:k(i,"enter",t)}):!l&&c&&!d?s[o]=u.cloneElement(i,{in:!1}):l&&c&&u.isValidElement(f)&&(s[o]=u.cloneElement(i,{onExited:n.bind(null,i),in:f.props.in,exit:k(i,"exit",t),enter:k(i,"enter",t)}))}}),s}var Ht=Object.values||function(t){return Object.keys(t).map(function(e){return t[e]})},Gt={component:"div",childFactory:function(e){return e}},ot=function(t){Yt(e,t);function e(r,s){var o;o=t.call(this,r,s)||this;var i=o.handleExited.bind(_t(o));return o.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},o}var n=e.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},e.getDerivedStateFromProps=function(s,o){var i=o.children,c=o.handleExited,l=o.firstRender;return{children:l?Kt(s,c):Wt(s,i,c),firstRender:!1}},n.handleExited=function(s,o){var i=nt(this.props.children);s.key in i||(s.props.onExited&&s.props.onExited(o),this.mounted&&this.setState(function(c){var l=kt({},c.children);return delete l[s.key],{children:l}}))},n.render=function(){var s=this.props,o=s.component,i=s.childFactory,c=At(s,["component","childFactory"]),l=this.state.contextValue,f=Ht(this.state.children).map(i);return delete c.appear,delete c.enter,delete c.exit,o===null?X.createElement(pt.Provider,{value:l},f):X.createElement(pt.Provider,{value:l},X.createElement(o,c,f))},e}(X.Component);ot.propTypes={};ot.defaultProps=Gt;const qt=[];function Zt(t){u.useEffect(t,qt)}class rt{constructor(){_(this,"currentId",null);_(this,"clear",()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)});_(this,"disposeEffect",()=>this.clear)}static create(){return new rt}start(e,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},e)}}function Jt(){const t=ht(rt.create).current;return Zt(t.disposeEffect),t}function Qt(t){const{className:e,classes:n,pulsate:r=!1,rippleX:s,rippleY:o,rippleSize:i,in:c,onExited:l,timeout:f}=t,[d,h]=u.useState(!1),M=x(e,n.ripple,n.rippleVisible,r&&n.ripplePulsate),I={width:i,height:i,top:-(i/2)+o,left:-(i/2)+s},b=x(n.child,d&&n.childLeaving,r&&n.childPulsate);return!c&&!d&&h(!0),u.useEffect(()=>{if(!c&&l!=null){const B=setTimeout(l,f);return()=>{clearTimeout(B)}}},[l,c,f]),N.jsx("span",{className:M,style:I,children:N.jsx("span",{className:b})})}const g=ft("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),Q=550,te=80,ee=et`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,ne=et`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,oe=et`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,re=tt("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),se=tt(Qt,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${g.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${ee};
    animation-duration: ${Q}ms;
    animation-timing-function: ${({theme:t})=>t.transitions.easing.easeInOut};
  }

  &.${g.ripplePulsate} {
    animation-duration: ${({theme:t})=>t.transitions.duration.shorter}ms;
  }

  & .${g.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${g.childLeaving} {
    opacity: 0;
    animation-name: ${ne};
    animation-duration: ${Q}ms;
    animation-timing-function: ${({theme:t})=>t.transitions.easing.easeInOut};
  }

  & .${g.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${oe};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:t})=>t.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,ie=u.forwardRef(function(e,n){const r=dt({props:e,name:"MuiTouchRipple"}),{center:s=!1,classes:o={},className:i,...c}=r,[l,f]=u.useState([]),d=u.useRef(0),h=u.useRef(null);u.useEffect(()=>{h.current&&(h.current(),h.current=null)},[l]);const M=u.useRef(!1),I=Jt(),b=u.useRef(null),B=u.useRef(null),T=u.useCallback(p=>{const{pulsate:y,rippleX:R,rippleY:O,rippleSize:D,cb:U}=p;f(E=>[...E,N.jsx(se,{classes:{ripple:x(o.ripple,g.ripple),rippleVisible:x(o.rippleVisible,g.rippleVisible),ripplePulsate:x(o.ripplePulsate,g.ripplePulsate),child:x(o.child,g.child),childLeaving:x(o.childLeaving,g.childLeaving),childPulsate:x(o.childPulsate,g.childPulsate)},timeout:Q,pulsate:y,rippleX:R,rippleY:O,rippleSize:D},d.current)]),d.current+=1,h.current=U},[o]),$=u.useCallback((p={},y={},R=()=>{})=>{const{pulsate:O=!1,center:D=s||y.pulsate,fakeElement:U=!1}=y;if((p==null?void 0:p.type)==="mousedown"&&M.current){M.current=!1;return}(p==null?void 0:p.type)==="touchstart"&&(M.current=!0);const E=U?null:B.current,w=E?E.getBoundingClientRect():{width:0,height:0,left:0,top:0};let V,C,S;if(D||p===void 0||p.clientX===0&&p.clientY===0||!p.clientX&&!p.touches)V=Math.round(w.width/2),C=Math.round(w.height/2);else{const{clientX:F,clientY:L}=p.touches&&p.touches.length>0?p.touches[0]:p;V=Math.round(F-w.left),C=Math.round(L-w.top)}if(D)S=Math.sqrt((2*w.width**2+w.height**2)/3),S%2===0&&(S+=1);else{const F=Math.max(Math.abs((E?E.clientWidth:0)-V),V)*2+2,L=Math.max(Math.abs((E?E.clientHeight:0)-C),C)*2+2;S=Math.sqrt(F**2+L**2)}p!=null&&p.touches?b.current===null&&(b.current=()=>{T({pulsate:O,rippleX:V,rippleY:C,rippleSize:S,cb:R})},I.start(te,()=>{b.current&&(b.current(),b.current=null)})):T({pulsate:O,rippleX:V,rippleY:C,rippleSize:S,cb:R})},[s,T,I]),K=u.useCallback(()=>{$({},{pulsate:!0})},[$]),v=u.useCallback((p,y)=>{if(I.clear(),(p==null?void 0:p.type)==="touchend"&&b.current){b.current(),b.current=null,I.start(0,()=>{v(p,y)});return}b.current=null,f(R=>R.length>0?R.slice(1):R),h.current=y},[I]);return u.useImperativeHandle(n,()=>({pulsate:K,start:$,stop:v}),[K,$,v]),N.jsx(re,{className:x(g.root,o.root,i),ref:B,...c,children:N.jsx(ot,{component:null,exit:!0,children:l})})});function ue(t){return Nt("MuiButtonBase",t)}const ae=ft("MuiButtonBase",["root","disabled","focusVisible"]),le=t=>{const{disabled:e,focusVisible:n,focusVisibleClassName:r,classes:s}=t,i=$t({root:["root",e&&"disabled",n&&"focusVisible"]},ue,s);return n&&r&&(i.root+=` ${r}`),i},ce=tt("button",{name:"MuiButtonBase",slot:"Root"})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${ae.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),he=u.forwardRef(function(e,n){const r=dt({props:e,name:"MuiButtonBase"}),{action:s,centerRipple:o=!1,children:i,className:c,component:l="button",disabled:f=!1,disableRipple:d=!1,disableTouchRipple:h=!1,focusRipple:M=!1,focusVisibleClassName:I,LinkComponent:b="a",onBlur:B,onClick:T,onContextMenu:$,onDragLeave:K,onFocus:v,onFocusVisible:p,onKeyDown:y,onKeyUp:R,onMouseDown:O,onMouseLeave:D,onMouseUp:U,onTouchEnd:E,onTouchMove:w,onTouchStart:V,tabIndex:C=0,TouchRippleProps:S,touchRippleRef:F,type:L,...z}=r,A=u.useRef(null),m=Ft(),mt=at(m.ref,F),[j,W]=u.useState(!1);f&&j&&W(!1),u.useImperativeHandle(s,()=>({focusVisible:()=>{W(!0),A.current.focus()}}),[]);const bt=m.shouldMount&&!d&&!f;u.useEffect(()=>{j&&M&&!d&&m.pulsate()},[d,M,j,m]);const gt=P(m,"start",O,h),Mt=P(m,"stop",$,h),Rt=P(m,"stop",K,h),yt=P(m,"stop",U,h),Et=P(m,"stop",a=>{j&&a.preventDefault(),D&&D(a)},h),xt=P(m,"start",V,h),Tt=P(m,"stop",E,h),Ct=P(m,"stop",w,h),Pt=P(m,"stop",a=>{lt(a.target)||W(!1),B&&B(a)},!1),It=G(a=>{A.current||(A.current=a.currentTarget),lt(a.target)&&(W(!0),p&&p(a)),v&&v(a)}),Z=()=>{const a=A.current;return l&&l!=="button"&&!(a.tagName==="A"&&a.href)},wt=G(a=>{M&&!a.repeat&&j&&a.key===" "&&m.stop(a,()=>{m.start(a)}),a.target===a.currentTarget&&Z()&&a.key===" "&&a.preventDefault(),y&&y(a),a.target===a.currentTarget&&Z()&&a.key==="Enter"&&!f&&(a.preventDefault(),T&&T(a))}),Vt=G(a=>{M&&a.key===" "&&j&&!a.defaultPrevented&&m.stop(a,()=>{m.pulsate(a)}),R&&R(a),T&&a.target===a.currentTarget&&Z()&&a.key===" "&&!a.defaultPrevented&&T(a)});let H=l;H==="button"&&(z.href||z.to)&&(H=b);const Y={};H==="button"?(Y.type=L===void 0?"button":L,Y.disabled=f):(!z.href&&!z.to&&(Y.role="button"),f&&(Y["aria-disabled"]=f));const St=at(n,A),st={...r,centerRipple:o,component:l,disabled:f,disableRipple:d,disableTouchRipple:h,focusRipple:M,tabIndex:C,focusVisible:j},Bt=le(st);return N.jsxs(ce,{as:H,className:x(Bt.root,c),ownerState:st,onBlur:Pt,onClick:T,onContextMenu:Mt,onFocus:It,onKeyDown:wt,onKeyUp:Vt,onMouseDown:gt,onMouseLeave:Et,onMouseUp:yt,onDragLeave:Rt,onTouchEnd:Tt,onTouchMove:Ct,onTouchStart:xt,ref:St,tabIndex:f?-1:C,type:L,...Y,...z,children:[i,bt?N.jsx(ie,{ref:mt,center:o,...S}):null]})});function P(t,e,n,r=!1){return G(s=>(n&&n(s),r||t[e](s),!0))}export{he as B,rt as T,Yt as _,Jt as a,de as b,G as c,at as d,At as e,pt as f,lt as i,vt as u};
