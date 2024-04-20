import { useContext } from "react";
import { CategoriesContext } from "@/contexts/categories.context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/contexts/cart.context";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import CategoryPreview from "@/components/categoryPreview/category-preview.components";

interface Products {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  const { addItemToCart, cartItem } = useContext(CartContext);

  const handleClick = (product) => {
    addItemToCart(product);
    toast({
      title: `${product.name}, Add to Cart Succesfully`,
    });
  };

  return (
    <>
      <div>
        {Object.keys(categoriesMap).map((title) => (
          <CategoryPreview
            key={title}
            title={title}
            products={categoriesMap[title]}
          />
        ))}
      </div>
      <Toaster />
    </>
  );
};

export default CategoriesPreview;
