import { Award, Link, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const CTASection = () => {
  return (
    <section id="verify-certificate" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
            {"Verify Certificate"}
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            {
              "Verify the authenticity of Corner Academy certificates using the unique certificate ID."
            }
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">
                {"Certificate Verification"}
              </CardTitle>
              <CardDescription>
                {
                  "Enter the certificate ID to verify its authenticity and view certificate details."
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="certificate-id"
                    className="text-sm font-medium"
                  >
                    Certificate ID
                  </label>
                  <div className="flex space-x-2">
                    <input
                      id="certificate-id"
                      type="text"
                      placeholder="Enter certificate ID (e.g., CA-2024-WD-001234)"
                      className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <Button asChild>
                      <Link href="/verify-certificate">{"Verify"}</Link>
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    {"Certificate IDs follow the format: CA-YYYY-CC-NNNNNN"}
                  </p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>{"CA: Corner Academy identifier"}</li>
                    <li>{"YYYY: Year of completion"}</li>
                    <li>
                      {"CC: Course code (WD=Web Dev, DS=Data Science, etc.)"}
                    </li>
                    <li>{"NNNNNN: Unique certificate number"}</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-medium mb-3">
                  {"Sample Certificate Verification"}
                </h4>
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {"Certificate ID:"}
                    </span>
                    <span className="text-sm font-mono">
                      {"CA-2024-WD-001234"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {"Student Name:"}
                    </span>
                    <span className="text-sm">{"John Doe"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{"Course:"}</span>
                    <span className="text-sm">
                      {"Web Development Fundamentals"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {"Completion Date:"}
                    </span>
                    <span className="text-sm">{"March 15, 2024"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{"Status:"}</span>
                    <Badge variant="default" className="bg-green-500">
                      <Shield className="h-3 w-3 mr-1" />
                      {"Verified"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  {
                    "Need help finding your certificate ID? Contact our support team."
                  }
                </p>
                <Button variant="outline" asChild>
                  <Link href="/contact">{"Contact Support"}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
