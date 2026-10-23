'use server'

export type BriefState = { status: 'idle' | 'sent' | 'error'; message?: string; fields?: Record<string, string> }

/**
 * Sends a project brief to the studio inbox through Resend.
 * Without RESEND_API_KEY (local development) the brief is logged instead.
 */
export async function sendBrief(_prev: BriefState, form: FormData): Promise<BriefState> {
  const fields = Object.fromEntries(
    ['name', 'email', 'company', 'service', 'budget', 'message'].map((k) => [k, String(form.get(k) ?? '').trim()]),
  )

  // Honeypot: bots fill hidden fields.
  if (form.get('website')) return { status: 'sent' }

  if (!fields.name || !fields.email || !fields.message) {
    return { status: 'error', message: 'Add your name, email and a few lines about the project.', fields }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return { status: 'error', message: 'That email address looks incomplete. Check it and send again.', fields }
  }

  const text = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!key || !to) {
    console.info('[contact] New brief (RESEND_API_KEY or CONTACT_TO_EMAIL not set):\n' + text)
    return { status: 'sent' }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Rukuru Studio <website@rukurustudio.com>',
      to: [to],
      reply_to: fields.email,
      subject: `New brief from ${fields.name}${fields.company ? ` (${fields.company})` : ''}`,
      text,
    }),
  })

  if (!res.ok) {
    return { status: 'error', message: 'The brief could not be sent. Try again, or message us on WhatsApp.', fields }
  }
  return { status: 'sent' }
}
