// @ts-nocheck
import { useContext } from "react";
import { CategoriesContext } from "@/contexts/categories.context";
import { Toaster } from "@/components/ui/toaster";
import CategoryPreview from "@/components/categoryPreview/category-preview.components";

interface Products {
  name: string;
  id: number;
  price: number;
  imageUrl: string;
}

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

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
