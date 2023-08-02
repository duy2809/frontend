import { User } from "./User";
import { Product } from "./Product";

export interface Review {
  id: number;
  star: number;
  content: string;
  user: User;
  product: Product;
  created_at: string;
  updated_at: string;
}
