const crypto = require("crypto");
const fs = require("fs");

const decryptFile = (inputFile, outputFile, password) => {
  const key = crypto.createHash("sha256").update(password).digest();
  const data = fs.readFileSync(inputFile);
  const iv = data.slice(0, 16);
  const encrypted = data.slice(16);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  fs.writeFileSync(outputFile, decrypted);
  console.log("Decryption complete:", outputFile, decrypted.length, "bytes");
};

decryptFile("character.enc", "character.glb", "Character3D#@");
