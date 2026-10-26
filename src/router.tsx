import { lazy, Suspense, type ElementType } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import LoadingSpinner from "./shared-component/loading/LoadingSpinner";
import AuthGuard from "./guards/Auth.guard";
import ProjectGuard from "./guards/Project.guard";

const AuthLayout = lazy(() => import("./auth/auth-layout/AuthLayout"));
const LoginPage = lazy(() => import("./auth/pages/LoginPage"));
const ProjectLayout = lazy(() => import("./project-layout/ProjectLayout"));
const ModulePlaceholder = lazy(
  () => import("./modules/shared-modules/pages/ModulePlaceholder"),
);

const withSuspense = (Component: ElementType) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

const moduleRoutes = [
  "leads",
  "lead-import",
  "assignments",
  "people-teams",
  "projects-properties",
  "bookings-approval",
  "secondary-market",
  "convertible-notes",
  "commission",
  "hr-attendance",
  "report-mis",
  "audit-log",
  "settings",
] as const;

export const router = createBrowserRouter([
  {
    path: "auth",
    element: <ProjectGuard>{withSuspense(AuthLayout)}</ProjectGuard>,
    children: [
      {
        path: "login",
        element: withSuspense(LoginPage),
      },
    ],
  },
  {
    path: "",
    element: <AuthGuard>{withSuspense(ProjectLayout)}</AuthGuard>,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: withSuspense(lazy(() => import("./modules/dashboard/pages/Dashboard"))),
      },
      ...moduleRoutes.map((path) => ({
        path,
        element: withSuspense(ModulePlaceholder),
      })),
    ],
  },
]);
