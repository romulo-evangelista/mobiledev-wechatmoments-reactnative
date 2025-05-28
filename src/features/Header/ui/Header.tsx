import React, {ReactElement, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  ImageStyle,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import {BasicStyle} from './../../../types';
import {useAppDispatch, useAppSelector} from './../../../hooks';
import {fetchUser} from '../state/user.thunk';

export function Header(): ReactElement {
  const user = useAppSelector(state => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser('user'));
  }, [dispatch]);

  return (
    <View style={styles.container} testID="header-container">
      <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri: user.profileImage,
        }}>
        <View style={styles.userWrapper}>
          <Text testID="header-username" style={styles.text}>
            {user.nick}
          </Text>
          <Image
            style={styles.image}
            source={{
              width: 64,
              height: 64,
              uri: user.avatar,
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

interface AdditionalStyles {
  backgroundImage: ImageStyle;
  userWrapper: ViewStyle;
}

const styles: Partial<BasicStyle> & AdditionalStyles = StyleSheet.create<
  Partial<BasicStyle> & AdditionalStyles
>({
  container: {
    backgroundColor: 'white',
  },
  image: {
    marginBottom: -24,
    marginRight: 24,
    backgroundColor: '#e4f0f5',
    zIndex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 20,
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#f5f5f5',
  },
  userWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
