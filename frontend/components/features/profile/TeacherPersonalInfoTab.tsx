import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Teacher } from "@/types";

interface PersonalInfoTabProps {
  formData: Partial<Teacher>;
  isEditing: boolean;
  isSaving: boolean;
  onInputChange: (e: React.ChangeEvent<any>) => void;
  onSave: () => void;
}

export function TeacherPersonalInfoTab({
  formData,
  isEditing,
  isSaving,
  onInputChange,
  onSave,
}: PersonalInfoTabProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={onInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={onInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Input
              id="gender"
              value={formData.gender || ""}
              onChange={onInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob || ""}
              onChange={onInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio *</Label>
            <textarea
              id="bio"
              className="w-full min-h-[100px] p-2 border border-border rounded-md text-sm bg-transparent disabled:opacity-50"
              value={formData.bio || ""}
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
}
