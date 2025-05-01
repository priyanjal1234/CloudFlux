import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, DollarSign, TrendingDown, Cloud } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="relative  pt-32 pb-24 md:pt-40 md:pb-32 bg-[#0D1117] text-white overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="inline-block bg-[#1E293B] text-[#0ea5e9] rounded-full px-4 py-1.5 text-sm font-medium">
            Save up to 40% on your cloud costs
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8]"
        >
          Optimize Your Cloud Spending <br /> With Intelligent Automation
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
        >
          CloudCost delivers actionable insights and automated optimization to slash your cloud infrastructure expenses. Take control of your cloud costs with our AI-powered solution.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a href="#" className="inline-flex items-center justify-center px-6 py-3 bg-[#0ea5e9] text-white rounded-md font-medium hover:bg-[#0284c7] transition">
            Start Free Trial <ChevronRight className="ml-2 h-4 w-4" />
          </a>
          <a href="#features" className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-white rounded-md font-medium hover:bg-gray-800 transition">
            See How It Works
          </a>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              icon: <DollarSign className="h-5 w-5 text-[#0ea5e9]" />,
              label: 'Average Savings',
              value: '40%',
              bg: 'bg-[#0ea5e9]/10',
            },
            {
              icon: <TrendingDown className="h-5 w-5 text-[#38bdf8]" />,
              label: 'To See Results',
              value: '1 Day',
              bg: 'bg-[#38bdf8]/10',
            },
            {
              icon: <Cloud className="h-5 w-5 text-[#34d399]" />,
              label: 'Managed Service',
              value: '100%',
              bg: 'bg-[#34d399]/10',
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center space-x-3 p-4 bg-[#161B22] rounded-lg border border-[#1f2937]"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg}`}>
                {stat.icon}
              </div>
              <div className="text-left">
                <div className="text-xl font-semibold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero
