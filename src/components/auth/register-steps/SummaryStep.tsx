import { useFormContext } from "react-hook-form";
import { RegistrationFormValues } from "@/pages/Register";
import { Building2, MapPin, Contact2, CheckCircle2, UserCircle } from "lucide-react";

const SummaryStep = () => {
  const { getValues } = useFormContext<RegistrationFormValues>();
  const data = getValues();

  const sections = [
    {
      title: "Account Details",
      icon: <UserCircle className="w-5 h-5 text-primary" />,
      items: [
        { label: "ABN", value: data.abn },
        { label: "ACN", value: data.acn || "Not provided" },
        { label: "Username", value: data.username },
      ],
    },
    {
      title: "Company Info",
      icon: <Building2 className="w-5 h-5 text-primary" />,
      items: [
        { label: "Name", value: data.companyName },
        { label: "Title", value: data.title || "Not provided" },
        { label: "Website", value: data.website || "Not provided" },
      ],
    },
    {
      title: "Headquarters",
      icon: <MapPin className="w-5 h-5 text-primary" />,
      items: [
        { label: "Address", value: `${data.streetNumber} ${data.streetName}, ${data.businessSuburb}, ${data.state} ${data.postCode}` },
      ],
    },
    {
      title: "Contact & Hours",
      icon: <Contact2 className="w-5 h-5 text-primary" />,
      items: [
        { label: "Email", value: data.email },
        { label: "Mobile", value: data.mobile },
        { label: "Hours", value: `${data.startingDay}-${data.closingDay}, ${data.startingTime}-${data.closingTime}` },
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex items-start gap-3 mb-6">
        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
        <div>
          <h4 className="font-semibold text-primary">Ready to submit!</h4>
          <p className="text-sm text-neutral-600">Please review your information below before finalizing your registration.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              {section.icon}
              <h5 className="font-bold text-neutral-900">{section.title}</h5>
            </div>
            <div className="space-y-2">
              {section.items.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">{item.label}</span>
                  <span className="text-sm text-neutral-700 font-medium truncate">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryStep;
