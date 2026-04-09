import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegistrationFormValues } from "@/pages/Register";

const states = [
  "New South Wales",
  "Victoria",
  "Queensland",
  "Western Australia",
  "South Australia",
  "Tasmania",
  "Australian Capital Territory",
  "Northern Territory",
];

const Step3Address = () => {
  const { control } = useFormContext<RegistrationFormValues>();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <FormField
        control={control}
        name="buildingName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Building Name (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Tech Tower" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="streetNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Number</FormLabel>
              <FormControl>
                <Input placeholder="Level 5, 123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="streetName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Name</FormLabel>
              <FormControl>
                <Input placeholder="Example St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={control}
          name="businessSuburb"
          render={({ field }) => (
            <FormItem className="md:col-span-1">
              <FormLabel>Suburb</FormLabel>
              <FormControl>
                <Input placeholder="Sydney" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem className="md:col-span-1">
              <FormLabel>State</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {states.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="postCode"
          render={({ field }) => (
            <FormItem className="md:col-span-1">
              <FormLabel>Post Code</FormLabel>
              <FormControl>
                <Input placeholder="2000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Step3Address;
