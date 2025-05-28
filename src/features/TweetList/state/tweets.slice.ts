import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import {ITweet, RequestStatus} from '../../../types';
import {fetchTweets} from './tweets.thunk';

interface ITweetsState {
  data: Array<ITweet>;
  status: RequestStatus;
}

const initialState: ITweetsState = {
  data: [],
  status: RequestStatus.IDLE,
};
const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ITweetsState>) => {
    builder.addCase(fetchTweets.pending, nextState => {
      nextState.data = [];
      nextState.status = RequestStatus.PENDING;
    });
    builder.addCase(fetchTweets.fulfilled, (nextState, action) => {
      nextState.data = action.payload;
      nextState.status = RequestStatus.SUCCESSFUL;
    });
    builder.addCase(fetchTweets.rejected, nextState => {
      nextState.status = RequestStatus.FAILED;
    });
  },
});

export default tweetsSlice.reducer;
