import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
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
}

const restaurant: ReaturantsState = {
  restaurants: [],
  restaurantsTable: {
    page: 1,
    limit: 10,
    search: '',
  },
  restaurantSelected: null,
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
  },
});

export const {
  setRestaurants,
  setRestaurantSelected,
  setRestaurantsTable,
  setRestaurantsTablePage,
  setRestaurantsTableLimit,
  setRestaurantsTableSearch,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
