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
