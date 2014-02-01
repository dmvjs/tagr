var events = ['abort', 'afterprint', 'beforeprint', 'beforeunload', 'blur', 'canplay', 'canplaythrough', 'change',
  'click', 'contextmenu', 'copy', 'cuechange', 'cut', 'dblclick', 'DOMContentLoaded', 'drag', 'dragend', 'dragenter',
  'dragleave', 'dragover', 'dragstart', 'drop', 'durationchange', 'emptied', 'ended', 'error', 'focus', 'focusin',
  'focusout', 'formchange', 'forminput', 'hashchange', 'input', 'invalid', 'keydown', 'keypress', 'keyup', 'load',
  'loadeddata', 'loadedmetadata', 'loadstart', 'message', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove',
  'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'offline', 'online', 'pagehide', 'pageshow', 'paste', 'pause',
  'play', 'playing', 'popstate', 'progress', 'ratechange', 'readystatechange', 'redo', 'reset', 'resize', 'scroll',
  'seeked', 'seeking', 'select', 'show', 'stalled', 'storage', 'submit', 'suspend', 'timeupdate', 'undo', 'unload',
  'volumechange', 'waiting']
, allow = require('./config').allowJsonFunctions;

if (DOMTokenList && DOMTokenList.prototype['addClasses'] === undefined) {
  DOMTokenList.prototype.addClasses = function(classes) {
    var array = classes.split(' ')
      , i
      , length;
    for (i = 0, length = array.length; i < length; i += 1) {
      this.add(array[i]);
    }
  }
}

function decamelify(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

module.exports = function tagr(element, options) {
  var el = document.createElement(element || "div")
    , prop;

  for (prop in options) {
    if (options.hasOwnProperty(prop)) {
      if (allow && events.indexOf(prop) > -1) {
        el.addEventListener(prop, options[prop], false)
      } else if ((prop === 'class') || (prop === 'addClass') || (prop === 'add-class') || (prop === 'classes')) {
        if (el.classList)
          el.classList.addClasses(options[prop]);
        else
          el.className += ' ' + options[prop]
      } else if ((prop === 'text') || (prop === 'innerText') || prop === 'textContent') {
        if (el.textContent)
          el.textContent = options[prop];
        else
          el.innerText = options[prop]
      } else {
        el.setAttribute(decamelify(prop), options[prop])
      }
    }
  }

  return el;
};