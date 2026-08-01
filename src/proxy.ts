import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['ko', 'en', 'zh', 'ja']
const defaultLocale = 'ko'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const preferred = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase()
  return locales.includes(preferred ?? '') ? (preferred as string) : defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect root to default locale
  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|og|images|fonts|hero.jpg).*)'],
}
