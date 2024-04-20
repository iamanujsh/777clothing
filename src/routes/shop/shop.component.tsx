import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categoriesPreview/categories-preview.route";
import Category from "../category/category.compoent";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
