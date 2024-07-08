var expect = require('chai').expect;
var chai = require('chai');


describe('Test', function() {
  
  it('should do something', function() {
    expect(1).to.equal(1);
  })
  
  describe('#postLogin', function() {
    
    it('should invoke sync callback', function(done) {
      chai.auth0.action({
        onExecutePostLogin: function(event, api) {
          console.log('POST LOGIN!');
        }
      })
      .trigger('post-login');
    }); // should invoke sync callback
    
    
  });
  
});
