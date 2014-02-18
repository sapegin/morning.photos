(function() {
  'use strict';
  var $, elems_map, init_handler, inited, keys, _doc;

  $ = jQuery;

  _doc = $(document);

  keys = {
    esc: 27
  };

  elems_map = {};

  inited = false;

  init_handler = function() {
    return _doc.on('keydown', function(event) {
      var elem, elems, keycode, url, _i, _len, _results;
      keycode = event.which;
      elems = elems_map[keycode];
      if (!elems) {
        return;
      }
      event.preventDefault();
      _results = [];
      for (_i = 0, _len = elems.length; _i < _len; _i++) {
        elem = elems[_i];
        url = elem.attr('href');
        if (url) {
          _results.push(location.href = url);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
  };

  tamia.initComponents({
    'hotkey': function(elem) {
      var hotkey, keycode;
      elem = $(elem);
      hotkey = elem.data('hotkey');
      keycode = keys[hotkey];
      if (elems_map[keycode] == null) {
        elems_map[keycode] = [];
      }
      elems_map[keycode].push(elem);
      if (!inited) {
        return init_handler();
      }
    }
  });

}).call(this);
