import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useStore = create<LocalState>()(
  devtools(
    persist(
      set => ({
        routes: {
          '/admin/recordings': {
            name: 'Recordings',
            path: '/admin/recordings',
          },
          '/admin/tabs': {
            name: 'Tabs',
            path: '/admin/tabs',
          },
          '/admin/lyrics': {
            name: 'Lyrics',
            path: '/admin/lyrics',
          },
          '/admin/images': {
            name: 'Images',
            path: '/admin/images',
          },
          '/admin/events': {
            name: 'Events',
            path: '/admin/events',
          },
        },
        uploadDialogIsOpen: false,
        openUploadDialog: () => set(() => ({ uploadDialogIsOpen: true })),
        closeUploadDialog: () => set(() => ({ uploadDialogIsOpen: false })),
        imagePreviewIsOpen: false,
        imagePreviewSrc: null,
        openImagePreview: (id: string) => set(() => ({ imagePreviewIsOpen: true, imagePreviewSrc: id })),
        closeImagePreview: () => set(() => ({ imagePreviewIsOpen: false, imagePreviewSrc: null })),
        deleteDialogIsOpen: false,
        openDeleteDialog: (id: number) => set(() => ({ deleteDialogIsOpen: true, idToDelete: id })),
        closeDeleteDialog: () => set(() => ({ deleteDialogIsOpen: false, idToDelete: null })),
        idToDelete: null,
      }),
      {
        name: 'local-state',
      },
    ),
  ),
);
