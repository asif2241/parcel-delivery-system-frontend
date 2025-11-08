/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,

  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCancelParcelMutation, useGetAllParcelsQuery } from "@/redux/features/parcel/parcels.api"
import type { IParcel } from "@/types/parcelTypes";
import { ParcelFilters } from "./ParcelFilters";
import { useSearchParams } from "react-router";
import { ParcelStatusBadge } from "./ParcelStatusBadge";
// import { Button } from "@/components/ui/button";
import { UpdateParcelStatus } from "../Admin/UpdateParcelStatus";
import PaginationComp from "@/components/Pagination";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Role } from "@/types/user.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


export default function ParcelTable() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const searchEmail = searchParams.get("searchEmail") || undefined;
  const limit = searchParams.get("limit") || undefined;
  const currentStatus = searchParams.get("currentStatus") || undefined;
  const sort = searchParams.get("sort") || undefined;
  const page = searchParams.get("page") || "1"; // Default to page 1

  // console.log(searchEmail);
  const { data } = useGetAllParcelsQuery({ searchEmail, limit, currentStatus, sort, page })
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);
  const [cancelParcel] = useCancelParcelMutation();
  // console.log(userInfo);
  // console.log(data);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  // this function will execute in logged in user is a SENDER
  const handleCancelParcel = async (id: string) => {
    try {
      const res = await cancelParcel(id).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Parcel Cancelled")
      } else {
        toast.error(`${res.message}`)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
      toast.error(`${error?.data?.message}`)
    }
  }

  const getActionBtn = (role: string, id: string) => {
    switch (role) {
      case Role.SUPER_ADMIN:
        return <UpdateParcelStatus id={id as string}></UpdateParcelStatus>
      case Role.ADMIN:
        return <UpdateParcelStatus id={id as string}></UpdateParcelStatus>
      case Role.SENDER:
        return <Button onClick={() => handleCancelParcel(id as string)}>Cancel Parcel</Button>
    }
  }


  return (
    <div>
      <ParcelFilters></ParcelFilters>
      <div className="[&>div]:max-h-[600px]">
        <Table className="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
          <TableHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur-xs">
            <TableRow className="hover:bg-transparent">
              <TableHead>TrackingID</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Sender Email</TableHead>
              <TableHead className="text-center">Fee</TableHead>
              <TableHead className="text-center">Weight(KG)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((parcel: IParcel) => (
              <TableRow key={parcel._id}>
                <TableCell className="font-medium">{parcel.trackingId}</TableCell>
                <TableCell className="text-center">
                  <ParcelStatusBadge status={parcel.currentStatus}></ParcelStatusBadge>
                </TableCell>
                <TableCell className="text-center">{parcel.sender_email}</TableCell>
                <TableCell className="text-center">{parcel.fee}</TableCell>
                <TableCell className="text-center">{parcel.weight}</TableCell>
                <TableCell className="text-right">
                  {/* <Button variant={"outline"}>Update Status</Button> */}
                  {
                    getActionBtn(userInfo?.data?.role as string, parcel._id as string)
                  }
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
