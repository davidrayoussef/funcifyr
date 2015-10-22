(function ( window, document ) {
'use strict';

  window.funcifyr = {

    // converts an Array-like object, HTMLCollection or NodeList that's not mappable into an Array
    arrayify: function(collection) {
      return Array.from ? Array.from(collection) : Array.apply(null, collection).map(function(v) {
        return v;
      });
    },

    // returns a random hex color
    colorify: function() {
      return '#' + (
        '0123456789ABCDEF'.split('').map(function(v,i,a) {
          return a[Math.floor(Math.random() * 16)];
        }).join('').slice(0,6)
      );
    },

    // creates a function from two functions
    composify: function(fn1, fn2) {
      return function composified(arg) {
        return fn1(arg) && fn2(arg);
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

    // increases HTML5 video or audio speed by 0.1
    fastify: function(mediaElementId) {
      document.getElementById(mediaElementId).playbackRate += 0.1;
    },

    // returns an array prefilled with a value a number of times
    fillify: function(value, times) {
      return Array.apply(null, Array(+times)).map(function() { return value });
    },

    // Takes any number of arguments and multidimensional arrays and returns new array with results flattened
    flattify: function(){
      return [].slice.call(arguments).reduce(function(a, b){              
        return a.concat(Array.isArray(b) ? funcifyr.flattify.apply(null, b) : b);
      }, []);
    },

    // turns a method into a function
    funcify: function(obj, methodString) {
      return function funcified(a, b) {
        return obj[methodString].call(obj, a, b);
      }
    },

    // maps over an unmappable Array-like collection and runs a callback
    mapify: function(collection, callback) {
      return Array.apply(null, collection).map(function(v) {
        return callback ? callback(v) : v;
      });
    },

    // returns random integer between min and max 
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

    // decreases HTML5 video or audio speed by 0.1
    slowify: function(mediaElementId) {
      document.getElementById(mediaElementId).playbackRate -= 0.1;
    },

    // takes an array with duplicates and returns a new one with all dupes removed
    uniqify: function(arr) {
      return arr.filter(function(v,i,a) {
        return i === a.indexOf(v);
      });
    }
    
  };

})( window, document );