import { Order, OrderStatus } from '../entities/order';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  getAll(): Promise<Order[]>;
  updateStatus(id: string, status: OrderStatus): Promise<Order | null>;
  getByStatus(status: OrderStatus): Promise<Order[]>;
}

export interface IOrderService {
  createOrder(order: Order): Promise<Order>;
  getAllOrders(): Promise<Order[]>;
  updateOrderStatus(id: string, status: string): Promise<Order | null>;
  getOrdersByStatus(status: string): Promise<Order[]>;
}