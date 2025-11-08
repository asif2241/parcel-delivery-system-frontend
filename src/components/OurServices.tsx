import { MotorbikeIcon, Truck, GiftIcon, Receipt, Shield, Clock } from "lucide-react"
import { Card, CardDescription, CardTitle } from "./ui/card";

export default function OurServices() {

    const ourServicesData = [
        {
            Icon: MotorbikeIcon,
            title: "Express Delivery & Standard Delivery",
            description: "We deliver parcels in metropolitan cities of Dhaka, Chittagong, Sylhet, Khulna, Rajshahi within 24-72 hours and provide express delivery on-demand within 4-6 hours from Pick-up point to customer drop point. (Dhaka Only)"
        },
        {
            Icon: Truck,
            title: "Nationwide Delivery",
            description: "Our Courier service delivers parcels all over Bangladesh. Also, offering home delivery in every district where, as an online business owner, you can send your products to customers' doorstep within 48-72 hours."
        },
        {
            Icon: GiftIcon,
            title: "Fulfillment Solution",
            description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
        },
        {
            Icon: Receipt,
            title: "Cash on Home Delivery",
            description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
        },
        {
            Icon: Shield,
            title: "Secure Handling",
            description: "All packages are handled with utmost care and security. We ensure your items are protected throughout the delivery process with specialized packaging when needed."
        },
        {
            Icon: Clock,
            title: "Real-time Tracking",
            description: "Track your shipments in real-time with our advanced tracking system. Get live updates and notifications about your package's journey from pickup to delivery."
        },
    ];

    return (
        <div className="my-10 max-w-[1200px] mx-auto">
            <h3 className="text-center font-bold text-4xl md:mb-10 mb-5">Our Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                {
                    ourServicesData.map(({ Icon, title, description }, index) => (
                        <Card key={index} className="max-w-[300px] text-center px-5 border-none mx-auto">
                            <div className="flex justify-center items-center">
                                <Icon size={48} color="blue" />
                            </div>
                            <CardTitle className="text-lg ">
                                {title}
                            </CardTitle>
                            <CardDescription className="text-sm">
                                {description}
                            </CardDescription>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}