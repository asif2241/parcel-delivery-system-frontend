import CommonLayout from "@/components/layout/CommonLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { receiverSidebarItems } from "./receiverSidebarItems";
import { Unauthorized } from "@/pages/Unauthorized";

export const router = createBrowserRouter([
    {
        Component: CommonLayout,
        path: "/",
        children: [
            {

            }
        ]
    },
    {
        Component: DashboardLayout,
        path: "/admin",
        children: [
            {
                index: true, element: <Navigate to="/admin/analytics" />
            },
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        Component: DashboardLayout,
        path: "/admin",
        children: [
            {
                index: true, element: <Navigate to="/admin/analytics" />
            },
            ...generateRoutes(adminSidebarItems)
        ]
    },
    // {
    //     Component: DashboardLayout,
    //     path: "/sender",
    //     children: [
    //         {
    //             index: true, element: <Navigate to="/admin/analytics" /> //ekane
    //         },
    //         ...generateRoutes(senderSidebarItems)
    //     ]
    // },
    // {
    //     Component: DashboardLayout,
    //     path: "/receiver",
    //     children: [
    //         {
    //             index: true, element: <Navigate to="/admin/analytics" /> //ekane
    //         },
    //         ...generateRoutes(receiverSidebarItems)
    //     ]
    // },

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