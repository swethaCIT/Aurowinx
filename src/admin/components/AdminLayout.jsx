import { NavLink, Outlet } from "react-router-dom";
import { useAdminAuth } from "../AdminAuthContext";

const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
  }`;

export default function AdminLayout() {
  const { user, signOut } = useAdminAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Careers Admin</h1>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <nav className="flex items-center gap-2">
            <NavLink to="/admin/jobs" className={navLinkClass}>
              Jobs
            </NavLink>
            <NavLink to="/admin/applications" className={navLinkClass}>
              Applications
            </NavLink>
            <button
              onClick={() => signOut()}
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Log out
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
