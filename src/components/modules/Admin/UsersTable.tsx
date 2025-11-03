import {
    Table,
    TableBody,
    TableCell,

    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useSearchParams } from "react-router";
// import { Button } from "@/components/ui/button";
import PaginationComp from "@/components/Pagination";
import { useGetAllUsersQuery } from "@/redux/features/user/user.api";
import { UsersFilters } from "./UsersFilters";
import type { IUser } from "@/types/user.types";


export default function UsersTable() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const searchEmail = searchParams.get("searchEmail") || undefined;
    const limit = searchParams.get("limit") || undefined;
    const role = searchParams.get("role") || undefined;
    const sort = searchParams.get("sort") || undefined;
    const page = searchParams.get("page") || "1"; // Default to page 1

    // console.log(searchEmail);
    const { data } = useGetAllUsersQuery({ searchEmail, limit, sort, page, role })
    // console.log(data);

    // Handle page change
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        setSearchParams(params);
    };


    return (
        <div>
            <UsersFilters></UsersFilters>
            <div className="[&>div]:max-h-[600px]">
                <Table className="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
                    <TableHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur-xs">
                        <TableRow className="hover:bg-transparent">
                            <TableHead>Name</TableHead>
                            <TableHead className="text-center">Email</TableHead>
                            <TableHead className="text-center">Phone</TableHead>
                            <TableHead className="text-center">Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((user: IUser) => (
                            <TableRow key={user._id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell className="text-center"> {user.email} </TableCell>
                                <TableCell className="text-center">{user.phone}</TableCell>
                                <TableCell className="text-center">{user.role}</TableCell>
                                <TableCell className="text-right">{"....."} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </div>
            <div className="my-5">
                <PaginationComp currentPage={data?.meta?.page} totalPages={data?.meta?.totalPage} paginationItemsToDisplay={5} onPageChange={handlePageChange}></PaginationComp>
            </div>
        </div>
    )
}
