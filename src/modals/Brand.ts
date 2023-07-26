import { Image } from './Image';

export interface Brand {
  id: number;
  name: string;
  description: string;
  image: Image;
  created_at: string;
  updated_at: string;
}
