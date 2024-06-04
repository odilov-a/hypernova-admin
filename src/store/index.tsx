import { create } from "zustand";
import { authSlice, IAuthSlice } from "./auth";
import { systemSlice, ISystem } from "./system";

const useBoundStore = create<IAuthSlice & ISystem>()((...a) => ({
  ...authSlice(...a),
  ...systemSlice(...a),
}));

export default useBoundStore;
