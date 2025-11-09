import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

interface Faq1Props {
    heading?: string;
    items?: FaqItem[];
}

export const FAQSection = ({
    heading = "Frequently Asked Questions",
    items = [
        {
            id: "faq-1",
            question: "What is FastDrop?",
            answer:
                "FastDrop is an easy-to-use parcel delivery platform that allows you to send and receive packages quickly and securely. Whether you’re a business or an individual, FastDrop helps you manage every step of the delivery process online.",
        },
        {
            id: "faq-2",
            question: "How do I send a parcel with FastDrop?",
            answer:
                "Simply create an account, enter your parcel details, choose your receiver’s address, and schedule a pickup. Our delivery partner will collect and deliver your parcel to the destination safely and on time.",
        },
        {
            id: "faq-3",
            question: "Can I track my parcel in real time?",
            answer:
                "Yes! Once your parcel is shipped, you’ll receive a unique tracking ID. You can use it anytime on the FastDrop website to see live updates on your delivery status.",
        },
        {
            id: "faq-4",
            question: "What types of parcels can I send?",
            answer:
                "You can send most types of small to medium-sized parcels including documents, electronics, gifts, and other non-restricted items. For larger or special deliveries, please contact our support team.",
        },
        {
            id: "faq-5",
            question: "How long does delivery take?",
            answer:
                "Delivery time depends on the distance and delivery option you choose. Local deliveries are usually completed within 24 hours, while intercity deliveries may take 2–3 business days.",
        },
        {
            id: "faq-6",
            question: "Is my parcel insured?",
            answer:
                "Yes. All FastDrop deliveries are insured up to a certain value. For high-value parcels, you can opt for additional coverage at checkout for extra protection.",
        },
        {
            id: "faq-7",
            question: "How can I contact customer support?",
            answer:
                "You can reach our support team anytime via the Help section on our website, or by emailing support@fastdrop.com. We’re here to assist with any questions or delivery issues.",
        },
    ],
}: Faq1Props) => {
    return (

        <section className="py-24 px-3 mx-auto">
            <div className="container max-w-3xl  mx-auto ">
                <h1 className="mb-4 text-3xl font-semibold md:mb-10 md:text-4xl">
                    {heading}
                </h1>
                <Accordion type="single" collapsible>
                    {items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="font-semibold hover:no-underline">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>

    );
};

