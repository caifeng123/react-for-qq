export function getRedirctUrl(type,avatar){
  let url=(type==='laoban')?'/laoban':'/dashen'
  return url+=avatar?'':'info'
}