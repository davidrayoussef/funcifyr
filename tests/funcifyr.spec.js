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

describe('composify', () => {
  it('should return a function', () => {

    let actual = typeof F.composify();
    let expected = 'function';

    assert.equal(actual, expected);

  });
});

describe('currify', () => {
  it('should return a function', () => {

    let actual = typeof F.currify();
    let expected = 'function';

    assert.equal(actual, expected);

  });
});

describe('currify', () => {
  it('should return a function that takes a function as an argument', () => {

    let add = (a, b) => a + b;
    let curredFunction = F.currify(add);

    let actual = typeof curredFunction;
    let expected = 'function';

    assert.equal(actual, expected);

  });
});

describe('currify', () => {
  it('should return the result of a curried function', () => {

    let add = (a, b) => a + b;
    let curriedAdd = F.currify(add);
    let add5 = curriedAdd(5);

    let actual = add5(6);
    let expected = 11;

    assert.equal(actual, expected);

  });
});

describe('defuncify', () => {
  it('should create a method property from a regular function...', () => {

    class Person {
      constructor(name) {
        this.name = name;
      }
    }

    let reverseName = name => name.split('').reverse().join('');
    Person.prototype.reverseName = F.defuncify(reverseName);

    expect('reverseName' in Person.prototype).to.be.true;

  });
});

describe('defuncify', () => {
  it('...and property should be a function', () => {

    class Person {
      constructor(name) {
        this.name = name;
      }
    }

    let reverseName = name => name.split('').reverse().join('');
    Person.prototype.reverseName = F.defuncify(reverseName);

    let actual = typeof Person.prototype.reverseName;
    let expected = 'function';

    assert.equal(actual, expected);
    
  });
});
