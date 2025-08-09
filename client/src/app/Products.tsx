"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addToCart } from "@/lib/cartslice";
import { useAppDispatch } from "@/lib/store";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Products {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
}

const Products = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        "https://h150bglm1c.execute-api.us-east-1.amazonaws.com/dev/products"
      );
      const data = (await res.json()) as {
        products: Products[];
      };
      console.log({ data: data.products });
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  console.log("products", products);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Input
          placeholder="Search"
          // value={formData.email}
          // onChange={emailHandler}
          className="flex gap-2"
        />
        {/* <Button type="submit">Search</Button> */}
      </div>

      <div className="grid grid-cols-4">
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <img src={product.imageUrl} />

            {/* <Image
              src={product.images[0]}
              alt={product.title}
              width={200}
              height={200}
            /> */}
            <button
              className="cursor-pointer"
              onClick={() => {
                dispatch(addToCart(product));
              }}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
