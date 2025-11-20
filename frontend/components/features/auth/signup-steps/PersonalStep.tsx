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
  errors?: Record<string, string>;
}

export const PersonalStep = ({
  formData,
  updateFormData,
  errors,
}: StepProps) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="phoneNumber">
        Phone Number <span className="text-destructive">*</span>
      </Label>
      <Input
        id="phoneNumber"
        type="tel"
        placeholder="+1 (555) 123-4567"
        value={formData.phoneNumber}
        onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
        className={errors?.phoneNumber ? "border-destructive" : ""}
      />
      {errors?.phoneNumber && (
        <p className="text-sm text-destructive">{errors.phoneNumber}</p>
      )}
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="gender">
          Gender <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.gender}
          onValueChange={(value: Gender) => updateFormData({ gender: value })}
        >
          <SelectTrigger className={errors?.gender ? "border-destructive" : ""}>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors?.gender && (
          <p className="text-sm text-destructive">{errors.gender}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="dob">
          Date of Birth <span className="text-destructive">*</span>
        </Label>
        <Input
          id="dob"
          type="date"
          value={formData.dob}
          onChange={(e) => updateFormData({ dob: e.target.value })}
          className={errors?.dob ? "border-destructive" : ""}
          max={new Date().toISOString().split("T")[0]}
        />
        {errors?.dob && (
          <p className="text-sm text-destructive">{errors.dob}</p>
        )}
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="address">
        Address <span className="text-destructive">*</span>
      </Label>
      <Input
        id="address"
        placeholder="123 Main Street"
        value={formData.address}
        onChange={(e) => updateFormData({ address: e.target.value })}
        className={errors?.address ? "border-destructive" : ""}
      />
      {errors?.address && (
        <p className="text-sm text-destructive">{errors.address}</p>
      )}
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="city">
          City <span className="text-destructive">*</span>
        </Label>
        <Input
          id="city"
          placeholder="Butwal"
          value={formData.city}
          onChange={(e) => updateFormData({ city: e.target.value })}
          className={errors?.city ? "border-destructive" : ""}
        />
        {errors?.city && (
          <p className="text-sm text-destructive">{errors.city}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="district">
          District / State <span className="text-destructive">*</span>
        </Label>
        <Input
          id="district"
          placeholder="NY"
          value={formData.district}
          onChange={(e) => updateFormData({ district: e.target.value })}
          className={errors?.district ? "border-destructive" : ""}
        />
        {errors?.district && (
          <p className="text-sm text-destructive">{errors.district}</p>
        )}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="pincode">
          Pincode / ZIP <span className="text-destructive">*</span>
        </Label>
        <Input
          id="pincode"
          placeholder="10001"
          value={formData.pincode}
          onChange={(e) => updateFormData({ pincode: e.target.value })}
          className={errors?.pincode ? "border-destructive" : ""}
        />
        {errors?.pincode && (
          <p className="text-sm text-destructive">{errors.pincode}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">
          Country <span className="text-destructive">*</span>
        </Label>
        <Input
          id="country"
          placeholder="United States"
          value={formData.country}
          onChange={(e) => updateFormData({ country: e.target.value })}
          className={errors?.country ? "border-destructive" : ""}
        />
        {errors?.country && (
          <p className="text-sm text-destructive">{errors.country}</p>
        )}
      </div>
    </div>
  </div>
);
