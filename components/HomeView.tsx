
import React from 'react';
import Hero from './Hero';
import Lore from './Lore';
import Lineages from './Lineages';
import Systems from './Systems';
import Confidential from './Confidential';
import VipSection from './VipSection';

interface HomeViewProps {
  isEditMode?: boolean;
}

const HomeView: React.FC<HomeViewProps> = ({ isEditMode = false }) => {
  return (
    <>
      <Hero isEditMode={isEditMode} />
      <Lore isEditMode={isEditMode} />
      <Lineages />
      <Confidential isEditMode={isEditMode} />
      <Systems isEditMode={isEditMode} />
      <VipSection />
    </>
  );
};

export default HomeView;
