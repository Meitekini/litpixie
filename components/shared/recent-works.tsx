"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ✅ Photography categories data
const categories = [
  {
    category: "Landscape Photography",
    description:
      "Captures natural scenery such as mountains, forests, and oceans, often emphasizing scale and beauty.",
    image_url: "/images/landscape-img1.jpg",
  },
  {
    category: "Portrait Photography",
    description:
      "Focuses on capturing the personality, mood, and expressions of individuals or groups.",
    image_url: "/images/portrait-photography1.jpg",
  },
  {
    category: "Wildlife Photography",
    description:
      "Documents animals in their natural habitats, often requiring patience and long lenses.",
    image_url: "/images/wildlife-img2.jpg",
  },
  {
    category: "Street Photography",
    description:
      "Candidly captures everyday life and human interactions in public spaces.",
    image_url: "/images/street-photography.jpg",
  },
  {
    category: "Macro Photography",
    description:
      "Reveals tiny details of small subjects like insects, flowers, or textures.",
    image_url: "/images/macro-photography.jpg",
  },
  {
    category: "Architectural Photography",
    description:
      "Showcases buildings, structures, and urban design with artistic or documentary intent.",
    image_url: "/images/architectural-photography.jpg",
  },
  {
    category: "Food Photography",
    description:
      "Highlights meals, ingredients, and culinary art, often used in advertising and social media.",
    image_url: "/images/food-photography.jpg",
  },
  {
    category: "Astrophotography",
    description:
      "Captures celestial objects like stars, galaxies, and the Milky Way using long exposures.",
    image_url: "/images/astro-photography.jpg",
  },
];

export default function RecentWorks() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const handlePrev = () => api?.scrollPrev();
  const handleNext = () => api?.scrollNext();
  const handleThumbnailClick = (index: number) => api?.scrollTo(index);

  return (
    <div className="w-full max-w-full px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-8 space-y-3 sm:space-y-0">
        <h1 className="text-2xl text-gray-700 md:text-3xl font-bold text-center sm:text-left uppercase">
          My Work
        </h1>
        <div className="hidden md:flex items-center justify-center sm:justify-end gap-2">
          <Button
            className="bg-yellow-400 border-white hover:bg-yellow-500"
            variant="outline"
            size="icon"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </Button>
          <Button
            className="bg-yellow-400 border-white hover:bg-yellow-500"
            variant="outline"
            size="icon"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="overflow-hidden rounded-xl"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories.map((item, index) => (
            <CarouselItem key={index} className="p-1 md:basis-1/2 lg:basis-1/4">
              <Link href="">
                <div className="relative bg-gray-100 overflow-hidden shadow-md group">
                  <Image
                    src={item.image_url}
                    alt={item.category}
                    width={1200}
                    height={700}
                    className="object-cover w-full h-96 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 text-white">
                    <h2 className="text-xl font-semibold mb-2">
                      {item.category}
                    </h2>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </div>
                </div>
            </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnails Navigation */}
      <div className="flex flex-wrap justify-center mt-6 gap-3">
        {categories.map((item, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-md overflow-hidden border-2 transition-all ${
              index === current
                ? "border-gray-900 scale-105"
                : "border-transparent hover:border-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <Image
              src={item.image_url}
              alt={item.category}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 80px, 100px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
