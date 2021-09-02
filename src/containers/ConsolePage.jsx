import React from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import Header from '../components/Header.jsx';
import History from '../components/History.jsx';
import ConsoleForm from '../components/ConsoleForm.jsx';

const ConsolePage = () => {
  const  handle = useFullScreenHandle();

  return (
    <FullScreen handle={handle}>
      <Header handle={handle} />
      <History />
      <ConsoleForm />
    </FullScreen>
  );
};

export default ConsolePage;
