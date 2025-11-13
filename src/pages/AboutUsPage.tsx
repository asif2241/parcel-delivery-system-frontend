import AboutUsBanner from "@/components/about-us-components/AboutUsBanner"
import { FAQSection } from "@/components/about-us-components/FAQSection";
import OurAchievementsSection from "@/components/about-us-components/OurAchievementsSection";
import OurMission from "@/components/about-us-components/OurMissionSection";

export const AboutUsPage = () => {


    return (
        <div>
            <AboutUsBanner></AboutUsBanner>
            <OurMission></OurMission>
            <FAQSection></FAQSection>
            <OurAchievementsSection></OurAchievementsSection>

        </div>
    )
}
