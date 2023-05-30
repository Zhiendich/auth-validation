import Router from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.put("/edit/:id", userController.updateUser);
router.get("/getUsers", userController.getUsers);

export default router;
