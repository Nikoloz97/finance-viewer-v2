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
import { post } from "@/app/utils/http-request-service";

export default function Login() {
  const { setUser } = useContextCheck();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (loginFields: z.infer<typeof loginFormSchema>) => {
    const response = await post(loginFields, "/api/user/login");

    const responseJson = await responseMessage(response);

    if (response.ok) {
      router.push("/");
      setUser(responseJson.user);
    }
  };

  return (
    <div className="Login-Form">
      <h1>Welcome Back</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username:</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TODO: eventually build this out  */}
          {/* <FormField className="Remember-Forgot-Container">
            <Checkbox label="Remember me" />
            <Link style={{ color: "white" }} to={"/user/forgot-password"}>
              Forgot Password?
            </Link>
          </FormField> */}

          <div className="Login-Button-Container">
            <Button className="dark" type="submit">
              Login
            </Button>
          </div>
        </form>
      </Form>

      <Link className="No-Account-Container" href={"/user/signup"}>
        {`Don't have an account? Sign up here`}
      </Link>
    </div>
  );
}
