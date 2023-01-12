import jwt from "jsonwebtoken";
//
const generateAccessToken = (id: any, type: any) => {
  return jwt.sign({ id, type }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
};

export default generateAccessToken;
