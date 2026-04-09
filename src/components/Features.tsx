import { BarChart3, Bot, Globe, Lock, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Blazing-fast performance with sub-second load times. Your team works faster, ships more.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Built-in AI agents handle prospecting, data entry, and customer support 24/7.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time dashboards and custom reports so you always know what's driving growth.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Shared pipelines, mentions, and live editing keep everyone aligned and productive.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Multi-region infrastructure with 99.99% uptime. Serve customers in 190+ countries.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "SOC 2 Type II, GDPR compliant, SSO, and role-based access controls out of the box.",
  },
];

const Features = () => (
  <section id="features" className="section-padding bg-secondary/40">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
        <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Platform Features</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Everything you need to grow
        </h2>
        <p className="text-muted-foreground text-lg">
          One platform replaces a dozen tools. Marketing, sales, service — all connected.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="glass-card p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <f.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
