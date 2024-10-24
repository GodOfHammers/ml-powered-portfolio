import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export const createToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};

export const setTokenCookie = (res, token) => {
  const cookie = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 86400,
    path: '/'
  });
  res.setHeader('Set-Cookie', cookie);
};