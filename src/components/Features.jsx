import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  BarChart4,
  BrainCircuit,
  Sliders,
  BadgeDollarSign,
  AlertTriangle,
  History,
  Gauge,
  Activity
} from 'lucide-react';

const features = [
  {
    icon: <BarChart4 className="h-6 w-6" />,
    title: 'Cost Visualization',
    description: 'Intuitive dashboards that visualize your cloud spending across providers, services, and teams.',
  },
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: 'AI Recommendations',
    description: 'ML-powered suggestions to rightsize resources, adjust reservations, and eliminate waste.',
  },
  {
    icon: <Sliders className="h-6 w-6" />,
    title: 'Automated Optimization',
    description: 'Set-and-forget rules to automatically adjust resources based on usage patterns.',
  },
  {
    icon: <BadgeDollarSign className="h-6 w-6" />,
    title: 'Budget Tracking',
    description: 'Set budgets for teams and projects with proactive alerts before you exceed limits.',
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: 'Anomaly Detection',
    description: 'Instant notifications when unusual spending patterns are detected in your cloud accounts.',
  },
  {
    icon: <History className="h-6 w-6" />,
    title: 'Usage Forecasting',
    description: 'Predictive analytics to forecast future cloud spend based on historical patterns.',
  },
  {
    icon: <Gauge className="h-6 w-6" />,
    title: 'Resource Utilization',
    description: 'Identify underutilized resources and get recommendations to optimize performance.',
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: 'Real-time Monitoring',
    description: 'Continuous tracking of costs and usage across all your cloud resources.',
  }
];

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="features" className="py-20 bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4"
          >
            Powerful Features to <span className="text-blue-500">Reduce Cloud Costs</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-3xl mx-auto"
          >
            Our platform provides comprehensive tools to analyze, optimize, and automate your cloud cost management.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#161B22] p-6 rounded-lg border border-transparent hover:border-blue-500 transition-all duration-300 shadow-sm hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
