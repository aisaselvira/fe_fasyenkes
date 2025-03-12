import Hero from "../organism/hero";
import Navbar from "../organism/navbar";
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
