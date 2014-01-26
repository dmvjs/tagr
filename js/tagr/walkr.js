define(["jquery", "tagr/tagr"], function($, tagr) {
    return function walkr(index, element) {
      var el = element.__element__,
        parent = element.__parent__ || $(document.body),
        options = {},
        key,
        fragment;

      for (key in element) {
        if (element.hasOwnProperty(key)) {
          if (key !== "__contains__" && key !== "__element__") {
            if (element[key]["__function__"]) {
              var f = element[key]["__function__"];
              if (f.substr(0, 8) === "function") {
                options[key] = new Function('return ' + f)();
              } else {
                options[key] = new Function('return ' + f);
              }
            } else {
              options[key] = element[key]
            }
          }
        }
      }

      fragment = tagr(el, options);

      if (element.__contains__ !== undefined && element.__contains__.length) {
        $(element.__contains__).each(function (ind, ele) {
          ele.__parent__ = fragment;
        }).each(walkr);
      }

      parent.append(fragment);
    }
  }
);