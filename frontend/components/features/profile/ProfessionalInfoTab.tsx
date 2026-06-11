import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Teacher } from "@/types";

interface ProfessionalInfoTabProps {
  formData: Partial<Teacher>;
  isEditing: boolean;
  isSaving: boolean;
  onInputChange: (e: React.ChangeEvent<any>) => void;
  onSave: () => void;
}

export function ProfessionalInfoTab({
  formData,
  isEditing,
  isSaving,
  onInputChange,
  onSave,
}: ProfessionalInfoTabProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Professional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience *</Label>
            <Input
              id="experience"
              type="number"
              value={formData.noOfYearsExperience || ""}
              onChange={onInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expertise">Expertise Areas *</Label>
            <Input
              id="expertise"
              value={formData.expertise || ""}
              onChange={onInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="id">Teacher ID</Label>
            <Input id="id" value={formData.id} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="uid">UID</Label>
            <Input id="uid" value={formData.uid} disabled />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tch-password">Change Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="New password"
            disabled={!isEditing}
          />
          {isEditing && (
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          )}
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
}
