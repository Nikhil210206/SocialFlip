import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SectionHeading from "@/components/listing/SectionHeading";
import { PLATFORMS, NICHE_CATEGORIES } from "@/lib/constants";
import type { ListingSchema } from "@/lib/schema";

export default function BasicInformation() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ListingSchema>();

  const platformValue = watch("platform");
  const nicheCategoryValue = watch("nicheCategory");

  return (
    <div className="mb-8">
      <SectionHeading title="Basic Information" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Listing Title */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="listingTitle" className="text-sm text-gray-700 font-medium">
            Listing Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="listingTitle"
            placeholder="e.g. Premium Travel Instagram Account"
            className="bg-gray-50 border-gray-200 text-sm placeholder:text-gray-400 focus-visible:ring-indigo-500"
            {...register("listingTitle")}
          />
          {errors.listingTitle && (
            <p className="text-xs text-red-500 mt-0.5">{errors.listingTitle.message}</p>
          )}
        </div>

        {/* Platform */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="platform" className="text-sm text-gray-700 font-medium">
            Platform <span className="text-red-500">*</span>
          </Label>
          <Select
            value={platformValue}
            onValueChange={(val) =>
              setValue("platform", val as ListingSchema["platform"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger
              id="platform"
              className="bg-gray-50 border-gray-200 text-sm text-gray-500 focus:ring-indigo-500"
            >
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {PLATFORMS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.platform && (
            <p className="text-xs text-red-500 mt-0.5">{errors.platform.message}</p>
          )}
        </div>

        {/* Username / Handle */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="usernameHandle" className="text-sm text-gray-700 font-medium">
            Username/Handle <span className="text-red-500">*</span>
          </Label>
          <Input
            id="usernameHandle"
            placeholder="@username"
            className="bg-gray-50 border-gray-200 text-sm placeholder:text-gray-400 focus-visible:ring-indigo-500"
            {...register("usernameHandle")}
          />
          {errors.usernameHandle && (
            <p className="text-xs text-red-500 mt-0.5">{errors.usernameHandle.message}</p>
          )}
        </div>

        {/* Niche / Category */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="nicheCategory" className="text-sm text-gray-700 font-medium">
            Niche/Category <span className="text-red-500">*</span>
          </Label>
          <Select
            value={nicheCategoryValue}
            onValueChange={(val) =>
              setValue("nicheCategory", val as ListingSchema["nicheCategory"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger
              id="nicheCategory"
              className="bg-gray-50 border-gray-200 text-sm text-gray-500 focus:ring-indigo-500"
            >
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {NICHE_CATEGORIES.map((n) => (
                <SelectItem key={n.value} value={n.value}>
                  {n.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.nicheCategory && (
            <p className="text-xs text-red-500 mt-0.5">{errors.nicheCategory.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}