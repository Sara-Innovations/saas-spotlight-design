import { motion } from "framer-motion";
import { Building2, Briefcase, ShoppingBag, Users, Wrench, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Business Directory",
    desc: "Discover verified Australian businesses or list your own to reach thousands of potential new customers.",
    icon: Building2,
    link: "/businesses",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Jobs Directory",
    desc: "Your portal to career growth. Post job listings to find top local talent or browse active roles in your industry.",
    icon: Briefcase,
    link: "/jobs",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "Ecommerce Platform",
    desc: "Buy and sell products seamlessly. A powerful marketplace designed for smooth transactions and growth.",
    icon: ShoppingBag,
    link: "/products",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Business Network",
    desc: "Build meaningful relationships. Connect with professionals, find mentors, and grow your industry presence.",
    icon: Users,
    link: "/profile",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Professional Services",
    desc: "From digital marketing to skilled trades. Offer your services or hire verified experts for any project.",
    icon: Wrench,
    link: "/services",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
  },
];

const ModernFeaturesCompact = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                to={feature.link}
                className="group block h-full p-6 rounded-3xl border border-neutral-100 bg-neutral-50/50 hover:bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-grow">


                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {feature.desc}
                    </p>

                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-white">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
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

export default ModernFeaturesCompact;
