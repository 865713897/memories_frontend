import { createContext } from 'react';

const WaterfallContext = createContext({
  updateSize: () => undefined,
});

export default WaterfallContext;
