import { IGetAllUserResponse } from '../interfaces/users/IGetAllUser.interface';
import { apiSlice } from './apiSlice';

type FormData = {
  mobileNumber: string;
  password: string;
};
interface ILoginResponse {
  status: boolean;
  content: string;
  statusCode: string;
  id: number;
  userId?: any;
  token: string;
  userType: string;
}

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IGetAllUserResponse, void>({
      query: () => '/admin/allUsers',
      keepUnusedDataFor: 600,
      providesTags: ['admin/allUsers'],
    }),
    authLogin: builder.mutation<ILoginResponse, FormData>({
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
