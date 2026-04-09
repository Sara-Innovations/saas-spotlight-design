import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Mail, Phone, MapPin, Calendar, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-16">
        {/* Cover */}
        <div className="h-48 gradient-bg" />
        <div className="container mx-auto max-w-5xl px-4 -mt-16">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-32 h-32 rounded-full bg-background border-4 border-background flex items-center justify-center shadow-lg">
              <User className="w-16 h-16 text-muted-foreground" />
            </div>
            <div className="pt-4 sm:pt-8">
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-muted-foreground">Business Owner & Customer</p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Sydney, NSW</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Member since Jan 2025</span>
              </div>
            </div>
            <Button variant="outline" className="sm:ml-auto sm:mt-8">Edit Profile</Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Orders", value: "23" },
              { label: "Reviews Given", value: "15" },
              { label: "Services Used", value: "8" },
              { label: "Jobs Applied", value: "3" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4 rounded-xl text-center">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="grid md:grid-cols-2 gap-6 mt-8 mb-12">
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" /> john.doe@email.com
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" /> 0412 345 678
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary" /> 123 George St, Sydney, NSW 2000
                </div>
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { action: "Purchased Ergonomic Office Chair", time: "2 days ago" },
                  { action: "Applied for Senior Web Developer", time: "3 days ago" },
                  { action: "Left a review for Vella Nero", time: "1 week ago" },
                  { action: "Booked Personal Training Session", time: "2 weeks ago" },
                ].map((item) => (
                  <div key={item.action} className="flex items-start gap-3 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p>{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Profile;
