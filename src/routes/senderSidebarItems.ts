
// import Analytics from "@/pages/Admin/Analytics";
import ParcelTablePage from "@/pages/ParcelTablePage";
import { CreateParcelPage } from "@/pages/Sender/CreateParcelPage";
import type { ISidebarItem } from "@/types";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const senderSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "View All Parcel",
                url: "/sender/view-parcel",
                component: ParcelTablePage
            },
            {
                title: "Create Parcel",
                url: "/sender/create-parcel",
                component: CreateParcelPage,
            },
        ],
    },
    // {
    //     title: "Tour Management",
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