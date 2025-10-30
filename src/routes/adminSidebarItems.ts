
// import Analytics from "@/pages/Admin/Analytics";
import ParcelTablePage from "@/pages/ParcelTablePage";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: Analytics,
            },
            {
                title: "All Parcels",
                url: "/admin/parcels",
                component: ParcelTablePage,
            },
        ],
    },
    // {
    //     title: "Parcel Management",
    //     items: [
    //         {
    //             title: "Add Tour Type",
    //             url: "/admin/add-tour-type",
    //             component: AddTourType,
    //         },
    //         {
    //             title: "Add Tour",
    //             url: "/admin/add-tour",
    //             component: AddTour,
    //         },
    //         {
    //             title: "Habi Jabi",
    //             url: "/admin/habijabi",
    //             component: AddTour,
    //         },
    //     ],
    // },
];