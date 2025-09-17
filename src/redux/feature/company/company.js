import { baseApi } from "../baseApi"

const companyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL COMPANY
        getAllCompany: builder.query({
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
                    url: "/dashboard/get-company-list",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["COMPANY"],
        }),

        // ADD COMPANY
        addCompany: builder.mutation({
            query: (data) => ({
                url: "/dashboard/create-company",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["COMPANY"],
        }),

        // UPDATE COMPANY
        updateCompany: builder.mutation({
            query: ({id, data}) => ({
                url: `/dashboard/companies/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["COMPANY"],
        }),

        // DELETE COMPANY
        deleteCompany: builder.mutation({
            query: (id) => ({
                url: `/dashboard/companies/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["COMPANY"],
        }),

    })
})

export const { useGetAllCompanyQuery, useAddCompanyMutation, useUpdateCompanyMutation, useDeleteCompanyMutation } = companyApi