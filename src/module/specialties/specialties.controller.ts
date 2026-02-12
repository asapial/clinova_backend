import { NextFunction, Request, RequestHandler, Response } from "express"
import { specialtiesService } from "./specialties.service"
import { StatusCodes } from "http-status-codes"
import catchAsync from "../../shared/catchAsync"
import { send } from "node:process"
import sendResponse from "../../shared/sendResponse"





const getAllSpecialties = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await specialtiesService.getAllSpecialties()
        if (result.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No specialty found",
                data: {}
            })
        }

        sendResponse(res,{
            httpCode:StatusCodes.OK,
            success:true,
            message:"Successfully fetched specialty",
            data:result
        })
    }
)


const createSpecialty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        const result = await specialtiesService.createSpecialty(data)

        sendResponse(res,{
            httpCode:StatusCodes.CREATED,
            success:true,
            message:"Specialty created successfully",
            data:result
        })

    }
)

const updateSpecialty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        const id = req.params.id;
        const result = await specialtiesService.updateSpecialty(data, id as string)

        sendResponse(res,{
            httpCode:StatusCodes.OK,
            success:true,   
            message:"Specialty updated successfully",
            data:result
        })
    }
)

const deleteSpecialty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await specialtiesService.deleteSpecialty(id as string)

        sendResponse(res,{
            httpCode:StatusCodes.OK,
            success:true,   
            message:"Specialty deleted successfully",
            data:result

        })
    }
)


export const specialtiesController = {
    getAllSpecialties,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty
}