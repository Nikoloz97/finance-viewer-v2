"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContextCheck } from "@/use-context-check";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginFormSchema } from "../form-schemas";
import "../user.css";
import { responseMessage } from "@/app/utils/default-response-message";
import LoadingOverlay from "@/app/utils/loading-overlay/loading-overlay";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LockKeyhole, User } from "lucide-react";
import { useHttpService } from "../../../hooks/use-http-service";
import { useDemo } from "@/demo-context";

export default function Login() {
  const { setUser } = useContextCheck();
  const router = useRouter();
  const httpService = useHttpService();
  const { startDemo, exitDemo } = useDemo();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleStartDemo = () => {
    startDemo();
    router.push("/dashboard");
  };

  const handleLogin = async (loginFields: z.infer<typeof loginFormSchema>) => {
    setIsLoading(true);
    // in case demo mode wasn't exited properly
    if (localStorage.getItem("demoMode")) {
      exitDemo();
    }
    const response = await httpService.post(
      loginFields,
      "/api/user/login",
      "user"
    );

    if (response) {
      const responseJson = await responseMessage(response);

      if (response.ok) {
        router.push("/dashboard");
        setUser(responseJson.user);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full">
      {isLoading && <LoadingOverlay />}

      <Card className="w-full max-w-md shadow-lg bg-transparent">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Finance Viewer
          </CardTitle>
          <CardDescription className="text-center">
            Please enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" type="password" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Link
                  href="/user/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="w-full text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/user/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up here
            </Link>
          </div>
        </CardFooter>
      </Card>
      <Button onClick={handleStartDemo}>Start Demo</Button>
    </div>
  );
}
