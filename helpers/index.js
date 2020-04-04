import jwtDecode from 'jwt-decode'

let cookieparser = require('cookieparser')

export function getUserFromCookie(req){
  if (process.server && process.static) return;
  if(!req.headers.cookie) return;

  if(req.headers.cookies) {
    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.access_token
    if(!accessTokenCookie) return;

    const decodeToken = jwtDecode(accessTokenCookie)
    if(!decodeToken) return

    return decodeToken
  }
}
