import { Router } from "express";
import { Todo } from "../models/todo";

let todos: Todo[] = [];

const router = Router();

type RequestBody = { text: String };
type RequestParams = { todoId: String };

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);
  res.status(200).json({ msg: "Added todo.", todo: newTodo, todos: todos });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  todos = todos.filter((item) => item.id !== params.todoId);
  res.status(200).json({ msg: "Deleted todo.", todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const body = req.body as RequestBody;
  const todoIndex = todos.findIndex((item) => item.id === params.todoId);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    res.status(200).json({ msg: "updated todo.", todos: todos });
    return;
  }
  res.status(400).json({ msg: "could not find todo." });
});

export default router;
