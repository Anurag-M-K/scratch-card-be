import { Request, Response } from "express";
import User from "../model/usersCountSchema";
import { offer } from "../utils/constants";
import jwt from "jsonwebtoken";
import { getReward } from "../utils/utitlityFunctions";
import bcrypt, { hash } from "bcryptjs";
import Store from "../model/storeSchema";

const twilio = require("twilio");
const accountSid = "AC6414070589ee4e53b61487cbb5bac138";
// const accountSid = "ACb25a0bc7eb0e24270a80cfb194b27768";
const authToken = "6e11f284893d3e2c6b1e6303e30e9aab";
// const authToken = "aaadb96aa56928deeefb428df19bed78";
const client = twilio(accountSid, authToken);

// const secreteKey = offer[offerId];

const generateJWT = (offerId: any, reward: string) => {
  return jwt.sign({ offerId }, "secrete_code", { expiresIn: "5m" });
};

export const sendScratchCardLink = async (req: Request, res: Response) => {
  try {
    const { mobileNumber } = req.body;

    const offerId: number = (await User.countDocuments()) + 1;

    const reward = getReward(offerId);


    const token = generateJWT(offerId, reward);

    const scratchCardURL = `${process.env.SCRATCH_CARD_URL}/${token}`;

    // Send SMS using Twilio
    // const response: any = client.messages
    //   .create({
    //     body: `Click the link to reveal your offer: ${scratchCardURL}`,
    //     from: "whatsapp:+14155238886",
    //     to: "whatsapp:+919605257629",
    //   })
    //   .then((message: any) => console.log(message));

    const response = await client.messages.create({
      body: `Click the link to reveal your offer: ${scratchCardURL}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Replace with your Twilio phone number
      to: `+91${mobileNumber}`, // Mobile number provided in the request
    });

    //it will work only if the message link sent to whatsap
    await User.create({
      phoneNumber: mobileNumber,
    });

    res
      .status(200)
      .json({ message: "Message send successfully ", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error, success: false });
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
      decoded = jwt.verify(token, "secrete_code") as { offerId: number };
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
      res.status(400).json({ message: "Invalid token" });
    }

    const { offerId } = decoded;

    if(!offerId){
      return res.status(401).json({message:"Expired"})
    }

    const selectedOffer = offer[offerId] || "Screen Guard";

    return res.status(200).json({ offer: selectedOffer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};



export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user: any = await Store.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Invalid username", login: false });
    }

    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password", login: false });
    }

    // If username and password are correct, generate a token
    const token = user.generateAuthToken(user._id);
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      token: token,
      login: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
