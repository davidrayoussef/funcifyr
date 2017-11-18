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

      /**
       * Runs two predicate functions on an argument and returns true if both are true
       *
       * and :: (fn, fn) → (a) → bool
       *
       * @param (fn1, fn2) - Two predicate functions
       * @returns function
       *   @param arg - An argument to run the two predicate functions on
       *   @returns true or false
      **/
      and: function(fn1, fn2) {
        return function andified(arg) {
          return fn1.call(null, arg) && fn2.call(null, arg);
        }
      },

      /**
       * Converts an Array-like object, HTMLCollection or NodeList (that's not mappable) into an Array
       *
       * arrayify :: (obj) → arr
       *
       * @param (object) - An Array-like object
       * @returns array
      **/
      arrayify: function(collection) {
        return Array.from ? Array.from(collection) : Array.apply(null, collection);
      },

      /**
       * Returns an array of arrays or strings in chunks of n
       *
       * chunkBy :: (n) → (a) → arr
       *
       * @param n - A number to use as chunk's length
       * @returns function
       *   @param arg - An array or string to chunk
       *   @returns array
      **/
      chunkBy: function(n) {
        return function chunk(arg) {
          if ( Array.isArray(arg) ) {
            return arg.reduce((acc,_,i,a) => {
              return i % n === 0 ? acc.concat( [a.slice(i, i + n)] ) : acc;
            }, []);
          }
          else if ( typeof arg === 'string' ) {
            return arg.match( new RegExp('.{1,' + n + '}', 'g') ) || [];
          }
          else throw new TypeError('Incorrect type. Passed in value should be an array or string.');
        }
      },

      /**
       * Creates a function from two functions that runs fn1 on the results of fn2
       *
       * compose :: (fn, fn) → (a) → r
       *
       * @param (fn1, fn2) - Two functions
       * @returns function
       *   @param arguments - Any arguments passed to inner function
       *   @returns Result of fn1(fn2(arguments))
      **/
      compose: function(fn1, fn2) {
        return function composed() {
          return fn1.call(null, fn2.apply(null, arguments));
        }
      },

      /**
       * Takes a variadic function and returns unary functions until all parameters are used
       *
       * curry :: (fn → (a,b,c,d)) → (a) → (b) → (c) → (d) → r
       *
       * @param fn - A function to be curried
       * @returns The curried function
       *   @param arguments - Any arguments passed
       *   @returns Either the result of original function if all params were used, OR a unary function
       *     @param innerArg
       *     @returns Call to curried function with additional arg
      **/
      curry: function(fn) {
        return function curried() {
          var gatheredArgs = [].slice.call(arguments);

          if ( gatheredArgs.length >= fn.length ) {
            return fn.apply(null, gatheredArgs);
          }

          return function(innerArg) {
            var newArgs = [].concat(gatheredArgs, innerArg);
            return curried.apply(null, newArgs);
          }
        }
      },

      /**
       * Returns an array filled with a value repeated a number of times
       *
       * fill :: (n, n) → arr
       *
       * @param (value, times) - The value to fill, and the length of the new array
       * @returns array
      **/
      fill: function(value, times) {
        if (Array.fill) {
          return new Array(times).fill(value);
        }
        return Array.apply(null, Array(+times)).map(function() {
          return value;
        });
      },

      /**
       * Takes any number of arguments and/or multidimensional arrays and returns a new array with results flattened
       *
       * flatten :: (a, b, [[c], [d, e]]) → [a, b, c, d, e]
       *
       * @param arguments - Values, arrays, or multi-dimensional arrays
       * @returns array
      **/
      flatten: function() {
        return [].slice.call(arguments).reduce(function(a, b) {
          return a.concat(Array.isArray(b) ? funcifyr.flatten.apply(null, b) : b);
        }, []);
      },

      /**
       * Modifies a method to return its context; useful for method chaining
       *
       * fluentify :: (fn) → (a) → context || r
       *
       * @param methodBody - A method of an object
       * @returns function
       *   @param arguments
       *   @returns Either the result of calling the method, or the THIS context if there's no result
      **/
      fluentify: function(methodBody) {
        return function fluentified() {
          var value = methodBody.apply(this, arguments);
          return value === undefined ? this : value;
        }
      },

      /**
       * Groups together related prop values from an array of objects
       *
       * groupBy :: (a) → (arr) → obj
       *
       * @param key - A property name used to do the grouping
       * @returns function
       *   @param arr - An array of objects
       *   @returns An object of key-value pairs grouped by the key
      **/
      groupBy: function(key) {
        return function group(arr) {
          return arr.reduce(function(obj, item) {
            (obj[item[key]] = obj[item[key]] || []).push(item);
            return obj;
          }, {});
        }
      },

      /**
       * Creates a type checker
       *
       * is :: (a) → (b) → bool
       *
       * @param type - A string representation of a type to check against
       * @returns function
       *   @param value - A value to check if it matches the type
       *   @returns true or false
      **/
      is: function(type) {
        return function(value) {
          return type === ({}.toString.call(value).slice(8, -1).toLowerCase());
        }
      },

      /**
       * Creates a predicate function to test for numbers less than x
       *
       * lessThan :: (a) → (b) → bool
       *
       * @param x - A number to check against
       * @returns function
       *   @param y - A second number to check if it's less than the first number
       *   @returns true or false
      **/
      lessThan: function(x) {
        return function lessThanified(y) {
          return y < x;
        }
      },

      /**
       * Maps over an unmappable Array-like collection and runs a callback
       *
       * map :: (obj, fn) → arr
       *
       * @param (collection, callback) - A collection to iterate over, and a callback function to run
       * @returns array
       * TODO Rewrite to handle objects
      **/
      map: function(collection, callback) {
        return Array.apply(null, collection).map(function(v) {
          return callback ? callback(v) : v;
        });
      },

      /**
       * Creates predicate function to test for numbers greater than x
       *
       * moreThan :: (a) → (b) → bool
       *
       * @param x - A number to check against
       * @returns function
       *   @param y - A second number to check if it's more than the first number
       *   @returns true or false
      **/
      moreThan: function(x) {
        return function moreThanified(y) {
          return y > x;
        }
      },

      /**
       * Takes a predicate function and returns a function that's the "opposite" of the predicate
       *
       * negate :: (fn) → (a) → bool
       *
       * @param fnPredicate - A predicate function
       * @returns function
       *   @param arguments
       *   @returns true or false
      **/
      negate: function(fnPredicate) {
        return function negated() {
          return !fnPredicate.apply(null, arguments);
        }
      },

      /**
       * Runs two predicate functions on an argument and returns true if either are true
       *
       * or :: (fn, fn) → (a) → bool
       *
       * @param (fn1, fn2) - Two predicate functions
       * @returns function
       *   @param arg - An argument to run the two predicate functions on
       *   @returns true or false
      **/
      or: function(fn1, fn2) {
        return function orified(arg) {
          return fn1.call(null, arg) || fn2.call(null, arg);
        }
      },

      /**
       * Creates a copy of a function with a preset first parameter
       *
       * partial :: (fn, a) → (b) → r
       *
       * @param (fn, a) - A function and an initial argument
       * @returns function
       *   @param b - A second argument
       *   @returns The result of calling the function with the first and second argument
      **/
      partial: function(fn, a) {
        return function partialified(b) {
          return fn.call(null, a, b);
        }
      },

      /**
       * Runs several functions, using the result of one function as the argument for the next
       *
       * pipe :: (fns) → (a) → r
       *
       * @param arguments - A variadic number of functions
       * @returns function
       *   @param arguments - A variadic number of arguments
       *   @returns The result of calling each function on the arguments
      **/
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

      /**
       * Plucks values from objects in an array
       *
       * pluck :: (a) → (arr) → arr
       *
       * @param prop - A string representation of a property to target
       * @returns function
       *   @param arrayOfObjects - An array of objects
       *   @returns An array of the plucked values
      **/
      pluck: function(prop) {
        return function plucked(arrayOfObjects) {
          return arrayOfObjects.map(function(obj) {
            return obj[prop];
          });
        };
      },

      /**
       * Returns a random integer between min and max
       *
       * random :: (n, n) → r
       *
       * @param (min, max) - A minimum value and a maximum value
       * @returns A random number
      **/
      random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },

      /**
       * Repeats a string a number of times
       *
       * repeat :: (a, n) → r
       *
       * @param (str, times) - A string to repeat, and a number for the amount of repetitions
       * @returns A repeated string
      **/
      repeat: function(str, times) {
        if (String.prototype.repeat) return str.repeat(times);
        return Array.apply(null, new Array(times)).map(function() {
          return str;
        }).join('');
      },

      /**
       * Randomly shuffles items in an array
       *
       * shuffle :: (arr) → arr
       *
       * @param (arr) - An array to be shuffled
       * @returns A shuffled array
      **/
      shuffle: function(arr) {
        for (var i = 0; i < arr.length; i++) {
          var randIndex = Math.floor(Math.random() * arr.length);
          var temp = arr[randIndex];
          arr[randIndex] = arr[i];
          arr[i] = temp;
        }
        return arr;
      },

      /**
       * Returns an object with the number of occurrences of a property value found in an array of objects
       *
       * tally :: (a) → (arr) → obj
       *
       * @param prop - A string representation of a property to target
       * @returns function
       *   @param arrayOfObjects - An array of objects
       *   @returns An object with the prop as a key, and the number of its occurences as the value
      **/
      tally: function(prop) {
        return function tallied(arrayOfObjects) {
          return arrayOfObjects.reduce(function(acc, curr) {
            acc[curr[prop]] = (acc[curr[prop]] || 0) + 1;
            return acc;
          }, {});
        }
      },

      /**
       * Creates sequence of chainable actions
       *
       * thenify :: (a) → obj
       *
       * @param value - An initial value
       * @returns An object with a then function to run on the value, and an end function to return the final value
      **/
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

      /**
       * Takes an array with duplicates and returns a new one with all dupes removed
       *
       * unique :: (arr) → arr
       *
       * @param arr
       * @returns A new array with duplicates removed
      **/
      unique: function(arr) {
        if (Array.prototype.from) return Array.from(new Set(arr));
        return arr.filter(function(v,i,a) {
          return i === a.indexOf(v);
        });
      },

      /**
       * Runs a function when the result of a function predicate is true
       *
       * when :: (fn, fn) → (a) → r
       *
       * @param (fnPredicate, fnWhenTrue) - A predicate function and another function to run
       * @returns function
       *   @param arg
       *   @returns Either the result of running the second function on the argument, or the argument itself
      **/
      when: function(fnPredicate, fnWhenTrue) {
        return function whenified(arg) {
          return fnPredicate(arg) ? fnWhenTrue(arg) : arg;
        }
      }

    };

  })();

  return funcifyr;

});
