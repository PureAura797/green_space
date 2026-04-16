export type LeadPayload = {
  source: string;
  phone: string;
  name?: string;
  answers?: string[];
  page?: string;
};

export async function submitLead(payload: LeadPayload) {
  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      page: payload.page ?? window.location.href,
      consent: true,
    }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message ?? 'Не удалось отправить заявку');
  }

  return result as { ok: true; ticketId: number };
}
