import { User } from './User';
import { Payment } from './Payment';
import { OrderToProduct } from './OrderToProduct';

export interface Order {
  id: number;
  user: User;
  status: string;
  payment: Payment;
  orderToProducts: OrderToProduct[];
  created_at: string;
  updated_at: string;
}
