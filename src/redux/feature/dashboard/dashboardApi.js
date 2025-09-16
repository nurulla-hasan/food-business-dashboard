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

        // GET DASHBOARD DONOR CHART
        getDashboardDonorChart: builder.query({
            query: ({ year } = {}) => ({
                url: "/meta/donor-chart-data",
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

        // GET DASHBOARD BOND CHART
        getDashboardBondChart: builder.query({
            query: ({ year } = {}) => ({
                url: "/meta/bond-chart-data",
                method: "GET",
                params: year ? { year } : {}
            }),
            providesTags: ["DASHBOARD"],
        }),


        // GET DASHBOARD INSTITUTION CHART
        getDashboardInstitutionChart: builder.query({
            query: ({ year } = {}) => ({
                url: "/meta/institution-chart-data",
                method: "GET",
                params: year ? { year } : {}
            }),
            providesTags: ["DASHBOARD"],
        }),

        // GET DASHBOARD AUDIO CHART
        getDashboardAudioChart: builder.query({
            query: () => ({
                url: "/meta/audio-pie-chart",
                method: "GET",
            }),
            providesTags: ["DASHBOARD"],
        }),
    })
})

export const { useGetDashboardStatsQuery, useGetDashboardUserChartQuery, useGetDashboardDonorChartQuery, useGetDashboardEarningChartQuery, useGetDashboardBondChartQuery, useGetDashboardInstitutionChartQuery, useGetDashboardAudioChartQuery } = dashboardApi;