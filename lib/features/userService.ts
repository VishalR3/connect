import { apiService } from "./apiService";

const userService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = userService;
