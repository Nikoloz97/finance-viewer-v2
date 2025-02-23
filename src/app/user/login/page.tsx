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
import { UseContextCheck } from "@/usecontextcheck";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginFormSchema } from "../formSchemas";

export default function Login() {
  const { setUser } = UseContextCheck();
  const router = useRouter();

  const [error, setError] = useState({
    isErrorFadingIn: false,
    isErrorFadingOut: false,
    isErrorShowing: false,
    message: "",
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // TODO: make sure this works
  const onSubmit = async (loginFields: z.infer<typeof loginFormSchema>) => {
    console.log(loginFields);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginFields),
    });

    const responseJson = await response.json();

    if (response.ok) {
      // Handle login
      setUser(responseJson);
      router.push("/");
      console.log(responseJson);
    } else {
      // Specific message
      if (responseJson.message) {
        setError((prev) => ({
          ...prev,
          isErrorShowing: true,
          isErrorFadingIn: true,
          message: responseJson.message,
        }));
        // Non-specific message
      } else {
        setError((prev) => ({
          ...prev,
          isErrorShowing: true,
          message: "See console log for details",
        }));
        console.log(responseJson);
      }
    }
  };

  return (
    <div className="Login-Form">
      <h1>Welcome Back</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

      {/* TODO: create this component */}
      {/* <ErrorPopup error={error} setError={setError} /> */}
    </div>
  );
}
