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
return tmpl;})()