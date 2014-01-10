/*!
 * Fotorama 4.4.9 | http://fotorama.io/license/
 */
!function(a,b,c,d,e){"use strict";function f(a){var b="bez_"+d.makeArray(arguments).join("_").replace(".","p");if("function"!=typeof d.easing[b]){var c=function(a,b){var c=[null,null],d=[null,null],e=[null,null],f=function(f,g){return e[g]=3*a[g],d[g]=3*(b[g]-a[g])-e[g],c[g]=1-e[g]-d[g],f*(e[g]+f*(d[g]+f*c[g]))},g=function(a){return e[0]+a*(2*d[0]+3*c[0]*a)},h=function(a){for(var b,c=a,d=0;++d<14&&(b=f(c,0)-a,!(Math.abs(b)<.001));)c-=b/g(c);return c};return function(a){return f(h(a),1)}};d.easing[b]=function(b,d,e,f,g){return f*c([a[0],a[1]],[a[2],a[3]])(d/g)+e}}return b}function g(){}function h(a,b,c){return Math.max(isNaN(b)?-1/0:b,Math.min(isNaN(c)?1/0:c,a))}function i(a){return a.match(/ma/)&&a.match(/-?\d+(?!d)/g)[a.match(/3d/)?12:4]}function j(a){return Bc?+i(a.css("transform")):+a.css("left").replace("px","")}function k(a,b){var c={};return Bc?c.transform="translate3d("+(a+(b?.001:0))+"px,0,0)":c.left=a,c}function l(a){return{"transition-duration":a+"ms"}}function m(a,b){return+String(a).replace(b||"px","")||e}function n(a){return/%$/.test(a)&&m(a,"%")}function o(a){return(!!m(a)||!!m(a,"%"))&&a}function p(a,b,c,d){return(a-(d||0))*(b+(c||0))}function q(a,b,c,d){return-Math.round(a/(b+(c||0))-(d||0))}function r(a){var b=a.data();if(!b.tEnd){var c=a[0],d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",msTransition:"MSTransitionEnd",transition:"transitionend"};c.addEventListener(d[jc.prefixed("transition")],function(a){b.tProp&&a.propertyName.match(b.tProp)&&b.onEndFn()},!1),b.tEnd=!0}}function s(a,b,c,d){var e,f=a.data();f&&(f.onEndFn=function(){e||(e=!0,clearTimeout(f.tT),c())},f.tProp=b,clearTimeout(f.tT),f.tT=setTimeout(function(){f.onEndFn()},1.5*d),r(a))}function t(a,b,c){if(a.length){var d=a.data();Bc?(a.css(l(0)),d.onEndFn=g,clearTimeout(d.tT)):a.stop();var e=u(b,function(){return j(a)});return a.css(k(e,c)),e}}function u(){for(var a,b=0,c=arguments.length;c>b&&(a=b?arguments[b]():arguments[b],"number"!=typeof a);b++);return a}function v(a,b){return Math.round(a+(b-a)/1.5)}function w(){return w.p=w.p||("https://"===c.protocol?"https://":"http://"),w.p}function x(a){var c=b.createElement("a");return c.href=a,c}function y(a,b){if("string"!=typeof a)return a;a=x(a);var c,d;if(a.host.match(/youtube\.com/)&&a.search){if(c=a.search.split("v=")[1]){var e=c.indexOf("&");-1!==e&&(c=c.substring(0,e)),d="youtube"}}else a.host.match(/youtube\.com|youtu\.be/)?(c=a.pathname.replace(/^\/(embed\/|v\/)?/,"").replace(/\/.*/,""),d="youtube"):a.host.match(/vimeo\.com/)&&(d="vimeo",c=a.pathname.replace(/^\/(video\/)?/,"").replace(/\/.*/,""));return c&&d||!b||(c=a.href,d="custom"),c?{id:c,type:d,s:a.search.replace(/^\?/,"")}:!1}function z(a,b,c){var e,f,g=a.video;return"youtube"===g.type?(f=w()+"img.youtube.com/vi/"+g.id+"/default.jpg",e=f.replace(/\/default.jpg$/,"/hqdefault.jpg"),a.thumbsReady=!0):"vimeo"===g.type?d.ajax({url:w()+"vimeo.com/api/v2/video/"+g.id+".json",dataType:"jsonp",success:function(d){a.thumbsReady=!0,A(b,{img:d[0].thumbnail_large,thumb:d[0].thumbnail_small},a.i,c)}}):a.thumbsReady=!0,{img:e,thumb:f}}function A(a,b,c,e){for(var f=0,g=a.length;g>f;f++){var h=a[f];if(h.i===c&&h.thumbsReady){var i={videoReady:!0};i[Rc]=i[Tc]=i[Sc]=!1,e.splice(f,1,d.extend({},h,i,b));break}}}function B(a){function b(a,b,e){var f=a.children("img").eq(0),g=a.attr("href"),h=a.attr("src"),i=f.attr("src"),j=b.video,k=e?y(g,j===!0):!1;k?g=!1:k=j,c(a,f,d.extend(b,{video:k,img:b.img||g||h||i,thumb:b.thumb||i||h||g}))}function c(a,b,c){var e=c.thumb&&c.img!==c.thumb,f=m(c.width||a.attr("width")),g=m(c.height||a.attr("height"));d.extend(c,{width:f,height:g,thumbratio:Q(c.thumbratio||m(c.thumbwidth||b&&b.attr("width")||e||f)/m(c.thumbheight||b&&b.attr("height")||e||g))})}var e=[];return a.children().each(function(){var a=d(this),f=P(d.extend(a.data(),{id:a.attr("id")}));if(a.is("a, img"))b(a,f,!0);else{if(a.is(":empty"))return;c(a,null,d.extend(f,{html:this,_html:a.html()}))}e.push(f)}),e}function C(a){return 0===a.offsetWidth&&0===a.offsetHeight}function D(a){return!d.contains(b.documentElement,a)}function E(a,b,c){a()?b():setTimeout(function(){E(a,b)},c||100)}function F(a){c.replace(c.protocol+"//"+c.host+c.pathname.replace(/^\/?/,"/")+c.search+"#"+a)}function G(a,b,c){var d=a.data(),e=d.measures;if(e&&(!d.l||d.l.W!==e.width||d.l.H!==e.height||d.l.r!==e.ratio||d.l.w!==b.w||d.l.h!==b.h||d.l.m!==c)){var f=e.width,g=e.height,i=b.w/b.h,j=e.ratio>=i,k="scaledown"===c,l="contain"===c,m="cover"===c;j&&(k||l)||!j&&m?(f=h(b.w,0,k?f:1/0),g=f/e.ratio):(j&&m||!j&&(k||l))&&(g=h(b.h,0,k?g:1/0),f=g*e.ratio),a.css({width:Math.ceil(f),height:Math.ceil(g),marginLeft:Math.floor(-f/2),marginTop:Math.floor(-g/2)}),d.l={W:e.width,H:e.height,r:e.ratio,w:b.w,h:b.h,m:c}}return!0}function H(a,b){var c=a[0];c.styleSheet?c.styleSheet.cssText=b:a.html(b)}function I(a,b,c){return b===c?!1:b>=a?"left":a>=c?"right":"left right"}function J(a,b,c,d){if(!c)return!1;if(!isNaN(a))return a-(d?0:1);for(var e,f=0,g=b.length;g>f;f++){var h=b[f];if(h.id===a){e=f;break}}return e}function K(a,b,c){c=c||{},a.each(function(){var a,e=d(this),f=e.data();f.clickOn||(f.clickOn=!0,d.extend(W(e,{onStart:function(b){a=b,(c.onStart||g).call(this,b)},onMove:c.onMove||g,onTouchEnd:c.onTouchEnd||g,onEnd:function(c){c.moved||b.call(this,a)}}),{noMove:!0}))})}function L(a,b){return'<div class="'+a+'">'+(b||"")+"</div>"}function M(a){for(var b=a.length;b;){var c=Math.floor(Math.random()*b--),d=a[b];a[b]=a[c],a[c]=d}return a}function N(a){return"[object Array]"==Object.prototype.toString.call(a)&&d.map(a,function(a){return d.extend({},a)})}function O(a,b){xc.scrollLeft(a).scrollTop(b)}function P(a){if(a){var b={};return d.each(a,function(a,c){b[a.toLowerCase()]=c}),b}}function Q(a){if(a){var b=+a;return isNaN(b)?(b=a.split("/"),+b[0]/+b[1]||e):b}}function R(a,b){a.preventDefault(),b&&a.stopPropagation()}function S(a){return a?">":"<"}function T(a,b){var c=a.data(),e=Math.round(b.pos),f=function(){c.sliding=!1,(b.onEnd||g)()};"undefined"!=typeof b.overPos&&b.overPos!==b.pos&&(e=b.overPos,f=function(){T(a,d.extend({},b,{overPos:b.pos,time:Math.max(Kc,b.time/2)}))});var h=d.extend(k(e,b._001),b.width&&{width:b.width});c.sliding=!0,Bc?(a.css(d.extend(l(b.time),h)),b.time>10?s(a,"transform",f,b.time):f()):a.stop().animate(h,b.time,Uc,f)}function U(a,b,c,e,f,h){var i="undefined"!=typeof h;if(i||(f.push(arguments),Array.prototype.push.call(arguments,f.length),!(f.length>1))){a=a||d(a),b=b||d(b);var j=a[0],k=b[0],l="crossfade"===e.method,m=function(){if(!m.done){m.done=!0;var a=(i||f.shift())&&f.shift();a&&U.apply(this,a),(e.onEnd||g)(!!a)}},n=e.time/(h||1);c.not(a.addClass(Hb).removeClass(Gb)).not(b.addClass(Gb).removeClass(Hb)).removeClass(Hb+" "+Gb),a.stop(),b.stop(),l&&k&&a.fadeTo(0,0),a.fadeTo(l?n:1,1,l&&m),b.fadeTo(n,0,m),j&&l||k||m()}}function V(a){var b=(a.touches||[])[0]||a;a._x=b.pageX,a._y=b.clientY,a._now=d.now()}function W(c,e){function f(a){return n=d(a.target),v.checked=q=r=t=!1,l||v.flow||a.touches&&a.touches.length>1||a.which>1||tc&&tc.type!==a.type&&vc||(q=e.select&&n.is(e.select,u))?q:(p="touchstart"===a.type,r=n.is("a, a *",u),s=v.noMove||v.noSwipe?16:v.snap?0:4,V(a),m=tc=a,uc=a.type.replace(/down|start/,"move").replace(/Down/,"Move"),o=v.control,(e.onStart||g).call(u,a,{control:o,$target:n}),l=v.flow=!0,(!p||v.go)&&R(a),void 0)}function h(a){if(a.touches&&a.touches.length>1||Hc&&!a.isPrimary||uc!==a.type||!l)return l&&i(),(e.onTouchEnd||g)(),void 0;V(a);var b=Math.abs(a._x-m._x),c=Math.abs(a._y-m._y),d=b-c,f=(v.go||v.x||d>=0)&&!v.noSwipe,h=0>d;p&&!v.checked?(l=f)&&R(a):(R(a),(e.onMove||g).call(u,a,{touch:p})),!t&&Math.sqrt(Math.pow(b,2)+Math.pow(c,2))>s&&(t=!0),v.checked=v.checked||f||h}function i(a){(e.onTouchEnd||g)();var b=l;v.control=l=!1,b&&(v.flow=!1),!b||r&&!v.checked||(a&&R(a),vc=!0,clearTimeout(wc),wc=setTimeout(function(){vc=!1},1e3),(e.onEnd||g).call(u,{moved:t,$target:n,control:o,touch:p,startEvent:m,aborted:!a||"MSPointerCancel"===a.type}))}function j(){v.flow||setTimeout(function(){v.flow=!0},10)}function k(){v.flow&&setTimeout(function(){v.flow=!1},Jc)}var l,m,n,o,p,q,r,s,t,u=c[0],v={};return Hc?(u[Gc]("MSPointerDown",f,!1),b[Gc]("MSPointerMove",h,!1),b[Gc]("MSPointerCancel",i,!1),b[Gc]("MSPointerUp",i,!1)):(u[Gc]&&(u[Gc]("touchstart",f,!1),u[Gc]("touchmove",h,!1),u[Gc]("touchend",i,!1),b[Gc]("touchstart",j,!1),b[Gc]("touchend",k,!1),b[Gc]("touchcancel",k,!1),a[Gc]("scroll",k,!1)),c.on("mousedown",f),yc.on("mousemove",h).on("mouseup",i)),c.on("click","a",function(a){v.checked&&R(a)}),v}function X(a,b){function c(c){A=!0,j=l=c._x,q=c._now,p=[[q,j]],m=n=D.noMove?0:t(a,(b.getPos||g)(),b._001),(b.onStart||g).call(B,c)}function e(a,b){s=D.min,u=D.max,w=D.snap,x=a.altKey,A=z=!1,y=b.control,y||C.sliding||c(a)}function f(d,e){A||(y=!1,c(d)),D.noSwipe||(l=d._x,p.push([d._now,l]),n=m-(j-l),o=I(n,s,u),s>=n?n=v(n,s):n>=u&&(n=v(n,u)),D.noMove||(a.css(k(n,b._001)),z||(z=!0,e.touch||Hc||a.addClass(Wb)),(b.onMove||g).call(B,d,{pos:n,edge:o})))}function i(e){if(!y){A||c(e.startEvent),e.touch||Hc||a.removeClass(Wb),r=d.now();for(var f,i,j,k,o,q,t,v,z,C=r-Jc,D=null,E=Kc,F=b.friction,G=p.length-1;G>=0;G--){if(f=p[G][0],i=Math.abs(f-C),null===D||j>i)D=f,k=p[G][1];else if(D===C||i>j)break;j=i}t=h(n,s,u);var H=k-l,I=H>=0,J=r-D,K=J>Jc,L=!K&&n!==m&&t===n;w&&(t=h(Math[L?I?"floor":"ceil":"round"](n/w)*w,s,u),s=u=t),L&&(w||t===n)&&(z=-(H/J),E*=h(Math.abs(z),b.timeLow,b.timeHigh),o=Math.round(n+z*E/F),w||(t=o),(!I&&o>u||I&&s>o)&&(q=I?s:u,v=o-q,w||(t=q),v=h(t+.03*v,q-50,q+50),E=Math.abs((n-v)/(z/F)))),E*=x?10:1,(b.onEnd||g).call(B,d.extend(e,{moved:e.moved||K&&w,pos:n,newPos:t,overPos:v,time:E}))}}var j,l,m,n,o,p,q,r,s,u,w,x,y,z,A,B=a[0],C=a.data(),D={};return D=d.extend(W(b.$wrap,{onStart:e,onMove:f,onTouchEnd:b.onTouchEnd,onEnd:i,select:b.select}),D)}function Y(a,b){var c,e,f,h=a[0],i={prevent:{}};return h[Gc]&&h[Gc](Ic,function(a){var h=a.wheelDeltaY||-1*a.deltaY||0,j=a.wheelDeltaX||-1*a.deltaX||0,k=Math.abs(j)>Math.abs(h),l=S(0>j),m=e===l,n=d.now(),o=Jc>n-f;e=l,f=n,k&&i.ok&&(!i.prevent[l]||c)&&(R(a,!0),c&&m&&o||(b.shift&&(c=!0,clearTimeout(i.t),i.t=setTimeout(function(){c=!1},Lc)),(b.onEnd||g)(a,b.shift?l:j)))},!1),i}function Z(){d.each(d.Fotorama.instances,function(a,b){b.index=a})}function $(a){d.Fotorama.instances.push(a),Z()}function _(a){d.Fotorama.instances.splice(a.index,1),Z()}var ab="fotorama",bb="fullscreen",cb=ab+"__wrap",db=cb+"--css2",eb=cb+"--css3",fb=cb+"--video",gb=cb+"--fade",hb=cb+"--slide",ib=cb+"--no-controls",jb=cb+"--no-shadows",kb=cb+"--pan-y",lb=cb+"--rtl",mb=cb+"--only-active",nb=ab+"__stage",ob=nb+"__frame",pb=ob+"--video",qb=nb+"__shaft",rb=ab+"__grab",sb=ab+"__pointer",tb=ab+"__arr",ub=tb+"--disabled",vb=tb+"--prev",wb=tb+"--next",xb=ab+"__nav",yb=xb+"-wrap",zb=xb+"__shaft",Ab=xb+"--dots",Bb=xb+"--thumbs",Cb=xb+"__frame",Db=Cb+"--dot",Eb=Cb+"--thumb",Fb=ab+"__fade",Gb=Fb+"-front",Hb=Fb+"-rear",Ib=ab+"__shadow",Jb=Ib+"s",Kb=Jb+"--left",Lb=Jb+"--right",Mb=ab+"__active",Nb=ab+"__select",Ob=ab+"--hidden",Pb=ab+"--fullscreen",Qb=ab+"__fullscreen-icon",Rb=ab+"__error",Sb=ab+"__loading",Tb=ab+"__loaded",Ub=Tb+"--full",Vb=Tb+"--img",Wb=ab+"__grabbing",Xb=ab+"__img",Yb=Xb+"--full",Zb=ab+"__dot",$b=ab+"__thumb",_b=$b+"-border",ac=ab+"__html",bc=ab+"__video",cc=bc+"-play",dc=bc+"-close",ec=ab+"__caption",fc=ab+"__caption__wrap",gc=ab+"__spinner",hc=d&&d.fn.jquery.split(".");if(!hc||hc[0]<1||1==hc[0]&&hc[1]<8)throw"Fotorama requires jQuery 1.8 or later and will not run without it.";var ic={},jc=function(a,b,c){function d(a){r.cssText=a}function e(a,b){return typeof a===b}function f(a,b){return!!~(""+a).indexOf(b)}function g(a,b){for(var d in a){var e=a[d];if(!f(e,"-")&&r[e]!==c)return"pfx"==b?e:!0}return!1}function h(a,b,d){for(var f in a){var g=b[a[f]];if(g!==c)return d===!1?a[f]:e(g,"function")?g.bind(d||b):g}return!1}function i(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),f=(a+" "+u.join(d+" ")+d).split(" ");return e(b,"string")||e(b,"undefined")?g(f,b):(f=(a+" "+v.join(d+" ")+d).split(" "),h(f,b,c))}var j,k,l,m="2.6.2",n={},o=b.documentElement,p="modernizr",q=b.createElement(p),r=q.style,s=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),t="Webkit Moz O ms",u=t.split(" "),v=t.toLowerCase().split(" "),w={},x=[],y=x.slice,z=function(a,c,d,e){var f,g,h,i,j=b.createElement("div"),k=b.body,l=k||b.createElement("body");if(parseInt(d,10))for(;d--;)h=b.createElement("div"),h.id=e?e[d]:p+(d+1),j.appendChild(h);return f=["&#173;",'<style id="s',p,'">',a,"</style>"].join(""),j.id=p,(k?j:l).innerHTML+=f,l.appendChild(j),k||(l.style.background="",l.style.overflow="hidden",i=o.style.overflow,o.style.overflow="hidden",o.appendChild(l)),g=c(j,a),k?j.parentNode.removeChild(j):(l.parentNode.removeChild(l),o.style.overflow=i),!!g},A={}.hasOwnProperty;l=e(A,"undefined")||e(A.call,"undefined")?function(a,b){return b in a&&e(a.constructor.prototype[b],"undefined")}:function(a,b){return A.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=y.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(y.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(y.call(arguments)))};return d}),w.csstransforms3d=function(){var a=!!i("perspective");return a};for(var B in w)l(w,B)&&(k=B.toLowerCase(),n[k]=w[B](),x.push((n[k]?"":"no-")+k));return n.addTest=function(a,b){if("object"==typeof a)for(var d in a)l(a,d)&&n.addTest(d,a[d]);else{if(a=a.toLowerCase(),n[a]!==c)return n;b="function"==typeof b?b():b,"undefined"!=typeof enableClasses&&enableClasses&&(o.className+=" "+(b?"":"no-")+a),n[a]=b}return n},d(""),q=j=null,n._version=m,n._prefixes=s,n._domPrefixes=v,n._cssomPrefixes=u,n.testProp=function(a){return g([a])},n.testAllProps=i,n.testStyles=z,n.prefixed=function(a,b,c){return b?i(a,b,c):i(a,"pfx")},n}(a,b),kc={ok:!1,is:function(){return!1},request:function(){},cancel:function(){},event:"",prefix:""},lc="webkit moz o ms khtml".split(" ");if("undefined"!=typeof b.cancelFullScreen)kc.ok=!0;else for(var mc=0,nc=lc.length;nc>mc;mc++)if(kc.prefix=lc[mc],"undefined"!=typeof b[kc.prefix+"CancelFullScreen"]){kc.ok=!0;break}kc.ok&&(kc.event=kc.prefix+"fullscreenchange",kc.is=function(){switch(this.prefix){case"":return b.fullScreen;case"webkit":return b.webkitIsFullScreen;default:return b[this.prefix+"FullScreen"]}},kc.request=function(a){return""===this.prefix?a.requestFullScreen():a[this.prefix+"RequestFullScreen"]()},kc.cancel=function(){return""===this.prefix?b.cancelFullScreen():b[this.prefix+"CancelFullScreen"]()});var oc,pc={lines:12,length:5,width:2,radius:7,corners:1,rotate:15,color:"rgba(128, 128, 128, .75)",hwaccel:!0},qc={top:"auto",left:"auto",className:""};!function(a,b){oc=b()}(this,function(){function a(a,c){var d,e=b.createElement(a||"div");for(d in c)e[d]=c[d];return e}function c(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function d(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+100*(c/d),g=Math.max(1-(1-a)/b*(100-f),a),h=m.substring(0,m.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return o[e]||(p.insertRule("@"+i+"keyframes "+e+"{"+"0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+g+"}"+"}",p.cssRules.length),o[e]=1),e}function f(a,b){var c,d,f=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<n.length;d++)if(c=n[d]+b,f[c]!==e)return c;return f[b]!==e?b:void 0}function g(a,b){for(var c in b)a.style[f(a,c)||c]=b[c];return a}function h(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)a[d]===e&&(a[d]=c[d])}return a}function i(a){for(var b={x:a.offsetLeft,y:a.offsetTop};a=a.offsetParent;)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function j(a,b){return"string"==typeof a?a:a[b%a.length]}function k(a){return"undefined"==typeof this?new k(a):(this.opts=h(a||{},k.defaults,q),void 0)}function l(){function b(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}p.addRule(".spin-vml","behavior:url(#default#VML)"),k.prototype.lines=function(a,d){function e(){return g(b("group",{coordsize:k+" "+k,coordorigin:-i+" "+-i}),{width:k,height:k})}function f(a,f,h){c(m,c(g(e(),{rotation:360/d.lines*a+"deg",left:~~f}),c(g(b("roundrect",{arcsize:d.corners}),{width:i,height:d.width,left:d.radius,top:-d.width>>1,filter:h}),b("fill",{color:j(d.color,a),opacity:d.opacity}),b("stroke",{opacity:0}))))}var h,i=d.length+d.width,k=2*i,l=2*-(d.width+d.length)+"px",m=g(e(),{position:"absolute",top:l,left:l});if(d.shadow)for(h=1;h<=d.lines;h++)f(h,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(h=1;h<=d.lines;h++)f(h);return c(a,m)},k.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var m,n=["webkit","Moz","ms","O"],o={},p=function(){var d=a("style",{type:"text/css"});return c(b.getElementsByTagName("head")[0],d),d.sheet||d.styleSheet}(),q={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};k.defaults={},h(k.prototype,{spin:function(b){this.stop();var c,d,e=this,f=e.opts,h=e.el=g(a(0,{className:f.className}),{position:f.position,width:0,zIndex:f.zIndex}),j=f.radius+f.length+f.width;if(b&&(b.insertBefore(h,b.firstChild||null),d=i(b),c=i(h),g(h,{left:("auto"==f.left?d.x-c.x+(b.offsetWidth>>1):parseInt(f.left,10)+j)+"px",top:("auto"==f.top?d.y-c.y+(b.offsetHeight>>1):parseInt(f.top,10)+j)+"px"})),h.setAttribute("role","progressbar"),e.lines(h,e.opts),!m){var k,l=0,n=(f.lines-1)*(1-f.direction)/2,o=f.fps,p=o/f.speed,q=(1-f.opacity)/(p*f.trail/100),r=p/f.lines;!function s(){l++;for(var a=0;a<f.lines;a++)k=Math.max(1-(l+(f.lines-a)*r)%p*q,f.opacity),e.opacity(h,a*f.direction+n,k,f);e.timeout=e.el&&setTimeout(s,~~(1e3/o))}()}return e},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=e),this},lines:function(b,e){function f(b,c){return g(a(),{position:"absolute",width:e.length+e.width+"px",height:e.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/e.lines*i+e.rotate)+"deg) translate("+e.radius+"px"+",0)",borderRadius:(e.corners*e.width>>1)+"px"})}for(var h,i=0,k=(e.lines-1)*(1-e.direction)/2;i<e.lines;i++)h=g(a(),{position:"absolute",top:1+~(e.width/2)+"px",transform:e.hwaccel?"translate3d(0,0,0)":"",opacity:e.opacity,animation:m&&d(e.opacity,e.trail,k+i*e.direction,e.lines)+" "+1/e.speed+"s linear infinite"}),e.shadow&&c(h,g(f("#000","0 0 4px #000"),{top:"2px"})),c(b,c(h,f(j(e.color,i),"0 0 1px rgba(0,0,0,.1)")));return b},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var r=g(a("group"),{behavior:"url(#default#VML)"});return!f(r,"transform")&&r.adj?l():m=f(r,"animation"),k});var rc,sc,tc,uc,vc,wc,xc=d(a),yc=d(b),zc="quirks"===c.hash.replace("#",""),Ac=jc.csstransforms3d,Bc=Ac&&!zc,Cc=Ac||"CSS1Compat"===b.compatMode,Dc=kc.ok,Ec=navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i),Fc=!Bc||Ec,Gc="addEventListener",Hc=a.navigator.msPointerEnabled,Ic="onwheel"in b.createElement("div")?"wheel":b.onmousewheel!==e?"mousewheel":"DOMMouseScroll",Jc=250,Kc=300,Lc=1400,Mc=5e3,Nc=2,Oc=64,Pc=500,Qc=333,Rc="$stageFrame",Sc="$navDotFrame",Tc="$navThumbFrame",Uc=f([.1,0,.25,1]);jQuery.Fotorama=function(a,e){function f(){d.each(kd,function(a,b){if(!b.i){b.i=Xd++;var c=y(b.video,!0);if(c){var d={};b.video=c,b.img||b.thumb?b.thumbsReady=!0:d=z(b,kd,Td),A(kd,{img:d.img,thumb:d.thumb},b.i,Td)}}})}function g(a){var b="keydown."+ab,c="keydown."+ab+Ud,d="resize."+ab+Ud;a?(yc.on(c,function(a){od&&27===a.keyCode?(R(a),bd(od,!0,!0)):(Td.fullScreen||e.keyboard&&!Td.index)&&(27===a.keyCode?(R(a),Td.cancelFullScreen()):39===a.keyCode||40===a.keyCode&&Td.fullScreen?(R(a),Td.show({index:">",slow:a.altKey,user:!0})):(37===a.keyCode||38===a.keyCode&&Td.fullScreen)&&(R(a),Td.show({index:"<",slow:a.altKey,user:!0})))}),Td.index||yc.off(b).on(b,"textarea, input, select",function(a){!sc.hasClass(bb)&&a.stopPropagation()}),xc.on(d,Td.resize)):(yc.off(c),xc.off(d))}function i(b){b!==i.f&&(b?(a.html("").addClass(ab+" "+Vd).append(_d).before(Zd).before($d),$(Td)):(_d.detach(),Zd.detach(),$d.detach(),a.html(Yd.urtext).removeClass(Vd),_(Td)),g(b),i.f=b)}function j(){kd=Td.data=kd||N(e.data)||B(a),ld=Td.size=kd.length,!jd.ok&&e.shuffle&&M(kd),f(),se=C(se),ld&&i(!0)}function r(){var a=2>ld||od;ve.noMove=a||Dd,ve.noSwipe=a||!e.swipe,be.toggleClass(rb,!ve.noMove&&!ve.noSwipe),Hc&&_d.toggleClass(kb,!ve.noSwipe)}function s(a){a===!0&&(a=""),e.autoplay=Math.max(+a||Mc,1.5*Gd)}function v(a){return a?"add":"remove"}function w(){Td.options=e=P(e),Dd="crossfade"===e.transition||"dissolve"===e.transition,xd=e.loop&&(ld>2||Dd),Gd=+e.transitionduration||Kc,Id="rtl"===e.direction;var a={add:[],remove:[]};ld>1?(yd=e.nav,Ad="top"===e.navposition,a.remove.push(Nb),fe.toggle(e.arrows)):(yd=!1,fe.hide()),hc(),nd=new oc(d.extend(pc,e.spinner,qc,{direction:Id?-1:1})),wc(),zc(),e.autoplay&&s(e.autoplay),Ed=m(e.thumbwidth)||Oc,Fd=m(e.thumbheight)||Oc,we.ok=ye.ok=e.trackpad&&!Fc,r(),Vc(e,!0),zd="thumbs"===yd,zd?(jc(ld,"navThumb"),md=ke,Sd=Tc,H(Zd,d.Fotorama.jst.style({w:Ed,h:Fd,b:e.thumbborderwidth,m:e.thumbmargin,s:Ud,q:!Cc})),he.addClass(Bb).removeClass(Ab)):"dots"===yd?(jc(ld,"navDot"),md=je,Sd=Sc,he.addClass(Ab).removeClass(Bb)):(yd=!1,he.removeClass(Bb+" "+Ab)),yd&&(Ad?ge.insertBefore(ae):ge.insertAfter(ae),tc.nav=!1,tc(md,ie,"nav")),Bd=e.allowfullscreen,Bd?(me.appendTo(ae),Cd=Dc&&"native"===Bd):(me.detach(),Cd=!1),a[v(Dd)].push(gb),a[v(!Dd)].push(hb),a[v(Id)].push(lb),Hd=e.shadows&&!Fc,a[v(!Hd)].push(jb),_d.addClass(a.add.join(" ")).removeClass(a.remove.join(" ")),te=d.extend({},e)}function x(a){return 0>a?(ld+a%ld)%ld:a>=ld?a%ld:a}function C(a){return h(a,0,ld-1)}function V(a){return xd?x(a):C(a)}function W(a){return a>0||xd?a-1:!1}function Z(a){return ld-1>a||xd?a+1:!1}function Fb(){ve.min=xd?-1/0:-p(ld-1,ue.w,e.margin,rd),ve.max=xd?1/0:-p(0,ue.w,e.margin,rd),ve.snap=ue.w+e.margin}function Gb(){xe.min=Math.min(0,ue.W-ie.width()),xe.max=0,ie.toggleClass(rb,!(xe.noMove=xe.min===xe.max))}function Hb(a,b,c){if("number"==typeof a){a=new Array(a);var e=!0}return d.each(a,function(a,d){if(e&&(d=a),"number"==typeof d){var f=kd[x(d)];if(f){var g="$"+b+"Frame",h=f[g];c.call(this,a,d,f,h,g,h&&h.data())}}})}function Ib(a,b,c,d){(!Jd||"*"===Jd&&d===wd)&&(a=o(e.width)||o(a)||Pc,b=o(e.height)||o(b)||Qc,Td.resize({width:a,ratio:e.ratio||c||a/b},0,d===wd?!0:"*"))}function Wb(a,b,c,f,g){Hb(a,b,function(a,h,i,j,k,l){function m(a){var b=x(h);Wc(a,{index:b,src:v,frame:kd[b]})}function n(){s.remove(),d.Fotorama.cache[v]="error",i.html&&"stage"===b||!w||w===v?(!v||i.html||q?"stage"===b&&(j.trigger("f:load").removeClass(Sb+" "+Rb).addClass(Tb),m("load"),Ib()):(j.trigger("f:error").removeClass(Sb).addClass(Rb),m("error")),l.state="error",!(ld>1&&kd[h]===i)||i.html||i.deleted||i.video||q||(i.deleted=!0,Td.splice(h,1))):(i[u]=v=w,Wb([h],b,c,f,!0))}function o(){d.Fotorama.measures[v]=t.measures=d.Fotorama.measures[v]||{width:r.width,height:r.height,ratio:r.width/r.height},Ib(t.measures.width,t.measures.height,t.measures.ratio,h),s.off("load error").addClass(Xb+(q?" "+Yb:"")).prependTo(j),G(s,c||ue,f||i.fit||e.fit),d.Fotorama.cache[v]=l.state="loaded",setTimeout(function(){j.trigger("f:load").removeClass(Sb+" "+Rb).addClass(Tb+" "+(q?Ub:Vb)),"stage"===b&&m("load")},5)}function p(){var a=10;E(function(){return!Qd||!a--&&!Fc},function(){o()})}if(j){var q=Td.fullScreen&&i.full&&i.full!==i.img&&!l.$full&&"stage"===b;if(!l.$img||g||q){var r=new Image,s=d(r),t=s.data();l[q?"$full":"$img"]=s;var u="stage"===b?q?"full":"img":"thumb",v=i[u],w=q?null:i["stage"===b?"thumb":"img"];if("navThumb"===b&&(j=l.$wrap),!v)return n(),void 0;d.Fotorama.cache[v]?!function y(){"error"===d.Fotorama.cache[v]?n():"loaded"===d.Fotorama.cache[v]?setTimeout(p,0):setTimeout(y,100)}():(d.Fotorama.cache[v]="*",s.on("load",p).on("error",n)),l.state="",r.src=v}}})}function bc(a){re.append(nd.spin().el).appendTo(a)}function hc(){re.detach(),nd&&nd.stop()}function ic(){var a=Td.activeFrame[Rc];a&&!a.data().state&&(bc(a),a.on("f:load f:error",function(){a.off("f:load f:error"),hc()}))}function jc(a,b){Hb(a,b,function(a,c,f,g,h,i){g||(g=f[h]=_d[h].clone(),i=g.data(),i.data=f,"stage"===b?(f.html&&d('<div class="'+ac+'"></div>').append(f._html?d(f.html).removeAttr("id").html(f._html):f.html).appendTo(g),e.captions&&f.caption&&d(L(ec,L(fc,f.caption))).appendTo(g),f.video&&g.addClass(pb).append(oe.clone()),ce=ce.add(g)):"navDot"===b?je=je.add(g):"navThumb"===b&&(i.$wrap=g.children(":first"),ke=ke.add(g),f.video&&g.append(oe.clone())))})}function lc(a,b,c){return a&&a.length&&G(a,b,c)}function mc(a){Hb(a,"stage",function(a,b,c,f,g,h){if(f){Ae[Rc][x(b)]=f.css(d.extend({left:Dd?0:p(b,ue.w,e.margin,rd)},Dd&&l(0))),D(f[0])&&(f.appendTo(be),bd(c.$video));var i=c.fit||e.fit;lc(h.$img,ue,i),lc(h.$full,ue,i)}})}function nc(a,b){if("thumbs"===yd&&!isNaN(a)){var c=-a,e=-a+ue.w;ke.each(function(){var a=d(this),f=a.data(),g=f.eq,h={h:Fd},i="cover";h.w=f.w,f.l+f.w<c||f.l>e||lc(f.$img,h,i)||b&&Wb([g],"navThumb",h,i)})}}function tc(a,b,c){if(!tc[c]){var f="nav"===c&&zd,g=0;b.append(a.filter(function(){for(var a,b=d(this),c=b.data(),e=0,f=kd.length;f>e;e++)if(c.data===kd[e]){a=!0,c.eq=e;break}return a||b.remove()&&!1}).sort(function(a,b){return d(a).data().eq-d(b).data().eq}).each(function(){if(f){var a=d(this),b=a.data(),c=Math.round(Fd*b.data.thumbratio)||Ed;b.l=g,b.w=c,a.css({width:c}),g+=c+e.thumbmargin}})),tc[c]=!0}}function uc(a){return a-Be>ue.w/3}function vc(a){return!(xd||se+a&&se-ld+a||od)}function wc(){de.toggleClass(ub,vc(0)),ee.toggleClass(ub,vc(1))}function zc(){we.ok&&(we.prevent={"<":vc(0),">":vc(1)})}function Ac(a){var b,c,d=a.data();return zd?(b=d.l,c=d.w):(b=a.position().left,c=a.width()),{c:b+c/2,min:-b+10*e.thumbmargin,max:-b+ue.w-c-10*e.thumbmargin}}function Ec(a){var b=Td.activeFrame[Sd].data();T(le,{time:.9*a,pos:b.l,width:b.w-2*e.thumbborderwidth})}function Gc(a){var b=kd[a.guessIndex][Sd];if(b){var c=xe.min!==xe.max,d=c&&Ac(Td.activeFrame[Sd]),e=c&&(a.keep&&Gc.l?Gc.l:h((a.coo||ue.w/2)-Ac(b).c,d.min,d.max)),f=c&&h(e,xe.min,xe.max),g=.9*a.time;T(ie,{time:g,pos:f||0,onEnd:function(){nc(f,!0)}}),ad(he,I(f,xe.min,xe.max)),Gc.l=e}}function Ic(){Lc(Sd),ze[Sd].push(Td.activeFrame[Sd].addClass(Mb))}function Lc(a){for(var b=ze[a];b.length;)b.shift().removeClass(Mb)}function Nc(a){var b=Ae[a];d.each(qd,function(a,c){delete b[x(c)]}),d.each(b,function(a,c){delete b[a],c.detach()})}function Uc(a){rd=sd=se;var b=Td.activeFrame,c=b[Rc];c&&(Lc(Rc),ze[Rc].push(c.addClass(Mb)),a||Td.show.onEnd(!0),t(be,0,!0),Nc(Rc),mc(qd),Fb(),Gb())}function Vc(a,b){a&&d.extend(ue,{width:a.width||ue.width,height:a.height,minwidth:a.minwidth,maxwidth:a.maxwidth,minheight:a.minheight,maxheight:a.maxheight,ratio:Q(a.ratio)})&&!b&&d.extend(e,{width:ue.width,height:ue.height,minwidth:ue.minwidth,maxwidth:ue.maxwidth,minheight:ue.minheight,maxheight:ue.maxheight,ratio:ue.ratio})}function Wc(b,c){a.trigger(ab+":"+b,[Td,c])}function Xc(){clearTimeout(Yc.t),Qd=1,e.stopautoplayontouch?Td.stopAutoplay():Nd=!0}function Yc(){Yc.t=setTimeout(function(){Qd=0},Kc+Jc)}function Zc(){Nd=!(!od&&!Od)}function $c(){if(clearTimeout($c.t),!e.autoplay||Nd)return Td.autoplay&&(Td.autoplay=!1,Wc("stopautoplay")),void 0;Td.autoplay||(Td.autoplay=!0,Wc("startautoplay"));var a=se,b=Td.activeFrame[Rc].data();E(function(){return b.state||a!==se},function(){$c.t=setTimeout(function(){Nd||a!==se||Td.show(xd?S(!Id):x(se+(Id?-1:1)))},e.autoplay)})}function _c(){Td.fullScreen&&(Td.fullScreen=!1,Dc&&kc.cancel(Wd),sc.removeClass(bb),rc.removeClass(bb),a.removeClass(Pb).insertAfter($d),ue=d.extend({},Pd),bd(od,!0,!0),fd("x",!1),Td.resize(),Wb(qd,"stage"),O(Ld,Kd),Wc("fullscreenexit"))}function ad(a,b){Hd&&(a.removeClass(Kb+" "+Lb),b&&!od&&a.addClass(b.replace(/^|\s/g," "+Jb+"--")))}function bd(a,b,c){b&&(_d.removeClass(fb),od=!1,r()),a&&a!==od&&(a.remove(),Wc("unloadvideo")),c&&(Zc(),$c())}function cd(a){_d.toggleClass(ib,a)}function dd(a){if(!ve.flow){var b=a?a.pageX:dd.x,c=b&&!vc(uc(b))&&e.click;dd.p===c||!Dd&&e.swipe||!ae.toggleClass(sb,c)||(dd.p=c,dd.x=b)}}function ed(a,b){var c=a.target,f=d(c);f.hasClass(cc)?Td.playVideo():c===ne?Td[(Td.fullScreen?"cancel":"request")+"FullScreen"]():od?c===qe&&bd(od,!0,!0):b?cd():e.click&&Td.show({index:a.shiftKey||S(uc(a._x)),slow:a.altKey,user:!0})}function fd(a,b){ve[a]=xe[a]=b}function gd(a,b){var c=d(this).data().eq;Td.show({index:c,slow:a.altKey,user:!0,coo:a._x-he.offset().left,time:b})}function hd(){if(j(),w(),!hd.i){hd.i=!0;var a=e.startindex;(a||e.hash&&c.hash)&&(wd=J(a||c.hash.replace(/^#/,""),kd,0===Td.index||a,a)),se=rd=sd=td=wd=V(wd)||0}if(ld){if(id())return;od&&bd(od,!0),qd=[],Nc(Rc),Td.show({index:se,time:0,reset:hd.ok}),Td.resize()}else Td.destroy();hd.ok=!0}function id(){return!id.f===Id?(id.f=Id,se=ld-1-se,Td.reverse(),!0):void 0}function jd(){jd.ok||(jd.ok=!0,Wc("ready"))}rc=rc||d("html"),sc=sc||d("body");var kd,ld,md,nd,od,pd,qd,rd,sd,td,ud,vd,wd,xd,yd,zd,Ad,Bd,Cd,Dd,Ed,Fd,Gd,Hd,Id,Jd,Kd,Ld,Md,Nd,Od,Pd,Qd,Rd,Sd,Td=this,Ud=d.now(),Vd=ab+Ud,Wd=a[0],Xd=1,Yd=a.data(),Zd=d("<style></style>"),$d=d(L(Ob)),_d=d(L(cb)),ae=d(L(nb)).appendTo(_d),be=(ae[0],d(L(qb)).appendTo(ae)),ce=d(),de=d(L(tb+" "+vb)),ee=d(L(tb+" "+wb)),fe=de.add(ee).appendTo(ae),ge=d(L(yb)),he=d(L(xb)).appendTo(ge),ie=d(L(zb)).appendTo(he),je=d(),ke=d(),le=(be.data(),ie.data(),d(L(_b)).appendTo(ie)),me=d(L(Qb)),ne=me[0],oe=d(L(cc)),pe=d(L(dc)).appendTo(ae),qe=pe[0],re=d(L(gc)),se=!1,te={},ue={},ve={},we={},xe={},ye={},ze={},Ae={},Be=0,Ce=[];_d[Rc]=d(L(ob)),_d[Tc]=d(L(Cb+" "+Eb,L($b))),_d[Sc]=d(L(Cb+" "+Db,L(Zb))),ze[Rc]=[],ze[Tc]=[],ze[Sc]=[],Ae[Rc]={},_d.addClass(Bc?eb:db),Yd.fotorama=this,Td.startAutoplay=function(a){return Td.autoplay?this:(Nd=Od=!1,s(a||e.autoplay),$c(),this)},Td.stopAutoplay=function(){return Td.autoplay&&(Nd=Od=!0,$c()),this},Td.show=function(a){var b;"object"!=typeof a?(b=a,a={}):b=a.index,b=">"===b?sd+1:"<"===b?sd-1:"<<"===b?0:">>"===b?ld-1:b,b=isNaN(b)?J(b,kd,!0):b,b="undefined"==typeof b?se||0:b,Td.activeIndex=se=V(b),ud=W(se),vd=Z(se),qd=[se,ud,vd],sd=xd?b:se;var c=Math.abs(td-sd),d=u(a.time,function(){return Math.min(Gd*(1+(c-1)/12),2*Gd)}),f=a.overPos;a.slow&&(d*=10),Td.activeFrame=pd=kd[se],bd(od,pd.i!==kd[x(rd)].i),jc(qd,"stage"),mc(Fc?[sd]:[sd,W(sd),Z(sd)]),fd("go",!0),a.reset||Wc("show",{user:a.user,time:d});var g=Td.show.onEnd=function(b){g.ok||(g.ok=!0,ic(),Wb(qd,"stage"),b||Uc(!0),a.reset||Wc("showend",{user:a.user}),fd("go",!1),zc(),dd(),Zc(),$c())};if(Dd){var i=pd[Rc],j=se!==td?kd[td][Rc]:null;U(i,j,ce,{time:d,method:e.transition,onEnd:g},Ce)}else T(be,{pos:-p(sd,ue.w,e.margin,rd),overPos:f,time:d,onEnd:g,_001:!0});if(wc(),yd){Ic();var k=C(se+h(sd-td,-1,1));Gc({time:d,coo:k!==se&&a.coo,guessIndex:"undefined"!=typeof a.coo?k:se}),zd&&Ec(d)}return Md="undefined"!=typeof td&&td!==se,td=se,e.hash&&Md&&!Td.eq&&F(pd.id||se+1),this},Td.requestFullScreen=function(){return Bd&&!Td.fullScreen&&(Kd=xc.scrollTop(),Ld=xc.scrollLeft(),O(0,0),fd("x",!0),Pd=d.extend({},ue),a.addClass(Pb).appendTo(sc.addClass(bb)),rc.addClass(bb),bd(od,!0,!0),Td.fullScreen=!0,Cd&&kc.request(Wd),Td.resize(),Wb(qd,"stage"),ic(),Wc("fullscreenenter")),this},Td.cancelFullScreen=function(){return Cd&&kc.is()?kc.cancel(b):_c(),this},b.addEventListener&&b.addEventListener(kc.event,function(){!kd||kc.is()||od||_c()},!1),Td.resize=function(a){if(!kd)return this;Vc(Td.fullScreen?{width:"100%",maxwidth:null,minwidth:null,height:"100%",maxheight:null,minheight:null}:P(a),Td.fullScreen);var b=arguments[1]||0,c=arguments[2],d=ue.width,f=ue.height,g=ue.ratio,i=xc.height()-(yd?he.height():0);
return o(d)&&(_d.addClass(mb).css({width:d,minWidth:ue.minwidth,maxWidth:ue.maxwidth}),d=ue.W=ue.w=_d.width(),e.glimpse&&(ue.w-=Math.round(2*(n(e.glimpse)/100*d||m(e.glimpse)||0))),be.css({width:ue.w,marginLeft:(ue.W-ue.w)/2}),f=n(f)/100*i||m(f),f=f||g&&d/g,f&&(d=Math.round(d),f=ue.h=Math.round(h(f,n(ue.minheight)/100*i||m(ue.minheight),n(ue.maxheight)/100*i||m(ue.maxheight))),Uc(),ae.stop().animate({width:d,height:f},b,function(){_d.removeClass(mb)}),yd&&(he.stop().animate({width:d},b),Gc({guessIndex:se,time:b,keep:!0}),zd&&tc.nav&&Ec(b)),Jd=c||!0,jd())),Be=ae.offset().left,this},Td.setOptions=function(a){return d.extend(e,a),hd(),this},Td.shuffle=function(){return kd&&M(kd)&&hd(),this},Td.destroy=function(){return Td.cancelFullScreen(),Td.stopAutoplay(),kd=Td.data=null,i(),qd=[],Nc(Rc),this},Td.playVideo=function(){var a=Td.activeFrame,b=a.video,c=se;return"object"==typeof b&&a.videoReady&&(Cd&&Td.fullScreen&&Td.cancelFullScreen(),E(function(){return!kc.is()||c!==se},function(){c===se&&(a.$video=a.$video||d(d.Fotorama.jst.video(b)),a.$video.appendTo(a[Rc]),_d.addClass(fb),od=a.$video,r(),Wc("loadvideo"))})),this},Td.stopVideo=function(){return bd(od,!0,!0),this},ae.on("mousemove",dd),ve=X(be,{onStart:Xc,onMove:function(a,b){ad(ae,b.edge)},onTouchEnd:Yc,onEnd:function(a){ad(ae);var b=(Hc&&!Rd||a.touch)&&e.arrows;if(a.moved||b&&a.pos!==a.newPos){var c=q(a.newPos,ue.w,e.margin,rd);Td.show({index:c,time:Dd?Gd:a.time,overPos:a.overPos,user:!0})}else a.aborted||ed(a.startEvent,b)},_001:!0,timeLow:1,timeHigh:1,friction:2,select:"."+Nb+", ."+Nb+" *",$wrap:ae}),xe=X(ie,{onStart:Xc,onMove:function(a,b){ad(he,b.edge)},onTouchEnd:Yc,onEnd:function(a){function b(){Gc.l=a.newPos,Zc(),$c(),nc(a.newPos,!0)}if(a.moved)a.pos!==a.newPos?(T(ie,{time:a.time,pos:a.newPos,overPos:a.overPos,onEnd:b}),nc(a.newPos),Hd&&ad(he,I(a.newPos,xe.min,xe.max))):b();else{var c=a.$target.closest("."+Cb,ie)[0];c&&gd.call(c,a.startEvent)}},timeLow:.5,timeHigh:2,friction:5,$wrap:he}),we=Y(ae,{shift:!0,onEnd:function(a,b){Xc(),Yc(),Td.show({index:b,slow:a.altKey})}}),ye=Y(he,{onEnd:function(a,b){Xc(),Yc();var c=t(ie)+.25*b;ie.css(k(h(c,xe.min,xe.max))),Hd&&ad(he,I(c,xe.min,xe.max)),ye.prevent={"<":c>=xe.max,">":c<=xe.min},clearTimeout(ye.t),ye.t=setTimeout(function(){nc(c,!0)},Jc),nc(c)}}),_d.hover(function(){setTimeout(function(){Qd||(Rd=!0,cd(!Rd))},0)},function(){Rd&&(Rd=!1,cd(!Rd))}),K(fe,function(a){R(a),Td.show({index:fe.index(this)?">":"<",slow:a.altKey,user:!0})},{onStart:function(){Xc(),ve.control=!0},onTouchEnd:Yc}),d.each("load push pop shift unshift reverse sort splice".split(" "),function(a,b){Td[b]=function(){return kd=kd||[],"load"!==b?Array.prototype[b].apply(kd,arguments):arguments[0]&&"object"==typeof arguments[0]&&arguments[0].length&&(kd=N(arguments[0])),hd(),Td}}),hd()},d.fn.fotorama=function(b){return this.each(function(){var c=this,e=d(this),f=e.data(),g=f.fotorama;g?g.setOptions(b):E(function(){return!C(c)},function(){f.urtext=e.html(),new d.Fotorama(e,d.extend({},{width:null,minwidth:null,maxwidth:"100%",height:null,minheight:null,maxheight:null,ratio:null,margin:Nc,glimpse:0,nav:"dots",navposition:"bottom",thumbwidth:Oc,thumbheight:Oc,thumbmargin:Nc,thumbborderwidth:Nc,allowfullscreen:!1,fit:"contain",transition:"slide",transitionduration:Kc,captions:!0,hash:!1,startindex:0,loop:!1,autoplay:!1,stopautoplayontouch:!0,keyboard:!1,arrows:!0,click:!0,swipe:!0,trackpad:!0,shuffle:!1,direction:"ltr",shadows:!0,spinner:null},a.fotoramaDefaults,b,f))})})},d.Fotorama.instances=[],d.Fotorama.cache={},d.Fotorama.measures={},d=d||{},d.Fotorama=d.Fotorama||{},d.Fotorama.jst=d.Fotorama.jst||{},d.Fotorama.jst.style=function(a){var b,c="";return ic.escape,c+=".fotorama"+(null==(b=a.s)?"":b)+" .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:"+(null==(b=a.m)?"":b)+"px;\nheight:"+(null==(b=a.h)?"":b)+"px}\n.fotorama"+(null==(b=a.s)?"":b)+" .fotorama__thumb-border{\nheight:"+(null==(b=a.h-a.b*(a.q?0:2))?"":b)+"px;\nborder-width:"+(null==(b=a.b)?"":b)+"px;\nmargin-top:"+(null==(b=a.m)?"":b)+"px}"},d.Fotorama.jst.video=function(a){function b(){c+=d.call(arguments,"")}var c="",d=(ic.escape,Array.prototype.join);return c+='<div class="fotorama__video"><iframe src="',b(("youtube"==a.type?"http://youtube.com/embed/"+a.id+"?autoplay=1":"vimeo"==a.type?"http://player.vimeo.com/video/"+a.id+"?autoplay=1&badge=0":a.id)+(a.s&&"custom"!=a.type?"&"+a.s:"")),c+='" frameborder="0" allowfullscreen></iframe></div>'},d(function(){d("."+ab+':not([data-auto="false"])').fotorama()})}(window,document,location,window.jQuery);
/**
 * HashNav
 *
 * Simplest hash navigation
 *
 * @author Artem Sapegin
 * @copyright 2012 Artem Sapegin, http://sapegin.me
 * @license MIT
 */

/*jshint browser:true, jquery:true, white:false, smarttabs:true, eqeqeq:true,
         immed:true, latedef:true, newcap:true, undef:true */
/*global define:false */
(function(factory) {  // Try to register as an anonymous AMD module
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else {
		factory();
	}
}(function() {
	'use strict';

	var HashNav = {
		_inited: false,
		_initial: '',
		_hash: '',
		_callbacks: [],

		/*
		 * Set|get default hash
		 * @param value {String|undefined}
		 */
		initial: function(value) {
			if (value === undefined) {
				return this._initial;
			}
			else {
				if (value !== this._initial) {
					this._initial = value;
					if (location.hash !== value) {
						var hash = location.hash.slice(1);
						this.change(hash || value);
					}
					else {
						this._hash = value;
					}
				}
			}
		},

		/*
		 * Set/execute change handler
		 * @param value {Function|String}
		 */
		change: function(value) {
			if (!this._inited) {
				this._init();
			}

			if (typeof value === 'string') {
				this._change(value);
				this._hash = value;
				if (value === this._initial) {
					this._removeHash();
				}
				else {
					location.hash = value;
				}
			}
			else {
				var that = this;
				this._callbacks.push(value);
				if (this._hash) {
					value(this._hash);
				}
			}
		},

		_change: function(hash) {
			for (var cbIdx = 0; cbIdx < this._callbacks.length; cbIdx++) {
				this._callbacks[cbIdx](hash);
			}
		},

		_init: function() {
			if (!('onhashchange' in window)) return;
			var that = this;
			window.addEventListener('hashchange', function() {
				that._hashChanged();
			}, false);
		},

		_hashChanged: function() {
			var hash = location.hash.slice(1);
			if (hash === this._initial) {
				this._removeHash(true);
				return;
			}
			this._change(hash || this._initial);
		},

		_removeHash: function(replace) {
			if (history.pushState) {
				var url = window.location.pathname + window.location.search;
				history[replace ? 'replaceState' : 'pushState']('', document.title, url);
			}
			else {
				location.hash = '';
			}
		}
	};

	window.HashNav = HashNav;

}));
var __templates = (function(){
function encodeHTMLSource() {  var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': '&#34;', "'": '&#39;', "/": '&#47;' },  matchHTML = /&(?!#?w+;)|<|>|"|'|\//g;  return function() {    return this ? this.replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : this;  };};
String.prototype.encodeHTML=encodeHTMLSource();
var tmpl = {};
  tmpl['photo-info']=function anonymous(it) {
var out='<header class="photo-info__header"><h1 class="photo-info__title">'+(it.title)+'</h1>';if(it.info.caption){out+='<div class="photo-info__caption">'+(it.info.caption)+'</div>';}out+='</header><div class="photo-info__meta">';if(it.location){out+=(it.location)+', ';}out+=(it.pubdate)+', '+(it.exif)+'</div>';if(it.copyright){out+='<div class="photo-info__copyright">© '+(it.copyright)+'</div>';}return out;
};
  tmpl['photo-title']=function anonymous(it) {
var out=''+(it.title)+' — '+(it.siteTitle);return out;
};
return tmpl;})();
/**
 * jQuery Tag Filter
 *
 * @version 0.2
 * @requires jQuery, HashNav
 * @author Artem Sapegin
 * @copyright 2012 Artem Sapegin (sapegin.me)
 * @license MIT
 */

/*global jQuery:false, define:false, HashNav:false*/
(function (factory) {  // Try to register as an anonymous AMD module
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {

$.fn.tagFilter = function(options) {
	options = $.extend({}, $.fn.tagFilter.defaults, options);

	return this.each(function() {
		new TagFilter($(this), options);
	});
};

$.fn.tagFilter.defaults = {
	barSelector: '.tags',
	linkSelector: 'li',
	linkActiveClass: 'is-active',
	tagClassPrefix: 'tag_'
};

function TagFilter(container, options) {
	this.container = container;
	this.options = options;
	this.init();
}

TagFilter.prototype = {
	init: function() {
		this.bar = this.container.find(this.options.barSelector);
		if (!this.bar.length) return;

		this.bar.delegate(this.options.linkSelector, 'click', $.proxy(this.tagClick, this));

		this.tagClassRegExp = new RegExp('\\b' + this.options.tagClassPrefix + '.*?\\b', 'g');

		var defaultTag = this.container.find('.is-default').data('tag-id');
		if (defaultTag) {
			HashNav.initial(defaultTag);
		}

		HashNav.change(this.change.bind(this));
	},

	tagClick: function(e) {
		this.change($(e.target).data('tag-id'));
		return false;
	},

	change: function(tag) {
		var link = this.container.find('[data-tag-id="' + tag + '"]');
		if (!link.length || link.hasClass(this.options.linkActiveClass)) return;

		// Replace tag class on container
		this.container[0].className = this.container[0].className.replace(this.tagClassRegExp, '');
		if (tag) this.container.addClass(this.options.tagClassPrefix + tag);

		// Highlight button
		link.siblings().removeClass(this.options.linkActiveClass);
		link.addClass(this.options.linkActiveClass);

		// Update page URL
		HashNav.change(tag);
	}
};

}));
/*
 * Copyright 2012 Andrey “A.I.” Sitnik <andrey@sitnik.ru>,
 * sponsored by Evil Martians.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

;(function($) {
    "use strict";

    // Common methods and properties for jQuery Transition Events plugin.
    // Mostly for internal usage, but maybe helpful for some hack stuff:
    //
    //   if ( $.Transitions.isSupported() ) {
    //       // CSS Transitions is supported
    //   }
    $.Transitions = {

        // Hash of property name to event name with vendor prefixes.
        // It is used to detect prefix.
        _names: {
            // Webkit must be on bottom, because Opera try to use webkit
            // prefix.
            'transition':       'transitionend',
            'OTransition':      'oTransitionEnd',
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition':    'transitionend'
        },

        // Return array of milliseconds for CSS value of `transition-duration`.
        // It’s used in `$.fn.afterTransition`.
        _parseTimes: function (string) {
            var value, array = string.split(/,\s*/);
            for (var i = 0; i < array.length; i++) {
                value = array[i];
                array[i] = parseFloat(value);
                if ( value.match(/\ds/) ) {
                    array[i] = array[i] * 1000;
                }
            }
            return array;
        },

        // Autodetect vendor prefix and return `transitionend` event name.
        //
        // If browser didn’t support CSS Transitions it will return `false`.
        getEvent: function () {
            var finded = false;
            for ( var prop in this._names ) {
                if ( typeof(document.body.style[prop]) != 'undefined' ) {
                    finded = this._names[prop];
                    break;
                }
            }

            this.getEvent = function () {
                return finded;
            };

            return finded;
        },

        // Alias to vendor prefixed `requestAnimationFrame`. Will be replace
        // by native function after first call.
        animFrame: function (callback) {
            var raf = window.requestAnimationFrame       ||
                      window.webkitRequestAnimationFrame ||
                      window.mozRequestAnimationFrame    ||
                      window.msRequestAnimationFrame;
            if ( raf ) {
                this.animFrame = function (callback) {
                    return raf.call(window, callback);
                };
            } else {
                this.animFrame = function (callback) {
                    return setTimeout(callback, 10);
                };
            }
            return this.animFrame(callback);
        },

        // Return `true` if browser support CSS Transitions.
        isSupported: function () {
            return this.getEvent() !== false;
        }

    }

    // jQuery node methods.
    $.extend($.fn, {

        // Call `callback` after CSS Transition finish
        // `delay + (durationPart * duration)`. It will call `callback` only
        // once, in difference from `transitionEnd`.
        //
        //   $('.show-video').click(function () {
        //       $('.slider').addClass('video-position').afterTransition(
        //           function () { autoPlayVideo(); });
        //   });
        //
        // You can set `durationPart` to call `callback` in the middle of
        // transition:
        //
        //   $('.fliper').addClass('rotate').afterTransition(0.5, function () {
        //       $(this).find('.backface').show();
        //   });
        //
        // Callback will get object with `propertyName` and `elapsedTime`
        // properties. If transition is set to difference properties, it will
        // be called on every property.
        //
        // This method doesn’t check, that transition is really finished (it can
        // be canceled in the middle).
        afterTransition: function (durationPart, callback) {
            if ( typeof(callback) == 'undefined' ) {
                callback     = durationPart;
                durationPart = 1;
            }

            if ( !$.Transitions.isSupported() ) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], {
                        type:          'aftertransition',
                        elapsedTime:   0,
                        propertyName:  '',
                        currentTarget: this[i]
                    });
                }
                return this;
            }

            for (var i = 0; i < this.length; i++) {
                var el = $(this[i]);
                var props     = el.css('transition-property').split(/,\s*/);
                var durations = el.css('transition-duration');
                var delays    = el.css('transition-delay');

                durations = $.Transitions._parseTimes(durations);
                delays    = $.Transitions._parseTimes(delays);

                var prop, duration, delay, after, elapsed;
                for (var j = 0; j < props.length; j++) {
                    prop     = props[j];
                    duration = durations[ durations.length == 1 ? 0 : j ];
                    delay    = delays[ delays.length == 1 ? 0 : j ];
                    after    = delay + (duration * durationPart);
                    elapsed  = duration * durationPart / 1000;

                    (function (el, prop, after, elapsed) {
                      setTimeout(function () {
                          $.Transitions.animFrame(function () {
                            callback.call(el[0], {
                                type:          'aftertransition',
                                elapsedTime:   elapsed,
                                propertyName:  prop,
                                currentTarget: el[0]
                            });
                          });
                      }, after);
                    })(el, prop, after, elapsed);
                }
            }
            return this;
        },

        // Set `callback` to listen every CSS Transition finish.
        // It will call `callback` on every finished transition,
        // in difference from `afterTransition`.
        //
        // It just bind to `transitionend` event, but detect vendor prefix.
        //
        // Callback will get event object with `propertyName` and `elapsedTime`
        // properties. If transition is set to difference properties, it will
        // be called on every property.
        //
        // Note, that `callback` will get original event object, not from
        // jQuery.
        //
        //   var slider = $('.slider').transitionEnd(function () {
        //       if ( slider.hasClass('video-position') ) {
        //           autoPlayVideo();
        //       }
        //   });
        //
        //  $('.show-video').click(function () {
        //      slider.addClass('video-position');
        //  });
        //
        // If transition will be canceled before finish, event won’t be fired.
        transitionEnd: function (callback) {
            for (var i = 0; i < this.length; i++) {
              this[i].addEventListener($.Transitions.getEvent(), function (e) {
                  callback.call(this, e);
              });
            }
            return this;
        }

    });

}).call(this, jQuery);

// Tâmia © 2013 Artem Sapegin http://sapegin.me
// https://github.com/sapegin/tamia
// JS core
// jQuery and Modernizr aren’t required but very useful

/*jshint newcap:false*/
/*global DEBUG:true, Modernizr:false, console:false*/

/**
 * Debug mode.
 *
 * You can use DEBUG global variable in your scripts to hide some code from minified production version of JavaScript.
 *
 * To make it work add to your Gruntfile:
 *
 *   uglify: {
 *     options: {
 *       compress: {
 *         global_defs: {
 *           DEBUG: !!grunt.option('debug')
 *         }
 *       }
 *     },
 *     ...
 *   }
 *
 * Then if you run `grunt --debug` DEBUG variable will be true and false if you run just `grunt`.
 */
if (typeof window.DEBUG === 'undefined') window.DEBUG = true;

;(function(window, jQuery, Modernizr, undefined) {
	'use strict';

	// IE8+
	if (!document.querySelectorAll) return;

	// Namespace
	var tamia = window.tamia = {};


	if (DEBUG) {
		// Debug logger
		var addBadge = function(args, name) {
			// Color console badge
			// Based on https://github.com/jbail/lumberjack
			var ua = navigator.userAgent.toLowerCase();
			if (ua.indexOf('chrome') !== -1 || ua.indexOf('firefox') !== -1) {
				var format = '%c %s %c ' + args.shift();
				args.unshift(format, 'background:#aa759f; color:#fff', name, 'background:inherit; color:inherit');
			}
			else {
				args[0] = name + ': ' + args[0];
			}
			return args;
		};
		var logger = function() {
			var args = Array.prototype.slice.call(arguments);
			var func = args.shift();
			console[func].apply(console, addBadge(args, 'Tâmia'));
		};
		var log = tamia.log = logger.bind(null, 'log');
		var warn = tamia.warn = logger.bind(null, 'warn');

		// Check optional dependencies
		if (!jQuery) warn('jQuery not found.');
		if (!jQuery.Transitions) warn('jQuery Transition Events plugin (tamia/vendor/transition-events.js) not found.');
		if (!Modernizr) warn('Modernizr not found.');

		// Check required Modernizr features
		$.each([
			'csstransitions',
			'cssgradients',
			'flexbox',
			'touch',
		], function(idx, feature) {
			if (!(feature in Modernizr)) warn('Modernizr should be built with "' + feature + '" feautre.');
		});
	}


	var _containersCache;
	var _components = {};
	var _initializedAttribute = '_tamia-yep';

	function _getContainers(parent) {
		return (parent || document).querySelectorAll('[data-component]');
	}


	/**
	 * Initialize components.
	 *
	 * @param {Object} components Initializers for each component.
	 *
	 * Examples:
	 *
	 *   <div data-component="pony"></div>
	 *
	 *   tamia.initComponents({
	 *     // New style component
	 *     pony: Pony,  // class Pony extends Component {...}
	 *     // Plain initializer
	 *     pony: function(elem) {
	 *       // $(elem) === <div data-component="pony">
	 *     },
	 *     // Initialize jQuery plugins (plain initializer)
	 *     jquerypony: function(elem) {
	 *       $(elem).pluginmethod({option1: 'val1', options2: 'val2'});
	 *       $(elem).pluginmethod2();
	 *     },
	 *     // Initialize jQuery plugins (shortcut)
	 *     jquerypony: {
	 *       pluginmethod: {option1: 'val1', options2: 'val2'},
	 *       pluginmethod2: ['attr1', 'attr2', 'attr3'],
	 *       pluginmethod3: null
	 *     }
	 *   }
	 *
	 * Caveats:
	 *
	 *   1. To initialize components inside container that was hidden or inside dynamically created container use
	 *   init.tamia event: `$('.js-container').trigger('init.tamia');`
	 *   2. No components will be initialized twice. It’s safe to trigger init.tamia event multiple times: only new nodes
	 *   or nodes that was hidden before will be affected.
	 */
	tamia.initComponents = function(components, parent) {
		var containers;
		if (parent === undefined) {
			containers = _containersCache || (_containersCache = _getContainers());
		}
		else {
			// Init all components inside DOM node
			containers = _getContainers(parent);
			components = _components;
		}

		// Init components
		for (var containerIdx = 0, containerCnt = containers.length; containerIdx < containerCnt; containerIdx++) {
			var container = containers[containerIdx];
			var componentName = container.getAttribute('data-component');
			var component = components[componentName];
			if (!component || container.hasAttribute(_initializedAttribute)) continue;

			var initialized = true;
			if ('__tamia_cmpnt__' in component) {
				// New style component
				initialized = (new component(container)).initializable;
			}
			else if (typeof component === 'function') {
				// Old style component
				initialized = component(container);
			}
			else if (jQuery) {
				// jQuery plugins shortcut
				for (var method in component) {
					var params = component[method];
					var elem = jQuery(container);
					if (DEBUG && !jQuery.isFunction(elem[method])) warn('jQuery method "%s" not found (used in "%s" component).', method, componentName);
					if (jQuery.isArray(params)) {
						elem[method].apply(elem, params);
					}
					else {
						elem[method](params);
					}
				}
			}

			if (initialized !== false) {
				container.setAttribute(_initializedAttribute, 'yes');
			}
		}

		// Add new components to all components array
		for (var name in components) {
			_components[name] = components[name];
		}
	};

	if (jQuery) {

		var _doc = jQuery(document);
		var _hiddenClass = 'is-hidden';
		var _transitionClass = 'is-transit';
		var _appearedEvent = 'appeared.tamia';
		var _disappearedEvent = 'disappeared.tamia';
		var _fallbackTimeout = 1000;

		/**
		 * Registers Tâmia events (eventname.tamia) on document.
		 *
		 * Example:
		 *
		 *   // Registers enable.tamia event.
		 *   tamia.registerEvents({
		 *      enable: function(elem) {
		 *      }
		 *   });
		 *
		 * @param {Object} handlers Handlers list.
		 */
		tamia.registerEvents = function(handlers) {
			var events = $.map(handlers, _tamiaze).join(' ');
			_doc.on(events, function(event) {
				if (DEBUG) log('Event "%s":', event.type, event.target);
				handlers[event.type](event.target);
			});
		};

		var _tamiaze = function (handler, name) {
			return name + '.tamia';
		};


		/**
		 * Events
		 */
		var _handlers = {};

		/**
		 * Init components inside any jQuery node.
		 *
		 * Examples:
		 *
		 *   $(document).trigger('init.tamia');
		 *   $('.js-container').trigger('init.tamia');
		 */
		_handlers.init = function(elem) {
			tamia.initComponents(undefined, elem);
		};

		/**
		 * Show element with CSS transition.
		 *
		 * appeared.tamia event will be fired the moment transition ends.
		 *
		 * Example:
		 *
		 *   .dialog
		 *     transition: opacity .5s ease-in-out
		 *     ...
		 *     &.is-hidden
		 *       opacity: 0
		 *
		 *   <div class="dialog is-hidden js-dialog">...</div>
		 *
		 *   $('.js-dialog').trigger('appear.tamia');
		 */
		_handlers.appear = function(elem) {
			elem = $(elem);
			if (Modernizr && Modernizr.csstransitions) {
				if (elem.hasClass(_transitionClass) && !elem.hasClass(_hiddenClass)) return;
				elem.addClass(_transitionClass);
				setTimeout(function() {
					elem.removeClass(_hiddenClass);
					elem.afterTransition(function() {
						elem.removeClass(_transitionClass);
						elem.trigger(_appearedEvent);
					});
				}, 0);
			}
			else {
				elem.removeClass(_hiddenClass);
				elem.trigger(_appearedEvent);
			}
		};

		/**
		 * Hide element with CSS transition.
		 *
		 * disappeared.tamia event will be fired the moment transition ends.
		 *
		 * Opposite of `appear.tamia` event.
		 */
		_handlers.disappear = function(elem) {
			elem = $(elem);
			if (Modernizr && Modernizr.csstransitions) {
				if (elem.hasClass(_transitionClass) && elem.hasClass(_hiddenClass)) return;
				elem.addClass(_transitionClass);
				elem.addClass(_hiddenClass);
				elem.afterTransition(function() {
					elem.removeClass(_transitionClass);
					elem.trigger(_disappearedEvent);
				});
			}
			else {
				elem.addClass(_hiddenClass);
				elem.trigger(_disappearedEvent);
			}
		};

		/**
		 * Toggles element’s visibility with CSS transition.
		 *
		 * See `appear.tamia` event for details.
		 */
		_handlers.toggle = function(elem) {
			elem = $(elem);
			if (elem.hasClass(_hiddenClass)) {
				_handlers.appear(elem);
			}
			else {
				_handlers.disappear(elem);
			}
		};

		tamia.registerEvents(_handlers);


		/**
		 * Controls.
		 *
		 * Fires jQuery event to specified element on click at this element.
		 *
		 * @param data-fire Event name.
		 * @param [data-target] Target element selector.
		 * @param [data-closest] Target element selector: search only through element ancestors.
		 * @param [data-attrs] Comma separated attributes list.
		 *
		 * Either of data-target or data-closest is required.
		 *
		 * Example:
		 *
		 *   <span data-fire="slider-next" data-target=".portfolio" data-attrs="1,2,3">Next</span>
		 *   <!-- $('.portfolio').trigger('slider-next', [1, 2, 3]); -->
		 */
		 _doc.on('click', '[data-fire]', function(event) {
			var elem = jQuery(event.currentTarget);

			var data = elem.data();
			if (DEBUG) if (!data.target && !data.closest) return log('You should define either data-target or data-closest on', elem[0]);

			var target = data.target && jQuery(data.target) || elem.closest(data.closest);
			if (DEBUG) if (!target.length) return log('Target element %s not found for', data.target || data.closest, elem[0]);

			var attrs = data.attrs;
			if (DEBUG) log('Fire "%s" with attrs [%s] on', data.fire, attrs || '', target);
			target.trigger(data.fire, attrs ? attrs.split(/[;, ]/) : undefined);

			event.preventDefault();
		});

		/**
		 * Templates
		 */
		var _templates = window.__templates;
		if (_templates) {
			/**
			 * Invokes precompiled template.
			 *
			 * Templates should be stored in window.__templates.
			 *
			 * @param {String} tmplId Template ID.
			 * @param {String} data Template context.
			 * @return {String} HTML.
			 */
			tamia.tmpl = function(tmplId, data) {
				var tmpl = _templates[tmplId];
				if (DEBUG) if (!tmpl) warn('Template %s not found.', tmplId);
				return tmpl(data);
			}

			/**
			 * Replaces jQuery node’s content with the result of template invocation.
			 *
			 * @param {String} tmplId Template ID.
			 * @param {String} data Template context.
			 * @return {jQuery}
			 */
			jQuery.fn.tmpl = function(tmplId, data) {
				var html = tamia.tmpl(tmplId, data);
				return jQuery(this).html(html);
			}
		}

		/**
		 * Grid helper.
		 *
		 * Example:
		 *
		 *   <div data-component="grid"></div>
		 */
		if (DEBUG) tamia.initComponents({
			grid: function(elem) {
				elem = $(elem);
				elem
					.addClass('g-row')
					.html(
						new Array((elem.data('columns') || 12) + 1).join('<b class="g-debug-col" style="height:'+document.documentElement.scrollHeight+'px"></b>')
					)
				;
			}
		});

	}

}(window, window.jQuery, window.Modernizr));

(function() {
  'use strict';
  var $, Component,
    __slice = [].slice;

  $ = jQuery;

  /*
  JS component base class.
  
  Elements: any HTML element with class name that follow a pattern `.js-name` where `name` is an element name.
  
  States: any class on component root HTML node that follow a pattern `.is-state` where `state` is a state name.
  After initialization all components will have `ok` state.
  
  Example:
  
    class Pony extends Component
      init: ->
        @on('click', 'toggle', @toggle)
      toggle: ->
        @toggleState('pink')
  
    tamia.initComponents(pony: Pony)
  
    <div class="pink-pony is-pink" data-component="pony">
      <button class="pink-pony__button js-toggle">To pink or not to pink?</div>
    </div>
  */


  Component = (function() {
    function Component(elem) {
      if (!elem || elem.nodeType !== 1) {
        throw new ReferenceError('No DOM node passed to Component constructor.');
      }
      this.elemNode = elem;
      this.elem = $(elem);
      this.initializable = this.isInitializable();
      if (!this.initializable) {
        return;
      }
      this._fillStates();
      if (this.isSupported()) {
        this.handlers = {};
        this.init();
        this.addState('ok');
      } else {
        this.fallback();
        this.addState('unsupported');
      }
    }

    /*
    	Put all your initialization code in this method.
    */


    Component.prototype.init = function() {};

    /*
    	You can implement this method to do destroy component.
    */


    Component.prototype.destroy = function() {};

    /*
    	Implement this method if you want to check whether browser is good for your component or not.
    
    	@returns {Boolean}
    */


    Component.prototype.isSupported = function() {
      return true;
    };

    /*
    	Implement this method if you want to check whether component could be initialized.
    
    	Example:
    
    	  isInitializable: ->
    	    # Do not initialize component if it's not visible
    	    @isVisible()
    
    	@return {Boolean}
    */


    Component.prototype.isInitializable = function() {
      return true;
    };

    /*
    	You can implement this method to do some fallbacks. It will be called if isSupported() returns false.
    */


    Component.prototype.fallback = function() {};

    /*
    	Finds element.
    
    	@param {String} name Element ID.
    
    	@return {jQuery} Element with .js-name class.
    */


    Component.prototype.find = function(name) {
      return this.elem.find(".js-" + name).first();
    };

    /*
    	Attaches event handler.
    
    	@param {String} events Event names (space separated).
    	@param {String} [element] Element id.
    	@param {Function} handler Handler function (scope will automatically sets to this).
    */


    Component.prototype.on = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._toggleEvent.apply(this, ['on'].concat(__slice.call(args)));
    };

    /*
    	Detaches event handler.
    
    	@param {String} events Event names (space separated).
    	@param {String} [element] Element id.
    	@param {Function} handler Handler function (scope will automatically sets to this).
    */


    Component.prototype.off = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._toggleEvent.apply(this, ['off'].concat(__slice.call(args)));
    };

    /*
    	Returns component state.
    
    	@param {String} [name] State name.
    
    	@return {Boolean} Sate value.
    */


    Component.prototype.hasState = function(name) {
      return !!this.states[name];
    };

    /*
    	Sets state to true.
    
    	@param {String} [name] State name.
    */


    Component.prototype.addState = function(name) {
      return this.toggleState(name, true);
    };

    /*
    	Sets state to false.
    
    	@param {String} [name] State name.
    */


    Component.prototype.removeState = function(name) {
      return this.toggleState(name, false);
    };

    /*
    	Toggles state value.
    
    	@param {String} [name] State name.
    	@param {Boolean} [value] State value.
    */


    Component.prototype.toggleState = function(name, value) {
      if (value == null) {
        value = !this.states[name];
      }
      this.states[name] = value;
      return this._updateStates();
    };

    /*
    	Returns component visibility.
    
    	@return {Boolean}
    */


    Component.prototype.isVisible = function() {
      return !!(this.elemNode.offsetWidth || this.elemNode.offsetHeight);
    };

    Component.prototype._toggleEvent = function() {
      var action, args, func, funcArg, handler, _ref;
      action = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (typeof args[1] === 'string') {
        args[1] = ".js-" + args[1];
      }
      funcArg = args.length - 1;
      func = args[funcArg];
      handler;
      if (this.handlers[func]) {
        handler = this.handlers[func];
      }
      if (action === 'on') {
        if (handler) {
          handler.counter++;
        } else {
          this.handlers[func] = handler = {
            counter: 1,
            func: func.bind(this)
          };
        }
      }
      if (!handler) {
        return;
      }
      args[funcArg] = handler.func;
      (_ref = this.elem)[action].apply(_ref, args);
      if (action === 'off') {
        handler.counter--;
        if (handler.counter <= 0) {
          return this.handlers[func] = null;
        }
      }
    };

    Component.prototype._fillStates = function() {
      var classes, cls, clsName, re, states;
      states = {};
      classes = this.elemNode.className.split(' ');
      for (clsName in classes) {
        cls = classes[clsName];
        re = /^is-/;
        if (re.test(cls)) {
          states[cls.replace(re, '')] = true;
        }
      }
      return this.states = states;
    };

    Component.prototype._updateStates = function() {
      var classes, name;
      classes = this.elemNode.className;
      classes = $.trim(classes.replace(/\bis-[-\w]+/g, ''));
      classes = classes.split(/\s+/);
      for (name in this.states) {
        if (this.states[name]) {
          classes.push("is-" + name);
        }
      }
      return this.elemNode.className = classes.join(' ');
    };

    return Component;

  })();

  Component.__tamia_cmpnt__ = true;

  window.Component = Component;

}).call(this);

(function() {
  'use strict';
  var $, GalleryInfo, _doc, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = jQuery;

  _doc = $(document);

  GalleryInfo = (function(_super) {
    __extends(GalleryInfo, _super);

    function GalleryInfo() {
      _ref = GalleryInfo.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    GalleryInfo.prototype.init = function() {
      return _doc.on('photochanged', this.update.bind(this));
    };

    GalleryInfo.prototype.update = function(event, frame) {
      return this.elem.tmpl('photo-info', frame);
    };

    return GalleryInfo;

  })(Component);

  tamia.initComponents({
    'gallery-info': GalleryInfo
  });

}).call(this);

(function() {
  'use strict';
  var $, Gallery, _doc, _ref, _win,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = jQuery;

  _win = $(window);

  _doc = $(document);

  Gallery = (function(_super) {
    __extends(Gallery, _super);

    function Gallery() {
      _ref = Gallery.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Gallery.prototype.init = function() {
      var currentId, startIndex,
        _this = this;
      this.photos = window.__photos;
      this.siteTitle = window.__site_title;
      this.urlRegExp = /\/photos\/(\d+)\/$/;
      currentId = window.__photos_current_id;
      startIndex = this.idToIndex(currentId);
      this.gallery = this.find('gallery');
      this.prevButton = this.find('prev');
      this.nextButton = this.find('next');
      this.gallery.fotorama({
        nav: false,
        keyboard: true,
        transition: 'crossfade',
        height: this.gallery.height()
      });
      this.fotorama = this.gallery.data('fotorama');
      this.fotorama.load(this.photos);
      this.fotorama.show({
        index: startIndex,
        time: 0
      });
      this.gallery.on('fotorama:show', this.update.bind(this));
      this.on('click', 'prev', this.prev);
      this.on('click', 'next', this.next);
      this.updateNav();
      _win.resize(this.resize.bind(this));
      return _win.on('popstate', function(event) {
        var id, m;
        m = window.location.href.match(_this.urlRegExp);
        id = m[1] != null;
        if (!id || id === currentId) {
          return;
        }
        return _this.fotorama.show({
          index: _this.idToIndex(id)
        });
      });
    };

    Gallery.prototype.update = function() {
      var frame, permalink;
      this.addState('activated');
      frame = this.fotorama.activeFrame;
      frame.title = frame.info.title || '***';
      permalink = location.href.replace(this.urlRegExp, "/photos/" + frame.id + "/");
      history.pushState('', frame.title, permalink);
      document.title = tamia.tmpl('photo-title', {
        title: frame.title,
        siteTitle: this.siteTitle
      });
      this.updateNav();
      return _doc.trigger('photochanged', frame);
    };

    Gallery.prototype.next = function() {
      if (this.isLast()) {
        return;
      }
      this.fotorama.show('>');
      return this.updateNav();
    };

    Gallery.prototype.prev = function() {
      if (this.isFirst()) {
        return;
      }
      this.fotorama.show('<');
      return this.updateNav();
    };

    Gallery.prototype.isFirst = function() {
      return this.fotorama.activeIndex === 0;
    };

    Gallery.prototype.isLast = function() {
      return this.fotorama.activeIndex === this.fotorama.data.length - 1;
    };

    Gallery.prototype.updateNav = function() {
      this.prevButton.toggleClass('is-disabled', this.isFirst());
      return this.nextButton.toggleClass('is-disabled', this.isLast());
    };

    Gallery.prototype.resize = function() {
      return this.fotorama.resize({
        width: this.gallery.width(),
        height: this.gallery.height()
      });
    };

    Gallery.prototype.idToIndex = function(id) {
      var index,
        _this = this;
      index = null;
      $.each(this.photos, function(idx, val) {
        if (_this.photos[idx].id === id) {
          index = idx;
          return false;
        }
      });
      return index;
    };

    return Gallery;

  })(Component);

  tamia.initComponents({
    'gallery': Gallery
  });

}).call(this);

(function() {
  'use strict';
  var $, _doc, _win;

  $ = jQuery;

  _win = $(window);

  _doc = $(document);

  tamia.initComponents({
    'featured-album': function(elem) {
      var container, contentContainer, fotorama, photos, resize;
      resize = function() {
        return contentContainer.css('margin-top', container.height());
      };
      container = $(elem);
      contentContainer = $('.js-content');
      photos = window.__photos;
      container.fotorama({
        nav: false,
        transition: 'dissolve',
        loop: true,
        autoplay: 7000,
        width: '100%',
        minHeight: 300,
        maxHeight: '100%',
        fit: 'cover'
      });
      container.on('fotorama:load', resize);
      fotorama = container.data('fotorama');
      fotorama.load(photos);
      return _win.resize(resize);
    },
    'tag-filter': {
      tagFilter: {
        barSelector: '.js-filter',
        linkSelector: '.js-filter-tag'
      }
    },
    'parallax': function(elem) {
      var container, screenHeight, speed;
      if (window.pageYOffset == null) {
        return;
      }
      container = $(elem);
      speed = container.data('speed') || 0.5;
      screenHeight = screen.height;
      return _doc.scroll(function() {
        var offset, pageY;
        pageY = window.pageYOffset;
        if (pageY < screenHeight) {
          offset = -pageY * speed;
          return container.css('transform', "translateY(" + offset + "px)");
        }
      });
    }
  });

}).call(this);
