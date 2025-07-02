import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl

  if (pathname === '/sitemap.xml') {
    const response = NextResponse.next()
    response.headers.set('Content-Type', 'application/xml')
    return response
  }

  return NextResponse.next()
}

// ✅ This is the correct way to export config in TypeScript / ESM
export const config = {
  matcher: ['/sitemap.xml'],
}
