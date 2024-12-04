import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAccessTokenExpired, isRefreshTokenExpired, refreshToken } from "./helper";

function ProtectedRoutes() {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuthentication() {
      if (isAccessTokenExpired()) {
        if (isRefreshTokenExpired()) {
          setAuthenticated(false);
        } else {
          await refreshToken();
          setAuthenticated(true);
        }
      } else {
        setAuthenticated(true);
      }
    }

    checkAuthentication();
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>; // Loading indicator while checking authentication
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
