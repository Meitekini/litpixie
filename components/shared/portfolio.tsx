import React from "react";
import type { Gallery, GalleryImage } from "@/types";

interface Props {
  gallery: Gallery[];
}

const flattenImages = (gallery: Gallery): GalleryImage[] => {
  const albumImages: GalleryImage[] =
    gallery.albums?.flatMap((album: any) => album.images) ?? [];

  const galleryImages: GalleryImage[] = gallery.images ?? [];

  return [...albumImages, ...galleryImages];
};

const Portfolio: React.FC<Props> = ({ gallery }) => {
  const images = gallery.flatMap(flattenImages);

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 overflow-hidden gap-4 p-4">
      {images.map((img) => (
        <div key={img.id} className="mb-4 break-inside-avoid">
          <img
            src={img.src}
            alt={img.alt}
            className="w-auto rounded-lg shadow-md"
          />
          <h3 className="text-base font-semibold mt-2">{img.title}</h3>
          <p className="text-sm text-gray-600">{img.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;

