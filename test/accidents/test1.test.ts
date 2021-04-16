const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app.js');

describe('homepage', () => {
  it('welcome the user', (done) => {
    request(app).get('/')
      .expect(200)
      .expect(/Hello fine user!/, done);
  });
});
