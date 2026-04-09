import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import StepIndicator from "@/components/auth/StepIndicator";
import Step1Account from "@/components/auth/register-steps/Step1Account";
import Step2Company from "@/components/auth/register-steps/Step2Company";
import Step3Address from "@/components/auth/register-steps/Step3Address";
import Step4Contact from "@/components/auth/register-steps/Step4Contact";
import SummaryStep from "@/components/auth/register-steps/SummaryStep";

// Form Schema
const registrationSchema = z.object({
  // Step 1: Account
  abn: z.string().min(11, "ABN must be 11 digits"),
  acn: z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  
  // Step 2: Company
  companyName: z.string().min(2, "Company name is required"),
  title: z.string().optional(),
  about: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  
  // Step 3: Address
  buildingName: z.string().optional(),
  streetNumber: z.string().min(1, "Street number is required"),
  streetName: z.string().min(1, "Street name is required"),
  businessSuburb: z.string().min(1, "Suburb is required"),
  state: z.string().min(1, "State is required"),
  postCode: z.string().min(4, "Post code must be at least 4 digits"),
  
  // Step 4: Contact
  mobile: z.string().regex(/^\d+$/, "Mobile must be numeric").min(10, "Mobile must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  startingDay: z.string().min(1, "Field is required"),
  closingDay: z.string().min(1, "Field is required"),
  startingTime: z.string().min(1, "Field is required"),
  closingTime: z.string().min(1, "Field is required"),
  map: z.string().optional(),
  backgroundImage: z.any().optional(),
  thumbnail: z.any().optional(),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

const steps = ["Account", "Company", "Address", "Contact", "Review"];

const Register = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      abn: "",
      acn: "",
      username: "",
      password: "",
      companyName: "",
      title: "",
      about: "",
      website: "",
      buildingName: "",
      streetNumber: "",
      streetName: "",
      businessSuburb: "",
      state: "",
      postCode: "",
      mobile: "",
      email: "",
      startingDay: "",
      closingDay: "",
      startingTime: "",
      closingTime: "",
      map: "",
    },
    mode: "onChange",
  });

  const nextStep = async () => {
    // Validate current step fields
    const fields = getStepFields(step);
    const isValid = await form.trigger(fields as any);
    if (isValid) {
      setStep((s) => Math.min(s + 1, steps.length));
    } else {
      toast.error("Please fix errors before continuing");
    }
  };

  const onSubmit = (data: RegistrationFormValues) => {
    console.log("Form Data Submitted:", JSON.stringify(data, null, 2));
    toast.success("Registration Successful!");
    setTimeout(() => navigate("/"), 2000);
  };

  const getStepFields = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return ["abn", "username", "password"];
      case 2: return ["companyName"];
      case 3: return ["streetNumber", "streetName", "businessSuburb", "state", "postCode"];
      case 4: return ["mobile", "email", "startingDay", "closingDay", "startingTime", "closingTime"];
      default: return [];
    }
  };

  return (
    <div className="space-y-8 py-4 font-sans animate-in fade-in slide-in-from-bottom-4 duration-700">
      <StepIndicator currentStep={step} totalSteps={steps.length} steps={steps} />

      <Card className="shadow-xl border border-neutral-100 bg-white overflow-hidden rounded-2xl">
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 border-b border-neutral-100">
          <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">{step}</span>
            {steps[step - 1]} Information
          </h3>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="pt-8 pb-10">
              <div className="transition-all duration-500 transform">
                {step === 1 && <Step1Account />}
                {step === 2 && <Step2Company />}
                {step === 3 && <Step3Address />}
                {step === 4 && <Step4Contact />}
                {step === 5 && <SummaryStep />}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-neutral-100 p-8 bg-neutral-50/50">
              <Button
                type="button"
                variant="ghost"
                className="hover:bg-neutral-100 transition-all font-semibold"
                onClick={() => step > 1 ? setStep(s => s - 1) : navigate("/")}
              >
                {step === 1 ? "Cancel" : "Back"}
              </Button>
              
              {step < steps.length ? (
                <Button 
                  type="button"
                  className="px-8 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all"
                  onClick={nextStep}
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  type="submit"
                  className="px-8 font-bold bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-xl shadow-primary/20 active:scale-95 transition-all"
                >
                  Confirm & Submit
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <div className="text-center">
         <p className="text-sm text-neutral-400 font-medium italic">
          Step {step} of {steps.length}: {steps[step - 1]}
        </p>
      </div>
    </div>
  );
};

export default Register;
