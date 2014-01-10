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
