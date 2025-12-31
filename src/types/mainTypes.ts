interface Product {
  id: string;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  imageUrl: string | null;
  category: string | null;
}

interface AlertDialogBoxType {
  trigger: React.ReactNode;
  title: string;
  description: string;
  actionName: string;
  action: () => void;
}

interface DialogFormBoxType {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

interface SelectBoxProps {
  value?: string;
  onValueChange: (value: string) => void;
  options: { name: string }[];
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: string;
    imageUrl: string | null;
  };
}

export type {
  Product,
  AlertDialogBoxType,
  DialogFormBoxType,
  SelectBoxProps,
  CartItem,
};
