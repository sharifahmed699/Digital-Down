import { ICreateZillaPayload } from '../interfaces/district/ICreateDistrictPayload.interface';
import {
  IGetAllDistrict,
  IResponse,
} from '../interfaces/district/IGetAllDistrict.interface';
import { apiSlice } from './apiSlice';

const districtApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDistrict: builder.query<IResponse<IGetAllDistrict>, void>({
      query: () => '/admin/districts',
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
    editDistrict: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/edit/district/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['admin/createDistrict'],
    }),
    deleteDistrict: builder.mutation({
      query: (id: number) => ({
        url: `/admin/delete/district/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['admin/createDistrict'],
    }),
  }),
});

export const {
  useGetDistrictQuery,
  useCreateDistrictMutation,
  useEditDistrictMutation,
  useDeleteDistrictMutation,
} = districtApi;
