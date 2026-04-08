import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#16a34a",
              secondary: "#f0fdf4",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#dc2626",
              secondary: "#fef2f2",
            },
          },
          style: {
            fontSize: "14px",
            fontWeight: "500",
            backgroundColor: "#ffffff",
            color: "#1c1917",
            border: "0.5px solid #e7e5e4",
            borderRadius: "8px",
            padding: "10px 16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            maxWidth: "380px",
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
