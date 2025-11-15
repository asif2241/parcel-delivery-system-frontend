/* eslint-disable @typescript-eslint/no-unused-vars */
// import type { ReactNode } from "react"
import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar"

// interface IProps {
//     children: ReactNode
// }
// interface IProps {
//     children?: React.ReactNode;
// }
// { children }: IProps
const CommonLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar></Navbar>
            <div className="grow-1"><Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    )
}

export default CommonLayout
