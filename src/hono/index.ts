import { Hono } from "hono";
import { cors } from "hono/cors";
import { BASE_URL } from "@/lib/config";
import protectedRoutes from "./routes/protected";

export const app = new Hono().basePath("/api").use(
	"*",
	cors({
		origin: BASE_URL,
		allowMethods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
		allowHeaders: ["Content-Type", "Authorization"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

const routes = app.route("/", protectedRoutes);

export type AppType = typeof routes;
