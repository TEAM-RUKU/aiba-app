import type { UserAtom } from "./types";

import ReactNativeRecoilPersist from "react-native-recoil-persist";

import { atom } from "recoil";

export const userAtom = atom<UserAtom>({
  key: "userAtom",
  default: {
    _id: null,
    name: null,
    iat: null,
    exp: null,
  },
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
