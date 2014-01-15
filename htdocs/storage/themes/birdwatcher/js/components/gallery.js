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
        id = m != null ? m[1] : void 0;
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
