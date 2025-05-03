import { z } from "zod";

const keysSchema = z.object({
  accessKeyId: z
    .string()
    .min(20, "Access Key ID must be 20 characters long")
    .max(20, "Access Key ID must be 20 characters long")
    .regex(
      /^AKIA[0-9A-Z]{16}$/,
      "Access Key ID must start with 'AKIA' followed by 16 alphanumeric characters"
    )
    .trim(),
  secretAccessKey: z
    .string()
    .min(40, "Secret Access Key must be 40 characters long")
    .max(40, "Secret Access Key must be 40 characters long")
    .regex(
      /^[A-Za-z0-9\/+=]{40}$/,
      "Secret Access Key must be 40 characters long and base64 encoded"
    )
    .trim(),

  region: z.string().min(3, "Region should be atleast 3 characters long"),
});

export default keysSchema;
