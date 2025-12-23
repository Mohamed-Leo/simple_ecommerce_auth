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
  actionName: string;
  action: () => void;
  children?: React.ReactNode;
}

export type { Product, AlertDialogBoxType, DialogFormBoxType };
