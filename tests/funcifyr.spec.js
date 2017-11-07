import F from '../funcifyr.js';
import {expect, assert} from 'chai';

describe('andify', () => {

  it('should return true if both predicate functions evaluate to true', () => {

    let isString = s => typeof s === 'string';
    let isLongerThanSix = n => n.length > 6;
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

  let add = (a, b) => a + b;

  it('should return a function that returns a function', () => {

    let curriedFunction = F.curry(add);

    expect( curriedFunction ).to.be.a('function');

  });

  it('should return the correct result of a curried function', () => {

    let curriedAdd = F.curry(add);
    let add5 = curriedAdd(5);

    let actual = add5(6);
    let expected = 11;

    assert.equal(actual, expected);

  });

});

describe('defuncify', () => {

  class Person {}
  let reverseString = str => str.split('').reverse().join('');
  Person.prototype.reverseString = F.defuncify(reverseString);

  it('should create a method property from a regular function...', () => {

    expect( 'reverseString' in Person.prototype ).to.be.true;

  });

  it('...and property should be a function', () => {

    let actual = typeof Person.prototype.reverseString;
    let expected = 'function';

    assert.equal(actual, expected);

  });

});

describe('fill', () => {

  let obj = { name: null, email: null, address: null, friends: [] };
  let userDataTemplate = F.fill(obj, 10);

  it('Should return an array', () => {

    expect( Array.isArray(userDataTemplate) ).to.be.true;

  });

  it('Should return an array with a length of 10', () => {

    let actual = userDataTemplate.length;
    let expected = 10;

    assert.equal(actual, expected);

  });

});

describe('flatten', () => {

  let arr = [1, 2, ['3'], true, [[false, 'a'], 'b'], 'c'];
  let flattenedArray = F.flatten(arr);

  it('Should return an array', () => {

    expect( Array.isArray(flattenedArray) ).to.be.true;

  });

  it('Should return a flattened array that contains no nested arrays', () => {

    let containsNoNestedArrays = flattenedArray.every(v => !Array.isArray(v));

    expect( containsNoNestedArrays ).to.be.true;

  });

});

describe('groupBy', () => {

  let data = [
    { name: 'Osiris', location: 'New York' },
    { name: 'Ishtar', location: 'New York' },
    { name: 'Zeus', location: 'California' },
    { name: 'Venus', location: 'New York' },
    { name: 'Maat', location: 'California' },
  ];
  let groupByLocation = F.groupBy('location');
  let dataByLocation = groupByLocation(data);

  it('Should return an object...', () => {

    let actual = typeof dataByLocation;
    let expected = 'object';

    assert.equal(actual, expected);

  });

  it('...and object should have a length of 2...', () => {

    let actual = Object.keys(dataByLocation).length;
    let expected = 2;

    assert.equal(actual, expected);

  });

  it('...and length of property value array of "New York" key should be 3', () => {

    let actual = dataByLocation['New York'].length;
    let expected = 3;

    assert.equal(actual, expected);

  });

});

describe('is', () => {

  it('Should create a function that correctly evaluates value as type boolean', () => {

    let isBoolean = F.is('boolean');

    expect( isBoolean(false) ).to.be.true;

  });

  it('Should create a function that correctly evaluates value as type string', () => {

    let isString = F.is('string');

    expect( isString('This is a string.') ).to.be.true;

  });

  it('Should create a function that correctly evaluates value as type number', () => {

    let isNumber = F.is('number');

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

describe('tally', () => {

  let data = [
    { name: 'Dave', position: 'Front-End Developer' },
    { name: 'Jen', position: 'Front-End Developer' },
    { name: 'Kim', position: 'Front-End Developer' },
    { name: 'Jon', position: 'Back-End Developer' },
    { name: 'Sue', position: 'Dev Ops' }
  ];
  let tallyByPosition = F.tally('position');
  let positionTally = tallyByPosition(data)

  it('Should return an object as result', () => {

    expect( positionTally ).to.be.an('object');

  });

  it('Should return a value of 3 for the key "Front-End Developer"', () => {

    let actual = positionTally['Front-End Developer'];
    let expected = 3;

    assert.equal(actual, expected);

  });

});
