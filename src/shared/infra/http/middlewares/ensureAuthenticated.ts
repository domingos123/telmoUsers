import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../../../../config/auth";
import { UtilizadorTokensRepository } from '../../../../modules/Utilizador/repositories/token/UtilizadorTokensRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const userTokenRepository = new UtilizadorTokensRepository();
  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: User_Id } = verify(token, auth.secret_refresh_token) as IPayload;

    const user = await userTokenRepository.findByUserIdAndRefreshToken(User_Id, token);


    if (!user) {
      throw new Error("utilizador doesn't exist")
    }



    next();
  } catch {
    throw new Error("Invalid Token");
  }
}
