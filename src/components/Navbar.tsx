import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Sun, Moon, ShoppingCart, Heart, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { getCart, getWishlist } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/LoginModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Businesses", href: "/businesses" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Jobs", href: "/jobs" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState({ items: [], total_items: 0, total_price: 0 });
  const [wishlist, setWishlist] = useState([]);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { isAuthenticated, user, openLoginModal, logout } = useAuth();
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load cart and wishlist data
  useEffect(() => {
    if (mounted) {
      setCart(getCart());
      setWishlist(getWishlist());
    }
  }, [mounted]);

  // Listen for cart and wishlist updates
  useEffect(() => {
    const handleCartUpdate = () => setCart(getCart());
    const handleWishlistUpdate = () => setWishlist(getWishlist());
    
    window.addEventListener('cartUpdate', handleCartUpdate);
    window.addEventListener('wishlistUpdate', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('cartUpdate', handleCartUpdate);
      window.removeEventListener('wishlistUpdate', handleWishlistUpdate);
    };
  }, []);

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-xl font-bold gradient-text">
          Trading Hub
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-medium transition-colors ${location.pathname === link.href
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Cart Button */}
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-muted transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cart.total_items > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.total_items}
              </span>
            )}
          </Link>

          {/* Wishlist Button */}
          <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-muted transition-colors">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors mr-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          )}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user?.customername || user?.username}</span>
              </Link>
              <button
                onClick={logout}
                className="text-sm font-bold text-neutral-600 hover:text-red-500 transition-colors px-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={openLoginModal}
              className="font-bold"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`block py-2 text-sm font-medium ${location.pathname === link.href
                ? "text-primary"
                : "text-muted-foreground"
                }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-neutral-100 dark:border-white/10">
            {/* Cart and Wishlist Links */}
            <div className="flex gap-2">
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex-1">
                <Button variant="outline" size="sm" className="w-full font-bold flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Cart {cart.total_items > 0 && `(${cart.total_items})`}
                </Button>
              </Link>
              <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="flex-1">
                <Button variant="outline" size="sm" className="w-full font-bold flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                </Button>
              </Link>
            </div>
            
            {mounted && (
              <div className="flex items-center justify-between py-2 px-1">
                <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg bg-muted flex items-center gap-2 text-sm"
                >
                  {theme === "dark" ? (
                    <><Sun className="w-4 h-4 text-yellow-500" /> Light</>
                  ) : (
                    <><Moon className="w-4 h-4 text-slate-700 dark:text-slate-400" /> Dark</>
                  )}
                </button>
              </div>
            )}
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full font-bold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {user?.customername || user?.username}
                  </Button>
                </Link>
                <Button onClick={() => { logout(); setMobileOpen(false); }} size="sm" variant="destructive" className="w-full font-bold">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => { openLoginModal(); setMobileOpen(false); }} size="sm" variant="outline" className="w-full font-bold">
                Login
              </Button>
            )}
          </div>
        </div>
      )}
      
    </nav>
    <LoginModal />
    </>
  );
};

export default Navbar;