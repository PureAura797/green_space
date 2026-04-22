import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MAINTENANCE_MODE = true; // ← поменяй на false когда клиент оплатит

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_MODE) return NextResponse.next();

  // Пропускаем API и статику
  const path = request.nextUrl.pathname;
  if (path.startsWith('/api') || path.startsWith('/_next') || path.includes('.')) {
    return NextResponse.next();
  }

  return new NextResponse(
    `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Сайт на обслуживании</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1D1D1F;
      font-family: -apple-system, system-ui, sans-serif;
      color: white;
      text-align: center;
      padding: 40px;
    }
    .container { max-width: 420px; }
    .logo { width: 80px; height: auto; margin: 0 auto 32px; opacity: 0.6; filter: invert(1); }
    h1 { font-size: 24px; font-weight: 800; margin-bottom: 12px; letter-spacing: -0.02em; }
    p { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <img src="/icons/logo.svg" alt="ЗК" class="logo"/>
    <h1>Сайт на обслуживании</h1>
    <p>Мы скоро вернёмся. По всем вопросам пишите в Telegram.</p>
  </div>
</body>
</html>`,
    {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Retry-After': '86400' },
    }
  );
}

export const config = {
  matcher: ['/((?!_next|api|icons|images|favicon).*)'],
};
