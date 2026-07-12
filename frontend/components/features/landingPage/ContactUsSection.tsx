"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Clock3, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "@/contexts/SettingsContext";

export function ContactUsSection() {
  const { settings } = useSettings();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [courseInterest, setCourseInterest] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setPhone("");
    setCourseInterest("");
    setInquiryType("");
    setMessage("");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <section>
          <div className="mb-8 max-w-3xl rounded-3xl border border-border/70 bg-primary/5 p-10 shadow-sm backdrop-blur-sm">
            <div className="mb-1 flex items-center gap-1">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl text-primary-foreground">
                <Image
                  src="/logo/logo.png"
                  alt="Cornor Academy logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{settings?.platformName || "Cornor Academy"}</p>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Talk to a learning advisor</h1>
            <p className="text-lg text-muted-foreground leading-8">
              Need help choosing the right course, onboarding your team, or learning about pricing? Our {settings?.platformName || "Cornor Academy"} specialists are ready to match you with the best path.
            </p>
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll route your request to the right team.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {submitted && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
                  Thanks for reaching out! Your message has been received, and we will respond shortly.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground/90" htmlFor="contact-name">
                      Name
                    </label>
                    <Input
                      id="contact-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground/90" htmlFor="contact-email">
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground/90" htmlFor="contact-phone">
                      Phone
                    </label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="e.g. +977 9841234567"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground/90" htmlFor="contact-inquiry">
                      Inquiry type
                    </label>
                    <Select
                      value={inquiryType}
                      onValueChange={setInquiryType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-student">New student / enrollment</SelectItem>
                        <SelectItem value="pricing">Pricing & plans</SelectItem>
                        <SelectItem value="enterprise">Team / corporate training</SelectItem>
                        <SelectItem value="support">Technical support</SelectItem>
                        <SelectItem value="general">General question</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground/90" htmlFor="contact-interest">
                    Course area
                  </label>
                  <Input
                    id="contact-interest"
                    value={courseInterest}
                    onChange={(event) => setCourseInterest(event.target.value)}
                    placeholder="e.g. Web Development, UX Design, Data Science"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground/90" htmlFor="contact-message">
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Tell us more about your goals or needs"
                    rows={6}
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button size="lg" type="submit">
                    Request consultation
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

        </section>

        <aside className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Talk to the right team</CardTitle>
              <CardDescription>
                Choose the best option for course advice, enterprise training, or support.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-muted-foreground">{settings?.supportEmail || "support@cornoracademy.com"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm text-muted-foreground">{settings?.supportPhone || "+977 9828750115"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Response time</p>
                    <p className="text-sm text-muted-foreground">Typically within 1 business day</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Why contact us?</CardTitle>
              <CardDescription>
                We help students and organizations find the right learning path.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="space-y-3">
                <p className="font-medium">Get a custom match for:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Career-focused course recommendations</li>
                  <li>Corporate training and group pricing</li>
                  <li>Enrollment support and onboarding</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-muted p-4">
                <p className="font-medium">Tip</p>
                <p>Choose your inquiry type so we can route your request faster.</p>
              </div>
            </CardContent>
          </Card>
        </aside>

      </div>
    </div>
  );
}
