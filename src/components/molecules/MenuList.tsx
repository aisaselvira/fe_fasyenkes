import MenuItem from "../atoms/MenuItem";

const menuItems = [
    {label: "Home", href: "/"},
    {label: "Materi", href: "/materi"},
    {label: "Latihan Soal", href: "/latihan-soal"},
    {label: "Simulasi", href: "/simulasi"},
    {label: "My Result", href: "/my-result"},
    {label: "Notifikasi", href: "/notifikasi"},
];

export default function MenuList() {
    return (
        <nav className="flex space-x-6">
            {menuItems.map((item) => (
                <MenuItem key={item.href} label={item.label} href={item.href} />
            ))}
        </nav>
    );
}
