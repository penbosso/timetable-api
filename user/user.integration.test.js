import should from 'should';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';


const User = mongoose.model('User');
const agent = request.agent(app);

describe('User Crud Test', () => {
  it('should allow a user to be created and return _id', (done) => {
    const userPost = {firstName:"Somefisrt", lastName:"Somelast", email:"some@test.mail", password:"Passsome"};

    agent.post('/api/users')
      .send(userPost)
      .expect(200)
      .end((err,results) => {
        results.body.permissionLevel.should.not.equal(3);
        results.body.should.have.property('_id');
      })
  });
});
