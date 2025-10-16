import RecentWorks from "@/components/shared/recent-works";
import React from "react";

export default function Home() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
         
          <RecentWorks />
        </div>
      </section>

      <section className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Example Fluid Area</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center">
            Block A
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center">
            Block B
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center">
            Block C
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          More Content (Scroll to Test)
        </h2>
        <p className="text-gray-700 mb-4">
          Paste or generate more content here to see how the footer behaves when
          the page becomes taller than the viewport.
        </p>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet,
          pariatur.
        </p>
        <p className="text-gray-700 mt-2">
          (Add many paragraphs to test long pages)
        </p>
      </section>
    </>
  );
}
