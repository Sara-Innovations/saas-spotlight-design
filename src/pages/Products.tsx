import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, MapPin, ShoppingCart } from "lucide-react";
import { products } from "@/lib/mockData";

const productCategories = ["All", "Furniture", "Food & Beverage", "Sports & Fitness", "Books"];

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-2">Shop Products</h1>
          <p className="text-muted-foreground mb-6">Quality products from local businesses</p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="sm:w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                {productCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="glass-card rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
                <div className="h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <span className="text-5xl">📦</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{product.category}</span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full capitalize">{product.condition}</span>
                  </div>
                  <h3 className="font-semibold mt-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" /> {product.location}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">by {product.seller}</p>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center py-20 text-muted-foreground">No products found.</p>}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Products;
