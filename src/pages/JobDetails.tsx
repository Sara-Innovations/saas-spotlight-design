import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchJobDetails } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin, Clock, ArrowLeft, CheckCircle2, DollarSign, Building2,
  Users, Calendar, Mail, Phone, GraduationCap, Briefcase,
  Target, Award, HeartHandshake, FileText, Share2, Bookmark
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { Textarea } from "@/components/ui/textarea";



const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [applied, setApplied] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.customername || "",
    email: user?.customeremail || "",
    phone: user?.customermobile || "",
    coverLetter: ""
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobDetails(id as string),
    enabled: !!id,
  });

  const job = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto max-w-6xl pt-28 px-4">
          <Skeleton className="h-64 w-full rounded-2xl mb-6" />
          <div className="grid lg:grid-cols-3 gap-6">
            <Skeleton className="h-[600px] w-full rounded-2xl lg:col-span-2" />
            <Skeleton className="h-[400px] w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="glass-card rounded-2xl p-12 border border-border bg-card/50">
              <Briefcase className="w-16 h-16 text-slate-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
              <p className="text-slate-400 mb-8">The job you're looking for doesn't exist or has been removed.</p>
              <Link to="/jobs">
                <Button className="gradient-bg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Browse All Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header Section */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </Link>

          {/* Job Header Card */}
          <Card className="p-6 md:p-8 border-border bg-card/50 backdrop-blur-md">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Company Logo */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {job.company_logo ? (
                  <img src={job.company_logo} alt={job.company_name} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-10 h-10 md:w-12 md:h-12 text-slate-400" />
                )}
              </div>

              {/* Job Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-teal-500/10 text-teal-500 border-teal-500/20">
                    {job.job_type}
                  </Badge>
                  {job.category_name && (
                    <Badge variant="outline" className="text-slate-400">
                      {job.category_name}
                    </Badge>
                  )}
                  {job.vacancy > 1 && (
                    <Badge variant="outline" className="text-amber-400 border-amber-400/20">
                      {job.vacancy} Openings
                    </Badge>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.job_title}</h1>
                <p className="text-lg text-slate-400 mb-4">{job.company_name}</p>

                {/* Quick Info Grid */}
                <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-teal-500" />
                    {job.job_location || "Location not specified"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-teal-500" />
                    {job.salary_range || "Negotiable"} ({job.salary_type || "Monthly"})
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-teal-500" />
                    Deadline: {job.application_deadline ? new Date(job.application_deadline).toLocaleDateString() : "Open"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-teal-500" />
                    Posted {new Date(job.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex md:flex-col gap-2">
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-6">

              {/* Job Context */}
              {job.job_context && (
                <Card className="p-6 border-border bg-card/50">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-teal-500" />
                    <h2 className="text-lg font-semibold">Job Context</h2>
                  </div>
                  <div className="text-slate-400 whitespace-pre-line prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: job.job_context }}
                  />
                </Card>
              )}

              {/* Responsibilities */}
              {job.responsibilities && (
                <Card className="p-6 border-border bg-card/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-teal-500" />
                    <h2 className="text-lg font-semibold">Responsibilities</h2>
                  </div>
                  <div className="text-slate-400 whitespace-pre-line prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: job.responsibilities }}
                  />
                </Card>
              )}

              {/* Educational Requirements */}
              {job.educational_requirements && (
                <Card className="p-6 border-border bg-card/50">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-teal-500" />
                    <h2 className="text-lg font-semibold">Educational Requirements</h2>
                  </div>
                  <div className="text-slate-400 whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: job.educational_requirements }}
                  />
                </Card>
              )}

              {/* Experience Requirements */}
              {job.experience_requirements && (
                <Card className="p-6 border-border bg-card/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-teal-500" />
                    <h2 className="text-lg font-semibold">Experience Requirements</h2>
                  </div>
                  <div className="text-slate-400 whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: job.experience_requirements }}
                  />
                </Card>
              )}

              {/* Additional Requirements */}
              {job.additional_requirements && (
                <Card className="p-6 border-border bg-card/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-teal-500" />
                    <h2 className="text-lg font-semibold">Additional Requirements</h2>
                  </div>
                  <div className="text-slate-400 whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: job.additional_requirements }}
                  />
                </Card>
              )}

              {/* Other Benefits */}
              {job.other_benefits && (
                <Card className="p-6 border-border bg-card/50">
                  <div className="flex items-center gap-2 mb-4">
                    <HeartHandshake className="w-5 h-5 text-teal-500" />
                    <h2 className="text-lg font-semibold">Compensation & Other Benefits</h2>
                  </div>
                  <div className="text-slate-400 whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: job.other_benefits }}
                  />
                </Card>
              )}
            </div>

            {/* Right Column - Apply & Company Info */}
            <div className="space-y-6">

              {/* Quick Apply */}
              <Card className="p-6 border-border bg-gradient-to-br from-teal-500/10 to-transparent sticky top-24">
                <h3 className="text-xl font-bold mb-4">Apply Now</h3>
                {applied ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold">Application Submitted!</h4>
                    <p className="text-muted-foreground mt-1">We'll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setApplied(true); }} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Full Name *</label>
                      <Input 
                        className="mt-1" 
                        placeholder="Your full name" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email *</label>
                      <Input 
                        className="mt-1" 
                        type="email" 
                        placeholder="your@email.com" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Phone *</label>
                      <Input 
                        className="mt-1" 
                        placeholder="Your phone number" 
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Cover Letter</label>
                      <Textarea 
                        className="mt-1 min-h-[120px] resize-none" 
                        placeholder="Write a brief cover letter..." 
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Resume / CV</label>
                      <Input className="mt-1" type="file" accept=".pdf,.doc,.docx" />
                    </div>
                    <Button type="submit" className="gradient-bg w-full h-11 font-bold">
                      Submit Application
                    </Button>
                  </form>
                )}
              </Card>

              {/* Job Summary */}
              <Card className="p-6 border-border bg-card/50">
                <h3 className="font-semibold mb-4">Job Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Published On</span>
                    <span>{new Date(job.created_at).toLocaleDateString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-slate-400">Vacancy</span>
                    <span>{job.vacancy || 1}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-slate-400">Employment Status</span>
                    <span>{job.job_type}</span>
                  </div>
                  <Separator />
                  {job.experience && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Experience</span>
                        <span>{job.experience}</span>
                      </div>
                      <Separator />
                    </>
                  )}
                  {job.gender && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Gender</span>
                        <span>{job.gender}</span>
                      </div>
                      <Separator />
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Age</span>
                    <span>Any</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-slate-400">Job Location</span>
                    <span>{job.job_location}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-slate-400">Salary</span>
                    <span className="text-teal-500 font-medium">{job.salary_range || "Negotiable"}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-slate-400">Deadline</span>
                    <span className="text-red-400">{job.application_deadline ? new Date(job.application_deadline).toLocaleDateString() : "Open"}</span>
                  </div>
                </div>
              </Card>

              {/* Company Contact */}
              {(job.company_email || job.company_phone) && (
                <Card className="p-6 border-border bg-card/50">
                  <h3 className="font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    {job.company_email && (
                      <a href={`mailto:${job.company_email}`} className="flex items-center gap-3 text-slate-400 hover:text-teal-400 transition-colors">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{job.company_email}</span>
                      </a>
                    )}
                    {job.company_phone && (
                      <a href={`tel:${job.company_phone}`} className="flex items-center gap-3 text-slate-400 hover:text-teal-400 transition-colors">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{job.company_phone}</span>
                      </a>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobDetails;
