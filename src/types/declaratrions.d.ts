declare module 'jwt-valid';
declare module 'flat';
declare module 'react-pdf';
declare module 'file-saver';
declare module '@react-pdf-viewer/default-layout';
declare module 'use-mobile-detect-hook';

interface MobileDetector {
  isMobile: () => boolean;
  isDesktop: () => boolean;
  isAndroid: () => boolean;
  isIos: () => boolean;
}
