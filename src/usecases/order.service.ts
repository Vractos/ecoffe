import { IOrderRepository, IOrderService } from './order.interface';

export class OrderService implements IOrderService {
  private _orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this._orderRepository = orderRepository;
  }

  async createOrder(order: Order): Promise<any> {
    return this.orderRepository.create(order);
  }

  async getAllOrders(): Promise<any[]> {
    return this.orderRepository.getAll();
  }

  async updateOrderStatus(id: string, status: string): Promise<any | null> {
    return this.orderRepository.updateStatus(id, status);
  }

  async getOrdersByStatus(status: string): Promise<any[]> {
    return this.orderRepository.getByStatus(status);
  }
}