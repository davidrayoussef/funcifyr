import F from '../funcifyr.js';
import { expect, assert } from 'chai';

describe('and', () => {

  it('should return true if both predicate functions evaluate to true', () => {

    const isString = (s) => typeof s === 'string';
    const isLongerThanSix = (n) => n.length > 6;
    const isStringAndLongerThanSix = F.and(isString, isLongerThanSix)('Hello world!');

    expect( isStringAndLongerThanSix ).to.be.true;

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

  it('Should return an array', () => {

    expect( Array.isArray(matrix) ).to.be.true;

  });

  it('Should return an array with a length of 5', () => {
    const actual = matrix.length;
    const expected = 5;

    assert.equal(actual, expected);

  });

});

describe('flatten', () => {

  const arr = [1, 2, ['3'], true, [[false, 'a'], 'b'], 'c'];
  const flattenedArray = F.flatten(arr);

  it('Should return an array', () => {

    expect( Array.isArray(flattenedArray) ).to.be.true;

  });

  it('Should return a flattened array that contains no nested arrays', () => {

    const containsNoNestedArrays = flattenedArray.every(v => !Array.isArray(v));

    expect( containsNoNestedArrays ).to.be.true;

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

  it('Should return an object...', () => {

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

  it('Should create a function that correctly evaluates value as type boolean', () => {

    const isBoolean = F.is('boolean');

    expect( isBoolean(false) ).to.be.true;

  });

  it('Should create a function that correctly evaluates value as type string', () => {

    const isString = F.is('string');

    expect( isString('This is a string.') ).to.be.true;

  });

  it('Should create a function that correctly evaluates value as type number', () => {

    const isNumber = F.is('number');

    expect( isNumber(89) ).to.be.true;

  });

});

describe('map', () => {

  it('Should run a function on the items of an array and return a new array with the correct results', () => {

    const arr = [ 1, 2, 3, 4 ];
    const double = (n) => n * 2;

    const actual = JSON.stringify( F.map(arr, double) );
    const expected = "[2,4,6,8]";

    assert.equal(actual, expected);

  });

  it('Should run a function on the values of an object and return a new object with the correct results', () => {

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

describe('negate', () => {

  it('Should return a predicate function that is the opposite of original function', () => {

    const isTrue = () => true;
    const isFalse = F.negate(isTrue);

    expect( isFalse() === !isTrue() ).to.be.true;

  });

});

describe('range', () => {

  it('Should return a range of numbers from 1 to 10 if passed just one argument (10)', () => {

    const actual = JSON.stringify( F.range(10) );
    const expected = "[1,2,3,4,5,6,7,8,9,10]";

    assert.equal(actual, expected);

  });

  it('Should return a range of numbers from 90 to 95 if passed two arguments (90, 95)', () => {

    const actual = JSON.stringify( F.range(90, 95) );
    const expected = "[90,91,92,93,94,95]";

    assert.equal(actual, expected);

  });

  it('Should return a range of numbers from 0 to 20 in steps of 5 if passed three arguments (0, 20, 5)', () => {

    const actual = JSON.stringify( F.range(0, 20, 5) );
    const expected = "[0,5,10,15,20]";

    assert.equal(actual, expected);

  });

});

describe('shuffle', () => {

  it('Should pass randomness test', () => {

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

  const data = [
    { name: 'Dave', position: 'Front-End Developer' },
    { name: 'Jen', position: 'Front-End Developer' },
    { name: 'Kim', position: 'Front-End Developer' },
    { name: 'Jon', position: 'Back-End Developer' },
    { name: 'Sue', position: 'Dev Ops' }
  ];
  const tallyByPosition = F.tally('position');
  const positionTally = tallyByPosition(data)

  it('Should return an object as result', () => {

    expect( positionTally ).to.be.an('object');

  });

  it('Should return a value of 3 for the key "Front-End Developer"', () => {

    const actual = positionTally['Front-End Developer'];
    const expected = 3;

    assert.equal(actual, expected);

  });

});
