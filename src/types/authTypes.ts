interface UserType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  role: string;
}

interface UserWithRole {
  role?: "admin" | "user";
}

export type { UserWithRole, UserType };
