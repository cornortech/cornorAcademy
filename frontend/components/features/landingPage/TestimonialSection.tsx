import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Quote, User } from "lucide-react";
import { landingTestimonials } from "@/lib/data";

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
            {"What learners say"}
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            {
              "Real feedback from learners who accelerated their skills with Cornor Academy."
            }
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {landingTestimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border-border/50 bg-card/50 backdrop-blur transition-transform duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-br hover:from-primary/10 hover:via-primary/20 hover:to-secondary/10"
            >
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      {testimonial.image ? (
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.name}
                        />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>

                  <div className="rounded-full bg-primary/10 p-3">
                    <Quote className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <p className="text-base leading-7 text-foreground">
                  {testimonial.feedback}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
