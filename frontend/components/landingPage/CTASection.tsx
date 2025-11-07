import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-6">
            {"Ready to start your learning journey?"}
          </h2>
          <p className="text-xl text-muted-foreground text-balance mb-8">
            {
              "Join thousands of students who have transformed their careers with Corner Academy."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/signup">
                {"Get Started Free"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent"
              asChild
            >
              <Link href="/contact">{"Contact Sales"}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
