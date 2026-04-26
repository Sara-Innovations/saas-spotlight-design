import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Globe, Clock, Star, ArrowLeft, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchBusinessDetails, BARGAIN_URL } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const tabs = ["About", "Services", "Our Clients", "Gallery", "Our Expert", "Contact"];

const BusinessDetailsSkeleton = () => (
  <div className="min-h-screen">
    <div className="pt-16">
      <div className="bg-muted py-16 px-4">
        <div className="container mx-auto max-w-5xl space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-2/3" />
          <div className="flex gap-6 pt-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="pt-4">
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
    <div className="border-b border-border bg-background sticky top-16 z-40">
      <div className="container mx-auto max-w-5xl px-4 flex gap-4 py-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-20" />
        ))}
      </div>
    </div>
    <div className="container mx-auto max-w-5xl py-10 px-4 space-y-6">
      <Skeleton className="h-8 w-1/4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  </div>
);

const BusinessDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, token } = useAuth();
  const [activeTab, setActiveTab] = useState("About");

  const { data, isLoading, error } = useQuery({
    queryKey: ["business", id],
    queryFn: () => fetchBusinessDetails(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <BusinessDetailsSkeleton />
      </>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 text-center px-4">
          <h1 className="text-2xl font-bold text-destructive">Error loading business</h1>
          <p className="text-muted-foreground mt-2">The business you are looking for might have been moved or deleted.</p>
          <Link to="/businesses" className="text-primary hover:underline mt-6 inline-block font-medium">Back to search</Link>
        </div>
      </div>
    );
  }

  const { business, about, services, clients, gallery, experts } = data.data;


  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-16">
        <div className="bg-gradient-to-r from-gray-600 to-gray-500 text-white py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <Link to="/businesses" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Search
            </Link>
            <p className="text-white/70 italic text-sm">Hey There, We Are</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-1">{business.business_name}</h1>
            <div className="flex flex-wrap items-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{business.business_address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Open Now</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 text-sm font-semibold">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>4.5</span>
                <span className="text-white/60">(12 reviews)</span>
              </div>
            </div>

            <div className="mt-8">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
                asChild
              >
                <a
                  href={isAuthenticated && token 
                    ? `${BARGAIN_URL}/api/Api_auth/sso?token=${token}&redirect=${encodeURIComponent(`website?com_id=${business.id}`)}`
                    : `${BARGAIN_URL}/website?com_id=${business.id}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" /> Visit Website
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-border bg-background sticky top-16 z-40">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          {activeTab === "About" && (
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4"> {business.business_name}</h2>
                <div
                  className="text-muted-foreground mb-4 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: business?.business_about || "No description provided." }}
                />
                <div className="mt-6 space-y-3">
                  {business.seller_email && (
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>{business.seller_email}</span>
                    </div>
                  )}
                  {business.cwebsite && (
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="w-4 h-4 text-primary" />
                      <a href={business.cwebsite} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                        {business.cwebsite}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{business.business_address}</span>
                  </div>
                </div>
              </div>
              <div className="bg-muted rounded-2xl overflow-hidden flex items-center justify-center relative min-h-[300px]">
                {business.cmap ? (
                  business.cmap.startsWith('http') ? (
                    <iframe
                      src={business.cmap}
                      className="absolute inset-0 w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
                      dangerouslySetInnerHTML={{ __html: business.cmap }}
                    />
                  )
                ) : (
                  <span className="text-muted-foreground text-sm">Map View Not Available</span>
                )}
              </div>
            </div>
          )}

          {activeTab === "Services" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Services</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services && services.length > 0 ? (
                  services.map((service: any) => (
                    <div key={service.id} className="glass-card p-5 rounded-xl">
                      <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center mb-3">
                        <Star className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h3 className="font-semibold">{service.title}</h3>
                      <div
                        className="text-sm text-muted-foreground mt-1 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: service.details }}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No services listed.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "Our Clients" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Valued Clients</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {clients && clients.length > 0 ? (
                  clients.map((client: any) => (
                    <div key={client.id} className="glass-card p-6 rounded-xl text-center">
                      <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center text-lg font-bold text-muted-foreground overflow-hidden">
                        {client.image ? (
                          <img src={`/asset/images/client/${client.image}`} alt={client.title} className="w-full h-full object-cover" />
                        ) : (
                          client.title[0]
                        )}
                      </div>
                      <p className="text-sm font-medium">{client.title}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No clients listed.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "Gallery" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery && gallery.length > 0 ? (
                  gallery.map((item: any) => (
                    <div key={item.id} className="bg-muted rounded-xl aspect-video overflow-hidden">
                      <img src={`/asset/images/gallery/${item.image}`} alt="Gallery item" className="w-full h-full object-cover" />
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No gallery items.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "Our Expert" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Meet Our Experts</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {experts && experts.length > 0 ? (
                  experts.map((expert: any) => (
                    <div key={expert.id} className="glass-card p-6 rounded-xl text-center">
                      <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-muted-foreground overflow-hidden">
                        {expert.image ? (
                          <img src={`/asset/images/expert/${expert.image}`} alt={expert.name} className="w-full h-full object-cover" />
                        ) : (
                          expert.name.split(" ").map((n: string) => n[0]).join("")
                        )}
                      </div>
                      <h3 className="font-semibold">{expert.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{expert.designation}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No experts listed.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "Contact" && (
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="text-sm font-medium">Your Name</label>
                    <input className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <textarea className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm h-28" placeholder="How can we help you?" />
                  </div>
                  <Button className="gradient-bg text-primary-foreground w-full">Send Message</Button>
                </form>
              </div>
              <div className="space-y-4">
                <div className="glass-card p-5 rounded-xl">
                  <h3 className="font-semibold mb-2">Owner</h3>
                  <p className="text-sm text-muted-foreground">{business.owner_name}</p>
                </div>
                <div className="glass-card p-5 rounded-xl">
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-sm text-muted-foreground">{business.business_address}</p>
                </div>
                {business.seller_contact && (
                  <div className="glass-card p-5 rounded-xl">
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <p className="text-sm text-muted-foreground">{business.seller_contact}</p>
                  </div>
                )}
                {business.seller_email && (
                  <div className="glass-card p-5 rounded-xl">
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-sm text-muted-foreground">{business.seller_email}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessDetails;
