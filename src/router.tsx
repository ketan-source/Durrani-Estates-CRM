import { lazy, Suspense, type ElementType } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import LoadingSpinner from "./shared-component/loading/LoadingSpinner";
import AuthGuard from "./guards/Auth.guard";
import ProjectGuard from "./guards/Project.guard";

const AuthLayout = lazy(() => import("./auth/auth-layout/AuthLayout"));
const LoginPage = lazy(() => import("./auth/pages/LoginPage"));
const ProjectLayout = lazy(() => import("./project-layout/ProjectLayout"));

const withSuspense = (Component: ElementType) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

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
      {
        path: "leads",
        element: withSuspense(
          lazy(() => import("./modules/shared-modules/pages/LeadsPage")),
        ),
      },
      {
        path: "lead-import",
        element: withSuspense(
          lazy(() => import("./modules/shared-modules/pages/LeadImportPage")),
        ),
      },
      {
        path: "assignments",
        element: withSuspense(
          lazy(() => import("./modules/shared-modules/pages/AssignmentsPage")),
        ),
      },
      {
        path: "assignments/assign/:leadId?",
        element: withSuspense(
          lazy(() =>
            import("./modules/shared-modules/pages/AssignmentsPage").then((m) => ({
              default: () => <m.default mode="assign" />,
            })),
          ),
        ),
      },
      {
        path: "people-teams",
        element: withSuspense(
          lazy(() => import("./modules/shared-modules/pages/PeopleTeamsPage")),
        ),
      },
      {
        path: "projects-properties",
        element: withSuspense(
          lazy(() => import("./modules/shared-modules/pages/ProjectsPropertiesPage")),
        ),
      },
      {
        path: "projects-properties/add",
        element: withSuspense(
          lazy(() =>
            import("./modules/shared-modules/pages/ProjectsPropertiesPage").then((m) => ({
              default: () => <m.default mode="add" />,
            })),
          ),
        ),
      },
      {
        path: "projects-properties/:projectId",
        element: withSuspense(
          lazy(() =>
            import("./modules/shared-modules/pages/ProjectsPropertiesPage").then((m) => ({
              default: () => <m.default mode="detail" />,
            })),
          ),
        ),
      },
      {
        path: "bookings-approval",
        element: withSuspense(
          lazy(() => import("./modules/shared-modules/pages/BookingsApprovalPage")),
        ),
      },
      {
        path: "secondary-market",
        element: withSuspense(
          lazy(() => import("./modules/shared-modules/pages/SecondaryMarketPage")),
        ),
      },
      {
        path: "convertible-notes",
        element: withSuspense(
          lazy(() => import("./modules/shared-modules/pages/ConvertibleNotesPage")),
        ),
      },
      {
        path: "commission",
        element: withSuspense(
          lazy(() => import("./modules/shared-modules/pages/CommissionPage")),
        ),
      },
      {
        path: "hr-attendance",
        element: withSuspense(
          lazy(() => import("./modules/shared-modules/pages/HrAttendancePage")),
        ),
      },
      {
        path: "hr-attendance/mark",
        element: withSuspense(
          lazy(() =>
            import("./modules/shared-modules/pages/HrAttendancePage").then((m) => ({
              default: () => <m.default mode="mark" />,
            })),
          ),
        ),
      },
      {
        path: "report-mis",
        element: withSuspense(
          lazy(() => import("./modules/shared-modules/pages/ReportMisPage")),
        ),
      },
      {
        path: "audit-log",
        element: withSuspense(
          lazy(() => import("./modules/shared-modules/pages/AuditLogPage")),
        ),
      },
      {
        path: "settings",
        element: withSuspense(
          lazy(() => import("./modules/shared-modules/pages/SettingsPage")),
        ),
      },
    ],
  },
]);
