import { motion } from 'framer-motion';
import { Layers, Zap } from 'lucide-react';

export default function PhysicalDesignPage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-16 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
            <Layers className="w-10 h-10 text-cyan-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-6 text-white"
          >
            Physical Design <span className="text-cyan-400">& PnR</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-slate-400">
            RTL to GDSII execution from architecture to tapeout. Targeting any node with world-class turnaround and precision.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { tag: "01", title: "Floorplanning", desc: "Optimized macro placement and robust power grid synthesis." },
            { tag: "02", title: "Place & Route", desc: "Advanced congestion-driven placement and timing-aware routing." },
            { tag: "03", title: "CTS", desc: "Zero-skew clock tree synthesis for optimal power and performance." },
            { tag: "04", title: "Sign-off", desc: "Thermal, EM/IR, and Timing closure across extreme corners." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
              className="bg-slate-800 p-8 rounded-3xl border border-cyan-500/10 hover:border-cyan-500/50 transition-colors"
            >
              <span className="text-4xl font-black text-cyan-900 mb-4 block">{item.tag}</span>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}