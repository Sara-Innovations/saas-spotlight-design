import { motion } from "framer-motion";
import { Building2, Briefcase, ShoppingBag, Users, Wrench, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Business Directory",
    desc: "Discover verified Australian businesses or list your own to reach thousands of potential new customers.",
    icon: Building2,
    link: "/businesses",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Jobs Directory",
    desc: "Your portal to career growth. Post job listings to find top local talent or browse active roles in your industry.",
    icon: Briefcase,
    link: "/jobs",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "Ecommerce Platform",
    desc: "Buy and sell products seamlessly. A powerful marketplace designed for smooth transactions and growth.",
    icon: ShoppingBag,
    link: "/products",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Business Network",
    desc: "Build meaningful relationships. Connect with professionals, find mentors, and grow your industry presence.",
    icon: Users,
    link: "/profile",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Professional Services",
    desc: "From digital marketing to skilled trades. Offer your services or hire verified experts for any project.",
    icon: Wrench,
    link: "/services",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
  },
];

const ModernFeaturesBackground = () => {
  return (
    <section className="py-24 bg-neutral-950 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-black bg-white/10 text-white mb-4">
              Premium Experience
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
              Immersive <span className="text-primary italic">Features</span>
            </h2>
            <p className="text-lg text-white/60">
              Explore our core ecosystem through a visually stunning and immersive experience.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={idx > 2 ? 'lg:col-span-1.5' : ''}
            >
              <Link
                to={feature.link}
                className="group relative block aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/10"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 transition-transform duration-500 group-hover:-translate-y-2 group-hover:bg-primary group-hover:text-white text-white">
                    <feature.icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {feature.desc}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/50 group-hover:text-primary transition-colors">
                    View Module <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernFeaturesBackground;
