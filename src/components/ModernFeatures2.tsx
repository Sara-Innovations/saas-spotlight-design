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
  },
  {
    title: "Jobs Directory",
    desc: "Your portal to career growth. Post job listings to find top local talent or browse active roles in your industry.",
    icon: Briefcase,
    link: "/jobs",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Ecommerce Platform",
    desc: "Buy and sell products seamlessly. A powerful marketplace designed for smooth transactions and growth.",
    icon: ShoppingBag,
    link: "/products",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Business Network",
    desc: "Build meaningful relationships. Connect with professionals, find mentors, and grow your industry presence.",
    icon: Users,
    link: "/profile",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Professional Services",
    desc: "From digital marketing to skilled trades. Offer your services or hire verified experts for any project.",
    icon: Wrench,
    link: "/services",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
];

const ModernFeatures = () => {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background soft pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">


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
                className="group relative block h-full p-6 rounded-[2rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 hover:border-primary/30"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {feature.desc}
                </p>

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-primary group-hover:gap-3 transition-all duration-300">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
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
