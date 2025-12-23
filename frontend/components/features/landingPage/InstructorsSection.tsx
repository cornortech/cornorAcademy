import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { mockCourses } from "@/lib/data";

export default function InstructorsSection() {
  // pick unique instructors from mockCourses
  const instructorsMap: Record<string, any> = {};
  mockCourses.forEach((c) => {
    const ins = c.instructor as any;
    if (ins && !instructorsMap[ins.email]) instructorsMap[ins.email] = ins;
  });
  const instructors = Object.values(instructorsMap).slice(0, 6);

  return (
    <section id="instructors" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Our Instructors</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Experienced industry professionals who build real-world skills.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((ins: any, idx: number) => (
            <Card key={idx} className="text-center">
              <CardHeader>
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={ins.avatar || "/teacher-avatar.png"} />
                    <AvatarFallback>{(ins.name || "").split(" ").map((n: string) => n[0] || "").slice(0,2).join("")}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{ins.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">{ins.title}</div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{ins.bio}</p>
                
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
