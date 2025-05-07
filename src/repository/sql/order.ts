import { Pool } from 'pg';
import { IOrderRepository } from '../../usecases/order.interface';
import { Order, OrderStatus } from '../../entities/order';

export class SqlOrderRepository implements IOrderRepository {
  private _pool: Pool;

  constructor(pool: Pool) {
    this._pool = pool;
  }

  async create(order: Order): Promise<Order> {
    const { rows } = await this._pool.query(
      'INSERT INTO orders (id, client_id, observation, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [order.id, order.customerId, order.observation || null, order.status]
    );
    return rows[0];
  }

  async getAll(): Promise<Order[]> {
    // TODO: Implement
    const { rows } = await this._pool.query('SELECT * FROM orders');
    return rows;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order | null> {
    // TODO: Implement
    const { rows } = await this._pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return rows[0] || null;
  }

  async getByStatus(status: OrderStatus): Promise<Order[]> {
    // TODO: Implement
    const { rows } = await this._pool.query(
      'SELECT * FROM orders WHERE status = $1',
      [status]
    );
    return rows;
  }
}