import {Accordion} from "@/components/atoms/accordion";
import {QAAccordionItem} from "@/components/molecules/qa-accordion-item";

const qaItems = [
    {
        question: "Apa itu OpenMRI?",
        answer: "OpenMRI adalah platform terbuka untuk manajemen dan analisis data MRI yang dapat diakses secara gratis oleh peneliti dan praktisi medis.",
        value: "item-1",
    },
    {
        question: "Apa aja fitur di dalam OpenMRI?",
        answer: "OpenMRI menyediakan berbagai fitur seperti visualisasi gambar 3D, analisis data, segmentasi otomatis, dan alat kolaborasi untuk tim peneliti.",
        value: "item-2",
    },
    {
        question: "Apakah OpenMRI berbayar?",
        answer: "Tidak, OpenMRI adalah platform open source yang dapat digunakan secara gratis. Namun, beberapa fitur premium mungkin memerlukan biaya berlangganan.",
        value: "item-3",
    },
    {
        question: "Bagaimana cara menggunakan fitur simulasi di OpenMRI?",
        answer: "Untuk menggunakan fitur simulasi, buka panel 'Simulasi' di dashboard utama, pilih jenis simulasi yang diinginkan, atur parameter yang diperlukan, dan klik tombol 'Mulai Simulasi'.",
        value: "item-4",
    },
    {
        question: "Kemana saya bisa mendapatkan informasi atau meminta bantuan jika terdapat kendala?",
        answer: "Anda dapat mengunjungi pusat bantuan kami di help.openmri.org, bergabung dengan forum komunitas, atau menghubungi tim dukungan kami melalui support@openmri.org.",
        value: "item-5",
    },
];

export function QASection() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            <h2 className="mb-8 text-center text-3xl font-bold">Q&A</h2>
            <Accordion type="single" collapsible className="w-full">
                {qaItems.map((item) => (
                    <QAAccordionItem
                        key={item.value}
                        question={item.question}
                        answer={item.answer}
                        value={item.value}
                    />
                ))}
            </Accordion>
        </div>
    );
}
