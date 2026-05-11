"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PackageOpen, Package } from "lucide-react";
import MobileDrawer from "./MobileDrawer";
import TopBar from "./TopBar";
import ProfileDropdown from "../customUi/ProfileDropdown";

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
  { label: "Analytics", href: "/hub-dashboard/analytics" },
];

const corporateNavLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Shipments", href: "/shipments" },
  { label: "Invoices", href: "/invoices" },
  { label: "Track Shipment", href: "/status" },
  { label: "Rewards", href: "/profile/reward" },
];

const partnerNavLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Create Shipment", href: "/shipments/create" },
  { label: "Shipments", href: "/shipments" },
  { label: "Invoices", href: "/invoices" },
  { label: "Track Shipment", href: "/status" },
];

const PROVIDER_ROLES = [
  "hubProvider",
  "businessCustomer",
  "containerCustomer",
  "corporatePartner",
  "customer",
];

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
    } else if (
      userRole === "businessCustomer" ||
      userRole === "containerCustomer"
    ) {
      activeNavLinks = corporateNavLinks;
    } else if (userRole === "corporatePartner") {
      activeNavLinks = partnerNavLinks;
    } else {
      // For basic customers or if no role is explicitly mapped
      activeNavLinks = publicNavLinks;
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
    router.push("/");
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <div
          className={`transition-all duration-300 ease-in-out origin-top ${
            scrolled
              ? "max-h-0 opacity-0 overflow-hidden"
              : "max-h-[72px] opacity-100"
          }`}
        >
          <TopBar />
        </div>
        <header
          className={`
            h-[60px] border-b shadow-sm transition-all duration-200
            ${scrolled ? "bg-[#18319b] border-[#18319b]" : "bg-white border-gray-200"}
          `}
        >
          <div className="max-w-[1800px] mx-auto  h-full flex items-center justify-between gap-6 px-2">
            {/* ── Logo ── */}
            <Link
              href="/"
              className={`flex items-center shrink-0 no-underline gap-2 transition-all duration-300 ${
                !showNav || scrolled
                  ? "w-auto opacity-100 mr-2"
                  : "w-auto opacity-100 mr-2 lg:w-0 lg:opacity-0 lg:overflow-hidden lg:mr-0"
              }`}
            >
              <Package
                size={28}
                className={scrolled ? "text-white" : "text-[#18319b]"}
              />
              <span
                className={`font-inter font-bold text-[17px] tracking-tight whitespace-nowrap ${scrolled ? "text-white" : "text-black"}`}
              >
                Buan Logistics
              </span>
            </Link>

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
                            ? scrolled
                              ? "text-white bg-white/20"
                              : "text-primary bg-primary/10"
                            : scrolled
                              ? "text-white/80 hover:text-white hover:bg-white/10"
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
              {/* CASE 1: No role + Authenticated → Profile only */}
              {noRoleAuthenticated && (
                <>
                  <ProfileDropdown
                    handleLogout={handleLogout}
                    scrolled={scrolled}
                  />
                </>
              )}

              {/* CASE 2: Role + Authenticated → Bell + Profile only (plus specific actions) */}
              {roleAuthenticated && (
                <>
                  {userRole === "hubProvider" && (
                    <button
                      onClick={() => router.push("/hub-dashboard/intake")}
                      className={`
                        px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer mr-2 flex items-center gap-2
                        ${scrolled ? "bg-white text-[#18319b] hover:bg-white/90" : "bg-[#18319b] text-white hover:bg-[#10247a]"}
                      `}
                    >
                      <PackageOpen size={16} />
                      New Package Intake
                    </button>
                  )}
                  <ProfileDropdown
                    handleLogout={handleLogout}
                    scrolled={scrolled}
                  />
                </>
              )}

              {/* CASE 3: No role + Not Authenticated → Sign In only */}
              {noRoleNotAuthenticated && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => router.push("/register")}
                    className={`
                    px-6 py-2 rounded text-sm font-bold transition-all duration-200 cursor-pointer
                    ${scrolled ? "bg-white text-blue-700 hover:bg-gray-100" : "bg-blue-700 text-white hover:bg-blue-900"}
                  `}
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => router.push("/login")}
                    className={`
                    px-6 py-2 rounded text-sm font-bold transition-all duration-200 cursor-pointer
                    ${scrolled ? "bg-white text-blue-700 hover:bg-gray-100" : "bg-blue-700 text-white hover:bg-blue-900"}
                  `}
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>

            {/* ── Mobile Right ── */}
            <div className="flex lg:hidden items-center gap-3">
              {showNav && (
                <button
                  onClick={() => setDrawerOpen(true)}
                  className={`
                    w-10 h-10 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all duration-200 bg-transparent cursor-pointer
                    ${scrolled ? "border-white/20 hover:bg-white/10 hover:border-white" : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"}
                  `}
                  aria-label="Open menu"
                >
                  <span
                    className={`h-0.5 rounded-full block w-6 ${scrolled ? "bg-white" : "bg-gray-600"}`}
                  />
                  <span
                    className={`h-0.5 rounded-full block w-4 ${scrolled ? "bg-white" : "bg-gray-600"}`}
                  />
                  <span
                    className={`h-0.5 rounded-full block w-6 ${scrolled ? "bg-white" : "bg-gray-600"}`}
                  />
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
