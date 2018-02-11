import F from '../funcifyr.js';
import { expect, assert } from 'chai';

describe('and', () => {

  it('should return a function', () => {

    const actual = typeof F.and();
    const expected = 'function';

    assert.equal(actual, expected);

  });

  it('should return true if both predicate functions evaluate to true', () => {

    const isString = (s) => typeof s === 'string';
    const isLongerThan6 = (n) => n.length > 6;
    const isStringAndLongerThan6 = F.and(isString, isLongerThan6);

    expect( isStringAndLongerThan6('Hello world!') ).to.be.true;

  });

  it('should return false if only the first predicate function evaluates to true', () => {

    const isShorterThan6 = (n) => n.length < 6;
    const isString = (s) => typeof s === 'string';
    const isStringAndShorterThan6 = F.and(isShorterThan6, isString);

    expect( isStringAndShorterThan6('Hello world!') ).to.be.false;

  });

  it('should return false if only the second predicate function evaluates to true', () => {

    const isLongerThan6 = (n) => n.length > 6;
    const isArray = (obj) => Array.isArray(obj);
    const isArrayAndLongerThan6 = F.and(isLongerThan6, isArray);

    expect( isArrayAndLongerThan6('Hello world!') ).to.be.false;

  });

  it('should return false if both predicate functions evaluate to false', () => {

    const isArray = (obj) => Array.isArray(obj);
    const isEmpty = (obj) => obj.length === 0;
    const isEmptyArray = F.and(isArray, isEmpty);

    expect( isEmptyArray('hello world') ).to.be.false;

  });

});

describe('arrayify', () => {

  it('should turn an array-like collection into a real array', () => {

    // Can't test a DOM collection so we'll run test on arguments object
    const returnArgs = () => arguments;
    const argumentsObjectToArray = F.arrayify(returnArgs('string', 3));
    const testIfArray = Array.isArray(argumentsObjectToArray);

    expect( testIfArray ).to.be.true;

  });

});

describe('chunkBy', () => {

  it('should return a function', () => {

    const actual = typeof F.chunkBy(3);
    const expected = 'function';

    assert.equal(actual, expected);

  });

  it('should slice an array of values into chunks of 2', () => {

    const chunkBy2 = F.chunkBy(2);

    const actual = JSON.stringify( chunkBy2([1,2,3,4,5,6,7,8]) );
    const expected = "[[1,2],[3,4],[5,6],[7,8]]";

    assert.equal(actual, expected);

  });

  it('should slice a string into chunks of 3 characters each', () => {

    const chunkBy3 = F.chunkBy(3);

    const actual = JSON.stringify( chunkBy3('Hello world') );
    const expected = '["Hel","lo ","wor","ld"]';

    assert.equal(actual, expected);

  });

  it('should throw an error if value passed is not a string or an array', () => {

    const chunkBy3 = F.chunkBy(3);

    expect( () => chunkBy3(undefined) ).to.throw(TypeError);

  });

});

describe('compose', () => {

  it('should return a function', () => {

    const actual = typeof F.compose();
    const expected = 'function';

    assert.equal(actual, expected);

  });

  it('should return the correct result of a composed function call', () => {

    const getFirstLastName = (person) => person.split(' ');
    const reverseOrder = (names) => `${names[1]}, ${names[0]}`;
    const lastNameFirst = F.compose(reverseOrder, getFirstLastName);

    const actual = lastNameFirst('John Doe');
    const expected = 'Doe, John';

    assert.equal(actual, expected);

  });

});

describe('curry', () => {

  const add = (a, b) => a + b;

  it('should return a function that returns a function', () => {

    const curriedFunction = F.curry(add);

    expect( curriedFunction ).to.be.a('function');

  });

  it('should return the correct result of a curried function', () => {

    const curriedAdd = F.curry(add);
    const add5 = curriedAdd(5);

    const actual = add5(6);
    const expected = 11;

    assert.equal(actual, expected);

  });

});

describe('fill', () => {

  const row = F.fill(0, 5);
  const matrix = F.fill(row, 5);

  it('should return an array', () => {

    expect( Array.isArray(matrix) ).to.be.true;

  });

  it('should return an array with a length of 5', () => {
    const actual = matrix.length;
    const expected = 5;

    assert.equal(actual, expected);

  });

});

describe('flatten', () => {

  const arr = [1, 2, ['3'], true, [[false, 'a'], 'b'], 'c'];
  const flattenedArray = F.flatten(arr);

  it('should return an array', () => {

    expect( Array.isArray(flattenedArray) ).to.be.true;

  });

  it('should return a flattened array that contains no nested arrays', () => {

    const containsNoNestedArrays = flattenedArray.every(v => !Array.isArray(v));

    expect( containsNoNestedArrays ).to.be.true;

  });

});

describe('fluentify', () => {

  it('should return a function', () => {

    const actual = typeof F.fluentify();
    const expected = 'function';

    assert.equal(actual, expected);

  });

  it('should return the correct result of chained methods', () => {

    const person = {
      setName(name) { this.name = name; },
      setAge(age) { this.age = age; },
      setLocation(location) { this.location = location; },
      save() { return `Saving: ${this.name} - ${this.age} years old - from ${this.location}`; }
    };
    const fluentPerson = Object.keys(person).reduce((obj,key) => {
      obj[key] = F.fluentify(person[key]);
      return obj;
    }, {});

    const actual = fluentPerson.setName('John').setAge('30').setLocation('NY').save();
    const expected = 'Saving: John - 30 years old - from NY';

    assert.equal(actual, expected);

  });

});

describe('groupBy', () => {

  const data = [
    { name: 'Osiris', location: 'New York' },
    { name: 'Ishtar', location: 'New York' },
    { name: 'Zeus', location: 'California' },
    { name: 'Venus', location: 'New York' },
    { name: 'Maat', location: 'California' },
  ];
  const groupByLocation = F.groupBy('location');
  const dataByLocation = groupByLocation(data);

  it('should return an object...', () => {

    const actual = typeof dataByLocation;
    const expected = 'object';

    assert.equal(actual, expected);

  });

  it('...and object should have a length of 2...', () => {

    const actual = Object.keys(dataByLocation).length;
    const expected = 2;

    assert.equal(actual, expected);

  });

  it('...and length of property value array of "New York" key should be 3', () => {

    const actual = dataByLocation['New York'].length;
    const expected = 3;

    assert.equal(actual, expected);

  });

});

describe('is', () => {

  it('should create a function that correctly evaluates value as type boolean', () => {

    const isBoolean = F.is('boolean');

    expect( isBoolean(false) ).to.be.true;

  });

  it('should create a function that correctly evaluates value as type string', () => {

    const isString = F.is('string');

    expect( isString('This is a string.') ).to.be.true;

  });

  it('should create a function that correctly evaluates value as type number', () => {

    const isNumber = F.is('number');

    expect( isNumber(89) ).to.be.true;

  });

});

describe('lessThan', () => {

  it('should return a function', () => {

    const actual = typeof F.lessThan();
    const expected = 'function';

    assert.equal(actual, expected);

  });

  it('should return true when evaluating an initial lesser number compared to a secondary greater number', () => {

    const isLessThan10 = F.lessThan(10);

    expect( isLessThan10(3) ).to.be.true;

  });

  it('should return false when comparing a greater number to a lesser number', () => {

    const isLessThan10 = F.lessThan(10);

    expect( isLessThan10(20) ).to.be.false;

  });

  it('should return true when passed as predicate to array method of array with all lesser values', () => {

    const isLessThan10 = F.lessThan(10);
    const result = [-Infinity,-1000,0,1,2,3,4,5,6,7,8,9].every(isLessThan10);

    expect( result ).to.be.true;

  });

});

describe('map', () => {

  it('should run a function on the items of an array and return a new array with the correct results', () => {

    const arr = [ 1, 2, 3, 4 ];
    const double = (n) => n * 2;

    const actual = JSON.stringify( F.map(arr, double) );
    const expected = "[2,4,6,8]";

    assert.equal(actual, expected);

  });

  it('should run a function on the values of an object and return a new object with the correct results', () => {

    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const addOne = (n) => n + 1;

    const actual = JSON.stringify( F.map(obj, addOne) );
    const expected = '{"a":2,"b":3,"c":4,"d":5}';

    assert.equal(actual, expected);

  });

  it('should throw an error if value passed is not an array or an object', () => {

    const triple = (n) => n * 3;
    const str = 'string';

    expect( () => F.map(str, triple) ).to.throw(TypeError);

  });

});

describe('moreThan', () => {

  it('should return a function', () => {

    const actual = typeof F.moreThan();
    const expected = 'function';

    assert.equal(actual, expected);

  });

  it('should return true when evaluating an initial greater number compared to a secondary lesser number', () => {

    const isMoreThan5 = F.moreThan(5);

    expect( isMoreThan5(10) ).to.be.true;

  });

  it('should return false when comparing a greater number to a lesser number', () => {

    const isMoreThan5 = F.moreThan(5);

    expect( isMoreThan5(-1) ).to.be.false;

  });

  it('should return true when passed as predicate to array method of array with all greater values', () => {

    const isMoreThan20 = F.moreThan(20);
    const result = [25,100,1250,5000,8000,Infinity].every(isMoreThan20);

    expect( result ).to.be.true;

  });

});

describe('negate', () => {

  it('should return a function', () => {

    const actual = typeof F.negate();
    const expected = 'function';

    assert.equal(actual, expected);

  });

  it('should return a predicate function that has the opposite result of the original function when called', () => {

    const isTrue = () => true;
    const isFalse = F.negate(isTrue);

    expect( isFalse() === !isTrue() ).to.be.true;

  });

});

describe('or', () => {

  it('should return a function', () => {

    const actual = typeof F.or();
    const expected = 'function';

    assert.equal(actual, expected);

  });

  it('should return true if only first predicate function evaluates to true', () => {

    const isArray = (obj) => Array.isArray(obj);
    const isObject = (obj) => Object.prototype.toString.call(obj) === "[object Object]";
    const isArrayOrIsObject = F.or(isArray, isObject);

    expect( isArrayOrIsObject([]) ).to.be.true;

  });

  it('should return true if only second predicate function evaluates to true', () => {

    const isArray = (obj) => Array.isArray(obj);
    const isObject = (obj) => Object.prototype.toString.call(obj) === "[object Object]";
    const isArrayOrIsObject = F.or(isArray, isObject);

    expect( isArrayOrIsObject({}) ).to.be.true;

  });

  it('should return true if both predicate functions evaluate to true', () => {

    const isArray = (obj) => Array.isArray(obj);
    const isEmpty = (obj) => obj.length === 0;
    const isEmptyArray = F.or(isArray, isEmpty);

    expect( isEmptyArray([]) ).to.be.true;

  });

  it('should return false if both predicate functions evaluate to false', () => {

    const isArray = (obj) => Array.isArray(obj);
    const isEmpty = (obj) => obj.length === 0;
    const isEmptyArray = F.or(isArray, isEmpty);

    expect( isEmptyArray('hello world') ).to.be.false;

  });

});

describe('partial', () => {

  it('should return a function', () => {

    const actual = typeof F.partial();
    const expected = 'function';

    assert.equal(actual, expected);

  });

  it('should return the correct result of a partially applied function', () => {

    const add = (a,b) => a + b;
    const add10 = F.partial(add, 10);

    const actual = add10(5);
    const expected = 15;

    assert.equal(actual, expected);

  });

});

describe('pipe', () => {

  it('should return a function', () => {

    const actual = typeof F.pipe();
    const expected = 'function';

    assert.equal(actual, expected);

  });

  it('should return the correct result of a piped function', () => {

    const data = [
      { id: 1, name: 'Starvin Marvin', age: 39 },
      { id: 2, name: 'Anna Banana', age: 25 },
      { id: 3, name: 'Mean Gene', age: 33 }
    ];

    const getNames = (data) => data.map(v => v.name);

    const getInitials = (names) => names.map(name => {
      const [ firstName, lastName ] = name.split(' ');
      return firstName[0] + lastName[0];
    });

    const pluckInitials = F.pipe(getNames, getInitials);

    const actual = JSON.stringify( pluckInitials(data) );
    const expected = '["SM","AB","MG"]';

    assert.equal(actual, expected);

  });

});

describe('pluck', () => {

  it('should return a function', () => {

    const actual = typeof F.pluck();
    const expected = 'function';

    assert.equal(actual, expected);

  });

  it('should return correct result of plucking property values from array of objects', () => {

    const data = [
      { id: 1, name: 'Gina', email: 'gina@gmail.com' },
      { id: 2, name: 'Lucy', email: 'lucy@gmail.com' },
      { id: 3, name: 'Al', email: 'al@gmail.com' }
    ];

    const getNames = F.pluck('name');

    const actual = JSON.stringify( getNames(data) );
    const expected = '["Gina","Lucy","Al"]';

    assert.equal(actual, expected);

  });

});

describe('random', () => {

  it('should return a number', () => {

    const rand = F.random(1, 10)

    const actual = typeof rand;
    const expected = 'number';

    assert.equal(actual, expected);

  });

  it('should pass 1st randomness test', () => {

    let count = 0;

    for (let i = 0; i < 100; i++) {
      let rand = F.random(0, 100);

      if (rand < 50) count++;
    }

    expect( count > 30 && count < 70).to.be.true;

  });

  it('should pass 2nd randomness test', () => {

    let arr = [];

    for (let i = 0; i < 100; i++) {
      arr.push( F.random(0, 100) );
    }

    const uniqueResultsCount = new Set(arr).size;

    expect( uniqueResultsCount > 50 ).to.be.true;

  });

});

describe('range', () => {

  it('should return a range of numbers from 1 to 10 if passed just one argument (10)', () => {

    const actual = JSON.stringify( F.range(10) );
    const expected = "[1,2,3,4,5,6,7,8,9,10]";

    assert.equal(actual, expected);

  });

  it('should return a range of numbers from 90 to 95 if passed two arguments (90, 95)', () => {

    const actual = JSON.stringify( F.range(90, 95) );
    const expected = "[90,91,92,93,94,95]";

    assert.equal(actual, expected);

  });

  it('should return a range of numbers from 0 to 20 in steps of 5 if passed three arguments (0, 20, 5)', () => {

    const actual = JSON.stringify( F.range(0, 20, 5) );
    const expected = "[0,5,10,15,20]";

    assert.equal(actual, expected);

  });

});

describe('repeat', () => {

  it('should return a string', () => {

    const result = F.repeat('hello world', 5);

    const actual = typeof result;
    const expected = 'string';

    assert.equal(actual, expected);

  });

  it('should return the correct result of a padded string concatenation', () => {

    const pad = F.repeat(' ', 5);

    const actual = `${pad}Hello world${pad}`;
    const expected = '     Hello world     ';

    assert.equal(actual, expected);

  });

});

describe('shuffle', () => {

  it('should return an array', () => {

    const shuffled = F.shuffle([1,2,3,4,5]);

    expect( Array.isArray(shuffled) ).to.be.true;

  });

  it('should pass randomness test', () => {

    const oneTo100 = Array.from({length: 100}, (_,i) => i + 1);
    const results = [];

    for (let i = 0; i < 100; i++) {
      const shuffled = F.shuffle( oneTo100.slice() );
      results.push( JSON.stringify(shuffled) );
    }

    const uniqueResultsCount = new Set(results).size;

    expect( uniqueResultsCount > 90 ).to.be.true;

  });

});

describe('tally', () => {

  it('should return a function', () => {

    const actual = typeof F.tally();
    const expected = 'function';

    assert.equal(actual, expected);

  });

  const data = [
    { name: 'Dave', position: 'Front-End Developer' },
    { name: 'Jen', position: 'Front-End Developer' },
    { name: 'Kim', position: 'Front-End Developer' },
    { name: 'Jon', position: 'Back-End Developer' },
    { name: 'Sue', position: 'Dev Ops' }
  ];

  const tallyByPosition = F.tally('position');
  const positionTally = tallyByPosition(data)

  it('should return an object as result', () => {

    expect( positionTally ).to.be.an('object');

  });

  it('should return a value of 3 for the key "Front-End Developer"', () => {

    const actual = positionTally['Front-End Developer'];
    const expected = 3;

    assert.equal(actual, expected);

  });

});

describe('thenify', () => {

  it('should return an object', () => {

    const actual = Object.prototype.toString.call( F.thenify() );
    const expected = '[object Object]';

    assert.equal(actual, expected);

  });

  it('should return the correct result when calling chained thens followed by an end', () => {

    const add5 = (n) => n + 5;
    const double = (n) => n * 2;
    const pow2 = (n) => n ** 2;
    const obj = F.thenify(5);

    const actual = obj.then(add5).then(double).then(pow2).end();
    const expected = 400;

    assert.equal(actual, expected);

  });

});

describe('unique', () => {

  it('should return an array', () => {

    const result = F.unique([1,2,1,2,3,3,2,4,5,4,5]);

    expect( Array.isArray(result) ).to.be.true;

  });

  it('should return the correct result after removing duplicate values', () => {

    const result = F.unique([1,2,1,2,3,3,2,4,5,4,5]);

    const actual = JSON.stringify(result);
    const expected = '[1,2,3,4,5]';

    assert.equal(actual, expected);

  });

});

describe('when', () => {

  it('should return a function', () => {

    const actual = typeof F.when();
    const expected = 'function';

    assert.equal(actual, expected);

  });

  it('should return the correct result of running a callback when a predicate returns true', () => {

    const isPremiumCustomer = () => true;
    const subtractShippingFee = (n) => n - 5;

    const calculateTotal = F.when(isPremiumCustomer, subtractShippingFee);

    const actual = calculateTotal(100);
    const expected = 95;

    assert.equal(actual, expected);

  });

  it('should return the argument as is when a predicate returns false', () => {

    const isPremiumCustomer = () => false;
    const subtractShippingFee = (n) => n - 5;

    const calculateTotal = F.when(isPremiumCustomer, subtractShippingFee);

    const actual = calculateTotal(100);
    const expected = 100;

    assert.equal(actual, expected);

  });

});
