import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { toast } from "../ui/use-toast";
import { CartContext } from "@/contexts/cart.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

interface Products {
  name: string;
  id: number;
  price: number;
  imageUrl: string;
}

interface Props {
  title: string;
  products: Products[];
}

const CategoryPreview = ({ title, products }: Props) => {
  const { addItemToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/shop/${title}`);
  };

  const handleClick = (product: Products) => {
    addItemToCart(product);
    toast({
      title: `${product.name}, Add to Cart Succesfully`,
    });
  };
  return (
    <div>
      <h2 className=" mt-9 p-7 text-3xl font-semibold">
        <span className="cursor-pointer" onClick={handleNavigate}>
          {title.toUpperCase()}
        </span>
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-y-16 p-5">
        {products.slice(0, 4).map((product) => (
          <Card key={product.id} className="w-fit p-4 ">
            <img
              src={product.imageUrl}
              alt=""
              className="w-[300px] h-[350px] rounded-lg"
            />
            <div className="flex justify-between mt-5 ">
              <h1 className="text-xlproduct?: Productsproduct: Products mt-2">
                {product.name}
              </h1>
              <Button onClick={() => handleClick(product)}>Add To Cart</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
