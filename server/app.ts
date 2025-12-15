import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "../src/lib/auth";

const app = new Hono();

app.use(
  "/api/auth/*",
  cors({
    origin: [process.env.BASE_URL!],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export default app;
