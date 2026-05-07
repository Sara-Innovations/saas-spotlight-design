import { motion } from "framer-motion";
import { Building2, Briefcase, ShoppingBag, Users, Wrench, ArrowRight, ArrowRightCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Business Directory",
    desc: "Discover verified Australian businesses or list your own to reach thousands of potential new customers.",
    icon: Building2,
    link: "/businesses",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Jobs Directory",
    desc: "Your portal to career growth. Post job listings to find top local talent or browse active roles in your industry.",
    icon: Briefcase,
    link: "/jobs",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "Ecommerce Platform",
    desc: "Buy and sell products seamlessly. A powerful marketplace designed for smooth transactions and growth.",
    icon: ShoppingBag,
    link: "/products",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Business Network",
    desc: "Build meaningful relationships. Connect with professionals, find mentors, and grow your industry presence.",
    icon: Users,
    link: "/profile",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Professional Services",
    desc: "From digital marketing to skilled trades. Offer your services or hire verified experts for any project.",
    icon: Wrench,
    link: "/services",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
  },
];

const ModernFeatures = () => {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background soft pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-black mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Comprehensive Solutions
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              Everything You Need to <br />
              <span className="gradient-text">Grow Your Business</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover, connect, hire, sell, and offer professional services—all within one high-performance platform 
              designed to eliminate complexity and drive results for your business.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`w-full md:w-[calc(50%-12px)] ${idx < 3 ? 'lg:w-[calc(33.333%-16px)]' : 'lg:w-[calc(50%-12px)]'}`}
            >
              <Link 
                to={feature.link}
                className="group relative block h-full p-8 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 hover:border-primary/30 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-6 h-full">
                  <div className="flex-grow md:w-3/5">
                    <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]`}>
                      <feature.icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    
                    <h3 className="text-2xl font-extrabold mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                      {feature.desc}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-primary group-hover:gap-3 transition-all duration-300">
                      Explore Now <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="hidden md:block md:w-2/5 relative">
                    <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-inner bg-muted">
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernFeatures;
