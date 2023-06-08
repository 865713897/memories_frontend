import { useRef } from 'react';

function useThis(init: unknown) {
  const ref = useRef(init);
  return ref.current;
}

export default useThis;
