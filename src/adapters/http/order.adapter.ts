// adapters/http/routes/orderRoutes.ts
import express from 'express';
import type { Router, Request, Response, NextFunction } from 'express';
import { OrderService } from '../../usecases/order.service';
import { z } from 'zod';
import { Order, ORDER_STATUS } from '../../entities/order';

export function createOrderRouter(orderService: OrderService): Router {
  const router = express.Router();

  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createOrderEventSchema = z.object({
        client: z.string().min(1),
        item: z.string().min(1),
        quantity: z.number().min(1),
        observation: z.string().optional(),
      });

      const parsedData = createOrderEventSchema.parse(req.body);

      const order = new Order({
        client: parsedData.client,
        item: parsedData.item,
        quantity: parsedData.quantity,
        observation: parsedData.observation,
        status: ORDER_STATUS.PENDING,
      })

      const result = await orderService.createOrder(order);

      const formattedResult = {
        id: result.id,
        client: result.client,
        item: result.item,
        quantity: result.quantity,
        observation: result.observation,
        status: result.status,
        createdAt: result.createdAt,
      };

      res.status(201).json(formattedResult);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      }
      next(error);
    }
  })

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      let orders: Array<Order>;

      if (req.query.s) {
        const orderStatusSchema = z.enum([ORDER_STATUS.PENDING, ORDER_STATUS.IN_PROGRESS, ORDER_STATUS.COMPLETED, ORDER_STATUS.DELIVERING, ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELED]);
        const parsedStatus = orderStatusSchema.parse(req.query.s);
        orders = await orderService.getOrdersByStatus(parsedStatus);
      } else {
        orders = await orderService.getAllOrders();
      }

      const formattedOrders = orders.map(order => ({
        id: order.id,
        client: order.client,
        item: order.item,
        quantity: order.quantity,
        observation: order.observation,
        status: order.status,
        createdAt: order.createdAt,
      }));
      if (formattedOrders.length === 0) {
        res.status(404).json({ message: 'No orders found' });
      }
      res.status(200).json(formattedOrders);

    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        next(error);
      }
    }
  });

  router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const orderStatusSchema = z.enum([ORDER_STATUS.IN_PROGRESS, ORDER_STATUS.COMPLETED, ORDER_STATUS.DELIVERING, ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELED]);
      const parsedStatus = orderStatusSchema.parse(status);
      const result = await orderService.updateOrderStatus(id, parsedStatus);

      if (!result) {
        res.status(404).json({ message: 'Order not found' });
      }

      res.status(204).json({ message: 'Order status updated successfully' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        next(error);
      }
    }
  });

  return router;
}