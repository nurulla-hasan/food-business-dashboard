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


        // GET ALL COMPANY PAYMENT
        getCompanyOrder: builder.query({
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
                    url: "/dashboard/get_company_order/68be73057759085b1cc1bff4",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["COMPANY_PAYMENT"],
        }),

        // GET COMPANY DETAILS
        getCompanyDetails: builder.query({
            query: (id) => ({
                url: `/dashboard/get_company_details/${id}`,
                method: "GET",
            }),
            providesTags: ["COMPANY_PAYMENT"],
        }),

        // UPDATE COMPANY PAYMENT
        updateCompanyPayment: builder.mutation({
            query: ({id, data}) => ({
                url: `/dashboard/update_company_payment_monthly/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["COMPANY_PAYMENT"],
        }),

    })
})

export const { useGetAllCompanyPaymentQuery, useGetCompanyOrderQuery, useUpdateCompanyPaymentMutation, useGetCompanyDetailsQuery } = companyPaymentApi