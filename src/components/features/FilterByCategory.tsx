import { SelectBox } from "../custom/SelectBox";
import { useCategoriesQuery } from "@/hooks/useCategoriesQuery";

const FilterByCategory = ({
  onCategoryChange,
  value,
}: {
  value?: string;
  onCategoryChange: (category: string) => void;
}) => {
  const { data: categories = [], isLoading } = useCategoriesQuery();

  const options = [
    { name: "all", description: "All categories" },
    ...categories,
  ];

  return (
    <SelectBox
      options={options}
      isLoading={isLoading}
      onValueChange={(value) => onCategoryChange(value)}
      placeholder="Select a category"
      value={value}
    />
  );
};

export default FilterByCategory;
