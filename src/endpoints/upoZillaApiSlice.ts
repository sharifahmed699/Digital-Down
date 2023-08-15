import {
  IGetAllDistrict,
  IResponse,
} from '../interfaces/district/IGetAllDistrict.interface';
import { apiSlice } from './apiSlice';

const upoZillaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUpoZila: builder.query<IResponse<IGetAllDistrict>, void>({
      query: () => '/admin/upozilas',
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
    editUpoZila: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/edit/upozila/${id}`,
        method: 'PUT', // Use PUT method for editing
        body: data,
      }),
      invalidatesTags: ['admin/createUpoZilla'],
    }),
  }),
});

export const {
  useCreateUpoZilaMutation,
  useGetUpoZilaQuery,
  useEditUpoZilaMutation,
} = upoZillaApi;
