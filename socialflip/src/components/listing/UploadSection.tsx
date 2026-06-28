"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { UploadCloud, X, FileImage } from "lucide-react";
import SectionHeading from "@/components/listing/SectionHeading";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  MAX_FILES,
} from "@/lib/constants";
import type { ListingSchema } from "@/lib/schema";
import type { UploadedFile } from "@/types/Listing";

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface FileCardProps {
  uploadedFile: UploadedFile;
  onRemove: (id: string) => void;
}

function FileCard({ uploadedFile, onRemove }: FileCardProps) {
  const { file, previewUrl, id } = uploadedFile;

  return (
    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
      {/* Thumbnail or icon */}
      <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center border border-gray-200">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FileImage className="w-5 h-5 text-gray-400" />
        )}
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 font-medium truncate">{file.name}</p>
        <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(id)}
        aria-label={`Remove ${file.name}`}
        className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function UploadSection() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ListingSchema>();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep RHF screenshots field in sync
  useEffect(() => {
    setValue(
      "screenshots",
      uploadedFiles.map((uf) => uf.file),
      { shouldValidate: true }
    );
  }, [uploadedFiles, setValue]);

  // Revoke object URLs on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      uploadedFiles.forEach((uf) => {
        if (uf.previewUrl) URL.revokeObjectURL(uf.previewUrl);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const processFiles = useCallback(
    (incoming: FileList | File[]) => {
      setLocalError(null);
      const files = Array.from(incoming);

      const valid: UploadedFile[] = [];
      const errs: string[] = [];

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
        valid.push({ file, previewUrl, id: generateId() });
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
    },
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      // Reset input value so the same file can be re-selected if removed
      e.target.value = "";
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = useCallback((id: string) => {
    setUploadedFiles((prev) => {
      const target = prev.find((uf) => uf.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((uf) => uf.id !== id);
    });
  }, []);

  const openFilePicker = () => inputRef.current?.click();

  const rhfError = errors.screenshots?.message as string | undefined;
  const displayError = localError ?? rhfError;

  return (
    <div className="mb-2">
      <SectionHeading title="Screenshots & Proof" />

      {/* Drop Zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload screenshots or proof of account analytics"
        onClick={openFilePicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openFilePicker();
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative flex flex-col items-center justify-center gap-3
          border-2 border-dashed rounded-xl px-6 py-10 cursor-pointer
          transition-colors duration-200 select-none
          ${
            isDragging
              ? "border-indigo-400 bg-indigo-50"
              : "border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/40"
          }
        `}
      >
        <UploadCloud
          className={`w-9 h-9 transition-colors ${
            isDragging ? "text-indigo-500" : "text-gray-400"
          }`}
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openFilePicker();
          }}
          className="text-sm font-medium bg-white border border-gray-200 text-gray-700 px-4 py-1.5 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
        >
          Choose Files
        </button>

        <p className="text-xs text-gray-400 text-center">
          Upload screenshots or proof of account analytics
        </p>

        <p className="text-xs text-gray-300">
          JPEG, PNG, WebP, GIF · max {MAX_FILE_SIZE_MB} MB · up to {MAX_FILES} files
        </p>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          className="hidden"
          onChange={handleInputChange}
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* Error */}
      {displayError && (
        <p className="text-xs text-red-500 mt-2">{displayError}</p>
      )}

      {/* File list */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-xs text-gray-500 font-medium">
            {uploadedFiles.length} file{uploadedFiles.length > 1 ? "s" : ""} selected
          </p>
          {uploadedFiles.map((uf) => (
            <FileCard key={uf.id} uploadedFile={uf} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
}