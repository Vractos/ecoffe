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
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      }
      next(error);
    }
  })

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.query.s) {
        const orderStatusSchema = z.enum([ORDER_STATUS.PENDING, ORDER_STATUS.IN_PROGRESS, ORDER_STATUS.COMPLETED, ORDER_STATUS.DELIVERING, ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELED]);
        const parsedStatus = orderStatusSchema.parse(req.query.s);
        const orders = await orderService.getOrdersByStatus(parsedStatus);
        if (orders.length === 0) {
           res.status(404).json({ message: 'No orders found with the specified status' });
        }
        res.status(200).json(orders);
      }
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
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
      await orderService.updateOrderStatus(id, parsedStatus);
      res.status(200).json({ message: 'Order status updated successfully' });
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