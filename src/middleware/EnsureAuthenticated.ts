import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { auth } from '../config/auth'

import { AppError } from '../errors/AppError'

interface IPayload {
  sub: string
}

export async function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers

  if (!authorization) {
    throw new AppError('Token is missing', 401)
  }

  const token = authorization.split(' ')[1]

  try {
    const { sub: user_id } = verify(
      token,
      auth.token_secret
    ) as unknown as IPayload

    request.user = { id: user_id }
    next()
  } catch {
    throw new AppError('Token is not valid', 401)
  }
}
