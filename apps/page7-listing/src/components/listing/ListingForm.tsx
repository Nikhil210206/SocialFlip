"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingSchema, type ListingSchema } from "@/lib/schema";
import {
  DEFAULT_FOLLOWERS_COUNT,
  DEFAULT_ENGAGEMENT_RATE,
  DEFAULT_MONTHLY_VIEWS,
  DEFAULT_ASKING_PRICE,
} from "@/lib/constants";
import BasicInformation from "@/components/listing/BasicInformation";
import AccountMetrics from "@/components/listing/AccountMetrics";
import PricingSection from "@/components/listing/PricingSection";
import UploadSection from "@/components/listing/UploadSection";
import FooterButtons from "@/components/listing/FooterButtons";

const defaultValues: Partial<ListingSchema> = {
  listingTitle: "",
  usernameHandle: "",
  primaryAudienceCountry: "United States",
  followersCount: DEFAULT_FOLLOWERS_COUNT,
  engagementRate: DEFAULT_ENGAGEMENT_RATE,
  monthlyViews: DEFAULT_MONTHLY_VIEWS,
  askingPrice: DEFAULT_ASKING_PRICE,
  description: "",
  isVerified: false,
  isMonetized: false,
  screenshots: [],
};

export default function ListingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<ListingSchema>({
    resolver: zodResolver(listingSchema) as any,
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (data: ListingSchema) => {
    setIsSubmitting(true);
    try {
      // No backend call — log form data as required
      console.log("Listing form data:", data);

      // Simulate a brief async operation for UX feedback
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Reset form after successful "submission"
      methods.reset(defaultValues);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    methods.reset(defaultValues);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        aria-label="List your social media account"
      >
        {/* Section 1 */}
        <BasicInformation />

        {/* Divider */}
        <div className="border-t border-gray-100 mb-8" />

        {/* Section 2 */}
        <AccountMetrics />

        {/* Divider */}
        <div className="border-t border-gray-100 mb-8" />

        {/* Section 3 */}
        <PricingSection />

        {/* Divider */}
        <div className="border-t border-gray-100 mb-8" />

        {/* Section 4 */}
        <UploadSection />

        {/* Footer */}
        <FooterButtons
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </form>
    </FormProvider>
  );
}