import {FooterLogo} from "../molecules/footer-logo";
import {FooterContact} from "../molecules/footer-contact";
import {FooterSocial} from "../molecules/footer-social";

export function Footer() {
    return (
        <footer className="bg-primary px-6 py-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 md:grid-cols-3">
                    <FooterLogo />
                    <FooterContact />
                    <FooterSocial />
                </div>
            </div>
        </footer>
    );
}
