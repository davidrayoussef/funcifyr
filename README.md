# funcifyr.js 
funcifyr.js (pronounced Funkifier) is partly a joke on the *ify* suffix used everywhere, partly a resource for myself to reference oft-used functions, and partly a tool that might have some use for somebody.

# tl;dr
```javascript
funcifyr.arrayify() // converts NodeList into an Array
funcifyr.colorify() // returns random hex color
funcifyr.composify() // creates function from two functions
funcifyr.currify() // creates copy of a function with preset first parameter
funcifyr.defuncify() // turns function into a method
funcifyr.fastify() // increases HTML5 video or audio speed
funcifyr.fillify() // returns array prefilled with a value
funcifyr.flattify() // flattens multidimensional arrays
funcifyr.funcify() // turns method into a function
funcifyr.mapify() // similar to arrayify, but runs a callback function on an unmappable collection
funcifyr.randomify() // returns random integer 
funcifyr.repeatify() // repeats a string a number of times
funcifyr.schonfinkelify() // a more general-purpose currify
funcifyr.slowify() // decreases HTML5 video or audio speed
funcifyr.uniqify() // removes dupicates
```

# Examples
*funcifyr.arrayify(collection)*

The methods querySelectorAll(), getElementsByClassName() and getElementsByTagName() return HTMLCollections instead of arrays.

<div class="one"></div>
<div class="two"></div>
<div class="three"></div>

```javascript
var elementCollection = document.querySelectorAll('div');
elementCollection.forEach(function(el) { 
	el.className += ' new-class';
});
// Uncaught TypeError: elementCollection.forEach is not a function
```

```javascript
Use arrayify to turn them into arrays that can then be iterated over with .forEach, .map, .filter, etc. 

var elementCollection = document.querySelectorAll('div');
var iterableCollection = funcifyr.arrayify(elementCollection);
iterableCollection.forEach(function(el) { 
	el.className += ' new-class';
});
```
<div class="one new-class"></div>
<div class=​"two new-class">​</div>​
<div class=​"three new-class">​</div>​


*funcifyr.colorify()*

Returns a random hex color.

<ul>
	<li></li>
	<li></li>
	<li></li>
</ul>

```javascript
var lis = funcifyr.arrayify(document.getElementsByTagName('li'));

lis.map(function(li) {
	li.style.width = '200px';
	li.style.height = '200px';
	li.style.background = funcifyr.colorify();
});
```
<ul>
	<li style="width: 200px; height: 200px; background: #D8B0FE;"></li>
	<li style="width: 200px; height: 200px; background: #E9D26D;"></li>
	<li style="width: 200px; height: 200px; background: #70F5C1;"></li>
</ul>


*funcifyr.composify(fn1, fn2)*

Composes a function from two functions. 

E.g. You want to check if something is a string AND has more than 6 characters...

```javascript
var isString = function(a) { return typeof a === 'string'; };
var isLongerThanSix = function(b) { return b.length > 6;  };
var isValid = funcifyr.composify(isString, isLongerThanSix);

isValid(55); // false
isValid('funci'); // false
isValid('funcify all the things'); // true
```


*funcifyr.currify(fn, a)*

Creates a copy of a function with a preset first parameter. Useful for creating functions where you know the first argument but not the rest.

```javascript
function greeter(greet, greeting) { return greet + ', ' + greeting; }
var englishGreet = funcifyr.currify(greeter, 'Hi');
var spanishGreet = funcifyr.currify(greeter, 'Hola');
var japaneseGreet = funcifyr.currify(greeter, 'Konnichiwa');

englishGreet('how are you?'); // Hi, how are you?
spanishGreet('how are you?'); // Hola, how are you?
japaneseGreet('how are you?'); // Konnichiwa, how are you?
```
Technically this should be called partialify, but currify sounds better.


*funcifyr.defuncify(fn)*

Takes a function and turns it into a method.

```javascript
var reverseString = function(str) { return str.split('').reverse().join(''); };
String.prototype.reverseString = funcifyr.defuncify(reverseString);

'funcifyr'.reverseString(); // ryficnuf
```


*funcifyr.fillify(value, times)*

Prefills an array with a value a number of times. Useful for quickly adding filler content.

```javascript
todo
```


*funcifyr.flattify()*

Takes any number of arguments and multidimensional arrays and returns a new array with the results flattened.


```javascript
var flattened = funcifyr.flattify('z', [[['y', 4], 3], true], [[2], [[[[[1]]]]], ['x']]);

console.log(flattened); // ["z", "y", 4, 3, true, 2, 1, "x"]
```

... todo