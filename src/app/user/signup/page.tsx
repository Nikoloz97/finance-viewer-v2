"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { occupations } from "@/lib/occupations";
import "../user.css";
import { signupFormSchema } from "../form-schemas";
import { responseMessage } from "@/app/utils/default-response-message";
import { formDataPost } from "@/app/utils/http-request-service";

export default function Signup() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      occupation: undefined,
      profileImageFile: undefined,
    },
  });

  const handleSignup = async (signUpInfo: z.infer<typeof signupFormSchema>) => {
    const response = await formDataPost(signUpInfo, "/api/user/signup");

    responseMessage(response);
    if (response.ok) {
      router.push("/user/login");
    }
  };

  return (
    <div>
      <h1>Welcome, New User</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignup)}>
          <div className="Signup-Grid-Container">
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Occupation:</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between h-10",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? occupations.find(
                                (occupation) => occupation.value === field.value
                              )?.label
                            : "Select category"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {occupations.map((occupation) => (
                              <CommandItem
                                value={occupation.label}
                                key={occupation.value}
                                onSelect={() => {
                                  form.setValue("occupation", occupation.value);
                                }}
                              >
                                {occupation.label}
                                <Check
                                  className={cn(
                                    "ml-auto text-black",
                                    occupation.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="profileImageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image:</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="Login-Button-Container">
            <Button className="dark" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
