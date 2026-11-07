
// Cloudflare Pages Function: POST /api/enquiry -> emails the enquiry via Resend.
// Secrets (Cloudflare dashboard > Settings > Variables and Secrets):
//   RESEND_API_KEY, ENQUIRY_TO, and optionally FROM_EMAIL (default onboarding@resend.dev)
const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const oneLine = (v, max) => String(v || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json(403, { ok: false });

  let data;
  try { data = await request.json(); } catch { return json(400, { ok: false, error: 'Bad request' }); }

  const company = oneLine(data.company, 120);
  const email = oneLine(data.email, 200);
  const requirements = String(data.requirements || '').trim().slice(0, 4000);
  if (!company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { ok: false, error: 'Invalid company or email' });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Nirmayana Enquiries <${env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: [env.ENQUIRY_TO],
      reply_to: email,
      subject: `New enterprise enquiry: ${company}`,
      text: `Company: ${company}\nEmail: ${email}\n\nRequirements:\n${requirements || '(none given)'}`,
    }),
  });
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return json(502, { ok: false, error: 'Could not send' });
  }
  return json(200, { ok: true });
}

export const onRequest = () => json(405, { ok: false });
