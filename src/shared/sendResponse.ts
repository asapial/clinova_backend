import { Response } from "express"
import { StatusCodes } from "http-status-codes"

interface IResponseData<T> {
    httpCode:StatusCodes,
    success:boolean,
    message:string,
    data?:T
}

const sendResponse =<T>(res:Response,responseData:IResponseData<T>)=>{
        res.status(responseData.httpCode).json({
            success: responseData.success,
            message: responseData.message,
            data: responseData.data
        })
}

export default sendResponse 