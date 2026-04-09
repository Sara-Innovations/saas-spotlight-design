const integrations = [
  "Salesforce", "Slack", "HubSpot", "Stripe", "Shopify", "Zendesk",
  "Mailchimp", "Zapier", "Google", "Microsoft", "Notion", "Jira",
];

const Integrations = () => (
  <section className="section-padding bg-secondary/40">
    <div className="container mx-auto max-w-6xl text-center">
      <div className="max-w-2xl mx-auto mb-12 animate-fade-up">
        <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Integrations</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Works with tools you already use
        </h2>
        <p className="text-muted-foreground text-lg">
          2,000+ integrations so your data flows seamlessly across every system.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {integrations.map((name) => (
          <div
            key={name}
            className="glass-card flex items-center justify-center p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-sm font-semibold text-muted-foreground">{name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Integrations;
