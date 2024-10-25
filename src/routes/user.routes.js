import { Router } from "express";
import { changePassword, deleteAccount, getCurrentUser, loginUser, logOutUser, registerUser, updateAccoount } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/current-user").get(verifyToken,getCurrentUser) 
router.route("/logout").get(verifyToken,logOutUser) 
router.route("/change-password").post(verifyToken,changePassword) 
router.route("/update-Account").post(verifyToken,updateAccoount) 
router.route("/delete-Account").post(verifyToken,deleteAccount) 



export default router