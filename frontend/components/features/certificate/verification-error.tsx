import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

interface VerificationErrorProps {
  error: string;
  onTryAgain: () => void;
}

export function VerificationError({
  error,
  onTryAgain,
}: VerificationErrorProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
              Certificate Not Found
            </h3>
            <p className="text-red-700 dark:text-red-300 mb-4">
              {error ||
                "The certificate code you entered could not be verified."}
            </p>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Please check that you have entered the correct certificate code.
              </p>
              <p>
                If you continue to have issues, please contact our support team.
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={onTryAgain}>
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
