'use client';

import { useState, useEffect, RefObject } from 'react';

/**
 * Custom hook untuk mendapatkan aspect ratio dari sebuah gambar.
 *
 * @param imageRef Ref ke elemen <img>
 * @returns Aspect ratio (width / height) atau null jika gambar belum dimuat
 */
function useImageAspectRatio(imageRef: RefObject<HTMLImageElement>): number | null {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    const handleLoad = () => {
      if (img.naturalHeight === 0) {
        setAspectRatio(null); // Hindari pembagian dengan nol
      } else {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      }
    };

    if (img.complete) {
      // Jika gambar sudah selesai dimuat sebelum hook dijalankan
      handleLoad();
    } else {
      // Tambahkan event listener untuk load
      img.addEventListener('load', handleLoad);
    }

    // Cleanup event listener saat komponen unmount atau ref berubah
    return () => {
      img.removeEventListener('load', handleLoad);
    };
  }, [imageRef]);

  return aspectRatio;
}

export default useImageAspectRatio;
