"use client";

// Import necessary dependencies
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateItem } from "../redux/slices/cartSlice";
import toast, { Toaster } from "react-hot-toast";

//! Component for add/update cart items
export const CounterButtons = ({ id, title, price, image }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items ?? []);
  const findItem = cartItems.find((it) => id === it.id);

  //! Handler for adding item to cart
  const handleAddToCart = useCallback(() => {
    dispatch(addItem({ id, title, price, image, quantity: 1 }));
    toast.success("Item added to cart!");
  }, [dispatch, id, title, price, image]);

  //! Handler for updating item quantity in cart
  const handleUpdateQuantity = useCallback(
    (action) => {
      if (findItem.quantity === 1 && action === "decrement") {
        dispatch(removeItem({ id }));
      } else if (findItem.quantity === 0 && action === "decrement") {
        toast.error("At least 1 item needed");
      } else if (findItem.quantity === 10 && action === "increment") {
        toast.error("Can't add more than 10 items");
      } else {
        const newQuantity =
          action === "decrement"
            ? findItem.quantity - 1
            : findItem.quantity + 1;
        dispatch(updateItem({ id, quantity: newQuantity }));
      }
    },
    [dispatch, findItem, id]
  );

  //! Render quantity update buttons if item is in cart
  return findItem?.quantity > 0 ? (
    <div className="flex flex-row h-8 rounded-lg relative bg-transparent mt-1 w-[100px]">
      <Toaster />
      <button
        onClick={() => handleUpdateQuantity("decrement")}
        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
      >
        <span className="m-auto text-2xl font-thin">−</span>
      </button>
      <span className="outline-none focus:outline-none text-center bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700">
        {findItem.quantity}
      </span>
      <button
        onClick={() => handleUpdateQuantity("increment")}
        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
      >
        <span className="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  ) : (
    <button // Render add to cart button if item is not in cart
      onClick={handleAddToCart}
      className="w-[100px] h-10 whitespace-nowrap flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      Add Item
    </button>
  );
};
