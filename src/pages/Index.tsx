import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceGrid from "@/components/ServiceGrid";
import ModernFeatures from "@/components/ModernFeatures";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, Briefcase, ShoppingBag, Users, CreditCard, Globe, Shield, Zap, Building2, ArrowRight, Store, TrendingUp } from "lucide-react";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <ServiceGrid />
    <ModernFeatures />

    {/* Join as Company Section */}
    <section className="section-padding bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-semibold">For Businesses</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              Join as a Company
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Grow your business with Australia's complete trading platform. 
              List your services, sell products, post jobs, and reach thousands 
              of potential customers — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 font-bold shadow-lg shadow-black/20">
                  Register Your Company
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Store, title: "List Products", desc: "Sell to thousands" },
              { icon: Briefcase, title: "Offer Services", desc: "Reach new clients" },
              { icon: Users, title: "Post Jobs", desc: "Find great talent" },
              { icon: TrendingUp, title: "Grow Revenue", desc: "Scale your business" },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                <item.icon className="w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
