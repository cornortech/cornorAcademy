import { TabsContent } from "@radix-ui/react-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Star } from "lucide-react";
import { getCourseData } from "@/data/mock/GetCourseData";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

const ReviewTab = ({ params }: { params: { courseId: string } }) => {
  const course = getCourseData(params.courseId);
  return (
    <TabsContent value="reviews">
      <Card>
        <CardHeader>
          <CardTitle>Student Reviews</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold">{course.rating}</span>
            </div>
            <span className="text-muted-foreground">
              ({course.reviews.toLocaleString()} reviews)
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Sample reviews */}
            {[
              {
                name: "Alex Thompson",
                rating: 5,
                date: "2 weeks ago",
                comment:
                  "Excellent course! The instructor explains everything clearly and the projects are very practical.",
              },
              {
                name: "Maria Garcia",
                rating: 5,
                date: "1 month ago",
                comment:
                  "This course exceeded my expectations. I learned so much and feel confident in my new skills.",
              },
              {
                name: "David Kim",
                rating: 4,
                date: "2 months ago",
                comment:
                  "Great content and well-structured. Would recommend to anyone starting in this field.",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="border-b border-border/40 pb-4 last:border-b-0"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{review.name}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ReviewTab;
