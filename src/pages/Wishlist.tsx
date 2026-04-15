import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ArrowLeft, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getWishlist, removeFromWishlist, addToCart, WishlistItem } from "@/lib/api";
import { toast } from "sonner";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const items = getWishlist();
    setWishlistItems(items);
    setIsLoading(false);
  }, []);

  const handleRemoveFromWishlist = (productId: string) => {
    const updatedWishlist = removeFromWishlist(productId);
    setWishlistItems(updatedWishlist);
    toast.success("Item removed from wishlist");
    window.dispatchEvent(new Event('wishlistUpdate'));
  };

  const handleMoveToCart = (item: WishlistItem) => {
    // Create a product object from wishlist item
    const product = {
      product_id: item.product_id,
      product_name: item.product_name,
      price: item.price,
      image_url: item.image_url,
      business_name: item.business_name,
      qty: 999, // Default max quantity
    };
    
    addToCart(product, 1);
    removeFromWishlist(item.product_id);
    setWishlistItems(getWishlist());
    toast.success("Item moved to cart");
    window.dispatchEvent(new Event('cartUpdate'));
    window.dispatchEvent(new Event('wishlistUpdate'));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-20">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-80 w-full rounded-2xl" />
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
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <span className="bg-pink-500/10 text-pink-500 px-3 py-1 rounded-full text-sm font-medium">
            {wishlistItems.length} items
          </span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-20 h-20 mx-auto mb-6 text-slate-400" />
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-slate-500 mb-8">Save items you love for later.</p>
            <Link to="/products">
              <Button className="rounded-full px-8">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.product_id}
                className="group bg-card/40 border border-white/10 rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all"
              >
                <Link to={`/shop/product-details?pid=${item.product_id}&pvid=&pslug=`}>
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={item.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"}
                      alt={item.product_name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <Link to={`/shop/product-details?pid=${item.product_id}&pvid=&pslug=`}>
                    <h3 className="font-semibold line-clamp-2 mb-1 group-hover:text-pink-400 transition-colors">
                      {item.product_name}
                    </h3>
                  </Link>
                  <p className="text-sm text-slate-500 mb-2">{item.business_name}</p>
                  <p className="text-pink-400 font-bold text-lg mb-4">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full"
                      onClick={() => handleMoveToCart(item)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                      onClick={() => handleRemoveFromWishlist(item.product_id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
