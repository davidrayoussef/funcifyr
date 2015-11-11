(function ( window, document ) {
'use strict';

  window.funcifyr = {

    // runs two predicate functions on an argument and returns true if both are true 
    andify: function(fn1, fn2) {
      return function andified(arg) {
        return fn1(arg) && fn2(arg);
      }
    },

    // converts an Array-like object, HTMLCollection or NodeList that's not mappable into an Array
    arrayify: function(collection) {
      return Array.from ? Array.from(collection) : Array.apply(null, collection).map(function(v) {
        return v;
      });
    },

    // creates a function from two functions
    composify: function(fn1, fn2) {
      return function composified() {
        return fn1.call(this, fn2.apply(this, arguments));
      }
    },

    // creates a copy of a function with a preset first parameter
    currify: function(fn, a) {
      return function currified(b) {
        return fn.call(this, a, b);
      }
    },

    // turns a function into a method  
    defuncify: function(fn) {
      return function defuncified(a) {
        return fn(this, a);
      }
    },

    // creates a negate function that returns true if result is false
    falsify: function(fn) {
      return function falsified() {
        return !fn.apply(this, arguments);
      }
    },

    // returns an array prefilled with a value a number of times
    fillify: function(value, times) {
      return Array.apply(null, Array(+times)).map(function() { 
        return value;
      });
    },

    // takes any number of arguments and multidimensional arrays and returns new array with results flattened
    flattify: function(){
      return [].slice.call(arguments).reduce(function(a, b) {              
        return a.concat(Array.isArray(b) ? funcifyr.flattify.apply(null, b) : b);
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
    getify: function(prop) {
      return function getified(arr) {
        return arr.map(function(obj) {
          return obj[prop];
        });
      };
    },

    // returns a random hex color
    hexify: function() {
      return '#' + (
        '0123456789ABCDEF'.split('').map(function(v,i,a) {
          return a[Math.floor(Math.random() * 16)];
        }).join('').slice(0,6)
      );
    },
    
    // creates predicate function to test for numbers less than x
    lessthanify: function(x) {
      return function lessthanified(y) {
        return y < x;
      }
    },

    // maps over an unmappable Array-like collection and runs a callback
    mapify: function(collection, callback) {
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

    // runs two predicate functions on an argument, returns true if one OR the other is true 
    orify: function(fn1, fn2) {
      return function orified(arg) {
        return fn1(arg) || fn2(arg);
      }
    },

    // runs a function on the passed in results of another function
    pipeify: function(fn1, fn2) {
      return function pipeified() {
        return fn2.call(this, fn1.apply(this, arguments));
      }
    },

    // returns a random integer between min and max 
    randomify: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    // repeats a string a number of times
    repeatify: function(str, times) {
      return Array.apply(null, new Array(times)).map(function() {
        return str;
      }).join('');
    },

    // a more general-purpose currify with arbitrary arity
    schonfinkelify: function(fn) {
      var slice = Array.prototype.slice, args = slice.call(arguments, 1);
      return function schonfinkeliied() {
        return fn.apply(null, args.concat(slice.call(arguments)));
      }
    },

    // takes an array with duplicates and returns a new one with all dupes removed
    uniqify: function(arr) {
      return arr.filter(function(v,i,a) {
        return i === a.indexOf(v);
      });
    }
    
  };

})( window, document );