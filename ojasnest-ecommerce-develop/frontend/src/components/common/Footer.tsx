import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#06080A] border-t border-white/[0.08] text-neutral-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Brand identity */}
        <div className="md:col-span-2">
          <Link to="/" className="text-lg font-extrabold text-white tracking-tight flex items-center gap-1.5">
            OJASNEST <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]"></span>
          </Link>
          <p className="mt-3 text-neutral-400 text-xs leading-relaxed max-w-sm">
            Consumer hardware lab specializing in gallium nitride power architectures and titanium grooming tools. Registered in London, UK.
          </p>
          <div className="mt-4 font-mono text-[10px] text-neutral-500">
            SYSTEM VERSION: 2026.04 // ENTERPRISE SECURE
          </div>
        </div>

        {/* Column 1 */}
        <div className="flex flex-col gap-2.5 font-mono">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-1">  HARDWARE</h4>
          <Link to="/category/grooming" className="hover:text-white transition-colors">Titanium Trimmers</Link>
          <Link to="/category/chargers" className="hover:text-white transition-colors">GaN Power Systems</Link>
          <Link to="/category/audio" className="hover:text-white transition-colors">Acoustics & Sound</Link>
          <Link to="/category/accessories" className="hover:text-white transition-colors">Braided Precision Cables</Link>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-2.5 font-mono">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-1">  SUPPORT</h4>
          <Link to="/orders/track" className="hover:text-white transition-colors">Track Shipment</Link>
          <Link to="/warranty" className="hover:text-white transition-colors">2-Year Warranty</Link>
          <Link to="/returns" className="hover:text-white transition-colors">30-Day Return </Link>
          <Link to="/support" className="hover:text-white transition-colors"> Support Desk</Link>
        </div>

        

      </div>

      <div className="border-t border-white/[0.04] py-6 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-neutral-400">
          <p>© 2026 Ojasnest Ltd. Built for endurance.</p>
          <div className="flex gap-6">
            <span>UK REGISTERED HARDWARE</span>
            <span>CE / FCC / ROHS CERTIFIED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;