import { offer } from "./constants";

export const getReward = (userCount: number) => {
  if (offer[userCount]) {
    return offer[userCount];
  } else {
    return "Screen Guard";
  }
};
