import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/axiosClient";
import { useAuthStore } from "../store/authStore";

// shadcn components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton"; // ⭐ skeleton added here

// Zod schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
});

export default function Auth() {
  const [type, setType] = useState<"login" | "signup">("login");
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const form = useForm<any>({
    resolver: zodResolver(type === "login" ? loginSchema : signupSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      if (type === "login") {
        const res = await api.post("/auth/login", values);
        return res.data;
      } else {
        const res = await api.post("/auth/signup", values);
        return res.data;
      }
    },
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/");
    },
    onError: () => alert("Failed"),
  });

  const loading = mutation.isPending; // for cleaner conditions

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div>
        {/* You can add a logo or header here if needed */}
        <Link to="/">
          {" "}
          <h2 className="absolute top-4 left-8 text-lg font-bold uppercase">
            Todo_App
          </h2>
        </Link>
      </div>
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            {loading ? (
              <Skeleton className="h-6 w-32 mx-auto" />
            ) : type === "login" ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit((v) => mutation.mutate(v))}
            className="flex flex-col gap-5"
          >
            {/* Signup only name field */}
            {type === "signup" && (
              <div className="flex flex-col gap-1">
                <Label>Name</Label>

                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Input {...form.register("name")} placeholder="Your name" />
                )}
              </div>
            )}

            {/* Email field */}
            <div className="flex flex-col gap-1">
              <Label>Email</Label>

              {loading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Input
                  {...form.register("email")}
                  placeholder="example@gmail.com"
                />
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <Label>Password</Label>

              {loading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Input
                  {...form.register("password")}
                  type="password"
                  placeholder="Password"
                />
              )}
            </div>

            {/* Forgot password link */}
            {type === "login" && (
              <p className=" text-sm  ml-1">
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => navigate("/forgot")}
                >
                  Forgot password?
                </span>
              </p>
            )}

            {/* Button skeleton */}
            {loading ? (
              <Button disabled className="w-full">
                <Skeleton className="h-5 w-20 mx-auto" />
              </Button>
            ) : (
              <Button className="w-full cursor-pointer" type="submit">
                {type === "login" ? "Login" : "Signup"}
              </Button>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex justify-center text-sm">
          {loading ? (
            <Skeleton className="h-4 w-40" />
          ) : type === "login" ? (
            <p>
              No account?{" "}
              <span
                onClick={() => setType("signup")}
                className="text-blue-600 cursor-pointer"
              >
                Signup
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setType("login")}
                className="text-blue-600 cursor-pointer"
              >
                Login
              </span>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
