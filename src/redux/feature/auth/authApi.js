import { SuccessToast, ErrorToast } from "@/lib/utils";
import { setAccessToken, setAdmin } from "../auth/authSlice";
import { baseApi } from "../baseApi";
import { jwtDecode } from "jwt-decode";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ADMIN PROFILE
        getAdminProfile: builder.query({
            query: () => ({
                url: "/auth/profile",
                method: "GET",
            }),
            providesTags: ["PROFILE"],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.data) {
                        dispatch(setAdmin(data.data));
                    }
                } catch {
                    // silently ignore; UI can read error from hook if needed
                }
            },
        }),

        // UPDATE ADMIN PROFILE
        updateAdminProfile: builder.mutation({
            query: (data) => ({
                url: "/auth/edit-profile",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["PROFILE"],
        }),

        // CHANGE PASSWORD
        changePassword: builder.mutation({
            query: (data) => {
                return {
                    url: "/auth/change-password",
                    method: 'PATCH',
                    body: data
                }
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    SuccessToast(data?.message);
                } catch (error) {
                    ErrorToast(error?.error?.data?.message || "Failed to change password.");
                }
            },
        }),

        // Login Endpoint (Mutation) 
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const accessToken = data?.data?.accessToken;
                    const decoded = jwtDecode(accessToken);
                    if (decoded?.role === "ADMIN") {
                        if (accessToken) {
                            dispatch(setAccessToken(accessToken));
                        }
                        SuccessToast("Login successful!");
                        window.location.href = "/";
                    } else {
                        ErrorToast("You are not authorized to login.");
                        return;
                    }
                } catch (error) {
                    ErrorToast(error?.error?.data?.message || "Login failed.");
                }
            },
        }),

        // FORGET PASSWORD
        forgetPassword: builder.mutation({
            query: (email) => {
                return {
                    url: '/auth/forgot-password',
                    method: 'POST',
                    body: email
                }
            },
            async onQueryStarted({ email }, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem("FPE", email);
                    SuccessToast(data?.message);
                } catch (error) {
                    ErrorToast(error?.error?.data?.message || "Failed to send new OTP.");
                }
            }
        }),

        // OTP VERIFY FOR RESET PASSWORD
        verifyOTPForResetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    SuccessToast(data?.message);
                } catch (error) {
                    ErrorToast(error?.error?.data?.message || "OTP verification failed.");
                }
            },
        }),

        // RESEND RESET OTP
        resendResetOTP: builder.mutation({
            query: (email) => ({
                url: '/auth/resend-forgot',
                method: 'POST',
                body: email
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    SuccessToast(data?.message);
                } catch (error) {
                    ErrorToast(error?.error?.data?.message || "Failed to send new OTP.");
                }
            },
        }),

        // RESET PASSWORD
        resetPassword: builder.mutation({
            query: ({email, ...data}) => {
                return {
                    url: `/auth/reset-password?email=${email}`,
                    method: 'POST',
                    body: data,
                }
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    SuccessToast(data?.message);
                    localStorage.removeItem("FPE");
                    window.location.href = "/auth/login";
                } catch (error) {
                    ErrorToast(error?.error?.data?.message || "Failed to reset password.");
                }
            }
        }),

    })
})

export const {
    useGetAdminProfileQuery,
    useUpdateAdminProfileMutation,
    useLoginMutation,
    useForgetPasswordMutation,
    useVerifyOTPForResetPasswordMutation,
    useResendResetOTPMutation,
    useResetPasswordMutation,
    useChangePasswordMutation
} = authApi;