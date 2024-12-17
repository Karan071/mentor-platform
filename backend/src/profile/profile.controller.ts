import {Request, Response} from "express";
import getProfileServices from "../profile/profile.service" 

const getProfile = async (req: Request, res: Response) => {
    try {
        const profile = await getProfileServices(req.params.userId)
        res.json({
            profile 
        })
    } catch (error: any) {
        res.status(500).json({
            error : error.message
        })
    }
};

export default getProfile