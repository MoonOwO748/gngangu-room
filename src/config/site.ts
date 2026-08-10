export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || '강남 달토 | 강남 하이퍼블릭',
  altName: process.env.NEXT_PUBLIC_SITE_ALT_NAME || 'Gangnam Dalto Hyper Public',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gngangu-room.com',
  phone: process.env.NEXT_PUBLIC_SITE_PHONE || '010-4684-5830',
  phoneRaw: (process.env.NEXT_PUBLIC_SITE_PHONE || '010-4684-5830').replace(/[^0-9+]/g, ''),
  phoneTel: (process.env.NEXT_PUBLIC_SITE_PHONE || '010-4684-5830').startsWith('010') 
    ? '+82-10-' + (process.env.NEXT_PUBLIC_SITE_PHONE || '010-4684-5830').replace(/^010-?/, '')
    : process.env.NEXT_PUBLIC_SITE_PHONE || '+82-10-4684-5830',
  managerName: process.env.NEXT_PUBLIC_MANAGER_NAME || '강구 담당자',
  kakaoUrl: process.env.NEXT_PUBLIC_KAKAO_URL || 'https://open.kakao.com/me/gangu24',
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/gangu24',
}
