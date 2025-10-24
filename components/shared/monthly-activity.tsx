"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { monthlyActivityData } from "@/types";

function MonthlyActivity() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  return (
    <div className="w-full max-w-full px-4">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="overflow-hidden rounded-xl"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {monthlyActivityData.map((item, index) => (
            <CarouselItem key={index} className="p-1 md:basis-1/2 lg:basis-1/4">
              <Link href="">
                <div className="relative bg-gray-100 overflow-hidden shadow-md group">
                  <picture>
                    <img
                      src={item.imageUrl}
                      className="object-cover w-full h-96 transition-transform duration-500 group-hover:scale-105"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 text-white">
                    <h2 className="text-xl font-semibold mb-2"></h2>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default MonthlyActivity;
