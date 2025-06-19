import { Router } from "express";
import { Todo } from "../models/todo";

let todos: Todo[] = [];

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };
  todos.push(newTodo);
  res.status(200).json({ msg: "Added todo.", todo: newTodo, todos: todos });
});

router.delete("/todo/:todoId", (req, res, next) => {
  todos = todos.filter((item) => item.id !== req.params.todoId);
  res.status(200).json({ msg: "Deleted todo.", todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const todoIndex = todos.findIndex((item) => item.id === req.params.todoId);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    res.status(200).json({ msg: "updated todo.", todos: todos });
    return;
  }
  res.status(400).json({ msg: "could not find todo." });
});

export default router;
