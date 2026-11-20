import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { slugify } from "../utils/Slug";
import { getDiscount } from "../utils/Discount";

export default function CartCard() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCartContext();

  const subtotal = cart.reduce((s, i) => s + i.oldPrice * i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = subtotal - total;
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-white min-h-[70vh]">
      <h1 className="text-2xl sm:text-3xl font-medium text-slate-800 mb-6 sm:mb-8 tracking-tight">
        Your Cart
        <span className="text-slate-400 font-normal"> ({itemCount} items)</span>
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 mb-4">Your cart is empty.</p>
          <Link to="/products" className="text-green-700 font-semibold underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Items */}
          <div className="w-full lg:flex-[1.8] flex flex-col gap-4">
            {cart.map((item) => {
              const link = `/product/${slugify(item.name)}`;
              return (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-row gap-4 sm:gap-6 bg-white shadow-sm"
                >
                  <Link
                    to={link}
                    className="w-20 h-20 sm:w-28 sm:h-28 bg-[#f5f8fa] rounded-xl overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-900 text-base sm:text-[17px] truncate">
                          {item.name}
                        </h3>
                        <Link
                          to={link}
                          className="text-sm text-slate-500 font-medium hover:text-green-700"
                        >
                          View Product Details
                        </Link>
                      </div>

                      <div className="sm:text-right">
                        <div className="flex items-center gap-3 sm:justify-end">
                          <span className="text-xs line-through text-slate-500">
                            ₹{(item.oldPrice * item.qty).toFixed(2)}
                          </span>
                          <span className="text-sm text-green-700 font-semibold">
                            {getDiscount(item.price, item.oldPrice)}% off
                          </span>
                        </div>
                        <span className="font-semibold text-lg sm:text-xl text-slate-800">
                          ₹{(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-3 sm:mt-auto">
                      <div className="flex items-center border border-gray-200 rounded-full h-9 w-24 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => decreaseQty(item.id)}
                          disabled={item.qty === 1}
                          aria-label="Decrease quantity"
                          className="w-8 h-full flex items-center justify-center text-gray-500 disabled:opacity-50 hover:bg-gray-50"
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <div className="flex-1 flex justify-center items-center font-bold text-sm text-slate-800">
                          {item.qty}
                        </div>
                        <button
                          type="button"
                          onClick={() => increaseQty(item.id)}
                          aria-label="Increase quantity"
                          className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50"
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <i className="bi bi-trash3"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="w-full lg:flex-1 border border-gray-200 rounded-3xl p-5 sm:p-8 bg-white shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

            <div className="flex justify-between mb-3 text-slate-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3 text-slate-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between mb-3 text-slate-600">
              <span>Discount</span>
              <span>- ₹{discount.toFixed(2)}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-xl font-bold text-slate-900">
              <span>Total</span>
              <span className="text-green-700">₹{total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              className="w-full mt-6 bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-semibold transition-colors"
            >
              Proceed to Checkout
            </button>

            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-10 h-7 border border-slate-200 rounded flex items-center justify-center">
                  <i className="bi bi-credit-card"></i>
                </div>
                <div className="w-10 h-7 border border-slate-200 rounded flex items-center justify-center">
                  <i className="bi bi-credit-card-fill"></i>
                </div>
                <div className="w-10 h-7 border border-slate-200 rounded flex items-center justify-center">
                  <i className="bi bi-cash"></i>
                </div>
              </div>
              <p className="text-[10px] text-center text-slate-400 max-w-xs leading-relaxed">
                Secure checkout powered by IonMitrra. By proceeding, you agree to our{" "}
                <span className="underline cursor-pointer hover:text-slate-600">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="underline cursor-pointer hover:text-slate-600">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}