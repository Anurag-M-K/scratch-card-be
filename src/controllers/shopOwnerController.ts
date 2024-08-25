import { Request, Response } from "express";
import User from "../model/usersCountSchema";
import { offer } from "../utils/constants";
import jwt from "jsonwebtoken";
import { getReward } from "../utils/utitlityFunctions";

const twilio = require("twilio");
const accountSid = "AC6414070589ee4e53b61487cbb5bac138";
// const accountSid = "ACb25a0bc7eb0e24270a80cfb194b27768";
const authToken = "6e11f284893d3e2c6b1e6303e30e9aab";
// const authToken = "aaadb96aa56928deeefb428df19bed78";
const client = twilio(accountSid, authToken);

// const secreteKey = offer[offerId];

const generateJWT = (offerId: any, reward: string) => {
  return jwt.sign({ offerId }, reward, { expiresIn: "1h" });
};

export const sendScratchCardLink = async (req: Request, res: Response) => {
  try {
    const { mobileNumber } = req.body;

    const offerId: number = (await User.countDocuments()) + 1;

    const reward = getReward(offerId);

    console.log("offeriD", offerId);

    const token = generateJWT(offerId, reward);

    const scratchCardURL = `http://localhost:5173/${token}`;

    // Send SMS using Twilio
    const response: any = client.messages
      .create({
        body: `Click the link to reveal your offer: ${scratchCardURL}`,
        from: "whatsapp:+14155238886",
        to: "whatsapp:+919605257629",
      })
      .then((message: any) => console.log(message.sid));

    //it will work only if the message link sent to whatsap
    await User.create({
      phoneNumber: mobileNumber,
    });

    res.status(200).json({ message: "Message send successfully " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const verifyOffer = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    //if token decode its id and return the offer accordint to the number
    let decoded: any;
    try {
      decoded = jwt.decode(token) as { offerId: number };
    } catch (error) {
      res.status(400).json({ message: "Invalid token" });
    }

    const { offerId } = decoded;

    console.log("Decoded ", decoded);

    const selectedOffer = offer[offerId] || "Mobile Case";

    return res.status(200).json({ offer: selectedOffer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
