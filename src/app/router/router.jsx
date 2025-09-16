import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/app/layout/MainLayout";
import AuthLayout from "@/app/layout/AuthLayout";
import { lazy } from "react";
//======================================================================================================================
const Login = lazy(()=> import('@/app/pages/auth/login/Login'));
const ForgetPassword = lazy(()=> import('@/app/pages/auth/forget-password/ForgetPassword'));
const ResetPassword = lazy(()=> import('@/app/pages/auth/reset-password/ResetPassword'));
const VerifyOtp = lazy(()=> import('@/app/pages/auth/verify-otp/VerifyOtp'));
const CompanyPayment = lazy(()=> import('@/app/pages/company-payment/CompanyPayment'));
//======================================================================================================================
const Dashboard = lazy(()=> import('@/app/pages/dasboard/Dashboard'));
const Users = lazy(()=> import('@/app/pages/users/Users'));
const CompanyManagement = lazy(()=> import('@/app/pages/company-management/CompanyManagement'));
const WeeklyMenu = lazy(()=> import('@/app/pages/weekly-menu/WeeklyMenu'));
const OrderManagement = lazy(()=> import('@/app/pages/order-management/OrderManagement'));
const Profile = lazy(()=> import('@/app/pages/settings/profile/Profile'));
const Privacy = lazy(()=> import('@/app/pages/settings/privacy/Privacy'));
const Terms = lazy(()=> import('@/app/pages/settings/terms/Terms'));
const About = lazy(()=> import('@/app/pages/settings/about-us/About'));
// const Notification = lazy(()=> import('@/app/pages/notifications/Notification'));
//======================================================================================================================

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "company-management",
                element: <CompanyManagement />
            },
            {
                path: "users",
                element: <Users />
            },
            {
                path: "weekly-menu",
                element: <WeeklyMenu />
            },
            {
                path: "order-management",
                element: <OrderManagement />
            },
            {
                path: "company-payment",
                element: <CompanyPayment />
            },
            // {
            //     path: "notifications",
            //     element: <Notification />
            // },
            {
                path: "settings/profile",
                element: <Profile />
            },
            {
                path: "settings/about",
                element: <About />
            },
            {
                path: "settings/terms",
                element: <Terms />
            },
            {
                path: "settings/privacy",
                element: <Privacy />
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgetPassword />
            },
            {
                path: "verify-otp",
                element: <VerifyOtp />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
        ]
    }
]);