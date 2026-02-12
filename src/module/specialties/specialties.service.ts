import { Specialty } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

const getAllSpecialties= async()=>{
    
    const res=await prisma.specialty.findMany()
    
    if(res.length===0){
        throw new Error("No specialty found")
    }

    return res;
}
const createSpecialty= async(data:Specialty)=>{

    const res= await prisma.specialty.create({
        data
    })

    return res;
}
const updateSpecialty= async(data:Specialty,id:string)=>{

    const res= await prisma.specialty.update({
        where:{
            id
        },
        data
    })

    return res;
}
const deleteSpecialty= async(id:string)=>{
    const res= await prisma.specialty.delete({
        where:{
            id
        }
    })
    return res;
}



export const specialtiesService={
getAllSpecialties,
createSpecialty,
updateSpecialty,
deleteSpecialty
}