import credModel from "../models/cred.model.js";

const checkConnection = async function (req, res) {
  try {
    let { name, provider } = req.body;

    if (!name || !provider) {
      return res
        .status(400)
        .json({ message: "Name and Provider are required" });
    }

    let credential = await credModel.findOne({ nameOfUser: name, provider });
    if (credential) {
      return res.status(200).json({
        message:
          "Credentials with the provided name and provider already exist",
      });
    } else {
      return res.status(200).json({
        message:
          "Credentials with the provided name and provider are not found",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        message:
          error instanceof Error
            ? error.message
            : "Error finding the credential",
      });
  }
};

export { checkConnection };
