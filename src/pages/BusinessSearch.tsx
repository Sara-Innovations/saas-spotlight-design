import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Phone, Star, ChevronRight } from "lucide-react";
import { businesses, categories } from "@/lib/mockData";

const BusinessSearch = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("");

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const matchesSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All Categories" || b.category === category;
      const matchesLocation = !location || b.location.toLowerCase().includes(location.toLowerCase()) || b.state.toLowerCase().includes(location.toLowerCase());
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [search, category, location]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Search */}
      <section className="pt-16">
        <div className="gradient-bg py-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Business Search</h1>
            <div className="bg-background rounded-xl p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="What are you looking for?"
                  className="pl-10 border-0 bg-muted/50"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="md:w-48 border-0 bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Suburb, State, Postcode"
                  className="pl-10 border-0 bg-muted/50"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button className="gradient-bg text-primary-foreground">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} businesses found</p>
          <div className="space-y-4">
            {filtered.map((business) => (
              <div key={business.id} className="glass-card rounded-xl p-0 overflow-hidden flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{business.category}</span>
                  <h3 className="text-xl font-bold text-primary mt-1">{business.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{business.location}, {business.state}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{business.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{business.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({business.reviews} reviews)</span>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <a href={`tel:${business.phone}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                      <Phone className="w-4 h-4" /> {business.phone}
                    </a>
                    <Link to={`/businesses/${business.id}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                      <ChevronRight className="w-4 h-4" /> Details
                    </Link>
                  </div>
                </div>
                <Link
                  to={`/businesses/${business.id}`}
                  className="md:w-40 bg-primary/5 flex items-center justify-center p-4 hover:bg-primary/10 transition-colors border-l border-border"
                >
                  <span className="text-sm font-semibold text-primary">View</span>
                </Link>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No businesses found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessSearch;
