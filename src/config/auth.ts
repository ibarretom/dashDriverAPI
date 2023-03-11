export const auth = {
  token_secret: process.env.TOKEN_SECRET || 'secret',
  token_expires: process.env.TOKEN_EXPIRES || '30m',
}
