import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { businesses } from "@/lib/mockData";
import { MapPin, Phone, Mail, Globe, Clock, Star, ArrowLeft } from "lucide-react";

const tabs = ["About", "Services", "Our Clients", "Gallery", "Our Expert", "Contact"];

const BusinessDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("About");
  const business = businesses.find((b) => b.id === id);

  if (!business) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 text-center">
          <h1 className="text-2xl font-bold">Business not found</h1>
          <Link to="/businesses" className="text-primary underline mt-4 inline-block">Back to search</Link>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl md:text-4xl font-bold mt-1">{business.name}</h1>
            <div className="flex flex-wrap items-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{business.address}, {business.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{business.openHours}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <a href={`tel:${business.phone}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 font-semibold hover:bg-white/10 transition-colors">
                <Phone className="w-4 h-4" /> {business.phone}
              </a>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{business.rating}</span>
                <span className="text-white/60">({business.reviews} reviews)</span>
              </div>
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
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
            <Link
              to="/contact"
              className="ml-auto px-5 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg my-1.5 hover:opacity-90 transition-opacity"
            >
              Visit Us
            </Link>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          {activeTab === "About" && (
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">{business.name}</h2>
                <p className="text-muted-foreground mb-4">{business.description}</p>
                <p className="text-sm text-muted-foreground">
                  We are dedicated to providing the best experience for our customers. Our team of experts ensures quality service delivery with attention to detail and customer satisfaction.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{business.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-primary" />
                    <span>{business.website}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{business.address}, {business.state}</span>
                  </div>
                </div>
              </div>
              <div className="bg-muted rounded-2xl h-64 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Map / Location Preview</span>
              </div>
            </div>
          )}

          {activeTab === "Services" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Services</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {business.services.map((service) => (
                  <div key={service} className="glass-card p-5 rounded-xl">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center mb-3">
                      <Star className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold">{service}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Professional {service.toLowerCase()} services tailored to your needs.</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Our Clients" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Valued Clients</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["ABC Corp", "XYZ Ltd", "Global Industries", "Tech Solutions", "Smart Business", "Innovation Co", "Premier Group", "Elite Services"].map((client) => (
                  <div key={client} className="glass-card p-6 rounded-xl text-center">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center text-lg font-bold text-muted-foreground">
                      {client[0]}
                    </div>
                    <p className="text-sm font-medium">{client}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Gallery" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-muted rounded-xl aspect-video flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Photo {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Our Expert" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Meet Our Experts</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {["John Smith", "Sarah Johnson", "Mike Chen"].map((name, i) => (
                  <div key={name} className="glass-card p-6 rounded-xl text-center">
                    <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-muted-foreground">
                      {name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{["Director", "Senior Consultant", "Operations Manager"][i]}</p>
                    <p className="text-xs text-muted-foreground mt-2">{["10+ years experience", "8+ years experience", "5+ years experience"][i]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Contact" && (
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Your Name</label>
                    <input className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <input className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm" placeholder="0400 000 000" />
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
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-sm text-muted-foreground">{business.address}, {business.state}</p>
                </div>
                <div className="glass-card p-5 rounded-xl">
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-sm text-muted-foreground">{business.phone}</p>
                </div>
                <div className="glass-card p-5 rounded-xl">
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground">{business.email}</p>
                </div>
                <div className="glass-card p-5 rounded-xl">
                  <h3 className="font-semibold mb-2">Hours</h3>
                  <p className="text-sm text-muted-foreground">{business.openHours}</p>
                </div>
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
