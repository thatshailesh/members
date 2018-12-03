const chai = require('chai');
const request = require('supertest');
const chance = require('chance')();
const mongoose = require('mongoose');

const app = require('../app');

const { expect } = chai;

let token = null;
const member = {
  email: chance.email(),
  password: 'abc23',
  name: chance.first(),
};

describe('Users', () => {
  it('should be able to register admin user', done => {
    request(app)
      .post('/auth/register')
      .send(member)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('token');
        ({ token } = res.body);
        member.id = res.body.user._id.toString();
        done();
      });
  });

  it('should be able to get user', done => {
    request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).to.be.an('array');

        done();
      });
  });

  it('should be fail for invalid user id', done => {
    request(app)
      .put(`/users/${new mongoose.mongo.ObjectID()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404, done);
  });

  it('should be able to update user valid user id', done => {
    request(app)
      .put(`/users/${member.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: chance.first(),
      })
      .expect(200, done);
  });
});
