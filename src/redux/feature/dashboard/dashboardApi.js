import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET DASHBOARD STATS
        getDashboardStats: builder.query({
            query: () => ({
                url: "/meta/get-meta-data",
                method: "GET",
            }),
            providesTags: ["DASHBOARD"],
        }),

        // GET DASHBOARD USER CHART
        getDashboardUserChart: builder.query({
            query: ({ year } = {}) => ({
                url: "/meta/user-chart-data",
                method: "GET",
                params: year ? { year } : {}
            }),
            providesTags: ["DASHBOARD"],
        }),

        // GET DASHBOARD EARNING CHART
        getDashboardEarningChart: builder.query({
            query: ({ year } = {}) => ({
                url: "/meta/earning-chart-data",
                method: "GET",
                params: year ? { year } : {}
            }),
            providesTags: ["DASHBOARD"],
        }),

    })
})

export const { useGetDashboardStatsQuery, useGetDashboardUserChartQuery, useGetDashboardEarningChartQuery } = dashboardApi;