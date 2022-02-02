declare module 'jwt-valid';
declare module 'flat';
declare module 'use-mobile-detect-hook';
declare module 'downloadjs';

interface MobileDetector {
  isMobile: () => boolean;
  isDesktop: () => boolean;
  isAndroid: () => boolean;
  isIos: () => boolean;
}
