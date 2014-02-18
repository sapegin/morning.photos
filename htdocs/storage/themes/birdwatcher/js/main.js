(function() {
  'use strict';
  var $, _doc, _win;

  $ = jQuery;

  _win = $(window);

  _doc = $(document);

  tamia.initComponents({
    'featured-album': function(elem) {
      var container, contentContainer, fotorama, load, photos, resize;
      resize = function() {
        return contentContainer.css('margin-top', container.height());
      };
      load = function() {
        return $('body').addClass('is-ok');
      };
      container = $(elem);
      contentContainer = $('.js-content');
      photos = window.__photos;
      container.fotorama({
        nav: false,
        arrows: false,
        keyboard: false,
        click: false,
        swipe: false,
        trackpad: false,
        transition: 'dissolve',
        loop: true,
        autoplay: 7000,
        width: '100%',
        minHeight: 300,
        maxHeight: '100%',
        fit: 'cover'
      });
      container.on('fotorama:load', resize);
      container.on('fotorama:load', load);
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
      if (Modernizr.touch) {
        return;
      }
      if (window.pageYOffset == null) {
        return;
      }
      container = $(elem);
      speed = container.data('speed') || 0.5;
      screenHeight = screen.height;
      return $(window).scroll(function() {
        var offset, pageY;
        pageY = window.pageYOffset;
        if (pageY < screenHeight) {
          offset = -pageY * speed;
          return container.css('transform', "translateY(" + offset + "px)");
        }
      });
    },
    'touch-toggle': function(elem) {
      if (!Modernizr.touch) {
        return;
      }
      elem = $(elem);
      return elem.click(function() {
        var pressed;
        pressed = elem.hasClass('is-pressed');
        elem.closest('.js-touch-toggle-container').find('.is-pressed').removeClass('is-pressed');
        return elem.toggleClass('is-pressed', !pressed);
      });
    }
  });

  _doc.on('popup_opened.social-likes', function(event, service, win) {
    return ga('send', 'social', service, 'share', location.href);
  });

}).call(this);
