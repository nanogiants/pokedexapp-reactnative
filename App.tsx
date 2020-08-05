import React from 'react';
import { Navigation } from "react-native-navigation";

import PokemonList from './src/components/PokemonList';
import PokemonDetail from './src/components/PokemonDetail';
import FavIconButton from './src/components/FavIconButton';

interface IScreens {
  [key: string]: any;
}

const registerScreens = () => {
  const screens: IScreens = {
    'pokemonlist': PokemonList,
    'pokemondetail': PokemonDetail,
    'faviconbutton': FavIconButton
  };

  Object.keys(screens).forEach((key: string) => {
    Navigation.registerComponent(key, () => screens[key]);
  });
}

Navigation.events().registerAppLaunchedListener(async () => {
  console.log("helloe");

  registerScreens();

  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'pokemonlist',
          },
        }],
        options: {
        }
      },
    },
  });

  Navigation.setDefaultOptions({
    bottomTabs: {
      visible: false,
    },
    statusBar: {
      style: 'dark',
      backgroundColor: 'white',
    },
  });
});