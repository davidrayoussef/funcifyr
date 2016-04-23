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

describe('colorify', () => {
  it('should return a random 6 character hex color', () => {

    let isHexColor = /^#([A-Fa-f0-9]{6})$/;
    let testIfHexColor = isHexColor.test(F.colorify());

    expect(testIfHexColor).to.be.true;

  });
});

describe('composify', () => {
  it('should return a function', () => {

    let actual = typeof F.composify();
    let expected = 'function';
    
    assert.equal(actual, expected);
  });
});