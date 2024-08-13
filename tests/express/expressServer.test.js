import request from 'supertest';
import expressApp from '../../expressApp.js';

describe('Express Application Basic Coverage', () => {
  // Testing the server startup.
  test('should respond with 404 for non-existing routes', async () => {
    const response = await request(expressApp).get('/non-existing-route');
    expect(response.status).toBe(404);
  });

  // Testing middleware and route coverage.
  test('should have the correct CORS headers', async () => {
    const response = await request(expressApp)
      .options('/api')
      .expect('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
      .expect('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    expect(response.status).toBe(204); // Expecting 204 for OPTIONS requests.
  });

  test('should disable x-powered-by header', async () => {
    const response = await request(expressApp).get('/api');
    expect(response.headers['x-powered-by']).toBeUndefined();
  });

  test('should use bodyParser middleware', async () => {
    const response = await request(expressApp)
      .post('/api')
      .send({ key: 'value' })
      .expect(404); // Expecting 404 since no route is matched.
    expect(response.body).toEqual({});
  });

  test('should set up Swagger docs', async () => {
    // Following redirects to the final URL if needed.
    const response = await request(expressApp).get('/api-docs').redirects(1);
    expect(response.status).toBe(200); // Checking final response status.
  });
});
