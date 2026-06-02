import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useProductCategories } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ProductRange() {
  const { data: allCategories = [], isLoading: loading } =
    useProductCategories();

  // Take first 8 categories for home page
  const categories = allCategories.slice(0, 8);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance the showcase; left content + right image change together.
  useEffect(() => {
    if (categories.length <= 1 || paused) return;
    const t = setInterval(() => {
      setActive((p) => (p + 1) % categories.length);
    }, 3500);
    return () => clearInterval(t);
  }, [categories.length, paused]);

  if (loading) {
    return <LoadingSpinner className="min-h-100" />;
  }

  if (categories.length === 0) return null;

  const current = categories[active];
  const next = () => setActive((p) => (p + 1) % categories.length);
  const prev = () =>
    setActive((p) => (p - 1 + categories.length) % categories.length);

  return (
    <div className="w-full bg-linear-to-b from-white via-green-50 to-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-6">
            Our <span className="text-green-500">Product Range</span>
          </h1>
          <div className="w-24 h-1 bg-green-500 rounded mx-auto"></div>
        </div>

        {/* Synced Showcase: LEFT content  |  RIGHT image */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* RIGHT — Content (changes with the active image) */}
          <div className="order-2 lg:order-2 min-h-[260px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug || active}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700 ring-1 ring-green-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {current.name}
                </span>

                <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  {current.heading || current.name}
                </h2>

                <div className="mt-3 h-1 w-16 rounded-full bg-green-500" />

                <div
                  className="mt-5 text-base md:text-lg leading-relaxed text-justify text-gray-600 line-clamp-5 [&_p]:m-0"
                  dangerouslySetInnerHTML={{
                    __html:
                      current.description ||
                      "Premium quality, carefully sourced and export-ready for global markets.",
                  }}
                />

                <Link to={`/products/${current.slug}`}>
                  <button className="mt-7 inline-flex items-center gap-2 rounded-full bg-green-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105 hover:bg-green-600 active:scale-95">
                    Explore {current.name}
                    <ArrowRight size={18} />
                  </button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* LEFT — Image card (auto-scrolls through categories) */}
          <div className="order-1 lg:order-1">
            <div className="relative">
              <div className="relative h-72 sm:h-80 lg:h-[400px] w-full overflow-hidden rounded-3xl border-4 border-green-500/30 bg-slate-50 shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.slug || active}
                    src={current.image}
                    alt={current.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    loading="eager"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                {/* gradient + label */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-slate-950/55 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow">
                    {current.name}
                  </h3>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    {String(active + 1).padStart(2, "0")}/
                    {String(categories.length).padStart(2, "0")}
                  </span>
                </div>

                {/* prev / next */}
                <button
                  onClick={prev}
                  aria-label="Previous category"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-green-700 shadow-md transition hover:bg-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next category"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-green-700 shadow-md transition hover:bg-white"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Thumbnail strip — click to jump (content syncs) */}
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categories.map((cat, i) => (
                  <button
                    key={cat.slug || i}
                    onClick={() => setActive(i)}
                    aria-label={cat.name}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                      i === active
                        ? "border-green-500 scale-105 shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* View More Button */}
        <Link to="/products">
          <div className="flex justify-center">
            <button className="bg-green-500 text-white font-bold py-3 px-8 rounded transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg uppercase text-sm tracking-wide">
              View More
            </button>
          </div>
        </Link>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-10 -z-10 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
    </div>
  );
}
