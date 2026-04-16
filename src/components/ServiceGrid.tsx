import { motion } from "framer-motion";
import { Building2, Briefcase, ShoppingBag, Users, Wrench, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Business Directory",
    desc: "Discover and list businesses across Australia with ease.",
    icon: Building2,
    link: "/businesses",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Jobs Directory",
    desc: "Find your dream job or hire top-tier local talent.",
    icon: Briefcase,
    link: "/jobs",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Ecommerce",
    desc: "Seamlessly buy and sell products in our marketplace.",
    icon: ShoppingBag,
    link: "/products",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Business Network",
    desc: "Connect with professionals and industry leaders.",
    icon: Users,
    link: "/profile",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Services",
    desc: "Offer your skills or hire experts for any project.",
    icon: Wrench,
    link: "/services",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
];

const ServiceGrid = () => {
  return (
    <section className="relative py-24 bg-[#fafafa] dark:bg-black/20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-black bg-primary/10 text-primary mb-4">
              Core Ecosystem
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              All Your Business Needs <br />
              <span className="text-muted-foreground italic font-medium">in One Unified Platform.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've integrated the most essential business tools into a single, high-performance ecosystem. 
              Explore our core modules designed to help you grow, connect, and trade.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link 
                to={service.link}
                className="group relative block h-full p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 hover:border-primary/30"
              >
                <div className={`w-12 h-12 rounded-2xl ${service.bgColor} flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]`}>
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                
                <h3 className="text-lg font-black mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                  {service.title}
                </h3>
                
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  {service.desc}
                </p>

                <div className="mt-auto pt-2 flex items-center text-[10px] font-black uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore Module <ArrowUpRight className="ml-1 w-3 h-3" />
                </div>
                
                {/* Decorative border highlight on hover */}
                <div className="absolute inset-0 rounded-3xl border-2 border-primary/0 group-hover:border-primary/5 transition-colors pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-8 p-1.5 rounded-2xl bg-white dark:bg-neutral-900 border border-border/50 shadow-xl overflow-hidden">
            <div className="flex -space-x-2 ml-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" />
                 </div>
               ))}
            </div>
            <p className="text-sm font-medium pr-4">
              Join <span className="font-bold">50,000+</span> users already trading on our platform.
            </p>
            <Link to="/register">
              <Button size="sm" className="rounded-xl font-bold px-6">Get Started Now</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceGrid;
