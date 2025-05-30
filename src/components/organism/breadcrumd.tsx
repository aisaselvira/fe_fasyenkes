import Link from "next/link";
import { useRouter } from "next/router";

interface BreadcrumbMap {
    [key: string]: string;
}

interface BreadcrumbProps {
    customMap?: BreadcrumbMap;
    pageTitle?: string;
}

export default function Breadcrumb({ customMap = {} }: BreadcrumbProps) {
    const router = useRouter();
    const pathSegments = router.asPath.split("/").filter(Boolean);

    const defaultMap: BreadcrumbMap = {
        dashboard: "Dashboard",
        "simulasi-tppgd": "Kelola Simulasi TPPGD",
        "form-simulasi": "Tambah Kasus",
        ...customMap,
    };

    pathSegments.forEach((seg, i) => {
        const prev = pathSegments[i - 1];
        const prev2 = pathSegments[i - 2];
        const prev3 = pathSegments[i - 3];

        // Kelola Simulasi
        if (seg.startsWith("simulasi-")) {
            const jenis = seg.replace("simulasi-", "").toUpperCase();
            defaultMap[seg] = `Kelola Simulasi ${jenis}`;
        }

        // Detail Simulasi
        if (prev === "show" && prev2?.startsWith("simulasi-")) {
            const jenis = prev2.replace("simulasi-", "").toUpperCase();
            defaultMap[seg] = `Detail Simulasi ${jenis}`;
        }

        if (prev === "edit" && prev2?.startsWith("simulasi-")) {
            const jenis = prev2.replace("simulasi-", "").toUpperCase();
            defaultMap[seg] = `Edit Simulasi ${jenis}`;
        }
        if (prev === "show" && prev3?.startsWith("simulasi-")) {
            const jenis = prev3.replace("simulasi-", "").toUpperCase();

            // seg = ID detail skenario
            defaultMap[seg] = `Detail Skenario ${jenis}`;

            // prev2 = ID skenario
            if (!isNaN(Number(prev2))) {
                defaultMap[prev2] = `Kelola Skenario ${jenis}`;
            }
        }
    });

    return (
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-x-1">
                <li>
                    <Link href="/admin/dashboard" className="text-blue-600 hover:underline font-medium">
                        Home
                    </Link>
                </li>

                {pathSegments.map((seg, i) => {
                    if (seg === "admin" || seg === "show" || seg === "edit") return null;


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
