import request from 'supertest';
import app from '../../../src/server';

describe('homepage', () => {
  it('welcome the user', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toMatch(/Hello fine user!/);
  });
});