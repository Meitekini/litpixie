import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900">
        <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
            <a
              className="inline-block rounded-full bg-teal-600 p-2 text-white shadow-sm transition hover:bg-teal-500 sm:p-3 lg:p-4"
              href="#mainContent"
            >
              <span className="sr-only">Back to top</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          <div className="lg:flex lg:items-end lg:justify-between">
            <div>
              <div className="flex justify-center text-teal-600 lg:justify-start">
                <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="64"
              height="64"
              role="img"
              aria-labelledby="title1 desc1"
            >
              <title id="title1">Camera logo</title>
              <desc id="desc1">
                A modern flat camera icon with circular lens and small flash
              </desc>
              <rect
                x="6"
                y="16"
                width="52"
                height="32"
                rx="4"
                ry="4"
                fill="#FFC400"
              />
              <rect x="10" y="12" width="12" height="8" rx="2" fill="#111827" />
              <circle cx="32" cy="32" r="11" fill="#ffffff" />
              <circle cx="32" cy="32" r="7" fill="#111827" />
              <circle cx="26" cy="26" r="2.3" fill="#ffffff" opacity="0.9" />
            </svg>

            <Link
              href="/"
              className="hidden sm:block text-2xl text-white font-bold tracking-wide"
            >
              LitPixel {" "}
              <span className="text-yellow-500">Photo</span>
              graphy
            </Link>
          </div>
              </div>

              <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
                Capturing moments, one click at a time. Explore our portfolio
                and discover the art of photography.
              </p>
            </div>

            <ul className="mt-12 flex flex-wrap justify-center text-white gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
               <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-gray-300 transition">
                Portfolio
              </Link>
            </li>           
            <li>
              <Link href="#contacts" className="hover:text-gray-300 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-gray-300 transition">
                Login
              </Link>
            </li>
            </ul>
          </div>

          <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
            Copyright &copy; 2026. All rights reserved.
          </p>
        </div>
      </footer>
  )
}
