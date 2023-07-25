import { atom, selector } from "recoil";

interface IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export const currentUserState = atom<IUser | null>({
  key: "currentUserState",
  default: null,
});

export const currentUidState = selector({
  key: "currentUidState",
  get: ({ get }) => {
    const user = get(currentUserState);
    return user?.uid;
  },
});
