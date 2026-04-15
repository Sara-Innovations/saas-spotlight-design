import { useQuery } from "@tanstack/react-query";
import { fetchBargainProducts, searchBargainProducts } from "@/lib/api";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { Search, ShoppingBag, Package, Store, Star, AlertCircle, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const allProductsRef = useRef<any[]>([]);
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Use regular products API for both search and normal display (with client-side filtering for search)
    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: debouncedSearchTerm ? ["search_products", debouncedSearchTerm] : ["bargain_products", page],
        queryFn: debouncedSearchTerm 
            ? () => fetchBargainProducts(1, 100) // Fetch more products for search filtering
            : () => fetchBargainProducts(page, 20),
        staleTime: 0, // Always refetch to get fresh data
        refetchOnMount: "always", // Refetch when component mounts
        refetchOnWindowFocus: false, // Don't refetch on window focus
    });

    // Reset products when component mounts (navigation from other pages)
    useEffect(() => {
        // Reset state when navigating to products page
        setPage(1);
        allProductsRef.current = [];
        setAllProducts([]);
    }, []); // Empty dependency array - runs once on mount

    // Reset page when search term changes
    useEffect(() => {
        setPage(1);
        allProductsRef.current = [];
        setAllProducts([]);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        if (!data) return;

        // Handle regular products API response ({status, data})
        const incoming: any[] = Array.isArray((data as any).data) 
            ? (data as any).data 
            : [];

        // Parse qty and price fields for all products
        const parsedProducts = incoming.map((product) => ({
            ...product,
            qty: parseInt(product.qty) || 0,
            price: parseFloat(product.price) || 0,
            display_price: parseFloat(product.display_price) || parseFloat(product.price) || 0,
        }));

        if (parsedProducts.length === 0) return;

        // Handle data differently for search vs regular products
        if (debouncedSearchTerm) {
            // For search, replace all products (no pagination for search)
            allProductsRef.current = parsedProducts;
        } else {
            // For regular products, handle pagination
            if (page === 1) {
                allProductsRef.current = parsedProducts;
            } else {
                const existingIds = new Set(allProductsRef.current.map((p) => p.product_id));
                const newItems = parsedProducts.filter((p) => !existingIds.has(p.product_id));
                allProductsRef.current = [...allProductsRef.current, ...newItems];
            }
        }

        setAllProducts([...allProductsRef.current]);
    }, [data, page, debouncedSearchTerm]);

    const pagination = (data as any)?.pagination ?? null;
    const hasMore = pagination
        ? pagination.current_page < pagination.total_pages
        : false;

    // Apply client-side filtering for search since backend API doesn't filter properly
    const filtered = debouncedSearchTerm 
        ? allProducts.filter((p: any) => {
            const term = debouncedSearchTerm.toLowerCase();
            const productName = (p.product_name || "").toLowerCase();
            const businessName = (p.business_name || "").toLowerCase();
            const category = (p.cat_id || "").toLowerCase();
            const subCategory = (p.scat_id || "").toLowerCase();
            const productCode = (p.pro_code || "").toLowerCase();
            
            return (
                productName.includes(term) ||
                businessName.includes(term) ||
                category.includes(term) ||
                subCategory.includes(term) ||
                productCode.includes(term)
            );
        })
        : allProducts;

    // Show skeletons during initial load or search to prevent blinking
    const showSkeletons = (isLoading || (isFetching && debouncedSearchTerm)) && allProducts.length === 0;

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30">
            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-20">
                {/* Header */}
                <div className="flex flex-col items-center mb-16 space-y-4">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium animate-fade-in shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        <Package className="w-4 h-4 mr-2" />
                        Bargain Shop Marketplace
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight">
                        Discover{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Great Deals
                        </span>
                    </h1>
                    <p className="text-slate-400 text-center max-w-2xl mx-auto text-lg pt-2">
                        Browse active products straight from Bargain Shop sellers. Every item listed here is verified active and ready for purchase.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-14 max-w-2xl mx-auto backdrop-blur-xl bg-card/40 border border-white/10 p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center transition-all duration-300 focus-within:border-indigo-500/50 focus-within:shadow-[0_8px_30px_rgba(99,102,241,0.2)] focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:scale-[1.02]">
                    <Search className="w-6 h-6 text-slate-400 ml-4" />
                    <input
                        type="text"
                        placeholder="Search products by name or seller..."
                        className="bg-transparent border-none focus:ring-0 outline-none text-foreground placeholder-slate-500 flex-1 px-4 py-3 text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="p-2 rounded-full hover:bg-muted transition-colors mr-2"
                            aria-label="Clear search"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    )}
                </div>

                {/* Products count when loaded */}
                {!isLoading && allProducts.length > 0 && (
                    <p className="text-slate-500 text-sm mb-6 text-center">
                        {searchTerm && (
                            <>
                                Search results for "<span className="text-indigo-400 font-semibold">{searchTerm}</span>":{" "}
                            </>
                        )}
                        Showing <span className="text-indigo-400 font-semibold">{allProducts.length}</span>
                        {searchTerm ? " products" : (pagination?.total_items ? ` of ${pagination.total_items}` : "")} products
                        {isFetching && searchTerm && (
                            <span className="ml-2 text-indigo-400 animate-pulse">Searching...</span>
                        )}
                    </p>
                )}

                {/* States */}
                {showSkeletons ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-[240px] w-full rounded-2xl bg-white/5" />
                                <Skeleton className="h-6 w-3/4 bg-white/5" />
                                <Skeleton className="h-4 w-1/2 bg-white/5" />
                                <Skeleton className="h-10 w-full rounded-xl bg-white/5" />
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-24 bg-red-500/5 rounded-3xl border border-red-500/20">
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <p className="text-red-400 text-lg font-semibold mb-2">Failed to load products</p>
                        <p className="text-slate-500 text-sm">{(error as any)?.message || "Please check your connection and try again."}</p>
                    </div>
                ) : filtered.length === 0 && !isFetching ? (
                    <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/10">
                        <ShoppingBag className="w-16 h-16 text-slate-500 mx-auto mb-6 opacity-50" />
                        <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                        <p className="text-slate-400 text-lg">
                            {searchTerm
                                ? `No results for "${searchTerm}"`
                                : "No active products available right now."}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                            {filtered.map((product: any) => {
                                const displayPrice =
                                    product.display_price > 0
                                        ? product.display_price
                                        : product.price > 0
                                            ? product.price
                                            : null;

                                return (
                                    <Link
                                        key={`prod-${product.product_id}`}
                                        to={`/shop/product-details?pid=${product.product_id}&pvid=${product.pro_variation_id || ''}&pslug=${product.slug || product.product_slug || ''}`}
                                        className="group relative backdrop-blur-md bg-card/40 border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] hover:-translate-y-2 cursor-pointer flex flex-col"
                                    >
                                        {/* Image */}
                                        <div className="aspect-[4/3] overflow-hidden relative bg-black/20">
                                            <img
                                                src={
                                                    product.image_url ||
                                                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
                                                }
                                                alt={product.product_name || "Product"}
                                                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src =
                                                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop";
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            {/* Price Tag */}
                                            <div className="absolute top-3 right-3 backdrop-blur-xl bg-black/70 px-3 py-1 rounded-full text-sm font-black text-white border border-white/10 shadow-lg">
                                                {displayPrice
                                                    ? `$${Number(displayPrice).toFixed(2)}`
                                                    : "0.00"}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center text-xs font-medium text-slate-400 bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/10">
                                                    <Store className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                                                    <span className="truncate max-w-[110px]">
                                                        {product.business_name || "Bargain Seller"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20">
                                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                    <span className="text-xs font-bold text-yellow-500">
                                                        {product.average_rating > 0
                                                            ? product.average_rating
                                                            : "New"}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="text-base font-bold mb-2 group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
                                                {product.product_name || "Unnamed Product"}
                                            </h3>

                                            <div
                                                className="text-slate-400 text-xs line-clamp-2 mb-4 flex-grow"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        product.short_desc ||
                                                        product.details ||
                                                        "Quality item available for purchase.",
                                                }}
                                            />

                                            <div className="mt-auto space-y-3">
                                                {/* Stock */}
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${product.qty > 0
                                                            ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                                                            : "bg-red-500"
                                                            }`}
                                                    />
                                                    <span className="text-xs font-semibold text-slate-400">
                                                        {product.qty > 0 ? (
                                                            <>
                                                                IN STOCK:{" "}
                                                                <span className="text-emerald-400">{product.qty}</span>
                                                            </>
                                                        ) : (
                                                            <span className="text-red-400">OUT OF STOCK</span>
                                                        )}
                                                    </span>
                                                </div>

                                                {/* Button */}
                                                <div
                                                    className={`w-full py-3 px-4 rounded-xl font-bold border text-white transition-all duration-300 shadow-lg active:scale-[0.98] text-center flex items-center justify-center text-sm ${product.qty > 0
                                                            ? "bg-indigo-600/80 hover:bg-indigo-600 border-indigo-500/50 hover:shadow-indigo-600/40"
                                                            : "bg-red-600/80 hover:bg-red-600 border-red-500/50 hover:shadow-red-600/40"
                                                        }`}
                                                >
                                                    View Details
                                                    <svg
                                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}

                            {/* Loading skeleton cards for next page */}
                            {isFetching && page > 1 &&
                                [...Array(4)].map((_, i) => (
                                    <div key={`skel-${i}`} className="space-y-4">
                                        <Skeleton className="h-[240px] w-full rounded-2xl bg-white/5" />
                                        <Skeleton className="h-6 w-3/4 bg-white/5" />
                                        <Skeleton className="h-4 w-1/2 bg-white/5" />
                                        <Skeleton className="h-10 w-full rounded-xl bg-white/5" />
                                    </div>
                                ))}
                        </div>

                        {/* Load More */}
                        {hasMore && !debouncedSearchTerm && !searchTerm && (
                            <div className="text-center">
                                <Button
                                    onClick={() => setPage((p) => p + 1)}
                                    disabled={isFetching}
                                    variant="outline"
                                    className="rounded-full px-10 py-6 font-bold text-base bg-card hover:bg-indigo-500/10 hover:text-indigo-400 border-white/10"
                                >
                                    {isFetching ? "Loading..." : "Show More Products"}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Products;
