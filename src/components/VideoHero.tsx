import React, { useState } from 'react';
import { Search, Building2, Briefcase, ShoppingBag, Users, Wrench, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

const VideoHero = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const categories = [
    { title: "Business Directory", icon: Building2, link: "/businesses", color: "text-blue-500" },
    { title: "Jobs Directory", icon: Briefcase, link: "/jobs", color: "text-purple-500" },
    { title: "Ecommerce", icon: ShoppingBag, link: "/products", color: "text-emerald-500" },
    { title: "Business Network", icon: Users, link: "/profile", color: "text-orange-500" },
    { title: "Professional Services", icon: Wrench, link: "/services", color: "text-pink-500" },
  ];

  const tags = [
    { name: "Retail", link: "/businesses?category=retail" },
    { name: "Hospitality", link: "/businesses?category=hospitality" },
    { name: "Construction", link: "/businesses?category=construction" },
    { name: "Marketing", link: "/businesses?category=marketing" },
    { name: "Software", link: "/businesses?category=software" },
  ];

  return (
    <div className="relative min-h-[650px] lg:h-[85vh] w-full bg-neutral-900">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 w-full h-full scale-[1.3]">
          <ReactPlayer
            src="https://www.youtube.com/watch?v=VCPGMjCW0is"
            playing={isPlaying}
            loop={true}
            muted={true}
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  showinfo: 0,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                  iv_load_policy: 3,
                  autohide: 1
                }
              }
            }}
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-6xl px-4 h-full flex flex-col justify-center pt-24 pb-48">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
            Discover the Best <br />
            <span className="text-primary italic font-light">Services & Opportunities</span>
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl mb-8 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search for any business or service..."
                className="w-full h-16 md:h-20 pl-8 pr-20 rounded-xl text-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary shadow-2xl"
              />
              <button className="absolute right-3 top-3 bottom-3 w-14 md:w-20 bg-neutral-900 text-white rounded-lg flex items-center justify-center hover:bg-primary transition-all active:scale-95">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 text-white mb-14">
            <span className="text-sm font-bold text-white/60 mr-2">Popular:</span>
            {tags.map((tag) => (
              <Link
                key={tag.name}
                to={tag.link}
                className="px-5 py-2 rounded-full border border-white/20 hover:border-primary hover:bg-primary/10 transition-all text-xs font-bold backdrop-blur-md"
              >
                {tag.name}
              </Link>
            ))}
          </div>

          {/* Trusted By */}
          <div className="flex flex-wrap items-center gap-10 opacity-40 grayscale contrast-150">
            <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Trusted by:</span>
            <span className="text-2xl font-black text-white tracking-tighter">Meta</span>
            <span className="text-2xl font-black text-white tracking-tighter">Google</span>
            <span className="text-2xl font-black text-white tracking-tighter">NETFLIX</span>
            <span className="text-2xl font-black text-white tracking-tighter">P&G</span>
          </div>
        </motion.div>
      </div>

      {/* Video Control */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-40 right-10 z-20 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 backdrop-blur-sm transition-colors"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      {/* Bottom Category Cards */}
      <div className="absolute bottom-0 left-0 right-0 z-30 translate-y-1/2">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
              >
                <Link
                  to={cat.link}
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.2)] hover:-translate-y-3 transition-all flex flex-col items-center text-center gap-4 border border-neutral-100 dark:border-white/5 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className={`w-14 h-14 rounded-2xl bg-neutral-50 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform relative z-10`}>
                    <cat.icon className={`w-7 h-7 ${cat.color}`} />
                  </div>
                  <span className="text-sm font-black text-neutral-800 dark:text-white leading-tight relative z-10">
                    {cat.title}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
