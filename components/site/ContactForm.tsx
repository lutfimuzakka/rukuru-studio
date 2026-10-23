'use client'

import { useActionState } from 'react'
import { sendBrief, type BriefState } from '@/app/(site)/contact/actions'

const services = ['Strategy', 'Identity', 'Content', 'Campaign', 'Not sure yet']
const budgets = ['Under Rp 25 jt', 'Rp 25–75 jt', 'Rp 75–150 jt', 'Above Rp 150 jt', 'Not sure yet']

const field = 'mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none transition-colors focus:border-ultramarine'

export function ContactForm() {
  const [state, action, pending] = useActionState<BriefState, FormData>(sendBrief, { status: 'idle' })

  if (state.status === 'sent') {
    return (
      <div role="status" className="border-t border-ink pt-8">
        <p className="t-h2">Brief sent.</p>
        <p className="t-lead mt-4 measure">We will reply within two working days to set up a first call.</p>
      </div>
    )
  }

  const v = state.fields ?? {}

  return (
    <form action={action} className="grid gap-8 sm:grid-cols-2" noValidate>
      <label className="block">
        <span>Name</span>
        <input name="name" required autoComplete="name" defaultValue={v.name} className={field} />
      </label>
      <label className="block">
        <span>Email</span>
        <input name="email" type="email" required autoComplete="email" defaultValue={v.email} className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span>Company or project name</span>
        <input name="company" autoComplete="organization" defaultValue={v.company} className={field} />
      </label>
      <label className="block">
        <span>What do you need?</span>
        <select name="service" defaultValue={v.service ?? ''} className={field}>
          <option value="" disabled>Choose one</option>
          {services.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="block">
        <span>Budget range</span>
        <select name="budget" defaultValue={v.budget ?? ''} className={field}>
          <option value="" disabled>Choose one</option>
          {budgets.map((b) => <option key={b}>{b}</option>)}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span>Tell us about the project</span>
        <textarea name="message" required rows={5} defaultValue={v.message} className={`${field} resize-y`} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {state.status === 'error' && (
        <p role="alert" className="sm:col-span-2 font-medium text-[#c2341b]">{state.message}</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-8 py-4 text-lg font-semibold text-paper transition-colors duration-200 hover:bg-ultramarine disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'Send brief'}
        </button>
      </div>
    </form>
  )
}
