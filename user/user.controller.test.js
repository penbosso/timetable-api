import should from 'should';
import sinon from 'sinon';
import userController from './user.controller';

describe('Our first test',()=>{
  it('should pass', ()=>{
    (true).should.equal(true);
  });
});

describe('User Controller Test', () => {
  describe('Post', () => {
    it('should not allow an empty email on post', () => {
      const User = function (user) { this.save = () => {}};

      const req = {
        body: {
          firstName: 'SomeName',
          lastName: 'SomeLastName',
          password: 'password'
          }
        };

        const res = {
          status: sinon.spy(),
          send: sinon.spy(),
          json: sinon.spy()
        };

        userController.insert(req, res);

        // res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
        // res.send.calledWith('email is required').should.equal(true);
    });
  });
});
