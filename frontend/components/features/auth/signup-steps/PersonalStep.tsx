import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignupFormData, Gender } from "@/types";

interface StepProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
}

export const PersonalStep = ({ formData, updateFormData }: StepProps) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="phoneNumber">Phone Number</Label>
      <Input
        id="phoneNumber"
        type="tel"
        placeholder="+1 (555) 123-4567"
        value={formData.phoneNumber}
        onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
        required
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select
          value={formData.gender}
          onValueChange={(value: Gender) => updateFormData({ gender: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          id="dob"
          type="date"
          value={formData.dob}
          onChange={(e) => updateFormData({ dob: e.target.value })}
          required
        />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="address">Address</Label>
      <Input
        id="address"
        placeholder="123 Main Street"
        value={formData.address}
        onChange={(e) => updateFormData({ address: e.target.value })}
        required
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          placeholder="New York"
          value={formData.city}
          onChange={(e) => updateFormData({ city: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="district">District / State</Label>
        <Input
          id="district"
          placeholder="NY"
          value={formData.district}
          onChange={(e) => updateFormData({ district: e.target.value })}
          required
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="pincode">Pincode / ZIP</Label>
        <Input
          id="pincode"
          placeholder="10001"
          value={formData.pincode}
          onChange={(e) => updateFormData({ pincode: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          placeholder="United States"
          value={formData.country}
          onChange={(e) => updateFormData({ country: e.target.value })}
          required
        />
      </div>
    </div>
  </div>
);
