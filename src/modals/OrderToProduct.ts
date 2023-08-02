import { Product } from './Product';

export interface OrderToProduct {
  id: number;
  orderId: string;
  productId: string;
  quantity: number;
  product: Product;
  created_at: string;
  updated_at: string;
}
