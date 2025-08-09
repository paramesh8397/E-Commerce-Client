"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAppSelector } from "@/lib/store";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const cart = useAppSelector((state) => state.cart);
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="flex justify-between p-4">
      <p>Menu</p>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-blue-500 flex gap-2 rounded-full p-2 cursor-pointer"
            onClick={() => {
              setShowCart(true);
            }}
          >
            <ShoppingCart />
            <p>{cart.items.length}</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {cart?.items?.length > 0 ? (
            <div>
              {cart?.items?.map((item) => (
                <div className="flex items-center gap-2" key={item.id}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-[150px] h-[150px]"
                  />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>Quantity:{item.quantity}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>No items found</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
