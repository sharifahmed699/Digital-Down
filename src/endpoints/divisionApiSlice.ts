import { IGetAllDivision } from '../interfaces/division/IGetAllDivision.interface';
import { apiSlice } from './apiSlice';

const divisionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDivision: builder.query<IGetAllDivision[], void>({
      query: () => '/divisions',
      keepUnusedDataFor: 600,
      providesTags: ['create/division'],
    }),
    createDivision: builder.mutation({
      query: (data) => ({
        url: '/admin/create/division',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['create/division'],
    }),
  }),
});

export const { useGetDivisionQuery, useCreateDivisionMutation } = divisionApi;
