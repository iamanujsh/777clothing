// @ts-nocheck
import { createContext, useState, useEffect } from "react";

// import { addCollectionAndDocuments } from "@/utils/firebase/firebase.util";
import { getCategoriesAndDocuments } from "@/utils/firebase/firebase.util";

interface Category {
  name: string;
  id: number;
  price: number;
  imageUrl: string;
}

interface CategoriesMap {
  [categoryTitle: string]: Category[]; // Key is a string, value is an array of Category objects
}

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categoriesMap, setcategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      // console.log(categoryMap);
      setcategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap, setcategoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
