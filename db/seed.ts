import "dotenv/config";
import { db } from "./drizzel";
import { user, product } from "./schema";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  // 1. Create Admin User
  const adminEmail = "admin@example.com";
  const existingAdmin = await db
    .select()
    .from(user)
    .where(eq(user.email, adminEmail))
    .limit(1);

  if (existingAdmin.length === 0) {
    console.log("Creating admin user...");
    await db.insert(user).values({
      id: "admin-1", // Better Auth usually generates IDs, but we can manually set one for the first admin
      name: "Admin User",
      email: adminEmail,
      emailVerified: true,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("✅ Admin user created: admin@example.com");
  } else {
    console.log("ℹ️ Admin user already exists.");
  }

  // 2. Create Initial Products
  const existingProducts = await db.select().from(product).limit(1);
  if (existingProducts.length === 0) {
    console.log("Creating dummy products...");
    await db.insert(product).values([
      {
        id: "prod-1",
        name: "Premium Wireless Headphones",
        description: "High-quality sound with noise-canceling technology.",
        price: "199.99",
        stock: 50,
        category: "Electronics",
      },
      {
        id: "prod-2",
        name: "Ergonomic Office Chair",
        description: "Comfortable chair designed for long working hours.",
        price: "249.50",
        stock: 20,
        category: "Furniture",
      },
      {
        id: "prod-3",
        name: "Mechanical Keyboard",
        description: "RGB backlit keyboard with tactile switches.",
        price: "129.00",
        stock: 35,
        category: "Peripherals",
      },
    ]);
    console.log("✅ Dummy products created.");
  } else {
    console.log("ℹ️ Products already exist.");
  }

  console.log("✨ Seeding completed!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:");
  console.error(err);
  process.exit(1);
});
