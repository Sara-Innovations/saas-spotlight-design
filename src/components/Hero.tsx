import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const trustedLogos = ["Shopify", "Stripe", "Slack", "Notion", "Figma", "Vercel"];

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
    </div>

    <div className="container mx-auto max-w-6xl">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Now with AI-powered automation
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6">
            Where growing teams{" "}
            <span className="gradient-text">scale faster</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            Unite marketing, sales, and service on one AI-powered platform.
            Drive revenue, delight customers, and grow without the complexity.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <Button size="lg" className="gradient-bg text-primary-foreground hover:opacity-90 transition-opacity gap-2 px-6 h-12 text-base">
              Start for free <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 h-12 text-base">
              <Play className="w-4 h-4" /> Watch demo
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mb-3">Trusted by 200,000+ businesses worldwide</p>
          <div className="flex flex-wrap gap-6 items-center">
            {trustedLogos.map((name) => (
              <span key={name} className="text-sm font-semibold text-muted-foreground/50">{name}</span>
            ))}
          </div>
        </div>

        {/* Right — illustration */}
        <div className="animate-fade-up-delay-2 hidden lg:block">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl -z-10" />
            <img
              src={heroImage}
              alt="SaaSFlow platform dashboard"
              className="rounded-2xl shadow-2xl border border-border"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
