(function ( window, document ) {
'use strict';

	window.funcifyr = {

		animify: function() {},

		composify: function() {},

		colorify: function() {
    // returns a random hex color
		  return '#' + (
		  	'0123456789ABCDEF'.split('').map(function(v,i,a) {
		  		return a[Math.floor(Math.random() * 16)];
		  	}).join('').slice(0,6)
		  );
		},

		currify: function() {},

		konamify: function() {},

    mapify: function(collection, callback) {
    // maps over an Array-like object, HTMLCollection or NodeList that's not mappable
    // if callback function passed, runs callback on each element
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

		shortify: function(obj, method) {},

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