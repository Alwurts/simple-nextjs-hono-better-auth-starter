import { Hono } from "hono";
import type { HonoContext } from "@/types/hono";

const helloRoutes = new Hono<HonoContext>().get("/", async (c) => {
  return c.json({ message: "Hello, world!" });
});

export default helloRoutes;
