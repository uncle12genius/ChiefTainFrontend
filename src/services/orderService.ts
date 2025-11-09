import { api } from './api';
import { Order, OrderStatus, ShippingAddress } from '../types/order.types';

interface CreateOrderRequest {
  shippingAddress: ShippingAddress;
  paymentMethod: 'MPESA' | 'CASH_ON_DELIVERY';
}

export const orderService = {
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const response = await api.post<Order>('/orders', orderData);
    return response.data;
  },

  async getOrders(): Promise<Order[]> {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  },

  async getOrder(id: string): Promise<Order> {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const response = await api.patch<Order>(`/orders/${orderId}/status`, {
      status,
    });
    return response.data;
  },
};