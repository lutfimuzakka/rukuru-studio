import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70svh] flex-col justify-center pt-[6vh]">
      <h1 className="t-display max-w-[12ch]">This page is not a brand yet.</h1>
      <p className="t-lead mt-8 measure">The link may be old, or the page has moved.</p>
      <div className="mt-10 flex gap-6">
        <Link href="/" className="link t-h3">Go home</Link>
        <Link href="/work" className="link t-h3">See the work</Link>
      </div>
    </section>
  )
}
