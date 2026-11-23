import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useWishlistContex } from "../context/WishlistContext";


const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "Products" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/cart", label: "Cart" },
];

const desktopLink = ({ isActive }) =>
  `font-bold transition-colors hover:text-green-700 ${
    isActive ? "text-green-600" : "text-slate-800"
  }`;

const mobileLink = ({ isActive }) =>
  `flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition-colors ${
    isActive ? "bg-green-50 text-green-700" : "text-slate-800 hover:bg-gray-50"
  }`;

function Badge({ count, color = "bg-green-700" }) {
  if (!count) return null;
  return (
    <span
      className={`${color} text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center`}
    >
      {count}
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCartContext();
  const { ids } = useWishlistContex();
  const { pathname } = useLocation();

  
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const counts = { "/wishlist": ids.length, "/cart": itemCount };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link to="/" className="text-xl sm:text-3xl font-bold text-green-800">
          IONMITRRA
        </Link>

        
        <nav className="hidden md:flex items-center gap-7 text-lg">
          <NavLink to="/" end className={desktopLink}>
            Home
          </NavLink>
          <NavLink to="/products" className={desktopLink}>
            Products
          </NavLink>
          <NavLink to="/wishlist" className={desktopLink} aria-label="Wishlist">
            <span className="relative inline-block">
              <i
                className={`bi ${ids.length ? "bi-heart-fill text-red-500" : "bi-heart"}`}
              ></i>
              {ids.length > 0 && (
                <span className="absolute -top-2 -right-3">
                  <Badge count={ids.length} color="bg-red-500" />
                </span>
              )}
            </span>
          </NavLink>
          <NavLink to="/cart" className={desktopLink} aria-label="Cart">
            <span className="relative inline-block">
              <i className="bi bi-cart"></i>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-3">
                  <Badge count={itemCount} />
                </span>
              )}
            </span>
          </NavLink>
        </nav>

        
        <div className="flex items-center gap-1 md:hidden">
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative w-10 h-10 flex items-center justify-center text-xl text-slate-800"
          >
            <i className="bi bi-cart"></i>
            {itemCount > 0 && (
              <span className="absolute top-0.5 right-0">
                <Badge count={itemCount} />
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="w-10 h-10 flex items-center justify-center rounded-lg text-2xl text-slate-800 hover:bg-gray-100"
          >
            <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`}></i>
          </button>
        </div>
      </div>

      
      <nav
        id="mobile-menu"
        className={`md:hidden relative overflow-hidden bg-white border-t border-gray-100 transition-[max-height] duration-300 ease-in-out ${
          open ? "max-h-[80vh]" : "max-h-0 border-transparent"
        }`}
      >
        <div className="flex flex-col gap-1 p-3 overflow-y-auto">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={mobileLink} tabIndex={open ? 0 : -1}>
              <span>{label}</span>
              <Badge count={counts[to]} color={to === "/wishlist" ? "bg-red-500" : "bg-green-700"} />
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}