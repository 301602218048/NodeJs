"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(200).json({ msg: "Added todo.", todo: newTodo, todos: todos });
});
router.delete("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    todos = todos.filter((item) => item.id !== params.todoId);
    res.status(200).json({ msg: "Deleted todo.", todos: todos });
});
router.put("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    const body = req.body;
    const todoIndex = todos.findIndex((item) => item.id === params.todoId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        res.status(200).json({ msg: "updated todo.", todos: todos });
        return;
    }
    res.status(400).json({ msg: "could not find todo." });
});
exports.default = router;
