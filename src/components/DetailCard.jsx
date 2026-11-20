import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useWishlistContex } from "../context/WishlistContext";



 function DetailCard({ product }) {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  const { isLiked, toggleLike } = useWishlistContex();

  const { id, image, title, name, price, oldPrice, rating, reviews, category, description } =
    product;

  const liked = isLiked(id);
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate("/cart");
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-14 mb-12 md:mb-20">
      
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-[4/3] flex items-center justify-center">
          <img
            src={image}
            alt={title || name}
            className="w-full h-full object-cover mix-blend-multiply"
          />
          <button
            type="button"
            onClick={() => toggleLike(id)}
            aria-pressed={liked}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-2 right-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 flex items-center justify-center"
          >
            <i
              className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`}
              style={{ fontSize: "1.25rem", color: liked ? "red" : "inherit" }}
            ></i>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="rounded-2xl overflow-hidden aspect-square border-2 border-green-700 bg-gray-50">
            <img
              src={image}
              alt={title || name}
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </div>
        </div>
      </div>

      
      <div className="w-full md:w-1/2 flex flex-col">
        <p className="text-xs font-bold text-emerald-600 tracking-wider uppercase mb-2 bg-emerald-50 self-start px-2.5 py-1 rounded">
          {category}
        </p>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
          {name}
        </h1>

        <div className="flex items-center gap-1 mb-4 sm:mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={star <= rating ? "text-yellow-400" : "text-gray-300"}>
              ★
            </span>
          ))}
          <span className="text-xs font-medium text-gray-500 ml-1">
            {rating} ({reviews} reviews)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6">
          <span className="font-extrabold text-3xl sm:text-4xl text-green-700">
            ₹{price.toFixed(2)}
          </span>
          {oldPrice && (
            <span className="text-lg sm:text-2xl font-bold line-through text-gray-300">
              ₹{oldPrice.toFixed(2)}
            </span>
          )}
          {discount > 0 && (
            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">
              {discount}% off
            </span>
          )}
        </div>

        <div className="text-gray-600 mb-8 space-y-2 text-[15px] leading-relaxed">
          <p>
            <strong>Description</strong>
          </p>
          <p className="break-words">{description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-auto">
          <div className="flex items-center border border-gray-200 rounded-lg h-11 sm:h-12 w-28 sm:w-32">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty === 1}
              className="w-8 h-full flex items-center justify-center text-gray-500 disabled:opacity-50 hover:bg-gray-50"
            >
              <i className="bi bi-dash"></i>
            </button>
            <div className="flex-1 flex justify-center items-center font-bold text-sm text-slate-800">
              {qty}
            </div>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <i className="bi bi-plus"></i>
            </button>
          </div>

          <div className="flex flex-1 sm:flex-none items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => addToCart(product, qty)}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 border-2 border-green-700 text-green-700 font-bold rounded-lg hover:bg-emerald-50 transition-colors text-sm sm:text-base"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-colors shadow-md border-2 border-green-700 text-sm sm:text-base"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export  default DetailCard;