import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Minus, Plus, Check, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { mockProducts } from '../../data/mockStorefrontData';
import { useCart } from '../../context/CartContext';
import { useAdminInventory } from '../../context/AdminInventoryContext';

export const ShopPage: React.FC = () => {
  const { addToCart } = useCart();
  const { batches } = useAdminInventory();

  // Collapsible filter sections state
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    species: true,
    price: true,
    care: true,
    size: true,
    grade: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter states
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [selectedCare, setSelectedCare] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>(['Grade A', 'Grade B']);
  const [sortOrder, setSortOrder] = useState<string>('price-low');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Check if Ficus is locked or on hold via admin
  const ficusBatch = batches.find((b) => b.species.includes('Ficus'));
  const isFicusStorefrontActive = ficusBatch ? ficusBatch.storefrontActive : true;

  // Reset all filters to default
  const handleReset = () => {
    setSelectedSpecies([]);
    setMaxPrice(100);
    setSelectedCare([]);
    setSelectedSizes([]);
    setSelectedGrades(['Grade A', 'Grade B']);
    setSortOrder('price-low');
  };

  const toggleFilter = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  // Filtered & Sorted products calculation
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Respect admin hold
    if (!isFicusStorefrontActive) {
      result = result.map((p) =>
        p.slug === 'ficus-elastica' ? { ...p, inStock: false } : p
      );
    }

    // Filter by Species
    if (selectedSpecies.length > 0) {
      result = result.filter((p) => p.species && selectedSpecies.includes(p.species));
    }

    // Filter by Price Range
    result = result.filter((p) => p.price <= maxPrice);

    // Filter by Care Level
    if (selectedCare.length > 0) {
      result = result.filter((p) => p.careLevel && selectedCare.includes(p.careLevel));
    }

    // Filter by Size
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizeCategory && selectedSizes.includes(p.sizeCategory));
    }

    // Filter by Quality Grade
    if (selectedGrades.length > 0) {
      result = result.filter((p) => p.qualityGrade && selectedGrades.includes(p.qualityGrade));
    } else {
      // If neither grade selected, return empty list
      return [];
    }

    // Sort
    if (sortOrder === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'popularity') {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortOrder === 'newest') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    selectedSpecies,
    maxPrice,
    selectedCare,
    selectedSizes,
    selectedGrades,
    sortOrder,
    isFicusStorefrontActive,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10 text-left">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 font-normal">
        <Link to="/" className="hover:text-[#1E3A2F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-800">Shop all plants</span>
      </nav>

      {/* 2. Collection Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-gray-200/60">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#3A7D6A]">
            The Bloom Collection
          </p>
          <h1 className="font-serif italic text-4xl sm:text-5xl text-[#1E3A2F] leading-tight">
            A little green, a lot of possibility.
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-normal">
            Explore nursery-grown plants, thoughtfully graded and ready to flourish.
          </p>
        </div>

        <div className="self-start md:self-auto shrink-0">
          <span className="inline-flex items-center text-xs font-medium text-[#1E3A2F] bg-[#E8EDEA] px-3.5 py-1 rounded-full">
            Saleable Grade A &amp; B only
          </span>
        </div>
      </div>

      {/* Mobile filter toggle */}
      <div className="md:hidden flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3A2F] bg-white border border-gray-300 px-4 py-2 rounded-lg"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{mobileFilterOpen ? 'Hide Filters' : 'Filter Plants'}</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">Sort by</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white border border-gray-300 rounded-md py-1.5 px-3 text-xs text-[#1E3A2F] font-medium"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popularity">Popularity</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* 3. Main Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Sidebar Filters */}
        <aside
          className={`md:col-span-4 lg:col-span-3 space-y-6 ${
            mobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          {/* Filter Header with Reset */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <h2 className="text-sm font-bold text-[#1E3A2F] tracking-tight">Filter plants</h2>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-[#1E3A2F] transition-colors underline decoration-gray-300 hover:decoration-[#1E3A2F]"
            >
              Reset
            </button>
          </div>

          {/* Group 1: Species */}
          <div className="border-b border-gray-200 pb-5">
            <button
              type="button"
              onClick={() => toggleSection('species')}
              className="w-full flex items-center justify-between py-1 text-xs font-semibold text-[#1E3A2F] text-left"
            >
              <span>Species</span>
              {openSections.species ? (
                <Minus className="w-3.5 h-3.5 text-gray-400" />
              ) : (
                <Plus className="w-3.5 h-3.5 text-gray-400" />
              )}
            </button>

            {openSections.species && (
              <div className="mt-3 space-y-2.5">
                {[
                  'Foliage plants',
                  'Ferns',
                  'Succulents',
                  'Flowering plants',
                ].map((spec) => {
                  const isChecked = selectedSpecies.includes(spec);
                  return (
                    <label
                      key={spec}
                      className="flex items-center gap-2.5 cursor-pointer group select-none"
                    >
                      <div
                        onClick={() => toggleFilter(spec, selectedSpecies, setSelectedSpecies)}
                        className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#1E3A2F] border-[#1E3A2F] text-white'
                            : 'border-gray-300 bg-white group-hover:border-gray-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span
                        onClick={() => toggleFilter(spec, selectedSpecies, setSelectedSpecies)}
                        className={`text-xs ${
                          isChecked ? 'text-[#1E3A2F] font-medium' : 'text-gray-600'
                        } group-hover:text-[#1E3A2F]`}
                      >
                        {spec}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Group 2: Price Range */}
          <div className="border-b border-gray-200 pb-5">
            <button
              type="button"
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between py-1 text-xs font-semibold text-[#1E3A2F] text-left"
            >
              <span>Price Range</span>
              {openSections.price ? (
                <Minus className="w-3.5 h-3.5 text-gray-400" />
              ) : (
                <Plus className="w-3.5 h-3.5 text-gray-400" />
              )}
            </button>

            {openSections.price && (
              <div className="mt-4 space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="2"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3A7D6A]"
                />
                <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <span>$0</span>
                  <span className="text-[#1E3A2F] font-semibold">${maxPrice}</span>
                  <span>$100</span>
                </div>
              </div>
            )}
          </div>

          {/* Group 3: Care Level */}
          <div className="border-b border-gray-200 pb-5">
            <button
              type="button"
              onClick={() => toggleSection('care')}
              className="w-full flex items-center justify-between py-1 text-xs font-semibold text-[#1E3A2F] text-left"
            >
              <span>Care Level</span>
              {openSections.care ? (
                <Minus className="w-3.5 h-3.5 text-gray-400" />
              ) : (
                <Plus className="w-3.5 h-3.5 text-gray-400" />
              )}
            </button>

            {openSections.care && (
              <div className="mt-3 space-y-2.5">
                {['Easy-going', 'A little attention', 'Experienced grower'].map((care) => {
                  const isChecked = selectedCare.includes(care);
                  return (
                    <label
                      key={care}
                      className="flex items-center gap-2.5 cursor-pointer group select-none"
                    >
                      <div
                        onClick={() => toggleFilter(care, selectedCare, setSelectedCare)}
                        className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#1E3A2F] border-[#1E3A2F] text-white'
                            : 'border-gray-300 bg-white group-hover:border-gray-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span
                        onClick={() => toggleFilter(care, selectedCare, setSelectedCare)}
                        className={`text-xs ${
                          isChecked ? 'text-[#1E3A2F] font-medium' : 'text-gray-600'
                        } group-hover:text-[#1E3A2F]`}
                      >
                        {care}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Group 4: Size */}
          <div className="border-b border-gray-200 pb-5">
            <button
              type="button"
              onClick={() => toggleSection('size')}
              className="w-full flex items-center justify-between py-1 text-xs font-semibold text-[#1E3A2F] text-left"
            >
              <span>Size</span>
              {openSections.size ? (
                <Minus className="w-3.5 h-3.5 text-gray-400" />
              ) : (
                <Plus className="w-3.5 h-3.5 text-gray-400" />
              )}
            </button>

            {openSections.size && (
              <div className="mt-3 space-y-2.5">
                {[
                  'Small - under 30 cm',
                  'Medium - 30-60 cm',
                  'Large - over 60 cm',
                ].map((sz) => {
                  const isChecked = selectedSizes.includes(sz);
                  return (
                    <label
                      key={sz}
                      className="flex items-center gap-2.5 cursor-pointer group select-none"
                    >
                      <div
                        onClick={() => toggleFilter(sz, selectedSizes, setSelectedSizes)}
                        className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#1E3A2F] border-[#1E3A2F] text-white'
                            : 'border-gray-300 bg-white group-hover:border-gray-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span
                        onClick={() => toggleFilter(sz, selectedSizes, setSelectedSizes)}
                        className={`text-xs ${
                          isChecked ? 'text-[#1E3A2F] font-medium' : 'text-gray-600'
                        } group-hover:text-[#1E3A2F]`}
                      >
                        {sz}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Group 5: Quality Grade */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => toggleSection('grade')}
              className="w-full flex items-center justify-between py-1 text-xs font-semibold text-[#1E3A2F] text-left"
            >
              <span>Quality Grade</span>
              {openSections.grade ? (
                <Minus className="w-3.5 h-3.5 text-gray-400" />
              ) : (
                <Plus className="w-3.5 h-3.5 text-gray-400" />
              )}
            </button>

            {openSections.grade && (
              <div className="mt-3 space-y-2.5">
                {['Grade A', 'Grade B'].map((grade) => {
                  const isChecked = selectedGrades.includes(grade);
                  return (
                    <label
                      key={grade}
                      className="flex items-center gap-2.5 cursor-pointer group select-none"
                    >
                      <div
                        onClick={() => toggleFilter(grade, selectedGrades, setSelectedGrades)}
                        className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#1E3A2F] border-[#1E3A2F] text-white'
                            : 'border-gray-300 bg-white group-hover:border-gray-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span
                        onClick={() => toggleFilter(grade, selectedGrades, setSelectedGrades)}
                        className={`text-xs ${
                          isChecked ? 'text-[#1E3A2F] font-medium' : 'text-gray-600'
                        } group-hover:text-[#1E3A2F]`}
                      >
                        {grade}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Quality Standard Callout Box */}
            <div className="bg-[#E8EDEA]/60 border border-gray-200/50 rounded-xl p-4 flex items-start gap-3 mt-6">
              <CheckCircle2 className="w-4 h-4 text-[#3A7D6A] shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Healthy, market-ready stock only. Held batches are not listed for sale.
              </p>
            </div>
          </div>
        </aside>

        {/* Right Product Grid Column */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          {/* Top Results Toolbar */}
          <div className="hidden md:flex items-center justify-between pb-3 text-xs text-gray-500">
            <div>
              <span>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'plant' : 'plants'} ·
                1–{filteredProducts.length} of {filteredProducts.length} results
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>Sort by</span>
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-1.5 pl-3 pr-8 text-xs text-[#1E3A2F] font-medium hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E3A2F] cursor-pointer"
                >
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200/70 p-8 space-y-3">
              <p className="font-serif italic text-2xl text-[#1E3A2F]">
                No matching plants found.
              </p>
              <p className="text-xs text-gray-500">
                Try widening your price range or adjusting your species and grade filters.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-2 text-xs font-medium text-[#3A7D6A] hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group flex flex-col text-left">
                  {/* Image Container with Badge */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F0ECE1]/40 border border-gray-100 shadow-2xs">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Grade Badge */}
                    {product.qualityGrade && (
                      <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-2xs text-[#1E3A2F] text-[10px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full shadow-2xs">
                        {product.qualityGrade}
                      </span>
                    )}

                    {/* Out of Stock overlay if disabled by admin */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-2xs flex items-center justify-center">
                        <span className="text-[11px] font-bold uppercase tracking-wider bg-gray-800 text-white px-2.5 py-1 rounded-md">
                          Batch On Hold
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="mt-3 flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-serif italic text-lg sm:text-xl text-[#1E3A2F] hover:text-[#3A7D6A] transition-colors leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 font-normal mt-0.5 line-clamp-1">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="mt-3 pt-1 flex items-center justify-between">
                      <span className="font-semibold text-sm sm:text-base text-[#1E3A2F]">
                        ${product.price.toFixed(2)}
                      </span>

                      {product.inStock ? (
                        <button
                          type="button"
                          onClick={() =>
                            addToCart({
                              productId: product.id,
                              name: product.name,
                              slug: product.slug,
                              price: product.price,
                              image: product.images[0],
                              size: product.sizes[0] || 'Standard',
                              color: product.colors[0]?.name || 'Terracotta',
                              quantity: 1,
                            })
                          }
                          className="border border-gray-200 hover:border-[#1E3A2F] bg-white hover:bg-gray-50 text-[#1E3A2F] text-xs font-medium py-1 px-3 rounded-full flex items-center gap-1 transition-all shadow-2xs"
                        >
                          <span>+ Add to Cart</span>
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Unavailable</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. Bottom Pagination & Counter */}
          <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div>
              <span>Showing all {filteredProducts.length} market-ready plants</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled
                className="text-gray-400 hover:text-gray-400 cursor-not-allowed font-normal"
              >
                ← Previous
              </button>
              <span className="w-6 h-6 rounded bg-[#1E3A2F] text-white font-semibold flex items-center justify-center text-xs">
                1
              </span>
              <button
                type="button"
                className="text-gray-600 hover:text-[#1E3A2F] transition-colors font-normal cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
