import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Briefcase, Users, LogOut, Menu, X } from "lucide-react";
import { useAdminAuth } from "../AdminAuthContext";

const NAV_ITEMS = [
  { to: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { to: "/admin/applications", label: "Applications", icon: Users },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
    isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
  }`;

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-[13px] font-black text-white shadow-lg shadow-indigo-600/25">
        AX
      </div>
      <div className="leading-tight">
        <p className="text-sm font-bold text-slate-900">AurowinX</p>
        <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400">Admin Panel</p>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { user, signOut } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileOpen ? "block" : "hidden"
        } w-full shrink-0 border-b border-slate-200 bg-white lg:block lg:w-64 lg:border-b-0 lg:border-r`}
      >
        <div className="flex flex-col lg:sticky lg:top-0 lg:h-screen">
          <div className="hidden px-6 py-6 lg:block">
            <Brand />
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4 lg:py-0" aria-label="Admin sections">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={navLinkClass}>
                <Icon size={17} strokeWidth={2} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-slate-100 p-3">
            <div className="flex items-center gap-3 rounded-xl px-3 py-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                {user?.email?.[0]?.toUpperCase() || "?"}
              </div>
              <p className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-600">{user?.email}</p>
            </div>
            <button
              type="button"
              onClick={() => signOut()}
              className="mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={17} strokeWidth={2} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
