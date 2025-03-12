export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="" className="text-[#242F9B] text-2xl font-bold ">OpenMri</a>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
                                    Home
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow p-4">{children}</main>

            {/* Footer */}
            <footer className="bg-blue-800 text-white py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-center md:text-left">&copy; 2024 PT. Nama Perusahaan. All Rights Reserved.</p>
                        <div className="flex space-x-4 mt-2 md:mt-0">
                            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                            <a href="#" className="hover:text-gray-300">Terms of Service</a>
                            <a href="#" className="hover:text-gray-300">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
