import { Link } from "react-router-dom";
import { useSiteSettings } from "@/contexts/SiteContext";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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

const Footer = () => {
  const { settings } = useSiteSettings();

  const footerLinksData = {
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
    About: settings?.footer?.items_first?.length ? 
      settings.footer.items_first.map(item => ({ label: item.title, href: item.link })) : [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/jobs" },
      { label: "Contact", href: "/contact" },
    ],
    Support: [
      { label: settings?.contact?.phone || "1300-870-274", href: `tel:${settings?.contact?.phone}`, icon: <Phone className="w-3.5 h-3.5" /> },
      { label: settings?.contact?.email || "info@tradinghub.com", href: `mailto:${settings?.contact?.email}`, icon: <Mail className="w-3.5 h-3.5" /> },
      { label: settings?.contact?.address || "Australia", href: "#", icon: <MapPin className="w-3.5 h-3.5" /> },
    ],
  };

  return (
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
          {Object.entries(footerLinksData).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-semibold mb-4 text-sm">{group}</h4>
              <ul className="space-y-2">
                {links.map((link: any) => (
                  <li key={link.label}>
                    {link.href === "#" ? (
                      <span className="text-sm text-background/50 flex items-center gap-2">
                        {link.icon}
                        {link.label}
                      </span>
                    ) : (
                      <Link to={link.href} className="text-sm text-background/50 hover:text-background transition-colors flex items-center gap-2">
                        {link.icon}
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
          <div className="flex flex-col gap-1">
            <p className="text-sm text-background/40">
              {settings?.footer?.config?.copyright_text || `© ${new Date().getFullYear()} Trading Hub. All rights reserved.`}
            </p>
            {settings?.company && (
              <div className="flex gap-4 mt-2">
                {settings.company.facebook && (
                  <a href={settings.company.facebook} target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-background transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {settings.company.twitter && (
                  <a href={settings.company.twitter} target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-background transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {settings.company.instagram && (
                  <a href={settings.company.instagram} target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-background transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {settings.company.linkedin && (
                  <a href={settings.company.linkedin} target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-background transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {settings.company.youtube && (
                  <a href={settings.company.youtube} target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-background transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="#" className="text-sm text-background/40 hover:text-background transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
