define(["jquery"], function($) {
    var empty = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];
    return function (el, options) {
      return $('<' + el + (($.inArray(el, empty) === -1) ? ' ' : '') + '/>', options);
    }
  }
);