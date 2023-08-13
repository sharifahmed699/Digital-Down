import {
  IGetAllDistrict,
  IResponse,
} from '../interfaces/district/IGetAllDistrict.interface';
import { ICreatePouroSovaPayload } from '../interfaces/pouroSova/ICreatePouroSovaPayload.interface';
import { apiSlice } from './apiSlice';

const pouroShovaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPouroSova: builder.query<IResponse<IGetAllDistrict>, void>({
      query: () => '/admin/pourosovas',
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
