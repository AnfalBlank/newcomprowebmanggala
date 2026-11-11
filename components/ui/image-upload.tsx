"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { needsUnoptimized } from "@/lib/image";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageUploadProps {
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
  /** "contain" untuk logo, "cover" untuk foto. */
  fit?: "cover" | "contain";
  label?: string;
}

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = "image/jpeg,image/png,image/webp";
const toolBtn = "size-7 rounded-full bg-black/75 text-white shadow hover:bg-black hover:text-white disabled:opacity-30";

/** Upload foto ke /api/upload (khusus admin). Hasilnya alamat /media/... */
export function ImageUpload({
  value,
  onChange,
  multiple = false,
  maxFiles = 4,
  className,
  disabled = false,
  fit = "cover",
  label,
}: ImageUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState("");

  const images = React.useMemo(() => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return [value];
  }, [value]);

  const upload = async (files: File[]) => {
    setError("");
    const valid = files.filter((f) => ACCEPT.split(",").includes(f.type) && f.size <= MAX_BYTES);
    if (valid.length < files.length) {
      setError("Sebagian file dilewati: hanya JPG, PNG, atau WEBP, maksimal 5 MB per foto.");
    }
    if (valid.length === 0) return;

    const form = new FormData();
    valid.forEach((f) => form.append("files", f));
    setIsPending(true);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Upload gagal");
      const urls: string[] = data.urls || [];
      if (multiple) onChange([...images, ...urls]);
      else if (urls[0]) onChange(urls[0]);
    } catch (e: any) {
      setError(e?.message || "Upload gagal");
    } finally {
      setIsPending(false);
    }
  };

  const pickFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const files = multiple ? Array.from(list).slice(0, Math.max(0, maxFiles - images.length)) : [list[0]!];
    void upload(files);
  };

  const removeImage = (index: number) => {
    if (multiple) onChange(images.filter((_, i) => i !== index));
    else onChange("");
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = [...images];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target]!, next[index]!];
    onChange(next);
  };

  const canAddMore = multiple ? images.length < maxFiles : images.length === 0;

  return (
    <div className={cn("space-y-3", className)}>
      {images.length > 0 && (
        <div className={cn("grid gap-3", multiple ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-1 max-w-xs")}>
          {images.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className={cn(
                "group relative aspect-video overflow-hidden rounded-xl border border-white/10",
                fit === "contain" ? "bg-white/90" : "bg-white/5"
              )}
            >
              <Image
                src={url}
                alt={`Foto ${index + 1}`}
                fill
                unoptimized={needsUnoptimized(url)}
                sizes="240px"
                className={fit === "contain" ? "object-contain p-3" : "object-cover"}
              />
              <div className="absolute inset-x-0 top-0 flex justify-end gap-1 p-1.5">
                {multiple && (
                  <>
                    <Button type="button" variant="ghost" size="icon" className={toolBtn} aria-label="Geser ke kiri"
                      onClick={() => move(index, -1)} disabled={disabled || isPending || index === 0}>
                      <ChevronLeft className="size-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className={toolBtn} aria-label="Geser ke kanan"
                      onClick={() => move(index, 1)} disabled={disabled || isPending || index === images.length - 1}>
                      <ChevronRight className="size-4" />
                    </Button>
                  </>
                )}
                <Button type="button" variant="ghost" size="icon" className={`${toolBtn} hover:!bg-red-600`} aria-label="Hapus foto"
                  onClick={() => removeImage(index)} disabled={disabled || isPending}>
                  <X className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {canAddMore && (
        <div
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (!disabled && !isPending) pickFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled && !isPending) setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          className={cn(
            "relative rounded-xl border-2 border-dashed transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-white/15 hover:border-white/30",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <label className={cn("flex cursor-pointer flex-col items-center justify-center p-6 text-center", (disabled || isPending) && "cursor-not-allowed")}>
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              multiple={multiple}
              onChange={(e) => {
                pickFiles(e.target.files);
                if (inputRef.current) inputRef.current.value = "";
              }}
              disabled={disabled || isPending}
              className="sr-only"
            />
            {isPending ? (
              <>
                <Loader2 className="text-muted-foreground mb-2 size-8 animate-spin" />
                <p className="text-sm font-medium">Mengupload…</p>
              </>
            ) : (
              <>
                <div className="bg-white/5 mb-2 flex size-11 items-center justify-center rounded-full">
                  {isDragging ? <ImageIcon className="text-primary size-5" /> : <Upload className="text-muted-foreground size-5" />}
                </div>
                <p className="text-sm font-medium">{label || (multiple ? "Pilih atau tarik foto ke sini" : "Pilih atau tarik foto ke sini")}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  JPG, PNG, WEBP · maks 5 MB{multiple ? ` · sisa ${maxFiles - images.length} foto` : ""}
                </p>
              </>
            )}
          </label>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
