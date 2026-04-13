import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getCurrentUser, login as loginAPi, logout as logoutApi } from "../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      loginAPi(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user); // Update the user data in the cache
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Email or password are incorrect");
    },
  });
  return { login, isLoading };
}

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout , isPending: isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries(); 
            navigate("/login", { replace: true });
        },
        onError: (err) => {
            console.log("ERROR", err);
            toast.error("Failed to log out. Please try again.");
        },
    });
    return { logout, isLoading };
}