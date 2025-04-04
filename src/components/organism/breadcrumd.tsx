import Link from "next/link";
import { useRouter } from "next/router";

interface BreadcrumbMap {
    [key: string]: string;
}

interface BreadcrumbProps {
    customMap?: BreadcrumbMap;
    pageTitle?: string;
}

export default function Breadcrumb({ customMap = {}, pageTitle  }: BreadcrumbProps) {
    const router = useRouter();
    const pathSegments = router.asPath.split("/").filter(Boolean);
    const { simulasiid } = router.query;

    const defaultMap: BreadcrumbMap = {
        dashboard: "Dashboard",
        "simulasi-tppgd": "Kelola Simulasi TPPGD",
        "form-simulasi": "Tambah Kasus",
        ...(simulasiid ? { [simulasiid as string]: pageTitle || "Kelola Skenario" } : {}), 
        ...customMap,
    };

    return (
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-x-1">
                <li>
                    <Link href="/admin/dashboard" className="text-blue-600 hover:underline font-medium">
                        Home
                    </Link>
                </li>

                {pathSegments.map((seg, i) => {
                    if (seg === "admin") return null; // skip "admin" from display

                    const href = "/" + pathSegments.slice(0, i + 1).join("/");
                    const isLast = i === pathSegments.length - 1;

                    return (
                        <li key={href} className="flex items-center">
                            <span className="mx-2 text-gray-400">{">"}</span>
                            {isLast ? (
                                <span className="text-gray-800 font-semibold">{defaultMap[seg] || seg}</span>
                            ) : (
                                <Link href={href} className="text-blue-600 hover:underline">
                                    {defaultMap[seg] || seg}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
