import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Contact Us</h1>
            <p className="text-muted-foreground">Have a question? We'd love to hear from you.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {sent ? (
                <div className="glass-card p-8 rounded-xl text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h2 className="text-xl font-bold">Message Sent!</h2>
                  <p className="text-muted-foreground mt-2">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="glass-card p-8 rounded-xl space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">First Name</label>
                      <Input className="mt-1" placeholder="John" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Last Name</label>
                      <Input className="mt-1" placeholder="Doe" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input className="mt-1" type="email" placeholder="john@example.com" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input className="mt-1" placeholder="How can we help?" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <textarea className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm h-32" placeholder="Your message..." required />
                  </div>
                  <Button type="submit" className="gradient-bg text-primary-foreground w-full">Send Message</Button>
                </form>
              )}
            </div>
            <div className="space-y-4">
              {[
                { icon: Phone, title: "Phone", detail: "1300-870-274" },
                { icon: Mail, title: "Email", detail: "info@tradinghub.com" },
                { icon: MapPin, title: "Address", detail: "259 Clarence St, Sydney, NSW 2000" },
                { icon: Clock, title: "Hours", detail: "Monday - Friday, 9:00 AM - 5:00 PM" },
              ].map((item) => (
                <div key={item.title} className="glass-card p-5 rounded-xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
              <div className="bg-muted rounded-xl h-48 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Map Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
