import { Item } from './item';

describe('Item Creation', () => {
  test('Create an item', () => {
    const item = new Item({
      id: 1,
      name: 'Test Item',
      description: 'This is a test item',
      price: 100,
      quantity: 10,
    });

    expect(item).toBeInstanceOf(Item);
    expect(item.id).toBe(1);
    expect(item.name).toBe('Test Item');
    expect(item.description).toBe('This is a test item');
    expect(item.price).toBe(100);
    expect(item.quantity).toBe(10);
  });

  test('Create an item with negative price', () => {
    expect(() => {
      new Item({
        id: 1,
        name: 'Test Item',
        description: 'This is a test item',
        price: -100.00,
        quantity: 10,
      });
    }).toThrow('Price cannot be negative');
  });

  test('Create an item with negative quantity', () => {
    expect(() => {
      new Item({
        id: 1,
        name: 'Test Item',
        description: 'This is a test item',
        price: 100,
        quantity: -10,
      });
    }).toThrow('Quantity cannot be negative');
  });

  test('Create an item with empty name', () => {
    expect(() => {
      new Item({
        id: 1,
        name: '',
        description: 'This is a test item',
        price: 100,
        quantity: 10,
      });
    }).toThrow('Name is required');
  });
});

test('Cannot set negative price via setter', () => {
  const item = new Item({
    id: 1,
    name: 'Test Item',
    description: 'This is a test item',
    price: 100,
    quantity: 10,
  });
  
  expect(() => {
    item.price = -50;
  }).toThrow('Price cannot be negative');
});