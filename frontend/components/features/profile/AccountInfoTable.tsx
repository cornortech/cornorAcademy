import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Student } from "@/types";
import { Save } from "lucide-react";
import React from "react";

interface AccountInfoTableProps {
  user: Student;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<any>) => void;
}

const AccountInfoTable = ({ user, isEditing }: AccountInfoTableProps) => {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="id">Student ID</Label>
            <Input id="id" value={user.id} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="uid">UID</Label>
            <Input id="uid" value={user.uid} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input id="status" value={user.status} disabled />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Change Password</Label>
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
      </CardContent>
    </Card>
  );
};

export default AccountInfoTable;
