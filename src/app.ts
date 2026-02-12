import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { specialtiesRoute } from "./module/specialties/specialties.route";

const app: Application = express();
app.use(cookieParser());
app.use(express.json());


// ✅ CORS setup (must be FIRST)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",

].filter(Boolean);


app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use("/api/specialties",specialtiesRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: " ",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});



export default app;

