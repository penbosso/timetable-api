import should from 'should';
import request from 'supertest';
import mongoose from 'mongoose';

process.env.ENV = 'Test';
import app from '../app';


const User = mongoose.model('User');
const agent = request.agent(app);

describe('User Crud Test', () => {
  it('should allow a user to be created and return _id', (done) => {
    const userPost = {otherName:"Somefisrt", lastName:"Somelast", email:"some21111@test.mail", password:"Passsome"};

    agent.post('/users')
      .send(userPost)
      .expect(200)
      .end((err,results) => {
        results.body.should.have.property('id');
        done();
      })
  });
  afterEach((done) => {
    User.deleteMany({}).exec();
    done();
  });

  // after((done) => {
  //   mongoose.connection.close();
  //   done();
  // });
});
