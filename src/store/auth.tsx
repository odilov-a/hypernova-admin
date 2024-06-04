import { StateCreator } from "zustand";
import get from "lodash/get";
import { storage } from "services";

export interface IAuthSlice {
  auth: {
    isLoggedIn: boolean;
    data: { [key: string]: any };
    token: string | null;
  };
  signIn: (action: { [key: string]: any }) => void;
  getMe: (action: { [key: string]: any }) => void;
  logOut: () => void;
}

export const authSlice: StateCreator<IAuthSlice, [], []> = (
  set
): IAuthSlice => {
  return {
    auth: {
      isLoggedIn: false,
      data: {},
      token: storage.get("token") || null,
    },
    signIn: (action: any) => {
      return set((state) => {
        storage.set("token", get(action, "token", ""));
        return {
          auth: {
            ...get(state, "auth"),
            isLoggedIn: true,
            data: get(action, "data", {}),
            token: get(action, "token", ""),
          },
        };
      });
    },
    getMe: (action: { [key: string]: any }) => {
      return set((state) => {
        return {
          auth: {
            ...get(state, "auth"),
            isLoggedIn: true,
            data: get(action, "data", {}),
          },
        };
      });
    },
    logOut: () => {
      return set((state: { [key: string]: any }) => {
        return {
          auth: {
            ...get(state, "auth"),
            isLoggedIn: false,
            data: {},
            token: null,
          },
        };
      });
    },
  };
};
