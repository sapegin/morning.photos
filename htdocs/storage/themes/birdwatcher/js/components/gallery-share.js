(function() {
  'use strict';
  var $, GalleryShare, _doc, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = jQuery;

  _doc = $(document);

  GalleryShare = (function(_super) {
    __extends(GalleryShare, _super);

    function GalleryShare() {
      _ref = GalleryShare.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    GalleryShare.prototype.init = function() {
      _doc.on('photochanged', this.update.bind(this));
      return this.titleTemplate = this.elem.data('title-template');
    };

    GalleryShare.prototype.update = function(event, frame) {
      return this.elem.socialLikes({
        title: tamia.stmpl(this.titleTemplate, {
          title: frame.title
        }),
        url: frame.permalink,
        data: {
          media: frame.img.replace(',xlarge.jpg', ',medium_large.jpg')
        }
      });
    };

    return GalleryShare;

  })(Component);

  tamia.initComponents({
    'gallery-share': GalleryShare
  });

}).call(this);
