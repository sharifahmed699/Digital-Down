import { IGetAllDivision } from '../interfaces/division/IGetAllDivision.interface';
import { apiSlice } from './apiSlice';

const divisionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDivision: builder.query<IGetAllDivision[], void>({
      query: () => '/divisions',
      keepUnusedDataFor: 600,
    }),
    createDivision: builder.mutation({
      query: (data) => ({
        url: '/admin/create/division',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['admin/allUsers'],
    }),
  }),
});

export const { useGetDivisionQuery, useCreateDivisionMutation } = divisionApi;
