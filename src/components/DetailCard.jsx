import { useState } from "react";
import { useCartContext } from "../context/CartContext";

export default function DetailCard({ product }) {
  const [liked, setLiked] = useState(false);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCartContext();

  const {
    image,
    title,
    name,
    price,
    oldPrice,
    rating,
    reviews,
    category,
    description,
  } = product;

  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <div className="flex flex-col md:flex-row gap-10 lg:gap-14 mb-20">
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-[4/3] flex items-center justify-center">
          <img
            src={image}
            alt={title || name}
            className="w-full h-full object-cover mix-blend-multiply "
          />
          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-2 right-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100/90 flex items-center justify-center"
            aria-label="Add to wishlist"
          >
            {" "}
            <i
              className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`}
              style={{ fontSize: "1.25rem", color: liked ? "red" : "inherit" }}
            ></i>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer border-2 transcation-all border-primary bg-gray-50 flex item-center justify-center">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover mix-blend-multiply "
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
        <div className="flex items-center gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={
                star <= rating ? "flex text-yellow-400" : "text-gray-400"
              }
            >
              ★
            </span>
          ))}
          <span className="text-xs font-medium text-gray-500">
            {rating} ({reviews} reviews )
          </span>
        </div>
        <div className="flex flex-wrap  items-center gap-2 sm:gap-4 mb-6 sm:md-8">
          <span className="font-extrabold text-3xl sm:text-4xl text-green-700 ">
            ₹{price.toFixed(2)}
          </span>

          <span className="text-lg sm:text-2xl font-bold line-through text-gray-300">
            ₹{oldPrice.toFixed(2)}
          </span>

          <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">
            {discount}% off
          </span>
        </div>
        <div className="text-gray-600 mb-8 space-y-4 text-[15px] landing-relaxed">
          <p>
            <strong>Description</strong>
          </p>
          <p>{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-auto">
          <div className="flex items-center border border-gray-200 rounded-lg h-11 sm:h-12 w-28 sm:w-32">
            <button
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
              onClick={() => setQty((q) => q + 1)}
              className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <i className="bi bi-plus"></i>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => addToCart(product, qty)}
              className="px-3 sm:px-4 py-2 border-2 border-green-700  font-bold rounded-lg hover:bg-emerald-50 transition-color text-sm sm:text-base">
              Add to Cart</button>

            <button className="px-3 sm:px-4 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-emrald-50 transition-color shadow-md hover:shadow-lg hover:-translate-y-0.5 border-2 border-green-700 text-sm sm:text-base">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
