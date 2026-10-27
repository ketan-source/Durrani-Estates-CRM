import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import LoadingSpinner from "./shared-component/loading/LoadingSpinner";
import { ToastProvider } from "@/components/kit";

const Confirmation = React.lazy(() =>
  import("@/shared-component/Confirmation").then((m) => ({ default: m.default })),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ToastContainer limit={1} />
        <Suspense fallback={<LoadingSpinner />}>
          <Confirmation />
        </Suspense>
        <RouterProvider router={router} />
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>,
);