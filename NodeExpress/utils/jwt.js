import crypto from "crypto";

const SECRET_KEY = "your_secret_key"; // Replace with a secure secret key

export function generateJWT(payload, expiresIn = "1h") {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payloadData = { ...payload, exp: Math.floor(Date.now() / 1000) + parseExpiration(expiresIn) };
  const payloadBase64 = Buffer.from(JSON.stringify(payloadData)).toString("base64url");
  
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(`${header}.${payloadBase64}`)
    .digest("base64url");

  return `${header}.${payloadBase64}.${signature}`;
}

export function verifyJWT(token) {
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return null;

  const expectedSignature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(`${header}.${payload}`)
    .digest("base64url");

  if (expectedSignature !== signature) return null;

  const decodedPayload = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
  if (decodedPayload.exp < Math.floor(Date.now() / 1000)) return null;

  return decodedPayload;
}

function parseExpiration(exp) {
  const unit = exp.slice(-1);
  const value = parseInt(exp, 10);
  switch (unit) {
    case "s": return value;
    case "m": return value * 60;
    case "h": return value * 3600;
    case "d": return value * 86400;
    default: return 3600; // Default to 1 hour
  }
}
