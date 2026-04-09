import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Users, Globe, Award } from "lucide-react";

const About = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-28 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">About <span className="gradient-text">Trading Hub</span></h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Australia's leading business platform connecting companies, services, products, and talent in one powerful ecosystem.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">To empower Australian businesses and customers by providing a comprehensive platform for trading, hiring, and growing together. We believe in creating meaningful connections that drive real results.</p>
          </div>
          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground">To become the go-to platform for every business in Australia — from small local shops to large enterprises — providing the tools they need to succeed in a digital economy.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Building2, value: "10,000+", label: "Businesses" },
            { icon: Users, value: "50,000+", label: "Users" },
            { icon: Globe, value: "500+", label: "Cities" },
            { icon: Award, value: "99%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center glass-card p-6 rounded-xl">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="glass-card p-8 rounded-xl">
          <h2 className="text-xl font-bold mb-4">What We Offer</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Company Website & cPanel Management",
              "Service Management with Detail Pages",
              "Product Management (E-commerce)",
              "Job Management with Application Forms",
              "Customer Profiles & History Tracking",
              "Service Acquisition (Gumtree/Fiverr style)",
              "Invoice & Payment Management",
              "Business Directory & Search",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default About;
