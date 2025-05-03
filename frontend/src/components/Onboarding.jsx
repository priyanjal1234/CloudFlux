import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cloud, ChevronRight, AlertCircle } from "lucide-react";
import Steps from "./Steps";

const providers = [
  {
    id: "aws",
    name: "AWS",
    description: "Connect your AWS account",
    logo: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    description: "Connect your Azure account",
    logo: "https://swimburger.net/media/fbqnp2ie/azure.svg",
  },
  {
    id: "gcp",
    name: "Google Cloud Platform",
    description: "Connect your GCP projects",
    logo: "https://lirp.cdn-website.com/aa0ef369/dms3rep/multi/opt/google-cloud-icon-400w.png",
  },
];

const Onboarding = () => {
  const [step, setStep] = useState("provider");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  

  function handleProviderSelect(providerId) {
    setSelectedProvider(providerId);
    setStep("connect");
  }

  function handleConnect() {
    setIsConnecting(true);
    // simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      alert(`Connected to ${selectedProvider.toUpperCase()}!`);
      // navigate to dashboard or next step
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-[#0c0e12] text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl"
      >
        {step === "provider" ? (
          <div className="bg-[#111318] rounded-xl px-8 py-12 border border-[#1f2128] shadow-2xl">
            <div className="text-center mb-12">
              <Cloud className="h-12 w-12 text-[#3b82f6] mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">
                Choose Your Cloud Provider
              </h1>
              <p className="text-gray-400">
                Select your primary cloud provider to get started with
                optimization
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <motion.button
                  key={provider.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleProviderSelect(provider.id)}
                  className="bg-[#181a20] p-6 rounded-lg border border-[#2a2d35] hover:border-[#3b82f6] transition-all duration-200 text-left"
                >
                  <img
                    src={provider.logo}
                    alt={provider.name}
                    className="h-10 mb-4 object-contain"
                  />
                  <h3 className="text-lg font-semibold mb-1">
                    {provider.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {provider.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <Steps selectedProvider = {selectedProvider} setStep = {setStep}/>
        )}
      </motion.div>
    </div>
  );
};

export default Onboarding;
