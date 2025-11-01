import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL USER
        getAllUser: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    Object.entries(args).forEach(([key, value]) => {
                        if (value) {
                            params.append(key, value);
                        }
                    });
                }
                return {
                    url: "/dashboard/admin-employer-profile",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["USER"],
        }),


        // BLOCK UNBLOCK TOGGLE USER
        blockUser: builder.mutation({
            query: (data) => ({
                url: `/auth/block-unblock`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["USER"],
        }),

        activateUser: builder.mutation({
            query: (employerId) => ({
                url: `/dashboard/admin/approved_employer?status=active&employerId=${employerId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["USER"],
        }),
    })
})

export const { useGetAllUserQuery, useBlockUserMutation, useActivateUserMutation } = userApi