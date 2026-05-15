const DEFAULT_TO_EMAIL = 'draandreaalveshof@gmail.com';
const DEFAULT_FROM_EMAIL = 'Dra. Andrea Alves <onboarding@resend.dev>';

function sanitize(value) {
  return String(value ?? '').trim();
}

function escapeHtml(value) {
  return sanitize(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function validateLead(body) {
  const lead = {
    name: sanitize(body?.name),
    email: sanitize(body?.email),
    phone: sanitize(body?.phone),
    professionalArea: sanitize(body?.professionalArea),
  };
  const phoneNumbers = lead.phone.replace(/\D/g, '');
  const errors = {};

  if (lead.name.length < 2) errors.name = 'Nome inválido.';
  if (!/^\S+@\S+\.\S+$/.test(lead.email)) errors.email = 'E-mail inválido.';
  if (phoneNumbers.length < 10 || phoneNumbers.length > 13) errors.phone = 'WhatsApp inválido.';
  if (lead.professionalArea.length < 3) errors.professionalArea = 'Área de atuação inválida.';

  return { lead, errors };
}

function buildLeadEmail(lead) {
  const submittedAt = new Date().toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  });

  return {
    subject: 'Nova inscrição - Aula de Toxina Botulínica',
    text: [
      'Nova inscrição para a aula de Toxina Botulínica',
      '',
      `Nome: ${lead.name}`,
      `E-mail: ${lead.email}`,
      `WhatsApp: ${lead.phone}`,
      `Área de atuação: ${lead.professionalArea}`,
      `Recebido em: ${submittedAt}`,
    ].join('\n'),
    html: `
      <h2>Nova inscrição para a aula de Toxina Botulínica</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif">
        <tr><td><strong>Nome</strong></td><td>${escapeHtml(lead.name)}</td></tr>
        <tr><td><strong>E-mail</strong></td><td>${escapeHtml(lead.email)}</td></tr>
        <tr><td><strong>WhatsApp</strong></td><td>${escapeHtml(lead.phone)}</td></tr>
        <tr><td><strong>Área de atuação</strong></td><td>${escapeHtml(lead.professionalArea)}</td></tr>
        <tr><td><strong>Recebido em</strong></td><td>${escapeHtml(submittedAt)}</td></tr>
      </table>
    `,
  };
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { lead, errors } = validateLead(request.body);
  if (Object.keys(errors).length > 0) {
    return response.status(400).json({ error: 'Invalid lead data', fields: errors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return response.status(503).json({
      error: 'Lead email provider is not configured',
      requiredEnv: ['RESEND_API_KEY'],
    });
  }

  const email = buildLeadEmail(lead);
  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.LEADS_FROM_EMAIL || DEFAULT_FROM_EMAIL,
      to: [process.env.LEADS_TO_EMAIL || DEFAULT_TO_EMAIL],
      subject: email.subject,
      html: email.html,
      text: email.text,
      reply_to: lead.email,
    }),
  });

  const payload = await resendResponse.json().catch(() => ({}));
  if (!resendResponse.ok) {
    return response.status(502).json({ error: 'Failed to send lead email', provider: payload });
  }

  return response.status(200).json({ ok: true, id: payload.id });
}
