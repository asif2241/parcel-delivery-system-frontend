// src/components/parcel-tracking/ParcelImage.tsx
import { Image as ImageIcon } from "lucide-react";



export function ParcelImage({ src, alt }: { src?: string; alt: string }) {
    if (!src) {
        return (
            <div className="bg-muted border-2 border-dashed rounded-lg w-full h-48 flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="w-10 h-10 mb-2" />
                <span className="text-sm">No image</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className="w-full h-48 object-cover rounded-lg border"
            loading="lazy"
        />
    );
}