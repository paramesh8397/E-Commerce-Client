"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addToCart } from "@/lib/cartslice";
import { useAppDispatch } from "@/lib/store";
import { useEffect, useState } from "react";

interface Products {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  category: string;
}

const Products = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://av7exfnoz1.execute-api.us-east-1.amazonaws.com/dev/products"
        );
        const data = (await res.json()) as {
          products: Products[];
        };
        console.log({ data: data.products });
        setProducts(data.products);
      } catch (e) {
        setError(true);
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return <p className="text-red-400">Error getting products</p>;
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Input placeholder="Search" className="flex gap-2" />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {products.length > 0 &&
          products.map((product) => (
            <div key={product.id} className="border shadow-md p-5">
              <h1 className="font-bold text-center">{product.name}</h1>
              <img src={product.imageUrl} />
              <div className="flex justify-center">
                <Button
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(addToCart({ ...product, quantity: 1 }));
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
