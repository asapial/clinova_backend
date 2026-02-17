import { Role } from "../../generated/prisma/enums";

export interface IRegister{
    name:string,
    email:string,
    password:string,
    image:string,
    role:Role
}