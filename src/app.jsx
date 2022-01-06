import React, { useState, useEffect } from 'react';

import { Page } from './components/page';
import { Wish } from './components/wish';

import { generate } from './domain/generator';

import addressee from './constants/addressee';
import dataset from './dataset.json';

const text = dataset.join(' ');

export const App = () => {
  const [wish, setWish] = useState();

  const getWish = () => {
    setWish(generate({ text, wordCount: 200 }));
  }

  useEffect(() => {
    getWish();
  }, [])

  return (
    <Page>
      <Wish
        addressee={addressee}
        onRefresh={getWish}
      >
        {wish}
      </Wish>
    </Page>
  );
};
