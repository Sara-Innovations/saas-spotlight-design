import { useFormContext, useWatch } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegistrationFormValues } from "@/pages/Register";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchSubCategories } from "@/lib/api";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const Step2Company = () => {
  const { control, setValue } = useFormContext<RegistrationFormValues>();
  const selectedCategory = useWatch({ control, name: "categoryId" });
  
  const { data: categoriesData, isLoading: isLoadingCats } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: subCatsData, isLoading: isLoadingSubCats, refetch: refetchSubCats } = useQuery({
    queryKey: ["subcategories", selectedCategory],
    queryFn: () => fetchSubCategories(selectedCategory),
    enabled: !!selectedCategory,
  });

  const categories = categoriesData?.data || [];
  const subCategories = subCatsData?.data || [];

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Category</FormLabel>
              <Select onValueChange={(val) => {
                field.onChange(val);
                setValue("subCategoryId", ""); // Reset subcategory on category change
              }} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder={isLoadingCats ? "Loading..." : "Select Category"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.category_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="subCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-Category (Optional)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCategory || isLoadingSubCats}>
                <FormControl>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder={isLoadingSubCats ? "Loading..." : "Select Sub-Category"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subCategories.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.category_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
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
