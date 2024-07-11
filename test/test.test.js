var expect = require('chai').expect;
var chai = require('chai');


describe('Test', function() {
  
  it('should do something', function() {
    expect(1).to.equal(1);
  })
  
  describe('#trigger', function() {
    
    it('should invoke with ', function(done) {
      chai.auth0.action({
        onExecutePostLogin: async function(event, api) {
          expect(event).to.be.an('object');
          
          expect(api.access).to.be.an('object');
          expect(api.access.deny).to.be.a('function');
        }
      })
      .trigger('post-login')
      .then(function(api) {
        expect(api.access).to.be.an('object');
        done();
      })
      .catch(done);
    }); // should invoke sync callback
    
    
  });
  
});
