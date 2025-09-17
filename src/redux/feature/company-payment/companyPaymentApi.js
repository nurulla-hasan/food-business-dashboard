import { baseApi } from "../baseApi"

const companyPaymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL COMPANY PAYMENT
        getAllCompanyPayment: builder.query({
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
                    url: "/dashboard/get_all_company_payment",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["COMPANY_PAYMENT"],
        }),

        // GET SINGLE COMPANY DETAILS
        getCompanyDetails: builder.query({
            query: (id) => ({
                url: `/dashboard/get_company_details/${id}`,
                method: "GET",
            }),
            providesTags: ["COMPANY_PAYMENT"],
        }),

        // GET SINGLE COMPANY EMPLOYER ORDERS
        getCompanyOrder: builder.query({
            query: ({ id, ...args }) => {
                const params = new URLSearchParams();
                if (args) {
                    Object.entries(args).forEach(([key, value]) => {
                        if (value) {
                            params.append(key, value);
                        }
                    });
                }
                return {
                    url: `/dashboard/get_company_order/${id}`,
                    method: "GET",
                    params,
                };
            },
            providesTags: ["COMPANY_PAYMENT"],
        }),


        // UPDATE COMPANY PAYMENT
        updateCompanyPayment: builder.mutation({
            query: (data) => ({
                url: "/dashboard/update_company_payment_monthly",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["COMPANY_PAYMENT"],
        }),

    })
})

export const { useGetAllCompanyPaymentQuery, useGetCompanyOrderQuery, useUpdateCompanyPaymentMutation, useGetCompanyDetailsQuery } = companyPaymentApi