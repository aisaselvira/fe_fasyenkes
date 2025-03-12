import Logo from "../atoms/logo";
import MenuList from "../molecules/MenuList";
import UserIcon from "../atoms/UserIcon";

export default function Navbar() {
    return (
        <header className="w-full bg-blue-800 py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo di kiri */}
                <Logo />

                {/* Wrapper untuk Menu dan UserIcon di kanan */}
                <div className="flex items-center space-x-6">
                    <MenuList />
                    <UserIcon />
                </div>
            </div>
        </header>
    );
}
