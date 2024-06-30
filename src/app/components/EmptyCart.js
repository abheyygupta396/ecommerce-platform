import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
      <div className="rounded-lg p-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">Your Cart is Empty.</h1>
        <p className="text-gray-600"></p>
        <div className="text-center mt-4">
          <Link href="/products" className="text-blue-600 hover:underline">
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
}
