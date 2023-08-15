import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
}

interface AuthState {
  token: string | null;
  // user: User | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  // user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.token = token;
      // state.user = user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      // state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
