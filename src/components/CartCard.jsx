import React from "react";

import { getDiscount } from "../utils/discount";
import { useCartContext } from "../context/CartContext";

function CartCard() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCartContext();

  console.log(cart);

  const subtotal = cart.reduce((s, i) => s + i.oldPrice * i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = subtotal - total;
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 bg-white min-h-screen">
      <h1 className="text-3xl font-medium text-slate-800 mb-8 tracking-tight">
        Your Cart
        <span className="text-slate-400 font-normal"> ({itemCount} items)</span>
      </h1>

      {cart.length === 0 ? (
        <p className="text-slate-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="w-full lg:flex-[1.8] flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 sm:h-28 bg-[#f5f8fa] rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mt-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-[17px]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium pb-4 cursor-pointer">
                        View Product Details
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-6">
                        <span className="text-xs line-through text-slate-800">
                          ₹{item.oldPrice.toFixed(2) * item.qty}
                        </span>
                        <span className="text-sm text-slate-800 font-semibold">
                          {getDiscount(item.price, item.oldPrice)}% off
                        </span>
                        
                      </div>
                      <span className="font-semibold text-xl text-slate-800 float-right mt-2">
                        ₹{item.price.toFixed(2) * item.qty}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center border border-gray-200 rounded-full h-9 w-24 overflow-hidden">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        disabled={item.qty === 1}
                        className="w-8 h-full flex items-center justify-center text-gray-500 disabled:opacity-50 hover:bg-gray-50"
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <div className="flex-1 flex justify-center items-center font-bold text-sm text-slate-800">
                        {item.qty}
                      </div>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <i className="bi bi-trash3"></i>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:flex-1 border border-gray-200 rounded-3xl p-6 sm:p-8 bg-white shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Order Summary
            </h2>

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

            <button className="w-full mt-6 bg-green-700 text-white py-3 rounded-full font-semibold">
              Proceed to Checkout
            </button>
            <div className="mt-6 flex flex-col  item-center gap-4">
                <div className="flex item-center gap-3 text-state-400">
                    <div className="w-10 h-7 border border-slate-200 rounded px-1 flex item-center justify-center"><i className="bi bi-credit-card"></i></div>
                    <div className="w-10 h-7 border border-slate-200 rounded px-1 flex item-center justify-center"><i className="bi bi-credit-card-fill"></i></div>
                    <div className="w-10 h-7 border border-slate-200 rounded px-1 flex item-center justify-center"><i className="bi bi-cash"></i></div>
                </div>
                <p className="text-[10px] text-center text-slate-400 mx-w-xs leading-relaxed">
                    Secure checkout powered by E-Shop. By proceeding, you agree to our
                    <span className="underline hover:text-slate-600 cursor-pointer"> Term Of Service </span>
                     and 
                    <span className="underline hover:text-slate-600 cursor-pointer"> Privacy Policy </span>
                    .
                </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartCard;
