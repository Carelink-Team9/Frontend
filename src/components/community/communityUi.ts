import i18n from '../../i18n';
import type { CommunityCategory } from '../../stores/communityStore';

export const COMMUNITY_CATEGORIES: CommunityCategory[] = ['ALL', 'REVIEW', 'NOTICE', 'QUESTION', 'FREE'];

const LANGUAGE_FLAGS: Record<string, string> = {
  ko: '🇰🇷',
  en: '🇺🇸',
  zh: '🇨🇳',
  ja: '🇯🇵',
  vi: '🇻🇳',
  th: '🇹🇭',
  uz: '🇺🇿',
};

export function getCommunityFlag(language: string): string {
  return LANGUAGE_FLAGS[language] ?? '';
}

export function getCommunityCategoryLabel(category: CommunityCategory): string {
  return i18n.t(`community.categoryLabel.${category}`);
}

export function normalizeCommunityLanguage(language: string | undefined): string {
  if (!language) return 'ko';
  return ['ko', 'en', 'ja', 'zh', 'vi', 'th', 'uz'].includes(language) ? language : 'ko';
}

export function formatTimeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return i18n.t('community.timeJustNow');
  if (minutes < 60) return i18n.t('community.timeMinutesAgo', { count: minutes });

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return i18n.t('community.timeHoursAgo', { count: hours });

  return i18n.t('community.timeDaysAgo', { count: Math.floor(hours / 24) });
}
