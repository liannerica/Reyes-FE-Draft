import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
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
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // In a real app, this would call an API endpoint to send a reset link
      // For demo purposes, we'll simulate a successful email sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailSent(true);
      toast.success("Reset link sent to your email");
    } catch (error) {
      toast.error("Failed to send reset link");
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
              <h1 className="text-5xl font-bold text-black tracking-wide relative z-10 inline-block">
                <span className="bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">RESET</span>
              </h1>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gray-800 to-black mx-auto w-20 rounded-full"></div>
            </div>
          </div>
          
          {emailSent ? (
            <div className="text-center space-y-6">
              <div className="p-4 bg-green-50 rounded-md">
                <p className="text-green-800">A password reset link has been sent to your email address. Please check your inbox and follow the instructions.</p>
              </div>
              
              <p className="text-gray-600 text-sm">
                Didn't receive an email? Check your spam folder or 
                <button 
                  onClick={() => setEmailSent(false)} 
                  className="text-black ml-1 font-semibold hover:underline"
                >
                  try again
                </button>
              </p>
              
              <div className="pt-4">
                <Link 
                  to="/login" 
                  className="text-black font-semibold hover:underline"
                >
                  Return to login
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-8 text-center">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    {isLoading ? "Sending..." : "Send Reset Link"}
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