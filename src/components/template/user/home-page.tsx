import HeroAfterLogin from "@/components/organism/hero-after-login";
import {Footer} from "../../organism/footer";
import Navbar from "../../organism/navbar-registered";
import {OpenMRIFeatures} from "../../organism/open-mri-features";
import {QASection} from "../../organism/qa-section";
import {WhyOpenMRISection} from "../../organism/why-openmri-section";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <HeroAfterLogin />
            <OpenMRIFeatures />
            <WhyOpenMRISection />
            <QASection />
            <Footer />
        </>
    );
}
