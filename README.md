# funcifyr.js 
funcifyr.js (pronounced Funkifier) is partly a joke on the *ify* suffix used everywhere, partly a resource for myself to reference oft-used functions, and partly a tool that might have some use for somebody.

# tl;dr
```javascript
funcifyr.andify() // runs 2 functions on arg, returns true if both true
funcifyr.arrayify() // converts NodeList into an Array
funcifyr.colorify() // returns random hex color
funcifyr.composify() // creates new function from two functions
funcifyr.currify() // creates copy of a function with preset first param
funcifyr.defuncify() // turns a function into a method
funcifyr.falsify() // creates a negate function
funcifyr.fastify() // increases HTML5 video or audio speed
funcifyr.fillify() // returns an array prefilled with a value
funcifyr.flattify() // flattens multidimensional arrays
funcifyr.funcify() // turns a method into a function
funcifyr.mapify() // runs a callback on an unmappable collection
funcifyr.orify() // runs 2 functions on arg, returns true if either true
funcifyr.pipeify() // runs a function on passed-in results of another
funcifyr.randomify() // returns random integer 
funcifyr.repeatify() // repeats a string a number of times
funcifyr.schonfinkelify() // a more general-purpose currify
funcifyr.slowify() // decreases HTML5 video or audio speed
funcifyr.uniqify() // removes duplicates
```

# Examples
## funcifyr.andify(fn1, fn2)

Runs two predicate functions on an argument and returns true if both are true.

e.g. You want to check if something is a string AND has more than 6 characters...
```javascript
var isString = function(a) { return typeof a === 'string'; };
var isLongerThanSix = function(b) { return b.length > 6; };
var isValid = funcifyr.andify(isString, isLongerThanSix);

isValid(55); //=> false
isValid('funci'); //=> false
isValid('funcify all the things'); //=> true
```


## funcifyr.arrayify(collection)

The methods querySelectorAll(), getElementsByClassName() and getElementsByTagName() return HTMLCollections instead of arrays.
```javascript
<div class="old-class"></div>
<div class="old-class"></div>
<div class="old-class"></div>

var elementCollection = document.querySelectorAll('div');
elementCollection.forEach(function(el) { 
	el.className += ' new-class';
});
//=> Uncaught TypeError: elementCollection.forEach is not a function
```

Use arrayify to turn them into arrays that can then be iterated over with 
.forEach, .map, .filter, etc. 

```javascript
var elementCollection = document.querySelectorAll('div');
var iterableCollection = funcifyr.arrayify(elementCollection);
iterableCollection.forEach(function(el) { 
	el.className += ' new-class';
});

<div class="old-class new-class"></div>
<div class=​"old-class new-class">​</div>​
<div class=​"old-class new-class">​</div>​
```


## funcifyr.colorify()

Returns a random hex color.
```javascript
<ul>
	<li></li>
	<li></li>
	<li></li>
</ul>

var lis = funcifyr.arrayify(document.getElementsByTagName('li'));

lis.map(function(li) {
	li.style.width = '200px';
	li.style.height = '200px';
	li.style.background = funcifyr.colorify();
});

<ul>
	<li style="width: 200px; height: 200px; background: #D8B0FE;"></li>
	<li style="width: 200px; height: 200px; background: #E9D26D;"></li>
	<li style="width: 200px; height: 200px; background: #70F5C1;"></li>
</ul>
```


## funcifyr.composify(fn1, fn2)

Creates a function from two functions. 

```javascript
var getFirstLastName = function(person) {	return person.split(' '); };
var reverseOrder = function(names) { return names[1] + ', ' + names[0]; };
var lastNameFirst = funcifyr.composify(reverseOrder, getFirstLastName);

console.log(lastNameFirst('Joe Schmoe')); //=> Schmoe, Joe
```


## funcifyr.currify(fn, a)

Creates a copy of a function with a preset first parameter. Useful for creating functions where you know the first argument but not the rest. Technically this should be called partialify, but currify sounds better.
```javascript
function greeter(greet, greeting) { 
  console.log(`${greet}, ${greeting}`);
}
var englishGreet = funcifyr.currify(greeter, 'Hi');
var spanishGreet = funcifyr.currify(greeter, 'Hola');
var japaneseGreet = funcifyr.currify(greeter, 'Konnichiwa');

englishGreet('how are you?'); //=> Hi, how are you?
spanishGreet('how are you?'); //=> Hola, how are you?
japaneseGreet('how are you?'); //=> Konnichiwa, how are you?
```


## funcifyr.defuncify(fn)

Takes a function and turns it into a method.

```javascript
var reverseString = function(str) { return str.split('').reverse().join(''); };
String.prototype.reverseString = funcifyr.defuncify(reverseString);

'funcifyr'.reverseString(); //=> ryficnuf
```


## funcifyr.falsify(fn)

Creates a negate function that returns true if the result is false.
e.g. You want to grab customers that are NOT Gold members and list them as NOT elligible.

```javascript
var data = [ 
	{ name: 'Marty Mcfly', hasGold: true }, 
	{ name: 'Jake Jumanji', hasGold: false },  
	{ name: 'Frederick Finkelstein', hasGold: false },  
	{ name: 'Gertrude Gretel', hasGold: false },  
	{ name: 'Agnes Agatha', hasGold: true }
];

var isGoldMember = (member) => member.hasGold;

var isNotGoldMember = funcifyr.falsify(isGoldMember);

var isNotEligible = data.filter(isNotGoldMember);

console.table(isNotEligible);

// (index)      name                       hasGold
// 0            "Jake Jumanji"             false
// 1            "Frederick Finkelstein"    false
// 2            "Gertrude Gretel"          false
```


## funcifyr.fillify(value, times)

Prefills an array with a value or an object a number of times. Useful for quickly adding filler content.

```javascript
todo example
```


## funcifyr.flattify()

Takes any number of arguments and multidimensional arrays and returns a new array with the results flattened.

```javascript
var flattened = funcifyr.flattify('z', [[['y', 4], 3], true], [[2], [[[[[1]]]]], ['x']]);

console.log(flattened); //=> ["z", "y", 4, 3, true, 2, 1, "x"]
```


## funcifyr.funcify(obj, methodString)

Takes a method of an object and turns it into a function. For example, shorten "console.log" to just "log"

```javascript
var log = funcifyr.funcify(console, 'log');

log('Wow I have saved so many keystrokes.'); //=> Wow I have saved so many keystrokes.
```


## funcifyr.orify(fn1, fn2)

Runs two predicate functions on an argument and returns true if one OR the other is true.
e.g. You want to grab customers that either have a gold membership, OR a 12-month subscription.

```javascript
var data = [ 
	{ name: 'Marty Mcfly', monthsSubscribed: 1, hasGold: true }, 
	{ name: 'Jake Jumanji', monthsSubscribed: 12, hasGold: false },  
	{ name: 'Frederick Finkelstein', monthsSubscribed: 6, hasGold: false },  
	{ name: 'Gertrude Gretel', monthsSubscribed: 1, hasGold: false },  
	{ name: 'Agnes Agatha', monthsSubscribed: 12, hasGold: true }
];

var isGoldMember = (member) => member.hasGold;
var isYearSubscriber = (member) => member.monthsSubscribed === 12;

var isEligible = data.filter(funcifyr.orify(isGoldMember, isYearSubscriber));

console.table(isEligible);
// (index)      name                     monthsSubscribed    hasGold
// 0            "Marty Mcfly"            1                   true
// 1            "Jake Jumanji"           12                  false
// 2            "Agnes Agatha"           12                  true
```


## funcifyr.pipeify(fn1, fn2)

Runs a function on the passed-in results of another function. Same as compose but function order is reversed.

```javascript
var data = [ 
	{ id: 1, name: 'Starvin Marvin', age: 39 }, 
	{ id: 2, name: 'Anna Banana', age: 25 },  
	{ id: 3, name: 'Mean Gene', age: 33 },  
	{ id: 4, name: 'Hairy Mary', age: 21 },  
	{ id: 5, name: 'Brave Dave', age: 40 }
];

var getNames = function(data) { 
	return data.map(function(v) {
		return v.name;
	});
};

var getInitials = function(names) {
	return names.map(function(name) {
		return name.split(' ')[0][0] + name.split(' ')[1][0];
	});
}

var pluckInitials = funcifyr.pipeify(getNames, getInitials);

console.log(pluckInitials(data)); //=> ["SM", "AB", "MG", "HM", "BD"]
```


## funcifyr.repeatify(str, times)

Repeats a string a number of times.

```javascript
funcifyr.repeatify('repeat', 9) //=> "repeatrepeatrepeatrepeatrepeatrepeatrepeatrepeatrepeat"
```


## funcifyr.schonfinkelify()

A more general purpose curry with arbitrary arity.

```javascript
todo
```


## funcifyr.uniqify(arr)

Takes an array which might have duplicates and returns a new array with all dupes removed.
```javascript
var arrWithDupes = ['a', 1, 1, 'a', 'a', 'b', 2, 'b', 2, 2, 'b', 'c', 3, 3];

funcifyr.uniqify(arrWithDupes) //=> ["a", 1, "b", 2, "c", 3]
```