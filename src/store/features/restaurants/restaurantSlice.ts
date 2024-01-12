import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  IDataMenu,
  IRestaurant,
  IRestaurantsResponse,
} from './interfaces/restaurant-response.interface';

interface ReaturantsState {
  restaurantsTable: {
    page: number;
    limit: number;
    search: string;
  };
  restaurants: IRestaurantsResponse[];
  restaurantSelected: IRestaurant | null;

  soupsTable: {
    page: number;
    limit: number;
    search: string;
  };
  secondsTable: {
    page: number;
    limit: number;
    search: string;
  };
  drinksTable: {
    page: number;
    limit: number;
    search: string;
  };
  dessertsTable: {
    page: number;
    limit: number;
    search: string;
  };

  soupSelected: IDataMenu | null;
  secondSelected: IDataMenu | null;
  drinkSelected: IDataMenu | null;
  dessertSelected: IDataMenu | null;
}

//ISoupResponse | ISoup[]

const restaurant: ReaturantsState = {
  restaurants: [],
  restaurantsTable: {
    page: 1,
    limit: 10,
    search: '',
  },
  restaurantSelected: null,
  soupsTable: {
    page: 1,
    limit: 10,
    search: '',
  },
  secondsTable: {
    page: 1,
    limit: 10,
    search: '',
  },
  drinksTable: {
    page: 1,
    limit: 10,
    search: '',
  },
  dessertsTable: {
    page: 1,
    limit: 10,
    search: '',
  },
  soupSelected: null,
  secondSelected: null,
  drinkSelected: null,
  dessertSelected: null,
};

const restaurantSlice = createSlice({
  initialState: restaurant,
  name: 'restaurant',
  reducers: {
    setRestaurants(state, action) {
      state.restaurants = action.payload;
    },
    setRestaurantSelected(state, action) {
      state.restaurantSelected = action.payload;
    },
    setRestaurantsTable: (
      state,
      action: PayloadAction<{
        page?: number;
        limit?: number;
        search?: string;
      }>
    ) => {
      state.restaurantsTable = {
        ...state.restaurantsTable,
        ...action.payload,
      };
    },
    setRestaurantsTablePage: (state, action: PayloadAction<number>) => {
      state.restaurantsTable.page = action.payload;
    },
    setRestaurantsTableLimit: (state, action: PayloadAction<number>) => {
      state.restaurantsTable.limit = action.payload;
    },
    setRestaurantsTableSearch: (state, action: PayloadAction<string>) => {
      state.restaurantsTable.search = action.payload;
    },
    setSoupsTable: (
      state,
      action: PayloadAction<{
        page?: number;
        limit?: number;
        search?: string;
      }>
    ) => {
      state.soupsTable = {
        ...state.soupsTable,
        ...action.payload,
      };
    },
    setSoupsTablePage: (state, action: PayloadAction<number>) => {
      state.soupsTable.page = action.payload;
    },
    setSoupsTableLimit: (state, action: PayloadAction<number>) => {
      state.soupsTable.limit = action.payload;
    },
    setSoupsTableSearch: (state, action: PayloadAction<string>) => {
      state.soupsTable.search = action.payload;
    },
    setSecondsTable: (
      state,
      action: PayloadAction<{
        page?: number;
        limit?: number;
        search?: string;
      }>
    ) => {
      state.secondsTable = {
        ...state.secondsTable,
        ...action.payload,
      };
    },
    setSecondsTablePage: (state, action: PayloadAction<number>) => {
      state.secondsTable.page = action.payload;
    },
    setSecondsTableLimit: (state, action: PayloadAction<number>) => {
      state.secondsTable.limit = action.payload;
    },
    setSecondsTableSearch: (state, action: PayloadAction<string>) => {
      state.secondsTable.search = action.payload;
    },
    setDrinksTable: (
      state,
      action: PayloadAction<{
        page?: number;
        limit?: number;
        search?: string;
      }>
    ) => {
      state.drinksTable = {
        ...state.drinksTable,
        ...action.payload,
      };
    },
    setDrinksTablePage: (state, action: PayloadAction<number>) => {
      state.drinksTable.page = action.payload;
    },
    setDrinksTableLimit: (state, action: PayloadAction<number>) => {
      state.drinksTable.limit = action.payload;
    },
    setDrinksTableSearch: (state, action: PayloadAction<string>) => {
      state.drinksTable.search = action.payload;
    },
    setDessertsTable: (
      state,
      action: PayloadAction<{
        page?: number;
        limit?: number;
        search?: string;
      }>
    ) => {
      state.dessertsTable = {
        ...state.dessertsTable,
        ...action.payload,
      };
    },
    setDessertsTablePage: (state, action: PayloadAction<number>) => {
      state.dessertsTable.page = action.payload;
    },
    setDessertsTableLimit: (state, action: PayloadAction<number>) => {
      state.dessertsTable.limit = action.payload;
    },
    setDessertsTableSearch: (state, action: PayloadAction<string>) => {
      state.dessertsTable.search = action.payload;
    },
    setSoupSelected(state, action) {
      state.soupSelected = action.payload;
    },
    setSecondSelected(state, action) {
      state.secondSelected = action.payload;
    },
    setDrinkSelected(state, action) {
      state.drinkSelected = action.payload;
    },
    setDessertSelected(state, action) {
      state.dessertSelected = action.payload;
    },
  },
});

export const {
  setRestaurants,
  setRestaurantSelected,
  setRestaurantsTable,
  setRestaurantsTablePage,
  setRestaurantsTableLimit,
  setRestaurantsTableSearch,
  setSoupsTable,
  setSoupsTablePage,
  setSoupsTableLimit,
  setSoupsTableSearch,
  setSecondsTable,
  setSecondsTablePage,
  setSecondsTableLimit,
  setSecondsTableSearch,
  setDrinksTable,
  setDrinksTablePage,
  setDrinksTableLimit,
  setDrinksTableSearch,
  setDessertsTable,
  setDessertsTablePage,
  setDessertsTableLimit,
  setDessertsTableSearch,
  setSoupSelected,
  setSecondSelected,
  setDrinkSelected,
  setDessertSelected,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
