import { IGetAllDistrict } from '../interfaces/district/IGetAllDistrict.interface';
import { apiSlice } from './apiSlice';

const upoZillaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUpoZila: builder.query<IGetAllDistrict[], void>({
      query: () => '/upozilas',
      keepUnusedDataFor: 600,
      providesTags: ['admin/createUpoZilla'],
    }),
    createUpoZila: builder.mutation({
      query: (data) => ({
        url: '/admin/create/upozila',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['admin/createUpoZilla'],
    }),
  }),
});

export const { useCreateUpoZilaMutation, useGetUpoZilaQuery } = upoZillaApi;
