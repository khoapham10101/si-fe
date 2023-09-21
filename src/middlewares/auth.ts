import { PATH } from "@/constants/path";
import store from "@/store";

export const auth = ({ next, router }: any) => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return next({ path: PATH.Login });
  }

  return next();
};
