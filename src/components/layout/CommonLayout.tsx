import type { ReactNode } from "react"

interface IProps {
    children: ReactNode
}

const CommonLayout = ({ children }: IProps) => {
    return (
        <div className="min-h-screen flex flex-col">

        </div>
    )
}

export default CommonLayout