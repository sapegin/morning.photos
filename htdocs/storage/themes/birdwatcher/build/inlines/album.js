!function(){function a(a,b){for(var c=a.length,e=c*d,g=f-e,h=g/(b-e),i=0,j=0;c>j;j++){var k=a[j],l=k.img,m=Math.floor(k.w*h),n=Math.floor(k.h*h),o=!(c-1>j);i+=m+d,o&&f>i&&(m+=f-i),l.width=m,l.height=n}}function b(){f=e.offsetWidth;for(var b=0,c=[],g=0,i=h.length;i>g;g++){var j=h[g];c.push(j),b+=j.w+d,b>f&&i&&(a(c,b),c=[],b=0)}}function c(a,b){var c,d;return function(){var e=+new Date,f=arguments;c&&c+b>e?(clearTimeout(d),d=setTimeout(function(){c=e,a.apply(this,f)},b)):(c=e,a.apply(this,f))}}if(document.querySelectorAll){for(var d=10,e=document.querySelector(".js-thumbs"),f=e.offsetWidth,g=[],h=[],i=0,j=e.querySelectorAll(".js-img"),k=(parseInt(j[0].getAttribute("height"),10),0),l=j.length;l>k;k++){var m=j[k],n=parseInt(m.getAttribute("width"),10),o=parseInt(m.getAttribute("height"),10),p={img:m,w:n,h:o};g.push(p),h.push(p),i+=n+d,i>f&&l&&(a(g,i),g=[],i=0)}var q=c(b,20);window.addEventListener("resize",q,!1)}}();