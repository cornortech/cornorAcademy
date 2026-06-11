import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  FileText,
  Eye,
  Bookmark,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFViewerProps {
  title: string;
  description: string;
  size: string;
  pages: number;
  completed: boolean;
  onMarkComplete: () => void;
}

export function PDFViewer({
  title,
  description,
  size,
  pages,
  completed,
  onMarkComplete,
}: PDFViewerProps) {
  const [pdfPage, setPdfPage] = useState(1);
  const [pdfZoom, setPdfZoom] = useState(100);

  return (
    <div className="space-y-4">
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-border bg-muted/50">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPdfPage(Math.max(1, pdfPage - 1))}
              disabled={pdfPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {pdfPage} of {pages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPdfPage(Math.min(pages, pdfPage + 1))}
              disabled={pdfPage === pages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPdfZoom(Math.max(50, pdfZoom - 25))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{pdfZoom}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPdfZoom(Math.min(200, pdfZoom + 25))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-gray-100 p-8 min-h-[600px] flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
            <div className="text-center space-y-4">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
              <div className="text-sm text-muted-foreground">
                <p>Size: {size}</p>
                <p>Pages: {pages}</p>
              </div>
              <Button>
                <Eye className="h-4 w-4 mr-1" />
                Open PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-1" />
            Bookmark
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
