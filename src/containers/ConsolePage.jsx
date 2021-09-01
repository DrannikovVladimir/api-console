import React from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import Header from '../components/Header.jsx';
import History from '../components/History.jsx';
import Fields from '../components/Fields.jsx';
import Footer from '../components/Footer.jsx';

const ConsolePage = () => {
  const  handle = useFullScreenHandle();

  return (
    <FullScreen handle={handle}>
      <Header handle={handle} />
      <History />
      <Fields />
      <Footer />
    </FullScreen>
  );
};

export default ConsolePage;
