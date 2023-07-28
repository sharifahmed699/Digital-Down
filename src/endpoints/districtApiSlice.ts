import { ICreateZillaPayload } from '../interfaces/district/ICreateDistrictPayload.interface';
import { IGetAllDistrict } from '../interfaces/district/IGetAllDistrict.interface';
import { apiSlice } from './apiSlice';

const districtApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDistrict: builder.query<IGetAllDistrict[], void>({
      query: () => '/districts',
      keepUnusedDataFor: 600,
      providesTags: ['admin/createDistrict'],
    }),
    createDistrict: builder.mutation({
      query: (data: ICreateZillaPayload) => ({
        url: '/admin/create/district',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['admin/createDistrict'],
    }),
  }),
});

export const { useGetDistrictQuery, useCreateDistrictMutation } = districtApi;
