'use server';

import { cookies } from 'next/headers';

export async function setSessionId(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set('financial_wellbeing_user_id', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365 // 1 year
  });
}
