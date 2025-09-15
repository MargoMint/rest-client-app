'use client';

import { useState, useEffect } from 'react';

const STICKY_HEADER_OFFSET = 70;

function useStickyHeader(offset = STICKY_HEADER_OFFSET) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeSticky = window.scrollY > offset;
      setIsSticky((prev) => {
        if (prev !== shouldBeSticky) {
          return shouldBeSticky;
        }
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return isSticky;
}

export default useStickyHeader;
