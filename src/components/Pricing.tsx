import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "0",
    description: "For small teams getting started",
    features: ["Up to 5 users", "1,000 contacts", "Email campaigns", "Basic analytics", "Community support"],
    cta: "Start for free",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "49",
    description: "For growing businesses that need more",
    features: ["Up to 25 users", "50,000 contacts", "AI automation", "Advanced analytics", "Priority support", "Custom integrations"],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "149",
    description: "For large teams with custom needs",
    features: ["Unlimited users", "Unlimited contacts", "Custom AI models", "Dedicated CSM", "SSO & audit logs", "SLA guarantee", "Custom training"],
    cta: "Contact sales",
    highlighted: false,
  },
];

const Pricing = () => (
  <section id="pricing" className="section-padding">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
        <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Pricing</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-muted-foreground text-lg">
          No hidden fees. Start free, upgrade when you're ready.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
              plan.highlighted
                ? "gradient-bg text-primary-foreground shadow-2xl scale-[1.02]"
                : "glass-card"
            }`}
          >
            <p className={`text-sm font-semibold mb-1 ${plan.highlighted ? "text-primary-foreground/80" : "text-primary"}`}>
              {plan.name}
            </p>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-extrabold">${plan.price}</span>
              <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                /user/mo
              </span>
            </div>
            <p className={`text-sm mb-6 ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
              {plan.description}
            </p>

            <Button
              className={`w-full mb-6 ${
                plan.highlighted
                  ? "bg-background text-foreground hover:bg-background/90"
                  : "gradient-bg text-primary-foreground hover:opacity-90"
              }`}
            >
              {plan.cta}
            </Button>

            <ul className="space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? "text-primary-foreground" : "text-primary"}`} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
