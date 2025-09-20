
import { baseApi } from "../baseApi";

const legalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ABOUT
        getAbout: builder.query({
            query: () => ({
                url: "/dashboard/get-about-us",
                method: "GET",
            }),
            providesTags: ["LEGAL"],
        }),

        // GET TERMS
        getTerms: builder.query({
            query: () => ({
                url: "/dashboard/get-rules",
                method: "GET",
            }),
            providesTags: ["LEGAL"],
        }),

        // GET PRIVACY POLICY
        getPrivacyPolicy: builder.query({
            query: () => ({
                url: "/dashboard/get-privacy-policy",
                method: "GET",
            }),
            providesTags: ["LEGAL"],
        }),

        // GET CONTACT
        // getContact: builder.query({
        //     query: () => ({
        //         url: "/manage/get-contact",
        //         method: "GET",
        //     }),
        //     providesTags: ["LEGAL"],
        // }),

        // ADD ABOUT
        addAbout: builder.mutation({
            query: (data) => ({
                url: "/dashboard/addupdate-about-us",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["LEGAL"],
        }),

        // ADD TERMS
        addTerms: builder.mutation({
            query: (data) => ({
                url: "/dashboard/addupdate-termsConditions",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["LEGAL"],
        }),

        // ADD PRIVACY POLICY
        addPrivacyPolicy: builder.mutation({
            query: (data) => ({
                url: "/dashboard/addupdate-privacy-policy",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["LEGAL"],
        }),

        // ADD CONTACT
        // addContact: builder.mutation({
        //     query: (data) => ({
        //         url: "/manage/add-contact",
        //         method: "POST",
        //         body: data,
        //     }),
        //     invalidatesTags: ["LEGAL"],
        // }),
    })
})

export const { useGetTermsQuery, useGetPrivacyPolicyQuery, useAddTermsMutation, useAddPrivacyPolicyMutation, useAddAboutMutation, useGetAboutQuery } = legalApi