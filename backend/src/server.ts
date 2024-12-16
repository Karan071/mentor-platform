import express from "express"
import { PrismaClient } from "@prisma/client"

const PORT = process.env.PORT || 4000;


// routes
const prisma = new PrismaClient();
const app = express();

//middlewares
app.use(express.json());


const startServer = async () => {
    try {
            await prisma.$connect();
            app.listen(PORT, () => {
                console.log(`Server running on port ${process.env.PORT}`)
            });
    } catch (error) {
        console.error("Failed to connect to the dataabse", error);
    }
};

startServer();