import CommonLayout from "@/components/layout/CommonLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

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
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    }
])