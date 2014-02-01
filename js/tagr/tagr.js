define(function() {

    if (DOMTokenList.classList && DOMTokenList.prototype['addClasses'] === undefined) {
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

    return function (element, options) {
      var el = document.createElement(element || "div")
        , prop;

      for (prop in options) {
        if (options.hasOwnProperty(prop)) {
          if ((prop === 'class') || (prop === 'addClass') || (prop === 'add-class') || (prop === 'classes')) {
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
    }
  }
);