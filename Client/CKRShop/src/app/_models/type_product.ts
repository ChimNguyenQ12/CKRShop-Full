import { Guid } from "guid-typescript";
export interface Type {
    id: Guid;  
    name: string;  
    createdAt : Date;
    status : number ;
}