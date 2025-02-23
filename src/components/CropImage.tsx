"use client";
import { Cropper, ReactCropperElement } from "react-cropper";
import { Button } from "@/components/ui/button";
import Resizer from "react-image-file-resizer";
import { ImageUpIcon } from "lucide-react";
import { useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
interface cropImageDialogProps {
  src: string;
  width: number;
  height: number;
  onClose: () => void;
  onCropped: (dataUrl: string) => void;
}
export const PLACEHOLDER_IMAGE = "https://placehold.co/1080x1080";
export function CropImageDialog({
  src,
  width,
  height,
  onClose,
  onCropped,
}: cropImageDialogProps) {
  const cropAspectRatio = Number(width) / Number(height);
  const cropperRef = useRef<ReactCropperElement>(null);
  function crop() {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    const dataURL = cropper.getCroppedCanvas().toDataURL();

    onCropped(dataURL);

    onClose();
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <Cropper
          src={src}
          aspectRatio={cropAspectRatio}
          guides
          zoomable={false}
          ref={cropperRef}
        />
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={crop}>Crop</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface ImageInputProps {
  src: string | undefined;
  onImageCropped: (dataUrl: string) => void;
}

export default function ImageInput({ src, onImageCropped }: ImageInputProps) {
  const [imageTocrop, setImageTocrop] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onImageSelected(image: File | undefined) {
    if (!image) return;
    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (uri) => setImageTocrop(uri as File),
      "file"
    );
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onImageSelected(e.target.files?.[0])}
        ref={fileInputRef}
        className="sr-only hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="group relative block w-full overflow-hidden border"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src || PLACEHOLDER_IMAGE}
          alt="Blog Image"
          className="obejct-cover aspect-[1/1] w-full flex-none"
        />
        <span
          className={cn(
            "group-bg-black/50 absolute inset-0 flex items-center justify-center transition-all group-hover:bg-black/30 group-hover:backdrop-blur-[2px]",
            src && "opacity-0 group-hover:opacity-100"
          )}
        >
          <ImageUpIcon size={40} strokeWidth={1.5} color="black" />
        </span>
      </button>
      {imageTocrop && (
        <CropImageDialog
          src={URL.createObjectURL(imageTocrop)}
          width={1}
          height={1}
          onCropped={onImageCropped}
          onClose={() => {
            setImageTocrop(undefined);
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
        />
      )}
    </>
  );
}
