import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, Briefcase, ShoppingBag, Users, CreditCard, Globe, Shield, Zap, Building2, ArrowRight, Store, TrendingUp } from "lucide-react";

const features = [
  { icon: Globe, title: "Website Management", desc: "Full website & cPanel management for your business online presence." },
  { icon: Briefcase, title: "Service Management", desc: "Showcase and manage your business services with rich detail pages." },
  { icon: ShoppingBag, title: "Product Management", desc: "List and sell products with a powerful e-commerce experience." },
  { icon: Search, title: "Job Management", desc: "Post jobs, manage applications, and find the right talent." },
  { icon: Users, title: "Customer Management", desc: "Customer profiles, history tracking, and relationship management." },
  { icon: CreditCard, title: "Payment Management", desc: "Invoicing, payments, and payouts all in one place." },
  { icon: Shield, title: "Service Acquisition", desc: "Discover and acquire services like Gumtree or Fiverr." },
  { icon: Zap, title: "Fast & Reliable", desc: "Lightning-fast platform built for modern Australian businesses." },
];

const Index = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero */}
    <section className="pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl text-center">
        <div className="animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold gradient-bg text-primary-foreground mb-6">
            Australia's Business Platform
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Your Complete <span className="gradient-text">Trading Hub</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Manage your business, discover services, sell products, post jobs, and handle payments — all from one powerful platform.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/businesses">
              <Button size="lg" className="gradient-bg text-primary-foreground hover:opacity-90 transition-opacity">
                <Search className="w-4 h-4 mr-2" /> Search Businesses
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-up-delay-2">
          {[
            { value: "10,000+", label: "Businesses" },
            { value: "50,000+", label: "Customers" },
            { value: "5,000+", label: "Services" },
            { value: "$2M+", label: "Transactions" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-6 rounded-2xl">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="section-padding bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">A complete platform for businesses and customers to connect, trade, and grow.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-transform">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Quick Links */}
    <section className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Explore Trading Hub</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Find Businesses", desc: "Search our directory of verified Australian businesses", link: "/businesses", color: "from-blue-500 to-blue-600" },
            { title: "Browse Services", desc: "Discover and hire services from trusted providers", link: "/services", color: "from-purple-500 to-purple-600" },
            { title: "Shop Products", desc: "Buy quality products from local businesses", link: "/products", color: "from-emerald-500 to-emerald-600" },
            { title: "Find Jobs", desc: "Browse job listings from top companies", link: "/jobs", color: "from-orange-500 to-orange-600" },
            { title: "Your Profile", desc: "Manage your account, history and preferences", link: "/profile", color: "from-pink-500 to-pink-600" },
            { title: "Payments", desc: "Manage invoices, payments and payouts", link: "/payments", color: "from-teal-500 to-teal-600" },
          ].map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="group block p-6 rounded-2xl bg-gradient-to-br text-white hover:scale-[1.02] transition-transform"
              style={{
                backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              }}
            >
              <div className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} text-white hover:scale-[1.02] transition-transform`}>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

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
