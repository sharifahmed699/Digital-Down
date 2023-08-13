import {
  IGetAllDistrict,
  IResponse,
} from '../interfaces/district/IGetAllDistrict.interface';
import { IGetAllDivision } from '../interfaces/division/IGetAllDivision.interface';
import { apiSlice } from './apiSlice';

const divisionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDivision: builder.query<IResponse<IGetAllDistrict>, void>({
      query: () => '/admin/divisions',
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
