import { IGetAllDistrict } from '../interfaces/district/IGetAllDistrict.interface';
import { apiSlice } from './apiSlice';

const districtApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDistrict: builder.query<IGetAllDistrict[], void>({
      query: () => '/districts',
      keepUnusedDataFor: 600,
      providesTags: ['admin/allUsers'],
    }),
    createDistrict: builder.mutation({
      query: (data) => ({
        url: '/admin/create/district',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['admin/allUsers'],
    }),
  }),
});

export const { useGetDistrictQuery, useCreateDistrictMutation } = districtApi;
