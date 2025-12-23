import "dotenv/config";
import { db } from "./drizzel";
import { product, category as categoryTable } from "./schema";
import { eq } from "drizzle-orm";

async function productSeeder() {
  console.log("🌱 Seeding categories and products...");

  // 1. Create Initial Categories
  const categories = [
    { name: "Electronics", description: "Gadgets and devices" },
    {
      name: "Furniture",
      description: "Home and office furniture",
    },
    {
      name: "Peripherals",
      description: "Computer accessories and add-ons",
    },
  ];

  for (const cat of categories) {
    const existingCat = await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.name, cat.name))
      .limit(1);
    if (existingCat.length === 0) {
      console.log(`Creating category: ${cat.name}`);
      await db.insert(categoryTable).values(cat);
    }
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
        categoryId: "Electronics",
      },
      {
        id: "prod-2",
        name: "Ergonomic Office Chair",
        description: "Comfortable chair designed for long working hours.",
        price: "249.50",
        stock: 20,
        categoryId: "Furniture",
      },
      {
        id: "prod-3",
        name: "Mechanical Keyboard",
        description: "RGB backlit keyboard with tactile switches.",
        price: "129.00",
        stock: 35,
        categoryId: "Peripherals",
      },
    ]);
    console.log("✅ Dummy products created.");
  } else {
    console.log("ℹ️ Products already exist.");
  }

  console.log("✨ Seeding completed!");
}

productSeeder().catch((err) => {
  console.error("❌ Seeding failed:");
  console.error(err);
  process.exit(1);
});
