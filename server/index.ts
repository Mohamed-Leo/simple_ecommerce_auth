import "dotenv/config";
import { serve } from "@hono/node-server";
import app from "./app";

serve({
  fetch: app.fetch,
  port: 3000,
});
console.log("Auth server running on", process.env.BETTER_AUTH_URL);
