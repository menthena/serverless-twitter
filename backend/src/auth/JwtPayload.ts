/**
 * A payload of a JWT token
 */
export interface JwtPayload {
  iss: string
  sub: string
  name: string
  picture: string
  iat: number
  exp: number
}
