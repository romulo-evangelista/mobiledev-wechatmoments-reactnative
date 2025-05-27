/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {ReactElement} from 'react';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import MainNavigation from './navigation/MainNavigation';
import {store} from './store';

export function App(): ReactElement {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </GestureHandlerRootView>
  );
}
