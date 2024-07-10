import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import messageRouter from "./router/messageRouter.js";
import cors from "cors";
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["POST"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/message", messageRouter);

dbConnection();

// Proxy requests to Vercel frontend
const vercelUrl = process.env.FRONTEND_URL;

app.use('/*', createProxyMiddleware({
  target: vercelUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/': '/', // remove base path
  },
}));

export default app;
