import Sidebar from "../../../organism/sidebar-admin";
import Form_skenario from "../../../organism/form/skenario"
import Breadcrumb from "@/components/organism/breadcrumd"
export default function formSkenarioTpprj() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 flex flex-col min-h-screen pl-16 md:ml-64 md:pl-0">
                    <div className="w-full max-w-4xl mx-auto mt-6">
                        <Breadcrumb customMap={{
                            "form-skenario": "Tambah Skenario",
                        }} />
                    </div>
                    <Form_skenario skenariodropdown={["pendaftaran", "Admisi Rawat Jalan"]} />
                </div>
            </div>
        </>
    );
}