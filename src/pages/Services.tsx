import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, MapPin, DollarSign } from "lucide-react";
import { services } from "@/lib/mockData";

const serviceCategories = ["All", "IT & Software", "Design", "Finance", "Health & Fitness", "Food & Beverage", "Health"];

const Services = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchesSearch = !search || s.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || s.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-2">Browse Services</h1>
          <p className="text-muted-foreground mb-6">Discover and hire services from trusted providers</p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search services..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="sm:w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                {serviceCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <div key={service.id} className="glass-card rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
                <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-4xl">🛠️</span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{service.category}</span>
                  <h3 className="font-semibold mt-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" /> {service.location}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-xs text-muted-foreground">({service.reviews})</span>
                    </div>
                    <div className="font-semibold text-primary">
                      ${service.price}{service.priceType === "hourly" ? "/hr" : service.priceType === "starting" ? "+" : ""}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">by {service.provider}</p>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center py-20 text-muted-foreground">No services found.</p>}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;
