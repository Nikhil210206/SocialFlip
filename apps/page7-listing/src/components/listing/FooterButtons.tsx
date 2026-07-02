import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { ListingSchema } from "@/lib/schema";

interface FooterButtonsProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function FooterButtons({ onCancel, isSubmitting }: FooterButtonsProps) {
  const {
    formState: { errors },
  } = useFormContext<ListingSchema>();

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="mt-8 pt-5 border-t border-gray-200">
      {/* Validation summary hint */}
      {hasErrors && (
        <p className="text-xs text-red-500 mb-4 text-right">
          Please fix the errors above before submitting.
        </p>
      )}

      <div className="flex items-center justify-end gap-3">
        {/* Cancel */}
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="min-w-[90px] border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors"
        >
          Cancel
        </Button>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[130px] bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </span>
          ) : (
            "Create Listing"
          )}
        </Button>
      </div>
    </div>
  );
}