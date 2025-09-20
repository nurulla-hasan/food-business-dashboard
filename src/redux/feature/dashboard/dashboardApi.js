import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET DASHBOARD STATS
        getDashboardStats: builder.query({
            query: () => ({
                url: "/dashboard/get-total-count",
                method: "GET",
            }),
            providesTags: ["DASHBOARD"],
        }),

        // GET DASHBOARD USER CHART
        getDashboardUserChart: builder.query({
            query: () => ({
                url: "/dashboard/get-user-overview",
                method: "GET",
                // params: years ? { years } : {}
            }),
            providesTags: ["DASHBOARD"],
        }),

        // GET DASHBOARD EARNING CHART
        getDashboardEarningChart: builder.query({
            query: ({ years } = {}) => ({
                url: "/dashboard/get-earning-overview",
                method: "GET",
                params: years ? { years } : {}
            }),
            providesTags: ["DASHBOARD"],
        }),

    })
})

export const { 
    useGetDashboardStatsQuery,
    useGetDashboardUserChartQuery,
    useGetDashboardEarningChartQuery 
} = dashboardApi;