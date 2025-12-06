import express from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    console.log("🔍 DEBUG: Environment Variables Check");
    console.log("PORT from env:", process.env.PORT);
    console.log("MONGO_URI from env:", process.env.MONGO_URI ? "✓ SET" : "✗ NOT SET (using fallback)");
    
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/zoom_local";
    console.log("Using MongoDB URI:", mongoUri.substring(0, 50) + "...");
    
    try {
        const connectionDb = await Promise.race([
            mongoose.connect(mongoUri, {
                serverSelectionTimeoutMS: 10000,
                connectTimeoutMS: 10000,
            }),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error("MongoDB connection timeout after 10s")), 11000)
            )
        ]);
        console.log(`✓ MONGO Connected DB Host: ${connectionDb.connection.host}`)
    } catch (mongoErr) {
        console.error(`✗ MONGO Connection Failed: ${mongoErr.message}`);
        console.error("⚠ Server will start anyway. Database operations will fail until MongoDB is available.");
    }

    if (!server.listening) {
        server.listen(app.get("port"), () => {
            console.log(`✓ LISTENING ON PORT ${app.get("port")}`)
        });
    } else {
        console.log(`Server already listening on ${app.get("port")}`)
    }

}


start();