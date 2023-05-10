import { createSlice } from '@reduxjs/toolkit';
import { User } from 'modals/User';
import {
  getUsersThunk,
  getUserThunk,
  postUserThunk,
  putUserThunk,
  deleteUserThunk,
} from './userThunk';

interface State {
  users: {
    data: User[];
    loading: boolean;
    error: boolean;
  };
  user: {
    data: User | null;
    loading: boolean;
    error: boolean;
  };
  postUser: {
    loading: boolean;
    error: boolean;
    result: boolean;
  };
  putUser: {
    loading: boolean;
    error: boolean;
    result: boolean;
  };
  deleteUser: {
    loading: boolean;
    error: boolean;
    result: boolean;
  };
}

const initialState: State = {
  users: {
    data: [],
    loading: false,
    error: false,
  },
  user: {
    data: null,
    loading: false,
    error: false,
  },
  postUser: {
    loading: false,
    error: false,
    result: false,
  },
  putUser: {
    loading: false,
    error: false,
    result: false,
  },
  deleteUser: {
    loading: false,
    error: false,
    result: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.pending, (state) => {
      state.users.loading = true;
    });
    builder.addCase(getUsersThunk.rejected, (state) => {
      state.users.loading = false;
      state.users.error = true;
    });
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      state.users.loading = false;
      state.users.data = action.payload;
    });
    builder.addCase(getUserThunk.pending, (state) => {
      state.user.loading = true;
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      state.user.loading = false;
      state.user.error = true;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.user.loading = false;
      state.user.data = action.payload;
    });
    builder.addCase(postUserThunk.pending, (state) => {
      state.postUser.loading = true;
    });
    builder.addCase(postUserThunk.rejected, (state) => {
      state.postUser.loading = false;
      state.postUser.error = true;
    });
    builder.addCase(postUserThunk.fulfilled, (state) => {
      state.postUser.loading = false;
      state.postUser.result = true;
      state.postUser.error = false;
    });
    builder.addCase(putUserThunk.pending, (state) => {
      state.putUser.loading = true;
    });
    builder.addCase(putUserThunk.rejected, (state) => {
      state.putUser.loading = false;
      state.putUser.error = true;
    });
    builder.addCase(putUserThunk.fulfilled, (state) => {
      state.putUser.loading = false;
      state.putUser.result = true;
      state.putUser.error = false;
    });
    builder.addCase(deleteUserThunk.pending, (state) => {
      state.deleteUser.loading = true;
    });
    builder.addCase(deleteUserThunk.rejected, (state) => {
      state.deleteUser.loading = false;
      state.deleteUser.error = true;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state) => {
      state.deleteUser.loading = false;
      state.deleteUser.result = true;
      state.deleteUser.error = false;
    });
  },
});

export default userSlice.reducer;
export const { resetUser } = userSlice.actions;
