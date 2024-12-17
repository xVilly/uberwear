export default function parseCookie(cookieName: string): string {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split('; ');
    const targetCookie = cookies.find(cookie => cookie.startsWith(cookieName + '='));
    return targetCookie ? targetCookie.split('=')[1] : '';
  }