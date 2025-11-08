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
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from "@/redux/features/user/user.api";
import { UsersFilters } from "./UsersFilters";
import type { IUser } from "@/types/user.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UpdateUserRole } from "./UpdateUserRole";


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
    const [blockUser] = useBlockUserMutation()
    const [unblockUser] = useUnblockUserMutation()
    // console.log(data);

    // Handle page change
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        setSearchParams(params);
    };

    const handleBlock = async (id: string, action: "BLOCK" | "UNBLOCK") => {
        if (action === "BLOCK") {
            const toastId = toast.loading("Blocking User...");
            try {
                const res = await blockUser(id).unwrap();

                if (res.success) {
                    toast.success("Removed", { id: toastId });
                }
            } catch (err) {
                console.error(err);
            }
        }
        if (action === "UNBLOCK") {
            const toastId = toast.loading("Unblocking User...");
            try {
                const res = await unblockUser(id).unwrap();

                if (res.success) {
                    toast.success("Unblocked User", { id: toastId });
                }
            } catch (err) {
                console.error(err);
            }
        }
    }


    return (
        <div>
            <UsersFilters></UsersFilters>
            <div className="[&>div]:max-h-[600px]">
                <Table className="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
                    <TableHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur-xs">
                        <TableRow className="hover:bg-transparent">
                            <TableHead>Name</TableHead>
                            <TableHead className="text-center">Email</TableHead>
                            {/* <TableHead className="text-center">Phone</TableHead> */}
                            <TableHead className="text-center">Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((user: IUser) => (
                            <TableRow key={user._id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell className="text-center"> {user.email} </TableCell>
                                {/* <TableCell className="text-center">{user.phone}</TableCell> */}
                                <TableCell className="text-center">{user.role}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-center items-center gap-2">
                                        <>
                                            {
                                                !user.isBlocked ? <Button onClick={() => handleBlock(user._id as string, "BLOCK")} variant={"destructive"} >Block</Button> : <Button onClick={() => handleBlock(user._id as string, "UNBLOCK")} variant={"secondary"} >Unblock</Button>
                                            }
                                        </>
                                        <>
                                            <UpdateUserRole id={user._id as string}></UpdateUserRole>
                                        </>
                                    </div>
                                </TableCell>
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
