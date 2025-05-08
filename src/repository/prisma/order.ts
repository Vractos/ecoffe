import { PrismaClient } from '../../../generated/prisma/client';
import { PrismaClientKnownRequestError } from '../../../generated/prisma/runtime/library';
import { Order, OrderStatus } from '../../entities/order';
import { IOrderRepository } from '../../usecases/order.interface';

export class PrismaOrderRepository implements IOrderRepository {
  private _prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this._prismaClient = prismaClient;
  }
  async create(order: Order): Promise<Order> {
    try {
      const createdOrder = await this._prismaClient.orders.create({
        data: {
          id: order.id,
          status: order.status,
          observation: order.observation || null,
          client: order.client,
          item: order.item,
          quantity: order.quantity,
          created_at: order.createdAt
        }
      });

      return this.mapPrismaOrderToOrder(createdOrder);
    } catch (error) {
      throw new Error("Error creating order: " + error);
    }
  }

  async getAll(): Promise<Order[]> {
    try {

      const orders = await this._prismaClient.orders.findMany();
      const mappedOrders = orders.map(order => this.mapPrismaOrderToOrder(order));
      return mappedOrders;
    } catch (error) {
      throw new Error("Error fetching orders: " + error);
    }
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order |
    null> {
    try {
      const updatedOrder = await this._prismaClient.orders.update({
        where: { id },
        data: { status },
      });
      if (!updatedOrder) {
        return null;
      }
      const mappedOrder = this.mapPrismaOrderToOrder(updatedOrder);
      return mappedOrder;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return null; // Order not found
        }
      }
      throw new Error("Error updating order status: " + error);
    }
  }

  async getByStatus(status: OrderStatus): Promise<Order[]> {
    try {

      const orders = await this._prismaClient.orders.findMany({
        where: { status },
      });
      if (!orders) {
        return [];
      }
      const mappedOrders = orders.map(order => this.mapPrismaOrderToOrder(order));
      return mappedOrders;
    } catch (error) {
      throw new Error("Error fetching orders by status: " + error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapPrismaOrderToOrder(prismaOrder: any): Order {
    return new Order({
      id: prismaOrder.id,
      client: prismaOrder.client,
      item: prismaOrder.item,
      quantity: prismaOrder.quantity,
      observation: prismaOrder.observation,
      status: prismaOrder.status,
      createdAt: prismaOrder.created_at,
    });
  }
}