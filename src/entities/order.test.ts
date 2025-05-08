import { Order, ORDER_STATUS } from './order';

describe('Order Creation', () => {
  test('Create an order', () => {
    const order = new Order({
      id: '123',
      client: "John",
      item: "Coffee M",
      quantity: 1,
      observation: 'Test observation',
      status: ORDER_STATUS.PENDING,
      createdAt: new Date(),
    });

    expect(order).toBeInstanceOf(Order);
    expect(order.id).toBe('123');
    expect(order.client).toBe('John');
    expect(order.item).toBe('Coffee M');
    expect(order.quantity).toBe(1);
    expect(order.observation).toBe('Test observation');
    expect(order.status).toBe(ORDER_STATUS.PENDING);
  });

  test('Create an order with no items', () => {
    expect(() => {
      new Order({
        id: '123',
        client: "John",
        item: "",
        quantity: 1,
        observation: 'Test observation',
        status: ORDER_STATUS.PENDING,
        createdAt: new Date(),
      });
    }).toThrow("Item is required");
  });

  test('Creating an order without passing an ID', () => {
    const order = new Order({
      client: "John",
      item: "Coffee M",
      quantity: 1,
      observation: 'Test observation',
      status: ORDER_STATUS.PENDING,
      createdAt: new Date(),
    });

    expect((typeof order.id)).toBe('string')
  })
})