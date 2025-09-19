export function base64url(str: string) {
  return btoa(str).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export function unbase64url(str: string) {
  return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
}
