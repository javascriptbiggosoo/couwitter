import { atom } from "recoil";

export const currentUidState = atom<string | null>({
  key: "currentUidState",
  default: null,
});
