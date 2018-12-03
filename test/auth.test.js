const chai = require('chai');
const request = require('supertest');
const chance = require('chance')();

const app = require('../app');

const { expect } = chai;

let token = null;
const member = {
  email: chance.email(),
  password: 'abc23',
  name: chance.first(),
};

describe('Auth', () => {
  it('should be able to register admin user', done => {
    request(app)
      .post('/auth/register')
      .send(member)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('token');
        ({ token } = res.body);
        done();
      });
  });

  it('should fail to login with invalid credentials', done => {
    request(app)
      .post('/auth/login')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: chance.email(),
        password: 'asfaf',
      })
      .expect(401, done);
  });

  it('should fail when unauthenicated', done => {
    request(app)
      .post('/auth/login')
      .send({
        email: chance.email(),
        password: 'asfaf',
      })
      .expect(401, done);
  });

  it('should be able to login with valid credentials', done => {
    request(app)
      .post('/auth/login')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: member.email,
        password: member.password,
      })
      .expect(200, done);
  });
});
