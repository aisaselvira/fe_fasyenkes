import {Input} from "@/components/atoms/input";
import {Button} from "@/components/atoms/button";

export default function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen p-6">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg rounded-lg p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Masukkan Akun Anda
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Selamat Datang! Mohon masukkan alamat akun Anda di bawah
                </p>
                <form className="space-y-6 mt-4" action="#">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Masukkan email Anda"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Password
                        </label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Kata Sandi"
                            className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 border rounded dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                                Remember me
                            </label>
                        </div>
                        <a
                            href="#"
                            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <Button
                        type="submit"
                        className="w-full text-white bg-[#0D6EFD] hover:bg-blue-700 rounded-lg py-2.5"
                    >
                        Masuk
                    </Button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        Don’t have an account yet?{" "}
                        <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
