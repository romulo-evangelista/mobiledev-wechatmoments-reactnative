import React, {ReactElement, useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {BasicStyle, ITweet} from './../../../types';
import {Tweet} from './../../../features/Tweet/ui/Tweet';
import {useAppDispatch, useAppSelector} from './../../../hooks';
import {fetchTweets} from './../../../features/TweetList/state/tweets.thunk';

export function TweetList(): ReactElement {
  const tweets = useAppSelector(state => state.tweets.data).filter(
    tweet => tweet.sender,
  );
  const dispatch = useAppDispatch();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [nextData, setNextData] = useState<ITweet[]>([]);
  const data: ITweet[] = useMemo(() => {
    if (!nextData.length) {
      return tweets.slice(0, 5);
    }
    return [...nextData];
  }, [nextData, tweets]);

  const onEndReached = async () => {
    setIsLoading(true);

    debounceRef.current = setTimeout(() => {
      setNextData([...data, ...tweets.slice(data.length, data.length + 5)]);
      setIsLoading(false);
      debounceRef.current = null; // clean it to next call
    }, 1500);
  };

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        onEndReached={onEndReached}
        renderItem={tweet => <Tweet tweet={tweet.item} />}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListFooterComponent={() =>
          isLoading && <ActivityIndicator style={styles.loading} size="large" />
        }
      />
    </View>
  );
}

interface AdditionalStyle {
  loading: ViewStyle;
}

const styles: Partial<BasicStyle> & AdditionalStyle = StyleSheet.create<
  Partial<BasicStyle> & AdditionalStyle
>({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: 8,
    paddingRight: 8,
    paddingLeft: 8,
  },
  loading: {
    padding: 20,
  },
});
