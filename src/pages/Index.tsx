import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Solutions from "@/components/Solutions";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Integrations from "@/components/Integrations";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <Features />
    <Solutions />
    <Testimonials />
    <Pricing />
    <Integrations />
    <Footer />
  </div>
);

export default Index;
