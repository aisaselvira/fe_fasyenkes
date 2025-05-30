import Sidebar from "../../../organism/sidebar-admin";
import Edit_Form_simulasi from "../../../organism/form/edit-simulasi"
import Breadcrumb from "@/components/organism/breadcrumd"
export default function editformSimulasiTpprj() {
    return (
        <>
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col px-4 pt-6 md:px-8 md:ml-64">
                    <div className="w-full max-w-5xl mx-auto space-y-6">
                        <Breadcrumb />
                        <Edit_Form_simulasi defaultPatientType="Rawat Jalan"/>
                    </div>
                </div>
            </div>
        </>
    );
}