import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Clock, Briefcase, DollarSign } from "lucide-react";
import { jobs } from "@/lib/mockData";

const jobCategories = ["All", "IT & Software", "Hospitality", "Finance", "Health & Fitness", "Health"];
const jobTypes = ["All Types", "full-time", "part-time", "contract", "casual"];

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All Types");

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchesSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || j.category === category;
      const matchesType = type === "All Types" || j.type === type;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [search, category, type]);

  const daysAgo = (date: string) => {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : diff === 1 ? "1 day ago" : `${diff} days ago`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-2">Find Jobs</h1>
          <p className="text-muted-foreground mb-6">Browse opportunities from leading businesses</p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Job title or company..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="sm:w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                {jobCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="sm:w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                {jobTypes.map((t) => <SelectItem key={t} value={t}>{t === "All Types" ? t : t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            {filtered.map((job) => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="block glass-card rounded-xl p-6 hover:scale-[1.01] transition-transform">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{job.type}</span>
                      <span className="text-xs text-muted-foreground">{job.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{job.salary}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {daysAgo(job.postedDate)}</span>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center py-20 text-muted-foreground">No jobs found.</p>}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Jobs;
