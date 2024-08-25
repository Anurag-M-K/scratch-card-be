"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shopOwnerController_1 = require("../controllers/shopOwnerController");
const router = express_1.default.Router();
router.route('/send-scratch-card-link').post(shopOwnerController_1.sendScratchCardLink);
router.route("/verify-offer").post(shopOwnerController_1.verifyOffer);
exports.default = router;
