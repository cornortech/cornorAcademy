import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignupFormData, UserRole } from "@/types";
import { PasswordInput } from "../PasswordInput";

interface StepProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
}

export const AccountStep = ({ formData, updateFormData }: StepProps) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name">Full Name</Label>
      <Input
        id="name"
        placeholder="John Doe"
        value={formData.name}
        onChange={(e) => updateFormData({ name: e.target.value })}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="john.doe@example.com"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="role">I am a</Label>
      <Select
        value={formData.role}
        onValueChange={(value: UserRole) => updateFormData({ role: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select your role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="student">Student</SelectItem>
          <SelectItem value="teacher">Teacher</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <PasswordInput
        id="password"
        placeholder="Create a strong password"
        value={formData.password}
        onChange={(e) => updateFormData({ password: e.target.value })}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <PasswordInput
        id="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
        required
      />
    </div>
  </div>
);
