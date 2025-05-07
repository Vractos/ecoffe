import { Client } from './client';

describe('Client Creation', () => {
  it('should create a client with valid properties', () => {
    const client = new Client({
      id: 123,
      name: 'John Doe',
      email: 'john@mail.com',
    });
    expect(client.id).toBe(123);
    expect(client.name).toBe('John Doe');
    expect(client.email).toBe('john@mail.com');
  });
});