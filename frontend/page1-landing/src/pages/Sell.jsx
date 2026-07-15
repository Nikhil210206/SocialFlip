import React, { useState, useEffect, useRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, X, FileImage, ShieldAlert, CheckCircle2 } from "lucide-react";
import { listingSchema } from "../lib/schema";
import {
  DEFAULT_FOLLOWERS_COUNT,
  DEFAULT_ENGAGEMENT_RATE,
  DEFAULT_MONTHLY_VIEWS,
  DEFAULT_ASKING_PRICE,
  PLATFORMS,
  NICHE_CATEGORIES,
  AUDIENCE_AGE_RANGES,
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  MAX_FILES,
  MAX_DESCRIPTION_CHARS
} from "../lib/constants";

// Sub-components
function SectionHeading({ title }) {
  return (
    <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-4">
      {title}
    </h2>
  );
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function SellPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState(null);
  const inputRef = useRef(null);

  const defaultValues = {
    listingTitle: "",
    platform: undefined,
    usernameHandle: "",
    nicheCategory: undefined,
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(listingSchema),
    defaultValues,
    mode: "onTouched",
  });

  const description = watch("description") ?? "";
  const charsUsed = description.length;
  const isNearLimit = charsUsed >= MAX_DESCRIPTION_CHARS * 0.9;
  const isAtLimit = charsUsed >= MAX_DESCRIPTION_CHARS;

  // Keep screenshots field in sync
  useEffect(() => {
    setValue(
      "screenshots",
      uploadedFiles.map((uf) => uf.file),
      { shouldValidate: true }
    );
  }, [uploadedFiles, setValue]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      uploadedFiles.forEach((uf) => {
        if (uf.previewUrl) URL.revokeObjectURL(uf.previewUrl);
      });
    };
  }, []);

  const processFiles = useCallback((incoming) => {
    setLocalError(null);
    const files = Array.from(incoming);
    const valid = [];
    const errs = [];

    for (const file of files) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        errs.push(`"${file.name}" is not a supported image type.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        errs.push(`"${file.name}" exceeds ${MAX_FILE_SIZE_MB} MB.`);
        continue;
      }
      const previewUrl = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null;
      valid.push({ file, previewUrl, id: Math.random().toString(36).slice(2, 9) });
    }

    if (errs.length > 0) {
      setLocalError(errs.join(" "));
    }

    setUploadedFiles((prev) => {
      const combined = [...prev, ...valid];
      if (combined.length > MAX_FILES) {
        setLocalError(`You can upload a maximum of ${MAX_FILES} files.`);
        return combined.slice(0, MAX_FILES);
      }
      return combined;
    });
  }, []);

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (id) => {
    setUploadedFiles((prev) => {
      const target = prev.find((uf) => uf.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((uf) => uf.id !== id);
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting Listing Data:", data);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSuccess(true);
      reset(defaultValues);
      setUploadedFiles([]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-gray-150 shadow-sm max-w-md w-full text-center">
          <CheckCircle2 className="mx-auto text-green-500 w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Listing Created Successfully!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Your listing has been submitted for review. It will appear on the marketplace once approved by our verification team.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => setSuccess(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
            >
              List Another Account
            </button>
            <a
              href="/marketplace"
              className="w-full block bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl border border-gray-200 transition text-center"
            >
              Go to Marketplace
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="rounded-2xl p-6 sm:p-8 bg-white shadow-sm border border-gray-150">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">List Your Social Account</h1>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* 1. Basic Info */}
            <div className="mb-6">
              <SectionHeading title="Basic Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Listing Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    placeholder="e.g. Premium Travel Instagram Account"
                    className="bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    {...register("listingTitle")}
                  />
                  {errors.listingTitle && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.listingTitle.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Platform <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition cursor-pointer"
                    {...register("platform")}
                  >
                    <option value="">Select...</option>
                    {PLATFORMS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  {errors.platform && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.platform.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Username / Handle <span className="text-red-500">*</span>
                  </label>
                  <input
                    placeholder="@username"
                    className="bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    {...register("usernameHandle")}
                  />
                  {errors.usernameHandle && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.usernameHandle.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Niche / Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition cursor-pointer"
                    {...register("nicheCategory")}
                  >
                    <option value="">Select...</option>
                    {NICHE_CATEGORIES.map((n) => (
                      <option key={n.value} value={n.value}>
                        {n.label}
                      </option>
                    ))}
                  </select>
                  {errors.nicheCategory && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.nicheCategory.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 mb-6" />

            {/* 2. Account Metrics */}
            <div className="mb-6">
              <SectionHeading title="Account Metrics" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Followers Count <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="10000"
                    className="bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    {...register("followersCount", { valueAsNumber: true })}
                  />
                  {errors.followersCount && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.followersCount.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Engagement Rate (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="4.0"
                    className="bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    {...register("engagementRate", { valueAsNumber: true })}
                  />
                  {errors.engagementRate && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.engagementRate.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Monthly Views / Impressions
                  </label>
                  <input
                    type="number"
                    placeholder="100000"
                    className="bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    {...register("monthlyViews", { valueAsNumber: true })}
                  />
                  {errors.monthlyViews && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.monthlyViews.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Primary Audience Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    placeholder="United States"
                    className="bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    {...register("primaryAudienceCountry")}
                  />
                  {errors.primaryAudienceCountry && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.primaryAudienceCountry.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Audience Age Range <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition cursor-pointer"
                    {...register("primaryAudienceAgeRange")}
                  >
                    <option value="">Select...</option>
                    {AUDIENCE_AGE_RANGES.map((a) => (
                      <option key={a.value} value={a.value}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                  {errors.primaryAudienceAgeRange && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.primaryAudienceAgeRange.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-4">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <Controller
                    control={control}
                    name="isVerified"
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                    )}
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">Account is verified on platform</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <Controller
                    control={control}
                    name="isMonetized"
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                    )}
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">Account is monetized</span>
                </label>
              </div>
            </div>

            <div className="border-t border-gray-100 mb-6" />

            {/* 3. Pricing and Description */}
            <div className="mb-6">
              <SectionHeading title="Pricing & Description" />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Asking Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="2500.00"
                    className="bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    {...register("askingPrice", { valueAsNumber: true })}
                  />
                  {errors.askingPrice && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.askingPrice.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-700">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <span className={`text-xxs font-semibold ${isAtLimit ? "text-red-500" : isNearLimit ? "text-amber-500" : "text-gray-400"}`}>
                      {charsUsed}/{MAX_DESCRIPTION_CHARS}
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    maxLength={MAX_DESCRIPTION_CHARS}
                    placeholder="Describe your account, audience, content type, reason for selling, and transfer details..."
                    className="bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition resize-none"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.description.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 mb-6" />

            {/* 4. Upload Section */}
            <div className="mb-8">
              <SectionHeading title="Screenshots & Proof" />
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl px-6 py-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition select-none ${
                  isDragging ? "border-indigo-400 bg-indigo-50" : "border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/30"
                }`}
              >
                <UploadCloud size={32} className={isDragging ? "text-indigo-500 animate-bounce" : "text-gray-400"} />
                <button
                  type="button"
                  className="text-xs font-semibold bg-white border border-gray-200 text-gray-700 px-4 py-1.5 rounded-xl shadow-sm hover:bg-gray-50 transition"
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                >
                  Choose Files
                </button>
                <p className="text-xxs text-gray-400 text-center">
                  Drag and drop screenshots of account analytics
                </p>
                <p className="text-xxs text-gray-300">
                  JPEG, PNG, WebP · max {MAX_FILE_SIZE_MB}MB · up to {MAX_FILES} files
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={handleInputChange}
                />
              </div>

              {localError && <p className="text-xs text-red-500 mt-2">{localError}</p>}
              {errors.screenshots && <p className="text-xs text-red-500 mt-2">{errors.screenshots.message}</p>}

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xxs text-gray-500 font-semibold">{uploadedFiles.length} file(s) selected</p>
                  {uploadedFiles.map((uf) => (
                    <div key={uf.id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {uf.previewUrl ? (
                          <img src={uf.previewUrl} className="w-8 h-8 rounded-lg object-cover border border-gray-200 shrink-0" alt="preview" />
                        ) : (
                          <FileImage className="text-gray-400 w-8 h-8 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-gray-700 truncate">{uf.file.name}</p>
                          <p className="text-xxs text-gray-400">{formatBytes(uf.file.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemove(uf.id)}
                        className="text-gray-400 hover:text-red-500 transition p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                className="bg-white border border-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition"
                onClick={() => { reset(defaultValues); setUploadedFiles([]); }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-md shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Listing..." : "Create Listing"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
