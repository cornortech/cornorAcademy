import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Student } from "@/types";
import { Save } from "lucide-react";
import React from "react";

interface EducationTabProps {
  formData: Partial<Student>;
  isEditing: boolean;
  isSaving: boolean;
  onInputChange: (e: React.ChangeEvent<any>) => void;
  onSave: () => void;
}

const EducationTab = ({
  formData,
  isEditing,
  isSaving,
  onInputChange,
  onSave,
}: EducationTabProps) => {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Education Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="educationInstitute">Education Institute</Label>
            <Input
              id="educationInstitute"
              value={formData.educationInstitute || ""}
              onChange={onInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qualification">Qualification</Label>
            <Input
              id="qualification"
              value={formData.qualification || ""}
              onChange={onInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        {isEditing && (
          <Button onClick={onSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationTab;
