import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function isValidJwt(token) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  try {
    const payload = JSON.parse(atob(parts[1]));
    if (payload?.exp && Date.now() >= payload.exp * 1000) return false; // expired
    return true;
  } catch {
    return false;
  }
}

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  const isLoggedIn = isValidJwt(token);

  if (!isLoggedIn) {
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  
  if (
    isLoggedIn &&
    (location.pathname === "/login" || location.pathname === "/signup")
  ) {
    return <Navigate to="/chat" replace />;
  }

  if (isLoggedIn && location.pathname !== "/chat") {
    return <Navigate to="/chat" replace />;
  }


  useEffect(() => {
    if (location.pathname === "/chat") {
      const handlePopState = () => {
        window.history.pushState(null, "", "/chat");
      };

      window.history.pushState(null, "", "/chat");
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [location.pathname]);

  return children;
}
