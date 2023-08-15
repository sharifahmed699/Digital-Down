import {
  IGetAllDistrict,
  IResponse,
} from '../interfaces/district/IGetAllDistrict.interface';
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
    editDivision: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/edit/division/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['create/division'],
    }),
    deleteDivision: builder.mutation({
      query: (id: number) => ({
        url: `/admin/delete/division/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['create/division'],
    }),
  }),
});

export const {
  useGetDivisionQuery,
  useCreateDivisionMutation,
  useEditDivisionMutation,
  useDeleteDivisionMutation,
} = divisionApi;
