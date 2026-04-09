import { useState } from "react";
import { ArrowRight, TrendingUp, Headphones, Megaphone, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    headline: "Attract & convert more leads",
    description: "Create campaigns that resonate, automate nurture sequences, and measure every touchpoint. Our AI suggests the best channels and timing for your audience.",
    stats: [
      { value: "3x", label: "More qualified leads" },
      { value: "47%", label: "Higher conversion rate" },
      { value: "60%", label: "Less time on manual tasks" },
    ],
  },
  {
    id: "sales",
    label: "Sales",
    icon: TrendingUp,
    headline: "Close deals faster",
    description: "Smart CRM with AI-powered lead scoring, automated follow-ups, and pipeline forecasting. Your reps spend time selling, not updating spreadsheets.",
    stats: [
      { value: "2x", label: "Faster deal velocity" },
      { value: "35%", label: "Larger deal size" },
      { value: "90%", label: "Forecast accuracy" },
    ],
  },
  {
    id: "service",
    label: "Service",
    icon: Headphones,
    headline: "Delight every customer",
    description: "Omnichannel support with AI chatbots, ticket routing, and a knowledge base that learns. Resolve issues before customers even notice.",
    stats: [
      { value: "97%", label: "CSAT score" },
      { value: "4min", label: "Avg response time" },
      { value: "50%", label: "Fewer tickets" },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    icon: Settings,
    headline: "Automate & optimize",
    description: "Connect your entire tech stack with 2,000+ integrations. Custom workflows, data sync, and reporting across every team.",
    stats: [
      { value: "2000+", label: "Integrations" },
      { value: "10hrs", label: "Saved per week" },
      { value: "1", label: "Source of truth" },
    ],
  },
];

const Solutions = () => {
  const [active, setActive] = useState("marketing");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section id="solutions" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-up">
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Solutions</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Built for every team
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you're in marketing, sales, or service — SaaSFlow adapts to your workflow.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                active === tab.id
                  ? "gradient-bg text-primary-foreground shadow-lg"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="glass-card p-8 md:p-12 rounded-3xl animate-fade-in">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{current.headline}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{current.description}</p>
              <Button className="gradient-bg text-primary-foreground hover:opacity-90 gap-2">
                Learn more <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {current.stats.map((s) => (
                <div key={s.label} className="text-center p-4 rounded-2xl bg-secondary/60">
                  <p className="text-2xl md:text-3xl font-extrabold gradient-text">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
