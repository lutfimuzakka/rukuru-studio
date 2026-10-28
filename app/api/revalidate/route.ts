import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

/**
 * Called by a Sanity webhook every time a document is published, changed or
 * deleted. It marks all site content as out of date, so the very next visit
 * renders fresh content instead of waiting for the one-minute refresh.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 })
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true)
    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }
    // expire: 0 means stale pages are never served again: the next visit waits for fresh content.
    revalidateTag('content', { expire: 0 })
    return NextResponse.json({ revalidated: true, type: body?._type ?? null, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: err instanceof Error ? err.message : 'Error' }, { status: 500 })
  }
}
