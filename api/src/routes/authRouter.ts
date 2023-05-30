import Router from "express";
import authController from "../controllers/authController.js";
import { checkAuth } from "../middlewares/CheckAuth.js";

const router = Router();

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.get("/getUser", checkAuth, authController.isUserAuth);

export default router;
