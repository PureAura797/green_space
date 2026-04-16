import nodemailer from 'nodemailer';
import { company } from '@/lib/site-data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type LeadRequest = {
  source?: string;
  name?: string;
  phone?: string;
  answers?: string[];
  page?: string;
  consent?: boolean;
};

const stripTags = (value: unknown) =>
  String(value ?? '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, 500);

const formatLine = (label: string, value: string | undefined) =>
  value ? `${label}: ${value}` : null;

export async function POST(request: Request) {
  let body: LeadRequest;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: 'Некорректный формат заявки' }, { status: 400 });
  }

  const source = stripTags(body.source || 'Форма сайта');
  const name = stripTags(body.name);
  const phone = stripTags(body.phone);
  const page = stripTags(body.page);
  const answers = Array.isArray(body.answers) ? body.answers.map(stripTags).filter(Boolean) : [];

  if (!body.consent) {
    return Response.json({ ok: false, message: 'Нужно согласие на обработку персональных данных' }, { status: 400 });
  }

  if (phone.length < 18) {
    return Response.json({ ok: false, message: 'Укажите корректный телефон' }, { status: 400 });
  }

  const smtpUser = process.env.SMTP_USER || company.email;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.mail.ru';
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : smtpPort === 465;
  const leadsTo = process.env.LEADS_TO || company.email;
  const mailFrom = process.env.MAIL_FROM || smtpUser;

  if (!smtpPass) {
    return Response.json(
      {
        ok: false,
        message: 'Отправка заявок пока не настроена: добавьте SMTP_PASS в переменные окружения',
      },
      { status: 503 },
    );
  }

  const ticketId = Math.floor(100000 + Math.random() * 900000);
  const submittedAt = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

  const lines = [
    `Новая заявка #${ticketId}`,
    formatLine('Источник', source),
    formatLine('Имя', name),
    formatLine('Телефон', phone),
    answers.length ? `Ответы квиза:\n${answers.map((answer, index) => `${index + 1}. ${answer}`).join('\n')}` : null,
    formatLine('Страница', page),
    formatLine('Время', submittedAt),
  ].filter(Boolean);

  const text = lines.join('\n\n');
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1D1D1F;">
      <h2 style="margin: 0 0 16px;">Новая заявка #${ticketId}</h2>
      <p><strong>Источник:</strong> ${source}</p>
      ${name ? `<p><strong>Имя:</strong> ${name}</p>` : ''}
      <p><strong>Телефон:</strong> ${phone}</p>
      ${
        answers.length
          ? `<p><strong>Ответы квиза:</strong></p><ol>${answers.map((answer) => `<li>${answer}</li>`).join('')}</ol>`
          : ''
      }
      ${page ? `<p><strong>Страница:</strong> ${page}</p>` : ''}
      <p><strong>Время:</strong> ${submittedAt}</p>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    requireTLS: !smtpSecure,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
    tls: {
      servername: smtpHost,
    },
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${company.brandName}" <${mailFrom}>`,
      to: leadsTo,
      replyTo: mailFrom,
      subject: `Заявка #${ticketId}: ${source}`,
      text,
      html,
    });
  } catch (error) {
    console.error('Lead email send failed', error);
    return Response.json(
      { ok: false, message: 'Не удалось отправить заявку. Попробуйте позвонить нам напрямую.' },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, ticketId });
}
