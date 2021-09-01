import React from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import Header from 'src/components/Header.jsx';
import History from 'src/components/History.jsx';
import Fields from 'src/components/Fields.jsx';

const ConsolePage = () => {
  const  handle = useFullScreenHandle();
  console.log(handle);
  return (
    <FullScreen handle={handle}>
      <Header handle={handle} />
      <History />
      <Fields />
    </FullScreen>
  );
};

export default ConsolePage;
