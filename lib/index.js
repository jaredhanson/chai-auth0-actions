module.exports = function(chai, utils) {
  
  var Test = require('./test');
  
  chai.auth0 = chai.auth0 || {};
  chai.auth0.action = function(mod) {
    return new Test(mod);
  };
  
  
};
