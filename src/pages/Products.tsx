import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Search, ShoppingBag, Tag, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", searchTerm, page],
        queryFn: () => fetchProducts({ search: searchTerm, page }),
    });

    const products = data?.data || [];

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30">
            <Navbar />

            
            <main className="container mx-auto px-4 pt-32 pb-20">
                <div className="flex flex-col items-center mb-16 space-y-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium animate-fade-in">
                        <Package className="w-4 h-4 mr-2" />
                        Marketplace
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight">
                        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Products</span>
                    </h1>
                    <p className="text-slate-400 text-center max-w-2xl mx-auto">
                        Explore our curated selection of high-quality products from top businesses. 
                        Find exactly what you need with our advanced filters.
                    </p>
                </div>

                <div className="mb-12 max-w-xl mx-auto backdrop-blur-md bg-card/30 border border-border p-2 rounded-2xl shadow-lg flex items-center transition-all duration-300 focus-within:border-indigo-500/50 focus-within:shadow-2xl focus-within:shadow-indigo-500/20 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:scale-[1.02]">


                    <Search className="w-5 h-5 text-slate-400 ml-3" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="bg-transparent border-none focus:ring-0 outline-none text-foreground placeholder-slate-500 flex-1 px-4 py-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-[300px] w-full rounded-2xl bg-white/5" />
                                <Skeleton className="h-6 w-3/4 bg-white/5" />
                                <Skeleton className="h-4 w-1/2 bg-white/5" />
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <p className="text-red-400 text-lg">Error loading products. Please try again later.</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <ShoppingBag className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg">No products found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product: any) => (
                            <Link 
                                key={product.product_id}
                                to={`/products/${product.product_id}`}
                                className="group relative backdrop-blur-md bg-card/50 border border-border rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:scale-[1.02] cursor-pointer block"
                            >
                                <div className="aspect-[4/5] overflow-hidden relative">
                                    <img 
                                        src={product.main_image ? `http://tradinghub.test/uploads/images/product/main_img/${product.main_image}` : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop'} 
                                        alt={product.product_name}
                                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 backdrop-blur-md bg-black/50 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                                        <Tag className="w-3 h-3 inline mr-1" />
                                        {product.price ? `$${product.price}` : 'Quote'}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                                        {product.product_name}
                                    </h3>
                                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                                        {product.product_short_name || product.short_desc || "Premium quality product available on Trading Hub."}
                                    </p>
                                    <div className="w-full py-3 px-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg hover:shadow-indigo-600/20 active:scale-95 text-center">
                                        View Details
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                )}
            </main>
            
            <Footer />
        </div>
    );
};

export default Products;
