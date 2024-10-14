export default interface JwtPayload {
  user: string; // or string | null if you want to allow null
  iat: number; // issued at
  exp: number; // expiration
}
