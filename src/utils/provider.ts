import { atom } from "recoil";

export const loginState = atom<string | null>({
  key: "loginState",
  default: null,
});
