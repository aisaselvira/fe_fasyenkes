import Image from "next/image";

export function FooterLogo() {
    return (
        <div className="space-y-2">
            <Image
                src="/assets/logo-open-mri.svg"
                alt="OpenMRI Logo"
                width={180}
                height={180}
                className="brightness-0 invert"
            />
        </div>
    );
}
