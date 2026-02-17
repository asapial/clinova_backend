import { envVar } from "../../config/env";
import { Role, User } from "../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { IRegister } from "./auth.interface";



const register = async (data: IRegister) => {

    const res = await auth.api.signUpEmail({
        body: {
            name: data.name, // required
            email: data.email, // required
            password: data.password, // required
            image: data.image,
        },
    });

    try {



        if (!res.user) {
            throw new Error("User registration failed");
        }

        const patient = await prisma.$transaction(async (tx) => {

            const patientTx = await tx.patient.create({
                data: {
                    userId: res.user?.id,
                    name: data.name,
                    email: data.email,
                }
            })

            return patientTx;
        })

        return {
            ...res,
            patient
        }
    } catch (error) {
        if(envVar.NODE_ENV === "development"){
            console.error("Error during registration:", error);
        }

        await prisma.user.delete(
            {
                where:{
                    id:res.user.id;
                }
            }
        )
    }

};


const login = async (email: string, password: string) => {

    const data = await auth.api.signInEmail({
        body: {
            email: email, // required
            password: password, // required
            // rememberMe: true,
            // callbackURL: "https://example.com/callback",
        },
        // This endpoint requires session cookies.
        // headers: await headers(),
    });

}









export const authService = {

    register,
    login
}