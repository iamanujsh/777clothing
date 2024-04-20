// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "@/contexts/categories.context";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/contexts/cart.context";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Category = () => {
  const routeUrl = useParams();
  const { category } = routeUrl;
  const { categoriesMap } = useContext(CategoriesContext);
  const { addItemToCart } = useContext(CartContext);

  const handleClick = (product) => {
    addItemToCart(product);
    toast({
      title: `${product.name}, Add to Cart Succesfully`,
    });
  };

  const [product, setProducts] = useState([]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [Category, categoriesMap]);

  return (
    <div>
      <h1 className=" mt-9 p-7 text-3xl font-semibold">
        {category?.toUpperCase()}
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-y-16 p-5">
        {product &&
          product.map((product) => (
            <Card key={product.id} className="w-fit p-4 ">
              <img
                src={product.imageUrl}
                alt=""
                className="w-[300px] h-[350px] rounded-lg"
              />
              <div className="flex justify-between mt-5 ">
                <h1 className="text-xl mt-2">{product.name}</h1>
                <Button onClick={() => handleClick(product)}>
                  Add To Cart
                </Button>
              </div>
            </Card>
          ))}
        <Toaster />
      </div>
    </div>
  );
};

export default Category;
