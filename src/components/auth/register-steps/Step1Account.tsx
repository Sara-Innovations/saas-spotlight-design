import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegistrationFormValues } from "@/pages/Register";

const Step1Account = () => {
  const { control } = useFormContext<RegistrationFormValues>();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="abn"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ABN (Australian Business Number)</FormLabel>
            <FormControl>
              <Input placeholder="11 digit ABN" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="acn"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ACN (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="9 digit ACN" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sign-in Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Step1Account;
