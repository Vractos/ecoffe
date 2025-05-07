import { Order, OrderStatus } from './order';
import { Item } from './item';
import { OrderItem } from './orderItem';
import { Client } from './client';

const mockItem = new Item({
  id: '1',
  name: 'Test Item',
  description: 'This is a test item',
  price: 100,
  quantity: 10,
});

const mockOrderItem = new OrderItem({
  id: '321',
  itemId: mockItem.id,
  quantity: 1,
  price: 12.5,
  orderId: '123'
})

const mockClient = new Client({
  id: '123',
  name: 'John',
  email: 'john@mail.com'
})

describe('Order Creation', () => {
  test('Create an order', () => {
    const order = new Order({
      id: '123',
      customerId: mockClient.id,
      orderItems: [mockOrderItem], 
      observation: 'Test observation',
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(order).toBeInstanceOf(Order);
    expect(order.id).toBe('123');
    expect(order.customerId).toBe('123');
    expect(order.orderItems.length).toBe(1);
    expect(order.orderItems[0].id).toBe('321');
    expect(order.observation).toBe('Test observation');
    expect(order.status).toBe(OrderStatus.PENDING);
  });

  test('Create an order with no items', () => {
    expect(() => {
      new Order({
        id: '123',
        customerId: mockClient.id,
        orderItems: [], 
        observation: 'Test observation',
        status: OrderStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }).toThrow('At least one item is required');
  });
})