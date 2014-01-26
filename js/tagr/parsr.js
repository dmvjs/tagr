define(["jquery", "tagr/tagr"], function($, tagr) {
    return function parsr(index, element) {
      var el = element.element,
        parent = element.parent || $(document.body),
        options = {},
        key,
        fragment;

      for (key in element) {
        if (element.hasOwnProperty(key)) {
          if (key !== "contains" && key !== "element") {
            options[key] = element[key]
          }
        }
      }

      fragment = tagr(el, options);

      if (element.contains !== undefined && element.contains.length > 0) {
        $(element.contains).each(function (ind, ele) {
          ele.parent = fragment;
        }).each(parsr);
      }

      parent.append(fragment);
    }
  }
);