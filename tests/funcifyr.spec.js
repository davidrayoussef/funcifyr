import F from '../funcifyr.js';
import {expect, assert} from 'chai';

describe('andify', () => {
  it('should return true if arg passed to pred funcs evaluates to true', () => {

    let isString = (a) => typeof a === 'string';
    let isLongerThanSix = (b) => b.length > 6;
    let testIfStringANDOverSix = F.andify(isString, isLongerThanSix)('funcify all the things');

    expect(testIfStringANDOverSix).to.be.true;

  });
});

describe('arrayify', () => {
  it('should turn an array-like collection into a real array', () => {

    // Can't test a DOM collection so we'll run test on arguments object
    let returnArgs = () => arguments;
    let argumentsObjectToArray = F.arrayify(returnArgs('string', 3));
    let testIfArray = Array.isArray(argumentsObjectToArray);

    expect(testIfArray).to.be.true;

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
  it('should return a function', () => {

    let actual = typeof F.curry();
    let expected = 'function';

    assert.equal(actual, expected);

  });
});

describe('curry', () => {
  it('should return a function that takes a function as an argument', () => {

    let add = (a, b) => a + b;
    let curredFunction = F.curry(add);

    let actual = typeof curredFunction;
    let expected = 'function';

    assert.equal(actual, expected);

  });
});

describe('curry', () => {
  it('should return the result of a curried function', () => {

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

    expect('reverseString' in Person.prototype).to.be.true;

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

    expect(Array.isArray(flattenedArray)).to.be.true;

  });
});

describe('flatten', () => {
  it('Should return a flattened array that contains no nested arrays', () => {

    let arr = [1, 2, ['3'], true, [[false, 'a'], 'b'], 'c'];
    let flattenedArray = F.flatten(arr);

    let containsNoNestedArrays = flattenedArray.every(v => !Array.isArray(v));

    expect(containsNoNestedArrays).to.be.true;

  });
});

describe('negate', () => {
  it('Should return a predicate function that is the opposite of original function', () => {

    let isTrue = () => true;
    let isFalse = F.negate(isTrue);

    expect(isFalse() === !isTrue()).to.be.true;

  });
});
