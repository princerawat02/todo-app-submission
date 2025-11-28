import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
} from "../api/todoApi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Link, useNavigate } from "react-router-dom";
import { api } from "@/api/axiosClient";

export default function Home() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [editTodo, setEditTodo] = useState<any>(null);

  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    logout();
    navigate("/auth");
  };

  // Fetch todos
  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setTitle("");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setEditTodo(null);
    },
  });

  const handleAdd = () => {
    if (!title.trim()) return;
    addMutation.mutate({ title });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center ">
      <div>
        <Link to="/">
          {" "}
          <h2 className="absolute top-4 left-8 text-lg font-bold uppercase">
            Todo_App
          </h2>
        </Link>
      </div>

      <div className="w-full max-w-md flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="cursor-pointer"
        >
          Logout
        </Button>
      </div>

      <h1 className="text-xl font-semibold mb-6">Welcome, {user?.name} 👋</h1>

      <div className="max-w-md w-full p-4 border rounded-lg bg-white mb-6">
        <div className="flex gap-2">
          {addMutation.isPending ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              placeholder="Enter todo..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          )}

          {addMutation.isPending ? (
            <Button disabled>
              <Skeleton className="h-4 w-10 cursor-pointer" />
            </Button>
          ) : (
            <Button onClick={handleAdd} className="cursor-pointer">
              Add
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-md w-full space-y-3">
        {isLoading && (
          <>
            <Card className="p-4 flex justify-between items-center">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-8 w-16" />
            </Card>
            <Card className="p-4 flex justify-between items-center">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-8 w-16" />
            </Card>
          </>
        )}

        {!isLoading && todos.length === 0 && <p>No todos yet.</p>}

        {!isLoading &&
          todos.map((todo) => (
            <Card
              key={todo._id}
              className="flex justify-between items-center p-4 bg-white border"
            >
              <span
                onClick={() => toggleMutation.mutate(todo._id)}
                className={`cursor-pointer ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </span>

              <div className="flex gap-2">
                <Dialog
                  open={!!editTodo}
                  onOpenChange={(open) => !open && setEditTodo(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditTodo(todo)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Todo</DialogTitle>
                    </DialogHeader>

                    <Input
                      value={editTodo?.title || ""}
                      onChange={(e) =>
                        setEditTodo((prev: any) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />

                    <DialogFooter>
                      <Button
                        disabled={updateMutation.isPending}
                        onClick={() =>
                          updateMutation.mutate({
                            id: editTodo._id,
                            title: editTodo.title,
                          })
                        }
                      >
                        {updateMutation.isPending ? "Saving..." : "Save"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(todo._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
