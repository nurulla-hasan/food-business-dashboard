import { baseApi } from "../baseApi"

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL ORDER
        getAllOrder: builder.query({
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
                    url: "/dashboard/get-all-orders",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["ORDER"],
        }),

        // UPDATE ORDER
        updateOrder: builder.mutation({
            query: ({ orderId, status }) => ({
                url: `/dashboard/update-order-status`,
                method: "PATCH",
                params: { orderId, status },
            }),
            invalidatesTags: ["ORDER"],
        }),

    })
})

export const { useGetAllOrderQuery, useUpdateOrderMutation } = orderApi