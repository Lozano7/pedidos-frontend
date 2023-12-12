import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserResponse, UserData } from './interfaces/user-response.interface';

interface UsersState {
  usersTable: {
    page: number;
    limit: number;
    search: string;
  };
  users: IUserResponse[];
  userSelected: UserData | null;
}

const user: UsersState = {
  users: [],
  usersTable: {
    page: 1,
    limit: 10,
    search: '',
  },
  userSelected: null,
};

const userSlice = createSlice({
  initialState: user,
  name: 'userAuth',
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setUserSelected(state, action) {
      state.userSelected = action.payload;
    },
    setUsersTable: (
      state,
      action: PayloadAction<{
        page?: number;
        limit?: number;
        search?: string;
      }>
    ) => {
      state.usersTable = {
        ...state.usersTable,
        ...action.payload,
      };
    },
    setUsersTablePage: (state, action: PayloadAction<number>) => {
      state.usersTable.page = action.payload;
    },
    setUsersTableLimit: (state, action: PayloadAction<number>) => {
      state.usersTable.limit = action.payload;
    },
    setUsersTableSearch: (state, action: PayloadAction<string>) => {
      state.usersTable.search = action.payload;
    },
  },
});

export const {
  setUsers,
  setUserSelected,
  setUsersTable,
  setUsersTablePage,
  setUsersTableLimit,
  setUsersTableSearch,
} = userSlice.actions;

export default userSlice.reducer;
