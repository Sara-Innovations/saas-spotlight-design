import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password has been reset successfully!");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="shadow-xl border border-neutral-100 bg-white">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-8">
            <div className="space-y-2">
              <Label htmlFor="password" className="font-bold text-neutral-700 text-sm italic uppercase tracking-wider">New Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required minLength={6} className="h-12 border-neutral-200 focus:border-primary transition-all shadow-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="font-bold text-neutral-700 text-sm italic uppercase tracking-wider">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" required minLength={6} className="h-12 border-neutral-200 focus:border-primary transition-all shadow-sm" />
            </div>
          </CardContent>
          <CardFooter className="pb-8">
            <Button className="w-full h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all" type="submit">
              Update Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
