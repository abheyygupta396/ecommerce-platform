"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItem, initializeCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Card({ id, src, title, price, quantity }) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const newItem = {
      id: id,
      title: title,
      price: price,
      image: src,
      quantity: quantity,
    };
    dispatch(addItem(newItem));
    toast.success("Item added to cart!");
  };

  // initialize the cart:
  useEffect(() => {
    dispatch(initializeCart());
  }, []);
  return (
    <>
      <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <div className="relative h-[250px] mx-3 mt-3 flex w-25 overflow-hidden rounded-xl">
          <Image
            src={src}
            alt={title}
            width={300}
            height={150}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-2 mt-4 px-5 pb-5">
          <h6 className="truncate text-slate-900">{title}</h6>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900">
                ₹{price}
              </span>
            </p>
          </div>
          <div
            role="button"
            onClick={handleAddToCart}
            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to cart
          </div>
        </div>
      </div>
    </>
  );
}
