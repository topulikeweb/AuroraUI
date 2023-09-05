import { RefObject, useEffect } from 'react';

type ClickOutsideHandler = (event: MouseEvent) => void;

function useClickOutside(ref: RefObject<HTMLElement>, handler: ClickOutsideHandler) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
