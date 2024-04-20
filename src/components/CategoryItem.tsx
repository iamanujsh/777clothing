import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";

import { useNavigate } from "react-router-dom";

interface Props {
  category: { id: number; title: string; imageUrl: string };
}

const CategoryItem = ({ category }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`shop/${category.title}`);
  };
  return (
    <Card key={category.id} className="w-fit h-fit">
      <CardContent className="category-container">
        <img
          src={category.imageUrl}
          alt="cards"
          className="h-72 w-96 bg-contain pt-8"
        />
        <div className="category-body-container py-7 font-semibold  justify-between items-center flex ">
          <h2 className="text-xl">{category.title.toUpperCase()}</h2>
          <Button onClick={handleNavigate}>Shop Now</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryItem;
