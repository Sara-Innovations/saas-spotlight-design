import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RegistrationFormValues } from "@/pages/Register";

const Step2Company = () => {
  const { control } = useFormContext<RegistrationFormValues>();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <FormField
        control={control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Legal Company Name</FormLabel>
            <FormControl>
              <Input placeholder="Acme Corp" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Title / Headline</FormLabel>
            <FormControl>
              <Input placeholder="World-leading provider of widgets" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="about"
        render={({ field }) => (
          <FormItem>
            <FormLabel>About the Company</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Tell us about your company and mission..." 
                className="min-h-[120px] resize-none"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Website</FormLabel>
            <FormControl>
              <Input placeholder="https://www.acme.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Step2Company;
