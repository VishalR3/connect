import { apiService } from "./apiService";

const leaveService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getLeavesHistory: builder.query({
      query: (id) => `users/${id}/leave-requests`,
      providesTags: ["Leave"],
    }),
    applyLeave: builder.mutation({
      query: (data) => ({
        url: "/leave-requests",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Leave"],
    }),
  }),
});

export const { useGetLeavesHistoryQuery, useApplyLeaveMutation } = leaveService;
