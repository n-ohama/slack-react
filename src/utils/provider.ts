import { atom, AtomEffect, atomFamily, DefaultValue } from "recoil";
import { RoomTyp, UserTyp } from "./types";

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const loginState = atom<string | null>({
  key: "loginState",
  default: null,
});

export const userInfoState = atom<UserTyp | null>({
  key: "userInfoState",
  default: null,
});

export const roomState = atomFamily<RoomTyp | null, string>({
  key: "roomState",
  default: null,
});

export const searchRoomsState = atom<RoomTyp[]>({
  key: "searchRoomsState",
  default: [],
});

export const historyState = atom<string>({
  key: "historyState",
  default: "",
  effects_UNSTABLE: [localStorageEffect<string>("history")],
});
