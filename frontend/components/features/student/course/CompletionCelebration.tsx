"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Award, Download, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CompletionCelebrationProps {
  certificateUrl: string | null;
  courseTitle: string;
  onDismiss: () => void;
}

function ConfettiParticle({ index }: { index: number }) {
  const colors = ["#a855f7", "#ec4899", "#3b82f6", "#22c55e", "#eab308", "#f97316"];
  const color = colors[index % colors.length];
  const left = `${Math.random() * 100}%`;
  const delay = `${Math.random() * 3}s`;
  const duration = `${2 + Math.random() * 3}s`;
  const size = `${6 + Math.random() * 8}px`;

  return (
    <div
      className="absolute animate-float-down"
      style={{
        left,
        top: "-10px",
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        animationDelay: delay,
        animationDuration: duration,
      }}
    />
  );
}

export function CompletionCelebration({
  certificateUrl,
  courseTitle,
  onDismiss,
}: CompletionCelebrationProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <ConfettiParticle key={i} index={i} />
        ))}
      </div>

      <Card className="relative z-10 max-w-md mx-4 animate-in zoom-in-95">
        <CardContent className="p-8 text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <PartyPopper className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-1">Congratulations!</h2>
            <p className="text-muted-foreground">
              You have completed <strong>{courseTitle}</strong>
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 dark:bg-green-500/10 rounded-lg px-4 py-3">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">100% Complete</span>
          </div>

          {certificateUrl && (
            <Button className="w-full" asChild>
              <a href={certificateUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </a>
            </Button>
          )}

          <Button variant="outline" className="w-full" onClick={onDismiss}>
            Continue Learning
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
