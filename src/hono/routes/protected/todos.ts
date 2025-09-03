import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type { HonoContextWithAuth } from "@/types/hono";

const todos = [
  {
    id: "1",
    title: "Todo 1",
    description: "Description 1",
    completed: false,
  },
  {
    id: "2",
    title: "Todo 2",
    description: "Description 2",
    completed: false,
  },
  {
    id: "3",
    title: "Todo 3",
    description: "Description 3",
    completed: false,
  },
  {
    id: "4",
    title: "Todo 4",
    description: "Description 4",
    completed: false,
  },
];

const todosRoutes = new Hono<HonoContextWithAuth>()
  .get("/", async (c) => {
    try {
      return c.json(todos);
    } catch (error) {
      console.error("Get todos error:", error);
      return c.json({ error: "Failed to fetch todos" }, 500);
    }
  })
  .get("/:todoId", async (c) => {
    const todoId = c.req.param("todoId");
    const todo = todos.find((todo) => todo.id === todoId);
    if (!todo) {
      return c.json({ error: "Todo not found" }, 404);
    }
    return c.json(todo);
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        completed: z.boolean(),
      }),
    ),
    async (c) => {
      const { title, description, completed } = c.req.valid("json");
      const todo = {
        id: (todos.length + 1).toString(),
        title,
        description,
        completed,
      };
      todos.push(todo);
      return c.json(todo);
    },
  );

export default todosRoutes;
