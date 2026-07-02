import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SectionHeading from "@/components/listing/SectionHeading";
import { AUDIENCE_AGE_RANGES } from "@/lib/constants";
import type { ListingSchema } from "@/lib/schema";

interface NumericInputProps {
  id: keyof ListingSchema;
  label: string;
  placeholder: string;
  required?: boolean;
}

function NumericInput({ id, label, placeholder, required = false }: NumericInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ListingSchema>();

  const error = errors[id];

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm text-gray-700 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type="number"
        placeholder={placeholder}
        className="bg-gray-50 border-gray-200 text-sm placeholder:text-gray-400 focus-visible:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        {...register(id, { valueAsNumber: true })}
      />
      {error && (
        <p className="text-xs text-red-500 mt-0.5">
          {error.message as string}
        </p>
      )}
    </div>
  );
}

export default function AccountMetrics() {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext<ListingSchema>();

  const ageRangeValue = watch("primaryAudienceAgeRange");

  return (
    <div className="mb-8">
      <SectionHeading title="Account Metrics" />

      {/* Row 1: Followers | Engagement Rate | Monthly Views */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 mb-5">
        <NumericInput
          id="followersCount"
          label="Followers Count"
          placeholder="10000"
          required
        />
        <NumericInput
          id="engagementRate"
          label="Engagement Rate (%)"
          placeholder="4"
          required
        />
        <NumericInput
          id="monthlyViews"
          label="Monthly Views/Impressions"
          placeholder="100000"
        />
      </div>

      {/* Row 2: Audience Country | Audience Age Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
        {/* Primary Audience Country */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="primaryAudienceCountry" className="text-sm text-gray-700 font-medium">
            Primary Audience Country
          </Label>
          <Input
            id="primaryAudienceCountry"
            placeholder="United States"
            className="bg-gray-50 border-gray-200 text-sm placeholder:text-gray-400 focus-visible:ring-indigo-500"
            {...register("primaryAudienceCountry")}
          />
          {errors.primaryAudienceCountry && (
            <p className="text-xs text-red-500 mt-0.5">
              {errors.primaryAudienceCountry.message}
            </p>
          )}
        </div>

        {/* Primary Audience Age Range */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="primaryAudienceAgeRange" className="text-sm text-gray-700 font-medium">
            Primary Audience Age Range
          </Label>
          <Select
            value={ageRangeValue}
            onValueChange={(val) =>
              setValue(
                "primaryAudienceAgeRange",
                val as ListingSchema["primaryAudienceAgeRange"],
                { shouldValidate: true }
              )
            }
          >
            <SelectTrigger
              id="primaryAudienceAgeRange"
              className="bg-gray-50 border-gray-200 text-sm text-gray-500 focus:ring-indigo-500"
            >
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {AUDIENCE_AGE_RANGES.map((a) => (
                <SelectItem key={a.value} value={a.value}>
                  {a.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.primaryAudienceAgeRange && (
            <p className="text-xs text-red-500 mt-0.5">
              {errors.primaryAudienceAgeRange.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Checkboxes */}
      <div className="flex flex-col gap-3">
        {/* Is Verified */}
        <div className="flex items-center gap-2.5">
          <Controller
            control={control}
            name="isVerified"
            render={({ field }) => (
              <Checkbox
                id="isVerified"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="border-gray-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
              />
            )}
          />
          <Label
            htmlFor="isVerified"
            className="text-sm text-gray-700 font-normal cursor-pointer"
          >
            Account is verified on the platform
          </Label>
        </div>

        {/* Is Monetized */}
        <div className="flex items-center gap-2.5">
          <Controller
            control={control}
            name="isMonetized"
            render={({ field }) => (
              <Checkbox
                id="isMonetized"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="border-gray-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
              />
            )}
          />
          <Label
            htmlFor="isMonetized"
            className="text-sm text-gray-700 font-normal cursor-pointer"
          >
            Account is monetized
          </Label>
        </div>
      </div>
    </div>
  );
}