import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Play, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ThreeHeroScene from "./ThreeHeroScene";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center pt-20 px-4 overflow-hidden bg-[#050505]">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Side: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-primary-foreground text-xs font-bold mb-8 shadow-2xl shadow-primary/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">Australia's All-In-One Business Platform</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8 text-white"
            >
              Everything Your <br />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Business Needs</span> <br />
              In One Platform.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-400 max-w-xl mb-10 leading-relaxed font-medium"
            >
              Discover, Hire, Sell, and Connect. The complete ecosystem combining <span className="text-neutral-200">business directory, jobs, ecommerce,</span> and professional services into a single unified platform.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 w-full sm:w-auto rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 group">
                  Get Started <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-14 px-8 w-full sm:w-auto rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                  <Search className="w-5 h-5 opacity-70" /> Explore Services
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center lg:justify-start gap-8 items-center w-full"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-black text-neutral-500 w-full mb-2">Trusted by Industry Leaders</span>
              {["Shopify", "Stripe", "Slack", "Figma"].map((name) => (
                <div key={name} className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default group">
                   <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                   <span className="text-base font-black text-white">{name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side: 3D Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[500px] lg:h-[700px] w-full flex items-center justify-center pointer-events-auto"
          >
            <div className="absolute inset-0 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" />
            <div className="w-full h-full relative">
               <ThreeHeroScene />
            </div>
            
            {/* Floating UI Elements for depth */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -left-4 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hidden xl:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-400">Total Users</p>
                  <p className="text-lg font-black text-white">50K+</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 -right-4 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hidden xl:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Play className="w-5 h-5 text-orange-500 fill-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-400">Active Jobs</p>
                  <p className="text-lg font-black text-white">1,200+</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest font-black text-neutral-600">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;

