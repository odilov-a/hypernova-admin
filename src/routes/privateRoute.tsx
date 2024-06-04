import { Navigate } from "react-router-dom";
import useStore from "store";

function Private({ children }: { children: any }) {
  const {
    auth: { isLoggedIn, token },
  } = useStore((state) => state);

  if (isLoggedIn) {
    return <>{children}</>;
  }
  return <Navigate to='/login' />;
}

export default Private;
