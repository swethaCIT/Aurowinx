import { motion } from 'framer-motion';
import { Microchip, Cpu, Zap } from 'lucide-react';

export default function AnalogIPPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto w-24 h-24 bg-teal-100 rounded-4xl rotate-3 flex items-center justify-center mb-8 shadow-sm">
            <div className="-rotate-3">
              <Microchip className="w-12 h-12 text-teal-600" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8">
            Analog & <span className="text-teal-500">IP Solutions</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Custom mixed-signal block design, characterization, and IP hardening. High-performance PLLs, SerDes, ADC/DAC and custom analog IP with silicon-proven reliability across voltage domains.
          </p>
        </motion.div>

        {/* Waves Animation */}
        <div className="w-full max-w-4xl h-32 flex items-center justify-center gap-2 mb-16">
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ height: 10 }}
              animate={{ height: [10, 80 + Math.random() * 40, 10] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
              className="w-2 rounded-full bg-teal-400"
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl text-left">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
            <Zap className="w-8 h-8 text-teal-500 mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Power Management IP</h3>
            <p className="text-slate-600">LDOs, DC-DC converters, and Bandgap references designed for ultimate power efficiency and stability.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
            <Cpu className="w-8 h-8 text-teal-500 mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-3">High-Speed Interfaces</h3>
            <p className="text-slate-600">SerDes architectures, LVDS, and PCIe PHY implementations optimized for advanced nodes.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}