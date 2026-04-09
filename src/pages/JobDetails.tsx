import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { jobs } from "@/lib/mockData";
import { MapPin, Clock, Briefcase, ArrowLeft, CheckCircle2 } from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const [applied, setApplied] = useState(false);
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen"><Navbar />
        <div className="pt-28 text-center">
          <h1 className="text-2xl font-bold">Job not found</h1>
          <Link to="/jobs" className="text-primary underline mt-4 inline-block">Back to jobs</Link>
        </div>
      </div>
    );
  }

  const daysAgo = Math.floor((Date.now() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </Link>

          <div className="glass-card rounded-xl p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{job.type}</span>
              <span className="text-xs text-muted-foreground">{job.category}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
            <p className="text-lg text-muted-foreground mt-1">{job.company}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 capitalize" /> {job.type}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}</span>
            </div>
            <div className="text-2xl font-bold text-primary mt-4">{job.salary}</div>

            <hr className="my-6 border-border" />

            <h2 className="text-lg font-semibold mb-3">Job Description</h2>
            <p className="text-muted-foreground mb-6">{job.description}</p>

            <h2 className="text-lg font-semibold mb-3">Requirements</h2>
            <ul className="space-y-2 mb-8">
              {job.requirements.map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Apply Form */}
          <div className="glass-card rounded-xl p-8 mt-6">
            <h2 className="text-xl font-bold mb-6">Apply for this Position</h2>
            {applied ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold">Application Submitted!</h3>
                <p className="text-muted-foreground mt-1">We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setApplied(true); }} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input className="mt-1" placeholder="Your full name" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email *</label>
                    <Input className="mt-1" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Phone *</label>
                    <Input className="mt-1" placeholder="0400 000 000" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Resume / CV</label>
                    <Input className="mt-1" type="file" accept=".pdf,.doc,.docx" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Cover Letter</label>
                  <textarea className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm h-28" placeholder="Tell us why you're a great fit..." />
                </div>
                <Button type="submit" className="gradient-bg text-primary-foreground w-full sm:w-auto">
                  Submit Application
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JobDetails;
