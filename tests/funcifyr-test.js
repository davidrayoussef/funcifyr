var F = require('../funcifyr.js').F;
var expect = require('chai').expect;

describe('andify', function() {
  it('should return true if arg passed to pred funcs evaluates to true', function() {

    function isString(a) { return typeof a === 'string'; };
    function isLongerThanSix(b) { return b.length > 6; };
    var testIfStringANDOverSix = F.andify(isString, isLongerThanSix)('funcify all the things');

    expect(testIfStringANDOverSix).to.be.true;

  });
});

describe('arrayify', function() {
  it('should turn an array-like collection into a real array', function() {

    // Can't test a DOM collection so we'll run test on arguments object
    function returnArgs() { return arguments; }
    var argumentsObjectToArray = F.arrayify(returnArgs('string', 3));
    var testIfArray = Array.isArray(argumentsObjectToArray);

    expect(testIfArray).to.be.true;

  });
});

describe('colorify', function() {
  it('should return a random 6 character hex color', function() {

    var isHexColor = /^#([A-Fa-f0-9]{6})$/;
    var testIfHexColor = isHexColor.test(F.colorify());

    expect(testIfHexColor).to.be.true;

  });
});