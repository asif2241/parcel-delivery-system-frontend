/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetSingleParcelQuery, useUpdateParcelStatusMutation } from "@/redux/features/parcel/parcels.api";
import { PARCEL_STATUS } from "@/types/parcelTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Fix the zod schema - use Object.values to get array of statuses
const updateStatusSchema = z.object({
    status: z.enum([Object.values(PARCEL_STATUS)[0], ...Object.values(PARCEL_STATUS).slice(1)] as [string, ...string[]]),
    location: z.string().optional(),
    notes: z
        .string()
        .max(50, "Note cannot exceed 50 chars")
        .transform(val => val === "" ? undefined : val)
        .optional()
        .refine(val => !val || val.length >= 5, {
            message: "Note is too short",
        })
})
type UpdateStatusForm = z.infer<typeof updateStatusSchema>;



export function UpdateParcelStatus({ id }: { id: string }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [updateParcelStatus] = useUpdateParcelStatusMutation()

    // Only fetch when dialog is open
    const { data: parcelData } = useGetSingleParcelQuery(id, {
        skip: !id || !isDialogOpen,
    });
    // console.log(parcelData);

    // console.log(id);
    const form = useForm<UpdateStatusForm>({
        resolver: zodResolver(updateStatusSchema),
        defaultValues: {
            status: "",
            location: "",
            notes: "",
        }
    });

    //useEffet for setting privious valus as default value in the input field 
    useEffect(() => {
        if (parcelData?.data && isDialogOpen) {
            const parcel = parcelData.data;
            form.reset({
                status: parcel.currentStatus,
                location: parcel.statusHistory?.[parcel.statusHistory.length - 1]?.location || "",
                notes: undefined,
            });
        }
    }, [parcelData, form, isDialogOpen]);

    const handleDialogOpen = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            form.reset(); // Reset form when dialog closes
        }
    };


    const onSubmit = async (data: UpdateStatusForm) => {
        console.log("Parcel ID:", id, typeof id);
        console.log("Form data:", data);

        try {
            const res = await updateParcelStatus({ parcelId: id, ...data }).unwrap();
            console.log(res);
            if (res.success) {
                toast.success("Statuse updated successfully");
                form.reset();
                setIsDialogOpen(false)
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update status")
        }

    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
            <DialogTrigger asChild>
                <Button>Update Status</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[300px]">
                <DialogHeader>
                    <DialogTitle>Update Parcel Status</DialogTitle>
                    <DialogDescription>
                        Update the current status and location of the parcel.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form id="update-status" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Status Field */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {Object.entries(PARCEL_STATUS).map(([_, value]) => (
                                                    <SelectItem key={value} value={value}>
                                                        {value}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Location Field */}
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Current location"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Notes Field */}
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Additional notes"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" form="update-status">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}