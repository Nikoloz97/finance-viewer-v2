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
import {
  Briefcase,
  Check,
  ChevronsUpDown,
  Lock,
  Mail,
  User,
  UserCircle,
} from "lucide-react";
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
import { useState } from "react";
import LoadingOverlay from "@/app/utils/loading-overlay/loading-overlay";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Signup() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", signUpInfo.username);
    formData.append("password", signUpInfo.password);
    formData.append("email", signUpInfo.email);
    formData.append("firstName", signUpInfo.firstName);
    formData.append("lastName", signUpInfo.lastName);
    if (signUpInfo.occupation) {
      formData.append("occupation", signUpInfo.occupation);
    }
    if (signUpInfo.profileImageFile) {
      formData.append("profileImageFile", signUpInfo.profileImageFile as File);
    }

    const response = await formDataPost(formData, "/api/user/signup");

    if (response) {
      responseMessage(response);
      if (response.ok) {
        router.push("/user/login");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-4 flex justify-center py-8">
      {isLoading && <LoadingOverlay />}

      <Card className="w-full max-w-2xl shadow-lg bg-transparent p-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome, New User
          </CardTitle>
          <CardDescription className="text-center">
            Create your Finance Viewer account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignup)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" type="password" {...field} />
                        </div>
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" {...field} />
                        </div>
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
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UserCircle className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" {...field} />
                        </div>
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
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UserCircle className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <div className="relative">
                              <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between h-10 pl-10",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? occupations.find(
                                      (occupation) =>
                                        occupation.value === field.value
                                    )?.label
                                  : "Select occupation"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </div>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search occupation..." />
                            <CommandList>
                              <CommandEmpty>No occupation found.</CommandEmpty>
                              <CommandGroup>
                                {occupations.map((occupation) => (
                                  <CommandItem
                                    value={occupation.label}
                                    key={occupation.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "occupation",
                                        occupation.value
                                      );
                                    }}
                                  >
                                    {occupation.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
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
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="file"
                          className="file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const file = e.target.files
                              ? e.target.files[0]
                              : null;
                            field.onChange(file);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="w-full text-center text-sm">
            Already have an account?{" "}
            <Link href="/" className="text-primary font-medium hover:underline">
              Log in here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
