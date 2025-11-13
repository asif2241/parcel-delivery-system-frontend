import CommonLayout from "@/components/layout/CommonLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { Unauthorized } from "@/pages/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constant/role";
import type { TRole } from "@/types";
import ParcelTrackingPage from "@/pages/TrackParcel";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { AboutUsPage } from "@/pages/AboutUsPage";
import ContactUsPage from "@/pages/ContactUsPage";

export const router = createBrowserRouter([
    {
        Component: CommonLayout,
        path: "/",
        children: [
            {
                path: "/",
                Component: HomeLayout
            },
            {
                Component: ParcelTrackingPage,
                path: "/track/:trackingId"
            },
            {
                Component: AboutUsPage,
                path: "about-us"
            },
            {
                Component: ContactUsPage,
                path: "contact-us"
            }
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.SUPER_ADMIN as TRole),
        path: "/admin",
        children: [
            {
                index: true, element: <Navigate to="/admin/analytics" />
            },
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.ADMIN as TRole),
        path: "/admin",
        children: [
            {
                index: true, element: <Navigate to="/admin/analytics" />
            },
            ...generateRoutes(adminSidebarItems)
        ]
    },

    {
        Component: withAuth(DashboardLayout, role.SENDER as TRole),
        path: "/sender",
        children: [
            {
                index: true, element: <Navigate to="/sender/create-parcel" /> //ekane
            },
            ...generateRoutes(senderSidebarItems)
        ]
    },


    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component: Unauthorized,
        path: "/unauthorized",
    },
])