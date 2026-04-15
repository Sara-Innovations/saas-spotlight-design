import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import BusinessSearch from "./pages/BusinessSearch";
import BusinessDetails from "./pages/BusinessDetails";
import Services from "./pages/Services";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";

import Profile from "./pages/Profile";
import Payments from "./pages/Payments";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import AuthLayout from "./components/auth/AuthLayout";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/businesses" element={<BusinessSearch />} />
          <Route path="/businesses/:id" element={<BusinessDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shop/product-details" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/jobs" element={<Jobs />} />

          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<AuthLayout title="Welcome Back" description="Sign in to your account to continue"><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout title="Create Account" description="Join thousands of businesses already growing with us" containerClassName="max-w-2xl"><Register /></AuthLayout>} />
          <Route path="/forgot-password" element={<AuthLayout title="Reset Password" description="We'll send you a link to get back in"><ForgotPassword /></AuthLayout>} />
          <Route path="/reset-password" element={<AuthLayout title="New Password" description="Create a secure new password for your account"><ResetPassword /></AuthLayout>} />
          
          <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

