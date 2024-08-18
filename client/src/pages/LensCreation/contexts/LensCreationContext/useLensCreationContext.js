import { useContext } from 'react';
import LensCreationContext from './LensCreationContext';

const useLensCreationContext = () => {
  const context = useContext(LensCreationContext);
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};

export default useLensCreationContext;