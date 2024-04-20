import { FiShoppingCart } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

import { useContext } from "react";
import { CartContext } from "@/contexts/cart.context";
import { Link } from "react-router-dom";

interface CartItem {
  id: number;
  imageUrl: string;
  name: string;
  quantity: number;
  price: number;
}

const CardDropDown = () => {
  const { cartItem } = useContext(CartContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="flex items-center gap-3 hover:text-neutral-400">
          <FiShoppingCart className="w-7 h-7" /> <span>Cart</span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div>
          {cartItem.length === 0 && (
            <span className="p-3">Add Items To Cart 😄</span>
          )}
          {cartItem.map((item: CartItem) => (
            <DropdownMenuItem key={item.id}>
              <div className="flex justify-center items-center">
                <img
                  src={item.imageUrl}
                  alt="productImage"
                  className="w-14 h-14 rounded-2xl"
                />
                <div className="pl-2">
                  <h1>{item.name}</h1>
                  <span>
                    {item.quantity} x ${item.price}
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuItem className="justify-center">
          <Link to="checkout">
            <Button>GO TO CHECKOUT</Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardDropDown;
