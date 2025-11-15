
// import Analytics from "@/pages/Admin/Analytics";
import ParcelTablePage from "@/pages/ParcelTablePage";
import type { ISidebarItem } from "@/types";


export const receiverSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Parcel History",
                url: "/receiver/history",
                component: ParcelTablePage,
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