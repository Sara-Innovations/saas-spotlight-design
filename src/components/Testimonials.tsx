import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Trading Hub replaced five tools for us. Our team collaboration improved overnight and we closed 40% more deals in Q1.",
    name: "Sarah Chen",
    role: "VP Sales, TechScale",
    avatar: "SC",
  },
  {
    quote: "The AI automation is a game-changer. We reduced support tickets by half while our CSAT score went up to 98%.",
    name: "Marcus Johnson",
    role: "Head of CX, RetailHub",
    avatar: "MJ",
  },
  {
    quote: "Finally, a platform that marketing and sales actually agree on. The shared analytics alone saved us hours every week.",
    name: "Priya Patel",
    role: "CMO, GrowthLab",
    avatar: "PP",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="section-padding bg-secondary/40">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
        <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Loved by 200,000+ teams
        </h2>
        <p className="text-muted-foreground text-lg">
          See why growing businesses choose Trading Hub as their operating system.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="glass-card p-6 rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-warning text-warning" />
              ))}
            </div>
            <p className="text-sm leading-relaxed flex-1 mb-6">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-primary-foreground">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
