import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MaterialInfoTabsProps {
  materialType: string;
  description: string;
  duration?: string;
  size?: string;
  transcript?: string;
}

export function MaterialInfoTabs({
  materialType,
  description,
  duration,
  size,
  transcript,
}: MaterialInfoTabsProps) {
  return (
    <Tabs defaultValue="description" className="space-y-4">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        {materialType === "video" && transcript && (
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        )}
        <TabsTrigger value="notes">My Notes</TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">About this material</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{description}</p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="capitalize">{materialType} content</span>
              {duration && (
                <>
                  <span>•</span>
                  <span>{duration} duration</span>
                </>
              )}
              {size && (
                <>
                  <span>•</span>
                  <span>{size} file size</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {materialType === "video" && transcript && (
        <TabsContent value="transcript">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">Video Transcript</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <p className="text-sm leading-relaxed">{transcript}</p>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      )}

      <TabsContent value="notes">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">My Notes</CardTitle>
            <CardDescription>
              Take notes while studying this material
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No notes yet</h3>
              <p className="text-muted-foreground mb-4">
                Start taking notes to remember key points!
              </p>
              <Button>Add Note</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
