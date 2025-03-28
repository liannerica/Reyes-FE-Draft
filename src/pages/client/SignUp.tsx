import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

// Import auction image
import auctionImage from "@/components/Picture/Leftsidepic.png";
// Fallback image
const fallbackImage = "https://images.unsplash.com/photo-1605433276792-2e53778f269a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
  agreeTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const success = await signup(values.username, values.email, values.password, values.name);
      if (success) {
        toast.success("Account created successfully");
        navigate("/login");
      } else {
        toast.error("Failed to create account");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Auction Image */}
      <div className="hidden lg:block lg:w-2/3 relative">
        <img 
          src={auctionImage} 
          alt="Auction scene" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"></div>
      </div>
      
      {/* Right side - Sign Up Form */}
      <div className="w-full lg:w-1/3 bg-white flex flex-col items-center justify-center p-8 shadow-lg">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-tight">
                Art<span className="text-[#AA8F66]">Auction</span>
              </span>
            </Link>
            <div className="mt-10 relative">
              <h1 className="text-5xl font-bold tracking-wide relative z-10 inline-block">
                <span className="text-[#AA8F66]">SIGN UP</span>
              </h1>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#AA8F66] mx-auto w-20 rounded-full"></div>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Username" 
                          {...field} 
                          className="bg-gray-50 border border-gray-200 text-black placeholder:text-gray-500 h-12 rounded-md focus:ring-2 focus:ring-[#AA8F66]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Full Name" 
                          {...field} 
                          className="bg-gray-50 border border-gray-200 text-black placeholder:text-gray-500 h-12 rounded-md focus:ring-2 focus:ring-[#AA8F66]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Email Address" 
                          type="email"
                          {...field} 
                          className="bg-gray-50 border border-gray-200 text-black placeholder:text-gray-500 h-12 rounded-md focus:ring-2 focus:ring-[#AA8F66]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Password" 
                          {...field} 
                          className="bg-gray-50 border border-gray-200 text-black placeholder:text-gray-500 h-12 rounded-md focus:ring-2 focus:ring-[#AA8F66]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Confirm Password" 
                          {...field} 
                          className="bg-gray-50 border border-gray-200 text-black placeholder:text-gray-500 h-12 rounded-md focus:ring-2 focus:ring-[#AA8F66]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-[#AA8F66] data-[state=checked]:border-[#AA8F66] mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <p className="text-sm text-black">
                          I agree to the <Link to="/terms" className="text-[#AA8F66] font-semibold hover:text-[#AA8F66]/80 hover:underline">Terms and conditions</Link>
                        </p>
                        <FormMessage className="text-red-500" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full h-12 bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white font-medium mt-8 rounded-md"
              >
                {isLoading ? "Creating Account..." : "Sign up"}
              </Button>
            </form>
          </Form>
          
          <div className="text-center mt-8">
            <p className="text-black text-sm">
              By registering you agree to the <Link to="/terms" className="text-[#AA8F66] font-semibold hover:text-[#AA8F66]/80 hover:underline">Terms and conditions</Link>
            </p>
            <p className="text-black text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-[#AA8F66] font-semibold hover:text-[#AA8F66]/80 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
