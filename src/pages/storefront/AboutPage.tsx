import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, CheckCircle2, Heart, ArrowUpRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* 1. Hero Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#3A7D6A]">
          Our Roots, Our Reason
        </p>
        <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-[#1E3A2F] leading-[1.15]">
          Growing with Purpose
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto font-normal">
          We grow plants. But what we really cultivate is a closer connection to nature—one
          well-tended leaf, one thoughtful choice, one greener space at a time.
        </p>
      </section>

      {/* 2. Greenhouse Hero Image with Caption */}
      <section className="space-y-3">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm h-64 sm:h-96 md:h-[460px] w-full bg-[#E8EDEA]">
          <img
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1600&q=80"
            alt="Greenhouse no. 3 at BLOOM Nursery, Portland, Oregon"
            className="w-full h-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-xs text-gray-500 text-center tracking-wide font-normal">
          Greenhouse no. 3 at BLOOM Nursery, Portland, Oregon
        </p>
      </section>

      {/* 3. A nursery with a slower rhythm */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
        <div className="md:col-span-5 space-y-3">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#3A7D6A]">
            Established in 2014
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-[42px] text-[#1E3A2F] leading-tight">
            A nursery with a slower rhythm.
          </h2>
        </div>

        <div className="md:col-span-7 space-y-5 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
          <p>
            BLOOM began with a modest greenhouse and a simple belief: good plants deserve good
            beginnings. Our small team of growers has been nurturing that idea ever since,
            patiently learning from every season.
          </p>
          <p>
            Today, we cultivate a considered collection of foliage, ferns, succulents and flowering
            plants. We favour healthy growth over hurried growth, and useful guidance over
            complicated promises. Every plant we offer carries a little of that attention with it.
          </p>
        </div>
      </section>

      {/* 4. Our Commitment to Quality (Soft Sage Box) */}
      <section className="bg-[#EAEFEA] rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#1E3A2F]/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs uppercase tracking-widest font-semibold text-[#3A7D6A]">
              Care you can see
            </p>
            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-[40px] text-[#1E3A2F] leading-tight">
              Our Commitment to Quality
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal pt-1">
              <p>
                A beautiful plant should also be a healthy one. We check root development, foliage
                condition and overall form, then assign each batch a clear quality grade.
              </p>
              <p>
                Grade A plants show exemplary growth; Grade B plants are healthy and saleable, with
                minor cosmetic variation. Only these market-ready grades enter our collection; any
                batch on hold stays unavailable until its status is resolved.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#1E3A2F] text-white hover:bg-[#152a22] text-xs sm:text-sm font-medium px-5 py-3 rounded-lg transition-all shadow-xs hover:shadow-sm"
              >
                <span>Explore market-ready plants</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xs bg-[#E8EDEA] h-72 sm:h-80 md:h-[360px] w-full">
              <img
                src="https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=1000&q=80"
                alt="Nursery grower inspecting root development in greenhouse"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Rooted in the things that matter */}
      <section className="space-y-12">
        <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-[40px] text-[#1E3A2F] text-center leading-tight">
          Rooted in the things that matter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-left">
          {/* Card 1 */}
          <div className="space-y-3">
            <div className="text-[#3A7D6A]">
              <Sprout className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif italic text-xl sm:text-2xl text-[#1E3A2F]">
              Patient cultivation
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              Strong roots take time. We give our plants the attention and growing conditions they
              need, through every stage.
            </p>
          </div>

          {/* Card 2 */}
          <div className="space-y-3">
            <div className="text-[#3A7D6A]">
              <CheckCircle2 className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif italic text-xl sm:text-2xl text-[#1E3A2F]">
              Honest standards
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              Clear grades and visible batch information help you understand exactly what you are
              choosing.
            </p>
          </div>

          {/* Card 3 */}
          <div className="space-y-3">
            <div className="text-[#3A7D6A]">
              <Heart className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif italic text-xl sm:text-2xl text-[#1E3A2F]">
              Shared knowledge
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              From light to watering, we make plant care approachable. A growing question is always
              welcome here.
            </p>
          </div>
        </div>
      </section>

      {/* 6. There is always room for one more */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center pt-4">
        <div className="md:col-span-5">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xs bg-[#E8EDEA] h-64 sm:h-80 md:h-[320px] w-full">
            <img
              src="https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=1000&q=80"
              alt="BLOOM Nursery cottage storefront with terracotta pots"
              className="w-full h-full object-cover"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="md:col-span-7 space-y-4">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#3A7D6A]">
            Come grow with us
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-[40px] text-[#1E3A2F] leading-tight">
            There is always room for one more.
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal max-w-xl">
            Ask a question, meet our plants, or simply find a little inspiration. We would love to
            hear from you.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-[#1E3A2F] text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-2xs hover:border-gray-400"
            >
              <span>Say hello</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
