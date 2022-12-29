import { useEffect } from 'react';

// body will not be executed until the timeout is passed
function useDebounce(fn: () => void, timeout: number): void {
  useEffect(() => {
    const hadler = setTimeout(fn, timeout);

    return () => clearTimeout(hadler);
  }, [fn, timeout]);
}

export default useDebounce;
