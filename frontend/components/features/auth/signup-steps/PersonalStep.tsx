"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignupFormData } from "@/lib/validations/auth";
import { Control } from "react-hook-form";

interface StepProps {
  control: Control<SignupFormData>;
}

export const PersonalStep = ({ control }: StepProps) => (
  <div className="space-y-4">
    <FormField
      control={control}
      name="phoneNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Phone Number <span className="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Input type="tel" placeholder="+977 9800000000" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Gender <span className="text-destructive">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="dob"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Date of Birth <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                type="date"
                max={new Date().toISOString().split("T")[0]}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <FormField
      control={control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Address <span className="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Input placeholder="123 Main Street" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              City <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Butwal" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="district"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              District / State <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="NY" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="pincode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Pincode / ZIP <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="10001" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Country <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="United States" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </div>
);
