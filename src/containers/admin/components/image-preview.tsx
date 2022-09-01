import { useStore } from '../../../store/local';
import shallow from 'zustand/shallow';
import ImageViewer from 'react-simple-image-viewer';
import { Portal } from 'react-portal';

const ImagePreview = () => {
  const { imagePreviewSrc, imagePreviewIsOpen, closeImagePreview } = useStore(
    state => ({
      imagePreviewSrc: state.imagePreviewSrc,
      imagePreviewIsOpen: state.imagePreviewIsOpen,
      closeImagePreview: state.closeImagePreview,
    }),
    shallow,
  );

  return (
    <Portal>
      {imagePreviewIsOpen && (
        <ImageViewer
          src={[imagePreviewSrc as string]}
          currentIndex={0}
          onClose={closeImagePreview}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
          closeOnClickOutside={true}
        />
      )}
    </Portal>
  );
};

export default ImagePreview;
