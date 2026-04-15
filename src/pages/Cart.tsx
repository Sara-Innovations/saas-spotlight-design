import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getCart, updateCartItemQuantity, removeFromCart, clearCart, CartItem } from "@/lib/api";
import { toast } from "sonner";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = getCart();
    setCartItems(cart.items);
    setIsLoading(false);
  }, []);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = updateCartItemQuantity(productId, newQuantity);
    setCartItems(updatedCart.items);
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = removeFromCart(productId);
    setCartItems(updatedCart.items);
    toast.success("Item removed from cart");
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
    toast.success("Cart cleared");
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-20">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <span className="bg-indigo-500/10 text-indigo-500 px-3 py-1 rounded-full text-sm font-medium">
            {totalItems} items
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-20 h-20 mx-auto mb-6 text-slate-400" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Looks like you haven&apos;t added any products yet.</p>
            <Link to="/products">
              <Button className="rounded-full px-8">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-card/40 border border-white/10 rounded-2xl p-4 flex gap-4"
                >
                  <img
                    src={item.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"}
                    alt={item.product_name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold line-clamp-1">{item.product_name}</h3>
                        <p className="text-sm text-slate-500">{item.business_name}</p>
                        <p className="text-indigo-400 font-bold mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                        onClick={() => handleRemoveItem(item.product_id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                        disabled={item.quantity >= item.max_quantity}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <span className="ml-auto font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="ghost"
                className="text-red-400 hover:text-red-500"
                onClick={handleClearCart}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="bg-card/40 border border-white/10 rounded-2xl p-6 h-fit">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl text-indigo-400">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button 
                className="w-full rounded-full py-6 text-lg font-bold"
                onClick={() => navigate("/payments")}
              >
                Proceed to Checkout
              </Button>

              <Link to="/products">
                <Button variant="outline" className="w-full rounded-full mt-3">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
