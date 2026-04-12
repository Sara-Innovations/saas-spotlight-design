import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/lib/api";
import { Link } from "react-router-dom";
import { Search, Briefcase, MapPin, DollarSign, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const Jobs = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["jobs", searchTerm, page],
        queryFn: () => fetchJobs({ search: searchTerm, page }),
    });

    const jobs = data?.data || [];

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

                {isLoading ? (
                    <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-40 w-full rounded-2xl bg-card border border-border" />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-20 bg-card/30 rounded-3xl border border-border max-w-4xl mx-auto">
                        <p className="text-red-400 text-lg">Error loading jobs. Please try again later.</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20 bg-card/30 rounded-3xl border border-border max-w-4xl mx-auto">
                        <Briefcase className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg">No jobs found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                        {jobs.map((job: any) => (
                            <Link
                                key={job.id}
                                to={`/jobs/${job.id}`}
                                className="group relative backdrop-blur-md bg-card/50 border border-border p-6 md:p-8 rounded-2xl transition-all duration-300 hover:border-teal-500/50 hover:bg-card/80 hover:shadow-2xl hover:shadow-teal-500/10 hover:scale-[1.01] cursor-pointer block"
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-2xl font-bold group-hover:text-teal-400 transition-colors">
                                                {job.job_title}
                                            </h3>
                                            <Badge variant="outline" className="bg-teal-500/10 text-teal-400 border-teal-500/20">
                                                New
                                            </Badge>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-slate-400 text-sm">
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-2 text-teal-500/60" />
                                                {job.address || "Remote"}
                                            </div>
                                            <div className="flex items-center">
                                                <DollarSign className="w-4 h-4 mr-2 text-teal-500/60" />
                                                {job.budget ? `$${job.budget}` : "Competitive"}
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-2 text-teal-500/60" />
                                                {job.create_date ? new Date(job.create_date).toLocaleDateString() : "Recently"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="whitespace-nowrap px-6 py-2 rounded-xl border border-border bg-card/50 hover:bg-card/80 hover:border-teal-500/30 transition-all font-medium flex items-center group/btn text-center">
                                            Apply Now
                                            <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-border">
                                    <p className="text-slate-400 line-clamp-2 italic text-sm md:text-base">
                                        "{job.job_details || "Looking for a qualified professional to join our team. Excellent opportunity with competitive benefits and room for growth."}"
                                    </p>
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

export default Jobs;
