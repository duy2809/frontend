import { createSlice } from '@reduxjs/toolkit';
import { User } from 'modals/User';
import { removeAccessToken } from 'utils/auth';
import {
  getUserThunk,
  loginThunk,
  postMailThunk,
  postResetPasswordThunk,
  signupThunk,
} from './authThunks';

interface State {
  login: {
    loading: boolean;
    error: boolean;
  };
  user: {
    data: User | null;
    loading: boolean;
    error: boolean;
  };
  sendMail: {
    loading: boolean;
    error: boolean;
    result: boolean;
  };
  resetPassword: {
    loading: boolean;
    error: boolean;
  };
  signup: {
    loading: boolean;
    error: boolean;
    result: boolean;
  };
}

const initialState: State = {
  login: {
    loading: false,
    error: false,
  },
  user: {
    data: null,
    loading: false,
    error: false,
  },
  sendMail: {
    loading: false,
    error: false,
    result: false,
  },
  resetPassword: {
    loading: false,
    error: false,
  },
  signup: {
    loading: false,
    error: false,
    result: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      removeAccessToken();
      window.location.href = '/auth/login';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.login.loading = true;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.login.loading = false;
      state.login.error = true;
    });
    builder.addCase(getUserThunk.pending, (state) => {
      state.user.loading = true;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.user.data = action.payload;
      state.user.loading = false;
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      state.user.loading = false;
      state.user.error = true;
    });
    builder.addCase(postMailThunk.rejected, (state) => {
      state.sendMail.loading = false;
      state.sendMail.error = true;
    });
    builder.addCase(postMailThunk.pending, (state) => {
      state.sendMail.loading = true;
    });
    builder.addCase(postMailThunk.fulfilled, (state) => {
      state.sendMail.loading = false;
      state.sendMail.result = true;
      state.sendMail.error = false;
    });
    builder.addCase(postResetPasswordThunk.pending, (state) => {
      state.resetPassword.loading = true;
    });
    builder.addCase(postResetPasswordThunk.rejected, (state) => {
      state.resetPassword.loading = false;
      state.resetPassword.error = true;
    });
    builder.addCase(postResetPasswordThunk.fulfilled, (state) => {
      state.resetPassword.loading = false;
    });
    builder.addCase(signupThunk.pending, (state) => {
      state.signup.loading = true;
    });
    builder.addCase(signupThunk.rejected, (state) => {
      state.signup.loading = false;
      state.signup.error = true;
    });
    builder.addCase(signupThunk.fulfilled, (state) => {
      state.signup.loading = false;
      state.signup.result = true;
      state.signup.error = false;
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
