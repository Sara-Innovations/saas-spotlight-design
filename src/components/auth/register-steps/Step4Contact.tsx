import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegistrationFormValues } from "@/pages/Register";
import { ImagePlus, MapPin } from "lucide-react";
import { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Step4Contact = () => {
  const { control } = useFormContext<RegistrationFormValues>();
  const [bgPreview, setBgPreview] = useState<string | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="0412 345 678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="contact@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4 border-t border-neutral-100 pt-6">
        <h4 className="font-semibold text-neutral-900 flex items-center gap-2">
          Operating Hours
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField
            control={control}
            name="startingDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Day</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="From" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {days.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="closingDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Day</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="To" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {days.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="startingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Open Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="closingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Close Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4 border-t border-neutral-100 pt-6">
        <FormField
          control={control}
          name="map"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> Map Integration / Address
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter address or Google Maps URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-neutral-100 pt-6">
        <div className="space-y-3">
          <FormLabel>Background Image</FormLabel>
          <div 
            className="group relative h-40 border-2 border-dashed border-neutral-200 rounded-xl overflow-hidden hover:border-primary/50 transition-colors bg-neutral-50/50 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => document.getElementById('bg-upload')?.click()}
          >
            {bgPreview ? (
              <img src={bgPreview} alt="Background" className="w-full h-full object-cover" />
            ) : (
              <>
                <ImagePlus className="w-8 h-8 text-neutral-300 group-hover:text-primary transition-colors" />
                <span className="text-xs text-neutral-400 mt-2 font-medium">Upload Banner Image</span>
              </>
            )}
            <Input 
              id="bg-upload" 
              type="file" 
              className="hidden" 
              onChange={(e) => handleFileChange(e, setBgPreview)}
              accept="image/*"
            />
          </div>
        </div>

        <div className="space-y-3">
          <FormLabel>Company Thumbnail</FormLabel>
          <div 
            className="group relative h-40 w-40 border-2 border-dashed border-neutral-200 rounded-full overflow-hidden hover:border-primary/50 transition-colors bg-neutral-50/50 flex flex-col items-center justify-center cursor-pointer mx-auto"
            onClick={() => document.getElementById('thumb-upload')?.click()}
          >
            {thumbPreview ? (
              <img src={thumbPreview} alt="Thumbnail" className="w-full h-full object-cover" />
            ) : (
              <>
                <ImagePlus className="w-8 h-8 text-neutral-300 group-hover:text-primary transition-colors" />
                <span className="text-[10px] text-neutral-400 mt-2 font-medium text-center px-4">Upload Profile Logo</span>
              </>
            )}
            <Input 
              id="thumb-upload" 
              type="file" 
              className="hidden" 
              onChange={(e) => handleFileChange(e, setThumbPreview)}
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Contact;
