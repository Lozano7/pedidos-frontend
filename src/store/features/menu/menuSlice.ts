import {
  IMenu,
  IMenuResponseList,
  MenuResponseData,
} from '@/app/dashboard/restaurants/administrar-menu/interfaces/menu.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AdminMenuState {
  menuTable: {
    page: number;
    limit: number;
    search: string;
  };
  menus: IMenuResponseList[];
  menuSelected: MenuResponseData | null;
  menuForType: IMenu | null;
}

const menu: AdminMenuState = {
  menus: [],
  menuTable: {
    page: 1,
    limit: 10,
    search: '',
  },
  menuSelected: null,
  menuForType: null,
};

const adminMenuSlice = createSlice({
  initialState: menu,
  name: 'adminMenu',
  reducers: {
    setMenus(state, action) {
      state.menus = action.payload;
    },
    setMenuSelected(state, action) {
      state.menuSelected = action.payload;
    },
    setMenuTable: (
      state,
      action: PayloadAction<{
        page?: number;
        limit?: number;
        search?: string;
      }>
    ) => {
      state.menuTable = {
        ...state.menuTable,
        ...action.payload,
      };
    },
    setMenuTablePage: (state, action: PayloadAction<number>) => {
      state.menuTable.page = action.payload;
    },
    setMenuTableLimit: (state, action: PayloadAction<number>) => {
      state.menuTable.limit = action.payload;
    },
    setMenuTableSearch: (state, action: PayloadAction<string>) => {
      state.menuTable.search = action.payload;
    },
    setMenuForType: (state, action: PayloadAction<IMenu>) => {
      state.menuForType = action.payload;
    },
  },
});

export const {
  setMenus,
  setMenuSelected,
  setMenuTable,
  setMenuTablePage,
  setMenuTableLimit,
  setMenuTableSearch,
  setMenuForType,
} = adminMenuSlice.actions;

export default adminMenuSlice.reducer;
