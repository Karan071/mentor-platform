import express  from "express";
import getProfile from "./profile.controller";

const routerProfile = express.Router()

routerProfile.get("/profile/:userId", getProfile)

export default routerProfile;