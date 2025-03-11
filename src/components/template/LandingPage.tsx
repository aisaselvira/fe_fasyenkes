import Hero from "../organism/Hero";
import Navbar from "../organism/Navbar";
import {OpenMRIFeatures} from "../organism/OpenMRIFeatures";

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <OpenMRIFeatures />
        </>
    );
}
