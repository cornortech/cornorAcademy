import { Download, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeViewerProps {
  title: string;
  description: string;
  size: string;
  completed: boolean;
  onMarkComplete: () => void;
}

export function CodeViewer({
  title,
  description,
  size,
  completed,
  onMarkComplete,
}: CodeViewerProps) {
  return (
    <div className="space-y-4">
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-border bg-muted/50">
          <h3 className="font-medium">{title}</h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>

        <div className="p-6 bg-gray-50 min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-16 w-16 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground max-w-md">{description}</p>
            <div className="text-sm text-muted-foreground">
              <p>Size: {size}</p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-1" />
              Download Files
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          {!completed && (
            <Button onClick={onMarkComplete}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
