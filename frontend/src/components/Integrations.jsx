import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Integrations = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Cloud providers
  const providers = [
    {
      name: 'AWS',
      logo: 'https://download.logo.wine/logo/Amazon_Web_Services/Amazon_Web_Services-Logo.wine.png',
      height: 60,
      alt: 'Amazon Web Services'
    },
    {
      name: 'Azure',
      logo: 'https://swimburger.net/media/fbqnp2ie/azure.svg',
      height: 60,
      alt: 'Microsoft Azure'
    },
    {
      name: 'GCP',
      logo: 'https://lirp.cdn-website.com/aa0ef369/dms3rep/multi/opt/google-cloud-icon-400w.png',
      height: 55,
      alt: 'Google Cloud Platform'
    },
    
    {
      name: 'Oracle Cloud',
      logo: 'https://avatars.githubusercontent.com/u/4430336?s=200&v=4',
      height: 50,
      alt: 'Oracle Cloud'
    }
  ];

  return (
    <section id="integrations" className="py-20 bg-[#141B2D] text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Works With <span className="text-primary-500">All Major Cloud Providers</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Seamlessly connect to all your cloud accounts with our secure, zero-configuration integrations.
          </p>
        </motion.div>
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          {providers.map((provider, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-200 p-6 rounded-xl hover:bg-dark-100 transition-all duration-300"
            >
              <img 
                src={provider.logo} 
                alt={provider.alt} 
                style={{ height: `${provider.height}px` }}
                className="max-w-[120px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 bg-dark-200 rounded-xl p-8 border border-dark-100 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Integration Takes Just Minutes</h3>
              <p className="text-gray-400 mb-6">
                Our read-only integration requires minimal permissions and can be set up in under 5 minutes, with no code changes or agents to install.
              </p>
              <ul className="space-y-3 text-gray-300">
                {[
                  'Secure, encrypted connections',
                  'Read-only access by default',
                  'Detailed permissions control',
                  'Automatic data syncing'
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 p-4 bg-dark-300 rounded-lg border border-dark-200">
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-400 mx-auto">Terminal</div>
              </div>
              <pre className="text-sm text-gray-300 font-mono overflow-x-auto p-3">
                <code>
                  $ cloudcost connect aws<br />
                  ✓ Creating connection<br />
                  ✓ Validating credentials<br />
                  ✓ Syncing data<br />
                  ✓ Connection successful!<br />
                  <br />
                  <span className="text-primary-400">Initial analysis complete. Found 8 optimization opportunities.</span>
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Integrations