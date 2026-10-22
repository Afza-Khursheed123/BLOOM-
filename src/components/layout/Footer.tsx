import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A2F25] text-[#E8EDEA] border-t border-[#152a22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Ethos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#E8EDEA] text-[#1E3A2F] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#1E3A2F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22v-9" strokeLinecap="round" />
                  <path d="M12 13c0-4.5-3.5-7-8-6 0 4.5 3.5 7 8 6Z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 15c0-4 3-6 7-5 0 4-3 6-7 5Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                BLOOM
              </span>
            </div>
            <p className="text-xs text-[#E8EDEA]/70 leading-relaxed max-w-sm">
              A little closer to nature. Nursery-grown specimens cultivated with organic soil biology, individually inspected, and delivered directly to your living space.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white" aria-label="Instagram">
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white" aria-label="Facebook">
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#pinterest" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white" aria-label="Pinterest">
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/90">
              Collection
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8EDEA]/70">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  All Indoor Plants
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=new" className="hover:text-white transition-colors">
                  New Nursery Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=low-light" className="hover:text-white transition-colors">
                  Low Light Companions
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=planters" className="hover:text-white transition-colors">
                  Porous Terracotta Pots
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/90">
              Care &amp; Guidance
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8EDEA]/70">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Nursery Story &amp; Ethics
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Consult the Plant Doctor
                </Link>
              </li>
              <li>
                <a href="#shipping" className="hover:text-white transition-colors">
                  Climate-Controlled Shipping
                </a>
              </li>
              <li>
                <a href="#guarantee" className="hover:text-white transition-colors">
                  30-Day Flourish Guarantee
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Nursery Contact */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/90">
              Nursery Headquarters
            </h4>
            <p className="text-xs text-[#E8EDEA]/70 leading-relaxed">
              128 Fern Lane, Bay 4<br />
              Portland, OR 97201<br />
              United States
            </p>
            <p className="text-xs text-[#E8EDEA]/70">
              Direct line: <span className="text-white font-medium">+1 (503) 555-0148</span>
            </p>
            <p className="text-xs text-[#E8EDEA]/70">
              Inquiries: <span className="text-white font-medium">care@bloomnursery.com</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E8EDEA]/50">
          <p>© 2026 BLOOM Botanical Nursery. Rooted in care &amp; living biology.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Use</a>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-[#5B9A82] hover:text-white transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Nursery Operations Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
