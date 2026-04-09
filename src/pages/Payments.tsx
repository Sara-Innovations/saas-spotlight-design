import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { invoices } from "@/lib/mockData";
import { DollarSign, TrendingUp, Clock, AlertCircle, CheckCircle2 } from "lucide-react";

const statusStyles = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  overdue: "bg-red-100 text-red-700",
};

const statusIcons = {
  paid: CheckCircle2,
  pending: Clock,
  overdue: AlertCircle,
};

const Payments = () => {
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paid = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);
  const pending = invoices.filter((i) => i.status === "pending").reduce((sum, i) => sum + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "overdue").reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-2">Payments & Invoices</h1>
          <p className="text-muted-foreground mb-8">Manage your invoices, payments and payouts</p>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-primary" },
              { label: "Paid", value: `$${paid.toLocaleString()}`, icon: CheckCircle2, color: "text-green-600" },
              { label: "Pending", value: `$${pending.toLocaleString()}`, icon: Clock, color: "text-yellow-600" },
              { label: "Overdue", value: `$${overdue.toLocaleString()}`, icon: AlertCircle, color: "text-red-600" },
            ].map((card) => (
              <div key={card.label} className="glass-card p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                  <span className="text-sm text-muted-foreground">{card.label}</span>
                </div>
                <div className="text-xl font-bold">{card.value}</div>
              </div>
            ))}
          </div>

          {/* Invoice Table */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left text-xs font-semibold text-muted-foreground p-4">Invoice</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground p-4">Client</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground p-4 hidden sm:table-cell">Description</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground p-4">Amount</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground p-4">Status</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground p-4 hidden md:table-cell">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => {
                    const Icon = statusIcons[inv.status];
                    return (
                      <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="p-4 text-sm font-medium">{inv.id}</td>
                        <td className="p-4 text-sm">{inv.client}</td>
                        <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">{inv.description}</td>
                        <td className="p-4 text-sm font-semibold">${inv.amount.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[inv.status]}`}>
                            <Icon className="w-3.5 h-3.5" /> {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{inv.dueDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Payments;
