;(function(root, factory) {
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = factory();
    }
    exports.funcifyr = factory();
  }
  else {
    root.F = root.funcifyr = factory();
  }
})(this, function() {
  'use strict';

  var funcifyr = (function() {

    return {

      // runs two predicate functions on an argument and returns true if both are true
      andify: function(fn1, fn2) {
        return function andified(arg) {
          return fn1.call(null, arg) && fn2.call(null, arg);
        }
      },

      // converts an Array-like object, HTMLCollection or NodeList that's not mappable into an Array
      arrayify: function(collection) {
        return Array.from ? Array.from(collection) : Array.apply(null, collection);
      },

      // creates a function from two functions
      compose: function(fn1, fn2) {
        return function composed() {
          return fn1.call(null, fn2.apply(null, arguments));
        }
      },

      // takes a variadic function and returns a unary function
      curry: function(fn) {
        var slice = Array.prototype.slice;
        return function curried() {
          var outerArgs = slice.call(arguments);
          return outerArgs.length >= fn.length ?
            fn.apply(null, outerArgs) :
            function(innerArg) {
              var newArgs = [].concat(outerArgs);
              newArgs.push(innerArg);
              return curried.apply(null, newArgs);
            }
        }
      },

      // turns a function into a method
      defuncify: function(fn) {
        return function defuncified(a) {
          return fn(this, a);
        }
      },

      // returns an array prefilled with a value a number of times
      fill: function(value, times) {
        return Array.fill ? new Array(times).fill(value) : Array.apply(null, Array(+times)).map(function() {
          return value;
        });
      },

      // takes any number of arguments and multidimensional arrays and returns new array with results flattened
      flatten: function(){
        return [].slice.call(arguments).reduce(function(a, b) {
          return a.concat(Array.isArray(b) ? funcifyr.flatten.apply(null, b) : b);
        }, []);
      },

      // modifies method to return its context, used for method chaining
      fluentify: function(methodBody) {
        return function fluentified() {
          var value = methodBody.apply(this, arguments);
          return value === undefined ? this : value;
        }
      },

      // turns a method into a function
      funcify: function(obj, methodString) {
        return function funcified(arg) {
          return obj[methodString].call(obj, arg);
        }
      },

      // plucks properties from array of objects
      get: function(prop) {
        return function got(arrayOfObjects) {
          return arrayOfObjects.map(function(obj) {
            return obj[prop];
          });
        };
      },

      // creates a type checker
      isify: function(type) {
        return function isified(value) {
          return typeof value === type;
        }
      },

      // creates predicate function to test for numbers less than x
      lessthanify: function(x) {
        return function lessthanified(y) {
          return y < x;
        }
      },

      // maps over an unmappable Array-like collection and runs a callback
      map: function(collection, callback) {
        return Array.apply(null, collection).map(function(v) {
          return callback ? callback(v) : v;
        });
      },

      // creates predicate function to test for numbers greater than x
      morethanify: function(x) {
        return function morethanified(y) {
          return y > x;
        }
      },

      // takes a predicate function and returns function that's the "opposite" of predicate
      negate: function(fnPredicate) {
        return function negated() {
          return !fnPredicate.apply(null, arguments);
        }
      },

      // runs two predicate functions on an argument, returns true if one OR the other is true
      orify: function(fn1, fn2) {
        return function orified(arg) {
          return fn1.call(null, arg) || fn2.call(null, arg);
        }
      },

      // creates a copy of a function with a preset first parameter
      partialify: function(fn, a) {
        return function partialified(b) {
          return fn.call(null, a, b);
        }
      },

      // runs a function on the passed in results of another function
      pipe: function(/*fns*/) {
        var fns = [].slice.call(arguments);
        return function piped(/*args*/) {
          var args = [].slice.call(arguments);
          fns.forEach(function(fn) {
            args = [fn.apply(null, args)];
          });
          return args[0];
        };
      },

      // returns a random integer between min and max
      randomify: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },

      // repeats a string a number of times
      repeat: function(str, times) {
        return Array.apply(null, new Array(times)).map(function() {
          return str;
        }).join('');
      },

      // creates functions from style objects to place inline styles on elements
      style: function(styleObject) {
        return function styled(element) {
          return Object.keys(styleObject).map(function(property) {
            element.style[property] = property;
          });
        }
      },

      // creates sequence of chainable actions
      thenify: function(value) {
        return {
          value: value,
          then: function(fn) {
            this.value = fn(this.value);
            return this;
          },
          end: function() {
            return this.value;
          }
        };
      },

      // takes an array with duplicates and returns a new one with all dupes removed
      uniqify: function(arr) {
        return Array.from ? Array.from(new Set(arr)) : arr.filter(function(v,i,a) {
          return i === a.indexOf(v);
        });
      },

      // runs function when result of function predicate is true
      whenify: function(fnPredicate, fnWhenTrue) {
        return function whenified(x) {
          return fnPredicate(x) ? fnWhenTrue(x) : x;
        }
      }

    };

  })();

  return funcifyr;

});
