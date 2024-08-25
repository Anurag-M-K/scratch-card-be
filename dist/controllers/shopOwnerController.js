"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOffer = exports.sendScratchCardLink = void 0;
const usersCountSchema_1 = __importDefault(require("../model/usersCountSchema"));
const constants_1 = require("../utils/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utitlityFunctions_1 = require("../utils/utitlityFunctions");
const twilio = require("twilio");
const accountSid = "AC6414070589ee4e53b61487cbb5bac138";
// const accountSid = "ACb25a0bc7eb0e24270a80cfb194b27768";
const authToken = "6e11f284893d3e2c6b1e6303e30e9aab";
// const authToken = "aaadb96aa56928deeefb428df19bed78";
const client = twilio(accountSid, authToken);
// const secreteKey = offer[offerId];
const generateJWT = (offerId, reward) => {
    return jsonwebtoken_1.default.sign({ offerId }, reward, { expiresIn: "1h" });
};
const sendScratchCardLink = async (req, res) => {
    try {
        const { mobileNumber } = req.body;
        const offerId = (await usersCountSchema_1.default.countDocuments()) + 1;
        const reward = (0, utitlityFunctions_1.getReward)(offerId);
        console.log("offeriD", offerId);
        const token = generateJWT(offerId, reward);
        const scratchCardURL = `http://localhost:5173/${token}`;
        // Send SMS using Twilio
        const response = client.messages
            .create({
            body: `Click the link to reveal your offer: ${scratchCardURL}`,
            from: "whatsapp:+14155238886",
            to: "whatsapp:+919605257629",
        })
            .then((message) => console.log(message.sid));
        //it will work only if the message link sent to whatsap
        await usersCountSchema_1.default.create({
            phoneNumber: mobileNumber,
        });
        res.status(200).json({ message: "Message send successfully " });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.sendScratchCardLink = sendScratchCardLink;
const verifyOffer = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }
        //if token decode its id and return the offer accordint to the number
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.decode(token);
        }
        catch (error) {
            res.status(400).json({ message: "Invalid token" });
        }
        const { offerId } = decoded;
        console.log("Decoded ", decoded);
        const selectedOffer = constants_1.offer[offerId] || "Mobile Case";
        return res.status(200).json({ offer: selectedOffer });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.verifyOffer = verifyOffer;
