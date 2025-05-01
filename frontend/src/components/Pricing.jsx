import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, HelpCircle } from "lucide-react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const pricingTiers = [
    {
      name: "Startup",
      description: "Perfect for startups and small businesses.",
      price: isAnnual ? "$299" : "$349",
      billingPeriod: isAnnual ? "/month, billed annually" : "/month",
      cta: "Start Free Trial",
      features: [
        "Up to $50,000 monthly cloud spend",
        "Cost visualization and tracking",
        "Basic optimization recommendations",
        "Email alerts for budget overruns",
        "30-day data retention",
        "Email support",
        "1 cloud account connection",
        "Weekly reports",
      ],
    },
    {
      name: "Business",
      description: "Ideal for growing companies with multiple cloud accounts.",
      price: isAnnual ? "$799" : "$899",
      billingPeriod: isAnnual ? "/month, billed annually" : "/month",
      cta: "Start Free Trial",
      popular: true,
      features: [
        "Up to $200,000 monthly cloud spend",
        "Advanced cost allocation and tagging",
        "AI-powered optimization engine",
        "Automated resource scheduling",
        "90-day data retention",
        "Priority email and chat support",
        "Up to 5 cloud account connections",
        "Custom dashboards and reports",
      ],
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex cloud infrastructure.",
      price: "Custom",
      billingPeriod: "Contact us for pricing",
      cta: "Contact Sales",
      features: [
        "Unlimited cloud spend",
        "Advanced governance and policy enforcement",
        "Dedicated optimization specialists",
        "Custom integrations and API access",
        "Unlimited data retention",
        "24/7 phone, email, and chat support",
        "Unlimited cloud account connections",
        "Custom contract and SLA",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-dark-300 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple,{" "}
            <span className="text-[#0EA5E9]">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Plans that scale with your cloud spending. Typically, customers save
            3-5x their investment in CloudCost.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <span
              className={`text-sm ${isAnnual ? "text-white" : "text-gray-400"}`}
            >
              Annual (Save 15%)
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-dark-100"
            >
              <span className="sr-only">Toggle billing period</span>
              <span
                className={`inline-block h-4 w-4 rounded-full bg-primary-500 transition-transform ${
                  isAnnual ? "translate-x-1" : "translate-x-7"
                }`}
              ></span>
            </button>
            <span
              className={`text-sm ${
                !isAnnual ? "text-white" : "text-gray-400"
              }`}
            >
              Monthly
            </span>
          </div>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`card relative overflow-hidden ${
                tier.popular
                  ? "border-primary-500 shadow-lg shadow-primary-500/10"
                  : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -right-12 top-6 bg-primary-500 text-white text-xs px-12 py-1 rotate-45">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-gray-400 mb-6">{tier.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-gray-400 ml-1">{tier.billingPeriod}</span>
              </div>

              <a
                href="#"
                className={`btn mb-8 w-full ${
                  tier.popular ? "btn-primary" : "btn-outline"
                }`}
              >
                {tier.cta}
              </a>

              <ul className="space-y-4">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex">
                    <Check className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 flex items-center justify-center">
            <HelpCircle className="h-4 w-4 mr-2" />
            Not sure which plan is right for you?{" "}
            <a href="#" className="text-primary-500 ml-1 hover:underline">
              Talk to our experts
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
