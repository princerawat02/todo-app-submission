import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/axiosClient";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotForm = z.infer<typeof schema>;

export default function ForgotPassword() {
  const form = useForm<ForgotForm>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ForgotForm) => {
      const res = await api.post("/auth/forgot", data);
      return res.data;
    },
    onSuccess: () => {
      alert("If this email exists, a reset link has been sent.");
    },
    onError: () => {
      alert("Error sending reset link. Please check your email and try again.");
    },
  });

  const onSubmit = (values: ForgotForm) => {
    mutation.mutate(values);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Forgot Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <Label>Email</Label>
              <Input
                {...form.register("email")}
                placeholder="you@example.com"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
