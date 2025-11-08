import { HeroSection } from "../hero115"
import OurFeatures from "../OurFeatures"
import OurServices from "../OurServices"

export const HomeLayout = () => {
    return (
        <div className="max-w-[1500px] w-11/12 mx-auto">
            <HeroSection ></HeroSection>
            <OurFeatures></OurFeatures>
            <OurServices></OurServices>
        </div>
    )
}
