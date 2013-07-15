var __templates = (function(){
function encodeHTMLSource() {var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': '&#34;', "'": '&#39;', "/": '&#47;' },matchHTML = /&(?!#?w+;)|<|>|"|'|\//g;return function() {return this ? this.replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : this;};};
  String.prototype.encodeHTML=encodeHTMLSource();
  var __templates=__templates|| {};
  __templates['photo-info']=function anonymous(it) {
var out='<h1 class="photo-info__title">'+(it.title)+'</h1><div class="photo-info__album"><a href="'+(it.albumHref)+'" class="photo-info__album-link">⇧ <u>'+(it.album)+'</u></a></div>';if(it.info.caption){out+='<div class="photo-info__caption">'+(it.info.caption)+'</div>';}if(it.location){out+='<div class="photo-info__location">'+(it.location)+'</div>';}out+='<div class="photo-info__meta">'+(it.pubdate)+', '+(it.exif)+'</div>';return out;
};
  __templates['photo-title']=function anonymous(it) {
var out=''+(it.title)+' - '+(it.siteTitle);return out;
};
return __templates;})()