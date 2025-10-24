import RecentWorks from "@/components/shared/recent-works";
import Portfolio from "@/components/shared/portfolio";
import MonthlyActivity from "@/components/shared/monthly-activity";
import Contacts from "@/components/shared/contacts";
import About from "@/components/shared/about";
import { sampleImages } from "@/types";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section>
        <div className=" max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <RecentWorks />
        </div>
      </section>     

      <section className="max-w-screen-xl bg-gradient-to-b from-gray-50 via-gray-600 to-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mx-12 text-3xl font-semibold text-gray-800 uppercase mt-6 p-4">
          Portfolio
        </h1>
        <Portfolio gallery={sampleImages} />
        <div className="flex items-center justify-center text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-2xl border border-yellow-600 px-8 py-3 font-semibold text-gray-600 hover:bg-white hover:text-gray-700 transition"
          >
            <Link href="/portfolio ">Load More</Link>
          </Button>
        </div>
      </section>

      <section  className="max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 bg-white">
       <h1 className="mx-12 text-3xl font-semibold text-gray-800 uppercase my-6 p-4">
          Monthly Activity
        </h1>
       
        <MonthlyActivity />
      </section>
      <section id="contacts" className="max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 bg-white">
        <h2 className="mx-12 text-3xl font-semibold text-gray-800 uppercase my-6 p-4">
         Contacts
        </h2>       
        
       <Contacts/>
      </section>
    </>
  );
}
