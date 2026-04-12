import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductDetails } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tag, ShoppingCart, ArrowLeft, Package, ShieldCheck, Truck, RotateCcw } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetails(id as string),
    enabled: !!id,
  });

  const product = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto max-w-6xl pt-32 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full rounded-2xl bg-card border border-border" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4 bg-card border border-border" />
              <Skeleton className="h-6 w-1/4 bg-card border border-border" />
              <Skeleton className="h-32 w-full bg-card border border-border" />
              <Skeleton className="h-12 w-full bg-card border border-border" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-8 text-slate-400">The product you are looking for does not exist or has been removed.</p>
          <Link to="/products">
            <Button className="gradient-bg text-primary-foreground font-bold">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto max-w-6xl pt-32 pb-20 px-4">
        <Link 
          to="/products" 
          className="inline-flex items-center text-sm text-slate-400 hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <div className="animate-fade-in">
            <div className="aspect-square relative rounded-3xl overflow-hidden border border-border bg-card/50 backdrop-blur-md shadow-2xl">
              <img 
                src={product.main_image ? `http://tradinghub.test/uploads/images/product/main_img/${product.main_image}` : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop'} 
                alt={product.product_name}
                className="object-cover w-full h-full"
              />
              {product.price && (
                <div className="absolute top-6 right-6 backdrop-blur-xl bg-primary/20 border border-primary/30 px-6 py-2 rounded-2xl shadow-2xl">
                   <span className="text-2xl font-black text-primary">${product.price}</span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
               {[product.photo1, product.photo2, product.photo3].filter(Boolean).map((img, i) => (
                 <div key={i} className="aspect-square rounded-xl border border-border overflow-hidden bg-card/30 hover:border-primary/50 transition-colors cursor-pointer">
                    <img src={`http://tradinghub.test/uploads/images/product/photo${i+1}/${img}`} className="w-full h-full object-cover" />
                 </div>
               ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="mb-2 inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
               {product.pro_code || "PREMIUM"}
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              {product.product_name}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
               <div className="flex items-center text-yellow-500">
                  <span className="font-bold mr-2">4.8</span>
                  <div className="flex">
                     {[...Array(5)].map((_, i) => (
                       <svg key={i} className={`w-4 h-4 fill-current ${i < 4 ? 'text-yellow-500' : 'text-slate-600'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                       </svg>
                     ))}
                  </div>
               </div>
               <span className="text-sm text-slate-500">|</span>
               <span className="text-sm text-slate-500 font-medium">128 Reviews</span>
            </div>

            <div 
               className="text-lg text-slate-400 mb-8 leading-relaxed whitespace-pre-line prose prose-invert max-w-none"
               dangerouslySetInnerHTML={{ __html: product.details || "No detailed description available for this product yet. Experience the premium quality of Trading Hub products today." }}
            />


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
               <div className="p-4 rounded-2xl border border-border bg-card/30 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                     <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-slate-500">WARRANTY</p>
                     <p className="text-sm font-bold">1 Year Official</p>
                  </div>
               </div>
               <div className="p-4 rounded-2xl border border-border bg-card/30 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                     <Truck className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-slate-500">SHIPPING</p>
                     <p className="text-sm font-bold">Fast Delivery</p>
                  </div>
               </div>
            </div>

            {/* Colors & Sizes */}
            <div className="space-y-6 mb-10">
               {product.color_data && product.color_data.length > 0 && (
                 <div>
                    <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Available Colors</h3>
                    <div className="flex flex-wrap gap-2">
                       {product.color_data.map((c: any) => (
                         <span key={c.color_id} className="px-4 py-2 rounded-xl bg-card border border-border text-sm font-medium hover:border-primary/50 transition-colors cursor-default">
                            {c.color}
                         </span>
                       ))}
                    </div>
                 </div>
               )}
               
               {product.size_data && product.size_data.length > 0 && (
                 <div>
                    <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Available Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                       {product.size_data.map((s: any) => (
                         <span key={s.size_id} className="px-4 py-2 rounded-xl bg-card border border-border text-sm font-medium hover:border-primary/50 transition-colors cursor-default">
                            {s.size}
                         </span>
                       ))}
                    </div>
                 </div>
               )}
            </div>


            <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-border">
               <Button className="flex-1 gradient-bg text-primary-foreground font-black py-8 text-lg rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all">
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Add to Cart
               </Button>
               <Button variant="outline" className="flex-1 py-8 text-lg rounded-2xl font-bold border-border hover:bg-card active:scale-95 transition-all">
                  Chat with Seller
               </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-xs font-bold text-slate-500">
               <div className="flex items-center gap-2"><RotateCcw className="w-3.5 h-3.5" /> 7 DAYS RETURN</div>
               <div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" /> VERIFIED SELLER</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
