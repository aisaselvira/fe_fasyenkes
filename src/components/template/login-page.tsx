import {Footer} from "../organism/footer";
import Login from "../organism/login";
import Navbar from "../organism/navbar-public";

export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="flex flex-grow items-center justify-center">
                <Login />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
