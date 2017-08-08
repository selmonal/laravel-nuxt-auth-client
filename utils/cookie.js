export const extractFromReq = (req) => {
  let cookieData = {}

  req.headers.cookie
    .split(';')
    .map(item => item.trim())
    .map(item => {
      let parts = item.split('=')
      cookieData[parts[0]] = parts[1]
    })

  return cookieData
}
