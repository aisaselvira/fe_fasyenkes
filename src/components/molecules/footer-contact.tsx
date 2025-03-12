import {Link2, Mail} from "lucide-react";
import {ContactItem} from "../atoms/contact-item";

export function FooterContact() {
    return (
        <div className="space-y-4">
            <div className="text-[28px] font-extrabold leading-tight text-white">OpenMRI`s Productions</div>
            <div className="space-y-1 text-sm text-white">
                <p>Ruang W105, Lt.1 Sayap Selatan, Gd. Izo Ibokoshimodiprodjo</p>
                <p>Sekolah Vokasi Universitas Gadjah Mada</p>
                <p>Sekip Unit I Cattur Tunggal Depok, Sleman,</p>
                <p>Daerah Istimewa Yogyakarta, Indonesia</p>
            </div>
            <ContactItem icon={Link2}>(0274) 587992 (Telp. kantor)</ContactItem>
            <ContactItem icon={Mail}>likes.sv@ugm.ac.id</ContactItem>
        </div>
    );
}
