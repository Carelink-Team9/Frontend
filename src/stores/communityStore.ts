import { create } from 'zustand';

export type CommunityCategory = 'ALL' | 'NOTICE' | 'QUESTION' | 'REVIEW' | 'FREE';
export type CommunityPostCategory = Exclude<CommunityCategory, 'ALL'>;

type CommunityStore = {
  listCategory: CommunityCategory;
  listSearchText: string;
  draftCategory: CommunityPostCategory | null;
  draftTitle: string;
  draftContent: string;
  detailCommentText: string;
  setListCategory: (category: CommunityCategory) => void;
  setListSearchText: (searchText: string) => void;
  setDraftCategory: (category: CommunityPostCategory | null) => void;
  setDraftTitle: (title: string) => void;
  setDraftContent: (content: string) => void;
  resetDraft: () => void;
  setDetailCommentText: (commentText: string) => void;
  resetDetailCommentText: () => void;
};

export const useCommunityStore = create<CommunityStore>((set) => ({
  listCategory: 'ALL',
  listSearchText: '',
  draftCategory: null,
  draftTitle: '',
  draftContent: '',
  detailCommentText: '',
  setListCategory: (listCategory) => set({ listCategory }),
  setListSearchText: (listSearchText) => set({ listSearchText }),
  setDraftCategory: (draftCategory) => set({ draftCategory }),
  setDraftTitle: (draftTitle) => set({ draftTitle }),
  setDraftContent: (draftContent) => set({ draftContent }),
  resetDraft: () =>
    set({
      draftCategory: null,
      draftTitle: '',
      draftContent: '',
    }),
  setDetailCommentText: (detailCommentText) => set({ detailCommentText }),
  resetDetailCommentText: () => set({ detailCommentText: '' }),
}));
