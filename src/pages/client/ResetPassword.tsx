import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { AlertCircle } from "lucide-react";

// Import auction image
import auctionImage from "@/components/Picture/Leftsidepic.png";
// Fallback image
const fallbackImage = "https://images.unsplash.com/photo-1605433276792-2e53778f269a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

const formSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidToken, setIsInvalidToken] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Verify token on mount
  useEffect(() => {
    if (!token) {
      setIsInvalidToken(true);
      return;
    }
    
    // In a real app, you'd validate the token via an API call
    // For demo purposes, we'll just check if it looks like a token
    if (token.length < 10) {
      setIsInvalidToken(true);
    }
  }, [token]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // In a real app, this would call an API endpoint to set the new password
      // For demo purposes, we'll simulate a successful password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsComplete(true);
      toast.success("Password reset successfully");
    } catch (error) {
      toast.error("Failed to reset password");
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
      
      {/* Right side - Password Reset Form */}
      <div className="w-full lg:w-1/3 bg-white flex flex-col items-center justify-center p-8 shadow-lg">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
                Art<span className="text-black">Auction</span>
              </span>
            </Link>
            <div className="mt-10 relative">
              <h1 className="text-4xl font-bold text-black tracking-wide relative z-10 inline-block">
                <span className="bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">NEW PASSWORD</span>
              </h1>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gray-800 to-black mx-auto w-20 rounded-full"></div>
            </div>
          </div>
          
          {isInvalidToken ? (
            <div className="text-center space-y-6">
              <div className="p-4 bg-red-50 rounded-md flex items-start gap-2">
                <AlertCircle className="text-red-500 h-5 w-5 mt-0.5" />
                <p className="text-red-800">The password reset link is invalid or has expired. Please request a new password reset link.</p>
              </div>
              
              <div className="pt-4">
                <Link 
                  to="/forgot-password" 
                  className="text-black font-semibold hover:underline"
                >
                  Request a new reset link
                </Link>
              </div>
            </div>
          ) : isComplete ? (
            <div className="text-center space-y-6">
              <div className="p-4 bg-green-50 rounded-md">
                <p className="text-green-800">Your password has been reset successfully.</p>
              </div>
              
              <div className="pt-4">
                <Link 
                  to="/login" 
                  className="w-full h-12 bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 text-white font-medium rounded-md inline-flex items-center justify-center"
                >
                  Sign in with new password
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-8 text-center">
                Enter your new password below.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="password"
                            placeholder="New Password" 
                            {...field} 
                            className="bg-gray-50 border border-gray-200 text-black placeholder:text-gray-500 h-12 rounded-md focus:ring-2 focus:ring-black"
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
                            placeholder="Confirm New Password" 
                            {...field} 
                            className="bg-gray-50 border border-gray-200 text-black placeholder:text-gray-500 h-12 rounded-md focus:ring-2 focus:ring-black"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full h-12 bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 text-white font-medium mt-4 rounded-md"
                  >
                    {isLoading ? "Resetting Password..." : "Reset Password"}
                  </Button>
                </form>
              </Form>
              
              <div className="text-center mt-8">
                <p className="text-black text-sm mt-4">
                  Remember your password?{" "}
                  <Link to="/login" className="text-black font-semibold hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 