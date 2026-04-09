import { Link } from "react-router-dom";

const footerLinks = {
  Customer: [
    { label: "Post A Job", href: "/jobs" },
    { label: "Business Directory", href: "/businesses" },
    { label: "Find A Business", href: "/businesses" },
    { label: "Job Cost Guides", href: "/jobs" },
    { label: "Inspiration", href: "/" },
  ],
  Businesses: [
    { label: "Register My Business", href: "/about" },
    { label: "Awards", href: "/about" },
    { label: "Win Work Guide", href: "/about" },
    { label: "Help", href: "/contact" },
  ],
  About: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/jobs" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "Phone # 1300-870-274", href: "#" },
    { label: "Email # info@tradinghub.com", href: "#" },
  ],
};

const Footer = () => (
  <footer className="bg-foreground text-background">
    {/* CTA banner */}
    <div className="container mx-auto max-w-6xl px-4 pt-20 pb-12">
      <div className="text-center mb-16 py-12 rounded-2xl" style={{ background: "linear-gradient(135deg, hsl(174 60% 45%), hsl(174 60% 35%))" }}>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          Have something to do? Get it done today.
        </h2>
        <Link
          to="/businesses"
          className="inline-flex items-center px-6 py-3 rounded-lg border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
        >
          Get quote now
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <h4 className="font-semibold mb-4 text-sm">{group}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  {link.href === "#" ? (
                    <span className="text-sm text-background/50">{link.label}</span>
                  ) : (
                    <Link to={link.href} className="text-sm text-background/50 hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-background/40">© 2026 Trading Hub. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <a key={l} href="#" className="text-sm text-background/40 hover:text-background transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
