"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

export default function Banner() {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Parallax scroll effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]); // slower background movement

  return (
    <section
      ref={ref}
      className="relative h-[90vh] md:h-[100vh] w-full overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/images/bg-banner.jpg" // replace with your image path
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Header */}
      <header className="absolute top-0 left-0 z-20 w-full bg-transparent">
        <nav className="flex items-center justify-between px-6 py-5 text-white">
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
              className="hidden sm:block text-2xl font-bold tracking-wide"
            >
              LitPixel
              <span className="text-yellow-500">Photo</span>
              graphy
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-lg">
            <li>
              <Link href="#features" className="hover:text-gray-300 transition">
                Features
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-gray-300 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-gray-300 transition">
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              // Close icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m0 6H4"
                />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md text-white"
            >
              <ul className="flex flex-col items-center gap-6 py-6 text-lg">
                <li>
                  <Link
                    href="#features"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-gray-300 transition"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-gray-300 transition"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-gray-300 transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-xl  sm:text-2xl md:text-4xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg">
          Elevate Your Experience
        </h1>

        <p className="max-w-md md:max-w-2xl text-base md:text-xl mb-8 text-gray-200">
          Discover a new world of innovation, design, and seamless performance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#contacts"
            className="rounded-2xl bg-yellow-600 px-8 py-3 font-semibold text-white hover:bg-yellow-700 transition"
          >
            Contact
          </Link>
          <Link
            href="/portfolio"
            className="rounded-2xl border border-yellow-600 px-8 py-3 font-semibold text-white hover:bg-white hover:text-black transition"
          >
            Portfolio
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

{
  /* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-labelledby="title3 desc3">
  <title id="title3">Vintage camera logo</title>
  <desc id="desc3">A stylized retro camera with film knob and textured lens</desc>
  <!-- body -->
  <rect x="6" y="18" width="52" height="28" rx="5" ry="5" fill="#2b2f36"/>
  <!-- top strip -->
  <rect x="8" y="12" width="36" height="10" rx="2" ry="2" fill="#3f4349"/>
  <!-- film knob -->
  <circle cx="50" cy="14" r="4" fill="#d1d5db"/>
  <!-- lens outer -->
  <circle cx="32" cy="32" r="11" fill="#111827"/>
  <!-- lens mid -->
  <circle cx="32" cy="32" r="7" fill="#6b7280"/>
  <!-- lens glass highlight -->
  <ellipse cx="26" cy="27" rx="2.6" ry="1.6" fill="#ffffff" opacity="0.9"/>
  <!-- small flash -->
  <rect x="46" y="22" width="6" height="4" rx="1" fill="#fbbf24"/>
</svg> */
}
