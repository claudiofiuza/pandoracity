
import React from 'react';
import Hero from './Hero';
import Lore from './Lore';
import Lineages from './Lineages';
import Systems from './Systems';
import Confidential from './Confidential';
import VipSection from './VipSection';

const HomeView: React.FC = () => {
  return (
    <>
      <Hero />
      <Lore />
      <Lineages />
      <Confidential />
      <Systems />
      <VipSection />
    </>
  );
};

export default HomeView;
