"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase/config";
import { Student } from "@/types";
import { updatePassword } from "firebase/auth";
import { Save } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface AccountInfoTableProps {
  user: Student;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<any>) => void;
}

const AccountInfoTable = ({ user, isEditing }: AccountInfoTableProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [isUpdatingPw, setIsUpdatingPw] = useState(false);

  const handlePasswordUpdate = async () => {
    if (newPassword.length < 6) {
      toast.error(
        "Password must be at least 6 characters including one uppercase, one lowercase, a number and a special character"
      );
      return;
    }
    if (!auth.currentUser) return;

    setIsUpdatingPw(true);
    try {
      await updatePassword(auth.currentUser, newPassword);
      toast.success("Password updated successfully!");
      setNewPassword("");
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        toast.error("Please logout and login again to change password");
      } else {
        toast.error("Failed to update password");
      }
    } finally {
      setIsUpdatingPw(false);
    }
  };

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
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={!isEditing}
          />
          {isEditing && (
            <Button
              className="w-full"
              onClick={handlePasswordUpdate}
              disabled={isUpdatingPw || !newPassword}
            >
              <Save className="h-4 w-4 mr-2" />
              {isUpdatingPw ? "Updating..." : "Update Password"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfoTable;
