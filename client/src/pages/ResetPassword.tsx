import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const schema = z
  .object({
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetForm = z.infer<typeof schema>;

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const form = useForm<ResetForm>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: { password: string }) => {
      const res = await api.post(`/auth/reset/${token}`, data);
      return res.data;
    },
    onSuccess: () => {
      alert("Password reset successful! Please login.");
      navigate("/auth");
    },
    onError: () => {
      alert("Invalid or expired link.");
    },
  });

  const onSubmit = (values: ResetForm) => {
    mutation.mutate({ password: values.password });
  };

  if (!token) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p>Invalid reset link.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Reset Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <Label>New Password</Label>
              <Input
                type="password"
                {...form.register("password")}
                placeholder="New password"
              />
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                {...form.register("confirmPassword")}
                placeholder="Confirm password"
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
