export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentMethod: 'MPESA' | 'CASH_ON_DELIVERY';
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

export type OrderStatus = 
  | 'PLACED' 
  | 'CONFIRMED' 
  | 'PACKED' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'CANCELLED';

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: string;
  description: string;
}