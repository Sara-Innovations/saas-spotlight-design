import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/lib/api";
import { Link } from "react-router-dom";
import { Search, Briefcase, MapPin, DollarSign, Calendar, ArrowRight, Building2, Users, Clock, Filter } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Job {
  id: number;
  job_title: string;
  vacancy: number;
  job_type: string;
  experience: string | null;
  gender: string | null;
  job_location: string;
  job_context: string;
  responsibilities: string;
  educational_requirements: string;
  experience_requirements: string;
  additional_requirements: string;
  other_benefits: string;
  salary_range: string;
  salary_type: string;
  application_deadline: string;
  thumbnail: string | null;
  category_name: string | null;
  company_name: string | null;
  company_logo: string | null;
  company_address: string | null;
  created_at: string;
}

const Jobs = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["jobs", searchTerm, page],
        queryFn: () => fetchJobs({ search: searchTerm, page, limit: 12 }),
    });

    const jobs: Job[] = data?.data || [];
    const pagination = data?.pagination;

    // Get unique categories from jobs
    const categories = [...new Set(jobs.map((job: Job) => job.category_name).filter(Boolean))];

    const filteredJobs = selectedCategory
      ? jobs.filter((job: Job) => job.category_name === selectedCategory)
      : jobs;

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30">
            <Navbar />


            <main className="container mx-auto px-4 pt-32 pb-20">
                <div className="flex flex-col items-center mb-16 space-y-4 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium animate-fade-in">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Careers
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Opportunity</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Connect with top businesses and browse verified job listings.
                        Filter through hundreds of active roles to find the perfect fit for your career.
                    </p>
                </div>

                <div className="mb-12 max-w-2xl mx-auto backdrop-blur-md bg-card/30 border border-border p-2 rounded-2xl shadow-lg flex items-center transition-all duration-300 focus-within:border-teal-500/50 focus-within:shadow-2xl focus-within:shadow-teal-500/20 focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:scale-[1.02]">

                    <Search className="w-5 h-5 text-slate-400 ml-3" />
                    <input
                        type="text"
                        placeholder="Search jobs by title, skills or keywords..."
                        className="bg-transparent border-none focus:ring-0 outline-none text-foreground placeholder-slate-500 flex-1 px-4 py-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>

                {/* Category Filter */}
                {categories.length > 0 && (
                    <div className="mb-8 flex flex-wrap gap-2 justify-center">
                        <button
                            onClick={() => setSelectedCategory("")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                selectedCategory === ""
                                    ? "bg-teal-500 text-white"
                                    : "bg-card/50 border border-border hover:border-teal-500/50"
                            }`}
                        >
                            All Categories
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat as string)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    selectedCategory === cat
                                        ? "bg-teal-500 text-white"
                                        : "bg-card/50 border border-border hover:border-teal-500/50"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-80 w-full rounded-2xl bg-card border border-border" />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-20 bg-card/30 rounded-3xl border border-border">
                        <p className="text-red-400 text-lg">Error loading jobs. Please try again later.</p>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-20 bg-card/30 rounded-3xl border border-border">
                        <Briefcase className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                        <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job: Job) => (
                            <Link
                                key={job.id}
                                to={`/jobs/${job.id}`}
                                className="group relative backdrop-blur-md bg-card/50 border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-teal-500/50 hover:bg-card/80 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-1 cursor-pointer block"
                            >
                                {/* Job Header with Company */}
                                <div className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                            {job.company_logo ? (
                                                <img src={job.company_logo} alt={job.company_name || ''} className="w-full h-full object-cover" />
                                            ) : (
                                                <Building2 className="w-7 h-7 text-slate-400" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg leading-tight group-hover:text-teal-400 transition-colors line-clamp-2">
                                                {job.job_title}
                                            </h3>
                                            <p className="text-sm text-slate-400 mt-1">{job.company_name}</p>
                                        </div>
                                    </div>

                                    {/* Job Meta */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <Badge variant="secondary" className="bg-teal-500/10 text-teal-400 border-teal-500/20">
                                            {job.job_type}
                                        </Badge>
                                        {job.category_name && (
                                            <Badge variant="outline" className="text-slate-400">
                                                {job.category_name}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Job Details */}
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <MapPin className="w-4 h-4" />
                                            <span className="truncate">{job.job_location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <DollarSign className="w-4 h-4" />
                                            <span>{job.salary_range || 'Negotiable'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Users className="w-4 h-4" />
                                            <span>{job.vacancy} {job.vacancy === 1 ? 'Position' : 'Positions'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Clock className="w-4 h-4" />
                                            <span>Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-6 py-4 border-t border-border bg-card/30 flex items-center justify-between">
                                    <span className="text-xs text-slate-500">
                                        Posted {new Date(job.created_at).toLocaleDateString()}
                                    </span>
                                    <Button variant="ghost" size="sm" className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10">
                                        View Details
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination && pagination.total_pages > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                        <Button
                            variant="outline"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <div className="flex items-center gap-2">
                            {[...Array(pagination.total_pages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setPage(i + 1)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                                        page === i + 1
                                            ? 'bg-teal-500 text-white'
                                            : 'bg-card/50 border border-border hover:border-teal-500/50'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setPage(p => Math.min(pagination.total_pages, p + 1))}
                            disabled={page === pagination.total_pages}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Jobs;
