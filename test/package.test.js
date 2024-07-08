var expect = require('chai').expect;
var chai = require('chai');
var helper = require('..');


before(function() {
  chai.use(helper);
});

describe('chai-auth0-action', function() {
  
  it('should add helper to chai', function() {
    expect(chai.auth0).to.be.an('object');
    expect(chai.auth0.action).to.be.a('function');
  });
  
});
