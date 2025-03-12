import {Facebook, Instagram, Twitter} from "lucide-react";
import {SocialIcon} from "../atoms/social-icon";

export function FooterSocial() {
    return (
        <div className="space-y-4">
            <h3 className="text-[28px] font-extrabold leading-tight text-white">Sosial media</h3>
            <div className="flex gap-4">
                <SocialIcon href="https://instagram.com/openmri" icon={Instagram} label="Instagram" />
                <SocialIcon href="https://facebook.com/openmri" icon={Facebook} label="Facebook" />
                <SocialIcon href="https://twitter.com/openmri" icon={Twitter} label="Twitter" />
            </div>
        </div>
    );
}
