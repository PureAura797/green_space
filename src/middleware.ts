import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ⚠️ MAINTENANCE MODE — удали этот файл когда сайт нужно включить обратно
const MAINTENANCE = true;

export function middleware(request: NextRequest) {
  if (!MAINTENANCE) return NextResponse.next();

  // Пропускаем запросы к статике и API
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  return new NextResponse(
    `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Зелёный Контур — Скоро</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      min-height:100dvh; display:flex; align-items:center; justify-content:center;
      background:#1D1D1F; color:#fff; font-family:system-ui,-apple-system,sans-serif;
      padding:40px 24px; text-align:center;
    }
    .c { max-width:420px; }
    .logo { width:80px; height:auto; margin:0 auto 32px; opacity:0.9; }
    h1 { font-size:28px; font-weight:800; letter-spacing:-0.03em; margin-bottom:12px; }
    p { font-size:15px; color:rgba(255,255,255,0.5); line-height:1.6; margin-bottom:32px; }
    a { color:#2D6A4F; text-decoration:none; font-weight:600; font-size:15px; }
    a:hover { text-decoration:underline; }
  </style>
</head>
<body>
  <div class="c">
    <img src="/icons/logo.svg" alt="ЗК" class="logo" style="filter:brightness(0) invert(1)"/>
    <h1>Сайт на обслуживании</h1>
    <p>Мы обновляем платформу. Скоро всё заработает.<br/>Связаться с нами:</p>
    <a href="tel:+79998959989">+7 (999) 895-99-89</a>
  </div>
</body>
</html>`,
    {
      status: 503,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Retry-After': '86400',
      },
    }
  );
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
};
