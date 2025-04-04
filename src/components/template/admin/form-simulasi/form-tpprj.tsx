import Sidebar from "../../../organism/sidebar-admin";
import Form_simulasi from "../../../organism/form/simulasi"
import Breadcrumb from "@/components/organism/breadcrumd"
export default function formSimulasiTpprj() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 flex flex-col min-h-screen pl-16 md:ml-64 md:pl-0">
                    <div className="w-full max-w-4xl mx-auto mt-6">
                        <Breadcrumb customMap={{
                            "simulasi-tpprj": "Kelola Simulasi TPPRJ",
                            "form-simulasi": "Tambah Kasus",
                        }} />
                    </div>
                    <Form_simulasi defaultPatientType="Rawat Jalan" />
                </div>
            </div>
        </>
    );
}