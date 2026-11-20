import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useWishlistContex } from "../context/WishlistContext";


const linkClass = ({ isActive }) =>
  `text-base sm:text-lg font-bold transition hover:text-green-700 ${
    isActive ? "text-green-600" : "text-slate-800"
  }`;

export default function Header() {
  const { cart } = useCartContext();
  const { ids } = useWishlistContex();
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 bg-white px-4 sm:px-8 py-3 sm:py-4 shadow-sm">
      <h1 className="text-xl sm:text-3xl font-bold text-green-800">IONMITRRA</h1>

      <nav className="flex items-center gap-4 sm:gap-6">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>

        <NavLink to="/wishlist" className={linkClass} aria-label="Wishlist">
          <span className="relative inline-block">
            <i className={`bi ${ids.length > 0 ? "bi-heart-fill text-red-500" : "bi-heart"} text-lg`}></i>
            {ids.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {ids.length}
              </span>
            )}
          </span>
        </NavLink>

        <NavLink to="/cart" className={linkClass} aria-label="Cart">
          <span className="relative inline-block">
            <i className="bi bi-cart text-lg"></i>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </span>
        </NavLink>
      </nav>
    </header>
  );
}