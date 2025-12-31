import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectBoxProps } from "@/types/mainTypes";

export const SelectBox = ({
  value,
  onValueChange,
  options,
  isLoading,
  placeholder = "Select an option",
  disabled,
  id,
}: SelectBoxProps) => {
  return (
    <Select
      value={value || ""}
      onValueChange={onValueChange}
      disabled={disabled || isLoading}
    >
      <SelectTrigger className="w-full" id={id}>
        <SelectValue placeholder={isLoading ? "Loading..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.name} value={opt.name}>
            {opt.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
