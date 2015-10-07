(function ( window, document ) {
'use strict';

  window.funcifyr = {

    arrayify: function(collection) {
    // Converts Array-like object, HTMLCollection or NodeList that's not mappable into Array
      return Array.from ? Array.from(collection) : Array.apply(null, collection).map(function(v) {
        return v;
      });
    },

    colorify: function() {
    // returns a random hex color
      return '#' + (
        '0123456789ABCDEF'.split('').map(function(v,i,a) {
          return a[Math.floor(Math.random() * 16)];
        }).join('').slice(0,6)
      );
    },

    composify: function(fn1, fn2) {
    // creates a function from two functions
      return function composified() {
        return fn1.call(this, fn2.apply(this, arguments));
      }
    },

    currify: function(fn, a) {
    // creates copy of function with preset first parameter
      return function currified(b) {
        return fn.call(this, a, b);
      }
    },

    defuncify: function(fn) {
    // turns a function into a method  
      return function defuncified(a, b) {
        return fn.call(this, a, b);
      }
    },

    fastify: function(mediaElementId) {
    // increases HTML5 video or audio speed by .1
      document.getElementById(mediaElementId).playbackRate += 0.1;
    },

    funcify: function(obj, methodString) {
    // turns a method into a function
      return function funcified(a, b) {
        return obj[methodString].call(obj, a, b);
      }
    },

    mapify: function(collection, callback) {
    // maps over an unmappable Array-like collection and runs a callback
      return Array.apply(null, collection).map(function(v) {
        return callback ? callback(v) : v;
      });
    },

    randomify: function(min, max) {
    // returns random integer between min and max 
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    repeatify: function(str, times) {
    // repeats a string a number of times
      return Array.apply(null, new Array(times)).map(function() {
        return str;
      }).join('');
    },

    schonfinkelify: function(fn) {
    // a more general-purpose currify for arbitrary arity
      var slice = Array.prototype.slice, args = slice.call(arguments, 1);
      return function schonfinkeliied() {
        return fn.apply(null, args.concat(slice.call(arguments)));
      }
    },

    slowify: function(mediaElementId) {
    // decreases HTML5 video or audio speed by .1
      document.getElementById(mediaElementId).playbackRate -= 0.1;
    },

    uniqify: function(arr) {
    // takes an array and returns a new set with all duplicates removed
      return arr.filter(function(v,i,a) {
        return i === a.indexOf(v);
      });
    }
    
  };

})( window, document );