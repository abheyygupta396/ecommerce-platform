"use client";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../components/EmptyCart";
import {
  updateItem,
  removeItem,
  emptyCartItems,
} from "../redux/slices/cartSlice";
import { useMemo } from "react";

export default function CartItems() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart?.items);

  const handleUpdateQuantity = (id, newQuantity) =>
    dispatch(updateItem({ id, quantity: parseInt(newQuantity) }));

  const handleRemoveItem = (id) => dispatch(removeItem({ id }));

  const handleEmptyCart = () => dispatch(emptyCartItems());

  const calculateTotalPrice = (items) =>
    items.reduce((acc, it) => acc + it.quantity * it.price, 0);

  const cacheResult = useMemo(
    () => calculateTotalPrice(cartItems),
    [cartItems]
  );

  return (
    <>
      {cartItems?.length > 0 ? (
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
          <div className="space-y-4">
            {cartItems?.map((item) => (
              <div key={item.id} className="flex items-center border-b pb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="object-cover mr-4"
                />
                <div className="flex-grow">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-600">White</p>
                </div>
                <div className="flex items-center">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 mr-4"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <span className="font-semibold mr-4">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span className="font-semibold">₹{cacheResult?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Order total</span>
              <span>₹{cacheResult?.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleEmptyCart}
            className="w-full bg-indigo-600 text-white py-3 rounded-md mt-6 hover:bg-indigo-700"
          >
            Empty Cart
          </button>
          <div className="text-center mt-4">
            <Link href="/products" className="text-blue-600 hover:underline">
              or Continue Shopping →
            </Link>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
