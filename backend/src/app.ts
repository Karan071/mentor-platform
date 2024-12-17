import express from "express";
import cors from "cors";  
import { PrismaClient } from "@prisma/client";

// Import Routes
import authRoutes from "./auth/auth.routes";
import profileRoutes from "./profile/profile.routes";
// import matchmakingRoutes from "./matchmaking/matchmaking.routes";
// import notificationsRoutes from "./notifications/notifications.routes";
// import connectionsRoutes from "./connections/connections.routes";

// Create an Express application
const app = express();

// Initialize Prisma Client
const prisma = new PrismaClient();

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Parse JSON bodies

// Routes
app.use("/auth", authRoutes);  // Authentication routes
app.use("/profile", profileRoutes);  // Profile routes
// app.use("/matchmaking", matchmakingRoutes);  // Matchmaking routes
// app.use("/notifications", notificationsRoutes);  // Notifications routes
// app.use("/connections", connectionsRoutes);  // Connections routes


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    error: process.env.NODE_ENV === "production" ? {} : err, // Hide error stack in production
  });
});

const shutdown = () => {
  console.log("Shutting down gracefully...");
  prisma.$disconnect().finally(() => {
    process.exit(0);
  });
};

// Handle termination signals (SIGINT and SIGTERM)
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default app;
