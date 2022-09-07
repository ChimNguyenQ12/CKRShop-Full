import { Guid } from "guid-typescript";
export interface Product {
    id: Guid;
    sku: string;
    name: string;
    branch: string;
    description: string;
    price : number;
    stock : number;
    productTypeId : Guid;
    image : string;
    createdAt : Date;
    status : number ;
    qty : number;
}