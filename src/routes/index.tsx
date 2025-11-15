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

import { HomeLayout } from "@/components/layout/HomeLayout";
import { AboutUsPage } from "@/pages/AboutUsPage";
import ContactUsPage from "@/pages/ContactUsPage";
import { Role } from "@/types/user.types";
import ParcelTrackingPage from "@/pages/TrackParcelPage";
import { receiverSidebarItems } from "./receiverSidebarItems";

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
        Component: withAuth(DashboardLayout, ["ADMIN", "SUPER_ADMIN"]),
        path: "/admin",
        children: [
            {
                index: true, element: <Navigate to="/admin/analytics" />
            },
            ...generateRoutes(adminSidebarItems)
        ]
    },


    {
        Component: withAuth(DashboardLayout, [Role.SENDER]),
        path: "/sender",
        children: [
            {
                index: true, element: <Navigate to="/sender/create-parcel" /> //ekane
            },
            ...generateRoutes(senderSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout, [Role.RECEIVER]),
        path: "/receiver",
        children: [
            {
                index: true, element: <Navigate to="/receiver/history" /> //ekane
            },
            ...generateRoutes(receiverSidebarItems)
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