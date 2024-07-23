import { atom, selector } from "recoil";

export const userIdState = atom({
  key: "userIdState",
  default: 5, // Default userId, adjust as needed
});
