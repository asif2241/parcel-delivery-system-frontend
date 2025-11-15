/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardDescription, CardTitle } from "./ui/card";
import trackParcelImg from "@/assets/images/trackParcel.svg"
import supportParcelImg from "@/assets/images/call-support.svg"
import safeParcelImg from "@/assets/images/safeParcel.svg"

const ourFeatureData = [
    {
        image: trackParcelImg,
        title: "Real-Time Parcel Tracking",
        description: "Track your parcel live with instant updates on its current location and delivery status, anytime, anywhere."
    },
    {
        image: safeParcelImg,
        title: "100% Secure & Insured Delivery",
        description: "Your parcels are fully insured and handled with utmost care, ensuring safe delivery to every corner of Bangladesh."
    },
    {
        image: supportParcelImg,
        title: "24/7 Dedicated Support",
        description: "Get instant help anytime with our round-the-clock call center and personalized relationship manager support."
    },
];
export default function OurFeatures() {
    return (
        <div className="my-5 max-w-[800px]  mx-auto">
            <div className=" grid md:grid-cols-3 grid-cols-1 gap-4 ">
                {
                    ourFeatureData.map((data, idx) => (
                        <Card key={idx} className="max-w-[260px] text-center px-5 border-none mx-auto">
                            <div className="flex justify-center min-h-[160px]">
                                <img className="w-40 rounded-3xl" src={data.image} alt="" />
                            </div>
                            <CardTitle >
                                {data.title}
                            </CardTitle>
                            <CardDescription >
                                {data.description}
                            </CardDescription>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}
