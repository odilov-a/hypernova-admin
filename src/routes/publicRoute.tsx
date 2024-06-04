import { Navigate, useLocation } from "react-router-dom";
import useStore from "store";

const Public = ({ children }: { children: any }) => {
  const {
    auth: { isLoggedIn },
  } = useStore((state) => state);

  const { pathname } = useLocation();

  if (isLoggedIn && pathname === "/login") {
    return <Navigate to='/' />;
  }
  return <>{children}</>;
};

export default Public;