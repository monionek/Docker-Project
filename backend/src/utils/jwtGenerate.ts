import jwt from "jsonwebtoken";
import config  from "../config/config";
import { JwtPayload } from "../models/interfaces";

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.jwtSecret);
}