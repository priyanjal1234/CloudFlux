// cryptoUtils.js
import crypto from "crypto";
import dotenv from 'dotenv'
dotenv.config()

const ALGORITHM = "aes-256-cbc";
const ENCRYPTION_KEY = crypto
  .createHash("sha256")
  .update(String(process.env.MASTER_PASSWORD)) // Replace with secure env
  .digest("base64")
  .substr(0, 32); // 256 bits key

const IV_LENGTH = 16; // AES block size

export function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text) {
  const [ivHex, encryptedText] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedText, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encrypted);

  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
