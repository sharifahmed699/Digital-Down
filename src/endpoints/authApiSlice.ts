import { IGetAllUserResponse } from '../interfaces/users/IGetAllUser.interface';
import { apiSlice } from './apiSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IGetAllUserResponse, void>({
      query: () => '/admin/allUsers',
      keepUnusedDataFor: 600,
      providesTags: ['admin/allUsers'],
    }),
    authLogin: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['admin/allUsers'],
    }),
  }),
});

export const { useAuthLoginMutation, useGetUserQuery } = authApi;
