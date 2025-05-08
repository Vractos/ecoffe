import { Pool } from 'pg';
import { IOrderRepository } from '../../usecases/order.interface';
import { Order, OrderStatus } from '../../entities/order';

export class SqlOrderRepository implements IOrderRepository {
  private _pool: Pool;

  constructor(pool: Pool) {
    this._pool = pool;
  }

  async create(order: Order): Promise<Order> {
    try {
      await this._pool.query('BEGIN');

      const { rows } = await this._pool.query(
        'INSERT INTO orders (id, client, item, quantity, observation, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [order.id, order.client, order.item, order.quantity, order.observation || null, order.status, order.createdAt]
      );

      await this._pool.query('COMMIT');

      return this.mapSQLOrderToOrder(rows[0])
    } catch (error) {
      await this._pool.query('ROLLBACK');
      throw new Error("Error creating order: " + error);
    }
  }

  async getAll(): Promise<Order[]> {
    try { 
      const { rows } = await this._pool.query('SELECT * FROM orders');
      
      const orders = rows.map(order => {
        return this.mapSQLOrderToOrder(order)
      })
      
      return orders;
    } catch (error) {
      throw new Error("Error retrieving orders" + error);
      
    }
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order | null> {
    try { 
      const { rows } = await this._pool.query(
        'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error("Error updating order status: " + error);
    }
  }

  async getByStatus(status: OrderStatus): Promise<Order[]> {
    try {
      const { rows } = await this._pool.query(
        'SELECT * FROM orders WHERE status = $1',
        [status]
      );
      return rows.map(order => {
        return this.mapSQLOrderToOrder(order)
      });
    }
    catch (error) {
      throw new Error("Error retrieving orders by status: " + error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapSQLOrderToOrder(order: any): Order {
    return new Order({
      id: order.id,
      client: order.client,
      item: order.item,
      quantity: order.quantity,
      observation: order.observation || undefined,
      status: order.status,
      createdAt: new Date(order.created_at),
    });
  }
}