import { IOrderRepository } from '../usecases/order.interface';
import { PrismaOrderRepository } from './prisma/order';
import { SqlOrderRepository } from './sql/order';
import { prismaClient, sqlPool } from '../config/config'


type RepositoryType = 'prisma' | 'sql';

export class RepositoryFactory {
  static createOrderRepository(type: RepositoryType): IOrderRepository {
    switch (type) {
      case 'prisma':
        return new PrismaOrderRepository(prismaClient);
      case 'sql':
        return new SqlOrderRepository(sqlPool);
      default:
        throw new Error(`Unknown repository type: ${type}`);
    }
  }
}