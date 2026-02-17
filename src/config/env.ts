import dotenv from 'dotenv';

dotenv.config();


// DATABASE_URL="postgres://bee1c3c242ef20debf86e5bb296740bcbfdf31f9b6e40810f53ab4f4cca349d0:sk_ziEizh2J6-jEfU7IhxeGa@db.prisma.io:5432/postgres?sslmode=require"
// BETTER_AUTH_SECRET=5BsLGGh144sOSlmZOOVdTW3X6sWdIzKX
// BETTER_AUTH_URL=http://localhost:5000
// PORT=5000
// NODE_ENV=devlopment

interface EnvConfig{
DATABASE_URL:string;
BETTER_AUTH_SECRET:string;
BETTER_AUTH_URL:string;
PORT:string;
NODE_ENV:string;
}

const LoadEnv =():EnvConfig=>{

    const requiredEnvVars=[
        'DATABASE_URL',
        'BETTER_AUTH_SECRET',
        'BETTER_AUTH_URL',
        'PORT',
        'NODE_ENV'  
    ]

    requiredEnvVars.forEach((variable)=>{
        if(!process.env[variable]){
            throw new Error(`Missing required environment variable: ${variable}`);
        }
    })
    return{

        DATABASE_URL:process.env.DATABASE_URL as string,
        BETTER_AUTH_SECRET:process.env.BETTER_AUTH_SECRET as string,
        BETTER_AUTH_URL:process.env.BETTER_AUTH_URL as string,
        PORT:process.env.PORT as string,
        NODE_ENV:process.env.NODE_ENV as string,
    }
}

export const envVar=LoadEnv();
