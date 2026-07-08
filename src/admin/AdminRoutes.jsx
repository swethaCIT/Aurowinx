import { Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./AdminAuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminJobsListPage from "./pages/AdminJobsListPage";
import AdminJobFormPage from "./pages/AdminJobFormPage";
import AdminApplicationsPage from "./pages/AdminApplicationsPage";

export default function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="jobs" replace />} />
            <Route path="jobs" element={<AdminJobsListPage />} />
            <Route path="jobs/new" element={<AdminJobFormPage />} />
            <Route path="jobs/:id/edit" element={<AdminJobFormPage />} />
            <Route path="applications" element={<AdminApplicationsPage />} />
          </Route>
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}
