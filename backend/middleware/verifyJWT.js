import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/secretKeys.js";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res
      .status(401)
      .json({ error: "Unauthorized access. Please sign in first." });
  const token = authHeader.split(" ")[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "token has expired." });

    req.email = decoded.email;

    next();
  });
};
export default verifyJWT;
