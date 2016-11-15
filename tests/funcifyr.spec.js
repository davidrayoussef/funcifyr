import F from '../funcifyr.js';
import {expect, assert} from 'chai';

describe('andify', () => {
  it('should return true if both predicate functions evaluate to true', () => {

    let isString = (a) => typeof a === 'string';
    let isLongerThanSix = (b) => b.length > 6;
    let isStringAndLongerThanSix = F.andify(isString, isLongerThanSix)('funcify all the things');

    expect( isStringAndLongerThanSix ).to.be.true;

  });
});

describe('arrayify', () => {
  it('should turn an array-like collection into a real array', () => {

    // Can't test a DOM collection so we'll run test on arguments object
    let returnArgs = () => arguments;
    let argumentsObjectToArray = F.arrayify(returnArgs('string', 3));
    let testIfArray = Array.isArray(argumentsObjectToArray);

    expect( testIfArray ).to.be.true;

  });
});

describe('compose', () => {
  it('should return a function', () => {

    let actual = typeof F.compose();
    let expected = 'function';

    assert.equal(actual, expected);

  });
});

describe('curry', () => {
  it('should return a function that returns a function', () => {

    let add = (a, b) => a + b;
    let curredFunction = F.curry(add);

    expect(curredFunction).to.be.a('function');

  });
});

describe('curry', () => {
  it('should return the correct result of a curried function', () => {

    let add = (a, b) => a + b;
    let curriedAdd = F.curry(add);
    let add5 = curriedAdd(5);

    let actual = add5(6);
    let expected = 11;

    assert.equal(actual, expected);

  });
});

describe('defuncify', () => {
  it('should create a method property from a regular function...', () => {

    class Person {}

    let reverseString = str => str.split('').reverse().join('');
    Person.prototype.reverseString = F.defuncify(reverseString);

    expect( 'reverseString' in Person.prototype ).to.be.true;

  });
});

describe('defuncify', () => {
  it('...and property should be a function', () => {

    class Person {}

    let reverseString = str => str.split('').reverse().join('');
    Person.prototype.reverseString = F.defuncify(reverseString);

    let actual = typeof Person.prototype.reverseString;
    let expected = 'function';

    assert.equal(actual, expected);

  });
});

// todo: fill

describe('flatten', () => {
  it('Should return an array', () => {

    let arr = [1, 2, ['3'], true, [[false, 'a'], 'b'], 'c'];
    let flattenedArray = F.flatten(arr);

    expect( Array.isArray(flattenedArray) ).to.be.true;

  });
});

describe('flatten', () => {
  it('Should return a flattened array that contains no nested arrays', () => {

    let arr = [1, 2, ['3'], true, [[false, 'a'], 'b'], 'c'];
    let flattenedArray = F.flatten(arr);

    let containsNoNestedArrays = flattenedArray.every(v => !Array.isArray(v));

    expect( containsNoNestedArrays ).to.be.true;

  });
});

describe('groupBy', () => {
  it('Should return an object...', () => {

    let arr = [
      { name: 'Osiris', location: 'New York' },
      { name: 'Ishtar', location: 'New York' },
      { name: 'Zeus', location: 'California' },
      { name: 'Venus', location: 'New York' },
      { name: 'Maat', location: 'California' },
    ];

    let groupByLocation = F.groupBy('location');
    let dataByLocation = groupByLocation(arr);

    let actual = typeof dataByLocation;
    let expected = 'object';

    assert.equal(actual, expected);

  });
});

describe('groupBy', () => {
  it('...and object should have a length of 2...', () => {

    let arr = [
      { name: 'Osiris', location: 'New York' },
      { name: 'Ishtar', location: 'New York' },
      { name: 'Zeus', location: 'California' },
      { name: 'Venus', location: 'New York' },
      { name: 'Maat', location: 'California' },
    ];

    let groupByLocation = F.groupBy('location');
    let dataByLocation = groupByLocation(arr);

    let actual = Object.keys(dataByLocation).length;
    let expected = 2;

    assert.equal(actual, expected);

  });
});

describe('groupBy', () => {
  it('...and length of property value array of "New York" key should be 3', () => {

    let arr = [
      { name: 'Osiris', location: 'New York' },
      { name: 'Ishtar', location: 'New York' },
      { name: 'Zeus', location: 'California' },
      { name: 'Venus', location: 'New York' },
      { name: 'Maat', location: 'California' },
    ];

    let groupByLocation = F.groupBy('location');
    let dataByLocation = groupByLocation(arr);

    let actual = dataByLocation['New York'].length;
    let expected = 3;

    assert.equal(actual, expected);
    
  });
});

describe('isify', () => {
  it('Should create a function that correctly evaluates value as type boolean', () => {

    let isBoolean = F.isify('boolean');

    expect( isBoolean(false) ).to.be.true;

  });
});

describe('isify', () => {
  it('Should create a function that correctly evaluates value as type string', () => {

    let isString = F.isify('string');

    expect( isString('This is a string.') ).to.be.true;

  });
});

describe('isify', () => {
  it('Should create a function that correctly evaluates value as type number', () => {

    let isNumber = F.isify('number');

    expect( isNumber(89) ).to.be.true;

  });
});

describe('negate', () => {
  it('Should return a predicate function that is the opposite of original function', () => {

    let isTrue = () => true;
    let isFalse = F.negate(isTrue);

    expect( isFalse() === !isTrue() ).to.be.true;

  });
});
