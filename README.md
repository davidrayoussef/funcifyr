# funcifyr.js
funcifyr.js is a functional library used for function creation, combination, composition and decoration.

# tldr
```javascript
F.and() // runs 2 functions on arg, returns true if both true
F.arrayify() // converts NodeList into an Array
F.chunkBy() // returns an array of arrays or strings in chunks of n
F.compose() // creates new function from two functions
F.curry() // takes a function with multiple params, returns a function with one param
F.fill() // returns an array prefilled with a value
F.flatten() // flattens multidimensional arrays
F.fluentify() // used for method chaining
F.groupBy() // groups together related prop values from objects
F.is() // creates a type checker
F.lessThan() // tests for values less than x
F.map() // runs a callback on an unmappable collection
F.moreThan() // tests for values more than x
F.negate() // creates a function that returns the opposite of a predicate
F.or() // runs 2 functions on arg, returns true if either true
F.partial() // creates copy of a function with preset first param
F.pipe() // runs a function on passed-in results of another
F.pluck() // plucks props from objects in array
F.random() // returns random integer
F.range() // returns a range of numbers
F.repeat() // repeats a string a number of times
F.shuffle() // randomly shuffles items in an array
F.tally() // returns tally count of a prop value from objects in array
F.thenify() // creates sequence of chainable actions
F.unique() // removes duplicates
F.when() // runs function when result of a function predicate is true

```

# Examples
## funcifyr.and(fn1, fn2)

Runs two predicate functions on an argument and returns true if both are true.

e.g. You want to check if something is a string AND has more than 6 characters...
```javascript
const isString = (str) => typeof str === 'string';
const isLongerThanSix = (str) => str.length > 6;
const isValid = funcifyr.and(isString, isLongerThanSix);

isValid(55); //=> false
isValid('funci'); //=> false
isValid('funcify all the things'); //=> true
```


## funcifyr.arrayify(collection)

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
const iterableCollection = funcifyr.arrayify(elementCollection);
iterableCollection.map(el => el.className += ' new-class');

<div class="old-class new-class"></div>
<div class=​"old-class new-class">​</div>​
<div class=​"old-class new-class">​</div>​
```


## funcifyr.chunkBy(n)

Creates a function that returns an array of arrays or strings in chunks of n.
```javascript
const chunkBy2 = funcifyr.chunkBy(2);
console.log( chunkBy2([1,2,3,4,5,6,7,8]) ); //=> [[1,2],[3,4],[5,6],[7,8]]

const chunkBy3 = funcifyr.chunkBy(3);
console.log( chunkBy3('Hello world') ); //=> ["Hel", "lo ", "wor", "ld"]
```


## funcifyr.compose(fn1, fn2)

Creates a composed function that returns the result of running a function on the output of another function.
```javascript
const getFirstLastName = (person) => person.split(' ');
const reverseOrder = (names) => `${names[1]}, ${names[0]}`;
const lastNameFirst = funcifyr.compose(reverseOrder, getFirstLastName);

console.log( lastNameFirst('Joe Schmoe') ); //=> Schmoe, Joe
```


## funcifyr.curry(fn)

Translates a function that takes multiple arguments into a series of functions that each take one argument, and continues until it receives all its arguments.
```javascript
todo example
```


## funcifyr.fill(value, times)

Returns an array filled with a value repeated a number of times.
```javascript
const row = funcifyr.fill(0, 5);
const matrix = funcifyr.fill(row, 5);

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


## funcifyr.flatten()

Takes any number of arguments and multidimensional arrays and returns a new array with the results flattened.
```javascript
const flattened = funcifyr.flatten('z', [[['y', 4], 3], true], [[2], [[[[[1]]]]], ['x']]);

console.log(flattened); //=> ["z", "y", 4, 3, true, 2, 1, "x"]
```


## funcifyr.fluentify(methodBody)

Modifies a method to return its 'this' context. Used for method chaining.

```javascript
const Customer = function() {};

Customer.prototype.setName = funcifyr.fluentify(function(name) { this.name = name; });

Customer.prototype.setAge = funcifyr.fluentify(function(age) { this.age = age; });

Customer.prototype.setLocation = funcifyr.fluentify(function(city, state) { Object.assign(this, { city, state }) });

Customer.prototype.save = function() {
  console.log( `Saving new account for ${this.age} year old ${this.name} from ${this.city}, ${this.state}...` );
};

const newCustomer = new Customer();

newCustomer.setName('Alice').setLocation('Wonderland', 'NY').setAge(25).save();
//=> Saving new account for 25 year old Alice from Wonderland, NY...
```


## funcifyr.groupBy(key)

Groups together related property values from an array of objects.
```javascript
const arr = [
  { name: 'Osiris', age: 41, location: 'New York' },
  { name: 'Ishtar', age: 33, location: 'New York' },
  { name: 'Zeus', age: 25, location: 'California' },
  { name: 'Venus', age: 27, location: 'New York' },
  { name: 'Maat', age: 21, location: 'California' },
];

const groupByLocation = funcifyr.groupBy('location');
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


## funcifyr.is(type)

Creates a function that checks whether a value is a certain type.

```javascript
const isBoolean = funcifyr.is('boolean');
const isNumber = funcifyr.is('number');
const isString = funcifyr.is('string');

isBoolean(0); //=> false
isBoolean(false); //=> true
isNumber('text'); //=> false
isNumber(7); //=> true
isString(null); //=> false
isString('str'); //=> true
```


## funcifyr.lessThan(x)

Creates a predicate function to test for values less than x.

```javascript
const isLessThan65 = funcifyr.lessThan(65);
const isMoreThan21 = funcifyr.moreThan(21);

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


## funcifyr.moreThan(x)

Creates a predicate function to test for values more than x.

```javascript
const isMoreThan80 = funcifyr.moreThan(80);

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


## funcifyr.negate(fnPredicate)

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
const isNotGoldMember = funcifyr.negate(isGoldMember);

const isNotEligible = data.filter(isNotGoldMember);

console.table(isNotEligible);

// (index)      name                       hasGold
// 0            "Jake Jumanji"             false
// 1            "Frederick Funkhouser"    false
// 2            "Gertrude Gretel"          false
```


## funcifyr.or(fn1, fn2)

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

const isEligible = data.filter( funcifyr.or(isGoldMember, isYearSubscriber) );

console.table(isEligible);
// (index)      name                     monthsSubscribed    hasGold
// 0            "Marty Mcfly"            1                   true
// 1            "Jake Jumanji"           12                  false
// 2            "Agnes Agatha"           12                  true
```


## funcifyr.partial(fn, a)

Creates a copy of a function with a preset first parameter.
```javascript
function greeter(greet, greeting) {
  console.log(`${greet}, ${greeting}`);
}
const englishGreet = funcifyr.partial(greeter, 'Hi');
const spanishGreet = funcifyr.partial(greeter, 'Hola');
const japaneseGreet = funcifyr.partial(greeter, 'Konnichiwa');

englishGreet('how are you?'); //=> Hi, how are you?
spanishGreet('how are you?'); //=> Hola, how are you?
japaneseGreet('how are you?'); //=> Konnichiwa, how are you?
```


## funcifyr.pipe(fns)

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

const getInitials = (names) => {
  return names.map(name => name.split(' ')[0][0] + name.split(' ')[1][0]);
}

const pluckInitials = funcifyr.pipe(getNames, getInitials);

console.log( pluckInitials(data) ); //=> ["SM", "AB", "MG", "HM", "BD"]
```


## funcifyr.pluck(prop)

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

const getNames = funcifyr.pluck('name');
const getEmails = funcifyr.pluck('email');

const namesFromData = getNames(data);
const emailsFromData = getEmails(data);

console.log(namesFromData); //=> ["Gina", "Lucy", "Al", "Tony"]
console.log(emailsFromData); //=> ["gina@gmail.com", "lucy@gmail.com", "al@gmail.com", "tony@gmail.com"]
```


## funcifyr.range(start, end, step)

Returns an array of numbers ranging from start to stop.
```javascript
funcifyr.range(10); //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
funcifyr.range(0, 30, 5); //=> [0, 5, 10, 15, 20, 25, 30]
```


## funcifyr.repeat(str, times)

Repeats a string a number of times.
```javascript
funcifyr.repeat('hello', 8); //=> "hellohellohellohellohellohellohellohello"
```


## funcifyr.shuffle(arr)

Randomly shuffles items in an array.
```javascript
// Results may vary
funcifyr.shuffle([1,2,3,4,5,6,7,8,9]); //=> [5, 9, 8, 2, 1, 7, 6, 3, 4]
funcifyr.shuffle([1,2,3,4,5,6,7,8,9]); //=> [3, 5, 4, 6, 2, 9, 1, 8, 7]
```


## funcifyr.tally(prop)

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


## funcifyr.thenify(value)

Creates a sequence of chainable actions.
```javascript
todo
```


## funcifyr.unique(arr)

Takes an array which might have duplicates and returns a new array with all dupes removed.
```javascript
const arrWithDupes = ['a', 1, 1, 'a', 'a', 'b', 2, 'b', 2, 2, 'b', 'c', 3, 3];

const uniqified = funcifyr.unique(arrWithDupes);

console.log(uniqified); //=> ["a", 1, "b", 2, "c", 3]
```


## funcifyr.when(fnPredicate, fnWhenTrue)

Runs a function when the result of a predicate function returns true.
```javascript
todo
```
