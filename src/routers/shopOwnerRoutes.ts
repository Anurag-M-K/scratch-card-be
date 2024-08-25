import  express from "express";
import { sendScratchCardLink,verifyOffer } from "../controllers/shopOwnerController";
const router = express.Router()

router.route('/send-scratch-card-link').post(sendScratchCardLink)
router.route("/verify-offer").post(verifyOffer)

export default router