tagr
====

create elements from JSON objects

a quick tour:
-------------

Check it out, start a server, open in browser. index.html (which has an empty body) loads the app.
js/bundle.js (compiled from breakr.js, config.js, tagr.js, & walkr.js) gets json/mock.json
Look at js/mock.json, this gets converted into the HTML that populates the index.html body

how it works:
-------------

tagr makes DOM elements from formatted JSON via "\__element__" and "\__contains__" properties

"\__element__" values are valid HTML elements, including div, span, input, etc.
Assign id's, classes, events and otherwise use $ object creation syntax.

```
{
  __element__: "div"
  click: function(){alert("TAGR ELEMENT CLICKED")},
  id: "test",
  addClass: "clickable"
}
```
Note: this example uses a JS native object, JSON format differs slightly:

1. double quotes are required for property names, inner double quotes must be escaped
2. passing functions requires a different syntax, detailed below in 'passing functions'

"\__contains__" values should be another array of objects formatted like the above, where
the parent object will contain the child in the rendered HTML (pretty obvious)


Then tagr walks the object and assigns "\__parent__" property for contained elements
if no "\__parent__" property exists, the parent is $(document.body)

passing functions
-----------------

NOTE: Passing functions from JSON is disabled by default. Enable this in js/config.js if you dare.

Passing functions with JS objects is easy and uses $ object creation syntax as above.
JSON is a transport layer where functions are not allowed as a native transport object like numbers or booleans.
Passing functions via JSON can be accomplished without using eval. Here is an example that uses the handler,
similar to above, but it's value is an object with a "\__function__" property and a value that is a string
representation of a function.

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