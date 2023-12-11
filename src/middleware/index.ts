import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const middlewareApi = createApi({
  reducerPath: 'middlewareApi',
  baseQuery: fetchBaseQuery(),
  endpoints: () => ({}),
});
