type SideNavigationRoutePath = `/admin/${'recordings' | 'tabs' | 'lyrics' | 'events' | 'images'}`;

type Route = {
  name: string;
  path: SideNavigationRoutePath;
};

type SideNavigationRoutes = {
  [key in SideNavigationRoutePath]: Route;
};

interface LocalState {
  routes: SideNavigationRoutes;
  uploadDialogIsOpen: boolean;
  openUploadDialog: () => void;
  closeUploadDialog: () => void;
  imagePreviewIsOpen: boolean;
  imagePreviewSrc: string | null;
  openImagePreview: (id: string) => void;
  closeImagePreview: () => void;
  deleteDialogIsOpen: boolean;
  openDeleteDialog: (id: number) => void;
  closeDeleteDialog: () => void;
  idToDelete: number | null;
}
