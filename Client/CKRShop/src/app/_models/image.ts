import { Guid } from "guid-typescript";
export interface Image {
    id: number;
    image : string;
    createdAt : Date;
    imagetypeId : Guid;
    productId : Guid;
  }
  