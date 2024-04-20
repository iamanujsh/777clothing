import { useContext } from "react";
import { CartContext } from "@/contexts/cart.context";

import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Checkout = () => {
  const { addItemToCart, cartItem, removeItemToCart, deleteItemFromCart } =
    useContext(CartContext);

  let totalAmount = cartItem
    .map((item) => item.quantity * item.price)
    .reduce((total, currentValue) => total + currentValue, 0);

  if (cartItem.length === 0) {
    return <></>;
  }

  return (
    <div className="flex justify-center mt-16 w-full h-screen ">
      <div>
        <Table className="w-[50vw]">
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItem.map((item) => {
              const { id, name, imageUrl, price, quantity } = item;
              return (
                <TableRow key={id} className="text-lg">
                  <TableCell>
                    <img src={imageUrl} alt="productImage" className="w-36" />
                  </TableCell>
                  <TableCell className="text-lg">{name}</TableCell>
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <span
                        className="cursor-pointer text-2xl"
                        onClick={() => removeItemToCart(item)}
                      >
                        <IoIosArrowDropleft />
                      </span>
                      <span>{quantity}</span>
                      <span
                        className="cursor-pointer text-2xl"
                        onClick={() => addItemToCart(item)}
                      >
                        <IoIosArrowDropright />
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>${price * quantity}</TableCell>
                  <TableCell
                    className="cursor-pointer text-2xl"
                    onClick={() => deleteItemFromCart(item)}
                  >
                    <MdDeleteOutline />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">${totalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Checkout;
