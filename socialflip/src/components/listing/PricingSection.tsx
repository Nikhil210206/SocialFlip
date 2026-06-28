import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "@/components/listing/SectionHeading";
import { MAX_DESCRIPTION_CHARS } from "@/lib/constants";
import type { ListingSchema } from "@/lib/schema";

export default function PricingSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ListingSchema>();

  const description = watch("description") ?? "";
  const charsUsed = description.length;
  const isNearLimit = charsUsed >= MAX_DESCRIPTION_CHARS * 0.9;
  const isAtLimit = charsUsed >= MAX_DESCRIPTION_CHARS;

  return (
    <div className="mb-8">
      <SectionHeading title="Pricing & Description" />

      <div className="flex flex-col gap-5">
        {/* Asking Price */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="askingPrice" className="text-sm text-gray-700 font-medium">
            Asking Price (USD) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="askingPrice"
            type="number"
            placeholder="2500.00"
            step="0.01"
            min="0"
            className="bg-gray-50 border-gray-200 text-sm placeholder:text-gray-400 focus-visible:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            {...register("askingPrice", { valueAsNumber: true })}
          />
          {errors.askingPrice && (
            <p className="text-xs text-red-500 mt-0.5">{errors.askingPrice.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="description" className="text-sm text-gray-700 font-medium">
              Description <span className="text-red-500">*</span>
            </Label>
            <span
              className={`text-xs tabular-nums transition-colors ${
                isAtLimit
                  ? "text-red-500 font-semibold"
                  : isNearLimit
                  ? "text-amber-500"
                  : "text-gray-400"
              }`}
            >
              {charsUsed}/{MAX_DESCRIPTION_CHARS}
            </span>
          </div>
          <Textarea
            id="description"
            placeholder="Describe your account, audience, content type, reason for selling, and any other relevant details..."
            rows={6}
            maxLength={MAX_DESCRIPTION_CHARS}
            className="bg-gray-50 border-gray-200 text-sm placeholder:text-gray-400 focus-visible:ring-indigo-500 resize-none"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-0.5">{errors.description.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}