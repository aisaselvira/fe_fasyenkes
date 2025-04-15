import Sidebar from "../../../organism/sidebar-admin";
import DetailSimulasiTppgd from "../../../organism/detail-simulasi-tppgd"
import Breadcrumb from "@/components/organism/breadcrumd"
export default function formSkenarioTppgd() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 flex flex-col min-h-screen pl-16 md:ml-64 md:pl-0">
                    <div className="w-full max-w-4xl mx-auto mt-6">
                        <Breadcrumb customMap={{
                            detail: "Detail Simulasi",
                        }} 
                        pageTitle="Detail Simulasi"/>
                    </div>
                    <DetailSimulasiTppgd />
                </div>
            </div>
        </>
    );
}