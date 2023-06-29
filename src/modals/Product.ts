// import { Image } from "./Image";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  descriptions: string[];
  specs: unknown;
  images: string[];
}

// export interface IProduct {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   descriptions: string[];
//   specs: unknown;
//   category: string;
//   images: Image[];
// }

export interface NewProduct {
  name: string;
  price: number;
  quantity: number;
  descriptions: string[];
  specs: unknown;
  images: string[];
}
