import { Link } from "react-router-dom";

import productData from "../data/productData.json"
import ProductCard from "../components/ProductCard";
import { useWishlistContex } from "../context/WishlistContext";


export default function Wishlist() {
  const { ids } = useWishlistContex();
  const liked = productData.filter((p) => ids.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-medium text-slate-800 mb-6">
        Your Wishlist
        <span className="text-slate-400 font-normal"> ({liked.length})</span>
      </h1>

      {liked.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 mb-4">You haven't liked any products yet.</p>
          <Link to="/products" className="text-green-700 font-semibold underline">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6 mb-12">
          {liked.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}