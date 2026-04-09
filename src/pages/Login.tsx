import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LogIn, ArrowRight } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    console.log("Login Attempt:", data);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Signed in successfully!");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-700 font-bold">Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="john_doe" 
                    className="h-12 border-neutral-200 focus:border-primary transition-all shadow-sm"
                    {...field} 
                  />
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
                <div className="flex justify-between items-center mb-1">
                   <FormLabel className="text-neutral-700 font-bold mb-0">Password</FormLabel>
                   <Link to="/forgot-password" size="sm" className="text-xs font-bold text-primary hover:underline">
                    Forgot?
                   </Link>
                </div>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="h-12 border-neutral-200 focus:border-primary transition-all shadow-sm"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-2 group"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : (
              <>
                Sign In
                <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="pt-6 border-t border-neutral-100 flex flex-col items-center gap-4">
        <p className="text-sm text-neutral-500 font-medium">
          New to the platform?
        </p>
        <Link to="/register" className="w-full">
          <Button variant="outline" className="w-full h-12 text-sm font-bold gap-2 border-neutral-200 hover:border-primary hover:text-primary transition-all group">
            Create Business Account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
