function Test(mod) {
  this._mod = mod;
}

Test.prototype.trigger = function(trigger) {
  console.log('TRIGGER!: ' + trigger);
  
  switch (trigger) {
  case 'post-login':
    if (this._mod.onExecutePostLogin) { this._mod.onExecutePostLogin(); }
    break;
  default:
    // TODO: throw error
  }
}


module.exports = Test;
