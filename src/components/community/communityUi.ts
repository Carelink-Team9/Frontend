import type { CommunityCategory } from '../../stores/communityStore';

export const COMMUNITY_CATEGORY_LABELS: Record<CommunityCategory, string> = {
  ALL: '전체',
  REVIEW: '후기',
  NOTICE: '병원 정보',
  QUESTION: '질문',
  FREE: '정보 공유',
};

export const COMMUNITY_CATEGORIES: CommunityCategory[] = ['ALL', 'REVIEW', 'NOTICE', 'QUESTION', 'FREE'];

const LANGUAGE_FLAGS: Record<string, string> = {
  ko: '🇰🇷',
  en: '🇺🇸',
  zh: '🇨🇳',
  ja: '🇯🇵',
  vi: '🇻🇳',
  th: '🇹🇭',
  id: '🇮🇩',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  ru: '🇷🇺',
  pt: '🇵🇹',
};

export function getCommunityFlag(language: string): string {
  return LANGUAGE_FLAGS[language] ?? '';
}

export function getCommunityCategoryLabel(category: string): string {
  return COMMUNITY_CATEGORY_LABELS[category as CommunityCategory] ?? category;
}

export function normalizeCommunityLanguage(language: string | undefined): string {
  if (!language || language === 'ja') return 'ko';
  return language;
}

export function formatTimeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;

  return `${Math.floor(hours / 24)}일 전`;
}
