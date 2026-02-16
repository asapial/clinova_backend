import { Role, User } from "../../generated/prisma/client";
import { auth } from "../../lib/auth";

interface IRegister{
    name:string,
    email:string,
    password:string,
    image:string,
    role:Role
}

const register=async (data:IRegister)=>{
    console.log("Register service");

    const res = await auth.api.signUpEmail({
    body: {
        name: data.name, // required
        email: data.email, // required
        password: data.password, // required
        image: data.image,
        role: data.role
    },
});

}
const login=async (email:string,password:string)=>{

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









export const authService={

    register,
    login
}