define(["jquery", "tagr/tagr"], function($, tagr) {
    return function parsr(index, element) {
      var el = element.__element__,
        parent = element.__parent__ || $(document.body),
        options = {},
        key,
        fragment;

      for (key in element) {
        if (element.hasOwnProperty(key)) {
          if (key !== "__contains__" && key !== "__element__") {
            options[key] = element[key]
          }
        }
      }

      fragment = tagr(el, options);

      if (element.__contains__ !== undefined && element.__contains__.length > 0) {
        $(element.__contains__).each(function (ind, ele) {
          ele.__parent__ = fragment;
        }).each(parsr);
      }

      parent.append(fragment);
    }
  }
);