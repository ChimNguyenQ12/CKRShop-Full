import { Product } from "./product";

export interface Wishlist {
    id: number;
    userid: string;
    productid:string;
    product : Product;
    status: number;
  }
  
