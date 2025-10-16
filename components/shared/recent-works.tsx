"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

export default function RecentWorks() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay({ delay: 3000 }),
  ]);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <div className="flex flex-col items-start w-full h-full bg-green-500 md:flex-row md:items-center md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl my-4 md:my-8 font-bold text-gray-900 sm:text-4xl">
          Recent Works
        </h1>
        <div className="hidden md:flex items-center gap-1 mr-12">
          <Button
            className="rounded-full bg-yellow-500 border-white"
            onClick={scrollPrev}
          >
            &larr;
          </Button>
          <Button onClick={scrollNext}>&rarr;</Button>
        </div>
      </div>
      <div>
        <div className="max-w-prose md:max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>

          <p className="mt-4 text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            doloremque saepe architecto maiores repudiandae amet perferendis
            repellendus, reprehenderit voluptas sequi.
          </p>
        </div>
      </div>

      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
        <Image
          src="/images/lion1-edited.jpg"
          alt="Beautiful landscape"
          fill
          priority
          className="rounded object-cover object-center"
        />
      </div>
    </div>
  );
}
