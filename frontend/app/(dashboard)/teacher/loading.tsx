import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function TeacherDashboardLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-96 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>

          {[1, 2].map((i) => (
            <Card key={i} className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <Skeleton className="lg:w-1/4 h-32 rounded-lg" />
                  <div className="lg:w-3/4 space-y-4">
                    <div className="flex justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-10 w-full rounded bg-primary/5" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="space-y-2">
                          <div className="flex justify-between">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-8" />
                          </div>
                          <Skeleton className="h-2 w-full" />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Skeleton className="h-9 w-32" />
                      <Skeleton className="h-9 w-32" />
                      <Skeleton className="h-9 w-24" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="space-y-2 p-3 border border-border/50 rounded-lg"
                >
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex justify-between pt-1">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-8 w-full mt-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
