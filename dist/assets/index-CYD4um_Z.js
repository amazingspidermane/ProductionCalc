(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();/*!
* sweetalert2 v11.26.25
* Released under the MIT License.
*/function Dh(n,e,t){if(typeof n=="function"?n===e:n.has(e))return arguments.length<3?e:t;throw new TypeError("Private element is not present on this object")}function Rp(n,e){if(e.has(n))throw new TypeError("Cannot initialize the same private elements twice on an object")}function Bl(n,e){return n.get(Dh(n,e))}function kp(n,e,t){Rp(n,e),e.set(n,t)}function Dp(n,e,t){return n.set(Dh(n,e),t),t}const xp=100,O={},Vp=()=>{O.previousActiveElement instanceof HTMLElement?(O.previousActiveElement.focus(),O.previousActiveElement=null):document.body&&document.body.focus()},Np=n=>new Promise(e=>{if(!n)return e();const t=window.scrollX,r=window.scrollY;O.restoreFocusTimeout=setTimeout(()=>{Vp(),e()},xp),window.scrollTo(t,r)}),xh="swal2-",Lp=["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","show","hide","close","title","html-container","actions","confirm","deny","cancel","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error","draggable","dragging"],P=Lp.reduce((n,e)=>(n[e]=xh+e,n),{}),Op=["success","warning","info","question","error"],ti=Op.reduce((n,e)=>(n[e]=xh+e,n),{}),Vh="SweetAlert2:",va=n=>n.charAt(0).toUpperCase()+n.slice(1),Ne=n=>{console.warn(`${Vh} ${typeof n=="object"?n.join(" "):n}`)},Tn=n=>{console.error(`${Vh} ${n}`)},Fl=[],Mp=n=>{Fl.includes(n)||(Fl.push(n),Ne(n))},Nh=(n,e=null)=>{Mp(`"${n}" is deprecated and will be removed in the next major release.${e?` Use "${e}" instead.`:""}`)},Si=n=>typeof n=="function"?n():n,Ea=n=>n&&typeof n.toPromise=="function",ss=n=>Ea(n)?n.toPromise():Promise.resolve(n),ba=n=>n&&Promise.resolve(n)===n,Bp=()=>navigator.userAgent.includes("Firefox"),Le=()=>document.body.querySelector(`.${P.container}`),is=n=>{const e=Le();return e?e.querySelector(n):null},ze=n=>is(`.${n}`),X=()=>ze(P.popup),nr=()=>ze(P.icon),Fp=()=>ze(P["icon-content"]),Lh=()=>ze(P.title),Ia=()=>ze(P["html-container"]),Oh=()=>ze(P.image),Ta=()=>ze(P["progress-steps"]),Ri=()=>ze(P["validation-message"]),ft=()=>is(`.${P.actions} .${P.confirm}`),rr=()=>is(`.${P.actions} .${P.cancel}`),An=()=>is(`.${P.actions} .${P.deny}`),Up=()=>ze(P["input-label"]),sr=()=>is(`.${P.loader}`),os=()=>ze(P.actions),Mh=()=>ze(P.footer),ki=()=>ze(P["timer-progress-bar"]),Aa=()=>ze(P.close),$p=`
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls],
  summary
`,Pa=()=>{const n=X();if(!n)return[];const e=n.querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'),t=Array.from(e).sort((i,a)=>{const l=parseInt(i.getAttribute("tabindex")||"0"),u=parseInt(a.getAttribute("tabindex")||"0");return l>u?1:l<u?-1:0}),r=n.querySelectorAll($p),s=Array.from(r).filter(i=>i.getAttribute("tabindex")!=="-1");return[...new Set(t.concat(s))].filter(i=>Ue(i))},Ca=()=>_t(document.body,P.shown)&&!_t(document.body,P["toast-shown"])&&!_t(document.body,P["no-backdrop"]),Di=()=>{const n=X();return n?_t(n,P.toast):!1},qp=()=>{const n=X();return n?n.hasAttribute("data-loading"):!1},He=(n,e)=>{if(n.textContent="",e){const r=new DOMParser().parseFromString(e,"text/html"),s=r.querySelector("head");s&&Array.from(s.childNodes).forEach(a=>{n.appendChild(a)});const i=r.querySelector("body");i&&Array.from(i.childNodes).forEach(a=>{a instanceof HTMLVideoElement||a instanceof HTMLAudioElement?n.appendChild(a.cloneNode(!0)):n.appendChild(a)})}},_t=(n,e)=>e?e.split(/\s+/).every(t=>n.classList.contains(t)):!1,jp=(n,e)=>{Array.from(n.classList).forEach(t=>{!Object.values(P).includes(t)&&!Object.values(ti).includes(t)&&!Object.values(e.showClass||{}).includes(t)&&n.classList.remove(t)})},je=(n,e,t)=>{if(jp(n,e),!e.customClass)return;const r=e.customClass[t];if(r){if(typeof r!="string"&&!r.forEach){Ne(`Invalid type of customClass.${t}! Expected string or iterable object, got "${typeof r}"`);return}Y(n,r)}},xi=(n,e)=>{if(!e)return null;switch(e){case"select":case"textarea":case"file":return n.querySelector(`.${P.popup} > .${P[e]}`);case"checkbox":return n.querySelector(`.${P.popup} > .${P.checkbox} input`);case"radio":return n.querySelector(`.${P.popup} > .${P.radio} input:checked`)||n.querySelector(`.${P.popup} > .${P.radio} input:first-child`);case"range":return n.querySelector(`.${P.popup} > .${P.range} input`);default:return n.querySelector(`.${P.popup} > .${P.input}`)}},Bh=n=>{if(n.focus(),n.type!=="file"){const e=n.value;n.value="",n.value=e}},Fh=(n,e,t)=>{if(!n||!e)return;const r=typeof e=="string"?e.split(/\s+/).filter(Boolean):e;(Array.isArray(n)?n:[n]).forEach(i=>{r.forEach(a=>{t?i.classList.add(a):i.classList.remove(a)})})},Y=(n,e)=>{Fh(n,e,!0)},Ge=(n,e)=>{Fh(n,e,!1)},Mt=(n,e)=>Array.from(n.children).find(t=>t instanceof HTMLElement&&_t(t,e)),pn=(n,e,t)=>{t===`${parseInt(`${t}`)}`&&(t=parseInt(t)),t||t===0?n.style.setProperty(e,typeof t=="number"?`${t}px`:t):n.style.removeProperty(e)},ve=(n,e="flex")=>{n&&(n.style.display=e)},Re=n=>{n&&(n.style.display="none")},Sa=(n,e="block")=>{n&&new MutationObserver(()=>{as(n,n.innerHTML,e)}).observe(n,{childList:!0,subtree:!0})},Ul=(n,e,t,r)=>{const s=n.querySelector(e);s&&s.style.setProperty(t,r)},as=(n,e,t="flex")=>{e?ve(n,t):Re(n)},Ue=n=>!!(n&&(n.offsetWidth||n.offsetHeight||n.getClientRects().length)),zp=()=>!Ue(ft())&&!Ue(An())&&!Ue(rr()),jo=n=>n.scrollHeight>n.clientHeight,Hp=(n,e)=>{let t=n;for(;t&&t!==e;){if(jo(t))return!0;t=t.parentElement}return!1},Uh=n=>{const e=window.getComputedStyle(n),t=parseFloat(e.getPropertyValue("animation-duration")||"0"),r=parseFloat(e.getPropertyValue("transition-duration")||"0");return t>0||r>0},Ra=(n,e=!1)=>{const t=ki();t&&Ue(t)&&(e&&(t.style.transition="none",t.style.width="100%"),setTimeout(()=>{t.style.transition=`width ${n/1e3}s linear`,t.style.width="0%"},10))},Wp=()=>{const n=ki();if(!n)return;const e=parseInt(window.getComputedStyle(n).width);n.style.removeProperty("transition"),n.style.width="100%";const t=parseInt(window.getComputedStyle(n).width),r=e/t*100;n.style.width=`${r}%`},Gp=()=>typeof window>"u"||typeof document>"u",Kp=`
 <div aria-labelledby="${P.title}" aria-describedby="${P["html-container"]}" class="${P.popup}" tabindex="-1">
   <button type="button" class="${P.close}"></button>
   <ul class="${P["progress-steps"]}"></ul>
   <div class="${P.icon}"></div>
   <img class="${P.image}" />
   <h2 class="${P.title}" id="${P.title}"></h2>
   <div class="${P["html-container"]}" id="${P["html-container"]}"></div>
   <input class="${P.input}" id="${P.input}" />
   <input type="file" class="${P.file}" />
   <div class="${P.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${P.select}" id="${P.select}"></select>
   <div class="${P.radio}"></div>
   <label class="${P.checkbox}">
     <input type="checkbox" id="${P.checkbox}" />
     <span class="${P.label}"></span>
   </label>
   <textarea class="${P.textarea}" id="${P.textarea}"></textarea>
   <div class="${P["validation-message"]}" id="${P["validation-message"]}"></div>
   <div class="${P.actions}">
     <div class="${P.loader}"></div>
     <button type="button" class="${P.confirm}"></button>
     <button type="button" class="${P.deny}"></button>
     <button type="button" class="${P.cancel}"></button>
   </div>
   <div class="${P.footer}"></div>
   <div class="${P["timer-progress-bar-container"]}">
     <div class="${P["timer-progress-bar"]}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g,""),Qp=()=>{const n=Le();return n?(n.remove(),Ge([document.documentElement,document.body],[P["no-backdrop"],P["toast-shown"],P["has-column"]]),!0):!1},hn=()=>{O.currentInstance&&O.currentInstance.resetValidationMessage()},Yp=()=>{const n=X();if(!n)return;const e=Mt(n,P.input),t=Mt(n,P.file),r=n.querySelector(`.${P.range} input`),s=n.querySelector(`.${P.range} output`),i=Mt(n,P.select),a=n.querySelector(`.${P.checkbox} input`),l=Mt(n,P.textarea);e&&(e.oninput=hn),t&&(t.onchange=hn),i&&(i.onchange=hn),a&&(a.onchange=hn),l&&(l.oninput=hn),r&&s&&(r.oninput=()=>{hn(),s.value=r.value},r.onchange=()=>{hn(),s.value=r.value})},Xp=n=>{if(typeof n=="string"){const e=document.querySelector(n);if(!e)throw new Error(`Target element "${n}" not found`);return e}return n},Jp=n=>{const e=X();e&&(e.setAttribute("role",n.toast?"alert":"dialog"),e.setAttribute("aria-live",n.toast?"polite":"assertive"),n.toast||e.setAttribute("aria-modal","true"))},Zp=n=>{window.getComputedStyle(n).direction==="rtl"&&(Y(Le(),P.rtl),O.isRTL=!0)},eg=n=>{const e=Qp();if(Gp()){Tn("SweetAlert2 requires document to initialize");return}const t=document.createElement("div");t.className=P.container,e&&Y(t,P["no-transition"]),He(t,Kp),t.dataset.swal2Theme=n.theme;const r=Xp(n.target||"body");r.appendChild(t),n.topLayer&&(t.setAttribute("popover",""),t.showPopover()),Jp(n),Zp(r),Yp()},ka=(n,e)=>{n instanceof HTMLElement?e.appendChild(n):typeof n=="object"?tg(n,e):n&&He(e,n)},tg=(n,e)=>{"jquery"in n?ng(e,n):He(e,n.toString())},ng=(n,e)=>{if(n.textContent="",0 in e)for(let t=0;t in e;t++)n.appendChild(e[t].cloneNode(!0));else n.appendChild(e.cloneNode(!0))},rg=(n,e)=>{const t=os(),r=sr();!t||!r||(!e.showConfirmButton&&!e.showDenyButton&&!e.showCancelButton?Re(t):ve(t),je(t,e,"actions"),sg(t,r,e),He(r,e.loaderHtml||""),je(r,e,"loader"))};function sg(n,e,t){const r=ft(),s=An(),i=rr();!r||!s||!i||(To(r,"confirm",t),To(s,"deny",t),To(i,"cancel",t),ig(r,s,i,t),t.reverseButtons&&(t.toast?(n.insertBefore(i,r),n.insertBefore(s,r)):(n.insertBefore(i,e),n.insertBefore(s,e),n.insertBefore(r,e))))}function ig(n,e,t,r){if(!r.buttonsStyling){Ge([n,e,t],P.styled);return}Y([n,e,t],P.styled),[[n,"confirm",r.confirmButtonColor],[e,"deny",r.denyButtonColor],[t,"cancel",r.cancelButtonColor]].forEach(([i,a,l])=>{l&&i.style.setProperty(`--swal2-${a}-button-background-color`,l),og(i)})}function og(n){const e=window.getComputedStyle(n);if(e.getPropertyValue("--swal2-action-button-focus-box-shadow"))return;const t=e.backgroundColor.replace(/rgba?\((\d+), (\d+), (\d+).*/,"rgba($1, $2, $3, 0.5)");n.style.setProperty("--swal2-action-button-focus-box-shadow",e.getPropertyValue("--swal2-outline").replace(/ rgba\(.*/,` ${t}`))}function To(n,e,t){const r=va(e);as(n,t[`show${r}Button`],"inline-block"),He(n,t[`${e}ButtonText`]||""),n.setAttribute("aria-label",t[`${e}ButtonAriaLabel`]||""),n.className=P[e],je(n,t,`${e}Button`)}const ag=(n,e)=>{const t=Aa();t&&(He(t,e.closeButtonHtml||""),je(t,e,"closeButton"),as(t,e.showCloseButton),t.setAttribute("aria-label",e.closeButtonAriaLabel||""))},cg=(n,e)=>{const t=Le();t&&(lg(t,e.backdrop),ug(t,e.position),hg(t,e.grow),je(t,e,"container"))};function lg(n,e){typeof e=="string"?n.style.background=e:e||Y([document.documentElement,document.body],P["no-backdrop"])}function ug(n,e){e&&(e in P?Y(n,P[e]):(Ne('The "position" parameter is not valid, defaulting to "center"'),Y(n,P.center)))}function hg(n,e){e&&Y(n,P[`grow-${e}`])}var Z={innerParams:new WeakMap,domCache:new WeakMap,focusedElement:new WeakMap};const dg=["input","file","range","select","radio","checkbox","textarea"],fg=(n,e)=>{const t=X();if(!t)return;const r=Z.innerParams.get(n),s=!r||e.input!==r.input;dg.forEach(i=>{const a=Mt(t,P[i]);a&&(gg(i,e.inputAttributes),a.className=P[i],s&&Re(a))}),e.input&&(s&&mg(e),wg(e))},mg=n=>{if(!n.input)return;if(!ae[n.input]){Tn(`Unexpected type of input! Expected ${Object.keys(ae).join(" | ")}, got "${n.input}"`);return}const e=$h(n.input);if(!e)return;const t=ae[n.input](e,n);ve(e),n.inputAutoFocus&&setTimeout(()=>{Bh(t)})},pg=n=>{for(const{name:e}of Array.from(n.attributes))["id","type","value","style"].includes(e)||n.removeAttribute(e)},gg=(n,e)=>{const t=X();if(!t)return;const r=xi(t,n);if(r){pg(r);for(const s in e)r.setAttribute(s,e[s])}},wg=n=>{if(!n.input)return;const e=$h(n.input);e&&je(e,n,"input")},Da=(n,e)=>{!n.placeholder&&e.inputPlaceholder&&(n.placeholder=e.inputPlaceholder)},cs=(n,e,t)=>{if(t.inputLabel){const r=document.createElement("label"),s=P["input-label"];r.setAttribute("for",n.id),r.className=s,typeof t.customClass=="object"&&Y(r,t.customClass.inputLabel),r.innerText=t.inputLabel,e.insertAdjacentElement("beforebegin",r)}},$h=n=>{const e=X();if(e)return Mt(e,P[n]||P.input)},ni=(n,e)=>{["string","number"].includes(typeof e)?n.value=`${e}`:ba(e)||Ne(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof e}"`)},ae={};ae.text=ae.email=ae.password=ae.number=ae.tel=ae.url=ae.search=ae.date=ae["datetime-local"]=ae.time=ae.week=ae.month=(n,e)=>{const t=n;return ni(t,e.inputValue),cs(t,t,e),Da(t,e),t.type=e.input,t};ae.file=(n,e)=>{const t=n;return cs(t,t,e),Da(t,e),t};ae.range=(n,e)=>{const t=n,r=t.querySelector("input"),s=t.querySelector("output");return r&&(ni(r,e.inputValue),r.type=e.input,cs(r,n,e)),s&&ni(s,e.inputValue),n};ae.select=(n,e)=>{const t=n;if(t.textContent="",e.inputPlaceholder){const r=document.createElement("option");He(r,e.inputPlaceholder),r.value="",r.disabled=!0,r.selected=!0,t.appendChild(r)}return cs(t,t,e),t};ae.radio=n=>{const e=n;return e.textContent="",n};ae.checkbox=(n,e)=>{const t=X();if(!t)throw new Error("Popup not found");const r=xi(t,"checkbox");if(!r)throw new Error("Checkbox input not found");r.value="1",r.checked=!!e.inputValue;const i=n.querySelector("span");if(i){const a=e.inputPlaceholder||e.inputLabel;a&&He(i,a)}return r};ae.textarea=(n,e)=>{const t=n;ni(t,e.inputValue),Da(t,e),cs(t,t,e);const r=s=>parseInt(window.getComputedStyle(s).marginLeft)+parseInt(window.getComputedStyle(s).marginRight);return setTimeout(()=>{if("MutationObserver"in window){const s=X();if(!s)return;const i=parseInt(window.getComputedStyle(s).width),a=()=>{if(!document.body.contains(t))return;const l=t.offsetWidth+r(t),u=X();u&&(l>i?u.style.width=`${l}px`:pn(u,"width",e.width))};new MutationObserver(a).observe(t,{attributes:!0,attributeFilter:["style"]})}}),t};const yg=(n,e)=>{const t=Ia();t&&(Sa(t),je(t,e,"htmlContainer"),e.html?(ka(e.html,t),ve(t,"block")):e.text?(t.textContent=e.text,ve(t,"block")):Re(t),fg(n,e))},_g=(n,e)=>{const t=Mh();t&&(Sa(t),as(t,!!e.footer,"block"),e.footer&&ka(e.footer,t),je(t,e,"footer"))},vg=(n,e)=>{const t=Z.innerParams.get(n),r=nr();if(!r)return;if(t&&e.icon===t.icon){ql(r,e),$l(r,e);return}if(!e.icon&&!e.iconHtml){Re(r);return}if(e.icon&&Object.keys(ti).indexOf(e.icon)===-1){Tn(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${e.icon}"`),Re(r);return}ve(r),ql(r,e),$l(r,e),Y(r,e.showClass&&e.showClass.icon),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",qh)},$l=(n,e)=>{for(const[t,r]of Object.entries(ti))e.icon!==t&&Ge(n,r);Y(n,e.icon&&ti[e.icon]),Ig(n,e),qh(),je(n,e,"icon")},qh=()=>{const n=X();if(!n)return;const e=window.getComputedStyle(n).getPropertyValue("background-color");n.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix").forEach(r=>{r.style.backgroundColor=e})},Eg=n=>`
  ${n.animation?'<div class="swal2-success-circular-line-left"></div>':""}
  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
  <div class="swal2-success-ring"></div>
  ${n.animation?'<div class="swal2-success-fix"></div>':""}
  ${n.animation?'<div class="swal2-success-circular-line-right"></div>':""}
`,bg=`
  <span class="swal2-x-mark">
    <span class="swal2-x-mark-line-left"></span>
    <span class="swal2-x-mark-line-right"></span>
  </span>
`,ql=(n,e)=>{if(!e.icon&&!e.iconHtml)return;let t=n.innerHTML,r="";e.iconHtml?r=jl(e.iconHtml):e.icon==="success"?(r=Eg(e),t=t.replace(/ style=".*?"/g,"")):e.icon==="error"?r=bg:e.icon&&(r=jl({question:"?",warning:"!",info:"i"}[e.icon])),t.trim()!==r.trim()&&He(n,r)},Ig=(n,e)=>{if(e.iconColor){n.style.color=e.iconColor,n.style.borderColor=e.iconColor;for(const t of[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"])Ul(n,t,"background-color",e.iconColor);Ul(n,".swal2-success-ring","border-color",e.iconColor)}},jl=n=>`<div class="${P["icon-content"]}">${n}</div>`,Tg=(n,e)=>{const t=Oh();if(t){if(!e.imageUrl){Re(t);return}ve(t,""),t.setAttribute("src",e.imageUrl),t.setAttribute("alt",e.imageAlt||""),pn(t,"width",e.imageWidth),pn(t,"height",e.imageHeight),t.className=P.image,je(t,e,"image")}};let xa=!1,jh=0,zh=0,Hh=0,Wh=0;const Ag=n=>{n.addEventListener("mousedown",ri),document.body.addEventListener("mousemove",si),n.addEventListener("mouseup",ii),n.addEventListener("touchstart",ri),document.body.addEventListener("touchmove",si),n.addEventListener("touchend",ii)},Pg=n=>{n.removeEventListener("mousedown",ri),document.body.removeEventListener("mousemove",si),n.removeEventListener("mouseup",ii),n.removeEventListener("touchstart",ri),document.body.removeEventListener("touchmove",si),n.removeEventListener("touchend",ii)},ri=n=>{const e=X();if(!e)return;const t=nr();if(n.target===e||t&&t.contains(n.target)){xa=!0;const r=Gh(n);jh=r.clientX,zh=r.clientY,Hh=parseInt(e.style.insetInlineStart)||0,Wh=parseInt(e.style.insetBlockStart)||0,Y(e,"swal2-dragging")}},si=n=>{const e=X();if(e&&xa){let{clientX:t,clientY:r}=Gh(n);const s=t-jh;e.style.insetInlineStart=`${Hh+(O.isRTL?-s:s)}px`,e.style.insetBlockStart=`${Wh+(r-zh)}px`}},ii=()=>{const n=X();xa=!1,Ge(n,"swal2-dragging")},Gh=n=>{const e=n.type.startsWith("touch")?n.touches[0]:n;return{clientX:e.clientX,clientY:e.clientY}},Cg=(n,e)=>{const t=Le(),r=X();if(!(!t||!r)){if(e.toast){pn(t,"width",e.width),r.style.width="100%";const s=sr();s&&r.insertBefore(s,nr())}else pn(r,"width",e.width);pn(r,"padding",e.padding),e.color&&(r.style.color=e.color),e.background&&(r.style.background=e.background),Re(Ri()),Sg(r,e),e.draggable&&!e.toast?(Y(r,P.draggable),Ag(r)):(Ge(r,P.draggable),Pg(r))}},Sg=(n,e)=>{const t=e.showClass||{};n.className=`${P.popup} ${Ue(n)?t.popup:""}`,e.toast?(Y([document.documentElement,document.body],P["toast-shown"]),Y(n,P.toast)):Y(n,P.modal),je(n,e,"popup"),typeof e.customClass=="string"&&Y(n,e.customClass),e.icon&&Y(n,P[`icon-${e.icon}`])},Rg=(n,e)=>{const t=Ta();if(!t)return;const{progressSteps:r,currentProgressStep:s}=e;if(!r||r.length===0||s===void 0){Re(t);return}ve(t),t.textContent="",s>=r.length&&Ne("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),r.forEach((i,a)=>{const l=kg(i);if(t.appendChild(l),a===s&&Y(l,P["active-progress-step"]),a!==r.length-1){const u=Dg(e);t.appendChild(u)}})},kg=n=>{const e=document.createElement("li");return Y(e,P["progress-step"]),He(e,n),e},Dg=n=>{const e=document.createElement("li");return Y(e,P["progress-step-line"]),n.progressStepsDistance&&pn(e,"width",n.progressStepsDistance),e},xg=(n,e)=>{const t=Lh();t&&(Sa(t),as(t,!!(e.title||e.titleText),"block"),e.title&&ka(e.title,t),e.titleText&&(t.innerText=e.titleText),je(t,e,"title"))},Kh=(n,e)=>{var t;Cg(n,e),cg(n,e),Rg(n,e),vg(n,e),Tg(n,e),xg(n,e),ag(n,e),yg(n,e),rg(n,e),_g(n,e);const r=X();typeof e.didRender=="function"&&r&&e.didRender(r),(t=O.eventEmitter)===null||t===void 0||t.emit("didRender",r)},Vg=()=>Ue(X()),Qh=()=>{var n;return(n=ft())===null||n===void 0?void 0:n.click()},Ng=()=>{var n;return(n=An())===null||n===void 0?void 0:n.click()},Lg=()=>{var n;return(n=rr())===null||n===void 0?void 0:n.click()},ir=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),Yh=n=>{if(n.keydownTarget&&n.keydownHandlerAdded&&n.keydownHandler){const e=n.keydownHandler;n.keydownTarget.removeEventListener("keydown",e,{capture:n.keydownListenerCapture}),n.keydownHandlerAdded=!1}},Og=(n,e,t)=>{if(Yh(n),!e.toast){const r=i=>Bg(e,i,t);n.keydownHandler=r;const s=e.keydownListenerCapture?window:X();if(s){n.keydownTarget=s,n.keydownListenerCapture=e.keydownListenerCapture;const i=r;n.keydownTarget.addEventListener("keydown",i,{capture:n.keydownListenerCapture}),n.keydownHandlerAdded=!0}}},zo=(n,e)=>{var t;const r=Pa();return r.length?(n=n+e,n===-2&&(n=r.length-1),n===r.length?n=0:n===-1&&(n=r.length-1),r[n].focus(),!(Bp()&&r[n]instanceof HTMLIFrameElement)):((t=X())===null||t===void 0||t.focus(),!0)},Xh=["ArrowRight","ArrowDown"],Mg=["ArrowLeft","ArrowUp"],Bg=(n,e,t)=>{n&&(e.isComposing||e.keyCode===229||(n.stopKeydownPropagation&&e.stopPropagation(),e.key==="Enter"?Fg(e,n):e.key==="Tab"?Ug(e):[...Xh,...Mg].includes(e.key)?$g(e.key):e.key==="Escape"&&qg(e,n,t)))},Fg=(n,e)=>{if(!Si(e.allowEnterKey))return;const t=X();if(!t||!e.input)return;const r=xi(t,e.input);if(n.target&&r&&n.target instanceof HTMLElement&&n.target.outerHTML===r.outerHTML){if(["textarea","file"].includes(e.input))return;Qh(),n.preventDefault()}},Ug=n=>{const e=n.target,r=Pa().findIndex(i=>i===e);let s=!0;n.shiftKey?s=zo(r,-1):s=zo(r,1),n.stopPropagation(),s&&n.preventDefault()},$g=n=>{const e=os(),t=ft(),r=An(),s=rr();if(!e||!t||!r||!s)return;const i=[t,r,s];if(document.activeElement instanceof HTMLElement&&!i.includes(document.activeElement))return;const a=Xh.includes(n)?"nextElementSibling":"previousElementSibling";let l=document.activeElement;if(l){for(let u=0;u<e.children.length;u++){if(l=l[a],!l)return;if(l instanceof HTMLButtonElement&&Ue(l))break}l instanceof HTMLButtonElement&&l.focus()}},qg=(n,e,t)=>{n.preventDefault(),Si(e.allowEscapeKey)&&t(ir.esc)};var Hn={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap};const jg=()=>{const n=Le();Array.from(document.body.children).forEach(t=>{t.contains(n)||(t.hasAttribute("aria-hidden")&&t.setAttribute("data-previous-aria-hidden",t.getAttribute("aria-hidden")||""),t.setAttribute("aria-hidden","true"))})},Jh=()=>{Array.from(document.body.children).forEach(e=>{e.hasAttribute("data-previous-aria-hidden")?(e.setAttribute("aria-hidden",e.getAttribute("data-previous-aria-hidden")||""),e.removeAttribute("data-previous-aria-hidden")):e.removeAttribute("aria-hidden")})},Va=typeof window<"u"&&!!window.GestureEvent,zg=Va&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,Hg=()=>{if(Va&&!_t(document.body,P.iosfix)){const n=document.body.scrollTop;document.body.style.top=`${n*-1}px`,Y(document.body,P.iosfix),Wg()}},Wg=()=>{const n=Le();if(!n)return;let e;n.ontouchstart=t=>{e=Gg(t)},n.ontouchmove=t=>{e&&(t.preventDefault(),t.stopPropagation())}},Gg=n=>{const e=n.target,t=Le(),r=Ia();return!t||!r||Kg(n)||Qg(n)?!1:e===t||!jo(t)&&e instanceof HTMLElement&&!Hp(e,r)&&e.tagName!=="INPUT"&&e.tagName!=="TEXTAREA"&&!(jo(r)&&r.contains(e))},Kg=n=>!!(n.touches&&n.touches.length&&n.touches[0].touchType==="stylus"),Qg=n=>n.touches&&n.touches.length>1,Yg=()=>{if(_t(document.body,P.iosfix)){const n=parseInt(document.body.style.top,10);Ge(document.body,P.iosfix),document.body.style.top="",document.body.scrollTop=n*-1}},Xg=()=>{const n=document.createElement("div");n.className=P["scrollbar-measure"],document.body.appendChild(n);const e=n.getBoundingClientRect().width-n.clientWidth;return document.body.removeChild(n),e};let Fn=null;const Jg=n=>{Fn===null&&(document.body.scrollHeight>window.innerHeight||n==="scroll")&&(Fn=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight=`${Fn+Xg()}px`)},Zg=()=>{Fn!==null&&(document.body.style.paddingRight=`${Fn}px`,Fn=null)};function Zh(n,e,t,r){Di()?zl(n,r):(Np(t).then(()=>zl(n,r)),Yh(O)),Va?(e.setAttribute("style","display:none !important"),e.removeAttribute("class"),e.innerHTML=""):e.remove(),Ca()&&(Zg(),Yg(),Jh()),ew()}function ew(){Ge([document.documentElement,document.body],[P.shown,P["height-auto"],P["no-backdrop"],P["toast-shown"]])}function Bt(n){n=nw(n);const e=Hn.swalPromiseResolve.get(this),t=tw(this);this.isAwaitingPromise?n.isDismissed||(ls(this),e(n)):t&&e(n)}const tw=n=>{const e=X();if(!e)return!1;const t=Z.innerParams.get(n);if(!t||_t(e,t.hideClass.popup))return!1;Ge(e,t.showClass.popup),Y(e,t.hideClass.popup);const r=Le();return Ge(r,t.showClass.backdrop),Y(r,t.hideClass.backdrop),rw(n,e,t),!0};function ed(n){const e=Hn.swalPromiseReject.get(this);ls(this),e&&e(n)}const ls=n=>{n.isAwaitingPromise&&(delete n.isAwaitingPromise,Z.innerParams.get(n)||n._destroy())},nw=n=>typeof n>"u"?{isConfirmed:!1,isDenied:!1,isDismissed:!0}:Object.assign({isConfirmed:!1,isDenied:!1,isDismissed:!1},n),rw=(n,e,t)=>{var r;const s=Le(),i=Uh(e);typeof t.willClose=="function"&&t.willClose(e),(r=O.eventEmitter)===null||r===void 0||r.emit("willClose",e),i&&s?sw(n,e,s,!!t.returnFocus,t.didClose):s&&Zh(n,s,!!t.returnFocus,t.didClose)},sw=(n,e,t,r,s)=>{O.swalCloseEventFinishedCallback=Zh.bind(null,n,t,r,s);const i=function(a){if(a.target===e){var l;(l=O.swalCloseEventFinishedCallback)===null||l===void 0||l.call(O),delete O.swalCloseEventFinishedCallback,e.removeEventListener("animationend",i),e.removeEventListener("transitionend",i)}};e.addEventListener("animationend",i),e.addEventListener("transitionend",i)},zl=(n,e)=>{setTimeout(()=>{var t;typeof e=="function"&&e.bind(n.params)(),(t=O.eventEmitter)===null||t===void 0||t.emit("didClose"),n._destroy&&n._destroy()})},Wn=n=>{let e=X();if(e||new Je,e=X(),!e)return;const t=sr();Di()?Re(nr()):iw(e,n),ve(t),e.setAttribute("data-loading","true"),e.setAttribute("aria-busy","true"),e.focus()},iw=(n,e)=>{const t=os(),r=sr();!t||!r||(!e&&Ue(ft())&&(e=ft()),ve(t),e&&(Re(e),r.setAttribute("data-button-to-replace",e.className),t.insertBefore(r,e)),Y([n,t],P.loading))},ow=(n,e)=>{e.input==="select"||e.input==="radio"?hw(n,e):["text","email","number","tel","textarea"].some(t=>t===e.input)&&(Ea(e.inputValue)||ba(e.inputValue))&&(Wn(ft()),dw(n,e))},aw=(n,e)=>{const t=n.getInput();if(!t)return null;switch(e.input){case"checkbox":return cw(t);case"radio":return lw(t);case"file":return uw(t);default:return e.inputAutoTrim?t.value.trim():t.value}},cw=n=>n.checked?1:0,lw=n=>n.checked?n.value:null,uw=n=>n.files&&n.files.length?n.getAttribute("multiple")!==null?n.files:n.files[0]:null,hw=(n,e)=>{const t=X();if(!t)return;const r=s=>{e.input==="select"?fw(t,Ho(s),e):e.input==="radio"&&mw(t,Ho(s),e)};Ea(e.inputOptions)||ba(e.inputOptions)?(Wn(ft()),ss(e.inputOptions).then(s=>{n.hideLoading(),r(s)})):typeof e.inputOptions=="object"?r(e.inputOptions):Tn(`Unexpected type of inputOptions! Expected object, Map or Promise, got ${typeof e.inputOptions}`)},dw=(n,e)=>{const t=n.getInput();t&&(Re(t),ss(e.inputValue).then(r=>{t.value=e.input==="number"?`${parseFloat(r)||0}`:`${r}`,ve(t),t.focus(),n.hideLoading()}).catch(r=>{Tn(`Error in inputValue promise: ${r}`),t.value="",ve(t),t.focus(),n.hideLoading()}))};function fw(n,e,t){const r=Mt(n,P.select);if(!r)return;const s=(i,a,l)=>{const u=document.createElement("option");u.value=l,He(u,a),u.selected=td(l,t.inputValue),i.appendChild(u)};e.forEach(i=>{const a=i[0],l=i[1];if(Array.isArray(l)){const u=document.createElement("optgroup");u.label=a,u.disabled=!1,r.appendChild(u),l.forEach(d=>s(u,d[1],d[0]))}else s(r,l,a)}),r.focus()}function mw(n,e,t){const r=Mt(n,P.radio);if(!r)return;e.forEach(i=>{const a=i[0],l=i[1],u=document.createElement("input"),d=document.createElement("label");u.type="radio",u.name=P.radio,u.value=a,td(a,t.inputValue)&&(u.checked=!0);const m=document.createElement("span");He(m,l),m.className=P.label,d.appendChild(u),d.appendChild(m),r.appendChild(d)});const s=r.querySelectorAll("input");s.length&&s[0].focus()}const Ho=n=>(n instanceof Map?Array.from(n):Object.entries(n)).map(([t,r])=>[t,typeof r=="object"?Ho(r):r]),td=(n,e)=>!!e&&e!=null&&e.toString()===n.toString(),pw=n=>{const e=Z.innerParams.get(n);n.disableButtons(),e.input?nd(n,"confirm"):La(n,!0)},gw=n=>{const e=Z.innerParams.get(n);n.disableButtons(),e.returnInputValueOnDeny?nd(n,"deny"):Na(n,!1)},ww=(n,e)=>{n.disableButtons(),e(ir.cancel)},nd=(n,e)=>{const t=Z.innerParams.get(n);if(!t.input){Tn(`The "input" parameter is needed to be set when using returnInputValueOn${va(e)}`);return}const r=n.getInput(),s=aw(n,t);t.inputValidator?yw(n,s,e):r&&!r.checkValidity()?(n.enableButtons(),n.showValidationMessage(t.validationMessage||r.validationMessage)):e==="deny"?Na(n,s):La(n,s)},yw=(n,e,t)=>{const r=Z.innerParams.get(n);n.disableInput(),Promise.resolve().then(()=>ss(r.inputValidator(e,r.validationMessage))).then(i=>{n.enableButtons(),n.enableInput(),i?n.showValidationMessage(i):t==="deny"?Na(n,e):La(n,e)})},Na=(n,e)=>{const t=Z.innerParams.get(n);t.showLoaderOnDeny&&Wn(An()),t.preDeny?(n.isAwaitingPromise=!0,Promise.resolve().then(()=>ss(t.preDeny(e,t.validationMessage))).then(s=>{s===!1?(n.hideLoading(),ls(n)):n.close({isDenied:!0,value:typeof s>"u"?e:s})}).catch(s=>rd(n,s))):n.close({isDenied:!0,value:e})},Hl=(n,e)=>{n.close({isConfirmed:!0,value:e})},rd=(n,e)=>{n.rejectPromise(e)},La=(n,e)=>{const t=Z.innerParams.get(n);t.showLoaderOnConfirm&&Wn(),t.preConfirm?(n.resetValidationMessage(),n.isAwaitingPromise=!0,Promise.resolve().then(()=>ss(t.preConfirm(e,t.validationMessage))).then(s=>{Ue(Ri())||s===!1?(n.hideLoading(),ls(n)):Hl(n,typeof s>"u"?e:s)}).catch(s=>rd(n,s))):Hl(n,e)};function oi(){const n=Z.innerParams.get(this);if(!n)return;const e=Z.domCache.get(this);Re(e.loader),Di()?n.icon&&ve(nr()):_w(e),Ge([e.popup,e.actions],P.loading),e.popup.removeAttribute("aria-busy"),e.popup.removeAttribute("data-loading"),this.enableButtons()}const _w=n=>{const e=n.loader.getAttribute("data-button-to-replace"),t=e?n.popup.getElementsByClassName(e):[];t.length?ve(t[0],"inline-block"):zp()&&Re(n.actions)};function sd(){const n=Z.innerParams.get(this),e=Z.domCache.get(this);return e?xi(e.popup,n.input):null}function id(n,e,t){const r=Z.domCache.get(n);e.forEach(s=>{r[s].disabled=t})}function od(n,e){const t=X();!t||!n||(n.type==="radio"?t.querySelectorAll(`[name="${P.radio}"]`).forEach(s=>{s.disabled=e}):n.disabled=e)}function ad(){id(this,["confirmButton","denyButton","cancelButton"],!1);const n=Z.focusedElement.get(this);n instanceof HTMLElement&&document.activeElement===document.body&&n.focus(),Z.focusedElement.delete(this)}function cd(){Z.focusedElement.set(this,document.activeElement),id(this,["confirmButton","denyButton","cancelButton"],!0)}function ld(){od(this.getInput(),!1)}function ud(){od(this.getInput(),!0)}function hd(n){const e=Z.domCache.get(this),t=Z.innerParams.get(this);He(e.validationMessage,n),e.validationMessage.className=P["validation-message"],t.customClass&&t.customClass.validationMessage&&Y(e.validationMessage,t.customClass.validationMessage),ve(e.validationMessage);const r=this.getInput();r&&(r.setAttribute("aria-invalid","true"),r.setAttribute("aria-describedby",P["validation-message"]),Bh(r),Y(r,P.inputerror))}function dd(){const n=Z.domCache.get(this);n.validationMessage&&Re(n.validationMessage);const e=this.getInput();e&&(e.removeAttribute("aria-invalid"),e.removeAttribute("aria-describedby"),Ge(e,P.inputerror))}const Ft={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:!1,draggable:!1,animation:!0,theme:"light",showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:{},target:"body",color:void 0,backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,returnFocus:!0,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:!1,showLoaderOnDeny:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoFocus:!0,inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:!0,topLayer:!1},vw=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","color","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","draggable","footer","hideClass","html","icon","iconColor","iconHtml","imageAlt","imageHeight","imageUrl","imageWidth","preConfirm","preDeny","progressSteps","returnFocus","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","theme","willClose"],Ew={allowEnterKey:void 0},bw=["allowOutsideClick","allowEnterKey","backdrop","draggable","focusConfirm","focusDeny","focusCancel","returnFocus","heightAuto","keydownListenerCapture"],fd=n=>Object.prototype.hasOwnProperty.call(Ft,n),md=n=>vw.indexOf(n)!==-1,pd=n=>Ew[n],Iw=n=>{fd(n)||Ne(`Unknown parameter "${n}"`)},Tw=n=>{bw.includes(n)&&Ne(`The parameter "${n}" is incompatible with toasts`)},Aw=n=>{const e=pd(n);e&&Nh(n,e)},gd=n=>{n.backdrop===!1&&n.allowOutsideClick&&Ne('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'),n.theme&&!["light","dark","auto","minimal","borderless","bootstrap-4","bootstrap-4-light","bootstrap-4-dark","bootstrap-5","bootstrap-5-light","bootstrap-5-dark","material-ui","material-ui-light","material-ui-dark","embed-iframe","bulma","bulma-light","bulma-dark"].includes(n.theme)&&Ne(`Invalid theme "${n.theme}"`);for(const e in n)Iw(e),n.toast&&Tw(e),Aw(e)};function wd(n){const e=Le(),t=X(),r=Z.innerParams.get(this);if(!t||_t(t,r.hideClass.popup)){Ne("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");return}const s=Pw(n),i=Object.assign({},r,s);gd(i),e&&(e.dataset.swal2Theme=i.theme),Kh(this,i),Z.innerParams.set(this,i),Object.defineProperties(this,{params:{value:Object.assign({},this.params,n),writable:!1,enumerable:!0}})}const Pw=n=>{const e={};return Object.keys(n).forEach(t=>{if(md(t)){const r=n;e[t]=r[t]}else Ne(`Invalid parameter to update: ${t}`)}),e};function yd(){var n;const e=Z.domCache.get(this),t=Z.innerParams.get(this);if(!t){_d(this);return}e.popup&&O.swalCloseEventFinishedCallback&&(O.swalCloseEventFinishedCallback(),delete O.swalCloseEventFinishedCallback),typeof t.didDestroy=="function"&&t.didDestroy(),(n=O.eventEmitter)===null||n===void 0||n.emit("didDestroy"),Cw(this)}const Cw=n=>{_d(n),delete n.params,delete O.keydownHandler,delete O.keydownTarget,delete O.currentInstance},_d=n=>{n.isAwaitingPromise?(Ao(Z,n),n.isAwaitingPromise=!0):(Ao(Hn,n),Ao(Z,n),delete n.isAwaitingPromise,delete n.disableButtons,delete n.enableButtons,delete n.getInput,delete n.disableInput,delete n.enableInput,delete n.hideLoading,delete n.disableLoading,delete n.showValidationMessage,delete n.resetValidationMessage,delete n.close,delete n.closePopup,delete n.closeModal,delete n.closeToast,delete n.rejectPromise,delete n.update,delete n._destroy)},Ao=(n,e)=>{for(const t in n)n[t].delete(e)};var Sw=Object.freeze({__proto__:null,_destroy:yd,close:Bt,closeModal:Bt,closePopup:Bt,closeToast:Bt,disableButtons:cd,disableInput:ud,disableLoading:oi,enableButtons:ad,enableInput:ld,getInput:sd,handleAwaitingPromise:ls,hideLoading:oi,rejectPromise:ed,resetValidationMessage:dd,showValidationMessage:hd,update:wd});const Rw=(n,e,t)=>{n.toast?kw(n,e,t):(xw(e),Vw(e),Nw(n,e,t))},kw=(n,e,t)=>{e.popup.onclick=()=>{n&&(Dw(n)||n.timer||n.input)||t(ir.close)}},Dw=n=>!!(n.showConfirmButton||n.showDenyButton||n.showCancelButton||n.showCloseButton);let ai=!1;const xw=n=>{n.popup.onmousedown=()=>{n.container.onmouseup=function(e){n.container.onmouseup=()=>{},e.target===n.container&&(ai=!0)}}},Vw=n=>{n.container.onmousedown=e=>{e.target===n.container&&e.preventDefault(),n.popup.onmouseup=function(t){n.popup.onmouseup=()=>{},(t.target===n.popup||t.target instanceof HTMLElement&&n.popup.contains(t.target))&&(ai=!0)}}},Nw=(n,e,t)=>{e.container.onclick=r=>{if(ai){ai=!1;return}r.target===e.container&&Si(n.allowOutsideClick)&&t(ir.backdrop)}},Lw=n=>typeof n=="object"&&n!==null&&"jquery"in n,Wl=n=>n instanceof Element||Lw(n),Ow=n=>{const e={};return typeof n[0]=="object"&&!Wl(n[0])?Object.assign(e,n[0]):["title","html","icon"].forEach((t,r)=>{const s=n[r];typeof s=="string"||Wl(s)?e[t]=s:s!==void 0&&Tn(`Unexpected type of ${t}! Expected "string" or "Element", got ${typeof s}`)}),e};function Mw(...n){return new this(...n)}function Bw(n){class e extends this{_main(r,s){return super._main(r,Object.assign({},n,s))}}return e}const Fw=()=>O.timeout&&O.timeout.getTimerLeft(),vd=()=>{if(O.timeout)return Wp(),O.timeout.stop()},Ed=()=>{if(O.timeout){const n=O.timeout.start();return Ra(n),n}},Uw=()=>{const n=O.timeout;return n&&(n.running?vd():Ed())},$w=n=>{if(O.timeout){const e=O.timeout.increase(n);return Ra(e,!0),e}},qw=()=>!!(O.timeout&&O.timeout.isRunning());let Gl=!1;const Wo={};function jw(n="data-swal-template"){Wo[n]=this,Gl||(document.body.addEventListener("click",zw),Gl=!0)}const zw=n=>{for(let e=n.target;e&&e!==document;e=e.parentNode)for(const t in Wo){const r=e.getAttribute&&e.getAttribute(t);if(r){Wo[t].fire({template:r});return}}};class Hw{constructor(){this.events={}}_getHandlersByEventName(e){return typeof this.events[e]>"u"&&(this.events[e]=[]),this.events[e]}on(e,t){const r=this._getHandlersByEventName(e);r.includes(t)||r.push(t)}once(e,t){const r=(...s)=>{this.removeListener(e,r),t.apply(this,s)};this.on(e,r)}emit(e,...t){this._getHandlersByEventName(e).forEach(r=>{try{r.apply(this,t)}catch(s){console.error(s)}})}removeListener(e,t){const r=this._getHandlersByEventName(e),s=r.indexOf(t);s>-1&&r.splice(s,1)}removeAllListeners(e){this.events[e]!==void 0&&(this.events[e].length=0)}reset(){this.events={}}}O.eventEmitter=new Hw;const Ww=(n,e)=>{O.eventEmitter&&O.eventEmitter.on(n,e)},Gw=(n,e)=>{O.eventEmitter&&O.eventEmitter.once(n,e)},Kw=(n,e)=>{if(O.eventEmitter){if(!n){O.eventEmitter.reset();return}e?O.eventEmitter.removeListener(n,e):O.eventEmitter.removeAllListeners(n)}};var Qw=Object.freeze({__proto__:null,argsToParams:Ow,bindClickHandler:jw,clickCancel:Lg,clickConfirm:Qh,clickDeny:Ng,enableLoading:Wn,fire:Mw,getActions:os,getCancelButton:rr,getCloseButton:Aa,getConfirmButton:ft,getContainer:Le,getDenyButton:An,getFocusableElements:Pa,getFooter:Mh,getHtmlContainer:Ia,getIcon:nr,getIconContent:Fp,getImage:Oh,getInputLabel:Up,getLoader:sr,getPopup:X,getProgressSteps:Ta,getTimerLeft:Fw,getTimerProgressBar:ki,getTitle:Lh,getValidationMessage:Ri,increaseTimer:$w,isDeprecatedParameter:pd,isLoading:qp,isTimerRunning:qw,isUpdatableParameter:md,isValidParameter:fd,isVisible:Vg,mixin:Bw,off:Kw,on:Ww,once:Gw,resumeTimer:Ed,showLoading:Wn,stopTimer:vd,toggleTimer:Uw});class Yw{constructor(e,t){this.callback=e,this.remaining=t,this.running=!1,this.start()}start(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}stop(){return this.started&&this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=new Date().getTime()-this.started.getTime()),this.remaining}increase(e){const t=this.running;return t&&this.stop(),this.remaining+=e,t&&this.start(),this.remaining}getTimerLeft(){return this.running&&(this.stop(),this.start()),this.remaining}isRunning(){return this.running}}const bd=["swal-title","swal-html","swal-footer"],Xw=n=>{const e=typeof n.template=="string"?document.querySelector(n.template):n.template;if(!e)return{};const t=e.content;return iy(t),Object.assign(Jw(t),Zw(t),ey(t),ty(t),ny(t),ry(t),sy(t,bd))},Jw=n=>{const e={};return Array.from(n.querySelectorAll("swal-param")).forEach(r=>{yn(r,["name","value"]);const s=r.getAttribute("name"),i=r.getAttribute("value");!s||!i||(s in Ft&&typeof Ft[s]=="boolean"?e[s]=i!=="false":s in Ft&&typeof Ft[s]=="object"?e[s]=JSON.parse(i):e[s]=i)}),e},Zw=n=>{const e={};return Array.from(n.querySelectorAll("swal-function-param")).forEach(r=>{const s=r.getAttribute("name"),i=r.getAttribute("value");!s||!i||(e[s]=new Function(`return ${i}`)())}),e},ey=n=>{const e={};return Array.from(n.querySelectorAll("swal-button")).forEach(r=>{yn(r,["type","color","aria-label"]);const s=r.getAttribute("type");if(!s||!["confirm","cancel","deny"].includes(s))return;e[`${s}ButtonText`]=r.innerHTML,e[`show${va(s)}Button`]=!0;const i=r.getAttribute("color");i!==null&&(e[`${s}ButtonColor`]=i);const a=r.getAttribute("aria-label");a!==null&&(e[`${s}ButtonAriaLabel`]=a)}),e},ty=n=>{const e={},t=n.querySelector("swal-image");if(t){yn(t,["src","width","height","alt"]);const r=t.getAttribute("src");r!==null&&(e.imageUrl=r||void 0);const s=t.getAttribute("width");s!==null&&(e.imageWidth=s||void 0);const i=t.getAttribute("height");i!==null&&(e.imageHeight=i||void 0);const a=t.getAttribute("alt");a!==null&&(e.imageAlt=a||void 0)}return e},ny=n=>{const e={},t=n.querySelector("swal-icon");return t&&(yn(t,["type","color"]),t.hasAttribute("type")&&(e.icon=t.getAttribute("type")),t.hasAttribute("color")&&(e.iconColor=t.getAttribute("color")),e.iconHtml=t.innerHTML),e},ry=n=>{const e={},t=n.querySelector("swal-input");t&&(yn(t,["type","label","placeholder","value"]),e.input=t.getAttribute("type")||"text",t.hasAttribute("label")&&(e.inputLabel=t.getAttribute("label")),t.hasAttribute("placeholder")&&(e.inputPlaceholder=t.getAttribute("placeholder")),t.hasAttribute("value")&&(e.inputValue=t.getAttribute("value")));const r=Array.from(n.querySelectorAll("swal-input-option"));return r.length&&(e.inputOptions={},r.forEach(s=>{yn(s,["value"]);const i=s.getAttribute("value");if(!i)return;const a=s.innerHTML;e.inputOptions[i]=a})),e},sy=(n,e)=>{const t={};for(const r in e){const s=e[r],i=n.querySelector(s);i&&(yn(i,[]),t[s.replace(/^swal-/,"")]=i.innerHTML.trim())}return t},iy=n=>{const e=bd.concat(["swal-param","swal-function-param","swal-button","swal-image","swal-icon","swal-input","swal-input-option"]);Array.from(n.children).forEach(t=>{const r=t.tagName.toLowerCase();e.includes(r)||Ne(`Unrecognized element <${r}>`)})},yn=(n,e)=>{Array.from(n.attributes).forEach(t=>{e.indexOf(t.name)===-1&&Ne([`Unrecognized attribute "${t.name}" on <${n.tagName.toLowerCase()}>.`,`${e.length?`Allowed attributes are: ${e.join(", ")}`:"To set the value, use HTML within the element."}`])})},Id=10,oy=n=>{var e,t;const r=Le(),s=X();if(!r||!s)return;typeof n.willOpen=="function"&&n.willOpen(s),(e=O.eventEmitter)===null||e===void 0||e.emit("willOpen",s);const a=window.getComputedStyle(document.body).overflowY;if(ly(r,s,n),setTimeout(()=>{ay(r,s)},Id),Ca()&&(cy(r,n.scrollbarPadding!==void 0?n.scrollbarPadding:!1,a),jg()),zg&&n.backdrop===!1&&s.scrollHeight>r.clientHeight&&(r.style.pointerEvents="auto"),!Di()&&!O.previousActiveElement&&(O.previousActiveElement=document.activeElement),typeof n.didOpen=="function"){const l=n.didOpen;setTimeout(()=>l(s))}(t=O.eventEmitter)===null||t===void 0||t.emit("didOpen",s)},ci=n=>{const e=X();if(!e||n.target!==e)return;const t=Le();t&&(e.removeEventListener("animationend",ci),e.removeEventListener("transitionend",ci),t.style.overflowY="auto",Ge(t,P["no-transition"]))},ay=(n,e)=>{Uh(e)?(n.style.overflowY="hidden",e.addEventListener("animationend",ci),e.addEventListener("transitionend",ci)):n.style.overflowY="auto"},cy=(n,e,t)=>{Hg(),e&&t!=="hidden"&&Jg(t),setTimeout(()=>{n.scrollTop=0})},ly=(n,e,t)=>{var r;(r=t.showClass)!==null&&r!==void 0&&r.backdrop&&Y(n,t.showClass.backdrop),t.animation?(e.style.setProperty("opacity","0","important"),ve(e,"grid"),setTimeout(()=>{var s;(s=t.showClass)!==null&&s!==void 0&&s.popup&&Y(e,t.showClass.popup),e.style.removeProperty("opacity")},Id)):ve(e,"grid"),Y([document.documentElement,document.body],P.shown),t.heightAuto&&t.backdrop&&!t.toast&&Y([document.documentElement,document.body],P["height-auto"])};var Kl={email:(n,e)=>/^[a-zA-Z0-9.+_'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/.test(n)?Promise.resolve():Promise.resolve(e||"Invalid email address"),url:(n,e)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(n)?Promise.resolve():Promise.resolve(e||"Invalid URL")};function uy(n){n.inputValidator||(n.input==="email"&&(n.inputValidator=Kl.email),n.input==="url"&&(n.inputValidator=Kl.url))}function hy(n){(!n.target||typeof n.target=="string"&&!document.querySelector(n.target)||typeof n.target!="string"&&!n.target.appendChild)&&(Ne('Target parameter is not valid, defaulting to "body"'),n.target="body")}function dy(n){uy(n),n.showLoaderOnConfirm&&!n.preConfirm&&Ne(`showLoaderOnConfirm is set to true, but preConfirm is not defined.
showLoaderOnConfirm should be used together with preConfirm, see usage example:
https://sweetalert2.github.io/#ajax-request`),hy(n),typeof n.title=="string"&&(n.title=n.title.split(`
`).join("<br />")),eg(n)}let st;var Ms=new WeakMap;class le{constructor(...e){if(kp(this,Ms,Promise.resolve({isConfirmed:!1,isDenied:!1,isDismissed:!0})),typeof window>"u")return;st=this;const t=Object.freeze(this.constructor.argsToParams(e));this.params=t,this.isAwaitingPromise=!1,Dp(Ms,this,this._main(st.params))}_main(e,t={}){if(gd(Object.assign({},t,e)),O.currentInstance){const i=Hn.swalPromiseResolve.get(O.currentInstance),{isAwaitingPromise:a}=O.currentInstance;O.currentInstance._destroy(),a||i({isDismissed:!0}),Ca()&&Jh()}O.currentInstance=st;const r=my(e,t);dy(r),Object.freeze(r),O.timeout&&(O.timeout.stop(),delete O.timeout),clearTimeout(O.restoreFocusTimeout);const s=py(st);return Kh(st,r),Z.innerParams.set(st,r),fy(st,s,r)}then(e){return Bl(Ms,this).then(e)}finally(e){return Bl(Ms,this).finally(e)}}const fy=(n,e,t)=>new Promise((r,s)=>{const i=a=>{n.close({isDismissed:!0,dismiss:a,isConfirmed:!1,isDenied:!1})};Hn.swalPromiseResolve.set(n,r),Hn.swalPromiseReject.set(n,s),e.confirmButton.onclick=()=>{pw(n)},e.denyButton.onclick=()=>{gw(n)},e.cancelButton.onclick=()=>{ww(n,i)},e.closeButton.onclick=()=>{i(ir.close)},Rw(t,e,i),Og(O,t,i),ow(n,t),oy(t),gy(O,t,i),wy(e,t),setTimeout(()=>{e.container.scrollTop=0})}),my=(n,e)=>{const t=Xw(n),r=Object.assign({},Ft,e,t,n);return r.showClass=Object.assign({},Ft.showClass,r.showClass),r.hideClass=Object.assign({},Ft.hideClass,r.hideClass),r.animation===!1&&(r.showClass={backdrop:"swal2-noanimation"},r.hideClass={}),r},py=n=>{const e={popup:X(),container:Le(),actions:os(),confirmButton:ft(),denyButton:An(),cancelButton:rr(),loader:sr(),closeButton:Aa(),validationMessage:Ri(),progressSteps:Ta()};return Z.domCache.set(n,e),e},gy=(n,e,t)=>{const r=ki();Re(r),e.timer&&(n.timeout=new Yw(()=>{t("timer"),delete n.timeout},e.timer),e.timerProgressBar&&r&&(ve(r),je(r,e,"timerProgressBar"),setTimeout(()=>{n.timeout&&n.timeout.running&&Ra(e.timer)})))},wy=(n,e)=>{if(!e.toast){if(!Si(e.allowEnterKey)){Nh("allowEnterKey","preConfirm: () => false"),n.popup.focus();return}yy(n)||_y(n,e)||zo(-1,1)}},yy=n=>{const e=Array.from(n.popup.querySelectorAll("[autofocus]"));for(const t of e)if(t instanceof HTMLElement&&Ue(t))return t.focus(),!0;return!1},_y=(n,e)=>e.focusDeny&&Ue(n.denyButton)?(n.denyButton.focus(),!0):e.focusCancel&&Ue(n.cancelButton)?(n.cancelButton.focus(),!0):e.focusConfirm&&Ue(n.confirmButton)?(n.confirmButton.focus(),!0):!1;le.prototype.disableButtons=cd;le.prototype.enableButtons=ad;le.prototype.getInput=sd;le.prototype.disableInput=ud;le.prototype.enableInput=ld;le.prototype.hideLoading=oi;le.prototype.disableLoading=oi;le.prototype.showValidationMessage=hd;le.prototype.resetValidationMessage=dd;le.prototype.close=Bt;le.prototype.closePopup=Bt;le.prototype.closeModal=Bt;le.prototype.closeToast=Bt;le.prototype.rejectPromise=ed;le.prototype.update=wd;le.prototype._destroy=yd;Object.assign(le,Qw);Object.keys(Sw).forEach(n=>{le[n]=function(...e){if(st&&st[n])return st[n](...e)}});le.DismissReason=ir;le.version="11.26.25";const Je=le;Je.default=Je;typeof document<"u"&&function(n,e){var t=n.createElement("style");if(n.getElementsByTagName("head")[0].appendChild(t),t.styleSheet)t.styleSheet.disabled||(t.styleSheet.cssText=e);else try{t.innerHTML=e}catch{t.innerText=e}}(document,':root{--swal2-outline: 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-container-padding: 0.625em;--swal2-backdrop: rgba(0, 0, 0, 0.4);--swal2-backdrop-transition: background-color 0.15s;--swal2-width: 32em;--swal2-padding: 0 0 1.25em;--swal2-border: none;--swal2-border-radius: 0.3125rem;--swal2-background: white;--swal2-color: #545454;--swal2-show-animation: swal2-show 0.3s;--swal2-hide-animation: swal2-hide 0.15s forwards;--swal2-icon-zoom: 1;--swal2-title-padding: 0.8em 1em 0;--swal2-html-container-padding: 1em 1.6em 0.3em;--swal2-input-border: 1px solid #d9d9d9;--swal2-input-border-radius: 0.1875em;--swal2-input-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-background: transparent;--swal2-input-transition: border-color 0.2s, box-shadow 0.2s;--swal2-input-hover-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-focus-border: 1px solid #b4dbed;--swal2-input-focus-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-progress-step-background: #add8e6;--swal2-validation-message-background: #f0f0f0;--swal2-validation-message-color: #666;--swal2-footer-border-color: #eee;--swal2-footer-background: transparent;--swal2-footer-color: inherit;--swal2-timer-progress-bar-background: rgba(0, 0, 0, 0.3);--swal2-close-button-position: initial;--swal2-close-button-inset: auto;--swal2-close-button-font-size: 2.5em;--swal2-close-button-color: #ccc;--swal2-close-button-transition: color 0.2s, box-shadow 0.2s;--swal2-close-button-outline: initial;--swal2-close-button-box-shadow: inset 0 0 0 3px transparent;--swal2-close-button-focus-box-shadow: inset var(--swal2-outline);--swal2-close-button-hover-transform: none;--swal2-actions-justify-content: center;--swal2-actions-width: auto;--swal2-actions-margin: 1.25em auto 0;--swal2-actions-padding: 0;--swal2-actions-border-radius: 0;--swal2-actions-background: transparent;--swal2-action-button-transition: background-color 0.2s, box-shadow 0.2s;--swal2-action-button-hover: black 10%;--swal2-action-button-active: black 10%;--swal2-confirm-button-box-shadow: none;--swal2-confirm-button-border-radius: 0.25em;--swal2-confirm-button-background-color: #7066e0;--swal2-confirm-button-color: #fff;--swal2-deny-button-box-shadow: none;--swal2-deny-button-border-radius: 0.25em;--swal2-deny-button-background-color: #dc3741;--swal2-deny-button-color: #fff;--swal2-cancel-button-box-shadow: none;--swal2-cancel-button-border-radius: 0.25em;--swal2-cancel-button-background-color: #6e7881;--swal2-cancel-button-color: #fff;--swal2-toast-show-animation: swal2-toast-show 0.5s;--swal2-toast-hide-animation: swal2-toast-hide 0.1s forwards;--swal2-toast-border: none;--swal2-toast-box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 1px 2px hsl(0deg 0% 0% / 0.075), 1px 2px 4px hsl(0deg 0% 0% / 0.075), 1px 3px 8px hsl(0deg 0% 0% / 0.075), 2px 4px 16px hsl(0deg 0% 0% / 0.075)}[data-swal2-theme=dark]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}@media(prefers-color-scheme: dark){[data-swal2-theme=auto]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:auto}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px var(--swal2-backdrop)}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}@media print{body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown) .swal2-container{position:static !important}}div:where(.swal2-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:var(--swal2-container-padding);overflow-x:hidden;transition:var(--swal2-backdrop-transition);-webkit-overflow-scrolling:touch}div:where(.swal2-container).swal2-backdrop-show,div:where(.swal2-container).swal2-noanimation{background:var(--swal2-backdrop)}div:where(.swal2-container).swal2-backdrop-hide{background:rgba(0,0,0,0) !important}div:where(.swal2-container).swal2-top-start,div:where(.swal2-container).swal2-center-start,div:where(.swal2-container).swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.swal2-container).swal2-top,div:where(.swal2-container).swal2-center,div:where(.swal2-container).swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.swal2-container).swal2-top-end,div:where(.swal2-container).swal2-center-end,div:where(.swal2-container).swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.swal2-container).swal2-top-start>.swal2-popup{align-self:start}div:where(.swal2-container).swal2-top>.swal2-popup{grid-column:2;place-self:start center}div:where(.swal2-container).swal2-top-end>.swal2-popup,div:where(.swal2-container).swal2-top-right>.swal2-popup{grid-column:3;place-self:start end}div:where(.swal2-container).swal2-center-start>.swal2-popup,div:where(.swal2-container).swal2-center-left>.swal2-popup{grid-row:2;align-self:center}div:where(.swal2-container).swal2-center>.swal2-popup{grid-column:2;grid-row:2;place-self:center center}div:where(.swal2-container).swal2-center-end>.swal2-popup,div:where(.swal2-container).swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;place-self:center end}div:where(.swal2-container).swal2-bottom-start>.swal2-popup,div:where(.swal2-container).swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}div:where(.swal2-container).swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;place-self:end center}div:where(.swal2-container).swal2-bottom-end>.swal2-popup,div:where(.swal2-container).swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;place-self:end end}div:where(.swal2-container).swal2-grow-row>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}div:where(.swal2-container).swal2-grow-column>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}div:where(.swal2-container).swal2-no-transition{transition:none !important}div:where(.swal2-container)[popover]{width:auto;border:0}div:where(.swal2-container) div:where(.swal2-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:var(--swal2-width);max-width:100%;padding:var(--swal2-padding);border:var(--swal2-border);border-radius:var(--swal2-border-radius);background:var(--swal2-background);color:var(--swal2-color);font-family:inherit;font-size:1rem}div:where(.swal2-container) div:where(.swal2-popup):focus{outline:none}div:where(.swal2-container) div:where(.swal2-popup).swal2-loading{overflow-y:hidden}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable{cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable div:where(.swal2-icon){cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging{cursor:grabbing}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging div:where(.swal2-icon){cursor:grabbing}div:where(.swal2-container) h2:where(.swal2-title){position:relative;max-width:100%;margin:0;padding:var(--swal2-title-padding);color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;overflow-wrap:break-word;cursor:initial}div:where(.swal2-container) div:where(.swal2-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:var(--swal2-actions-justify-content);width:var(--swal2-actions-width);margin:var(--swal2-actions-margin);padding:var(--swal2-actions-padding);border-radius:var(--swal2-actions-border-radius);background:var(--swal2-actions-background)}div:where(.swal2-container) div:where(.swal2-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.swal2-container) button:where(.swal2-styled){margin:.3125em;padding:.625em 1.1em;transition:var(--swal2-action-button-transition);border:none;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}div:where(.swal2-container) button:where(.swal2-styled):not([disabled]){cursor:pointer}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm){border-radius:var(--swal2-confirm-button-border-radius);background:initial;background-color:var(--swal2-confirm-button-background-color);box-shadow:var(--swal2-confirm-button-box-shadow);color:var(--swal2-confirm-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):hover{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):active{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny){border-radius:var(--swal2-deny-button-border-radius);background:initial;background-color:var(--swal2-deny-button-background-color);box-shadow:var(--swal2-deny-button-box-shadow);color:var(--swal2-deny-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):hover{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):active{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel){border-radius:var(--swal2-cancel-button-border-radius);background:initial;background-color:var(--swal2-cancel-button-background-color);box-shadow:var(--swal2-cancel-button-box-shadow);color:var(--swal2-cancel-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):hover{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):active{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):focus-visible{outline:none;box-shadow:var(--swal2-action-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-styled)[disabled]:not(.swal2-loading){opacity:.4}div:where(.swal2-container) button:where(.swal2-styled)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-footer){margin:1em 0 0;padding:1em 1em 0;border-top:1px solid var(--swal2-footer-border-color);background:var(--swal2-footer-background);color:var(--swal2-footer-color);font-size:1em;text-align:center;cursor:initial}div:where(.swal2-container) .swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:var(--swal2-border-radius);border-bottom-left-radius:var(--swal2-border-radius)}div:where(.swal2-container) div:where(.swal2-timer-progress-bar){width:100%;height:.25em;background:var(--swal2-timer-progress-bar-background)}div:where(.swal2-container) img:where(.swal2-image){max-width:100%;margin:2em auto 1em;cursor:initial}div:where(.swal2-container) button:where(.swal2-close){position:var(--swal2-close-button-position);inset:var(--swal2-close-button-inset);z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:var(--swal2-close-button-transition);border:none;border-radius:var(--swal2-border-radius);outline:var(--swal2-close-button-outline);background:rgba(0,0,0,0);color:var(--swal2-close-button-color);font-family:monospace;font-size:var(--swal2-close-button-font-size);cursor:pointer;justify-self:end}div:where(.swal2-container) button:where(.swal2-close):hover{transform:var(--swal2-close-button-hover-transform);background:rgba(0,0,0,0);color:#f27474}div:where(.swal2-container) button:where(.swal2-close):focus-visible{outline:none;box-shadow:var(--swal2-close-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-close)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-html-container){z-index:1;justify-content:center;margin:0;padding:var(--swal2-html-container-padding);overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;overflow-wrap:break-word;word-break:break-word;cursor:initial}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea),div:where(.swal2-container) select:where(.swal2-select),div:where(.swal2-container) div:where(.swal2-radio),div:where(.swal2-container) label:where(.swal2-checkbox){margin:1em 2em 3px}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea){box-sizing:border-box;width:auto;transition:var(--swal2-input-transition);border:var(--swal2-input-border);border-radius:var(--swal2-input-border-radius);background:var(--swal2-input-background);box-shadow:var(--swal2-input-box-shadow);color:inherit;font-size:1.125em}div:where(.swal2-container) input:where(.swal2-input).swal2-inputerror,div:where(.swal2-container) input:where(.swal2-file).swal2-inputerror,div:where(.swal2-container) textarea:where(.swal2-textarea).swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}div:where(.swal2-container) input:where(.swal2-input):hover,div:where(.swal2-container) input:where(.swal2-file):hover,div:where(.swal2-container) textarea:where(.swal2-textarea):hover{box-shadow:var(--swal2-input-hover-box-shadow)}div:where(.swal2-container) input:where(.swal2-input):focus,div:where(.swal2-container) input:where(.swal2-file):focus,div:where(.swal2-container) textarea:where(.swal2-textarea):focus{border:var(--swal2-input-focus-border);outline:none;box-shadow:var(--swal2-input-focus-box-shadow)}div:where(.swal2-container) input:where(.swal2-input)::placeholder,div:where(.swal2-container) input:where(.swal2-file)::placeholder,div:where(.swal2-container) textarea:where(.swal2-textarea)::placeholder{color:#ccc}div:where(.swal2-container) .swal2-range{margin:1em 2em 3px;background:var(--swal2-background)}div:where(.swal2-container) .swal2-range input{width:80%}div:where(.swal2-container) .swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}div:where(.swal2-container) .swal2-range input,div:where(.swal2-container) .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}div:where(.swal2-container) .swal2-input{height:2.625em;padding:0 .75em}div:where(.swal2-container) .swal2-file{width:75%;margin-right:auto;margin-left:auto;background:var(--swal2-input-background);font-size:1.125em}div:where(.swal2-container) .swal2-textarea{height:6.75em;padding:.75em}div:where(.swal2-container) .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:var(--swal2-input-background);color:inherit;font-size:1.125em}div:where(.swal2-container) .swal2-radio,div:where(.swal2-container) .swal2-checkbox{align-items:center;justify-content:center;background:var(--swal2-background);color:inherit}div:where(.swal2-container) .swal2-radio label,div:where(.swal2-container) .swal2-checkbox label{margin:0 .6em;font-size:1.125em}div:where(.swal2-container) .swal2-radio input,div:where(.swal2-container) .swal2-checkbox input{flex-shrink:0;margin:0 .4em}div:where(.swal2-container) label:where(.swal2-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.swal2-container) div:where(.swal2-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:var(--swal2-validation-message-background);color:var(--swal2-validation-message-color);font-size:1em;font-weight:300}div:where(.swal2-container) div:where(.swal2-validation-message)::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}div:where(.swal2-container) .swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}div:where(.swal2-container) .swal2-progress-steps li{display:inline-block;position:relative}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:var(--swal2-progress-step-background);color:#fff}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:var(--swal2-progress-step-background)}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.swal2-icon){position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;zoom:var(--swal2-icon-zoom);border:.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}div:where(.swal2-icon) .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.swal2-icon).swal2-error{border-color:#f27474;color:#f27474}div:where(.swal2-icon).swal2-error .swal2-x-mark{position:relative;flex-grow:1}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}div:where(.swal2-icon).swal2-warning{border-color:#f8bb86;color:#f8bb86}div:where(.swal2-icon).swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}div:where(.swal2-icon).swal2-info{border-color:#3fc3ee;color:#3fc3ee}div:where(.swal2-icon).swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}div:where(.swal2-icon).swal2-question{border-color:#87adbd;color:#87adbd}div:where(.swal2-icon).swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}div:where(.swal2-icon).swal2-success{border-color:#a5dc86;color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;border-radius:50%}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}div:where(.swal2-icon).swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}div:where(.swal2-icon).swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:var(--swal2-show-animation)}.swal2-hide{animation:var(--swal2-hide-animation)}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;border:var(--swal2-toast-border);background:var(--swal2-background);box-shadow:var(--swal2-toast-box-shadow);pointer-events:auto}.swal2-toast>*{grid-column:2}.swal2-toast h2:where(.swal2-title){margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-toast .swal2-loading{justify-content:center}.swal2-toast input:where(.swal2-input){height:2em;margin:.5em;font-size:1em}.swal2-toast .swal2-validation-message{font-size:1em}.swal2-toast div:where(.swal2-footer){margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-toast button:where(.swal2-close){grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-toast div:where(.swal2-html-container){margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-toast div:where(.swal2-html-container):empty{padding:0}.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-toast div:where(.swal2-actions){justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-toast button:where(.swal2-styled){margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;border-radius:50%}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-toast.swal2-show{animation:var(--swal2-toast-show-animation)}.swal2-toast.swal2-hide{animation:var(--swal2-toast-hide-animation)}@keyframes swal2-show{0%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}100%{transform:translate3d(0, 0, 0) scale(1);opacity:1}}@keyframes swal2-hide{0%{transform:translate3d(0, 0, 0) scale(1);opacity:1}100%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}');const vy=()=>{};var Ql={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Td=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Ey=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Ad={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,m=i>>2,p=(i&3)<<4|l>>4;let E=(l&15)<<2|d>>6,C=d&63;u||(C=64,a||(E=64)),r.push(t[m],t[p],t[E],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Td(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Ey(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||d==null||p==null)throw new by;const E=i<<2|l>>4;if(r.push(E),d!==64){const C=l<<4&240|d>>2;if(r.push(C),p!==64){const D=d<<6&192|p;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class by extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Iy=function(n){const e=Td(n);return Ad.encodeByteArray(e,!0)},li=function(n){return Iy(n).replace(/\./g,"")},Pd=function(n){try{return Ad.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ty(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ay=()=>Ty().__FIREBASE_DEFAULTS__,Py=()=>{if(typeof process>"u"||typeof Ql>"u")return;const n=Ql.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Cy=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Pd(n[1]);return e&&JSON.parse(e)},Vi=()=>{try{return vy()||Ay()||Py()||Cy()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Cd=n=>{var e,t;return(t=(e=Vi())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Sy=n=>{const e=Cd(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Sd=()=>{var n;return(n=Vi())==null?void 0:n.config},Rd=n=>{var e;return(e=Vi())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ry{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function or(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function kd(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ky(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[li(JSON.stringify(t)),li(JSON.stringify(a)),""].join(".")}const $r={};function Dy(){const n={prod:[],emulator:[]};for(const e of Object.keys($r))$r[e]?n.emulator.push(e):n.prod.push(e);return n}function xy(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Yl=!1;function Dd(n,e){if(typeof window>"u"||typeof document>"u"||!or(window.location.host)||$r[n]===e||$r[n]||Yl)return;$r[n]=e;function t(E){return`__firebase__banner__${E}`}const r="__firebase__banner",i=Dy().prod.length>0;function a(){const E=document.getElementById(r);E&&E.remove()}function l(E){E.style.display="flex",E.style.background="#7faaf0",E.style.position="fixed",E.style.bottom="5px",E.style.left="5px",E.style.padding=".5em",E.style.borderRadius="5px",E.style.alignItems="center"}function u(E,C){E.setAttribute("width","24"),E.setAttribute("id",C),E.setAttribute("height","24"),E.setAttribute("viewBox","0 0 24 24"),E.setAttribute("fill","none"),E.style.marginLeft="-6px"}function d(){const E=document.createElement("span");return E.style.cursor="pointer",E.style.marginLeft="16px",E.style.fontSize="24px",E.innerHTML=" &times;",E.onclick=()=>{Yl=!0,a()},E}function m(E,C){E.setAttribute("id",C),E.innerText="Learn more",E.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",E.setAttribute("target","__blank"),E.style.paddingLeft="5px",E.style.textDecoration="underline"}function p(){const E=xy(r),C=t("text"),D=document.getElementById(C)||document.createElement("span"),N=t("learnmore"),k=document.getElementById(N)||document.createElement("a"),B=t("preprendIcon"),j=document.getElementById(B)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(E.created){const K=E.element;l(K),m(k,N);const ue=d();u(j,B),K.append(j,D,k,ue),document.body.appendChild(K)}i?(D.innerText="Preview backend disconnected.",j.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(j.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,D.innerText="Preview backend running in this workspace."),D.setAttribute("id",C)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ke(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Vy(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ke())}function Ny(){var e;const n=(e=Vi())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Ly(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Oy(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function My(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function By(){const n=ke();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Fy(){return!Ny()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Uy(){try{return typeof indexedDB=="object"}catch{return!1}}function $y(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qy="FirebaseError";class At extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=qy,Object.setPrototypeOf(this,At.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,us.prototype.create)}}class us{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?jy(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new At(s,l,r)}}function jy(n,e){return n.replace(zy,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const zy=/\{\$([^}]+)}/g;function Hy(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function _n(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Xl(i)&&Xl(a)){if(!_n(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Xl(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hs(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function xr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Vr(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Wy(n,e){const t=new Gy(n,e);return t.subscribe.bind(t)}class Gy{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Ky(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Po),s.error===void 0&&(s.error=Po),s.complete===void 0&&(s.complete=Po);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ky(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Po(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(n){return n&&n._delegate?n._delegate:n}class vn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Ry;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xy(e))try{this.getOrInitializeService({instanceIdentifier:dn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=dn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=dn){return this.instances.has(e)}getOptions(e=dn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Yy(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=dn){return this.component?this.component.multipleInstances?e:dn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Yy(n){return n===dn?void 0:n}function Xy(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jy{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Qy(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var H;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(H||(H={}));const Zy={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},e_=H.INFO,t_={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},n_=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=t_[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Oa{constructor(e){this.name=e,this._logLevel=e_,this._logHandler=n_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Zy[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}}const r_=(n,e)=>e.some(t=>n instanceof t);let Jl,Zl;function s_(){return Jl||(Jl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function i_(){return Zl||(Zl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const xd=new WeakMap,Go=new WeakMap,Vd=new WeakMap,Co=new WeakMap,Ma=new WeakMap;function o_(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t($t(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&xd.set(t,n)}).catch(()=>{}),Ma.set(e,n),e}function a_(n){if(Go.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Go.set(n,e)}let Ko={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Go.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Vd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return $t(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function c_(n){Ko=n(Ko)}function l_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(So(this),e,...t);return Vd.set(r,e.sort?e.sort():[e]),$t(r)}:i_().includes(n)?function(...e){return n.apply(So(this),e),$t(xd.get(this))}:function(...e){return $t(n.apply(So(this),e))}}function u_(n){return typeof n=="function"?l_(n):(n instanceof IDBTransaction&&a_(n),r_(n,s_())?new Proxy(n,Ko):n)}function $t(n){if(n instanceof IDBRequest)return o_(n);if(Co.has(n))return Co.get(n);const e=u_(n);return e!==n&&(Co.set(n,e),Ma.set(e,n)),e}const So=n=>Ma.get(n);function h_(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=$t(a);return r&&a.addEventListener("upgradeneeded",u=>{r($t(a.result),u.oldVersion,u.newVersion,$t(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const d_=["get","getKey","getAll","getAllKeys","count"],f_=["put","add","delete","clear"],Ro=new Map;function eu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ro.get(e))return Ro.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=f_.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||d_.includes(t)))return;const i=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[t](...l),s&&u.done]))[0]};return Ro.set(e,i),i}c_(n=>({...n,get:(e,t,r)=>eu(e,t)||n.get(e,t,r),has:(e,t)=>!!eu(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(p_(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function p_(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Qo="@firebase/app",tu="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vt=new Oa("@firebase/app"),g_="@firebase/app-compat",w_="@firebase/analytics-compat",y_="@firebase/analytics",__="@firebase/app-check-compat",v_="@firebase/app-check",E_="@firebase/auth",b_="@firebase/auth-compat",I_="@firebase/database",T_="@firebase/data-connect",A_="@firebase/database-compat",P_="@firebase/functions",C_="@firebase/functions-compat",S_="@firebase/installations",R_="@firebase/installations-compat",k_="@firebase/messaging",D_="@firebase/messaging-compat",x_="@firebase/performance",V_="@firebase/performance-compat",N_="@firebase/remote-config",L_="@firebase/remote-config-compat",O_="@firebase/storage",M_="@firebase/storage-compat",B_="@firebase/firestore",F_="@firebase/ai",U_="@firebase/firestore-compat",$_="firebase",q_="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yo="[DEFAULT]",j_={[Qo]:"fire-core",[g_]:"fire-core-compat",[y_]:"fire-analytics",[w_]:"fire-analytics-compat",[v_]:"fire-app-check",[__]:"fire-app-check-compat",[E_]:"fire-auth",[b_]:"fire-auth-compat",[I_]:"fire-rtdb",[T_]:"fire-data-connect",[A_]:"fire-rtdb-compat",[P_]:"fire-fn",[C_]:"fire-fn-compat",[S_]:"fire-iid",[R_]:"fire-iid-compat",[k_]:"fire-fcm",[D_]:"fire-fcm-compat",[x_]:"fire-perf",[V_]:"fire-perf-compat",[N_]:"fire-rc",[L_]:"fire-rc-compat",[O_]:"fire-gcs",[M_]:"fire-gcs-compat",[B_]:"fire-fst",[U_]:"fire-fst-compat",[F_]:"fire-vertex","fire-js":"fire-js",[$_]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ui=new Map,z_=new Map,Xo=new Map;function nu(n,e){try{n.container.addComponent(e)}catch(t){vt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Gn(n){const e=n.name;if(Xo.has(e))return vt.debug(`There were multiple attempts to register component ${e}.`),!1;Xo.set(e,n);for(const t of ui.values())nu(t,n);for(const t of z_.values())nu(t,n);return!0}function Ba(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Qe(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},qt=new us("app","Firebase",H_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new vn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw qt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar=q_;function Nd(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Yo,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw qt.create("bad-app-name",{appName:String(s)});if(t||(t=Sd()),!t)throw qt.create("no-options");const i=ui.get(s);if(i){if(_n(t,i.options)&&_n(r,i.config))return i;throw qt.create("duplicate-app",{appName:s})}const a=new Jy(s);for(const u of Xo.values())a.addComponent(u);const l=new W_(t,r,a);return ui.set(s,l),l}function Ld(n=Yo){const e=ui.get(n);if(!e&&n===Yo&&Sd())return Nd();if(!e)throw qt.create("no-app",{appName:n});return e}function jt(n,e,t){let r=j_[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),vt.warn(a.join(" "));return}Gn(new vn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G_="firebase-heartbeat-database",K_=1,Kr="firebase-heartbeat-store";let ko=null;function Od(){return ko||(ko=h_(G_,K_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Kr)}catch(t){console.warn(t)}}}}).catch(n=>{throw qt.create("idb-open",{originalErrorMessage:n.message})})),ko}async function Q_(n){try{const t=(await Od()).transaction(Kr),r=await t.objectStore(Kr).get(Md(n));return await t.done,r}catch(e){if(e instanceof At)vt.warn(e.message);else{const t=qt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});vt.warn(t.message)}}}async function ru(n,e){try{const r=(await Od()).transaction(Kr,"readwrite");await r.objectStore(Kr).put(e,Md(n)),await r.done}catch(t){if(t instanceof At)vt.warn(t.message);else{const r=qt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});vt.warn(r.message)}}}function Md(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y_=1024,X_=30;class J_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ev(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=su();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>X_){const a=tv(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){vt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=su(),{heartbeatsToSend:r,unsentEntries:s}=Z_(this._heartbeatsCache.heartbeats),i=li(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return vt.warn(t),""}}}function su(){return new Date().toISOString().substring(0,10)}function Z_(n,e=Y_){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),iu(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),iu(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class ev{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Uy()?$y().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Q_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return ru(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return ru(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function iu(n){return li(JSON.stringify({version:2,heartbeats:n})).length}function tv(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nv(n){Gn(new vn("platform-logger",e=>new m_(e),"PRIVATE")),Gn(new vn("heartbeat",e=>new J_(e),"PRIVATE")),jt(Qo,tu,n),jt(Qo,tu,"esm2020"),jt("fire-js","")}nv("");var rv="firebase",sv="12.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */jt(rv,sv,"app");var ou=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var zt,Bd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(_,g){function w(){}w.prototype=g.prototype,_.F=g.prototype,_.prototype=new w,_.prototype.constructor=_,_.D=function(b,v,T){for(var y=Array(arguments.length-2),Oe=2;Oe<arguments.length;Oe++)y[Oe-2]=arguments[Oe];return g.prototype[v].apply(b,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(_,g,w){w||(w=0);const b=Array(16);if(typeof g=="string")for(var v=0;v<16;++v)b[v]=g.charCodeAt(w++)|g.charCodeAt(w++)<<8|g.charCodeAt(w++)<<16|g.charCodeAt(w++)<<24;else for(v=0;v<16;++v)b[v]=g[w++]|g[w++]<<8|g[w++]<<16|g[w++]<<24;g=_.g[0],w=_.g[1],v=_.g[2];let T=_.g[3],y;y=g+(T^w&(v^T))+b[0]+3614090360&4294967295,g=w+(y<<7&4294967295|y>>>25),y=T+(v^g&(w^v))+b[1]+3905402710&4294967295,T=g+(y<<12&4294967295|y>>>20),y=v+(w^T&(g^w))+b[2]+606105819&4294967295,v=T+(y<<17&4294967295|y>>>15),y=w+(g^v&(T^g))+b[3]+3250441966&4294967295,w=v+(y<<22&4294967295|y>>>10),y=g+(T^w&(v^T))+b[4]+4118548399&4294967295,g=w+(y<<7&4294967295|y>>>25),y=T+(v^g&(w^v))+b[5]+1200080426&4294967295,T=g+(y<<12&4294967295|y>>>20),y=v+(w^T&(g^w))+b[6]+2821735955&4294967295,v=T+(y<<17&4294967295|y>>>15),y=w+(g^v&(T^g))+b[7]+4249261313&4294967295,w=v+(y<<22&4294967295|y>>>10),y=g+(T^w&(v^T))+b[8]+1770035416&4294967295,g=w+(y<<7&4294967295|y>>>25),y=T+(v^g&(w^v))+b[9]+2336552879&4294967295,T=g+(y<<12&4294967295|y>>>20),y=v+(w^T&(g^w))+b[10]+4294925233&4294967295,v=T+(y<<17&4294967295|y>>>15),y=w+(g^v&(T^g))+b[11]+2304563134&4294967295,w=v+(y<<22&4294967295|y>>>10),y=g+(T^w&(v^T))+b[12]+1804603682&4294967295,g=w+(y<<7&4294967295|y>>>25),y=T+(v^g&(w^v))+b[13]+4254626195&4294967295,T=g+(y<<12&4294967295|y>>>20),y=v+(w^T&(g^w))+b[14]+2792965006&4294967295,v=T+(y<<17&4294967295|y>>>15),y=w+(g^v&(T^g))+b[15]+1236535329&4294967295,w=v+(y<<22&4294967295|y>>>10),y=g+(v^T&(w^v))+b[1]+4129170786&4294967295,g=w+(y<<5&4294967295|y>>>27),y=T+(w^v&(g^w))+b[6]+3225465664&4294967295,T=g+(y<<9&4294967295|y>>>23),y=v+(g^w&(T^g))+b[11]+643717713&4294967295,v=T+(y<<14&4294967295|y>>>18),y=w+(T^g&(v^T))+b[0]+3921069994&4294967295,w=v+(y<<20&4294967295|y>>>12),y=g+(v^T&(w^v))+b[5]+3593408605&4294967295,g=w+(y<<5&4294967295|y>>>27),y=T+(w^v&(g^w))+b[10]+38016083&4294967295,T=g+(y<<9&4294967295|y>>>23),y=v+(g^w&(T^g))+b[15]+3634488961&4294967295,v=T+(y<<14&4294967295|y>>>18),y=w+(T^g&(v^T))+b[4]+3889429448&4294967295,w=v+(y<<20&4294967295|y>>>12),y=g+(v^T&(w^v))+b[9]+568446438&4294967295,g=w+(y<<5&4294967295|y>>>27),y=T+(w^v&(g^w))+b[14]+3275163606&4294967295,T=g+(y<<9&4294967295|y>>>23),y=v+(g^w&(T^g))+b[3]+4107603335&4294967295,v=T+(y<<14&4294967295|y>>>18),y=w+(T^g&(v^T))+b[8]+1163531501&4294967295,w=v+(y<<20&4294967295|y>>>12),y=g+(v^T&(w^v))+b[13]+2850285829&4294967295,g=w+(y<<5&4294967295|y>>>27),y=T+(w^v&(g^w))+b[2]+4243563512&4294967295,T=g+(y<<9&4294967295|y>>>23),y=v+(g^w&(T^g))+b[7]+1735328473&4294967295,v=T+(y<<14&4294967295|y>>>18),y=w+(T^g&(v^T))+b[12]+2368359562&4294967295,w=v+(y<<20&4294967295|y>>>12),y=g+(w^v^T)+b[5]+4294588738&4294967295,g=w+(y<<4&4294967295|y>>>28),y=T+(g^w^v)+b[8]+2272392833&4294967295,T=g+(y<<11&4294967295|y>>>21),y=v+(T^g^w)+b[11]+1839030562&4294967295,v=T+(y<<16&4294967295|y>>>16),y=w+(v^T^g)+b[14]+4259657740&4294967295,w=v+(y<<23&4294967295|y>>>9),y=g+(w^v^T)+b[1]+2763975236&4294967295,g=w+(y<<4&4294967295|y>>>28),y=T+(g^w^v)+b[4]+1272893353&4294967295,T=g+(y<<11&4294967295|y>>>21),y=v+(T^g^w)+b[7]+4139469664&4294967295,v=T+(y<<16&4294967295|y>>>16),y=w+(v^T^g)+b[10]+3200236656&4294967295,w=v+(y<<23&4294967295|y>>>9),y=g+(w^v^T)+b[13]+681279174&4294967295,g=w+(y<<4&4294967295|y>>>28),y=T+(g^w^v)+b[0]+3936430074&4294967295,T=g+(y<<11&4294967295|y>>>21),y=v+(T^g^w)+b[3]+3572445317&4294967295,v=T+(y<<16&4294967295|y>>>16),y=w+(v^T^g)+b[6]+76029189&4294967295,w=v+(y<<23&4294967295|y>>>9),y=g+(w^v^T)+b[9]+3654602809&4294967295,g=w+(y<<4&4294967295|y>>>28),y=T+(g^w^v)+b[12]+3873151461&4294967295,T=g+(y<<11&4294967295|y>>>21),y=v+(T^g^w)+b[15]+530742520&4294967295,v=T+(y<<16&4294967295|y>>>16),y=w+(v^T^g)+b[2]+3299628645&4294967295,w=v+(y<<23&4294967295|y>>>9),y=g+(v^(w|~T))+b[0]+4096336452&4294967295,g=w+(y<<6&4294967295|y>>>26),y=T+(w^(g|~v))+b[7]+1126891415&4294967295,T=g+(y<<10&4294967295|y>>>22),y=v+(g^(T|~w))+b[14]+2878612391&4294967295,v=T+(y<<15&4294967295|y>>>17),y=w+(T^(v|~g))+b[5]+4237533241&4294967295,w=v+(y<<21&4294967295|y>>>11),y=g+(v^(w|~T))+b[12]+1700485571&4294967295,g=w+(y<<6&4294967295|y>>>26),y=T+(w^(g|~v))+b[3]+2399980690&4294967295,T=g+(y<<10&4294967295|y>>>22),y=v+(g^(T|~w))+b[10]+4293915773&4294967295,v=T+(y<<15&4294967295|y>>>17),y=w+(T^(v|~g))+b[1]+2240044497&4294967295,w=v+(y<<21&4294967295|y>>>11),y=g+(v^(w|~T))+b[8]+1873313359&4294967295,g=w+(y<<6&4294967295|y>>>26),y=T+(w^(g|~v))+b[15]+4264355552&4294967295,T=g+(y<<10&4294967295|y>>>22),y=v+(g^(T|~w))+b[6]+2734768916&4294967295,v=T+(y<<15&4294967295|y>>>17),y=w+(T^(v|~g))+b[13]+1309151649&4294967295,w=v+(y<<21&4294967295|y>>>11),y=g+(v^(w|~T))+b[4]+4149444226&4294967295,g=w+(y<<6&4294967295|y>>>26),y=T+(w^(g|~v))+b[11]+3174756917&4294967295,T=g+(y<<10&4294967295|y>>>22),y=v+(g^(T|~w))+b[2]+718787259&4294967295,v=T+(y<<15&4294967295|y>>>17),y=w+(T^(v|~g))+b[9]+3951481745&4294967295,_.g[0]=_.g[0]+g&4294967295,_.g[1]=_.g[1]+(v+(y<<21&4294967295|y>>>11))&4294967295,_.g[2]=_.g[2]+v&4294967295,_.g[3]=_.g[3]+T&4294967295}r.prototype.v=function(_,g){g===void 0&&(g=_.length);const w=g-this.blockSize,b=this.C;let v=this.h,T=0;for(;T<g;){if(v==0)for(;T<=w;)s(this,_,T),T+=this.blockSize;if(typeof _=="string"){for(;T<g;)if(b[v++]=_.charCodeAt(T++),v==this.blockSize){s(this,b),v=0;break}}else for(;T<g;)if(b[v++]=_[T++],v==this.blockSize){s(this,b),v=0;break}}this.h=v,this.o+=g},r.prototype.A=function(){var _=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);_[0]=128;for(var g=1;g<_.length-8;++g)_[g]=0;g=this.o*8;for(var w=_.length-8;w<_.length;++w)_[w]=g&255,g/=256;for(this.v(_),_=Array(16),g=0,w=0;w<4;++w)for(let b=0;b<32;b+=8)_[g++]=this.g[w]>>>b&255;return _};function i(_,g){var w=l;return Object.prototype.hasOwnProperty.call(w,_)?w[_]:w[_]=g(_)}function a(_,g){this.h=g;const w=[];let b=!0;for(let v=_.length-1;v>=0;v--){const T=_[v]|0;b&&T==g||(w[v]=T,b=!1)}this.g=w}var l={};function u(_){return-128<=_&&_<128?i(_,function(g){return new a([g|0],g<0?-1:0)}):new a([_|0],_<0?-1:0)}function d(_){if(isNaN(_)||!isFinite(_))return p;if(_<0)return k(d(-_));const g=[];let w=1;for(let b=0;_>=w;b++)g[b]=_/w|0,w*=4294967296;return new a(g,0)}function m(_,g){if(_.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(_.charAt(0)=="-")return k(m(_.substring(1),g));if(_.indexOf("-")>=0)throw Error('number format error: interior "-" character');const w=d(Math.pow(g,8));let b=p;for(let T=0;T<_.length;T+=8){var v=Math.min(8,_.length-T);const y=parseInt(_.substring(T,T+v),g);v<8?(v=d(Math.pow(g,v)),b=b.j(v).add(d(y))):(b=b.j(w),b=b.add(d(y)))}return b}var p=u(0),E=u(1),C=u(16777216);n=a.prototype,n.m=function(){if(N(this))return-k(this).m();let _=0,g=1;for(let w=0;w<this.g.length;w++){const b=this.i(w);_+=(b>=0?b:4294967296+b)*g,g*=4294967296}return _},n.toString=function(_){if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(D(this))return"0";if(N(this))return"-"+k(this).toString(_);const g=d(Math.pow(_,6));var w=this;let b="";for(;;){const v=ue(w,g).g;w=B(w,v.j(g));let T=((w.g.length>0?w.g[0]:w.h)>>>0).toString(_);if(w=v,D(w))return T+b;for(;T.length<6;)T="0"+T;b=T+b}},n.i=function(_){return _<0?0:_<this.g.length?this.g[_]:this.h};function D(_){if(_.h!=0)return!1;for(let g=0;g<_.g.length;g++)if(_.g[g]!=0)return!1;return!0}function N(_){return _.h==-1}n.l=function(_){return _=B(this,_),N(_)?-1:D(_)?0:1};function k(_){const g=_.g.length,w=[];for(let b=0;b<g;b++)w[b]=~_.g[b];return new a(w,~_.h).add(E)}n.abs=function(){return N(this)?k(this):this},n.add=function(_){const g=Math.max(this.g.length,_.g.length),w=[];let b=0;for(let v=0;v<=g;v++){let T=b+(this.i(v)&65535)+(_.i(v)&65535),y=(T>>>16)+(this.i(v)>>>16)+(_.i(v)>>>16);b=y>>>16,T&=65535,y&=65535,w[v]=y<<16|T}return new a(w,w[w.length-1]&-2147483648?-1:0)};function B(_,g){return _.add(k(g))}n.j=function(_){if(D(this)||D(_))return p;if(N(this))return N(_)?k(this).j(k(_)):k(k(this).j(_));if(N(_))return k(this.j(k(_)));if(this.l(C)<0&&_.l(C)<0)return d(this.m()*_.m());const g=this.g.length+_.g.length,w=[];for(var b=0;b<2*g;b++)w[b]=0;for(b=0;b<this.g.length;b++)for(let v=0;v<_.g.length;v++){const T=this.i(b)>>>16,y=this.i(b)&65535,Oe=_.i(v)>>>16,sn=_.i(v)&65535;w[2*b+2*v]+=y*sn,j(w,2*b+2*v),w[2*b+2*v+1]+=T*sn,j(w,2*b+2*v+1),w[2*b+2*v+1]+=y*Oe,j(w,2*b+2*v+1),w[2*b+2*v+2]+=T*Oe,j(w,2*b+2*v+2)}for(_=0;_<g;_++)w[_]=w[2*_+1]<<16|w[2*_];for(_=g;_<2*g;_++)w[_]=0;return new a(w,0)};function j(_,g){for(;(_[g]&65535)!=_[g];)_[g+1]+=_[g]>>>16,_[g]&=65535,g++}function K(_,g){this.g=_,this.h=g}function ue(_,g){if(D(g))throw Error("division by zero");if(D(_))return new K(p,p);if(N(_))return g=ue(k(_),g),new K(k(g.g),k(g.h));if(N(g))return g=ue(_,k(g)),new K(k(g.g),g.h);if(_.g.length>30){if(N(_)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var w=E,b=g;b.l(_)<=0;)w=De(w),b=De(b);var v=oe(w,1),T=oe(b,1);for(b=oe(b,2),w=oe(w,2);!D(b);){var y=T.add(b);y.l(_)<=0&&(v=v.add(w),T=y),b=oe(b,1),w=oe(w,1)}return g=B(_,v.j(g)),new K(v,g)}for(v=p;_.l(g)>=0;){for(w=Math.max(1,Math.floor(_.m()/g.m())),b=Math.ceil(Math.log(w)/Math.LN2),b=b<=48?1:Math.pow(2,b-48),T=d(w),y=T.j(g);N(y)||y.l(_)>0;)w-=b,T=d(w),y=T.j(g);D(T)&&(T=E),v=v.add(T),_=B(_,y)}return new K(v,_)}n.B=function(_){return ue(this,_).h},n.and=function(_){const g=Math.max(this.g.length,_.g.length),w=[];for(let b=0;b<g;b++)w[b]=this.i(b)&_.i(b);return new a(w,this.h&_.h)},n.or=function(_){const g=Math.max(this.g.length,_.g.length),w=[];for(let b=0;b<g;b++)w[b]=this.i(b)|_.i(b);return new a(w,this.h|_.h)},n.xor=function(_){const g=Math.max(this.g.length,_.g.length),w=[];for(let b=0;b<g;b++)w[b]=this.i(b)^_.i(b);return new a(w,this.h^_.h)};function De(_){const g=_.g.length+1,w=[];for(let b=0;b<g;b++)w[b]=_.i(b)<<1|_.i(b-1)>>>31;return new a(w,_.h)}function oe(_,g){const w=g>>5;g%=32;const b=_.g.length-w,v=[];for(let T=0;T<b;T++)v[T]=g>0?_.i(T+w)>>>g|_.i(T+w+1)<<32-g:_.i(T+w);return new a(v,_.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Bd=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,zt=a}).apply(typeof ou<"u"?ou:typeof self<"u"?self:typeof window<"u"?window:{});var Bs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Fd,Nr,Ud,zs,Jo,$d,qd,jd;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Bs=="object"&&Bs];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,c){if(c)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var I=o[f];if(!(I in h))break e;h=h[I]}o=o[o.length-1],f=h[o],c=c(f),c!=f&&c!=null&&e(h,o,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(c){var h=[],f;for(f in c)Object.prototype.hasOwnProperty.call(c,f)&&h.push([f,c[f]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function l(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function u(o,c,h){return o.call.apply(o.bind,arguments)}function d(o,c,h){return d=u,d.apply(null,arguments)}function m(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function p(o,c){function h(){}h.prototype=c.prototype,o.Z=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(f,I,A){for(var x=Array(arguments.length-2),z=2;z<arguments.length;z++)x[z-2]=arguments[z];return c.prototype[I].apply(f,x)}}var E=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function C(o){const c=o.length;if(c>0){const h=Array(c);for(let f=0;f<c;f++)h[f]=o[f];return h}return[]}function D(o,c){for(let f=1;f<arguments.length;f++){const I=arguments[f];var h=typeof I;if(h=h!="object"?h:I?Array.isArray(I)?"array":h:"null",h=="array"||h=="object"&&typeof I.length=="number"){h=o.length||0;const A=I.length||0;o.length=h+A;for(let x=0;x<A;x++)o[h+x]=I[x]}else o.push(I)}}class N{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function k(o){a.setTimeout(()=>{throw o},0)}function B(){var o=_;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class j{constructor(){this.h=this.g=null}add(c,h){const f=K.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var K=new N(()=>new ue,o=>o.reset());class ue{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let De,oe=!1,_=new j,g=()=>{const o=Promise.resolve(void 0);De=()=>{o.then(w)}};function w(){for(var o;o=B();){try{o.h.call(o.g)}catch(h){k(h)}var c=K;c.j(o),c.h<100&&(c.h++,o.next=c.g,c.g=o)}oe=!1}function b(){this.u=this.u,this.C=this.C}b.prototype.u=!1,b.prototype.dispose=function(){this.u||(this.u=!0,this.N())},b.prototype[Symbol.dispose]=function(){this.dispose()},b.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function v(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}v.prototype.h=function(){this.defaultPrevented=!0};var T=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,c),a.removeEventListener("test",h,c)}catch{}return o}();function y(o){return/^[\s\xa0]*$/.test(o)}function Oe(o,c){v.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,c)}p(Oe,v),Oe.prototype.init=function(o,c){const h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget,c||(h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement)),this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Oe.Z.h.call(this)},Oe.prototype.h=function(){Oe.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var sn="closure_listenable_"+(Math.random()*1e6|0),Xm=0;function Jm(o,c,h,f,I){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=I,this.key=++Xm,this.da=this.fa=!1}function bs(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Is(o,c,h){for(const f in o)c.call(h,o[f],f,o)}function Zm(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function Mc(o){const c={};for(const h in o)c[h]=o[h];return c}const Bc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Fc(o,c){let h,f;for(let I=1;I<arguments.length;I++){f=arguments[I];for(h in f)o[h]=f[h];for(let A=0;A<Bc.length;A++)h=Bc[A],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function Ts(o){this.src=o,this.g={},this.h=0}Ts.prototype.add=function(o,c,h,f,I){const A=o.toString();o=this.g[A],o||(o=this.g[A]=[],this.h++);const x=eo(o,c,f,I);return x>-1?(c=o[x],h||(c.fa=!1)):(c=new Jm(c,this.src,A,!!f,I),c.fa=h,o.push(c)),c};function Zi(o,c){const h=c.type;if(h in o.g){var f=o.g[h],I=Array.prototype.indexOf.call(f,c,void 0),A;(A=I>=0)&&Array.prototype.splice.call(f,I,1),A&&(bs(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function eo(o,c,h,f){for(let I=0;I<o.length;++I){const A=o[I];if(!A.da&&A.listener==c&&A.capture==!!h&&A.ha==f)return I}return-1}var to="closure_lm_"+(Math.random()*1e6|0),no={};function Uc(o,c,h,f,I){if(Array.isArray(c)){for(let A=0;A<c.length;A++)Uc(o,c[A],h,f,I);return null}return h=jc(h),o&&o[sn]?o.J(c,h,l(f)?!!f.capture:!1,I):ep(o,c,h,!1,f,I)}function ep(o,c,h,f,I,A){if(!c)throw Error("Invalid event type");const x=l(I)?!!I.capture:!!I;let z=so(o);if(z||(o[to]=z=new Ts(o)),h=z.add(c,h,f,x,A),h.proxy)return h;if(f=tp(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)T||(I=x),I===void 0&&(I=!1),o.addEventListener(c.toString(),f,I);else if(o.attachEvent)o.attachEvent(qc(c.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function tp(){function o(h){return c.call(o.src,o.listener,h)}const c=np;return o}function $c(o,c,h,f,I){if(Array.isArray(c))for(var A=0;A<c.length;A++)$c(o,c[A],h,f,I);else f=l(f)?!!f.capture:!!f,h=jc(h),o&&o[sn]?(o=o.i,A=String(c).toString(),A in o.g&&(c=o.g[A],h=eo(c,h,f,I),h>-1&&(bs(c[h]),Array.prototype.splice.call(c,h,1),c.length==0&&(delete o.g[A],o.h--)))):o&&(o=so(o))&&(c=o.g[c.toString()],o=-1,c&&(o=eo(c,h,f,I)),(h=o>-1?c[o]:null)&&ro(h))}function ro(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[sn])Zi(c.i,o);else{var h=o.type,f=o.proxy;c.removeEventListener?c.removeEventListener(h,f,o.capture):c.detachEvent?c.detachEvent(qc(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=so(c))?(Zi(h,o),h.h==0&&(h.src=null,c[to]=null)):bs(o)}}}function qc(o){return o in no?no[o]:no[o]="on"+o}function np(o,c){if(o.da)o=!0;else{c=new Oe(c,this);const h=o.listener,f=o.ha||o.src;o.fa&&ro(o),o=h.call(f,c)}return o}function so(o){return o=o[to],o instanceof Ts?o:null}var io="__closure_events_fn_"+(Math.random()*1e9>>>0);function jc(o){return typeof o=="function"?o:(o[io]||(o[io]=function(c){return o.handleEvent(c)}),o[io])}function Te(){b.call(this),this.i=new Ts(this),this.M=this,this.G=null}p(Te,b),Te.prototype[sn]=!0,Te.prototype.removeEventListener=function(o,c,h,f){$c(this,o,c,h,f)};function xe(o,c){var h,f=o.G;if(f)for(h=[];f;f=f.G)h.push(f);if(o=o.M,f=c.type||c,typeof c=="string")c=new v(c,o);else if(c instanceof v)c.target=c.target||o;else{var I=c;c=new v(f,o),Fc(c,I)}I=!0;let A,x;if(h)for(x=h.length-1;x>=0;x--)A=c.g=h[x],I=As(A,f,!0,c)&&I;if(A=c.g=o,I=As(A,f,!0,c)&&I,I=As(A,f,!1,c)&&I,h)for(x=0;x<h.length;x++)A=c.g=h[x],I=As(A,f,!1,c)&&I}Te.prototype.N=function(){if(Te.Z.N.call(this),this.i){var o=this.i;for(const c in o.g){const h=o.g[c];for(let f=0;f<h.length;f++)bs(h[f]);delete o.g[c],o.h--}}this.G=null},Te.prototype.J=function(o,c,h,f){return this.i.add(String(o),c,!1,h,f)},Te.prototype.K=function(o,c,h,f){return this.i.add(String(o),c,!0,h,f)};function As(o,c,h,f){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();let I=!0;for(let A=0;A<c.length;++A){const x=c[A];if(x&&!x.da&&x.capture==h){const z=x.listener,pe=x.ha||x.src;x.fa&&Zi(o.i,x),I=z.call(pe,f)!==!1&&I}}return I&&!f.defaultPrevented}function rp(o,c){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(o,c||0)}function zc(o){o.g=rp(()=>{o.g=null,o.i&&(o.i=!1,zc(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class sp extends b{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:zc(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function pr(o){b.call(this),this.h=o,this.g={}}p(pr,b);var Hc=[];function Wc(o){Is(o.g,function(c,h){this.g.hasOwnProperty(h)&&ro(c)},o),o.g={}}pr.prototype.N=function(){pr.Z.N.call(this),Wc(this)},pr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var oo=a.JSON.stringify,ip=a.JSON.parse,op=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Gc(){}function Kc(){}var gr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ao(){v.call(this,"d")}p(ao,v);function co(){v.call(this,"c")}p(co,v);var on={},Qc=null;function Ps(){return Qc=Qc||new Te}on.Ia="serverreachability";function Yc(o){v.call(this,on.Ia,o)}p(Yc,v);function wr(o){const c=Ps();xe(c,new Yc(c))}on.STAT_EVENT="statevent";function Xc(o,c){v.call(this,on.STAT_EVENT,o),this.stat=c}p(Xc,v);function Ve(o){const c=Ps();xe(c,new Xc(c,o))}on.Ja="timingevent";function Jc(o,c){v.call(this,on.Ja,o),this.size=c}p(Jc,v);function yr(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},c)}function _r(){this.g=!0}_r.prototype.ua=function(){this.g=!1};function ap(o,c,h,f,I,A){o.info(function(){if(o.g)if(A){var x="",z=A.split("&");for(let ee=0;ee<z.length;ee++){var pe=z[ee].split("=");if(pe.length>1){const ye=pe[0];pe=pe[1];const rt=ye.split("_");x=rt.length>=2&&rt[1]=="type"?x+(ye+"="+pe+"&"):x+(ye+"=redacted&")}}}else x=null;else x=A;return"XMLHTTP REQ ("+f+") [attempt "+I+"]: "+c+`
`+h+`
`+x})}function cp(o,c,h,f,I,A,x){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+I+"]: "+c+`
`+h+`
`+A+" "+x})}function kn(o,c,h,f){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+up(o,h)+(f?" "+f:"")})}function lp(o,c){o.info(function(){return"TIMEOUT: "+c})}_r.prototype.info=function(){};function up(o,c){if(!o.g)return c;if(!c)return null;try{const A=JSON.parse(c);if(A){for(o=0;o<A.length;o++)if(Array.isArray(A[o])){var h=A[o];if(!(h.length<2)){var f=h[1];if(Array.isArray(f)&&!(f.length<1)){var I=f[0];if(I!="noop"&&I!="stop"&&I!="close")for(let x=1;x<f.length;x++)f[x]=""}}}}return oo(A)}catch{return c}}var Cs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Zc={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},el;function lo(){}p(lo,Gc),lo.prototype.g=function(){return new XMLHttpRequest},el=new lo;function vr(o){return encodeURIComponent(String(o))}function hp(o){var c=1;o=o.split(":");const h=[];for(;c>0&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function Pt(o,c,h,f){this.j=o,this.i=c,this.l=h,this.S=f||1,this.V=new pr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new tl}function tl(){this.i=null,this.g="",this.h=!1}var nl={},uo={};function ho(o,c,h){o.M=1,o.A=Rs(nt(c)),o.u=h,o.R=!0,rl(o,null)}function rl(o,c){o.F=Date.now(),Ss(o),o.B=nt(o.A);var h=o.B,f=o.S;Array.isArray(f)||(f=[String(f)]),gl(h.i,"t",f),o.C=0,h=o.j.L,o.h=new tl,o.g=Nl(o.j,h?c:null,!o.u),o.P>0&&(o.O=new sp(d(o.Y,o,o.g),o.P)),c=o.V,h=o.g,f=o.ba;var I="readystatechange";Array.isArray(I)||(I&&(Hc[0]=I.toString()),I=Hc);for(let A=0;A<I.length;A++){const x=Uc(h,I[A],f||c.handleEvent,!1,c.h||c);if(!x)break;c.g[x.key]=x}c=o.J?Mc(o.J):{},o.u?(o.v||(o.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,c)):(o.v="GET",o.g.ea(o.B,o.v,null,c)),wr(),ap(o.i,o.v,o.B,o.l,o.S,o.u)}Pt.prototype.ba=function(o){o=o.target;const c=this.O;c&&Rt(o)==3?c.j():this.Y(o)},Pt.prototype.Y=function(o){try{if(o==this.g)e:{const z=Rt(this.g),pe=this.g.ya(),ee=this.g.ca();if(!(z<3)&&(z!=3||this.g&&(this.h.h||this.g.la()||Il(this.g)))){this.K||z!=4||pe==7||(pe==8||ee<=0?wr(3):wr(2)),fo(this);var c=this.g.ca();this.X=c;var h=dp(this);if(this.o=c==200,cp(this.i,this.v,this.B,this.l,this.S,z,c),this.o){if(this.U&&!this.L){t:{if(this.g){var f,I=this.g;if((f=I.g?I.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(f)){var A=f;break t}}A=null}if(o=A)kn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,mo(this,o);else{this.o=!1,this.m=3,Ve(12),an(this),Er(this);break e}}if(this.R){o=!0;let ye;for(;!this.K&&this.C<h.length;)if(ye=fp(this,h),ye==uo){z==4&&(this.m=4,Ve(14),o=!1),kn(this.i,this.l,null,"[Incomplete Response]");break}else if(ye==nl){this.m=4,Ve(15),kn(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else kn(this.i,this.l,ye,null),mo(this,ye);if(sl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),z!=4||h.length!=0||this.h.h||(this.m=1,Ve(16),o=!1),this.o=this.o&&o,!o)kn(this.i,this.l,h,"[Invalid Chunked Response]"),an(this),Er(this);else if(h.length>0&&!this.W){this.W=!0;var x=this.j;x.g==this&&x.aa&&!x.P&&(x.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),bo(x),x.P=!0,Ve(11))}}else kn(this.i,this.l,h,null),mo(this,h);z==4&&an(this),this.o&&!this.K&&(z==4?kl(this.j,this):(this.o=!1,Ss(this)))}else Cp(this.g),c==400&&h.indexOf("Unknown SID")>0?(this.m=3,Ve(12)):(this.m=0,Ve(13)),an(this),Er(this)}}}catch{}finally{}};function dp(o){if(!sl(o))return o.g.la();const c=Il(o.g);if(c==="")return"";let h="";const f=c.length,I=Rt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return an(o),Er(o),"";o.h.i=new a.TextDecoder}for(let A=0;A<f;A++)o.h.h=!0,h+=o.h.i.decode(c[A],{stream:!(I&&A==f-1)});return c.length=0,o.h.g+=h,o.C=0,o.h.g}function sl(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function fp(o,c){var h=o.C,f=c.indexOf(`
`,h);return f==-1?uo:(h=Number(c.substring(h,f)),isNaN(h)?nl:(f+=1,f+h>c.length?uo:(c=c.slice(f,f+h),o.C=f+h,c)))}Pt.prototype.cancel=function(){this.K=!0,an(this)};function Ss(o){o.T=Date.now()+o.H,il(o,o.H)}function il(o,c){if(o.D!=null)throw Error("WatchDog timer not null");o.D=yr(d(o.aa,o),c)}function fo(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Pt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(lp(this.i,this.B),this.M!=2&&(wr(),Ve(17)),an(this),this.m=2,Er(this)):il(this,this.T-o)};function Er(o){o.j.I==0||o.K||kl(o.j,o)}function an(o){fo(o);var c=o.O;c&&typeof c.dispose=="function"&&c.dispose(),o.O=null,Wc(o.V),o.g&&(c=o.g,o.g=null,c.abort(),c.dispose())}function mo(o,c){try{var h=o.j;if(h.I!=0&&(h.g==o||po(h.h,o))){if(!o.L&&po(h.h,o)&&h.I==3){try{var f=h.Ba.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var I=f;if(I[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)Ns(h),xs(h);else break e;Eo(h),Ve(18)}}else h.xa=I[1],0<h.xa-h.K&&I[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=yr(d(h.Va,h),6e3));cl(h.h)<=1&&h.ta&&(h.ta=void 0)}else ln(h,11)}else if((o.L||h.g==o)&&Ns(h),!y(c))for(I=h.Ba.g.parse(c),c=0;c<I.length;c++){let ee=I[c];const ye=ee[0];if(!(ye<=h.K))if(h.K=ye,ee=ee[1],h.I==2)if(ee[0]=="c"){h.M=ee[1],h.ba=ee[2];const rt=ee[3];rt!=null&&(h.ka=rt,h.j.info("VER="+h.ka));const un=ee[4];un!=null&&(h.za=un,h.j.info("SVER="+h.za));const kt=ee[5];kt!=null&&typeof kt=="number"&&kt>0&&(f=1.5*kt,h.O=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const Dt=o.g;if(Dt){const Os=Dt.g?Dt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Os){var A=f.h;A.g||Os.indexOf("spdy")==-1&&Os.indexOf("quic")==-1&&Os.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(go(A,A.h),A.h=null))}if(f.G){const Io=Dt.g?Dt.g.getResponseHeader("X-HTTP-Session-Id"):null;Io&&(f.wa=Io,ne(f.J,f.G,Io))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),f=h;var x=o;if(f.na=Vl(f,f.L?f.ba:null,f.W),x.L){ll(f.h,x);var z=x,pe=f.O;pe&&(z.H=pe),z.D&&(fo(z),Ss(z)),f.g=x}else Sl(f);h.i.length>0&&Vs(h)}else ee[0]!="stop"&&ee[0]!="close"||ln(h,7);else h.I==3&&(ee[0]=="stop"||ee[0]=="close"?ee[0]=="stop"?ln(h,7):vo(h):ee[0]!="noop"&&h.l&&h.l.qa(ee),h.A=0)}}wr(4)}catch{}}var mp=class{constructor(o,c){this.g=o,this.map=c}};function ol(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function al(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function cl(o){return o.h?1:o.g?o.g.size:0}function po(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function go(o,c){o.g?o.g.add(c):o.h=c}function ll(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}ol.prototype.cancel=function(){if(this.i=ul(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ul(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.G);return c}return C(o.i)}var hl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function pp(o,c){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const f=o[h].indexOf("=");let I,A=null;f>=0?(I=o[h].substring(0,f),A=o[h].substring(f+1)):I=o[h],c(I,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function Ct(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;o instanceof Ct?(this.l=o.l,br(this,o.j),this.o=o.o,this.g=o.g,Ir(this,o.u),this.h=o.h,wo(this,wl(o.i)),this.m=o.m):o&&(c=String(o).match(hl))?(this.l=!1,br(this,c[1]||"",!0),this.o=Tr(c[2]||""),this.g=Tr(c[3]||"",!0),Ir(this,c[4]),this.h=Tr(c[5]||"",!0),wo(this,c[6]||"",!0),this.m=Tr(c[7]||"")):(this.l=!1,this.i=new Pr(null,this.l))}Ct.prototype.toString=function(){const o=[];var c=this.j;c&&o.push(Ar(c,dl,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(Ar(c,dl,!0),"@"),o.push(vr(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Ar(h,h.charAt(0)=="/"?yp:wp,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Ar(h,vp)),o.join("")},Ct.prototype.resolve=function(o){const c=nt(this);let h=!!o.j;h?br(c,o.j):h=!!o.o,h?c.o=o.o:h=!!o.g,h?c.g=o.g:h=o.u!=null;var f=o.h;if(h)Ir(c,o.u);else if(h=!!o.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var I=c.h.lastIndexOf("/");I!=-1&&(f=c.h.slice(0,I+1)+f)}if(I=f,I==".."||I==".")f="";else if(I.indexOf("./")!=-1||I.indexOf("/.")!=-1){f=I.lastIndexOf("/",0)==0,I=I.split("/");const A=[];for(let x=0;x<I.length;){const z=I[x++];z=="."?f&&x==I.length&&A.push(""):z==".."?((A.length>1||A.length==1&&A[0]!="")&&A.pop(),f&&x==I.length&&A.push("")):(A.push(z),f=!0)}f=A.join("/")}else f=I}return h?c.h=f:h=o.i.toString()!=="",h?wo(c,wl(o.i)):h=!!o.m,h&&(c.m=o.m),c};function nt(o){return new Ct(o)}function br(o,c,h){o.j=h?Tr(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function Ir(o,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);o.u=c}else o.u=null}function wo(o,c,h){c instanceof Pr?(o.i=c,Ep(o.i,o.l)):(h||(c=Ar(c,_p)),o.i=new Pr(c,o.l))}function ne(o,c,h){o.i.set(c,h)}function Rs(o){return ne(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Tr(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Ar(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,gp),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function gp(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var dl=/[#\/\?@]/g,wp=/[#\?:]/g,yp=/[#\?]/g,_p=/[#\?@]/g,vp=/#/g;function Pr(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function cn(o){o.g||(o.g=new Map,o.h=0,o.i&&pp(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=Pr.prototype,n.add=function(o,c){cn(this),this.i=null,o=Dn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function fl(o,c){cn(o),c=Dn(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function ml(o,c){return cn(o),c=Dn(o,c),o.g.has(c)}n.forEach=function(o,c){cn(this),this.g.forEach(function(h,f){h.forEach(function(I){o.call(c,I,f,this)},this)},this)};function pl(o,c){cn(o);let h=[];if(typeof c=="string")ml(o,c)&&(h=h.concat(o.g.get(Dn(o,c))));else for(o=Array.from(o.g.values()),c=0;c<o.length;c++)h=h.concat(o[c]);return h}n.set=function(o,c){return cn(this),this.i=null,o=Dn(this,o),ml(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=pl(this,o),o.length>0?String(o[0]):c):c};function gl(o,c,h){fl(o,c),h.length>0&&(o.i=null,o.g.set(Dn(o,c),C(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(let f=0;f<c.length;f++){var h=c[f];const I=vr(h);h=pl(this,h);for(let A=0;A<h.length;A++){let x=I;h[A]!==""&&(x+="="+vr(h[A])),o.push(x)}}return this.i=o.join("&")};function wl(o){const c=new Pr;return c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),c}function Dn(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Ep(o,c){c&&!o.j&&(cn(o),o.i=null,o.g.forEach(function(h,f){const I=f.toLowerCase();f!=I&&(fl(this,f),gl(this,I,h))},o)),o.j=c}function bp(o,c){const h=new _r;if(a.Image){const f=new Image;f.onload=m(St,h,"TestLoadImage: loaded",!0,c,f),f.onerror=m(St,h,"TestLoadImage: error",!1,c,f),f.onabort=m(St,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=m(St,h,"TestLoadImage: timeout",!1,c,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else c(!1)}function Ip(o,c){const h=new _r,f=new AbortController,I=setTimeout(()=>{f.abort(),St(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:f.signal}).then(A=>{clearTimeout(I),A.ok?St(h,"TestPingServer: ok",!0,c):St(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(I),St(h,"TestPingServer: error",!1,c)})}function St(o,c,h,f,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),f(h)}catch{}}function Tp(){this.g=new op}function yo(o){this.i=o.Sb||null,this.h=o.ab||!1}p(yo,Gc),yo.prototype.g=function(){return new ks(this.i,this.h)};function ks(o,c){Te.call(this),this.H=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(ks,Te),n=ks.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=c,this.readyState=1,Sr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(c.body=o),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Cr(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Sr(this)),this.g&&(this.readyState=3,Sr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;yl(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function yl(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?Cr(this):Sr(this),this.readyState==3&&yl(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Cr(this))},n.Na=function(o){this.g&&(this.response=o,Cr(this))},n.ga=function(){this.g&&Cr(this)};function Cr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Sr(o)}n.setRequestHeader=function(o,c){this.A.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function Sr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ks.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function _l(o){let c="";return Is(o,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function _o(o,c,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=_l(h),typeof o=="string"?h!=null&&vr(h):ne(o,c,h))}function ie(o){Te.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(ie,Te);var Ap=/^https?$/i,Pp=["POST","PUT"];n=ie.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():el.g(),this.g.onreadystatechange=E(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(A){vl(this,A);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var I in f)h.set(I,f[I]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const A of f.keys())h.set(A,f.get(A));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(A=>A.toLowerCase()=="content-type"),I=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Pp,c,void 0)>=0)||f||I||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,x]of h)this.g.setRequestHeader(A,x);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(A){vl(this,A)}};function vl(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.o=5,El(o),Ds(o)}function El(o){o.A||(o.A=!0,xe(o,"complete"),xe(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,xe(this,"complete"),xe(this,"abort"),Ds(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ds(this,!0)),ie.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?bl(this):this.Xa())},n.Xa=function(){bl(this)};function bl(o){if(o.h&&typeof i<"u"){if(o.v&&Rt(o)==4)setTimeout(o.Ca.bind(o),0);else if(xe(o,"readystatechange"),Rt(o)==4){o.h=!1;try{const A=o.ca();e:switch(A){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var f;if(f=A===0){let x=String(o.D).match(hl)[1]||null;!x&&a.self&&a.self.location&&(x=a.self.location.protocol.slice(0,-1)),f=!Ap.test(x?x.toLowerCase():"")}h=f}if(h)xe(o,"complete"),xe(o,"success");else{o.o=6;try{var I=Rt(o)>2?o.g.statusText:""}catch{I=""}o.l=I+" ["+o.ca()+"]",El(o)}}finally{Ds(o)}}}}function Ds(o,c){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,c||xe(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Rt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Rt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),ip(c)}};function Il(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Cp(o){const c={};o=(o.g&&Rt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(y(o[f]))continue;var h=hp(o[f]);const I=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const A=c[I]||[];c[I]=A,A.push(h)}Zm(c,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Rr(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function Tl(o){this.za=0,this.i=[],this.j=new _r,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Rr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Rr("baseRetryDelayMs",5e3,o),this.Za=Rr("retryDelaySeedMs",1e4,o),this.Ta=Rr("forwardChannelMaxRetries",2,o),this.va=Rr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new ol(o&&o.concurrentRequestLimit),this.Ba=new Tp,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Tl.prototype,n.ka=8,n.I=1,n.connect=function(o,c,h,f){Ve(0),this.W=o,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.J=Vl(this,null,this.W),Vs(this)};function vo(o){if(Al(o),o.I==3){var c=o.V++,h=nt(o.J);if(ne(h,"SID",o.M),ne(h,"RID",c),ne(h,"TYPE","terminate"),kr(o,h),c=new Pt(o,o.j,c),c.M=2,c.A=Rs(nt(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=c.A,h=!0),h||(c.g=Nl(c.j,null),c.g.ea(c.A)),c.F=Date.now(),Ss(c)}xl(o)}function xs(o){o.g&&(bo(o),o.g.cancel(),o.g=null)}function Al(o){xs(o),o.v&&(a.clearTimeout(o.v),o.v=null),Ns(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Vs(o){if(!al(o.h)&&!o.m){o.m=!0;var c=o.Ea;De||g(),oe||(De(),oe=!0),_.add(c,o),o.D=0}}function Sp(o,c){return cl(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=c.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=yr(d(o.Ea,o,c),Dl(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const I=new Pt(this,this.j,o);let A=this.o;if(this.U&&(A?(A=Mc(A),Fc(A,this.U)):A=this.U),this.u!==null||this.R||(I.J=A,A=null),this.S)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,c>4096){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=Cl(this,I,c),h=nt(this.J),ne(h,"RID",o),ne(h,"CVER",22),this.G&&ne(h,"X-HTTP-Session-Id",this.G),kr(this,h),A&&(this.R?c="headers="+vr(_l(A))+"&"+c:this.u&&_o(h,this.u,A)),go(this.h,I),this.Ra&&ne(h,"TYPE","init"),this.S?(ne(h,"$req",c),ne(h,"SID","null"),I.U=!0,ho(I,h,null)):ho(I,h,c),this.I=2}}else this.I==3&&(o?Pl(this,o):this.i.length==0||al(this.h)||Pl(this))};function Pl(o,c){var h;c?h=c.l:h=o.V++;const f=nt(o.J);ne(f,"SID",o.M),ne(f,"RID",h),ne(f,"AID",o.K),kr(o,f),o.u&&o.o&&_o(f,o.u,o.o),h=new Pt(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),c&&(o.i=c.G.concat(o.i)),c=Cl(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),go(o.h,h),ho(h,f,c)}function kr(o,c){o.H&&Is(o.H,function(h,f){ne(c,f,h)}),o.l&&Is({},function(h,f){ne(c,f,h)})}function Cl(o,c,h){h=Math.min(o.i.length,h);const f=o.l?d(o.l.Ka,o.l,o):null;e:{var I=o.i;let z=-1;for(;;){const pe=["count="+h];z==-1?h>0?(z=I[0].g,pe.push("ofs="+z)):z=0:pe.push("ofs="+z);let ee=!0;for(let ye=0;ye<h;ye++){var A=I[ye].g;const rt=I[ye].map;if(A-=z,A<0)z=Math.max(0,I[ye].g-100),ee=!1;else try{A="req"+A+"_"||"";try{var x=rt instanceof Map?rt:Object.entries(rt);for(const[un,kt]of x){let Dt=kt;l(kt)&&(Dt=oo(kt)),pe.push(A+un+"="+encodeURIComponent(Dt))}}catch(un){throw pe.push(A+"type="+encodeURIComponent("_badmap")),un}}catch{f&&f(rt)}}if(ee){x=pe.join("&");break e}}x=void 0}return o=o.i.splice(0,h),c.G=o,x}function Sl(o){if(!o.g&&!o.v){o.Y=1;var c=o.Da;De||g(),oe||(De(),oe=!0),_.add(c,o),o.A=0}}function Eo(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=yr(d(o.Da,o),Dl(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,Rl(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=yr(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ve(10),xs(this),Rl(this))};function bo(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Rl(o){o.g=new Pt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var c=nt(o.na);ne(c,"RID","rpc"),ne(c,"SID",o.M),ne(c,"AID",o.K),ne(c,"CI",o.F?"0":"1"),!o.F&&o.ia&&ne(c,"TO",o.ia),ne(c,"TYPE","xmlhttp"),kr(o,c),o.u&&o.o&&_o(c,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=Rs(nt(c)),h.u=null,h.R=!0,rl(h,o)}n.Va=function(){this.C!=null&&(this.C=null,xs(this),Eo(this),Ve(19))};function Ns(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function kl(o,c){var h=null;if(o.g==c){Ns(o),bo(o),o.g=null;var f=2}else if(po(o.h,c))h=c.G,ll(o.h,c),f=1;else return;if(o.I!=0){if(c.o)if(f==1){h=c.u?c.u.length:0,c=Date.now()-c.F;var I=o.D;f=Ps(),xe(f,new Jc(f,h)),Vs(o)}else Sl(o);else if(I=c.m,I==3||I==0&&c.X>0||!(f==1&&Sp(o,c)||f==2&&Eo(o)))switch(h&&h.length>0&&(c=o.h,c.i=c.i.concat(h)),I){case 1:ln(o,5);break;case 4:ln(o,10);break;case 3:ln(o,6);break;default:ln(o,2)}}}function Dl(o,c){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*c}function ln(o,c){if(o.j.info("Error code "+c),c==2){var h=d(o.bb,o),f=o.Ua;const I=!f;f=new Ct(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||br(f,"https"),Rs(f),I?bp(f.toString(),h):Ip(f.toString(),h)}else Ve(2);o.I=0,o.l&&o.l.pa(c),xl(o),Al(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Ve(2)):(this.j.info("Failed to ping google.com"),Ve(1))};function xl(o){if(o.I=0,o.ja=[],o.l){const c=ul(o.h);(c.length!=0||o.i.length!=0)&&(D(o.ja,c),D(o.ja,o.i),o.h.i.length=0,C(o.i),o.i.length=0),o.l.oa()}}function Vl(o,c,h){var f=h instanceof Ct?nt(h):new Ct(h);if(f.g!="")c&&(f.g=c+"."+f.g),Ir(f,f.u);else{var I=a.location;f=I.protocol,c=c?c+"."+I.hostname:I.hostname,I=+I.port;const A=new Ct(null);f&&br(A,f),c&&(A.g=c),I&&Ir(A,I),h&&(A.h=h),f=A}return h=o.G,c=o.wa,h&&c&&ne(f,h,c),ne(f,"VER",o.ka),kr(o,f),f}function Nl(o,c,h){if(c&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Aa&&!o.ma?new ie(new yo({ab:h})):new ie(o.ma),c.Fa(o.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ll(){}n=Ll.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Ls(){}Ls.prototype.g=function(o,c){return new $e(o,c)};function $e(o,c){Te.call(this),this.g=new Tl(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(o?o["X-WebChannel-Client-Profile"]=c.sa:o={"X-WebChannel-Client-Profile":c.sa}),this.g.U=o,(o=c&&c.Qb)&&!y(o)&&(this.g.u=o),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!y(c)&&(this.g.G=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new xn(this)}p($e,Te),$e.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},$e.prototype.close=function(){vo(this.g)},$e.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=oo(o),o=h);c.i.push(new mp(c.Ya++,o)),c.I==3&&Vs(c)},$e.prototype.N=function(){this.g.l=null,delete this.j,vo(this.g),delete this.g,$e.Z.N.call(this)};function Ol(o){ao.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const h in c){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}p(Ol,ao);function Ml(){co.call(this),this.status=1}p(Ml,co);function xn(o){this.g=o}p(xn,Ll),xn.prototype.ra=function(){xe(this.g,"a")},xn.prototype.qa=function(o){xe(this.g,new Ol(o))},xn.prototype.pa=function(o){xe(this.g,new Ml)},xn.prototype.oa=function(){xe(this.g,"b")},Ls.prototype.createWebChannel=Ls.prototype.g,$e.prototype.send=$e.prototype.o,$e.prototype.open=$e.prototype.m,$e.prototype.close=$e.prototype.close,jd=function(){return new Ls},qd=function(){return Ps()},$d=on,Jo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Cs.NO_ERROR=0,Cs.TIMEOUT=8,Cs.HTTP_ERROR=6,zs=Cs,Zc.COMPLETE="complete",Ud=Zc,Kc.EventType=gr,gr.OPEN="a",gr.CLOSE="b",gr.ERROR="c",gr.MESSAGE="d",Te.prototype.listen=Te.prototype.J,Nr=Kc,ie.prototype.listenOnce=ie.prototype.K,ie.prototype.getLastError=ie.prototype.Ha,ie.prototype.getLastErrorCode=ie.prototype.ya,ie.prototype.getStatus=ie.prototype.ca,ie.prototype.getResponseJson=ie.prototype.La,ie.prototype.getResponseText=ie.prototype.la,ie.prototype.send=ie.prototype.ea,ie.prototype.setWithCredentials=ie.prototype.Fa,Fd=ie}).apply(typeof Bs<"u"?Bs:typeof self<"u"?self:typeof window<"u"?window:{});const au="@firebase/firestore",cu="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Pe.UNAUTHENTICATED=new Pe(null),Pe.GOOGLE_CREDENTIALS=new Pe("google-credentials-uid"),Pe.FIRST_PARTY=new Pe("first-party-uid"),Pe.MOCK_USER=new Pe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cr="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const En=new Oa("@firebase/firestore");function Nn(){return En.logLevel}function L(n,...e){if(En.logLevel<=H.DEBUG){const t=e.map(Fa);En.debug(`Firestore (${cr}): ${n}`,...t)}}function Et(n,...e){if(En.logLevel<=H.ERROR){const t=e.map(Fa);En.error(`Firestore (${cr}): ${n}`,...t)}}function Kn(n,...e){if(En.logLevel<=H.WARN){const t=e.map(Fa);En.warn(`Firestore (${cr}): ${n}`,...t)}}function Fa(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,zd(n,r,t)}function zd(n,e,t){let r=`FIRESTORE (${cr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Et(r),new Error(r)}function J(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||zd(e,s,r)}function q(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends At{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class iv{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Pe.UNAUTHENTICATED))}shutdown(){}}class ov{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class av{constructor(e){this.t=e,this.currentUser=Pe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){J(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new gn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new gn,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{L("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(L("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new gn)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(L("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(J(typeof r.accessToken=="string",31837,{l:r}),new Hd(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return J(e===null||typeof e=="string",2055,{h:e}),new Pe(e)}}class cv{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Pe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class lv{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new cv(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Pe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class lu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class uv{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){J(this.o===void 0,3512);const r=i=>{i.error!=null&&L("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,L("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{L("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):L("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new lu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(J(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new lu(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hv(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=hv(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function W(n,e){return n<e?-1:n>e?1:0}function Zo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Do(s)===Do(i)?W(s,i):Do(s)?1:-1}return W(n.length,e.length)}const dv=55296,fv=57343;function Do(n){const e=n.charCodeAt(0);return e>=dv&&e<=fv}function Qn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uu="__name__";class it{constructor(e,t,r){t===void 0?t=0:t>e.length&&U(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&U(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return it.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof it?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=it.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return W(e.length,t.length)}static compareSegments(e,t){const r=it.isNumericId(e),s=it.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?it.extractNumericId(e).compare(it.extractNumericId(t)):Zo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return zt.fromString(e.substring(4,e.length-2))}}class te extends it{construct(e,t,r){return new te(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new te(t)}static emptyPath(){return new te([])}}const mv=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class be extends it{construct(e,t,r){return new be(e,t,r)}static isValidIdentifier(e){return mv.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),be.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===uu}static keyField(){return new be([uu])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new V(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new V(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new V(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new V(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new be(t)}static emptyPath(){return new be([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.path=e}static fromPath(e){return new M(te.fromString(e))}static fromName(e){return new M(te.fromString(e).popFirst(5))}static empty(){return new M(te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return te.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new M(new te(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wd(n,e,t){if(!t)throw new V(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function pv(n,e,t,r){if(e===!0&&r===!0)throw new V(S.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function hu(n){if(!M.isDocumentKey(n))throw new V(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function du(n){if(M.isDocumentKey(n))throw new V(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Gd(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Ni(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U(12329,{type:typeof n})}function Ht(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ni(n);throw new V(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(n,e){const t={typeString:n};return e&&(t.value=e),t}function ds(n,e){if(!Gd(n))throw new V(S.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new V(S.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fu=-62135596800,mu=1e6;class re{static now(){return re.fromMillis(Date.now())}static fromDate(e){return re.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*mu);return new re(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<fu)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/mu}_compareTo(e){return this.seconds===e.seconds?W(this.nanoseconds,e.nanoseconds):W(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:re._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ds(e,re._jsonSchema))return new re(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-fu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}re._jsonSchemaVersion="firestore/timestamp/1.0",re._jsonSchema={type:fe("string",re._jsonSchemaVersion),seconds:fe("number"),nanoseconds:fe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${static fromTimestamp(e){return new $(e)}static min(){return new $(new re(0,0))}static max(){return new $(new re(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr=-1;function gv(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=$.fromTimestamp(r===1e9?new re(t+1,0):new re(t,r));return new Kt(s,M.empty(),e)}function wv(n){return new Kt(n.readTime,n.key,Qr)}class Kt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Kt($.min(),M.empty(),Qr)}static max(){return new Kt($.max(),M.empty(),Qr)}}function yv(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(n.documentKey,e.documentKey),t!==0?t:W(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _v="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class vv{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lr(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==_v)throw n;L("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new R((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof R?t:R.resolve(t)}catch(t){return R.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):R.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):R.reject(t)}static resolve(e){return new R((t,r)=>{t(e)})}static reject(e){return new R((t,r)=>{r(e)})}static waitFor(e){return new R((t,r)=>{let s=0,i=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=R.resolve(!1);for(const r of e)t=t.next(s=>s?R.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new R((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(m=>{a[d]=m,++l,l===i&&r(a)},m=>s(m))}})}static doWhile(e,t){return new R((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function Ev(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ur(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Li.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a=-1;function Oi(n){return n==null}function hi(n){return n===0&&1/n==-1/0}function bv(n){return typeof n=="number"&&Number.isInteger(n)&&!hi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kd="";function Iv(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=pu(e)),e=Tv(n.get(t),e);return pu(e)}function Tv(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Kd:t+="";break;default:t+=i}}return t}function pu(n){return n+Kd+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function tn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Qd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t){this.comparator=e,this.root=t||Ee.EMPTY}insert(e,t){return new se(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ee.BLACK,null,null))}remove(e){return new se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ee.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Fs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Fs(this.root,e,this.comparator,!1)}getReverseIterator(){return new Fs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Fs(this.root,e,this.comparator,!0)}}class Fs{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ee{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Ee.RED,this.left=s??Ee.EMPTY,this.right=i??Ee.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Ee(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ee.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ee.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ee.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ee.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw U(43730,{key:this.key,value:this.value});if(this.right.isRed())throw U(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw U(27949);return e+(this.isRed()?0:1)}}Ee.EMPTY=null,Ee.RED=!0,Ee.BLACK=!1;Ee.EMPTY=new class{constructor(){this.size=0}get key(){throw U(57766)}get value(){throw U(16141)}get color(){throw U(16727)}get left(){throw U(29726)}get right(){throw U(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ee(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.comparator=e,this.data=new se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new wu(this.data.getIterator())}getIteratorFrom(e){return new wu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ge)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ge(this.comparator);return t.data=e,t}}class wu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e){this.fields=e,e.sort(be.comparator)}static empty(){return new qe([])}unionWith(e){let t=new ge(be.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new qe(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Qn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Yd("Invalid base64 string: "+i):i}}(e);return new Ie(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new Ie(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return W(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ie.EMPTY_BYTE_STRING=new Ie("");const Av=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Qt(n){if(J(!!n,39018),typeof n=="string"){let e=0;const t=Av.exec(n);if(J(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ce(n.seconds),nanos:ce(n.nanos)}}function ce(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Yt(n){return typeof n=="string"?Ie.fromBase64String(n):Ie.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xd="server_timestamp",Jd="__type__",Zd="__previous_value__",ef="__local_write_time__";function qa(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Jd])==null?void 0:r.stringValue)===Xd}function Mi(n){const e=n.mapValue.fields[Zd];return qa(e)?Mi(e):e}function Yr(n){const e=Qt(n.mapValue.fields[ef].timestampValue);return new re(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pv{constructor(e,t,r,s,i,a,l,u,d,m){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=m}}const di="(default)";class Xr{constructor(e,t){this.projectId=e,this.database=t||di}static empty(){return new Xr("","")}get isDefaultDatabase(){return this.database===di}isEqual(e){return e instanceof Xr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tf="__type__",Cv="__max__",Us={mapValue:{}},nf="__vector__",fi="value";function Xt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?qa(n)?4:Rv(n)?9007199254740991:Sv(n)?10:11:U(28295,{value:n})}function mt(n,e){if(n===e)return!0;const t=Xt(n);if(t!==Xt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Yr(n).isEqual(Yr(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Qt(s.timestampValue),l=Qt(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Yt(s.bytesValue).isEqual(Yt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return ce(s.geoPointValue.latitude)===ce(i.geoPointValue.latitude)&&ce(s.geoPointValue.longitude)===ce(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return ce(s.integerValue)===ce(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ce(s.doubleValue),l=ce(i.doubleValue);return a===l?hi(a)===hi(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return Qn(n.arrayValue.values||[],e.arrayValue.values||[],mt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(gu(a)!==gu(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!mt(a[u],l[u])))return!1;return!0}(n,e);default:return U(52216,{left:n})}}function Jr(n,e){return(n.values||[]).find(t=>mt(t,e))!==void 0}function Yn(n,e){if(n===e)return 0;const t=Xt(n),r=Xt(e);if(t!==r)return W(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return W(n.booleanValue,e.booleanValue);case 2:return function(i,a){const l=ce(i.integerValue||i.doubleValue),u=ce(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,e);case 3:return yu(n.timestampValue,e.timestampValue);case 4:return yu(Yr(n),Yr(e));case 5:return Zo(n.stringValue,e.stringValue);case 6:return function(i,a){const l=Yt(i),u=Yt(a);return l.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const l=i.split("/"),u=a.split("/");for(let d=0;d<l.length&&d<u.length;d++){const m=W(l[d],u[d]);if(m!==0)return m}return W(l.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const l=W(ce(i.latitude),ce(a.latitude));return l!==0?l:W(ce(i.longitude),ce(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return _u(n.arrayValue,e.arrayValue);case 10:return function(i,a){var E,C,D,N;const l=i.fields||{},u=a.fields||{},d=(E=l[fi])==null?void 0:E.arrayValue,m=(C=u[fi])==null?void 0:C.arrayValue,p=W(((D=d==null?void 0:d.values)==null?void 0:D.length)||0,((N=m==null?void 0:m.values)==null?void 0:N.length)||0);return p!==0?p:_u(d,m)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===Us.mapValue&&a===Us.mapValue)return 0;if(i===Us.mapValue)return 1;if(a===Us.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),d=a.fields||{},m=Object.keys(d);u.sort(),m.sort();for(let p=0;p<u.length&&p<m.length;++p){const E=Zo(u[p],m[p]);if(E!==0)return E;const C=Yn(l[u[p]],d[m[p]]);if(C!==0)return C}return W(u.length,m.length)}(n.mapValue,e.mapValue);default:throw U(23264,{he:t})}}function yu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return W(n,e);const t=Qt(n),r=Qt(e),s=W(t.seconds,r.seconds);return s!==0?s:W(t.nanos,r.nanos)}function _u(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Yn(t[s],r[s]);if(i)return i}return W(t.length,r.length)}function Xn(n){return ea(n)}function ea(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Qt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Yt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return M.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ea(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${ea(t.fields[a])}`;return s+"}"}(n.mapValue):U(61005,{value:n})}function Hs(n){switch(Xt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Mi(n);return e?16+Hs(e):16;case 5:return 2*n.stringValue.length;case 6:return Yt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Hs(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return tn(r.fields,(i,a)=>{s+=i.length+Hs(a)}),s}(n.mapValue);default:throw U(13486,{value:n})}}function vu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ta(n){return!!n&&"integerValue"in n}function ja(n){return!!n&&"arrayValue"in n}function Eu(n){return!!n&&"nullValue"in n}function bu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Ws(n){return!!n&&"mapValue"in n}function Sv(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[tf])==null?void 0:r.stringValue)===nf}function qr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return tn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=qr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=qr(n.arrayValue.values[t]);return e}return{...n}}function Rv(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Cv}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.value=e}static empty(){return new Be({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Ws(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=qr(t)}setAll(e){let t=be.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=qr(a):s.push(l.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Ws(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return mt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Ws(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){tn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Be(qr(this.value))}}function rf(n){const e=[];return tn(n.fields,(t,r)=>{const s=new be([t]);if(Ws(r)){const i=rf(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new qe(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new Se(e,0,$.min(),$.min(),$.min(),Be.empty(),0)}static newFoundDocument(e,t,r,s){return new Se(e,1,t,$.min(),r,s,0)}static newNoDocument(e,t){return new Se(e,2,t,$.min(),$.min(),Be.empty(),0)}static newUnknownDocument(e,t){return new Se(e,3,t,$.min(),$.min(),Be.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual($.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Be.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Be.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=$.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Se&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Se(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(e,t){this.position=e,this.inclusive=t}}function Iu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=M.comparator(M.fromName(a.referenceValue),t.key):r=Yn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Tu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!mt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e,t="asc"){this.field=e,this.dir=t}}function kv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{}class de extends sf{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new xv(e,t,r):t==="array-contains"?new Lv(e,r):t==="in"?new Ov(e,r):t==="not-in"?new Mv(e,r):t==="array-contains-any"?new Bv(e,r):new de(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Vv(e,r):new Nv(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Yn(t,this.value)):t!==null&&Xt(this.value)===Xt(t)&&this.matchesComparison(Yn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class et extends sf{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new et(e,t)}matches(e){return of(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function of(n){return n.op==="and"}function af(n){return Dv(n)&&of(n)}function Dv(n){for(const e of n.filters)if(e instanceof et)return!1;return!0}function na(n){if(n instanceof de)return n.field.canonicalString()+n.op.toString()+Xn(n.value);if(af(n))return n.filters.map(e=>na(e)).join(",");{const e=n.filters.map(t=>na(t)).join(",");return`${n.op}(${e})`}}function cf(n,e){return n instanceof de?function(r,s){return s instanceof de&&r.op===s.op&&r.field.isEqual(s.field)&&mt(r.value,s.value)}(n,e):n instanceof et?function(r,s){return s instanceof et&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,l)=>i&&cf(a,s.filters[l]),!0):!1}(n,e):void U(19439)}function lf(n){return n instanceof de?function(t){return`${t.field.canonicalString()} ${t.op} ${Xn(t.value)}`}(n):n instanceof et?function(t){return t.op.toString()+" {"+t.getFilters().map(lf).join(" ,")+"}"}(n):"Filter"}class xv extends de{constructor(e,t,r){super(e,t,r),this.key=M.fromName(r.referenceValue)}matches(e){const t=M.comparator(e.key,this.key);return this.matchesComparison(t)}}class Vv extends de{constructor(e,t){super(e,"in",t),this.keys=uf("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Nv extends de{constructor(e,t){super(e,"not-in",t),this.keys=uf("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function uf(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>M.fromName(r.referenceValue))}class Lv extends de{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ja(t)&&Jr(t.arrayValue,this.value)}}class Ov extends de{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Jr(this.value.arrayValue,t)}}class Mv extends de{constructor(e,t){super(e,"not-in",t)}matches(e){if(Jr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Jr(this.value.arrayValue,t)}}class Bv extends de{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ja(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Jr(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fv{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.Te=null}}function Au(n,e=null,t=[],r=[],s=null,i=null,a=null){return new Fv(n,e,t,r,s,i,a)}function za(n){const e=q(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>na(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Oi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Xn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Xn(r)).join(",")),e.Te=t}return e.Te}function Ha(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!kv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!cf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Tu(n.startAt,e.startAt)&&Tu(n.endAt,e.endAt)}function ra(n){return M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Uv(n,e,t,r,s,i,a,l){return new hr(n,e,t,r,s,i,a,l)}function Wa(n){return new hr(n)}function Pu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function hf(n){return n.collectionGroup!==null}function jr(n){const e=q(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ge(be.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Zr(i,r))}),t.has(be.keyField().canonicalString())||e.Ie.push(new Zr(be.keyField(),r))}return e.Ie}function at(n){const e=q(n);return e.Ee||(e.Ee=$v(e,jr(n))),e.Ee}function $v(n,e){if(n.limitType==="F")return Au(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Zr(s.field,i)});const t=n.endAt?new mi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new mi(n.startAt.position,n.startAt.inclusive):null;return Au(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function sa(n,e){const t=n.filters.concat([e]);return new hr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ia(n,e,t){return new hr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Bi(n,e){return Ha(at(n),at(e))&&n.limitType===e.limitType}function df(n){return`${za(at(n))}|lt:${n.limitType}`}function Ln(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>lf(s)).join(", ")}]`),Oi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Xn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Xn(s)).join(",")),`Target(${r})`}(at(n))}; limitType=${n.limitType})`}function Fi(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):M.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of jr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,u){const d=Iu(a,l,u);return a.inclusive?d<=0:d<0}(r.startAt,jr(r),s)||r.endAt&&!function(a,l,u){const d=Iu(a,l,u);return a.inclusive?d>=0:d>0}(r.endAt,jr(r),s))}(n,e)}function qv(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function ff(n){return(e,t)=>{let r=!1;for(const s of jr(n)){const i=jv(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function jv(n,e,t){const r=n.field.isKeyField()?M.comparator(e.key,t.key):function(i,a,l){const u=a.data.field(i),d=l.data.field(i);return u!==null&&d!==null?Yn(u,d):U(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return U(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){tn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Qd(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zv=new se(M.comparator);function bt(){return zv}const mf=new se(M.comparator);function Lr(...n){let e=mf;for(const t of n)e=e.insert(t.key,t);return e}function pf(n){let e=mf;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function fn(){return zr()}function gf(){return zr()}function zr(){return new Pn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Hv=new se(M.comparator),Wv=new ge(M.comparator);function G(...n){let e=Wv;for(const t of n)e=e.add(t);return e}const Gv=new ge(W);function Kv(){return Gv}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:hi(e)?"-0":e}}function wf(n){return{integerValue:""+n}}function Qv(n,e){return bv(e)?wf(e):Ga(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui{constructor(){this._=void 0}}function Yv(n,e,t){return n instanceof pi?function(s,i){const a={fields:{[Jd]:{stringValue:Xd},[ef]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&qa(i)&&(i=Mi(i)),i&&(a.fields[Zd]=i),{mapValue:a}}(t,e):n instanceof es?_f(n,e):n instanceof ts?vf(n,e):function(s,i){const a=yf(s,i),l=Cu(a)+Cu(s.Ae);return ta(a)&&ta(s.Ae)?wf(l):Ga(s.serializer,l)}(n,e)}function Xv(n,e,t){return n instanceof es?_f(n,e):n instanceof ts?vf(n,e):t}function yf(n,e){return n instanceof gi?function(r){return ta(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class pi extends Ui{}class es extends Ui{constructor(e){super(),this.elements=e}}function _f(n,e){const t=Ef(e);for(const r of n.elements)t.some(s=>mt(s,r))||t.push(r);return{arrayValue:{values:t}}}class ts extends Ui{constructor(e){super(),this.elements=e}}function vf(n,e){let t=Ef(e);for(const r of n.elements)t=t.filter(s=>!mt(s,r));return{arrayValue:{values:t}}}class gi extends Ui{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Cu(n){return ce(n.integerValue||n.doubleValue)}function Ef(n){return ja(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Jv(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof es&&s instanceof es||r instanceof ts&&s instanceof ts?Qn(r.elements,s.elements,mt):r instanceof gi&&s instanceof gi?mt(r.Ae,s.Ae):r instanceof pi&&s instanceof pi}(n.transform,e.transform)}class Zv{constructor(e,t){this.version=e,this.transformResults=t}}class Ze{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ze}static exists(e){return new Ze(void 0,e)}static updateTime(e){return new Ze(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Gs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class $i{}function bf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ka(n.key,Ze.none()):new fs(n.key,n.data,Ze.none());{const t=n.data,r=Be.empty();let s=new ge(be.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new nn(n.key,r,new qe(s.toArray()),Ze.none())}}function eE(n,e,t){n instanceof fs?function(s,i,a){const l=s.value.clone(),u=Ru(s.fieldTransforms,i,a.transformResults);l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof nn?function(s,i,a){if(!Gs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=Ru(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(If(s)),u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Hr(n,e,t,r){return n instanceof fs?function(i,a,l,u){if(!Gs(i.precondition,a))return l;const d=i.value.clone(),m=ku(i.fieldTransforms,u,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof nn?function(i,a,l,u){if(!Gs(i.precondition,a))return l;const d=ku(i.fieldTransforms,u,a),m=a.data;return m.setAll(If(i)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(i,a,l){return Gs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function tE(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=yf(r.transform,s||null);i!=null&&(t===null&&(t=Be.empty()),t.set(r.field,i))}return t||null}function Su(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Qn(r,s,(i,a)=>Jv(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class fs extends $i{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class nn extends $i{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function If(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Ru(n,e,t){const r=new Map;J(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,Xv(a,l,t[s]))}return r}function ku(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Yv(i,a,e))}return r}class Ka extends $i{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class nE extends $i{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&eE(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Hr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Hr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=gf();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const u=bf(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument($.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),G())}isEqual(e){return this.batchId===e.batchId&&Qn(this.mutations,e.mutations,(t,r)=>Su(t,r))&&Qn(this.baseMutations,e.baseMutations,(t,r)=>Su(t,r))}}class Qa{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){J(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return Hv}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Qa(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var he,Q;function oE(n){switch(n){case S.OK:return U(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return U(15467,{code:n})}}function Tf(n){if(n===void 0)return Et("GRPC error has no .code"),S.UNKNOWN;switch(n){case he.OK:return S.OK;case he.CANCELLED:return S.CANCELLED;case he.UNKNOWN:return S.UNKNOWN;case he.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case he.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case he.INTERNAL:return S.INTERNAL;case he.UNAVAILABLE:return S.UNAVAILABLE;case he.UNAUTHENTICATED:return S.UNAUTHENTICATED;case he.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case he.NOT_FOUND:return S.NOT_FOUND;case he.ALREADY_EXISTS:return S.ALREADY_EXISTS;case he.PERMISSION_DENIED:return S.PERMISSION_DENIED;case he.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case he.ABORTED:return S.ABORTED;case he.OUT_OF_RANGE:return S.OUT_OF_RANGE;case he.UNIMPLEMENTED:return S.UNIMPLEMENTED;case he.DATA_LOSS:return S.DATA_LOSS;default:return U(39323,{code:n})}}(Q=he||(he={}))[Q.OK=0]="OK",Q[Q.CANCELLED=1]="CANCELLED",Q[Q.UNKNOWN=2]="UNKNOWN",Q[Q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Q[Q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Q[Q.NOT_FOUND=5]="NOT_FOUND",Q[Q.ALREADY_EXISTS=6]="ALREADY_EXISTS",Q[Q.PERMISSION_DENIED=7]="PERMISSION_DENIED",Q[Q.UNAUTHENTICATED=16]="UNAUTHENTICATED",Q[Q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Q[Q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Q[Q.ABORTED=10]="ABORTED",Q[Q.OUT_OF_RANGE=11]="OUT_OF_RANGE",Q[Q.UNIMPLEMENTED=12]="UNIMPLEMENTED",Q[Q.INTERNAL=13]="INTERNAL",Q[Q.UNAVAILABLE=14]="UNAVAILABLE",Q[Q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aE(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cE=new zt([4294967295,4294967295],0);function Du(n){const e=aE().encode(n),t=new Bd;return t.update(e),new Uint8Array(t.digest())}function xu(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new zt([t,r],0),new zt([s,i],0)]}class Ya{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Or(`Invalid padding: ${t}`);if(r<0)throw new Or(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Or(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Or(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=zt.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(zt.fromNumber(r)));return s.compare(cE)===1&&(s=new zt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Du(e),[r,s]=xu(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Ya(i,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.ge===0)return;const t=Du(e),[r,s]=xu(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Or extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,ms.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new qi($.min(),s,new se(W),bt(),G())}}class ms{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ms(r,t,G(),G(),G())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Af{constructor(e,t){this.targetId=e,this.Ce=t}}class Pf{constructor(e,t,r=Ie.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Vu{constructor(){this.ve=0,this.Fe=Nu(),this.Me=Ie.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=G(),t=G(),r=G();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:U(38017,{changeType:i})}}),new ms(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Nu()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,J(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class lE{constructor(e){this.Ge=e,this.ze=new Map,this.je=bt(),this.Je=$s(),this.He=$s(),this.Ye=new se(W)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:U(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(ra(i))if(r===0){const a=new M(i.path);this.et(t,a,Se.newNoDocument(a,$.min()))}else J(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const l=this.ut(e),u=l?this.ct(l,e,a):1;if(u!==0){this.it(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=Yt(r).toUint8Array()}catch(u){if(u instanceof Yd)return Kn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Ya(a,s,i)}catch(u){return Kn(u instanceof Or?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.ge===0?null:l}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,a)=>{const l=this.ot(a);if(l){if(i.current&&ra(l.target)){const u=new M(l.target.path);this.It(u).has(a)||this.Et(a,u)||this.et(a,u,Se.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}});let r=G();this.He.forEach((i,a)=>{let l=!0;a.forEachWhile(u=>{const d=this.ot(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const s=new qi(e,t,this.Ye,this.je,r);return this.je=bt(),this.Je=$s(),this.He=$s(),this.Ye=new se(W),s}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Vu,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new ge(W),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new ge(W),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||L("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Vu),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function $s(){return new se(M.comparator)}function Nu(){return new se(M.comparator)}const uE={asc:"ASCENDING",desc:"DESCENDING"},hE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},dE={and:"AND",or:"OR"};class fE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function oa(n,e){return n.useProto3Json||Oi(e)?e:{value:e}}function wi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Cf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function mE(n,e){return wi(n,e.toTimestamp())}function ct(n){return J(!!n,49232),$.fromTimestamp(function(t){const r=Qt(t);return new re(r.seconds,r.nanos)}(n))}function Xa(n,e){return aa(n,e).canonicalString()}function aa(n,e){const t=function(s){return new te(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Sf(n){const e=te.fromString(n);return J(Vf(e),10190,{key:e.toString()}),e}function ca(n,e){return Xa(n.databaseId,e.path)}function xo(n,e){const t=Sf(e);if(t.get(1)!==n.databaseId.projectId)throw new V(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new M(kf(t))}function Rf(n,e){return Xa(n.databaseId,e)}function pE(n){const e=Sf(n);return e.length===4?te.emptyPath():kf(e)}function la(n){return new te(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function kf(n){return J(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Lu(n,e,t){return{name:ca(n,e),fields:t.value.mapValue.fields}}function gE(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:U(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,m){return d.useProto3Json?(J(m===void 0||typeof m=="string",58123),Ie.fromBase64String(m||"")):(J(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),Ie.fromUint8Array(m||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(d){const m=d.code===void 0?S.UNKNOWN:Tf(d.code);return new V(m,d.message||"")}(a);t=new Pf(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=xo(n,r.document.name),i=ct(r.document.updateTime),a=r.document.createTime?ct(r.document.createTime):$.min(),l=new Be({mapValue:{fields:r.document.fields}}),u=Se.newFoundDocument(s,i,a,l),d=r.targetIds||[],m=r.removedTargetIds||[];t=new Ks(d,m,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=xo(n,r.document),i=r.readTime?ct(r.readTime):$.min(),a=Se.newNoDocument(s,i),l=r.removedTargetIds||[];t=new Ks([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=xo(n,r.document),i=r.removedTargetIds||[];t=new Ks([],i,s,null)}else{if(!("filter"in e))return U(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new iE(s,i),l=r.targetId;t=new Af(l,a)}}return t}function wE(n,e){let t;if(e instanceof fs)t={update:Lu(n,e.key,e.value)};else if(e instanceof Ka)t={delete:ca(n,e.key)};else if(e instanceof nn)t={update:Lu(n,e.key,e.data),updateMask:PE(e.fieldMask)};else{if(!(e instanceof nE))return U(16599,{Vt:e.type});t={verify:ca(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const l=a.transform;if(l instanceof pi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof es)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof ts)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof gi)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw U(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:mE(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:U(27497)}(n,e.precondition)),t}function yE(n,e){return n&&n.length>0?(J(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?ct(s.updateTime):ct(i);return a.isEqual($.min())&&(a=ct(i)),new Zv(a,s.transformResults||[])}(t,e))):[]}function _E(n,e){return{documents:[Rf(n,e.path)]}}function vE(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Rf(n,s);const i=function(d){if(d.length!==0)return xf(et.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(m=>function(E){return{field:On(E.field),direction:IE(E.dir)}}(m))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=oa(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:s}}function EE(n){let e=pE(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){J(r===1,65062);const m=t.from[0];m.allDescendants?s=m.collectionId:e=e.child(m.collectionId)}let i=[];t.where&&(i=function(p){const E=Df(p);return E instanceof et&&af(E)?E.getFilters():[E]}(t.where));let a=[];t.orderBy&&(a=function(p){return p.map(E=>function(D){return new Zr(Mn(D.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(E))}(t.orderBy));let l=null;t.limit&&(l=function(p){let E;return E=typeof p=="object"?p.value:p,Oi(E)?null:E}(t.limit));let u=null;t.startAt&&(u=function(p){const E=!!p.before,C=p.values||[];return new mi(C,E)}(t.startAt));let d=null;return t.endAt&&(d=function(p){const E=!p.before,C=p.values||[];return new mi(C,E)}(t.endAt)),Uv(e,s,a,i,l,"F",u,d)}function bE(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Df(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Mn(t.unaryFilter.field);return de.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Mn(t.unaryFilter.field);return de.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Mn(t.unaryFilter.field);return de.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Mn(t.unaryFilter.field);return de.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return U(61313);default:return U(60726)}}(n):n.fieldFilter!==void 0?function(t){return de.create(Mn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return U(58110);default:return U(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return et.create(t.compositeFilter.filters.map(r=>Df(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return U(1026)}}(t.compositeFilter.op))}(n):U(30097,{filter:n})}function IE(n){return uE[n]}function TE(n){return hE[n]}function AE(n){return dE[n]}function On(n){return{fieldPath:n.canonicalString()}}function Mn(n){return be.fromServerFormat(n.fieldPath)}function xf(n){return n instanceof de?function(t){if(t.op==="=="){if(bu(t.value))return{unaryFilter:{field:On(t.field),op:"IS_NAN"}};if(Eu(t.value))return{unaryFilter:{field:On(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(bu(t.value))return{unaryFilter:{field:On(t.field),op:"IS_NOT_NAN"}};if(Eu(t.value))return{unaryFilter:{field:On(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:On(t.field),op:TE(t.op),value:t.value}}}(n):n instanceof et?function(t){const r=t.getFilters().map(s=>xf(s));return r.length===1?r[0]:{compositeFilter:{op:AE(t.op),filters:r}}}(n):U(54877,{filter:n})}function PE(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Vf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,t,r,s,i=$.min(),a=$.min(),l=Ie.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Ut(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Ut(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ut(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ut(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CE{constructor(e){this.yt=e}}function SE(n){const e=EE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ia(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RE{constructor(){this.Cn=new kE}addToCollectionParentIndex(e,t){return this.Cn.add(t),R.resolve()}getCollectionParents(e,t){return R.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return R.resolve()}deleteFieldIndex(e,t){return R.resolve()}deleteAllFieldIndexes(e){return R.resolve()}createTargetIndexes(e,t){return R.resolve()}getDocumentsMatchingTarget(e,t){return R.resolve(null)}getIndexType(e,t){return R.resolve(0)}getFieldIndexes(e,t){return R.resolve([])}getNextCollectionGroupToUpdate(e){return R.resolve(null)}getMinOffset(e,t){return R.resolve(Kt.min())}getMinOffsetFromCollectionGroup(e,t){return R.resolve(Kt.min())}updateCollectionGroup(e,t,r){return R.resolve()}updateIndexEntries(e,t){return R.resolve()}}class kE{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ge(te.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ge(te.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ou={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Nf=41943040;class Me{static withCacheSize(e){return new Me(e,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Me.DEFAULT_COLLECTION_PERCENTILE=10,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Me.DEFAULT=new Me(Nf,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Me.DISABLED=new Me(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Jn(0)}static cr(){return new Jn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mu="LruGarbageCollector",DE=1048576;function Bu([n,e],[t,r]){const s=W(n,t);return s===0?W(e,r):s}class xE{constructor(e){this.Ir=e,this.buffer=new ge(Bu),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Bu(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class VE{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){L(Mu,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ur(t)?L(Mu,"Ignoring IndexedDB error during garbage collection: ",t):await lr(t)}await this.Vr(3e5)})}}class NE{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return R.resolve(Li.ce);const r=new xE(t);return this.mr.forEachTarget(e,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(e,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(L("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(Ou)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(L("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ou):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,s,i,a,l,u,d;const m=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(L("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,l=Date.now(),this.removeTargets(e,r,t))).next(p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(d=Date.now(),Nn()<=H.DEBUG&&L("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${i} targets in `+(u-l)+`ms
	Removed ${p} documents in `+(d-u)+`ms
Total Duration: ${d-m}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function LE(n,e){return new NE(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OE{constructor(){this.changes=new Pn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Se.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?R.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ME{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BE{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Hr(r.mutation,s,qe.empty(),re.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,G()).next(()=>r))}getLocalViewOfDocuments(e,t,r=G()){const s=fn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=Lr();return i.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=fn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,G()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let i=bt();const a=zr(),l=function(){return zr()}();return t.forEach((u,d)=>{const m=r.get(d.key);s.has(d.key)&&(m===void 0||m.mutation instanceof nn)?i=i.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),Hr(m.mutation,d,m.mutation.getFieldMask(),re.now())):a.set(d.key,qe.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,m)=>a.set(d,m)),t.forEach((d,m)=>l.set(d,new ME(m,a.get(d)??null))),l))}recalculateAndSaveOverlays(e,t){const r=zr();let s=new se((a,l)=>a-l),i=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let m=r.get(u)||qe.empty();m=l.applyToLocalView(d,m),r.set(u,m);const p=(s.get(l.batchId)||G()).add(u);s=s.insert(l.batchId,p)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),d=u.key,m=u.value,p=gf();m.forEach(E=>{if(!i.has(E)){const C=bf(t.get(E),r.get(E));C!==null&&p.set(E,C),i=i.add(E)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,p))}return R.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return M.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):hf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):R.resolve(fn());let l=Qr,u=i;return a.next(d=>R.forEach(d,(m,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(m)?R.resolve():this.remoteDocumentCache.getEntry(e,m).next(E=>{u=u.insert(m,E)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,G())).next(m=>({batchId:l,changes:pf(m)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next(r=>{let s=Lr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Lr();return this.indexManager.getCollectionParents(e,i).next(l=>R.forEach(l,u=>{const d=function(p,E){return new hr(E,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(m=>{m.forEach((p,E)=>{a=a.insert(p,E)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,d)=>{const m=d.getKey();a.get(m)===null&&(a=a.insert(m,Se.newInvalidDocument(m)))});let l=Lr();return a.forEach((u,d)=>{const m=i.get(u);m!==void 0&&Hr(m.mutation,d,qe.empty(),re.now()),Fi(t,d)&&(l=l.insert(u,d))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FE{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return R.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:ct(s.createTime)}}(t)),R.resolve()}getNamedQuery(e,t){return R.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(s){return{name:s.name,query:SE(s.bundledQuery),readTime:ct(s.readTime)}}(t)),R.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UE{constructor(){this.overlays=new se(M.comparator),this.qr=new Map}getOverlay(e,t){return R.resolve(this.overlays.get(t))}getOverlays(e,t){const r=fn();return R.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.St(e,t,i)}),R.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(r)),R.resolve()}getOverlaysForCollection(e,t,r){const s=fn(),i=t.length+1,a=new M(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return R.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new se((d,m)=>d-m);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let m=i.get(d.largestBatchId);m===null&&(m=fn(),i=i.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const l=fn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,m)=>l.set(d,m)),!(l.size()>=s)););return R.resolve(l)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new sE(t,r));let i=this.qr.get(t);i===void 0&&(i=G(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $E{constructor(){this.sessionToken=Ie.EMPTY_BYTE_STRING}getSessionToken(e){return R.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,R.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(){this.Qr=new ge(_e.$r),this.Ur=new ge(_e.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new _e(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Gr(new _e(e,t))}zr(e,t){e.forEach(r=>this.removeReference(r,t))}jr(e){const t=new M(new te([])),r=new _e(t,e),s=new _e(t,e+1),i=[];return this.Ur.forEachInRange([r,s],a=>{this.Gr(a),i.push(a.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new M(new te([])),r=new _e(t,e),s=new _e(t,e+1);let i=G();return this.Ur.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new _e(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class _e{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return M.comparator(e.key,t.key)||W(e.Yr,t.Yr)}static Kr(e,t){return W(e.Yr,t.Yr)||M.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new ge(_e.$r)}checkEmpty(e){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new rE(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.Zr=this.Zr.add(new _e(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return R.resolve(a)}lookupMutationBatch(e,t){return R.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.ei(r),i=s<0?0:s;return R.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?$a:this.tr-1)}getAllMutationBatches(e){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new _e(t,0),s=new _e(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],a=>{const l=this.Xr(a.Yr);i.push(l)}),R.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ge(W);return t.forEach(s=>{const i=new _e(s,0),a=new _e(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],l=>{r=r.add(l.Yr)})}),R.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;M.isDocumentKey(i)||(i=i.child(""));const a=new _e(new M(i),0);let l=new ge(W);return this.Zr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(u.Yr)),!0)},a),R.resolve(this.ti(l))}ti(e){const t=[];return e.forEach(r=>{const s=this.Xr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){J(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return R.forEach(t.mutations,s=>{const i=new _e(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,t){const r=new _e(t,0),s=this.Zr.firstAfterOrEqual(r);return R.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,R.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jE{constructor(e){this.ri=e,this.docs=function(){return new se(M.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return R.resolve(r?r.document.mutableCopy():Se.newInvalidDocument(t))}getEntries(e,t){let r=bt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Se.newInvalidDocument(s))}),R.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=bt();const a=t.path,l=new M(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:d,value:{document:m}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||yv(wv(m),r)<=0||(s.has(m.key)||Fi(t,m))&&(i=i.insert(m.key,m.mutableCopy()))}return R.resolve(i)}getAllFromCollectionGroup(e,t,r,s){U(9500)}ii(e,t){return R.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new zE(this)}getSize(e){return R.resolve(this.size)}}class zE extends OE{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)}),R.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HE{constructor(e){this.persistence=e,this.si=new Pn(t=>za(t),Ha),this.lastRemoteSnapshotVersion=$.min(),this.highestTargetId=0,this.oi=0,this._i=new Ja,this.targetCount=0,this.ai=Jn.ur()}forEachTarget(e,t){return this.si.forEach((r,s)=>t(s)),R.resolve()}getLastRemoteSnapshotVersion(e){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return R.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),R.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Jn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,R.resolve()}updateTargetData(e,t){return this.Pr(t),R.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,R.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.si.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),R.waitFor(i).next(()=>s)}getTargetCount(e){return R.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return R.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),R.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),R.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),R.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return R.resolve(r)}containsKey(e,t){return R.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(e,t){this.ui={},this.overlays={},this.ci=new Li(0),this.li=!1,this.li=!0,this.hi=new $E,this.referenceDelegate=e(this),this.Pi=new HE(this),this.indexManager=new RE,this.remoteDocumentCache=function(s){return new jE(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new CE(t),this.Ii=new FE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new UE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new qE(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){L("MemoryPersistence","Starting transaction:",e);const s=new WE(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ai(e,t){return R.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,t)))}}class WE extends vv{constructor(e){super(),this.currentSequenceNumber=e}}class Za{constructor(e){this.persistence=e,this.Ri=new Ja,this.Vi=null}static mi(e){return new Za(e)}get fi(){if(this.Vi)return this.Vi;throw U(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),R.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),R.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),R.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.fi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.fi,r=>{const s=M.fromPath(r);return this.gi(e,s).next(i=>{i||t.removeEntry(s,$.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return R.or([()=>R.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class yi{constructor(e,t){this.persistence=e,this.pi=new Pn(r=>Iv(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=LE(this,t)}static mi(e,t){return new yi(e,t)}Ei(){}di(e){return R.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}wr(e){let t=0;return this.pr(e,r=>{t++}).next(()=>t)}pr(e,t){return R.forEach(this.pi,(r,s)=>this.br(e,r,s).next(i=>i?R.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,a=>this.br(e,a,t).next(l=>{l||(r++,i.removeEntry(a,$.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),R.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),R.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),R.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),R.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Hs(e.data.value)),t}br(e,t,r){return R.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return R.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=s}static As(e,t){let r=G(),s=G();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ec(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KE{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return Fy()?8:Ev(ke())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ys(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ws(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new GE;return this.Ss(e,t,a).next(l=>{if(i.result=l,this.Vs)return this.bs(e,t,a,l.size)})}).next(()=>i.result)}bs(e,t,r,s){return r.documentReadCount<this.fs?(Nn()<=H.DEBUG&&L("QueryEngine","SDK will not create cache indexes for query:",Ln(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),R.resolve()):(Nn()<=H.DEBUG&&L("QueryEngine","Query:",Ln(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Nn()<=H.DEBUG&&L("QueryEngine","The SDK decides to create cache indexes for query:",Ln(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,at(t))):R.resolve())}ys(e,t){if(Pu(t))return R.resolve(null);let r=at(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=ia(t,null,"F"),r=at(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=G(...i);return this.ps.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.Ds(t,l);return this.Cs(t,d,a,u.readTime)?this.ys(e,ia(t,null,"F")):this.vs(e,d,t,u)}))})))}ws(e,t,r,s){return Pu(t)||s.isEqual($.min())?R.resolve(null):this.ps.getDocuments(e,r).next(i=>{const a=this.Ds(t,i);return this.Cs(t,a,r,s)?R.resolve(null):(Nn()<=H.DEBUG&&L("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ln(t)),this.vs(e,a,t,gv(s,Qr)).next(l=>l))})}Ds(e,t){let r=new ge(ff(e));return t.forEach((s,i)=>{Fi(e,i)&&(r=r.add(i))}),r}Cs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,r){return Nn()<=H.DEBUG&&L("QueryEngine","Using full collection scan to execute query:",Ln(t)),this.ps.getDocumentsMatchingQuery(e,t,Kt.min(),r)}vs(e,t,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tc="LocalStore",QE=3e8;class YE{constructor(e,t,r,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new se(W),this.xs=new Pn(i=>za(i),Ha),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new BE(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function XE(n,e,t,r){return new YE(n,e,t,r)}async function Of(n,e){const t=q(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],l=[];let u=G();for(const d of s){a.push(d.batchId);for(const m of d.mutations)u=u.add(m.key)}for(const d of i){l.push(d.batchId);for(const m of d.mutations)u=u.add(m.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Ls:d,removedBatchIds:a,addedBatchIds:l}))})})}function JE(n,e){const t=q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return function(l,u,d,m){const p=d.batch,E=p.keys();let C=R.resolve();return E.forEach(D=>{C=C.next(()=>m.getEntry(u,D)).next(N=>{const k=d.docVersions.get(D);J(k!==null,48541),N.version.compareTo(k)<0&&(p.applyToRemoteDocument(N,d),N.isValidDocument()&&(N.setReadTime(d.commitVersion),m.addEntry(N)))})}),C.next(()=>l.mutationQueue.removeMutationBatch(u,p))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=G();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(u=u.add(l.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Mf(n){const e=q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function ZE(n,e){const t=q(n),r=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const l=[];e.targetChanges.forEach((m,p)=>{const E=s.get(p);if(!E)return;l.push(t.Pi.removeMatchingKeys(i,m.removedDocuments,p).next(()=>t.Pi.addMatchingKeys(i,m.addedDocuments,p)));let C=E.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?C=C.withResumeToken(Ie.EMPTY_BYTE_STRING,$.min()).withLastLimboFreeSnapshotVersion($.min()):m.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(m.resumeToken,r)),s=s.insert(p,C),function(N,k,B){return N.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=QE?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0}(E,C,m)&&l.push(t.Pi.updateTargetData(i,C))});let u=bt(),d=G();if(e.documentUpdates.forEach(m=>{e.resolvedLimboDocuments.has(m)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,m))}),l.push(eb(i,a,e.documentUpdates).next(m=>{u=m.ks,d=m.qs})),!r.isEqual($.min())){const m=t.Pi.getLastRemoteSnapshotVersion(i).next(p=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(m)}return R.waitFor(l).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Ms=s,i))}function eb(n,e,t){let r=G(),s=G();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=bt();return t.forEach((l,u)=>{const d=i.get(l);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual($.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):L(tc,"Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",u.version)}),{ks:a,qs:s}})}function tb(n,e){const t=q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=$a),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function nb(n,e){const t=q(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Pi.getTargetData(r,e).next(i=>i?(s=i,R.resolve(s)):t.Pi.allocateTargetId(r).next(a=>(s=new Ut(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r})}async function ua(n,e,t){const r=q(n),s=r.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!ur(a))throw a;L(tc,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function Fu(n,e,t){const r=q(n);let s=$.min(),i=G();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,m){const p=q(u),E=p.xs.get(m);return E!==void 0?R.resolve(p.Ms.get(E)):p.Pi.getTargetData(d,m)}(r,a,at(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,l.targetId).next(u=>{i=u})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,e,t?s:$.min(),t?i:G())).next(l=>(rb(r,qv(e),l),{documents:l,Qs:i})))}function rb(n,e,t){let r=n.Os.get(e)||$.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Os.set(e,r)}class Uu{constructor(){this.activeTargetIds=Kv()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class sb{constructor(){this.Mo=new Uu,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Uu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ib{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $u="ConnectivityMonitor";class qu{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){L($u,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){L($u,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qs=null;function ha(){return qs===null?qs=function(){return 268435456+Math.round(2147483648*Math.random())}():qs++,"0x"+qs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo="RestConnection",ob={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class ab{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===di?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,t,r,s,i){const a=ha(),l=this.zo(e,t.toUriEncodedString());L(Vo,`Sending RPC '${e}' ${a}:`,l,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,s,i);const{host:d}=new URL(l),m=or(d);return this.Jo(e,l,u,r,m).then(p=>(L(Vo,`Received RPC '${e}' ${a}: `,p),p),p=>{throw Kn(Vo,`RPC '${e}' ${a} failed with error: `,p,"url: ",l,"request:",r),p})}Ho(e,t,r,s,i,a){return this.Go(e,t,r,s,i)}jo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+cr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}zo(e,t){const r=ob[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cb{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ae="WebChannelConnection";class lb extends ab{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,s,i){const a=ha();return new Promise((l,u)=>{const d=new Fd;d.setWithCredentials(!0),d.listenOnce(Ud.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case zs.NO_ERROR:const p=d.getResponseJson();L(Ae,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),l(p);break;case zs.TIMEOUT:L(Ae,`RPC '${e}' ${a} timed out`),u(new V(S.DEADLINE_EXCEEDED,"Request time out"));break;case zs.HTTP_ERROR:const E=d.getStatus();if(L(Ae,`RPC '${e}' ${a} failed with status:`,E,"response text:",d.getResponseText()),E>0){let C=d.getResponseJson();Array.isArray(C)&&(C=C[0]);const D=C==null?void 0:C.error;if(D&&D.status&&D.message){const N=function(B){const j=B.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(j)>=0?j:S.UNKNOWN}(D.status);u(new V(N,D.message))}else u(new V(S.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new V(S.UNAVAILABLE,"Connection failed."));break;default:U(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{L(Ae,`RPC '${e}' ${a} completed.`)}});const m=JSON.stringify(s);L(Ae,`RPC '${e}' ${a} sending request:`,s),d.send(t,"POST",m,r,15)})}T_(e,t,r){const s=ha(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=jd(),l=qd(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const m=i.join("");L(Ae,`Creating RPC '${e}' stream ${s}: ${m}`,u);const p=a.createWebChannel(m,u);this.I_(p);let E=!1,C=!1;const D=new cb({Yo:k=>{C?L(Ae,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(E||(L(Ae,`Opening RPC '${e}' stream ${s} transport.`),p.open(),E=!0),L(Ae,`RPC '${e}' stream ${s} sending:`,k),p.send(k))},Zo:()=>p.close()}),N=(k,B,j)=>{k.listen(B,K=>{try{j(K)}catch(ue){setTimeout(()=>{throw ue},0)}})};return N(p,Nr.EventType.OPEN,()=>{C||(L(Ae,`RPC '${e}' stream ${s} transport opened.`),D.o_())}),N(p,Nr.EventType.CLOSE,()=>{C||(C=!0,L(Ae,`RPC '${e}' stream ${s} transport closed`),D.a_(),this.E_(p))}),N(p,Nr.EventType.ERROR,k=>{C||(C=!0,Kn(Ae,`RPC '${e}' stream ${s} transport errored. Name:`,k.name,"Message:",k.message),D.a_(new V(S.UNAVAILABLE,"The operation could not be completed")))}),N(p,Nr.EventType.MESSAGE,k=>{var B;if(!C){const j=k.data[0];J(!!j,16349);const K=j,ue=(K==null?void 0:K.error)||((B=K[0])==null?void 0:B.error);if(ue){L(Ae,`RPC '${e}' stream ${s} received error:`,ue);const De=ue.status;let oe=function(w){const b=he[w];if(b!==void 0)return Tf(b)}(De),_=ue.message;oe===void 0&&(oe=S.INTERNAL,_="Unknown error status: "+De+" with message "+ue.message),C=!0,D.a_(new V(oe,_)),p.close()}else L(Ae,`RPC '${e}' stream ${s} received:`,j),D.u_(j)}}),N(l,$d.STAT_EVENT,k=>{k.stat===Jo.PROXY?L(Ae,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===Jo.NOPROXY&&L(Ae,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{D.__()},0),D}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function No(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(n){return new fE(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&L("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ju="PersistentStream";class Ff{constructor(e,t,r,s,i,a,l,u){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Bf(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(Et(t.toString()),Et("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===t&&this.G_(r,s)},r=>{e(()=>{const s=new V(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return L(ju,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(L(ju,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ub extends Ff{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=gE(this.serializer,e),r=function(i){if(!("targetChange"in i))return $.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?$.min():a.readTime?ct(a.readTime):$.min()}(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=la(this.serializer),t.addTarget=function(i,a){let l;const u=a.target;if(l=ra(u)?{documents:_E(i,u)}:{query:vE(i,u).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Cf(i,a.resumeToken);const d=oa(i,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo($.min())>0){l.readTime=wi(i,a.snapshotVersion.toTimestamp());const d=oa(i,a.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,e);const r=bE(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=la(this.serializer),t.removeTarget=e,this.q_(t)}}class hb extends Ff{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return J(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,J(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){J(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=yE(e.writeResults,e.commitTime),r=ct(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=la(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>wE(this.serializer,r))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class db{}class fb extends db{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Go(e,aa(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new V(S.UNKNOWN,i.toString())})}Ho(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Ho(e,aa(t,r),s,a,l,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(S.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class mb{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Et(t),this.aa=!1):L("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn="RemoteStore";class pb{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(a=>{r.enqueueAndForget(async()=>{Cn(this)&&(L(bn,"Restarting streams for network reachability change."),await async function(u){const d=q(u);d.Ea.add(4),await ps(d),d.Ra.set("Unknown"),d.Ea.delete(4),await zi(d)}(this))})}),this.Ra=new mb(r,s)}}async function zi(n){if(Cn(n))for(const e of n.da)await e(!0)}async function ps(n){for(const e of n.da)await e(!1)}function Uf(n,e){const t=q(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),ic(t)?sc(t):dr(t).O_()&&rc(t,e))}function nc(n,e){const t=q(n),r=dr(t);t.Ia.delete(e),r.O_()&&$f(t,e),t.Ia.size===0&&(r.O_()?r.L_():Cn(t)&&t.Ra.set("Unknown"))}function rc(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo($.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}dr(n).Y_(e)}function $f(n,e){n.Va.Ue(e),dr(n).Z_(e)}function sc(n){n.Va=new lE({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),dr(n).start(),n.Ra.ua()}function ic(n){return Cn(n)&&!dr(n).x_()&&n.Ia.size>0}function Cn(n){return q(n).Ea.size===0}function qf(n){n.Va=void 0}async function gb(n){n.Ra.set("Online")}async function wb(n){n.Ia.forEach((e,t)=>{rc(n,e)})}async function yb(n,e){qf(n),ic(n)?(n.Ra.ha(e),sc(n)):n.Ra.set("Unknown")}async function _b(n,e,t){if(n.Ra.set("Online"),e instanceof Pf&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const l of i.targetIds)s.Ia.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ia.delete(l),s.Va.removeTarget(l))}(n,e)}catch(r){L(bn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await _i(n,r)}else if(e instanceof Ks?n.Va.Ze(e):e instanceof Af?n.Va.st(e):n.Va.tt(e),!t.isEqual($.min()))try{const r=await Mf(n.localStore);t.compareTo(r)>=0&&await function(i,a){const l=i.Va.Tt(a);return l.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const m=i.Ia.get(d);m&&i.Ia.set(d,m.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,d)=>{const m=i.Ia.get(u);if(!m)return;i.Ia.set(u,m.withResumeToken(Ie.EMPTY_BYTE_STRING,m.snapshotVersion)),$f(i,u);const p=new Ut(m.target,u,d,m.sequenceNumber);rc(i,p)}),i.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){L(bn,"Failed to raise snapshot:",r),await _i(n,r)}}async function _i(n,e,t){if(!ur(e))throw e;n.Ea.add(1),await ps(n),n.Ra.set("Offline"),t||(t=()=>Mf(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{L(bn,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await zi(n)})}function jf(n,e){return e().catch(t=>_i(n,t,e))}async function Hi(n){const e=q(n),t=Jt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:$a;for(;vb(e);)try{const s=await tb(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,Eb(e,s)}catch(s){await _i(e,s)}zf(e)&&Hf(e)}function vb(n){return Cn(n)&&n.Ta.length<10}function Eb(n,e){n.Ta.push(e);const t=Jt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function zf(n){return Cn(n)&&!Jt(n).x_()&&n.Ta.length>0}function Hf(n){Jt(n).start()}async function bb(n){Jt(n).ra()}async function Ib(n){const e=Jt(n);for(const t of n.Ta)e.ea(t.mutations)}async function Tb(n,e,t){const r=n.Ta.shift(),s=Qa.from(r,e,t);await jf(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Hi(n)}async function Ab(n,e){e&&Jt(n).X_&&await async function(r,s){if(function(a){return oE(a)&&a!==S.ABORTED}(s.code)){const i=r.Ta.shift();Jt(r).B_(),await jf(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Hi(r)}}(n,e),zf(n)&&Hf(n)}async function zu(n,e){const t=q(n);t.asyncQueue.verifyOperationInProgress(),L(bn,"RemoteStore received new credentials");const r=Cn(t);t.Ea.add(3),await ps(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await zi(t)}async function Pb(n,e){const t=q(n);e?(t.Ea.delete(2),await zi(t)):e||(t.Ea.add(2),await ps(t),t.Ra.set("Unknown"))}function dr(n){return n.ma||(n.ma=function(t,r,s){const i=q(t);return i.sa(),new ub(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:gb.bind(null,n),t_:wb.bind(null,n),r_:yb.bind(null,n),H_:_b.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),ic(n)?sc(n):n.Ra.set("Unknown")):(await n.ma.stop(),qf(n))})),n.ma}function Jt(n){return n.fa||(n.fa=function(t,r,s){const i=q(t);return i.sa(),new hb(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:bb.bind(null,n),r_:Ab.bind(null,n),ta:Ib.bind(null,n),na:Tb.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await Hi(n)):(await n.fa.stop(),n.Ta.length>0&&(L(bn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new gn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new oc(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ac(n,e){if(Et("AsyncQueue",`${e}: ${n}`),ur(n))return new V(S.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{static emptySet(e){return new Un(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||M.comparator(t.key,r.key):(t,r)=>M.comparator(t.key,r.key),this.keyedMap=Lr(),this.sortedSet=new se(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Un)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Un;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(){this.ga=new se(M.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):U(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class Zn{constructor(e,t,r,s,i,a,l,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new Zn(e,t,Un.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Bi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cb{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class Sb{constructor(){this.queries=Wu(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=q(t),i=s.queries;s.queries=Wu(),i.forEach((a,l)=>{for(const u of l.Sa)u.onError(r)})})(this,new V(S.ABORTED,"Firestore shutting down"))}}function Wu(){return new Pn(n=>df(n),Bi)}async function Rb(n,e){const t=q(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new Cb,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=ac(a,`Initialization of query '${Ln(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&cc(t)}async function kb(n,e){const t=q(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Db(n,e){const t=q(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.Sa)l.Fa(s)&&(r=!0);a.wa=s}}r&&cc(t)}function xb(n,e,t){const r=q(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function cc(n){n.Ca.forEach(e=>{e.next()})}var da,Gu;(Gu=da||(da={})).Ma="default",Gu.Cache="cache";class Vb{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Zn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Zn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==da.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{constructor(e){this.key=e}}class Gf{constructor(e){this.key=e}}class Nb{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=G(),this.mutatedKeys=G(),this.eu=ff(e),this.tu=new Un(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new Hu,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((m,p)=>{const E=s.get(m),C=Fi(this.query,p)?p:null,D=!!E&&this.mutatedKeys.has(E.key),N=!!C&&(C.hasLocalMutations||this.mutatedKeys.has(C.key)&&C.hasCommittedMutations);let k=!1;E&&C?E.data.isEqual(C.data)?D!==N&&(r.track({type:3,doc:C}),k=!0):this.su(E,C)||(r.track({type:2,doc:C}),k=!0,(u&&this.eu(C,u)>0||d&&this.eu(C,d)<0)&&(l=!0)):!E&&C?(r.track({type:0,doc:C}),k=!0):E&&!C&&(r.track({type:1,doc:E}),k=!0,(u||d)&&(l=!0)),k&&(C?(a=a.add(C),i=N?i.add(m):i.delete(m)):(a=a.delete(m),i=i.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),i=i.delete(m.key),r.track({type:1,doc:m})}return{tu:a,iu:r,Cs:l,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((m,p)=>function(C,D){const N=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U(20277,{Rt:k})}};return N(C)-N(D)}(m.type,p.type)||this.eu(m.doc,p.doc)),this.ou(r),s=s??!1;const l=t&&!s?this._u():[],u=this.Xa.size===0&&this.current&&!s?1:0,d=u!==this.Za;return this.Za=u,a.length!==0||d?{snapshot:new Zn(this.query,e.tu,i,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Hu,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=G(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const t=[];return e.forEach(r=>{this.Xa.has(r)||t.push(new Gf(r))}),this.Xa.forEach(r=>{e.has(r)||t.push(new Wf(r))}),t}cu(e){this.Ya=e.Qs,this.Xa=G();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Zn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const lc="SyncEngine";class Lb{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Ob{constructor(e){this.key=e,this.hu=!1}}class Mb{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new Pn(l=>df(l),Bi),this.Iu=new Map,this.Eu=new Set,this.du=new se(M.comparator),this.Au=new Map,this.Ru=new Ja,this.Vu={},this.mu=new Map,this.fu=Jn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Bb(n,e,t=!0){const r=Zf(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Kf(r,e,t,!0),s}async function Fb(n,e){const t=Zf(n);await Kf(t,e,!0,!1)}async function Kf(n,e,t,r){const s=await nb(n.localStore,at(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await Ub(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Uf(n.remoteStore,s),l}async function Ub(n,e,t,r,s){n.pu=(p,E,C)=>async function(N,k,B,j){let K=k.view.ru(B);K.Cs&&(K=await Fu(N.localStore,k.query,!1).then(({documents:_})=>k.view.ru(_,K)));const ue=j&&j.targetChanges.get(k.targetId),De=j&&j.targetMismatches.get(k.targetId)!=null,oe=k.view.applyChanges(K,N.isPrimaryClient,ue,De);return Qu(N,k.targetId,oe.au),oe.snapshot}(n,p,E,C);const i=await Fu(n.localStore,e,!0),a=new Nb(e,i.Qs),l=a.ru(i.documents),u=ms.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(l,n.isPrimaryClient,u);Qu(n,t,d.au);const m=new Lb(e,t,a);return n.Tu.set(e,m),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function $b(n,e,t){const r=q(n),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(a=>!Bi(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ua(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&nc(r.remoteStore,s.targetId),fa(r,s.targetId)}).catch(lr)):(fa(r,s.targetId),await ua(r.localStore,s.targetId,!0))}async function qb(n,e){const t=q(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),nc(t.remoteStore,r.targetId))}async function jb(n,e,t){const r=Yb(n);try{const s=await function(a,l){const u=q(a),d=re.now(),m=l.reduce((C,D)=>C.add(D.key),G());let p,E;return u.persistence.runTransaction("Locally write mutations","readwrite",C=>{let D=bt(),N=G();return u.Ns.getEntries(C,m).next(k=>{D=k,D.forEach((B,j)=>{j.isValidDocument()||(N=N.add(B))})}).next(()=>u.localDocuments.getOverlayedDocuments(C,D)).next(k=>{p=k;const B=[];for(const j of l){const K=tE(j,p.get(j.key).overlayedDocument);K!=null&&B.push(new nn(j.key,K,rf(K.value.mapValue),Ze.exists(!0)))}return u.mutationQueue.addMutationBatch(C,d,B,l)}).next(k=>{E=k;const B=k.applyToLocalDocumentSet(p,N);return u.documentOverlayCache.saveOverlays(C,k.batchId,B)})}).then(()=>({batchId:E.batchId,changes:pf(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,u){let d=a.Vu[a.currentUser.toKey()];d||(d=new se(W)),d=d.insert(l,u),a.Vu[a.currentUser.toKey()]=d}(r,s.batchId,t),await gs(r,s.changes),await Hi(r.remoteStore)}catch(s){const i=ac(s,"Failed to persist write");t.reject(i)}}async function Qf(n,e){const t=q(n);try{const r=await ZE(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Au.get(i);a&&(J(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?J(a.hu,14607):s.removedDocuments.size>0&&(J(a.hu,42227),a.hu=!1))}),await gs(t,r,e)}catch(r){await lr(r)}}function Ku(n,e,t){const r=q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach((i,a)=>{const l=a.view.va(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const u=q(a);u.onlineState=l;let d=!1;u.queries.forEach((m,p)=>{for(const E of p.Sa)E.va(l)&&(d=!0)}),d&&cc(u)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function zb(n,e,t){const r=q(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new se(M.comparator);a=a.insert(i,Se.newNoDocument(i,$.min()));const l=G().add(i),u=new qi($.min(),new Map,new se(W),a,l);await Qf(r,u),r.du=r.du.remove(i),r.Au.delete(e),uc(r)}else await ua(r.localStore,e,!1).then(()=>fa(r,e,t)).catch(lr)}async function Hb(n,e){const t=q(n),r=e.batch.batchId;try{const s=await JE(t.localStore,e);Xf(t,r,null),Yf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await gs(t,s)}catch(s){await lr(s)}}async function Wb(n,e,t){const r=q(n);try{const s=await function(a,l){const u=q(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let m;return u.mutationQueue.lookupMutationBatch(d,l).next(p=>(J(p!==null,37113),m=p.keys(),u.mutationQueue.removeMutationBatch(d,p))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,m,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m)).next(()=>u.localDocuments.getDocuments(d,m))})}(r.localStore,e);Xf(r,e,t),Yf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await gs(r,s)}catch(s){await lr(s)}}function Yf(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function Xf(n,e,t){const r=q(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function fa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(r=>{n.Ru.containsKey(r)||Jf(n,r)})}function Jf(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(nc(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),uc(n))}function Qu(n,e,t){for(const r of t)r instanceof Wf?(n.Ru.addReference(r.key,e),Gb(n,r)):r instanceof Gf?(L(lc,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||Jf(n,r.key)):U(19791,{wu:r})}function Gb(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(L(lc,"New document in limbo: "+t),n.Eu.add(r),uc(n))}function uc(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new M(te.fromString(e)),r=n.fu.next();n.Au.set(r,new Ob(t)),n.du=n.du.insert(t,r),Uf(n.remoteStore,new Ut(at(Wa(t.path)),r,"TargetPurposeLimboResolution",Li.ce))}}async function gs(n,e,t){const r=q(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((l,u)=>{a.push(r.pu(u,e,t).then(d=>{var m;if((d||t)&&r.isPrimaryClient){const p=d?!d.fromCache:(m=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:m.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(d){s.push(d);const p=ec.As(u.targetId,d);i.push(p)}}))}),await Promise.all(a),r.Pu.H_(s),await async function(u,d){const m=q(u);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>R.forEach(d,E=>R.forEach(E.Es,C=>m.persistence.referenceDelegate.addReference(p,E.targetId,C)).next(()=>R.forEach(E.ds,C=>m.persistence.referenceDelegate.removeReference(p,E.targetId,C)))))}catch(p){if(!ur(p))throw p;L(tc,"Failed to update sequence numbers: "+p)}for(const p of d){const E=p.targetId;if(!p.fromCache){const C=m.Ms.get(E),D=C.snapshotVersion,N=C.withLastLimboFreeSnapshotVersion(D);m.Ms=m.Ms.insert(E,N)}}}(r.localStore,i))}async function Kb(n,e){const t=q(n);if(!t.currentUser.isEqual(e)){L(lc,"User change. New user:",e.toKey());const r=await Of(t.localStore,e);t.currentUser=e,function(i,a){i.mu.forEach(l=>{l.forEach(u=>{u.reject(new V(S.CANCELLED,a))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await gs(t,r.Ls)}}function Qb(n,e){const t=q(n),r=t.Au.get(e);if(r&&r.hu)return G().add(r.key);{let s=G();const i=t.Iu.get(e);if(!i)return s;for(const a of i){const l=t.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function Zf(n){const e=q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Qf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Qb.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=zb.bind(null,e),e.Pu.H_=Db.bind(null,e.eventManager),e.Pu.yu=xb.bind(null,e.eventManager),e}function Yb(n){const e=q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Hb.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Wb.bind(null,e),e}class vi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ji(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return XE(this.persistence,new KE,e.initialUser,this.serializer)}Cu(e){return new Lf(Za.mi,this.serializer)}Du(e){return new sb}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}vi.provider={build:()=>new vi};class Xb extends vi{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){J(this.persistence.referenceDelegate instanceof yi,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new VE(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Me.withCacheSize(this.cacheSizeBytes):Me.DEFAULT;return new Lf(r=>yi.mi(r,t),this.serializer)}}class ma{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ku(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Kb.bind(null,this.syncEngine),await Pb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Sb}()}createDatastore(e){const t=ji(e.databaseInfo.databaseId),r=function(i){return new lb(i)}(e.databaseInfo);return function(i,a,l,u){return new fb(i,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,l){return new pb(r,s,i,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Ku(this.syncEngine,t,0),function(){return qu.v()?new qu:new ib}())}createSyncEngine(e,t){return function(s,i,a,l,u,d,m){const p=new Mb(s,i,a,l,u,d);return m&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=q(s);L(bn,"RemoteStore shutting down."),i.Ea.add(5),await ps(i),i.Aa.shutdown(),i.Ra.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}ma.provider={build:()=>new ma};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jb{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Et("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt="FirestoreClient";class Zb{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Pe.UNAUTHENTICATED,this.clientId=Ua.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{L(Zt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(L(Zt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new gn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=ac(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Lo(n,e){n.asyncQueue.verifyOperationInProgress(),L(Zt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Of(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Yu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await eI(n);L(Zt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>zu(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>zu(e.remoteStore,s)),n._onlineComponents=e}async function eI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){L(Zt,"Using user provided OfflineComponentProvider");try{await Lo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Kn("Error using user provided cache. Falling back to memory cache: "+t),await Lo(n,new vi)}}else L(Zt,"Using default OfflineComponentProvider"),await Lo(n,new Xb(void 0));return n._offlineComponents}async function em(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(L(Zt,"Using user provided OnlineComponentProvider"),await Yu(n,n._uninitializedComponentsProvider._online)):(L(Zt,"Using default OnlineComponentProvider"),await Yu(n,new ma))),n._onlineComponents}function tI(n){return em(n).then(e=>e.syncEngine)}async function Xu(n){const e=await em(n),t=e.eventManager;return t.onListen=Bb.bind(null,e.syncEngine),t.onUnlisten=$b.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Fb.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=qb.bind(null,e.syncEngine),t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tm(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ju=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nm="firestore.googleapis.com",Zu=!0;class eh{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new V(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=nm,this.ssl=Zu}else this.host=e.host,this.ssl=e.ssl??Zu;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Nf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<DE)throw new V(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}pv("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=tm(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Wi{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new eh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new eh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new iv;switch(r.type){case"firstParty":return new lv(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Ju.get(t);r&&(L("ComponentProvider","Removing Datastore"),Ju.delete(t),r.terminate())}(this),Promise.resolve()}}function nI(n,e,t,r={}){var d;n=Ht(n,Wi);const s=or(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;s&&(kd(`https://${l}`),Dd("Firestore",!0)),i.host!==nm&&i.host!==l&&Kn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:l,ssl:s,emulatorOptions:r};if(!_n(u,a)&&(n._setSettings(u),r.mockUserToken)){let m,p;if(typeof r.mockUserToken=="string")m=r.mockUserToken,p=Pe.MOCK_USER;else{m=ky(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const E=r.mockUserToken.sub||r.mockUserToken.user_id;if(!E)throw new V(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Pe(E)}n._authCredentials=new ov(new Hd(m,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Sn(this.firestore,e,this._query)}}class me{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Wt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new me(this.firestore,e,this._key)}toJSON(){return{type:me._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ds(t,me._jsonSchema))return new me(e,r||null,new M(te.fromString(t.referencePath)))}}me._jsonSchemaVersion="firestore/documentReference/1.0",me._jsonSchema={type:fe("string",me._jsonSchemaVersion),referencePath:fe("string")};class Wt extends Sn{constructor(e,t,r){super(e,t,Wa(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new me(this.firestore,null,new M(e))}withConverter(e){return new Wt(this.firestore,e,this._path)}}function ot(n,e,...t){if(n=we(n),Wd("collection","path",e),n instanceof Wi){const r=te.fromString(e,...t);return du(r),new Wt(n,null,r)}{if(!(n instanceof me||n instanceof Wt))throw new V(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(te.fromString(e,...t));return du(r),new Wt(n.firestore,null,r)}}function ws(n,e,...t){if(n=we(n),arguments.length===1&&(e=Ua.newId()),Wd("doc","path",e),n instanceof Wi){const r=te.fromString(e,...t);return hu(r),new me(n,null,new M(r))}{if(!(n instanceof me||n instanceof Wt))throw new V(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(te.fromString(e,...t));return hu(r),new me(n.firestore,n instanceof Wt?n.converter:null,new M(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th="AsyncQueue";class nh{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Bf(this,"async_queue_retry"),this._c=()=>{const r=No();r&&L(th,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=No();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=No();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new gn;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!ur(e))throw e;L(th,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,Et("INTERNAL UNHANDLED ERROR: ",rh(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=oc.createAndSchedule(this,e,t,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&U(47125,{Pc:rh(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function rh(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sh(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class er extends Wi{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new nh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new nh(e),this._firestoreClient=void 0,await e}}}function rI(n,e){const t=typeof n=="object"?n:Ld(),r=typeof n=="string"?n:di,s=Ba(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Sy("firestore");i&&nI(s,...i)}return s}function rm(n){if(n._terminated)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||sI(n),n._firestoreClient}function sI(n){var r,s,i;const e=n._freezeSettings(),t=function(l,u,d,m){return new Pv(l,u,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,tm(m.experimentalLongPollingOptions),m.useFetchStreams,m.isUsingEmulator)}(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,e);n._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((i=e.localCache)!=null&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Zb(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this._byteString=e}static fromBase64String(e){try{return new We(Ie.fromBase64String(e))}catch(t){throw new V(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new We(Ie.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:We._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ds(e,We._jsonSchema))return We.fromBase64String(e.bytes)}}We._jsonSchemaVersion="firestore/bytes/1.0",We._jsonSchema={type:fe("string",We._jsonSchemaVersion),bytes:fe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new be(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return W(this._lat,e._lat)||W(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:lt._jsonSchemaVersion}}static fromJSON(e){if(ds(e,lt._jsonSchema))return new lt(e.latitude,e.longitude)}}lt._jsonSchemaVersion="firestore/geoPoint/1.0",lt._jsonSchema={type:fe("string",lt._jsonSchemaVersion),latitude:fe("number"),longitude:fe("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ut._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ds(e,ut._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new ut(e.vectorValues);throw new V(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ut._jsonSchemaVersion="firestore/vectorValue/1.0",ut._jsonSchema={type:fe("string",ut._jsonSchemaVersion),vectorValues:fe("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iI=/^__.*__$/;class oI{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new nn(e,this.data,this.fieldMask,t,this.fieldTransforms):new fs(e,this.data,t,this.fieldTransforms)}}class sm{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new nn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function im(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U(40011,{Ac:n})}}class dc{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new dc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Ei(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(im(this.Ac)&&iI.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class aI{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ji(e)}Cc(e,t,r,s=!1){return new dc({Ac:e,methodName:t,Dc:r,path:be.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function fc(n){const e=n._freezeSettings(),t=ji(n._databaseId);return new aI(n._databaseId,!!e.ignoreUndefinedProperties,t)}function cI(n,e,t,r,s,i={}){const a=n.Cc(i.merge||i.mergeFields?2:0,e,t,s);mc("Data must be an object, but it was:",a,r);const l=om(r,a);let u,d;if(i.merge)u=new qe(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const m=[];for(const p of i.mergeFields){const E=pa(e,p,t);if(!a.contains(E))throw new V(S.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);cm(m,E)||m.push(E)}u=new qe(m),d=a.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,d=a.fieldTransforms;return new oI(new Be(l),u,d)}class Ki extends hc{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ki}}function lI(n,e,t,r){const s=n.Cc(1,e,t);mc("Data must be an object, but it was:",s,r);const i=[],a=Be.empty();tn(r,(u,d)=>{const m=pc(e,u,t);d=we(d);const p=s.yc(m);if(d instanceof Ki)i.push(m);else{const E=ys(d,p);E!=null&&(i.push(m),a.set(m,E))}});const l=new qe(i);return new sm(a,l,s.fieldTransforms)}function uI(n,e,t,r,s,i){const a=n.Cc(1,e,t),l=[pa(e,r,t)],u=[s];if(i.length%2!=0)throw new V(S.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let E=0;E<i.length;E+=2)l.push(pa(e,i[E])),u.push(i[E+1]);const d=[],m=Be.empty();for(let E=l.length-1;E>=0;--E)if(!cm(d,l[E])){const C=l[E];let D=u[E];D=we(D);const N=a.yc(C);if(D instanceof Ki)d.push(C);else{const k=ys(D,N);k!=null&&(d.push(C),m.set(C,k))}}const p=new qe(d);return new sm(m,p,a.fieldTransforms)}function hI(n,e,t,r=!1){return ys(t,n.Cc(r?4:3,e))}function ys(n,e){if(am(n=we(n)))return mc("Unsupported field value:",e,n),om(n,e);if(n instanceof hc)return function(r,s){if(!im(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const l of r){let u=ys(l,s.wc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=we(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Qv(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=re.fromDate(r);return{timestampValue:wi(s.serializer,i)}}if(r instanceof re){const i=new re(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:wi(s.serializer,i)}}if(r instanceof lt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof We)return{bytesValue:Cf(s.serializer,r._byteString)};if(r instanceof me){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Xa(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ut)return function(a,l){return{mapValue:{fields:{[tf]:{stringValue:nf},[fi]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw l.Sc("VectorValues must only contain numeric values.");return Ga(l.serializer,d)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${Ni(r)}`)}(n,e)}function om(n,e){const t={};return Qd(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):tn(n,(r,s)=>{const i=ys(s,e.mc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function am(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof re||n instanceof lt||n instanceof We||n instanceof me||n instanceof hc||n instanceof ut)}function mc(n,e,t){if(!am(t)||!Gd(t)){const r=Ni(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function pa(n,e,t){if((e=we(e))instanceof Gi)return e._internalPath;if(typeof e=="string")return pc(n,e);throw Ei("Field path arguments must be of type string or ",n,!1,void 0,t)}const dI=new RegExp("[~\\*/\\[\\]]");function pc(n,e,t){if(e.search(dI)>=0)throw Ei(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Gi(...e.split("."))._internalPath}catch{throw Ei(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ei(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new V(S.INVALID_ARGUMENT,l+n+u)}function cm(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lm{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new me(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new fI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(gc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class fI extends lm{data(){return super.data()}}function gc(n,e){return typeof e=="string"?pc(n,e):e instanceof Gi?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class wc{}class um extends wc{}function Oo(n,e,...t){let r=[];e instanceof wc&&r.push(e),r=r.concat(t),function(i){const a=i.filter(u=>u instanceof _c).length,l=i.filter(u=>u instanceof yc).length;if(a>1||a>0&&l>0)throw new V(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class yc extends um{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new yc(e,t,r)}_apply(e){const t=this._parse(e);return hm(e._query,t),new Sn(e.firestore,e.converter,sa(e._query,t))}_parse(e){const t=fc(e.firestore);return function(i,a,l,u,d,m,p){let E;if(d.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new V(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){oh(p,m);const D=[];for(const N of p)D.push(ih(u,i,N));E={arrayValue:{values:D}}}else E=ih(u,i,p)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||oh(p,m),E=hI(l,a,p,m==="in"||m==="not-in");return de.create(d,m,E)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class _c extends wc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new _c(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:et.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const l=i.getFlattenedFilters();for(const u of l)hm(a,u),a=sa(a,u)}(e._query,t),new Sn(e.firestore,e.converter,sa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class vc extends um{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new vc(e,t)}_apply(e){const t=function(s,i,a){if(s.startAt!==null)throw new V(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new V(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Zr(i,a)}(e._query,this._field,this._direction);return new Sn(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new hr(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function Mo(n,e="asc"){const t=e,r=gc("orderBy",n);return vc._create(r,t)}function ih(n,e,t){if(typeof(t=we(t))=="string"){if(t==="")throw new V(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!hf(e)&&t.indexOf("/")!==-1)throw new V(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(te.fromString(t));if(!M.isDocumentKey(r))throw new V(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return vu(n,new M(r))}if(t instanceof me)return vu(n,t._key);throw new V(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ni(t)}.`)}function oh(n,e){if(!Array.isArray(n)||n.length===0)throw new V(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function hm(n,e){const t=function(s,i){for(const a of s)for(const l of a.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class pI{convertValue(e,t="none"){switch(Xt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ce(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Yt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw U(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return tn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[fi].arrayValue)==null?void 0:s.values)==null?void 0:i.map(a=>ce(a.doubleValue));return new ut(t)}convertGeoPoint(e){return new lt(ce(e.latitude),ce(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Mi(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Yr(e));default:return null}}convertTimestamp(e){const t=Qt(e);return new re(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=te.fromString(e);J(Vf(r),9688,{name:e});const s=new Xr(r.get(1),r.get(3)),i=new M(r.popFirst(5));return s.isEqual(t)||Et(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gI(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class Mr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class wn extends lm{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Qs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(gc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=wn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}wn._jsonSchemaVersion="firestore/documentSnapshot/1.0",wn._jsonSchema={type:fe("string",wn._jsonSchemaVersion),bundleSource:fe("string","DocumentSnapshot"),bundleName:fe("string"),bundle:fe("string")};class Qs extends wn{data(e={}){return super.data(e)}}class $n{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Mr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Qs(this._firestore,this._userDataWriter,r.key,r,new Mr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const u=new Qs(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Mr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new Qs(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Mr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,m=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),m=a.indexOf(l.doc.key)),{type:wI(l.type),doc:u,oldIndex:d,newIndex:m}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=$n._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Ua.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function wI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U(61501,{type:n})}}$n._jsonSchemaVersion="firestore/querySnapshot/1.0",$n._jsonSchema={type:fe("string",$n._jsonSchemaVersion),bundleSource:fe("string","QuerySnapshot"),bundleName:fe("string"),bundle:fe("string")};class dm extends pI{constructor(e){super(),this.firestore=e}convertBytes(e){return new We(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new me(this.firestore,null,t)}}function Ec(n,e,t,...r){n=Ht(n,me);const s=Ht(n.firestore,er),i=fc(s);let a;return a=typeof(e=we(e))=="string"||e instanceof Gi?uI(i,"updateDoc",n._key,e,t,r):lI(i,"updateDoc",n._key,e),bc(s,[a.toMutation(n._key,Ze.exists(!0))])}function yI(n){return bc(Ht(n.firestore,er),[new Ka(n._key,Ze.none())])}function mn(n,e){const t=Ht(n.firestore,er),r=ws(n),s=gI(n.converter,e);return bc(t,[cI(fc(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Ze.exists(!1))]).then(()=>r)}function Bo(n,...e){var u,d,m;n=we(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||sh(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(sh(e[r])){const p=e[r];e[r]=(u=p.next)==null?void 0:u.bind(p),e[r+1]=(d=p.error)==null?void 0:d.bind(p),e[r+2]=(m=p.complete)==null?void 0:m.bind(p)}let i,a,l;if(n instanceof me)a=Ht(n.firestore,er),l=Wa(n._key.path),i={next:p=>{e[r]&&e[r](_I(a,n,p))},error:e[r+1],complete:e[r+2]};else{const p=Ht(n,Sn);a=Ht(p.firestore,er),l=p._query;const E=new dm(a);i={next:C=>{e[r]&&e[r](new $n(a,E,p,C))},error:e[r+1],complete:e[r+2]},mI(n._query)}return function(E,C,D,N){const k=new Jb(N),B=new Vb(C,k,D);return E.asyncQueue.enqueueAndForget(async()=>Rb(await Xu(E),B)),()=>{k.Nu(),E.asyncQueue.enqueueAndForget(async()=>kb(await Xu(E),B))}}(rm(a),l,s,i)}function bc(n,e){return function(r,s){const i=new gn;return r.asyncQueue.enqueueAndForget(async()=>jb(await tI(r),s,i)),i.promise}(rm(n),e)}function _I(n,e,t){const r=t.docs.get(e._key),s=new dm(n);return new wn(n,s,e._key,r,new Mr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(s){cr=s})(ar),Gn(new vn("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new er(new av(r.getProvider("auth-internal")),new uv(a,r.getProvider("app-check-internal")),function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new V(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Xr(d.options.projectId,m)}(a,s),a);return i={useFetchStreams:t,...i},l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),jt(au,cu,e),jt(au,cu,"esm2020")})();function fm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const vI=fm,mm=new us("auth","Firebase",fm());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi=new Oa("@firebase/auth");function EI(n,...e){bi.logLevel<=H.WARN&&bi.warn(`Auth (${ar}): ${n}`,...e)}function Ys(n,...e){bi.logLevel<=H.ERROR&&bi.error(`Auth (${ar}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(n,...e){throw Ic(n,...e)}function ht(n,...e){return Ic(n,...e)}function pm(n,e,t){const r={...vI(),[e]:t};return new us("auth","Firebase",r).create(e,{appName:n.name})}function Gt(n){return pm(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ic(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return mm.create(n,...e)}function F(n,e,...t){if(!n)throw Ic(e,...t)}function gt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ys(e),new Error(e)}function It(n,e){n||gt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ga(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function bI(){return ah()==="http:"||ah()==="https:"}function ah(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function II(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(bI()||Oy()||"connection"in navigator)?navigator.onLine:!0}function TI(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e,t){this.shortDelay=e,this.longDelay=t,It(t>e,"Short delay should be less than long delay!"),this.isMobile=Vy()||My()}get(){return II()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tc(n,e){It(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;gt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;gt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;gt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PI=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],CI=new _s(3e4,6e4);function Rn(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function rn(n,e,t,r,s={}){return wm(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=hs({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:u,...i};return Ly()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&or(n.emulatorConfig.host)&&(d.credentials="include"),gm.fetch()(await ym(n,n.config.apiHost,t,l),d)})}async function wm(n,e,t){n._canInitEmulator=!1;const r={...AI,...e};try{const s=new RI(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw js(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[u,d]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw js(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw js(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw js(n,"user-disabled",a);const m=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw pm(n,m,d);tt(n,m)}}catch(s){if(s instanceof At)throw s;tt(n,"network-request-failed",{message:String(s)})}}async function Qi(n,e,t,r,s={}){const i=await rn(n,e,t,r,s);return"mfaPendingCredential"in i&&tt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function ym(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Tc(n.config,s):`${n.config.apiScheme}://${s}`;return PI.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function SI(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class RI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ht(this.auth,"network-request-failed")),CI.get())})}}function js(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=ht(n,e,r);return s.customData._tokenResponse=t,s}function ch(n){return n!==void 0&&n.enterprise!==void 0}class kI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return SI(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function DI(n,e){return rn(n,"GET","/v2/recaptchaConfig",Rn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xI(n,e){return rn(n,"POST","/v1/accounts:delete",e)}async function Ii(n,e){return rn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function VI(n,e=!1){const t=we(n),r=await t.getIdToken(e),s=Ac(r);F(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Wr(Fo(s.auth_time)),issuedAtTime:Wr(Fo(s.iat)),expirationTime:Wr(Fo(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Fo(n){return Number(n)*1e3}function Ac(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ys("JWT malformed, contained fewer than 3 sections"),null;try{const s=Pd(t);return s?JSON.parse(s):(Ys("Failed to decode base64 JWT payload"),null)}catch(s){return Ys("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function lh(n){const e=Ac(n);return F(e,"internal-error"),F(typeof e.exp<"u","internal-error"),F(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ns(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof At&&NI(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function NI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Wr(this.lastLoginAt),this.creationTime=Wr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ti(n){var p;const e=n.auth,t=await n.getIdToken(),r=await ns(n,Ii(e,{idToken:t}));F(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?_m(s.providerUserInfo):[],a=MI(n.providerData,i),l=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),d=l?u:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new wa(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,m)}async function OI(n){const e=we(n);await Ti(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function MI(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function _m(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BI(n,e){const t=await wm(n,{},async()=>{const r=hs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await ym(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return n.emulatorConfig&&or(n.emulatorConfig.host)&&(u.credentials="include"),gm.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function FI(n,e){return rn(n,"POST","/v2/accounts:revokeToken",Rn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){F(e.idToken,"internal-error"),F(typeof e.idToken<"u","internal-error"),F(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):lh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){F(e.length!==0,"internal-error");const t=lh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(F(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await BI(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new qn;return r&&(F(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(F(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(F(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new qn,this.toJSON())}_performRefresh(){return gt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(n,e){F(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Xe{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new LI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new wa(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ns(this,this.stsTokenManager.getToken(this.auth,e));return F(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return VI(this,e)}reload(){return OI(this)}_assign(e){this!==e&&(F(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Xe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){F(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ti(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qe(this.auth.app))return Promise.reject(Gt(this.auth));const e=await this.getIdToken();return await ns(this,xI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,l=t.tenantId??void 0,u=t._redirectEventId??void 0,d=t.createdAt??void 0,m=t.lastLoginAt??void 0,{uid:p,emailVerified:E,isAnonymous:C,providerData:D,stsTokenManager:N}=t;F(p&&N,e,"internal-error");const k=qn.fromJSON(this.name,N);F(typeof p=="string",e,"internal-error"),xt(r,e.name),xt(s,e.name),F(typeof E=="boolean",e,"internal-error"),F(typeof C=="boolean",e,"internal-error"),xt(i,e.name),xt(a,e.name),xt(l,e.name),xt(u,e.name),xt(d,e.name),xt(m,e.name);const B=new Xe({uid:p,auth:e,email:s,emailVerified:E,displayName:r,isAnonymous:C,photoURL:a,phoneNumber:i,tenantId:l,stsTokenManager:k,createdAt:d,lastLoginAt:m});return D&&Array.isArray(D)&&(B.providerData=D.map(j=>({...j}))),u&&(B._redirectEventId=u),B}static async _fromIdTokenResponse(e,t,r=!1){const s=new qn;s.updateFromServerResponse(t);const i=new Xe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ti(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];F(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?_m(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new qn;l.updateFromIdToken(r);const u=new Xe({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new wa(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uh=new Map;function wt(n){It(n instanceof Function,"Expected a class definition");let e=uh.get(n);return e?(It(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,uh.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}vm.type="NONE";const hh=vm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xs(n,e,t){return`firebase:${n}:${e}:${t}`}class jn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Xs(this.userKey,s.apiKey,i),this.fullPersistenceKey=Xs("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ii(this.auth,{idToken:e}).catch(()=>{});return t?Xe._fromGetAccountInfoResponse(this.auth,t,e):null}return Xe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new jn(wt(hh),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||wt(hh);const a=Xs(r,e.config.apiKey,e.name);let l=null;for(const d of t)try{const m=await d._get(a);if(m){let p;if(typeof m=="string"){const E=await Ii(e,{idToken:m}).catch(()=>{});if(!E)break;p=await Xe._fromGetAccountInfoResponse(e,E,m)}else p=Xe._fromJSON(e,m);d!==i&&(l=p),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new jn(i,e,r):(i=u[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new jn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Tm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Em(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Pm(e))return"Blackberry";if(Cm(e))return"Webos";if(bm(e))return"Safari";if((e.includes("chrome/")||Im(e))&&!e.includes("edge/"))return"Chrome";if(Am(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Em(n=ke()){return/firefox\//i.test(n)}function bm(n=ke()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Im(n=ke()){return/crios\//i.test(n)}function Tm(n=ke()){return/iemobile/i.test(n)}function Am(n=ke()){return/android/i.test(n)}function Pm(n=ke()){return/blackberry/i.test(n)}function Cm(n=ke()){return/webos/i.test(n)}function Pc(n=ke()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function UI(n=ke()){var e;return Pc(n)&&!!((e=window.navigator)!=null&&e.standalone)}function $I(){return By()&&document.documentMode===10}function Sm(n=ke()){return Pc(n)||Am(n)||Cm(n)||Pm(n)||/windows phone/i.test(n)||Tm(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rm(n,e=[]){let t;switch(n){case"Browser":t=dh(ke());break;case"Worker":t=`${dh(ke())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ar}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const u=e(i);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jI(n,e={}){return rn(n,"GET","/v2/passwordPolicy",Rn(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zI=6;class HI{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??zI,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WI{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new fh(this),this.idTokenSubscription=new fh(this),this.beforeStateQueue=new qI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=mm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=wt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await jn.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ii(this,{idToken:e}),r=await Xe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Qe(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,l=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return F(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ti(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=TI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qe(this.app))return Promise.reject(Gt(this));const t=e?we(e):null;return t&&F(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&F(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qe(this.app)?Promise.reject(Gt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qe(this.app)?Promise.reject(Gt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(wt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await jI(this),t=new HI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new us("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await FI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&wt(e)||this._popupRedirectResolver;F(t,this,"argument-error"),this.redirectPersistenceManager=await jn.create(this,[wt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(F(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return F(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Rm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(Qe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&EI(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function fr(n){return we(n)}class fh{constructor(e){this.auth=e,this.observer=null,this.addObserver=Wy(t=>this.observer=t)}get next(){return F(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function GI(n){Yi=n}function km(n){return Yi.loadJS(n)}function KI(){return Yi.recaptchaEnterpriseScript}function QI(){return Yi.gapiScript}function YI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class XI{constructor(){this.enterprise=new JI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class JI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const ZI="recaptcha-enterprise",Dm="NO_RECAPTCHA";class eT{constructor(e){this.type=ZI,this.auth=fr(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,l)=>{DI(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const d=new kI(u);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,a(d.siteKey)}}).catch(u=>{l(u)})})}function s(i,a,l){const u=window.grecaptcha;ch(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(d=>{a(d)}).catch(()=>{a(Dm)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new XI().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(l=>{if(!t&&ch(window.grecaptcha))s(l,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=KI();u.length!==0&&(u+=l),km(u).then(()=>{s(l,i,a)}).catch(d=>{a(d)})}}).catch(l=>{a(l)})})}}async function mh(n,e,t,r=!1,s=!1){const i=new eT(n);let a;if(s)a=Dm;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const l={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const u=l.phoneEnrollmentInfo.phoneNumber,d=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const u=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:a}):Object.assign(l,{captchaResponse:a}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function ph(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await mh(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await mh(n,e,t,t==="getOobCode");return r(n,l)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tT(n,e){const t=Ba(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(_n(i,e??{}))return s;tt(s,"already-initialized")}return t.initialize({options:e})}function nT(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(wt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function rT(n,e,t){const r=fr(n);F(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=xm(e),{host:a,port:l}=sT(e),u=l===null?"":`:${l}`,d={url:`${i}//${a}${u}/`},m=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){F(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),F(_n(d,r.config.emulator)&&_n(m,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=m,r.settings.appVerificationDisabledForTesting=!0,or(a)?(kd(`${i}//${a}${u}`),Dd("Auth",!0)):iT()}function xm(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function sT(n){const e=xm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:gh(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:gh(a)}}}function gh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function iT(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return gt("not implemented")}_getIdTokenResponse(e){return gt("not implemented")}_linkToIdToken(e,t){return gt("not implemented")}_getReauthenticationResolver(e){return gt("not implemented")}}async function oT(n,e){return rn(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aT(n,e){return Qi(n,"POST","/v1/accounts:signInWithPassword",Rn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cT(n,e){return Qi(n,"POST","/v1/accounts:signInWithEmailLink",Rn(n,e))}async function lT(n,e){return Qi(n,"POST","/v1/accounts:signInWithEmailLink",Rn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs extends Cc{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new rs(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new rs(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ph(e,t,"signInWithPassword",aT);case"emailLink":return cT(e,{email:this._email,oobCode:this._password});default:tt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ph(e,r,"signUpPassword",oT);case"emailLink":return lT(e,{idToken:t,email:this._email,oobCode:this._password});default:tt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zn(n,e){return Qi(n,"POST","/v1/accounts:signInWithIdp",Rn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uT="http://localhost";class In extends Cc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new In(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):tt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new In(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return zn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,zn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,zn(e,t)}buildRequest(){const e={requestUri:uT,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=hs(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hT(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function dT(n){const e=xr(Vr(n)).link,t=e?xr(Vr(e)).deep_link_id:null,r=xr(Vr(n)).deep_link_id;return(r?xr(Vr(r)).link:null)||r||t||e||n}class Sc{constructor(e){const t=xr(Vr(e)),r=t.apiKey??null,s=t.oobCode??null,i=hT(t.mode??null);F(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=dT(e);try{return new Sc(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(){this.providerId=mr.PROVIDER_ID}static credential(e,t){return rs._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Sc.parseLink(t);return F(r,"argument-error"),rs._fromEmailAndCode(e,r.code,r.tenantId)}}mr.PROVIDER_ID="password";mr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";mr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vm{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs extends Vm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt extends vs{constructor(){super("facebook.com")}static credential(e){return In._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Vt.credentialFromTaggedObject(e)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Vt.credential(e.oauthAccessToken)}catch{return null}}}Vt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Vt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt extends vs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return In._fromParams({providerId:Nt.PROVIDER_ID,signInMethod:Nt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Nt.credentialFromTaggedObject(e)}static credentialFromError(e){return Nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Nt.credential(t,r)}catch{return null}}}Nt.GOOGLE_SIGN_IN_METHOD="google.com";Nt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt extends vs{constructor(){super("github.com")}static credential(e){return In._fromParams({providerId:Lt.PROVIDER_ID,signInMethod:Lt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Lt.credentialFromTaggedObject(e)}static credentialFromError(e){return Lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Lt.credential(e.oauthAccessToken)}catch{return null}}}Lt.GITHUB_SIGN_IN_METHOD="github.com";Lt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot extends vs{constructor(){super("twitter.com")}static credential(e,t){return In._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Ot.credential(t,r)}catch{return null}}}Ot.TWITTER_SIGN_IN_METHOD="twitter.com";Ot.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Xe._fromIdTokenResponse(e,r,s),a=wh(r);return new tr({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=wh(r);return new tr({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function wh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai extends At{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ai.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Ai(e,t,r,s)}}function Nm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ai._fromErrorAndOperation(n,i,e,r):i})}async function fT(n,e,t=!1){const r=await ns(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return tr._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mT(n,e,t=!1){const{auth:r}=n;if(Qe(r.app))return Promise.reject(Gt(r));const s="reauthenticate";try{const i=await ns(n,Nm(r,s,e,n),t);F(i.idToken,r,"internal-error");const a=Ac(i.idToken);F(a,r,"internal-error");const{sub:l}=a;return F(n.uid===l,r,"user-mismatch"),tr._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&tt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lm(n,e,t=!1){if(Qe(n.app))return Promise.reject(Gt(n));const r="signIn",s=await Nm(n,r,e),i=await tr._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function pT(n,e){return Lm(fr(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gT(n){const e=fr(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function wT(n,e,t){return Qe(n.app)?Promise.reject(Gt(n)):pT(we(n),mr.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&gT(n),r})}function yT(n,e,t,r){return we(n).onIdTokenChanged(e,t,r)}function _T(n,e,t){return we(n).beforeAuthStateChanged(e,t)}function vT(n,e,t,r){return we(n).onAuthStateChanged(e,t,r)}function ET(n){return we(n).signOut()}const Pi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Om{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Pi,"1"),this.storage.removeItem(Pi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bT=1e3,IT=10;class Mm extends Om{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Sm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);$I()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,IT):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},bT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Mm.type="LOCAL";const TT=Mm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bm extends Om{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Bm.type="SESSION";const Fm=Bm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AT(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Xi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async d=>d(t.origin,i)),u=await AT(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Xi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PT{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,u)=>{const d=Rc("",20);s.port1.start();const m=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const E=p;if(E.data.eventId===d)switch(E.data.status){case"ack":clearTimeout(m),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(E.data.response);break;default:clearTimeout(m),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(){return window}function CT(n){dt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Um(){return typeof dt().WorkerGlobalScope<"u"&&typeof dt().importScripts=="function"}async function ST(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function RT(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function kT(){return Um()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $m="firebaseLocalStorageDb",DT=1,Ci="firebaseLocalStorage",qm="fbase_key";class Es{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ji(n,e){return n.transaction([Ci],e?"readwrite":"readonly").objectStore(Ci)}function xT(){const n=indexedDB.deleteDatabase($m);return new Es(n).toPromise()}function ya(){const n=indexedDB.open($m,DT);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ci,{keyPath:qm})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ci)?e(r):(r.close(),await xT(),e(await ya()))})})}async function yh(n,e,t){const r=Ji(n,!0).put({[qm]:e,value:t});return new Es(r).toPromise()}async function VT(n,e){const t=Ji(n,!1).get(e),r=await new Es(t).toPromise();return r===void 0?null:r.value}function _h(n,e){const t=Ji(n,!0).delete(e);return new Es(t).toPromise()}const NT=800,LT=3;class jm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ya(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>LT)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Um()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Xi._getInstance(kT()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await ST(),!this.activeServiceWorker)return;this.sender=new PT(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||RT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ya();return await yh(e,Pi,"1"),await _h(e,Pi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>yh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>VT(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>_h(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ji(s,!1).getAll();return new Es(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),NT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}jm.type="LOCAL";const OT=jm;new _s(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MT(n,e){return e?wt(e):(F(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc extends Cc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return zn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return zn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return zn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function BT(n){return Lm(n.auth,new kc(n),n.bypassAuthState)}function FT(n){const{auth:e,user:t}=n;return F(t,e,"internal-error"),mT(t,new kc(n),n.bypassAuthState)}async function UT(n){const{auth:e,user:t}=n;return F(t,e,"internal-error"),fT(t,new kc(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return BT;case"linkViaPopup":case"linkViaRedirect":return UT;case"reauthViaPopup":case"reauthViaRedirect":return FT;default:tt(this.auth,"internal-error")}}resolve(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $T=new _s(2e3,1e4);class Bn extends zm{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Bn.currentPopupAction&&Bn.currentPopupAction.cancel(),Bn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return F(e,this.auth,"internal-error"),e}async onExecution(){It(this.filter.length===1,"Popup operations only handle one event");const e=Rc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ht(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(ht(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Bn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ht(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,$T.get())};e()}}Bn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qT="pendingRedirect",Js=new Map;class jT extends zm{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Js.get(this.auth._key());if(!e){try{const r=await zT(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Js.set(this.auth._key(),e)}return this.bypassAuthState||Js.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function zT(n,e){const t=GT(e),r=WT(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function HT(n,e){Js.set(n._key(),e)}function WT(n){return wt(n._redirectPersistence)}function GT(n){return Xs(qT,n.config.apiKey,n.name)}async function KT(n,e,t=!1){if(Qe(n.app))return Promise.reject(Gt(n));const r=fr(n),s=MT(r,e),a=await new jT(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QT=10*60*1e3;class YT{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!XT(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Hm(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(ht(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=QT&&this.cachedEventUids.clear(),this.cachedEventUids.has(vh(e))}saveEventToCache(e){this.cachedEventUids.add(vh(e)),this.lastProcessedEventTime=Date.now()}}function vh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Hm({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function XT(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Hm(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JT(n,e={}){return rn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,eA=/^https?/;async function tA(n){if(n.config.emulator)return;const{authorizedDomains:e}=await JT(n);for(const t of e)try{if(nA(t))return}catch{}tt(n,"unauthorized-domain")}function nA(n){const e=ga(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!eA.test(t))return!1;if(ZT.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rA=new _s(3e4,6e4);function Eh(){const n=dt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function sA(n){return new Promise((e,t)=>{var s,i,a;function r(){Eh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Eh(),t(ht(n,"network-request-failed"))},timeout:rA.get()})}if((i=(s=dt().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=dt().gapi)!=null&&a.load)r();else{const l=YI("iframefcb");return dt()[l]=()=>{gapi.load?r():t(ht(n,"network-request-failed"))},km(`${QI()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw Zs=null,e})}let Zs=null;function iA(n){return Zs=Zs||sA(n),Zs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oA=new _s(5e3,15e3),aA="__/auth/iframe",cA="emulator/auth/iframe",lA={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},uA=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function hA(n){const e=n.config;F(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Tc(e,cA):`https://${n.config.authDomain}/${aA}`,r={apiKey:e.apiKey,appName:n.name,v:ar},s=uA.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${hs(r).slice(1)}`}async function dA(n){const e=await iA(n),t=dt().gapi;return F(t,n,"internal-error"),e.open({where:document.body,url:hA(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:lA,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=ht(n,"network-request-failed"),l=dt().setTimeout(()=>{i(a)},oA.get());function u(){dt().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fA={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},mA=500,pA=600,gA="_blank",wA="http://localhost";class bh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function yA(n,e,t,r=mA,s=pA){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u={...fA,width:r.toString(),height:s.toString(),top:i,left:a},d=ke().toLowerCase();t&&(l=Im(d)?gA:t),Em(d)&&(e=e||wA,u.scrollbars="yes");const m=Object.entries(u).reduce((E,[C,D])=>`${E}${C}=${D},`,"");if(UI(d)&&l!=="_self")return _A(e||"",l),new bh(null);const p=window.open(e||"",l,m);F(p,n,"popup-blocked");try{p.focus()}catch{}return new bh(p)}function _A(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vA="__/auth/handler",EA="emulator/auth/handler",bA=encodeURIComponent("fac");async function Ih(n,e,t,r,s,i){F(n.config.authDomain,n,"auth-domain-config-required"),F(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ar,eventId:s};if(e instanceof Vm){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Hy(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[m,p]of Object.entries({}))a[m]=p}if(e instanceof vs){const m=e.getScopes().filter(p=>p!=="");m.length>0&&(a.scopes=m.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const m of Object.keys(l))l[m]===void 0&&delete l[m];const u=await n._getAppCheckToken(),d=u?`#${bA}=${encodeURIComponent(u)}`:"";return`${IA(n)}?${hs(l).slice(1)}${d}`}function IA({config:n}){return n.emulator?Tc(n,EA):`https://${n.authDomain}/${vA}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uo="webStorageSupport";class TA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Fm,this._completeRedirectFn=KT,this._overrideRedirectResult=HT}async _openPopup(e,t,r,s){var a;It((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await Ih(e,t,r,ga(),s);return yA(e,i,Rc())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Ih(e,t,r,ga(),s);return CT(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(It(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await dA(e),r=new YT(e);return t.register("authEvent",s=>(F(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Uo,{type:Uo},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[Uo];i!==void 0&&t(!!i),tt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=tA(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Sm()||bm()||Pc()}}const AA=TA;var Th="@firebase/auth",Ah="1.11.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){F(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CA(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function SA(n){Gn(new vn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;F(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Rm(n)},d=new WI(r,s,i,u);return nT(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Gn(new vn("auth-internal",e=>{const t=fr(e.getProvider("auth").getImmediate());return(r=>new PA(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),jt(Th,Ah,CA(n)),jt(Th,Ah,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RA=5*60,kA=Rd("authIdTokenMaxAge")||RA;let Ph=null;const DA=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>kA)return;const s=t==null?void 0:t.token;Ph!==s&&(Ph=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function xA(n=Ld()){const e=Ba(n,"auth");if(e.isInitialized())return e.getImmediate();const t=tT(n,{popupRedirectResolver:AA,persistence:[OT,TT,Fm]}),r=Rd("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=DA(i.toString());_T(t,a,()=>a(t.currentUser)),yT(t,l=>a(l))}}const s=Cd("auth");return s&&rT(t,`http://${s}`),t}function VA(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}GI({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=ht("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",VA().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});SA("Browser");const NA={apiKey:"AIzaSyDDattjUKvqvZAu3jqsByTrIqsWBqpZDQc",authDomain:"productioncalc-bbd66.firebaseapp.com",projectId:"productioncalc-bbd66",storageBucket:"productioncalc-bbd66.firebasestorage.app",messagingSenderId:"420327013478",appId:"1:420327013478:web:67c9c3d3bfd554e3a341a7",measurementId:"G-TQ8BD1NLXL"};console.log("✅ Secure environment variables loaded successfully!");const Wm=Nd(NA),Fe=rI(Wm),$o=xA(Wm),Dc={"12 oz. Can":{type:"can",galPerPallet:118,casesPerPallet:340.375},"12 oz. Slim Can":{type:"can",galPerPallet:117,casesPerPallet:337.333},"7.5 oz. Can":{type:"can",galPerPallet:109,casesPerPallet:506},"16 oz. Can":{type:"can",galPerPallet:120,casesPerPallet:259.33},"12oz Bottle":{type:"bottle",factor:2.8889},"20oz Bottle":{type:"bottle",factor:1.7281},"0.5 Liter Bottle":{type:"bottle",factor:2.0502},"1 Liter Bottle":{type:"bottle",factor:2.0502},"1.5 Liter Bottle":{type:"bottle",factor:1.625}},xc={"12oz Can Wraps (12-Pack)":{boxesPerPallet:48,unitsPerBox:185,unitsPerPallet:8880,unitsPerCase:2,desc:"12oz Can - 12 Pack Config",category:"can",unitName:"Pallets"},"12oz 24PK 2 Tray (24PK)":{unitsPerPallet:2400,unitsPerCase:1,desc:"12oz 24PK 2 Tray (24PK)",category:"can",unitName:"Pallets"},"12oz Can Wraps (24-Pack)":{boxesPerPallet:24,unitsPerBox:150,unitsPerPallet:3600,unitsPerCase:1,desc:"12oz Can - 24 Pack Config",category:"can",unitName:"Pallets"},"12oz Can Film Trays (35-Pack)":{unitsPerPallet:1600,unitsPerCase:1,desc:"12oz Can - 35 Pack Tray (Film)",category:"can",unitName:"Pallets",stdCaseFactor:35/24},"7.5oz Can Hi-Cone Trays (6-Pack)":{unitsPerPallet:2800,unitsPerCase:1,desc:"7.5oz Can - 6 Pack Hi-Cone",category:"can",unitName:"Pallets"},"7.5oz Can Film Trays (30-Pack)":{unitsPerPallet:2400,unitsPerCase:1,desc:"7.5oz Can - 30 Pack Tray (Film)",category:"can",unitName:"Pallets",stdCaseFactor:30/24},"0.5L Bottle Label Rolls (6-Pack)":{unitsPerPallet:23e3,unitsPerCase:24,desc:"0.5L Labels (6-Pack) - Hi-Cone Config",category:"bottle",unitName:"Rolls"},"20oz Bottle Label Rolls (Loose)":{unitsPerPallet:21e3,unitsPerCase:24,desc:"20oz Labels (Loose) - Roll Config",category:"bottle",unitName:"Rolls"},"Bottle Caps (Box)":{unitsPerPallet:58850,unitsPerCase:24,desc:"28mm Caps (58,850/Box)",category:"bottle",unitName:"Boxes"},"20oz Film Pads (24-Pack)":{unitsPerPallet:3168,unitsPerCase:1,desc:"20oz Film Pads - 24-Pack (3,168/Pallet)",category:"bottle",unitName:"Pallets"},"Hi-Cone Reel 6-Pack (12oz/0.5l)":{unitsPerPallet:68800,unitsPerCase:24,desc:"Hi-Cone Reel 6-Pack - 12oz/0.5L (68,800/Reel)",category:"bottle",unitName:"Reels"}},Vc=[{name:"DPSG Diets, Sweetened, Zero & RCCB Core (0.5L, 20oz Bottles)",weeks:11},{name:"DPSG Diets & RCCB Core (1L Bottles)",weeks:13},{name:"MM Lemonade Zero Sugar & MM Brands (Bottles)",weeks:22},{name:"MM Lemonade Brands <1L Bottles (Except 20oz Fruit Punch)",weeks:26},{name:"Non-carbonated / MM Fruit Punch (20oz Bottles)",weeks:35},{name:"POWERADE / POWER WATER (Bottles)",weeks:39},{name:"Dasani (Bottles)",weeks:52}],Nc=[{name:"C/F Diet Coke, All Diet Coke flavors (except Diet Coke Lime & Diet Cherry Coke)",weeks:13},{name:"All Coke Zero flavors, Zero Barq's RB, Fanta Orange Zero, All Sprite Zero flavors, Vanilla Coke Zero, Fresca Original/Peach, Diet Coke Lime, Diet Cherry Coke, Mr Pibb Zero",weeks:18},{name:"MM Lemonade, MM Pink Lemonade, MM Lemonade Zero",weeks:26},{name:"All Aguas Frescas flavors, All Topo Chico Sabores flavors",weeks:30},{name:"MM Fruit Punch",weeks:35},{name:"Coke, All Coke flavors, All Fanta flavors, Seagram's GA/Tonic, All Sprite flavors, All Powerade Flavors, Mr Pibb, Barq's Root Beer, Coke Orange Cream, All Peace Tea flavors, Barq's Red Crème, Inca Kola, All Bodyarmor-FIT",weeks:39},{name:"Seagram's Seltzer, All AHA Flavors, Dasani can",weeks:52}];let pt={...xc},yt={...Dc},Ye={};Vc.forEach(n=>Ye[n.name]={...n,category:"bottle"});Nc.forEach(n=>Ye[n.name]={...n,category:"can"});let Br={},Fr={},Ur={},Tt=null,Ch="syrup",Ce="materials",Ke={casesPerGal:0,casesPerPlt:0};async function LA(){try{const n=parseInt(localStorage.getItem("bgCycleIndex")||"0");document.body.classList.add("bg-"+(n%4+1)),localStorage.setItem("bgCycleIndex",n+1),MA();const e=document.getElementById("datecode-date");e&&(e.valueAsDate=new Date);const t=document.getElementById("fizz-container");if(t&&t.childElementCount===0)for(let r=0;r<20;r++)qA(t);qo(),Sh(),OA(),Bo(Oo(ot(Fe,"materials"),Mo("name")),r=>{const s={};Br={},r.empty||r.forEach(i=>{const a=i.data();s[a.name]=a,Br[a.name]||(Br[a.name]=[]),Br[a.name].push(i.id)}),pt={...xc,...s},qo(),Ym(),Ce==="materials"&&Gr()},r=>console.warn("Firestore access restricted, continuing with defaults.",r.message)),Bo(Oo(ot(Fe,"products"),Mo("name")),r=>{const s={};Fr={},r.empty||r.forEach(i=>{const a=i.data();s[a.name]=a,Fr[a.name]||(Fr[a.name]=[]),Fr[a.name].push(i.id)}),yt={...Dc,...s},qo(),Oc(),Ce==="products"&&Gr()},r=>console.warn("Firestore access restricted, continuing with defaults.",r.message)),Bo(Oo(ot(Fe,"qacodes"),Mo("name")),r=>{const s={};Ur={},r.empty||r.forEach(i=>{const a=i.data();s[a.name]=a,Ur[a.name]||(Ur[a.name]=[]),Ur[a.name].push(i.id)}),Ye={},Vc.forEach(i=>Ye[i.name]={...i,category:"bottle"}),Nc.forEach(i=>Ye[i.name]={...i,category:"can"}),Ye={...Ye,...s},Sh(),Km(),Ce==="qacodes"&&Gr()},r=>console.warn("Firestore access restricted, continuing with defaults.",r.message))}catch(n){console.error("Initialization Error:",n)}}function OA(){if(document.getElementById("conversion-pro-tip"))return;const n=document.getElementById("syrup-info-badge"),e=document.createElement("div");if(e.id="conversion-pro-tip",e.className="mt-6 mb-2 bg-blue-50/60 border border-blue-200 rounded-lg p-4 shadow-sm backdrop-blur-sm",e.innerHTML='<div class="flex items-start"> <i class="fas fa-lightbulb text-blue-600 mt-1 mr-3 text-lg"></i> <div> <h4 class="font-bold text-blue-900 text-sm uppercase tracking-wide mb-1">Pro Tip: Standard Case Conversions</h4> <p class="text-xs text-blue-800 leading-relaxed font-medium"> Our plant tracks all production volume using a standard 24-pack as the baseline. Because of this, anytime we run a different package size, we have to do a little math to make sure our physical counts match the system. <br><br> For example, a <strong>35-pack</strong> has 11 more cans than a standard 24-pack. When you divide 35 by 24, you get a multiplier of <strong>1.458</strong>. This means every physical 35-pack we build actually counts as ~1.46 standard cases! <br><br> The same rule applies to smaller packs. An <strong>18-pack</strong> has 6 fewer cans than a 24-pack. Dividing 18 by 24 gives us <strong>0.75</strong>, meaning each physical 18-pack only counts as three-quarters of a standard case. Converting our boxes like this ensures our total can counts always line up perfectly at the end of the shift. </p> </div> </div>',n&&n.parentNode)n.parentNode.insertBefore(e,n.nextSibling);else{const t=document.getElementById("content-syrup");t&&t.appendChild(e)}}async function Gm(){const e={materials:"Materials",products:"Products",qacodes:"QA Codes"}[Ce]||"Data";if((await Je.fire({title:"Migrate to Cloud?",text:`This will push all default ${e} to the cloud. Clicking multiple times will create duplicates!`,icon:"warning",showCancelButton:!0,confirmButtonColor:"#b91c1c",cancelButtonColor:"#6b7280",confirmButtonText:"Yes, migrate it!"})).isConfirmed)try{if(Ce==="materials")for(const[r,s]of Object.entries(xc))await mn(ot(Fe,"materials"),{name:r,...s});else if(Ce==="products")for(const[r,s]of Object.entries(Dc))await mn(ot(Fe,"products"),{name:r,...s});else if(Ce==="qacodes"){for(const r of Vc)await mn(ot(Fe,"qacodes"),{name:r.name,category:"bottle",weeks:r.weeks});for(const r of Nc)await mn(ot(Fe,"qacodes"),{name:r.name,category:"can",weeks:r.weeks})}Je.fire({toast:!0,position:"top-end",icon:"success",title:`${e} migration complete!`,showConfirmButton:!1,timer:3e3})}catch(r){Je.fire({toast:!0,position:"top-end",icon:"error",title:`Error migrating: ${r.message}`,showConfirmButton:!1,timer:3e3})}}window.migrateDataToCloud=Gm;function MA(){const n=document.getElementById("login-btn"),e=document.getElementById("admin-panel"),t=document.getElementById("logout-btn");vT($o,r=>{r?(n&&n.classList.add("hidden"),e&&e.classList.remove("hidden"),t&&t.classList.remove("hidden"),Gr()):(n&&n.classList.remove("hidden"),e&&e.classList.add("hidden"),t&&t.classList.add("hidden"))}),n&&n.addEventListener("click",()=>{const r=document.createElement("div");r.className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4";const s=document.createElement("div");s.className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full",s.innerHTML=`
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Admin Login</h2>
          <input type="email" id="modal-email" placeholder="Email" class="w-full mb-3 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500" />
          <input type="password" id="modal-password" placeholder="Password" class="w-full mb-5 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500" />
          <div class="flex justify-end gap-3">
            <button id="modal-cancel" class="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition">Cancel</button>
            <button id="modal-submit" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition shadow-md">Login</button>
          </div>
        `,r.appendChild(s),document.body.appendChild(r),document.getElementById("modal-email").focus(),document.getElementById("modal-cancel").addEventListener("click",()=>r.remove());const i=document.getElementById("modal-submit"),a=document.getElementById("modal-email"),l=document.getElementById("modal-password"),u=async()=>{const d=a.value.trim(),m=l.value;if(d&&m){i.innerText="Logging in...",i.disabled=!0;try{await wT($o,d,m),Je.fire({toast:!0,position:"top-end",icon:"success",title:"Logged in successfully",showConfirmButton:!1,timer:2e3}),r.remove()}catch(p){Je.fire({icon:"error",title:"Login Failed",text:p.message,confirmButtonColor:"#b91c1c"}),i.innerText="Login",i.disabled=!1}}};i.addEventListener("click",u),l.addEventListener("keypress",d=>{d.key==="Enter"&&u()})}),t&&t.addEventListener("click",()=>{ET($o),en()})}function BA(n){Ce=n,document.querySelectorAll(".admin-tab").forEach(t=>{t.classList.remove("active","text-red-700","border-b-2","border-red-700"),t.classList.add("text-gray-500")});const e=document.getElementById("admin-tab-"+n);e.classList.remove("text-gray-500"),e.classList.add("active","text-red-700","border-b-2","border-red-700"),document.querySelectorAll(".admin-form").forEach(t=>t.classList.add("hidden")),document.getElementById("admin-form-"+n).classList.remove("hidden"),en(),Gr()}function Lc(){document.getElementById("new-prod-type").value==="bottle"?(document.getElementById("prod-can-fields").classList.add("hidden"),document.getElementById("prod-bottle-fields").classList.remove("hidden")):(document.getElementById("prod-can-fields").classList.remove("hidden"),document.getElementById("prod-bottle-fields").classList.add("hidden"))}async function FA(){const n=document.getElementById("new-mat-name").value,e=document.getElementById("new-mat-number"),t=e?e.value.trim():"",r=parseFloat(document.getElementById("new-mat-units").value),s=parseFloat(document.getElementById("new-mat-per-case").value),i=document.getElementById("new-mat-desc").value,a=document.getElementById("new-mat-cat").value,l=parseFloat(document.getElementById("new-mat-factor").value)||null;if(!n||!r||!s)return alert("Fill all required fields!");const u={name:n,number:t,unitsPerPallet:r,unitsPerCase:s,desc:i||n,category:a,stdCaseFactor:l,unitName:"Pallets"};try{Tt?await Ec(ws(Fe,"materials",Tt),u):await mn(ot(Fe,"materials"),u),en()}catch(d){alert("Error saving material: "+d.message)}}async function UA(){const n=document.getElementById("new-prod-name").value,e=document.getElementById("new-prod-type").value;if(!n)return alert("Product name required!");let t={name:n,type:e};e==="can"?(t.galPerPallet=parseFloat(document.getElementById("new-prod-gal-plt").value)||0,t.casesPerPallet=parseFloat(document.getElementById("new-prod-cs-plt").value)||0):t.factor=parseFloat(document.getElementById("new-prod-factor").value)||0;try{Tt?await Ec(ws(Fe,"products",Tt),t):await mn(ot(Fe,"products"),t),en()}catch(r){alert("Error saving product: "+r.message)}}async function $A(){const n=document.getElementById("new-qa-name").value,e=document.getElementById("new-qa-cat").value,t=parseInt(document.getElementById("new-qa-weeks").value)||0;if(!n||!t)return alert("Fill all required fields!");try{Tt?await Ec(ws(Fe,"qacodes",Tt),{name:n,category:e,weeks:t}):await mn(ot(Fe,"qacodes"),{name:n,category:e,weeks:t}),en()}catch(r){alert("Error saving QA code: "+r.message)}}function en(){document.querySelectorAll(".admin-form input").forEach(n=>n.value=""),Tt=null,["material","product","qacode"].forEach(n=>{const e=document.getElementById(`btn-save-${n}`);e&&(e.innerText=`Save ${n.charAt(0).toUpperCase()+n.slice(1)}`,e.classList.replace("bg-yellow-600","bg-red-600"),e.classList.replace("hover:bg-yellow-700","hover:bg-red-700"))}),document.querySelectorAll(".cancel-edit-btn").forEach(n=>n.remove()),Lc()}function Gr(){const n=document.getElementById("admin-database-list");if(!n)return;n.innerHTML="";let e,t,r;Ce==="materials"?(e=pt,t=Br,r=i=>`<strong class="text-gray-900">${i.number?`[${i.number}] `:""}${i.name}</strong> <span class="text-xs text-gray-500 ml-1 whitespace-nowrap">(${i.unitsPerPallet}/plt)</span>`):Ce==="products"?(e=yt,t=Fr,r=i=>`<strong class="text-gray-900">${i.name}</strong> <span class="text-xs text-gray-500 ml-1 whitespace-nowrap">(${i.type.toUpperCase()})</span>`):Ce==="qacodes"&&(e=Ye,t=Ur,r=i=>`<strong class="text-gray-900">${i.name}</strong> <span class="text-xs text-gray-500 ml-1 whitespace-nowrap">(${i.weeks} wks, ${i.category})</span>`);const s=Object.keys(t).sort();if(s.length===0)return n.innerHTML='<div class="text-sm text-gray-500 italic p-2">No custom items in database yet. Try Migrating!</div>';s.forEach(i=>{const a=e[i],l=t[i];if(!a||!l)return;const u=l[0],d=document.createElement("div");d.className="flex justify-between items-start bg-white text-slate-800 p-2 mb-2 rounded border border-gray-200 text-sm w-full",d.innerHTML=`
            <div class="flex-1 min-w-0 pr-2">
                <div class="whitespace-normal break-words leading-snug">${r(a)}</div>
                ${l.length>1?`<div class="text-xs text-red-600 font-bold mt-1 px-2 py-0.5 bg-red-100 rounded inline-block"><i class="fas fa-exclamation-triangle"></i> ${l.length} Copies Found (Delete to clear all)</div>`:""}
            </div>
            <div class="flex gap-2 flex-shrink-0">
                <button class="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1 rounded transition edit-btn" data-id="${u}" data-name="${i.replace(/"/g,"&quot;")}"><i class="fas fa-edit"></i></button>
                <button class="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition delete-btn" data-ids='${JSON.stringify(l)}'><i class="fas fa-trash-alt"></i></button>
            </div>`,n.appendChild(d)}),document.querySelectorAll(".delete-btn").forEach(i=>{i.addEventListener("click",async a=>{const l=a.target.closest("button"),u=JSON.parse(l.dataset.ids);if((await Je.fire({title:"Delete from Cloud?",text:"Are you sure you want to delete this?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#b91c1c",cancelButtonColor:"#6b7280",confirmButtonText:"Yes, delete it!"})).isConfirmed){let m=Ce==="products"?"products":Ce==="qacodes"?"qacodes":"materials";try{for(const p of u)await yI(ws(Fe,m,p)),Tt===p&&en();Je.fire({toast:!0,position:"top-end",icon:"success",title:"Deleted successfully",showConfirmButton:!1,timer:2e3})}catch(p){Je.fire({toast:!0,position:"top-end",icon:"error",title:"Error deleting",text:p.message,showConfirmButton:!1,timer:3e3})}}})}),document.querySelectorAll(".edit-btn").forEach(i=>{i.addEventListener("click",a=>{var E;const l=a.target.closest("button"),u=l.dataset.name,d=e[u];Tt=l.dataset.id;let m="";if(Ce==="materials"){document.getElementById("new-mat-name").value=d.name;const C=document.getElementById("new-mat-number");C&&(C.value=d.number||""),document.getElementById("new-mat-units").value=d.unitsPerPallet,document.getElementById("new-mat-per-case").value=d.unitsPerCase,document.getElementById("new-mat-desc").value=d.desc||"",document.getElementById("new-mat-cat").value=d.category,document.getElementById("new-mat-factor").value=d.stdCaseFactor||"",m="btn-save-material"}else Ce==="products"?(document.getElementById("new-prod-name").value=d.name,document.getElementById("new-prod-type").value=d.type,Lc(),d.type==="can"?(document.getElementById("new-prod-gal-plt").value=d.galPerPallet,document.getElementById("new-prod-cs-plt").value=d.casesPerPallet):document.getElementById("new-prod-factor").value=d.factor,m="btn-save-product"):Ce==="qacodes"&&(document.getElementById("new-qa-name").value=d.name,document.getElementById("new-qa-cat").value=d.category,document.getElementById("new-qa-weeks").value=d.weeks,m="btn-save-qacode");const p=document.getElementById(m);if(p.innerText="Update",p.classList.replace("bg-red-600","bg-yellow-600"),p.classList.replace("hover:bg-red-700","hover:bg-yellow-700"),!((E=p.nextElementSibling)!=null&&E.classList.contains("cancel-edit-btn"))){const C=document.createElement("button");C.innerText="Cancel",C.className="cancel-edit-btn mt-2 bg-gray-500 text-white px-4 py-2 rounded font-bold hover:bg-gray-600 w-full shadow-md transition",C.addEventListener("click",en),p.parentNode.insertBefore(C,p.nextSibling)}})})}document.addEventListener("DOMContentLoaded",LA);function qA(n){const e=document.createElement("div");e.classList.add("bubble"),e.style.setProperty("--size",Math.random()*20+5+"px"),e.style.setProperty("--left",Math.random()*100+"%"),e.style.setProperty("--duration",Math.random()*5+8+"s"),e.style.setProperty("--delay",Math.random()*10+"s"),e.style.setProperty("--drift",Math.random()*100-50+"px"),n.appendChild(e)}function qo(){const n=document.getElementById("syrup-product"),e=document.getElementById("mat-select"),t=n?n.value:null,r=e?e.value:null;if(n){n.innerHTML='<option value="" disabled selected hidden>Select a Product...</option>';const s=document.createElement("optgroup");s.label="Cans",s.className="text-red-800 font-bold bg-red-50";const i=document.createElement("optgroup");i.label="Bottles",i.className="text-gray-800 font-bold bg-slate-50",Object.keys(yt).sort().forEach(a=>{let l=document.createElement("option");l.value=a,l.innerText=a,l.className="text-gray-700 bg-white font-normal",yt[a].type==="bottle"?i.appendChild(l):s.appendChild(l)}),n.appendChild(s),n.appendChild(i),t&&yt[t]?n.value=t:yt["12 oz. Can"]&&(n.value="12 oz. Can"),n.value&&Oc()}if(e){e.innerHTML='<option value="" disabled selected hidden>Select a Raw Material...</option>';const s=document.createElement("optgroup");s.label="Cans",s.className="text-red-800 font-bold bg-red-50";const i=document.createElement("optgroup");i.label="Bottles",i.className="text-gray-800 font-bold bg-slate-50",Object.keys(pt).sort().forEach(a=>{let l=document.createElement("option");l.value=a,l.innerText=pt[a].number?`[${pt[a].number}] ${a}`:a,l.className="text-gray-700 bg-white font-normal",pt[a].category==="bottle"?i.appendChild(l):s.appendChild(l)}),e.appendChild(s),e.appendChild(i),r&&pt[r]&&(e.value=r)}}function Sh(){const n=document.getElementById("datecode-product");if(!n)return;const e=n.value;n.innerHTML='<option value="">Select a Product Category...</option>';const t=document.createElement("optgroup");t.label="Cans",t.className="font-bold text-red-800 bg-red-50";const r=document.createElement("optgroup");r.label="Bottles",r.className="font-bold text-gray-800 bg-slate-50",Object.keys(Ye).sort().forEach(s=>{const i=Ye[s],a=document.createElement("option");a.value=i.weeks,a.innerText=`${i.name} (${i.weeks} Weeks)`,a.className="font-normal text-gray-800 bg-white",i.category==="bottle"?r.appendChild(a):t.appendChild(a)}),n.appendChild(t),n.appendChild(r),e&&Object.values(Ye).some(i=>i.weeks.toString()===e)&&(n.value=e)}function Km(){const n=document.getElementById("datecode-product"),e=document.getElementById("datecode-date"),t=document.getElementById("datecode-result"),r=document.getElementById("datecode-print");if(!n||!e)return;const s=parseInt(n.value),i=e.value;if(!s||isNaN(s)||!i){t&&(t.innerText="---"),r&&(r.innerText="---");return}const a=new Date(i+"T12:00:00"),l=a.getDay(),u=(l+6)%7,d=new Date(a.getTime()-u*24*60*60*1e3),m=new Date(d.getTime()+s*7*24*60*60*1e3),E=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m.getMonth()],C=String(m.getDate()).padStart(2,"0"),D=String(m.getFullYear()).slice(-2);t&&(t.innerText=`${E}-${C}-${D}`);const N=["G","A","B","C","D","E","F"];r&&(r.innerText=`BB${E.toUpperCase()}${C}${D}DD${N[l]}`)}function ei(n){Ch!==n&&(Ch=n,document.querySelectorAll(".tab-pane").forEach(e=>{e.classList.remove("active"),setTimeout(()=>{e.classList.contains("active")||e.classList.add("hidden")},200)}),document.querySelectorAll(".nav-tab").forEach(e=>e.classList.remove("active")),setTimeout(()=>{const e=document.getElementById("content-"+n);e.classList.remove("hidden"),setTimeout(()=>e.classList.add("active"),10)},200),document.getElementById("tab-"+n).classList.add("active"),setTimeout(()=>{var e,t,r;n==="syrup"?(e=document.getElementById("syrup-product"))==null||e.focus():n==="materials"?(t=document.getElementById("mat-select"))==null||t.focus():n==="datecode"&&((r=document.getElementById("datecode-product"))==null||r.focus())},250))}function Oc(){const n=document.getElementById("syrup-product").value,e=yt[n],t=document.getElementById("syrup-plts"),r=document.getElementById("syrup-info-badge");if(!e){r&&(r.textContent="Select a product..."),Ke={casesPerGal:0,casesPerPlt:0};return}Ke.casesPerGal=e.type==="bottle"?e.factor:e.casesPerPallet/e.galPerPallet,Ke.casesPerPlt=e.type==="bottle"?0:e.casesPerPallet,Qm("cases"),e.type==="bottle"?(t&&(t.disabled=!0,t.parentElement.classList.add("opacity-50"),t.placeholder="N/A"),r&&(r.innerText=`Type: Bottle | Conv Factor: ${e.factor}`,r.className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-black text-white")):(t&&(t.disabled=!1,t.parentElement.classList.remove("opacity-50"),t.placeholder="0"),r&&(r.innerText=`Yield: ${Ke.casesPerGal.toFixed(2)} cs/gal | ${Ke.casesPerPlt.toFixed(2)} cs/plt`,r.className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800"))}function Qm(n){var g;const e=yt[(g=document.getElementById("syrup-product"))==null?void 0:g.value];if(!e)return;const t=document.getElementById("syrup-gals"),r=document.getElementById("syrup-plts"),s=document.getElementById("syrup-cases"),i=document.getElementById("syrup-actual-cases-1"),a=document.getElementById("syrup-pack-size-1"),l=document.getElementById("syrup-actual-cases-2"),u=document.getElementById("syrup-pack-size-2"),d=document.getElementById("syrup-actual-cases-3"),m=document.getElementById("syrup-pack-size-3"),p=a&&parseFloat(a.value)||18,E=u&&parseFloat(u.value)||24,C=m&&parseFloat(m.value)||35;let D;n==="gals"?D=t:n==="plts"?D=r:n==="cases"?D=s:n==="actual-1"?D=i:n==="actual-2"?D=l:n==="actual-3"&&(D=d);let N=D?D.value.trim():"",k=0;if(!n.startsWith("packsize")&&N.startsWith("="))try{k=new Function("return "+N.substring(1).replace(/[^0-9+\-*/(). ]/g,""))()}catch{k=0}else n.startsWith("packsize")||(k=parseFloat(N)||0);let B=0,j=0,K=0,ue=n==="actual-1"?k:parseFloat(i==null?void 0:i.value)||0,De=n==="actual-2"?k:parseFloat(l==null?void 0:l.value)||0,oe=n==="actual-3"?k:parseFloat(d==null?void 0:d.value)||0;const _=w=>!w||isNaN(w)||!isFinite(w)?"":Number.isInteger(w)?w.toString():w.toFixed(2);n.startsWith("actual")||n.startsWith("packsize")?(B=ue*p/24+De*E/24+oe*C/24,e.type==="bottle"?j=B/e.factor:(j=B/Ke.casesPerGal,K=B/Ke.casesPerPlt),t&&(t.value=_(j)),r&&e.type!=="bottle"&&(r.value=_(K)),s&&(s.value=_(B))):(n==="gals"?B=e.type==="bottle"?k*e.factor:k*Ke.casesPerGal:n==="plts"?B=e.type==="bottle"?0:k*Ke.casesPerPlt:n==="cases"&&(B=k),e.type==="bottle"?j=B/e.factor:(j=B/Ke.casesPerGal,K=B/Ke.casesPerPlt),t&&n!=="gals"&&(t.value=_(j)),r&&e.type!=="bottle"&&n!=="plts"&&(r.value=_(K)),s&&n!=="cases"&&(s.value=_(B)),i&&(i.value=""),l&&(l.value=""),d&&(d.value=""))}function jA(){var e;document.getElementById("syrup-gals")&&(document.getElementById("syrup-gals").value=""),document.getElementById("syrup-cases")&&(document.getElementById("syrup-cases").value="");const n=yt[(e=document.getElementById("syrup-product"))==null?void 0:e.value];n&&n.type!=="bottle"&&document.getElementById("syrup-plts")&&(document.getElementById("syrup-plts").value=""),document.getElementById("syrup-actual-cases-1")&&(document.getElementById("syrup-actual-cases-1").value=""),document.getElementById("syrup-actual-cases-2")&&(document.getElementById("syrup-actual-cases-2").value=""),document.getElementById("syrup-actual-cases-3")&&(document.getElementById("syrup-actual-cases-3").value="")}function Ym(){const n=document.getElementById("mat-select");if(!n||!n.value)return;const e=pt[n.value],t=document.getElementById("mat-yield"),r=document.getElementById("mat-info-badge"),s=document.getElementById("mat-unit-label");if(!e){t.innerText="-",r.innerText="Select a material...",r.classList.remove("hidden"),s.innerText="Pallets/Rolls",_a();return}const i=e.unitsPerPallet/e.unitsPerCase;t.innerText=i.toLocaleString(void 0,{maximumFractionDigits:2})+" Cases";const a=e.number?`[${e.number}] `:"";r.innerText=e.boxesPerPallet?`${a}${e.desc} | Spec: ${e.boxesPerPallet} boxes × ${e.unitsPerBox} units = ${e.unitsPerPallet.toLocaleString()} total`:`${a}${e.desc} | Spec: ${e.unitsPerPallet.toLocaleString()} total units/pallet`,s.innerText=e.unitName||"Pallets",r.classList.remove("hidden"),_a()}function _a(){const n=document.getElementById("mat-select");if(!n||!n.value)return;const e=pt[n.value];let t=document.getElementById("mat-target").value.trim(),r=0;if(t.startsWith("="))try{r=new Function("return "+t.substring(1).replace(/[^0-9+\-*/(). ]/g,""))()}catch{r=0}else r=parseFloat(t);const s=document.getElementById("mat-needed");if(e&&!isNaN(r)&&r>0){const i=r/(e.unitsPerPallet/e.unitsPerCase);window.animateNumber?window.animateNumber(s,i):s.innerText=i.toFixed(2)}else window.animateNumber?window.animateNumber(s,0):s.innerText="0.00"}function zA(){document.getElementById("mat-target").value="";const n=document.getElementById("mat-needed");window.animateNumber?window.animateNumber(n,0):n.innerText="0.00"}function HA(n,e){if(n.value.trim().startsWith("="))try{const t=new Function("return "+n.value.substring(1).replace(/[^0-9+\-*/(). ]/g,""))();isFinite(t)&&(n.value=Math.round(t*100)/100,e&&e())}catch{}else e&&e()}window.switchTab=ei;window.updateSyrupProduct=Oc;window.calculateSyrup=Qm;window.clearSyrup=jA;window.updateMaterial=Ym;window.calculateMaterial=_a;window.clearMaterial=zA;window.handleMath=HA;window.calculateDateCode=Km;window.migrateDataToCloud=Gm;window.switchAdminTab=BA;window.toggleProductFields=Lc;window.saveMaterial=FA;window.saveProduct=UA;window.saveQACode=$A;window.resetAdminForm=en;const Dr=new Map;window.animateNumber=function(n,e,t=400){if(!n)return;const r=parseFloat(e)||0;Dr.has(n.id)&&cancelAnimationFrame(Dr.get(n.id));let s=n.innerText.replace(/[^0-9.-]/g,""),i=parseFloat(s);if(isNaN(i)&&(i=0),i===r){n.innerText=r.toFixed(2);return}let a=null;const l=u=>{a||(a=u);const d=Math.min((u-a)/t,1),m=1-Math.pow(1-d,4),p=i+(r-i)*m;n.innerText=p.toFixed(2),d<1?Dr.set(n.id,requestAnimationFrame(l)):Dr.delete(n.id)};Dr.set(n.id,requestAnimationFrame(l))};const Rh=document.getElementById("theme-toggle"),Vn=document.getElementById("theme-toggle-icon");function kh(n){n?(document.body.classList.add("dark-mode"),Vn&&(Vn.classList.remove("fa-moon"),Vn.classList.add("fa-sun"))):(document.body.classList.remove("dark-mode"),Vn&&(Vn.classList.remove("fa-sun"),Vn.classList.add("fa-moon")))}Rh&&(Rh.addEventListener("click",()=>{const n=!document.body.classList.contains("dark-mode");localStorage.setItem("darkMode",n?"enabled":"disabled"),kh(n)}),localStorage.getItem("darkMode")==="enabled"&&kh(!0));document.addEventListener("keydown",n=>{n.altKey&&n.key==="1"?(n.preventDefault(),ei("syrup")):n.altKey&&n.key==="2"?(n.preventDefault(),ei("materials")):n.altKey&&n.key==="3"&&(n.preventDefault(),ei("datecode"))});
