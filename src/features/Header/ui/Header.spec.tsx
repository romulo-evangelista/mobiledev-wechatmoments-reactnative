import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {render, waitFor} from '@testing-library/react-native';

import {Header} from './Header';
import {IUser} from '../../../types';
import userReducer from '../state/user.slice';
import {getRequest as mockGetRequest} from '../../../network/Network';

jest.mock('../../../network/Network', () => ({
  getRequest: jest.fn(),
}));

const renderWithRedux = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('Header', () => {
  beforeEach(() => {
    (mockGetRequest as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: {
        nick: 'john smith',
        username: 'john',
        avatar: 'avatar.url',
        'profile-image': 'profile-image.url',
      } as IUser,
    });
  });

  it('should render component', async () => {
    const component = renderWithRedux(<Header />);
    const containerElement = component.root.findByProps({
      testID: 'header-container',
    });
    await waitFor(() => expect(containerElement).toBeTruthy());
  });

  it('should render the correct name', async () => {
    const component = renderWithRedux(<Header />);
    const containerElement = component.root.findByProps({
      testID: 'header-username',
    });
    await waitFor(() => expect(containerElement).toBeTruthy());
  });
});
