import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import messageRouter from "./router/messageRouter.js"
import cors from "cors";

// Initialize express app
const app = express();

// Load environment variables from config.env file
dotenv.config({path: "./config/config.env"});

// Configure CORS
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"], 
    credentials: true,
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({extended: true}));


  // Mount message router
app.use("/api/v1/message",messageRouter); 

dbConnection();

export default app;