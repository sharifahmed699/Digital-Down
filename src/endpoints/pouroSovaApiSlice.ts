import { IGetAllDistrict } from '../interfaces/district/IGetAllDistrict.interface';
import { apiSlice } from './apiSlice';

const pouroShovaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPouroSova: builder.query<IGetAllDistrict[], void>({
      query: () => '/pourosovas',
      keepUnusedDataFor: 600,
    }),
    createPouroSova: builder.mutation({
      query: (data) => ({
        url: '/admin/create/pourosova',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['admin/allUsers'],
    }),
  }),
});

export const { useGetPouroSovaQuery, useCreatePouroSovaMutation } =
  pouroShovaApi;
