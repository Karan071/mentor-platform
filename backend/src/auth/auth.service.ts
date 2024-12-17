import prisma from "../utils/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const jwtPassword = process.env.JWT_SECRET || "";

const register = async(data:any) => {
    const hashedPassword = await bcrypt.hash(data.password,10);
    const user = await prisma.user.create({
       data : {
        email : data.email,
        password : hashedPassword,
        firstName : data.firstName,
        lastName : data.lastName,
        role : data.role
       }
    });

    return user;
}

const login = async (email : string, password: string) => {
    const user = await prisma.user.findUnique({
        where : {
            email
        }
    });

    if (!user) throw new Error ("User not found");

    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) throw new Error ("Invalid user password");

    const token = jwt.sign({userId: user.id}, jwtPassword, {expiresIn: "1hr"})
}

export default {login,register}