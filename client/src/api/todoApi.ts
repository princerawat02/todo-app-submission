import { api } from "./axiosClient";

export const getTodos = async () => {
  const res = await api.get("/todos");
  return res.data.todos;
};

export const updateTodo = async (data: { id: string; title: string }) => {
  const res = await api.put(`/todos/${data.id}`, { title: data.title });
  return res.data.todo;
};

export const addTodo = async (data: { title: string }) => {
  const res = await api.post("/todos", data);
  return res.data.todo;
};

export const toggleTodo = async (id: string) => {
  const res = await api.patch(`/todos/${id}/toggle`);
  return res.data.todo;
};

export const deleteTodo = async (id: string) => {
  const res = await api.delete(`/todos/${id}`);
  return res.data;
};
