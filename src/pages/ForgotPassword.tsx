import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password reset link sent to your email!");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="shadow-xl border border-neutral-100 bg-white">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold text-neutral-700 text-sm italic uppercase tracking-wider">Email Address</Label>
              <Input id="email" type="email" placeholder="name@company.com" required className="h-12 border-neutral-200 focus:border-primary transition-all shadow-sm" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pb-8">
            <Button className="w-full h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all" type="submit">
              Send Reset Link
            </Button>
            <Link to="/login" className="text-sm font-bold text-primary hover:underline">
              Back to Sign In
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
