export function isSafeExternalUrl(url: string): boolean {
  try {
    const u = new URL(url)
    const allowedHosts = [
      'youtube.com',
      'www.youtube.com',
      'youtu.be',
      'm.youtube.com',
      'youtube-nocookie.com',
      'drive.google.com',
      'docs.google.com',
      'meet.google.com',
      'zoom.us',
      'us06web.zoom.us',
      'www.zoom.us',
    ]
    if (!allowedHosts.some((h) => u.hostname === h || u.hostname.endsWith(`.${h}`))) {
      return false
    }
    if (u.protocol !== 'https:') {
      return false
    }
    return true
  } catch {
    return false
  }
}

export function isSafeHttpUrl(url: string): boolean {
  try {
    const u = new URL(url)
    if (u.protocol !== 'https:') return false
    return true
  } catch {
    return false
  }
}
