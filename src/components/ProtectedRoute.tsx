import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useAuth";
import Spinner from "./Spinner";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
