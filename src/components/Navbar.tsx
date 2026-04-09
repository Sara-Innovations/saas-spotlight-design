import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Businesses", href: "/businesses" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Jobs", href: "/jobs" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
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
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm font-bold text-neutral-600 hover:text-primary transition-colors px-2">
            Login
          </Link>
          <Link to="/register">
            <Button size="sm" className="gradient-bg text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
              Join as Company
            </Button>
          </Link>
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
              className={`block py-2 text-sm font-medium ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-neutral-100">
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="w-full font-bold">Login</Button>
            </Link>
            <Link to="/register" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="gradient-bg text-primary-foreground w-full font-bold">Join as Company</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
