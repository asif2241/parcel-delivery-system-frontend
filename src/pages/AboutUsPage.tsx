import AboutUsBanner from "@/components/about-us-components/AboutUsBanner"
import { FAQSection } from "@/components/about-us-components/FAQSection";
import OurMission from "@/components/about-us-components/OurMissionSection";

export const AboutUsPage = () => {
    const achievements = [
        { label: "Companies ", value: "300+" },
        { label: "Projects Finalized", value: "800+" },
        { label: "Happy Customers", value: "99%" },
        { label: "Recognized Awards", value: "10+" },
    ];

    return (
        <div>
            <AboutUsBanner></AboutUsBanner>
            <OurMission></OurMission>
            <FAQSection></FAQSection>
            <section className="px-3">
                <div className="bg-muted relative overflow-hidden rounded-xl p-7 md:p-16 max-w-[1500px] mx-auto my-10">
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <h2 className="text-3xl font-semibold md:text-4xl">
                            {"Our Achievements in Numbers"}
                        </h2>
                        <p className="text-muted-foreground max-w-xl">
                            {"Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth."}
                        </p>
                    </div>
                    <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 text-center lg:grid-cols-4">
                        {achievements.map((item, idx) => (
                            <div className="flex flex-col gap-2" key={item.label + idx}>
                                <span className="text-4xl font-semibold md:text-5xl">
                                    {item.value}
                                </span>
                                <p className="text-sm md:text-base">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}
