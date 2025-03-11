import Image from "next/image";

export default function Logo() {
    return (
        <div className="flex items-center">
            <Image src="/assets/logo.svg" alt="OpenMRI Logo" width={120} height={40} />
        </div>
    );
}
