var API = require('./api');
var merge = require('utils-merge');

var sinon = require('sinon');

function Test(mod) {
  this._mod = mod;
  this._secrets = {};
}

Test.prototype.api = function(fn) {
  this._api = fn;
  return this;
};

Test.prototype.event = function(fn) {
  this._event = fn;
  return this;
};

Test.prototype.secret = function(name, value) {
  this._secrets[name] = value;
  return this;
};

Test.prototype.trigger = function(trigger, done) {
  //console.log('TRIGGER!: ' + trigger);
  
  // Create an empty event object.  This event object has contextual information
  // that is input to the action under test.  As such, the test case itself is
  // expected to set the event's properties.
  var self = this;
  var event = {};
  event.secrets = merge({}, this._secrets);
  var api = new Object();
  
  //sinon.spy(api);
  
  
  function ready(err) {
    var fn;
  
    switch (trigger) {
    case 'post-login':
      // Trigger for the [login flow][1].  Construct the [API object][2].  The test
      // case will prepare the [event object][3].
      //
      // [1]: https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow
      // [2]: https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/api-object
      // [3]: https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/event-object
      api.access = new API.AccessAPI();
    
      //sinon.spy(api.access)
    
      //if (self._mod.onExecutePostLogin) { self._mod.onExecutePostLogin(event, api); }
      fn = self._mod.onExecutePostLogin;
      break;
    case 'post-identifier':
      api.setConnection = function(name){};
      
      //if (self._mod.onExecutePostIdentifier) { self._mod.onExecutePostIdentifier(event, api); }
      fn = self._mod.onExecutePostIdentifier;
      break;
    default:
      // TODO: throw error
    }
    
    if (self._api) {
      self._api(api);
    }
    
    // TODO: check fn async or not
    return fn.call(undefined, event, api)
      .then(function() {
        //console.log('FN RESOLVED!');
        return api;
      })
      .catch(function(err) {
        //console.log('CAUGHT');
        //console.log(err)
      })
  
    //done(api);
  }
  
  if (this._event) {
    this._event(event);
  }
  
  return ready();
}


module.exports = Test;
