import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./auth";

import { db } from "../db/drizzel";
import { product, category as categoryTable } from "../db/schema";
import { eq } from "drizzle-orm";

const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: [process.env.BASE_URL!],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PATCH"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true, // Access-Control-Allow-Credentials
  })
);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/api/products", async (c) => {
  try {
    const products = await db
      .select({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
        category: categoryTable.name,
      })
      .from(product)
      .leftJoin(categoryTable, eq(product.categoryId, categoryTable.name));
    return c.json(products);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch products" }, 500);
  }
});

app.delete("/api/products/:id", async (c) => {
  const id = c.req.param("id");
  try {
    await db.delete(product).where(eq(product.id, id));
    return c.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to delete product" }, 500);
  }
});

app.patch("/api/products/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  try {
    await db.update(product).set(body).where(eq(product.id, id));
    return c.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to update product" }, 500);
  }
});

export default app;
