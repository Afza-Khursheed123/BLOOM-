import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Sprout } from 'lucide-react';
import { mockProducts } from '../../data/mockStorefrontData';
import { StarRating } from '../../components/ui/StarRating';
import { Button } from '../../components/ui/Button';
import { QuantitySelector } from '../../components/ui/QuantitySelector';
import { Accordion } from '../../components/ui/Accordion';
import { useCart } from '../../context/CartContext';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  // Find product by slug or default to first (Ficus elastica)
  const product = mockProducts.find((p) => p.slug === slug) || mockProducts[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Terracotta');
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = mockProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[activeImageIndex] || product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  const accordionItems = [
    {
      id: 'light-care',
      title: 'Lighting & Sun Exposure',
      content: product.careDetails.light,
      defaultOpen: true,
    },
    {
      id: 'water-care',
      title: 'Watering & Soil Hydration',
      content: product.careDetails.water,
    },
    {
      id: 'temp-humidity',
      title: 'Temperature & Ambient Humidity',
      content: `${product.careDetails.temperature} • ${product.careDetails.humidity}`,
    },
    {
      id: 'pet-safety',
      title: 'Pet Friendliness & Toxicity',
      content: product.careDetails.toxicity,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-[#1E3A2F]">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#1E3A2F]">Shop</Link>
        <span>/</span>
        <span className="text-[#1E3A2F] font-semibold">{product.name}</span>
      </nav>

      {/* Main Dual-Column Product Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl overflow-hidden bg-white border border-gray-200/80 shadow-sm aspect-4/3 relative">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#1E3A2F] text-white">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#1E3A2F] ring-2 ring-[#1E3A2F]/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Specimen Details & Purchase Matrix */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#3A7D6A] mb-1">
              {product.botanicalName}
            </p>
            <h1 className="font-serif italic text-3xl sm:text-4xl text-[#1E3A2F] leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="font-sans font-bold text-2xl text-[#1E3A2F]">
                ${product.price.toFixed(2)}
              </span>
              <div className="h-4 w-px bg-gray-200" />
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Size Variant Selector */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#1E3A2F]">Planter &amp; Maturity Size</span>
              <span className="text-gray-500">{selectedSize}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-3 text-xs rounded-md border text-center transition-all ${
                    selectedSize === size
                      ? 'border-[#1E3A2F] bg-[#1E3A2F] text-white font-semibold'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Finish Selector */}
          {product.colors.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#1E3A2F]">Vessel Finish</span>
                <span className="text-gray-500">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all ${
                      selectedColor === color.name
                        ? 'border-[#1E3A2F] bg-[#E8EDEA] font-semibold text-[#1E3A2F]'
                        : 'border-gray-200 text-gray-600 bg-white'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                className="h-11"
              />
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="flex-1"
                icon={<Sprout className="w-4 h-4" />}
              >
                Add to Botanical Cart
              </Button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#E8EDEA]/60 rounded-xl text-center text-xs text-[#2C3E35]">
            <div className="space-y-1">
              <ShieldCheck className="w-4 h-4 text-[#3A7D6A] mx-auto" />
              <p className="font-semibold">Healthy Arrival</p>
            </div>
            <div className="space-y-1">
              <Truck className="w-4 h-4 text-[#3A7D6A] mx-auto" />
              <p className="font-semibold">Climate Box</p>
            </div>
            <div className="space-y-1">
              <RotateCcw className="w-4 h-4 text-[#3A7D6A] mx-auto" />
              <p className="font-semibold">30-Day Care</p>
            </div>
          </div>

          {/* Care Accordions */}
          <div className="pt-4">
            <h3 className="font-serif text-lg font-bold text-[#1E3A2F] mb-3">
              Botanical Care Guide
            </h3>
            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>

      {/* Related Products Grid */}
      <section className="pt-12 border-t border-gray-200/80">
        <h2 className="font-serif italic text-3xl text-[#1E3A2F] mb-8 text-center">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <Link
              key={rel.id}
              to={`/product/${rel.slug}`}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-md transition-all text-left"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={rel.images[0]}
                  alt={rel.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-[11px] text-gray-500 italic">{rel.botanicalName}</p>
                <h4 className="font-serif font-bold text-base text-[#1E3A2F] group-hover:text-[#3A7D6A] transition-colors">
                  {rel.name}
                </h4>
                <p className="text-sm font-semibold text-[#1E3A2F] mt-1">${rel.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
