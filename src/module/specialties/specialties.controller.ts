import { NextFunction, Request, Response } from "express"
import { specialtiesService } from "./specialties.service"
import { StatusCodes } from "http-status-codes"

const getAllSpecialties = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        const result = await specialtiesService.getAllSpecialties()

        if (result.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No specialty found",
                data: {}
            })
        }

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully fetched specialty",
            data: result
        })


    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error,
        })
    }
}

const createSpecialty = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const data=req.body;
        const result = await specialtiesService.createSpecialty(data)



        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Specialty created successfully",
            data: result
        })


    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error,
        })
    }
}








export const specialtiesController = {
getAllSpecialties,
createSpecialty
}