"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, User, LogOut, PackageOpen } from "lucide-react";
import MobileDrawer from "./MobileDrawer";
import TopBar from "./TopBar";

type NavLink = {
  label: string;
  href: string;
};

const publicNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Get A Quote", href: "/get-a-quote" },
  { label: "Track Shipment", href: "/status" },
];

const authNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Create Shipment", href: "/create" },
  { label: "Track Shipment", href: "/status" },
];

const hubNavLinks: NavLink[] = [
  { label: "Dashboard", href: "/hub-dashboard" },
  { label: "New Intake", href: "/hub-dashboard/intake" },
  { label: "Inventory", href: "/hub-dashboard/inventory" },
];

const PROVIDER_ROLES = ["hubProvider", "partner"];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    setUserRole(role || "");
    setIsAuthenticated(!!email);
  }, []);

  const hasRole = !!userRole;
  const isProviderRole = PROVIDER_ROLES.includes(userRole);

  const noRoleAuthenticated = !hasRole && isAuthenticated;
  const roleAuthenticated = hasRole && isAuthenticated;
  const noRoleNotAuthenticated = !hasRole && !isAuthenticated;
  const showNav = !hasRole || isProviderRole;

  // Dashboard shows for all authenticated users
  let activeNavLinks = publicNavLinks;
  if (isAuthenticated) {
    if (userRole === "hubProvider") {
      activeNavLinks = hubNavLinks;
    } else if (hasRole) {
      activeNavLinks = authNavLinks;
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    setUserRole("");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <TopBar />
        <header
          className={`
            h-[60px] bg-white border-b border-gray-200 shadow-sm transition-all duration-200
            ${scrolled ? "bg-white/95 backdrop-blur-md" : ""}
          `}
        >
          <div className="max-w-[1800px] mx-auto px-6 h-full flex items-center justify-between gap-6">
            {/* ── Left Nav ── */}
            {showNav ? (
              <nav className="hidden lg:flex items-center gap-1 flex-1 justify-start">
                {activeNavLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`
                        px-4 py-2 rounded-lg text-[15px] font-medium
                        transition-all duration-200 no-underline
                        ${
                          active
                            ? "text-primary bg-primary/10"
                            : "text-gray-700 hover:text-primary hover:bg-gray-50"
                        }
                      `}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            ) : (
              <div className="flex-1" />
            )}

            {/* ── Right Side — desktop ── */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* CASE 1: No role + Authenticated → Become buttons + Bell + Profile */}
              {noRoleAuthenticated && (
                <>
                  <button
                    onClick={() => router.push("/become-hub")}
                    className="
                      px-3 py-2 border border-gray-200 rounded-lg
                      text-gray-700 text-[13px] font-medium whitespace-nowrap
                      hover:border-gray-300 hover:text-black hover:bg-gray-50
                      transition-all duration-200 bg-transparent cursor-pointer
                    "
                  >
                    Become a Hub Provider
                  </button>
                  <button
                    onClick={() => {}}
                    className="
                      px-3 py-2 border border-gray-200 rounded-lg
                      text-gray-700 text-[13px] font-medium whitespace-nowrap
                      hover:border-gray-300 hover:text-black hover:bg-gray-50
                      transition-all duration-200 bg-transparent cursor-pointer
                    "
                  >
                    Service Point Provider
                  </button>
                  <button
                    onClick={() => router.push("/become-partner")}
                    className="
                      px-3 py-2 border border-gray-200 rounded-lg
                      text-gray-700 text-[13px] font-medium whitespace-nowrap
                      hover:border-gray-300 hover:text-black hover:bg-gray-50
                      transition-all duration-200 bg-transparent cursor-pointer
                    "
                  >
                    Become a Partner
                  </button>
                  <BellButton router={router} />
                  <ProfileDropdown handleLogout={handleLogout} />
                </>
              )}

              {/* CASE 2: Role + Authenticated → Bell + Profile only (plus specific actions) */}
              {roleAuthenticated && (
                <>
                  {userRole === "hubProvider" && (
                    <button
                      onClick={() => router.push("/hub-dashboard/intake")}
                      className="
                        px-4 py-2 bg-[#18319b] hover:bg-[#10247a]
                        rounded-lg text-white text-[13px] font-medium
                        transition-all duration-200 cursor-pointer mr-2
                        flex items-center gap-2
                      "
                    >
                      <PackageOpen size={16} />
                      New Package Intake
                    </button>
                  )}
                  <BellButton router={router} />
                  <ProfileDropdown handleLogout={handleLogout} />
                </>
              )}

              {/* CASE 3: No role + Not Authenticated → Sign In only */}
              {noRoleNotAuthenticated && (
                <button
                  onClick={() => router.push("/login")}
                  className="
                    px-6 py-2 bg-blue-700 hover:bg-blue-900
                    rounded text-white text-sm font-bold
                    transition-all duration-200 cursor-pointer
                  "
                >
                  Sign In
                </button>
              )}
            </div>

            {/* ── Mobile Right ── */}
            <div className="flex lg:hidden items-center gap-3">
              {showNav && (
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="
                    w-10 h-10 rounded-lg border border-gray-200
                    flex flex-col items-center justify-center gap-1.5
                    hover:bg-gray-50 hover:border-gray-300
                    transition-all duration-200 bg-transparent cursor-pointer
                  "
                  aria-label="Open menu"
                >
                  <span className="h-0.5 bg-gray-600 rounded-full block w-6" />
                  <span className="h-0.5 bg-gray-600 rounded-full block w-4" />
                  <span className="h-0.5 bg-gray-600 rounded-full block w-6" />
                </button>
              )}
            </div>
          </div>
        </header>
      </div>

      {/* ── Mobile Drawer ── */}
      {showNav && (
        <MobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          navLinks={activeNavLinks}
          pathname={pathname}
          isAuthenticated={isAuthenticated}
          isProviderRole={isProviderRole}
          user={null}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

/* ── Bell Button ── */
interface BellButtonProps {
  router: ReturnType<typeof useRouter>;
}

function BellButton({ router }: BellButtonProps) {
  return (
    <button
      onClick={() => router.push("/notifications")}
      className="
        relative w-9 h-9 rounded-full border border-gray-200
        flex items-center justify-center text-gray-600
        hover:text-black hover:border-gray-300 hover:bg-gray-50
        transition-all duration-200 bg-transparent cursor-pointer
      "
    >
      <Bell size={16} />
      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full text-[9px] font-bold flex items-center justify-center text-white">
        3
      </span>
    </button>
  );
}

/* ── Profile Dropdown ── */
interface ProfileDropdownProps {
  handleLogout: () => void;
}

function ProfileDropdown({ handleLogout }: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogout = () => {
    setOpen(false);
    handleLogout();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-9 h-9 rounded-full border border-gray-200
          flex items-center justify-center text-gray-600
          hover:text-black hover:border-gray-300 hover:bg-gray-50
          transition-all duration-200 bg-transparent cursor-pointer
        "
      >
        <User size={16} />
      </button>

      {open && (
        <div
          className="
            absolute right-0 top-[calc(100%+10px)]
            w-48 rounded-xl overflow-hidden
            bg-white
            border border-gray-100
            shadow-xl
            animate-in fade-in slide-in-from-top-2 duration-200
          "
        >
          <div className="absolute -top-1.5 right-3 w-3 h-3 rotate-45 bg-white border-l border-t border-gray-100" />

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="
              flex items-center gap-2.5 px-4 py-3
              text-gray-700 hover:text-primary hover:bg-primary/5
              text-sm font-medium transition-all duration-150
              no-underline border-b border-gray-100
            "
          >
            <User size={14} className="shrink-0" />
            Profile
          </Link>

          <button
            onClick={onLogout}
            className="
              w-full flex items-center gap-2.5 px-4 py-3
              text-gray-700 hover:text-primary hover:bg-primary/5
              text-sm font-medium transition-all duration-150
              bg-transparent cursor-pointer text-left
            "
          >
            <LogOut size={14} className="shrink-0" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
