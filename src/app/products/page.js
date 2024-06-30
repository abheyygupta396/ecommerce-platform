import Card from "../components/Card";
import { Toaster } from "react-hot-toast";

async function fetchProducts() {
  const res = await fetch(
    "https://dummyjson.com/products?select=title,price,thumbnail",
    {
      cache: "no-store", // using-SSR as getServerSideProps (updated after next.js 13)
    }
  );
  const products = await res.json();
  return { list: products };
}

export default async function Products() {
  const { list } = await fetchProducts();
  const updatedQuantityList = list["products"]?.map((it) => {
    return {
      ...it,
      quantity: 1,
    };
  });
  return (
    <>
      <Toaster />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {updatedQuantityList?.map((product) => (
            <div key={product.id}>
              <Card
                id={product.id}
                src={product.thumbnail}
                title={product.title}
                price={product.price}
                quantity={product.quantity}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
