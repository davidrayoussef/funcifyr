# funcifyr.js
funcifyr.js is a functional library used for function creation, combination, composition and decoration.

# Getting Started

## To use with standard script tags..
Download [funcifyr.js](https://raw.githubusercontent.com/davidrayoussef/funcifyr/master/funcifyr.js) and place in the same folder as your index.html file. In index.html...
```javascript
<script src="funcifyr.js"></script>
<script>
var randomNum = F.random(0, 100);
var rangeOfNums = F.range(1, 10);
</script>

```

## To install with npm...
```shell
$ npm install --save-dev funcifyr
```

To use the library...
```javascript
const F = require('funcifyr');
```

To import just one method...
```javascript
const { shuffle } = require('funcifyr');
```

To import several methods...
```javascript
const { shuffle, compose, flatten } = require('funcifyr');
```

# Summary list of methods
```javascript
F.and() // runs 2 functions on arg, returns true if both true
F.arrayify() // converts a NodeList into an Array
F.chunkBy() // returns an array of arrays or strings in chunks of n
F.compose() // creates new function from two functions
F.curry() // turns a multi-param function into a series of one-param functions
F.fill() // returns an array prefilled with a value
F.flatMap() // runs a callback on nested arrays
F.flatten() // flattens multidimensional arrays
F.fluentify() // used for method chaining
F.groupBy() // groups together related prop values from objects
F.is() // creates a type checker
F.lessThan() // tests for values less than x
F.map() // runs a callback on a collection
F.moreThan() // tests for values greater than x
F.negate() // creates a function that returns the opposite of a predicate
F.or() // runs 2 functions on an arg, returns true if either are true
F.partial() // creates copy of a function with a preset first param
F.pipe() // runs a function on the passed-in results of another
F.pluck() // plucks props from objects in an array
F.random() // returns a random integer
F.range() // returns a range of numbers
F.repeat() // repeats a string a number of times
F.shuffle() // randomly shuffles items in an array
F.tally() // returns tally count of a prop value from objects in an array
F.thenify() // creates a sequence of chainable actions
F.unique() // removes duplicates
F.when() // runs a function when the result of a function predicate is true

```

# Examples
## F.and(fn1, fn2)

Runs two predicate functions on an argument and returns true if both are true.

e.g. You want to check if something is a string AND has more than 6 characters...
```javascript
const isString = (str) => typeof str === 'string';
const isLongerThanSix = (str) => str.length > 6;
const isValid = F.and(isString, isLongerThanSix);

isValid(55); //=> false
isValid('funci'); //=> false
isValid('funcify all the things'); //=> true
```


## F.arrayify(collection)

In some older browsers, the methods querySelectorAll(), getElementsByClassName() and getElementsByTagName() return HTMLCollections instead of arrays.
```javascript
<div class="old-class"></div>
<div class="old-class"></div>
<div class="old-class"></div>

const elementCollection = document.querySelectorAll('div');
elementCollection.forEach(el => el.className += ' new-class');
//=> Uncaught TypeError: elementCollection.forEach is not a function
```

Use arrayify to turn them into arrays that can then be iterated over with .forEach, .map, .filter, etc.
```javascript
const elementCollection = document.querySelectorAll('div');
const iterableCollection = F.arrayify(elementCollection);
iterableCollection.map(el => el.className += ' new-class');

<div class="old-class new-class"></div>
<div class=​"old-class new-class">​</div>​
<div class=​"old-class new-class">​</div>​
```


## F.chunkBy(n)

Creates a function that returns an array of arrays or strings in chunks of n.
```javascript
const chunkBy2 = F.chunkBy(2);
console.log( chunkBy2([1,2,3,4,5,6,7,8]) ); //=> [[1,2],[3,4],[5,6],[7,8]]

const chunkBy3 = F.chunkBy(3);
console.log( chunkBy3('Hello world') ); //=> ["Hel", "lo ", "wor", "ld"]
```


## F.compose(fn1, fn2)

Creates a composed function that returns the result of running a function on the output of another function.
```javascript
const getFirstLastName = (person) => person.split(' ');
const reverseOrder = (names) => `${names[1]}, ${names[0]}`;
const lastNameFirst = F.compose(reverseOrder, getFirstLastName);

console.log( lastNameFirst('Joe Schmoe') ); //=> Schmoe, Joe
```


## F.curry(fn)

Translates a function that takes multiple arguments into a series of functions that each take one argument, and continues until it receives all its arguments.

e.g., You want to turn this render function that takes four arguments, into several intermediary functions that take one argument each. Each intermediary function will have specialized functionality.
```javascript
function render(type, props, text, parent) {
  const element = document.createElement(type);
  Object.keys(props).forEach(key => element.setAttribute(key, props[key]));
  element.textContent = text;
  document.querySelector(parent).appendChild(element);
}

// Creates a curried version of the render function, ready to take one argument at a time.
const curriedRender = F.curry(render);

// Passing the first argument, the type of element, creates a reusable "div maker" function.
const createDiv = curriedRender('div');

// Use div maker function to pass the second argument, creating two more functions that add a unique attribute.
const createDivWithPrimaryClass = createDiv({ class: 'primary' });
const createDivWithSecondaryClass = createDiv({ class: 'secondary' });

// Run the new functions with the third argument, the text of the element.
const renderPrimaryDiv1 = createDivWithPrimaryClass('This is the 1st Primary div');
const renderPrimaryDiv2 = createDivWithPrimaryClass('This is the 2nd Primary div');
const renderSecondaryDiv1 = createDivWithSecondaryClass('This is the 1st Secondary div');
const renderSecondaryDiv2 = createDivWithSecondaryClass('This is the 2nd Secondary div');

// Optionally call curriedRender function 3 times, passing the first three arguments.
const renderHeader = curriedRender('header')({ id: 'header' })('This is the Header');
const renderFooter = curriedRender('footer')({ id: 'footer' })('This is the Footer');

// Pass the final argument, the parent element to append to. Since there are no more arguments, the original render function will execute with all the "remembered" variables in each of the following functions' state.
renderHeader('body');
renderPrimaryDiv1('body');
renderSecondaryDiv1('.primary');
renderSecondaryDiv2('.primary');
renderPrimaryDiv2('body');
renderFooter('body');

/*
<body>
  <header id="header">This is the Header</header>
  <div class="primary">This is the 1st Primary div
    <div class="secondary">This is the 1st Secondary div</div>
    <div class="secondary">This is the 2nd Secondary div</div>
  </div>
  <div class="primary">This is the 2nd Primary div</div>
  <footer id="footer">This is the Footer</footer>
</body>
*/
```


## F.fill(value, times)

Returns an array filled with a value repeated a number of times.
```javascript
const row = F.fill(0, 5);
const matrix = F.fill(row, 5);

console.log(matrix);
/*
[
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0]
]
*/
```


## F.flatMap(x, fn)

Runs a callback function on a nested array, and returns a new flat array with the results.

Ex1:
```javascript
const double = (n) => n * 2;
const result = F.flatMap([1, [2, [3, 4, [5, 6, [7]]]]], double);

console.log(result); //=> [2, 4, 6, 8, 10, 12, 14]
```

Ex2:
```javascript
const names = [
  { name: 'Bill', friends: [ 'Stacy', 'Khan', 'Emily' ] },
  { name: 'Frank', friends: [ 'Pat', 'Dinesh', 'Tonya' ] },
  { name: 'Crystal', friends: [ 'Peter', 'Joy', 'Rakim' ] }
];
const getFriends = (obj) => obj.friends;

// Result with regular map...
const result1 = names.map(getFriends);
console.log(result1); //=> [Array(3), Array(3), Array(3)]

// Result with flatMap...
const result2 = F.flatMap(names, getFriends);
console.log(result2); //=> ["Stacy","Khan","Emily","Pat","Dinesh","Tonya","Peter","Joy","Rakim"]
```



## F.flatten()

Takes any number of arguments and multidimensional arrays and returns a new array with the results flattened.
```javascript
const flattened = F.flatten('z', [[['y', 4], 3], true], [[2], [[[[[1]]]]], ['x']]);

console.log(flattened); //=> ["z", "y", 4, 3, true, 2, 1, "x"]
```


## F.fluentify(methodBody)

Modifies a method to return its 'this' context. Used for method chaining.

```javascript
const Customer = function() {};

Customer.prototype.setName = F.fluentify(function(name) { this.name = name; });

Customer.prototype.setAge = F.fluentify(function(age) { this.age = age; });

Customer.prototype.setLocation = F.fluentify(function(city, state) { Object.assign(this, { city, state }) });

Customer.prototype.save = function() {
  console.log( `Saving new account for ${this.age} year old ${this.name} from ${this.city}, ${this.state}...` );
};

const newCustomer = new Customer();

newCustomer.setName('Alice').setLocation('Wonderland', 'NY').setAge(25).save();
//=> Saving new account for 25 year old Alice from Wonderland, NY...
```


## F.groupBy(key)

Groups together related property values from an array of objects.
```javascript
const arr = [
  { name: 'Osiris', age: 41, location: 'New York' },
  { name: 'Ishtar', age: 33, location: 'New York' },
  { name: 'Zeus', age: 25, location: 'California' },
  { name: 'Venus', age: 27, location: 'New York' },
  { name: 'Maat', age: 21, location: 'California' },
];

const groupByLocation = F.groupBy('location');
const dataByLocation = groupByLocation(arr);

JSON.stringify(dataByLocation);
/*
{
  "New York": [
    { "name": "Osiris", "age": 41, "location": "New York" },
    { "name": "Ishtar", "age": 33, "location": "New York" },
    { "name": "Venus", "age": 27, "location": "New York" }
  ],
  "California": [
    { "name": "Zeus", "age": 25, "location": "California" },
    { "name": "Maat", "age": 21, "location": "California" }
  ]
}
*/
```


## F.is(type)

Creates a function that checks whether a value is a certain type.

```javascript
const isBoolean = F.is('boolean');
const isNumber = F.is('number');
const isString = F.is('string');

isBoolean(0); //=> false
isBoolean(false); //=> true
isNumber('text'); //=> false
isNumber(7); //=> true
isString(null); //=> false
isString('str'); //=> true
```


## F.lessThan(x)

Creates a predicate function to test for values less than x.

```javascript
const isLessThan65 = F.lessThan(65);
const isMoreThan21 = F.moreThan(21);

const data = [  
  { name: 'Lisa the Lawyer', age: 40 },
  { name: 'Jebediah the Grey', age: 101 },
  { name: 'Dan the Doctor', age: 50 },
  { name: 'Punky the Brat', age: 16 },
  { name: 'Methusaleh the Wise', age: 900 },
  { name: 'Sally the Secretary', age: 35 },
  { name: 'Dennis the Menace', age: 15 }
];

const targetClients = data.filter(person => {
  return isMoreThan21(person.age) && isLessThan65(person.age);
});

console.table(targetClients);
// (index)   name                   age
// 0         "Lisa the Lawyer"      40
// 1         "Dan the Doctor"       50
// 2         "Sally the Secretary"  35
```


## F.moreThan(x)

Creates a predicate function to test for values more than x.

```javascript
const isMoreThan80 = F.moreThan(80);

const data = [  
  { name: 'Lisa the Lawyer', age: 40 },
  { name: 'Jebediah the Grey', age: 101 },
  { name: 'Dan the Doctor', age: 50 },
  { name: 'Punky the Brat', age: 16 },
  { name: 'Methusaleh the Wise', age: 900 },
  { name: 'Sally the Secretary', age: 35 },
  { name: 'Dennis the Menace', age: 15 }
];

const getsSeniorDiscount = data
  .filter(person => isMoreThan80(person.age))
  .map(person => person.name);

console.log(getsSeniorDiscount); //=> ["Jebediah the Grey", "Methusaleh the Wise"]
```


## F.negate(fnPredicate)

Creates a negate function that returns true if the result is false.

e.g. You want to grab customers that are NOT Gold members and list them as not eligible.
```javascript
const data = [
  { name: 'Marty Mcfly', hasGold: true },
  { name: 'Jake Jumanji', hasGold: false },  
  { name: 'Frederick Funkhouser', hasGold: false },  
  { name: 'Gertrude Gretel', hasGold: false },  
  { name: 'Agnes Agatha', hasGold: true }
];

const isGoldMember = (member) => member.hasGold;
const isNotGoldMember = F.negate(isGoldMember);

const isNotEligible = data.filter(isNotGoldMember);

console.table(isNotEligible);

// (index)      name                       hasGold
// 0            "Jake Jumanji"             false
// 1            "Frederick Funkhouser"    false
// 2            "Gertrude Gretel"          false
```


## F.or(fn1, fn2)

Runs two predicate functions on an argument and returns true if one OR the other is true.

e.g. You want to grab customers that either have a gold membership, OR a 12-month subscription.
```javascript
const data = [
  { name: 'Marty Mcfly', monthsSubscribed: 1, hasGold: true },
  { name: 'Jake Jumanji', monthsSubscribed: 12, hasGold: false },  
  { name: 'Frederick Funkhouser', monthsSubscribed: 6, hasGold: false },  
  { name: 'Gertrude Gretel', monthsSubscribed: 1, hasGold: false },  
  { name: 'Agnes Agatha', monthsSubscribed: 12, hasGold: true }
];

const isGoldMember = (member) => member.hasGold;
const isYearSubscriber = (member) => member.monthsSubscribed === 12;

const isEligible = data.filter( F.or(isGoldMember, isYearSubscriber) );

console.table(isEligible);
// (index)      name                     monthsSubscribed    hasGold
// 0            "Marty Mcfly"            1                   true
// 1            "Jake Jumanji"           12                  false
// 2            "Agnes Agatha"           12                  true
```


## F.partial(fn, a)

Creates a copy of a function with a preset first parameter.
```javascript
function greeter(greet, greeting) {
  console.log(`${greet}, ${greeting}`);
}
const englishGreet = F.partial(greeter, 'Hi');
const spanishGreet = F.partial(greeter, 'Hola');
const japaneseGreet = F.partial(greeter, 'Konnichiwa');

englishGreet('how are you?'); //=> Hi, how are you?
spanishGreet('how are you?'); //=> Hola, how are you?
japaneseGreet('how are you?'); //=> Konnichiwa, how are you?
```


## F.pipe(fns)

Runs a function on the passed-in results of another function. Same as compose but function order is reversed.
```javascript
const data = [
  { id: 1, name: 'Starvin Marvin', age: 39 },
  { id: 2, name: 'Anna Banana', age: 25 },  
  { id: 3, name: 'Mean Gene', age: 33 },  
  { id: 4, name: 'Hairy Mary', age: 21 },  
  { id: 5, name: 'Brave Dave', age: 40 }
];

const getNames = (data) => data.map(v => v.name);

const getInitials = (names) => names.map(name => {
  const [ firstName, lastName ] = name.split(' ');
  return firstName[0] + lastName[0];
});

const pluckInitials = F.pipe(getNames, getInitials);

console.log( pluckInitials(data) ); //=> ["SM", "AB", "MG", "HM", "BD"]
```


## F.pluck(prop)

Plucks property values from data objects.

e.g. You'd like to create functions to pull the names and emails from an array of objects to be passed in later...

```javascript
const data = [
  {
    id: 1,
    name: 'Gina',
    email: 'gina@gmail.com'
  },
  {
    id: 2,
    name: 'Lucy',
    email: 'lucy@gmail.com'
  },
  {
    id: 3,
    name: 'Al',
    email: 'al@gmail.com'
  },
  {
    id: 4,
    name: 'Tony',
    email: 'tony@gmail.com'
  }
];

const getNames = F.pluck('name');
const getEmails = F.pluck('email');

const namesFromData = getNames(data);
const emailsFromData = getEmails(data);

console.log(namesFromData); //=> ["Gina", "Lucy", "Al", "Tony"]
console.log(emailsFromData); //=> ["gina@gmail.com", "lucy@gmail.com", "al@gmail.com", "tony@gmail.com"]
```


## F.random(min, max)

Returns a random number between a minimum number and a maximum number.
```javascript
F.random(1, 10); //=> 6 // results may vary
F.random(50, 200); //=> 121 // results may vary
```


## F.range(start, end, step)

Returns an array of numbers ranging from start to stop.
```javascript
F.range(10); //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
F.range(0, 30, 5); //=> [0, 5, 10, 15, 20, 25, 30]
```


## F.repeat(str, times)

Repeats a string a number of times.
```javascript
F.repeat('hello', 8); //=> "hellohellohellohellohellohellohellohello"
```


## F.shuffle(arr)

Randomly shuffles items in an array.
```javascript
// Results may vary
F.shuffle([1,2,3,4,5,6,7,8,9]); //=> [5, 9, 8, 2, 1, 7, 6, 3, 4]
F.shuffle([1,2,3,4,5,6,7,8,9]); //=> [3, 5, 4, 6, 2, 9, 1, 8, 7]
```


## F.tally(prop)

Returns a tally count object of a specific property value from objects in an array.
```javascript
const data = [
  { name: 'Dave', position: 'Front-End Developer' },
  { name: 'Jen', position: 'Front-End Developer' },
  { name: 'Joe', position: 'Network Engineer' },
  { name: 'Sam', position: 'UX Developer' },
  { name: 'Pete', position: 'UI Developer' },
  { name: 'Kim', position: 'Front-End Developer' },
  { name: 'Jon', position: 'Back-End Developer' },
  { name: 'Sue', position: 'Dev Ops' },
  { name: 'Jon', position: 'Back-End Developer' }
];

const tallyByPosition = F.tally('position');
const positionTally = tallyByPosition(data);
JSON.stringify(positionTally); //=>
/*
{
  "Front-End Developer": 3,
  "Network Engineer": 1,
  "UX Developer": 1,
  "UI Developer": 1,
  "Back-End Developer": 2,
  "Dev Ops": 1
}
*/
```


## F.thenify(value)

Creates a sequence of chainable actions.
```javascript
todo
```


## F.unique(arr)

Takes an array which might have duplicates and returns a new array with all dupes removed.
```javascript
const arrWithDupes = ['a', 1, 1, 'a', 'a', 'b', 2, 'b', 2, 2, 'b', 'c', 3, 3];

const uniqified = F.unique(arrWithDupes);

console.log(uniqified); //=> ["a", 1, "b", 2, "c", 3]
```


## F.when(fnPredicate, fnWhenTrue)

Runs a function when the result of a predicate function returns true.
```javascript
todo
```
