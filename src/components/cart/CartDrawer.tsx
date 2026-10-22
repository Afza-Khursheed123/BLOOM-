import React from 'react';
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { QuantitySelector } from '../ui/QuantitySelector';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, cartCount } = useCart();
  const freeShippingThreshold = 75;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F9F9F6] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-gray-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#1E3A2F]" />
              <h2 className="font-serif text-xl font-semibold text-[#1E3A2F]">Your Botanical Cart</h2>
              <span className="text-xs bg-[#E8EDEA] text-[#1E3A2F] px-2 py-0.5 rounded-full font-semibold">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-[#1E3A2F] rounded-md transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#E8EDEA]/70 p-3.5 border-b border-gray-200">
            <div className="flex justify-between items-center text-xs font-medium text-[#2C3E35] mb-1.5">
              <span>
                {remainingForFreeShipping > 0
                  ? `Add $${remainingForFreeShipping.toFixed(2)} more for Free Shipping`
                  : '🌿 Congratulations! Free Shipping Unlocked'}
              </span>
              <span>{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#3A7D6A] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#E8EDEA] text-[#3A7D6A] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-xl text-[#1E3A2F] mb-1">Your cart is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6">
                  Explore our nursery-grown specimens to find your natural companion.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Link to="/shop">Explore Collection</Link>
                </Button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3.5 rounded-lg border border-gray-200/80 shadow-xs flex gap-3.5 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-md object-cover bg-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-semibold text-[#1E3A2F] text-base truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 mb-2 truncate">
                      {item.size} • {item.color}
                    </p>
                    <div className="flex items-center justify-between">
                      <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={(qty) => updateQuantity(item.id, qty)}
                      />
                      <span className="font-semibold text-sm text-[#1E3A2F]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-gray-400 hover:text-[#EF4444] transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-gray-200 bg-white space-y-3.5">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1E3A2F]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Nursery Shipping</span>
                  <span>{remainingForFreeShipping === 0 ? 'FREE' : '$9.50'}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-semibold text-[#1E3A2F] pt-2 border-t border-gray-100">
                  <span>Estimated Total</span>
                  <span>
                    ${(subtotal + (remainingForFreeShipping === 0 ? 0 : 9.5)).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full justify-between"
                onClick={() => alert('Proceeding to checkout with secure botanical packaging.')}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <p className="text-[11px] text-center text-gray-400">
                🌱 Delivered in 100% biodegradable climate-safe packaging.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
