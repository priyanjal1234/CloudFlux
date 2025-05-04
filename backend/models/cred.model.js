import mongoose from "mongoose";

const credSchema = mongoose.Schema(
  {
    nameOfUser: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    accessKeyId: {
      type: String,
      required: true,
    },
    secretAccessKey: {
      type: String,
      required: true,
    },
    provider: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

const credModel = mongoose.model("cred", credSchema);

export default credModel;
