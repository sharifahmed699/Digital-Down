import { IGetAllDistrict } from '../interfaces/district/IGetAllDistrict.interface';
import { ICreatePouroSovaPayload } from '../interfaces/pouroSova/ICreatePouroSovaPayload.interface';
import { apiSlice } from './apiSlice';

const pouroShovaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPouroSova: builder.query<IGetAllDistrict[], void>({
      query: () => '/pourosovas',
      keepUnusedDataFor: 600,
      providesTags: ['admin/createPouroSova'],
    }),
    createPouroSova: builder.mutation({
      query: (data: ICreatePouroSovaPayload) => ({
        url: '/admin/create/pourosova',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['admin/createPouroSova'],
    }),
  }),
});

export const { useGetPouroSovaQuery, useCreatePouroSovaMutation } =
  pouroShovaApi;
