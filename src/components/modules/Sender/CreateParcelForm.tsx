/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";
import { PARCEL_TYPE } from "@/types/parcelTypes";
import SingleImageUploader from "@/components/SingleImageUploader";
import { useState } from "react";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcels.api";
import { toast } from "sonner";


const receiverSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Invalid phone"),
    address: z.string().min(5, "Address must be at least 5 characters"),
});

const formSchema = z.object({
    receiver: receiverSchema,
    parcelType: z.string().min(1, "Parcel type required"),
    weight: z
        .number({ error: "Weight must be a number" })
        .positive("Weight must be greater than 0"),
});


type CreateParcelType = z.infer<typeof formSchema>;

/* -------------------------------------------------
    Component
   ------------------------------------------------- */
export default function CreateParcelForm() {
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [createParcel] = useCreateParcelMutation();

    const form = useForm<CreateParcelType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            receiver: {
                name: "",
                email: "",
                phone: "",
                address: "",
            },
            parcelType: "",
            weight: undefined as any,
        },
    });

    const onSubmit = async (data: CreateParcelType) => {
        setIsLoading(true); // Disable button
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        if (image) formData.append("file", image);

        // console.log(formData.get("data"));
        // console.log(formData.get("file"));
        const toastId = toast.loading("Creating parcel.......")
        try {
            const res = await createParcel(formData).unwrap();
            if (res.success) {
                toast.success("Parcel Created", { id: toastId })
                form.reset(); // Clear all form fields
                setImage(null); // Clear uploaded image
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); // Re enable submit button
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto p-4">
            <h2 className="text-xl font-semibold mb-6 text-center">
                Create Parcel
            </h2>

            <Form {...form}>
                <form
                    id="add-parcel"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 mb-5"
                >
                    {/* ---------- Receiver Fields (nested) ---------- */}
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="receiver.name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Receiver Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Receiver name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="receiver.email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Receiver Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Receiver email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone */}
                    <FormField
                        control={form.control}
                        name="receiver.phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Receiver Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="Receiver phone" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Address */}
                    <FormField
                        control={form.control}
                        name="receiver.address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Receiver Address</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Receiver address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ---------- Parcel Details ---------- */}
                    {/* Parcel Type */}
                    <FormField
                        control={form.control}
                        name="parcelType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Parcel Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select parcel type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Object.entries(PARCEL_TYPE).map(([_, value]) => (
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

                    {/* Weight */}
                    <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Weight (kg)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Weight in KG"
                                        type="number"
                                        step="0.01"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>

                <SingleImageUploader onChange={setImage} />
            </Form>

            <Button type="submit" className="w-full my-5" form="add-parcel" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <span className="mr-2">Creating...</span>
                        <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    </>
                ) : (
                    "Create Parcel"
                )}
            </Button>
        </div>
    );
}