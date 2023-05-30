import jwt from "jsonwebtoken";

class TokenService {
  generateToken(payload: object) {
    try {
      const token = jwt.sign(payload, process.env.SECRET as string, {
        expiresIn: "7d",
      });
      return token;
    } catch (error) {
      console.log(error);
    }
  }
  validateToken(token: string) {
    try {
      const data = jwt.verify(token, process.env.SECRET as string);
      return data;
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
