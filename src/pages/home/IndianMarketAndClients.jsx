import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useProductStrengthData } from "../../hooks/useApi";

// Card Component
const MarketCard = ({ card }) => {
  return (
    <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border-4 border-[#C6D869]/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C6D869] hover:shadow-xl hover:shadow-[#C6D869]/20">
      <div className="mb-4 flex items-start gap-3">
        <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C6D869]/20 ring-1 ring-[#C6D869]/40">
          {card.image ? (
            <img
              src={card.image}
              alt={card.title}
              className="h-7 w-7 object-contain"
              loading="lazy"
            />
          ) : (
            <CheckCircle2 className="h-6 w-6 text-[#5e7a17]" strokeWidth={2} />
          )}
        </div>
        <h3 className="flex-1 text-lg font-bold text-slate-900">
          {card.title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-slate-600">
        {card.description}
      </p>
      <div className="mt-4 h-1 w-16 rounded-full bg-linear-to-r from-[#00BED7] to-[#C6D869]" />
    </div>
  );
};

export default function IndianMarketAndClients() {
  const { data: marketData, isLoading: loading } = useProductStrengthData();

  const cards = marketData?.cards || [];

  return (
    <div className="w-full bg-linear-to-b from-slate-50 via-white to-slate-50 overflow-hidden py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#00BED7]/10 to-[#C6D869]/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-slate-700 border border-[#00BED7]/20 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#00BED7] animate-pulse" />
            Why Indian Market
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {marketData?.heading || "Why the Indian market is"}{" "}
            <span className="text-green-500">Best?</span>
          </h2>

          <div className="h-1.5 w-32 bg-linear-to-r from-[#00BED7] to-[#C6D869] rounded-full mx-auto mb-6" />

          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            India offers unmatched diversity in climate, soil, and produce,
            creating a strong base for consistent, high-quality food supply
            across the globe.
          </p>
        </div>

        {/* Static Cards Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BED7]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cards.map((card, index) => (
              <MarketCard key={`card-${card.id}-${index}`} card={card} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
