import Sidebar from "../../../organism/sidebar-admin";
import Form_simulasi from "../../../organism/form/simulasi"
import Breadcrumb from "@/components/organism/breadcrumd"
export default function formSimulasiTppgd() {
    return (
        <>
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col px-4 pt-6 md:px-8 md:ml-64">
                    <div className="w-full max-w-5xl mx-auto space-y-6">
                        <Breadcrumb />
                        <Form_simulasi defaultPatientType="Gawat Darurat"/>
                    </div>
                </div>
            </div>
        </>
    );
}