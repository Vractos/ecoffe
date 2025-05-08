import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { RepositoryFactory } from './repository/factory';
import { OrderService } from './usecases/order.service';
import { createOrderRouter } from './adapters/http/order.adapter';

dotenv.config();

const REPOSITORY_TYPE = (process.env.REPOSITORY_TYPE as 'prisma' | 'sql') || 'sql';

const orderRepository = RepositoryFactory.createOrderRepository(REPOSITORY_TYPE)
const orderService = new OrderService(orderRepository)

const app = express();

app.use(cors())
app.use(express.json());

app.use('/orders', createOrderRouter(orderService));

app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} using ${REPOSITORY_TYPE} repository`);
});