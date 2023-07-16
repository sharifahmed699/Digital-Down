import { apiSlice } from './apiSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/admin/allUsers',
      keepUnusedDataFor: 600,
      providesTags: ['admin/allUsers'],
    }),
    getDivision: builder.query({
      query: () => '/divisions',
      keepUnusedDataFor: 600,
    }),
    authLogin: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['admin/allUsers'],
    }),
    createDivision: builder.mutation({
      query: (data) => ({
        url: '/admin/create/division',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['admin/allUsers'],
    }),
  }),
});

export const {
  useAuthLoginMutation,
  useGetUserQuery,
  useGetDivisionQuery,
  useCreateDivisionMutation,
} = authApi;
