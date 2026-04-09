const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"],
  Solutions: ["Marketing", "Sales", "Service", "Operations", "Startups"],
  Resources: ["Blog", "Guides", "Webinars", "API Docs", "Community"],
  Company: ["About", "Careers", "Press", "Partners", "Contact"],
};

const Footer = () => (
  <footer className="bg-foreground text-background">
    {/* CTA banner */}
    <div className="container mx-auto max-w-6xl px-4 pt-20 pb-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Ready to scale your business?
        </h2>
        <p className="text-background/60 text-lg mb-6 max-w-lg mx-auto">
          Join 200,000+ teams already growing with SaaSFlow. Free forever plan available.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <a href="#" className="inline-flex items-center px-6 py-3 rounded-lg gradient-bg text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
            Get Started Free
          </a>
          <a href="#" className="inline-flex items-center px-6 py-3 rounded-lg border border-background/20 text-background font-semibold text-sm hover:bg-background/10 transition-colors">
            Talk to Sales
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <h4 className="font-semibold mb-4 text-sm">{group}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-background/50 hover:text-background transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-background/40">
          © 2026 SaaSFlow. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <a key={l} href="#" className="text-sm text-background/40 hover:text-background transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
