import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

// Import auction image
import auctionImage from "@/components/Picture/Leftsidepic.png";
// Fallback image
const fallbackImage = "https://images.unsplash.com/photo-1605433276792-2e53778f269a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

const formSchema = z.object({
  emailOrUsername: z.string().min(1, { message: "Please enter your email" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the return URL from location state or default to home
  const from = location.state?.from?.pathname || "/";
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const success = await login(values.emailOrUsername, values.password);
      if (success) {
        toast.success("Logged in successfully");
        // Navigate to the return URL
        navigate(from, { replace: true });
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred during login");
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
      
      {/* Right side - Sign In Form */}
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
                <span className="text-[#AA8F66]">SIGN IN</span>
              </h1>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#AA8F66] mx-auto w-20 rounded-full"></div>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="emailOrUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Email Address" 
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
                      <div className="flex justify-end mt-1">
                        <Link to="/forgot-password" className="text-sm text-[#AA8F66] hover:text-[#AA8F66]/80 hover:underline">
                          Forgot password?
                        </Link>
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
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>
          
          <div className="text-center mt-8">
            <p className="text-black text-sm">
              By signing in you agree to the <Link to="/terms" className="text-[#AA8F66] font-semibold hover:text-[#AA8F66]/80 hover:underline">Terms and conditions</Link>
            </p>
            <p className="text-black text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#AA8F66] font-semibold hover:text-[#AA8F66]/80 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}