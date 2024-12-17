import { Request, Response } from "express";
import AuthService from "../auth/auth.service";

const register = async (req: Request, res: Response) => {
    try {
        const { email , password , firstName , lastName , role } = req.body;
        const user = await AuthService.register({email, password, firstName, lastName, role});
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await AuthService.login(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export default { register, login };
