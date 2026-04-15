import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  fetchBargainProductDetails, 
  fetchBargainProducts, 
  fetchProductReviews, 
  submitProductReview,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  isInWishlist
} from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  ShoppingCart,
  ArrowLeft,
  Package,
  ShieldCheck,
  Truck,
  RotateCcw,
  Store,
  Mail,
  Phone,
  Star,
  Heart,
  Share2,
  Minus,
  Plus,
  Check,
  AlertCircle,
  MapPin,
  Calendar,
  Tag,
  ChevronRight,
  ThumbsUp,
  User,
} from "lucide-react";

interface ProductImage {
  url: string;
  alt?: string;
}

interface Product {
  product_id: string;
  product_name: string;
  price: number;
  display_price: number;
  variation_price?: number;
  qty: number;
  image_url: string;
  images?: ProductImage[];
  details?: string;
  short_desc?: string;
  category_name?: string;
  subcategory_name?: string;
  business_name: string;
  business_id?: string;
  seller_email?: string;
  seller_contact?: string;
  seller_address?: string;
  average_rating?: number;
  total_reviews?: number;
  refundable?: string;
  condition?: string;
  brand?: string;
  sku?: string;
  weight?: string;
  slug?: string;
  dimensions?: string;
  created_at?: string;
  specifications?: Record<string, string>;
  // Additional API fields
  brand_name?: string;
  pro_code?: string;
  product_type?: string;
  measurement_amount?: string;
  measurement_type?: string;
  cat_id?: string;
  scat_id?: string;
  bar_code?: string;
  shipping_type?: string;
  min_qty?: string;
  entry_date?: string;
}

// Quantity Selector Component
const QuantitySelector = ({
  value,
  onChange,
  max,
  min = 1,
}: {
  value: number;
  onChange: (val: number) => void;
  max: number;
  min?: number;
}) => {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className="flex items-center border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-black/30">
      <button
        onClick={decrease}
        disabled={value <= min}
        className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-14 text-center font-semibold">{value}</span>
      <button
        onClick={increase}
        disabled={value >= max}
        className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

// Related Product Card
const RelatedProductCard = ({ product }: { product: Product }) => {
  const displayPrice =
    product.display_price > 0
      ? product.display_price
      : product.price > 0
        ? product.price
        : 0;

  return (
    <Link
      to={`/shop/product-details?pid=${product.product_id}&pvid=&pslug=${product.slug || ''}`}
      className="group block bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-white/5">
        <img
          src={
            product.image_url ||
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop"
          }
          alt={product.product_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop";
          }}
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-slate-500 mb-1">{product.business_name}</p>
        <h4 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-indigo-500 transition-colors">
          {product.product_name}
        </h4>
        <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
          ${Number(displayPrice).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

// Image Gallery Component
const ImageGallery = ({ product }: { product: Product }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Build images array from product data
  const images: ProductImage[] = product.images?.length
    ? product.images
    : product.image_url
      ? [{ url: product.image_url, alt: product.product_name }]
      : [];

  // Add placeholder if no images
  if (images.length === 0) {
    images.push({
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      alt: "Product placeholder",
    });
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-black/30 aspect-square">
        <img
          src={images[selectedIndex]?.url}
          alt={images[selectedIndex]?.alt || product.product_name}
          className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500 cursor-zoom-in"
        />
        {product.qty <= 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Out of Stock
            </Badge>
          </div>
        )}
        {product.condition && (
          <Badge className="absolute top-4 left-4 bg-indigo-600 text-white">
            {product.condition}
          </Badge>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                selectedIndex === idx
                  ? "border-indigo-500 ring-2 ring-indigo-500/20"
                  : "border-slate-200 dark:border-white/10 hover:border-indigo-300"
              }`}
            >
              <img
                src={img.url}
                alt={img.alt || `Image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("pid");
  const pvid = searchParams.get("pvid");
  const pslug = searchParams.get("pslug");
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
    user_name: "",
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Fetch main product
  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bargain_product", id],
    queryFn: () => fetchBargainProductDetails(id as string),
    enabled: !!id,
  });

  // Fetch product reviews from product_rating table via API
  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
  } = useQuery({
    queryKey: ["product_reviews", id],
    queryFn: () => fetchProductReviews(id as string),
    enabled: !!id,
  });

  // Fetch related products
  const { data: relatedData } = useQuery({
    queryKey: ["bargain_products", 1],
    queryFn: () => fetchBargainProducts(1, 8),
    enabled: !!productData,
  });

  const product: Product = productData?.data ? {
  ...productData.data,
  qty: parseInt(productData.data.qty) || 0,
  price: parseFloat(productData.data.price) || 0,
  display_price: parseFloat(productData.data.price) || 0,
} : undefined;
  // Use actual reviews from API (product_rating table)
const reviews = reviewsData?.reviews || [];

const reviewsDataWithFallback = reviewsData || (
  product && parseInt(String(product.total_reviews || "0")) > 0 ? {
    average_rating: product.average_rating || 4.5,
    total_reviews: parseInt(String(product.total_reviews || "0")),
    rating_distribution: {
      "5": 1,
      "4": 1,
      "3": 0,
      "2": 0,
      "1": 0,
    },
  } : {
    average_rating: 0,
    total_reviews: 0,
    rating_distribution: {
      "5": 0,
      "4": 0,
      "3": 0,
      "2": 0,
      "1": 0,
    },
  }
);

  // Check if product is in wishlist on mount and when product changes
  useEffect(() => {
    if (product) {
      setIsWishlisted(isInWishlist(product.product_id));
    }
  }, [product]);

  // Filter related products (same category, exclude current)
  const relatedProducts =
    relatedData?.data
      ?.filter(
        (p: Product) =>
          p.product_id !== id &&
          p.category_name === product?.category_name
      )
      ?.slice(0, 4) || [];

  // Fallback: if not enough same category, add random products
  const fallbackRelated =
    relatedData?.data
      ?.filter((p: Product) => p.product_id !== id)
      ?.slice(0, 4 - relatedProducts.length) || [];

  const allRelated = [...relatedProducts, ...fallbackRelated].slice(0, 4);

  // Handlers
  const handleAddToCart = () => {
    if (!product || product.qty <= 0) {
      toast.error("Product is out of stock");
      return;
    }
    
    const cart = addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.product_name} to cart`);
    
    // Trigger cart update event for navbar
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const handleBuyNow = () => {
    if (!product || product.qty <= 0) {
      toast.error("Product is out of stock");
      return;
    }
    
    // Add to cart first, then navigate to checkout
    addToCart(product, quantity);
    navigate("/payments", { state: { product, quantity } });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const toggleWishlist = () => {
    if (!product) return;
    
    if (isWishlisted) {
      removeFromWishlist(product.product_id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
    setIsWishlisted(!isWishlisted);
    
    // Trigger wishlist update event for navbar
    window.dispatchEvent(new Event('wishlistUpdate'));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product || !reviewForm.comment.trim() || !reviewForm.user_name.trim()) {
      toast.error("Please fill in all review fields");
      return;
    }
    
    setIsSubmittingReview(true);
    
    try {
      await submitProductReview(product.product_id, {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        user_name: reviewForm.user_name,
      });
      
      toast.success("Review submitted successfully!");
      setReviewForm({ rating: 5, comment: "", user_name: "" });
      // Reviews refresh disabled - API not available
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto max-w-7xl pt-28 pb-24 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-2xl" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded-xl" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-10 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error State
  if (isError || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto max-w-6xl pt-40 px-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              {(error as Error)?.message ||
                "The product you're looking for doesn't exist or has been removed."}
            </p>
            <Link to="/products">
              <Button size="lg" className="rounded-full px-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Calculate pricing
  const originalPrice = product.price || 0;
  const displayPrice =
    product.display_price > 0
      ? product.display_price
      : product.variation_price || originalPrice;
  const hasDiscount = displayPrice < originalPrice && originalPrice > 0;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : 0;

  // Parse specifications from real API data
  const specifications = {
    "Product Name": product.product_name || "N/A",
    "Brand": product.brand_name || product.brand || "N/A",
    "SKU": product.pro_code || product.sku || product.product_id || "N/A",
    "Condition": product.product_type || "New",
    "Weight": product.measurement_amount && product.measurement_type 
      ? `${product.measurement_amount} ${product.measurement_type}` 
      : "N/A",
    "Category": product.cat_id || "N/A",
    "Sub Category": product.scat_id || "N/A",
    "Barcode": product.bar_code || "N/A",
    "Product Type": product.product_type || "N/A",
    "Shipping Type": product.shipping_type || "N/A",
    "Refundable": product.refundable === "Yes" ? "Yes" : "No",
    "Min Quantity": product.min_qty || "N/A",
    "Entry Date": product.entry_date ? new Date(product.entry_date).toLocaleDateString() : "N/A",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto max-w-7xl pt-24 pb-24 px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-500 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link
            to="/products"
            className="hover:text-indigo-500 transition-colors"
          >
            Products
          </Link>
          {product.category_name && (
            <>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-slate-400">{product.category_name}</span>
            </>
          )}
        </nav>

        {/* Product Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <ImageGallery product={product} />

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Badges Row */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.category_name && (
                <Badge variant="secondary">{product.category_name}</Badge>
              )}
              {hasDiscount && (
                <Badge className="bg-red-500 text-white">
                  -{discountPercent}% OFF
                </Badge>
              )}
              {product.qty > 0 ? (
                <Badge className="bg-green-500 text-white">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
              {product.refundable === "Yes" && (
                <Badge variant="outline" className="text-indigo-500">
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Refundable
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl lg:text-4xl font-bold mb-4">
              {product.product_name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= (product.average_rating || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">
                {product.average_rating || 0}
              </span>
              <span className="text-slate-500">
                ({product.total_reviews || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  ${Number(displayPrice).toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-slate-400 line-through">
                    ${Number(originalPrice).toFixed(2)}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <p className="text-sm text-green-600 mt-1">
                  You save ${Number(originalPrice - displayPrice).toFixed(2)} ({discountPercent}% off)
                </p>
              )}
            </div>

            {/* Short Description */}
            {product.short_desc && (
              <div
                className="text-slate-600 dark:text-slate-300 mb-6 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.short_desc }}
              />
            )}

            {/* Seller Info Card */}
            <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                    <Store className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{product.business_name}</p>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      {product.seller_email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {product.seller_email}
                        </span>
                      )}
                      {product.seller_contact && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {product.seller_contact}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Link to={`/businesses/${product.business_id}`}>
                  <Button variant="outline" size="sm" className="rounded-full">
                    View Store
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              {product.qty > 0 && (
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <QuantitySelector
                    value={quantity}
                    onChange={setQuantity}
                    max={Math.min(product.qty, 10)}
                    min={1}
                  />
                  <span className="text-sm text-slate-500">
                    {product.qty} available
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  disabled={product.qty <= 0}
                  onClick={handleAddToCart}
                  className={`flex-1 py-6 rounded-xl font-bold ${
                    product.qty > 0
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.qty > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  size="lg"
                  disabled={product.qty <= 0}
                  onClick={handleBuyNow}
                  className="flex-1 py-6 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                >
                  Buy Now
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleWishlist}
                  className={`flex-1 rounded-xl ${
                    isWishlisted ? "text-red-500 border-red-200" : ""
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 mr-2 ${
                      isWishlisted ? "fill-red-500" : ""
                    }`}
                  />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                  className="flex-1 rounded-xl"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Truck className="w-5 h-5 text-indigo-500" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <RotateCcw className="w-5 h-5 text-purple-500" />
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Quality Assured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start bg-slate-100 dark:bg-white/5 p-1 rounded-xl mb-6">
              <TabsTrigger
                value="description"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-black/40"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-black/40"
              >
                Reviews ({reviewsDataWithFallback?.total_reviews || 0})
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-black/40"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-black/40"
              >
                Shipping & Returns
              </TabsTrigger>
              <TabsTrigger
                value="seller"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-black/40"
              >
                Seller Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 lg:p-8">
                {product.details ? (
                  <div
                    className="prose prose-lg max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: product.details }}
                  />
                ) : (
                  <div className="text-slate-500">
                    <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-center">
                      No detailed description available for this product.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div className="space-y-8">
                {/* Review Summary */}
                <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>
                  
                  {reviewsDataWithFallback && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                          {reviewsDataWithFallback.average_rating.toFixed(1)}
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= reviewsDataWithFallback.average_rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-slate-500">
                          Based on {reviewsDataWithFallback.total_reviews} reviews
                        </p>
                      </div>
                      
                      <div className="md:col-span-2">
                        {Object.entries(reviewsDataWithFallback.rating_distribution || {})
                          .sort(([a], [b]) => parseInt(b) - parseInt(a))
                          .map(([rating, count]) => (
                            <div key={rating} className="flex items-center gap-3 mb-2">
                              <span className="text-sm w-12">{rating} stars</span>
                              <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-yellow-400 h-full rounded-full"
                                  style={{
                                    width: `${(reviewsDataWithFallback?.total_reviews || 0) > 0 ? ((count as number) / (reviewsDataWithFallback?.total_reviews || 1)) * 100 : 0}%`
                                  }}
                                />
                              </div>
                              <span className="text-sm w-8 text-right">{count as number}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Review Form */}
                  <div className="border-t border-slate-200 dark:border-white/10 pt-6">
                    <h4 className="text-lg font-semibold mb-4">Write a Review</h4>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="user_name">Your Name</Label>
                          <Input
                            id="user_name"
                            value={reviewForm.user_name}
                            onChange={(e) => setReviewForm(prev => ({ ...prev, user_name: e.target.value }))}
                            placeholder="Enter your name"
                            required
                          />
                        </div>
                        <div>
                          <Label>Rating</Label>
                          <div className="flex items-center gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                                className="transition-colors"
                              >
                                <Star
                                  className={`w-6 h-6 ${
                                    star <= reviewForm.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-slate-300 hover:text-yellow-400"
                                  }`}
                                />
                              </button>
                            ))}
                            <span className="text-sm text-slate-500 ml-2">
                              {reviewForm.rating} star{reviewForm.rating !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="comment">Your Review</Label>
                        <Textarea
                          id="comment"
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                          placeholder="Share your experience with this product..."
                          rows={4}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="rounded-xl"
                      >
                        {isSubmittingReview ? "Submitting..." : "Submit Review"}
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {isLoadingReviews ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6">
                          <Skeleton className="h-4 w-32 mb-2" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      ))}
                    </div>
                  ) : (reviewsDataWithFallback?.total_reviews || 0) > 0 ? (
                    reviews.map((review: any) => (
                      <div
                        key={review.id}
                        className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {review.profile_picture ? (
                              <img
                                src={review.profile_picture}
                                alt={review.user_name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                              </div>
                            )}
                            <div>
                              <h5 className="font-semibold">{review.user_name}</h5>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-4 h-4 ${
                                        star <= review.rating
                                          ? "text-yellow-400 fill-yellow-400"
                                          : "text-slate-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-slate-500">
                                  {new Date(review.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="text-slate-400 hover:text-indigo-500 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                          {review.comment}
                        </p>
                        {/* Review Images */}
                        {review.product_review_images_urls && review.product_review_images_urls.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {review.product_review_images_urls.map((imgUrl: string, idx: number) => (
                              <img
                                key={idx}
                                src={imgUrl}
                                alt={`Review image ${idx + 1}`}
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => window.open(imgUrl, '_blank')}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-12 text-center">
                      <Star className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                      <h4 className="text-lg font-semibold mb-2">No Reviews Yet</h4>
                      <p className="text-slate-500">
                        Be the first to review this product!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-0">
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 lg:p-8">
                <h3 className="text-lg font-semibold mb-4">
                  Product Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-3 border-b border-slate-200 dark:border-white/10"
                    >
                      <span className="text-slate-500">{key}</span>
                      <span className="font-medium">{value || "N/A"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-0">
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-indigo-500" />
                      Shipping Information
                    </h3>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        Free shipping on orders over $50
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        Standard delivery: 3-5 business days
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        Express delivery available at checkout
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        Tracking number provided
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <RotateCcw className="w-5 h-5 text-purple-500" />
                      Return Policy
                    </h3>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        {product.refundable === "Yes"
                          ? "30-day return policy"
                          : "No returns accepted"}
                      </li>
                      {product.refundable === "Yes" && (
                        <>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            Item must be in original condition
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            Free return shipping on defective items
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seller" className="mt-0">
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 lg:p-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Store className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {product.business_name}
                    </h3>
                    <div className="space-y-2 text-slate-600 dark:text-slate-300 mb-4">
                      {product.seller_address && (
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          {product.seller_address}
                        </p>
                      )}
                      {product.seller_email && (
                        <p className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-400" />
                          {product.seller_email}
                        </p>
                      )}
                      {product.seller_contact && (
                        <p className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-slate-400" />
                          {product.seller_contact}
                        </p>
                      )}
                      {product.created_at && (
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          Member since{" "}
                          {new Date(product.created_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Link to={`/businesses/${product.business_id}`}>
                        <Button className="rounded-full">
                          Visit Store
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                      {product.seller_email && (
                        <a href={`mailto:${product.seller_email}`}>
                          <Button variant="outline" className="rounded-full">
                            Contact Seller
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {allRelated.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <Link to="/products">
                <Button variant="ghost" className="text-indigo-500">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {allRelated.map((relatedProduct) => (
                <RelatedProductCard
                  key={relatedProduct.product_id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;