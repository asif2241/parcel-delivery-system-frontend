import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, LocationEditIcon, Phone } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export default function ContactUsPage() {
    const form = useForm();

    const addressInfo = [
        {
            Icon: LocationEditIcon,
            title: "Address",
            p1: "Colonet Hut",
            p2: "Chittagong"
        },
        {
            Icon: Phone,
            title: "Phone",
            p1: "01683674934",
            p2: "01583534563"
        },
        {
            Icon: MailIcon,
            title: "Email",
            p1: "asifislam2241@gmail.com",
            p2: "support.fastdrop@gmail.com"
        },
    ]

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        toast.success("Message sent...")

    };

    return (
        <div className="max-w-[1200px] mx-auto my-20 flex flex-col md:flex-row gap-20 ">
            {/* left side */}
            <div className="flex md:flex-col   gap-5 lg:border-r-2 lg:pr-5 px-3 w-full">

                {
                    addressInfo.map(({ Icon, title, p1, p2 }) => (
                        <Card key={title} className=" text-center    border-none  bg-transparent shadow-none mx-auto gap-0">
                            <div className="flex justify-center items-center">
                                <Icon size={30} color="blue" />
                            </div>
                            <CardTitle className="text-lg ">
                                {title}
                            </CardTitle>
                            <CardDescription className="text-sm">
                                {p1}
                            </CardDescription>
                            <CardDescription className="text-sm">
                                {p2}
                            </CardDescription>
                        </Card>
                    ))
                }

            </div>
            {/* right sight form */}
            <div className="flex flex-col space-y-6 md:px-5 px-10">
                <h3 className="font-semibold text-2xl">Send Us A Message</h3>
                <p className="text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint, tenetur temporibus natus expedita ab delectus </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Your Name"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Your Email"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter Your Message"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full"> Send</Button>
                    </form>
                </Form>

            </div>
        </div>
    )
}

{/* <Input type="text" placeholder="Enter Your Name" className="bg-fuchsia-100"></Input>
<Input type="email" placeholder="Enter Your Email" className="bg-fuchsia-100"></Input>
<Textarea placeholder="Enter Your Message" className="bg-fuchsia-100"></Textarea> */}