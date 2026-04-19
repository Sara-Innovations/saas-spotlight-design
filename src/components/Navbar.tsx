import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Sun, Moon, ShoppingCart, Heart, User, LayoutDashboard, LogOut, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { getCart, getWishlist, removeFromCart } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/LoginModal";
import { RegisterModal } from "@/components/RegisterModal";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

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
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState({ items: [] as any[], total_items: 0, total_price: 0 });
  const [wishlist, setWishlist] = useState([]);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { isAuthenticated, user, token, openLoginModal, openRegisterModal, logout, handleSSOToDashboard } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out of your account.",
      variant: "default",
    });
  };

  const handleRemoveItem = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    removeFromCart(productId);
    window.dispatchEvent(new Event('cartUpdate'));
    toast({
      title: "Item Removed",
      description: "Product has been removed from your cart.",
    });
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const API_BASE_URL = import.meta.env.VITE_BARGAIN_URL || 'http://bargainshop.test';
    
    let targetPath = "shop/cart";
    if (cart.total_items > 0) {
      const firstItem = cart.items[0];
      // Construct path with first product in cart as the "selected product"
      targetPath += `?pid=${firstItem.product_id}${firstItem.quantity > 1 ? `&qty=${firstItem.quantity}` : ""}`;
    }

    if (isAuthenticated && token) {
      // Use SSO Bridge for logged in users to sync session
      window.location.href = `${API_BASE_URL}/api/Api_auth/sso?token=${token}&redirect=${encodeURIComponent(targetPath)}`;
    } else {
      // Direct redirect for guest users
      window.location.href = `${API_BASE_URL}/${targetPath}`;
    }
  };

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

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium transition-colors relative group ${location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </button>
            )}

            {/* Cart Button */}
            <div className="relative" ref={cartDropdownRef}>
              <button 
                onClick={() => {
                  setCartOpen(!cartOpen);
                  setProfileOpen(false);
                }}
                className={`relative p-2 rounded-full transition-colors ${
                  cartOpen ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.total_items > 0 && (
                  <span className={`absolute -top-1 -right-1 text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border-2 border-background ${
                    cartOpen ? 'bg-background text-primary' : 'bg-primary text-primary-foreground'
                  }`}>
                    {cart.total_items}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {cartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-[60]"
                  >
                    <div className="px-4 py-3 border-b border-border/50 bg-muted/30">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">Shopping Cart</span>
                        <span className="text-xs text-muted-foreground">{cart.total_items} items</span>
                      </div>
                    </div>

                    <div className="max-h-80 overflow-y-auto p-2">
                      {cart.items.length > 0 ? (
                        <div className="space-y-1">
                          {cart.items.map((item) => (
                            <div key={item.product_id} className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                                <img src={item.image_url} alt={item.product_name} className="h-full w-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">{item.product_name}</p>
                                <p className="text-[10px] text-muted-foreground">{item.business_name}</p>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs font-bold text-primary">${item.price}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-muted-foreground">Qty: {item.quantity}</span>
                                    <button 
                                      onClick={(e) => handleRemoveItem(e, item.product_id)}
                                      className="p-1 hover:text-red-500 transition-colors"
                                      title="Remove item"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center">
                          <ShoppingCart className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
                          <p className="text-sm text-muted-foreground">Your cart is empty</p>
                        </div>
                      )}
                    </div>

                    {cart.items.length > 0 && (
                      <div className="p-3 border-t border-border bg-muted/20">
                        <div className="flex justify-between items-center mb-3 px-1">
                          <span className="text-sm font-medium">Total:</span>
                          <span className="text-sm font-bold text-primary">${cart.total_price.toFixed(2)}</span>
                        </div>
                        <Button 
                          onClick={handleCartClick}
                          className="w-full h-10 rounded-lg font-bold text-sm shadow-md shadow-primary/20"
                        >
                          Checkout Now
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Button */}
            <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-muted transition-colors">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border-2 border-background">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <div className="h-6 w-px bg-border mx-1" />

            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
                    profileOpen ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className={`w-3.5 h-3.5 ${profileOpen ? 'text-primary-foreground' : 'text-primary'}`} />
                  </div>
                  <span className="text-sm font-medium pr-1">{user?.customername || user?.username}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-xl shadow-xl py-2 overflow-hidden z-[60]"
                    >
                      <div className="px-4 py-2 mb-1 border-b border-border/50">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</p>
                        <p className="text-sm font-medium truncate">{user?.customeremail}</p>
                      </div>
                      
                      <button 
                        onClick={() => {
                          handleSSOToDashboard();
                          setProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left"
                      >
                        <LayoutDashboard className="w-4 h-4 text-primary" />
                        <span>Dashboard</span>
                      </button>
                      
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left text-red-500"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={openRegisterModal}
                  className="font-bold text-muted-foreground hover:text-primary transition-colors hidden lg:flex"
                >
                  Register
                </Button>
                <Button
                  size="sm"
                  onClick={openLoginModal}
                  className="gradient-bg border-none font-bold px-6 shadow-md shadow-primary/20"
                >
                  Login
                </Button>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border px-4 pb-6 overflow-hidden"
            >
              <div className="space-y-1 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${location.pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                      }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    to="/cart" 
                    onClick={(e) => {
                      setMobileOpen(false);
                      handleCartClick(e);
                    }}
                  >
                    <Button variant="outline" className="w-full h-12 rounded-xl flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Cart {cart.total_items > 0 && `(${cart.total_items})`}
                    </Button>
                  </Link>
                  <Link to="/wishlist" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full h-12 rounded-xl flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Wish {wishlist.length > 0 && `(${wishlist.length})`}
                    </Button>
                  </Link>
                </div>

                {mounted && (
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <span className="text-sm font-medium">Appearance</span>
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="p-2 rounded-lg bg-background shadow-sm flex items-center gap-2 text-sm font-medium"
                    >
                      {theme === "dark" ? (
                        <><Sun className="w-4 h-4 text-yellow-500" /> Light</>
                      ) : (
                        <><Moon className="w-4 h-4 text-primary" /> Dark</>
                      )}
                    </button>
                  </div>
                )}

                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{user?.customername || user?.username}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.customeremail}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <Button 
                        onClick={() => {
                          handleSSOToDashboard();
                          setMobileOpen(false);
                        }}
                        className="w-full h-12 rounded-xl font-bold flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Button>
                      <Button 
                        variant="secondary"
                        onClick={() => { handleLogout(); setMobileOpen(false); }} 
                        className="w-full h-12 rounded-xl font-bold flex items-center gap-2 text-red-500"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={() => { openLoginModal(); setMobileOpen(false); }} 
                    className="w-full h-12 rounded-xl font-bold gradient-bg"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <LoginModal />
      <RegisterModal />
    </>
  );
};

export default Navbar;