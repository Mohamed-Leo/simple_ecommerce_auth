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

app.post("/api/products", async (c) => {
  const body = await c.req.json();
  try {
    const id = crypto.randomUUID();
    await db.insert(product).values({
      id,
      ...body,
    });
    return c.json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to add product" }, 500);
  }
});

app.get("/api/categories", async (c) => {
  try {
    const categories = await db.select().from(categoryTable);
    return c.json(categories);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch categories" }, 500);
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

import { cartItem } from "../db/schema";
import { and } from "drizzle-orm";

app.get("/api/cart", async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) return c.json({ error: "Unauthorized" }, 401);

  try {
    const items = await db
      .select({
        id: cartItem.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
        },
      })
      .from(cartItem)
      .where(eq(cartItem.userId, session.user.id))
      .leftJoin(product, eq(cartItem.productId, product.id));

    return c.json(items);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch cart" }, 500);
  }
});

app.post("/api/cart", async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) return c.json({ error: "Unauthorized" }, 401);

  const { productId, quantity } = await c.req.json();

  try {
    // Check if item already exists
    const existing = await db
      .select()
      .from(cartItem)
      .where(
        and(
          eq(cartItem.userId, session.user.id),
          eq(cartItem.productId, productId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(cartItem)
        .set({ quantity: existing[0].quantity + (quantity || 1) })
        .where(eq(cartItem.id, existing[0].id));
    } else {
      await db.insert(cartItem).values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        productId,
        quantity: quantity || 1,
      });
    }

    return c.json({ message: "Product added to cart" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to add to cart" }, 500);
  }
});

app.patch("/api/cart/:id", async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) return c.json({ error: "Unauthorized" }, 401);

  const id = c.req.param("id");
  const { quantity } = await c.req.json();

  try {
    await db
      .update(cartItem)
      .set({ quantity })
      .where(and(eq(cartItem.id, id), eq(cartItem.userId, session.user.id)));
    return c.json({ message: "Cart updated" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to update cart" }, 500);
  }
});

app.delete("/api/cart/:id", async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) return c.json({ error: "Unauthorized" }, 401);

  const id = c.req.param("id");

  try {
    await db
      .delete(cartItem)
      .where(and(eq(cartItem.id, id), eq(cartItem.userId, session.user.id)));
    return c.json({ message: "Item removed" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to remove item" }, 500);
  }
});

export default app;
