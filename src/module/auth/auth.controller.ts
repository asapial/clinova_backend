import { NextFunction, Request, Response } from "express"
import catchAsync from "../../shared/catchAsync"
import { StatusCodes } from "http-status-codes"
import sendResponse from "../../shared/sendResponse"
import { authService } from "./auth.service"
import { Role } from "../../generated/prisma/enums"

// const register = catchAsync(
//     async (req: Request, res: Response, next: NextFunction) => {

//         const result = await.

//             sendResponse(res, {
//                 httpCode: StatusCodes.OK,
//                 success: true,
//                 message: "Successfully fetched specialty",
//                 data: result
//             })
//     }
// )

interface IRegister{
    name:string,
    email:string,
    password:string,
    image:string,
    role:Role
}

const register = catchAsync(
    
    async (req: Request, res: Response, next: NextFunction) => {

        const data=req.body;
        const result = await authService.register(data as IRegister)

            sendResponse(res, {
                httpCode: StatusCodes.CREATED,
                success: true,
                message: "Register successfully",
                data: result
            })
    }
)



const login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const {email,password}=req.body;

        const result = await authService.login(email as string, password as string)

            sendResponse(res, {
                httpCode: StatusCodes.OK,
                success: true,
                message: "Logged in successfully",
                data: result
            })
    }
)

export const authController = {

    register,
    login
}