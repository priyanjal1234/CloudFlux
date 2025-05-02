import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const pricingTiers = [
    {
      name: "Free",
      description: "Get started with basic features at no cost.",
      price: "₹0",
      billingPeriod: "/month",
      cta: "Sign Up for Free",
      features: [
        "Up to ₹10,000 monthly cloud spend",
        "Cost visualization and tracking",
        "Basic optimization recommendations",
        "Email alerts for budget overruns",
        "7-day data retention",
        "Community support",
        "1 cloud account connection",
      ],
    },
    {
      name: "Business",
      description: "Ideal for growing companies with multiple cloud accounts.",
      price: isAnnual ? "₹799" : "₹899",
      billingPeriod: isAnnual ? "/month, billed annually" : "/month",
      cta: "Start Free Trial",
      popular: true,
      features: [
        "Up to ₹200,000 monthly cloud spend",
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
    <section id="pricing" className="py-20 text-white bg-[#0f172a]">
      <div className="container-custom px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, <span className="text-[#0EA5E9]">Transparent Pricing</span>
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
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-700 transition-colors duration-300"
            >
              <span className="sr-only">Toggle billing period</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-[#0EA5E9] transition-transform duration-300 ${
                  isAnnual ? "translate-x-1" : "translate-x-7"
                }`}
              />
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

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative border border-gray-700 rounded-xl shadow-lg p-6 bg-[#0f172a] hover:shadow-2xl transition-all duration-300"
            >
              {tier.popular && (
                <div className="absolute top-4 right-[-48px] rotate-40 rounded-full bg-[#0EA5E9] text-white text-xs font-semibold px-16 py-1 shadow-lg">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-gray-400 mb-6">{tier.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-gray-400 ml-1">{tier.billingPeriod}</span>
              </div>

              <Link
                to={tier.cta === "Sign Up for Free" && "/register"}
                className={`block w-full py-2 text-center rounded-md font-semibold transition-all duration-300 mb-8 ${
                  tier.popular
                    ? "bg-[#0EA5E9] text-white hover:bg-[#0284c7]"
                    : "border border-gray-600 text-white hover:bg-gray-800"
                }`}
              >
                {tier.cta}
              </Link>

              <ul className="space-y-4 text-sm">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <Check className="h-5 w-5 text-[#0EA5E9] mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
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
            Not sure which plan is right for you?
            <a href="#" className="text-[#0EA5E9] ml-1 hover:underline">
              Talk to our experts
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
