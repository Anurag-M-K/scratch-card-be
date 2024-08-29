import  express from "express";
import { login, sendScratchCardLink,verifyOffer } from "../controllers/shopOwnerController";
import { store } from "../middleware/auth";
const router = express.Router()

router.route("/login").post(login)
router.route('/send-scratch-card-link').post(sendScratchCardLink)
router.route("/verify-offer").post(verifyOffer)

export default router