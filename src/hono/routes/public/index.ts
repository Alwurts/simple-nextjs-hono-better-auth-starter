import { Hono } from "hono";
import type { HonoContext } from "@/types/hono";
import { honoAuthMiddleware } from "../../middleware/auth";
import helloRoutes from "./hello";

const publicRoutes = new Hono<HonoContext>()
	.use(honoAuthMiddleware)
	.route("/hello", helloRoutes);

export default publicRoutes;
