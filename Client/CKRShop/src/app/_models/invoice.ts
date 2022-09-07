import { Guid } from "guid-typescript";

export interface Invoice {

    id: number;
    code: string;
    userid:string;
    issuedDate : Date;
    shippingAddress : string;
    shippingPhone : string;
    total : number;
    status: boolean;
  }
  
