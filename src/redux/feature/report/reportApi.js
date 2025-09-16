import { baseApi } from "../baseApi"

const reportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL REPORT
        getAllReport: builder.query({
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
                    url: "/report/all-reports",
                    method: "GET",
                    params,
                }
            },
            providesTags: ["REPORT"],
        }),

        // DELETE REPORT
        deleteReport: builder.mutation({
            query: (id) => ({
                url: `/report/delete-report/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["REPORT"],
        }),
    })
})

export const { useGetAllReportQuery, useDeleteReportMutation } = reportApi