import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "../generated/prisma/client";
import { prisma } from "./prisma";

// const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    baseURL: "http://localhost:4000",
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // 5 minutes
        },
    },
    advanced: {
        cookiePrefix: "better-auth",
        useSecureCookies: process.env.NODE_ENV === "production",
        crossSubDomainCookies: {
            enabled: false,
        },
        disableCSRFCheck: true,
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
            httpOnly: false
        }
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
            },
        }
    }
});