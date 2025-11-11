import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { APP_NAME } from "@/lib/config";

interface SignupSuccessProps {
  onComplete: () => void;
}

export const SignupSuccess = ({ onComplete }: SignupSuccessProps) => (
  <div className="w-full max-w-md text-center">
    <div className="mb-8">
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Account Created Successfully!</h1>
      <p className="text-muted-foreground">
        Welcome to {APP_NAME}! Your account is ready to use.
      </p>
    </div>
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardContent className="pt-6">
        <div className="text-left mb-4">
          <h3 className="font-semibold mb-2">What's next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Check your email for account verification</li>
            <li>• Complete your profile setup</li>
            <li>• Browse available courses</li>
          </ul>
        </div>
        <Button onClick={onComplete} className="w-full">
          Continue to Sign In
        </Button>
      </CardContent>
    </Card>
  </div>
);
