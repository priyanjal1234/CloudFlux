import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";
import { encrypt } from "../utils/encryptKeys.js";
import credModel from "../models/cred.model.js";

const connectToAWS = async function (req, res) {
  try {
    let { nameOfUser, email, accessKeyId, secretAccessKey, region } = req.body;

    if (!accessKeyId || !secretAccessKey || !region) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    let stsClient = new STSClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const command = new GetCallerIdentityCommand({});
    const response = await stsClient.send(command);

    if (response) {
      const encAccessKeyId = encrypt(accessKeyId);
      const enSecretAccessKey = encrypt(secretAccessKey);
      await credModel.create({
        nameOfUser,
        email,
        accessKeyId: encAccessKeyId,
        secretAccessKey: enSecretAccessKey     
      })
      return res
        .status(200)
        .json({ success: true, message: "Credentials are valid" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Credentials are invalid" });
    }
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error occurred while connecting to aws",
    });
  }
};

export { connectToAWS };
