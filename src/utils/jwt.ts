import jwt_decode from "jwt-decode";
import { TDecodedJWTToken } from "../types/jwt";

export const getDecodedJWTToken = (token: string): TDecodedJWTToken => {
    return jwt_decode(token);
};
