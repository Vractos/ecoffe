import { Order, OrderStatus } from '../entities/order';
import { IOrderRepository, IOrderService } from './order.interface';

export class OrderService implements IOrderService {
  private _orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this._orderRepository = orderRepository;
  }

  async createOrder(order: Order): Promise<Order> {
    try {
      const createdOrder = await this._orderRepository.create(order);
      return createdOrder;
    } catch (error) {
      throw new Error(`Error creating order: ${error}`);
    } 
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      const orders = await this._orderRepository.getAll();
      return orders;
    }
    catch (error) {
      throw new Error(`Error fetching orders: ${error}`);
    }
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
    try {
      return await this._orderRepository.updateStatus(id, status);
    } catch (error) {
      throw new Error(`Error updating order status: ${error}`);
    }
  }

  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    try {
      const orders = await this._orderRepository.getByStatus(status);
      return orders;
    } catch (error) {
      throw new Error(`Error fetching orders by status: ${error}`);
    }
  }
}