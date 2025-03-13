import Image from "next/image";

export default function Logo() {
    return (
        <div className="flex items-center">
            <Image src="/assets/logo.svg" alt="OpenMRI Logo" width={160} height={70} />
        </div>
    );
}
