tagr
====

create elements from JSON objects

a quick tour:
-------------

Check it out, start a server, open in browser. index.html (which has an empty body) loads the app.
js/app.js (requires jquery and the tagr files js/tagr.js and js/walkr.js) $.gets js/mock.json
Look at js/mock.json, this gets converted into the HTML that populates the index.html body

how it works:
-------------

tagr makes DOM elements from formatted JSON via "\__element__" and "\__contains__" properties

"\__element__" values are valid HTML elements, including div, span, input, etc.
Assign id's, classes, events and otherwise use $ object creation syntax
(property names are not required to have double quotes unless JSON specific):

```
{
  "__element__": "div"
  "click": function(e){alert("YES")}, //events passed via JSON have different syntax, see js/mock.json
  "id": "test",
  "addClass": "clickable"
}
```

"\__contains__" values should be another array of objects formatted like the above, where
the parent object will contain the child in the rendered HTML (pretty obvious)


Then tagr walks the object and assigns "\__parent__" property for contained elements
if no "\__parent__" property exists, the parent is $(document.body)

passing functions
-----------------

Passing functions with JS objects is easy and uses $ object creation syntax as above.
JSON is a transport layer where functions are not allowed as a native transport object like numbers or booleans.
Passing functions via JSON can be accomplished without using eval, and this has been incorporated into tagr.
Here is an example that uses the handler, similar to above, but it's value is an object with a
"\__function__" property and a value that is a string representation of a function.

```
"click" : {
      "__function__": "function(e) {console.log(e.currentTarget);}"
    },
```

Alternatively a single statement can be passed as follows.
```
"click" : {
      "__function__": "alert('TAGR JSON EVENT')"
    },
```

Passing functions via JSON might get disabled by default with an option to enable.