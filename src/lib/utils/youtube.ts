export function extractYouTubeVideoId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      return u.pathname.slice(1)
    }
    if (u.searchParams.has('v')) {
      return u.searchParams.get('v')
    }
    if (u.pathname.includes('/embed/')) {
      return u.pathname.split('/embed/')[1].split('?')[0]
    }
    if (u.pathname.includes('/live/')) {
      return u.pathname.split('/live/')[1].split('?')[0]
    }
  } catch {
    return null
  }
  return null
}

export function validateYouTubeUrl(url: string): boolean {
  return extractYouTubeVideoId(url) !== null
}

export function validateMeetUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.hostname === 'meet.google.com'
  } catch {
    return false
  }
}

export function validateZoomUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.hostname.includes('zoom.us')
  } catch {
    return false
  }
}

export function validateGoogleDriveUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.hostname.includes('drive.google.com')
  } catch {
    return false
  }
}
