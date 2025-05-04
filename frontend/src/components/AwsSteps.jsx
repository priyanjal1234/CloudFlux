import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import keysSchema from "../schemas/keysSchema";
import cloudService from "../services/Cloud";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AwsSteps = ({ setStep, selectedProvider }) => {
  const [isCopied, setisCopied] = useState(false);
  const [isConnecting, setisConnecting] = useState(false);
  const [errors, seterrors] = useState({});
  const [keys, setkeys] = useState({
    accessKeyId: "",
    secretAccessKey: "",
    region: "",
  });

  let navigate = useNavigate();

  let {user} = useSelector(state => state.user)
  

  const awsPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ce:*",
        "cur:*",
        "organizations:Describe*",
        "s3:Get*",
        "cloudwatch:GetMetricData"
      ],
      "Resource": "*"
    }
  ]
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(awsPolicy);
    setisCopied(true);
    setTimeout(() => {
      setisCopied(false);
    }, 2000);
  };

  const steps = [
    {
      id: 1,
      stepName: "Create IAM User",
      how: [
        "Navigate to IAM in AWS Console",
        "Click 'Users' → 'Create user'",
        "Set a name and click on next",
        "In the 'Set Permissions' section click on next for now",
        "Lastly, click on 'Create User'",
      ],
    },
    {
      id: 2,
      stepName: "Create IAM Policy",
      how: [
        "On the IAM dashboard, click on 'Policies' from the sidebar",
        "Choose JSON as the format",
        "Paste the following policy:",
      ],
      showPolicy: true,
    },
    {
      id: 3,
      stepName: "Attach the Policy",
      how: [
        "After the creation of policy, again click on the IAM user you have just created",
        "From there, click on 'Add Permissions'",
        "In the Add Permissions section attach the created policy directly by searching it",
      ],
    },
    {
      id: 4,
      stepName: "Get and attach access keys",
      how: [
        "After creating the IAM user and policy, create access key id and secret access key for the user",
        "Copy them",
      ],
    },
  ];

  function handleKeysChange(e) {
    let { name, value } = e.target;
    setkeys((prev) => ({ ...prev, [name]: value }));

    try {
      keysSchema.pick({ [name]: true }).parse({ [name]: value });
      seterrors({});
    } catch (error) {
      if (error.errors) {
        const fieldErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        seterrors(fieldErrors);
      }
    }
  }



  async function handleKeysSubmit(e) {
    e.preventDefault();
    setisConnecting(true);

    const result = keysSchema.safeParse(keys);
    if (!result.success) {
      setisConnecting(false);
      const fieldErrors = result.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      seterrors(fieldErrors);
      return;
    }

    seterrors({});

    let credData = {
      nameOfUser: user?.name,
      email: user?.email,
      accessKeyId: keys.accessKeyId,
      secretAccessKey: keys.secretAccessKey,
      region: keys.region
    }
    
    try {
      await cloudService.connectAWS(credData);
      setisConnecting(false);
      toast.success("Successfully Connected to AWS");
      navigate("/dashboard");
      setkeys((prev) => ({
        ...prev,
        accessKeyId: "",
        secretAccessKey: "",
        region: "",
      }));
    } catch (error) {
      setisConnecting(false);
      toast.error(
        error instanceof Error ? error.message : "Error connecting with AWS"
      );
    }
  }

  return (
    <div className="w-[80%] bg-[#111318] p-6">
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold mb-5 text-center">
          Follow These Steps To Connect CloudFlux to AWS
        </h1>
        {steps.map((step) => (
          <div key={step.id} className="transition-all duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {step.id}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">{step.stepName}</h4>
              </div>
            </div>
            <div className="ml-12">
              <ol className="list-decimal text-sm text-gray-400 space-y-2">
                {step.how.map((howStep, index) => (
                  <li key={index}>{howStep}</li>
                ))}
              </ol>
              {step.showPolicy && (
                <div className="mt-4 bg-[#1f1f1f] p-4 rounded-md relative">
                  <pre className="text-xs text-gray-300 overflow-x-auto">
                    <code>{awsPolicy}</code>
                  </pre>
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {isCopied ? "Copied" : "Copy"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="ml-12 space-y-4">
          <form onSubmit={handleKeysSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Access Key ID
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 bg-[#12192A] outline-none rounded-md text-white "
                placeholder="Enter your access key ID"
                value={keys.accessKeyId}
                onChange={handleKeysChange}
                name="accessKeyId"
              />
              {errors.accessKeyId && (
                <p className="text-red-500">{errors.accessKeyId}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Secret Access Key
              </label>
              <input
                type="password"
                className="block w-full px-3 py-2 bg-[#12192A]  rounded-md text-white outline-none"
                placeholder="Enter your secret access key"
                value={keys.secretAccessKey}
                onChange={handleKeysChange}
                name="secretAccessKey"
              />
              {errors.secretAccessKey && (
                <p className="text-red-500">{errors.secretAccessKey}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Region
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 bg-[#12192A]  rounded-md text-white outline-none"
                placeholder="Enter region ( If AWS shows Global then use the name of any region like us-east-1 )"
                value={keys.region}
                onChange={handleKeysChange}
                name="region"
              />
              {errors.region && <p className="text-red-500">{errors.region}</p>}
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => setStep("provider")}
                className="px-5 py-2 border border-gray-700 rounded-lg "
              >
                Back
              </button>
              <button
                type="submit"
                disabled={
                  isConnecting ||
                  !keys.accessKeyId ||
                  !keys.secretAccessKey ||
                  !keys.region
                }
                className={`w-[90%] ${
                  !keys.accessKeyId || !keys.secretAccessKey || !keys.region
                    ? "bg-[#11608B] cursor-not-allowed"
                    : "bg-blue-600"
                }  flex justify-center rounded-lg`}
              >
                {isConnecting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connecting...
                  </span>
                ) : (
                  <span className="   flex  items-center">
                    Connect {selectedProvider.toUpperCase()}{" "}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AwsSteps;
