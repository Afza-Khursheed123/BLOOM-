import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Sprout, HeartHandshake } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { StarRating } from '../../components/ui/StarRating';
import { mockCategories, mockProducts, mockTestimonials, mockFeatures } from '../../data/mockStorefrontData';
import { useCart } from '../../context/CartContext';

export const HomePage: React.FC = () => {
  const { addToCart } = useCart();
  const featuredProducts = mockProducts.slice(0, 5);

  return (
    <div className="space-y-24 pb-20">
      {/* 3.1 Hero Section (Figma: 41-3, 41-253) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F9F9F6] via-[#F4F4EE] to-[#F9F9F6] pt-12 md:pt-20 pb-16 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EDEA] text-[#3A7D6A] text-xs font-semibold tracking-widest uppercase">
                <Sprout className="w-3.5 h-3.5" />
                <span>For the Love of Green</span>
              </div>

              <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-[#1E3A2F] leading-[1.1] tracking-tight">
                Cultivate Your Oasis
              </h1>

              <p className="text-base sm:text-lg text-[#2C3E35]/80 max-w-xl font-normal leading-relaxed">
                A greener home begins with a single leaf. Explore nursery-grown plants, chosen with scientific care and potted for your interior space.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/shop">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                    Shop the Collection
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Our Story
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/80">
                <div className="flex items-center gap-2 text-xs text-[#2C3E35]">
                  <ShieldCheck className="w-4 h-4 text-[#3A7D6A] shrink-0" />
                  <span>30-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#2C3E35]">
                  <Sparkles className="w-4 h-4 text-[#3A7D6A] shrink-0" />
                  <span>Nursery Graded</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#2C3E35]">
                  <HeartHandshake className="w-4 h-4 text-[#3A7D6A] shrink-0" />
                  <span>Plant Care Support</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#3A7D6A]/20 to-[#C86D51]/10 blur-xl opacity-70" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=900&q=80"
                    alt="Ornamental blooming patio rose in terracotta vessel"
                    className="w-full h-[460px] object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-[#3A7D6A] font-semibold">
                        Specimen of the Week
                      </p>
                      <h4 className="font-serif font-bold text-[#1E3A2F] text-base">
                        Heirloom Patio Rose "Crimson"
                      </h4>
                    </div>
                    <span className="font-serif font-bold text-lg text-[#1E3A2F]">
                      $28.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.2 Category Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Curated Categories"
          title="Find your natural companion"
          subtitle="Explore our thoughtfully classified biological collections, tailored for every light level and living environment."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 flex flex-col h-80"
            >
              <div className="relative flex-1 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                  <span className="text-[11px] font-medium tracking-widest uppercase text-[#E8EDEA]">
                    {cat.itemCount} Varieties
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-0.5 mb-1 group-hover:text-[#E8EDEA] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3.3 Bestsellers Section (All 5 Ornamental Flowers) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-widest font-semibold text-[#3A7D6A] mb-1">
              Popular in Our Bays • Ornamental Blooms
            </p>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#1E3A2F]">
              The Nursery Favourites
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 sm:mt-0 text-sm font-semibold text-[#1E3A2F] hover:text-[#3A7D6A] flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Botanical Stock</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-2xs hover:shadow-lg transition-all flex flex-col text-left"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1E3A2F] text-white">
                    {product.badge}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      productId: product.id,
                      name: product.name,
                      slug: product.slug,
                      price: product.price,
                      image: product.images[0],
                      size: product.sizes[0],
                      color: product.colors[0]?.name || 'Standard',
                      quantity: 1,
                    })
                  }
                  className="absolute bottom-2.5 right-2.5 bg-white/95 hover:bg-[#1E3A2F] hover:text-white text-[#1E3A2F] p-2 rounded-full shadow-md transition-colors"
                  title="Quick add to cart"
                >
                  <Sprout className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-gray-500 italic truncate max-w-[120px]">
                      {product.botanicalName}
                    </span>
                    <StarRating rating={product.rating} showText={false} size="sm" />
                  </div>
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-serif font-bold text-base text-[#1E3A2F] hover:text-[#3A7D6A] transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </Link>
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#1E3A2F]">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link
                    to={`/product/${product.slug}`}
                    className="text-xs font-semibold text-[#3A7D6A] hover:underline"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3.4 Story / Nursery Philosophy Section */}
      <section className="bg-[#E8EDEA]/50 py-16 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80"
                alt="Greenhouse nursery bays with flourishing ornamental flowers"
                className="w-full h-[400px] object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-5 text-left">
              <p className="text-xs uppercase tracking-widest font-semibold text-[#3A7D6A]">
                Our Cultivation Philosophy
              </p>
              <h2 className="font-serif italic text-3xl sm:text-4xl text-[#1E3A2F] leading-tight">
                Good things take a little growing
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Unlike mass-market distribution chains where plants sit in dark shipping containers, every BLOOM specimen is cultivated under maritime natural light in our Oregon nursery bays until the day it ships.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                We test soil microbial vitality, grade leaf health with computer vision intelligence, and only release specimens that have achieved balanced root architecture.
              </p>
              <div className="pt-2">
                <Link to="/about">
                  <Button variant="primary" size="md">
                    Learn More About Our Bays
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="The Nursery Standard"
          title="Grow together with confidence"
          subtitle="Everything we do is designed to ensure your plants thrive from arrival through seasons of growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockFeatures.map((feat) => (
            <div
              key={feat.id}
              className="bg-white p-8 rounded-xl border border-gray-200/80 shadow-xs text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#E8EDEA] text-[#1E3A2F] flex items-center justify-center mb-5">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1E3A2F] mb-2">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3.6 Testimonial Quote */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-white p-10 sm:p-14 rounded-2xl border border-gray-200/80 shadow-sm relative">
          <span className="font-serif text-6xl text-[#3A7D6A]/30 absolute top-4 left-6 select-none">
            “
          </span>
          <p className="font-serif italic text-2xl sm:text-3xl text-[#1E3A2F] leading-relaxed relative z-10 mb-6">
            {mockTestimonials[0].quote}
          </p>
          <div>
            <h4 className="font-sans font-bold text-sm text-[#1E3A2F]">
              {mockTestimonials[0].author}
            </h4>
            <p className="text-xs text-gray-500">
              {mockTestimonials[0].role} • {mockTestimonials[0].location}
            </p>
          </div>
        </div>
      </section>

      {/* 3.7 Newsletter CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E3A2F] text-white rounded-2xl p-10 sm:p-14 text-center max-w-4xl mx-auto relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#5B9A82]">
              Botanical Society
            </p>
            <h2 className="font-serif italic text-3xl sm:text-4xl text-white">
              Your oasis is waiting.
            </h2>
            <p className="text-xs sm:text-sm text-[#E8EDEA]/80 leading-relaxed">
              Receive seasonal propagation guides, greenhouse release alerts, and 15% off your first nursery order.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to the BLOOM Botanical Journal!');
              }}
              className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-4"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-xs text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#5B9A82]"
              />
              <button
                type="submit"
                className="bg-[#E8EDEA] text-[#1E3A2F] font-semibold text-xs px-6 py-2.5 rounded-md hover:bg-white transition-colors cursor-pointer"
              >
                Sign Me Up
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
